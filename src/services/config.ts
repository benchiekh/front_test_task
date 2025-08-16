import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // juste le domaine
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url?.includes("/auth/local")) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Token ajouté au header:", token); // debug
  } else {
    console.warn("⚠️ Aucun token trouvé ou requête auth/local");
  }

  return config;
});
