/**
 * Clubs, communities and organizations DPC works with (logo wall on the homepage).
 * Put logos in /public/partners/ (WebP or PNG, transparent background works best).
 * Use `dark: true` for white/light logos so they sit on a dark tile.
 */
export type Collaboration = {
  name: string;
  /** e.g. "/partners/acme.webp" */
  logo: string;
  /** Alt text for the logo; defaults to the name */
  alt?: string;
  url: string;
  /** e.g. "Wing", "Community partner", "Sponsor" */
  type?: string;
  /** Light/white logo: render on a dark tile */
  dark?: boolean;
};

const CLOUDCAMP_CLUB_LINK = "https://cloudcampbd.com/sign-in?signup=1&ref=CLUB-2629C05A";

export const collaborations: Collaboration[] = [
  { name: "AWS Student Builders Group, DIA", logo: "/partners/awssbg-wordmark-light.webp", alt: "AWS Student Builders Group", url: "https://aws.diapc.dev", type: "Wing", dark: true },
  { name: "CloudCamp Bangladesh", logo: "/partners/cloudcamp-bangladesh.webp", alt: "CloudCamp Bangladesh", url: CLOUDCAMP_CLUB_LINK, type: "Collaboration" },
  { name: "AI Builders Congress", logo: "/partners/ai-builders-congress.webp", alt: "AI Builders Congress", url: CLOUDCAMP_CLUB_LINK, type: "Collaboration", dark: true }
];
