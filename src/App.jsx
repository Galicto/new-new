import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Basic theme persistence mock
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
    if (currentTheme === 'light') document.body.classList.add('light-mode');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('light-mode');
  };

  return (
    <div className="wrapper">
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="PredX Alpha home">
            <div className="logo-block">
              <svg className="logo-3d-svg" viewBox="0 0 64 64">
                 <path className="logo-3d-path-solid" d="M32 6 L56 20 L56 48 L32 62 L8 48 L8 20 Z" />
                 <path className="logo-3d-path-dim" d="M8 20 L32 34 L56 20 M32 34 L32 62" />
                 <path d="M22 27 L42 41 M42 27 L22 41" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
              <div className="logo-text-stack">
                <div className="logo-px">PRED<span className="logo-x">X</span></div>
                <div className="logo-alpha">ALPHA</div>
              </div>
            </div>
          </a>
          <div className="nav-wallet-wrap">
            <button className="btn-nav" id="themeToggleBtn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="btn-primary">Connect Wallet</button>
          </div>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <h1>PredX Alpha — Trade the Future Before It Happens.</h1>
          <p>Decentralized prediction markets on Algorand.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
