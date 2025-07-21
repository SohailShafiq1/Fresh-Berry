import React from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
const s = style;
const NavBar = () => {
  return (
    <div className={s.navBar}>
      <div className={s.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={s.search}>
        <input type="text" placeholder="Type here" />
      </div>
      <div className={s.btn}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/horeca-supply">HoReCA Supply</NavLink>
        <NavLink to="/qoute">Request Qoute</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>
      <div className={s.contact}></div>
    </div>
  );
};

export default NavBar;
