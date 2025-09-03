import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../lib/auth'
import SignupForm from './signup-form'

export default async function SignupPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <h1 className="text-3xl font-semibold">Create Account</h1>
      <SignupForm />
      <p className="text-sm text-muted-foreground">Already have an account? <a href="/auth/signin" className="underline">Sign in</a></p>
    </div>
  )
}