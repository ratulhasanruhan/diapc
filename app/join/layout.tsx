import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Join DPC", description: "Join DIA Programming Club at Daffodil International Academy.", path: "/join" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
