/**
 * DPC committee. Photos live in /public/committee/ (portrait 4:5, 480x600 WebP).
 * Contact details are intentionally never published here.
 */
export type CommitteeMember = {
  /** URL-safe id, also used for the Person JSON-LD @id */
  id: string;
  name: string;
  role: string;
  /** "advisor" | "executive" | "lead" (wing/team lead) | "member" */
  group: "advisor" | "executive" | "lead" | "member";
  /** Areas the member works on, shown as tags */
  tags?: string[];
  photo?: string;
  links?: { label: string; url: string }[];
  placeholder?: boolean;
};

export const committee: CommitteeMember[] = [
  { id: "rakibul-hasan-prince", name: "Rakibul Hasan Prince", role: "Advisor, Center Manager", group: "advisor", photo: "/committee/rakibul-hasan-prince.webp" },

  { id: "ahnaf-abid-khan", name: "Ahnaf Abid Khan", role: "Executive Member", group: "executive", tags: ["Social Media", "Content"], photo: "/committee/ahnaf-abid-khan.webp" },
  { id: "ramisa-zahra", name: "Ramisa Zahra", role: "Executive Member", group: "executive", tags: ["Community", "Communications"] },
  { id: "abdullah-ibrahim-khan", name: "Abdullah Ibrahim Khan", role: "Executive Member", group: "executive", tags: ["Technical", "Events", "Logistics"] },
  { id: "rasheduzzaman-shanto", name: "Rasheduzzaman Shanto", role: "Executive Member", group: "executive", tags: ["Technical", "Social Media"] },
  { id: "md-zijan-mymony", name: "MD Zijan Mymony", role: "Executive Member", group: "executive", tags: ["Events"] },
  { id: "lamia-raima-amin", name: "Lamia Raima Amin", role: "Executive Member", group: "executive", tags: ["Events", "Photo & Video"] },
  { id: "masudul-haq-mahair", name: "Masudul Haq Mahair", role: "Executive Member", group: "executive", tags: ["Events", "Social Media"] },
  { id: "md-nadim-mahamud", name: "MD Nadim Mahamud", role: "Executive Member", group: "executive", tags: ["Technical", "Events", "Social Media", "Community"], photo: "/committee/nadim-mahamud.webp" },
  { id: "md-fahim-shahriar", name: "MD Fahim Shahriar", role: "Executive Member", group: "executive", tags: ["Technical"], photo: "/committee/fahim-shahriar.webp" },
  { id: "priyata-ruth-pahan", name: "Priyata Ruth Pahan", role: "Executive Member", group: "executive", tags: ["Events", "Social Media"], photo: "/committee/priyata-ruth-pahan.webp" }
];