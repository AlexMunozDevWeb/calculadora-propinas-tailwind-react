# Documentación Técnica — Calculadora de Propinas

## 1. Arquitectura General

La aplicación sigue un patrón de **componentes funcionales con hooks** en React. No utiliza librerías externas de state management ni routing — toda la lógica de estado vive en un custom hook (`useOrder`) que se consume desde el componente raíz.

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│                    (Raíz + Layout Responsive)                 │
│                                                              │
│  ┌─────────────────────────────┐  ┌────────────────────────┐ │
│  │        Menú (main)          │  │  Orden (aside - desktop)│ │
│  │                             │  │                        │ │
│  │    grid 2-4 columnas        │  │  OrderContent          │ │
│  │    MenuItem[] (cards)       │  │  TipPercentageForm     │ │
│  │                             │  │  OrderTotals           │ │
│  └─────────────────────────────┘  └────────────────────────┘ │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Bottom Sheet (mobile only)                             │ │
│  │  - Barra "Menu" + handle drag                           │ │
│  │  - OrderContent + TipPercentage + OrderTotals           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│         ◀──── useOrder() hook (estado global) ──▶            │
│         ◀──── showOrderSheet (state local) ──▶               │
└─────────────────────────────────────────────────────────────┘
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
├── main.tsx              # Entry point: renderiza <App /> en StrictMode
├── App.tsx               # Componente raíz: layout responsive + bottom sheet
├── index.css             # Directivas @tailwind + estilos base
├── vite-env.d.ts         # Tipos de Vite para TypeScript
│
├── types/
│   └── index.ts          # MenuItem, OrderItem
│
├── hooks/
│   └── useOrder.ts       # Custom hook: toda la lógica de estado
│
├── helpers/
│   └── index.ts          # formatCurrency()
│
├── data/
│   └── db.ts             # Array estático de MenuItem[]
│
└── components/
    ├── MenuItem.tsx           # Tarjeta del menú con icono
    ├── OrderContent.tsx       # Lista de items en la orden
    ├── TipPercentageFrom.tsx  # Selector de propina (botones)
    └── OrderTotals.tsx        # Subtotal, propina, total y botón
```

---

## 4. Sistema de Tipos (`src/types/index.ts`)

```typescript
export type MenuItem = {
  id: number      // Identificador único del plato
  name: string    // Nombre del plato
  price: number   // Precio unitario
}

export type OrderItem = MenuItem & {
  quantity: number // Cantidad ordenada (se incrementa al repetir click)
}
```

**Relación**: `OrderItem` extiende `MenuItem` agregando `quantity`. Esto permite que un item de la orden herede `id`, `name` y `price` del menú original.

---

## 5. Custom Hook: `useOrder` (`src/hooks/useOrder.ts`)

### Estado

| Estado | Tipo | Valor inicial | Descripción |
|---|---|---|---|
| `order` | `OrderItem[]` | `[]` | Lista de items en la orden actual |
| `tip` | `number` | `0` | Porcentaje de propina seleccionado |

### Métodos

| Método | Firma | Descripción |
|---|---|---|
| `addItem` | `(item: MenuItem) => void` | Si el item existe, incrementa `quantity` en 1. Si no, lo agrega con `quantity: 1`. |
| `removeItem` | `(id: MenuItem['id']) => void` | Elimina el item completo de la orden (no decrementa cantidad). |
| `placeOrder` | `() => void` | Reinicia `order` a `[]` y `tip` a `0`. |
| `setTip` | `Dispatch<SetStateAction<number>>` | Setter del estado `tip`. |

### Flujo de `addItem`

```
addItem(item)
  │
  ├─ item ya existe en order?
  │    ├─ SÍ  → map sobre order, incrementar quantity del item coincidente
  │    └─ NO  → crear {...item, quantity: 1}, agregar al final del array
  │
  └─ setOrder(nuevoArray)
