"use client";
import React, { useEffect, useState } from 'react'

interface MacroTargets {
  calories: number
  protein: number
  carbs: number
  fats: number
}

const DEFAULT_TARGETS: MacroTargets = { calories: 2000, protein: 130, carbs: 220, fats: 70 }

export function MacroTargetsCard() {
  const [targets, setTargets] = useState<MacroTargets>(DEFAULT_TARGETS)
  const [editing, setEditing] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('fm_macro_targets')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') setTargets(prev => ({ ...prev, ...parsed }))
      }
    } catch { /* ignore */ }
  }, [])

  const save = () => {
    localStorage.setItem('fm_macro_targets', JSON.stringify(targets))
    setEditing(false)
  }

  const reset = () => {
    setTargets(DEFAULT_TARGETS)
    try { localStorage.setItem('fm_macro_targets', JSON.stringify(DEFAULT_TARGETS)) } catch {}
  }

  const inputClasses = "rounded-lg bg-slate-950/60 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/65 backdrop-blur-xl p-5 flex flex-col gap-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_40px_-12px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-wide text-white">Macro Targets</h3>
          <p className="text-[11px] text-indigo-200/70 mt-0.5">Set your daily goals. These power progress bars and suggestions.</p>
        </div>
        {!editing && (
          <div className="flex items-center gap-2">
            <button onClick={reset} className="text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white/80 transition">Reset</button>
            <button onClick={() => setEditing(true)} className="text-[11px] px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition">Edit</button>
          </div>
        )}
      </div>
      {!editing && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([
            ['Calories', targets.calories, 'kcal'],
            ['Protein', targets.protein, 'g'],
            ['Carbs', targets.carbs, 'g'],
            ['Fats', targets.fats, 'g']
          ] as const).map(([label, value, unit]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-indigo-200/70">{label}</p>
              <p className="text-lg font-semibold text-white">
                {value}
                <span className="text-xs font-normal text-white/60 ml-1">{unit}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {editing && (
        <form onSubmit={e => { e.preventDefault(); save(); }} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <label className="flex flex-col gap-1 text-[10px] tracking-wide uppercase text-indigo-200/70">
            <span>Calories</span>
            <input type="number" className={inputClasses} value={targets.calories} onChange={e => setTargets(t => ({ ...t, calories: parseInt(e.target.value||'0',10) }))} />
          </label>
          <label className="flex flex-col gap-1 text-[10px] tracking-wide uppercase text-indigo-200/70">
            <span>Protein</span>
            <input type="number" className={inputClasses} value={targets.protein} onChange={e => setTargets(t => ({ ...t, protein: parseInt(e.target.value||'0',10) }))} />
          </label>
            <label className="flex flex-col gap-1 text-[10px] tracking-wide uppercase text-indigo-200/70">
              <span>Carbs</span>
              <input type="number" className={inputClasses} value={targets.carbs} onChange={e => setTargets(t => ({ ...t, carbs: parseInt(e.target.value||'0',10) }))} />
            </label>
            <label className="flex flex-col gap-1 text-[10px] tracking-wide uppercase text-indigo-200/70">
              <span>Fats</span>
              <input type="number" className={inputClasses} value={targets.fats} onChange={e => setTargets(t => ({ ...t, fats: parseInt(e.target.value||'0',10) }))} />
            </label>
          <div className="flex gap-2 col-span-full">
            <button type="submit" className="rounded-lg px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg px-5 py-2 text-sm font-medium text-white/80 bg-white/10 hover:bg-white/20">Cancel</button>
          </div>
        </form>
      )}
      <p className="text-[11px] text-indigo-200/60">(Temporary local storage – backend integration coming soon)</p>
    </div>
  )
}
