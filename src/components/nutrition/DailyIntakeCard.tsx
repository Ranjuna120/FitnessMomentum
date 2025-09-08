"use client";
import React, { useEffect, useMemo, useState } from 'react'

interface MealItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  time: string
}

interface MacroTargets { calories: number; protein: number; carbs: number; fats: number }

export function DailyIntakeCard({ targets }: { targets: MacroTargets }) {
  const [items, setItems] = useState<MealItem[]>([])
  const [showForm, setShowForm] = useState(false)

  // Load today's meals from API
  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch('/api/meals/today', { cache: 'no-store' })
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        if (!active) return
        const mapped: MealItem[] = (data.meals || []).map((m: any) => ({
          id: m.id,
          name: m.name,
          calories: m.calories,
          protein: m.protein,
          carbs: m.carbs,
          fats: m.fats,
          time: new Date(m.consumedAt).toLocaleTimeString(),
        }))
        setItems(mapped)
      } catch {
        // ignore - keep empty
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const addItem = async (data: Omit<MealItem, 'id' | 'time'>) => {
    // Optimistic append
    setShowForm(false)
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
      })
      if (!res.ok) throw new Error('failed')
      const { meal } = await res.json()
      const item: MealItem = {
        id: meal.id,
        name: meal.name,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        time: new Date(meal.consumedAt).toLocaleTimeString(),
      }
      setItems(prev => [...prev, item])
    } catch {
      // fallback to local add if API fails
      const item: MealItem = { ...data, id: crypto.randomUUID(), time: new Date().toLocaleTimeString() }
      setItems(prev => [...prev, item])
    }
  }

  const totals = useMemo(() => items.reduce((acc, cur) => {
    acc.calories += cur.calories
    acc.protein += cur.protein
    acc.carbs += cur.carbs
    acc.fats += cur.fats
    return acc
  }, { calories:0, protein:0, carbs:0, fats:0 }), [items])

  const pct = (val: number, target: number) => target ? Math.min(100, Math.round((val/target)*100)) : 0

  const Bar = ({ value, target, label, color }: { value: number; target: number; label: string; color: string }) => (
    <div>
      <div className="flex justify-between text-[10px] uppercase tracking-wide text-indigo-200/70 mb-1">
        <span>{label}</span><span>{value}{label==='Calories'? ' kcal':'g'} / {target}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: pct(value, target)+'%' }} />
      </div>
    </div>
  )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/65 backdrop-blur-xl p-5 flex flex-col gap-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_40px_-12px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-wide text-white">Today&apos;s Intake</h3>
        <button onClick={() => setShowForm(s=>!s)} className="text-[11px] px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition">{showForm? 'Close':'Add'}</button>
      </div>
      <div className="grid gap-4">
        <Bar value={totals.calories} target={targets.calories} label="Calories" color="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />
        <Bar value={totals.protein} target={targets.protein} label="Protein" color="bg-indigo-500" />
        <Bar value={totals.carbs} target={targets.carbs} label="Carbs" color="bg-fuchsia-500" />
        <Bar value={totals.fats} target={targets.fats} label="Fats" color="bg-emerald-500" />
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] text-indigo-100/85">
        <span className="rounded-full bg-white/10 px-3 py-1">Remaining: <strong>{Math.max(0, targets.calories - totals.calories)}</strong> kcal</span>
        <span className="rounded-full bg-white/10 px-3 py-1">P: <strong>{Math.max(0, targets.protein - totals.protein)}</strong> g</span>
        <span className="rounded-full bg-white/10 px-3 py-1">C: <strong>{Math.max(0, targets.carbs - totals.carbs)}</strong> g</span>
        <span className="rounded-full bg-white/10 px-3 py-1">F: <strong>{Math.max(0, targets.fats - totals.fats)}</strong> g</span>
      </div>
      <div
        aria-expanded={showForm}
        className={`transition-[max-height,opacity] duration-300 ease-out ${showForm ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        {showForm && <MealForm onAdd={addItem} />}
      </div>
      <div className="max-h-56 overflow-auto rounded-lg border border-white/10 bg-white/5">
        <table className="w-full text-xs">
          <thead className="bg-white/10 text-[10px] uppercase tracking-wide text-indigo-200/80">
            <tr>
              <th className="text-left p-2 font-semibold">Time</th>
              <th className="text-left p-2 font-semibold">Food</th>
              <th className="text-left p-2 font-semibold">Cal</th>
              <th className="text-left p-2 font-semibold">P</th>
              <th className="text-left p-2 font-semibold">C</th>
              <th className="text-left p-2 font-semibold">F</th>
              <th className="p-2" />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={7} className="p-4 text-center text-[11px] text-white/60">No meals logged yet.</td></tr>
            )}
            {items.map(i => (
              <tr key={i.id} className="border-t border-white/10 hover:bg-white/10">
                <td className="p-2 text-white/90 whitespace-nowrap">{i.time}</td>
                <td className="p-2 text-white/90">{i.name}</td>
                <td className="p-2 text-white/90">{i.calories}</td>
                <td className="p-2 text-white/90">{i.protein}</td>
                <td className="p-2 text-white/90">{i.carbs}</td>
                <td className="p-2 text-white/90">{i.fats}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={async () => {
                      const id = i.id
                      setItems(prev => prev.filter(x => x.id !== id))
                      try {
                        await fetch(`/api/meals/${id}`, { method: 'DELETE' })
                      } catch {}
                    }}
                    aria-label="Delete meal"
                    className="text-[10px] px-2 py-1 rounded border border-rose-400/30 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 hover:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition"
                  >Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-indigo-200/60">Prototype meal logging – data resets if you clear browser storage.</p>
    </div>
  )
}

function MealForm({ onAdd }: { onAdd: (d: { name: string; calories: number; protein: number; carbs: number; fats: number }) => void }) {
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' })
  const input = "w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70";
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    onAdd({
      name: form.name,
      calories: parseFloat(form.calories || '0'),
      protein: parseFloat(form.protein || '0'),
      carbs: parseFloat(form.carbs || '0'),
      fats: parseFloat(form.fats || '0')
    })
    setForm({ name: '', calories: '', protein: '', carbs: '', fats: '' })
  }
  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_repeat(5,1fr)_auto] gap-2 bg-white/5 p-3 rounded-lg border border-white/10 text-[11px] items-end">
      <label className="flex flex-col gap-1 uppercase tracking-wide text-indigo-100">
        <span>Food</span>
        <input placeholder="e.g. Oats & milk" className={input} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
      </label>
      <label className="flex flex-col gap-1 uppercase tracking-wide text-indigo-100">
        <span>Cal</span>
        <input type="number" step="1" placeholder="kcal" className={input} value={form.calories} onChange={e=>setForm(f=>({...f,calories:e.target.value}))} />
      </label>
      <label className="flex flex-col gap-1 uppercase tracking-wide text-indigo-100">
        <span>P</span>
        <input type="number" step="0.1" placeholder="g" className={input} value={form.protein} onChange={e=>setForm(f=>({...f,protein:e.target.value}))} />
      </label>
      <label className="flex flex-col gap-1 uppercase tracking-wide text-indigo-100">
        <span>C</span>
        <input type="number" step="0.1" placeholder="g" className={input} value={form.carbs} onChange={e=>setForm(f=>({...f,carbs:e.target.value}))} />
      </label>
      <label className="flex flex-col gap-1 uppercase tracking-wide text-indigo-100">
        <span>F</span>
        <input type="number" step="0.1" placeholder="g" className={input} value={form.fats} onChange={e=>setForm(f=>({...f,fats:e.target.value}))} />
      </label>
      <button type="submit" className="h-10 md:h-[42px] rounded-lg px-4 md:px-6 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 transition sm:col-span-2 md:col-span-1">Add</button>
    </form>
  )
}
