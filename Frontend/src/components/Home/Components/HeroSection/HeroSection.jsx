import React, { useState, useEffect } from "react";
import style from "./HeroSection.module.css";
import freshImg from "./fresh.png";
import leafImg from "./leaf.png";
import leaf1 from "./leafs/leaf1.png";
import leaf2 from "./leafs/leaf2.png";
import leaf3 from "./leafs/leaf3.png";
import leaf4 from "./leafs/leaf4.png";
import leaf5 from "./leafs/leaf5.png";
import leaf6 from "./leafs/leaf6.png";
import leaf7 from "./leafs/leaf7.png";
import leaf8 from "./leafs/leaf8.png";
import leaf9 from "./leafs/leaf9.png";
import leaf10 from "./leafs/leaf10.png";
import leaf11 from "./leafs/leaf11.png";
import leaf12 from "./leafs/leaf12.png";
import leaf13 from "./leafs/leaf13.png";
import leaf14 from "./leafs/leaf14.png";
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

const leafImages = [leaf1, leaf2, leaf3, leaf4, leaf5, leaf6, leaf7, leaf8, leaf9, leaf10, leaf11, leaf12, leaf13, leaf14];

const leaves = [
  { top: "8%", left: "18%", rotate: "10deg", image: leaf1, delay: 0.2 },
  { top: "20%", left: "70%", rotate: "-15deg", image: leaf2, delay: 0.5 },
  { top: "60%", left: "10%", rotate: "25deg", image: leaf3, delay: 0.8 },
  { top: "75%", left: "40%", rotate: "-10deg", image: leaf4, delay: 1.1 },
  { top: "30%", left: "50%", rotate: "0deg", image: leaf5, delay: 1.4 },
  { top: "80%", left: "80%", rotate: "20deg", image: leaf6, delay: 1.7 },
  { top: "50%", left: "85%", rotate: "-20deg", image: leaf7, delay: 2.0 },
  { top: "10%", left: "85%", rotate: "15deg", image: leaf8, delay: 2.3 },
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
      {/* Mobile Header: Just the Title */}
      <div className={s.mobileHeader}>
        <div className={s.mobileTitle}>
          <h1 className={s.mobileHeading}>
            <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>U</span>
            <span style={{ color: isBlack ? "#f60909ff" : "#D72323" }}>A</span>
            <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>E</span>
            <span style={{ color: isBlack ? "#fff" : "#222" }}>'s NO.1</span>
            <br />
            <span style={{ color: "#FFA928" }}>HORECA</span>
            <span style={{ color: isBlack ? "#fff" : "#222" }}> PARTNER</span>
          </h1>
        </div>
      </div>

      {/* Mobile Subheading */}
      <p 
        className={s.mobileSubheading}
        style={{ color: isBlack ? "#04d755ff" : "#016327" }}
      >
        for reliable fresh fruits and vegetables supply – picked, packed and delivered fast.
      </p>

      {/* Mobile Main Content: Content + Image in same row */}
      <div className={s.mobileMainContent}>
        <div className={s.mobileContentSection}>
          <h2
            className={s.mobileMoreFresh}
            style={{ color: isBlack ? "#fff" : "#222" }}
          >
            More Than Fresh
          </h2>
          <h2 className={s.mobileFreshBerry}>
            <span style={{ color: isBlack ? "#04d755ff" : "#016327" }}>
              Fresh
            </span>{" "}
            <span style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}>
              Berry
            </span>{" "}
            <span style={{ color: isBlack ? "#fff" : "#222" }}> Fresh!</span>
          </h2>
          
          <div className={s.mobileStatsSection}>
            <div 
              className={s.mobileStatBox}
              style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
            >
              <span className={s.mobileStatTitle}>Customers</span>
              <span className={s.mobileStatValue}>10k Plus</span>
            </div>
            <div 
              className={s.mobileStatBox}
              style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
            >
              <span className={s.mobileStatTitle}>Quality</span>
              <span className={s.mobileStatValue}>Fully Fresh</span>
            </div>
            <div 
              className={s.mobileStatBox}
              style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
            >
              <span className={s.mobileStatTitle}>Delivery</span>
              <span className={s.mobileStatValue}>Same Day</span>
            </div>
          </div>
          
          <NavLink to="/contact" className={s.mobileContactBtnBottom}>
            <span>📞</span> Contact Us
          </NavLink>
        </div>
        
        <div className={s.mobileImageSection}>
          <img
            src={freshImg}
            alt="Fresh Fruits and Vegetables"
            className={s.mobileFreshImg}
          />
        </div>
      </div>

      {/* Mobile Bottom Section: Why Us */}
      <div className={s.mobileBottomSection}>
        <div
          style={{ color: isBlack ? "#9101eaff" : "#5C128B" }}
          className={s.mobileTagline}
        >
          {taglines[taglineIndex]}
        </div>
        <div className={s.mobileWhyUsBox}>
          <FaQuestionCircle
            className={s.mobileWhyUsIcon}
            style={{
              color: isBlack ? "#9101eaff" : "#5C128B",
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
            className={s.mobileWhyUsText}
            style={{
              color: isBlack ? "#9101eaff" : "#5C128B",
            }}
          >
            Why Us?
          </div>
        </div>
      </div>

      {/* Static Leaves using different leaf images */}
      {leaves.map((leaf, idx) => (
        <img
          src={leaf.image}
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
      
      {/* Desktop Layout */}
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
