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
                href={`https://wa.me/971585917800?text=Hello%20Fresh%20Berry%20UAE!%0A%0AI%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name || 'this product')}.%0A%0AProduct%20Details:%0A-%20Name:%20${encodeURIComponent(product.name || 'N/A')}%0A-%20Price:%20${encodeURIComponent(product.price || 'N/A')}%0A-%20Description:%20${encodeURIComponent((product.description || product.desc || 'N/A').substring(0, 50))}%0A%0ACould%20you%20please%20provide%20me%20with%20more%20information%20about%20availability%20and%20delivery%20options?%0A%0AThank%20you!%0A%0AWebsite:%20freshberryuae.com`}
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
