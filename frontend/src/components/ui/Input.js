import styles from "./Input.module.css";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required,
  autoComplete,
}) => {
  return (
    <div className={styles.group}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${styles.input} ${error ? styles.hasError : ""}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
