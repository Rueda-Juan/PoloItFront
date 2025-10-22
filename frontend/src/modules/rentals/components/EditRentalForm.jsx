import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { updateRental } from '../../../api/apiRentals';

// Recibe el 'rental' a editar y una función para cuando se edite con éxito
function EditRentalForm({ rentalToEdit, onEditSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    rooms: 1,
    price: '',
    area: '',
    description: '',
    availableFrom: '',
    accessibility: false,
  });
  const [estaCargando, setEstaCargando] = useState(false);
  const [error, setError] = useState(null);

  // Rellena el formulario con los datos del rental cuando el componente se carga
  useEffect(() => {
    if (rentalToEdit) {
      setFormData({
        title: rentalToEdit.title || '',
        address: rentalToEdit.address || '',
        rooms: rentalToEdit.rooms || 1,
        price: rentalToEdit.price || '',
        area: rentalToEdit.area || '',
        description: rentalToEdit.description || '',
        // Formatea la fecha para el input type="date" (YYYY-MM-DD)
        availableFrom: rentalToEdit.availableFrom ? new Date(rentalToEdit.availableFrom).toISOString().split('T')[0] : '',
        accessibility: rentalToEdit.accessibility || false,
      });
    }
  }, [rentalToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstaCargando(true);
    setError(null);

    try {
      const rentalUpdateData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rooms: parseInt(formData.rooms, 10) || 0,
        area: formData.area ? parseFloat(formData.area) : undefined,
      };

      if (!rentalUpdateData.availableFrom) {
        delete rentalUpdateData.availableFrom;
      }
      
      // Llamamos a la API para actualizar, pasamos el ID del rental
      await updateRental(rentalToEdit.id, rentalUpdateData);
      
      if (onEditSuccess) {
        onEditSuccess();
      }

    } catch (err) {
      setError(err.message || 'Ocurrió un error al actualizar el alquiler');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className="w-full">
      {error && <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 rounded-md"><strong>Error:</strong> {error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Título */}
        <div>
          <label htmlFor="title-edit" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input type="text" name="title" id="title-edit" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
        </div>
        
        {/* Dirección */}
        <div>
          <label htmlFor="address-edit" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input type="text" name="address" id="address-edit" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
        </div>

        {/* Precio y Habitaciones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="price-edit" className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
            <input type="number" name="price" id="price-edit" min="0" step="0.01" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
          </div>
          <div className="flex-1">
            <label htmlFor="rooms-edit" className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
            <input type="number" name="rooms" id="rooms-edit" min="0" value={formData.rooms} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
          </div>
        </div>

        {/* Area y Disponible Desde */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="area-edit" className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <input type="number" name="area" id="area-edit" min="0" step="0.01" value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
          </div>
          <div className="flex-1">
            <label htmlFor="availableFrom-edit" className="block text-sm font-medium text-gray-700 mb-1">Disponible desde</label>
            <input type="date" name="availableFrom" id="availableFrom-edit" value={formData.availableFrom} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-purple-500" />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description-edit" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="description" id="description-edit" rows="3" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-purple-500"></textarea>
        </div>

        {/* Accesibilidad */}
        <div className="flex items-center">
          <input type="checkbox" name="accessibility" id="accessibility-edit" checked={formData.accessibility} onChange={handleChange} className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500" />
          <label htmlFor="accessibility-edit" className="ml-2 block text-sm text-gray-900">Apto para movilidad reducida</label>
        </div>
        
        <button type="submit" disabled={estaCargando} className="w-full flex justify-center py-3 px-4 rounded-md shadow-md font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
          {estaCargando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

export default EditRentalForm;