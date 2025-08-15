"use client";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "@/services/tasks";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import Stats from "@/components/Stats";
import TaskForm from "@/components/TaskForm";
import Footer from "@/components/Footer";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.map((item) => ({ id: item.id,  documentId: item.documentId, // UID utilisé pour update/delete
 ...item })));
    } catch (error) {
      console.error("Erreur fetchTasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 const handleAddTask = async (task) => {
  try {
    if (editingTask) {
      await updateTask(editingTask.documentId, task); // ✅ utiliser documentId
      setEditingTask(null);
      setTasks(prev => prev.map(t => t.documentId === editingTask.documentId ? { ...t, ...task } : t
      ));
    } else {
      const newTask = await createTask(task);
      fetchTasks();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteTask = async (documentId) => {
  try {
    await deleteTask(documentId);
    setTasks(prev => prev.filter(t => t.documentId !== documentId));
  } catch (error) {
    console.error(error);
  }
};


  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const cancelEdit = () => setEditingTask(null);

  const completed = tasks.filter((t) => t.taskStatus === "completed").length;
  const pending = tasks.filter((t) => t.taskStatus === "pending").length;

  return (
    <>
      <Header userName="Aqeel" />
      <div className="container">
        <Stats completed={completed} pending={pending} total={tasks.length} />
        <TaskForm
          onSubmit={handleAddTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />
        <div className="mt-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.documentId)}
              onEdit={() => handleEditTask(task)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
