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
      <div className={s.headerSection}>
        <button
          className={s.button}
          onClick={() => navigate("/admin/home")}
        >
          ⬅ Back
        </button>
        <h1 className={s.title}>
          Quote Requests
        </h1>
        <button
          className={s.button}
          onClick={fetchQuotes}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>
      
      {loading ? (
        <div className={s.loading}>Loading quotes...</div>
      ) : error ? (
        <div className={s.error}>{error}</div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Instructions</th>
                <th>Status</th>
                <th>Actions</th>
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
                  <td title={q.specialInstructions}>
                    {q.specialInstructions?.length > 20 
                      ? `${q.specialInstructions.substring(0, 20)}...` 
                      : q.specialInstructions || "-"}
                  </td>
                  <td>
                    <span className={q.done ? s.done : s.notDone}>
                      {q.done ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className={s.actionButtons}>
                      {!q.done && (
                        <button
                          className={s.button}
                          disabled={marking === q._id}
                          onClick={() => handleMarkDone(q._id)}
                        >
                          {marking === q._id ? "Marking..." : "✓ Mark Done"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQoute;
