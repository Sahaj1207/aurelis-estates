export interface ArticleSectionData {
  title: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    caption: string;
    aspectRatio?: string;
    oversized?: boolean;
  };
}

export interface JournalArticleData {
  slug: string;
  number: string;
  category: string;
  readTime: string;
  publication: string;
  year: string;
  titleLines: string[];
  intro: string;
  heroImage: {
    src: string;
    alt: string;
    caption: string;
  };
  section1: ArticleSectionData;
  pullQuote: string;
  section2: ArticleSectionData;
  section3: ArticleSectionData;
  section4: ArticleSectionData;
  closing: {
    label: string;
    statementLines: string[];
    supportingCopy: string;
  };
  nextArticle: {
    label: string;
    category: string;
    titleLines: string[];
    slug: string;
    image: string;
  };
}

export const monolithicStoneArticle: JournalArticleData = {
  slug: "quiet-power-of-monolithic-stone",
  number: "01",
  category: "01 / ARCHITECTURE",
  readTime: "08 MIN READ",
  publication: "AURELIS JOURNAL",
  year: "2026",
  titleLines: ["THE QUIET POWER OF", "MONOLITHIC STONE."],
  intro:
    "How mass, proportion, and natural material can give contemporary architecture a sense of permanence.",
  heroImage: {
    src: "/images/the-desert-court.webp",
    alt: "Monolithic stone architectural volumes in dialogue with natural desert light",
    caption: "MATERIAL STUDY / MONOLITHIC MASSING & SHADOW",
  },
  section1: {
    title: "THE WEIGHT OF MATERIAL",
    paragraphs: [
      "Stone has a way of changing how a room is understood.",
      "Its presence is immediate. A wall becomes more than a boundary. A floor becomes part of the landscape. Surfaces carry the memory of their origin and, over time, gather the marks that make a place feel lived in.",
      "For AURELIS, material is never simply a finish. It is part of the architecture's identity.",
    ],
    image: {
      src: "/images/marine-house-dining.webp",
      alt: "Honed Roman travertine, bronze joinery, and water reflection basin",
      caption: "MATERIAL STUDY / ROMAN TRAVERTINE & WATER",
      aspectRatio: "aspect-[4/3]",
    },
  },
  pullQuote:
    "THE MATERIAL SHOULD FEEL AS THOUGH IT BELONGED THERE BEFORE THE HOUSE DID.",
  section2: {
    title: "MASS AND PROPORTION",
    paragraphs: [
      "Contemporary architecture often searches for lightness.",
      "Glass expands. Steel disappears. Structure is reduced until the building seems to hover.",
      "There is another kind of confidence in architecture that allows mass to remain visible.",
      "Monolithic forms establish rhythm, shadow, and permanence. Their weight gives the surrounding landscape something against which to be understood.",
    ],
    image: {
      src: "/images/the-cliff-residence.webp",
      alt: "Monolithic coastal residence embedded into rugged rock face",
      caption: "LIGHT & MASS / MONOLITHIC PROPORTION",
      aspectRatio: "aspect-[16/10]",
    },
  },
  section3: {
    title: "A MATERIAL THAT AGES",
    paragraphs: [
      "The most compelling materials do not remain unchanged.",
      "Stone absorbs light differently as the day moves across a facade. Edges soften. Surfaces weather. Small imperfections accumulate.",
      "This is not deterioration.",
      "It is character.",
      "A residence becomes more personal when its materials are allowed to belong to time rather than resist it.",
    ],
    image: {
      src: "/images/marine-house-entry.webp",
      alt: "Textured travertine entrance court and monolithic stone portals",
      caption: "SURFACE / NATURAL WEATHERING & TEXTURE",
      aspectRatio: "aspect-[4/3]",
    },
  },
  section4: {
    title: "BUILT TO REMAIN",
    paragraphs: [
      "Luxury architecture does not need to compete with its surroundings.",
      "The most enduring residences often feel inevitable, as though the landscape had been waiting for the architecture to arrive.",
      "Mass, proportion, shadow, and material work quietly together.",
      "The result is not a house designed to impress for a moment.",
      "It is a place designed to remain.",
    ],
    image: {
      src: "/images/marine-house-hero.webp",
      alt: "Cantilevered stone pavilions and calm water reflection at sunset",
      caption: "ARCHITECTURAL TIME / CONTINUITY & SETTING",
      aspectRatio: "aspect-[21/9]",
      oversized: true,
    },
  },
  closing: {
    label: "AURELIS JOURNAL",
    statementLines: ["ARCHITECTURE BECOMES", "TIME MADE VISIBLE."],
    supportingCopy:
      "The most enduring residences are not designed only for the moment they are completed. They are designed for everything that comes after.",
  },
  nextArticle: {
    label: "NEXT OBSERVATION",
    category: "02 / PLACE",
    titleLines: ["WHEN A HOUSE BECOMES", "PART OF THE LANDSCAPE."],
    slug: "when-a-house-becomes-part-of-the-landscape",
    image: "/images/the-cliff-residence.webp",
  },
};

