import { BsFillTelephoneFill } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import React from "react";
import styles from "./Contact.module.css";
import Bag from "../../assets/Bag.png";
const s = styles;
const Contact = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.topBox}>
          <div className={s.topLeft}>
            <h1>We're Here to Help You</h1>
            <p>
              Have questions or ready to start your fresh produce journey with
              Fresh Berry? Reach out to our team today — we're happy to assist!
            </p>
            <div className={s.topButtons}>
              <button className={s.button}>
                <BsWhatsapp /> Whatsapp
              </button>
              <button className={s.button}>
                <BsFillTelephoneFill /> Call Now
              </button>
            </div>
          </div>
          <div className={s.topRight}>
            <img src={Bag} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
