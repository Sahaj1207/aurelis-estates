# AURELIS Estates

A concept site for a private residential portfolio: a cinematic homepage, a flagship
residence monograph, a journal, an about page and a private inquiry page.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, GSAP ScrollTrigger and Lenis.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Images

Photograph masters live in `source-images/`. The site serves responsive WebP
renditions from `public/images/`, generated with:

```bash
npm run images
```

Add or replace a master, run the script, and reference the result as
`/images/<name>.webp` — the `Img` component adds the 800w rendition automatically.

## Structure

- `src/App.tsx` — route shell, intro curtain and cross-route transition
- `src/pages/HomePage.tsx` — homepage composition
- `src/components/*` — one folder per section or route
- `src/services/smoothScroll.ts` — Lenis + ScrollTrigger wiring and scroll locking
- `src/data/*` — all copy and content

## Deploy

Deployed on Vercel. `vercel.json` rewrites every path to `index.html` so deep links
such as `/about` or `/residences/the-marine-house` resolve on a hard refresh.
