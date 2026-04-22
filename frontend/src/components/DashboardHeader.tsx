const DashboardHeader = () => {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800 bg-panel/90 p-6 shadow-panel">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Recruiter Demo · Quant Product</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl">Equity Factor Lab</h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-400 md:text-base">
        A portfolio-ready factor investing web app featuring configurable strategy research, transparent analytics,
        and polished dashboard storytelling for finance and business analytics portfolios.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
          <p className="text-xs uppercase text-slate-400">Use Case</p>
          <p className="text-sm font-semibold text-slate-100">Systematic Equity Screening</p>
        </article>
        <article className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
          <p className="text-xs uppercase text-slate-400">Data Source</p>
          <p className="text-sm font-semibold text-slate-100">Deterministic Local Sample Data</p>
        </article>
        <article className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
          <p className="text-xs uppercase text-slate-400">Primary Output</p>
          <p className="text-sm font-semibold text-slate-100">Factor vs Benchmark Performance</p>
        </article>
      </div>
    </header>
  )
}

export default DashboardHeader
