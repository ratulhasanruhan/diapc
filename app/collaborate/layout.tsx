import { pageMeta, JsonLd } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = pageMeta({ title: "Collaborate", description: "Partner with DIA Programming Club on events, workshops and projects.", path: "/collaborate" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Collaborate", path: "/collaborate" }])} />
      {children}
    </>
  );
}
