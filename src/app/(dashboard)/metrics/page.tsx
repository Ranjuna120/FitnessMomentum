import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function MetricsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')
  const metrics = await prisma.bodyMetric.findMany({ where: { userId: (user as any).id }, orderBy: { recordedAt: 'desc' }, take: 40 })

  // Basic derived stats
  const latest = metrics[0]
  const avgWeight = metrics.length ? (metrics.reduce((a: number, m: any) => a + (m.weightKg || 0), 0) / metrics.filter((m: any)=>m.weightKg).length).toFixed(1) : '--'

  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_80%_25%,rgba(236,72,153,.45),transparent_60%),radial-gradient(circle_at_35%_80%,rgba(16,185,129,.40),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      {/* Header */}
      <div className="relative px-6 pt-10 pb-10 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,.08),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.06),transparent_70%)]" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Body Metrics</h1>
            <p className="text-sm text-indigo-100/80 max-w-xl">Track body composition changes over time.</p>
          </div>
          <Link href="/dashboard/metrics/new" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.03] transition">
            Add Metric
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-3 mt-8">
          <MetricStat label="Latest Weight" value={latest?.weightKg ? `${latest.weightKg} kg` : '--'} glow="from-indigo-500/30 to-indigo-700/30" />
            <MetricStat label="Avg Weight" value={avgWeight !== 'NaN' ? `${avgWeight} kg` : '--'} glow="from-emerald-500/30 to-teal-600/30" />
            <MetricStat label="Latest Body Fat" value={latest?.bodyFatPct ? `${latest.bodyFatPct}%` : '--'} glow="from-rose-500/30 to-pink-600/30" />
        </div>
      </div>

      {/* Table section */}
      <div className="px-6 pb-24 -mt-4 space-y-8 relative">
        <div className="flex items-center justify-between flex-wrap gap-3 text-indigo-50">
          <h2 className="text-lg font-semibold">Recent Entries</h2>
          {metrics.length > 0 && <Link href="/dashboard/metrics/new" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur">Add Another</Link>}
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <table className="w-full text-sm text-indigo-50/90">
            <thead className="text-[11px] uppercase tracking-wide text-indigo-100/60">
              <tr className="border-b border-white/10">
                <th className="text-left px-3 py-2 font-medium">Date</th>
                <th className="text-left px-3 py-2 font-medium">Weight (kg)</th>
                <th className="text-left px-3 py-2 font-medium">Body Fat %</th>
                <th className="text-left px-3 py-2 font-medium">Waist (cm)</th>
              </tr>
            </thead>
            <tbody>
              {metrics.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-indigo-100/60">No entries yet. Start tracking.</td></tr>
              )}
              {metrics.map((m: any, i: number) => (
                <tr key={m.id} className={`border-t border-white/5 hover:bg-white/[0.06] transition ${i % 2 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(m.recordedAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{m.weightKg ?? '-'}</td>
                  <td className="px-3 py-2">{m.bodyFatPct ?? '-'}</td>
                  <td className="px-3 py-2">{m.waistCm ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricStat({ label, value, glow }: { label: string; value: string; glow: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md">
      <p className="text-[10px] uppercase tracking-wide text-indigo-100/70">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-indigo-50">{value}</p>
      <div className={`absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br ${glow} blur-2xl`} />
    </div>
  )
}
