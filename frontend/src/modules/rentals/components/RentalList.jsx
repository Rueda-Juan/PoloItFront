import React, { useState, useEffect } from 'react';
import { getAllRentals } from '../../../api/apiRentals';
import Loader from '../../../components/Loader';
import RentalCard from './RentalCard';

// Recibe la nueva prop 'onEditClick' desde MyRentalsPage
function RentalList({ userId, onEditClick }) {
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserRentals = async () => {
      try {
        setLoading(true);
        setError(null);
        const allRentals = await getAllRentals();
        
        // La respuesta de la API ahora incluye un objeto 'user', por lo que filtramos por 'rental.user.id'
        const filteredRentals = allRentals.filter(
          (rental) => rental.user?.id === userId
        );

        setUserRentals(filteredRentals);
      } catch (err) {
        setError(err.message || "Error al cargar los rentals");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRentals();
  }, [userId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (userRentals.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-gray-600">No has publicado rentals todavía.</h2>
        <p className="text-gray-500 mt-2">¡Ve al mapa y añade tu primer rental!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8">
      {userRentals.map((rental) => (
        // Le pasamos la función 'onEditClick' a cada tarjeta
        <RentalCard 
          key={rental.id} 
          rental={rental} 
          onEditClick={onEditClick} 
        />
      ))}
    </div>
  );
}

export default RentalList;