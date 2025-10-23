import { createContext, useState, useEffect } from "react";
import { getToken, logoutUser, loginUser, getProfile } from "../api/apiAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Verifica el token Y busca el perfil al cargar la app
  useEffect(() => {
    const verificarSesion = async () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          // 1. Hay token, pedimos el perfil
          const userData = await getProfile(storedToken);
          // 2. Si todo OK, seteamos estado
          setUser(userData);
          setToken(storedToken);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          // 3. Si el token es inválido (expiró, etc.), limpiamos todo
          logoutUser();
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    verificarSesion();
  }, []);
  const login = async (credentials) => {
    try {
      // 1. Pide el token
      const { token } = await loginUser(credentials);
      // 2. Con el token, pide el perfil
      const userData = await getProfile(token);
      
      // 3. Guarda todo en el estado y localStorage
      localStorage.setItem("token", token);
      setToken(token);
      setUser(userData);

    } catch (error) {
      console.error("Error en login context:", error);
      throw error;
    }
  };


  const logout = () => {
    logoutUser();
    setToken(null);
    setUser(null);
  };


  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        loading, 
        isAuthenticated // ¡Nuevo helper!
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};