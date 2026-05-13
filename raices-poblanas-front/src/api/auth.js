import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    // Guardamos: token, username, role y userId
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token); // Guardar token aparte facilita el acceso
  }
  return response.data;
};

// Agrega esto a tu archivo src/api/auth.js
export const register = async (userData) => {
  try {
    // Nota: El 'role' se pasa como parámetro en tu controlador actual
    const response = await axios.post(`${API_URL}/register?role=${userData.role}`, {
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password, // El backend lo encriptará
      // Datos extra si es artesano
      bio: userData.bio,
      municipality: userData.municipality
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};