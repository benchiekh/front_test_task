"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasks, createTask } from "@/services/tasks";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks(token!);
    setTasks(data.data || []);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await createTask(token!, newTask);
    setNewTask("");
    loadTasks();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">📋 Mes tâches</h1>
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button className="btn btn-success" onClick={handleAddTask}>
          Ajouter
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            {task.attributes?.title || "Sans titre"}
          </li>
        ))}
      </ul>
    </div>
  );
}
