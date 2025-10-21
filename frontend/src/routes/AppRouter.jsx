import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa tus páginas
import MapaRentalsPage from '../modules/rentals/pages/MapaRentalsPage';
import MyRentalsPage from '../modules/rentals/pages/MyRentalsPage';
import ProfilePage from '../modules/user/pages/ProfilePage';
import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';

// --- ¡IMPORTAMOS EL PROTECTOR! ---
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS --- */}
      <Route path="/" element={<MapaRentalsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element ={<RegisterPage/>}/>


      {/* --- RUTAS PROTEGIDAS --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/mis-rentals" element={<MyRentalsPage />} />
        <Route path="/perfil/:userId" element={<ProfilePage />} />
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