export interface ResidenceSpec {
  label: string;
  value: string;
}

export interface CollectionResidence {
  id: string;
  indexMarker: string;
  label: string;
  titleLines: string[];
  location: string;
  description: string;
  specs: ResidenceSpec[];
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  actionType: "link" | "status";
  actionLabel: string;
  actionHref?: string;
  layoutVariant: "wide-left" | "wide-right" | "offset-vertical" | "cinematic-panorama";
}

export const collectionIntroData = {
  sectionNumber: "04 / THE COLLECTION",
  headline: {
    line1: "A SMALLER NUMBER",
    line2: "OF EXCEPTIONAL PLACES.",
  },
  supportingCopy:
    "AURELIS represents residences selected for their architecture, setting, materiality, and sense of place.",
};

export const collectionResidencesData: CollectionResidence[] = [
  // 01: THE MARINE HOUSE (Flagship)
  {
    id: "the-marine-house",
    indexMarker: "01",
    label: "01 / PRIVATE RESIDENCE",
    titleLines: ["THE MARINE", "HOUSE."],
    location: "MUMBAI / INDIA",
    description:
      "A private coastal residence where monolithic stone, expansive glass, water, and tropical landscape converge around the changing light of the Arabian Sea.",
    specs: [
      { label: "Bedrooms", value: "6 BEDROOMS" },
      { label: "Internal Area", value: "8,420 SQ FT" },
      { label: "Status", value: "PRIVATE ACQUISITION" },
    ],
    image: {
      src: "/images/marine-house-hero.webp",
      alt: "The Marine House coastal residence pavilion and reflection pool at dusk in Mumbai",
      objectPosition: "center 50%",
    },
    actionType: "link",
    actionLabel: "VIEW RESIDENCE",
    actionHref: "/residences/the-marine-house",
    layoutVariant: "wide-left",
  },

  // 02: THE DESERT COURT
  {
    id: "the-desert-court",
    indexMarker: "02",
    label: "02 / PRIVATE RESIDENCE",
    titleLines: ["THE DESERT", "COURT."],
    location: "ALULA / SAUDI ARABIA",
    description:
      "A contemporary desert residence organized around shaded courtyards, carved stone, and long views across the surrounding landscape.",
    specs: [
      { label: "Bedrooms", value: "5 BEDROOMS" },
      { label: "Internal Area", value: "11,200 SQ FT" },
      { label: "Status", value: "CONFIDENTIAL COMMISSION" },
    ],
    image: {
      src: "/images/the-desert-court.webp",
      alt: "The Desert Court modernist residence with rammed earth walls and reflecting pool in AlUla",
      objectPosition: "center center",
    },
    actionType: "status",
    actionLabel: "PRIVATE PORTFOLIO",
    layoutVariant: "wide-right",
  },

  // 03: THE GARDEN HOUSE
  {
    id: "the-garden-house",
    indexMarker: "03",
    label: "03 / PRIVATE RESIDENCE",
    titleLines: ["THE GARDEN", "HOUSE."],
    location: "GOA / INDIA",
    description:
      "A private retreat where architecture dissolves into tropical planting, filtered light, and quiet garden rooms.",
    specs: [
      { label: "Bedrooms", value: "4 BEDROOMS" },
      { label: "Internal Area", value: "6,850 SQ FT" },
      { label: "Status", value: "CONFIDENTIAL COMMISSION" },
    ],
    image: {
      src: "/images/the-garden-house.webp",
      alt: "The Garden House tropical modernist villa with laterite stone and inner garden courtyard in Goa",
      objectPosition: "center center",
    },
    actionType: "status",
    actionLabel: "PRIVATE PORTFOLIO",
    layoutVariant: "offset-vertical",
  },

  // 04: THE CLIFF RESIDENCE
  {
    id: "the-cliff-residence",
    indexMarker: "04",
    label: "04 / PRIVATE RESIDENCE",
    titleLines: ["THE CLIFF", "RESIDENCE."],
    location: "AMALFI / ITALY",
    description:
      "A secluded coastal residence shaped by limestone, open terraces, and uninterrupted views across the Mediterranean.",
    specs: [
      { label: "Bedrooms", value: "7 BEDROOMS" },
      { label: "Internal Area", value: "9,600 SQ FT" },
      { label: "Status", value: "CONFIDENTIAL COMMISSION" },
    ],
    image: {
      src: "/images/the-cliff-residence.webp",
      alt: "The Cliff Residence limestone villa and cantilevered pool over the Mediterranean in Amalfi",
      objectPosition: "center center",
    },
    actionType: "status",
    actionLabel: "PRIVATE PORTFOLIO",
    layoutVariant: "cinematic-panorama",
  },
];

export const collectionOutroData = {
  headline: {
    line1: "SELECTED FOR",
    line2: "THE WAY THEY",
    line3: "MAKE PLACE MATTER.",
  },
  supportingCopy:
    "AURELIS approaches every residence as an individual architectural experience rather than a category of property.",
};
