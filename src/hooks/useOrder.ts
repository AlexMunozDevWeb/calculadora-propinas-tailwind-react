import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])

    const addItem = (item : MenuItem) => {
      //No le especificamos el tipo porque se lo colocamos en el generic del state <OrderItem[]>([])
      const newItem = {...item, quantity: 1}
      setOrder([...order, newItem])
      
    }

    console.log(order);
    
    return {
        addItem,
    }
}