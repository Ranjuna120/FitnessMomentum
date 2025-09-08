import React from 'react'
import Link from 'next/link'
import { MacroTargetsCard } from '../../../../components/nutrition/MacroTargetsCard'
import { DailyIntakeCard } from '../../../../components/nutrition/DailyIntakeCard'
import NextDynamic from 'next/dynamic'

const BmrPlannerCard = NextDynamic(() => import('../../../../components/nutrition/BmrPlannerCard'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function NutritionPage() {
  // Placeholder data until nutrition features implemented
  const upcoming = [
    { id: 1, title: 'Macro Targets', status: 'Planned' },
    { id: 2, title: 'Meal Logging', status: 'Planned' },
    { id: 3, title: 'Recipe Suggestions', status: 'Planned' }
  ]

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_80%_25%,rgba(236,72,153,.45),transparent_60%),radial-gradient(circle_at_35%_80%,rgba(16,185,129,.40),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      <div className="relative px-6 pt-10 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,.08),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.06),transparent_70%)]" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Nutrition</h1>
            <p className="text-sm text-indigo-100/80 max-w-xl">Upcoming tools for tracking your meals, macros and fueling performance.</p>
          </div>
          <Link href="/dashboard" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">Back</Link>
        </div>
      </div>

      <div className="px-6 pb-24 -mt-4 space-y-12 relative">
        {/* Macro + Intake */}
        <section className="grid gap-8 lg:grid-cols-2">
          <MacroTargetsCard />
          <DailyIntakeCard targets={{ calories: 2000, protein: 130, carbs: 220, fats: 70 }} />
        </section>
        <section>
          <BmrPlannerCard />
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-50">Roadmap</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map(item => (
              <div key={item.id} className="relative overflow-hidden rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md text-indigo-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur">{item.status}</span>
                </div>
                <p className="text-xs text-indigo-100/70">Feature coming soon.</p>
                <div className="absolute right-2 top-2 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-600/25 blur-2xl" />
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-indigo-50">Planned Integrations</h2>
          <ul className="text-sm text-indigo-100/80 list-disc pl-5 space-y-1">
            <li>Persist macro targets & meals in database (per-user)</li>
            <li>Barcode scanning & food database lookup (USDA / OpenFoodFacts)</li>
            <li>AI meal suggestions based on remaining macros</li>
            <li>Recipe builder with automatic macro breakdown</li>
            <li>Export weekly nutrition summaries</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
