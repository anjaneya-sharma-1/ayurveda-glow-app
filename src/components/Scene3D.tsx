import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { HumanBody3D } from "./HumanBody3D";

export function Scene3D() {
  return (
    <div className="w-full h-full min-h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Environment lighting */}
          <Environment preset="soft" />

          {/* 3D Human Body Model */}
          <HumanBody3D />

          {/* Controls for user interaction (optional - can be removed for auto-rotation only) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-green-600 opacity-50">
          {/* Loading placeholder - will be hidden once 3D model loads */}
        </div>
      </div>
    </div>
  );
}
