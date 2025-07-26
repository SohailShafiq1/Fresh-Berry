import React, { useState, useEffect } from "react";
import style from "./HeroSection.module.css";
import freshImg from "./fresh.png";
import leafImg from "./leaf.png";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaCheckCircle,
  FaTruck,
  FaQuestionCircle,
} from "react-icons/fa";
const s = style;
import { ThemeContext } from "../../../../context/Theme/ThemeContext";
import { useContext } from "react";

const taglines = [
  "Daily sourcing from trusted local and global farms",
  "Unmatched freshness, delivered same day",
  "Professional service & competitive pricing",
];

const leaves = [
  { top: "8%", left: "18%", rotate: "10deg" },
  { top: "20%", left: "70%", rotate: "-15deg" },
  { top: "60%", left: "10%", rotate: "25deg" },
  { top: "75%", left: "40%", rotate: "-10deg" },
  { top: "30%", left: "50%", rotate: "0deg" },
  { top: "80%", left: "80%", rotate: "20deg" },
  { top: "50%", left: "85%", rotate: "-20deg" },
  { top: "10%", left: "85%", rotate: "15deg" },
];

export const HeroSection = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{ background: isBlack ? "#111" : "#fafafa" }}
      className={s.heroSection}
    >
      {/* Animated Leaves using leaf.png */}
      {leaves.map((leaf, idx) => (
        <img
          src={leafImg}
          alt="leaf"
          key={idx}
          className={s.leaf}
          style={{
            top: leaf.top,
            left: leaf.left,
            transform: `rotate(${leaf.rotate})`,
            position: "absolute",
            zIndex: 1,
            width: "54px",
            height: "auto",
          }}
        />
      ))}
      <div className={s.topText}>
        <h1 className={s.heading}>
          <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>U</span>
          <span style={{ color: isBlack ? "#f60909ff" : "#D72323" }}>A</span>
          <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>E</span>
          <span style={{ color: isBlack ? "#fff" : "#222" }}>'s NO.1 </span>
          <span style={{ color: "#FFA928" }}>HORECA</span>
          <span style={{ color: isBlack ? "#fff" : "#222" }}> PARTNER</span>
        </h1>
        <p
          className={s.subheading}
          style={{ color: isBlack ? "#04d755ff" : "#016327" }}
        >
          for reliable fresh fruits and vegetables supply – picked, packed and
          delivered fast.
        </p>
      </div>
      <div className={s.heroContent}>
        <div className={s.leftBlock}>
          <h2
            className={s.moreFresh}
            style={{ color: isBlack ? "#fff" : "#222" }}
          >
            More Than Fresh
          </h2>
          <h2 className={s.freshBerry}>
            <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>
              Fresh
            </span>{" "}
            <span style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}>
              Berry
            </span>{" "}
            <span style={{ color: isBlack ? "#fff" : "#222" }}> Fresh!</span>
          </h2>
          <div
            className={s.statsRow}
            style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
          >
            <div className={s.statBox}>
              <span className={s.statTitle}>Customers</span>
              <span className={s.statValue}>10k Plus</span>
            </div>
            <div className={s.statDivider}></div>
            <div className={s.statBox}>
              <span className={s.statTitle}>Quality</span>
              <span className={s.statValue}>Fully Fresh</span>
            </div>
            <div className={s.statDivider}></div>
            <div className={s.statBox}>
              <span className={s.statTitle}>Delivery</span>
              <span className={s.statValue}>Same Day</span>
            </div>
          </div>
          <NavLink to="/contact" className={s.contactBtn}>
            <span className={s.contactIcon}>📞</span> Contact Us
          </NavLink>
        </div>
        <div className={s.centerImageBlock}>
          <img
            src={freshImg}
            alt="Fresh Fruits and Vegetables"
            className={s.freshImg}
          />
        </div>
        <div className={s.rightBlock}>
          <div
            style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
            className={s.whyTagline}
          >
            {taglines[taglineIndex]}
          </div>
          <div className={s.whyUsBox}>
            <FaQuestionCircle
              className={s.whyUsIcon}
              style={{
                color: isBlack ? "#9101eaff" : "#5C128B",
                fontSize: "2.2rem",
                marginBottom: "8px",
              }}
            />
            <svg
              width="60"
              height="40"
              viewBox="0 0 60 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 30 Q30 10 50 30"
                stroke="#5C128B"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="10" cy="30" r="2" fill="#5C128B" />
              <circle cx="50" cy="30" r="2" fill="#5C128B" />
              <circle cx="30" cy="10" r="2" fill="#5C128B" />
            </svg>
            <div
              className={s.whyUsText}
              style={{
                color: isBlack ? "#9101eaff" : "#5C128B",
                fontWeight: "700",
              }}
            >
              Why Us?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
