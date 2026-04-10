import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOVIES, SHOWTIMES } from '../data/movies';
import './MovieDetail.css';

export default function MovieDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const movie      = MOVIES.find(m => m.id === Number(id));

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!movie) {
    return (
      <div className="not-found">
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/')}>← Back to movies</button>
      </div>
    );
  }

  const handleProceed = () => {
    if (!selectedTime) return;
    const dateObj = dates[selectedDate];
    navigate(`/booking/${movie.id}`, {
      state: {
        movie,
        date: dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        time: selectedTime,
      },
    });
  };

  return (
    <div className="detail-page page-enter">
      {/* Backdrop */}
      <div className="backdrop" style={{ backgroundImage: `url(${movie.backdrop})` }}>
        <div className="backdrop-overlay" />
      </div>

      <div className="detail-container">
        {/* Back */}
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-main">
          {/* Poster */}
          <div className="detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-genres">
              {movie.genre.map(g => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>

            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              <span className="rating-badge">★ {movie.rating}</span>
              <span>{movie.duration}</span>
              <span>{movie.language}</span>
            </div>

            <p className="detail-desc">{movie.description}</p>

            <div className="detail-credits">
              <div>
                <span className="credit-label">Director</span>
                <span className="credit-value">{movie.director}</span>
              </div>
              <div>
                <span className="credit-label">Cast</span>
                <span className="credit-value">{movie.cast.join(', ')}</span>
              </div>
            </div>

            {/* Date Picker */}
            <div className="picker-section">
              <h3 className="picker-label">Select Date</h3>
              <div className="date-picker">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    className={`date-btn ${selectedDate === i ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                  >
                    <span className="date-day">
                      {i === 0 ? 'Today' : d.toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                    <span className="date-num">{d.getDate()}</span>
                    <span className="date-month">{d.toLocaleDateString('en', { month: 'short' })}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showtime Picker */}
            <div className="picker-section">
              <h3 className="picker-label">Select Showtime</h3>
              <div className="time-picker">
                {SHOWTIMES.map(t => (
                  <button
                    key={t}
                    className={`time-btn ${selectedTime === t ? 'active' : ''}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`proceed-btn ${selectedTime ? 'enabled' : ''}`}
              disabled={!selectedTime}
              onClick={handleProceed}
            >
              {selectedTime ? `Book Seats — ₹${movie.price} onwards` : 'Select a showtime to continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
