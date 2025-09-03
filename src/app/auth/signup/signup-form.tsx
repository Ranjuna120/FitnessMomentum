"use client"
import { useState, useTransition } from 'react'
import { signupAction } from './actions'

export default function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const [pending, start] = useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    start(() => {
      setErrors({}); setSuccess(false)
      signupAction(new FormData(form)).then(res => {
        if (!res.ok) setErrors(res.errors || {})
        else {
          setSuccess(true)
          setTimeout(() => { window.location.href = '/auth/signin' }, 800)
        }
      })
    })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-80">
      <input name="name" placeholder="Name" className="border rounded px-3 py-2" />
      <input name="email" type="email" required placeholder="Email" className="border rounded px-3 py-2" />
      {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
      <input name="password" type="password" required placeholder="Password" className="border rounded px-3 py-2" />
      <input name="confirm" type="password" required placeholder="Confirm Password" className="border rounded px-3 py-2" />
      {errors.confirm && <p className="text-sm text-red-500">{errors.confirm[0]}</p>}
      {success && <p className="text-sm text-green-600">Account created. Redirecting…</p>}
      <button disabled={pending} className="bg-brand text-white rounded py-2 font-medium disabled:opacity-50">{pending ? 'Creating...' : 'Create Account'}</button>
    </form>
  )
}