type BadgeProps = {
  label: string
  variant?: 'default' | 'primary' | 'surface'
  icon?: string
}

const badgeVariants = {
  default: 'bg-surface-hover text-text-secondary',
  primary: 'bg-primary-container text-on-primary-container',
  surface: 'bg-surface-card text-text-primary',
}

export default function Badge({ label, variant = 'default', icon }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-sm text-label-sm ${badgeVariants[variant]}`}>
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {label}
    </span>
  )
}
