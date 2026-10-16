import { pageMeta, JsonLd } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = pageMeta({ title: "Join DPC", description: "Join DIA Programming Club at Daffodil International Academy.", path: "/join" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Join DPC", path: "/join" }])} />
      {children}
    </>
  );
}
