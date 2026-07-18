export type Category = {
  id: number
  name: string
  icon: string
}

export type MenuItem = {
  id: number
  name: string
  price: number
  categoryId: number
}

export type OrderItem = MenuItem & {
  quantity: number
}

export type Discount = {
  type: 'percentage' | 'fixed'
  value: number
}

export type Table = {
  id: number
  name: string
}