export const landscapeArticle: JournalArticleData = {
  slug: "when-a-house-becomes-part-of-the-landscape",
  number: "02",
  category: "02 / PLACE",
  readTime: "06 MIN READ",
  publication: "AURELIS JOURNAL",
  year: "2026",
  titleLines: ["WHEN A HOUSE BECOMES", "PART OF THE LANDSCAPE."],
  intro:
    "Architecture that begins with terrain rather than sitting on top of it.",
  heroImage: {
    src: "/images/the-cliff-residence.webp",
    alt: "Coastal residence embedded seamlessly into rugged maritime cliff",
    caption: "TOPOGRAPHY STUDY / COASTAL EMBEDMENT",
  },
  section1: {
    title: "THE DIALOGUE WITH TERRAIN",
    paragraphs: [
      "Building into topography requires listening before designing.",
      "Contour lines, natural rocky outcrops, and wind patterns dictate the orientation of every pavilion. The structure does not conquer the hill; it embeds into it.",
      "At AURELIS, topography is considered the first building block of any private estate.",
    ],
    image: {
      src: "/images/the-garden-house.webp",
      alt: "Pavilion resting gently in native coastal vegetation",
      caption: "SITE SURVEY / PROTECTED FLORA & ELEVATION",
      aspectRatio: "aspect-[16/10]",
    },
  },
  pullQuote:
    "THE LANDSCAPE WAS NOT MADE FOR THE HOUSE. THE HOUSE WAS MADE FOR THE LANDSCAPE.",
  section2: {
    title: "SHELTER AND HORIZON",
    paragraphs: [
      "A coastal home must balance total immersion with sheltered enclosure.",
      "By using sunken courts and stepped stone terraces, architecture offers sanctuary from sea winds while framing uninterrupted vistas.",
      "The line between natural ground and crafted terrace dissolves.",
    ],
    image: {
      src: "/images/marine-house-terrace.webp",
      alt: "Stone terrace overlooking open ocean horizon",
      caption: "HORIZON ALIGNMENT / STEPPED TERRACES",
      aspectRatio: "aspect-[16/10]",
    },
  },
  section3: {
    title: "FLORA AS ARCHITECTURAL SKIN",
    paragraphs: [
      "Vegetation should never feel like an afterthought or cosmetic landscaping.",
      "Indigenous trees and coastal grasses root the architectural mass into its ecosystem, softening monolithic edges.",
      "Over seasons, the boundary between wilderness and cultivation softens entirely.",
    ],
    image: {
      src: "/images/marine-house-dining.webp",
      alt: "Gardens and reflection basins enveloping stone architecture",
      caption: "BOTANICAL HARMONY / INDIGENOUS SPECIES",
      aspectRatio: "aspect-[4/3]",
    },
  },
  section4: {
    title: "THE INEVITABLE HOUSE",
    paragraphs: [
      "When a house is properly designed for its terrain, it looks as though it could exist nowhere else.",
      "It belongs entirely to its coordinates.",
      "This is the standard of living we champion: architecture that is inseparable from place.",
    ],
    image: {
      src: "/images/the-desert-court.webp",
      alt: "Desert pavilion in harmony with earth and sky",
      caption: "TERRITORIAL HARMONY / MONOLITHIC SANCTUARY",
      aspectRatio: "aspect-[21/9]",
      oversized: true,
    },
  },
  closing: {
    label: "AURELIS JOURNAL",
    statementLines: ["ARCHITECTURE AS", "AN EXTENSION OF NATURE."],
    supportingCopy:
      "When terrain and structure coalesce, the home becomes a natural sanctuary rather than an artificial imposition.",
  },
  nextArticle: {
    label: "NEXT OBSERVATION",
    category: "03 / MATERIAL",
    titleLines: ["THE PATINA", "OF TIME."],
    slug: "the-patina-of-time",
    image: "/images/marine-house-dining.webp",
  },
};

