import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";

const AdminRoute = ({ children }) => {
  
  const { admin } = useAdminAuth();
  
  let storedAdmin = null;
  try {
    const storedData = localStorage.getItem("adminUser");
    storedAdmin = storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    storedAdmin = null;
  }
  
  const isAuthenticated = admin || (storedAdmin && storedAdmin.email);
  
  
  if (!isAuthenticated) {
    console.log("🔒 AdminRoute - ❌ NOT AUTHENTICATED - Redirecting to /admin/login");
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log("🔒 AdminRoute - ✅ AUTHENTICATED - Rendering children");
  return children;
};

export default AdminRoute;
