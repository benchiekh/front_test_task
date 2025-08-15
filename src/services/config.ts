import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Adapter à ton backend
});

// Ajout automatique du token si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // N'ajoute pas le token pour la route de login ou register
  if (token && !config.url?.includes('/auth/local')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
