import { createContext, useContext, useState, useCallback } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("taskflow_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", { name, email, password });
      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
