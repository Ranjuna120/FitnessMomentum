import * as React from 'react'
// Use Slot from the dedicated radix slot package (was incorrectly imported from dropdown-menu)
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'brand' | 'outline' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', asChild, variant = 'brand', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'
    const variants: Record<string, string> = {
      brand: 'btn-brand',
      outline: 'btn-outline',
      ghost: 'px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10'
    }
    const padding = variant === 'brand' || variant === 'outline' ? '' : 'px-4 py-2'
    return (
      <Comp
        ref={ref as any}
        className={`${base} ${padding} ${variants[variant]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
