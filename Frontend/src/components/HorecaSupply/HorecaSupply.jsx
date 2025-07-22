import React from "react";
import style from "./HorecaSupply.module.css";
import Delivery from "../../assets/delivery.png";
import Files from "../../assets/files.png";
import NoteBook from "../../assets/notebook.png";
import Sack from "../../assets/sack.png";
import Truck from "../../assets/truck.png";
const s = style;

const HorecaSupply = () => {
  const industries = [
    { label: "Hotels", color: "#005F30" },
    { label: "Restaurants", color: "#F9A825" },
    { label: "Cafeterias", color: "#D32F2F" },
    { label: "Catering Companies", color: "#7CB342" },
    { label: "Cloud Kitchens", color: "#6A1B9A" },
    { label: "Airline Catering", color: "#005F30" },
  ];
  // State for which industry card is rotated
  const [rotatedIndex, setRotatedIndex] = React.useState(null);

  return (
    <>
      <div className={s.container}>
        <div className={s.paddingBox}>
          <div className={s.heroSection}>
            <h2 className={s.title}>
              Your Trusted <span className={s.highlight}>HoReCa</span> Supply
              Partner
            </h2>
            <p className={s.description}>
              Fresh Berry understands the demands of the hospitality industry,
              where timing, consistency, and quality are paramount. We tailor
              our supply solutions to support hotels, restaurants, cafés,
              caterers, and cloud kitchens with fresh produce that elevates
              every dish.
            </p>
          </div>
          <div className={s.weOffer}>
            <div className={s.leftSide}>
              <h1>What We Offer</h1>
              <p>
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
          <div className={s.industrySection}>
            <h2 className={s.industryTitle}>Industries Served</h2>
            <div className={s.industryWrapper}>
              <p className={s.industryHint}>Hover to expand cards</p>
              <div className={s.industryCardStack}>
                {industries.map((item, index) => (
                  <div
                    key={index}
                    className={`${s.industryCard} ${s[item.color]} ${
                      s["z" + (industries.length - index)]
                    } ${s["left" + index]} ${
                      rotatedIndex === index ? s.rotated : ""
                    }`}
                    onClick={() =>
                      setRotatedIndex(rotatedIndex === index ? null : index)
                    }
                  >
                    <span
                      className={rotatedIndex === index ? s.horizontalText : ""}
                    >
                      {item.label}
                    </span>
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
