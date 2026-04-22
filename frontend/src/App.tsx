import { useCallback, useEffect, useMemo, useState } from 'react'

import BacktestPanel from './components/BacktestPanel'
import DashboardHeader from './components/DashboardHeader'
import FactorExposureChart from './components/FactorExposureChart'
import MetricCards from './components/MetricCards'
import PerformanceChart from './components/PerformanceChart'
import RelativeReturnChart from './components/RelativeReturnChart'
import { runBacktest } from './lib/api'
import type { BacktestConfig, BacktestResult } from './types'

const defaultConfig: BacktestConfig = {
  start_date: '2022-01-31',
  end_date: '2024-12-31',
  top_n: 5,
  rebalance_frequency: 'monthly',
  momentum_weight: 1,
  value_weight: 1,
  size_weight: 1,
}

const App = () => {
  const [config, setConfig] = useState<BacktestConfig>(defaultConfig)
  const [result, setResult] = useState<BacktestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const latestHoldings = useMemo(() => {
    if (!result?.holdings_history.length) return []
    return result.holdings_history[result.holdings_history.length - 1].tickers
  }, [result])

  const onRunBacktest = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      const data = await runBacktest(config)
      setResult(data)
    } catch {
      setError('Failed to run backtest. Ensure backend is running and VITE_API_BASE_URL is correct.')
    } finally {
      setLoading(false)
    }
  }, [config])

  useEffect(() => {
    void onRunBacktest()
  }, [onRunBacktest])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
        <DashboardHeader />

        <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
          <BacktestPanel config={config} onChange={setConfig} onSubmit={onRunBacktest} loading={loading} />

          <section className="space-y-6">
            {error && (
              <div className="rounded-lg border border-rose-800 bg-rose-950/30 p-3 text-sm text-rose-300">{error}</div>
            )}

            {result ? (
              <>
                <MetricCards metrics={result.metrics} />
                <PerformanceChart points={result.equity_curve} />
                <RelativeReturnChart points={result.equity_curve} />
                <FactorExposureChart points={result.factor_exposure} />

                <div className="rounded-2xl border border-slate-800 bg-panel/90 p-4 shadow-panel">
                  <h3 className="text-lg font-semibold">Latest Portfolio Constituents</h3>
                  <p className="mb-3 mt-1 text-xs text-slate-400">
                    Most recent rebalance snapshot from the selected backtest window.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {latestHoldings.map((ticker) => (
                      <span
                        key={ticker}
                        className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200"
                      >
                        {ticker}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-panel/60 p-8 text-center text-slate-400">
                Running initial sample backtest...
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
