import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import style from './Footer.module.css';
import logo from '../../assets/logo.jpg';
import { ThemeContext } from '../../context/Theme/ThemeContext';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={style.footer} data-theme={theme.text}>
      <div className={style.leftSection}>
        <div className={style.logoRow}>
          <img 
            src={theme.text === "#fff" ? logoblack : logo} 
            alt="Fresh Berry Logo" 
            className={style.logo} 
          />
        </div>
        <div className={style.companyName}>Fresh Berry Foodstuff Trading LLC | Dubai, UAE</div>
        <div className={style.licensingRow}>
          <span>Dubai Municipality Licensed</span>
          <span className={style.dot}>•</span>
          <span>HACCP Compliant</span>
        </div>
        <div className={style.socialRow}>
          <span>Follow Us:</span>
          <a href="#" className={style.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className={style.socialIcon} aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className={style.socialIcon} aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>
      <div className={style.rightSection}>
        <div className={style.linksRow}>
          <NavLink to="/" className={style.link}>Home</NavLink> |
          <NavLink to="/about" className={style.link}>About Us</NavLink> |
          <NavLink to="/products" className={style.link}>Products</NavLink> |
          <NavLink to="/horeca-supply" className={style.link}>HoReCa Supply</NavLink> |
          <NavLink to="/qoute" className={style.link}>Quote</NavLink> |
          <NavLink to="/contact" className={style.link}>Contact</NavLink> |
          <NavLink to="/terms" className={style.link}>Terms & Conditions</NavLink> |
          <NavLink to="/privacy" className={style.link}>Privacy Policy</NavLink> |
          <NavLink to="/sitemap" className={style.link}>Sitemap</NavLink>
        </div>
        <div className={style.copyright}>
          © 2025 Fresh Berry Foodstuff Trading LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
