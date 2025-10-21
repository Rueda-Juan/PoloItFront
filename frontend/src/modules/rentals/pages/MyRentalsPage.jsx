import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';

// Esta página mostrará los rentals del usuario logueado
function MyRentalsPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O tu componente <Loader />
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Mis Rentals</h1>
      <p className="mt-2 text-lg">
        Aquí se mostrará la lista de rentals publicados por <strong>{user?.username || 'el usuario'}</strong>.
      </p>
      {user?.id && <RentalList userId={user.id} />}
    </div>
  );
}

export default MyRentalsPage;