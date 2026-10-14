import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { AchievementCard, EmptyState } from "@/components/sections/blocks";
import { achievements } from "@/content/achievements";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Achievements", description: "Contest results, awards and recognitions earned by DIA Programming Club members.", path: "/achievements" });

export default function AchievementsPage() {
  return (
    <main>
      <PageHero eyebrow="Achievements" title="Wins worth celebrating" intro="Contest results, awards and recognitions earned by DPC members." />
      <section className="section">
        {achievements.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{achievements.map((a) => <ScrollReveal key={a.id}><AchievementCard a={a} /></ScrollReveal>)}</div>
        ) : (
          <EmptyState title="The trophy shelf is waiting" body="Achievements will be listed here as members compete and win." />
        )}
      </section>
    </main>
  );
}
