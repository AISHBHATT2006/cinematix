import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Confirmation.css';

export default function Confirmation() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const ticketRef  = useRef(null);
  const booking    = state?.booking;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!booking) navigate('/');
  }, [booking, navigate]);

  if (!booking) return null;

  const convFee = booking.seats.length * 30;
  const grandTotal = booking.total + convFee;

  return (
    <div className="confirm-page page-enter">
      <div className="confirm-container">

        {/* Success header */}
        <div className="success-header">
          <div className="checkmark">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" className="circle-anim"/>
              <path d="M14 26 L22 34 L38 18" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" className="check-anim"/>
            </svg>
          </div>
          <h1 className="success-title">Booking Confirmed!</h1>
          <p className="success-sub">Your tickets have been booked successfully.</p>
        </div>

        {/* Ticket */}
        <div className="ticket" ref={ticketRef}>
          <div className="ticket-top">
            <div className="ticket-logo">CINEMATIX</div>
            <div className="ticket-id">{booking.id}</div>
          </div>

          <div className="ticket-movie">
            <img src={booking.moviePoster} alt={booking.movieTitle} className="ticket-poster" />
            <div>
              <h2 className="ticket-title">{booking.movieTitle}</h2>
              <div className="ticket-detail-row">
                <span className="ticket-label">Date</span>
                <span className="ticket-value">{booking.date}</span>
              </div>
              <div className="ticket-detail-row">
                <span className="ticket-label">Time</span>
                <span className="ticket-value">{booking.time}</span>
              </div>
              <div className="ticket-detail-row">
                <span className="ticket-label">Seats</span>
                <span className="ticket-value seats-list">{booking.seats.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="perforation">
            <div className="perf-circle left" />
            <div className="perf-line" />
            <div className="perf-circle right" />
          </div>

          <div className="ticket-bottom">
            <div className="price-block">
              <span className="price-label">Tickets</span>
              <span className="price-val">₹{booking.total}</span>
            </div>
            <div className="price-block">
              <span className="price-label">Conv. fee</span>
              <span className="price-val">₹{convFee}</span>
            </div>
            <div className="price-block total-block">
              <span className="price-label">Total Paid</span>
              <span className="price-val accent">₹{grandTotal}</span>
            </div>
            <div className="barcode">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="bar" style={{ height: `${20 + Math.sin(i * 1.7) * 12}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-actions">
          <Link to="/my-bookings" className="view-bookings-btn">View All Bookings</Link>
          <Link to="/" className="book-more-btn">Book More Tickets</Link>
        </div>

      </div>
    </div>
  );
}
