type CartHeaderProps = {
  title: string
  tableLabel: string
  itemCount: number
  onClick?: () => void
}

export default function CartHeader({ title, tableLabel, itemCount, onClick }: CartHeaderProps) {
  return (
    <div
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex justify-center py-2">
        <div className="w-12 h-1 bg-slate-600 rounded-full" />
      </div>
      <div className="flex justify-between items-center px-4 pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">shopping_cart</span>
          <span className="font-label-md text-label-md text-text-primary">
            {itemCount > 0 ? `${itemCount} artículo(s)` : title}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-text-secondary">{tableLabel}</span>
      </div>
    </div>
  )
}
