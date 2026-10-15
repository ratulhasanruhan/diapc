import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { SectionHeading, WingCard } from "@/components/sections/blocks";
import { wings } from "@/content/wings";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({ title: "Wings", description: "DPC wings: focused sub-communities inside DIA Programming Club, led by the AWS Student Builders Group. Proposed wings are open for founding members.", path: "/wings" });

export default function WingsPage() {
  const active = wings.filter((w) => w.status === "active");
  const proposed = wings.filter((w) => w.status === "proposed");
  return (
    <main className="overflow-x-clip">
      <JsonLd data={breadcrumbJsonLd([{ name: "Wings", path: "/wings" }])} />
      <PageHero eyebrow="Wings" title="Find your orbit" intro="Wings are focused sub-communities inside DPC, each with its own workshops, projects and team." />
      <section className="section">
        <SectionHeading eyebrow="Active" title="Running now" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((w, i) => <ScrollReveal key={w.slug} delay={i * 0.05} className="h-full"><WingCard w={w} /></ScrollReveal>)}
        </div>
      </section>
      {proposed.length > 0 && (
        <section className="section pt-0">
          <SectionHeading eyebrow="Proposed" title="Looking for founding members" intro="These wings are proposals, not running yet. Express interest and help start one." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proposed.map((w, i) => <ScrollReveal key={w.slug} delay={i * 0.05} className="h-full"><WingCard w={w} /></ScrollReveal>)}
          </div>
        </section>
      )}
    </main>
  );
}