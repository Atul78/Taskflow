import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import styles from "./Auth.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  else if (values.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  return errors;
};

const SignupPage = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm(
    { name: "", email: "", password: "" },
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    const result = await signup(values.name, values.email, values.password);
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
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.sub}>Start managing your tasks today</p>
        </div>

        {serverError && (
          <div className={styles.alert}>{serverError}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            error={touched.name && errors.name}
            autoComplete="name"
            required
          />
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
            placeholder="Min. 6 characters"
            error={touched.password && errors.password}
            autoComplete="new-password"
            required
          />
          <Button type="submit" fullWidth loading={loading} size="lg">
            Create Account
          </Button>
        </form>

        <p className={styles.switch}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
