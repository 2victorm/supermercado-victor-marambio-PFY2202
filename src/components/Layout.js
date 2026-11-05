import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';

const linkClase = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm transition ${
    isActive
      ? 'bg-brand-accent font-bold text-gray-800'
      : 'text-white hover:bg-brand-primary'
  }`;

function Layout() {
  const { carrito } = useInventario();
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Encabezado azul */}
      <header className="flex flex-wrap items-baseline gap-4 bg-brand-primary px-6 py-3.5 text-white">
        <h1 className="text-3xl font-bold italic">
          Supermercado <span className="text-brand-accent">Segundo</span>
        </h1>
        <p className="opacity-90">Gestión de inventario</p>
      </header>

     
      <nav className="flex flex-wrap justify-end gap-2 bg-brand-secondary px-6 py-2">
        <NavLink to="/" end className={linkClase}>
          Inventario
        </NavLink>
        <NavLink to="/agregar" className={linkClase}>
          Agregar artículo
        </NavLink>
        <NavLink to="/carrito" className={linkClase}>
          Carrito ({totalUnidades})
        </NavLink>
      </nav>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
