import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OracleSphere, YieldToken, LiquidityTorus } from './ThreeElements';

const FEATURE_DATA = [
  {
    title: '100% On-Chain Execution',
    description: 'Zero counterparty risk. Fully collateralized via smart contracts.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Sub-Second Finality',
    description: 'Instant settlement natively powered by Algorand’s PPoS consensus.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Deep Liquidity pools',
    description: 'Automated Market Maker (AMM) integrated. Zero slippage.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    title: 'Oracle Precision',
    description: 'Verified decentralized data feeds. Absolute outcome accuracy.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Permissionless Trading',
    description: 'No KYC, no regional blocks. Trade on geopolitical or financial events globally.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    )
  },
  {
    title: 'Dynamic Yield Farming',
    description: 'Stake tokens. Earn platform fees. Govern the ecosystem natively.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: 18, height: 18}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
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
                {feature.title === 'Oracle Precision' && (
                  <div style={{ width: 60, height: 60, marginTop: -10, marginRight: -10 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <OracleSphere />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Dynamic Yield Farming' && (
                  <div style={{ width: 60, height: 60, marginTop: -10, marginRight: -10 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <YieldToken />
                    </Canvas>
                  </div>
                )}
                {feature.title === 'Deep Liquidity pools' && (
                  <div style={{ width: 60, height: 60, marginTop: -10, marginRight: -10 }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[10, 10, 10]} intensity={2} />
                      <LiquidityTorus />
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
