import { OrderItem } from "../../types"
import { formatCurrency } from "../../helpers"
import IconButton from "../ui/IconButton"

type CartItemProps = {
  item: OrderItem
  onUpdateQuantity: (id: number, delta: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-slate-700/50">
      <div className="bg-surface-card rounded p-1 min-w-[28px] text-center">
        <span className="font-label-sm text-label-sm text-text-primary">{item.quantity}x</span>
      </div>

      <div className="flex-1 min-w-0">
        <span className="font-body-md text-body-md text-text-primary block truncate">{item.name}</span>
        <span className="font-label-sm text-label-sm text-text-secondary">{formatCurrency(item.price)}</span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton icon="remove" onClick={() => onUpdateQuantity(item.id, -1)} />
        <span className="font-label-md text-label-md text-text-primary w-6 text-center">{item.quantity}</span>
        <IconButton icon="add" onClick={() => onUpdateQuantity(item.id, 1)} />
      </div>

      <span className="font-label-md text-label-md text-primary min-w-[60px] text-right">
        {formatCurrency(item.price * item.quantity)}
      </span>

      <IconButton icon="delete" variant="danger" onClick={() => onRemove(item.id)} label="Eliminar" />
    </div>
  )
}
