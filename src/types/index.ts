
export type MenuItem = {
  id: number,
  name: string,
  price: number,
}

//Cogemos todo lo que tenemos en MenuItem y se lo asignamos a OrderItem
export type OrderItem = MenuItem & {
  quantity: number,
}