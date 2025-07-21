import React from "react";
import style from "./HorecaSupply.module.css";
import Delivery from "../../assets/delivery.png";
import Files from "../../assets/files.png";
import Notebook from "../../assets/notebook.png";
import Sack from "../../assets/sack.png";
import Truck from "../../assets/truck.png";
const s = style;
const HorecaSupply = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.topBox}>
          <h1 className={s.topTitle}>
            Your Trusted <span className={s.highlight}>HoReCa</span> Supply
            Partner
          </h1>
          <p className={s.topDesc}>
            Fresh Berry understands the demands of the hospitality industry,
            where timing, consistency, and quality are paramount. We tailor our
            supply solutions to support hotels, restaurants, cafés, caterers,
            and cloud kitchens with fresh produce that elevates every dish.
          </p>
        </div>
        <div className={s.middleBox}>
          <div className={s.leftofMiddle}>
            <h1 className={s.middleTitle}>What We Offer</h1>
            <p className={s.middleDesc}>
              Our experienced team works closely with your kitchen to ensure
              seamless supply management. We help you adjust orders to meet
              demand fluctuations and provide ongoing quality assurance to
              support your business success.
            </p>
          </div>
          <div className={s.rightofMiddle}>
            <div className={s.rightBox}>
              <h1 className={s.rightBoxTitle}>Flexible daily deliveries</h1>
              <img className={s.rightBoxImage} src={Delivery} alt="" />
            </div>
            <div className={s.rightBox}>
              <h1 className={s.rightBoxTitle}>Fixed pricing contracts </h1>
              <img className={s.rightBoxImage} src={Notebook} alt="" />
            </div>
            <div className={s.rightBox}>
              <h1 className={s.rightBoxTitle}>
                Product preparation to your specifications 
              </h1>
              <img className={s.rightBoxImage} src={Sack} alt="" />
            </div>
            <div className={s.rightBox}>
              <h1 className={s.rightBoxTitle}>
                Cold chain logistics for freshness 
              </h1>
              <img className={s.rightBoxImage} src={Truck} alt="" />
            </div>
            <div className={s.rightBox}>
              <h1 className={s.rightBoxTitle}>
                Personalized account management 
              </h1>
              <img className={s.rightBoxImage} src={Files} alt="" />
            </div>
          </div>
        </div>
        <div className={s.bottomBox}>
          <h1 className={s.bottomTitle}>Industries Served</h1>
          <div className={s.cards}>
            <div className={s.card}>
              <h1>Hotels</h1>
            </div>
            <div className={s.card}>
              <h1>Restaurants</h1>
            </div>
            <div className={s.card}>
              <h1>Cafeterias</h1>
            </div>
            <div className={s.card}>
              <h1>Catering Companies</h1>
            </div>
            <div className={s.card}>
              <h1>Cloud Kitchens</h1>
            </div>
            <div className={s.card}>
              <h1>Airline Catering</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorecaSupply;
