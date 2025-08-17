import React, { useState, useContext } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import styles from "./Qoute.module.css";

const s = styles;

const Quote = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    deliveryLocation: "",
    specialInstructions: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          phone: "",
          deliveryLocation: "",
          specialInstructions: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleWhatsAppClick = () => {
    // Handle WhatsApp contact
    window.open("https://wa.me/971585878022", "_blank");
  };

  return (
    <div
      className={s.container}
      style={{
        background: isBlack ? "#111" : "#fff",
        color: isBlack ? "#fff" : "#000",
      }}
    >
      <div className={s.paddingBox}>
        <div className={s.header}>
          <h1 className={s.title} style={{ color: isBlack ? "#fff" : "#000" }}>
            Get a Fresh Quote Today!
          </h1>
          <p
            className={s.subtitle}
            style={{ color: isBlack ? "#ccc" : "#333" }}
          >
            Planning a bulk order or need a customized supply plan? Fill out the
            form below, and our team will respond promptly with competitive
            pricing and tailored solutions.
          </p>
        </div>
        <div
          className={s.formWrapper}
          style={{
            background: isBlack ? "#111" : "#f3f4f6",
            color: isBlack ? "#fff" : "#000",
          }}
        >
          <form className={s.form} onSubmit={handleSubmit}>
            {submitStatus === "success" && (
              <div style={{ color: "green", marginBottom: 12 }}>
                Thank you! We received your quote request.
              </div>
            )}
            {submitStatus === "error" && (
              <div style={{ color: "red", marginBottom: 12 }}>
                Something went wrong. Please try again later.
              </div>
            )}
            <div className={s.formRow}>
              <div className={s.inputGroup}>
                <label
                  htmlFor="fullName"
                  className={s.label}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={s.input}
                  style={{
                    background: isBlack ? "#222" : "#fff",
                    color: isBlack ? "#fff" : "#000",
                    borderColor: isBlack ? "#333" : "#d1d5db",
                  }}
                  required
                />
              </div>
              <div className={s.inputGroup}>
                <label
                  htmlFor="businessName"
                  className={s.label}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  Business Name *
                </label>
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className={s.input}
                  style={{
                    background: isBlack ? "#222" : "#fff",
                    color: isBlack ? "#fff" : "#000",
                    borderColor: isBlack ? "#333" : "#d1d5db",
                  }}
                  required
                />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.inputGroup}>
                <label
                  htmlFor="email"
                  className={s.label}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={s.input}
                  style={{
                    background: isBlack ? "#222" : "#fff",
                    color: isBlack ? "#fff" : "#000",
                    borderColor: isBlack ? "#333" : "#d1d5db",
                  }}
                  required
                />
              </div>
              <div className={s.inputGroup}>
                <label
                  htmlFor="phone"
                  className={s.label}
                  style={{ color: isBlack ? "#fff" : "#000" }}
                >
                  Phone Number (WhatsApp Preferred)
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={s.input}
                  style={{
                    background: isBlack ? "#222" : "#fff",
                    color: isBlack ? "#fff" : "#000",
                    borderColor: isBlack ? "#333" : "#d1d5db",
                  }}
                  required
                />
              </div>
            </div>
            <div className={s.inputGroup}>
              <label
                htmlFor="deliveryLocation"
                className={s.label}
                style={{ color: isBlack ? "#fff" : "#000" }}
              >
                Delivery Location *
              </label>
              <input
                id="deliveryLocation"
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleInputChange}
                placeholder="Enter your delivery address"
                className={s.input}
                style={{
                  background: isBlack ? "#222" : "#fff",
                  color: isBlack ? "#fff" : "#000",
                  borderColor: isBlack ? "#333" : "#d1d5db",
                }}
                required
              />
            </div>
            <div className={s.inputGroup}>
              <label
                htmlFor="specialInstructions"
                className={s.label}
                style={{ color: isBlack ? "#fff" : "#000" }}
              >
                Special Instructions
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder="Please provide details about your requirements, quantities, timeline, or any special requests"
                className={s.textarea}
                style={{
                  background: isBlack ? "#222" : "#fff",
                  color: isBlack ? "#fff" : "#000",
                  borderColor: isBlack ? "#333" : "#d1d5db",
                }}
                rows="4"
              />
            </div>
            <button type="submit" className={s.submitButton}>
              <BiSend className={s.buttonIcon} />
              Submit Quote Request
            </button>
          </form>
        </div>
        <div
          className={s.divider}
          style={{
            background: isBlack ? "#111" : "#f3f4f6",
            color: isBlack ? "#fff" : "#000",
          }}
        >
          <p
            className={s.alternativeText}
            style={{ color: isBlack ? "#ccc" : "#333" }}
          >
            We pride ourselves on quick responses and flexible terms. Prefer a
            faster reply? Contact us directly via WhatsApp
          </p>
          <button className={s.whatsappButton} onClick={handleWhatsAppClick}>
            <BsWhatsapp className={s.buttonIcon} />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
