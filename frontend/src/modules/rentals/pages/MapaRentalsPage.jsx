import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/hooks/useAuth';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { getAllRentals } from '../../../api/apiRentals.js';
import Modal from '../../../components/Modal.jsx';
import Loader from '../../../components/Loader.jsx';
import CrearRentaForm from '../components/CrearRentaForm.jsx';
import RentalDetail from '../components/RentalDetail.jsx';


// --- CONFIGURACIÓN DE LEAFLET ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = [-34.92136, -57.9545];

function HandleMapClick({ onMapClick }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      if (loading) return;
      if (!isAuthenticated) {
        // Esta redirección ahora es manejada por el modal de login
        // pero la dejamos como un respaldo.
        alert("Debes iniciar sesión para crear un rental.");
        // En una app con modales, sería mejor abrir el modal de login aquí.
        // navigate('/login'); 
      } else {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      }
    },
  });
  return null;
}

function MapaRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({ lat: null, lng: null, location: '' });
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const cargarRentals = async () => {
      try {
        setLoading(true);
        const data = await getAllRentals();
        setRentals(data.filter(r => r.lat && r.lng));
      } catch (err) {
        console.error("Error al cargar rentals:", err);
      } finally {
        setLoading(false);
      }
    };
    cargarRentals();
  }, []);

  const handleMapClick = async (lat, lng) => {
    setIsModalOpen(true);
    setNuevaUbicacion({ lat, lng, location: 'Cargando dirección...' });

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: {
          'User-Agent': 'RentalMap/1.0 (tu-correo@ejemplo.com)'
        }
      });
      if (!response.ok) {
        console.error('Respuesta de Nominatim:', response.status, response.statusText);
        throw new Error('La petición a Nominatim fue rechazada.');
      }
      const data = await response.json();
      if (data && data.display_name) {
        setNuevaUbicacion({ lat, lng, location: data.display_name });
      } else {
        setNuevaUbicacion({ lat, lng, location: 'Ubicación desconocida' });
      }
    } catch (error) {
      console.error("Error en Reverse Geocoding:", error);
      setNuevaUbicacion({ lat, lng, location: 'No se pudo obtener la dirección' });
    }
  };

  const cerrarModal = () => setIsModalOpen(false);
  const handleRentalCreado = (nuevaRenta) => {
    cerrarModal();
    window.location.reload();
  };

const [selectedRental, setSelectedRental] = useState(null);
const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

const handleMarkerClick = (rental) => {
  setSelectedRental(rental);
  setIsDetailModalOpen(true);
};

const closeDetailModal = () => {
  setSelectedRental(null);
  setIsDetailModalOpen(false);
};


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 7.5rem)' }}> 
      
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ width: '100%', height: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {rentals.map((rental) => (
          <Marker 
            key={rental.id} 
            position={[rental.lat, rental.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(rental),
            }}
          >
          </Marker>
        ))}

        <HandleMapClick onMapClick={handleMapClick} />
      </MapContainer>

      {!authLoading && !isAuthenticated && (
        <div
          className="absolute bottom-8 right-8 z-20 p-4 bg-purple-600 text-white rounded-lg shadow-lg flex items-center gap-3"
        >
          <HiOutlineInformationCircle size={28} />
          <span>Haz clic en el mapa para añadir una renta (requiere login)</span>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={cerrarModal} 
        title="Crear Nueva Renta"
      >
        <CrearRentaForm 
          onRentalCreado={handleRentalCreado}
          locationData={nuevaUbicacion}
        />
      </Modal>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        title={selectedRental?.title || "Detalle de la Renta"}
      >
        {selectedRental ? (
          <RentalDetail rental={selectedRental} />
        ) : (
          <p>Cargando información...</p>
        )}
      </Modal>

    </div>
  );
}

export default MapaRentalsPage;