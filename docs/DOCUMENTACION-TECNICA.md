# Documentación Técnica — Calculadora de Propinas

## 1. Arquitectura General

La aplicación sigue un patrón de **componentes funcionales con hooks** en React. No utiliza librerías externas de state management ni routing — toda la lógica de estado vive en un custom hook (`useOrder`) que se consume desde el componente raíz.

Los componentes están organizados en 3 capas: **ui** (base reutilizable), **menu** (sección del menú), **cart** (carrito/orden).

```
┌──────────────────────────────────────────────────────────────────┐
│                           App.tsx                                │
│                    (Raíz + Layout Responsive)                    │
│                                                                  │
│  ┌──────────────────────────────────┐  ┌───────────────────────┐ │
│  │          Menú (main)             │  │  Orden (aside - desk) │ │
│  │                                  │  │                       │ │
│  │  SearchBar                       │  │  CartHeader           │ │
│  │  CategoryFilter                  │  │  CartItem[]           │ │
│  │  MenuItemCard[] (grid 2-4 col)   │  │  TipSelector          │ │
│  │                                  │  │  DiscountInput        │ │
│  └──────────────────────────────────┘  │  OrderNotes           │ │
│                                        │  OrderSummary         │ │
│  ┌──────────────────────────────────┐  │  SplitBillModal       │ │
│  │  Bottom Sheet (mobile only)      │  └───────────────────────┘ │
│  │  CartHeader + Handle             │                            │
│  │  CartItem[] + TipSelector        │                            │
│  │  DiscountInput + OrderNotes      │                            │
│  │  OrderSummary + SplitBill        │                            │
│  └──────────────────────────────────┘                            │
│                                                                  │
│         ◀──── useOrder() hook (estado global) ──▶               │
│         ◀──── showOrderSheet, search, category (local) ──▶      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión | Rol |
|---|---|---|---|
| UI | React | 18.2 | Library de componentes |
| Lenguaje | TypeScript | 5.2 | Tipado estático |
| Build | Vite | 5.2 | Dev server + bundler |
| Transpiler | SWC (via `@vitejs/plugin-react-swc`) | 3.5 | Compilación JSX/TSX |
| CSS | Tailwind CSS | 3.4 | Utility-first styling |
| Linting | ESLint | 8.57 | Análisis de código estático |
| PostCSS | PostCSS + Autoprefixer | 8.4 / 10.4 | Pipeline de CSS |
| Iconografía | Material Symbols | - | Iconos Google |
| Tipografía | Plus Jakarta Sans | - | Fuente principal |
| Diseño | Google Stitch | - | Generación de UI/UX |

---

## 3. Estructura de Archivos

### 3.1 Raíz del proyecto

| Archivo | Propósito |
|---|---|
| `index.html` | Entry point HTML con Google Fonts y Material Symbols |
| `package.json` | Dependencias, scripts y metadata |
| `vite.config.ts` | Configuración de Vite con plugin React-SWC |
| `tailwind.config.js` | Configuración de Tailwind (colores, fuentes, spacing custom) |
| `postcss.config.js` | Plugins de PostCSS (Tailwind + Autoprefixer) |
| `tsconfig.json` | Configuración de TypeScript para el app |
| `tsconfig.node.json` | Configuración de TypeScript para Vite/Node |
| `opencode.json` | Configuración MCP Stitch para opencode |

### 3.2 Directorio `src/`

```
src/
├── main.tsx                  # Entry point: renderiza <App /> en StrictMode
├── App.tsx                   # Componente raíz: layout responsive + orquestación
├── index.css                 # Directivas @tailwind + body styles + no-scrollbar
├── vite-env.d.ts             # Tipos de Vite para TypeScript
│
├── types/
│   └── index.ts              # Category, MenuItem, OrderItem, Discount, Table
│
├── hooks/
│   └── useOrder.ts           # Custom hook: estado central con useCallback/useMemo
│
├── helpers/
│   └── index.ts              # formatCurrency, formatPercent, calcDiscount
│
├── data/
│   └── db.ts                 # 20 menuItems, 5 categorías, 8 mesas
│
└── components/
    ├── ui/                   # Componentes base reutilizables
    │   ├── Button.tsx        # primary | secondary | ghost | danger
    │   ├── Badge.tsx         # default | primary | surface
    │   ├── IconButton.tsx    # primary | danger | ghost
    │   └── Modal.tsx         # Overlay + contenido con header
    ├── menu/                 # Sección del menú
    │   ├── MenuItemCard.tsx  # Tarjeta de plato con precio
    │   ├── CategoryFilter.tsx # Pills horizontales scrollables
    │   └── SearchBar.tsx     # Input con icono + botón limpiar
    └── cart/                 # Carrito / orden
        ├── CartHeader.tsx    # Handle drag + título + badge mesa
        ├── CartEmpty.tsx     # Icono + mensaje de estado vacío
        ├── CartItem.tsx      # Ítem con controles +/- y eliminar
        ├── TableSelector.tsx # Dropdown de selección de mesa
        ├── TipSelector.tsx   # 4 opciones + input personalizado
        ├── DiscountInput.tsx # Toggle % o $ + input
        ├── OrderNotes.tsx    # Textarea para notas
        ├── OrderSummary.tsx  # Desglose + botón guardar
        └── SplitBillModal.tsx # Modal para dividir entre N personas
