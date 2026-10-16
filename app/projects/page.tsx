import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ProjectCard, EmptyState } from "@/components/sections/blocks";
import { projects } from "@/content/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({ title: "Projects", description: "Apps, tools and experiments built by DIA Programming Club members.", path: "/projects" });

export default function ProjectsPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
      <PageHero eyebrow="Projects" title="Built by DPC members" intro="Apps, tools, research and experiments from our community." />
      <section className="section">
        {projects.length ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ScrollReveal key={p.id}><ProjectCard p={p} /></ScrollReveal>)}</div>
            <p className="mt-10 text-center"><a href="/submit/project" className="btn-primary">Submit your project</a></p>
          </>
        ) : (
          <EmptyState title="Projects coming soon" body="Member projects will be showcased here. Built something with DPC? Submit it and the committee will review it." action={{ label: "Submit your project", href: "/submit/project", primary: true }} />
        )}
      </section>
    </main>
  );
}
