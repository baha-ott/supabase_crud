import React from "react";

import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <h1>Supa Smoothies</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create">Create New Smoothie</NavLink>
    </nav>
  );
};

export default Nav;
