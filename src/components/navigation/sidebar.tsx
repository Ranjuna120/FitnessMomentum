"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/workouts', label: 'Workouts' },
  { href: '/dashboard/metrics', label: 'Metrics' },
  { href: '/dashboard/nutrition', label: 'Nutrition' },
  { href: '/dashboard/pricing', label: 'Pricing' },
  { href: '/dashboard/about', label: 'About' },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex md:flex-col w-56 p-5 gap-3 relative overflow-hidden rounded-r-xl">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_15%,rgba(99,102,241,.4),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,.35),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,.35),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 bg-[linear-gradient(120deg,rgba(255,255,255,.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.05)_50%,rgba(255,255,255,.05)_75%,transparent_75%,transparent)] bg-[length:28px_28px]" />
      <div className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">FM</div>
      <nav className="flex flex-col gap-1.5">
        {links.map(l => {
          const active = pathname === l.href || (l.href !== '/dashboard' && pathname.startsWith(l.href))
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative group rounded-lg px-3 py-2 text-[13px] font-medium tracking-wide transition overflow-hidden
                ${active ? 'text-white shadow-md bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:180%_180%] animate-[pulseGradient_8s_ease_infinite]' : 'text-indigo-100/60 hover:text-indigo-50 hover:bg-white/5'}
              `}
            >
              <span className="relative z-10 drop-shadow-sm">{l.label}</span>
              {active && <span className="absolute inset-0 -z-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.6),transparent_60%)]" />}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