export const patinaOfTimeArticle: JournalArticleData = {
  slug: "the-patina-of-time",
  number: "03",
  category: "03 / MATERIAL",
  readTime: "05 MIN READ",
  publication: "AURELIS JOURNAL",
  year: "2026",
  titleLines: ["THE PATINA", "OF TIME."],
  intro:
    "Why natural materials become more compelling as they age.",
  heroImage: {
    src: "/images/marine-house-dining.webp",
    alt: "Honed Roman travertine, bronze joinery, and water reflection basin",
    caption: "MATERIAL STUDY / HONED TRAVERTINE & BASALT",
  },
  section1: {
    title: "MATERIALS THAT REMEMBER",
    paragraphs: [
      "A beautiful material does not remain beautiful by staying unchanged.",
      "Stone gathers traces of weather. Timber deepens in tone. Metal develops a surface shaped by touch, moisture, and time.",
      "These changes are not imperfections to be corrected.",
      "They are evidence that the architecture is being lived in.",
    ],
    image: {
      src: "/images/the-desert-court.webp",
      alt: "Travertine massing and sunlight shadow study",
      caption: "MATERIAL STUDY / SURFACE & TIME",
      aspectRatio: "aspect-[4/3]",
    },
  },
  pullQuote:
    "TIME SHOULD ADD CHARACTER, NOT TAKE IT AWAY.",
  section2: {
    title: "THE BEAUTY OF IMPERFECTION",
    paragraphs: [
      "Perfect surfaces can feel strangely distant.",
      "The quiet irregularity of natural materials gives a residence another kind of richness. A variation in stone. A softened edge. A subtle shift in colour from one surface to the next.",
      "These details create depth because they cannot be reproduced exactly.",
      "Architecture becomes more human when material is allowed to remain material.",
    ],
    image: {
      src: "/images/marine-house-entry.webp",
      alt: "Textured travertine entrance court and monolithic stone portals",
      caption: "NATURAL MATERIAL / VARIATION & CHARACTER",
      aspectRatio: "aspect-[16/10]",
    },
  },
  section3: {
    title: "DESIGNED TO WEATHER",
    paragraphs: [
      "The most considered residences anticipate change.",
      "Materials are selected not only for how they look when newly installed, but for how they will respond to sun, rain, salt, humidity, touch, and seasons.",
      "A surface that becomes richer with age is more valuable than one that simply survives it.",
      "This is architecture designed with time in mind.",
    ],
    image: {
      src: "/images/marine-house-suite.webp",
      alt: "Private sanctum with natural timber slats and stone surfaces",
      caption: "WEATHERED TEXTURE / AGED TIMBER & STONE",
      aspectRatio: "aspect-[4/3]",
    },
  },
  section4: {
    title: "A QUIETER KIND OF LUXURY",
    paragraphs: [
      "Luxury is often associated with perfection.",
      "But permanence asks for something different.",
      "It asks for materials with enough character to age honestly, and architecture with enough restraint to let those materials speak.",
      "The result is a residence that does not become dated.",
      "It becomes more itself.",
    ],
    image: {
      src: "/images/the-cliff-residence.webp",
      alt: "Monolithic stone residence enduring against coastal elements",
      caption: "WEATHERED MASS / PERMANENCE ACROSS TIME",
      aspectRatio: "aspect-[21/9]",
      oversized: true,
    },
  },
  closing: {
    label: "AURELIS JOURNAL",
    statementLines: [
      "THE BEST MATERIALS",
      "BECOME MORE",
      "THEMSELVES WITH TIME.",
    ],
    supportingCopy:
      "AURELIS selects materials for the life they will have after completion, not only for the moment they are first seen.",
  },
  nextArticle: {
    label: "NEXT OBSERVATION",
    category: "04 / LIGHT",
    titleLines: [
      "DESIGNING FOR THE LAST HOUR",
      "OF DAYLIGHT.",
    ],
    slug: "designing-for-the-last-hour-of-daylight",
    image: "/images/marine-house-hero.webp",
  },
};

