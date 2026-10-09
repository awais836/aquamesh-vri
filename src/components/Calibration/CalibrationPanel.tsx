import { Gauge, Radio, RotateCw } from 'lucide-react'

export function CalibrationPanel() {
  const rows = [
    { icon: Gauge, label: 'Pressure transducer', value: '42.8 psi', meta: '+0.3 offset' },
    { icon: Radio, label: 'Flow meter pulse', value: '1.02×', meta: 'verified' },
    { icon: RotateCw, label: 'Pivot alignment', value: '0.4°', meta: 'within spec' },
  ]

  return (
    <section className="rounded-2xl border border-hydrolab-border bg-hydrolab-800 p-5 shadow-panel">
      <div className="mb-5 flex items-center justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-400">System health</p><h2 className="mt-1 text-lg font-semibold">Calibration</h2></div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">Current</span>
      </div>
      <div className="space-y-3">
        {rows.map(({ icon: Icon, label, value, meta }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-hydrolab-900/55 p-3">
            <div className="rounded-lg bg-sky-500/10 p-2 text-sky-400"><Icon size={17} /></div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm text-slate-300">{label}</p><p className="text-xs text-slate-500">{meta}</p></div>
            <span className="font-mono text-sm font-semibold text-slate-100">{value}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-xl border border-hydrolab-border py-2.5 text-sm font-semibold text-sky-300 transition hover:bg-hydrolab-700">Run calibration check</button>
    </section>
  )
}
