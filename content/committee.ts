/**
 * DPC committee. Photos live in /public/committee/ (portrait 4:5, 480x600 WebP, face-centred).
 * Hierarchy on the site: advisor, president, convener, then executive members.
 * `email` is optional and shown as a small "Email" link on the card. Only add it for members who asked to be contactable.
 * Email addresses are never put into the Person JSON-LD.
 */
export type CommitteeMember = {
  /** URL-safe id, also used for the Person JSON-LD @id */
  id: string;
  name: string;
  /** Free-text title shown under the name */
  role: string;
  /** Position in the hierarchy. "lead" and "member" are reserved for future use. */
  group: "advisor" | "president" | "convener" | "executive" | "lead" | "member";
  /** Areas the member works on, shown as tags */
  tags?: string[];
  photo?: string;
  /** Optional public contact email, shown as a small "Email" link (mailto) */
  email?: string;
  links?: { label: string; url: string }[];
  placeholder?: boolean;
};

export const committee: CommitteeMember[] = [
  { id: "rakibul-hasan-prince", name: "Rakibul Hasan Prince", role: "Advisor, Center Manager", group: "advisor", photo: "/committee/rakibul-hasan-prince.webp", email: "hr@daffodil.ac" },
  { id: "ratul-hasan-ruhan", name: "Ratul Hasan Ruhan", role: "President", group: "president", photo: "/committee/ratul-hasan-ruhan.webp", email: "president@diapc.dev" },
  { id: "rozana-afsin-tanha", name: "Rozana Afsin Tanha", role: "Convener", group: "convener", photo: "/committee/rozana-afsin-tanha.webp", email: "rozana.comp@daffodil.ac" },

  { id: "ahnaf-abid-khan", name: "Ahnaf Abid Khan", role: "Executive Member", group: "executive", tags: ["Social Media", "Content"], photo: "/committee/ahnaf-abid-khan.webp" },
  { id: "ramisa-zahra", name: "Ramisa Zahra", role: "Executive Member", group: "executive", tags: ["Community", "Communications"], photo: "/committee/ramisa-zahra.webp" },
  { id: "abdullah-ibrahim-khan", name: "Abdullah Ibrahim Khan", role: "Executive Member", group: "executive", tags: ["Technical", "Events", "Logistics"], photo: "/committee/abdullah-ibrahim-khan.webp" },
  { id: "rasheduzzaman-shanto", name: "Rasheduzzaman Shanto", role: "Executive Member", group: "executive", tags: ["Technical", "Social Media"], photo: "/committee/rasheduzzaman-shanto.webp" },
  { id: "md-zijan-mymony", name: "MD Zijan Mymony", role: "Executive Member", group: "executive", tags: ["Events"] },
  { id: "lamia-raima-amin", name: "Lamia Raima Amin", role: "Executive Member", group: "executive", tags: ["Events", "Photo & Video"], photo: "/committee/lamia-raima-amin.webp" },
  { id: "masudul-haq-mahair", name: "Masudul Haq Mahair", role: "Executive Member", group: "executive", tags: ["Events", "Social Media"], photo: "/committee/masudul-haq-mahair.webp" },
  { id: "md-nadim-mahamud", name: "MD Nadim Mahamud", role: "Executive Member", group: "executive", tags: ["Technical", "Events", "Social Media", "Community"], photo: "/committee/nadim-mahamud.webp" },
  { id: "md-fahim-shahriar", name: "MD Fahim Shahriar", role: "Executive Member", group: "executive", tags: ["Technical"], photo: "/committee/fahim-shahriar.webp" },
  { id: "priyata-ruth-pahan", name: "Priyata Ruth Pahan", role: "Executive Member", group: "executive", tags: ["Events", "Social Media"], photo: "/committee/priyata-ruth-pahan.webp" }
];
