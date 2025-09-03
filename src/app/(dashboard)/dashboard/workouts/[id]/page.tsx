import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export default async function WorkoutDetailPage({ params }: Props) {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')
  const session = await prisma.workoutSession.findUnique({
    where: { id: params.id },
    include: { sets: { include: { exercise: true }, orderBy: { setNumber: 'asc' } } }
  })
  if (!session || session.userId !== (user as any).id) redirect('/dashboard/workouts')
  // Fetch a list of exercises for the add-set form (limit to 50 for now)
  const exercises = await prisma.exercise.findMany({ orderBy: { name: 'asc' }, take: 50 })

  async function addSet(formData: FormData) {
    'use server'
    const exerciseId = formData.get('exerciseId')?.toString()
    const repsStr = formData.get('reps')?.toString()
    const weightStr = formData.get('weight')?.toString()
    if (!exerciseId || !repsStr) return
    const reps = parseInt(repsStr, 10)
    const weight = weightStr ? parseFloat(weightStr) : null
    if (isNaN(reps) || reps <= 0) return
    // Re-fetch session inside action to avoid stale closure and satisfy TS null safety
    const current = await prisma.workoutSession.findUnique({ where: { id: params.id } })
    if (!current || current.userId !== (user as any).id) return
    // Determine next set number for this exercise within this session
    const existingCount = await prisma.workoutSet.count({
      where: { workoutSessionId: current.id, exerciseId }
    })
    await prisma.workoutSet.create({
      data: {
        workoutSessionId: current.id,
        exerciseId,
        setNumber: existingCount + 1,
        reps,
        weight: weight ?? undefined
      }
    })
    redirect(`/dashboard/workouts/${current.id}`)
  }
  const started = new Date(session.startedAt).toLocaleString()
  return (
    <div className="relative w-full px-6 md:px-10 py-8 md:py-12">
      {/* Background field */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_18%,rgba(99,102,241,0.22),transparent_62%),radial-gradient(circle_at_88%_22%,rgba(236,72,153,0.22),transparent_62%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.22),transparent_68%)]" />
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="relative flex items-start justify-between flex-wrap gap-6 px-4 py-5 rounded-2xl">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-slate-900/30 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_-10px_rgba(0,0,0,0.5)]" />
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">Workout Session</h1>
            <p className="text-sm md:text-base text-white/85 font-medium">Started {started}</p>
          </div>
          <Link href="/dashboard/workouts" className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:250%_250%] hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/70 shadow-lg">Back</Link>
        </header>
        <section aria-labelledby="setsHeading" className="relative rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 md:p-8 space-y-6 shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_10px_50px_-10px_rgba(0,0,0,0.55)]">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/25 to-purple-500/25 blur-3xl" />
        <div className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-3xl" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <h2 id="setsHeading" className="font-semibold text-white tracking-wide text-lg">Sets</h2>
            <details className="group">
              <summary className="list-none inline-flex items-center rounded-full px-5 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 cursor-pointer bg-[length:250%_250%] hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/70 shadow">
                Add Set
              </summary>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
                {exercises.length === 0 && (
                  <p className="text-xs text-white/70">No exercises seeded yet. Create some first.</p>
                )}
                {exercises.length > 0 && (
                  <form action={addSet} className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr_auto] items-end">
                    <label className="flex flex-col gap-1 text-[11px] tracking-wide uppercase text-indigo-200/70">
                      <span>Exercise</span>
                      <select name="exerciseId" className="rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70">
                        {exercises.map((ex: any) => (
                          <option key={ex.id} value={ex.id}>{ex.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] tracking-wide uppercase text-indigo-200/70">
                      <span>Reps</span>
                      <input name="reps" type="number" min={1} required className="rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70" />
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] tracking-wide uppercase text-indigo-200/70">
                      <span>Weight</span>
                      <input name="weight" type="number" step="0.5" min={0} className="rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70" />
                    </label>
                    <button type="submit" className="h-[42px] rounded-lg px-6 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/70">
                      Save
                    </button>
                  </form>
                )}
              </div>
            </details>
          </div>
          <div className="relative overflow-x-auto rounded-xl border border-white/10 bg-slate-950/60 shadow-inner">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-indigo-50 text-[11px] uppercase tracking-wider bg-white/5">
                  <th className="text-left p-2 font-semibold">#</th>
                  <th className="text-left p-2 font-semibold">Exercise</th>
                  <th className="text-left p-2 font-semibold">Reps</th>
                  <th className="text-left p-2 font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody>
                {session.sets.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-xs text-white/60">No sets yet.</td>
                  </tr>
                )}
                {session.sets.map((s: any, idx: number) => (
                  <tr
                    key={s.id}
                    className={`border-t border-white/5 transition ${idx % 2 === 0 ? 'bg-white/3 hover:bg-white/10' : 'hover:bg-white/10'}`}
                  >
                    <td className="p-2 w-10 text-white font-medium">{s.setNumber}</td>
                    <td className="p-2 text-white/95">{s.exercise?.name || 'Exercise'}</td>
                    <td className="p-2 text-white/95">{s.reps}</td>
                    <td className="p-2 text-white/95">{s.weight ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary placeholder */}
          <div className="relative grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-indigo-200/60">Total Sets</p>
              <p className="text-lg font-semibold text-white">{session.sets.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-indigo-200/60">Unique Exercises</p>
              <p className="text-lg font-semibold text-white">{new Set(session.sets.map((s:any)=>s.exercise?.name)).size}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-indigo-200/60">Est. Volume</p>
              <p className="text-lg font-semibold text-white">{session.sets.reduce((acc:any,s:any)=>acc+(s.reps*(s.weight||0)),0)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
