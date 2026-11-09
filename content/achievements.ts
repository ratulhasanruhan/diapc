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
  /** Extra photos shown with the cover. The cover is `image`, or the first photo when `image` is omitted. */
  photos?: { src: string; alt: string }[];
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: "bangladesh-ai-business-summit-2026-exhibit",
    title: "Exhibit at the First Ever Bangladesh AI Business Summit 2026",
    result: "Exhibit",
    event: "First Ever Bangladesh AI Business Summit 2026",
    date: "2026-11-05",
    description: "Ratul Hasan Ruhan exhibited at the First Ever Bangladesh AI Business Summit 2026 at the Bangladesh-China Friendship Conference Centre, to H.E. the President of Bangladesh and Ministers of Bangladesh.",
    people: [{ name: "Ratul Hasan Ruhan", href: "https://ratuler.vercel.app" }],
    image: "/achievements/bangladesh-ai-business-summit-2026/1.webp",
    imageAlt: "Four people at the Team Appibrium stall, Stall No U-02, during the Bangladesh AI Business Summit 2026, beneath the Ministry of Science and Technology banner",
    photos: [
      { src: "/achievements/bangladesh-ai-business-summit-2026/1.webp", alt: "Four people at the Team Appibrium stall, Stall No U-02, during the Bangladesh AI Business Summit 2026, beneath the Ministry of Science and Technology banner" },
      { src: "/achievements/bangladesh-ai-business-summit-2026/2.webp", alt: "A stall visit at the AI Business Summit 2026 on 5 November 2026 at the Bangladesh-China Friendship Conference Centre" },
      { src: "/achievements/bangladesh-ai-business-summit-2026/3.webp", alt: "A presenter at the Appibrium stall explaining the exhibit to a visitor during the Bangladesh AI Business Summit 2026" }
    ]
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