```

---

## 4. Sistema de Tipos (`src/types/index.ts`)

```typescript
export type Category = {
  id: number       // Identificador único de categoría
  name: string     // Nombre (Pizzas, Carnes, etc.)
  icon: string     // Nombre del icono Material Symbols
}

export type MenuItem = {
  id: number       // Identificador único del plato
  name: string     // Nombre del plato
  price: number    // Precio unitario en €
  categoryId: number // FK → Category.id
}

export type OrderItem = MenuItem & {
  quantity: number  // Cantidad ordenada
}

export type Discount = {
  type: 'percentage' | 'fixed'  // Tipo de descuento
  value: number                  // Porcentaje (0-1) o cantidad fija en €
}

export type Table = {
  id: number       // Identificador único de mesa
  name: string     // Nombre (Mesa 1, Terraza 2, etc.)
}
```

**Relaciones**:
- `OrderItem` extiende `MenuItem` agregando `quantity`
- `MenuItem.categoryId` referencia `Category.id`
- `Discount` se almacena como estado en `useOrder`
- `Table` representa la mesa seleccionada

---

## 5. Custom Hook: `useOrder` (`src/hooks/useOrder.ts`)

### Estado

| Estado | Tipo | Valor inicial | Descripción |
|---|---|---|---|
| `order` | `OrderItem[]` | `[]` | Lista de items en la orden |
| `tip` | `number` | `0` | Porcentaje de propina (0-1) |
| `discount` | `Discount \| null` | `null` | Descuento aplicado |
| `table` | `Table` | `{ id: 4, name: 'Mesa 4' }` | Mesa seleccionada |
| `orderNotes` | `string` | `''` | Notas del pedido |

### Métodos (todos con `useCallback`)

| Método | Firma | Descripción |
|---|---|---|
| `addItem` | `(item: MenuItem) => void` | Agrega item o incrementa quantity |
| `removeItem` | `(id: number) => void` | Elimina item completo |
| `updateQuantity` | `(id: number, delta: number) => void` | Incrementa/decrementa quantity; elimina si llega a 0 |
| `placeOrder` | `() => void` | Reinicia todo el estado |
| `setTip` | `Dispatch<SetStateAction<number>>` | Setter de propina |
| `setDiscount` | `(discount: Discount \| null) => void` | Setter de descuento |
| `setTable` | `(table: Table) => void` | Setter de mesa |
| `setOrderNotes` | `(notes: string) => void` | Setter de notas |

### Valores computados (todos con `useMemo`)

| Valor | Fórmula | Dependencias |
|---|---|---|
| `subtotal` | `∑(quantity × price)` | `[order]` |
| `discountAmount` | `subtotal × value` (percentage) o `value` (fixed) | `[subtotal, discount]` |
| `tipAmount` | `(subtotal - discountAmount) × tip` | `[subtotal, discountAmount, tip]` |
| `total` | `subtotal - discountAmount + tipAmount` | `[subtotal, discountAmount, tipAmount]` |
| `totalItems` | `∑(quantity)` | `[order]` |

### Flujo de `addItem`

```
addItem(item)
  │
  ├─ item ya existe en order?
  │    ├─ SÍ  → map: incrementar quantity del item coincidente
  │    └─ NO  → spread: [...prev, {...item, quantity: 1}]
  │
  └─ setOrder(nuevoArray)
```

### Flujo de `updateQuantity`

```
updateQuantity(id, delta)
  │
  ├─ newQty = quantity + delta
  │
  ├─ newQty <= 0?
  │    └─ SÍ → filter: eliminar item
  │
  └─ newQty > 0?
       └─ SÍ → map: actualizar quantity
