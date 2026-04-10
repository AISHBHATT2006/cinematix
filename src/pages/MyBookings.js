import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import './MyBookings.css';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBooking();
  const [cancelling, setCancelling] = useState(null);

  const handleCancel = (id) => {
    setCancelling(id);
    setTimeout(() => {
      cancelBooking(id);
      setCancelling(null);
    }, 600);
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="mybookings-page page-enter">
      <div className="mybookings-container">
        <div className="mybookings-header">
          <h1 className="mybookings-title">My Bookings</h1>
          <p className="mybookings-sub">
            {bookings.length > 0
              ? `${bookings.length} booking${bookings.length > 1 ? 's' : ''} found`
              : 'No bookings yet'}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-icon">🎟️</div>
            <h3>No tickets yet</h3>
            <p>Book your first movie experience today.</p>
            <Link to="/" className="explore-btn">Explore Movies</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {[...bookings].reverse().map(booking => {
              const convFee = booking.seats.length * 30;
              const grandTotal = booking.total + convFee;
              const isCancelling = cancelling === booking.id;

              return (
                <div key={booking.id} className={`booking-card ${isCancelling ? 'cancelling' : ''}`}>
                  <div className="booking-card-left">
                    <img src={booking.moviePoster} alt={booking.movieTitle} />
                  </div>

                  <div className="booking-card-body">
                    <div className="booking-card-top">
                      <div>
                        <h3 className="booking-movie-name">{booking.movieTitle}</h3>
                        <p className="booking-booked-at">Booked on {formatDate(booking.bookedAt)}</p>
                      </div>
                      <div className="booking-id-badge">{booking.id}</div>
                    </div>

                    <div className="booking-details-grid">
                      <div className="bd-item">
                        <span className="bd-label">Date</span>
                        <span className="bd-val">{booking.date}</span>
                      </div>
                      <div className="bd-item">
                        <span className="bd-label">Showtime</span>
                        <span className="bd-val">{booking.time}</span>
                      </div>
                      <div className="bd-item">
                        <span className="bd-label">Seats</span>
                        <span className="bd-val seats">{booking.seats.join(' · ')}</span>
                      </div>
                      <div className="bd-item">
                        <span className="bd-label">Total Paid</span>
                        <span className="bd-val price">₹{grandTotal}</span>
                      </div>
                    </div>

                    <div className="booking-card-footer">
                      <div className="seat-chips">
                        {booking.seats.map(s => (
                          <span key={s} className="s-chip">{s}</span>
                        ))}
                      </div>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(booking.id)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
