import { cacheLife } from "next/cache";

export const MEETUP_URLNAME = "aws-sbg-at-daffodil-international-academy";
export const MEETUP_GROUP_URL = `https://www.meetup.com/${MEETUP_URLNAME}/`;
export const MEETUP_EVENTS_URL = `${MEETUP_GROUP_URL}events/`;

export type MeetupEvent = {
  id: string;
  title: string;
  url: string;
  start: string;
  end?: string;
  venue?: string;
  online?: boolean;
  description?: string;
  image?: string;
  rsvps?: number;
};

export type MeetupFeed = {
  upcoming: MeetupEvent[];
  past: MeetupEvent[];
  ok: boolean;
  source: "graphql" | "ical" | "none";
};

const GQL_ENDPOINT = "https://api.meetup.com/gql-ext";

const EVENT_FIELDS = `
  id title dateTime endTime eventUrl description eventType
  venues { name city }
  featuredEventPhoto { highResUrl }
  rsvps { totalCount }
`;

const QUERY = `
  query AwsSbgEvents($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      upcoming: events(first: 12, status: ACTIVE) { edges { node { ${EVENT_FIELDS} } } }
      past: events(first: 12, status: PAST, sort: DESC) { edges { node { ${EVENT_FIELDS} } } }
    }
  }
`;

type GqlNode = {
  id: string;
  title: string;
  dateTime: string;
  endTime?: string | null;
  eventUrl: string;
  description?: string | null;
  eventType?: string | null;
  venues?: { name?: string | null; city?: string | null }[] | null;
  featuredEventPhoto?: { highResUrl?: string | null } | null;
  rsvps?: { totalCount?: number | null } | null;
};

function plain(text?: string | null, max = 220) {
  if (!text) return undefined;
  const t = text.replace(/<[^>]+>/g, " ").replace(/[*_#>`[\]]/g, "").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t || undefined;
}

function fromNode(n: GqlNode): MeetupEvent {
  const v = n.venues?.[0];
  const online = n.eventType === "ONLINE";
  return {
    id: n.id,
    title: n.title,
    url: n.eventUrl,
    start: n.dateTime,
    end: n.endTime ?? undefined,
    venue: online ? "Online" : [v?.name, v?.city].filter(Boolean).join(", ") || undefined,
    online,
    description: plain(n.description),
    image: n.featuredEventPhoto?.highResUrl ?? undefined,
    rsvps: n.rsvps?.totalCount ?? undefined
  };
}

async function fromGraphql(): Promise<MeetupFeed> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  const token = process.env.MEETUP_ACCESS_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: QUERY, variables: { urlname: MEETUP_URLNAME } }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) throw new Error(`Meetup GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0]?.message ?? "Meetup GraphQL error");
  const g = json.data?.groupByUrlname;
  if (!g) throw new Error("Meetup group not found");
  const now = Date.now();
  const upcoming = (g.upcoming?.edges ?? []).map((e: { node: GqlNode }) => fromNode(e.node))
    .filter((e: MeetupEvent) => new Date(e.end ?? e.start).getTime() >= now)
    .sort((a: MeetupEvent, b: MeetupEvent) => +new Date(a.start) - +new Date(b.start));
  const past = (g.past?.edges ?? []).map((e: { node: GqlNode }) => fromNode(e.node))
    .sort((a: MeetupEvent, b: MeetupEvent) => +new Date(b.start) - +new Date(a.start));
  return { upcoming, past, ok: true, source: "graphql" };
}

function icalDate(v: string) {
  const m = v.match(/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?/);
  if (!m) return undefined;
  const [, y, mo, d, h = "00", mi = "00", s = "00", z] = m;
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}${z ? "Z" : "+06:00"}`).toISOString();
}

async function fromIcal(): Promise<MeetupFeed> {
  const res = await fetch(`${MEETUP_EVENTS_URL}ical/`, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Meetup iCal ${res.status}`);
  const text = (await res.text()).replace(/\r?\n[ \t]/g, "");
  const events: MeetupEvent[] = [];
  for (const block of text.split("BEGIN:VEVENT").slice(1)) {
    const get = (key: string) => block.match(new RegExp(`^${key}(?:;[^:]*)?:(.*)$`, "m"))?.[1]?.trim();
    const start = icalDate(get("DTSTART") ?? "");
    const url = get("URL");
    if (!start || !url) continue;
    events.push({
      id: get("UID") ?? url,
      title: (get("SUMMARY") ?? "Meetup event").replace(/\\,/g, ",").replace(/\\;/g, ";"),
      url,
      start,
      end: icalDate(get("DTEND") ?? ""),
      venue: get("LOCATION")?.replace(/\\,/g, ",").replace(/\\n/g, " "),
      description: plain(get("DESCRIPTION")?.replace(/\\n/g, " ").replace(/\\,/g, ","))
    });
  }
  const now = Date.now();
  return {
    upcoming: events.filter((e) => +new Date(e.end ?? e.start) >= now).sort((a, b) => +new Date(a.start) - +new Date(b.start)),
    past: events.filter((e) => +new Date(e.end ?? e.start) < now).sort((a, b) => +new Date(b.start) - +new Date(a.start)),
    ok: true,
    source: "ical"
  };
}

/** Server-side, cached for about an hour (ISR-style). Never throws. */
export async function getMeetupEvents(): Promise<MeetupFeed> {
  "use cache";
  cacheLife("hours");
  try {
    return await fromGraphql();
  } catch (err) {
    console.warn("[meetup] GraphQL failed, trying iCal:", err);
  }
  try {
    return await fromIcal();
  } catch (err) {
    console.warn("[meetup] iCal failed:", err);
  }
  return { upcoming: [], past: [], ok: false, source: "none" };
}

export function formatEventDate(iso: string) {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Asia/Dhaka" }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Asia/Dhaka" }).format(d),
    full: new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(d)
  };
}
