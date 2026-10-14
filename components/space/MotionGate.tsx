"use client";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-space] layer: CSS animations inside a layer
 * only run while it is on screen (adds .is-playing). Renders nothing.
 */
export default function MotionGate() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-playing", e.isIntersecting)),
      { rootMargin: "120px 0px" }
    );
    document.querySelectorAll("[data-space]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
