import React, { useContext, useState } from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { BsSearch, BsSun, BsMoon } from "react-icons/bs";
import { ThemeContext } from "../../context/Theme/ThemeContext";

const s = style;

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={s.navBar} data-theme={theme}>
      <NavLink to="/" className={s.logo} onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="Fresh Berry Logo" />
      </NavLink>

      <div className={s.searchWrapper}>
        <input type="text" placeholder="Type to search" />
        <button>
          <BsSearch />
        </button>
      </div>

      <div className={`${s.btns} ${menuOpen ? s.open : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)}>
          Products
        </NavLink>
        <NavLink to="/horeca-supply" onClick={() => setMenuOpen(false)}>
          HoReCa Supply
        </NavLink>
        <NavLink to="/qoute" onClick={() => setMenuOpen(false)}>
          Request a Quote
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </NavLink>
          {/* <NavLink to="/admin/login" onClick={() => setMenuOpen(false)}>
          Admin
        </NavLink> */}
        <NavLink
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className={s.mobileContact}
        >
          Contact Us
        </NavLink>
      </div>

      <div className={s.con}>
        <div
          className={s.toggle}
          onClick={toggleTheme}
          title={
            theme.text === "#fff"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {theme.text === "#fff" ? <BsMoon /> : <BsSun />}
        </div>

        <div className={s.contact}>
          <NavLink to="/contact" className={s.contactbtn}>
            <FiPhoneCall /> Contact Us
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className={s.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
