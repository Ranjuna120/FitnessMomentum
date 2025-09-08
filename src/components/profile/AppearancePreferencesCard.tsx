"use client";
import React, { useEffect, useState } from 'react'

type Theme = 'system' | 'dark' | 'light'

export default function AppearancePreferencesCard() {
  const [theme, setTheme] = useState<Theme>('system')
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fm_appearance')
      if (raw) {
        const obj = JSON.parse(raw) as any
        if (obj.theme) setTheme(obj.theme)
        if (obj.density) setDensity(obj.density)
      }
    } catch {}
  }, [])

  const save = () => {
    try {
      localStorage.setItem('fm_appearance', JSON.stringify({ theme, density }))
      setMsg('Saved')
    } catch { setMsg('Failed') }
    finally { setTimeout(()=>setMsg(null), 1600) }
  }

  const input = "w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70"

  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Appearance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Theme</span>
          <select className={input} value={theme} onChange={e=>setTheme(e.target.value as Theme)}>
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Density</span>
          <select className={input} value={density} onChange={e=>setDensity(e.target.value as any)}>
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={save} className="rounded-lg px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition">Save</button>
        {msg && <span className="text-[11px] text-indigo-200/80">{msg}</span>}
      </div>
      <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400/25 to-violet-500/25 blur-2xl" />
    </div>
  )
}
