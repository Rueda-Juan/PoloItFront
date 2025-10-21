import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';

function RentalCard({ rental }) {
  // URL de imagen de placeholder (cámbiala por rental.imageUrl si lo tienes)
  const imageUrl = `https://via.placeholder.com/400x300.png?text=${rental.title.replace(/\s/g, '+')}`;

  return (
    // Envolvemos la tarjeta en un Link que lleva a la página de detalle
    // Asumiendo que tu ruta de detalle es /rentals/:id
    <Link 
      to={`/rentals/${rental.id}`} 
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      {/* Imagen */}
      <img 
        src={imageUrl} 
        alt={rental.title} 
        className="w-full h-48 object-cover" 
      />

      {/* Contenido */}
      <div className="p-4">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {rental.title}
        </h3>
        
        {/* Ubicación */}
        <p className="flex items-center text-gray-600 mt-2 text-sm truncate">
          <FiMapPin className="mr-2 flex-shrink-0" />
          {rental.location || 'Ubicación no especificada'}
        </p>
        
        {/* Precio */}
        <div className="flex items-center text-lg font-semibold text-purple-600 mt-3">
          <FiDollarSign className="mr-1" />
          <span>{rental.price}</span>
          <span className="text-sm text-gray-500 font-normal ml-1">/ noche</span>
        </div>
      </div>
    </Link>
  );
}

export default RentalCard;