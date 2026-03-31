import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// 1. Interactive Background (Particles)
export function ParticleBackground() {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 10 }), []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#3B82F6" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

// 2. Hero Interactive Node
export function HeroNode() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#3B82F6" wireframe opacity={0.4} transparent />
      </mesh>
    </Float>
  );
}

// 3. Oracle Sphere
export function OracleSphere() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    ref.current.rotation.y += 0.02;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2563EB" roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

// 4. Yield Token (Coin)
export function YieldToken() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.2} />
      </mesh>
    </Float>
  );
}

// 5. Secure Cube (Smart Contracts)
export function SecureCube() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#8B5CF6" roughness={0.2} metalness={0.6} wireframe />
    </mesh>
  );
}

// 6. Wallet Box (Pera Wallet Integration)
export function WalletBox() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={ref}>
        <boxGeometry args={[1.4, 0.8, 0.2]} />
        <meshStandardMaterial color="#10B981" roughness={0.3} metalness={0.5} />
      </mesh>
    </Float>
  );
}

// 7. Chart Bars (Market Screener)
export function ChartBars() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh position={[-0.6, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#F43F5E" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>
      <mesh position={[0.6, 0.8, 0]}>
        <boxGeometry args={[0.3, 1.6, 0.3]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

// 8. AI Brain 
export function AiBrain() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
  });
  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color="#A855F7" wireframe />
    </mesh>
  );
}

// 9. Algo Stake
export function AlgoStake() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref}>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#00FFA3" metalness={0.8} roughness={0.1} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.3, 0.03, 16, 50]} />
          <meshStandardMaterial color="#EAB308" wireframe />
        </mesh>
      </group>
    </Float>
  );
}

// 10. Oracle Network
export function OracleNetwork() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
    ref.current.rotation.x -= delta * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#2563EB" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#3B82F6" wireframe opacity={0.5} transparent />
        </mesh>
      </group>
    </Float>
  );
}
