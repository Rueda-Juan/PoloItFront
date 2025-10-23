import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa solo las páginas que realmente existen
import MapaRentalsPage from '../modules/rentals/pages/MapaRentalsPage';
import MyRentalsPage from '../modules/rentals/pages/MyRentalsPage';
import ProfilePage from '../modules/user/pages/ProfilePage';
import EditProfilePage from '../modules/user/pages/EditProfilePage'; // Asegúrate de que esta esté importada

import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS --- */}
      <Route path="/" element={<MapaRentalsPage />} />
      <Route path="/perfil/:userId" element={<ProfilePage />} />
      
      {/* Las rutas de /login y /register se eliminan */}

      {/* --- RUTAS PROTEGIDAS --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/mis-rentals" element={<MyRentalsPage />} />
        <Route path="/perfil/editar" element={<EditProfilePage />} />
      </Route>

      {/* Ruta para cuando no se encuentra la página */}
      <Route path="*" element={
        <div className='p-8'>
          <h1 className='text-3xl font-bold'>404: Página no encontrada</h1>
        </div>
      } />
    </Routes>
  );
}

export default AppRouter;