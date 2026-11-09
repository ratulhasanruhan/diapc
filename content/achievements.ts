/**
 * Contest results, awards and recognitions. Newest first is recommended.
 * `date` is optional: leave it out (or use just a year, "2026") when the exact date isn't confirmed.
 * Put images in /public/achievements/ (WebP, ~1600px wide).
 */
export type Achievement = {
  id: string;
  title: string;
  /** e.g. "Champion", "1st Runner-up", "Top 10", "Finalist" */
  result: string;
  /** Contest / event name */
  event: string;
  /** People named in `description`. Each name is rendered as a link when it appears in that sentence. */
  people?: { name: string; href: string }[];
  /** ISO date, year only ("2026"), or omit if unknown */
  date?: string;
  /** e.g. "Inter-school", "National", "International" */
  scope?: string;
  members?: string[];
  description?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: "bangladesh-ai-business-summit-2026-exhibit",
    title: "Exhibit at the First Ever Bangladesh AI Business Summit 2026",
    result: "Exhibit",
    event: "First Ever Bangladesh AI Business Summit 2026",
    date: "2026",
    description: "Ratul Hasan Ruhan is exhibiting at the First Ever Bangladesh AI Business Summit 2026 to H.E. the President of Bangladesh and Ministers of Bangladesh.",
    people: [{ name: "Ratul Hasan Ruhan", href: "https://ratuler.vercel.app" }]
  },
  {
    id: "national-ai-build-a-thon-champion",
    title: "National AI Build-a-thon: Champion",
    result: "Champion",
    event: "National AI Build-a-thon",
    description: "Prize-giving photo: the team receiving the trophy and certificates on stage.",
    image: "/achievements/national-ai-build-a-thon-champion.webp",
    imageAlt: "Team receiving the National AI Build-a-thon trophy and certificates on stage with guests"
  }
];
