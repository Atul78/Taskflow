import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import styles from "./Auth.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email";
  if (!values.password) errors.password = "Password is required";
  return errors;
};

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useForm({ email: "", password: "" }, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    const result = await login(values.email, values.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.logo}>✦</span>
          <span className={styles.brandName}>TaskFlow</span>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your account to continue</p>
        </div>

        {serverError && <div className={styles.alert}>{serverError}</div>}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            error={touched.email && errors.email}
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            error={touched.password && errors.password}
            autoComplete="current-password"
            required
          />
          <Button type="submit" fullWidth loading={loading} size="lg">
            Sign In
          </Button>
        </form>

        <p className={styles.switch}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
