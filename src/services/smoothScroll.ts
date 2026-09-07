import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let refreshListener: (() => void) | null = null;
let resizeListener: (() => void) | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function getCurrentScroll(): number {
  if (lenisInstance) {
    return lenisInstance.scroll;
  }
  return typeof window !== "undefined" ? window.scrollY : 0;
}

const STORAGE_KEY = "aurelis-home-scroll-position";

interface SavedScrollState {
  scrollY: number;
  fromPath: string;
  targetPath: string;
  timestamp: number;
}

export function saveHomepageScroll(targetPath: string): void {
  if (typeof window === "undefined") return;
  try {
    const scrollY = getCurrentScroll();
    const state: SavedScrollState = {
      scrollY,
      fromPath: window.location.pathname,
      targetPath,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage unavailable or restricted
  }
}

export function getSavedHomepageScroll(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedScrollState;
    if (
      data &&
      typeof data.scrollY === "number" &&
      (data.targetPath === "/residences/the-marine-house" ||
        data.targetPath.startsWith("/journal"))
    ) {
      return data.scrollY;
    }
  } catch {
    // invalid JSON or storage blocked
  }
  return null;
}

export function clearSavedHomepageScroll(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function initSmoothScroll(): (() => void) | undefined {
  if (typeof window === "undefined") return undefined;

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return undefined;
  }

  // If already initialized, return cleanup
  if (lenisInstance) {
    return destroySmoothScroll;
  }

  // Configure Lenis with restrained luxury tuning
  const lenis = new Lenis({
    duration: 1.15, // Subtle continuous momentum without lag
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    syncTouch: false, // Keep touch scrolling native and responsive on mobile devices
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    autoRaf: false, // Driven strictly by GSAP ticker for a single unified animation loop
  });

  lenisInstance = lenis;

  // Synchronize Lenis scroll coordinates with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Hook Lenis into GSAP ticker so there is only one animation loop
  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // Disable lag smoothing to prevent desynchronization between RAF ticks and scroll physics
  gsap.ticker.lagSmoothing(0);

  // Synchronize resize events and trigger recalculations
  refreshListener = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener("refresh", refreshListener);

  resizeListener = () => {
    lenis.resize();
    ScrollTrigger.refresh();
  };
  window.addEventListener("resize", resizeListener);

  return destroySmoothScroll;
}

export function destroySmoothScroll(): void {
  if (resizeListener) {
    window.removeEventListener("resize", resizeListener);
    resizeListener = null;
  }

  if (refreshListener) {
    ScrollTrigger.removeEventListener("refresh", refreshListener);
    refreshListener = null;
  }

  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollToTarget(
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    immediate?: boolean;
    duration?: number;
  }
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      duration: options?.duration ?? 1.1,
    });
  } else {
    if (typeof target === "number") {
      window.scrollTo({
        top: target,
        behavior: options?.immediate ? "auto" : "smooth",
      });
    } else if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: options?.immediate ? "auto" : "smooth",
        });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({
        behavior: options?.immediate ? "auto" : "smooth",
      });
    }
  }
}
