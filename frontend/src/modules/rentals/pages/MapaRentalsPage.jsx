import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/hooks/useAuth';
import { HiOutlineInformationCircle } from 'react-icons/hi'; 
import { getAllRentals } from '../../../api/apiRentals.js';
import Modal from '../../../components/Modal.jsx';
import Loader from '../../../components/Loader.jsx';
import CrearRentaForm from './CrearRental.jsx';

// --- CONFIGURACIÓN DE LEAFLET ---
// (Arreglo de íconos... sin cambios)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


// Centro inicial del mapa
const center = [-34.92136, -57.9545]; // [Lat, Lng]

// --- ¡COMPONENTE INTERNO ACTUALIZADO! ---
// Este componente ahora maneja la lógica de autenticación al hacer clic
function HandleMapClick({ onMapClick }) {
  const { isAuthenticated, loading } = useAuth(); // Obtenemos el estado de auth
  const navigate = useNavigate(); // Para redirigir

  useMapEvents({
    click(e) {
      if (loading) return; // Si auth sigue cargando, no hacer nada

      // 1. Verificamos si está autenticado
      if (!isAuthenticated) {
        // 2. Si no, alertamos y redirigimos
        alert("Debes iniciar sesión para crear un rental.");
        navigate('/login');
      } else {
        // 3. Si está logueado, ejecutamos la función original
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      }
    },
  });
  return null;
}

// --- PÁGINA PRINCIPAL DEL MAPA ---
function MapaRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true); // Loading de los *rentals*
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({ lat: null, lng: null, location: '' });

  // Carga inicial de rentals (esto es público, está bien)
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

  // Lógica de Geocoding (ahora solo se llama si el usuario está logueado)
  const handleMapClick = async (lat, lng) => {
    setIsModalOpen(true);
    setNuevaUbicacion({ lat, lng, location: 'Cargando dirección...' });

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
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

  // eslint-disable-next-line no-unused-vars
  const handleRentalCreado = (nuevaRenta) => {
    cerrarModal();
    window.location.reload(); // Refrescamos la página
  };

  // Muestra el loader mientras carga los rentals
  if (loading) {
    return <Loader />;
  }

  return (
    // --- ¡CAMBIO DE LAYOUT! ---
    // Ajustamos la altura para que no quede debajo del navbar (h-16 o 4rem)
    <div className="relative w-full" style={{ height: 'calc(100vh - 4rem)' }}> 
      
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ width: '100%', height: '100%' }} // El mapa llena el div padre
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pines de rentals existentes (sin cambios) */}
        {rentals.map((rental) => (
          <Marker 
            key={rental.id} 
            position={[rental.lat, rental.lng]}
          >
            <Popup>
              <strong>{rental.title}</strong><br />
              {rental.location}<br />
              ${rental.price}
            </Popup>
          </Marker>
        ))}

        {/* ¡Este componente ahora tiene la lógica de auth! */}
        <HandleMapClick onMapClick={handleMapClick} />
        
      </MapContainer>

      {/* --- ¡TEXTO DEL BOTÓN ACTUALIZADO! --- */}
      <div
        className="absolute bottom-8 right-8 z-[1000] p-4 bg-purple-600 text-white rounded-lg shadow-lg flex items-center gap-3"
      >
        <HiOutlineInformationCircle size={28} />
        <span>Haz clic en el mapa para añadir una renta (requiere login)</span>
      </div>

      {/* --- MODAL (sin cambios) --- */}
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

    </div>
  );
}

export default MapaRentalsPage;