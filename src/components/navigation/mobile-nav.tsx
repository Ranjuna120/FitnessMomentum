"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/log', label: 'Log' },
  { href: '/progress', label: 'Progress' },
  { href: '/profile', label: 'Profile' },
]

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around border-t bg-white dark:bg-gray-900 py-2">
      {links.map(l => {
        const active = pathname === l.href
        return (
          <Link key={l.href} href={l.href} className={`text-xs flex flex-col items-center gap-1 ${active ? 'text-brand font-medium' : 'text-gray-500'}`}>{l.label}</Link>
        )
      })}
    </nav>
  )
}
