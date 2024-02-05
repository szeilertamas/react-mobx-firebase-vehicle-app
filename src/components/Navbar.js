// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 ms-2 h2 text-light" style={{ fontSize: '1.5rem' }}>
          AutoConnect
        </Link>
        <Link to="/about" className="navbar-brand mb-0 me-4 h2 text-light" style={{ fontSize: '1.2rem' }}>
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