export const lastHourDaylightArticle: JournalArticleData = {
  slug: "designing-for-the-last-hour-of-daylight",
  number: "04",
  category: "04 / LIGHT",
  readTime: "07 MIN READ",
  publication: "AURELIS JOURNAL",
  year: "2026",
  titleLines: ["DESIGNING FOR THE", "LAST HOUR OF DAYLIGHT."],
  intro:
    "How changing light can become part of the architecture itself.",
  heroImage: {
    src: "/images/marine-house-hero.webp",
    alt: "Cantilevered stone pavilions glowing under the final coastal dusk light",
    caption: "DUSK APERTURE / GOLDEN HOUR REFLECTION",
  },
  section1: {
    title: "ARCHITECTURE FOLLOWS THE SUN",
    paragraphs: [
      "A residence is never experienced under one light.",
      "Morning arrives differently from afternoon. Evening changes the colour of stone, glass, water, and timber. A room that feels expansive at noon can become intimate as the sun disappears.",
      "For AURELIS, daylight is not simply something that enters architecture.",
      "It is part of the architecture.",
    ],
    image: {
      src: "/images/marine-house-living.webp",
      alt: "Double-height interior volume illuminated by shifting sea light",
      caption: "DIURNAL STUDY / MOVEMENT OF LIGHT",
      aspectRatio: "aspect-[16/10]",
    },
  },
  pullQuote:
    "THE MOST MEMORABLE ROOMS CHANGE AS THE DAY CHANGES.",
  section2: {
    title: "THE LAST HOUR",
    paragraphs: [
      "There is a particular quality to the final hour of daylight.",
      "Shadows lengthen. Reflections become deeper. Warmth gathers across surfaces before gradually giving way to artificial light.",
      "Good architecture does not fight this transition.",
      "It makes room for it.",
    ],
    image: {
      src: "/images/marine-house-terrace.webp",
      alt: "Terrace and reflection basin holding the fading sky light at dusk",
      caption: "DUSK HORIZON / REFLECTION & SHADOW",
      aspectRatio: "aspect-[16/10]",
    },
  },
  section3: {
    title: "LIGHT AS MATERIAL",
    paragraphs: [
      "Light can give stone softness.",
      "It can turn water into a mirror, make a concrete wall appear almost weightless, or reveal the grain of timber across an interior.",
      "Its effect is temporary, but its influence on a space can be lasting.",
      "The best interiors are designed to receive these changes rather than remain visually fixed.",
    ],
    image: {
      src: "/images/the-desert-court.webp",
      alt: "Sunlight and dramatic shadow geometry across honed stone wall",
      caption: "ILLUMINATION AXIS / STONE & SHADOW",
      aspectRatio: "aspect-[4/3]",
    },
  },
  section4: {
    title: "DESIGNING FOR DUSK",
    paragraphs: [
      "The transition between daylight and night is often where a residence reveals its character.",
      "Interior illumination begins to meet the fading horizon. Reflections appear in glass. Pools hold the last fragments of the sky.",
      "This is not decoration.",
      "It is atmosphere created through proportion, orientation, material, and restraint.",
      "A residence should have a different presence at dusk than it does at noon.",
    ],
    image: {
      src: "/images/the-garden-house.webp",
      alt: "Quiet stone pavilion resting in soft evening garden atmosphere",
      caption: "EVENING HORIZON / ILLUMINATION & RESTRAINT",
      aspectRatio: "aspect-[21/9]",
      oversized: true,
    },
  },
  closing: {
    label: "AURELIS JOURNAL",
    statementLines: [
      "DESIGN THE ROOM.",
      "THEN LET THE DAY",
      "COMPLETE IT.",
    ],
    supportingCopy:
      "Architecture can establish the conditions for beauty, but light is what continually changes the experience.",
  },
  nextArticle: {
    label: "NEXT OBSERVATION",
    category: "01 / ARCHITECTURE",
    titleLines: ["THE QUIET POWER OF", "MONOLITHIC STONE."],
    slug: "quiet-power-of-monolithic-stone",
    image: "/images/the-desert-court.webp",
  },
};

export const journalArticlesMap: Record<string, JournalArticleData> = {
  "quiet-power-of-monolithic-stone": monolithicStoneArticle,
  "when-a-house-becomes-part-of-the-landscape": landscapeArticle,
  "the-patina-of-time": patinaOfTimeArticle,
  "designing-for-the-last-hour-of-daylight": lastHourDaylightArticle,
};
