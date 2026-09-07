export interface EditorialStory {
  id: string;
  number: string;
  category: string;
  titleLines: string[];
  descriptor: string;
  readTime: string;
  alignment: "left" | "right";
  image: {
    src: string;
    alt: string;
    caption: string;
    aspectRatio: string;
  };
}

export interface JournalContent {
  eyebrow: string;
  headlineLines: string[];
  supportingStatement: string;
  featuredStory: {
    number: string;
    category: string;
    titleLines: string[];
    supportingText: string;
    readTime: string;
    publication: string;
    image: {
      src: string;
      alt: string;
      caption: string;
    };
  };
  stories: EditorialStory[];
  closing: {
    headingLines: string[];
    subtext: string;
    linkLabel: string;
    linkHref: string;
  };
}

export const journalContent: JournalContent = {
  eyebrow: "06 / THE JOURNAL",
  headlineLines: ["THE AURELIS", "NOTEBOOK."],
  supportingStatement:
    "Observations on architecture, place, material, and the quiet details that shape exceptional living.",
  featuredStory: {
    number: "01",
    category: "01 / ARCHITECTURE",
    titleLines: ["THE QUIET POWER OF", "MONOLITHIC STONE."],
    supportingText:
      "How mass, proportion, and natural material can give contemporary architecture a sense of permanence.",
    readTime: "08 MIN READ",
    publication: "AURELIS JOURNAL",
    image: {
      src: "/images/the-desert-court.jpg",
      alt: "Monolithic stone architectural volumes in dialogue with natural desert light",
      caption: "ESSAY 01 / STRUCTURAL PERMANENCE & MASS",
    },
  },
  stories: [
    {
      id: "place",
      number: "02",
      category: "02 / PLACE",
      titleLines: ["WHEN A HOUSE BECOMES", "PART OF THE LANDSCAPE."],
      descriptor:
        "Architecture that begins with terrain rather than sitting on top of it.",
      readTime: "06 MIN READ",
      alignment: "left",
      image: {
        src: "/images/the-cliff-residence.jpg",
        alt: "Coastal residence embedded seamlessly into rugged maritime cliff",
        caption: "TOPOGRAPHY / COASTAL EMBEDMENT",
        aspectRatio: "aspect-[16/10]",
      },
    },
    {
      id: "material",
      number: "03",
      category: "03 / MATERIAL",
      titleLines: ["THE PATINA", "OF TIME."],
      descriptor:
        "Why natural materials become more compelling as they age.",
      readTime: "05 MIN READ",
      alignment: "right",
      image: {
        src: "/images/marine-house-dining.jpg",
        alt: "Honed Roman travertine, bronze joinery, and water reflection basin",
        caption: "MATERIALITY / SURFACE & WEATHERING",
        aspectRatio: "aspect-[4/3]",
      },
    },
    {
      id: "light",
      number: "04",
      category: "04 / LIGHT",
      titleLines: ["DESIGNING FOR THE", "LAST HOUR OF DAYLIGHT."],
      descriptor:
        "How changing light can become part of the architecture itself.",
      readTime: "07 MIN READ",
      alignment: "left",
      image: {
        src: "/images/marine-house-hero.jpg",
        alt: "Cantilevered stone pavilions glowing under the final coastal dusk light",
        caption: "DIURNAL CYCLES / DUSK HORIZON",
        aspectRatio: "aspect-[16/10]",
      },
    },
  ],
  closing: {
    headingLines: [
      "WORDS, IMAGES, AND OBSERVATIONS",
      "FROM THE AURELIS WORLD.",
    ],
    subtext:
      "An ongoing collection of ideas around architecture, landscape, material, and the experience of living well.",
    linkLabel: "EXPLORE THE JOURNAL",
    linkHref: "#journal",
  },
};
