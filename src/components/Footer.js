import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">CINEMATIX</span>
          <p className="footer-tagline">Your world. Your cinema.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Movies</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Cinematix. Built with React.</p>
      </div>
    </footer>
  );
}
