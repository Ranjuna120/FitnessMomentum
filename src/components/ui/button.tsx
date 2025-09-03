import * as React from 'react'
// Use Slot from the dedicated radix slot package (was incorrectly imported from dropdown-menu)
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref as any}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
