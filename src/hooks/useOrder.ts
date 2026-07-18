import { useState, useCallback } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = useCallback((item: MenuItem) => {
      setOrder(prevOrder => {
        const itemExist = prevOrder.find(orderItem => orderItem.id === item.id)
        if (itemExist) {
          return prevOrder.map(orderItem =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          )
        }
        return [...prevOrder, { ...item, quantity: 1 }]
      })
    }, [])

    const removeItem = useCallback((id: MenuItem['id']) => {
      setOrder(prevOrder => prevOrder.filter(item => item.id !== id))
    }, [])

    const placeOrder = useCallback(() => {
      setOrder([])
      setTip(0)
    }, [])

    return {
      order,
      tip,
      setTip,
      addItem,
      removeItem,
      placeOrder
    }
}
