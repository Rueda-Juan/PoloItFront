import { authHeaders } from './apiAuth'; // Importamos el helper de autenticación

const BASE_URL = import.meta.env.VITE_API_URL;
const RENTALS_URL = `${BASE_URL}/rentals`;

/**
 * Obtiene todos los alquileres (ruta pública)
 */
export const getAllRentals = async () => {
  try {
    const response = await fetch(RENTALS_URL);
    if (!response.ok) throw new Error("Error al obtener los alquileres");
    return await response.json();
  } catch (error) {
    console.error("❌ Error en getAllRentals:", error);
    throw error;
  }
};

/**
 * Obtiene un alquiler por su ID (ruta pública)
 * @param {string} id - El ID del alquiler
 */
export const getRentalById = async (id) => {
  try {
    const response = await fetch(`${RENTALS_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener el alquiler");
    return await response.json();
  } catch (error) {
    console.error("❌ Error en getRentalById:", error);
    throw error;
  }
};

/**
 * Crea un nuevo alquiler para un usuario específico (ruta protegida)
 * @param {string} userId - El ID del usuario propietario
 * @param {Object} rentalData - Los datos del alquiler
 */
export const createRental = async (userId, rentalData) => {
  try {
    const response = await fetch(`${RENTALS_URL}/${userId}`, {
      method: "POST",
      headers: authHeaders(), // <-- Usa autenticación
      body: JSON.stringify(rentalData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al crear el alquiler');
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error en createRental:", error);
    throw error;
  }
};

/**
 * Actualiza un alquiler existente (ruta protegida)
 * @param {string} id - El ID del alquiler a actualizar
 * @param {Object} rentalData - Los nuevos datos del alquiler
 */
export const updateRental = async (id, rentalData) => {
  try {
    const response = await fetch(`${RENTALS_URL}/${id}`, {
      method: "PUT", // o "PATCH" si tu backend lo usa
      headers: authHeaders(), // <-- Usa autenticación
      body: JSON.stringify(rentalData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar el alquiler');
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error en updateRental:", error);
    throw error;
  }
};

/**
 * Elimina un alquiler (ruta protegida)
 * @param {string} id - El ID del alquiler a eliminar
 */
export const deleteRental = async (id) => {
  try {
    const response = await fetch(`${RENTALS_URL}/${id}`, {
      method: "DELETE",
      headers: authHeaders(), // <-- Usa autenticación
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al eliminar el alquiler');
    }
    // DELETE no siempre devuelve un cuerpo, así que podemos retornar la respuesta
    return response;
  } catch (error) {
    console.error("❌ Error en deleteRental:", error);
    throw error;
  }
};