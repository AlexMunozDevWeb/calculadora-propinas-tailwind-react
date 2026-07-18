import { MenuItem } from "../../types"
import { formatCurrency } from "../../helpers"

type MenuItemCardProps = {
  item: MenuItem
  onAdd: (item: MenuItem) => void
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <button
      className="bg-surface-card rounded-lg p-4 border border-white/5 shadow-sm hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center text-center w-full"
      onClick={() => onAdd(item)}
    >
      <div className="w-14 h-14 rounded-full bg-surface mb-3 flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl text-text-secondary">restaurant</span>
      </div>
      <h3 className="font-label-md text-label-sm text-text-primary mb-1 leading-tight">{item.name}</h3>
      <p className="font-label-md text-label-sm text-primary">{formatCurrency(item.price)}</p>
    </button>
  )
}
