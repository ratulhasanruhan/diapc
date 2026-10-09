import ScrollReveal from "@/components/motion/ScrollReveal";
import SectionWrapper from "@/components/motion/SectionWrapper";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users } from "lucide-react";

export const metadata = { title: "About DPC" };

const milestones = [
  { year: "2026", event: "DPC founded at Daffodil International Academy", status: "verified" },
  { year: "2026", event: "AWS Student Builder Group established as founding wing", status: "verified" },
  { year: "2026", event: "Constitution drafted (v0.1)", status: "verified" },
  { year: "TBD", event: "First inter-university contest", status: "planned" },
  { year: "TBD", event: "First hackathon hosted", status: "planned" },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Our Origin</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-gradient">DPC</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              DIA Programming Club is a student-led, non-profit, non-political club at Daffodil
              International Academy, Dhaka. We exist to promote programming, software development,
              and emerging technology among students of all skill levels.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <SectionWrapper label="Purpose" number="01" className="border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal>
            <div className="p-8 rounded-xl bg-glass-light h-full">
              <Target className="w-8 h-8 text-brand-blue mb-4" />
              <h3 className="text-xl font-bold mb-3">Mission</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To organize workshops, bootcamps, contests, hackathons, seminars, and study circles
                that prepare members for the tech industry through hands-on projects, mentorship,
                and professional certifications.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-xl bg-glass-light h-full">
              <Eye className="w-8 h-8 text-brand-magenta mb-4" />
              <h3 className="text-xl font-bold mb-3">Vision</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                To represent DIA in inter-university and national competitions, build partnerships
                with other clubs, communities, universities, and industry, and create an inclusive
                environment where beginners are welcomed and supported.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="p-8 rounded-xl bg-glass-light h-full">
              <Heart className="w-8 h-8 text-violet mb-4" />
              <h3 className="text-xl font-bold mb-3">Values</h3>
              <ul className="text-text-secondary text-sm leading-relaxed space-y-2">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-blue rounded-full" />Curiosity & open learning</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-blue rounded-full" />Collaboration over competition</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-blue rounded-full" />Integrity & ethical engineering</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-blue rounded-full" />Inclusivity regardless of skill level</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper label="Timeline" number="02" className="border-t border-border">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-12">Our Journey</h2>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-brand-blue bg-midnight z-10" />
                  <div className="ml-12 md:ml-0 md:w-1/2 p-6 rounded-xl bg-glass-light">
                    <span className="font-mono text-xs text-brand-blue">{m.year}</span>
                    <p className="font-medium mt-1">{m.event}</p>
                    {m.status === "planned" && (
                      <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full border border-dashed border-text-muted text-text-muted">
                        PLANNED
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border text-center">
        <ScrollReveal>
          <Users className="w-10 h-10 text-brand-blue mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Join the community</h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Whether you&apos;re writing your first &quot;Hello World&quot; or shipping production code,
            there&apos;s a place for you in DPC.
          </p>
          <Link href="/join" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue/90 transition-colors">
            Become a member <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
