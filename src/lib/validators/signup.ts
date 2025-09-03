import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, 'Name required').max(60).optional(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 chars').max(100),
  confirm: z.string().min(6)
}).refine(d => d.password === d.confirm, { path: ['confirm'], message: 'Passwords do not match' })

export type SignupInput = z.infer<typeof signupSchema>