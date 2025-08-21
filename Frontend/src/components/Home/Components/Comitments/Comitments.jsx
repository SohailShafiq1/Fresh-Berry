import React from "react";
import style from "./Comitments.module.css";
import img from "./Healthy.png";
const s = style;
import { ThemeContext } from "../../../../context/Theme/ThemeContext";
import { useContext } from "react";
export const Comitments = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  return (
    <div
      style={{ background: isBlack ? "#111" : "#fafafa" }}
      className={s.container}
    >
      <div className={s.top}>
        <h1 style={{ color: isBlack ? "#fff" : "#222" }}>
          Commitment to Quality
        </h1>
        <p style={{ color: isBlack ? "#fff" : "#222" }}>
          Quality is our foundation. We partner with trusted farms across
          regions known for their premium produce and adhere to rigorous
          standards in handling and delivery. Our cold chain logistics maintain
          freshness and nutrition, while our quality control team performs
          thorough inspections to guarantee you receive nothing but the best.
        </p>
      </div>
      <div className={s.imageContainer}>
        <img src={img} alt="Commitment to Quality" className={s.image} />
      </div>
    </div>
  );
};
