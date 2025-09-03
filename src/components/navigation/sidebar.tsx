"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/workouts', label: 'Workouts' },
  { href: '/progress', label: 'Progress' },
  { href: '/nutrition', label: 'Nutrition' },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex md:flex-col w-56 border-r p-4 gap-2">
      <div className="text-lg font-semibold mb-4">FM</div>
      {links.map(l => {
        const active = pathname?.startsWith(l.href)
        return (
          <Link key={l.href} href={l.href} className={`px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${active ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>{l.label}</Link>
        )
      })}
    </aside>
  )
}
