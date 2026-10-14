/**
 * DPC committee. Replace the placeholder entries with real members.
 * Photos go in /public/committee/ (portrait 4:5, e.g. 480x600 WebP).
 */
export type CommitteeMember = {
  name: string;
  role: string;
  /** "advisor" | "executive" | "lead" (wing/team lead) | "member" */
  group: "advisor" | "executive" | "lead" | "member";
  photo?: string;
  links?: { label: string; url: string }[];
  placeholder?: boolean;
};

export const committee: CommitteeMember[] = [
  { name: "To be announced", role: "President", group: "executive", placeholder: true },
  { name: "To be announced", role: "Vice President", group: "executive", placeholder: true },
  { name: "To be announced", role: "General Secretary", group: "executive", placeholder: true }
];
