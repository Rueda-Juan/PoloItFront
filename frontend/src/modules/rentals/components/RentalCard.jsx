import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { deleteRental } from '../../../api/apiRentals';
import { FiMapPin, FiDollarSign, FiEdit, FiTrash2 } from 'react-icons/fi';

function RentalCard({ rental, onEditClick, onRentalClick }) {
  const { user: loggedInUser, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && loggedInUser && loggedInUser.id === rental.user?.id;
  const imageUrl = rental.photos?.[0]?.url || `https://via.placeholder.com/400x300.png?text=${rental.title.replace(/\s/g, '+')}`;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este alquiler?')) {
      try {
        await deleteRental(rental.id);
        alert('Alquiler eliminado con éxito.');
        window.location.reload();
      } catch (error) {
        alert(`Error al eliminar el alquiler: ${error.message}`);
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEditClick) onEditClick(rental);
  };

  return (
    <div
      onClick={() => onRentalClick && onRentalClick(rental)}
      className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <img src={imageUrl} alt={rental.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{rental.title}</h3>
        <p className="flex items-center text-gray-600 mt-2 text-sm truncate">
          <FiMapPin className="mr-2 flex-shrink-0" />
          {rental.address || 'Dirección no especificada'}
        </p>
        <div className="flex items-center text-lg font-semibold text-purple-600 mt-3">
          <FiDollarSign className="mr-1" />
          <span>{rental.price}</span>
          <span className="text-sm text-gray-500 font-normal ml-1">/ Mes</span>
        </div>
      </div>

      {isOwner && (
        <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
          >
            <FiEdit />
            <span>Editar</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
          >
            <FiTrash2 />
            <span>Eliminar</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default RentalCard;
