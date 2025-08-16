// src/services/tasks.ts
import { api } from "./config";
import { Task, TaskInput } from "@/app/tasks/page";
 
 
export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await api.get("/tasks");
    return res.data.data || [];
  } catch (err) {
    console.error("Erreur getTasks:", err);
    return [];
  }
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  try {
    const res = await api.post("/tasks", { data: task });
    return res.data.data;
  } catch (err) {
    console.error("Erreur createTask:", err);
    throw err;
  }
};

export const updateTask = async (id: string, task: TaskInput): Promise<Task> => {
  try {
    const res = await api.put(`/tasks/${id}`, { data: task });
    return res.data.data;
  } catch (err) {
    console.error("Erreur updateTask:", err);
    throw err;
  }
};

export const deleteTask = async (id: string): Promise<{ success: boolean }> => {
  try {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    console.error("Erreur deleteTask:", err);
    throw err;
  }
};
