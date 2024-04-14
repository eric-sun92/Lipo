import React from 'react';
import './Navbar.css'; // Assuming you'll create a separate CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="logo" style={{fontFamily: "ITC", textDecoration: "none"}}>Chandra Lab Logo</a>
      <ul className="nav-links">
        <li><a href="/heatmap">Heatmap</a></li>
        <li><a href="/fullheatmap">Tab 2</a></li>
        <li><a href="/coronal">Coronal</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
