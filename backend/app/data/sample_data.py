from __future__ import annotations

from datetime import date
from typing import Dict, List


def month_ends(start_year: int = 2021, months: int = 48) -> List[date]:
    dates: List[date] = []
    year = start_year
    month = 1
    for _ in range(months):
        if month in {1, 3, 5, 7, 8, 10, 12}:
            day = 31
        elif month == 2:
            day = 28
        else:
            day = 30

        dates.append(date(year, month, day))
        month += 1
        if month == 13:
            month = 1
            year += 1
    return dates


def _deterministic_noise(i: int, t: int, phase: float) -> float:
    raw = ((i + 3) * (t + 7) * 37) % 100
    shifted = (raw / 100.0) - 0.5
    return shifted * phase


def build_sample_universe() -> Dict[str, List[dict]]:
    tickers = [
        "AAPL",
        "MSFT",
        "NVDA",
        "AMZN",
        "GOOGL",
        "META",
        "JPM",
        "V",
        "XOM",
        "UNH",
        "PG",
        "KO",
    ]

    dates = month_ends()
    data: Dict[str, List[dict]] = {}

    for i, ticker in enumerate(tickers):
        rows: List[dict] = []
        base_momentum = 0.35 + (i % 6) * 0.07
        base_value = 0.3 + ((i + 2) % 7) * 0.06
        base_size = 0.2 + ((i + 1) % 5) * 0.08

        for t, dt in enumerate(dates):
            momentum = max(0.01, min(1.5, base_momentum + _deterministic_noise(i, t, 0.35)))
            value = max(0.01, min(1.5, base_value + _deterministic_noise(i + 2, t + 3, 0.28)))
            size = max(0.01, min(1.5, base_size + _deterministic_noise(i + 4, t + 1, 0.22)))

            factor_alpha = 0.0045 * momentum + 0.0035 * value + 0.0025 * (1.2 - size)
            market_component = 0.005 + _deterministic_noise(i, t, 0.02)
            realized_return = max(-0.18, min(0.22, market_component + factor_alpha))

            rows.append(
                {
                    "date": dt,
                    "ticker": ticker,
                    "momentum": momentum,
                    "value": value,
                    "size": size,
                    "forward_return": realized_return,
                }
            )

        data[ticker] = rows

    return data


SAMPLE_UNIVERSE = build_sample_universe()
