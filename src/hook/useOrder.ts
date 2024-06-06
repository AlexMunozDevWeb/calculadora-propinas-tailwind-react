import { useState } from "react"
import type { OrderItem } from "../types"

export const useOrder = () => {

  const [order, setOrder] = useState<OrderItem[]>([])
  //No hace falta el uso de generic useState<number>(0)
  const [total, setTotal] = useState(0)
  const [auth, setAuth] = useState(false)

  return (
 
  )
}
