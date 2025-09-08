"use client";
import React, { useEffect, useState } from 'react'

type UnitSystem = 'METRIC' | 'IMPERIAL'

interface Prefs {
  unitSystem: UnitSystem
  heightCm?: number
  weightKg?: number
  goal?: string
}

export default function ProfilePreferencesCard() {
  const [prefs, setPrefs] = useState<Prefs>({ unitSystem: 'METRIC' })
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    // Load stubbed prefs (replace with API when backend ready)
    try {
      const raw = localStorage.getItem('fm_profile_prefs')
      if (raw) setPrefs({ ...prefs, ...(JSON.parse(raw) as Prefs) })
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = async () => {
    try {
      localStorage.setItem('fm_profile_prefs', JSON.stringify(prefs))
      setStatus('Saved')
    } catch {
      setStatus('Failed')
    } finally {
      setTimeout(() => setStatus(null), 1800)
    }
  }

  const input = "w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70"

  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Preferences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Unit system</span>
          <select className={input} value={prefs.unitSystem} onChange={e=>setPrefs(p=>({...p, unitSystem: e.target.value as UnitSystem}))}>
            <option value="METRIC">Metric (kg, cm)</option>
            <option value="IMPERIAL">Imperial (lb, in)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Goal</span>
          <input className={input} placeholder="e.g. Fat loss" value={prefs.goal ?? ''} onChange={e=>setPrefs(p=>({...p, goal: e.target.value}))} />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Height ({prefs.unitSystem==='METRIC' ? 'cm':'in'})</span>
          <input className={input} type="number" step="0.1" value={prefs.heightCm ?? ''} onChange={e=>setPrefs(p=>({...p, heightCm: parseFloat(e.target.value || '0')}))} />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Weight ({prefs.unitSystem==='METRIC' ? 'kg':'lb'})</span>
          <input className={input} type="number" step="0.1" value={prefs.weightKg ?? ''} onChange={e=>setPrefs(p=>({...p, weightKg: parseFloat(e.target.value || '0')}))} />
        </label>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={save} className="rounded-lg px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition">Save</button>
        {status && <span className="text-[11px] text-indigo-200/80">{status}</span>}
      </div>
      <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 blur-2xl" />
    </div>
  )
}
