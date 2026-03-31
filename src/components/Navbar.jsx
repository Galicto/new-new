import React from 'react';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <a href="#" className="nav-logo-link" aria-label="PredX Alpha home">
          <div className="logo-block">
            <svg className="logo-3d-svg" viewBox="0 0 64 64">
              <path className="logo-3d-path-solid" d="M32 6 L56 20 L56 48 L32 62 L8 48 L8 20 Z" />
              <path className="logo-3d-path-dim" d="M8 20 L32 34 L56 20 M32 34 L32 62" />
              <path d="M22 27 L42 41 M42 27 L22 41" stroke="var(--blue)" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            <div className="logo-text-stack">
              <div className="logo-px">PRED<span className="logo-x">X</span></div>
              <div className="logo-alpha">ALPHA</div>
            </div>
          </div>
        </a>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
}
