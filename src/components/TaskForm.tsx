import { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import { TaskInput, Task } from "@/app/tasks/page";

type TaskFormProps = {
  onSubmit: (task: TaskInput) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
};

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setTaskStatus(editingTask.taskStatus || "pending");
      setDueDate(editingTask.dueDate?.slice(0, 10) || "");
      setPriority(editingTask.priority || "low");
    } else {
      setTitle(""); setDescription(""); setTaskStatus("pending"); setDueDate(""); setPriority("low");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, description, taskStatus, dueDate, priority });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className={styles.input}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className={styles.input}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.input}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className={styles.input}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={styles.input}/>
        <button type="submit" className={styles.submitBtn}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit} className={styles.cancelBtn}>Cancel</button>
        )}
      </div>
    </form>
  );
}
