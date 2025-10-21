// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// Importamos la API desde la ruta correcta
import { createRental } from '../../../api/apiRentals'; 

// --- ¡CAMBIO! ---
// Recibimos 'locationData' como prop, que contendrá { lat, lng, location }
function CrearRentaForm({ onRentalCreado, locationData }) {
  
  // El estado ahora solo maneja los campos que el usuario escribe
  const [formData, setFormData] = useState({
    userId: '', // En un futuro, esto vendría del AuthContext
    title: '',
    description: '',
    price: '',
  });

  const [estaCargando, setEstaCargando] = useState(false);
  const [error, setError] = useState(null);

  // Manejador simple para los inputs
  const manejarCambioSimple = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEstaCargando(true);
    setError(null);

    try {
      // --- ¡CAMBIO! ---
      // Combinamos el estado del formulario (title, price...)
      // con los datos de ubicación recibidos (lat, lng, location)
      const datosParaAPI = {
        ...formData,
        ...locationData, // Esto añade lat, lng, y location
        price: parseFloat(formData.price) || 0,
      };

      // Separamos el userId como lo pide la API
      const { userId, ...rentalData } = datosParaAPI;
      
      const nuevaRenta = await createRental(userId, rentalData);
      
      if (onRentalCreado) {
        onRentalCreado(nuevaRenta);
      }

    } catch (err) {
      setError(err.message || 'Ocurrió un error desconocido');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={manejarEnvio} className="space-y-5">
        
        {/* --- CAMPO DE UBICACIÓN (AHORA ES INFORMATIVO) --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación Seleccionada
          </label>
          <input
            type="text"
            value={locationData.location || 'Haz clic en el mapa para elegir...'}
            disabled // El usuario no puede editar esto
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Campo: User ID */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            ID de Usuario
          </label>
          <input
            type="text"
            name="userId"
            id="userId"
            value={formData.userId}
            onChange={manejarCambioSimple}
            required
            className="w-full px-3 py-2 bg-white/70 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Campo: Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={manejarCambioSimple}
            required
            className="w-full px-3 py-2 bg-white/70 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        {/* (Los campos 'description' y 'price' son iguales que antes) */}
        
        {/* Campo: Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={formData.description}
            onChange={manejarCambioSimple}
            className="w-full px-3 py-2 bg-white/70 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Campo: Precio */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio (USD)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={manejarCambioSimple}
            required
            className="w-full px-3 py-2 bg-white/70 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Botón de envío */}
        <div>
          <button
            type="submit"
            disabled={estaCargando || !locationData.lat} // Deshabilitado si no hay ubicación
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {estaCargando ? 'Creando...' : 'Crear Renta'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearRentaForm;