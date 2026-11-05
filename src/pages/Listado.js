import React, { useState } from 'react';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS } from '../data/inventarioInicial';
import ArticuloFila, { STOCK_BAJO } from '../components/ArticuloFila';
import FiltroCategoria from '../components/FiltroCategoria';

function Listado() {
  const { inventario } = useInventario();
  const [categoria, setCategoria] = useState('Todas');

  // El inventario original no se modifica
  const articulosFiltrados =
    categoria === 'Todas' ? inventario : inventario.filter((a) => a.categoria === categoria);

  // Resumen calculado sobre el inventario completo
  const totalUnidades = inventario.reduce((suma, a) => suma + a.stock, 0);
  const articulosStockBajo = inventario.filter((a) => a.stock < STOCK_BAJO).length;

  return (
    <section>
      <h2 className="text-2xl font-bold">Gestión de inventario</h2>
      <p className="mb-4 text-gray-600">Revisa el stock de los productos del supermercado.</p>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="banner min-w-[260px] bg-brand-primary text-white">
          <strong className="text-2xl text-brand-accent">INVENTARIO</strong> al día en{' '}
          {inventario.length} productos
        </div>
        <div className="banner min-w-[260px] bg-brand-accent text-gray-800">
          <strong className="text-2xl text-brand-secondary">REPONER</strong> {articulosStockBajo}{' '}
          {articulosStockBajo === 1 ? 'producto con stock bajo' : 'productos con stock bajo'}
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="tarjeta-resumen">
          <span className="text-3xl font-bold text-brand-primary">{inventario.length}</span>
          <span>Productos</span>
        </div>
        <div className="tarjeta-resumen">
          <span className="text-3xl font-bold text-brand-primary">{totalUnidades}</span>
          <span>Unidades en stock</span>
        </div>
        <div className="tarjeta-resumen">
          <span className="text-3xl font-bold text-brand-primary">{articulosStockBajo}</span>
          <span>Con stock bajo</span>
        </div>
      </div>

      <div className="mb-4">
        <FiltroCategoria categorias={CATEGORIAS} valor={categoria} onChange={setCategoria} />
      </div>

      <p className="mb-2 text-sm text-gray-600">
        Mostrando {articulosFiltrados.length} de {inventario.length} artículos
      </p>

      {articulosFiltrados.length === 0 ? (
        <p className="card text-center text-gray-500">No hay artículos en esta categoría.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-light text-brand-secondary">
                <th className="px-3 py-2.5">Producto</th>
                <th className="px-3 py-2.5">Categoría</th>
                <th className="px-3 py-2.5">Precio</th>
                <th className="px-3 py-2.5">Stock</th>
                <th className="px-3 py-2.5">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulosFiltrados.map((articulo) => (
                <ArticuloFila key={articulo.id} articulo={articulo} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Listado;
