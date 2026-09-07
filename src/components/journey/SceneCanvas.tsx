import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PropertyScene } from "./PropertyScene";
import { CameraController } from "./CameraController";
import type { CameraWaypoint } from "./journeyData";

interface SceneCanvasProps {
  progressRef: React.MutableRefObject<number>;
  onWaypointChange: (waypoint: CameraWaypoint) => void;
  onWebGLFail: () => void;
  onSceneReady?: () => void;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  progressRef,
  onWaypointChange,
  onWebGLFail,
  onSceneReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeWaypointMarkerRef = useRef<string>("");

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Verify WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch {
      onWebGLFail();
      return;
    }

    // Set clamped device pixel ratio to preserve performance on high-DPI screens
    const maxDpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(maxDpr);

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;
    renderer.setSize(width, height);

    // 2. Initialize Camera and Controller
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    const cameraController = new CameraController();

    // 3. Initialize Architectural Scene
    const propertyScene = new PropertyScene();

    // Notify parent of successful initialization
    if (onSceneReady) {
      onSceneReady();
    }

    // 4. Resize listener
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 5. High-performance RAF animation loop (NO React state updates in loop)
    let animationFrameId: number;
    let currentLookAt = new THREE.Vector3();

    const renderLoop = () => {
      const p = progressRef.current;
      const state = cameraController.getStateAtProgress(p);

      // Smooth camera position and target
      camera.position.copy(state.position);
      currentLookAt.copy(state.lookAt);
      camera.lookAt(currentLookAt);

      if (camera.fov !== state.fov) {
        camera.fov = state.fov;
        camera.updateProjectionMatrix();
      }

      // Check if active waypoint changed to update editorial overlay cleanly
      if (state.activeWaypoint.marker !== activeWaypointMarkerRef.current) {
        activeWaypointMarkerRef.current = state.activeWaypoint.marker;
        onWaypointChange(state.activeWaypoint);
      }

      renderer.render(propertyScene.scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // 6. Complete lifecycle cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      propertyScene.dispose();
      renderer.dispose();
    };
  }, [progressRef, onWaypointChange, onWebGLFail, onSceneReady]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#0a0c0d]"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full touch-none"
        aria-label="Interactive 3D Architectural Cinematic Journey"
      />
    </div>
  );
};
