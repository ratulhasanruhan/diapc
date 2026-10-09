import ScrollReveal from "@/components/motion/ScrollReveal";
import { BookOpen, ExternalLink } from "lucide-react";

export const metadata = { title: "Resources" };

const resourceCategories = [
  {
    title: "Getting Started",
    items: [
      { label: "freeCodeCamp", url: "https://freecodecamp.org", desc: "Free coding curriculum from basics to advanced." },
      { label: "The Odin Project", url: "https://theodinproject.com", desc: "Full-stack web development path." },
    ],
  },
  {
    title: "Competitive Programming",
    items: [
      { label: "Codeforces", url: "https://codeforces.com", desc: "Contest platform and problem archive." },
      { label: "LeetCode", url: "https://leetcode.com", desc: "Coding interview prep and contests." },
      { label: "CP-Algorithms", url: "https://cp-algorithms.com", desc: "Algorithm explanations and implementations." },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { label: "AWS Skill Builder", url: "https://skillbuilder.aws", desc: "Official AWS learning platform." },
      { label: "AWS Documentation", url: "https://docs.aws.amazon.com", desc: "Complete AWS service documentation." },
    ],
  },
  {
    title: "AI & Data Science",
    items: [
      { label: "fast.ai", url: "https://fast.ai", desc: "Practical deep learning courses." },
      { label: "Kaggle Learn", url: "https://kaggle.com/learn", desc: "Short, hands-on data science courses." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Knowledge Observatory</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Curated learning materials, roadmaps, and tools for every stage of your journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="space-y-16">
          {resourceCategories.map((cat, ci) => (
            <div key={cat.title}>
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                  {cat.title}
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => (
                  <ScrollReveal key={item.label} delay={i * 0.06}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold group-hover:text-brand-blue transition-colors">{item.label}</h3>
                        <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                      </div>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
