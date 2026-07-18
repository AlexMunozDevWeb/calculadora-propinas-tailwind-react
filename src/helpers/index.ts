export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatPercent(value: number) {
  return `${(value * 100).toFixed(0)}%`
}

export function calcDiscount(amount: number, discountPercent: number) {
  return amount * discountPercent
}
