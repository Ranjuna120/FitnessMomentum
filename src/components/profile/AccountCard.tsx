"use client";
import React from 'react'

export default function AccountCard({ email, name, provider }: { email: string; name: string; provider: string }) {
  const [displayName, setDisplayName] = React.useState<string>('')
  const [status, setStatus] = React.useState<string | null>(null)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('fm_profile_display_name')
      setDisplayName(raw ?? name)
    } catch {
      setDisplayName(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = () => {
    try {
      localStorage.setItem('fm_profile_display_name', displayName)
      setStatus('Saved')
    } catch {
      setStatus('Failed')
    } finally {
      setTimeout(() => setStatus(null), 1500)
    }
  }

  const input = 'w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70'

  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Account</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-indigo-100/80">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-indigo-100/70">Display name</span>
          <input className={input} value={displayName} onChange={e=>setDisplayName(e.target.value)} />
        </label>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-indigo-100/70">Email</span>
          <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">{email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-indigo-100/70">Provider</span>
          <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">{provider}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={save} className="rounded-lg px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition">Save</button>
        {status && <span className="text-[11px] text-indigo-200/80">{status}</span>}
      </div>
      <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-600/30 blur-2xl" />
    </div>
  )
}
