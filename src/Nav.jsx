import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <h1>Supa Smoothies</h1>
      <Link to="/">Home</Link>
      <Link to="/create">Create New Smoothie</Link>
    </nav>
  );
};

export default Nav;
