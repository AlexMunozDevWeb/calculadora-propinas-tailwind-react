# Calculadora de Propinas

Aplicación web POS (Point of Sale) para calcular propinas y gestionar órdenes en restaurante. Desarrollada con React, TypeScript y Tailwind CSS. Diseño visual generado con Google Stitch.

## Características

- **Dark mode** con paleta de colores emerald/esmeralda
- **Menú interactivo** con 20 platos organizados en 5 categorías
- **Búsqueda en tiempo real** de artículos del menú
- **Filtro por categoría** (Pizzas, Carnes, Postres, Bebidas, Cafés)
- **Controles de cantidad** (+/-) en cada item del carrito
- **Selector de mesa** con 8 opciones (6 interiores + 2 terraza)
- **Propina personalizable**: 4 opciones predefinidas + input libre
- **Descuentos**: porcentaje o cantidad fija
- **Notas del pedido** para indicaciones especiales
- **Dividir cuenta** entre 2-20 personas
- **Resumen detallado**: artículos, descuento, propina, total
- **Desktop**: Sidebar de resumen a la derecha (sticky)
- **Mobile**: Bottom sheet colapsable que se abre al agregar items
- Iconografía con Material Symbols
- Tipografía Plus Jakarta Sans
- Animaciones y transiciones en hover/focus

## Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 18.2 | UI Library |
| TypeScript | 5.2 | Type safety |
| Vite | 5.2 | Build tool y dev server |
| Tailwind CSS | 3.4 | Utility-first CSS |
| SWC | 3.5 | Transpilación rápida (via Vite plugin) |
| Material Symbols | - | Iconografía |
| Google Stitch | - | Diseño UI/UX |

## Requisitos previos

- **Node.js** >= 18.0
- **npm** >= 9.0

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Entrar al directorio
cd calculadora-propinas-taildwin

# Instalar dependencias
npm install
```

## Ejecución

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

## Otros comandos

```bash
# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar linter (ESLint)
npm run lint
```

## Estructura del proyecto

```
calculadora-propinas-taildwin/
├── index.html                    # Entry HTML con Google Fonts
├── package.json                  # Dependencias y scripts
├── tailwind.config.js            # Configuración de Tailwind
├── vite.config.ts                # Configuración de Vite
├── tsconfig.json                 # Configuración de TypeScript
├── opencode.json                 # Configuración MCP Stitch
├── docs/
│   ├── DOCUMENTACION-TECNICA.md  # Documentación técnica completa
│   ├── stitch-commands.md        # Comandos CLI de Stitch MCP
│   └── stitch-prompt.md          # Prompt usado para generar el diseño
└── src/
    ├── main.tsx                  # Entry point de React
    ├── App.tsx                   # Componente raíz (layout responsive)
    ├── index.css                 # Estilos base y Tailwind
    ├── types/
    │   └── index.ts              # Category, MenuItem, OrderItem, Discount, Table
    ├── hooks/
    │   └── useOrder.ts           # Hook de gestión de orden
    ├── helpers/
    │   └── index.ts              # formatCurrency, formatPercent, calcDiscount
    ├── data/
    │   └── db.ts                 # Menú (20 ítems), categorías (5), mesas (8)
    └── components/
        ├── ui/                   # Componentes base reutilizables
        │   ├── Button.tsx        # Botón con 4 variantes y 3 tamaños
        │   ├── Badge.tsx         # Badge con 3 variantes
        │   ├── IconButton.tsx    # Botón de ícono con 3 variantes
        │   └── Modal.tsx         # Modal con overlay
        ├── menu/                 # Sección del menú
        │   ├── MenuItemCard.tsx  # Tarjeta de plato
        │   ├── CategoryFilter.tsx # Filtro horizontal de categorías
        │   └── SearchBar.tsx     # Búsqueda en tiempo real
        └── cart/                 # Carrito / orden
            ├── CartHeader.tsx    # Handle + título + badge de mesa
            ├── CartEmpty.tsx     # Estado vacío del carrito
            ├── CartItem.tsx      # Ítem con controles +/-
            ├── TableSelector.tsx # Dropdown de selección de mesa
            ├── TipSelector.tsx   # Propinas predefinidas + personalizada
            ├── DiscountInput.tsx # Descuento porcentaje o fijo
            ├── OrderNotes.tsx    # Notas del pedido
            ├── OrderSummary.tsx  # Desglose de totales + botón guardar
            └── SplitBillModal.tsx # Modal para dividir la cuenta
```

## Extensión de VSCode recomendada

- **Tailwind CSS IntelliSense** — Autocompletado y linting para clases de Tailwind
  - [Instalar](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
