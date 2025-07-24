import { MdSort } from "react-icons/md";
import { AiFillFilter } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import style from "./Products.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch {
        setError("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.filter}>
          <AiFillFilter /> Filter
        </span>
        <h2 className={style.title}>Our Products</h2>
        <span className={style.sort}>
          <MdSort /> Sort
        </span>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className={style.grid}>
          {products.map((product, index) => (
            <div className={style.card} key={index}>
              <span className={style.country}>{product.country || "UAE"}</span>
              <div className={style.imageWrapper}>
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
              <h4 className={style.name}>{product.name}</h4>
              <p className={style.desc}>
                {product.description || product.desc}
              </p>
              <p className={style.price}>{product.price}</p>
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
export default Products;
