import React from 'react';
import Button from './Button';
import { formatearPrecio } from '../utils/formato';

// Fila del carrito: muestra el artículo y permite aumentar, disminuir o quitar
function CarritoItem({ articulo, cantidad, onAumentar, onDisminuir, onQuitar }) {
  return (
    <li className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">{articulo.nombre}</h3>
        <p className="text-sm text-gray-600">
          {formatearPrecio(articulo.precio)} c/u · Stock restante: {articulo.stock}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onDisminuir} aria-label={`Disminuir ${articulo.nombre}`}>
          −
        </Button>
        <span className="w-8 text-center font-semibold">{cantidad}</span>
        <Button
          variant="secondary"
          onClick={onAumentar}
          disabled={articulo.stock === 0}
          aria-label={`Aumentar ${articulo.nombre}`}
        >
          +
        </Button>
        <span className="w-24 text-right font-bold">{formatearPrecio(articulo.precio * cantidad)}</span>
        <Button variant="danger" onClick={onQuitar}>
          Quitar
        </Button>
      </div>
    </li>
  );
}

export default CarritoItem;
