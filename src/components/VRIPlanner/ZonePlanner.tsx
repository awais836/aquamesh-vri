import { CloudRain, Play } from 'lucide-react'

const zones = [
  { name: 'North Bench', rate: '18 mm', share: 76, color: 'bg-emerald-400', status: 'Nominal' },
  { name: 'Central Loam', rate: '22 mm', share: 92, color: 'bg-sky-400', status: 'Priority' },
  { name: 'South Clay', rate: '12 mm', share: 50, color: 'bg-amber-400', status: 'Restricted' },
]

export function ZonePlanner() {
  return (
    <section className="rounded-2xl border border-hydrolab-border bg-hydrolab-800 p-5 shadow-panel">
      <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-400">Prescription 04</p><h2 className="mt-1 text-lg font-semibold">Variable rate plan</h2></div><CloudRain className="text-sky-400" size={20} /></div>
      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.name}>
            <div className="mb-2 flex items-end justify-between"><div><p className="text-sm font-medium text-slate-200">{zone.name}</p><p className="text-xs text-slate-500">{zone.status}</p></div><span className="font-mono text-sm font-semibold">{zone.rate}</span></div>
            <div className="h-1.5 rounded-full bg-hydrolab-900"><div className={`h-full rounded-full ${zone.color}`} style={{ width: `${zone.share}%` }} /></div>
          </div>
        ))}
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/15 transition hover:bg-sky-400"><Play size={16} fill="currentColor" /> Deploy prescription</button>
    </section>
  )
}
