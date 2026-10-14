import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Collaborate", description: "Partner with DIA Programming Club on events, workshops and projects.", path: "/collaborate" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
