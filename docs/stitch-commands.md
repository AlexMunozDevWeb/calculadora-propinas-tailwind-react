# Stitch MCP - Comandos y Herramientas

## Configuración

### Variable de entorno
```bash
# Windows PowerShell
$env:STITCH_API_KEY="tu-api-key"

# Linux/Mac
export STITCH_API_KEY="tu-api-key"
```

### Verificar configuración
```bash
npx @_davideast/stitch-mcp doctor
```

---

## Gestión de Proyectos

### Listar todos los proyectos
```bash
npx @_davideast/stitch-mcp tool list_projects
```

### Obtener detalles de un proyecto
```bash
npx @_davideast/stitch-mcp tool get_project -d '{"projectId":"ID_DEL_PROYECTO"}'
```

### Crear un proyecto nuevo
```bash
npx @_davideast/stitch-mcp tool create_project -d '{
  "title": "Nombre del Proyecto",
  "projectType": "TEXT_TO_UI_PRO",
  "deviceType": "MOBILE"
}'
```

### Eliminar un proyecto
```bash
npx @_davideast/stitch-mcp tool delete_project -d '{"projectId":"ID_DEL_PROYECTO"}'
```

---

## Gestión de Pantallas

### Listar pantallas de un proyecto
```bash
npx @_davideast/stitch-mcp tool list_screens -d '{"projectId":"ID_DEL_PROYECTO"}'
```

### Obtener detalles de una pantalla
```bash
npx @_davideast/stitch-mcp tool get_screen -d '{
  "projectId": "ID_DEL_PROYECTO",
  "screenId": "ID_DE_LA_PANTALLA"
}'
```

### Obtener código HTML de una pantalla
```bash
npx @_davideast/stitch-mcp tool get_screen_code -d '{
  "projectId": "ID_DEL_PROYECTO",
  "screenId": "ID_DE_LA_PANTALLA"
}'
```

### Obtener imagen screenshot de una pantalla
```bash
npx @_davideast/stitch-mcp tool get_screen_image -d '{
  "projectId": "ID_DEL_PROYECTO",
  "screenId": "ID_DE_LA_PANTALLA"
}'
```

### Generar pantalla desde texto
```bash
npx @_davideast/stitch-mcp tool generate_screen_from_text -d '{
  "projectId": "ID_DEL_PROYECTO",
  "prompt": "Descripción de lo que quieres generar",
  "deviceType": "MOBILE"
}'
```

### Editar pantallas existentes
```bash
npx @_davideast/stitch-mcp tool edit_screens -d '{
  "projectId": "ID_DEL_PROYECTO",
  "screenIds": ["ID_PANTALLA_1", "ID_PANTALLA_2"],
  "prompt": "Descripción de los cambios"
}'
```

### Generar variantes de pantallas
```bash
npx @_davideast/stitch-mcp tool generate_variants -d '{
  "projectId": "ID_DEL_PROYECTO",
  "screenIds": ["ID_PANTALLA_1"],
  "prompt": "Descripción de las variantes"
}'
```

---

## Herramientas Virtuales (Proxy)

### Construir sitio web desde pantallas
```bash
npx @_davideast/stitch-mcp tool build_site -d '{
  "projectId": "ID_DEL_PROYECTO",
  "routes": [
    {"screenId": "ID_PANTALLA_1", "route": "/"},
    {"screenId": "ID_PANTALLA_2", "route": "/about"}
  ]
}'
```

### Listar todas las herramientas disponibles
```bash
npx @_davideast/stitch-mcp tool list_tools
```

---

## Exploración Interactiva

### Explorar proyectos (interactivo)
```bash
npx @_davideast/stitch-mcp view --projects
```

### Explorar pantallas de un proyecto
```bash
npx @_davideast/stitch-mcp screens -p ID_DEL_PROYECTO
```

### Previsualizar proyecto localmente
```bash
npx @_davideast/stitch-mcp serve -p ID_DEL_PROYECTO
```

---

## Diseño y Temas

### Listar sistemas de diseño
```bash
npx @_davideast/stitch-mcp tool list_design_systems -d '{"projectId":"ID_DEL_PROYECTO"}'
```

### Crear sistema de diseño
```bash
npx @_davideast/stitch-mcp tool create_design_system -d '{
  "projectId": "ID_DEL_PROYECTO",
  "name": "Nombre del Design System",
  "designTheme": {
    "colorMode": "LIGHT",
    "customColor": "#FF0000",
    "roundness": "ROUND_EIGHT"
  }
}'
```

### Aplicar sistema de diseño a pantallas
```bash
npx @_davideast/stitch-mcp tool apply_design_system -d '{
  "projectId": "ID_DEL_PROYECTO",
  "designSystemId": "ID_DEL_DESIGN_SYSTEM",
  "screenIds": ["ID_PANTALLA_1", "ID_PANTALLA_2"]
}'
```

---

## Autenticación

### Inicializar configuración (asistente)
```bash
npx @_davideast/stitch-mcp init
```

### Cerrar sesión
```bash
npx @_davideast/stitch-mcp logout
```

---

## Ejemplos Prácticos

### Ejemplo 1: Listar pantallas del proyecto Calculadora de Propinas
```bash
npx @_davideast/stitch-mcp tool list_screens -d '{"projectId":"2077899889472277059"}'
```

### Ejemplo 2: Obtener HTML de la pantalla Mobile
```bash
npx @_davideast/stitch-mcp tool get_screen_code -d '{
  "projectId": "2077899889472277059",
  "screenId": "f49327bc4afc4652867244a67c495898"
}'
```

### Ejemplo 3: Generar nueva pantalla
```bash
npx @_davideast/stitch-mcp tool generate_screen_from_text -d '{
  "projectId": "2077899889472277059",
  "prompt": "Una pantalla de login moderna con campos de email y contraseña",
  "deviceType": "MOBILE"
}'
```

---

## Referencia Rápida

| Acción | Comando |
|--------|---------|
| Listar proyectos | `tool list_projects` |
| Ver proyecto | `tool get_project -d '{"projectId":"..."}'` |
| Listar pantallas | `tool list_screens -d '{"projectId":"..."}'` |
| Ver HTML | `tool get_screen_code -d '{"projectId":"...","screenId":"..."}'` |
| Ver screenshot | `tool get_screen_image -d '{"projectId":"...","screenId":"..."}'` |
| Generar pantalla | `tool generate_screen_from_text -d '{"projectId":"...","prompt":"..."}'` |
| Editar pantalla | `tool edit_screens -d '{"projectId":"...","screenIds":[...],"prompt":"..."}'` |
| Construir sitio | `tool build_site -d '{"projectId":"...","routes":[...]}'` |
| Verificar config | `doctor` |
| Explorar UI | `view --projects` |
