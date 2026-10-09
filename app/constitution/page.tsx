import ScrollReveal from "@/components/motion/ScrollReveal";
import { Scale, ChevronRight } from "lucide-react";

export const metadata = { title: "Constitution" };

const articles = [
  { num: 1, title: "Name and Nature", summary: "Official name, non-profit and non-political nature, tagline, website." },
  { num: 2, title: "Aims and Objectives", summary: "Promote programming, organize events, prepare for industry, represent DIA." },
  { num: 3, title: "Membership", summary: "General, Associate, Alumni, and Honorary membership types and rights." },
  { num: 4, title: "Governance Structure", summary: "Faculty Advisor, Executive Council positions, Department Leads." },
  { num: 5, title: "Wings", summary: "Technical sub-communities, founding wing (AWS), creating new wings." },
  { num: 6, title: "Elections and Tenure", summary: "Terms, eligibility, Election Commission, voting procedures." },
  { num: 7, title: "Meetings and Decisions", summary: "Meeting frequency, quorum, voting rules, minutes." },
  { num: 8, title: "Finance", summary: "Non-profit funds, sources, approvals, transparency." },
  { num: 9, title: "Collaborations and Partnerships", summary: "Partnership rules, credit, MoU guidelines." },
  { num: 10, title: "Code of Conduct and Discipline", summary: "Respect, anti-harassment, complaint process." },
  { num: 11, title: "Digital Assets and IP", summary: "Club assets, credential handover, member IP rights." },
  { num: 12, title: "Amendments", summary: "Proposal, circulation, two-thirds vote, DIA approval." },
  { num: 13, title: "Dissolution", summary: "Three-quarters vote, asset distribution." },
];

export default function ConstitutionPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <Scale className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Constitution</h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-4">
              The governing document of the DIA Programming Club.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning text-xs font-mono rounded-full border border-warning/30">
              DRAFT v0.1 — Subject to approval by DIA authority
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        {/* Preamble */}
        <ScrollReveal>
          <div className="p-8 rounded-2xl bg-glass-light mb-12">
            <h2 className="text-xl font-bold mb-4 text-brand-blue">Preamble</h2>
            <p className="text-text-secondary leading-relaxed">
              We, the students of Daffodil International Academy, establish the DIA Programming
              Club to build a community where students learn to code, build real things, compete,
              and grow together. We commit to curiosity, collaboration, integrity, and open
              learning for every student regardless of program, year, or skill level.
            </p>
          </div>
        </ScrollReveal>

        {/* Article index */}
        <div className="space-y-3">
          {articles.map((a, i) => (
            <ScrollReveal key={a.num} delay={i * 0.04}>
              <div className="p-5 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-colors group cursor-pointer flex items-start gap-4">
                <span className="font-mono text-sm text-brand-blue font-bold shrink-0 mt-0.5">
                  Art. {a.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold mb-1 group-hover:text-brand-blue transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-text-muted">{a.summary}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted mt-1 shrink-0" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <p className="text-xs text-text-muted font-mono">
            Full text available in content/constitution.mdx. PDF download pending ratification.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
