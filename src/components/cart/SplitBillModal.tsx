import { useState, useMemo } from "react"
import Modal from "../ui/Modal"
import Button from "../ui/Button"
import { formatCurrency } from "../../helpers"

type SplitBillModalProps = {
  isOpen: boolean
  onClose: () => void
  total: number
}

export default function SplitBillModal({ isOpen, onClose, total }: SplitBillModalProps) {
  const [people, setPeople] = useState(2)

  const perPerson = useMemo(() => total / people, [total, people])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dividir Cuenta">
      <div className="space-y-4">
        <div>
          <p className="font-label-sm text-label-sm text-text-secondary mb-2 uppercase tracking-wider">Entre cuántas personas</p>
          <div className="flex items-center gap-3 justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPeople(p => Math.max(2, p - 1))}
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </Button>
            <span className="font-headline-lg text-headline-lg text-primary min-w-[40px] text-center">{people}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPeople(p => Math.min(20, p + 1))}
            >
              <span className="material-symbols-outlined text-base">add</span>
            </Button>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl p-4 text-center border border-white/5">
          <p className="font-label-sm text-label-sm text-text-secondary mb-1">Total original</p>
          <p className="font-body-md text-body-md text-text-primary mb-3">{formatCurrency(total)}</p>
          <div className="border-t border-white/5 pt-3">
            <p className="font-label-sm text-label-sm text-text-secondary mb-1">Cada persona paga</p>
            <p className="font-headline-lg-mobile text-headline-md-mobile text-primary">{formatCurrency(perPerson)}</p>
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={onClose}>
          <span className="material-symbols-outlined text-base">check</span>
          Entendido
        </Button>
      </div>
    </Modal>
  )
}
