import styles from "./TaskCard.module.css";

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.actions}>
          <button onClick={() => onEdit(task)} className={styles.editBtn}>
            ✏️
          </button>
          <button onClick={() => onDelete(task.documentId)} className={styles.deleteBtn}>
            🗑️
          </button>
        </div>
      </header>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <dl className={styles.meta}>
        <div>
          <dt>Status</dt>
          <dd className={task.taskStatus === "completed" ? styles.good : styles.bad}>
            {task.taskStatus}
          </dd>
        </div>
        <div>
          <dt>Start</dt>
          <dd>{task.createdAt?.slice(0, 10) || "—"}</dd>
        </div>
        <div>
          <dt>Due</dt>
          <dd>{task.dueDate?.slice(0, 10) || "—"}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd className={styles.priority}>{task.priority}</dd>
        </div>
      </dl>
    </article>
  );
}
