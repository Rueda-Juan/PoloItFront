import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import Loader from '../../../components/Loader';
import RentalList from '../components/RentalList';
import Modal from '../../../components/Modal'; // Importamos el Modal
import EditRentalForm from '../components/EditRentalForm'; // Importamos el formulario de edición

function MyRentalsPage() {
  const { user, loading } = useAuth();
  
  // --- ¡NUEVO ESTADO! ---
  // 'rentalToEdit' guardará el objeto del alquiler que queremos editar
  const [rentalToEdit, setRentalToEdit] = useState(null);

  const handleEditSuccess = () => {
    setRentalToEdit(null); // Cierra el modal
    window.location.reload(); // Refresca la página para ver los cambios
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Alquileres</h1>
        
        {/* Le pasamos una función a RentalList para que pueda abrir el modal */}
        {user?.id && <RentalList userId={user.id} onEditClick={setRentalToEdit} />}
      </div>

      {/* --- ¡NUEVO MODAL! --- */}
      <Modal 
        isOpen={!!rentalToEdit} 
        onClose={() => setRentalToEdit(null)} 
        title="Editar Alquiler"
      >
        {/* Solo renderiza el formulario si hay un rental para editar */}
        {rentalToEdit && (
          <EditRentalForm 
            rentalToEdit={rentalToEdit}
            onEditSuccess={handleEditSuccess}
          />
        )}
      </Modal>
    </>
  );
}

export default MyRentalsPage;