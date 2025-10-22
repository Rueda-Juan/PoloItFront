import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Importaciones
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import LoginForm from './modules/auth/components/LoginForm';
import RegisterForm from './modules/auth/components/RegisterForm';
import RentalDetail from './modules/rentals/components/RentalDetail';
import { getRentalById } from './api/apiRentals';

function App() {
  // Estado para modales de login/registro
  const [modalView, setModalView] = useState(null);
  
  // --- ¡ESTA ES LA LÓGICA QUE TE FALTA! ---
  // Estado y funciones para el modal de detalle de alquiler
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const handleViewRentalDetail = async (rentalId) => {
    try {
      const rentalData = await getRentalById(rentalId);
      setSelectedRental(rentalData);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error al cargar detalles del rental:", error);
      alert("No se pudo cargar la información del alquiler.");
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRental(null);
  };
  // ------------------------------------

  // Funciones para manejar los eventos de los formularios de auth
  const handleLoginSuccess = () => {
    setModalView(null);
    window.location.reload();
  };

  const handleRegisterSuccess = () => {
    setModalView('login');
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        
        <Navbar onLoginClick={() => setModalView('login')} />
        
        <main>
          <AppRouter onViewRentalDetail={handleViewRentalDetail} />
        </main>
        
        {/* Modal de Login */}
        <Modal 
          isOpen={modalView === 'login'} 
          onClose={() => setModalView(null)} 
          title="Iniciar Sesión"
        >
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setModalView('register')}
          />
        </Modal>

        {/* Modal de Registro */}
        <Modal 
          isOpen={modalView === 'register'} 
          onClose={() => setModalView(null)} 
          title="Crear Cuenta"
        >
          <RegisterForm 
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setModalView('login')}
          />
        </Modal>

        {/* Modal de Detalle de Alquiler */}
        <Modal 
          isOpen={isDetailModalOpen} 
          onClose={handleCloseDetailModal}
        >
          {selectedRental && <RentalDetail rental={selectedRental} onClose={handleCloseDetailModal} />}
        </Modal>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;