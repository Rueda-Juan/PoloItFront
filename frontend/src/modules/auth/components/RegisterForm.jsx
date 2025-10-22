import React, { useState } from 'react';
import { registerUser } from '../../../api/apiAuth';

function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await registerUser(formData);
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // Llama a la función del padre después de un momento
      if (onRegisterSuccess) setTimeout(onRegisterSuccess, 2000);
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    }
  };

  return (
    <>
      {error && <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md mb-4"><strong>Error:</strong> {error}</div>}
      {success && <div className="p-3 text-sm text-green-800 bg-green-100 rounded-md mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ... (los inputs de name, email y password son idénticos a los de RegisterPage) ... */}
        <div>
          <label htmlFor="name-register" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input type="text" name="name" id="name-register" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" id="email-register" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input type="password" name="password" id="password-register" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700">
          Registrarse
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-purple-600 hover:underline">
          Inicia Sesión
        </button>
      </p>
    </>
  );
}

export default RegisterForm;