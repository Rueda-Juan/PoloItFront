import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // 1. Importa useNavigate
import { useAuth } from '../modules/auth/hooks/useAuth';
import { FiMap, FiUser, FiList, FiLogIn, FiLogOut, FiLoader, FiPower } from 'react-icons/fi';

function Navbar({ onLoginClick }) { 
  const { user, isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // 2. Llama al hook

  const baseButtonClasses = "flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap";
  const activeClasses = "bg-gray-200 text-gray-900";
  const inactiveClasses = "bg-transparent text-gray-600 hover:bg-gray-100";

  // 3. Crea una función para manejar el logout y la redirección
  const handleLogout = () => {
    logout();      // Limpia la sesión
    navigate('/'); // Redirige a la página principal
  };

  return (
    <nav className="w-full bg-white shadow-md">
      
      {/* ZONA 1: LOGO */}
      <div className="flex justify-center items-center h-14 border-b border-gray-100">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors">
          AlquiMaps
        </Link>
      </div>

      {/* ZONA 2: NAVEGACIÓN */}
      <div className="grid grid-cols-3 items-center h-16 px-4">
        
        {/* Sub-Zona 2.1: Mapa */}
        <div className="flex justify-center">
          <Link 
            to="/"
            className={`${baseButtonClasses} ${location.pathname === '/' ? activeClasses : inactiveClasses}`}
          >
            <FiMap />
            <span>Mapa</span>
          </Link>
        </div>

        {/* Sub-Zona 2.2: Mis Alquileres */}
        <div className="flex justify-center">
          {isAuthenticated && (
            <Link 
              to="/mis-rentals"
              className={`${baseButtonClasses} ${location.pathname === '/mis-rentals' ? activeClasses : inactiveClasses}`}
            >
              <FiList />
              <span>Mis Alquileres</span>
            </Link>
          )}
        </div>

        {/* Sub-Zona 2.3: Perfil y Autenticación */}
        <div className="flex justify-center items-center gap-4">
          {loading ? (
            <FiLoader className="animate-spin text-purple-600" size={24} />
          ) : isAuthenticated && user ? (
            <>
              <Link 
                to={`/perfil/${user.id}`}
                className={`${baseButtonClasses} ${location.pathname.startsWith('/perfil') ? activeClasses : inactiveClasses}`}
              >
                <FiUser />
                <span>Mi Perfil</span>
              </Link>
              <button 
                onClick={handleLogout} // 4. Usa la nueva función
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-rose-400 hover:bg-rose-500 text-white rounded-full transition-colors duration-200"
                title="Cerrar sesión"
              >
                <FiPower size={18} />
              </button>
            </>
          ) : (
            <button 
              onClick={onLoginClick}
              className={`${baseButtonClasses} ${inactiveClasses}`}
            >
              <FiLogIn />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;