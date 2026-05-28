import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  disabled,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};

export default Button;
