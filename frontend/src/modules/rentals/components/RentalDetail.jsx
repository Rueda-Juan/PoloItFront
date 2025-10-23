import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiUsers, FiDollarSign } from 'react-icons/fi';
import imagenDefault from "/Gemini_Generated_Image_i8e7jwi8e7jwi8e7.png"

function RentalDetail({ rental, onClose }) {
  if (!rental) return null;

  const imageUrl = imagenDefault;

  return (
    <div className="flex flex-col">
      <img src={imageUrl} alt={rental.title} className="w-full h-64 object-cover rounded-t-lg" />
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800">{rental.title}</h2>
        
        <p className="flex items-center text-gray-600 mt-2">
          <FiMapPin className="mr-2 flex-shrink-0" />
          {rental.address}
        </p>
        
        {rental.user && (
          <p className="text-sm mt-3">
            Publicado por:{' '}
            <Link 
              to={`/perfil/${rental.user.id}`} 
              onClick={onClose} // Cierra el modal de detalle al navegar al perfil
              className="font-semibold text-purple-600 hover:underline"
            >
              {rental.user.name || rental.user.username}
            </Link>
          </p>
        )}

        <p className="text-gray-700 mt-4">{rental.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700 border-t pt-4">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-purple-600" />
            <span className="font-semibold">{rental.price} / Mes</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="text-purple-600" />
            <span className="font-semibold">{rental.rooms} hab.</span>
          </div>
          {rental.area && (
            <div className="flex items-center gap-2">
              <FiMaximize className="text-purple-600" />
              <span className="font-semibold">{rental.area} m²</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RentalDetail;