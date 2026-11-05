import { inventarioReducer, estadoInicial } from './InventarioContext';

const stockDe = (state, id) => state.inventario.find((a) => a.id === id).stock;

describe('inventarioReducer', () => {
  test('agregar al carrito resta stock y crea la línea', () => {
    const s = inventarioReducer(estadoInicial, { type: 'AGREGAR_AL_CARRITO', id: 1 });
    expect(stockDe(s, 1)).toBe(stockDe(estadoInicial, 1) - 1);
    expect(s.carrito).toEqual([{ id: 1, cantidad: 1 }]);
  });

  test('no muta el estado anterior', () => {
    const copia = JSON.stringify(estadoInicial);
    inventarioReducer(estadoInicial, { type: 'AGREGAR_AL_CARRITO', id: 1 });
    expect(JSON.stringify(estadoInicial)).toBe(copia);
  });

  test('aumentar y disminuir mantienen inventario + carrito consistentes', () => {
    let s = estadoInicial;
    const total = stockDe(s, 4);
    s = inventarioReducer(s, { type: 'AGREGAR_AL_CARRITO', id: 4 });
    s = inventarioReducer(s, { type: 'AGREGAR_AL_CARRITO', id: 4 });
    expect(s.carrito[0].cantidad).toBe(2);
    expect(stockDe(s, 4)).toBe(total - 2);
    s = inventarioReducer(s, { type: 'DISMINUIR_CANTIDAD', id: 4 });
    expect(s.carrito[0].cantidad).toBe(1);
    expect(stockDe(s, 4)).toBe(total - 1);
    s = inventarioReducer(s, { type: 'DISMINUIR_CANTIDAD', id: 4 });
    expect(s.carrito).toEqual([]);
    expect(stockDe(s, 4)).toBe(total);
  });

  test('no permite agregar más unidades que el stock', () => {
    let s = inventarioReducer(estadoInicial, {
      type: 'AGREGAR_ARTICULO',
      payload: { nombre: 'Prueba', categoria: 'Aseo', precio: 100, stock: 1, descripcion: '' },
    });
    const id = s.inventario[s.inventario.length - 1].id;
    s = inventarioReducer(s, { type: 'AGREGAR_AL_CARRITO', id });
    const despues = inventarioReducer(s, { type: 'AGREGAR_AL_CARRITO', id });
    expect(despues).toBe(s);
    expect(stockDe(despues, id)).toBe(0);
  });

  test('quitar del carrito devuelve todo el stock', () => {
    let s = estadoInicial;
    const total = stockDe(s, 2);
    for (let i = 0; i < 3; i++) s = inventarioReducer(s, { type: 'AGREGAR_AL_CARRITO', id: 2 });
    s = inventarioReducer(s, { type: 'QUITAR_DEL_CARRITO', id: 2 });
    expect(stockDe(s, 2)).toBe(total);
    expect(s.carrito).toEqual([]);
  });

  test('agregar artículo asigna un id nuevo', () => {
    const s = inventarioReducer(estadoInicial, {
      type: 'AGREGAR_ARTICULO',
      payload: { nombre: 'Nuevo', categoria: 'Aseo', precio: 500, stock: 5, descripcion: '' },
    });
    expect(s.inventario).toHaveLength(estadoInicial.inventario.length + 1);
    expect(s.inventario[s.inventario.length - 1].id).toBe(15);
  });
});