```

---

## 6. Componentes

### 6.1 `App.tsx` — Componente Raíz

**Responsabilidad**: Orquestar el layout responsive y conectar los componentes con el hook `useOrder`.

**Estado adicional**:
```typescript
const [showOrderSheet, setShowOrderSheet] = useState(false)
```
Controla la visibilidad del bottom sheet en mobile.

**Layout responsive**:

| Breakpoint | Comportamiento |
|---|---|
| **Desktop (md+)** | `flex-row-reverse`: Menú a la izquierda, resumen de orden como sidebar sticky a la derecha |
| **Mobile (<md)** | Columna única: Menú completo + bottom sheet colapsable |

**Estructura visual - Desktop**:
```
┌──────────────────────────────────────────────────────┐
│  Header: Logo "LuxeDine POS" + icons (history, gear) │
├────────────────────────────┬─────────────────────────┤
│  Menú (main - 2/3)        │  Resumen (aside - 1/3)  │
│  grid 3-4 columnas        │  sticky, border-left    │
│  MenuItem[] cards          │  OrderContent           │
│                            │  TipPercentageForm      │
│                            │  OrderTotals            │
└────────────────────────────┴─────────────────────────┘
```

**Estructura visual - Mobile**:
```
┌────────────────────────────┐
│  Header: Logo + icons      │
├────────────────────────────┤
│  Menú (grid 2 columnas)   │
│  MenuItem[] cards          │
├────────────────────────────┤
│  Bottom Sheet (fixed)      │
│  ┌──────────────────────┐  │
│  │ Handle + "Menu" bar  │  │
│  ├──────────────────────┤  │
│  │ OrderContent         │  │
│  │ TipPercentageForm    │  │
│  │ OrderTotals          │  │
│  └──────────────────────┘  │
└────────────────────────────┘
```

**Comportamiento del Bottom Sheet**:
- Inicia collapsed (solo muestra barra "Menu")
- Se abre automáticamente al agregar un item (`handleAddItem`)
- Se abre/cierra al hacer click en la barra
- Contenido con scroll y max-height 60vh

### 6.2 `MenuItem.tsx` — Tarjeta del Menú

**Props**:
```typescript
{
  item: MenuItem                    // Datos del plato
  addItem: (item: MenuItem) => void // Callback al hacer click
}
```

**Render**: Card con fondo `surface-card`, icono Material Symbols en círculo, nombre del plato y precio en color primary. Hover con elevación y sombra.

**Clases principales**: `bg-surface-card rounded-lg p-4 border border-white/5 shadow-sm hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1`

### 6.3 `OrderContent.tsx` — Lista de la Orden

**Props**:
```typescript
{
  order: OrderItem[]                            // Items actuales
  removeItem: (id: MenuItem['id']) => void      // Callback de eliminación
}
```

**Render**: Lista scrollable con items que muestran cantidad (`Nx`), nombre, subtotal y botón de eliminar (icono `close`). Separadores con `border-b border-slate-700/50`.

### 6.4 `TipPercentageFrom.tsx` — Selector de Propina

**Props**:
```typescript
{
  setTip: Dispatch<SetStateAction<number>> // Setter del hook
  tip: number                              // Valor actual seleccionado
}
```

**Opciones hardcodeadas**:

| ID | Value | Label |
|---|---|---|
| `tip-10` | `0.10` | 10% |
| `tip-20` | `0.20` | 20% |
| `tip-50` | `0.50` | 50% |

**Render**: Grid de 3 botones. El seleccionado tiene fondo `bg-primary-container` y escala `scale-105`. Los no seleccionados tienen borde sutil.

**Nombre del archivo**: `TipPercentageFrom.tsx` — contiene un typo (`From` en lugar de `Form`).

### 6.5 `OrderTotals.tsx` — Resumen de Totales

**Props**:
```typescript
{
  order: OrderItem[]
  tip: number
  placeOrder: () => void
}
```

**Cálculos**:

| Valor | Fórmula | Implementación |
|---|---|---|
| Subtotal | `∑(quantity × price)` | `useMemo` con dependencia `[order]` |
| Propina | `subtotal × tip` | `useMemo` con dependencia `[tip, subtotalAmount]` |
| Total | `subtotal + propina` | `useMemo` con dependencia `[tipAmount, subtotalAmount]` |

**Botón**: Full-width, `bg-[#059669]`, texto blanco, icono `check_circle`. Se deshabilita cuando el total es 0.

---

## 7. Utilidades (`src/helpers/index.ts`)

```typescript
export function formatCurrency(quantity: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(quantity)
}
```

**Uso**: Se invoca en `OrderContent.tsx` y `OrderTotals.tsx` para formatear precios y totales como `$XX.XX`.

---

## 8. Base de Datos (`src/data/db.ts`)

Array estático de 12 items de menú tipados como `MenuItem[]`:

| ID | Nombre | Precio |
|---|---|---|
| 1 | Pizza a la Leña Chica | $30 |
| 2 | Pizza a la Leña Mediana | $50 |
| 3 | Rebanada de Pay de Limón | $30 |
| 4 | Rebanada de Pastel de Chocolate | $30 |
| 5 | Jugo de Naranja | $15 |
| 6 | Pizza a la Leña Grande | $70 |
| 7 | Rib Eye 800g | $100 |
| 8 | Jugo de Naranja (duplicado) | $15 |
| 9 | Tequila | $40 |
| 10 | Rebanada de Pay de Queso | $30 |
| 11 | Café Americano | $20 |
| 12 | Café Capuchino | $40 |

**Nota**: Los items 5 y 8 son duplicados ("Jugo de Naranja" al mismo precio).

---

## 9. Configuración de Tailwind

```javascript
// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta principal
        "primary": "#68dba9",
        "primary-container": "#25a475",
        "secondary": "#4edea3",
        "secondary-container": "#00a572",

        // Superficies
        "background": "#0b1326",
        "surface": "#0b1326",
        "surface-card": "#1E293B",
        "surface-hover": "#334155",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",

        // Texto
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",

        // Acciones
        "destructive": "#DC2626",
      },
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "title-lg": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
      },
      spacing: {
        "margin-mobile": "20px",
        "margin-desktop": "40px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        "container-max": "1280px",
      },
    },
  },
}
```

**Personalizaciones**: Colores del sistema de diseño Material Design 3, fuente Plus Jakarta Sans, espaciado custom para mobile/desktop.

---

## 10. Scripts de npm

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `vite` | Inicia el dev server en `localhost:5173` |
| `build` | `tsc && vite build` | Type-check + build de producción |
| `lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Linting sin warnings permitidos |
| `preview` | `vite preview` | Preview de la build de producción |

---

## 11. Datos de Flujo (Data Flow)

```
db.ts (datos estáticos)
  │
  ▼
App.tsx ──map──▶ MenuItem ──onClick──▶ handleAddItem()
  │                                        │
  │                                        ├─ addItem() → useOrder
  │                                        └─ setShowOrderSheet(true)
  ▼
useOrder (order[], tip)
  │
  ├──▶ OrderContent (recibe order, removeItem)
  ├──▶ TipPercentageForm (recibe tip, setTip)
  └──▶ OrderTotals (recibe order, tip, placeOrder)
```

**Patrón**: Unidireccional (top-down). El estado fluye desde `App` (que consume `useOrder`) hacia los componentes hijos via props. Las interacciones fluyen de vuelta via callbacks.

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

## 13. Problemas Conocidos

| # | Problema | Ubicación | Severidad | Estado |
|---|---|---|---|---|
| 1 | Typo en nombre de archivo (`From` → `Form`) | `TipPercentageFrom.tsx` | Baja | Pendiente |
| 2 | Item duplicado en la base de datos | `db.ts:5` y `db.ts:8` | Baja | Pendiente |
| 3 | Título de `index.html` actualizado | `index.html` | - | Resuelto |
| 4 | `useCallback` → `useMemo` para valores | `OrderTotals.tsx` | - | Resuelto |
| 5 | Inconsistencia de moneda (`€` vs `$`) | `MenuItem.tsx` | - | Resuelto |

---

## 14. Guía de Contribución

1. Crear una rama desde `main`
2. Hacer cambios siguiendo la convención de componentes funcionales + TypeScript
3. Ejecutar `npm run lint` antes de commitear
4. Crear pull request con descripción del cambio
