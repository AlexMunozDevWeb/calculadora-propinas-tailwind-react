import { categories } from "../../data/db"

type CategoryFilterProps = {
  selected: number | null
  onSelect: (id: number | null) => void
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-1 px-3 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
          selected === null
            ? 'bg-primary-container text-on-primary-container shadow-md'
            : 'bg-surface-card text-text-secondary border border-white/5 hover:border-primary/30'
        }`}
      >
        <span className="material-symbols-outlined text-base">apps</span>
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
            selected === cat.id
              ? 'bg-primary-container text-on-primary-container shadow-md'
              : 'bg-surface-card text-text-secondary border border-white/5 hover:border-primary/30'
          }`}
        >
          <span className="material-symbols-outlined text-base">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  )
}
