// src/services/tasks.ts
import { api } from "./config";
import { Task, TaskInput } from "@/app/tasks/page";

// Récupérer toutes les tâches
export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await api.get("/api/tasks");
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (error) {
    console.error("Erreur getTasks:", error);
    return [];
  }
};

// Créer une nouvelle tâche
export const createTask = async (task: TaskInput): Promise<Task> => {
  try {
    const res = await api.post("/api/tasks", { data: task });
    return res.data.data;
  } catch (error) {
    console.error("Erreur createTask:", error);
    throw error;
  }
};

// Supprimer une tâche
export const deleteTask = async (documentId: string): Promise<{ success: boolean }> => {
  try {
    const res = await api.delete(`/api/tasks/${documentId}`);
    return { success: res.status === 200 };
  } catch (error) {
    console.error("Erreur deleteTask:", error);
    throw error;
  }
};

// Mettre à jour une tâche existante
export const updateTask = async (documentId: string, updatedTask: TaskInput): Promise<Task> => {
  try {
    const res = await api.put(`/api/tasks/${documentId}`, { data: updatedTask });
    return res.data.data;
  } catch (error) {
    console.error("Erreur updateTask:", error);
    throw error;
  }
};
