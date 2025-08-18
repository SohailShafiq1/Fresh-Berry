import React from "react";
import style from "./Cateogirze.module.css";
import { useNavigate } from "react-router-dom";

import Fruits from "./assets/fruite.png";
import Vegetables from "./assets/vegetable.png";
import Egg from "./assets/egg.png";
import Leaf from "./assets/picks.png";
import Bag from "./assets/box.png";
import { ThemeContext } from "../../../../context/Theme/ThemeContext";
import { useContext } from "react";

const s = style;

const categories = [
  {
    name: "Fresh Fruits",
    image: Fruits,
    color: "#016327",
    backendCategory: "Fruit", // Maps to backend category
  },
  {
    name: "Vegetables",
    image: Vegetables,
    color: "#FFA928",
    backendCategory: "Vegetables", // Maps to backend category
  },
  {
    name: "Egg & Poultry",
    image: Egg,
    color: "#D72323",
    backendCategory: "Poultry", // Maps to backend category
  },
  {
    name: "Seasonal Picks",
    image: Leaf,
    color: "#A1D70A",
    backendCategory: "Seasonal Picks", // New category for backend
  },
  // {
  //   name: "Custom Orders",
  //   image: Bag,
  //   color: "#5C128B",
  // },
];

export const Cateogirze = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isBlack = theme.text === "#fff";

  const handleCategoryClick = (category) => {
    // Navigate to products page with category filter
    navigate(`/products?category=${encodeURIComponent(category.backendCategory)}`);
  };

  return (
    <div
      style={{ background: isBlack ? "#111" : "#fafafa" }}
      className={s.wrapper}
    >
      <h2 style={{ color: isBlack ? "#fff" : "#333" }} className={s.heading}>
        Categories
      </h2>
      <div className={s.grid}>
        {categories.map((cat, idx) => (
          <div
            className={s.card}
            style={{ background: cat.color, cursor: 'pointer' }}
            key={cat.name}
            onClick={() => handleCategoryClick(cat)}
            title={`View ${cat.name} products`}
          >
            <div className={s.imageWrapper}>
              <img src={cat.image} alt={cat.name} className={s.image} />
            </div>
            <div className={s.label}>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cateogirze;
