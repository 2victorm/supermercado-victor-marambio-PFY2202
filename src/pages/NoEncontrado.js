import React from 'react';
import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <section className="card text-center">
      <h1 className="mb-2 text-2xl font-bold">Página no encontrada</h1>
      <p className="mb-4 text-gray-600">La ruta que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrado;
