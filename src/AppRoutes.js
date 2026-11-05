import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

//Cada página se descarga solo cuando se visita su ruta
const Listado = lazy(() => import('./pages/Listado'));
const Detalle = lazy(() => import('./pages/Detalle'));
const AgregarArticulo = lazy(() => import('./pages/AgregarArticulo'));
const Carrito = lazy(() => import('./pages/Carrito'));
const NoEncontrado = lazy(() => import('./pages/NoEncontrado'));

function AppRoutes() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-gray-500">Cargando...</p>}>
      <Routes>
        {/* Layout común (navbar) con rutas anidadas renderizadas en <Outlet /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Listado />} />
          <Route path="articulos/:articuloId" element={<Detalle />} />
          <Route path="agregar" element={<AgregarArticulo />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
