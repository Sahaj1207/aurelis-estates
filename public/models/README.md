# AURELIS Estates: 3D Model Pipeline & Asset Specification

This directory is reserved for optimized 3D architectural assets for THE MARINE HOUSE cinematic property journey.

## Asset Conventions

- Preferred Format: Binary glTF (.glb) with Draco geometry compression and KTX2 / WebP texture compression.
- Target Asset Name: `the-marine-house.glb` (or `the-marine-house-lod0.glb` / `lod1.glb`).
- Coordinate Space: Right-handed Y-up (meters).
- Pivot / Origin: Set to ground level of the main entrance / arrival courtyard (0, 0, 0).
- Scale: Real-world metric 1:1 scale.

## Performance Budget

- Triangle Budget: Maximum 120,000 polygons for desktop; simplified variant under 50,000 for mobile tier.
- Draw Calls: Target fewer than 35 draw calls through texture atlasing and combined architectural meshes.
- Textures: 2K maximum for hero surfaces (travertine, basalt, teak wood), 1K for secondary architectural surfaces.
- Materials: PBR Metal/Roughness standard; avoid complex custom shaders in base geometry.

## Fallback & Progressive Loading

- The SceneCanvas will attempt to load the asset from `/models/the-marine-house.glb`.
- If absent, the architectural scaffolding scene renders automatically without disruption.
- Graceful WebGLFallback triggers if WebGL context is unavailable or reduced motion is preferred.
