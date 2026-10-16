import type { EventItem } from "@/lib/events";
import { formatDate, datePrecision } from "@/lib/events";
import type { PastEventView } from "@/components/sections/PastEvents";

/** Turns past events into the serializable shape the PastEvents component expects. */
export function toPastViews(events: EventItem[]): PastEventView[] {
  return events.map((e) => {
    const d = formatDate(e.date);
    const photos = [
      ...(e.cover ? [{ src: e.cover, alt: e.coverAlt ?? `Photo from ${e.title}` }] : []),
      ...(e.gallery ?? [])
    ].filter((p, i, a) => a.findIndex((x) => x.src === p.src) === i);
    return {
      id: e.id,
      title: e.title,
      dateLabel: d.precision === "unknown" ? "" : d.full,
      year: d.year,
      iso: datePrecision(e.date) === "day" ? e.date : undefined,
      venue: e.venue,
      wing: e.wing,
      description: e.description,
      url: e.url,
      recapUrl: e.recapUrl,
      photos
    };
  });
}
