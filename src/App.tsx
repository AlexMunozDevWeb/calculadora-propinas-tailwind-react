import { useState } from "react"
import MenuItem from "./components/MenuItem"
import OrderContent from "./components/OrderContent"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder()
  const [showOrderSheet, setShowOrderSheet] = useState(false)

  const handleAddItem = (item: typeof menuItems[0]) => {
    addItem(item)
    setShowOrderSheet(true)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 mx-auto max-w-container-max">
          <div className="flex items-center gap-2">
            <span className="font-display-lg text-display-lg font-extrabold text-primary tracking-tight" style={{ fontSize: '24px' }}>LuxeDine POS</span>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary">restaurant</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row-reverse max-w-container-max mx-auto">
        {/* Desktop: Order Summary Right Side */}
        <aside className="hidden md:block md:w-1/3 md:border-l border-white/5 bg-surface-container-low p-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-stack-md">
            <h2 className="font-title-lg text-title-lg text-text-primary">Resumen de Orden</h2>
            <span className="font-label-sm text-label-sm text-text-secondary bg-surface-hover px-2 py-1 rounded-full">Mesa 4</span>
          </div>

          {order.length ? (
            <>
              <OrderContent order={order} removeItem={removeItem} />
              <TipPercentageForm setTip={setTip} tip={tip} />
              <OrderTotals order={order} tip={tip} placeOrder={placeOrder} />
            </>
          ) : (
            <p className="text-center text-text-secondary py-8">La orden está vacía</p>
          )}
        </aside>

        {/* Menu Section */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <h2 className="font-title-lg text-title-lg text-text-primary mb-stack-md">Menú Principal</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                addItem={handleAddItem}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Mobile: Bottom Sheet */}
      <div className={`bg-surface-container-high/95 md:hidden fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ${showOrderSheet ? 'translate-y-0' : 'translate-y-[calc(100%-100px)]'}`}>
        <div
          className="border-t border-white/5 rounded-t-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
          onClick={() => setShowOrderSheet(!showOrderSheet)}
        >
          <div className="w-full flex justify-center py-2">
            <div className="w-12 h-1 bg-slate-600 rounded-full" />
          </div>
          <div className="flex justify-between items-center px-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">shopping_cart</span>
              <span className="font-label-md text-label-md text-text-primary">
                {order.length > 0 ? `${order.length} artículo(s)` : 'Menú'}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-text-secondary">Mesa 4</span>
          </div>
        </div>

        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {order.length ? (
            <>
              <OrderContent order={order} removeItem={removeItem} />
              <TipPercentageForm setTip={setTip} tip={tip} />
              <OrderTotals order={order} tip={tip} placeOrder={placeOrder} />
            </>
          ) : (
            <p className="text-center text-text-secondary py-4">Agrega artículos del menú</p>
          )}
        </div>
      </div>

      {/* Mobile: Fixed Menu Button */}
      {!showOrderSheet && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-md border-t border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
          <div className="flex justify-around items-center px-4 py-3">
            <button
              className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-6 py-2 transition-all"
              onClick={() => setShowOrderSheet(true)}
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              <span className="font-label-sm text-label-sm">Menú</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
