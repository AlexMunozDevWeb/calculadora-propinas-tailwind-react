import { useState } from "react"
import { tables } from "../../data/db"
import type { Table } from "../../types"

type TableSelectorProps = {
  selected: Table
  onSelect: (table: Table) => void
}

export default function TableSelector({ selected, onSelect }: TableSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-surface-card border border-white/5 rounded-xl px-3 py-2 font-label-md text-label-md text-text-primary hover:border-primary/30 transition-all cursor-pointer w-full"
      >
        <span className="material-symbols-outlined text-base text-primary">table_restaurant</span>
        <span className="flex-1 text-left">{selected.name}</span>
        <span className={`material-symbols-outlined text-base text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-high border border-white/5 rounded-xl shadow-xl z-40 overflow-hidden">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => { onSelect(table); setIsOpen(false) }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 font-label-md text-label-md transition-colors cursor-pointer text-left ${
                  table.id === selected.id
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-text-primary hover:bg-surface-hover/50'
                }`}
              >
                <span className="material-symbols-outlined text-base">table_restaurant</span>
                {table.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
