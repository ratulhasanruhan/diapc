import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { MemberCard, SectionHeading } from "@/components/sections/blocks";
import { committee, type CommitteeMember } from "@/content/committee";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Committee", description: "The students and advisors who lead DIA Programming Club.", path: "/committee" });

const groups: { key: CommitteeMember["group"]; title: string }[] = [
  { key: "advisor", title: "Advisors" },
  { key: "executive", title: "Executive committee" },
  { key: "lead", title: "Wing & team leads" },
  { key: "member", title: "Members" }
];

export default function CommitteePage() {
  return (
    <main>
      <PageHero eyebrow="Committee" title="The crew behind DPC" intro="The students and advisors who lead, organize and build the club." />
      {groups.map((g) => {
        const list = committee.filter((m) => m.group === g.key);
        if (!list.length) return null;
        return (
          <section key={g.key} className="section pb-0">
            <SectionHeading eyebrow="DPC" title={g.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((m, i) => <ScrollReveal key={`${m.role}-${i}`}><MemberCard m={m} /></ScrollReveal>)}</div>
          </section>
        );
      })}
      <p className="section text-center font-mono text-xs text-muted">Committee positions are pending the first election under the DPC Constitution.</p>
    </main>
  );
}
