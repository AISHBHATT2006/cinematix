import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext(null);

const initialState = {
  bookings: JSON.parse(localStorage.getItem('cinematix_bookings') || '[]'),
  currentBooking: null,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'START_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'CONFIRM_BOOKING': {
      const bookings = [...state.bookings, action.payload];
      localStorage.setItem('cinematix_bookings', JSON.stringify(bookings));
      return { ...state, bookings, currentBooking: null };
    }
    case 'CANCEL_BOOKING': {
      const bookings = state.bookings.filter(b => b.id !== action.payload);
      localStorage.setItem('cinematix_bookings', JSON.stringify(bookings));
      return { ...state, bookings };
    }
    case 'CLEAR_CURRENT':
      return { ...state, currentBooking: null };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const startBooking  = (data) => dispatch({ type: 'START_BOOKING', payload: data });
  const confirmBooking = (data) => dispatch({ type: 'CONFIRM_BOOKING', payload: data });
  const cancelBooking  = (id)   => dispatch({ type: 'CANCEL_BOOKING', payload: id });
  const clearCurrent   = ()     => dispatch({ type: 'CLEAR_CURRENT' });

  return (
    <BookingContext.Provider value={{ ...state, startBooking, confirmBooking, cancelBooking, clearCurrent }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
