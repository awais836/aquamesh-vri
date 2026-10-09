import { Droplets } from 'lucide-react'

const layers = [
  { depth: '0–20 cm', type: 'Silt loam', moisture: 31, color: 'bg-sky-400' },
  { depth: '20–45 cm', type: 'Clay loam', moisture: 38, color: 'bg-emerald-400' },
  { depth: '45–80 cm', type: 'Sandy clay', moisture: 22, color: 'bg-amber-400' },
]

export function SoilProfile() {
  return (
    <section className="rounded-2xl border border-hydrolab-border bg-hydrolab-800 p-5 shadow-panel">
      <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-400">Probe AM-07</p><h2 className="mt-1 text-lg font-semibold">Root zone profile</h2></div><Droplets className="text-sky-400" size={20} /></div>
      <div className="space-y-4">
        {layers.map((layer) => (
          <div key={layer.depth}>
            <div className="mb-2 flex justify-between text-sm"><div><span className="font-medium text-slate-200">{layer.depth}</span><span className="ml-2 text-slate-500">{layer.type}</span></div><span className="font-mono text-slate-300">{layer.moisture}%</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-hydrolab-900"><div className={`h-full rounded-full ${layer.color}`} style={{ width: `${layer.moisture * 2}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-hydrolab-border pt-4 text-sm"><span className="text-slate-400">Available water</span><span className="font-semibold text-slate-100">64.2 mm</span></div>
    </section>
  )
}
