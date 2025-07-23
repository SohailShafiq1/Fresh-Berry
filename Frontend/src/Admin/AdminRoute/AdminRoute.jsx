import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";

const AdminRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  let storedAdmin = null;
  try {
    storedAdmin = JSON.parse(localStorage.getItem("adminUser"));
  } catch {
    storedAdmin = null;
  }
  const isAuthenticated = admin || (storedAdmin && storedAdmin.email);
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRoute;
