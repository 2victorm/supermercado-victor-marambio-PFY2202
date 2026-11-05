import React from 'react';

// Selector de categoría
function FiltroCategoria({ categorias, valor, onChange }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
      <label htmlFor="filtro-categoria" className="font-medium">
        Filtrar por categoría:
      </label>
      <select
        id="filtro-categoria"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="input sm:w-64"
      >
        <option value="Todas">Todas</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategoria;
