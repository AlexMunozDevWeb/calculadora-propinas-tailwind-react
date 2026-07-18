import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[]
  tip: number
  placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
  const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount])
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tipAmount, subtotalAmount])

  return (
    <>
      <div className="flex justify-between items-end mb-stack-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-text-secondary">Subtotal: {formatCurrency(subtotalAmount)}</span>
          <span className="font-label-sm text-label-sm text-text-secondary">Propina ({(tip * 100).toFixed(0)}%): {formatCurrency(tipAmount)}</span>
        </div>
        <div className="text-right">
          <span className="font-label-sm text-label-sm text-text-secondary block">Total a Pagar</span>
          <span className="font-headline-lg-mobile text-headline-md-mobile text-primary">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <button
        className="w-full bg-primary hover:bg-primary/80 text-on-primary py-4 rounded-xl font-headline-md text-headline-sm shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        <span className="material-symbols-outlined">check_circle</span>
        Guardar Pedido
      </button>
    </>
  )
}
