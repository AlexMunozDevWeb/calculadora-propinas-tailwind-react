import { useState } from "react"
import type { Discount } from "../../types"

type DiscountInputProps = {
  discount: Discount | null
  onApply: (discount: Discount | null) => void
}

export default function DiscountInput({ discount, onApply }: DiscountInputProps) {
  const [type, setType] = useState<'percentage' | 'fixed'>(discount?.type ?? 'percentage')
  const [value, setValue] = useState(discount?.value ? String(discount.value * (discount.type === 'percentage' ? 100 : 1)) : '')

  const apply = () => {
    const num = parseFloat(value)
    if (isNaN(num) || num <= 0) {
      onApply(null)
      return
    }
    onApply({ type, value: type === 'percentage' ? num / 100 : num })
  }

  const clear = () => {
    setValue('')
    onApply(null)
  }

  return (
    <div className="mb-stack-md">
      <p className="font-label-sm text-label-sm text-text-secondary mb-2 uppercase tracking-wider">Descuento</p>
      <div className="flex gap-2">
        <div className="flex rounded-lg border border-white/5 overflow-hidden">
          <button
            onClick={() => setType('percentage')}
            className={`px-2 py-1 font-label-sm text-label-sm transition-colors cursor-pointer ${type === 'percentage' ? 'bg-primary-container text-on-primary-container' : 'text-text-secondary hover:bg-surface-hover/50'
              }`}
          >
            %
          </button>
          <button
            onClick={() => setType('fixed')}
            className={`px-2 py-1 font-label-sm text-label-sm transition-colors cursor-pointer ${type === 'fixed' ? 'bg-primary-container text-on-primary-container' : 'text-text-secondary hover:bg-surface-hover/50'
              }`}
          >
            €
          </button>
        </div>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={apply}
          onKeyDown={e => e.key === 'Enter' && apply()}
          placeholder={type === 'percentage' ? 'Ej: 10' : 'Ej: 50'}
          className="flex-1 bg-surface-card border border-white/5 rounded-lg px-3 py-1.5 font-label-md text-label-md text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 transition-all"
        />
        {discount && (
          <button
            onClick={clear}
            className="text-text-secondary hover:text-destructive transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>
    </div>
  )
}
