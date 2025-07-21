import React from "react";
import style from './AboutUs.module.css';
import farmerImage from '../../assets/truck.png';  // replace with your image
import globeImage from '../../assets/truck.png';    // replace with your image
import { FaAward, FaGlobe, FaSnowflake, FaSeedling, FaClipboardCheck } from "react-icons/fa";

const s = style;

const AboutUs = () => {
  return (
    <div className={s.aboutUs}>
      {/* Section 1: Partner in Freshness */}
      <div className={s.section}>
        <div className={s.left}>
          <h1>Your Partner in Freshness</h1>
          <p className={s.subtitle}>
            Delivering premium-quality fruits and vegetables to the UAE’s food industry with over a decade of experience
          </p>
          <p>
            Fresh Berry Foodstuff Trading LLC was founded with one goal: to provide the UAE’s food industry with consistent access to fresh, premium-quality fruits and vegetables.
            Drawing on over a decade of experience in the fresh produce trade, our team combines deep market knowledge with a passion for quality and service.
          </p>
          <p>
            We proudly serve a broad customer base — from hotels and restaurants to caterers, groceries, and institutional buyers — all with customized solutions that fit their supply needs.
          </p>
          <div className={s.excellence}>
            <FaAward /> Over 10 Years of Excellence
          </div>
        </div>
        <div className={s.rightCard} style={{ backgroundColor: '#016327' }}>
          <h2>Our Story</h2>
          <img src={farmerImage} alt="Farmer on Tractor" />
        </div>
      </div>

      {/* Section 2: Global Sourcing Network */}
      <div className={s.section}>
        <div className={s.leftCard} style={{ backgroundColor: '#5C128B' }}>
          <h2>Global Sourcing Network</h2>
          <img src={globeImage} alt="Globe and Transport" />
        </div>
        <div className={s.right}>
          <p>
            Our strong network of suppliers spans local farms and trusted international growers across the globe. This global sourcing strategy ensures we bring you the best seasonal produce throughout the year.
          </p>
          <p>
            At Fresh Berry, we embrace innovation and sustainability. We invest in cold chain logistics and implement strict quality control systems that meet Dubai Municipality standards and HACCP certification.
          </p>
          <ul className={s.iconList}>
            <li><FaGlobe /> Global Suppliers</li>
            <li><FaClipboardCheck /> HACCP Certified</li>
            <li><FaSnowflake /> Cold Chain Logistics</li>
            <li><FaSeedling /> Sustainable Practices</li>
          </ul>
        </div>
      </div>

      {/* Section 3: Vision & Mission */}
      <div className={s.visionMission}>
        <h2>Our Vision & Mission</h2>
        <p className={s.subtitle}>Committed to excellence and sustainability in everything we do</p>
        <div className={s.boxes}>
          <div className={s.box}>
            <div className={s.icon} style={{ backgroundColor: "#FDCB6E" }}>👁️</div>
            <h3>Our Vision</h3>
            <p>To be the UAE’s most reliable and trusted supplier of fresh fruits and vegetables, setting the benchmark for quality and service.</p>
          </div>
          <div className={s.box}>
            <div className={s.icon} style={{ backgroundColor: "#55efc4" }}>🎯</div>
            <h3>Our Mission</h3>
            <p>To consistently deliver freshness and quality with personalized service, creating long-term partnerships based on integrity and excellence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
