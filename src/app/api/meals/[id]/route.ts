import { NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const id = params.id
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.$executeRaw`DELETE FROM "Meal" WHERE id = ${id} AND user_id = ${ (user as any).id }`
  return NextResponse.json({ ok: true })
}
