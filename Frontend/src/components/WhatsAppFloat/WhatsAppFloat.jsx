import React, { useContext } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import style from "./WhatsAppFloat.module.css";

const WhatsAppFloat = () => {
  const { theme } = useContext(ThemeContext);
  const isBlack = theme.text === "#fff";

  const handleWhatsAppClick = () => {
    const phoneNumber = "+971585878022";
    const message = "Hello! I want to make a purchase on your website freshberryuae.com. Please give me some details.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div 
      className={style.whatsappFloat}
      onClick={handleWhatsAppClick}
      data-theme={theme.text}
    >
      <BsWhatsapp className={style.whatsappIcon} />
    </div>
  );
};

export default WhatsAppFloat;
