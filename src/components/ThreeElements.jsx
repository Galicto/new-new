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

// 5. Liquidity Torus
export function LiquidityTorus() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.3, 16, 50]} />
      <meshStandardMaterial color="#06B6D4" wireframe />
    </mesh>
  );
}
