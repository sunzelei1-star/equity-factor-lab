from __future__ import annotations

from datetime import date
from typing import List

from pydantic import BaseModel, Field


class BacktestConfig(BaseModel):
    start_date: date
    end_date: date
    top_n: int = Field(default=5, ge=1, le=20)
    rebalance_frequency: str = Field(default="monthly")
    momentum_weight: float = Field(default=1.0, ge=0.0, le=5.0)
    value_weight: float = Field(default=1.0, ge=0.0, le=5.0)
    size_weight: float = Field(default=1.0, ge=0.0, le=5.0)


class TimeSeriesPoint(BaseModel):
    date: date
    strategy_value: float
    benchmark_value: float
    strategy_return: float
    benchmark_return: float


class PortfolioSnapshot(BaseModel):
    date: date
    tickers: List[str]


class BacktestMetrics(BaseModel):
    total_return: float
    annualized_return: float
    volatility: float
    sharpe_ratio: float
    max_drawdown: float


class FactorExposurePoint(BaseModel):
    date: date
    momentum: float
    value: float
    size: float


class BacktestResult(BaseModel):
    config: BacktestConfig
    metrics: BacktestMetrics
    equity_curve: List[TimeSeriesPoint]
    holdings_history: List[PortfolioSnapshot]
    factor_exposure: List[FactorExposurePoint]
