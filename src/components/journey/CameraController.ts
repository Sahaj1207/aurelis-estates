import * as THREE from "three";
import { journeyWaypoints, type CameraWaypoint } from "./journeyData";

export interface InterpolatedCameraState {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  activeWaypoint: CameraWaypoint;
  nextWaypoint: CameraWaypoint;
  segmentProgress: number;
}

// Smooth cubic easing for architectural camera transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export class CameraController {
  private waypoints: CameraWaypoint[];
  private tempPos: THREE.Vector3 = new THREE.Vector3();
  private tempLookAt: THREE.Vector3 = new THREE.Vector3();

  constructor(waypoints: CameraWaypoint[] = journeyWaypoints) {
    this.waypoints = waypoints;
  }

  public getStateAtProgress(progress: number): InterpolatedCameraState {
    const clamped = Math.max(0, Math.min(1, progress));

    // Handle edge conditions
    if (clamped <= this.waypoints[0].progress) {
      const first = this.waypoints[0];
      return {
        position: new THREE.Vector3(...first.position),
        lookAt: new THREE.Vector3(...first.lookAt),
        fov: first.fov,
        activeWaypoint: first,
        nextWaypoint: this.waypoints[1] || first,
        segmentProgress: 0,
      };
    }

    const last = this.waypoints[this.waypoints.length - 1];
    if (clamped >= last.progress) {
      return {
        position: new THREE.Vector3(...last.position),
        lookAt: new THREE.Vector3(...last.lookAt),
        fov: last.fov,
        activeWaypoint: last,
        nextWaypoint: last,
        segmentProgress: 1,
      };
    }

    // Locate bounding waypoints
    let index = 0;
    for (let i = 0; i < this.waypoints.length - 1; i++) {
      if (
        clamped >= this.waypoints[i].progress &&
        clamped <= this.waypoints[i + 1].progress
      ) {
        index = i;
        break;
      }
    }

    const wpA = this.waypoints[index];
    const wpB = this.waypoints[index + 1];

    const span = wpB.progress - wpA.progress;
    const rawT = span > 0 ? (clamped - wpA.progress) / span : 0;
    const t = easeInOutCubic(Math.max(0, Math.min(1, rawT)));

    // Interpolate position
    this.tempPos.set(
      wpA.position[0] + (wpB.position[0] - wpA.position[0]) * t,
      wpA.position[1] + (wpB.position[1] - wpA.position[1]) * t,
      wpA.position[2] + (wpB.position[2] - wpA.position[2]) * t
    );

    // Interpolate lookAt target
    this.tempLookAt.set(
      wpA.lookAt[0] + (wpB.lookAt[0] - wpA.lookAt[0]) * t,
      wpA.lookAt[1] + (wpB.lookAt[1] - wpA.lookAt[1]) * t,
      wpA.lookAt[2] + (wpB.lookAt[2] - wpA.lookAt[2]) * t
    );

    // Interpolate field of view
    const fov = wpA.fov + (wpB.fov - wpA.fov) * t;

    return {
      position: this.tempPos.clone(),
      lookAt: this.tempLookAt.clone(),
      fov,
      activeWaypoint: rawT < 0.5 ? wpA : wpB,
      nextWaypoint: wpB,
      segmentProgress: rawT,
    };
  }
}
