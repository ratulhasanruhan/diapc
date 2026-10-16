"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";

/** Serializable view of a past event (built on the server, rendered here). */
export type PastEventView = {
  id: string;
  title: string;
  /** "2026", "12 Mar 2026" or "" when unknown */
  dateLabel: string;
  year: string;
  /** ISO value for <time dateTime>, if known */
  iso?: string;
  venue?: string;
  wing?: string;
  description?: string;
  url?: string;
  recapUrl?: string;
  photos: { src: string; alt: string }[];
};

const isRemote = (src: string) => src.startsWith("http");

function Photo({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return isRemote(src) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 h-full w-full ${className}`} />
  ) : (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
  );
}

/** Lightweight lightbox on the native <dialog> element: Esc closes, arrows navigate, no dependencies. */
function Lightbox({ event, index, onIndex, onClose }: { event: PastEventView; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);
  const n = event.photos.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

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

  const p = event.photos[index];
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={`${event.title} photos`}
      className="m-auto h-dvh max-h-none w-screen max-w-none border-0 bg-[#0f1630]/95 p-0 text-white backdrop:bg-black/70"
    >
      <div
        className="relative flex h-full flex-col"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">{event.title}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">{event.dateLabel || "Date not recorded"} · {index + 1} / {n}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close photo viewer" className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 hover:bg-white/10"><X size={20} aria-hidden="true" /></button>
        </div>
        <div className="relative min-h-0 flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={p.src} src={p.src} alt={p.alt} decoding="async" className="absolute inset-0 h-full w-full object-contain px-2 pb-2 sm:px-16" />
          {n > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/40 hover:bg-white/20 sm:left-4"><ChevronLeft aria-hidden="true" /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/40 hover:bg-white/20 sm:right-4"><ChevronRight aria-hidden="true" /></button>
            </>
          )}
        </div>
        <p className="px-4 py-3 text-center text-xs leading-5 text-white/80 sm:text-sm">{p.alt}</p>
      </div>
    </dialog>
  );
}

function EventPhotoCard({ event, featured, onOpen, priority }: { event: PastEventView; featured?: boolean; onOpen: (i: number) => void; priority?: boolean }) {
  const cover = event.photos[0];
  const n = event.photos.length;
  return (
    <article className={`group card flex h-full flex-col overflow-hidden ${featured ? "lg:col-span-2 lg:flex-row" : ""}`}>
      <div className={`relative overflow-hidden bg-[linear-gradient(135deg,#eef2ff,#fdf2f8)] ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-[58%]" : "aspect-[4/3]"}`}>
        {cover ? (
          <button type="button" onClick={() => onOpen(0)} className="absolute inset-0 block h-full w-full cursor-zoom-in" aria-label={`Open photos from ${event.title}`}>
            <Photo src={cover.src} alt={cover.alt} priority={priority} sizes={featured ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f1630]/55 to-transparent" aria-hidden="true" />
          </button>
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-[#5d6679]">Photos coming soon</div>
        )}
        <span className="pointer-events-none absolute left-3 top-3 border border-white/80 bg-white/95 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-ink shadow-sm">{event.dateLabel || "Undated"}</span>
        {n > 1 && (
          <button type="button" onClick={() => onOpen(0)} className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1.5 text-xs font-bold text-ink shadow-sm hover:bg-white" aria-label={`View all ${n} photos from ${event.title}`}>
            <Images size={14} aria-hidden="true" /> {n} photos
          </button>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          {event.wing && <span className="font-mono text-[10px] uppercase tracking-widest text-brand-blue">{event.wing}</span>}
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Past event</span>
        </div>
        <h3 className={`mt-2 text-ink ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{event.title}</h3>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" />{event.iso ? <time dateTime={event.iso}>{event.dateLabel}</time> : <span>{event.dateLabel || "Date not recorded"}</span>}</span>
          {event.venue && <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{event.venue}</span>}
        </p>
        {event.description && <p className={`mt-3 text-sm leading-6 text-muted ${featured ? "" : "line-clamp-3"}`}>{event.description}</p>}
        {(event.recapUrl || event.url) && (
          <a href={event.recapUrl ?? event.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-brand-blue">
            {event.recapUrl ? "View recap" : "Event page"} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

/** Past events as a year-grouped timeline of photo cards with a lightbox. `compact` skips the year headings (homepage). */
export default function PastEvents({ events, compact = false }: { events: PastEventView[]; compact?: boolean }) {
  const [open, setOpen] = useState<{ id: string; i: number } | null>(null);
  const active = open ? events.find((e) => e.id === open.id) : undefined;
  const close = useCallback(() => setOpen(null), []);

  const groups: { year: string; items: PastEventView[] }[] = [];
  for (const e of events) {
    const y = e.year || "Undated";
    const g = groups.find((x) => x.year === y);
    if (g) g.items.push(e);
    else groups.push({ year: y, items: [e] });
  }

  const grid = (items: PastEventView[], firstFeatured: boolean) => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e, i) => (
        <EventPhotoCard key={e.id} event={e} featured={firstFeatured && i === 0 && items.length > 1} priority={false} onOpen={(idx) => setOpen({ id: e.id, i: idx })} />
      ))}
    </div>
  );

  return (
    <>
      {compact ? (
        grid(events, false)
      ) : (
        <div className="space-y-12">
          {groups.map((g) => (
            <section key={g.year} aria-labelledby={`yr-${g.year}`} className="relative lg:pl-24">
              <div className="mb-5 flex items-center gap-4 lg:absolute lg:left-0 lg:top-0 lg:mb-0 lg:flex-col lg:items-start lg:gap-2">
                <h3 id={`yr-${g.year}`} className="font-[family-name:var(--font-space)] text-4xl font-bold text-ink lg:text-3xl">{g.year}</h3>
                <span className="h-px flex-1 bg-line lg:hidden" aria-hidden="true" />
                <span className="hidden h-3 w-3 rounded-full border-2 border-white bg-brand-magenta shadow-[0_0_0_1px_#c7d2fe] lg:block" aria-hidden="true" />
              </div>
              <span className="absolute bottom-0 left-[3px] top-10 hidden w-px bg-line lg:block" aria-hidden="true" />
              {grid(g.items, false)}
            </section>
          ))}
        </div>
      )}
      {active && open && active.photos.length > 0 && <Lightbox event={active} index={open.i} onIndex={(i) => setOpen({ id: active.id, i })} onClose={close} />}
    </>
  );
}
