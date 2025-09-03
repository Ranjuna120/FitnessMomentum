"use server"
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'
import { signupSchema } from '../../../lib/validators/signup'

export async function signupAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>
  const parsed = signupSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }
  const { email, password, name } = parsed.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { ok: false, errors: { email: ['Email already in use'] } }
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { email, passwordHash, name } })
  return { ok: true }
}