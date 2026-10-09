import ScrollReveal from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { Cloud, Code2, Brain, Globe2, Lock, Beaker, Palette, Megaphone, Users, FileText } from "lucide-react";

export const metadata = { title: "Wings" };

const techWings = [
  { name: "AWS Student Builder Group", slug: "aws", status: "active", accent: "#FF9900", icon: Cloud, desc: "Cloud computing workshops, certification study circles, and hands-on build sessions." },
  { name: "Competitive Programming & Algorithms", slug: "competitive-programming", status: "proposed", accent: "#3B82F6", icon: Code2, desc: "ICPC prep, Codeforces contests, data structures, and algorithm mastery." },
  { name: "AI & Data Science", slug: "ai-ml", status: "proposed", accent: "#8B5CF6", icon: Brain, desc: "Machine learning, deep learning, data analysis, and research projects." },
  { name: "Web & Mobile Development", slug: "web-app-dev", status: "proposed", accent: "#EC4899", icon: Globe2, desc: "Full-stack web apps, mobile development, UI/UX, and modern frameworks." },
  { name: "Cybersecurity & Systems", slug: "cybersecurity", status: "proposed", accent: "#10B981", icon: Lock, desc: "Ethical hacking, CTFs, systems security, and network analysis." },
  { name: "Research & Innovation", slug: "research", status: "proposed", accent: "#06B6D4", icon: Beaker, desc: "Academic research, innovation projects, and technical paper writing." },
];

const opsTeams = [
  { name: "Events & Operations", icon: Users },
  { name: "Design & Creative Media", icon: Palette },
  { name: "Public Relations & Partnerships", icon: Megaphone },
  { name: "Content & Documentation", icon: FileText },
];

export default function WingsPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Explore Your Path</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Wings</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Specialized sub-communities within DPC. Each wing is a planet in our universe —
              a focused learning path with its own workshops, projects, and team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="font-mono text-xs text-brand-blue">[TECH]</span> Technical Wings
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {techWings.map((wing, i) => (
            <ScrollReveal key={wing.slug} delay={i * 0.06}>
              <Link
                href={wing.status === "active" ? "/aws" : `/join?wing=${wing.slug}`}
                className="block h-full p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] group"
                style={{
                  borderColor: wing.status === "active" ? `${wing.accent}40` : "var(--color-border)",
                  background: wing.status === "active" ? `linear-gradient(160deg, ${wing.accent}10, transparent 60%)` : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <wing.icon className="w-10 h-10" style={{ color: wing.accent }} />
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      color: wing.status === "active" ? wing.accent : "var(--color-text-muted)",
                      background: wing.status === "active" ? `${wing.accent}20` : "transparent",
                      border: wing.status === "proposed" ? "1px dashed var(--color-border)" : `1px solid ${wing.accent}30`,
                    }}
                  >
                    {wing.status}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2">{wing.name}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{wing.desc}</p>
                {wing.status === "proposed" && (
                  <p className="text-xs text-brand-blue mt-4 font-semibold">Be a founding member →</p>
                )}
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="font-mono text-xs text-brand-magenta">[OPS]</span> Operational Teams
            <span className="text-xs text-text-muted font-normal">(subject to formal establishment)</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {opsTeams.map((team, i) => (
            <ScrollReveal key={team.name} delay={i * 0.06}>
              <div className="p-5 rounded-xl bg-glass-light text-center">
                <team.icon className="w-6 h-6 text-text-muted mx-auto mb-3" />
                <h3 className="font-medium text-sm">{team.name}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
