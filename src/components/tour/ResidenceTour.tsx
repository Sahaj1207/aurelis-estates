import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { buildHouse } from "./buildHouse";
import { routeBetween, tourRooms, tourStops } from "./tourData";
import { lockScroll, unlockScroll } from "../../services/smoothScroll";

interface ResidenceTourProps {
  onBack: () => void;
}

const WALK_SPEED = 3.4; // metres per second
const LOOK_SENSITIVITY = 0.0042;
const CLICK_SLOP = 7;

const yawToward = (dx: number, dz: number) => Math.atan2(-dx, -dz);
const shortestAngle = (from: number, to: number) => {
  const delta = ((to - from + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return from + delta;
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Plan drawing bounds, in the same metres as the model
const PLAN = { x: -11, z: -19, w: 28, h: 38 };

export const ResidenceTour: React.FC<ResidenceTourProps> = ({ onBack }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const walkToRef = useRef<(id: string) => void>(() => {});
  const [activeId, setActiveId] = useState(tourStops[0].id);
  const [walking, setWalking] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported">("loading");
  const [hintVisible, setHintVisible] = useState(true);

  const active = tourStops.find((s) => s.id === activeId)!;
  const activeIndex = tourStops.indexOf(active);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setStatus("unsupported");
      return;
    }

    lockScroll();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Nothing in the house moves, so shadows are rendered once and kept
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "none";

    const house = buildHouse(renderer);
    const camera = new THREE.PerspectiveCamera(66, 1, 0.1, 900);
    camera.rotation.order = "YXZ";

    // Floor markers for the other rooms
    const ringGeometry = new THREE.RingGeometry(0.32, 0.4, 48);
    const dotGeometry = new THREE.CircleGeometry(0.1, 24);
    const markers = tourStops.map((stop) => {
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({
        color: 0xf2e6cf,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        fog: false,
      });
      const ring = new THREE.Mesh(ringGeometry, material);
      const dot = new THREE.Mesh(dotGeometry, material);
      // Generous invisible disc so the marker is easy to hit with a fingertip
      const target = new THREE.Mesh(
        new THREE.CircleGeometry(0.95, 20),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      group.add(ring, dot, target);
      group.rotation.x = -Math.PI / 2;
      group.position.set(stop.position[0], stop.position[1] - 1.62 + 0.06, stop.position[2]);
      group.userData.stopId = stop.id;
      group.renderOrder = 3;
      house.scene.add(group);
      return { group, material, target };
    });

    const first = tourStops[0];
    const position = new THREE.Vector3(...first.position);
    let yaw = yawToward(first.lookAt[0] - first.position[0], first.lookAt[2] - first.position[2]);
    let pitch = 0;
    let yawTarget = yaw;
    let pitchTarget = 0;
    let currentId = first.id;
    let hoveredId: string | null = null;

    let walk: {
      curve: THREE.CatmullRomCurve3;
      duration: number;
      elapsed: number;
      toId: string;
      endYaw: number;
      endPitch: number;
    } | null = null;

    const settleOn = (id: string) => {
      const stop = tourStops.find((s) => s.id === id)!;
      const dx = stop.lookAt[0] - stop.position[0];
      const dy = stop.lookAt[1] - stop.position[1];
      const dz = stop.lookAt[2] - stop.position[2];
      return {
        yaw: yawToward(dx, dz),
        pitch: Math.atan2(dy, Math.hypot(dx, dz)),
      };
    };

    walkToRef.current = (id: string) => {
      if (walk || id === currentId) return;
      const points = routeBetween(currentId, id).map((p) => new THREE.Vector3(...p));
      const end = settleOn(id);
      setHintVisible(false);
      if (reducedMotion) {
        position.copy(points[points.length - 1]);
        yaw = yawTarget = end.yaw;
        pitch = pitchTarget = end.pitch;
        currentId = id;
        setActiveId(id);
        return;
      }
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      walk = {
        curve,
        duration: Math.min(5.2, Math.max(1.6, curve.getLength() / WALK_SPEED)),
        elapsed: 0,
        toId: id,
        endYaw: end.yaw,
        endPitch: end.pitch,
      };
      setWalking(true);
      setActiveId(id);
    };

    /* Looking: drag turns the head; the view eases after the hand like a weighted camera */
    const canvas = renderer.domElement;
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const pick = (clientX: number, clientY: number): string | null => {
      const rect = canvas.getBoundingClientRect();
      pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        markers.filter((m) => m.group.visible).map((m) => m.target),
        false
      )[0];
      return hit ? (hit.object.parent!.userData.stopId as string) : null;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        if (!walk) {
          yawTarget += dx * LOOK_SENSITIVITY;
          pitchTarget = THREE.MathUtils.clamp(pitchTarget + dy * LOOK_SENSITIVITY, -0.95, 0.95);
          if (moved > 40) setHintVisible(false);
        }
      } else if (e.pointerType === "mouse") {
        hoveredId = pick(e.clientX, e.clientY);
        canvas.style.cursor = hoveredId ? "pointer" : "grab";
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (moved < CLICK_SLOP) {
        const id = pick(e.clientX, e.clientY);
        if (id) walkToRef.current(id);
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the horizontal field of view generous on a tall phone screen
      camera.fov = w / h < 1 ? 86 : 66;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    const tangent = new THREE.Vector3();
    let frame = 0;
    let firstFrame = true;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, clock.getDelta());
      const time = clock.elapsedTime;

      if (walk) {
        walk.elapsed += dt;
        const t = Math.min(1, walk.elapsed / walk.duration);
        const eased = easeInOut(t);
        walk.curve.getPointAt(eased, position);
        walk.curve.getTangentAt(Math.min(0.999, eased), tangent);
        // Face the direction of travel, then turn to the room's view on arrival
        const arriving = THREE.MathUtils.smoothstep(t, 0.62, 0.96);
        const travelYaw = shortestAngle(yawTarget, yawToward(tangent.x, tangent.z));
        const endYaw = shortestAngle(travelYaw, walk.endYaw);
        yawTarget = THREE.MathUtils.lerp(travelYaw, endYaw, arriving);
        pitchTarget = THREE.MathUtils.lerp(
          THREE.MathUtils.clamp(Math.atan2(tangent.y, Math.hypot(tangent.x, tangent.z)) * 0.5, -0.3, 0.3),
          walk.endPitch,
          arriving
        );
        // A slight rise and fall in step with the walk
        position.y += Math.sin(walk.elapsed * 7.2) * 0.018 * Math.sin(t * Math.PI);
        if (t >= 1) {
          currentId = walk.toId;
          walk = null;
          setWalking(false);
        }
      }

      // Critically damped follow: frame-rate independent, no overshoot
      const follow = 1 - Math.exp(-dt * (walk ? 4.5 : 9));
      yaw += (yawTarget - yaw) * follow;
      pitch += (pitchTarget - pitch) * follow;
      camera.position.copy(position);
      camera.rotation.set(pitch, yaw, 0);

      markers.forEach(({ group, material }) => {
        const id = group.userData.stopId as string;
        group.visible = id !== currentId && !(walk && walk.toId === id);
        const hovered = id === hoveredId;
        const pulse = 1 + Math.sin(time * 2.2 + group.position.x) * 0.06;
        group.scale.setScalar(pulse * (hovered ? 1.25 : 1));
        material.opacity = hovered ? 1 : 0.7;
      });

      if (markerRef.current) {
        markerRef.current.setAttribute(
          "transform",
          `translate(${position.x.toFixed(2)} ${position.z.toFixed(2)}) rotate(${((-yaw * 180) / Math.PI).toFixed(1)})`
        );
      }

      renderer.render(house.scene, camera);
      if (firstFrame) {
        firstFrame = false;
        setStatus("ready");
      }
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        clock.getDelta();
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      walkToRef.current = () => {};
      markers.forEach(({ material, target }) => {
        material.dispose();
        target.geometry.dispose();
        (target.material as THREE.Material).dispose();
      });
      ringGeometry.dispose();
      dotGeometry.dispose();
      house.dispose();
      renderer.dispose();
      canvas.remove();
      unlockScroll();
    };
  }, []);

  const walkTo = useCallback((id: string) => walkToRef.current(id), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") walkTo(tourStops[Math.min(tourStops.length - 1, activeIndex + 1)].id);
      else if (e.key === "ArrowLeft") walkTo(tourStops[Math.max(0, activeIndex - 1)].id);
      else if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, walkTo, onBack]);

  const roundButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0a0c0d]/55 text-[#f6f6f4] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-[#0a0c0d] text-[#f6f6f4] select-none">
      <div
        ref={mountRef}
        data-cursor="Look"
        className={`absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:cursor-grab transition-opacity duration-[1400ms] ease-out ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0c0d]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0a0c0d]/90 via-[#0a0c0d]/45 to-transparent" />

      {/* Header */}
      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-6 sm:px-8 md:px-12 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex flex-col">
          <span className="text-[12px] sm:text-[12.5px] font-medium tracking-[0.28em] uppercase">
            The Marine House
          </span>
          <span className="text-[8.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/70">
            Architectural walk-through
          </span>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 py-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6]"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Leave tour</span>
        </button>
      </header>

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8c2b5]/60">
            Preparing the residence
          </span>
        </div>
      )}

      {status === "unsupported" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
          <p className="max-w-[36ch] font-serif text-2xl font-light leading-snug">
            The walk-through needs 3D graphics, which this browser has switched off.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="border-b border-[#dfd7c6]/40 pb-1 text-[11px] font-medium tracking-[0.24em] uppercase text-[#dfd7c6]"
          >
            Return to the residence
          </button>
        </div>
      ) : (
        <>
          {/* Plan */}
          <div className="absolute right-4 sm:right-8 md:right-12 top-20 sm:top-24 w-[104px] sm:w-[150px] md:w-[176px] border border-white/10 bg-[#0a0c0d]/55 p-2.5 sm:p-3.5 backdrop-blur-md">
            <svg
              viewBox={`${PLAN.x} ${PLAN.z} ${PLAN.w} ${PLAN.h}`}
              className="block w-full"
              role="img"
              aria-label="Plan of the residence showing your position"
            >
              {tourRooms.map((room) => {
                const [x0, z0, x1, z1] = room.rect;
                return (
                  <rect
                    key={room.id}
                    x={x0}
                    y={z0}
                    width={x1 - x0}
                    height={z1 - z0}
                    fill={room.kind === "water" ? "rgba(120,160,180,0.16)" : "rgba(255,255,255,0.03)"}
                    stroke={room.level === 1 ? "rgba(223,215,198,0.55)" : "rgba(246,246,244,0.4)"}
                    strokeWidth={0.18}
                    strokeDasharray={room.level === 1 ? "0.6 0.5" : room.kind === "terrace" ? "0.25 0.4" : undefined}
                  />
                );
              })}
              {tourStops.map((stop) => (
                <g
                  key={stop.id}
                  onClick={() => walkTo(stop.id)}
                  className="cursor-pointer"
                  role="button"
                  aria-label={`Walk to ${stop.name}`}
                >
                  <circle cx={stop.position[0]} cy={stop.position[2]} r={2.4} fill="transparent" />
                  <circle
                    cx={stop.position[0]}
                    cy={stop.position[2]}
                    r={0.62}
                    fill={stop.id === activeId ? "#dfd7c6" : "transparent"}
                    stroke="#dfd7c6"
                    strokeWidth={0.2}
                  />
                </g>
              ))}
              <g ref={markerRef} pointerEvents="none">
                <path d="M0 0 L-2.6 -4.6 A5.3 5.3 0 0 1 2.6 -4.6 Z" fill="rgba(223,215,198,0.28)" />
                <circle r={0.5} fill="#f6f6f4" />
              </g>
            </svg>
            <div className="mt-2 flex items-center justify-between text-[7.5px] sm:text-[8px] tracking-[0.22em] uppercase text-[#c8c2b5]/55">
              <span>Plan</span>
              <span>Sea ↓</span>
            </div>
          </div>

          {/* Room caption and controls */}
          <div className="absolute inset-x-0 bottom-0 px-6 sm:px-8 md:px-12 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div
              className={`pointer-events-none mb-5 text-[9.5px] tracking-[0.26em] uppercase text-[#f6f6f4]/75 transition-opacity duration-700 ${
                hintVisible && status === "ready" ? "opacity-100" : "opacity-0"
              }`}
            >
              Drag to look around · Tap a floor marker to walk
            </div>

            <div className="flex items-end justify-between gap-6">
              <div
                key={active.id}
                className="max-w-xl animate-[tour-caption_900ms_cubic-bezier(0.16,1,0.3,1)_both]"
              >
                <span className="mb-2.5 block font-mono text-[10px] tracking-[0.24em] text-[#dfd7c6]">
                  {active.index}
                  <span className="text-[#f6f6f4]/40"> / 0{tourStops.length}</span>
                </span>
                <h1 className="display-md font-serif font-light leading-[0.98] tracking-[-0.015em]">
                  {active.name}
                </h1>
                <p className="mt-3 max-w-[44ch] text-[13px] md:text-[14.5px] font-light leading-[1.65] text-[#c8c2b5]/90">
                  {active.line}
                </p>
                <div className="mt-4 hidden sm:flex flex-wrap gap-x-6 gap-y-2">
                  {active.specs.map((spec) => (
                    <div key={spec.label} className="border-l border-white/15 pl-3">
                      <span className="block text-[8.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/55">
                        {spec.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium tracking-[0.16em] uppercase">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => walkTo(tourStops[activeIndex - 1].id)}
                  disabled={activeIndex === 0 || walking}
                  aria-label="Previous room"
                  className={roundButton}
                >
                  <ArrowLeft size={16} weight="light" />
                </button>
                <button
                  type="button"
                  onClick={() => walkTo(tourStops[activeIndex + 1].id)}
                  disabled={activeIndex === tourStops.length - 1 || walking}
                  aria-label="Next room"
                  className={roundButton}
                >
                  <ArrowRight size={16} weight="light" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResidenceTour;
