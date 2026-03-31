import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      glowRef.current.style.left = `${clientX}px`;
      glowRef.current.style.top = `${clientY}px`;
      glowRef.current.style.transform = `translate(-50%, -50%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero" aria-label="Hero — What is PredX Alpha">
      <div className="hero-glow" ref={glowRef}></div>
      <div className="hero-content">
        <h1>Trade the Future Before It Happens.</h1>
        <p className="hero-sub">
          Where markets price reality. Every position lives on-chain. <br/>
          PredX Alpha is the institutional-grade prediction protocol built on Algorand.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Start Trading
          </button>
          <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', boxShadow: 'none' }}>
            Explore Markets
          </button>
        </div>
      </div>
    </section>
  );
}
