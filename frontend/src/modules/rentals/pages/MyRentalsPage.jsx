import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import Loader from "../../../components/Loader";
import RentalList from "../components/RentalList";
import Modal from "../../../components/Modal";
import EditRentalForm from "../components/EditRentalForm";
import RentalDetail from "../components/RentalDetail"; // 👈 Importamos este

function MyRentalsPage() {
  const { user, loading } = useAuth();
  const [rentalToEdit, setRentalToEdit] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEditSuccess = () => {
    setRentalToEdit(null);
    window.location.reload();
  };

  const handleRentalClick = (rental) => {
    setSelectedRental(rental);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedRental(null);
    setIsDetailModalOpen(false);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Alquileres</h1>

        {user?.id && (
          <RentalList
            userId={user.id}
            onEditClick={setRentalToEdit}
            onRentalClick={handleRentalClick} // 👈 Pasamos la función
          />
        )}
      </div>

      {/* Modal para EDITAR */}
      <Modal
        isOpen={!!rentalToEdit}
        onClose={() => setRentalToEdit(null)}
        title="Editar Alquiler"
      >
        {rentalToEdit && (
          <EditRentalForm
            rentalToEdit={rentalToEdit}
            onEditSuccess={handleEditSuccess}
          />
        )}
      </Modal>

      {/* Modal para DETALLES */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        title={selectedRental?.title || "Detalles del Alquiler"}
      >
        {selectedRental && <RentalDetail rental={selectedRental} />}
      </Modal>
    </>
  );
}

export default MyRentalsPage;
