/**
 * Contest results, awards and recognitions. Newest first is recommended.
 * Entries with `sample: true` are placeholders shown with a "Sample" badge.
 */
export type Achievement = {
  id: string;
  title: string;
  /** e.g. "Champion", "1st Runner-up", "Top 10", "Finalist" */
  result: string;
  /** Contest / event name */
  event: string;
  date: string;
  /** e.g. "Inter-school", "National", "International" */
  scope?: string;
  members?: string[];
  description?: string;
  image?: string;
  link?: string;
  sample?: boolean;
};

export const achievements: Achievement[] = [
  {
    id: "sample-achievement",
    title: "Sample achievement (replace me)",
    result: "Result",
    event: "Contest or event name",
    date: "2026-01-01",
    scope: "Scope",
    description: "What the team did and why it mattered.",
    sample: true
  }
];
