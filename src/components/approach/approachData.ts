export interface PrincipleItem {
  id: string;
  number: string;
  name: string;
  statement: string;
  supportingCopy: string;
  alignment: "left" | "right";
  image: {
    src: string;
    alt: string;
    caption: string;
    aspectRatio: string;
  };
}

export interface ApproachContent {
  eyebrow: string;
  manifesto: {
    line1: string;
    line2: string;
    line3: string;
  };
  supportingCopy: string;
  manifestoImage: {
    src: string;
    alt: string;
    caption: string;
  };
  principles: PrincipleItem[];
  ending: {
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    subtext: string;
    image: {
      src: string;
      alt: string;
      caption: string;
    };
  };
}

export const approachContent: ApproachContent = {
  eyebrow: "05 / THE AURELIS APPROACH",
  manifesto: {
    line1: "WE SELECT PLACES",
    line2: "THAT REWARD",
    line3: "ATTENTION.",
  },
  supportingCopy:
    "AURELIS looks beyond the address. We consider how architecture meets its setting, how materials gather character, how daylight moves through a room, and how a residence changes the experience of living.",
  manifestoImage: {
    src: "/images/the-desert-court.jpg",
    alt: "Architectural facade showing clean stone volumes and natural sunlight shadows",
    caption: "ARCHITECTURAL STUDY / LIGHT & GEOMETRY",
  },
  principles: [
    {
      id: "place",
      number: "01",
      name: "PLACE",
      statement: "Architecture begins with its setting.",
      supportingCopy:
        "Coastline, landscape, climate, and context are not backdrops. They are part of the architecture.",
      alignment: "left",
      image: {
        src: "/images/the-cliff-residence.jpg",
        alt: "Coastal residence embedded into monolithic sea cliffs",
        caption: "TOPOGRAPHY STUDY / COASTAL INTEGRATION",
        aspectRatio: "aspect-[16/10]",
      },
    },
    {
      id: "material",
      number: "02",
      name: "MATERIAL",
      statement: "Materiality should reward time.",
      supportingCopy:
        "Stone, timber, concrete, metal, and glass are considered for how they age, weather, and gather character.",
      alignment: "right",
      image: {
        src: "/images/marine-house-dining.jpg",
        alt: "Honed Roman travertine, bronze framed thermal glass, and reflection basin",
        caption: "MATERIAL INDEX / TRAVERTINE, BRONZE & WATER",
        aspectRatio: "aspect-[4/5]",
      },
    },
    {
      id: "light",
      number: "03",
      name: "LIGHT",
      statement: "Space is shaped by the movement of light.",
      supportingCopy:
        "Morning, afternoon, dusk, reflection, shadow. The changing light becomes part of the experience of the residence.",
      alignment: "left",
      image: {
        src: "/images/marine-house-living.jpg",
        alt: "Double-height interior volume illuminated by shifting sea light",
        caption: "SPATIAL DIALOGUE / DIURNAL ILLUMINATION",
        aspectRatio: "aspect-[16/10]",
      },
    },
    {
      id: "silence",
      number: "04",
      name: "SILENCE",
      statement: "Luxury is often what has been left out.",
      supportingCopy:
        "Restraint, proportion, privacy, and calm create spaces that do not need to announce themselves.",
      alignment: "right",
      image: {
        src: "/images/marine-house-terrace.jpg",
        alt: "Quiet open terrace terminating at calm water and distant sea horizon",
        caption: "SPATIAL RESTRAINT / MINIMAL HORIZON",
        aspectRatio: "aspect-[16/9]",
      },
    },
  ],
  ending: {
    headlineLine1: "THE RIGHT RESIDENCE",
    headlineLine2: "DOES NOT NEED TO",
    headlineLine3: "BE EXPLAINED.",
    subtext:
      "AURELIS exists for places where architecture, setting, and life are inseparable.",
    image: {
      src: "/images/the-garden-house.jpg",
      alt: "Quiet stone pavilion resting within protected garden landscape",
      caption: "PORTFOLIO STUDY / ARCHITECTURAL QUIETUDE",
    },
  },
};
