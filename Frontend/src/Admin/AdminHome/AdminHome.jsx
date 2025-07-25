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
      <div style={{ margin: "32px 0 0 0" }}>
        <button
          onClick={() => (window.location.href = "/admin/quotes")}
          style={{
            padding: "10px 24px",
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontSize: 16,
            cursor: "pointer",
            marginRight: 16,
          }}
        >
          View Quotes
        </button>
        <button
          onClick={() => (window.location.href = "/admin/products")}
          style={{
            padding: "10px 24px",
            background: "#059669",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontSize: 16,
            cursor: "pointer",
            marginRight: 16,
          }}
        >
          Manage Products
        </button>
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
    </div>
  );
};

export default AdminHome;
