"use client";
import React, { useEffect, useRef } from "react";

/**
 * Fades content in when it scrolls into view. Content is fully visible without JS
 * (the hidden state only applies once the `js` class is set on <html>).
 *
 * Reliability: one shared IntersectionObserver (threshold 0, generous rootMargin) plus a
 * passive scroll/resize check that reveals anything at or above the viewport bottom. That
 * covers fast scrolling, anchor jumps, content-visibility sections and restored scroll positions.
 */
const pending = new Set<HTMLElement>();
let io: IntersectionObserver | null = null;
let listening = false;
let ticking = false;

function show(el: HTMLElement) {
  el.classList.add("is-visible");
  pending.delete(el);
  io?.unobserve(el);
}

function sweep() {
  ticking = false;
  const limit = window.innerHeight * 1.1;
  for (const el of pending) if (el.getBoundingClientRect().top < limit) show(el);
  if (!pending.size && listening) {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    listening = false;
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(sweep);
  }
}

function track(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") return show(el);
  io ??= new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)), { rootMargin: "0px 0px 15% 0px", threshold: 0 });
  pending.add(el);
  io.observe(el);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    listening = true;
  }
  onScroll();
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    track(el);
    return () => {
      pending.delete(el);
      io?.unobserve(el);
    };
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}