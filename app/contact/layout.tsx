import { pageMeta, JsonLd } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = pageMeta({ title: "Contact", description: "Contact DIA Programming Club at hi@diapc.dev or on Facebook.", path: "/contact" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}
