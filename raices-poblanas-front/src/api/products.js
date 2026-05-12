import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getCatalog = async () => {
  try {
    const response = await axios.get(`${API_URL}/catalog`);
    return response.data;
  } catch (error) {
    console.error("Error al traer el catálogo", error);
    return [];
  }
};