export type BacktestConfig = {
  start_date: string
  end_date: string
  top_n: number
  rebalance_frequency: 'monthly'
  momentum_weight: number
  value_weight: number
  size_weight: number
}

export type BacktestMetrics = {
  total_return: number
  annualized_return: number
  volatility: number
  sharpe_ratio: number
  max_drawdown: number
}

export type EquityCurvePoint = {
  date: string
  strategy_value: number
  benchmark_value: number
  strategy_return: number
  benchmark_return: number
}

export type FactorExposurePoint = {
  date: string
  momentum: number
  value: number
  size: number
}

export type PortfolioSnapshot = {
  date: string
  tickers: string[]
}

export type BacktestResult = {
  config: BacktestConfig
  metrics: BacktestMetrics
  equity_curve: EquityCurvePoint[]
  holdings_history: PortfolioSnapshot[]
  factor_exposure: FactorExposurePoint[]
}
