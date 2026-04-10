import React, { useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { MOVIES } from '../data/movies';
import './Home.css';

const ALL_GENRES = ['All', ...new Set(MOVIES.flatMap(m => m.genre))];

export default function Home() {
  const [search,   setSearch]   = useState('');
  const [genre,    setGenre]    = useState('All');
  const [sortBy,   setSortBy]   = useState('rating');

  const filtered = useMemo(() => {
    let list = MOVIES.filter(m => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre  = genre === 'All' || m.genre.includes(genre);
      return matchSearch && matchGenre;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'rating')   return b.rating - a.rating;
      if (sortBy === 'price')    return a.price - b.price;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });

    return list;
  }, [search, genre, sortBy]);

  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">Now Showing</p>
          <h1 className="hero-title">Your Cinema,<br />Your Way.</h1>
          <p className="hero-sub">Book seats for the latest blockbusters instantly.</p>
        </div>
      </section>

      {/* Controls */}
      <section className="controls-wrap">
        <div className="controls">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className="filter-row">
            <div className="genre-filters">
              {ALL_GENRES.map(g => (
                <button
                  key={g}
                  className={`genre-btn ${genre === g ? 'active' : ''}`}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="rating">Sort: Rating</option>
              <option value="price">Sort: Price</option>
              <option value="duration">Sort: Duration</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="movies-section">
        <div className="section-header">
          <h2 className="section-title">
            {genre === 'All' ? 'All Movies' : genre}
            <span className="count">{filtered.length}</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">🎬</p>
            <p>No movies found for "{search}"</p>
            <button className="clear-link" onClick={() => { setSearch(''); setGenre('All'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
