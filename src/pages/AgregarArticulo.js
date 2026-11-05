import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS } from '../data/inventarioInicial';
import Button from '../components/Button';

const formularioVacio = {
  nombre: '',
  categoria: CATEGORIAS[0],
  precio: '',
  stock: '',
  descripcion: '',
};

function AgregarArticulo() {
  const { dispatch } = useInventario();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(formularioVacio);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const precio = Number(formulario.precio);
    const stock = Number(formulario.stock);

    if (!formulario.nombre.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (!(precio > 0)) {
      setError('El precio debe ser mayor a 0.');
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setError('El stock debe ser un número entero igual o mayor a 0.');
      return;
    }

    dispatch({
      type: 'AGREGAR_ARTICULO',
      payload: {
        nombre: formulario.nombre.trim(),
        categoria: formulario.categoria,
        precio,
        stock,
        descripcion: formulario.descripcion.trim(),
      },
    });
    setFormulario(formularioVacio);
    setError('');
    navigate('/');
  };

  return (
    <section className="card mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">Agregar artículo al inventario</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="nombre" className="mb-1 block font-medium">Nombre</label>
          <input id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} className="input" />
        </div>

        <div>
          <label htmlFor="categoria" className="mb-1 block font-medium">Categoría</label>
          <select id="categoria" name="categoria" value={formulario.categoria} onChange={handleChange} className="input">
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="precio" className="mb-1 block font-medium">Precio (CLP)</label>
            <input id="precio" name="precio" type="number" min="1" value={formulario.precio} onChange={handleChange} className="input" />
          </div>
          <div>
            <label htmlFor="stock" className="mb-1 block font-medium">Stock</label>
            <input id="stock" name="stock" type="number" min="0" value={formulario.stock} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label htmlFor="descripcion" className="mb-1 block font-medium">Descripción</label>
          <textarea id="descripcion" name="descripcion" rows="3" value={formulario.descripcion} onChange={handleChange} className="input" />
        </div>

        {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

        <Button type="submit">Guardar artículo</Button>
      </form>
    </section>
  );
}

export default AgregarArticulo;
