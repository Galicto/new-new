import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="nav-logo-link" style={{ textAlign: 'center' }}>
          <div className="logo-block" style={{ justifyContent: 'center' }}>
            <svg className="logo-3d-svg" viewBox="0 0 64 64" style={{ width: 44, height: 44 }}>
              <path className="logo-3d-path-solid" d="M32 6 L56 20 L56 48 L32 62 L8 48 L8 20 Z" />
              <path className="logo-3d-path-dim" d="M8 20 L32 34 L56 20 M32 34 L32 62" />
              <path d="M22 27 L42 41 M42 27 L22 41" stroke="var(--blue)" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            <div className="logo-text-stack" style={{ textAlign: 'left' }}>
              <div className="logo-px" style={{ fontSize: 28 }}>PRED<span className="logo-x">X</span></div>
              <div className="logo-alpha" style={{ fontSize: 13 }}>ALPHA</div>
            </div>
          </div>
          <p style={{ marginTop: 12, color: 'var(--text-muted)' }}>Decentralized prediction markets on Algorand</p>
        </div>
        <p className="footer-copyright">© 2026 PredX Alpha. All rights reserved.</p>
      </div>
    </footer>
  );
}
