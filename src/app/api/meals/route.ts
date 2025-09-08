import { NextResponse } from 'next/server'
import { getCurrentUser } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, calories, protein, carbs, fats, consumedAt } = body || {}
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

  const payload = {
    name: String(name),
    calories: Math.max(0, Math.round(Number(calories) || 0)),
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fats: Number(fats) || 0,
    consumedAt: consumedAt ? new Date(consumedAt) : new Date(),
    userId: (user as any).id,
  }

  const inserted: any[] = await prisma.$queryRaw`
    INSERT INTO "Meal" (id, user_id, name, calories, protein, carbs, fats, consumed_at, created_at, updated_at)
    VALUES (${crypto.randomUUID()}, ${payload.userId}, ${payload.name}, ${payload.calories}, ${payload.protein}, ${payload.carbs}, ${payload.fats}, ${payload.consumedAt}, ${new Date()}, ${new Date()})
    RETURNING id, name, calories, protein, carbs, fats, consumed_at
  `
  const row = inserted[0]
  const meal = {
    id: row.id,
    name: row.name,
    calories: row.calories,
    protein: row.protein,
    carbs: row.carbs,
    fats: row.fats,
    consumedAt: row.consumed_at,
  }
  return NextResponse.json({ meal }, { status: 201 })
}
