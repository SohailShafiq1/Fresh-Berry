import { TbCurrencyDirham } from "react-icons/tb";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
import styles from "./AdminProducts.module.css";

const s = styles;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [marking, setMarking] = useState("");
  const [deleting, setDeleting] = useState("");
  const fileInputRef = useRef(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await axios.post(`${API_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) => [...prev, response.data]);
      setForm({ name: "", image: "", description: "", price: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      alert("Failed to add product");
    }
    setAdding(false);
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
    setDeleting("");
  };

  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, image: file });
    }
  };

  const handleEditSave = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? response.data : p))
      );
      setEditId(null);
      setEditForm({ name: "", description: "", price: "" });
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({ name: "", description: "", price: "" });
  };

  const handleMarkHot = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/products/${id}/hotselling`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, hotselling: true } : p))
      );
    } catch (err) {
      alert("Failed to mark as hotselling");
    }
    setMarking("");
  };

  const handleUnmarkHot = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/products/${id}/unmark-hotselling`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, hotselling: false } : p))
      );
    } catch (err) {
      alert("Failed to unmark as hotselling");
    }
    setMarking("");
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Admin Products</h2>
      <form className={s.form} onSubmit={handleAdd}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
        />
        <button className={s.button} type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add Product"}
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className={s.grid}>
          {products.map((p) => (
            <div key={p._id} className={s.card}>
              <div className={s.imageWrap}>
                {p.image ? (
                  p.image.startsWith("/uploads/") ? (
                    <img
                      src={`${API_URL}${p.image}`}
                      alt={p.name}
                      className={s.image}
                    />
                  ) : (
                    <img src={p.image} alt={p.name} className={s.image} />
                  )
                ) : null}
              </div>
              <div className={s.info}>
                <div className={s.name}>{p.name}</div>
                <div className={s.desc}>{p.description}</div>
                <div className={s.price}>{p.price}</div>
                <div
                  className={s.hot}
                  style={{ color: p.hotselling ? "#20b958" : "#e53935" }}
                >
                  {p.hotselling ? "Hot Selling" : "Not Hot"}
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  {p.hotselling ? (
                    <button
                      className={s.button}
                      disabled={marking === p._id}
                      onClick={() => handleUnmarkHot(p._id)}
                    >
                      {marking === p._id
                        ? "Unmarking..."
                        : "Unmark Hot Selling"}
                    </button>
                  ) : (
                    <button
                      className={s.button}
                      disabled={marking === p._id}
                      onClick={() => handleMarkHot(p._id)}
                    >
                      {marking === p._id ? "Marking..." : "Mark as Hot Selling"}
                    </button>
                  )}
                  <button
                    className={s.button}
                    style={{ background: "#e53935", color: "#fff" }}
                    disabled={deleting === p._id}
                    onClick={() => handleDelete(p._id)}
                  >
                    {deleting === p._id ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    className={s.button}
                    style={{ background: "#1976d2", color: "#fff" }}
                    onClick={() => handleEditClick(p)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup Modal */}
      {editId && (
        <div className={s.modalOverlay} onClick={handleEditCancel}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Edit Product</h3>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
              className={s.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className={s.input}
            />
            <input
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              placeholder="Description"
              className={s.input}
            />
            <input
              name="price"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Price"
              type="number"
              className={s.input}
            />
            <div className={s.modalActions}>
              <button
                className={s.button}
                onClick={() => handleEditSave(editId)}
              >
                Save
              </button>
              <button
                className={s.button}
                onClick={handleEditCancel}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
