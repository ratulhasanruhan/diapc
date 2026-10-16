/** Wings (sub-communities). `href` can be internal or an external site. */
export type Wing = {
  slug: string;
  name: string;
  description: string;
  status: "active" | "proposed";
  accent: string;
  href: string;
  logo?: string;
  external?: boolean;
};

export const wings: Wing[] = [
  {
    slug: "aws",
    name: "AWS Student Builders Group",
    description: "Cloud and AI, learned by building. Workshops, builder sessions and events, part of the global AWS Builder Center network.",
    status: "active",
    accent: "#ff9900",
    href: "https://aws.diapc.dev",
    logo: "/brand/awssbg-mark.svg",
    external: true
  },
  { slug: "competitive-programming", name: "Competitive Programming", description: "Algorithms, data structures and contest practice.", status: "active", accent: "#2454d7", href: "/join?wing=competitive-programming" },
  { slug: "ai-ml", name: "AI & Data Science", description: "Machine learning, data analysis and research projects.", status: "active", accent: "#8b5cf6", href: "/join?wing=ai-ml" },
  { slug: "web-app-dev", name: "Web & Mobile Development", description: "Full-stack web, mobile apps and modern frameworks.", status: "active", accent: "#c23b91", href: "/join?wing=web-app-dev" },
  { slug: "cybersecurity", name: "Cybersecurity & Systems", description: "Ethical hacking, CTFs, systems and network security.", status: "proposed", accent: "#10b981", href: "/join?wing=cybersecurity" },
  { slug: "research", name: "Research & Innovation", description: "Research, innovation projects and technical writing.", status: "proposed", accent: "#0891b2", href: "/join?wing=research" }
];
