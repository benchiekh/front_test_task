import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
setTaskStatus(editingTask.taskStatus || "pending");
      setDueDate(editingTask.dueDate?.slice(0, 10) || "");
setPriority(editingTask.priority || "low");
    } else {
      setTitle("");
      setDescription("");
      setTaskStatus("pending");
      setDueDate("");
      setPriority("low");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, taskStatus, dueDate, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="btn btn-primary">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && (
        <button type="button" onClick={onCancelEdit} className="btn btn-secondary ml-2">
          Cancel
        </button>
      )}
    </form>
  );
}
