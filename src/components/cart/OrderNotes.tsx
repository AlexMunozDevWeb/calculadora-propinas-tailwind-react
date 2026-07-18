type OrderNotesProps = {
  notes: string
  onChange: (notes: string) => void
}

export default function OrderNotes({ notes, onChange }: OrderNotesProps) {
  return (
    <div className="mb-stack-md">
      <p className="font-label-sm text-label-sm text-text-secondary mb-2 uppercase tracking-wider">Notas del Pedido</p>
      <textarea
        value={notes}
        onChange={e => onChange(e.target.value)}
        placeholder="Ej: Sin cebolla, bien cocido..."
        rows={2}
        className="w-full bg-surface-card border border-white/5 rounded-xl px-3 py-2 font-body-md text-body-md text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
      />
    </div>
  )
}
