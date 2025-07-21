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
        <NavLink to="/">Products</NavLink>
        <NavLink to="/">HoReCA Supply</NavLink>
        <NavLink to="/">Request Qoute</NavLink>
        <NavLink to="/">About Us</NavLink>
      </div>
      <div className={s.contact}></div>
    </div>
  );
};

export default NavBar;
