// --- ¡IMPORTANTE! Importamos el helper de autenticación ---
import { authHeaders } from './apiAuth';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL=`${BASE_URL}/users`;

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL, { headers: authHeaders() });
    if (!response.ok) throw new Error("Error al obtener usuarios");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener el usuario");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: authHeaders(), 
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Error al actualizar el usuario");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserPassword = async (id, passwordData) => {
  try {
    const response = await fetch(`${API_URL}/${id}/password`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error("Error al actualizar la contraseña");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};