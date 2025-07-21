// NavBar.js
import React from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { BsSearch, BsSun } from "react-icons/bs";

const s = style;

const NavBar = () => {
  return (
    <div className={s.navBar}>
      <div className={s.logo}>
        <img src={logo} alt="Fresh Berry Logo" />
      </div>

      <div className={s.searchWrapper}>
        <input type="text" placeholder="Type to search" />
        <button><BsSearch /></button>
      </div>

      <div className={s.btns}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/horeca-supply">HoReCa Supply</NavLink>
        <NavLink to="/quote">Request a Quote</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>

    <div className={s.con}>

      <div className={s.toggle}>
        <BsSun />
      </div>

      <div className={s.contact}>
        <button>
          <FiPhoneCall /> Contact Us
        </button>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
