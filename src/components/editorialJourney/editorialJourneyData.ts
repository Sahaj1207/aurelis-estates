export interface FrameMetaItem {
  label: string;
  value: string;
}

export interface EditorialFrameData {
  id: string;
  frameIndex: number;
  marker: string;
  eyebrow: string;
  displayLines: string[];
  subtitle?: string;
  description: string;
  metadata: FrameMetaItem[];
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
    caption?: string;
  };
  layout:
    | "fullscreen-exterior"
    | "mask-transition"
    | "split-interior"
    | "asymmetric-dining"
    | "suite-sanctuary"
    | "terrace-wide"
    | "final-statement";
}

export const editorialJourneyIntro = {
  sectionNumber: "03 / THE EXPERIENCE",
  headline: {
    line1: "A HOUSE THAT OPENS",
    line2: "TOWARD THE SEA.",
  },
  supportingCopy:
    "Architecture, material, light, and landscape unfold through a sequence of considered spaces.",
};

export const editorialFrames: EditorialFrameData[] = [
  // FRAME 01: The Experience / Entering the Sanctuary (Restrained introduction, large serif, generous negative space)
  {
    id: "frame-01",
    frameIndex: 1,
    marker: "01",
    eyebrow: "THE THRESHOLD",
    displayLines: ["ENTERING", "THE SANCTUARY."],
    subtitle: "SPATIAL PROLOGUE",
    description:
      "Travertine porticos and quiet reflecting water guide the senses inward toward the coastal horizon.",
    metadata: [
      { label: "Threshold", value: "PORTICO AND WATER COURT" },
      { label: "Materiality", value: "ROMAN TRAVERTINE" },
    ],
    image: {
      src: "/images/marine-house-entry.webp",
      alt: "Arrival threshold and travertine portico with reflecting water court looking out to sea",
      objectPosition: "center center",
      caption: "The Marine House / Arrival Threshold",
    },
    layout: "fullscreen-exterior",
  },

  // FRAME 02: Arrival / Architecture (Image-led, architecture dominates, small amount of typography)
  {
    id: "frame-02",
    frameIndex: 2,
    marker: "02",
    eyebrow: "ARCHITECTURE",
    displayLines: ["MONOLITHS", "IN DIALOGUE."],
    subtitle: "COASTAL ELEVATION",
    description:
      "Cast concrete and warm travertine volumes anchored to Mumbai coastal bedrock, carved to invite the ocean breeze.",
    metadata: [
      { label: "Massing", value: "VOLUMETRIC STONE" },
      { label: "Orientation", value: "WEST COAST" },
    ],
    image: {
      src: "/images/marine-house-hero.webp",
      alt: "Monolithic architectural volumes and basalt water court reflecting evening skies",
      objectPosition: "center 55%",
      caption: "Architecture / Volumetric Dialogue",
    },
    layout: "mask-transition",
  },

  // FRAME 03: Living Volume (Hero moment, strong asymmetric editorial composition)
  {
    id: "frame-03",
    frameIndex: 3,
    marker: "03",
    eyebrow: "01 / LIVING VOLUME",
    displayLines: ["LIVING", "IN DIALOGUE", "WITH LIGHT."],
    subtitle: "DOUBLE-HEIGHT SANCTUARY",
    description:
      "Twenty-eight-foot ceilings clad in Roman travertine. Minimal bronze profiles dissolve the boundary to open coastal air.",
    metadata: [
      { label: "Ceiling", value: "28 FT VOLUME" },
      { label: "Materiality", value: "ROMAN TRAVERTINE" },
      { label: "Glazing", value: "BRONZE PROFILES" },
    ],
    image: {
      src: "/images/marine-house-living.webp",
      alt: "Double-height interior living volume with Roman travertine walls and reflection pool view",
      objectPosition: "center center",
      caption: "Living Sanctuary / 28 FT Travertine Volume",
    },
    layout: "split-interior",
  },

  // FRAME 04: Dining / Materiality (Architecture determines typography placement, subtle material information)
  {
    id: "frame-04",
    frameIndex: 4,
    marker: "04",
    eyebrow: "02 / MATERIALITY",
    displayLines: ["ROMAN TRAVERTINE", "BRONZE / GLASS", "AND WATER."],
    subtitle: "CULINARY PROMONTORY",
    description:
      "Monolithic basalt dining island flanked by reflecting pools, projecting over twilight tides.",
    metadata: [
      { label: "Table", value: "MONOLITHIC BASALT" },
      { label: "Joinery", value: "SMOKED OAK" },
      { label: "Surfaces", value: "HONED TRAVERTINE" },
    ],
    image: {
      src: "/images/marine-house-dining.webp",
      alt: "Minimalist basalt dining table and smoked oak joinery between flanking illuminated reflecting pools",
      objectPosition: "center center",
      caption: "Culinary Pavilion / Monolithic Basalt Island",
    },
    layout: "asymmetric-dining",
  },

  // FRAME 05: Primary Suite (Calmer, reduced copy, large negative space, monograph caption feel)
  {
    id: "frame-05",
    frameIndex: 5,
    marker: "05",
    eyebrow: "03 / PRIMARY SUITE",
    displayLines: ["SOLITUDE", "ABOVE THE SEA."],
    subtitle: "UPPER RETREAT",
    description:
      "Sheltered overhangs and warm travertine overlooking evening tides.",
    metadata: [
      { label: "Privacy", value: "UPPER SANCTUARY" },
    ],
    image: {
      src: "/images/marine-house-suite.webp",
      alt: "Quiet minimalist primary suite with low platform bed and sliding bronze glass framing ocean horizon",
      objectPosition: "center center",
      caption: "Upper Wing / Coastal Solitude",
    },
    layout: "suite-sanctuary",
  },

  // FRAME 06: Terrace / Ocean (Expansive, widest visual composition, very little copy, horizon carries frame)
  {
    id: "frame-06",
    frameIndex: 6,
    marker: "06",
    eyebrow: "04 / THE HORIZON",
    displayLines: ["WHERE STONE", "MEETS THE TIDE."],
    subtitle: "INFINITY PROMONTORY",
    description:
      "The basalt terrace extends into an infinity edge where water, stone, and sunset sky merge into one unbroken plane.",
    metadata: [
      { label: "Terrace Area", value: "4,200 SQ FT" },
    ],
    image: {
      src: "/images/marine-house-terrace.webp",
      alt: "Monolithic basalt terrace and infinity reflection pool merging with the Arabian sea",
      objectPosition: "center center",
      caption: "Ocean Terrace / Infinity Edge at Dusk",
    },
    layout: "terrace-wide",
  },

  // FRAME 07: Final Statement (BUILT AROUND LIGHT, WATER, AND SILENCE, significant empty space)
  {
    id: "frame-07",
    frameIndex: 7,
    marker: "07",
    eyebrow: "THE ESSENCE",
    displayLines: [
      "BUILT AROUND",
      "LIGHT, WATER,",
      "AND SILENCE.",
    ],
    description: "",
    metadata: [],
    image: {
      src: "/images/marine-house-terrace.webp",
      alt: "Minimalist dusk sky over the Arabian sea at the edge of the stone terrace",
      objectPosition: "center 85%",
    },
    layout: "final-statement",
  },
];
