// importamos el tipo
import type { MenuItem } from "../types"

// Crea el tipado
type MenuItemProps = {
  item: MenuItem
}

// Y por último declaramos que item es de tipo MenuItemProps
export default function MenuItem({item} : MenuItemProps ) {
  return (
    <button
      className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
    >
      <p>{item.name}</p>
      <p className="font-black">{item.price}€</p>
    </button>
  )
}
