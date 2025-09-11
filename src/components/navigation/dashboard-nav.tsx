"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/workouts', label: 'Workouts' },
  { href: '/dashboard/metrics', label: 'Metrics' },
  { href: '/dashboard/nutrition', label: 'Nutrition' },
  { href: '/dashboard/training', label: 'Training' },
  // { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard/about', label: 'About' },
  { href: '/dashboard/profile', label: 'Profile' },
]

export function DashboardNav() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1.5">
      {links.map(l => {
        const active = pathname === l.href || (l.href !== '/dashboard' && pathname.startsWith(l.href))
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`relative group rounded-lg px-3 py-2 text-[13px] font-medium tracking-wide transition overflow-hidden
              ${active
                ? 'text-white shadow-md bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:180%_180%] animate-[pulseGradient_8s_ease_infinite]'
                : 'text-indigo-100/60 hover:text-indigo-50 hover:bg-white/5'}
            `}
          >
            <span className="relative z-10 drop-shadow-sm">{l.label}</span>
            {active && (
              <span className="absolute inset-0 -z-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.6),transparent_60%)]" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
