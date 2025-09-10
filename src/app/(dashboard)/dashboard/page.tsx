import { getCurrentUser } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    // Protected by middleware, but keep a safety net
    return null
  }

  // Fetch recent workout sessions and latest body metric
  const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const sessions = await prisma.workoutSession.findMany({
    where: { userId: (user as any).id, startedAt: { gte: since30 } },
    orderBy: { startedAt: 'desc' },
    include: { sets: true }
  })
  const latestMetric = await prisma.bodyMetric.findFirst({
    where: { userId: (user as any).id },
    orderBy: { recordedAt: 'desc' }
  })

  // Compute simple, robust stats without assuming set schema beyond length
  const sessions30d = sessions.length
  const sets7d = sessions.filter(s => new Date(s.startedAt) >= since7).reduce((a: number, s: any) => a + s.sets.length, 0)

  // Streak: count consecutive days (including today) with at least one session
  const dayKeys = new Set(
    sessions.map(s => new Date(s.startedAt)).map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString())
  )
  let streak = 0
  for (let i = 0; i < 90; i++) {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - i)
    const key = d.toISOString()
    if (dayKeys.has(key)) streak++
    else break
  }

  const latestWeightVal = latestMetric?.weightKg
  const latestWeight = typeof latestWeightVal === 'number' ? `${latestWeightVal} kg` : '--'

  return (
    <div className="relative min-h-screen">
      {/* Layered colorful background similar vibe to workouts */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.45),transparent_60%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,.40),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      {/* Header / hero */}
      <div className="relative px-6 pt-10 pb-12 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,.08),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.06),transparent_70%)]" />
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Dashboard</h1>
            <p className="text-sm text-indigo-100/85 max-w-xl">Welcome back{user?.name ? `, ${user.name}` : ''}. Here's a quick snapshot of your training momentum.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Streak" value={`${streak} day${streak === 1 ? '' : 's'}`} gradient="from-indigo-500/30 to-fuchsia-600/30" glow="from-indigo-500/40 to-indigo-700/40" />
            <StatCard label="Sets (7d)" value={`${sets7d}`} gradient="from-emerald-500/25 to-teal-600/30" glow="from-emerald-500/40 to-teal-700/40" />
            <StatCard label="Sessions (30d)" value={`${sessions30d}`} gradient="from-rose-500/25 to-pink-600/30" glow="from-rose-500/40 to-pink-700/40" />
            <StatCard label="Latest Weight" value={latestWeight} gradient="from-amber-500/25 to-orange-600/30" glow="from-amber-500/40 to-orange-700/40" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 pb-24 -mt-4 space-y-10 relative">
        {/* Recent Highlights placeholder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 text-indigo-50">
            <h2 className="text-lg font-semibold">Highlights</h2>
            <span className="text-[11px] px-2 py-1 rounded-full bg-white/10 backdrop-blur">Beta</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md text-indigo-50 text-sm min-h-[120px] flex items-center justify-center opacity-70">Coming soon</div>
            <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md text-indigo-50 text-sm min-h-[120px] flex items-center justify-center opacity-70">Progress charts</div>
            <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md text-indigo-50 text-sm min-h-[120px] flex items-center justify-center opacity-70">PR timeline</div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 p-6 backdrop-blur-md">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-3xl" />
          <div className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
          <h2 className="font-medium mb-4 text-indigo-50 flex items-center gap-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <GradientAction href="/dashboard/workouts/new" text="Log Workout" gradient="from-indigo-500 via-fuchsia-500 to-emerald-500" />
            <OutlineAction href="/dashboard/metrics/new" text="Add Body Metric" />
            <OutlineAction href="/dashboard/workouts" text="View Workouts" />
            <OutlineAction href="/dashboard/metrics" text="View Metrics" />
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value, gradient, glow }: { label: string; value: string; gradient: string; glow: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md group">
      <p className="text-[10px] uppercase tracking-wide text-indigo-100/70">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-indigo-50">{value}</p>
      <div className={`absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br ${glow} blur-2xl opacity-70`} />
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${gradient} transition`} />
    </div>
  )
}

function GradientAction({ href, text, gradient }: { href: string; text: string; gradient: string }) {
  return (
    <Link
      href={href}
      className={`relative text-[12px] md:text-sm shadow-lg inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white bg-gradient-to-r ${gradient} bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition`}
    >
      <span className="relative">{text}</span>
    </Link>
  )
}

function OutlineAction({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-[12px] md:text-sm rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium"
    >
      {text}
    </Link>
  )
}
