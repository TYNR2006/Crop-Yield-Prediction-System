import json
from datetime import datetime, timezone
from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
MODELS_DIR = ROOT / "ml_models" / "models"
METRICS_PATH = ROOT / "ml_models" / "metrics" / "evaluation_metrics.json"

DATASETS = {
    "groundnut": DATA_DIR / "groundnut_kadapa.csv",
    "paddy": DATA_DIR / "paddy_kadapa.csv",
    "millets": DATA_DIR / "millets_kadapa.csv",
}


def detect_target_column(columns: list[str]) -> str:
    for column in columns:
        if "yield" in column.lower():
            return column
    raise ValueError("No target column containing 'yield' found.")


def train_for_crop(crop: str, csv_path: Path) -> dict:
    frame = pd.read_csv(csv_path)
    target_column = detect_target_column(frame.columns.tolist())

    X = frame.drop(columns=[target_column])
    y = frame[target_column]

    numeric_columns = X.select_dtypes(include=["number"]).columns.tolist()
    categorical_columns = [column for column in X.columns if column not in numeric_columns]

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numeric",
                Pipeline([
                    ("imputer", SimpleImputer(strategy="median")),
                ]),
                numeric_columns,
            ),
            (
                "categorical",
                Pipeline([
                    ("imputer", SimpleImputer(strategy="most_frequent")),
                    ("one_hot", OneHotEncoder(handle_unknown="ignore")),
                ]),
                categorical_columns,
            ),
        ]
    )

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            (
                "model",
                RandomForestRegressor(
                    n_estimators=200,
                    random_state=42,
                    n_jobs=-1,
                ),
            ),
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )

    pipeline.fit(X_train, y_train)
    predictions = pipeline.predict(X_test)

    model_version = f"{crop}-rf-pipeline-v1"
    bundle = {
        "pipeline": pipeline,
        "feature_columns": X.columns.tolist(),
        "target_column": target_column,
        "unit": "quintal/acre",
        "model_version": model_version,
        "dataset": csv_path.name,
    }
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(bundle, MODELS_DIR / f"{crop}_pipeline.joblib")

    return {
        "crop": crop,
        "dataset": csv_path.name,
        "rows": int(len(frame)),
        "features": X.columns.tolist(),
        "target": target_column,
        "unit": "quintal/acre",
        "train_size": int(len(X_train)),
        "test_size": int(len(X_test)),
        "model_version": model_version,
        "mae": float(mean_absolute_error(y_test, predictions)),
        "rmse": float(mean_squared_error(y_test, predictions) ** 0.5),
        "r2": float(r2_score(y_test, predictions)),
    }


def main() -> None:
    all_metrics = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "method": {
            "split": "train_test_split",
            "test_size": 0.2,
            "random_state": 42,
            "model": "RandomForestRegressor",
            "preprocessing": "ColumnTransformer(SimpleImputer + OneHotEncoder)",
        },
        "crops": {},
    }

    for crop, path in DATASETS.items():
        all_metrics["crops"][crop] = train_for_crop(crop, path)

    METRICS_PATH.parent.mkdir(parents=True, exist_ok=True)
    METRICS_PATH.write_text(json.dumps(all_metrics, indent=2), encoding="utf-8")
    print(f"Saved metrics to: {METRICS_PATH}")


if __name__ == "__main__":
    main()
