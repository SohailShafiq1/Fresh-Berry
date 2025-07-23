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
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [marking, setMarking] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
      setError(null);
    } catch {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await axios.post(`${API_URL}/api/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ name: "", image: "", description: "", price: "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchProducts();
    } catch {
      alert("Failed to add product");
    }
    setAdding(false);
  };

  const handleMarkHot = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/products/${id}/hotselling`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, hotselling: true } : p))
      );
    } catch {
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
    } catch {
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
                <div className={s.price}>${p.price}</div>
                <div
                  className={s.hot}
                  style={{ color: p.hotselling ? "#20b958" : "#e53935" }}
                >
                  {p.hotselling ? "Hot Selling" : "Not Hot"}
                </div>
                <div>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
