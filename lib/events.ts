import { cacheLife } from "next/cache";
import { events as contentEvents, type DpcEvent } from "@/content/events";
import { getMeetupEvents } from "@/lib/meetup";

export type EventItem = DpcEvent & { source: "dpc" | "meetup"; rsvps?: number };

const end = (e: DpcEvent) => new Date(e.endDate ?? (e.date.length <= 10 ? `${e.date}T23:59:59+06:00` : e.date)).getTime();

/** Content events + AWS SBG Meetup events, split into upcoming/past. Cached ~1h. Never throws. */
export async function getEvents(): Promise<{ upcoming: EventItem[]; past: EventItem[] }> {
  "use cache";
  cacheLife("hours");
  const now = Date.now();
  const meetup = await getMeetupEvents();
  const fromMeetup: EventItem[] = [...meetup.upcoming, ...meetup.past].map((m) => ({
    id: `meetup-${m.id}`,
    title: m.title,
    date: m.start,
    endDate: m.end,
    venue: m.online ? "Online" : m.venue,
    description: m.description,
    url: m.url,
    cover: m.image,
    wing: "AWS SBG",
    rsvps: m.rsvps,
    source: "meetup"
  }));
  const all: EventItem[] = [...contentEvents.map((e) => ({ ...e, source: "dpc" as const })), ...fromMeetup];
  const upcoming = all.filter((e) => end(e) >= now).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = all.filter((e) => end(e) < now).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return { upcoming, past };
}

export function formatDate(iso: string) {
  const d = new Date(iso.length <= 10 ? `${iso}T12:00:00+06:00` : iso);
  const tz = "Asia/Dhaka";
  const hasTime = iso.length > 10;
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: tz }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: tz }).format(d),
    year: new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: tz }).format(d),
    full: new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", ...(hasTime ? { hour: "numeric", minute: "2-digit" } : {}), timeZone: tz }).format(d) + (hasTime ? " (Dhaka)" : "")
  };
}
