"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** How far a section has travelled through the viewport, 0 to 1.
 *
 * 0 as its top reaches the bottom of the screen, 1 as its bottom leaves the
 * top. Stages use this to drive their own state, so scrolling is the input
 * device rather than a timer that runs whether or not anyone is watching. */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      frame.current = 0;
      const box = el.getBoundingClientRect();
      const span = box.height + window.innerHeight;
      if (span <= 0) return;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight - box.top) / span)));
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

/** Whether the element is close enough to the viewport to be worth running.
 * Stages are expensive; none of them should animate off-screen. */
export function useNearViewport(ref: RefObject<HTMLElement | null>, margin = "25%") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: `${margin} 0px ${margin} 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);

  return near;
}
