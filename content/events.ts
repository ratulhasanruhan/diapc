/**
 * DPC events. Add real events here; the homepage, /events and /gallery read from this file.
 * - Upcoming vs past is decided automatically from `date` (and `endDate`).
 * - Entries with `sample: true` are placeholders shown with a "Sample" badge. Delete them once you add real ones.
 * Upcoming events from the AWS SBG Meetup group are merged in automatically (see lib/meetup.ts).
 */
export type EventPhoto = { src: string; alt: string };

export type DpcEvent = {
  id: string;
  title: string;
  /** ISO date or date-time, e.g. "2026-11-20" or "2026-11-20T15:00:00+06:00" */
  date: string;
  endDate?: string;
  venue?: string;
  description?: string;
  /** Registration / details link (Meetup, Facebook event, form…) */
  url?: string;
  /** Wing or team running it, e.g. "AWS SBG", "Competitive Programming" */
  wing?: string;
  /** Cover image in /public, e.g. "/events/orientation/cover.webp" */
  cover?: string;
  /** Photos for past events (shown as a gallery) */
  gallery?: EventPhoto[];
  /** Link to a recap post/album */
  recapUrl?: string;
  sample?: boolean;
};

export const events: DpcEvent[] = [
  {
    id: "sample-upcoming",
    title: "Sample upcoming event (replace me)",
    date: "2099-01-15",
    venue: "Venue name",
    description: "Short description of what attendees will learn or do.",
    wing: "General",
    sample: true
  },
  {
    id: "sample-past",
    title: "Sample past event with recap (replace me)",
    date: "2026-01-10",
    venue: "Venue name",
    description: "One or two lines summarising how it went.",
    wing: "General",
    gallery: [],
    sample: true
  }
];
