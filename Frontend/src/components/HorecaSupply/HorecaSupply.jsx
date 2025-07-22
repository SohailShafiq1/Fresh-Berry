import { AiOutlineArrowLeft } from "react-icons/ai";
import React from "react";
import { useState } from "react";
import style from "./HorecaSupply.module.css";
import Delivery from "../../assets/delivery.png";
import Files from "../../assets/files.png";
import NoteBook from "../../assets/notebook.png";
import Sack from "../../assets/sack.png";
import Truck from "../../assets/truck.png";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useContext } from "react";
const s = style;

const HorecaSupply = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { theme } = useContext(ThemeContext);
  // Use isBlack for ternary color logic
  const isBlack = theme.text === "#fff";

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const industries = [
    "Hotels",
    "Restaurants",
    "Cafeterias",
    "Catering Companies",
    "Cloud Kitchens",
    "Airline Catering",
  ];

  return (
    <>
      <div
        className={s.container}
        style={{ background: isBlack ? "#111" : "#f5f5f5" }}
      >
        <div className={s.paddingBox}>
          <div className={s.heroSection}>
            <h2
              className={s.title}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              Your Trusted <span className={s.highlight}>HoReCa</span> Supply
              Partner
            </h2>
            <p
              className={s.description}
              style={{ color: isBlack ? "#fff" : "#64748b" }}
            >
              Fresh Berry understands the demands of the hospitality industry,
              where timing, consistency, and quality are paramount. We tailor
              our supply solutions to support hotels, restaurants, cafés,
              caterers, and cloud kitchens with fresh produce that elevates
              every dish.
            </p>
          </div>
          <div className={s.weOffer}>
            <div className={s.leftSide}>
              <h1 style={{ color: isBlack ? "#fff" : "#000" }}>
                What We Offer
              </h1>
              <p style={{ color: isBlack ? "#fff" : "#64748b" }}>
                Our experienced team works closely with your kitchen to ensure
                seamless supply management. We help you adjust orders to meet
                demand fluctuations and provide ongoing quality assurance to
                support your business success.
              </p>
            </div>
            <div className={s.rightSide}>
              <div className={s.cards}>
                <div className={s.leftCards}>
                  <div className={s.rowOne}>
                    <div className={s.greenCard}>
                      <h1>Flexible daily deliveries</h1>
                      <img src={Delivery} alt="Delivery" />
                    </div>
                    <div className={s.orangeCard}>
                      <h1>Fixed pricing contracts</h1>
                      <img src={NoteBook} alt="Notebook" />
                    </div>
                  </div>
                  <div className={s.rowTwo}>
                    <div className={s.redCard}>
                      <h1>Product preparation to your specifications</h1>
                      <img src={Sack} alt="Sack" />
                    </div>
                    <div className={s.LimeCard}>
                      <h1>Cold chain logistics for freshness</h1>
                      <img src={Truck} alt="Truck" />
                    </div>
                  </div>
                </div>
                <div className={s.rightCards}>
                  <div className={s.purpleCard}>
                    <h1>Personalized account management</h1>
                    <img src={Files} alt="Files" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.section}>
            <h2
              className={s.title}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              Industries Served
            </h2>
            <div className={s.wrapper}>
              <p
                className={s.hint}
                style={{ color: isBlack ? "#fff" : "#64748b" }}
              >
                <AiOutlineArrowLeft
                  style={{ position: "relative", top: "2.5px" }}
                />{" "}
                Hover to expand
              </p>
              <div className={s.cardContainer}>
                {industries.map((label, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    onMouseLeave={() =>
                      activeIndex === index && setActiveIndex(null)
                    }
                    className={`${s.card} ${s["card" + index]} ${
                      activeIndex === index ? s.active : ""
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorecaSupply;
