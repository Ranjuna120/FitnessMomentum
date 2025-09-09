import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function createMetric(userId: string, formData: FormData) {
  const weight = formData.get('weightKg')?.toString();
  const bodyFat = formData.get('bodyFatPct')?.toString();
  const waist = formData.get('waistCm')?.toString();
  await prisma.bodyMetric.create({
    data: {
      userId,
      weightKg: weight ? parseFloat(weight) : null,
      bodyFatPct: bodyFat ? parseFloat(bodyFat) : null,
      waistCm: waist ? parseFloat(waist) : null
    }
  })
}

export default async function NewMetricPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')
  async function action(data: FormData) {
    'use server'
    await createMetric((user as any).id, data)
    redirect('/dashboard/metrics')
  }
  return (
    <div className="relative w-full min-h-[calc(100vh-0px)] overflow-hidden">
      {/* Full-page gradient background layer */}
      <div className="fixed inset-0 -z-40 bg-slate-950" />
      <div className="fixed inset-0 -z-30 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.35),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.35),transparent_65%)]" />
      {/* BodyMetrics1 background image layer */}
      <div className="fixed inset-0 z-[-15]">
        <Image src="/images/loading.jpg" alt="Body Metrics background" fill sizes="100vw" priority className="object-cover object-center opacity-55" />
      </div>
      <div className="fixed inset-0 -z-20 opacity-30 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[length:36px_36px]" />
      <div className="fixed inset-0 z-[-5] pointer-events-none backdrop-blur-[2px]" />
      {/* Background gradient panel */}
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 -z-20">
        <div className="mx-auto max-w-7xl h-full min-h-[560px] rounded-3xl bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.25),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.25),transparent_65%)] bg-slate-900/40 backdrop-blur-sm border border-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_-30px_rgba(0,0,0,0.6)]" />
      </div> */}
      <div className="relative p-6 md:p-12 max-w-5xl w-full mx-auto flex justify-center">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10" />
  <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_50px_-12px_rgba(0,0,0,0.55)]">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/25 to-purple-500/25 blur-3xl" />
        <div className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-3xl" />
        <div className="relative space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 drop-shadow">Add Body Metric</h1>
            <p className="text-base text-indigo-100/85 max-w-2xl">Capture a snapshot of your current stats to keep progress trends accurate. Bigger form for faster entry.</p>
          </div>
          <form action={action} className="space-y-10">
            <div className="grid gap-8 md:grid-cols-3">
              <label className="space-y-2 text-base font-medium tracking-wide">
                <span className="text-indigo-50">Weight (kg)</span>
                <input name="weightKg" type="number" step="0.1" placeholder="e.g. 72.4" className="w-full rounded-xl bg-white/10 border border-white/20 px-5 py-4 text-base text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70 focus:border-fuchsia-300/50 transition" />
              </label>
              <label className="space-y-2 text-base font-medium tracking-wide">
                <span className="text-indigo-50">Body Fat %</span>
                <input name="bodyFatPct" type="number" step="0.1" placeholder="e.g. 15.2" className="w-full rounded-xl bg-white/10 border border-white/20 px-5 py-4 text-base text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70 focus:border-fuchsia-300/50 transition" />
              </label>
              <label className="space-y-2 text-base font-medium tracking-wide">
                <span className="text-indigo-50">Waist (cm)</span>
                <input name="waistCm" type="number" step="0.1" placeholder="e.g. 82" className="w-full rounded-xl bg-white/10 border border-white/20 px-5 py-4 text-base text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70 focus:border-fuchsia-300/50 transition" />
              </label>
            </div>
            <div className="flex gap-4 pt-2">
              <button className="relative inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_8s_ease_infinite] shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/70" type="submit">Save Metric</button>
              <button formAction="/dashboard/metrics" formMethod="get" className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-medium text-indigo-50 bg-white/15 hover:bg-white/25 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60" type="submit">Cancel</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}
