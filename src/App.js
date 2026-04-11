import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import Home         from './pages/Home';
import MovieDetail  from './pages/MovieDetail';
import BookingPage  from './pages/BookingPage';
import Confirmation from './pages/Confirmation';
import MyBookings   from './pages/MyBookings';
import NotFound     from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/movie/:id"    element={<MovieDetail />} />
          <Route path="/booking/:id"  element={<BookingPage />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/my-bookings"  element={<MyBookings />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
        <Footer />
      </BookingProvider>
    </HashRouter>
  );
}