export type CommitteeMember = {
  name: string;
  role: string;
  initials?: string;
  photo?: string;
  links?: { label: string; url: string }[];
  extra?: string;
};

export const executiveCouncil: CommitteeMember[] = [
  { name: "To be announced", role: "President", initials: "PR" },
  { name: "To be announced", role: "Vice President", initials: "VP" },
  { name: "To be announced", role: "General Secretary", initials: "GS" }
];
