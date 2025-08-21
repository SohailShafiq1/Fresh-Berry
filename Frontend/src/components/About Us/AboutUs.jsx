import { BsPatchQuestionFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import React from "react";
import style from "./AboutUs.module.css";
import farmerImage from "../../assets/about1.png"; // replace with your image
import globeImage from "../../assets/about2.png"; // replace with your image
import {
  FaAward,
  FaGlobe,
  FaSnowflake,
  FaSeedling,
  FaClipboardCheck,
  FaStar,
  FaUsers,
  FaHandshake,
  FaRecycle,
} from "react-icons/fa";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useContext } from "react";
const s = style;

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  return (
    <div
      className={s.aboutUs}
      style={{ background: isBlack ? "#111" : "#f5f5f5" }}
    >
      <div className={s.header} style={{ color: isBlack ? "#fff" : "#000" }}>
        <h1>Your Partner in Freshness</h1>
        <p style={{ color: isBlack ? "#fff" : "#333" }} className={s.subtitle}>
          Delivering premium-quality fruits and vegetables to the UAE’s food
          industry
          <span style={{ display: "block" }}>
            with over a decade of experience
          </span>
        </p>
      </div>
      <div className={s.section}>
        <div className={s.left} style={{ color: isBlack ? "#fff" : "#333" }}>
          <p>
            Fresh Berry Foodstuff Trading LLC was founded with one goal: to
            provide the UAE’s food industry with consistent access to fresh,
            premium-quality fruits and vegetables. Drawing on over a decade of
            experience in the fresh produce trade, our team combines deep market
            knowledge with a passion for quality and service.
          </p>
          <p>
            We proudly serve a broad customer base — from hotels and restaurants
            to caterers, groceries, and institutional buyers — all with
            customized solutions that fit their supply needs.
          </p>
          <div className={s.excellence}>
            <FaAward /> Over 10 Years of Excellence
          </div>
        </div>
        <div className={s.rightCard}>
          <h2>Our Story</h2>
          <img src={farmerImage} alt="Farmer on Tractor" />
        </div>
      </div>

      {/* Section 2: Global Sourcing Network */}
      <div className={s.section}>
        <div className={s.leftCard}>
          <h2>Global Sourcing Network</h2>
          <img src={globeImage} alt="Globe and Transport" />
        </div>
        <div className={s.right} style={{ color: isBlack ? "#fff" : "#333" }}>
          <p>
            Our strong network of suppliers spans local farms and trusted
            international growers across the globe. This global sourcing
            strategy ensures we bring you the best seasonal produce throughout
            the year.
          </p>
          <p>
            At Fresh Berry, we embrace innovation and sustainability. We invest
            in cold chain logistics and implement strict quality control systems
            that meet Dubai Municipality standards and HACCP certification.
          </p>
          <ul
            className={s.iconList}
            style={{ color: isBlack ? "#fff" : "#333" }}
          >
            <li>
              <FaGlobe /> Global Suppliers
            </li>
            <li>
              <FaClipboardCheck /> HACCP Certified
            </li>
            <li>
              <FaSnowflake /> Cold Chain Logistics
            </li>
            <li>
              <FaSeedling /> Sustainable Practices
            </li>
          </ul>
        </div>
      </div>

      {/* Section 3: Vision & Mission */}
      <div className={s.visionMission}>
        <h2 style={{ color: isBlack ? "#fff" : "#000" }}>
          Our Vision & Mission
        </h2>
        <p style={{ color: isBlack ? "#fff" : "#333" }} className={s.subtitle}>
          Committed to excellence and sustainability in everything we do
        </p>
        <div className={s.boxes}>
          <div
            className={s.box}
            style={{ background: isBlack ? "#333" : "#fff" }}
          >
            <div className={s.icon} style={{ backgroundColor: "#FDCB6E" }}>
              <AiOutlineEye />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#333" }}>Our Vision</h3>
            <p style={{ color: isBlack ? "#fff" : "#333" }}>
              To be the UAE’s most reliable and trusted supplier of fresh fruits
              and vegetables, setting the benchmark for quality and service.
            </p>
          </div>
          <div
            className={s.box}
            style={{ background: isBlack ? "#333" : "#fff" }}
          >
            <div className={s.icon} style={{ backgroundColor: "#55efc4" }}>
              <BsPatchQuestionFill />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#333" }}>Our Mission</h3>
            <p style={{ color: isBlack ? "#fff" : "#333" }}>
              To consistently deliver freshness and quality with personalized
              service, creating long-term partnerships based on integrity and
              excellence.
            </p>
          </div>
        </div>
      </div>
      {/* Core Values Section */}
      <div
        className={s.coreValuesSection}
        style={{ background: isBlack ? "#222" : "#fff" }}
      >
        <h2
          className={s.coreValuesTitle}
          style={{ color: isBlack ? "#fff" : "#000" }}
        >
          Core Values
        </h2>
        <div className={s.coreValuesGrid}>
          <div className={s.coreValueBox}>
            <div
              className={s.coreValueIcon}
              style={{ backgroundColor: "#2C6B36" }}
            >
              <FaStar style={{ color: "#fff", fontSize: "2rem" }} />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#000" }}>Quality First</h3>
            <p style={{ color: isBlack ? "#fff" : "#000" }}>
              Premium quality in every product we deliver
            </p>
          </div>
          <div className={s.coreValueBox}>
            <div
              className={s.coreValueIcon}
              style={{ backgroundColor: "#FDCB6E" }}
            >
              <FaUsers style={{ color: "#fff", fontSize: "2rem" }} />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#000" }}>
              Customer-Centric Service
            </h3>
            <p style={{ color: isBlack ? "#fff" : "#000" }}>
              Personalized solutions for every client
            </p>
          </div>
          <div className={s.coreValueBox}>
            <div
              className={s.coreValueIcon}
              style={{ backgroundColor: "#D84343" }}
            >
              <FaHandshake style={{ color: "#fff", fontSize: "2rem" }} />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#000" }}>
              Integrity in Every Transaction
            </h3>
            <p style={{ color: isBlack ? "#fff" : "#000" }}>
              Honest and transparent business practices
            </p>
          </div>
          <div className={s.coreValueBox}>
            <div
              className={s.coreValueIcon}
              style={{ backgroundColor: "#5C128B" }}
            >
              <FaRecycle style={{ color: "#fff", fontSize: "2rem" }} />
            </div>
            <h3 style={{ color: isBlack ? "#fff" : "#000" }}>
              Sustainability & Hygiene
            </h3>
            <p style={{ color: isBlack ? "#fff" : "#000" }}>
              Environmental responsibility and food safety
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
