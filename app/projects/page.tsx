import ScrollReveal from "@/components/motion/ScrollReveal";
import { FolderGit2, Code2 } from "lucide-react";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">The Build Lab</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Projects</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Open-source tools, student applications, research prototypes, and hackathon builds.
              Everything our members create.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Empty state */}
        <ScrollReveal>
          <div className="text-center py-24 border border-dashed border-border rounded-2xl">
            <FolderGit2 className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Projects launching soon</h3>
            <p className="text-text-muted max-w-md mx-auto mb-8">
              DPC members are working on exciting projects. This showcase will be populated
              as projects are submitted and reviewed.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-glass-light text-text-secondary text-sm font-mono">
              <Code2 className="w-4 h-4" />
              Submit a project for review →
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
