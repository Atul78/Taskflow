import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#f4f4f5",
              border: "1px solid #2e2e33",
              fontSize: "13px",
              fontFamily: "DM Sans, sans-serif",
            },
            success: {
              iconTheme: { primary: "#34d399", secondary: "#18181b" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#18181b" },
            },
          }}
        />
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
