# Equity Factor Lab

A portfolio-ready stock factor backtesting web app for finance/business analytics portfolios.

## Stack
- **Frontend:** React + TypeScript + Tailwind + Plotly
- **Backend:** FastAPI (Python)
- **Data:** deterministic local sample universe (no external APIs)

## Features
- Professional, recruiter-friendly financial dashboard landing page
- Backtest configuration panel (date range, top-N, factor weights)
- Multi-factor backtest engine (momentum, value, size)
- Benchmark analytics:
  - Strategy vs benchmark equity curve
  - Monthly excess return vs benchmark
- Factor exposure diagnostics over time

## Project Structure
```text
backend/
  app/
    api/routes.py
    core/backtest.py
    data/sample_data.py
    models/schemas.py
    main.py
  requirements.txt
frontend/
  src/
    components/
    lib/api.ts
    App.tsx
    types.ts
  package.json
README.md
```

## Local Setup

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

> Alternative from repo root: `uvicorn app.main:app --app-dir backend --reload --port 8000`

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env   # optional API URL override
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://127.0.0.1:8000`

## API Endpoints
- `GET /api/health`
- `GET /api/universe`
- `POST /api/backtest`

## Manual Setup Still Required
- Python + Node environments
- Install dependencies (`pip install -r backend/requirements.txt`, `npm install`)

## Screenshot (Placeholder)
> Add final UI screenshot after local run.

```md
![Equity Factor Lab Dashboard](docs/screenshots/dashboard.png)
```
