import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight">FitnessMomentum</h1>
      <p className="text-lg text-muted-foreground max-w-xl">Track workouts, monitor progress, and stay consistent with a clean, fast dashboard. Phase 1 focuses on core logging & metrics.</p>
      <div className="flex gap-4">
        <Link href="/auth/signin" className="px-5 py-2 rounded-md bg-brand text-white font-medium">Sign In</Link>
        <Link href="/pricing" className="px-5 py-2 rounded-md border border-border">Pricing</Link>
      </div>
    </main>
  )
}
