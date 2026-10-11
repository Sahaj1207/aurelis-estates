export interface NavItem {
  label: string;
  href: string;
}

export interface EstateHeroData {
  brand: string;
  navItems: NavItem[];
  primaryAction: {
    label: string;
    href: string;
  };
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  supportingCopy: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    targetId: string;
  };
  meta: {
    location: string;
    property: string;
    classification: string;
    coordinates?: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

export const heroContent: EstateHeroData = {
  brand: "AURELIS ESTATES",
  navItems: [
    { label: "Residences", href: "#residences" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "#journal" },
  ],
  primaryAction: {
    label: "Private Inquiry",
    href: "/inquiry",
  },
  eyebrow: "AURELIS ESTATES / PRIVATE RESIDENCES",
  headline: {
    line1: "PRIVATE RESIDENCES.",
    line2: "DISTINCTIVE LIVING.",
  },
  supportingCopy: "Exceptional homes shaped by architecture, light, and place.",
  primaryCta: {
    label: "EXPLORE RESIDENCES",
    href: "#residences",
  },
  secondaryCta: {
    label: "SCROLL TO DISCOVER",
    targetId: "overview",
  },
  meta: {
    location: "MUMBAI / INDIA",
    property: "THE MARINE HOUSE",
    classification: "PRIVATE RESIDENCE",
    coordinates: "18.9220 N, 72.8347 E",
  },
  image: {
    src: "/images/marine-house-hero.webp",
    alt: "The Marine House contemporary private residence in Mumbai at sunset with cantilevered stone pavilions and reflection pool",
  },
};

export interface PropertySpec {
  label: string;
  value: string;
}

export interface FeaturedResidenceData {
  marker: string;
  property: string;
  location: string;
  description: string;
  specs: PropertySpec[];
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
    architecturalCropLabel?: string;
  };
}

export const featuredResidenceContent: FeaturedResidenceData = {
  marker: "02 / FEATURED RESIDENCE",
  property: "THE MARINE HOUSE",
  location: "MUMBAI / INDIA",
  description: "A private coastal residence where monolithic stone, expansive glass, water, and tropical landscape converge around the changing light of the Arabian Sea.",
  specs: [
    { label: "Accommodations", value: "6 BEDROOMS" },
    { label: "Interior Area", value: "8,420 SQ FT" },
    { label: "Typology", value: "PRIVATE RESIDENCE" },
    { label: "Acquisition", value: "PRIVATE ACQUISITION" },
  ],
  cta: {
    label: "VIEW RESIDENCE",
    href: "/residences/the-marine-house",
  },
  image: {
    src: "/images/marine-house-living.webp",
    alt: "Double-height living volume of The Marine House opening onto the reflection pool at dusk",
    architecturalCropLabel: "LIVING VOLUME / 18.9220 N, 72.8347 E",
  },
};

