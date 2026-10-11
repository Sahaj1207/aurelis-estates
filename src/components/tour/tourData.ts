// Single source of truth for the walk-through: the 3D model, the plan drawing and
// the navigation graph are all generated from these measurements (metres).
// Axes: +x east, +z south toward the sea, +y up.

export type Vec3 = [number, number, number];

export interface TourRoom {
  id: string;
  // Footprint as [x0, z0, x1, z1]
  rect: [number, number, number, number];
  level: 0 | 1;
  kind: "interior" | "terrace" | "water";
}

export interface TourStop {
  id: string;
  index: string;
  name: string;
  line: string;
  specs: { label: string; value: string }[];
  // Eye position and the point the camera settles on at arrival
  position: Vec3;
  lookAt: Vec3;
}

export const EYE = 1.62;
export const UPPER_FLOOR = 4;

export const tourRooms: TourRoom[] = [
  { id: "entry", rect: [-3, -17, 3, -10], level: 0, kind: "interior" },
  { id: "court", rect: [3, -16, 7, -11], level: 0, kind: "water" },
  { id: "living", rect: [-7, -10, 7, 2], level: 0, kind: "interior" },
  { id: "dining", rect: [7, -6, 15, 2], level: 0, kind: "interior" },
  { id: "suite", rect: [-7, -10, 1, -4], level: 1, kind: "interior" },
  { id: "terrace", rect: [-9, 2, 15, 9], level: 0, kind: "terrace" },
  { id: "pool", rect: [-5, 9, 11, 17], level: 0, kind: "water" },
];

export const tourStops: TourStop[] = [
  {
    id: "entry",
    index: "01",
    name: "Arrival Threshold",
    line: "A travertine portico and a still water court draw the eye through the house to the horizon.",
    specs: [
      { label: "Threshold", value: "Portico & water court" },
      { label: "Axis", value: "North to sea" },
    ],
    position: [0, EYE, -15.4],
    lookAt: [0, 1.9, 6],
  },
  {
    id: "living",
    index: "02",
    name: "Living Volume",
    line: "A double-height room in Roman travertine, opened to the terrace by a wall of bronze-framed glass.",
    specs: [
      { label: "Ceiling", value: "8 m volume" },
      { label: "Glazing", value: "Bronze profiles" },
    ],
    position: [1.2, EYE, -2.6],
    lookAt: [0.5, 2.6, 12],
  },
  {
    id: "dining",
    index: "03",
    name: "Dining Pavilion",
    line: "A lower, quieter pavilion with a single long table set between glass and evening water.",
    specs: [
      { label: "Table", value: "Monolithic basalt" },
      { label: "Joinery", value: "Smoked oak" },
    ],
    position: [9, EYE, -4.4],
    lookAt: [13, 1.1, 2],
  },
  {
    id: "suite",
    index: "04",
    name: "Primary Suite",
    line: "An upper gallery held above the living volume, looking out over the pool to the sea.",
    specs: [
      { label: "Level", value: "Upper gallery" },
      { label: "Outlook", value: "South, over water" },
    ],
    position: [-2.6, UPPER_FLOOR + EYE, -5.6],
    lookAt: [1.5, 3.2, 12],
  },
  {
    id: "terrace",
    index: "05",
    name: "Ocean Terrace",
    line: "A basalt deck runs out to an infinity edge where pool, sea and sky read as one plane.",
    specs: [
      { label: "Deck", value: "Honed basalt" },
      { label: "Edge", value: "Infinity pool" },
    ],
    position: [3, EYE, 6.4],
    lookAt: [3.5, 0.9, 30],
  },
];

// Walkable connections, each with the points a person would actually pass through
// (door openings, the stair) so the camera never cuts a corner through a wall.
export const tourLinks: { a: string; b: string; via: Vec3[] }[] = [
  { a: "entry", b: "living", via: [[0, EYE, -10], [0.4, EYE, -6]] },
  { a: "living", b: "dining", via: [[5.2, EYE, -2.6], [7, EYE, -2.6]] },
  {
    a: "living",
    b: "suite",
    via: [
      [0.4, EYE, 0.9],
      [-3.6, EYE, 1.1],
      [-5.9, EYE, 1.3],
      [-5.9, EYE + 0.15, 0.5],
      [-5.9, UPPER_FLOOR + EYE, -4.05],
      [-5.6, UPPER_FLOOR + EYE, -5],
    ],
  },
  { a: "living", b: "terrace", via: [[0.6, EYE, 2], [1.6, EYE, 4]] },
  { a: "dining", b: "terrace", via: [[11, EYE, -1], [11, EYE, 2], [8, EYE, 4.6]] },
];

// Shortest walk between two stops as an ordered list of points, endpoints included
export function routeBetween(fromId: string, toId: string): Vec3[] {
  const stop = (id: string) => tourStops.find((s) => s.id === id)!;
  if (fromId === toId) return [stop(fromId).position];

  const previous = new Map<string, { from: string; via: Vec3[] }>();
  const queue = [fromId];
  const seen = new Set([fromId]);
  while (queue.length) {
    const here = queue.shift()!;
    if (here === toId) break;
    for (const link of tourLinks) {
      const next = link.a === here ? link.b : link.b === here ? link.a : null;
      if (!next || seen.has(next)) continue;
      seen.add(next);
      previous.set(next, { from: here, via: link.a === here ? link.via : [...link.via].reverse() });
      queue.push(next);
    }
  }

  const legs: Vec3[][] = [];
  let cursor = toId;
  while (cursor !== fromId) {
    const step = previous.get(cursor);
    if (!step) return [stop(fromId).position, stop(toId).position];
    legs.unshift([...step.via, stop(cursor).position]);
    cursor = step.from;
  }
  return [stop(fromId).position, ...legs.flat()];
}
