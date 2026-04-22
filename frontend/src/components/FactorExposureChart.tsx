import Plot from 'react-plotly.js'
import type { FactorExposurePoint } from '../types'

type Props = {
  points: FactorExposurePoint[]
}

const FactorExposureChart = ({ points }: Props) => {
  const dates = points.map((p) => p.date)

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/90 p-4 shadow-panel">
      <h3 className="mb-3 text-lg font-semibold">Average Factor Exposure (Selected Portfolio)</h3>
      <Plot
        data={[
          {
            x: dates,
            y: points.map((p) => p.momentum),
            type: 'scatter',
            mode: 'lines',
            name: 'Momentum',
            line: { color: '#22d3ee' },
          },
          {
            x: dates,
            y: points.map((p) => p.value),
            type: 'scatter',
            mode: 'lines',
            name: 'Value',
            line: { color: '#a78bfa' },
          },
          {
            x: dates,
            y: points.map((p) => p.size),
            type: 'scatter',
            mode: 'lines',
            name: 'Size',
            line: { color: '#f59e0b' },
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
        className="h-[320px] w-full"
        useResizeHandler
      />
    </section>
  )
}

export default FactorExposureChart
