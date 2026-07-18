# Calculadora de Propinas

Aplicación web POS (Point of Sale) para calcular propinas y gestionar órdenes en restaurante. Desarrollada con React, TypeScript y Tailwind CSS. Diseño visual generado con Google Stitch.

## Características

- Dark mode con paleta de colores emerald/esmeralda
- Menú interactivo con 12 platos de restaurante en grid responsive
- Agregar y eliminar items de la orden
- Selección de propina (10%, 20%, 50%)
- Cálculo de subtotal, propina y total en tiempo real
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
├── tailwind.config.js            # Configuración de Tailwind (colores, fuentes, spacing)
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
    │   └── index.ts              # Definiciones de tipos
    ├── hooks/
    │   └── useOrder.ts           # Hook de gestión de orden
    ├── helpers/
    │   └── index.ts              # Utilidades (formatCurrency)
    ├── data/
    │   └── db.ts                 # Base de datos del menú
    └── components/
        ├── MenuItem.tsx           # Tarjeta de plato del menú
        ├── OrderContent.tsx       # Lista de items en la orden
        ├── TipPercentageFrom.tsx  # Selector de propina
        └── OrderTotals.tsx        # Resumen de totales
```

## Extensión de VSCode recomendada

- **Tailwind CSS IntelliSense** — Autocompletado y linting para clases de Tailwind
  - [Instalar](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
