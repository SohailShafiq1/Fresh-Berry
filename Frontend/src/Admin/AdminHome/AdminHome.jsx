import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdminHome.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminHome = () => {
  console.log("🏠 AdminHome - Component rendered");
  
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  console.log("🏠 AdminHome - admin from context:", admin);

  const [_, setRerender] = useState(0);
  const [stats, setStats] = useState({
    pendingQuotes: 0,
    totalProducts: 0,
    loading: true,
    error: null
  });

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch quotes and filter pending ones
      const quotesResponse = await axios.get(`${API_URL}/api/quotes`);
      const pendingQuotes = quotesResponse.data.filter(quote => !quote.done).length;
      
      // Fetch products
      const productsResponse = await axios.get(`${API_URL}/api/products`);
      const totalProducts = productsResponse.data.length;
      
      setStats({
        pendingQuotes,
        totalProducts,
        loading: false,
        error: null
      });
      
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard data"
      }));
    }
  };

  // Force rerender on mount to ensure AdminRoute check runs after context sync
  useEffect(() => {
    console.log("🏠 AdminHome - useEffect triggered");
    setRerender((r) => r + 1);
    
    // Fetch stats when component mounts
    if (admin) {
      fetchStats();
    }
  }, [admin]);

  if (!admin) {
    console.log("🏠 AdminHome - No admin found, returning null");
    return null;
  }

  console.log("🏠 AdminHome - Admin found, rendering component");

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeTitle}>
        Welcome, {admin?.email?.split('@')[0] || "Admin"}! 👋
      </h1>
      
      <p className={styles.description}>
        Manage your business operations from this central dashboard. 
        View customer quotes, manage your product catalog, and keep track of your business performance.
        {stats.error && (
          <span style={{ color: '#ef4444', display: 'block', marginTop: '8px' }}>
            ⚠️ {stats.error} - <button onClick={fetchStats} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>Retry</button>
          </span>
        )}
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {stats.loading ? "..." : stats.error ? "?" : stats.pendingQuotes}
          </div>
          <div className={styles.statLabel}>Pending Quotes</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {stats.loading ? "..." : stats.error ? "?" : stats.totalProducts}
          </div>
          <div className={styles.statLabel}>Total Products</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {stats.loading ? "..." : stats.error ? "?" : Math.round((stats.pendingQuotes > 0 ? ((stats.totalProducts / (stats.pendingQuotes + stats.totalProducts)) * 100) : 95))}%
          </div>
          <div className={styles.statLabel}>System Health</div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleNavigation("/admin/quotes")}
          className={`${styles.button} ${styles.quotesButton}`}
        >
          📋 View Quotes
        </button>
        
        <button
          onClick={() => handleNavigation("/admin/products")}
          className={`${styles.button} ${styles.productsButton}`}
        >
          📦 Manage Products
        </button>

        <button
          onClick={fetchStats}
          disabled={stats.loading}
          className={`${styles.button} ${styles.quotesButton}`}
          style={{ opacity: stats.loading ? 0.6 : 1 }}
        >
          {stats.loading ? "🔄 Loading..." : "🔄 Refresh Data"}
        </button>
        
        <button
          onClick={handleLogout}
          className={`${styles.button} ${styles.logoutButton}`}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
