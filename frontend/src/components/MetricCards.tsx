import type { BacktestMetrics } from '../types'

type Props = {
  metrics: BacktestMetrics
}

const pct = (value: number) => `${(value * 100).toFixed(2)}%`

const MetricCards = ({ metrics }: Props) => {
  const entries = [
    { label: 'Total Return', value: pct(metrics.total_return) },
    { label: 'Annualized Return', value: pct(metrics.annualized_return) },
    { label: 'Volatility', value: pct(metrics.volatility) },
    { label: 'Sharpe Ratio', value: metrics.sharpe_ratio.toFixed(2) },
    { label: 'Max Drawdown', value: pct(metrics.max_drawdown) },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {entries.map((item) => (
        <article
          key={item.label}
          className="rounded-xl border border-slate-800 bg-panel/90 p-4 shadow-panel"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
        </article>
      ))}
    </div>
  )
}

export default MetricCards
