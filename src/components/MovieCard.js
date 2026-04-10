import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <button className="book-now-btn">Book Now</button>
        </div>
        <div className="movie-rating">
          <span className="star">★</span> {movie.rating}
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-duration">{movie.duration}</span>
          <span className="dot">·</span>
          <span className="movie-lang">{movie.language}</span>
        </div>
        <div className="movie-genres">
          {movie.genre.map(g => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
        <div className="movie-price">₹{movie.price} onwards</div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id:       PropTypes.number.isRequired,
    title:    PropTypes.string.isRequired,
    genre:    PropTypes.arrayOf(PropTypes.string).isRequired,
    rating:   PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    poster:   PropTypes.string.isRequired,
    price:    PropTypes.number.isRequired,
  }).isRequired,
};
