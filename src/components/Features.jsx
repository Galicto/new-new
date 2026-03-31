import React from 'react';
import { Canvas } from '@react-three/fiber';
import { SecureCube, WalletBox, ChartBars, AiBrain, AlgoStake, OracleNetwork } from './ThreeElements';

const FEATURE_DATA = [
  {
    title: 'Trustless Smart Contracts',
    description: 'Bets locked on-chain. Zero middlemen. Automatic, verifiable settlement.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: 'Pera Wallet Integration',
    description: 'Sign directly from phone. Private keys never leave your device.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Real ALGO Staking',
    description: 'Stake testnet ALGO. Winnings calculated proportionally and paid instantly.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Multi-Source Oracles',
    description: 'Live BTC & ALGO feeds. Real-world resolution via decentralized data.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: 'Live Market Screener',
    description: 'Real-time YES/NO probabilities. Volume, sentiment, and AI confidence scores.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )
  },
  {
    title: 'AI-Powered Analysis',
    description: 'Sentiment scoring and confidence ratings. Evaluate probability with AI edge.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features-inner">
        <div className="features-grid">
          {FEATURE_DATA.map((feature, idx) => (
            <div className="feature-card" key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="feat-icon-sm">{feature.icon}</div>
                {/* Render 3D component conditionally based on title */}
                {feature.title === 'Trustless Smart Contracts' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <SecureCube />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Pera Wallet Integration' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <WalletBox />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Real ALGO Staking' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <AlgoStake />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Multi-Source Oracles' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <OracleNetwork />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Live Market Screener' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <ChartBars />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'AI-Powered Analysis' && (
                  <div style={{ width: 100, height: 100, marginTop: -20, marginRight: -20 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <AiBrain />
                    </Canvas>
                  </div>
                )}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
