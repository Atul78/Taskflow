import { useEffect } from "react";
import { useTask } from "../../context/TaskContext";
import useForm from "../../hooks/useForm";
import Button from "../ui/Button";
import Input from "../ui/Input";
import styles from "./TaskModal.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.title.trim()) errors.title = "Title is required";
  else if (values.title.trim().length < 3)
    errors.title = "Title must be at least 3 characters";
  return errors;
};

const INITIAL = { title: "", description: "", priority: "medium", dueDate: "" };

const TaskModal = ({ task, onClose }) => {
  const { createTask, updateTask } = useTask();
  const isEditing = Boolean(task);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  } = useForm(INITIAL, validate);

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    } else {
      reset();
    }
  }, [[task, reset, setValues]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate || null,
    };

    const result = isEditing
      ? await updateTask(task._id, payload)
      : await createTask(payload);

    if (result?.success !== false) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditing ? "Edit Task" : "New Task"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="What needs to be done?"
            error={touched.title && errors.title}
            required
          />

          <div className={styles.group}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Add a description (optional)"
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label className={styles.label}>Priority</label>
              <select
                name="priority"
                value={values.priority}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
                className={styles.dateInput}
              />
            </div>
          </div>

          {isEditing && (
            <div className={styles.group}>
              <label className={styles.label}>Status</label>
              <select
                name="status"
                value={values.status || task.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className={styles.btns}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
