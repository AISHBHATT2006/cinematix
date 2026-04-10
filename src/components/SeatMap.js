import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './SeatMap.css';

const PRICE_MAP = { premium: 1.5, standard: 1, economy: 0.75 };

export default function SeatMap({ seats, selectedSeats, bookedSeats, onToggle, basePrice }) {
  const rows = useMemo(() => {
    const map = {};
    seats.forEach(seat => {
      if (!map[seat.row]) map[seat.row] = [];
      map[seat.row].push(seat);
    });
    return map;
  }, [seats]);

  const getStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatPrice = (type) => Math.round(basePrice * PRICE_MAP[type]);

  return (
    <div className="seatmap-wrap">
      {/* Screen */}
      <div className="screen-wrap">
        <div className="screen" />
        <p className="screen-label">SCREEN</p>
      </div>

      {/* Legend */}
      <div className="legend">
        {['available','selected','booked'].map(s => (
          <div key={s} className="legend-item">
            <div className={`legend-dot ${s}`} />
            <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
          </div>
        ))}
        <div className="legend-item">
          <div className="legend-dot premium-dot" />
          <span>Premium (+50%)</span>
        </div>
      </div>

      {/* Rows */}
      <div className="rows">
        {Object.entries(rows).map(([rowKey, rowSeats]) => (
          <div key={rowKey} className="seat-row">
            <span className="row-label">{rowKey}</span>
            <div className="seats">
              {rowSeats.map(seat => {
                const status = getStatus(seat.id);
                return (
                  <button
                    key={seat.id}
                    className={`seat ${seat.type} ${status}`}
                    disabled={status === 'booked'}
                    onClick={() => status !== 'booked' && onToggle(seat, getSeatPrice(seat.type))}
                    title={`${seat.id} — ₹${getSeatPrice(seat.type)}`}
                    aria-label={`Seat ${seat.id}, ${seat.type}, ${status}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Price legend */}
      <div className="type-legend">
        {['premium','standard','economy'].map(t => (
          <div key={t} className={`type-item ${t}`}>
            <div className={`type-dot ${t}`} />
            <span>{t.charAt(0).toUpperCase()+t.slice(1)} — ₹{getSeatPrice(t)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

SeatMap.propTypes = {
  seats:         PropTypes.array.isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  bookedSeats:   PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle:      PropTypes.func.isRequired,
  basePrice:     PropTypes.number.isRequired,
};
