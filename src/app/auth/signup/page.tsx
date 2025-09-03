import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../lib/auth'
import SignupForm from './signup-form'
import Link from 'next/link'

export default async function SignupPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_18%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.55),transparent_60%),radial-gradient(circle_at_45%_85%,rgba(16,185,129,.50),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 opacity-25 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.08)_50%,rgba(255,255,255,.08)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />

      <div className="relative w-full max-w-sm">
        <div className="relative rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-7 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_40px_-10px_rgba(0,0,0,0.55)]">
          <div className="absolute -right-14 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-emerald-500/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-2xl" />
          <div className="relative flex flex-col gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300">Create Account</h1>
              <p className="text-xs text-indigo-100/70">Start tracking workouts, metrics & progress.</p>
            </div>
            <SignupForm />
            <p className="text-xs text-indigo-100/70 text-center">Already have an account?{' '}<Link href="/auth/signin" className="font-medium text-indigo-200 hover:text-fuchsia-200 underline underline-offset-4">Sign in</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}