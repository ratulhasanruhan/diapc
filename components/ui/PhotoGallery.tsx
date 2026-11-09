"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

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

function GalleryModal({
  photos,
  index,
  title,
  meta,
  description,
  link,
  onIndex,
  onClose
}: {
  photos: GalleryPhoto[];
  index: number;
  title: string;
  meta?: string;
  description?: ReactNode;
  link?: { href: string; label: string };
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  const photo = photos[index];

  useEffect(() => {
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={`${title} photos`}
      className="m-auto h-dvh max-h-none w-screen max-w-none border-0 bg-[#0f1630] p-0 text-white backdrop:bg-black/70"
    >
      <div
        className="flex h-full flex-col lg:flex-row"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="relative min-h-0 flex-1">
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/70">
              {index + 1} / {n}
            </p>
            <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center border border-white/30 hover:bg-white/10 lg:hidden">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={photo.src} src={photo.src} alt={photo.alt} decoding="async" className="absolute inset-0 h-full w-full object-contain px-3 pb-16 pt-14 sm:px-16" />
          {n > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/40 hover:bg-white/20 sm:left-4">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/40 hover:bg-white/20 sm:right-4">
                <ChevronRight aria-hidden="true" />
              </button>
            </>
          )}
          {n > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex gap-2 overflow-x-auto px-3 py-3" role="group" aria-label="All photos">
              {photos.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${n}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => onIndex(i)}
                  className={`h-14 w-20 shrink-0 overflow-hidden border-2 ${i === index ? "border-white" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="flex max-h-[42dvh] w-full shrink-0 flex-col overflow-y-auto border-t border-white/15 bg-[#121a36] px-5 py-5 sm:px-6 lg:max-h-none lg:w-[380px] lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">{meta || "Details"}</p>
              <h2 className="mt-2 text-2xl leading-tight text-white">{title}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close details" className="hidden h-10 w-10 shrink-0 items-center justify-center border border-white/30 hover:bg-white/10 lg:flex">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          {photo.alt && <p className="mt-4 text-sm leading-6 text-white/90">{photo.alt}</p>}
          {description && <div className="mt-4 text-sm leading-6 text-white/75">{description}</div>}
          {link && (
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#9db7ff]">
              {link.label} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </aside>
      </div>
    </dialog>
  );
}

/**
 * Still frame for one photo, crossfading carousel for several.
 * Autoplay pauses while the modal is open and never runs for reduced motion.
 * Clicking a photo opens a modal with that image, the rest of the set, and the details.
 */
export default function PhotoGallery({
  photos,
  title,
  meta,
  description,
  link,
  badge,
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
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const many = photos.length > 1;
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const active = Math.min(index, Math.max(photos.length - 1, 0));

  useEffect(() => {
    if (!many || modal || reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [many, modal, reduced, photos.length, active]);

  if (!photos.length) {
    return (
      <div className={`relative flex items-center justify-center bg-[linear-gradient(135deg,#eef2ff,#fdf2f8)] font-mono text-xs uppercase tracking-widest text-[#5d6679] ${className}`}>
        Photos coming soon
      </div>
    );
  }

  const go = (dir: number) => setIndex((i) => (i + dir + photos.length) % photos.length);

  return (
    <>
      <div
        className={`relative overflow-hidden bg-[#e7ecf8] ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
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

        <button
          type="button"
          onClick={() => setModal(true)}
          aria-label={`Open photos and details for ${title}`}
          className="absolute inset-0 z-10 cursor-zoom-in"
        />

        {badge && <div className="pointer-events-none absolute left-3 top-3 z-20">{badge}</div>}

        {many && (
          <p className="pointer-events-none absolute right-3 top-3 z-20 bg-white/95 px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-ink shadow-sm">
            {active + 1} / {photos.length}
          </p>
        )}

        {many && (
          <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-1" role="group" aria-label="Choose a photo">
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
        )}
      </div>

      {modal && (
        <GalleryModal
          photos={photos}
          index={active}
          title={title}
          meta={meta}
          description={description}
          link={link}
          onIndex={setIndex}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}
