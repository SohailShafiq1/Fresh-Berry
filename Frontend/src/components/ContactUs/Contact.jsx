import React, { useContext } from "react";
import { BsInstagram } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import styles from "./Contact.module.css";
import Bag from "../../assets/bag.png";
const s = styles;

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  // Use isBlack for ternary color logic
  const isBlack = theme.text === "#fff";
  const contactBox = [
    {
      icon: <BsFillTelephoneFill />,
      title: "Phone",
      info: "0123123123",
    },
    {
      icon: <BsWhatsapp />,
      title: "WhatsApp",
      info: "0123123123",
    },
    {
      icon: <MdEmail />,
      title: "Email",
      info: "info@freshberryuae.com",
    },
    {
      icon: <ImLocation />,
      title: "Location",
      info: "Shop Name, Street, City",
    },
  ];

  return (
    <>
      <div
        className={s.container}
        style={{ background: isBlack ? "#111" : "#f5f5f5" }}
      >
        <div className={s.paddingBox}>
          <div className={s.topBox}>
            <div className={s.topLeft}>
              <h1 style={{ color: isBlack ? "#fff" : "#000" }}>
                We're Here to Help You
              </h1>
              <p style={{ color: isBlack ? "#fff" : "#000" }}>
                Have questions or ready to start your fresh produce journey with
                Fresh Berry? Reach out to our team today — we're happy to
                assist!
              </p>
              <div className={s.topButtons}>
                <button className={s.button} style={{ color: "#fff" }}>
                  <BsWhatsapp /> Whatsapp
                </button>
                <button className={s.button} style={{ color: "#fff" }}>
                  <BsFillTelephoneFill /> Call Now
                </button>
              </div>
            </div>
            <div className={s.topRight}>
              <img src={Bag} alt="Bag" />
            </div>
          </div>
          <div className={s.contactBox}>
            <h1
              className={s.contactTitle}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              Contact Information
            </h1>
            <p
              className={s.contactDesc}
              style={{ color: isBlack ? "#ccc" : "#333" }}
            >
              Multiple ways to reach us
            </p>
            <div className={s.contactBoxes}>
              {contactBox.map((item, idx) => (
                <div
                  className={s.contactBoxItem}
                  key={idx}
                  style={{
                    color: isBlack ? "#fff" : "#000",
                  }}
                >
                  <div
                    className={s.icon}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    {item.icon}
                  </div>
                  <div className={s.details}>
                    <h2
                      className={s.title}
                      style={{ color: isBlack ? "#fff" : "#000" }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={s.info}
                      style={{ color: isBlack ? "#ccc" : "#333" }}
                    >
                      {item.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.mapBusinessSection}>
            <div
              className={s.findUsBox}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              <h2
                className={s.findUsTitle}
                style={{ color: isBlack ? "#fff" : "#000" }}
              >
                Find Us
              </h2>
              <div className={s.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096933!2d144.9537353153167!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f3f3f3%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1642090000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
            </div>

            <div
              className={s.businessHoursBox}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              <h2
                className={s.businessHoursTitle}
                style={{ color: isBlack ? "#fff" : "#000" }}
              >
                Business Hours
              </h2>
              <div className={s.hoursContainer}>
                <div
                  className={s.hourRow}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  <span
                    className={s.dayLabel}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    Monday - Saturday
                  </span>
                  <span
                    className={s.timeLabel}
                    style={{ color: isBlack ? "#ccc" : "#333" }}
                  >
                    6 AM - 8 PM
                  </span>
                </div>
                <div
                  className={s.hourRow}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  <span
                    className={s.dayLabel}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    Sunday
                  </span>
                  <span
                    className={s.timeLabel}
                    style={{ color: isBlack ? "#ccc" : "#333" }}
                  >
                    Closed
                  </span>
                </div>
                <div
                  className={s.statusRow}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  <span className={s.statusDot}></span>
                  <span
                    className={s.statusText}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    Current Status: <strong>Open</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.stayConnectedSection}>
            <h2
              className={s.stayConnectedTitle}
              style={{ color: isBlack ? "#fff" : "#000" }}
            >
              Stay Connected
            </h2>
            <p
              className={s.stayConnectedDesc}
              style={{ color: isBlack ? "#ccc" : "#333" }}
            >
              Follow us for daily updates and instant support
            </p>

            <div className={s.socialBoxes}>
              <div
                className={s.socialBox}
                style={{
                  color: isBlack ? "#fff" : "#000",
                }}
              >
                <div className={s.socialHeader}>
                  <div
                    className={s.socialIcon}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    <BsInstagram />
                  </div>
                  <div className={s.socialInfo}>
                    <h3
                      className={s.socialTitle}
                      style={{ color: isBlack ? "#fff" : "#000" }}
                    >
                      Instagram
                    </h3>
                    <p
                      className={s.socialSubtitle}
                      style={{ color: isBlack ? "#ccc" : "#333" }}
                    >
                      Daily price lists & updates
                    </p>
                  </div>
                </div>
                <p
                  className={s.socialDescription}
                  style={{ color: isBlack ? "#ccc" : "#333" }}
                >
                  Follow us on Instagram for daily price lists, updates on
                  seasonal produce, special offers, and industry news.
                </p>
                <button className={s.followButton} style={{ color: "#fff" }}>
                  Follow Us
                </button>
              </div>

              <div
                className={s.socialBox}
                style={{
                  color: isBlack ? "#fff" : "#000",
                }}
              >
                <div className={s.socialHeader}>
                  <div
                    className={s.socialIcon}
                    style={{ color: isBlack ? "#fff" : "#000" }}
                  >
                    <BsWhatsapp />
                  </div>
                  <div className={s.socialInfo}>
                    <h3
                      className={s.socialTitle}
                      style={{ color: isBlack ? "#fff" : "#000" }}
                    >
                      WhatsApp Channel
                    </h3>
                    <p
                      className={s.socialSubtitle}
                      style={{ color: isBlack ? "#ccc" : "#333" }}
                    >
                      Instant support & updates
                    </p>
                  </div>
                </div>
                <p
                  className={s.socialDescription}
                  style={{ color: isBlack ? "#ccc" : "#333" }}
                >
                  Use the WhatsApp chat button on our website for instant
                  support and join our channel for real-time updates.
                </p>
                <button className={s.joinButton} style={{ color: "#fff" }}>
                  Join Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
