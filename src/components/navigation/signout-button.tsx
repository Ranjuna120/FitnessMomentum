"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

interface Props { small?: boolean }

export function SignOutButton({ small }: Props) {
  const sizeClasses = small ? 'text-[11px] px-3 py-1.5 rounded-full' : 'text-sm px-4 py-2 rounded-full'
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`relative group overflow-hidden inline-flex items-center justify-center font-medium tracking-wide ${sizeClasses} text-white shadow transition
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        active:scale-[0.97]
      `}
    >
      {/* Animated gradient layer */}
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:260%_260%] animate-[pulseGradient_8s_ease_infinite]" />
      {/* Soft glow on hover */}
      <span className="absolute inset-0 -z-20 opacity-0 group-hover:opacity-100 blur-md transition bg-gradient-to-r from-indigo-500/50 via-fuchsia-500/50 to-emerald-500/50" />
      <span className="relative flex items-center gap-1">
        <span>Logout</span>
      </span>
    </button>
  )
}
