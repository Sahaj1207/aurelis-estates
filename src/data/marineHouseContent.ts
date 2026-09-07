export interface MaterialItem {
  number: string;
  name: string;
  description: string;
}

export interface SpatialZone {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  aspect: string;
}

export interface MarineHouseData {
  meta: {
    property: string;
    location: string;
    typology: string;
    area: string;
    status: string;
    coordinates: string;
  };
  hero: {
    eyebrowLocation: string;
    eyebrowTypology: string;
    titleLine1: string;
    titleLine2: string;
    area: string;
    status: string;
    image: string;
    imageAlt: string;
  };
  residence: {
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    image: string;
    imageAlt: string;
    caption: string;
  };
  materiality: {
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    image: string;
    imageAlt: string;
    materials: MaterialItem[];
  };
  living: {
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    image: string;
    imageAlt: string;
    specs: { label: string; value: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    zones: SpatialZone[];
  };
  suite: {
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    image: string;
    imageAlt: string;
    elevationNote: string;
  };
  ocean: {
    eyebrow: string;
    headlineLines: string[];
    image: string;
    imageAlt: string;
    coordinateNote: string;
  };
  statement: {
    eyebrow: string;
    statementLines: string[];
    subtext: string;
  };
  acquisition: {
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    ctaLabel: string;
    inquiryHref: string;
    contactNote: string;
  };
}

export const marineHouseContent: MarineHouseData = {
  meta: {
    property: "THE MARINE HOUSE",
    location: "MUMBAI / INDIA",
    typology: "PRIVATE RESIDENCE",
    area: "8,420 SQ FT",
    status: "PRIVATE ACQUISITION",
    coordinates: "18.9220 N, 72.8347 E",
  },
  hero: {
    eyebrowLocation: "MUMBAI / INDIA",
    eyebrowTypology: "PRIVATE RESIDENCE",
    titleLine1: "THE MARINE",
    titleLine2: "HOUSE",
    area: "8,420 SQ FT",
    status: "PRIVATE ACQUISITION",
    image: "/images/marine-house-hero.jpg",
    imageAlt: "The Marine House coastal architecture with cantilevered stone volumes and calm water reflection",
  },
  residence: {
    eyebrow: "01 / THE RESIDENCE",
    headlineLines: ["ARCHITECTURE", "IN DIALOGUE", "WITH THE SEA."],
    paragraph:
      "The Marine House is conceived as a sequence of sheltered volumes, open terraces, and framed views, allowing the changing light of the coast to become part of everyday life.",
    image: "/images/marine-house-entry.jpg",
    imageAlt: "Sheltered entry court and monolithic travertine portals at The Marine House",
    caption: "EASTERN ACCESS COURTYARD / MONOLITHIC MASSING",
  },
  materiality: {
    eyebrow: "02 / MATERIALITY",
    headlineLines: ["STONE.", "GLASS.", "WATER.", "LIGHT."],
    paragraph:
      "Roman travertine anchors the residence while bronze-framed glazing and water create a continuous relationship between interior and landscape.",
    image: "/images/marine-house-dining.jpg",
    imageAlt: "Tactile travertine surfaces and bronze framed glass overlooking sea garden",
    materials: [
      {
        number: "01",
        name: "ROMAN TRAVERTINE",
        description: "Quarried stone slabs anchoring the primary vertical massing.",
      },
      {
        number: "02",
        name: "BRONZE / GLASS",
        description: "Custom bronze framed thermal glazing opening toward the sea.",
      },
      {
        number: "03",
        name: "BASALT",
        description: "Honed basalt water channels guiding acoustic clarity throughout.",
      },
      {
        number: "04",
        name: "WATER / LANDSCAPE",
        description: "Continuous reflection basins linking interior volumes with coastal flora.",
      },
    ],
  },
  living: {
    eyebrow: "03 / LIVING VOLUME",
    headlineLines: ["A QUIET", "INTERIOR", "LANDSCAPE."],
    paragraph:
      "Double-height living spaces open toward the garden and sea, bringing natural light deep into the residence while maintaining a sense of privacy.",
    image: "/images/marine-house-living.jpg",
    imageAlt: "Double-height interior volume with timber ceilings and panoramic sea views",
    specs: [
      { label: "CEILING CLEARANCE", value: "6.2 METERS" },
      { label: "NATURAL ILLUMINATION", value: "NORTH-WEST AXIS" },
      { label: "ACOUSTIC INSULATION", value: "SOUND ABSORPTIVE TIMBER" },
    ],
  },
  experience: {
    eyebrow: "04 / THE PRIVATE EXPERIENCE",
    title: "SPATIAL PROGRESSION",
    description:
      "An orchestrated descent from arrival threshold to open maritime horizon.",
    zones: [
      {
        id: "living-volume",
        number: "01",
        name: "LIVING VOLUME",
        description:
          "Expansive double-height pavilion framed by floor-to-ceiling glass and reflection pools.",
        image: "/images/marine-house-living.jpg",
        aspect: "6.2M HEIGHT / SEAWARD ORIENTATION",
      },
      {
        id: "dining-cantilever",
        number: "02",
        name: "DINING CANTILEVER",
        description:
          "Suspended glass pavilion hovering over reflecting water with direct sunset alignments.",
        image: "/images/marine-house-dining.jpg",
        aspect: "CANTILEVERED WATER LEVEL / SEATING FOR 14",
      },
      {
        id: "primary-suite",
        number: "03",
        name: "PRIMARY SUITE",
        description:
          "Upper-level private sanctum offering unobstructed ocean vistas and secluded terrace access.",
        image: "/images/marine-house-suite.jpg",
        aspect: "UPPER ELEVATION / DEDICATED PRIVATE WING",
      },
      {
        id: "private-terrace",
        number: "04",
        name: "PRIVATE TERRACE",
        description:
          "Monolithic travertine pool deck terminating at the edge of the Arabian Sea.",
        image: "/images/marine-house-terrace.jpg",
        aspect: "OPEN HORIZON / COASTAL WATERFRONT",
      },
    ],
  },
  suite: {
    eyebrow: "05 / PRIMARY SUITE",
    headlineLines: ["PRIVACY,", "ABOVE THE WATER."],
    paragraph:
      "Elevated above the public entertaining volumes, the primary suite exists as a sanctuary of silence. Morning mist and sea breezes filter through slatted cedar screens.",
    image: "/images/marine-house-suite.jpg",
    imageAlt: "Primary bedroom suite with panoramic coastal views and private terrace",
    elevationNote: "LEVEL 02 / ELEVATION +8.4M",
  },
  ocean: {
    eyebrow: "06 / OCEAN TERRACE",
    headlineLines: ["THE HORIZON BECOMES", "PART OF THE ROOM."],
    image: "/images/marine-house-terrace.jpg",
    imageAlt: "Full-width architectural terrace overlooking the open Arabian Sea horizon",
    coordinateNote: "COASTAL HORIZON / 18.9220 N, 72.8347 E",
  },
  statement: {
    eyebrow: "07 / CLOSING STATEMENT",
    statementLines: ["BUILT AROUND", "LIGHT, WATER,", "AND SILENCE."],
    subtext: "THE MARINE HOUSE / MUMBAI / INDIA",
  },
  acquisition: {
    eyebrow: "08 / PRIVATE ACQUISITION",
    headlineLines: ["A PRIVATE", "RESIDENCE.", "A PRIVATE", "CONVERSATION."],
    paragraph:
      "Detailed property documentation and acquisition information are available to qualified clients through private inquiry.",
    ctaLabel: "BEGIN PRIVATE INQUIRY",
    inquiryHref: "mailto:concierge@aurelisestates.com?subject=Private%20Inquiry%20-%20The%20Marine%20House",
    contactNote: "AURELIS ESTATES PRIVATE ADVISORY / MUMBAI AND GLOBAL OFFICES",
  },
};
