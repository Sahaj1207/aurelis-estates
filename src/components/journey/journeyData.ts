export interface CameraWaypoint {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  marker: string;
  title: string;
  subtitle: string;
  description: string;
  meta: string;
}

export const journeyWaypoints: CameraWaypoint[] = [
  {
    progress: 0.0,
    position: [0, 8, 38],
    lookAt: [0, 4, 0],
    fov: 42,
    marker: "01 / EXTERIOR",
    title: "THE COASTAL APPROACH",
    subtitle: "Cantilevered Monolith and Twilight Sky",
    description: "Monolithic concrete and travertine volumes rise from the coastal bedrock along the Arabian Sea horizon.",
    meta: "ELEVATION / SEA FRONT",
  },
  {
    progress: 0.2,
    position: [-8, 5, 24],
    lookAt: [2, 3, 0],
    fov: 44,
    marker: "02 / ARRIVAL",
    title: "THE BASALT PAVILION",
    subtitle: "Water Court and Stone Reflection",
    description: "A ceremonial entrance court framed by dark basalt reflecting pools and mature coastal frangipani palms.",
    meta: "COURTYARD / GROUND LEVEL",
  },
  {
    progress: 0.42,
    position: [-4, 3.5, 12],
    lookAt: [1, 3, -2],
    fov: 48,
    marker: "03 / LIVING VOLUME",
    title: "DOUBLE-HEIGHT SANCTUARY",
    subtitle: "Acoustics of Stone and Water",
    description: "Expansive bronze-framed glass walls dissolve the boundary between interior lounge and evening coastal air.",
    meta: "MAIN SALON / 28 FT CEILINGS",
  },
  {
    progress: 0.65,
    position: [5, 4, 6],
    lookAt: [0, 3, -8],
    fov: 46,
    marker: "04 / DINING CANTILEVER",
    title: "THE GLASS PROMONTORY",
    subtitle: "Suspended Over Water",
    description: "A cantilevered dining volume projected toward the horizon, illuminated by recessed warm ambient lighting.",
    meta: "DINING SUITE / 16 SEATS",
  },
  {
    progress: 0.82,
    position: [8, 6.5, -4],
    lookAt: [-2, 4.5, -14],
    fov: 44,
    marker: "05 / PRIMARY SUITE",
    title: "PRIVATE SANCTUARY",
    subtitle: "Upper Level Seclusion",
    description: "The primary suite occupies the upper travertine wing, offering unobstructed panoramic views of the open ocean.",
    meta: "UPPER WING / PRIVATE RETREAT",
  },
  {
    progress: 1.0,
    position: [0, 5, -18],
    lookAt: [0, 3, -35],
    fov: 50,
    marker: "06 / OCEAN TERRACE",
    title: "THE HORIZON EXPEDITION",
    subtitle: "Infinity Pool and Open Water",
    description: "The journey culminates at the edge of the dark stone infinity pool merging seamlessly with the Arabian Sea.",
    meta: "TERRACE / SEA VIEW",
  },
];