```

---

## 6. Componentes

### 6.1 `App.tsx` — Componente Raíz

**Responsabilidad**: Orquestar layout, filtrado de menú, y conectar componentes con `useOrder`.

**Estado local**:
```typescript
const [showOrderSheet, setShowOrderSheet] = useState(false)    // Bottom sheet
const [selectedCategory, setSelectedCategory] = useState<number | null>(null)  // Filtro
const [searchQuery, setSearchQuery] = useState('')             // Búsqueda
const [showSplitBill, setShowSplitBill] = useState(false)      // Modal dividir
```

**Lógica de filtrado** (`useMemo`):
```typescript
const filteredItems = useMemo(() => {
  return menuItems.filter(item => {
    const matchesCategory = selectedCategory === null || item.categoryId === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
}, [selectedCategory, searchQuery])
```

**Layout responsive**:

| Breakpoint | Comportamiento |
|---|---|
| **Desktop (md+)** | `flex-row-reverse`: Menú a la izquierda, resumen sticky a la derecha |
| **Mobile (<md)** | Columna única: Menú + bottom sheet colapsable |

**Estructura visual - Desktop**:
```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo "LuxeDine POS" + TableSelector                 │
├──────────────────────────────┬───────────────────────────────┤
│  Menú (main - 2/3)           │  Resumen (aside - 1/3)        │
│  SearchBar                   │  CartHeader                   │
│  CategoryFilter              │  CartItem[]                   │
│  MenuItemCard[] (grid)       │  TipSelector                  │
│                              │  DiscountInput                │
│                              │  OrderNotes                   │
│                              │  OrderSummary                 │
│                              │  Dividir Cuenta               │
└──────────────────────────────┴───────────────────────────────┘
```

**Estructura visual - Mobile**:
```
┌────────────────────────────┐
│  Header: Logo + TableSel.  │
├────────────────────────────┤
│  Menú (grid 2 columnas)    │
│  SearchBar                 │
│  CategoryFilter            │
│  MenuItemCard[]            │
├────────────────────────────┤
│  Bottom Sheet (fixed)      │
│  ┌──────────────────────┐  │
│  │ CartHeader (handle)  │  │
│  │ CartItem[]           │  │
│  │ TipSelector          │  │
│  │ DiscountInput        │  │
│  │ OrderNotes           │  │
│  │ OrderSummary         │  │
│  │ Dividir Cuenta       │  │
│  └──────────────────────┘  │
└────────────────────────────┘
```

### 6.2 Componentes UI (`src/components/ui/`)

#### `Button.tsx`

| Prop | Tipo | Default | Opciones |
|---|---|---|---|
| `variant` | `string` | `secondary` | `primary`, `secondary`, `ghost`, `danger` |
| `size` | `string` | `md` | `sm`, `md`, `lg` |
| `disabled` | `boolean` | `false` | - |
| `fullWidth` | `boolean` | `false` | - |

#### `Badge.tsx`

| Prop | Tipo | Default | Opciones |
|---|---|---|---|
| `label` | `string` | - | Texto del badge |
| `variant` | `string` | `default` | `default`, `primary`, `surface` |
| `icon` | `string` | - | Nombre de Material Symbol |

#### `IconButton.tsx`

| Prop | Tipo | Default | Opciones |
|---|---|---|---|
| `icon` | `string` | - | Nombre de Material Symbol |
| `variant` | `string` | `ghost` | `primary`, `danger`, `ghost` |
| `size` | `string` | `sm` | `sm` (28px), `md` (36px) |
| `label` | `string` | - | aria-label |

#### `Modal.tsx`

| Prop | Tipo | Default |
|---|---|---|
| `isOpen` | `boolean` | - |
| `onClose` | `() => void` | - |
| `title` | `string` | - |
| `children` | `ReactNode` | - |

### 6.3 Componentes Menu (`src/components/menu/`)

#### `MenuItemCard.tsx`

| Prop | Tipo |
|---|---|
| `item` | `MenuItem` |
| `onAdd` | `(item: MenuItem) => void` |

**Render**: Card con icono Material Symbols en círculo, nombre y precio con `formatCurrency()`. Hover con elevación y translate.

#### `CategoryFilter.tsx`

| Prop | Tipo |
|---|---|
| `selected` | `number \| null` |
| `onSelect` | `(id: number \| null) => void` |

**Render**: Pills horizontales scrollables. "Todos" + 5 categorías con icono. El seleccionado usa `bg-primary-container`.

#### `SearchBar.tsx`

| Prop | Tipo |
|---|---|
| `onSearch` | `(query: string) => void` |

**Render**: Input con icono `search` a la izquierda, botón `close` a la derecha cuando hay texto.

### 6.4 Componentes Cart (`src/components/cart/`)

#### `CartHeader.tsx`

| Prop | Tipo |
|---|---|
| `title` | `string` |
| `tableLabel` | `string` |
| `itemCount` | `number` |
| `onClick` | `() => void` |

**Render**: Handle de arrastre, ícono de carrito, conteo de artículos o título, badge de mesa.

#### `CartEmpty.tsx`

| Prop | Tipo | Default |
|---|---|---|
| `message` | `string` | `'Agrega artículos del menú'` |

**Render**: Ícono `shopping_cart` tenue + mensaje.

#### `CartItem.tsx`

| Prop | Tipo |
|---|---|
| `item` | `OrderItem` |
| `onUpdateQuantity` | `(id: number, delta: number) => void` |
| `onRemove` | `(id: number) => void` |

**Render**: Fila con badge de cantidad, nombre, controles +/- (IconButton), subtotal, botón eliminar.

#### `TableSelector.tsx`

| Prop | Tipo |
|---|---|
| `selected` | `Table` |
| `onSelect` | `(table: Table) => void` |

**Render**: Dropdown con 8 mesas. Se cierra al seleccionar o al hacer click fuera.

#### `TipSelector.tsx`

| Prop | Tipo |
|---|---|
| `tip` | `number` |
| `setTip` | `Dispatch<SetStateAction<number>>` |

**Render**: Grid 3 columnas con 4 opciones (10%, 15%, 20%, 50%) + input numérico para porcentaje libre.

#### `DiscountInput.tsx`

| Prop | Tipo |
|---|---|
| `discount` | `Discount \| null` |
| `onApply` | `(discount: Discount \| null) => void` |

**Render**: Toggle `%` / `$` + input numérico. Se aplica al perder foco o presionar Enter.

#### `OrderNotes.tsx`

| Prop | Tipo |
|---|---|
| `notes` | `string` |
| `onChange` | `(notes: string) => void` |

**Render**: Textarea de 2 filas con placeholder.

#### `OrderSummary.tsx`

| Prop | Tipo |
|---|---|
| `order` | `OrderItem[]` |
| `tip` | `number` |
| `discount` | `Discount \| null` |
| `subtotal` | `number` |
| `discountAmount` | `number` |
| `tipAmount` | `number` |
| `total` | `number` |
| `onPlaceOrder` | `() => void` |

**Render**: Desglose con artículos, descuento (si existe), propina (si > 0), total con `formatCurrency()`, botón "Guardar Pedido".

#### `SplitBillModal.tsx`

| Prop | Tipo |
|---|---|
| `isOpen` | `boolean` |
| `onClose` | `() => void` |
| `total` | `number` |

**Render**: Modal con stepper (2-20 personas), display del total original y monto por persona.

---

## 7. Utilidades (`src/helpers/index.ts`)

```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

export function calcDiscount(amount: number, discountPercent: number): number {
  return amount * discountPercent
}
```

**Uso**: `formatCurrency` se usa en `MenuItemCard`, `CartItem`, `OrderSummary` y `SplitBillModal`. `formatPercent` se usa en `TipSelector` y `OrderSummary`.

---

## 8. Base de Datos (`src/data/db.ts`)

### Categorías (5)

| ID | Nombre | Icono |
|---|---|---|
| 1 | Pizzas | `local_pizza` |
| 2 | Carnes | `lunch_dining` |
| 3 | Postres | `cake` |
| 4 | Bebidas | `local_bar` |
| 5 | Cafés | `coffee` |

### Menú (20 ítems)

| ID | Nombre | Precio | Categoría |
|---|---|---|---|
| 1 | Pizza a la Leña Chica | 30 € | Pizzas |
| 2 | Pizza a la Leña Mediana | 50 € | Pizzas |
| 3 | Pizza a la Leña Grande | 70 € | Pizzas |
| 4 | Pizza Hawaiana | 55 € | Pizzas |
| 5 | Pizza Pepperoni | 55 € | Pizzas |
| 6 | Rib Eye 800g | 100 € | Carnes |
| 7 | New York 600g | 90 € | Carnes |
| 8 | Chuleta de Cerdo | 75 € | Carnes |
| 9 | Rebanada de Pay de Limón | 30 € | Postres |
| 10 | Rebanada de Pastel de Chocolate | 30 € | Postres |
| 11 | Rebanada de Pay de Queso | 30 € | Postres |
| 12 | Tiramisú | 35 € | Postres |
| 13 | Jugo de Naranja | 15 € | Bebidas |
| 14 | Limonada | 15 € | Bebidas |
| 15 | Agua Mineral | 10 € | Bebidas |
| 16 | Tequila | 40 € | Bebidas |
| 17 | Café Americano | 20 € | Cafés |
| 18 | Café Capuchino | 40 € | Cafés |
| 19 | Café Espresso | 25 € | Cafés |
| 20 | Chocolate Caliente | 30 € | Cafés |

### Mesas (8)

| ID | Nombre |
|---|---|
| 1 | Mesa 1 |
| 2 | Mesa 2 |
| 3 | Mesa 3 |
| 4 | Mesa 4 |
| 5 | Mesa 5 |
| 6 | Mesa 6 |
| 7 | Terraza 1 |
| 8 | Terraza 2 |

---

## 9. Configuración de Tailwind

```javascript
// tailwind.config.js (fragmentos relevantes)
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#68dba9",
        "primary-container": "#25a475",
        "on-primary": "#003825",
        "on-primary-container": "#00311f",
        "secondary": "#4edea3",
        "secondary-container": "#00a572",
        "background": "#0b1326",
        "surface": "#0b1326",
        "surface-card": "#1E293B",
        "surface-hover": "#334155",
        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "destructive": "#DC2626",
      },
      fontFamily: { /* Plus Jakarta Sans para todos los tokens */ },
      spacing: {
        "margin-mobile": "20px",
        "margin-desktop": "40px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        "container-max": "1280px",
        "safe": "env(safe-area-inset-bottom)",
      },
    },
  },
}
```

**Personalizaciones**: Paleta completa Material Design 3, fuente Plus Jakarta Sans en todos los tokens, espaciado custom para mobile/desktop con `safe-area-inset-bottom` para iOS.

---

## 10. Scripts de npm

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `vite` | Inicia el dev server en `localhost:5173` |
| `build` | `tsc && vite build` | Type-check + build de producción |
| `lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Linting sin warnings |
| `preview` | `vite preview` | Preview de la build de producción |

