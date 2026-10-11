import * as THREE from "three";
import { UPPER_FLOOR } from "./tourData";

// Direction the evening sun comes from: low over the sea to the south-west
export const SUN_DIRECTION = new THREE.Vector3(-0.52, 0.2, 0.83).normalize();

const LIVING_HEIGHT = 8;
const PAVILION_HEIGHT = 3.6;

// Stone face with the long horizontal veining of cut travertine
function travertineTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#cfc2a9";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 260; i++) {
    const y = Math.random() * size;
    const light = Math.random() > 0.5;
    ctx.strokeStyle = light
      ? `rgba(236,226,206,${0.05 + Math.random() * 0.12})`
      : `rgba(120,100,74,${0.04 + Math.random() * 0.1})`;
    ctx.lineWidth = 0.5 + Math.random() * 2.2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(size * 0.3, y + (Math.random() - 0.5) * 7, size * 0.7, y + (Math.random() - 0.5) * 7, size, y);
    ctx.stroke();
  }
  for (let i = 0; i < 520; i++) {
    ctx.fillStyle = `rgba(88,72,52,${0.06 + Math.random() * 0.16})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1 + Math.random() * 5, 1 + Math.random() * 1.4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// Dusk sky: deep blue overhead falling to an ember band on the horizon, brightest toward the sun
function skyDome(): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { uSun: { value: SUN_DIRECTION } },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vDir;
      uniform vec3 uSun;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.2, 1.0);
        vec3 zenith = vec3(0.035, 0.07, 0.15);
        vec3 mid = vec3(0.16, 0.24, 0.4);
        vec3 ember = vec3(1.0, 0.5, 0.22);
        vec3 col = mix(mid, zenith, smoothstep(0.08, 0.75, h));
        float toward = max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uSun.x, 0.0, uSun.z))), 0.0);
        float band = exp(-max(h, 0.0) * 9.0);
        col = mix(col, ember, band * (0.25 + 0.75 * pow(toward, 3.0)));
        col += vec3(1.0, 0.72, 0.45) * pow(max(dot(d, uSun), 0.0), 220.0) * 1.6;
        col = mix(col, vec3(0.03, 0.05, 0.08), smoothstep(0.0, -0.12, d.y));
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(420, 32, 20), material);
}

export interface House {
  scene: THREE.Scene;
  dispose: () => void;
}

export function buildHouse(renderer: THREE.WebGLRenderer): House {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1a2433, 60, 320);

  const sky = skyDome();
  scene.add(sky);

  // Reflections on water, glass and polished stone come from the sky itself
  const pmrem = new THREE.PMREMGenerator(renderer);
  const skyScene = new THREE.Scene();
  skyScene.add(sky.clone());
  const environment = pmrem.fromScene(skyScene, 0, 1, 1000);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const stoneMap = travertineTexture();
  const materials = {
    travertine: new THREE.MeshStandardMaterial({ map: stoneMap, roughness: 0.82 }),
    paving: new THREE.MeshStandardMaterial({ map: stoneMap, color: 0xbdb3a2, roughness: 0.6 }),
    basalt: new THREE.MeshStandardMaterial({ color: 0x191b1d, roughness: 0.32, metalness: 0.15 }),
    concrete: new THREE.MeshStandardMaterial({ color: 0x9b958a, roughness: 0.9 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0x4a3a28, roughness: 0.42, metalness: 0.85 }),
    oak: new THREE.MeshStandardMaterial({ color: 0x33271e, roughness: 0.7 }),
    linen: new THREE.MeshStandardMaterial({ color: 0xcfc6b4, roughness: 0.95 }),
    rug: new THREE.MeshStandardMaterial({ color: 0x9c9382, roughness: 1 }),
    planting: new THREE.MeshStandardMaterial({ color: 0x1d2a1c, roughness: 1 }),
    earth: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 1 }),
    glass: new THREE.MeshStandardMaterial({
      color: 0xa9bcc6,
      roughness: 0.04,
      metalness: 0.9,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      envMapIntensity: 1.6,
    }),
    water: new THREE.MeshStandardMaterial({
      color: 0x08161d,
      roughness: 0.04,
      metalness: 0.85,
      envMapIntensity: 2.2,
    }),
    sea: new THREE.MeshStandardMaterial({
      color: 0x0a1820,
      roughness: 0.22,
      metalness: 0.7,
      envMapIntensity: 1.8,
    }),
    glow: new THREE.MeshBasicMaterial({ color: 0xffd9a0 }),
  };

  const geometries: THREE.BufferGeometry[] = [];

  // Axis-aligned block from its min corner and size, with UVs scaled so the stone
  // texture repeats at the same physical size on every face of every block.
  const block = (
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    shadows = true
  ) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const uv = geometry.attributes.uv;
    const tile = 2.4;
    const faces: [number, number][] = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
    faces.forEach(([u, v], face) => {
      for (let i = 0; i < 4; i++) {
        const index = face * 4 + i;
        uv.setXY(index, (uv.getX(index) * u) / tile, (uv.getY(index) * v) / tile);
      }
    });
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + w / 2, y + h / 2, z + d / 2);
    mesh.castShadow = shadows;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  };

  const { travertine, paving, basalt, concrete, bronze, oak, linen, glass, glow } = materials;

  // Glazed wall along x (fixed z) or along z (fixed x), with bronze mullions
  const glazing = (axis: "x" | "z", fixed: number, from: number, to: number, y0: number, y1: number) => {
    const length = to - from;
    const pane = axis === "x"
      ? block(glass, from, y0, fixed - 0.02, length, y1 - y0, 0.04, false)
      : block(glass, fixed - 0.02, y0, from, 0.04, y1 - y0, length, false);
    pane.renderOrder = 2;
    const bays = Math.max(1, Math.round(length / 2));
    for (let i = 0; i <= bays; i++) {
      const at = from + (length * i) / bays - 0.035;
      if (axis === "x") block(bronze, at, y0, fixed - 0.06, 0.07, y1 - y0, 0.12);
      else block(bronze, fixed - 0.06, y0, at, 0.12, y1 - y0, 0.07);
    }
    if (axis === "x") {
      block(bronze, from, y1 - 0.08, fixed - 0.06, length, 0.08, 0.12);
      block(bronze, from, y0, fixed - 0.06, length, 0.05, 0.12);
    } else {
      block(bronze, fixed - 0.06, y1 - 0.08, from, 0.12, 0.08, length);
      block(bronze, fixed - 0.06, y0, from, 0.12, 0.05, length);
    }
  };

  /* Ground, terrace and water */
  block(materials.earth, -90, -0.6, -90, 180, 0.55, 92, false); // land behind the terrace line
  block(paving, -9, -0.3, -19, 24, 0.3, 21); // forecourt and house plinth
  block(basalt, -9, -0.3, 2, 24, 0.3, 7); // ocean terrace
  block(basalt, -5.3, -0.9, 8.7, 16.6, 0.86, 0.3); // pool rim, house side
  block(basalt, -5.3, -0.9, 9, 0.3, 0.86, 8);
  block(basalt, 11, -0.9, 9, 0.3, 0.86, 8);
  block(materials.water, -5, -0.6, 9, 16, 0.52, 8.02, false); // infinity pool
  block(materials.sea, -400, -3.2, 17, 800, 0.2, 400, false);
  block(materials.earth, -90, -3.4, 2, 81, 3.1, 15, false); // headland either side
  block(materials.earth, 15, -3.4, 2, 75, 3.1, 15, false);

  /* Arrival portico and water court */
  block(travertine, -3.4, 0, -17, 0.4, 3.4, 7);
  block(travertine, 3, 0, -17, 0.4, 3.4, 7);
  block(concrete, -3.9, 3.4, -17.6, 7.8, 0.35, 7.6);
  block(basalt, 3.4, -0.02, -16, 3.8, 0.06, 5.2);
  block(materials.water, 3.55, 0.02, -15.85, 3.5, 0.03, 4.9, false);
  block(materials.planting, -7.6, 0, -16.4, 3.6, 0.9, 1.4);
  block(materials.planting, -7.6, 0, -14.2, 1.4, 1.5, 3.2);

  /* Living volume */
  // North wall, split around the entry door
  block(travertine, -7.4, 0, -10.4, 6.2, LIVING_HEIGHT, 0.4);
  block(travertine, 1.2, 0, -10.4, 6.2, LIVING_HEIGHT, 0.4);
  block(travertine, -1.2, 2.9, -10.4, 2.4, LIVING_HEIGHT - 2.9, 0.4);
  block(bronze, -1.26, 0, -10.42, 0.06, 2.9, 0.44);
  block(bronze, 1.2, 0, -10.42, 0.06, 2.9, 0.44);
  // West wall
  block(travertine, -7.4, 0, -10, 0.4, LIVING_HEIGHT, 12);
  // East wall, with the opening through to the dining pavilion
  block(travertine, 7, 0, -10, 0.4, LIVING_HEIGHT, 5.6);
  block(travertine, 7, 3.2, -4.4, 0.4, LIVING_HEIGHT - 3.2, 3.6);
  block(travertine, 7, 0, -0.8, 0.4, LIVING_HEIGHT, 2.8);
  // South glazing: full height either side, a clear walk-through at the centre
  glazing("x", 2, -7, -1.4, 0, LIVING_HEIGHT);
  glazing("x", 2, 2.6, 7, 0, LIVING_HEIGHT);
  glazing("x", 2, -1.4, 2.6, 3, LIVING_HEIGHT);
  // Roof, cantilevered over the terrace
  block(concrete, -7.8, LIVING_HEIGHT, -10.8, 15.6, 0.45, 15.4);
  // Floor finish and a cove of light where the north wall meets the roof
  block(basalt, -7, -0.01, -10, 14, 0.03, 12, false);
  block(glow, -6.8, LIVING_HEIGHT - 0.14, -9.95, 13.6, 0.05, 0.08, false);

  /* Upper gallery and stair */
  block(concrete, -7, UPPER_FLOOR - 0.3, -10, 8, 0.3, 6);
  block(oak, -7, UPPER_FLOOR, -10, 8, 0.03, 6, false);
  glazing("x", -4, -4.6, 1, UPPER_FLOOR, UPPER_FLOOR + 1.05);
  glazing("z", 1, -10, -4, UPPER_FLOOR, UPPER_FLOOR + 1.05);
  block(glow, -6.9, UPPER_FLOOR - 0.36, -4.1, 7.8, 0.04, 0.06, false);
  const treads = 20;
  for (let i = 0; i < treads; i++) {
    // Rises northward along the west wall, from the terrace doors up to the gallery
    block(travertine, -6.98, (UPPER_FLOOR / treads) * i, 0.6 - (i + 1) * 0.23, 2.2, UPPER_FLOOR / treads, 0.23 * (treads - i) + 0.02);
  }

  /* Suite furniture */
  block(travertine, -6.6, UPPER_FLOOR, -9.9, 4.4, 1.5, 0.25);
  block(oak, -6.2, UPPER_FLOOR, -9.6, 3.6, 0.32, 2.4);
  block(linen, -6.1, UPPER_FLOOR + 0.32, -9.5, 3.4, 0.24, 2.2);
  block(linen, -5.9, UPPER_FLOOR + 0.56, -9.45, 1.4, 0.16, 0.5);
  block(linen, -4.3, UPPER_FLOOR + 0.56, -9.45, 1.4, 0.16, 0.5);
  block(oak, -1.6, UPPER_FLOOR, -9.6, 1.6, 0.45, 0.5);
  block(glow, -1.0, UPPER_FLOOR + 0.45, -9.42, 0.14, 0.34, 0.14, false);

  /* Living furniture: seating to the west, leaving the door-to-sea axis clear */
  block(materials.rug, -4.5, 0.02, -3.9, 4.6, 0.02, 4.3, false);
  block(linen, -4.2, 0.02, -3.4, 1.15, 0.42, 3);
  block(linen, -4.2, 0.44, -3.4, 0.3, 0.36, 3);
  block(basalt, -2.6, 0.02, -2.7, 1.1, 0.32, 1.6);
  block(linen, -1.3, 0.02, -3.1, 0.9, 0.42, 0.9);
  block(linen, -1.3, 0.02, -1.7, 0.9, 0.42, 0.9);
  block(oak, 6.25, 0, -0.5, 0.7, 0.45, 2.1); // bench against the east wall
  block(oak, 2.4, 0, -9.9, 4.2, 0.55, 0.5); // low console on the north wall

  /* Dining pavilion */
  block(travertine, 7.4, 0, -6.4, 8, PAVILION_HEIGHT, 0.4);
  glazing("z", 15, -6, 2, 0, PAVILION_HEIGHT);
  glazing("x", 2, 7.4, 9.2, 0, PAVILION_HEIGHT);
  glazing("x", 2, 12.8, 15, 0, PAVILION_HEIGHT);
  glazing("x", 2, 9.2, 12.8, 2.8, PAVILION_HEIGHT);
  block(concrete, 7.4, PAVILION_HEIGHT, -6.8, 8.6, 0.4, 11.2);
  block(basalt, 7.4, -0.01, -6, 7.6, 0.03, 8, false);
  block(basalt, 9, 0.7, -3.2, 4.6, 0.09, 1.25); // table
  block(basalt, 9.6, 0, -2.95, 0.5, 0.7, 0.75);
  block(basalt, 12.5, 0, -2.95, 0.5, 0.7, 0.75);
  for (let i = 0; i < 4; i++) {
    for (const side of [-4.05, -1.75]) {
      block(oak, 9.3 + i * 1.08, 0, side, 0.55, 0.44, 0.55);
      block(oak, 9.3 + i * 1.08, 0.44, side < -3 ? side : side + 0.47, 0.55, 0.38, 0.08);
    }
  }
  block(bronze, 9.4, 2.05, -2.62, 3.8, 0.06, 0.1); // linear pendant
  block(glow, 9.45, 2.02, -2.6, 3.7, 0.03, 0.06, false);
  block(oak, 8.4, 0, -5.95, 6, 2.6, 0.45); // joinery wall

  /* Terrace */
  block(linen, -6.6, 0.02, 4.6, 2.2, 0.36, 0.9);
  block(linen, -6.6, 0.02, 6.2, 2.2, 0.36, 0.9);
  block(materials.planting, 12.6, 0, 6.6, 2, 0.7, 2);
  block(materials.planting, -8.6, 0, 2.4, 1.2, 1.3, 1.6);

  /* Light */
  const sun = new THREE.DirectionalLight(0xffb070, 3.4);
  sun.position.copy(SUN_DIRECTION).multiplyScalar(70).add(new THREE.Vector3(2, 0, -2));
  sun.target.position.set(2, 0, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 26;
  sun.shadow.camera.bottom = -22;
  sun.shadow.camera.near = 10;
  sun.shadow.camera.far = 150;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun, sun.target);

  scene.add(new THREE.HemisphereLight(0x5f7fb5, 0x2a2118, 0.85));

  const lamp = (x: number, y: number, z: number, intensity: number, reach: number) => {
    const light = new THREE.PointLight(0xffc98a, intensity, reach, 1.6);
    light.position.set(x, y, z);
    scene.add(light);
  };
  lamp(0, 6.6, -4, 150, 26); // living volume
  lamp(0, 2.9, -7.6, 26, 11); // beneath the gallery
  lamp(11.2, 2.6, -2.6, 46, 13); // dining
  lamp(-3, UPPER_FLOOR + 2.6, -7, 34, 12); // suite
  lamp(0, 2.9, -13.5, 22, 11); // portico

  return {
    scene,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      sky.geometry.dispose();
      (sky.material as THREE.Material).dispose();
      Object.values(materials).forEach((m) => m.dispose());
      stoneMap.dispose();
      environment.dispose();
    },
  };
}
