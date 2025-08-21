import React from "react";
import style from "./Services.module.css";
const s = style;

import orchardImg from "../../../../Products/fr1.png";
import businessImg from "../../../../Products/fr2.png";
import logisticsImg from "../../../../Products/fr3.png";
import { ThemeContext } from "../../../../context/Theme/ThemeContext";
import { useContext } from "react";

export const Services = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  return (
    <div
      style={{ background: isBlack ? "#111" : "#fafafa" }}
      className={s.wrapper}
    >
      <h2 style={{ color: isBlack ? "#fff" : "#222" }} className={s.heading}>
        Our Services
      </h2>
      <div className={s.contentRow}>
        <div style={{ color: isBlack ? "#fff" : "#222" }} className={s.left}>
          <p className={s.intro}>
            From orchard to outlet, Fresh Berry fuels Dubai’s freshest kitchens.
            Whether you run a five-star hotel, a cozy café, or a fast-moving
            grocery, we’re your behind-the-scenes produce powerhouse.
            Custom-picked, swiftly packed and delivered.
          </p>
          <p className={s.intro}>
            We handle everything from sourcing and quality checks to packaging
            and chilled transport, so you can focus on creating unforgettable
            dining experiences.
          </p>
        </div>
        <div className={s.right}>
          <div
            className={s.serviceCard}
            style={{
              background: isBlack ? "#222" : "#fafafa",
            }}
          >
            <img
              src={orchardImg}
              alt="Orchard to Outlet"
              className={s.serviceImg}
            />
            <div>
              <div
                className={s.serviceTitle}
                style={{ color: isBlack ? "#fff" : "#222" }}
              >
                Orchard to Outlet
              </div>
              <div
                style={{ color: isBlack ? "#fff" : "#222" }}
                className={s.serviceDesc}
              >
                From orchard to outlet, Fresh Berry fuels Dubai’s freshest
                kitchens.
              </div>
            </div>
          </div>
          <div
            style={{
              background: isBlack ? "#222" : "#fafafa",
            }}
            className={s.serviceCard}
          >
            <img
              src={businessImg}
              alt="For Every Business"
              className={s.serviceImg}
            />
            <div>
              <div
                className={s.serviceTitle}
                style={{ color: isBlack ? "#fff" : "#222" }}
              >
                For Every Business
              </div>
              <div
                className={s.serviceDesc}
                style={{ color: isBlack ? "#fff" : "#222" }}
              >
                Whether you run a five-star hotel, a cozy café, or a fast-moving
                grocery…
              </div>
            </div>
          </div>
          <div
            style={{
              background: isBlack ? "#222" : "#fafafa",
            }}
            className={s.serviceCard}
          >
            <img
              src={logisticsImg}
              alt="End-to-End Logistics"
              className={s.serviceImg}
            />
            <div>
              <div
                className={s.serviceTitle}
                style={{ color: isBlack ? "#fff" : "#222" }}
              >
                End-to-End Logistics
              </div>
              <div
                className={s.serviceDesc}
                style={{ color: isBlack ? "#fff" : "#222" }}
              >
                Custom-picked, quality-checked, expertly packed, and delivered
                fresh with chilled transport.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
