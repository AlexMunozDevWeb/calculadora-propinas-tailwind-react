type IconButtonProps = {
  icon: string
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
  label?: string
}

const iconVariants = {
  primary: 'bg-primary-container text-on-primary-container hover:bg-primary-container/80',
  danger: 'text-destructive hover:bg-destructive/10',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/50',
}

const iconSizes = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
}

export default function IconButton({ icon, onClick, variant = 'ghost', size = 'sm', disabled, label }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        rounded-lg flex items-center justify-center transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${iconVariants[variant]} ${iconSizes[size]}
      `}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
    </button>
  )
}
