from __future__ import annotations

from collections import defaultdict
from datetime import date
from statistics import mean, pstdev
from typing import Dict, List

from app.data.sample_data import SAMPLE_UNIVERSE
from app.models.schemas import (
    BacktestConfig,
    BacktestMetrics,
    BacktestResult,
    FactorExposurePoint,
    PortfolioSnapshot,
    TimeSeriesPoint,
)


def _group_by_date(start_date: date, end_date: date) -> Dict[date, List[dict]]:
    grouped: Dict[date, List[dict]] = defaultdict(list)
    for rows in SAMPLE_UNIVERSE.values():
        for row in rows:
            dt = row["date"]
            if start_date <= dt <= end_date:
                grouped[dt].append(row)
    return dict(sorted(grouped.items(), key=lambda item: item[0]))


def _max_drawdown(curve: List[float]) -> float:
    peak = curve[0]
    drawdown = 0.0
    for value in curve:
        peak = max(peak, value)
        dd = (value - peak) / peak
        drawdown = min(drawdown, dd)
    return abs(drawdown)


def run_backtest(config: BacktestConfig) -> BacktestResult:
    by_date = _group_by_date(config.start_date, config.end_date)
    if not by_date:
        raise ValueError("No sample data available for the selected date range.")

    strategy_value = 100.0
    benchmark_value = 100.0

    strategy_returns: List[float] = []
    benchmark_returns: List[float] = []
    equity_curve: List[TimeSeriesPoint] = []
    holdings_history: List[PortfolioSnapshot] = []
    factor_exposure: List[FactorExposurePoint] = []

    for dt, rows in by_date.items():
        scored = []
        for row in rows:
            score = (
                config.momentum_weight * row["momentum"]
                + config.value_weight * row["value"]
                + config.size_weight * (1.5 - row["size"])
            )
            scored.append((score, row))

        scored.sort(key=lambda item: item[0], reverse=True)
        selected = [row for _, row in scored[: config.top_n]]
        tickers = [row["ticker"] for row in selected]

        strat_ret = mean([row["forward_return"] for row in selected]) if selected else 0.0
        bench_ret = mean([row["forward_return"] for row in rows])

        strategy_value *= 1 + strat_ret
        benchmark_value *= 1 + bench_ret

        strategy_returns.append(strat_ret)
        benchmark_returns.append(bench_ret)

        equity_curve.append(
            TimeSeriesPoint(
                date=dt,
                strategy_value=round(strategy_value, 4),
                benchmark_value=round(benchmark_value, 4),
                strategy_return=round(strat_ret, 6),
                benchmark_return=round(bench_ret, 6),
            )
        )
        holdings_history.append(PortfolioSnapshot(date=dt, tickers=tickers))
        factor_exposure.append(
            FactorExposurePoint(
                date=dt,
                momentum=round(mean([row["momentum"] for row in selected]), 4),
                value=round(mean([row["value"] for row in selected]), 4),
                size=round(mean([row["size"] for row in selected]), 4),
            )
        )

    n = len(strategy_returns)
    monthly_vol = pstdev(strategy_returns) if n > 1 else 0.0
    annualized_return = (strategy_value / 100.0) ** (12 / max(n, 1)) - 1
    annualized_vol = monthly_vol * (12 ** 0.5)
    sharpe = annualized_return / annualized_vol if annualized_vol > 0 else 0.0

    metrics = BacktestMetrics(
        total_return=round(strategy_value / 100.0 - 1, 4),
        annualized_return=round(annualized_return, 4),
        volatility=round(annualized_vol, 4),
        sharpe_ratio=round(sharpe, 4),
        max_drawdown=round(_max_drawdown([point.strategy_value for point in equity_curve]), 4),
    )

    return BacktestResult(
        config=config,
        metrics=metrics,
        equity_curve=equity_curve,
        holdings_history=holdings_history,
        factor_exposure=factor_exposure,
    )
