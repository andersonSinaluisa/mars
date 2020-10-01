import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/" className="brand__title">
            SpaceMars.Jar
          </Link>
        </div>
        <div className="navbar__list">
          <NavLink className="list__item" to="/">
            <span className="span">Home</span>
          </NavLink>
          <NavLink className="list__item" to="/about">
            <span className="span">About</span>
          </NavLink>
          <NavLink className="list__item" to="/login">
            <span className="span">Login</span>
          </NavLink>
          <NavLink className="list__item" to="/signup">
            <span className="span">Signup</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
