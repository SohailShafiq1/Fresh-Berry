// HorecaSupply.jsx
import React, { useState } from "react";
import style from "./HorecaSupply.module.css";
import Delivery from "../../assets/delivery.png";
import Files from "../../assets/files.png";
import Notebook from "../../assets/notebook.png";
import Sack from "../../assets/sack.png";
import Truck from "../../assets/truck.png";

const s = style;

const HorecaSupply = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Flexible daily deliveries",
      className: s.greenService,
      image: Delivery,
    },
    {
      title: "Fixed pricing contracts",
      className: s.orangeService,
      image: Notebook,
    },
    {
      title: "Product preparation to your specifications",
      className: s.redService,
      image: Sack,
    },
    {
      title: "Cold chain logistics for freshness",
      className: s.limeService,
      image: Truck,
    },
    {
      title: "Personalized account management",
      className: s.purpleService,
      image: Files,
    },
  ];

  const industries = [
    { name: "Hotels", className: s.greenIndustry },
    { name: "Restaurants", className: s.orangeIndustry },
    { name: "Cafeterias", className: s.redIndustry },
    { name: "Catering Companies", className: s.limeIndustry },
    { name: "Cloud Kitchens", className: s.purpleIndustry },
    { name: "Airline Catering", className: s.tealIndustry },
  ];

  return (
    <div className={s.container}>
      {/* Top Section */}
      <div className={s.topBox}>
        <h1 className={s.topTitle}>
          Your Trusted <span className={s.highlight}>HoReCa</span> Supply
          Partner
        </h1>
        <p className={s.topDesc}>
          Fresh Berry understands the demands of the hospitality industry, where
          timing, consistency, and quality are paramount. We tailor our supply
          solutions to support hotels, restaurants, cafés, caterers, and cloud
          kitchens with fresh produce that elevates every dish.
        </p>
      </div>

      {/* Middle Section - What We Offer */}
      <div className={s.middleBox}>
        <div className={s.leftofMiddle}>
          <h1 className={s.middleTitle}>What We Offer</h1>
          <p className={s.middleDesc}>
            Our experienced team works closely with your kitchen to ensure
            seamless supply management. We help you adjust orders to meet demand
            fluctuations and provide ongoing quality assurance to support your
            business success.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className={s.serviceGrid}>
          <div className={s.serviceLeft}>
            <div className={s.serviceRow1}>
              {services.slice(0, 2).map((service, index) => (
                <div
                  key={index}
                  className={`${s.serviceCard} ${service.className}`}
                >
                  <img src={service.image} alt={service.title} />
                  <span className={s.serviceText}>{service.title}</span>
                </div>
              ))}
            </div>
            <div className={s.serviceRow2}>
              {services.slice(2, 4).map((service, index) => (
                <div
                  key={index}
                  className={`${s.serviceCard} ${service.className}`}
                >
                  <img src={service.image} alt={service.title} />
                  <span className={s.serviceText}>{service.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.serviceRight}>
            <div className={s.serviceCard}>
              <img src={services[4].image} alt={services[4].title} />
              <span className={s.serviceText}>{services[4].title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Industries Served */}
      <div className={s.bottomBox}>
        <h1 className={s.bottomTitle}>Industries Served</h1>

        <div className={s.hoverInstruction}>
          <span>← Hover to expand cards</span>
        </div>

        <div className={s.industriesContainer}>
          <div className={s.industriesWrapper}>
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`${s.industryCard} ${industry.className} ${
                  hoveredCard === index ? s.expanded : s.collapsed
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={s.industryContent}>
                  <span
                    className={`${s.industryText} ${
                      hoveredCard === index ? s.textHorizontal : s.textVertical
                    }`}
                  >
                    {industry.name}
                  </span>
                </div>

                {hoveredCard === index && (
                  <div className={s.dimensionIndicator}>169 × 38</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorecaSupply;
