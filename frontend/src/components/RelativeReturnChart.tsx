import Plot from 'react-plotly.js'
import type { EquityCurvePoint } from '../types'

type Props = {
  points: EquityCurvePoint[]
}

const RelativeReturnChart = ({ points }: Props) => {
  const dates = points.map((p) => p.date)
  const excessReturnBps = points.map((p) => (p.strategy_return - p.benchmark_return) * 10000)

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/90 p-4 shadow-panel">
      <h3 className="mb-1 text-lg font-semibold">Monthly Excess Return vs Benchmark</h3>
      <p className="mb-3 text-xs text-slate-400">Strategy monthly return minus benchmark monthly return (bps)</p>
      <Plot
        data={[
          {
            x: dates,
            y: excessReturnBps,
            type: 'bar',
            name: 'Excess Return (bps)',
            marker: {
              color: excessReturnBps.map((value) => (value >= 0 ? '#22d3ee' : '#f43f5e')),
            },
          },
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#cbd5e1' },
          xaxis: { gridcolor: '#1e293b' },
          yaxis: { gridcolor: '#1e293b', zerolinecolor: '#334155' },
          margin: { l: 45, r: 20, t: 10, b: 40 },
        }}
        config={{ displayModeBar: false, responsive: true }}
        className="h-[300px] w-full"
        useResizeHandler
      />
    </section>
  )
}

export default RelativeReturnChart
