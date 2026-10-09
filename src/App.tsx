import { Activity, Bell, ChevronDown, CloudSun, Droplets, Gauge, Leaf, MapPinned, RadioTower, Wind } from 'lucide-react'
import { FieldMap } from './components/Map/FieldMap'
import { CalibrationPanel } from './components/Calibration/CalibrationPanel'
import { SoilProfile } from './components/SoilProfiler/SoilProfile'
import { ZonePlanner } from './components/VRIPlanner/ZonePlanner'

const stats = [
  { icon: Droplets, label: 'Applied today', value: '14.8', unit: 'mm', note: '72% of target', color: 'text-sky-400' },
  { icon: Gauge, label: 'Mainline pressure', value: '42.8', unit: 'psi', note: 'Stable ±0.6', color: 'text-emerald-400' },
  { icon: Wind, label: 'Wind at pivot', value: '8.2', unit: 'km/h', note: 'ENE · application safe', color: 'text-amber-400' },
  { icon: Activity, label: 'System efficiency', value: '91.4', unit: '%', note: '+2.1% this cycle', color: 'text-violet-400' },
]

function App() {
  return (
    <div className="min-h-screen bg-hydrolab-900 text-slate-100">
      <header className="border-b border-hydrolab-border bg-hydrolab-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-hydrolab-900"><Leaf size={22} /></div><div><h1 className="text-lg font-bold">AquaMesh <span className="text-sky-400">VRI</span></h1><p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-500">Precision water intelligence</p></div></div>
          <div className="hidden items-center gap-2 rounded-xl border border-hydrolab-border bg-hydrolab-800 px-3 py-2 text-sm sm:flex"><MapPinned size={16} className="text-sky-400" /><span className="text-slate-400">Field</span><strong>Riverside North · 42.6 ha</strong><ChevronDown size={15} /></div>
          <div className="flex items-center gap-3"><span className="hidden items-center gap-2 text-xs text-emerald-400 md:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Live telemetry</span><button className="relative rounded-xl border border-hydrolab-border bg-hydrolab-800 p-2.5" aria-label="Notifications"><Bell size={18} /></button><div className="grid h-10 w-10 place-items-center rounded-xl bg-hydrolab-700 text-sm font-bold">JM</div></div>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-sky-400">Operations dashboard</p><h2 className="text-2xl font-bold sm:text-3xl">Good morning, Jordan</h2><p className="mt-2 text-sm text-slate-400">Pivot 04 is 68% through today’s irrigation prescription.</p></div><div className="flex items-center gap-3 rounded-xl border border-hydrolab-border bg-hydrolab-800 px-4 py-3"><CloudSun className="text-amber-400" /><div><p className="text-sm font-semibold">24°C · Partly cloudy</p><p className="text-xs text-slate-500">ET₀ 4.7 mm · Rain 8% chance</p></div></div></div>
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ icon: Icon, label, value, unit, note, color }) => <article key={label} className="rounded-2xl border border-hydrolab-border bg-hydrolab-800 p-5 shadow-panel"><div className="mb-4 flex justify-between"><span className="text-sm text-slate-400">{label}</span><Icon size={19} className={color} /></div><strong className="text-3xl">{value}</strong><span className="ml-1.5 text-sm text-slate-500">{unit}</span><p className="mt-2 text-xs text-slate-500">{note}</p></article>)}</section>
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,.7fr)]">
          <div className="overflow-hidden rounded-2xl border border-hydrolab-border bg-hydrolab-800 shadow-panel"><div className="flex flex-col justify-between gap-3 border-b border-hydrolab-border p-5 sm:flex-row"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-400">Live application map</p><h2 className="mt-1 text-lg font-semibold">Riverside North prescription</h2></div><div className="flex gap-3 text-xs"><span>● 18 mm</span><span className="text-sky-400">● 22 mm</span><span className="text-amber-400">● 12 mm</span></div></div><FieldMap /><div className="grid gap-3 border-t border-hydrolab-border p-4 sm:grid-cols-3"><div className="flex items-center gap-3 rounded-xl bg-hydrolab-900/55 p-3"><RadioTower size={18} className="text-emerald-400" /><div><p className="text-xs text-slate-500">Controller link</p><p className="text-sm font-semibold">Excellent · 98%</p></div></div><div className="rounded-xl bg-hydrolab-900/55 p-3"><p className="text-xs text-slate-500">Estimated completion</p><p className="text-sm font-semibold">16:42 · 2h 18m left</p></div><div className="rounded-xl bg-hydrolab-900/55 p-3"><p className="text-xs text-slate-500">Water remaining</p><p className="text-sm font-semibold">5,820 m³</p></div></div></div>
          <ZonePlanner />
        </section>
        <section className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"><CalibrationPanel /><SoilProfile /><div className="rounded-2xl border border-hydrolab-border bg-hydrolab-800 p-5 shadow-panel lg:col-span-2 xl:col-span-1"><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-400">Next operations</p><h2 className="mt-1 text-lg font-semibold">Irrigation schedule</h2><div className="mt-5 space-y-3">{[['Today · 14:20','Riverside North','Running'],['Tomorrow · 05:30','West Quarter','22 mm plan'],['Fri · 06:10','Creek South','Review required']].map(([time,field,status]) => <div key={field} className="flex justify-between border-b border-hydrolab-border pb-3"><div><p className="text-xs text-slate-500">{time}</p><p className="text-sm font-medium">{field}</p></div><span className="text-xs font-semibold text-sky-400">{status}</span></div>)}</div></div></section>
      </main>
    </div>
  )
}

export default App