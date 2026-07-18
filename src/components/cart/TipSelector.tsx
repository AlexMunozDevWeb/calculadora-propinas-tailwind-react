import { Dispatch, SetStateAction, useState } from "react"
import { formatPercent } from "../../helpers"

const tipOptions = [
  { id: 'tip-10', value: 0.10, label: '10%' },
  { id: 'tip-15', value: 0.15, label: '15%' },
  { id: 'tip-20', value: 0.20, label: '20%' },
  { id: 'tip-50', value: 0.50, label: '50%' },
]

type TipSelectorProps = {
  tip: number
  setTip: Dispatch<SetStateAction<number>>
}

export default function TipSelector({ tip, setTip }: TipSelectorProps) {
  const [customValue, setCustomValue] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  const selectOption = (value: number) => {
    setIsCustom(false)
    setCustomValue('')
    setTip(value)
  }

  return (
    <div className="mb-stack-md">
      <p className="font-label-sm text-label-sm text-text-secondary mb-2 uppercase tracking-wider">Propina</p>
      <div className="grid grid-cols-3 gap-2">
        {tipOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => selectOption(opt.value)}
            className={`py-2 rounded-lg font-label-md transition-all cursor-pointer ${
              opt.value === tip && !isCustom
                ? 'bg-primary-container text-on-primary-container scale-105 shadow-md'
                : 'border border-slate-700 text-text-primary hover:border-primary/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="number"
          min="0"
          max="100"
          value={isCustom ? customValue : ''}
          onChange={e => {
            setCustomValue(e.target.value)
            setIsCustom(true)
            const num = parseFloat(e.target.value)
            if (!isNaN(num) && num >= 0) setTip(num / 100)
          }}
          onFocus={() => setIsCustom(true)}
          placeholder="Otra %"
          className={`flex-1 bg-surface-card border rounded-lg px-3 py-2 font-label-md text-label-md text-text-primary placeholder:text-text-secondary/50 focus:outline-none transition-all ${
            isCustom ? 'border-primary/50 ring-1 ring-primary/30' : 'border-white/5'
          }`}
        />
        {isCustom && customValue && (
          <span className="flex items-center font-label-md text-label-md text-primary">
            {formatPercent(tip)}
          </span>
        )}
      </div>
    </div>
  )
}
