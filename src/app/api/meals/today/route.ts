import { NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ meals: [] }, { status: 200 })

  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const rows: any[] = await prisma.$queryRaw`
    SELECT id, name, calories, protein, carbs, fats, consumed_at
    FROM "Meal"
    WHERE user_id = ${ (user as any).id }
      AND consumed_at >= ${ start }
      AND consumed_at <= ${ end }
    ORDER BY consumed_at ASC
  `
  const meals = rows.map(r => ({
    id: r.id,
    name: r.name,
    calories: r.calories,
    protein: r.protein,
    carbs: r.carbs,
    fats: r.fats,
    consumedAt: r.consumed_at,
  }))
  return NextResponse.json({ meals })
}
