/**
 * Projects built by DPC members. Empty for now: the site shows a "Projects coming soon" state with a Submit button.
 * Add an entry here after approving a submission (see docs/CONTENT_GUIDE.md).
 * Put screenshots in /public/projects/ (WebP, 16:10 works best).
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
};

export const projects: Project[] = [];
