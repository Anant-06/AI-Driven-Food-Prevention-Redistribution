"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RescueGlobe() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (ring.current) ring.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });
  return <group ref={group}>
    <mesh><icosahedronGeometry args={[1.28, 3]} /><meshStandardMaterial color="#c5df9a" transparent opacity={0.68} roughness={0.4} metalness={0.12} wireframe /></mesh>
    <mesh scale={0.91}><icosahedronGeometry args={[1.28, 2]} /><meshStandardMaterial color="#9cbd70" roughness={0.7} metalness={0.05} transparent opacity={0.16} /></mesh>
    <mesh ref={ring} rotation={[1.1, 0.35, 0]}><torusGeometry args={[1.67, 0.009, 8, 160]} /><meshBasicMaterial color="#d7ef9d" transparent opacity={0.68} /></mesh>
    {[[1.3,0.22,0.45],[-0.95,0.78,0.12],[0.15,-1.19,0.5]].map((p, i) => <Float key={i} speed={1.1 + i * .3} floatIntensity={.2}><mesh position={p as [number,number,number]}><sphereGeometry args={[.075, 16, 16]} /><meshBasicMaterial color={i === 1 ? "#f7f3e8" : "#d7ef9d"} /></mesh></Float>)}
  </group>;
}

export default function FoodOrbit() {
  return <div className="orbit-canvas" aria-label="Animated 3D visualization of a connected food rescue network" role="img"><Canvas camera={{ position: [0, 0, 4.7], fov: 42 }} dpr={[1, 1.6]}><ambientLight intensity={1.6} /><pointLight position={[4, 3, 4]} intensity={22} color="#e3f3bb" /><RescueGlobe /><Sparkles count={70} scale={4.2} size={1.8} speed={0.24} color="#d7ef9d" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} /></Canvas></div>;
}
