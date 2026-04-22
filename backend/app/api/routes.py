from __future__ import annotations

from datetime import date

from fastapi import APIRouter, HTTPException

from app.core.backtest import run_backtest
from app.data.sample_data import SAMPLE_UNIVERSE
from app.models.schemas import BacktestConfig, BacktestResult

router = APIRouter(prefix="/api", tags=["backtest"])


@router.get("/health")
def health() -> dict:
    return {"status": "ok"}


@router.get("/universe")
def universe() -> dict:
    first_ticker = next(iter(SAMPLE_UNIVERSE.values()))
    return {
        "tickers": list(SAMPLE_UNIVERSE.keys()),
        "min_date": first_ticker[0]["date"],
        "max_date": first_ticker[-1]["date"],
    }


@router.post("/backtest", response_model=BacktestResult)
def backtest(config: BacktestConfig) -> BacktestResult:
    if config.start_date >= config.end_date:
        raise HTTPException(status_code=400, detail="start_date must be before end_date")

    if config.rebalance_frequency != "monthly":
        raise HTTPException(status_code=400, detail="Only monthly rebalancing is supported in v1")

    try:
        return run_backtest(config)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
