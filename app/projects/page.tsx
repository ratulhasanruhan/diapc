import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ProjectCard, EmptyState } from "@/components/sections/blocks";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Projects", description: "Apps, tools and experiments built by DIA Programming Club members.", path: "/projects" });

export default function ProjectsPage() {
  return (
    <main>
      <PageHero eyebrow="Projects" title="Built by DPC members" intro="Apps, tools, research and experiments from our community." />
      <section className="section">
        {projects.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ScrollReveal key={p.id}><ProjectCard p={p} /></ScrollReveal>)}</div>
        ) : (
          <EmptyState title="First projects are in the works" body="Built something with DPC? Tell us and we'll feature it." action={{ label: "Submit a project", href: "/submit/project" }} />
        )}
        <p className="mt-10 text-center"><a href="/submit/project" className="btn-primary">Submit your project</a></p>
      </section>
    </main>
  );
}
