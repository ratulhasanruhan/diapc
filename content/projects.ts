/**
 * Projects built by DPC members.
 * Entries with `sample: true` are placeholders shown with a "Sample" badge.
 */
export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  repo?: string;
  demo?: string;
  /** Screenshot in /public, e.g. "/projects/my-app.webp" (16:10 works best) */
  image?: string;
  members?: string[];
  featured?: boolean;
  sample?: boolean;
};

export const projects: Project[] = [
  {
    id: "sample-project",
    title: "Sample project (replace me)",
    description: "One-line pitch of the project and the problem it solves.",
    tags: ["Next.js", "Python"],
    sample: true
  }
];
