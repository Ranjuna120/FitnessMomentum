import React from 'react'
import { getCurrentUser } from '../../../lib/auth'
import { DashboardNav } from '../../../components/navigation/dashboard-nav'
import Link from 'next/link'
import { SignOutButton } from '../../../components/navigation/signout-button'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden lg:flex flex-col relative p-5 gap-6 overflow-hidden">
        {/* Color layers */}
        <div className="absolute inset-0 -z-30 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,.35),transparent_60%),radial-gradient(circle_at_80%_25%,rgba(236,72,153,.28),transparent_60%),radial-gradient(circle_at_40%_85%,rgba(16,185,129,.30),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 backdrop-blur-xl" />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 bg-[linear-gradient(120deg,rgba(255,255,255,.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.05)_50%,rgba(255,255,255,.05)_75%,transparent_75%,transparent)] bg-[length:28px_28px]" />

        <div className="relative">
          <Link href="/dashboard" className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">FitnessMomentum</Link>
          <p className="text-[10px] mt-1 text-indigo-100/60 uppercase tracking-wide">Alpha</p>
        </div>
        <div className="relative">
          <DashboardNav />
        </div>
        <div className="mt-auto relative flex flex-col gap-4 text-xs text-indigo-100/70">
          {user && (
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur px-3 py-2 text-[11px] leading-tight">
              <p className="truncate text-indigo-50/90 font-medium">{user.email}</p>
              <p className="text-[10px] text-indigo-200/60 mt-1">Signed in</p>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-indigo-200/50">v0.1.0</span>
            <SignOutButton small />
          </div>
        </div>
      </aside>
  <div className="flex flex-col h-screen relative overflow-hidden">
        <header className="flex items-center justify-between gap-4 px-4 py-3 border-b/0 bg-gradient-to-r from-indigo-950/70 via-fuchsia-900/30 to-slate-900/60 backdrop-blur lg:hidden relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,.12),transparent_70%)]" />
          <Link href="/dashboard" className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300">FM</Link>
          <div className="flex items-center gap-3">
            <div className="text-[11px] text-indigo-100/70 max-w-[140px] truncate">{user?.email}</div>
            <SignOutButton small />
          </div>
        </header>
  <main className="flex-1 pt-0 lg:pt-0 relative overflow-y-auto overscroll-y-contain scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 pr-2">
    {/* Background layers for main content */}
    <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
    <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,.28),transparent_60%),radial-gradient(circle_at_80%_25%,rgba(236,72,153,.22),transparent_60%),radial-gradient(circle_at_40%_85%,rgba(16,185,129,.24),transparent_60%)]" />
    <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.08)_50%,rgba(255,255,255,.08)_75%,transparent_75%,transparent)] bg-[length:28px_28px]" />

    {/* Page content */}
    <div className="relative z-10">
      {children}
    </div>

    {/* gradient fade at bottom for nicer scroll end */}
    <div className="pointer-events-none h-16 -mt-16 sticky bottom-0 w-full bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
  </main>
      </div>
    </div>
  )
}
