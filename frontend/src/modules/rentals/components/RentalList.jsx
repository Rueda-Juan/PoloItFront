import React, { useState, useEffect } from 'react';
import { getAllRentals } from '../../../api/rentalsApi';
import Loader from '../../../components/Loader';
import RentalCard from './RentalCard';

// Este componente recibe el ID del usuario del cual mostrar los rentals
function RentalList({ userId }) {
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay userId, no hacer nada
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserRentals = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Obtenemos TODOS los rentals
        // (Nota: Idealmente, tu API tendría un endpoint /rentals/user/:userId)
        const allRentals = await getAllRentals();

        // 2. Filtramos los rentals por el userId en el cliente
        const filteredRentals = allRentals.filter(
          (rental) => rental.userId === userId || rental.user === userId || rental.user?.id === userId
        );
        // (Usa la condición que coincida con tu estructura de datos)

        setUserRentals(filteredRentals);
      } catch (err) {
        setError(err.message || "Error al cargar los rentals");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRentals();
  }, [userId]); // Se vuelve a ejecutar si el userId cambia

  // --- Renderizado Condicional ---
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (userRentals.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-gray-600">No has publicado rentals todavía.</h2>
        <p className="text-gray-500 mt-2">¡Ve al mapa y añade tu primer rental!</p>
      </div>
    );
  }

  // --- Lista de Rentals ---
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8">
      {userRentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}
    </div>
  );
}

export default RentalList;