import React from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import CarritoItem from '../components/CarritoItem';
import { formatearPrecio } from '../utils/formato';

function Carrito() {
  const { inventario, carrito, dispatch } = useInventario();

  // Une cada línea del carrito con los datos actuales del inventario
  const lineas = carrito
    .map((item) => ({ articulo: inventario.find((a) => a.id === item.id), cantidad: item.cantidad }))
    .filter((linea) => linea.articulo);

  const total = lineas.reduce((suma, l) => suma + l.articulo.precio * l.cantidad, 0);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Carrito de compras</h1>

      {lineas.length === 0 ? (
        <div className="card text-center">
          <p className="mb-4 text-gray-600">Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-primary">
            Ver inventario
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {lineas.map(({ articulo, cantidad }) => (
              <CarritoItem
                key={articulo.id}
                articulo={articulo}
                cantidad={cantidad}
                onAumentar={() => dispatch({ type: 'AGREGAR_AL_CARRITO', id: articulo.id })}
                onDisminuir={() => dispatch({ type: 'DISMINUIR_CANTIDAD', id: articulo.id })}
                onQuitar={() => dispatch({ type: 'QUITAR_DEL_CARRITO', id: articulo.id })}
              />
            ))}
          </ul>

          <div className="card mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-brand-primary">{formatearPrecio(total)}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
