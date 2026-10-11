export interface AboutPrinciple {
  number: string;
  name: string;
  question: string;
  aspect: string;
}

export interface AboutContentData {
  manifesto: {
    meta: string;
    headlineLines: string[];
    paragraph: string;
  };
  office: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    secondaryStatement: string;
    annotation: string;
  };
  method: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    principles: AboutPrinciple[];
  };
  curation: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    image: string;
    imageAlt: string;
    caption: string;
  };
  values: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    statements: string[];
  };
  privateOffice: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
    protocol: string;
  };
  closing: {
    number: string;
    eyebrow: string;
    headlineLines: string[];
    supportingLine: string;
    edition: string;
  };
}

export const aboutContent: AboutContentData = {
  manifesto: {
    meta: "AURELIS ESTATES / PRIVATE RESIDENCES",
    headlineLines: ["AN APPROACH TO LIVING,", "CONSIDERED."],
    paragraph:
      "AURELIS ESTATES exists for a smaller number of residences, chosen for their architecture, their setting, and the quality of life they make possible.",
  },
  office: {
    number: "01",
    eyebrow: "01 / THE OFFICE",
    headlineLines: ["WE LOOK BEYOND", "THE PROPERTY."],
    paragraph:
      "AURELIS approaches residential property as an architectural experience. We consider the relationship between structure and landscape, material and light, privacy and everyday life.",
    secondaryStatement: "NOT MORE. BETTER CONSIDERED.",
    annotation: "CURATORIAL ADVISORY / MUMBAI / GLOBAL",
  },
  method: {
    number: "02",
    eyebrow: "02 / THE METHOD",
    headlineLines: ["EVERY RESIDENCE", "BEGINS WITH A QUESTION."],
    principles: [
      {
        number: "01",
        name: "PLACE",
        question:
          "Where does the architecture belong, and what does the landscape ask of it?",
        aspect: "TOPOGRAPHY / CONTEXT",
      },
      {
        number: "02",
        name: "MATERIAL",
        question:
          "What will become more beautiful through time, weather, and use?",
        aspect: "TACTILITY / PERMANENCE",
      },
      {
        number: "03",
        name: "LIGHT",
        question: "How does the residence change from morning to dusk?",
        aspect: "SOLAR ORIENTATION / SHADOW",
      },
      {
        number: "04",
        name: "LIFE",
        question:
          "How does the architecture make ordinary moments feel considered?",
        aspect: "HABITATION / RITUAL",
      },
    ],
  },
  curation: {
    number: "03",
    eyebrow: "03 / THE COLLECTION",
    headlineLines: ["A SMALLER NUMBER", "OF EXCEPTIONAL PLACES."],
    paragraph:
      "We do not build a catalogue for its own sake. The AURELIS collection is deliberately selective, bringing together residences whose architecture, setting, and atmosphere deserve closer attention.",
    image: "/images/marine-house-entry.webp",
    imageAlt:
      "Monolithic stone entry courtyard with sheltered architectural portal and reflecting pool",
    caption: "PLATE I / MONOLITHIC MASSING AND SHELTERED ENTRANCE",
  },
  values: {
    number: "04",
    eyebrow: "04 / WHAT WE VALUE",
    headlineLines: ["ARCHITECTURE", "SHOULD AGE WELL."],
    statements: [
      "Material should gather character.",
      "Landscape should feel inseparable from the house.",
      "Privacy should never require spectacle.",
      "Luxury can be measured in what is left untouched.",
    ],
  },
  privateOffice: {
    number: "05",
    eyebrow: "05 / THE PRIVATE OFFICE",
    headlineLines: ["DISCUSSIONS BEGIN", "IN CONFIDENCE."],
    paragraph:
      "Private residences are introduced selectively and discussed with discretion. For clients seeking a residence of uncommon character, the first conversation begins privately.",
    ctaLabel: "BEGIN PRIVATE INQUIRY",
    ctaHref: "/inquiry",
    protocol: "DISCRETIONARY ENGAGEMENT / DIRECT ADVISORY",
  },
  closing: {
    number: "06",
    eyebrow: "06 / CLOSING STATEMENT",
    headlineLines: ["THE RIGHT PLACE", "CHANGES THE WAY", "LIFE IS LIVED."],
    supportingLine: "AURELIS ESTATES / PRIVATE RESIDENCES",
    edition: "PORTFOLIO EDITION 2026 / GLOBAL",
  },
};
