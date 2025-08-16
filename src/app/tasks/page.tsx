"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getTasks, createTask, deleteTask, updateTask } from "@/services/tasks";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import Stats from "@/components/Stats";
import TaskForm from "@/components/TaskForm";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/DashboardHeader";
import styles from "./TasksPage.module.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });
import "react-calendar/dist/Calendar.css";

// ---- Types ----
export type Task = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  taskStatus: "pending" | "completed";
  dueDate: string;
  completedAt?: string;
  priority: "low" | "medium" | "high";
};

export type TaskInput = Omit<Task, "id" | "documentId">;

// -------------------

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [priorityAsc, setPriorityAsc] = useState(true);
  const [categoryAsc, setCategoryAsc] = useState(true);

  // Récupération des tasks
  const fetchTasks = async () => {
    try {
      const data: Task[] = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Erreur fetchTasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtrage côté client
  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = calendarDate
          ? task.dueDate.slice(0, 10) === calendarDate.toISOString().slice(0, 10)
          : true;
        return matchesSearch && matchesDate;
      })
    );
  }, [tasks, searchTerm, calendarDate]);

  // Ajouter / Modifier task
  const handleAddTask = async (task: TaskInput) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.documentId, task);
        setEditingTask(null);
        setTasks((prev) =>
          prev.map((t) =>
            t.documentId === editingTask.documentId ? { ...t, ...task } : t
          )
        );
      } else {
        await createTask(task);
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (documentId: string) => {
    try {
      await deleteTask(documentId);
      setTasks((prev) => prev.filter((t) => t.documentId !== documentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (task: Task) => setEditingTask(task);
  const cancelEdit = () => setEditingTask(null);

  const handleSortByPriority = (asc: boolean = true) => {
    setPriorityAsc(asc);
    setTasks((prev) =>
      [...prev].sort((a, b) => {
        const priorities: Record<string, number> = { high: 3, medium: 2, low: 1 };
        return asc
          ? priorities[a.priority] - priorities[b.priority]
          : priorities[b.priority] - priorities[a.priority];
      })
    );
  };

  const handleSortByCategory = (asc: boolean = true) => {
    setCategoryAsc(asc);
    setTasks((prev) =>
      [...prev].sort((a, b) => {
        const order: Record<string, number> = { pending: 1, completed: 2 };
        return asc
          ? order[a.taskStatus] - order[b.taskStatus]
          : order[b.taskStatus] - order[a.taskStatus];
      })
    );
  };

  const completed = tasks.filter((t) => t.taskStatus === "completed").length;
  const pending = tasks.filter((t) => t.taskStatus === "pending").length;

  return (
    <>
      <Header userName="Iheb" profileImage="https://i.pravatar.cc/150?img=3" />

      <div className="container">
        <DashboardHeader name="Aqeel" />

        <TaskForm
          onSubmit={handleAddTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />

        <div className={styles.controls}>
          <div className={styles.sortBtnsContainer}>
            <button
              onClick={() => handleSortByCategory(!categoryAsc)}
              className={styles.smallBtn}
            >
              By Category {categoryAsc ? "▲" : "▼"}
            </button>

            <button
              onClick={() => handleSortByPriority(!priorityAsc)}
              className={styles.smallBtn}
            >
              By Priority {priorityAsc ? "▲" : "▼"}
            </button>

            <div className={styles.rightGroup}>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.calendarSection}>
            <div className={styles.calendarHeader}>
              {calendarDate
                ? calendarDate.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : new Date().toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
            </div>
            <Calendar onChange={setCalendarDate} value={calendarDate} />
          </div>

          <div className={styles.cardsSection}>
            <div className={styles.grid}>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => handleDeleteTask(task.documentId)}
                  onEdit={() => handleEditTask(task)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Stats completed={completed} pending={pending} total={tasks.length} />
      <Footer />
    </>
  );
}
