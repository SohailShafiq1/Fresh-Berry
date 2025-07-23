import React, { useState } from "react";
import { useAdminAuth } from "../../context/Theme/useAdminAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { login, loading, error, setError } = useAdminAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = await login(email, password);
    if (result.success) {
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/admin/home");
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
      </form>
    </div>
  );
};

export default Login;
