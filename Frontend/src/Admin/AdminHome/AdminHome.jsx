import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";

const AdminHome = () => {
  const { admin, logout } = useAdminAuth();

  const [_, setRerender] = useState(0);

  // Force rerender on mount to ensure AdminRoute check runs after context sync
  useEffect(() => {
    setRerender((r) => r + 1);
  }, []);

  if (!admin) return null;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "60px auto",
        padding: 32,
        border: "1px solid #eee",
        borderRadius: 10,
        background: "#fafafa",
        textAlign: "center",
      }}
    >
      <h1>Welcome, {admin?.email || "Admin"}!</h1>
      <p style={{ margin: "24px 0" }}>
        This is your admin dashboard. Here you can manage products, view orders,
        and more.
      </p>
      <button
        onClick={logout}
        style={{
          padding: "10px 24px",
          background: "#e53935",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
