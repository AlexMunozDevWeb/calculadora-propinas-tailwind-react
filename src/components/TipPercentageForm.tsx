import type { Dispatch, SetStateAction } from "react"

const tipOptions = [
  { id: 'tip-10', value: 0.10, label: '10%' },
  { id: 'tip-20', value: 0.20, label: '20%' },
  { id: 'tip-50', value: 0.50, label: '50%' },
]

type TipPercentageFormProps = {
  setTip: Dispatch<SetStateAction<number>>
  tip: number
}

export default function TipPercentageForm({ setTip, tip }: TipPercentageFormProps) {
  return (
    <div className="mb-stack-md">
      <p className="font-label-sm text-label-sm text-text-secondary mb-2 uppercase tracking-wider">Propina Sugerida</p>
      <div className="grid grid-cols-3 gap-2">
        {tipOptions.map(tipOption => (
          <button
            key={tipOption.id}
            className={`py-2 rounded-lg font-label-md transition-all ${
              tipOption.value === tip
                ? 'bg-primary-container text-on-primary-container scale-105 shadow-md border-none'
                : 'border border-slate-700 text-text-primary hover:border-primary/50'
            }`}
            onClick={() => setTip(tipOption.value)}
          >
            {tipOption.label}
          </button>
        ))}
      </div>
    </div>
  )
}
