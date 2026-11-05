import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import Button from '../components/Button';
import { formatearPrecio } from '../utils/formato';

function Detalle() {
  //  entrega el parámetro dinámico definido en la ruta: articulos/:articuloId
  const { articuloId } = useParams();
  const { inventario, carrito, dispatch } = useInventario();

  const articulo = inventario.find((a) => a.id === Number(articuloId));
  const enCarrito = carrito.find((c) => c.id === Number(articuloId));

  if (!articulo) {
    return (
      <section className="card text-center">
        <p className="mb-4">El artículo solicitado no existe.</p>
        <Link to="/" className="btn btn-primary">
          Volver al inventario
        </Link>
      </section>
    );
  }

  const agotado = articulo.stock === 0;

  return (
    <section className="card mx-auto max-w-2xl">
      <Link to="/" className="text-sm font-medium text-brand-primary hover:underline">
        ← Volver al inventario
      </Link>

      <span className="mt-4 block w-fit rounded-full bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand-secondary">
        {articulo.categoria}
      </span>
      <h1 className="mt-2 text-2xl font-bold">{articulo.nombre}</h1>
      <p className="mt-1 text-3xl font-bold text-brand-primary">{formatearPrecio(articulo.precio)}</p>
      <p className="mt-4 text-gray-700">{articulo.descripcion || 'Sin descripción disponible.'}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <dt className="text-gray-500">Stock disponible</dt>
        <dd className={`font-semibold ${agotado ? 'text-red-600' : ''}`}>
          {agotado ? 'Agotado' : articulo.stock}
        </dd>
        <dt className="text-gray-500">Unidades en tu carrito</dt>
        <dd className="font-semibold">{enCarrito ? enCarrito.cantidad : 0}</dd>
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => dispatch({ type: 'AGREGAR_AL_CARRITO', id: articulo.id })}
          disabled={agotado}
        >
          {agotado ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
        <Link to="/carrito" className="btn btn-secondary">
          Ir al carrito
        </Link>
      </div>
    </section>
  );
}

export default Detalle;
