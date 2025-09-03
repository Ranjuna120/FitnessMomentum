import { getCurrentUser } from '../../../lib/auth'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back{user?.name ? `, ${user.name}` : ''}.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border p-4">
          <h2 className="font-medium">Streak</h2>
          <p className="text-2xl font-bold">0 days</p>
        </div>
        <div className="rounded-md border p-4">
          <h2 className="font-medium">Total Volume (7d)</h2>
          <p className="text-2xl font-bold">--</p>
        </div>
        <div className="rounded-md border p-4">
          <h2 className="font-medium">Recent PRs</h2>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
      </section>
      <div className="rounded-md border p-4">
        <h2 className="font-medium mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="#" className="px-3 py-1.5 rounded-md bg-brand text-white text-sm">Log Workout</Link>
          <Link href="#" className="px-3 py-1.5 rounded-md border text-sm">Add Body Metric</Link>
        </div>
      </div>
    </div>
  )
}
