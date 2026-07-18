# Prompt para Google Stitch — Calculadora de Propinas Restaurante

---

## Contexto del Proyecto

Soy un desarrollador frontend y tengo una aplicación web de **calculadora de propinas para restaurante** construida con React, TypeScript y Tailwind CSS. La app permite a los meseros o clientes seleccionar platos de un menú, agregarlos a una orden, elegir un porcentaje de propina y ver los totales en tiempo real. Necesito un diseño visual **moderno, profesional y elegante** que eleve la experiencia de usuario a un nivel de producto SaaS de alta calidad.

---

## Funcionalidades de la App

1. **Menú de productos**: Grid de botones clickeables con nombre y precio (12 platos de restaurante: pizzas, carnes, postres, bebidas, cafés).
2. **Panel de orden**: Lista de items seleccionados con cantidad, precio unitario, subtotal y botón para eliminar.
3. **Selector de propina**: 3 opciones porcentuales (10%, 20%, 50%) via botones de selección.
4. **Resumen de totales**: Subtotal, monto de propina y total a pagar en tiempo real.
5. **Botón de acción**: "Guardar orden" para finalizar y reiniciar.
6. **Estado vacío**: Mensaje amigable cuando no hay items en la orden.

---

## Requerimientos de Diseño

### Estilo Visual
- **Tema**: Dark mode con acentos en un color primario sofisticado (sugiero un verde esmeralda `#059669` o un azul zafiro `#2563EB` sobre fondo oscuro `#0F172A` / `#1E293B`).
- **Tipografía**: Fuente sans-serif moderna (Inter, Plus Jakarta Sans, o DM Sans). Jerarquía clara entre títulos, subtítulos y cuerpo.
- **Espaciado**: Generoso, con padding consistente. Sensación de lujo y claridad.
- **Bordes**: Redondeados suaves (`rounded-xl` o `rounded-2xl`), sin bordes duros.
- **Sombras**: Sombras sutiles y difusas para elevar cards y elementos interactivos.
- **Transiciones**: Suaves en hover, focus y estados activos (200-300ms ease).

### Layout (Diseño Responsive)
- **Desktop (≥1024px)**: Layout de 2 columnas — Menú a la izquierda (60%), Panel de orden + Resumen a la derecha (40%).
- **Tablet (768px-1023px)**: 2 columnas con proporciones iguales.
- **Mobile (<768px)**: Una sola columna apilada verticalmente. Menú arriba, orden abajo con un scroll independiente o sticky.
- **Contenedor principal**: Max-width `1280px`, centrado.

### Componentes UI

#### Header
- Barra superior con logo/nombre del restaurante y título de la app.
- Degradado sutil del color primario a una tonalidad más oscura.
- Altura fija, sticky en scroll.

#### Tarjeta de Item del Menú (`MenuItem`)
- Card con fondo ligeramente elevado sobre el background oscuro.
- Icono o emoji decorativo representativo del plato (pizza, carne, café, etc.).
- Nombre del plato en `font-semibold`, precio en el color primario con `font-bold`.
- Hover: elevación sutil (scale o shadow), cambio de color de fondo.
- Feedback visual al agregar (pequeña animación o cambio de estado).

#### Panel de Orden (`OrderContent`)
- Card con fondo `#1E293B` y borde sutil.
- Cada item de la orden en una fila limpia: nombre, precio unitario × cantidad = subtotal.
- Botón de eliminar: icono de basura o "X" en rojo suave, no agresivo.
- Separadores sutiles entre items (línea de 1px con opacidad baja).
- Scrollable si la lista crece mucho.

#### Selector de Propina (`TipPercentageForm`)
- 3 botones/toggles estilizados tipo "pill" o chip.
- El seleccionado llena con el color primario, los no seleccionados tienen borde sutil.
- Etiqueta "Propina" como título de sección.
- Opcional: mostrar el porcentaje seleccionado de forma destacada.

#### Resumen de Totales (`OrderTotals`)
- Card elevada o con borde izquierdo en el color primario.
- Subtotal, Propina y Total en filas claras con alineación de precios a la derecha.
- Total en tamaño más grande y en el color primario o blanco brillante.
- Botón "Guardar orden": full-width, con el color primario como fondo, texto blanco, hover con opacidad reducida, transición suave. Disabled state visible pero no invisible.

#### Estado Vacío
- Icono ilustrativo (carrito vacío o plato).
- Mensaje amigable: "Tu orden está vacía".
- Subtexto: "Selecciona un plato del menú para comenzar".
- Opacity moderada, no desaparece del todo.

### Paleta de Colores Sugerida

| Elemento | Color |
|---|---|
| Background principal | `#0F172A` (slate-900) |
| Background secundario (cards) | `#1E293B` (slate-800) |
| Background hover cards | `#334155` (slate-700) |
| Color primario (acento) | `#059669` (emerald-600) |
| Color primario hover | `#047857` (emerald-700) |
| Texto principal | `#F8FAFC` (slate-50) |
| Texto secundario | `#94A3B8` (slate-400) |
| Borde sutil | `#334155` (slate-700) |
| Error/Eliminar | `#DC2626` (red-600) |
| Success/Agregado | `#10B981` (emerald-500) |

### Iconografía
- Usar iconos de **Lucide React** o **Heroicons** (que son compatibles con Tailwind).
- Iconos para: carrito, plato, bebida, café, estrella (propina), basura (eliminar), check (confirmar).

### Micro-interacciones
- **Agregar item**: Pequeña animación de "pop" o "scale" en el botón del menú.
- **Eliminar item**: Transición de salida suave (fade out o slide).
- **Cambiar propina**: Transición del estado del botón toggle.
- **Totales**: Transición numérica suave al actualizar.
- **Hover cards**: Elevación con `transform: translateY(-2px)` o `scale(1.02)`.

---

## Referencia Técnica

- **Framework**: React 18 + TypeScript + Vite
- **CSS**: Tailwind CSS 3.4 (utility-first, sin CSS custom)
- **Paleta**: Actualmente usa `teal-400` como color principal — necesito migrar al dark mode con emerald o sapphire.
- **Componentes actuales**: `MenuItem.tsx`, `OrderContent.tsx`, `TipPercentageForm.tsx`, `OrderTotals.tsx`
- **Datos estáticos**: 12 items de menú (pizzas, carnes, postres, bebidas, cafés, alcohol)

---

## Lo que necesito de Stitch

Genera un diseño completo de esta aplicación con:

1. **Mockup de Desktop** (≥1024px) mostrando el layout de 2 columnas.
2. **Mockup de Mobile** (<768px) mostrando el layout apilado.
3. **Componentes UI detallados** con especificaciones de espaciado, tipografía y colores.
4. **Estados interactivos**: Default, Hover, Active/Selected, Disabled, Empty State.
5. **Guía de estilo** con la paleta de colores, tipografía y espaciado exactos.
6. El diseño debe sentirse como una **app premium de restaurante** — elegante, moderna y funcional.

---

## Notas Adicionales

- Todo el texto de la interfaz debe estar en **español**.
- Los precios se muestran en formato **USD** (`$XX.XX`).
- El diseño debe ser **accesible** (contraste WCAG AA mínimo, tamaños de texto legibles).
- Evitar sobrecarga visual: limpio y con espacio negativo abundante.
- El menú debe sentirse como una vitrina atractiva, no como una lista aburrida.
