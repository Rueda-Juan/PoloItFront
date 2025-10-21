import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
// --- ¡CAMBIO! Importamos la función correcta de la API correcta ---
import { updateUser } from '../../../api/apiUsers'; 
import Loader from '../../../components/Loader';

function EditProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // --- ¡CAMBIO! Usamos 'updateUser' con el método PATCH ---
      const updatedUser = await updateUser(user.id, formData);
      setSuccess('¡Perfil actualizado con éxito!');
      
      // (Aquí deberías actualizar el AuthContext si tienes la función)
      
      setTimeout(() => {
        navigate(`/perfil/${user.id}`);
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  if (authLoading) {
    return <Loader />;
  }

  // --- El JSX del formulario es idéntico al que te di antes ---
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Editar Mi Perfil</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-md">
            {success}
          </div>
        )}

        {/* Campo: Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        {/* Campo: Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={formLoading}
          className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {formLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
      
      {/* (Opcional) Aquí podrías poner el formulario de cambio de contraseña */}
      {/* <ChangePasswordForm /> */}
    </div>
  );
}

export default EditProfilePage;