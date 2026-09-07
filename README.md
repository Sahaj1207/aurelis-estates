# AURELIS Estates

> Private residences. Considered living.

AURELIS Estates is a cinematic luxury real estate agency showcase built around architecture, materiality, light, and place.

Created as a fictional boutique real estate brand, the project explores how a digital property experience can feel closer to an architectural publication, private residence monograph, or luxury hospitality presentation than a conventional real estate website.

---

## Live Experience

**Production:** `https://aurelis-estates.vercel.app/`

---

## The Concept

AURELIS does not attempt to present dozens of properties.

It presents a smaller number of exceptional places.

The experience is intentionally quiet, editorial, and architecture-led. Large imagery, considered typography, spatial composition, and restrained motion are used to create a sense of place before information is introduced.

The design language is built around four ideas:

**PLACE**  
Architecture begins with where it stands.

**MATERIAL**  
Stone, glass, timber, metal, and water are treated as part of the experience.

**LIGHT**  
The changing quality of natural light becomes part of the visual narrative.

**SILENCE**  
The interface deliberately avoids visual noise, excessive decoration, and conventional real estate patterns.

---

## Featured Residence

### The Marine House

**Mumbai / India**

A private coastal residence where monolithic stone, expansive glass, water, and tropical landscape converge around the changing light of the Arabian Sea.

The Marine House is the flagship residence within the AURELIS collection.

**Property**

- 6 Bedrooms
- 8,420 sq ft
- Private Residence
- Private Acquisition
- Coastal Site
- Mumbai, India

---

## Experience Architecture

The website is structured as an editorial journey rather than a conventional collection of pages.

```text
AURELIS ESTATES
│
├── HOME
│   ├── Hero
│   ├── Portfolio Statement
│   ├── Featured Residence
│   ├── The Experience
│   ├── The Collection
│   ├── The AURELIS Approach
│   ├── The Journal
│   ├── Private Inquiry
│   └── Footer
│
├── ABOUT
│   ├── Manifesto
│   ├── The Office
│   ├── The Method
│   ├── The Collection
│   ├── What We Value
│   ├── The Private Office
│   └── Closing Statement
│
├── RESIDENCES
│   └── The Marine House
│       ├── Residence Statement
│       ├── Materiality
│       ├── Living
│       ├── Experience
│       ├── Suites
│       ├── Ocean
│       ├── Statement
│       └── Acquisition
│
├── JOURNAL
│   ├── The Quiet Power of Monolithic Stone
│   ├── When a House Becomes Part of the Landscape
│   ├── The Patina of Time
│   └── Designing for the Last Hour of Daylight
│
└── PRIVATE INQUIRY
```

---

## The Collection

AURELIS currently presents four fictional residences:

| Residence | Location |
|---|---|
| **The Marine House** | Mumbai, India |
| **The Desert Court** | AlUla, Saudi Arabia |
| **The Garden House** | Goa, India |
| **The Cliff Residence** | Amalfi, Italy |

Each property is presented through the same editorial philosophy while retaining its own relationship with landscape, architecture, and light.

---

## Design Direction

The visual identity intentionally avoids the familiar patterns of modern SaaS and template-driven websites.

### Typography

**Cormorant Garamond**

Used for:

- Hero typography
- Editorial headlines
- Statements
- Property titles

**Outfit**

Used for:

- Navigation
- Metadata
- Labels
- Supporting copy
- Interface elements

### Palette

The interface uses a restrained architectural palette:

- Warm ivory
- Deep charcoal
- Obsidian
- Stone
- Muted sand
- Champagne-inspired accents

### Visual Principles

- Architecture before decoration
- Large editorial typography
- Strong negative space
- Asymmetric composition
- Image-led storytelling
- Restrained interface chrome
- Material-driven visual language
- Minimal use of conventional cards
- No unnecessary gradients
- No excessive glassmorphism
- No decorative visual noise

---

## Motion Design

Motion is treated as part of the architectural language.

The goal is not to make the interface feel animated.

The goal is to make it feel **alive**.

### Motion systems include

- GSAP
- ScrollTrigger
- Lenis smooth scrolling
- Cinematic scroll sequences
- Editorial entrance reveals
- Image clip transitions
- Subtle image scaling
- Crossfading property imagery
- Smooth anchor navigation
- Interactive residence zones
- Mobile navigation transitions
- Reduced-motion support

The motion system deliberately favors:

