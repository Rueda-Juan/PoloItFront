import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Este componente ahora recibe funciones como props para manejar el éxito y el cambio de modal
function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      // Si el login es exitoso, llama a la función del padre
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      {error && (
        <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ... (los inputs de email y password son idénticos a los de LoginPage) ... */}
        <div>
          <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email-login" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input type="password" id="password-login" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700">
          Entrar
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿No tienes cuenta?{' '}
        {/* Este ya no es un Link, es un botón que cambia de modal */}
        <button type="button" onClick={onSwitchToRegister} className="font-medium text-purple-600 hover:underline">
          Regístrate
        </button>
      </p>
    </>
  );
}

export default LoginForm;