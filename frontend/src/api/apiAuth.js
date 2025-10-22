// src/api/apiAuth.js

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/auth`;

/**
 * Registrar un nuevo usuario
 * @param {Object} userData { name, email, password, etc. }
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    throw error;
  }
};

/**
 * Iniciar sesión (devuelve el JWT)
 * @param {Object} credentials { email, password }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Credenciales inválidas");
    }

    const data = await response.json();

    // Guardar token JWT en localStorage
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    throw error;
  }
};

/**
 * Obtener el token guardado
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Cerrar sesión (elimina el token)
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
};

/**
 * Helper: incluir token en headers para peticiones protegidas
 */
export const authHeaders = () => {
  const token = getToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};
/**
 * Obtener el perfil del usuario usando el token
 */
export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, { // Asumiendo que tu endpoint es /profile
      method: "GET",
      headers: authHeaders(token), // Usamos el helper con el token
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Token inválido o sesión expirada");
    }

    return await response.json(); // Devuelve el objeto del usuario
  } catch (error) {
    console.error("❌ Error en getProfile:", error);
    throw error;
  }
};