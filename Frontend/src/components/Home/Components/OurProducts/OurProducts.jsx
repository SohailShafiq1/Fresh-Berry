import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./OurProducts.module.css";
import { ThemeContext } from "../../../../context/Theme/ThemeContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  useEffect(() => {
    const fetchHotProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/products?hotselling=true&limit=5`
        );
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch {
        setError("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchHotProducts();
  }, []);

  return (
    <div
      style={{ background: isBlack ? "#111" : "#fafafa" }}
      className={style.container}
    >
      <div className={style.header}>
        <div></div>
        <h2
          className={style.title}
          style={{
            color: isBlack ? "#fff" : "#111",
          }}
        >
          Our Products
        </h2>
        <NavLink
          to="/products"
          style={{
            color: isBlack ? "#fff" : "#333",
          }}
          className={style.seeAll}
        >
          See all
        </NavLink>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className={style.grid}>
          {products.map((product, index) => (
            <div
              className={style.card}
              style={{
                background: isBlack ? "#222" : "#fafafa",
              }}
              key={index}
            >
              <span className={style.country}>{product.origin || "UAE"}</span>
              <div
                className={style.imageWrapper}
                style={{
                  background: isBlack ? "#111" : "#fafafa",
                }}
              >
                <img
                  src={
                    product.image && product.image.startsWith("/uploads/")
                      ? `${API_URL}${product.image}`
                      : product.image
                  }
                  alt="product"
                  className={style.image}
                />
              </div>
              <h4
                style={{ color: isBlack ? "#fff" : "#222" }}
                className={style.name}
              >
                {product.name}
              </h4>
              <p
                style={{ color: isBlack ? "#fff" : "#222" }}
                className={style.desc}
              >
                {product.description || product.desc}
              </p>
              <p
                style={{ color: isBlack ? "#fff" : "#222" }}
                className={style.price}
              >
                {product.price}
              </p>
              <a
                href="https://wa.me/"
                className={style.orderBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/color/24/000000/whatsapp--v1.png"
                  alt="whatsapp"
                />
                Order Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurProducts;
