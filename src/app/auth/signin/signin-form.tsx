"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) setError(res.error)
    else await signIn('credentials', { email, password, callbackUrl: '/dashboard' })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-72">
      <input className="border rounded px-3 py-2" type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border rounded px-3 py-2" type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button disabled={loading} className="bg-brand text-white rounded py-2 font-medium disabled:opacity-50">{loading ? 'Signing in...' : 'Sign In'}</button>
  <button type="button" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="border rounded py-2 font-medium">Continue with Google</button>
    </form>
  )
}
