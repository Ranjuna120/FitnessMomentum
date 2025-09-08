"use client"
import React, { useMemo, useState } from 'react'

type Sex = 'male' | 'female'
type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'very'
type Goal = 'maintenance' | 'fat_loss' | 'muscle_gain'

const activityFactors: Record<ActivityKey, { label: string; factor: number }> = {
  sedentary: { label: 'Sedentary (little/no exercise)', factor: 1.2 },
  light: { label: 'Light (2-3x/week)', factor: 1.375 },
  moderate: { label: 'Moderate (3-5x/week)', factor: 1.55 },
  very: { label: 'Very active (6-7x/week)', factor: 1.725 },
}

export default function BmrPlannerCard() {
  const [sex, setSex] = useState<Sex>('male')
  const [age, setAge] = useState<string>('22')
  const [weight, setWeight] = useState<string>('70') // kg
  const [height, setHeight] = useState<string>('175') // cm
  const [activity, setActivity] = useState<ActivityKey>('moderate')
  const [goal, setGoal] = useState<Goal>('maintenance')
  // Tuning knobs
  const [proteinPerKg, setProteinPerKg] = useState<string>('1.8') // g/kg
  const [fatPercent, setFatPercent] = useState<string>('0.25') // 20% - 30%

  const numbers = {
    age: Math.max(0, Math.floor(Number(age) || 0)),
    weight: Math.max(0, Number(weight) || 0),
    height: Math.max(0, Number(height) || 0),
  }

  const { bmr, tdee, targets, diet } = useMemo(() => {
    const bmrVal =
      sex === 'male'
        ? 10 * numbers.weight + 6.25 * numbers.height - 5 * numbers.age + 5
        : 10 * numbers.weight + 6.25 * numbers.height - 5 * numbers.age - 161
    const tdeeVal = bmrVal * activityFactors[activity].factor
    const maintenance = Math.round(tdeeVal)
    const fatLossLow = Math.round(tdeeVal - 500)
    const fatLossHigh = Math.round(tdeeVal - 300)
    const gainLow = Math.round(tdeeVal + 200)
    const gainHigh = Math.round(tdeeVal + 400)

    let suggested: { label: string; value: string }
    let calorieTarget: number
    if (goal === 'fat_loss') suggested = { label: 'Fat loss target', value: `${fatLossLow}–${fatLossHigh} kcal` }
    else if (goal === 'muscle_gain') suggested = { label: 'Muscle gain target', value: `${gainLow}–${gainHigh} kcal` }
    else suggested = { label: 'Maintenance target', value: `${maintenance} kcal` }

    // Choose a mid-point for a concrete plan
    if (goal === 'fat_loss') calorieTarget = Math.round(tdeeVal - 400)
    else if (goal === 'muscle_gain') calorieTarget = Math.round(tdeeVal + 300)
    else calorieTarget = Math.round(tdeeVal)

    // Macro planning
    const pPerKg = Math.min(2.2, Math.max(1.4, Number(proteinPerKg) || 1.8))
    const fatPct = Math.min(0.3, Math.max(0.2, Number(fatPercent) || 0.25))
    let proteinG = Math.round(numbers.weight * pPerKg)
    let fatG = Math.round((calorieTarget * fatPct) / 9)
    let carbsG = Math.round((calorieTarget - (proteinG * 4 + fatG * 9)) / 4)
    if (carbsG < 0) {
      // If carbs go negative, lower fat to 20% and recalc
      fatG = Math.round((calorieTarget * 0.2) / 9)
      carbsG = Math.max(0, Math.round((calorieTarget - (proteinG * 4 + fatG * 9)) / 4))
    }

    // Per-meal splits (percent of grams)
    const splits = [
      { key: 'breakfast', label: 'Breakfast', p: 0.20, c: 0.22, f: 0.22, tips: ['Oats + milk', 'Banana', 'Peanut butter', 'Eggs'] },
      { key: 'snack1', label: 'Mid-morning', p: 0.10, c: 0.10, f: 0.15, tips: ['Greek yogurt', 'Nuts', 'Fruit'] },
      { key: 'lunch', label: 'Lunch', p: 0.25, c: 0.25, f: 0.20, tips: ['Brown rice/roti', 'Chicken/fish/tofu', 'Salad'] },
      { key: 'pre', label: 'Pre-workout', p: 0.10, c: 0.18, f: 0.05, tips: ['Banana/sweet potato', 'Coffee (opt)'] },
      { key: 'post', label: 'Post-workout', p: 0.20, c: 0.18, f: 0.03, tips: ['Whey/eggs/chicken', 'Banana/dates'] },
      { key: 'dinner', label: 'Dinner', p: 0.15, c: 0.07, f: 0.15, tips: ['Grilled protein', 'Quinoa/roti', 'Veggies'] },
    ]
    const perMeal = splits.map(s => ({
      label: s.label,
      protein: Math.round(proteinG * s.p),
      carbs: Math.round(carbsG * s.c),
      fats: Math.round(fatG * s.f),
      tips: s.tips,
    }))

    return {
      bmr: Math.round(bmrVal),
      tdee: Math.round(tdeeVal),
      targets: {
        maintenance,
        fatLoss: `${fatLossLow}–${fatLossHigh}`,
        gain: `${gainLow}–${gainHigh}`,
        suggested,
      },
      diet: {
        calories: calorieTarget,
        macros: { protein: proteinG, carbs: carbsG, fats: fatG },
        perMeal,
      },
    }
  }, [sex, numbers.age, numbers.height, numbers.weight, activity, goal, proteinPerKg, fatPercent])

  const input =
    'w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-4 text-indigo-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-wide">BMR Planner</h3>
      </div>

  <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Sex</span>
          <select className={input} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Age (years)</span>
          <input className={input} inputMode="numeric" type="number" min={0} value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Weight (kg)</span>
          <input className={input} inputMode="decimal" type="number" step="0.1" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Height (cm)</span>
          <input className={input} inputMode="decimal" type="number" step="0.1" min={0} value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Activity</span>
          <select className={input} value={activity} onChange={(e) => setActivity(e.target.value as ActivityKey)}>
            {Object.entries(activityFactors).map(([key, v]) => (
              <option key={key} value={key}>{v.label} × {v.factor}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
          <span>Goal</span>
          <select className={input} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
            <option value="maintenance">Maintenance</option>
            <option value="fat_loss">Fat loss</option>
            <option value="muscle_gain">Muscle gain</option>
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-3">
          <details className="rounded-lg border border-white/10 bg-white/5 p-3">
            <summary className="text-[11px] uppercase tracking-wide text-indigo-100 cursor-pointer select-none">Advanced (protein & fat tuning)</summary>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
                <span>Protein (g/kg)</span>
                <input className={input} type="number" step="0.1" min={1.4} max={2.2} value={proteinPerKg} onChange={(e) => setProteinPerKg(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-[11px] uppercase tracking-wide text-indigo-100">
                <span>Fat (% calories)</span>
                <input className={input} type="number" step="0.01" min={0.2} max={0.3} value={fatPercent} onChange={(e) => setFatPercent(e.target.value)} />
              </label>
            </div>
          </details>
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="BMR" value={`${bmr} kcal`} glow="from-indigo-500/30 to-indigo-700/30" />
        <Stat label="TDEE" value={`${tdee} kcal`} glow="from-fuchsia-500/30 to-pink-700/30" />
        <Stat label={targets.suggested.label} value={targets.suggested.value} glow="from-emerald-500/30 to-teal-700/30" />
      </div>

      <div className="grid gap-2 text-[12px] text-indigo-100/85">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
          <span>Maintenance</span>
          <span className="font-semibold">{targets.maintenance} kcal</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
          <span>Fat loss</span>
          <span className="font-semibold">{targets.fatLoss} kcal</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
          <span>Muscle gain</span>
          <span className="font-semibold">{targets.gain} kcal</span>
        </div>
      </div>
      <p className="text-[11px] text-indigo-200/70">Estimates based on Mifflin–St Jeor; adjust as needed for real-world response.</p>

      {/* Generated Diet Plan */}
      <div className="mt-2">
        <h4 className="text-sm font-semibold mb-2">Your Daily Diet Plan</h4>
        <div className="mb-3 text-[12px] text-indigo-100/85 flex flex-wrap gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1">Target: <strong>{diet.calories}</strong> kcal</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Protein: <strong>{diet.macros.protein}</strong> g</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Carbs: <strong>{diet.macros.carbs}</strong> g</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Fats: <strong>{diet.macros.fats}</strong> g</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {diet.perMeal.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <h5 className="text-[13px] font-medium">{m.label}</h5>
                <div className="text-[11px] text-indigo-100/80">
                  <span className="mr-2">P {m.protein}g</span>
                  <span className="mr-2">C {m.carbs}g</span>
                  <span>F {m.fats}g</span>
                </div>
              </div>
              <ul className="mt-2 list-disc pl-5 text-[12px] text-indigo-100/80">
                {m.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-indigo-200/70">Adjust portions to hit the macros shown.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, glow }: { label: string; value: string; glow: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md">
      <p className="text-[10px] uppercase tracking-wide text-indigo-100/70">{label}</p>
      <p className="text-xl font-semibold mt-1 text-indigo-50">{value}</p>
      <div className={`absolute right-2 top-2 w-16 h-16 rounded-full bg-gradient-to-br ${glow} blur-2xl`} />
    </div>
  )
}
