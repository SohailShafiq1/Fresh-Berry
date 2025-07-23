import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
import styles from "./AdminQoute.module.css";

const s = styles;

const AdminQoute = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState("");

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/quotes`);
      setQuotes(data);
      setError(null);
    } catch {
      setError("Failed to fetch quotes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleMarkDone = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/quotes/${id}/done`);
      setQuotes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, done: true } : q))
      );
    } catch {
      alert("Failed to mark as done");
    }
    setMarking("");
  };

  return (
    <div className={s.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <button
          className={s.button}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/admin/home")}
        >
          ⬅ Back
        </button>
        <div
          className={s.title}
          style={{ flex: 1, textAlign: "center", margin: 0 }}
        >
          Quote Requests
        </div>
        <button
          className={s.button}
          style={{ marginLeft: 16 }}
          onClick={fetchQuotes}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Business Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delivery Location</th>
              <th>Special Instructions</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q._id}>
                <td>{q.fullName}</td>
                <td>{q.businessName}</td>
                <td>{q.email}</td>
                <td>{q.phone}</td>
                <td>{q.deliveryLocation}</td>
                <td>{q.specialInstructions || "-"}</td>
                <td className={q.done ? s.done : s.notDone}>
                  {q.done ? "Done" : "Pending"}
                </td>
                <td>
                  <button
                    className={s.button}
                    disabled={q.done || marking === q._id}
                    onClick={() => handleMarkDone(q._id)}
                  >
                    {marking === q._id ? "Marking..." : "Mark as Done"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQoute;
