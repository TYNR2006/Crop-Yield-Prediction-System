# Frontend - Crop Yield Prediction System

This folder contains the React + TypeScript + Vite frontend for the **Crop Yield Prediction System** repository.

It provides a multi-page UI and currently integrates with the Flask backend chat/advisory endpoint at `POST /chat`.

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- UI component set under `src/components/ui`

---

## What is Implemented

- Application routing (`/`, `/about`, `/features`, `/predict`, `/contact`, `/results`)
- Prediction request flow from `Predict.tsx` via `src/api/api.js`
- Display of backend response (`prediction`, `explanation`) on the Predict page
- Static UI sections for product-style presentation content

---

## Local Development

From this `frontend/` directory:

```bash
npm install
npm run dev
```

Vite dev server is configured for port `8080` in `vite.config.ts`.

Build and lint:

```bash
npm run lint
npm run build
```

---

## Backend Integration

Current API calls are hardcoded to:

- `http://127.0.0.1:5000/chat`

See `src/api/api.js`.

For better portability, migrate this to an environment-based URL (for example `VITE_API_BASE_URL`).

---

## Notes for Recruiters / Reviewers

- This frontend is functional for the current backend's AI-chat advisory flow.
- Some pages (especially `/results`) still use placeholder/static demonstration content rather than fully backend-driven analytics.
- Claims about validated yield-model accuracy should not be made from the current frontend/backend integration alone.
