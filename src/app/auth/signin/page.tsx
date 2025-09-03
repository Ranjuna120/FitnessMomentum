import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../lib/auth'
import SignInForm from './signin-form'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
      <SignInForm />
    </div>
  )
}
