import React, { useState } from "react";
import "./Header.css";
import logo from "/sync.svg"; // Import your logo here

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
