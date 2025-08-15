import { api } from "./config";

// Récupérer toutes les tâches
export const getTasks = async () => {
  try {
    const res = await api.get("/tasks");
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (error) {
    console.error("Erreur getTasks:", error);
    return [];
  }
};

// Créer une nouvelle tâche
export const createTask = async (task) => {
  try {
    const res = await api.post("/tasks", { data: task });
    return res.data.data;
  } catch (error) {
    console.error("Erreur createTask:", error);
    throw error;
  }
};

// Supprimer une tâche
export const deleteTask = async (documentId) => {
  try {
    const res = await api.delete(`/tasks/${documentId}`);
    return res.data;
  } catch (error) {
    console.error("Erreur deleteTask:", error);
    throw error;
  }
};

// Mettre à jour une tâche existante
export const updateTask = async (documentId, updatedTask) => {
  try {
    const res = await api.put(`/tasks/${documentId}`, { data: updatedTask });
    return res.data.data;
  } catch (error) {
    console.error("Erreur updateTask:", error);
    throw error;
  }
};

