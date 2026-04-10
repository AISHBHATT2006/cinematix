import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import './Navbar.css';

// Class-based component to demonstrate constructors
class NavLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { glitch: false };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ glitch: true });
      setTimeout(() => this.setState({ glitch: false }), 200);
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Link to="/" className={`logo ${this.state.glitch ? 'glitch' : ''}`}>
        CINEMATIX
      </Link>
    );
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { bookings } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Movies' },
    { to: '/my-bookings', label: 'My Bookings' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavLogo />

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
            {link.to === '/my-bookings' && bookings.length > 0 && (
              <span className="badge">{bookings.length}</span>
            )}
          </Link>
        ))}
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
