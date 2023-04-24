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
      <div className="hamburger-menu" onClick={handleMenuClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`dropdown-container ${menuOpen ? "open" : ""}`}>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#github">GitHub</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
