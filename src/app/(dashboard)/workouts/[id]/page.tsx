import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
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
  const started = new Date(session.startedAt).toLocaleString()
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Workout Session</h1>
          <p className="text-sm text-muted-foreground">Started {started}</p>
        </div>
        <Link href="/dashboard/workouts" className="btn-outline text-sm">Back</Link>
      </div>
      <div className="card space-y-4">
        <h2 className="font-medium">Sets</h2>
        {session.sets.length === 0 && <p className="text-sm text-muted-foreground">No sets yet.</p>}
        <ul className="space-y-2">
          {session.sets.map((s: any) => (
            <li key={s.id} className="text-sm flex items-center justify-between border rounded px-3 py-2">
              <span>{s.exercise?.name || 'Exercise'} • Set {s.setNumber}</span>
              <span className="text-muted-foreground">{s.reps} reps{s.weight ? ` @ ${s.weight}` : ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
