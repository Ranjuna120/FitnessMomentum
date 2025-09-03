import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function WorkoutsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')
  const sessions = await prisma.workoutSession.findMany({
    where: { userId: (user as any).id },
    orderBy: { startedAt: 'desc' },
    take: 15,
    include: { sets: true }
  })
  // Simple stats
  const totalSessions = sessions.length
  const totalSetsAll = sessions.reduce((a: number, s: any) => a + s.sets.length, 0)
  const lastSessionDate = sessions[0] ? new Date(sessions[0].startedAt).toLocaleDateString() : '--'

  const gradients = [
    'from-indigo-500 to-violet-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-sky-500 to-cyan-600',
    'from-fuchsia-500 to-purple-600'
  ]

  return (
    <div className="relative min-h-screen">
      {/* Global animated gradient background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.45),transparent_60%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,.40),transparent_65%)]" />
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 opacity-95" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      {/* Hero / header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,.08),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.06),transparent_70%)]" />
        <div className="px-6 pt-10 pb-12 md:pb-16 flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Workouts</h1>
              <p className="text-sm text-indigo-100/80 max-w-xl">Your recent training sessions and quick performance snapshot.</p>
            </div>
            <Link href="/dashboard/workouts/new" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.03] transition">
              <span className="relative">Start New Session</span>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-wide text-indigo-100/70">Total Sessions</p>
              <p className="text-2xl font-semibold mt-1 text-indigo-50">{totalSessions}</p>
              <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-indigo-700/30 blur-2xl" />
            </div>
            <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-wide text-emerald-100/70">Total Sets</p>
              <p className="text-2xl font-semibold mt-1 text-emerald-50">{totalSetsAll}</p>
              <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 blur-2xl" />
            </div>
            <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-wide text-rose-100/70">Last Session</p>
              <p className="text-2xl font-semibold mt-1 text-rose-50">{lastSessionDate}</p>
              <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/30 blur-2xl" />
            </div>
          </div>
        </div>
      </div>

  <div className="px-6 pb-24 -mt-6 space-y-8 relative">
        <div className="flex items-center justify-between flex-wrap gap-3 text-indigo-50">
          <h2 className="text-lg font-semibold">Recent Sessions</h2>
          {sessions.length > 0 && <Link href="/dashboard/workouts/new" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur">Quick Start</Link>}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sessions.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-white/20 text-sm text-indigo-100/70 text-center py-10 bg-white/5 backdrop-blur">No sessions yet. Start your first workout.</div>
          )}
          {sessions.map((s: any, i: number) => {
            const totalSets = s.sets.length
            const date = new Date(s.startedAt).toLocaleDateString()
            const grad = gradients[i % gradients.length]
            return (
              <Link
                key={s.id}
                href={`/dashboard/workouts/${s.id}`}
                className={`relative group rounded-xl p-4 text-white shadow hover:shadow-2xl transition border border-white/10 bg-gradient-to-br ${grad} overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.25),transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-black/30 transition" />
                <div className="flex items-start justify-between gap-3 relative">
                  <span className="font-medium">Session</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">{date}</span>
                </div>
                <p className="text-sm mt-3 opacity-90 relative">{totalSets} sets • {s.notes ? s.notes.slice(0, 42) : 'No notes'}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
