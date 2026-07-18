import { useState, useCallback, useMemo } from "react"
import type { MenuItem, OrderItem, Discount, Table } from "../types"

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [tip, setTip] = useState(0)
  const [discount, setDiscount] = useState<Discount | null>(null)
  const [table, setTable] = useState<Table>({ id: 4, name: 'Mesa 4' })
  const [orderNotes, setOrderNotes] = useState('')

  const addItem = useCallback((item: MenuItem) => {
    setOrder(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: MenuItem['id']) => {
    setOrder(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: MenuItem['id'], delta: number) => {
    setOrder(prev => {
      return prev.reduce<OrderItem[]>((acc, item) => {
        if (item.id !== id) return [...acc, item]
        const newQty = item.quantity + delta
        if (newQty <= 0) return acc
        return [...acc, { ...item, quantity: newQty }]
      }, [])
    })
  }, [])

  const subtotal = useMemo(() =>
    order.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [order]
  )

  const discountAmount = useMemo(() => {
    if (!discount) return 0
    if (discount.type === 'percentage') return subtotal * discount.value
    return discount.value
  }, [subtotal, discount])

  const tipAmount = useMemo(() => (subtotal - discountAmount) * tip, [subtotal, discountAmount, tip])
  const total = useMemo(() => subtotal - discountAmount + tipAmount, [subtotal, discountAmount, tipAmount])

  const totalItems = useMemo(() => order.reduce((sum, item) => sum + item.quantity, 0), [order])

  const placeOrder = useCallback(() => {
    setOrder([])
    setTip(0)
    setDiscount(null)
    setOrderNotes('')
  }, [])

  return {
    order,
    tip,
    setTip,
    discount,
    setDiscount,
    table,
    setTable,
    orderNotes,
    setOrderNotes,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    tipAmount,
    total,
    totalItems,
    placeOrder,
  }
}
