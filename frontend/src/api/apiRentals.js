// src/api/rentalsApi.js

const API_URL = import.meta.env.VITE_API_URL || "https://proyectopoloit.onrender.com";

//Obtiene todas las rentas
export async function getAllRentals() {
  const res = await fetch(`${API_URL}/rentals`);
  if (!res.ok) throw new Error("Error al obtener las rentas");
  return res.json();
}

//Obtiene una renta por ID
export async function getRentalById(id) {
  const res = await fetch(`${API_URL}/rentals/${id}`);
  if (!res.ok) throw new Error("Error al obtener la renta");
  return res.json();
}

//Crea una nueva renta para un usuario específico
export async function createRental(userId, rentalData) {
  const res = await fetch(`${API_URL}/rentals/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rentalData),
  });

  if (!res.ok) throw new Error("Error al crear la renta");
  return res.json();
}

//Actualiza una renta existente
export async function updateRental(id, rentalData) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rentalData),
  });

  if (!res.ok) throw new Error("Error al actualizar la renta");
  return res.json();
}

//Elimina una renta
export async function deleteRental(id) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar la renta");
}
