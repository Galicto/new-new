import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import './index.css';

function App() {
  // Use light mode if that is what "react plus white" implies, else default to dark.
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Prefer user stored theme, fallback to light mode since "white" was explicitly requested
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('light-mode');
  };

  return (
    <div className="wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
