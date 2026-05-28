import { createContext, useContext, useState, useCallback } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? { status: filter } : {};
      const { data } = await api.get("/tasks", { params });
      setTasks(data.tasks);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const createTask = useCallback(async (taskData) => {
    try {
      const { data } = await api.post("/tasks", taskData);
      setTasks((prev) => [data.task, ...prev]);
      toast.success("Task created!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create task.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? data.task : t))
      );
      toast.success("Task updated!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update task.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    }
  }, []);

  const toggleTask = useCallback(async (id) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? data.task : t))
      );
    } catch (err) {
      toast.error("Failed to update task status.");
    }
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        filter,
        setFilter,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used within TaskProvider");
  return ctx;
};
