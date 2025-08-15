import { MdSort } from "react-icons/md";
import { AiFillFilter } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Products.module.css";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  // Example filter/sort state (expand as needed)
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  // Get search query from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setNameSearch(searchQuery);
    }
  }, [location.search]);

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

  // Enhanced filtered and sorted products
  const filteredProducts = products
    .filter((p) => {
      // Enhanced name search filter (includes partial matches in name, description, and origin)
      if (nameSearch) {
        const searchTerm = nameSearch.toLowerCase();
        const productName = (p.name || "").toLowerCase();
        const productDesc = (p.description || "").toLowerCase();
        const productOrigin = (p.origin || "").toLowerCase();
        
        if (!productName.includes(searchTerm) && 
            !productDesc.includes(searchTerm) && 
            !productOrigin.includes(searchTerm)) {
          return false;
        }
      }
      // Price range filter
      const price = Number(p.price) || 0;
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "name-asc")
        return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "name-desc")
        return (b.name || "").localeCompare(a.name || "");
      return 0;
    });

  // Check if any filter is applied
  const isFilterApplied = nameSearch || minPrice || maxPrice;

  const clearFilters = () => {
    setNameSearch("");
    setMinPrice("");
    setMaxPrice("");
    // Clear URL search parameters when clearing filters
    navigate('/products', { replace: true });
  };

  return (
    <div
      className={style.container}
      style={{
        background: isBlack ? "#111" : "#fff",
        color: isBlack ? "#fff" : "#000",
      }}
    >
      {/* Filter Popup */}
      {showFilter && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowFilter(false)}
        >
          <div
            style={{
              background: isBlack ? "#111" : "#fff",
              color: isBlack ? "#fff" : "#000",
              padding: "2rem",
              borderRadius: "12px",
              minWidth: "220px",
              boxShadow: "0 2px 12px #0002",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "1rem" }}>Filter Products</h3>
            {/* Country filter removed */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontWeight: 500 }}>Name:</label>
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                placeholder="Search by name"
                style={{ width: "100%", padding: "0.5rem", marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 500 }}>Min Price:</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  style={{ width: "100%", padding: "0.5rem", marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 500 }}>Max Price:</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  style={{ width: "100%", padding: "0.5rem", marginTop: 4 }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                background: "#5c128b",
                color: "#fff",
                border: "none",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Sort Popup */}
      {showSort && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowSort(false)}
        >
          <div
            style={{
              background: isBlack ? "#111" : "#fff",
              color: isBlack ? "#fff" : "#000",
              padding: "2rem",
              borderRadius: "12px",
              minWidth: "220px",
              boxShadow: "0 2px 12px #0002",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "1rem" }}>Sort Products</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
            <button
              onClick={() => setShowSort(false)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                background: "#5c128b",
                color: "#fff",
                border: "none",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        className={style.header}
        style={{
          color: isBlack ? "#fff" : "#333",
        }}
      >
        {isFilterApplied ? (
          <span
            className={style.filter}
            style={{ color: "#e53935", cursor: "pointer", fontWeight: 600 }}
            onClick={clearFilters}
          >
            Clear Filter
          </span>
        ) : (
          <span className={style.filter} onClick={() => setShowFilter(true)}>
            <AiFillFilter /> Filter
          </span>
        )}
        <h2 className={style.title}>Our Products</h2>
        <span className={style.sort} onClick={() => setShowSort(true)}>
          <MdSort /> Sort
        </span>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className={style.grid}>
          {filteredProducts.map((product, index) => (
            <div
              className={style.card}
              style={{
                background: isBlack ? "#333" : "#fff",
              }}
              key={index}
            >
              <span className={style.country}>{product.origin || "UAE"}</span>
              <div
                className={style.imageWrapper}
                style={{
                  background: isBlack ? "#111" : "#fff",
                }}
              >
                {product.image && product.image.trim() !== "" ? (
                  <img
                    src={
                      product.image.startsWith("/uploads/")
                        ? `${API_URL}${product.image}`
                        : product.image
                    }
                    alt={product.name || "product"}
                    className={style.image}
                  />
                ) : (
                  <div 
                    className={style.image}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isBlack ? '#555' : '#f0f0f0',
                      color: isBlack ? '#999' : '#666',
                      fontSize: '0.8rem'
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>
              <h4
                style={{
                  color: isBlack ? "#fff" : "#333",
                }}
                className={style.name}
              >
                {product.name}
              </h4>
              <p
                style={{
                  color: isBlack ? "#fff" : "#333",
                }}
                className={style.desc}
              >
                {product.description || product.desc}
              </p>
              <p
                style={{
                  color: isBlack ? "#fff" : "#333",
                }}
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
export default Products;
