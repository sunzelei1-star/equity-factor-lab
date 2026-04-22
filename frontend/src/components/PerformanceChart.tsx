import Plot from 'react-plotly.js'
import type { EquityCurvePoint } from '../types'

type Props = {
  points: EquityCurvePoint[]
}

const PerformanceChart = ({ points }: Props) => {
  const dates = points.map((p) => p.date)

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/90 p-4 shadow-panel">
      <h3 className="mb-3 text-lg font-semibold">Strategy vs Benchmark</h3>
      <Plot
        data={[
          {
            x: dates,
            y: points.map((p) => p.strategy_value),
            type: 'scatter',
            mode: 'lines',
            name: 'Factor Strategy',
            line: { color: '#22d3ee', width: 3 },
          },
          {
            x: dates,
            y: points.map((p) => p.benchmark_value),
            type: 'scatter',
            mode: 'lines',
            name: 'Universe Benchmark',
            line: { color: '#94a3b8', width: 2 },
          },
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#cbd5e1' },
          xaxis: { gridcolor: '#1e293b' },
          yaxis: { gridcolor: '#1e293b' },
          legend: { orientation: 'h' },
          margin: { l: 45, r: 20, t: 10, b: 40 },
        }}
        config={{ displayModeBar: false, responsive: true }}
        className="h-[340px] w-full"
        useResizeHandler
      />
    </section>
  )
}

export default PerformanceChart
