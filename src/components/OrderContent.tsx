import { MenuItem, OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderContentProps = {
  order: OrderItem[]
  removeItem: (id: MenuItem['id']) => void
}

export default function OrderContent({ order, removeItem }: OrderContentProps) {
  return (
    <div className="max-h-[120px] overflow-y-auto no-scrollbar mb-stack-md flex flex-col gap-2">
      {order.map(item => (
        <div
          key={item.id}
          className="flex justify-between items-center py-2 border-b border-slate-700/50"
        >
          <div className="flex items-center gap-3">
            <div className="bg-surface-card rounded p-1">
              <span className="font-label-sm text-label-sm text-text-primary">{item.quantity}x</span>
            </div>
            <span className="font-body-md text-body-md text-text-primary">{item.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body-md text-body-md text-text-primary">{formatCurrency(item.price * item.quantity)}</span>
            <button
              className="text-destructive opacity-70 hover:opacity-100 hover:bg-destructive/10 p-1 rounded transition-colors"
              onClick={() => removeItem(item.id)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
