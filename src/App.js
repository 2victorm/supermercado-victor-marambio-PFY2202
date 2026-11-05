import React from 'react';
import { HashRouter } from 'react-router-dom';
import { InventarioProvider } from './context/InventarioContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <InventarioProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </InventarioProvider>
  );
}

export default App;
