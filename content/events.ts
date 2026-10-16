/**
 * DPC events. The homepage, /events and /gallery read from this file.
 * - `date` can be a full ISO date ("2026-11-20"), a date-time, a year only ("2025") when the exact day is not on record,
 *   or "" when no date is on record. Year-only and undated entries are shown as such, never with an invented day.
 * - Upcoming vs past is decided automatically from `date`/`endDate`; set `past: true` to force an entry into the archive.
 * Upcoming events from the AWS SBG Meetup group are merged in automatically (see lib/meetup.ts).
 */
export type EventPhoto = { src: string; alt: string };

export type DpcEvent = {
  id: string;
  title: string;
  /** ISO date, date-time, "YYYY", or "" if unknown */
  date: string;
  endDate?: string;
  venue?: string;
  description?: string;
  /** Registration / details link (Meetup, Facebook event, form...) */
  url?: string;
  /** Wing or team running it, e.g. "AWS SBG", "Competitive Programming" */
  wing?: string;
  /** Cover image in /public, e.g. "/events/orientation/cover.webp" */
  cover?: string;
  /** Alt text for the cover image */
  coverAlt?: string;
  /** Photos for past events (shown as a gallery) */
  gallery?: EventPhoto[];
  /** Link to a recap post/album */
  recapUrl?: string;
  /** Force into the past-events archive (for year-only or undated entries) */
  past?: boolean;
  sample?: boolean;
};

export const events: DpcEvent[] = [
  {
    id: "coding-fest-2026-grand-finale",
    title: "Coding Fest 2026: Grand Finale",
    date: "2026",
    past: true,
    venue: "Daffodil International Academy",
    description: "The grand finale of Coding Fest 2026 at Daffodil International Academy, with finalists receiving their certificates on stage.",
    gallery: [
      { src: "/events/coding-fest-2026-grand-finale/1.webp", alt: "Coding Fest 2026 finalists and guests holding certificates in front of the Grand Finale screen at Daffodil International Academy" },
      { src: "/events/coding-fest-2026-grand-finale/2.webp", alt: "Group photo from the Coding Fest 2026 Grand Finale at Daffodil International Academy" }
    ]
  },
  {
    id: "apoai-2026-team-bangladesh-reception",
    title: "APOAI 2026: Team Bangladesh Reception",
    date: "2026",
    past: true,
    description: "Reception for Team Bangladesh at the Asia-Pacific Olympiad in Artificial Intelligence (APOAI) 2026, held alongside the Bangladesh Artificial Intelligence Olympiad.",
    cover: "/events/apoai-2026-team-bangladesh-reception/cover.webp",
    coverAlt: "Team Bangladesh for APOAI 2026 holding certificates and flowers with guests at the reception"
  },
  {
    id: "ict-fest-2025-devops-workshop",
    title: "ICT Fest 2025: Workshop on DevOps",
    date: "2025",
    past: true,
    venue: "Daffodil International Academy",
    description: "A DevOps workshop during DIA ICT Fest 2025 at Daffodil International Academy, ending with a full-room group photo.",
    cover: "/events/ict-fest-2025-devops-workshop/cover.webp",
    coverAlt: "Participants of the ICT Fest 2025 DevOps workshop holding up notebooks in a group photo"
  }
];