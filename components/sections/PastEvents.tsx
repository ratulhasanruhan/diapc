import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import PhotoGallery from "@/components/ui/PhotoGallery";

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

function EventPhotoCard({ event, featured, priority }: { event: PastEventView; featured?: boolean; priority?: boolean }) {
  const href = event.recapUrl ?? event.url;
  return (
    <article className={`card flex h-full flex-col overflow-hidden ${featured ? "lg:col-span-2 lg:flex-row" : ""}`}>
      <PhotoGallery
        photos={event.photos}
        title={event.title}
        meta={event.dateLabel || "Date not recorded"}
        description={event.description}
        link={href ? { href, label: event.recapUrl ? "View recap" : "Event page" } : undefined}
        badge={<span className="border border-white/80 bg-white/95 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-ink shadow-sm">{event.dateLabel || "Undated"}</span>}
        priority={priority}
        sizes={featured ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
        className={featured ? "aspect-[4/3] w-full shrink-0 lg:aspect-auto lg:h-auto lg:min-h-[340px] lg:w-[58%] lg:self-stretch" : "aspect-[4/3] w-full"}
      />
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

/** Past events as a year-grouped timeline of photo cards. `compact` skips the year headings (homepage). */
export default function PastEvents({ events, compact = false, featureFirst = false }: { events: PastEventView[]; compact?: boolean; featureFirst?: boolean }) {
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
        <EventPhotoCard key={e.id} event={e} featured={firstFeatured && i === 0 && items.length > 1} priority={false} />
      ))}
    </div>
  );

  return (
    <>
      {compact ? (
        grid(events, featureFirst)
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
    </>
  );
}
