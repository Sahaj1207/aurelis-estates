import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize whenever the address bar shows or hides. Refreshing
// pinned triggers on each of those makes the page visibly jump mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let refreshListener: (() => void) | null = null;
let resizeListener: (() => void) | null = null;
let resizeTimer: number | undefined;
let scrollLocks = 0;

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
      (data.targetPath.startsWith("/residences/the-marine-house") ||
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
    lerp: 0.095, // Continuous momentum that still tracks the wheel closely
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    syncTouch: false, // Keep touch scrolling native and responsive on mobile devices
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    autoRaf: false, // Driven strictly by GSAP ticker for a single unified animation loop
  });

  lenisInstance = lenis;
  if (scrollLocks > 0) lenis.stop();

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

  // Only a change in width alters layout; height-only changes are the mobile
  // address bar and must not trigger a refresh.
  let lastWidth = window.innerWidth;
  resizeListener = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 160);
  };
  window.addEventListener("resize", resizeListener);

  return destroySmoothScroll;
}

export function destroySmoothScroll(): void {
  window.clearTimeout(resizeTimer);

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

// Counted lock so overlapping owners (intro curtain, mobile menu) cannot
// release the page while another still needs it held.
export function lockScroll(): void {
  scrollLocks += 1;
  if (scrollLocks === 1) {
    lenisInstance?.stop();
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll(): void {
  if (scrollLocks === 0) return;
  scrollLocks -= 1;
  if (scrollLocks === 0) {
    lenisInstance?.start();
    document.documentElement.style.overflow = "";
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
      // Programmatic jumps must land even while the page is held by a scroll lock
      force: true,
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
