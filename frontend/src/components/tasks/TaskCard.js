import { useState } from "react";
import { useTask } from "../../context/TaskContext";
import styles from "./TaskCard.module.css";

const PRIORITY_LABELS = { low: "Low", medium: "Medium", high: "High" };

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const isDue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, toggleTask } = useTask();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    setDeleting(true);
    await deleteTask(task._id);
    setDeleting(false);
  };

  const isCompleted = task.status === "completed";
  const overdue = !isCompleted && isDue(task.dueDate);

  return (
    <div className={`${styles.card} ${isCompleted ? styles.completed : ""}`}>
      <div className={styles.top}>
        <button
          className={`${styles.check} ${isCompleted ? styles.checked : ""}`}
          onClick={() => toggleTask(task._id)}
          title={isCompleted ? "Mark as pending" : "Mark as completed"}
        >
          {isCompleted && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <div className={styles.meta}>
          <span className={`${styles.priority} ${styles[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <span className={`${styles.status} ${isCompleted ? styles.statusDone : styles.statusPending}`}>
            {isCompleted ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <h3 className={`${styles.title} ${isCompleted ? styles.striked : ""}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className={styles.desc}>{task.description}</p>
      )}

      <div className={styles.footer}>
        {task.dueDate && (
          <span className={`${styles.due} ${overdue ? styles.overdue : ""}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {overdue ? "Overdue · " : ""}{formatDate(task.dueDate)}
          </span>
        )}

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => onEdit(task)} title="Edit task">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={handleDelete}
            disabled={deleting}
            title="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
