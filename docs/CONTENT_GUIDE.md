# DPC website content guide

Everything shown on diapc.dev comes from plain TypeScript files in `content/`. To add or change content you edit one file, add any images under `public/`, and push. Vercel redeploys automatically.

**Rules of thumb**

- Only publish facts you can verify. If you don't know a date, leave `date` out (or use just the year, `"2026"`).
- Never publish emails or phone numbers.
- Images: use **WebP**, keep them small (under ~200 KB). Cover/gallery photos about 1600 px wide, portraits 480×600 (4:5), logos with a transparent background.
- Always write real `alt` text describing the photo.

How to make a WebP (any machine with Node): `npx sharp-cli -i photo.jpg -o photo.webp --width 1600 -- webp` or use [squoosh.app](https://squoosh.app).

---

## 1. Add a project (`content/projects.ts`)

Image goes in `public/projects/` (screenshot, 16:10 works best).

```ts
export const projects: Project[] = [
  {
    id: "campus-notes",               // unique, lowercase, dashes
    title: "Campus Notes",
    description: "A shared note-taking app for DIA students.",
    tags: ["Next.js", "Supabase"],    // optional
    repo: "https://github.com/user/campus-notes",   // optional
    demo: "https://campus-notes.vercel.app",         // optional
    image: "/projects/campus-notes.webp",           // optional
    members: ["Student One", "Student Two"],         // optional
    featured: true                    // optional: shown first on the homepage
  }
];
```

When the list is empty the site shows "Projects coming soon" with a **Submit your project** button.

## 2. Add an achievement (`content/achievements.ts`)

Image goes in `public/achievements/`.

```ts
{
  id: "icpc-2026-regional",
  title: "ICPC Dhaka Regional: Finalist",
  result: "Finalist",                 // Champion, 1st Runner-up, Top 10 ...
  event: "ICPC Dhaka Regional",
  date: "2026-03-14",                 // optional: full date, or just "2026"
  scope: "National",                  // optional
  members: ["Student One", "Student Two"],
  description: "One or two factual sentences.",
  image: "/achievements/icpc-2026-regional.webp",
  imageAlt: "Team holding the finalist certificate",
  link: "https://example.com/results" // optional proof link
}
```

## 3. Add an event (`content/events.ts`)

Photos go in `public/events/<event-slug>/` (for example `cover.webp`, `1.webp`, `2.webp`).

```ts
{
  id: "orientation-2026",
  title: "Orientation 2026",
  date: "2026-11-20",                 // "2026-11-20", "2026-11-20T15:00:00+06:00", "2026", or "" if unknown
  venue: "Daffodil International Academy",
  description: "What happened or what will happen.",
  wing: "General",                    // optional label
  url: "https://...",                 // optional registration/details link
  cover: "/events/orientation-2026/cover.webp",
  coverAlt: "Students at the orientation",
  gallery: [                          // optional extra photos (opened in the lightbox)
    { src: "/events/orientation-2026/1.webp", alt: "Opening talk" }
  ],
  past: true                          // optional: force it into the archive (use for year-only dates)
}
```

- Events whose `date` has passed move to **Past events** automatically. Use `past: true` for year-only or undated ones.
- Events on the AWS SBG Meetup group appear on their own (live from Meetup, refreshed hourly); don't copy them here.
- Only events with a full date get Google "Event" markup. Year-only events are listed but not marked up (that is intentional).

## 4. Add a collaboration (`content/collaborations.ts`)

Logo goes in `public/partners/` (WebP/PNG, transparent background).

```ts
{
  name: "Example Club",
  logo: "/partners/example-club.webp",
  alt: "Example Club logo",
  url: "https://example.org",
  type: "Community partner",          // Wing, Community partner, Co-host, Sponsor ...
  dark: false                         // true for white/light logos (shown on a dark tile)
}
```

## 5. Add a committee member (`content/committee.ts`)

The committee page shows a hierarchy: **Advisor → President → Convener → Executive members**. The order in the file does not matter; the `group` decides where a card goes.

Photo goes in `public/committee/`: portrait **4:5, 480×600, WebP**, with the face centred (the cards crop to this ratio, so keep the head and shoulders in the middle).

```ts
{
  id: "full-name",
  name: "Full Name",
  role: "Executive Member",           // text shown under the name
  group: "executive",                 // "advisor" | "president" | "convener" | "executive"
  tags: ["Technical", "Events"],      // optional focus areas (shown on hover on desktop)
  photo: "/committee/full-name.webp", // optional: initials are shown without it
  email: "name@example.com"           // optional: shows a small "Email" link (mailto) on the card
}
```

Only add `email` for people who agreed to be contacted publicly. Today it is set for the Advisor, President and Convener only. Emails are never added to the structured data (JSON-LD). The president's entry reuses Ratul's shared `@id`, so search engines merge it with his personal profile.

## 6. Counts shown in stats

- **Active wings** is counted from `content/wings.ts` (entries with `status: "active"`).
- **Archived events** comes from `siteStats.archivedEvents` in `content/site.ts` (the archive grid shows only the events that have details and photos in `content/events.ts`). Update the number there when the archive grows.

## 7. Media kit (`/media-kit`)

Logos, colours and text live in `app/media-kit/page.tsx`; the files are in `public/media-kit/`. After changing any logo or `public/og.png`, replace the matching file in `public/media-kit/` and rebuild `public/media-kit/dpc-media-kit.zip` (zip the `dpc/`, `awssbg/` folders and a README into a `dpc-media-kit/` folder).

---

## How submissions work (projects and achievements)

1. A student fills in **/submit/project** or **/submit/achievement**.
2. The form posts to `/api/submissions`, which validates it and inserts a row into the Supabase table `submissions` (project `ukhqmylxadlqzedfhtvg`). The row has `type` (`project` or `achievement`), `payload` (the form fields as JSON), `submitter_email` (private, never published), `status` and `created_at`.
3. A notification email goes to `hi@diapc.dev` (and any address in `SUBMISSIONS_EMAIL_TO`).
4. **Nothing is published automatically.** To approve one:
   1. Open Supabase → Table editor → `submissions`, filter `status = pending`.
   2. Check the work is genuine (ask the submitter for proof if unsure).
   3. Copy the fields from `payload` into `content/projects.ts` or `content/achievements.ts` using the examples above. Download the submitter's image, convert it to WebP and save it under `public/projects/` or `public/achievements/` (the form only collects an image *link*).
   4. Commit and push. The site redeploys.
   5. Set the row's `status` to `approved` (or `rejected`, optionally with a note in `admin_note`).
5. Other forms land in their own tables: `applications` (/join), `contacts` (/contact), `collaborations` (/collaborate). Each has a `status` column to track follow-up.

Server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, …) live only in Vercel environment variables. See `.env.example`.

## Where else things live

| Thing | File |
|---|---|
| Club name, founding date, email, social links | `content/site.ts` |
| FAQ (About page + FAQPage markup + `/llms.txt`) | `content/faq.ts` |
| Wings (and the "active wings" count) | `content/wings.ts` |
| Archived-events count | `content/site.ts` (`siteStats`) |
| Constitution text | `content/constitution.ts` |
| Page titles/descriptions | each `app/**/page.tsx` (`pageMeta(...)`) |
| Structured data (Organization, Person, Event, FAQ) | `lib/jsonld.ts` |
| Icons, manifest, social image | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `app/manifest.ts`, `public/og.png` |
