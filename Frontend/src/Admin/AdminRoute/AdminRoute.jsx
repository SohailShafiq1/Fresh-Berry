import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";

const AdminRoute = ({ children }) => {
  console.log("🔒 AdminRoute - Component rendered");
  
  const { admin } = useAdminAuth();
  console.log("🔒 AdminRoute - admin from context:", admin);
  
  let storedAdmin = null;
  try {
    const storedData = localStorage.getItem("adminUser");
    console.log("🔒 AdminRoute - raw localStorage data:", storedData);
    storedAdmin = storedData ? JSON.parse(storedData) : null;
    console.log("🔒 AdminRoute - parsed storedAdmin:", storedAdmin);
  } catch (error) {
    console.log("🔒 AdminRoute - Error parsing localStorage:", error);
    storedAdmin = null;
  }
  
  const isAuthenticated = admin || (storedAdmin && storedAdmin.email);
  console.log("🔒 AdminRoute - Checking authentication:");
  console.log("  - admin exists:", !!admin);
  console.log("  - storedAdmin exists:", !!storedAdmin);
  console.log("  - storedAdmin.email:", storedAdmin?.email);
  console.log("  - Final isAuthenticated:", isAuthenticated);
  
  if (!isAuthenticated) {
    console.log("🔒 AdminRoute - ❌ NOT AUTHENTICATED - Redirecting to /admin/login");
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log("🔒 AdminRoute - ✅ AUTHENTICATED - Rendering children");
  return children;
};

export default AdminRoute;
