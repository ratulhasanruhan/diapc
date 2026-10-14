import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Contact", description: "Contact DIA Programming Club at hi@diapc.dev or on Facebook.", path: "/contact" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
