import * as THREE from "three";

export class PropertyScene {
  public scene: THREE.Scene;
  private disposables: { dispose: () => void }[] = [];

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0c0d);
    this.scene.fog = new THREE.FogExp2(0x0a0c0d, 0.02);

    this.setupLighting();
    this.setupArchitecturalScaffolding();
  }

  private setupLighting(): void {
    // 1. Ambient skylight with warm ivory tone
    const ambientLight = new THREE.AmbientLight(0xf6f6f4, 0.6);
    this.scene.add(ambientLight);

    // 2. Primary directional warm twilight sunlight
    const sunLight = new THREE.DirectionalLight(0xdfd7c6, 1.6);
    sunLight.position.set(24, 18, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    this.scene.add(sunLight);

    // 3. Warm ambient interior architectural glow (Living & Dining pavilions)
    const livingGlow = new THREE.PointLight(0xffb86c, 2.4, 25, 1.2);
    livingGlow.position.set(-2, 4, 2);
    this.scene.add(livingGlow);

    const diningGlow = new THREE.PointLight(0xffc58a, 1.8, 20, 1.2);
    diningGlow.position.set(4, 4.5, -6);
    this.scene.add(diningGlow);
  }

  private setupArchitecturalScaffolding(): void {
    // Shared architectural materials
    const travertineMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6cdbe,
      roughness: 0.85,
      metalness: 0.05,
    });
    this.disposables.push(travertineMaterial);

    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a8e91,
      roughness: 0.9,
      metalness: 0.1,
    });
    this.disposables.push(concreteMaterial);

    const basaltWaterMaterial = new THREE.MeshStandardMaterial({
      color: 0x080a0c,
      roughness: 0.12,
      metalness: 0.75,
    });
    this.disposables.push(basaltWaterMaterial);

    const bronzeGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3d3832,
      roughness: 0.15,
      transmission: 0.8,
      thickness: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    this.disposables.push(bronzeGlassMaterial);

    // 1. Monolithic Ground Podium / Arrival Courtyard
    const podiumGeo = new THREE.BoxGeometry(40, 1.2, 50);
    this.disposables.push(podiumGeo);
    const podiumMesh = new THREE.Mesh(podiumGeo, travertineMaterial);
    podiumMesh.position.set(0, -0.6, -5);
    podiumMesh.receiveShadow = true;
    this.scene.add(podiumMesh);

    // 2. Basalt Reflection Pool
    const poolGeo = new THREE.BoxGeometry(22, 0.4, 18);
    this.disposables.push(poolGeo);
    const poolMesh = new THREE.Mesh(poolGeo, basaltWaterMaterial);
    poolMesh.position.set(-3, 0.1, 10);
    poolMesh.receiveShadow = true;
    this.scene.add(poolMesh);

    // 3. Ground Level Living Pavilion (Glass & Columns)
    const livingVolumeGeo = new THREE.BoxGeometry(16, 6, 14);
    this.disposables.push(livingVolumeGeo);
    const livingVolumeMesh = new THREE.Mesh(livingVolumeGeo, bronzeGlassMaterial);
    livingVolumeMesh.position.set(-2, 3, 0);
    this.scene.add(livingVolumeMesh);

    // Concrete roof slab over living
    const livingRoofGeo = new THREE.BoxGeometry(18, 0.8, 16);
    this.disposables.push(livingRoofGeo);
    const livingRoofMesh = new THREE.Mesh(livingRoofGeo, concreteMaterial);
    livingRoofMesh.position.set(-2, 6.4, 0);
    livingRoofMesh.castShadow = true;
    this.scene.add(livingRoofMesh);

    // 4. Upper Cantilevered Travertine Suite Volume (Marine House signature form)
    const upperSuiteGeo = new THREE.BoxGeometry(14, 5.5, 16);
    this.disposables.push(upperSuiteGeo);
    const upperSuiteMesh = new THREE.Mesh(upperSuiteGeo, travertineMaterial);
    upperSuiteMesh.position.set(5, 7.5, -4);
    upperSuiteMesh.castShadow = true;
    upperSuiteMesh.receiveShadow = true;
    this.scene.add(upperSuiteMesh);

    // 5. Projected Ocean Terrace & Infinity Edge
    const terraceGeo = new THREE.BoxGeometry(28, 0.8, 20);
    this.disposables.push(terraceGeo);
    const terraceMesh = new THREE.Mesh(terraceGeo, travertineMaterial);
    terraceMesh.position.set(0, 0.2, -26);
    terraceMesh.receiveShadow = true;
    this.scene.add(terraceMesh);

    const oceanReflectGeo = new THREE.PlaneGeometry(120, 100);
    this.disposables.push(oceanReflectGeo);
    const oceanReflectMesh = new THREE.Mesh(oceanReflectGeo, basaltWaterMaterial);
    oceanReflectMesh.rotation.x = -Math.PI / 2;
    oceanReflectMesh.position.set(0, -0.4, -40);
    this.scene.add(oceanReflectMesh);
  }

  // Ready hook for future GLB model loading
  public async loadPropertyModel(modelUrl: string): Promise<boolean> {
    try {
      const response = await fetch(modelUrl, { method: "HEAD" });
      if (!response.ok) {
        return false;
      }
      // Future GLTFLoader integration will populate here
      return true;
    } catch {
      return false;
    }
  }

  public dispose(): void {
    for (const item of this.disposables) {
      if (item && typeof item.dispose === "function") {
        item.dispose();
      }
    }
    this.disposables = [];
  }
}
