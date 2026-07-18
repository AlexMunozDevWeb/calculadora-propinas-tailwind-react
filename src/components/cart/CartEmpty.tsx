type CartEmptyProps = {
  message?: string
}

export default function CartEmpty({ message = 'Agrega artículos del menú' }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <span className="material-symbols-outlined text-4xl text-text-secondary/30">shopping_cart</span>
      <p className="text-center text-text-secondary text-label-md">{message}</p>
    </div>
  )
}
