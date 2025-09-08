"use client";
import React, { useState } from 'react'

export default function DataPrivacyCard() {
  const [msg, setMsg] = useState<string | null>(null)

  const exportData = () => {
    try {
      const blob = new Blob([JSON.stringify({
        profile: JSON.parse(localStorage.getItem('fm_profile_prefs') || '{}'),
        appearance: JSON.parse(localStorage.getItem('fm_appearance') || '{}'),
        notifications: JSON.parse(localStorage.getItem('fm_notify_prefs') || '{}'),
        displayName: localStorage.getItem('fm_profile_display_name') || ''
      }, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'fitness-momentum-export.json'
      a.click()
      URL.revokeObjectURL(url)
      setMsg('Exported')
    } catch { setMsg('Failed') }
    finally { setTimeout(()=>setMsg(null),1600) }
  }

  const clearLocal = () => {
    try {
      localStorage.removeItem('fm_profile_prefs')
      localStorage.removeItem('fm_appearance')
      localStorage.removeItem('fm_notify_prefs')
      localStorage.removeItem('fm_profile_display_name')
      setMsg('Cleared local data')
    } catch { setMsg('Failed') }
    finally { setTimeout(()=>setMsg(null),1600) }
  }

  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Data & Privacy</h2>
      <p className="text-[12px] text-indigo-100/75">Manage your data. App currently stores some preferences locally in your browser.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
        <button onClick={exportData} className="rounded-lg px-4 py-2 font-medium text-white bg-white/10 hover:bg-white/20">Export (JSON)</button>
        <button onClick={clearLocal} className="rounded-lg px-4 py-2 font-medium text-white bg-rose-600/60 hover:bg-rose-600/80">Clear local prefs</button>
      </div>
      {msg && <p className="mt-2 text-[11px] text-indigo-200/80">{msg}</p>}
      <div className="absolute right-4 bottom-2 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/25 to-teal-500/25 blur-2xl" />
    </div>
  )
}