---

## 11. Datos de Flujo (Data Flow)

```
db.ts (datos estáticos)
  │
  ▼
App.tsx ──filter──▶ filteredItems (useMemo)
  │
  ├──map──▶ MenuItemCard ──onClick──▶ handleAddItem()
  │                                        │
  │                                        ├─ addItem() → useOrder
  │                                        └─ setShowOrderSheet(true)
  ▼
useOrder (order[], tip, discount, table, orderNotes)
  │
  ├──▶ CartHeader (totalItems, table.name)
  ├──▶ CartItem[] (order, updateQuantity, removeItem)
  ├──▶ TipSelector (tip, setTip)
  ├──▶ DiscountInput (discount, setDiscount)
  ├──▶ OrderNotes (orderNotes, setOrderNotes)
  ├──▶ OrderSummary (subtotal, discountAmount, tipAmount, total, placeOrder)
  └──▶ SplitBillModal (total)
```

**Patrón**: Unidireccional (top-down). El estado fluye desde `App` via props. Las interacciones fluyen de vuelta via callbacks. Todo el estado mutante vive en `useOrder`.

---

## 12. Integración con Google Stitch

El proyecto utiliza **Google Stitch** a través de un servidor MCP (Model Context Protocol) para generar y gestionar diseños UI.

### Configuración MCP (`opencode.json`)

```json
{
  "mcp": {
    "stitch": {
      "command": ["npx", "-y", "@_davideast/stitch-mcp", "proxy"],
      "env": {
        "STITCH_API_KEY": "${STITCH_API_KEY}",
        "STITCH_DEFAULT_PROJECT": "2077899889472277059"
      }
    }
  }
}
```

### Proyecto en Stitch

| Campo | Valor |
|---|---|
| Nombre | Calculadora de propinas |
| ID | `2077899889472277059` |
| Tipo | TEXT_TO_UI_PRO |
| Pantallas | Mobile (780x1768), Desktop (2560x2118) |

### Comandos útiles

Ver `docs/stitch-commands.md` para la documentación completa de comandos CLI.

---

## 13. Guía de Contribución

1. Crear una rama desde `main`
2. Hacer cambios siguiendo la convención de componentes funcionales + TypeScript
3. Ejecutar `npm run lint` antes de commitear
4. Ejecutar `npm run build` para verificar que no hay errores de tipo
5. Crear pull request con descripción del cambio
