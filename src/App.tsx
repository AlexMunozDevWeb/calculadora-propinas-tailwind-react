import { useState, useMemo } from "react"
import useOrder from "./hooks/useOrder"
import { menuItems } from "./data/db"

import MenuItemCard from "./components/menu/MenuItemCard"
import CategoryFilter from "./components/menu/CategoryFilter"
import SearchBar from "./components/menu/SearchBar"

import CartHeader from "./components/cart/CartHeader"
import CartEmpty from "./components/cart/CartEmpty"
import CartItem from "./components/cart/CartItem"
import TableSelector from "./components/cart/TableSelector"
import TipSelector from "./components/cart/TipSelector"
import DiscountInput from "./components/cart/DiscountInput"
import OrderNotes from "./components/cart/OrderNotes"
import OrderSummary from "./components/cart/OrderSummary"
import SplitBillModal from "./components/cart/SplitBillModal"

import Button from "./components/ui/Button"

function App() {
  const {
    order, tip, setTip, discount, setDiscount,
    table, setTable, orderNotes, setOrderNotes,
    addItem, removeItem, updateQuantity,
    subtotal, discountAmount, tipAmount, total,
    placeOrder,
  } = useOrder()

  const [showOrderSheet, setShowOrderSheet] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSplitBill, setShowSplitBill] = useState(false)

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === null || item.categoryId === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleAddItem = (item: typeof menuItems[0]) => {
    addItem(item)
    setShowOrderSheet(true)
  }

  const handlePlaceOrder = () => {
    placeOrder()
    setShowOrderSheet(false)
  }

  const orderContent = (
    <>
      <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar mb-stack-md">
        {order.length === 0 ? (
          <CartEmpty />
        ) : (
          order.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))
        )}
      </div>

      {order.length > 0 && (
        <>
          <TipSelector tip={tip} setTip={setTip} />
          <DiscountInput discount={discount} onApply={setDiscount} />
          <OrderNotes notes={orderNotes} onChange={setOrderNotes} />
          <OrderSummary
            order={order}
            tip={tip}
            discount={discount}
            subtotal={subtotal}
            discountAmount={discountAmount}
            tipAmount={tipAmount}
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
          <Button variant="secondary" fullWidth onClick={() => setShowSplitBill(true)}>
            <span className="material-symbols-outlined text-base">group</span>
            Dividir Cuenta
          </Button>
        </>
      )}
    </>
  )

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 mx-auto max-w-container-max">
          <div className="flex items-center gap-2">
            <span className="font-display-lg text-display-lg font-extrabold text-primary tracking-tight" style={{ fontSize: '24px' }}>LuxeDine POS</span>
          </div>
          <div className="flex items-center gap-3">
            <TableSelector selected={table} onSelect={setTable} />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row-reverse max-w-container-max mx-auto">
        {/* Desktop: Order Summary Right Side */}
        <aside className="hidden md:block md:w-1/3 md:border-l border-white/5 bg-surface-container-low p-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-stack-md">
            <h2 className="font-title-lg text-title-lg text-text-primary">Resumen de Orden</h2>
            <span className="font-label-sm text-label-sm text-text-secondary bg-surface-hover px-2 py-1 rounded-full">{table.name}</span>
          </div>
          {orderContent}
        </aside>

        {/* Menu Section */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <h2 className="font-title-lg text-title-lg text-text-primary mb-stack-md">Menú Principal</h2>
          <div className="mb-stack-md">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="mb-stack-md">
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAddItem} />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-5xl text-text-secondary/20 block mb-2">search_off</span>
              <p className="text-text-secondary">No se encontraron artículos</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile: Bottom Sheet */}
      <div className={`bg-surface-container-high md:hidden fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ${showOrderSheet ? 'translate-y-0' : 'translate-y-[calc(100%-100px)]'}`}>
        <div className="border-t border-white/5 rounded-t-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <CartHeader
            title="Menú"
            tableLabel={table.name}
            itemCount={order.reduce((s, i) => s + i.quantity, 0)}
            onClick={() => setShowOrderSheet(!showOrderSheet)}
          />
        </div>
        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {orderContent}
        </div>
      </div>

      {/* Mobile: Fixed Menu Button */}
      {!showOrderSheet && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-md border-t border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
          <div className="flex justify-around items-center px-4 py-3">
            <button
              className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-6 py-2 transition-all cursor-pointer"
              onClick={() => setShowOrderSheet(true)}
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              <span className="font-label-sm text-label-sm">Menú</span>
            </button>
          </div>
        </div>
      )}

      <SplitBillModal isOpen={showSplitBill} onClose={() => setShowSplitBill(false)} total={total} />
    </div>
  )
}

export default App
