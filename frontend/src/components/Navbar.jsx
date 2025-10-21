import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth'; // Tu hook
import { FiMap, FiUser, FiList, FiLogIn, FiLogOut, FiLoader } from 'react-icons/fi';

function Navbar() {
  // Obtenemos los datos REALES del contexto
  const { user, isAuthenticated, loading, logout } = useAuth();

  const renderAuthLinks = () => {
    // 1. Si está cargando, mostramos un spinner
    if (loading) {
      return <FiLoader className="animate-spin text-purple-600" size={24} />;
    }

    // 2. Si está autenticado, mostramos sus links
    if (isAuthenticated && user) {
      return (
        <>
          {/* Botón de "Mis Rentals" */}
          <Link 
            to="/mis-rentals" 
            className="flex items-center text-gray-600 hover:text-purple-600"
          >
            <FiList className="mr-1" />
            <span>Mis Rentals</span>
          </Link>

          {/* Botón de Perfil */}
          <Link 
            to={`/perfil/${user.id}`} // Usa el user.id real del contexto
            className="flex items-center text-gray-600 hover:text-purple-600"
          >
            <FiUser className="mr-1" />
            <span>Mi Perfil</span>
          </Link>

          {/* Botón de Logout */}
          <button 
            onClick={logout}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <FiLogOut className="mr-1" />
            <span>Logout</span>
          </button>
        </>
      );
    }

    // 3. Si no está autenticado, mostramos Login
    return (
      <Link 
        to="/login"
        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        <FiLogIn className="mr-2" />
        <span>Login</span>
      </Link>
    );
  };

  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50 relative">
      <Link to="/" className="text-2xl font-bold text-purple-600">
        RentalMap
      </Link>

      <div className="flex items-center space-x-6">
        {/* Botón de Mapa (siempre visible) */}
        <Link 
          to="/" 
          className="flex items-center text-gray-600 hover:text-purple-600"
        >
          <FiMap className="mr-1" />
          <span>Mapa</span>
        </Link>
        
        {/* Links de autenticación dinámicos */}
        {renderAuthLinks()}
      </div>
    </nav>
  );
}

export default Navbar;