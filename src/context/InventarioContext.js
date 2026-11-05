import React, { createContext, useContext, useReducer } from 'react';
import { inventarioInicial } from '../data/inventarioInicial';

// Estado global: el inventario completo y el carrito 
export const estadoInicial = {
  inventario: inventarioInicial,
  carrito: [],
};

// Reducer: nunca modifica el estado directamente, siempre devuelve copias nuevas 
export function inventarioReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR_ARTICULO': {
      const nuevoId = state.inventario.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      return {
        ...state,
        inventario: [...state.inventario, { ...action.payload, id: nuevoId }],
      };
    }

    // Agregar 1 unidad al carrito y restar 1 del stock 
    case 'AGREGAR_AL_CARRITO': {
      const articulo = state.inventario.find((a) => a.id === action.id);
      if (!articulo || articulo.stock <= 0) return state;

      const inventario = state.inventario.map((a) =>
        a.id === action.id ? { ...a, stock: a.stock - 1 } : a
      );
      const enCarrito = state.carrito.find((c) => c.id === action.id);
      const carrito = enCarrito
        ? state.carrito.map((c) => (c.id === action.id ? { ...c, cantidad: c.cantidad + 1 } : c))
        : [...state.carrito, { id: action.id, cantidad: 1 }];

      return { ...state, inventario, carrito };
    }

    // Quitar 1 unidad del carrito y devolverla al stock 
    case 'DISMINUIR_CANTIDAD': {
      const enCarrito = state.carrito.find((c) => c.id === action.id);
      if (!enCarrito) return state;

      const inventario = state.inventario.map((a) =>
        a.id === action.id ? { ...a, stock: a.stock + 1 } : a
      );
      const carrito = state.carrito
        .map((c) => (c.id === action.id ? { ...c, cantidad: c.cantidad - 1 } : c))
        .filter((c) => c.cantidad > 0);

      return { ...state, inventario, carrito };
    }

    // Eliminar el artículo del carrito y devolver todas sus unidades al stock
    case 'QUITAR_DEL_CARRITO': {
      const enCarrito = state.carrito.find((c) => c.id === action.id);
      if (!enCarrito) return state;

      return {
        ...state,
        inventario: state.inventario.map((a) =>
          a.id === action.id ? { ...a, stock: a.stock + enCarrito.cantidad } : a
        ),
        carrito: state.carrito.filter((c) => c.id !== action.id),
      };
    }

    default:
      return state;
  }
}

const InventarioContext = createContext(null);

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(inventarioReducer, estadoInicial);
  return (
    <InventarioContext.Provider value={{ ...state, dispatch }}>{children}</InventarioContext.Provider>
  );
}

// Hook personalizado para consumir el estado global
export function useInventario() {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de un InventarioProvider');
  }
  return context;
}
