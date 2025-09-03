import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

export const dynamic = 'force-dynamic'

async function createEmptySession(userId: string) {
  return prisma.workoutSession.create({ data: { userId } })
}

export default async function NewWorkoutPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')
  const session = await createEmptySession((user as any).id)
  redirect(`/dashboard/workouts/${session.id}`)
}
