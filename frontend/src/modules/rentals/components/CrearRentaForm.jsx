import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { createRental } from '../../../api/apiRentals'; // Asegúrate que la ruta a tu API sea correcta

function CrearRentaForm({ onRentalCreado, locationData }) {
  const { user } = useAuth(); // Obtenemos el usuario del contexto

  // --- CORRECCIÓN: Estado inicial con todos los campos del DTO ---
  const [formData, setFormData] = useState({
    title: '',
    address: '', // Campo requerido por DTO
    rooms: 1,    // Campo requerido por DTO
    price: '',
    area: '',    // Campo opcional
    description: '',
    availableFrom: '', // Campo opcional (date string)
    accessibility: false, // Campo opcional
  });

  const [estaCargando, setEstaCargando] = useState(false);
  const [error, setError] = useState(null);

  // --- CORRECCIÓN: Manejador de cambios mejorado ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Maneja checkboxes y otros inputs
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstaCargando(true);
    setError(null);

    if (!user || !user.id) {
      setError("Error de autenticación. Por favor, inicia sesión de nuevo.");
      setEstaCargando(false);
      return;
    }

    try {
      // --- CORRECCIÓN: Construcción del objeto a enviar ---
      const rentalData = {
        ...formData, // Incluye title, address, rooms, price, area, description, availableFrom, accessibility
        lat: locationData.lat, // lat de la ubicación seleccionada
        lng: locationData.lng, // lng de la ubicación seleccionada
        // Convertimos a números
        price: parseFloat(formData.price) || 0,
        rooms: parseInt(formData.rooms, 10) || 0,
        // Enviamos 'area' solo si el usuario ingresó un valor
        area: formData.area ? parseFloat(formData.area) : undefined, 
      };

      // Si availableFrom está vacío, lo eliminamos para que no falle la validación @IsDateString
      if (!rentalData.availableFrom) {
        delete rentalData.availableFrom;
      }

      console.log('Enviando al backend:', rentalData); // Para depurar

      // Pasamos el user.id del contexto y los datos del alquiler a la API
      const nuevaRenta = await createRental(user.id, rentalData);
      
      if (onRentalCreado) {
        onRentalCreado(nuevaRenta);
      }

    } catch (err) {
      setError(err.message || 'Ocurrió un error al crear el alquiler');
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

      {/* --- CORRECCIÓN: Formulario con todos los campos --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Coordenadas (informativo) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coordenadas (Automático)</label>
          <input 
            type="text" 
            value={locationData.lat ? `Lat: ${locationData.lat.toFixed(4)}, Lng: ${locationData.lng.toFixed(4)}` : 'Haz clic en el mapa...'} 
            disabled 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm" 
          />
        </div>

        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        
        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        {/* Precio y Habitaciones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
            <input type="number" name="price" id="price" min="0" step="0.01" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex-1">
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
            <input type="number" name="rooms" id="rooms" min="0" value={formData.rooms} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        {/* Area y Disponible Desde */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <input type="number" name="area" id="area" min="0" step="0.01" value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex-1">
            <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">Disponible desde</label>
            <input type="date" name="availableFrom" id="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        </div>

        {/* Accesibilidad */}
        <div className="flex items-center">
          <input type="checkbox" name="accessibility" id="accessibility" checked={formData.accessibility} onChange={handleChange} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
          <label htmlFor="accessibility" className="ml-2 block text-sm text-gray-900">Apto para movilidad reducida</label>
        </div>

        {/* Botón de envío */}
        <button type="submit" disabled={estaCargando || !locationData.lat} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50">
          {estaCargando ? 'Creando...' : 'Crear Alquiler'}
        </button>
      </form>
    </div>
  );
}

export default CrearRentaForm;