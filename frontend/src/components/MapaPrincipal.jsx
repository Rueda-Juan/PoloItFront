// src/pages/MapaPrincipal.jsx

import React, { useState, useEffect, Fragment } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, Transition } from '@headlessui/react';
import { HiPlus } from 'react-icons/hi'; // Icono para el botón

import { getAllRentals } from '../api/rentalsApi';
import CrearRenta from '../components/CrearRenta'; // Importamos el formulario

// --- Configuración del Mapa ---
const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Estilo para que el mapa ocupe toda la pantalla
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

// Centro inicial del mapa (puedes cambiarlo a tu ubicación)
const center = {
  lat: -34.92136, // Ejemplo: La Plata, Argentina
  lng: -57.9545,
};

// Opciones para ocultar controles de UI no deseados
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
};

const libraries = ['places'];

// --- Componente Principal ---
function MapaPrincipal() {
  // Estado para los rentals (pines)
  const [rentals, setRentals] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  // Estado para el modal (popUp)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para cargar los rentals
  const cargarRentals = async () => {
    try {
      const data = await getAllRentals();
      // Filtramos por si algún rental no tiene lat/lng
      setRentals(data.filter(r => r.lat && r.lng)); 
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar rentals:", err);
    }
  };

  // Cargar los rentals cuando el componente se monta
  useEffect(() => {
    cargarRentals();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // --- Lógica del Modal ---
  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  // --- Lógica de Submit (¡Como la pediste!) ---
  const handleRentalCreado = (nuevaRenta) => {
    console.log("¡Renta creada con éxito!", nuevaRenta);
    
    // 1. Cierra el modal
    cerrarModal();
    
    // 2. Refresca la página para mostrar el nuevo pin
    // Esto recargará todo desde cero, incluyendo la llamada a getAllRentals()
    window.location.reload();
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={libraries}>
      {/* Contenedor relativo para posicionar el botón flotante */}
      <div className="relative w-screen h-screen">
        
        {/* El Mapa */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
        >
          {/* Mapeamos los rentals para crear los Marcadores (pines) */}
          {rentals.map((rental) => (
            <Marker
              key={rental.id}
              position={{ lat: rental.lat, lng: rental.lng }}
              title={rental.title}
            />
          ))}
        </GoogleMap>

        {/* Botón Flotante (FAB) */}
        <button
          onClick={abrirModal}
          className="absolute bottom-8 right-8 z-10 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          aria-label="Crear nueva renta"
        >
          <HiPlus size={28} />
        </button>

        {/* El Modal (PopUp) */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-20" onClose={cerrarModal}>
            
            {/* Fondo oscuro y semitransparente */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            </Transition.Child>

            {/* Contenedor para centrar el modal */}
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                
                {/* Panel del Modal (la tarjeta) */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg p-8 md:p-12 text-left align-middle shadow-xl transition-all">
                    {/* ¡Aquí insertamos el formulario! 
                      Le pasamos la función que debe ejecutar al tener éxito.
                    */}
                    <CrearRenta onRentalCreado={handleRentalCreado} />
                  </Dialog.Panel>
                </Transition.Child>

              </div>
            </div>
          </Dialog>
        </Transition>

      </div>
    </LoadScript>
  );
}

export default MapaPrincipal;