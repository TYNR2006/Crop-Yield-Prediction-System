# Crop Yield Prediction System

A full-stack academic project that combines a React + TypeScript frontend with a Flask backend for an AI-assisted crop advisory chat flow.

> **Current implementation note:** the backend currently exposes a chat-style advisory response (`/chat`) powered by OpenRouter (`z-ai/glm-4.5-air:free`) and query logging. While the repository contains ML-related scripts and model artifacts under `ml_models/`, the active Flask API in `backend/app.py` is currently an AI-chat workflow, not a validated end-to-end yield-accuracy service with published evaluation metrics.

---

## Portfolio Snapshot

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui-style components
- **Backend:** Flask + Flask-CORS
- **AI Integration:** OpenRouter Chat Completions API with GLM model (`z-ai/glm-4.5-air:free`)
- **Data/ML Assets Present:** CSV datasets in `data/`, training/prediction scripts in `ml_models/`
- **Logging:** CSV query logging via `backend/query_logger.py`

---

## Current Architecture

```text
Browser (React/Vite)
   |
   | POST /chat (JSON)
   v
Flask API (backend/app.py)
   |- CORS enabled for cross-origin frontend requests
   |- query_glm() -> OpenRouter chat completion API
   |- query_logger.log_query() -> backend/query_logs.csv
   v
JSON response to frontend
```

### Implemented API endpoints

- `GET /` -> health/status text response
- `POST /chat` -> sends user query to OpenRouter GLM model, logs query/response, returns JSON

`backend/app.py` also defines a `GET /logs` handler, but the current implementation is incomplete (missing imports) and should be treated as non-production until fixed.

---

## Repository Structure

```text
Crop-Yield-Prediction-System/
├── backend/
│   ├── app.py
│   ├── query_logger.py
│   ├── query_logs.csv
│   └── logs/
├── data/
│   ├── groundnut_kadapa.csv
│   ├── millets_kadapa.csv
│   └── paddy_kadapa.csv
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── ml_models/
│   ├── glm_model.py
│   ├── train_ensemble.py
│   ├── predict_with_ensemble.py
│   └── models/
└── scripts/
```

---

## Setup

## 1) Clone

```bash
git clone https://github.com/TYNR2006/Crop-Yield-Prediction-System.git
cd Crop-Yield-Prediction-System
```

## 2) Backend (Flask)

From repository root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install flask flask-cors requests
python app.py
```

Default backend URL: `http://127.0.0.1:5000`

## 3) Frontend (Vite)

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Default frontend dev URL (from `vite.config.ts`): `http://localhost:8080`

---

## Configuration & Environment Guidance

### Backend secrets

The backend currently uses a placeholder API key string inside source files (`backend/app.py`, `ml_models/glm_model.py`, `ml_models/predict_with_ensemble.py`).

**Before any deployment:**

1. Move API keys to environment variables (for example, `OPENROUTER_API_KEY`).
2. Read them via `os.getenv(...)` in Python.
3. Never commit real keys to Git.

### Frontend API URL

`frontend/src/api/api.js` currently calls `http://127.0.0.1:5000/chat` directly. For production readiness, move this to a configurable environment value (for example, `VITE_API_BASE_URL`).

---

## API Examples (Implemented Endpoints)

## `GET /`

```bash
curl http://127.0.0.1:5000/
```

Example response:

```text
✅ GLM-4.5 API is Running!
```

## `POST /chat`

```bash
curl -X POST http://127.0.0.1:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"query":"Suggest steps to improve paddy yield in Kadapa"}'
```

Example response shape:

```json
{
  "prediction": "<LLM-generated advisory response>",
  "details": "<static details string from backend>",
  "explanation": "<static explanation string from backend>"
}
```

Error example (missing query):

```json
{
  "error": "No query provided"
}
```

---

## Frontend Behavior (Current)

- Multi-page React UI (`Home`, `About`, `Features`, `Predict`, `Contact`, `Results`)
- `Predict` page triggers backend request through `sendPredictionRequest()`
- Backend response is displayed in the prediction result card
- `Results` page currently shows static placeholder analytics/recommendation data

---

## Testing & Quality Status

Current state in this repository:

- No dedicated backend test suite/config is present in repository root or backend folder.
- Frontend includes lint/build scripts in `frontend/package.json`.
- Functional/API behavior should currently be verified via local manual runs (`python app.py`, `npm run dev`) and endpoint calls.

---

## Limitations (Important)

- The live Flask API is currently an LLM-backed advisory chat endpoint, not a formally evaluated crop-yield prediction API with published MAE/RMSE/R² metrics.
- Some frontend copy still markets broad optimization capabilities that are not fully backed by measured model outputs.
- `/logs` endpoint is present in code but currently incomplete for reliable use.
- Dataset scope is limited to included files (Kadapa-focused CSVs).
- Hardcoded URLs/secrets reduce deployment readiness.

---

## Security Notes

- Replace placeholder keys with environment variables before deployment.
- Do not commit credentials, tokens, or private endpoints.
- Consider adding request validation/rate limiting before public exposure.
- Keep dependency versions patched and review external API usage policies.

---

## Suggested Next Improvements

1. Externalize backend keys and frontend API base URL via environment variables.
2. Add backend tests (unit + API) and frontend integration tests.
3. Align frontend messaging with actual backend behavior.
4. If yield prediction is a target feature, expose model inference endpoints with documented schema.
5. Publish verified evaluation metrics only after reproducible training/evaluation scripts are finalized.

---

## License

No explicit license file is currently present in the repository. Add one if you intend open-source reuse.
