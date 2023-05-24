import React from "react";

import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <h1>Supa Smoothies</h1>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active__link" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? "active__link" : "")}
      >
        Create New Smoothie
      </NavLink>
    </nav>
  );
};

export default Nav;
