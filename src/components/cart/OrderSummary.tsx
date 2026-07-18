import { useMemo } from "react"
import { formatCurrency, formatPercent } from "../../helpers"
import type { OrderItem, Discount } from "../../types"

type OrderSummaryProps = {
  order: OrderItem[]
  tip: number
  discount: Discount | null
  subtotal: number
  discountAmount: number
  tipAmount: number
  total: number
  onPlaceOrder: () => void
}

export default function OrderSummary({ order, tip, discount, subtotal, discountAmount, tipAmount, total, onPlaceOrder }: OrderSummaryProps) {
  const totalItems = useMemo(() => order.reduce((sum, i) => sum + i.quantity, 0), [order])

  return (
    <>
      <div className="space-y-1 mb-stack-md">
        <div className="flex justify-between font-label-sm text-label-sm text-text-secondary">
          <span>Artículos ({totalItems})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount && (
          <div className="flex justify-between font-label-sm text-label-sm text-green-400">
            <span>Descuento ({discount.type === 'percentage' ? formatPercent(discount.value) : formatCurrency(discount.value)})</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        {tip > 0 && (
          <div className="flex justify-between font-label-sm text-label-sm text-text-secondary">
            <span>Propina ({formatPercent(tip)})</span>
            <span>{formatCurrency(tipAmount)}</span>
          </div>
        )}

        <div className="border-t border-white/5 pt-2 mt-2">
          <div className="flex justify-between items-end">
            <span className="font-label-sm text-label-sm text-text-secondary">Total a Pagar</span>
            <span className="font-headline-lg-mobile text-headline-md-mobile text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-primary hover:bg-primary/80 text-on-primary py-2 mb-2 rounded-xl font-headline-md text-headline-sm shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        disabled={total === 0}
        onClick={onPlaceOrder}
      >
        <span className="material-symbols-outlined">check_circle</span>
        Guardar Pedido
      </button>
    </>
  )
}
