/**
 * Clubs, communities and organizations DPC has worked with (logo wall).
 * Put logos in /public/partners/ (SVG or PNG/WebP, transparent background works best).
 * Entries with `sample: true` render as dashed placeholders. Remove them once you add real partners.
 */
export type Collaboration = {
  name: string;
  /** e.g. "/partners/acme.svg". Leave empty to show the name as text. */
  logo?: string;
  url?: string;
  /** e.g. "Co-host", "Community partner", "Sponsor" */
  type?: string;
  sample?: boolean;
};

export const collaborations: Collaboration[] = [
  { name: "AWS Student Builders Group, DIA", logo: "/brand/awssbg-mark.svg", url: "https://aws.diapc.dev", type: "Wing" },
  { name: "Partner club (sample)", type: "Community partner", sample: true },
  { name: "Partner organization (sample)", type: "Co-host", sample: true }
];
