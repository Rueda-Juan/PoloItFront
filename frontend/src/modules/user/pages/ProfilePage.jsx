import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { getUserById } from '../../../api/apiUser'; // Asegúrate que el nombre del archivo sea correcto
import Loader from '../../../components/Loader';
import { FiUser, FiMail, FiEdit } from 'react-icons/fi';

function ProfilePage() {
  const { userId } = useParams();
  const { user: loggedInUser, loading: authLoading } = useAuth();
  
  const [profileUser, setProfileUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comprueba si el perfil que se visita es el del usuario logueado
  const isMyProfile = loggedInUser && loggedInUser.id === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setError(null);
        const userData = await getUserById(userId);
        setProfileUser(userData);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el perfil.');
      } finally {
        setProfileLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]); // Se ejecuta cada vez que el userId de la URL cambia

  // Muestra el loader mientras carga la autenticación o el perfil
  if (authLoading || profileLoading) {
    return <Loader />;
  }

  // Muestra un mensaje de error si la petición falló
  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error al Cargar Perfil</h1>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  // Muestra un mensaje si no se encontró el usuario
  if (!profileUser) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Usuario no encontrado</h1>
      </div>
    );
  }

  // Renderiza la tarjeta del perfil
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-lg p-6 sm:p-8 relative">
        
        {/* Botón de Editar (solo si es mi perfil) */}
        {isMyProfile && (
          <Link
            to="/perfil/editar"
            className="absolute top-4 right-4 p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-purple-100 hover:text-purple-600 transition"
            title="Editar Perfil"
          >
            <FiEdit size={20} />
          </Link>
        )}

        {/* Info del Perfil */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          {/* Imagen de Perfil (Placeholder) */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <FiUser size={64} className="text-gray-400" />
              {/* Si tuvieras una URL de avatar, la usarías así: */}
              {/* <img src={profileUser.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" /> */}
            </div>
          </div>
          
          {/* Detalles */}
          <div className="text-center sm:text-left mt-2 sm:mt-0">
            <h1 className="text-3xl font-bold text-gray-800">
              {profileUser.name || profileUser.username}
            </h1>
            
            <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-2">
              <FiMail className="mr-2" />
              <span>{profileUser.email}</span>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              Miembro desde: {new Date(profileUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;