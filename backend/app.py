import csv
import os
from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

import query_logger

load_dotenv()

FEATURE_COLUMN_MAP = {
    "year": "Year",
    "rainfall_mm": "Rainfall (mm)",
    "avg_temperature_c": "Avg_Temperature (°C)",
    "soil_type": "Soil_Type",
    "fertilizer_used_kg_per_acre": "Fertilizer_Used (kg/acre)",
    "pesticide_used_lit_per_acre": "Pesticide_Used (lit/acre)",
}

CROP_MODELS = {
    "groundnut": "groundnut_pipeline.joblib",
    "paddy": "paddy_pipeline.joblib",
    "millets": "millets_pipeline.joblib",
}


class ValidationError(ValueError):
    """Raised when user input fails validation."""


class PredictionModelError(RuntimeError):
    """Raised when a model cannot be loaded for inference."""


def _parse_bool(value: str | None, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _parse_origins(raw_origins: str) -> list[str]:
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    return origins or ["http://localhost:8080"]


def _model_dir_from_env() -> Path:
    configured = os.getenv("MODEL_ARTIFACT_DIR")
    if configured:
        return Path(configured).resolve()
    return (Path(__file__).resolve().parents[1] / "ml_models" / "models").resolve()


@lru_cache(maxsize=len(CROP_MODELS))
def load_model_bundle(crop: str) -> dict[str, Any]:
    model_file = CROP_MODELS[crop]
    artifact_path = _model_dir_from_env() / model_file
    if not artifact_path.is_file():
        raise PredictionModelError(
            f"Model artifact not found for '{crop}'. Expected: {artifact_path}. "
            "Run `python ml_models/scripts/train_and_evaluate.py` to generate pipeline artifacts."
        )

    bundle = joblib.load(artifact_path)
    if not isinstance(bundle, dict) or "pipeline" not in bundle:
        raise PredictionModelError(
            f"Invalid model artifact format for '{crop}'. Expected a dict with key 'pipeline'."
        )
    return bundle


def validate_prediction_payload(payload: Any) -> tuple[str, dict[str, Any]]:
    if not isinstance(payload, dict):
        raise ValidationError("Request body must be a JSON object.")

    crop = str(payload.get("crop", "")).strip().lower()
    if not crop:
        raise ValidationError("Field 'crop' is required.")
    if crop not in CROP_MODELS:
        allowed = ", ".join(sorted(CROP_MODELS))
        raise ValidationError(f"Unsupported crop '{crop}'. Allowed crops: {allowed}.")

    validated_features: dict[str, Any] = {}
    missing_fields: list[str] = []

    for request_field in FEATURE_COLUMN_MAP:
        value = payload.get(request_field)
        if value in (None, ""):
            missing_fields.append(request_field)
            continue

        if request_field == "soil_type":
            validated_features[request_field] = str(value).strip()
            continue

        try:
            validated_features[request_field] = float(value)
        except (TypeError, ValueError) as exc:
            raise ValidationError(f"Field '{request_field}' must be numeric.") from exc

    if missing_fields:
        raise ValidationError(
            "Missing required fields: " + ", ".join(missing_fields)
        )

    if validated_features["year"] <= 0:
        raise ValidationError("Field 'year' must be greater than 0.")

    return crop, validated_features


def build_model_input(features: dict[str, Any]) -> pd.DataFrame:
    row = {
        model_field: features[request_field]
        for request_field, model_field in FEATURE_COLUMN_MAP.items()
    }
    return pd.DataFrame([row])


def query_glm(user_input: str) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY", "").strip()
    api_url = os.getenv("OPENROUTER_API_URL", "https://openrouter.ai/api/v1/chat/completions")
    model = os.getenv("OPENROUTER_MODEL", "z-ai/glm-4.5-air:free")
    timeout_seconds = float(os.getenv("OPENROUTER_TIMEOUT_SECONDS", "20"))

    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured")

    payload = {
        "model": model,
        "messages": [{"role": "user", "content": user_input}],
        "temperature": 0.7,
    }
    headers = {
        "Authorization": "Bearer " + api_key,
        "Content-Type": "application/json",
    }

    response = requests.post(api_url, headers=headers, json=payload, timeout=timeout_seconds)
    response.raise_for_status()

    data = response.json()
    return data["choices"][0]["message"]["content"]


def create_app(test_config: dict[str, Any] | None = None) -> Flask:
    app = Flask(__name__)
    if test_config:
        app.config.update(test_config)

    cors_origins = _parse_origins(os.getenv("FRONTEND_ORIGIN", "http://localhost:8080"))
    CORS(app, resources={r"/*": {"origins": cors_origins}})

    @app.get("/")
    def home() -> Any:
        return jsonify(
            {
                "service": "crop-yield-api",
                "status": "ok",
                "advisory": "LLM advisory available at POST /chat",
                "prediction": "Deterministic prediction available at POST /api/v1/predict",
            }
        )

    @app.get("/health")
    @app.get("/api/v1/health")
    def health() -> Any:
        return jsonify({"status": "ok"})

    @app.post("/api/v1/predict")
    def predict() -> Any:
        try:
            crop, features = validate_prediction_payload(request.get_json(silent=True))
            model_bundle = load_model_bundle(crop)
            input_frame = build_model_input(features)
            prediction_value = float(model_bundle["pipeline"].predict(input_frame)[0])

            return jsonify(
                {
                    "crop": crop,
                    "prediction": prediction_value,
                    "unit": model_bundle.get("unit", "quintal/acre"),
                    "model_version": model_bundle.get("model_version", f"{crop}-pipeline-v1"),
                    "target": model_bundle.get("target_column", "Yield (quintal/acre)"),
                    "features_used": list(FEATURE_COLUMN_MAP.keys()),
                }
            )
        except ValidationError as exc:
            return jsonify({"error": str(exc)}), 400
        except PredictionModelError as exc:
            return jsonify({"error": str(exc)}), 503
        except Exception:
            return jsonify({"error": "Prediction failed due to an internal server error."}), 500

    @app.post("/chat")
    def chat() -> Any:
        body = request.get_json(silent=True) or {}
        user_input = str(body.get("query", "")).strip()
        if not user_input:
            return jsonify({"error": "No query provided"}), 400

        try:
            answer = query_glm(user_input)
            query_logger.log_query(user_input, answer)
            return jsonify(
                {
                    "advisory": answer,
                    "source": "openrouter",
                    "model": os.getenv("OPENROUTER_MODEL", "z-ai/glm-4.5-air:free"),
                    "note": "Advisory text is informational and is not a measured crop-yield prediction.",
                }
            )
        except RuntimeError as exc:
            return jsonify({"error": str(exc)}), 503
        except requests.RequestException:
            return jsonify({"error": "Advisory provider request failed. Please try again later."}), 502
        except Exception:
            return jsonify({"error": "Unexpected advisory error."}), 500

    @app.get("/logs")
    def logs() -> Any:
        if not _parse_bool(os.getenv("ENABLE_LOGS_ENDPOINT"), default=False):
            return jsonify({"error": "Logs endpoint is disabled."}), 404

        log_path = Path(query_logger.LOG_FILE)
        if not log_path.is_file():
            return jsonify({"logs": []})

        limit = max(1, int(os.getenv("LOGS_MAX_ROWS", "50")))
        include_advisory = _parse_bool(os.getenv("LOGS_INCLUDE_ADVISORY"), default=False)

        with log_path.open("r", encoding="utf-8", newline="") as log_file:
            rows = list(csv.DictReader(log_file))

        tail_rows = rows[-limit:]
        if not include_advisory:
            for row in tail_rows:
                row.pop("advisory", None)

        return jsonify({"logs": tail_rows, "count": len(tail_rows), "development_only": True})

    return app


app = create_app()

if __name__ == "__main__":
    debug_mode = _parse_bool(os.getenv("FLASK_DEBUG"), default=False)
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=debug_mode)
