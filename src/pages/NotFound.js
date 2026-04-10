import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem',
      fontFamily: 'var(--font-body)', color: 'var(--text)', textAlign: 'center', padding: '2rem'
    }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,20vw,10rem)', lineHeight:1, color:'var(--border)' }}>404</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing:'0.05em' }}>Page Not Found</h2>
      <p style={{ color: 'var(--muted)', maxWidth: '300px' }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{
        marginTop: '0.5rem', padding: '0.75rem 2rem',
        background: 'var(--accent)', color: 'var(--bg)',
        borderRadius: '10px', fontFamily: 'var(--font-display)',
        fontSize: '1rem', letterSpacing: '0.08em'
      }}>Back to Movies</Link>
    </div>
  );
}
