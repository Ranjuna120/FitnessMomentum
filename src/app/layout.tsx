import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FitnessMomentum',
  description: 'Track workouts and progress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + ' min-h-screen bg-background antialiased'}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
