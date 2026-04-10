import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import { SEATS } from '../data/movies';
import { useBooking } from '../context/BookingContext';
import './BookingPage.css';

// Simulate some pre-booked seats
const PRE_BOOKED = ['A3','A7','B2','B8','C5','D1','D9','E4','E6','F3','F7','G2','H5','H8'];

export default function BookingPage() {
  const { id }       = useParams();
  const { state }    = useLocation();
  const navigate     = useNavigate();
  const { confirmBooking } = useBooking();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});
  const [step, setStep] = useState(1); // 1: seat selection, 2: summary

  const movie = state?.movie;
  const date  = state?.date;
  const time  = state?.time;

  const handleToggle = useCallback((seat, price) => {
    setSelectedSeats(prev => {
      const exists = prev.includes(seat.id);
      if (exists) {
        setSelectedPrices(p => { const n={...p}; delete n[seat.id]; return n; });
        return prev.filter(s => s !== seat.id);
      } else {
        if (prev.length >= 8) return prev; // max 8 seats
        setSelectedPrices(p => ({ ...p, [seat.id]: price }));
        return [...prev, seat.id];
      }
    });
  }, []);

  const totalAmount = useMemo(
    () => Object.values(selectedPrices).reduce((sum, p) => sum + p, 0),
    [selectedPrices]
  );

  const handleConfirm = () => {
    const booking = {
      id: `BK${Date.now()}`,
      movieId: Number(id),
      movieTitle: movie.title,
      moviePoster: movie.poster,
      date,
      time,
      seats: selectedSeats,
      total: totalAmount,
      bookedAt: new Date().toISOString(),
    };
    confirmBooking(booking);
    navigate('/confirmation', { state: { booking } });
  };

  if (!movie) {
    return (
      <div className="no-state">
        <p>No booking data. Please start from the movie page.</p>
        <button onClick={() => navigate('/')}>Go to movies</button>
      </div>
    );
  }

  return (
    <div className="booking-page page-enter">
      <div className="booking-container">

        {/* Progress */}
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'done' : ''}`}>
            <span>1</span> Select Seats
          </div>
          <div className="progress-line" />
          <div className={`progress-step ${step >= 2 ? 'done' : ''}`}>
            <span>2</span> Confirm
          </div>
        </div>

        {step === 1 && (
          <div className="step-1">
            {/* Movie summary bar */}
            <div className="booking-header">
              <img src={movie.poster} alt={movie.title} className="booking-thumb" />
              <div>
                <h2 className="booking-movie">{movie.title}</h2>
                <div className="booking-sub">
                  <span>{date}</span>
                  <span className="sep">·</span>
                  <span>{time}</span>
                </div>
              </div>
            </div>

            <SeatMap
              seats={SEATS}
              selectedSeats={selectedSeats}
              bookedSeats={PRE_BOOKED}
              onToggle={handleToggle}
              basePrice={movie.price}
            />

            {/* Footer */}
            <div className="booking-footer">
              <div className="selection-info">
                {selectedSeats.length === 0 ? (
                  <span className="hint">Select up to 8 seats</span>
                ) : (
                  <>
                    <div className="selected-chips">
                      {selectedSeats.map(s => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                    <span className="total-amount">₹{totalAmount}</span>
                  </>
                )}
              </div>
              <button
                className={`next-btn ${selectedSeats.length > 0 ? 'enabled' : ''}`}
                disabled={selectedSeats.length === 0}
                onClick={() => setStep(2)}
              >
                Proceed to Confirm →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <h2 className="summary-title">Booking Summary</h2>
            <div className="summary-card">
              <div className="summary-movie">
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{date} · {time}</p>
                </div>
              </div>

              <hr className="divider" />

              <div className="summary-row">
                <span>Seats</span>
                <span>{selectedSeats.join(', ')}</span>
              </div>
              <div className="summary-row">
                <span>Count</span>
                <span>{selectedSeats.length} ticket{selectedSeats.length > 1 ? 's' : ''}</span>
              </div>
              <div className="summary-row">
                <span>Convenience Fee</span>
                <span>₹{selectedSeats.length * 30}</span>
              </div>

              <hr className="divider" />

              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalAmount + selectedSeats.length * 30}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button className="back-step-btn" onClick={() => setStep(1)}>← Change Seats</button>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
