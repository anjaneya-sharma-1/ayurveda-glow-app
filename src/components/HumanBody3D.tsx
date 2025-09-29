import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HumanBody3D() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the model continuously
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Placeholder 3D human body - you can replace this with your actual model */}
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#10b981"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* Additional elements to represent body parts - placeholder */}
      <Sphere args={[0.8, 16, 16]} position={[0, 1.5, 0]}>
        <MeshDistortMaterial
          color="#059669"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.3}
        />
      </Sphere>

      <Sphere args={[0.6, 16, 16]} position={[0, -1.5, 0]}>
        <MeshDistortMaterial
          color="#047857"
          attach="material"
          distort={0.1}
          speed={1}
          roughness={0.5}
        />
      </Sphere>

      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  );
}

// Instructions for replacing with actual 3D model:
/*
To replace this placeholder with your actual 3D human body model:

1. Add your 3D model file (e.g., .glb, .gltf, .fbx) to the public folder
2. Replace the placeholder spheres with:

import { useGLTF } from '@react-three/drei';

export function HumanBody3D() {
  const { scene } = useGLTF('/path-to-your-model.glb');
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={[1, 1, 1]} 
      position={[0, 0, 0]} 
    />
  );
}

3. Make sure to preload your model:
useGLTF.preload('/path-to-your-model.glb');
*/
