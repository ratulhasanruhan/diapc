export type CommitteeMember = {
  name: string;
  role: string;
  photo?: string;
  links?: { label: string; url: string }[];
};

export const committee: CommitteeMember[] = [
  {
    name: "To be announced",
    role: "Leader",
    photo: "/brand/placeholder.svg",
    links: []
  },
  {
    name: "To be announced",
    role: "Co-lead",
    photo: "/brand/placeholder.svg",
    links: []
  },
  {
    name: "To be announced",
    role: "Program Coordinator",
    photo: "/brand/placeholder.svg",
    links: []
  }
];
