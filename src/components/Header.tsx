import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          FitKick
        </Link>
        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link to="/workouts" onClick={() => setIsMenuOpen(false)}>Workouts</Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/dashboard" className="dashboard-link" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 