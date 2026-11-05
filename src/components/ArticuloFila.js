import React from 'react';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formato';

export const STOCK_BAJO = 10;

// Fila de la tabla del listado. El nombre navega al detalle del artículo.
function ArticuloFila({ articulo }) {
  const agotado = articulo.stock === 0;
  const stockBajo = articulo.stock < STOCK_BAJO;

  return (
    <tr className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
      <td className="px-3 py-2.5">
        <Link
          to={`/articulos/${articulo.id}`}
          className="font-semibold text-brand-primary hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {articulo.nombre}
        </Link>
      </td>
      <td className="px-3 py-2.5">{articulo.categoria}</td>
      <td className="px-3 py-2.5">{formatearPrecio(articulo.precio)}</td>
      <td className={`px-3 py-2.5 ${stockBajo ? 'font-bold text-red-600' : ''}`}>
        {agotado ? 'Agotado' : articulo.stock}
      </td>
      <td className="px-3 py-2.5">
        <Link
          to={`/articulos/${articulo.id}`}
          className="btn btn-primary px-3 py-1 text-sm"
        >
          Ver detalle
        </Link>
      </td>
    </tr>
  );
}

export default ArticuloFila;
