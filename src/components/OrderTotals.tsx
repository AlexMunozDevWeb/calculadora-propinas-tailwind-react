import { useMemo, useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number
}

export default function OrderTotals({order, tip} : OrderTotalsProps) {

  // Solo se ejecuta useMemo cuando la dependencia cambie
  const subtotalAmount = useCallback(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order] )
  const tipAmount = useCallback( () => subtotalAmount() * tip, [tip, order])
  const totalAmount = useCallback( () => subtotalAmount() + tipAmount(), [tip, order])

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina:</h2>
        <p>
          Subtotal a pagar: {''}
          <span className="font-bold">{formatCurrency(subtotalAmount())}</span>
        </p>
        <p>
          Propina a pagar: {''}
          <span className="font-bold">{formatCurrency(tipAmount())}</span>
        </p>
        <p>
          Total a pagar: {''}
          <span className="font-bold">{formatCurrency(totalAmount())}</span>
        </p>
      </div>

      <button></button>
    </>
  )
}
