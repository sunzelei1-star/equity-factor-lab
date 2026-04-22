import type { BacktestConfig } from '../types'

type Props = {
  config: BacktestConfig
  hasDraftChanges: boolean
  onChange: (next: BacktestConfig) => void
  onReset: () => void
  onSubmit: () => void
  loading: boolean
}

const sliderClass = 'w-full accent-cyan-400'

const BacktestPanel = ({ config, hasDraftChanges, onChange, onReset, onSubmit, loading }: Props) => {
  const update = <K extends keyof BacktestConfig>(key: K, value: BacktestConfig[K]) => {
    onChange({ ...config, [key]: value })
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/90 p-5 shadow-panel">
      <h2 className="text-lg font-semibold text-slate-100">Backtest Configuration</h2>
      <p className="mt-1 text-xs text-slate-400">
        Tune values in draft mode, then click <span className="text-cyan-300">Run Backtest</span> to apply.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Start Date
          <input
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            type="date"
            value={config.start_date}
            onChange={(e) => update('start_date', e.target.value)}
          />
        </label>
        <label className="text-sm text-slate-300">
          End Date
          <input
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            type="date"
            value={config.end_date}
            onChange={(e) => update('end_date', e.target.value)}
          />
        </label>

        <label className="text-sm text-slate-300">
          Top N Stocks: <span className="font-semibold text-cyan-400">{config.top_n}</span>
          <input
            className={sliderClass}
            type="range"
            min={2}
            max={12}
            step={1}
            value={config.top_n}
            onChange={(e) => update('top_n', Number(e.target.value))}
          />
        </label>

        <div className="rounded-lg border border-slate-700 p-3 text-sm text-slate-400">
          Rebalance Frequency
          <p className="mt-1 text-slate-200">Monthly (v1)</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {[
          { key: 'momentum_weight', label: 'Momentum Weight' },
          { key: 'value_weight', label: 'Value Weight' },
          { key: 'size_weight', label: 'Size Weight' },
        ].map((item) => {
          const key = item.key as keyof Pick<
            BacktestConfig,
            'momentum_weight' | 'value_weight' | 'size_weight'
          >

          return (
            <label key={key} className="block text-sm text-slate-300">
              {item.label}:{' '}
              <span className="font-semibold text-cyan-400">{config[key].toFixed(1)}</span>
              <input
                className={sliderClass}
                type="range"
                min={0}
                max={3}
                step={0.1}
                value={config[key]}
                onChange={(e) => update(key, Number(e.target.value))}
              />
            </label>
          )
        })}
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
          {hasDraftChanges ? 'You have unapplied configuration changes.' : 'Draft is synced with applied results.'}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 font-medium text-slate-200 transition hover:border-slate-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onReset}
            disabled={loading}
          >
            Reset to Default
          </button>
          <button
            className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? 'Running Backtest...' : 'Run Backtest'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BacktestPanel
