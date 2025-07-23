import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });
  // Sync context with localStorage changes (login/logout from other tabs or after reload)
  React.useEffect(() => {
    const syncAdmin = () => {
      const stored = localStorage.getItem("adminUser");
      setAdmin(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", syncAdmin);
    return () => window.removeEventListener("storage", syncAdmin);
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/admin/login`, {
        email,
        password,
      });
      setAdmin(res.data.user);
      localStorage.setItem("adminUser", JSON.stringify(res.data.user));
      setError("");
      setLoading(false);
      return { success: true };
    } catch (err) {
      setAdmin(null);
      localStorage.removeItem("adminUser");
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.message || "Server error",
      };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, login, logout, loading, setLoading, error, setError }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
