"use client"
import * as React from 'react'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    if (mq.matches) setTheme('dark')
  }, [])
  return (
    <div data-theme={theme} className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  )
}
