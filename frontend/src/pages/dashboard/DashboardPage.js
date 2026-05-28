import { useEffect, useState } from "react";
import { useTask } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import TaskCard from "../../components/tasks/TaskCard";
import TaskModal from "../../components/tasks/TaskModal";
import Button from "../../components/ui/Button";
import styles from "./Dashboard.module.css";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, filteredTasks, loading, filter, setFilter, fetchTasks } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.greeting}>
                {greeting()}, {user?.name?.split(" ")[0]} 👋
              </h1>
              <p className={styles.sub}>Here's what you're working on today</p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              size="md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Task
            </Button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{total}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={`${styles.statCard} ${styles.pendingStat}`}>
              <span className={styles.statNum}>{pending}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
            <div className={`${styles.statCard} ${styles.doneStat}`}>
              <span className={styles.statNum}>{completed}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
            {total > 0 && (
              <div className={`${styles.statCard} ${styles.progressStat}`}>
                <span className={styles.statNum}>
                  {Math.round((completed / total) * 100)}%
                </span>
                <span className={styles.statLabel}>Done</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {total > 0 && (
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
          )}

          {/* Filters */}
          <div className={styles.filterRow}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${filter === f.value ? styles.active : ""}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
                <span className={styles.filterCount}>
                  {f.value === "all" ? total : f.value === "pending" ? pending : completed}
                </span>
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>Loading tasks...</span>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                {filter === "completed" ? "✓" : filter === "pending" ? "⏳" : "✦"}
              </div>
              <h3 className={styles.emptyTitle}>
                {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
              </h3>
              <p className={styles.emptySub}>
                {filter === "all"
                  ? "Create your first task to get started"
                  : `Tasks marked as ${filter} will appear here`}
              </p>
              {filter === "all" && (
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Create first task
                </Button>
              )}
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <TaskModal task={editingTask} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DashboardPage;
