export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="card p-4 mb-3 shadow-sm">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.taskStatus}</p>
      <p>Début: {task.createdAt?.slice(0, 10)}</p>
      <p>Fin: {task.dueDate?.slice(0, 10)}</p>
      <p>Priority: {task.priority}</p>
      <div className="mt-2 flex gap-2">
      <button onClick={() => onDelete(task.documentId)} className="btn btn-sm btn-danger">
  Delete
</button>
<button onClick={() => onEdit(task)} className="btn btn-sm btn-primary">
  Edit
</button>

      </div>
    </div>
  );
}
