"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export type GalleryPhoto = { src: string; alt: string };

const ADVANCE_MS = 4000;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function FramePhoto({ src, alt, sizes, priority, hidden }: { src: string; alt: string; sizes: string; priority?: boolean; hidden: boolean }) {
  const className = "object-cover";
  if (src.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={hidden ? "" : alt} loading={priority ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 h-full w-full ${className}`} />
    );
  }
  return <Image src={src} alt={hidden ? "" : alt} fill sizes={sizes} priority={priority} className={className} />;
}

/**
 * Still frame for one photo, crossfading carousel for several.
 * Autoplay pauses while the frame is hovered, focused, or pinned open, and never runs for reduced motion.
 * Hover, focus, or the Details button reveals the caption already used on the card.
 */
export default function PhotoGallery({
  photos,
  title,
  meta,
  description,
  link,
  badge,
  onEnlarge,
  className = "aspect-[4/3] w-full",
  sizes,
  priority = false
}: {
  photos: GalleryPhoto[];
  title: string;
  meta?: string;
  description?: ReactNode;
  link?: { href: string; label: string };
  badge?: ReactNode;
  onEnlarge?: (index: number) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const many = photos.length > 1;
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [pinned, setPinned] = useState(false);
  const active = Math.min(index, Math.max(photos.length - 1, 0));
  const engaged = hover || focusWithin || pinned;
  const paused = engaged || reduced;
  const open = engaged;

  useEffect(() => {
    if (!many || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [many, paused, photos.length, active]);

  if (!photos.length) {
    return (
      <div className={`relative flex items-center justify-center bg-[linear-gradient(135deg,#eef2ff,#fdf2f8)] font-mono text-xs uppercase tracking-widest text-[#5d6679] ${className}`}>
        Photos coming soon
      </div>
    );
  }

  const go = (dir: number) => setIndex((i) => (i + dir + photos.length) % photos.length);

  return (
    <div
      className={`relative overflow-hidden bg-[#e7ecf8] ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        setPinned((p) => !p);
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={i !== active}
        >
          <FramePhoto src={photo.src} alt={photo.alt} sizes={sizes} priority={priority && i === 0} hidden={i !== active} />
        </div>
      ))}

      {badge && <div className="absolute left-3 top-3 z-20">{badge}</div>}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#0f1630]/50 to-transparent" aria-hidden="true" />

      {many && (
        <p className="absolute right-3 top-3 z-20 bg-white/95 px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-ink shadow-sm">
          {active + 1} / {photos.length}
        </p>
      )}

      <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-3">
        {many ? (
          <div className="flex items-center gap-1" role="group" aria-label="Choose a photo">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`Show photo ${i + 1} of ${photos.length}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span className={`h-2.5 w-2.5 rounded-full border-2 border-white ${i === active ? "bg-white" : "bg-white/35"}`} />
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? `Hide details for ${title}` : `Show details for ${title}`}
          onClick={() => setPinned((p) => !p)}
          className="border border-white/80 bg-white/95 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm hover:bg-white"
        >
          {pinned ? "Hide" : "Details"}
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={`absolute inset-x-2 bottom-14 z-10 max-h-[calc(100%-5.75rem)] overflow-hidden border border-white/80 bg-white/95 p-3 text-ink shadow-lg transition-opacity duration-300 motion-reduce:transition-none ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <p className="line-clamp-2 text-sm font-semibold leading-5">{title}</p>
        {meta && <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">{meta}</p>}
        {description && <div className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{description}</div>}
        {(link || onEnlarge) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {link && (
              <a href={link.href} tabIndex={open ? 0 : -1} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue">
                {link.label} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
            {onEnlarge && (
              <button type="button" tabIndex={open ? 0 : -1} onClick={() => onEnlarge(active)} className="text-xs font-bold text-ink underline-offset-2 hover:underline">
                View photo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
