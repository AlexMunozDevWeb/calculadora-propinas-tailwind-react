import { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary/80 shadow-lg shadow-emerald-900/20',
  secondary: 'border border-slate-700 text-text-primary hover:border-primary/50 hover:bg-surface-hover/50',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/50',
  danger: 'text-destructive hover:bg-destructive/10',
}

const sizes = {
  sm: 'px-2 py-1 text-label-sm',
  md: 'px-4 py-2 text-label-md',
  lg: 'px-6 py-4 text-headline-sm',
}

export default function Button({ children, onClick, variant = 'secondary', size = 'md', disabled, fullWidth, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl font-label-md transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
