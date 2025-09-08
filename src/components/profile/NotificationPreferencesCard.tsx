"use client";
import React, { useEffect, useState } from 'react'

interface NotifyPrefs {
  weeklySummaryEmail: boolean
  workoutRemindersEmail: boolean
  mealRemindersEmail: boolean
}

const DEFAULT_PREFS: NotifyPrefs = {
  weeklySummaryEmail: false,
  workoutRemindersEmail: false,
  mealRemindersEmail: false,
}

export default function NotificationPreferencesCard() {
  const [prefs, setPrefs] = useState<NotifyPrefs>(DEFAULT_PREFS)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fm_notify_prefs')
      if (raw) setPrefs({ ...DEFAULT_PREFS, ...(JSON.parse(raw) as NotifyPrefs) })
    } catch {}
  }, [])

  const save = () => {
    try {
      localStorage.setItem('fm_notify_prefs', JSON.stringify(prefs))
      setMsg('Saved')
    } catch {
      setMsg('Failed')
    } finally {
      setTimeout(() => setMsg(null), 1600)
    }
  }

  const row = (id: keyof NotifyPrefs, label: string, hint: string) => (
    <label className="flex items-start justify-between gap-3 border border-white/10 bg-white/5 rounded-lg p-3">
      <div>
        <p className="text-[12px] text-white/90 font-medium">{label}</p>
        <p className="text-[11px] text-indigo-200/70">{hint}</p>
      </div>
      <input type="checkbox" className="mt-1 h-4 w-4" checked={prefs[id]} onChange={e=>setPrefs(p=>({...p, [id]: e.target.checked}))} />
    </label>
  )

  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Notifications</h2>
      <div className="grid gap-2">
        {row('weeklySummaryEmail', 'Weekly summary (email)', 'A digest of your workouts, metrics, and nutrition')}
        {row('workoutRemindersEmail', 'Workout reminders (email)', 'Gentle nudges to keep your streak')}
        {row('mealRemindersEmail', 'Meal reminders (email)', 'Daily reminders to log meals')}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={save} className="rounded-lg px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition">Save</button>
        {msg && <span className="text-[11px] text-indigo-200/80">{msg}</span>}
      </div>
      <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/25 to-orange-500/25 blur-2xl" />
    </div>
  )
}
