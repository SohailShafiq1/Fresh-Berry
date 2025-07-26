import React from "react";
import style from "./Cateogirze.module.css";

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
  },
  {
    name: "Vegetables",
    image: Vegetables,
    color: "#FFA928",
  },
  {
    name: "Egg & Poultry",
    image: Egg,
    color: "#D72323",
  },
  {
    name: "Seasonal Picks",
    image: Leaf,
    color: "#A1D70A",
  },
  {
    name: "Custom Orders",
    image: Bag,
    color: "#5C128B",
  },
];

export const Cateogirze = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

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
            style={{ background: cat.color }}
            key={cat.name}
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
