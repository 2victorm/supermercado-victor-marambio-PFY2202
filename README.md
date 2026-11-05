# Supermercado Segundo – Gestión de inventario

Actividad sumativa Semana 3.
Sitio web en React para gestionar el inventario de un supermercado y simular un carrito de compras.

## Funcionalidades

- **Listado de artículos:** muestra todo el inventario con nombre, categoría, precio y stock.
- **Filtro por categoría:** filtra la lista dinámicamente sin modificar el inventario original.
- **Detalle de artículo:** al hacer clic en un artículo se ve su detalle y se puede agregar al carrito (resta stock).
- **Carrito de compras:** lista los artículos agregados, permite aumentar, disminuir o quitar unidades; el inventario se actualiza en cada cambio.
- **Agregar artículo:** formulario con validaciones para sumar nuevos productos al inventario.

## Tecnologías

- React 18 (create-react-app)
- React Router 6 (rutas centralizadas en `AppRoutes.js`, layout con `Outlet`, lazy loading y parámetros dinámicos)
- Estado global con Context API + `useReducer` (inmutable)
- Tailwind CSS 3 (clases reutilizables con `@apply`, tema propio en `tailwind.config.js`, diseño responsive)

## Estructura

```
src/
├── App.js                  # Provider de estado + Router
├── AppRoutes.js            # Todas las rutas (lazy loading)
├── context/                # InventarioContext: estado global y reducer
├── data/                   # Datos iniciales del inventario
├── components/             # Layout, Button, ArticuloFila, FiltroCategoria, CarritoItem
├── pages/                  # Listado, Detalle, Carrito, AgregarArticulo, NoEncontrado
└── utils/                  # Formato de precios
```

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Listado con filtro |
| `/articulos/:articuloId` | Detalle del artículo |
| `/carrito` | Carrito de compras |
| `/agregar` | Agregar artículo |

## Ejecución local

```bash
npm install
npm start
```

Se abre en http://localhost:3000.