```text
slow
precise
cinematic
spatial
restrained
```

rather than:

```text
flashy
bouncy
constant
decorative
```

---

## Interactive Residence Experience

The Marine House experience contains an interactive architectural sequence.

Users can explore individual areas of the residence through coordinated imagery:

```text
ZONE 01
LIVING VOLUME
        ↓
Living imagery

ZONE 02
DINING CANTILEVER
        ↓
Dining imagery

ZONE 03
PRIMARY SUITE
        ↓
Suite imagery

ZONE 04
PRIVATE TERRACE
        ↓
Terrace imagery
```

The transitions use coordinated image crossfades and subtle scale movement rather than abrupt image replacement.

The interaction also supports:

- Pointer interaction
- Keyboard focus
- Mobile interaction
- Reduced-motion preferences

---

## Journal

The journal is designed as an editorial archive rather than a conventional blog.

### Featured

**The Quiet Power of Monolithic Stone**

Architecture / 08 Min Read

### Additional Essays

**When a House Becomes Part of the Landscape**

Place

**The Patina of Time**

Material

**Designing for the Last Hour of Daylight**

Light

The articles extend the visual language of the properties into editorial storytelling.

---

## Technology

### Core

- React 19
- TypeScript
- Vite

### Motion

- GSAP
- GSAP ScrollTrigger
- Lenis

### Styling

- Tailwind CSS

### Icons

- Phosphor Icons

### Deployment

- Vercel
- GitHub

---

## Project Structure

```text
aurelis-estates/
│
├── .agents/
│   └── skills/
│       └── design-taste-frontend/
│
├── public/
│   ├── images/
│   └── models/
│
├── src/
│   ├── components/
│   │   ├── about/
│   │   ├── editorialJourney/
│   │   ├── journey/
│   │   ├── marineHouse/
│   │   └── ...
│   │
│   ├── data/
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### TypeScript Validation

```bash
npx tsc -b
```

### Lint

```bash
npm run lint
```

---

## Quality Assurance

The project was reviewed across responsive breakpoints including:

```text
375px
390px
430px
768px
1024px
1440px
```

Production validation includes:

- TypeScript compilation
- ESLint validation
- Production build
- Route verification
- Image asset verification
- Responsive layout review
- Animation review
- Reduced-motion behavior
- Mobile navigation behavior
- Horizontal overflow checks

---

## Routes

```text
/
 /about
 /inquiry
 /residences/the-marine-house

 /journal/quiet-power-of-monolithic-stone
 /journal/when-a-house-becomes-part-of-the-landscape
 /journal/the-patina-of-time
 /journal/designing-for-the-last-hour-of-daylight
```

---

## Performance Philosophy

The project favors perceived quality over visual excess.

Images are treated as primary content.

Animations are introduced only where they contribute to:

- Hierarchy
- Orientation
- Storytelling
- Spatial continuity
- Interaction feedback

The interface intentionally avoids unnecessary animation and decorative effects.

---

## Accessibility & Resilience

The experience includes consideration for:

- Keyboard interaction
- Focus states
- Reduced-motion preferences
- Responsive navigation
- Mobile interaction
- Touch behavior
- Responsive typography
- Overflow prevention

Reduced-motion users receive a simplified experience rather than being forced through cinematic scroll behavior.

---

## Deployment

AURELIS Estates is deployed through Vercel and connected directly to the GitHub repository.

The `main` branch represents the production release.

Future branches can be used for isolated design experiments and preview deployments without disturbing the production experience.

---

## Project Status

### Portfolio Ready

The current version represents the completed showcase release.

The project has been intentionally frozen after visual, responsive, functional, and production checks.

Future development should prioritize refinement over feature expansion.

---

## Creative Direction

AURELIS Estates was conceived around a simple principle:

> Exceptional places deserve a quieter digital presence.

The interface takes inspiration from architectural monographs, luxury hospitality, private residence brochures, and contemporary architecture studios.

The result is intended to feel:

**Architectural.**  
**Editorial.**  
**Cinematic.**  
**Restrained.**  
**Human.**

---

## Disclaimer

AURELIS Estates is a fictional real estate brand created as a frontend design and development showcase.

All properties, locations, descriptions, brand materials, and real estate information presented within the project are fictional.

---

## License

This project is a personal portfolio showcase.

The design, brand identity, fictional property content, and original implementation are not intended for commercial real estate use.
