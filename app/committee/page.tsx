import PageHero from "@/components/sections/PageHero";
import { CommitteeShowcase } from "@/components/sections/blocks";
import { committee } from "@/content/committee";
import { committeeJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Committee",
  description: "Meet the DIA Programming Club committee: advisor Rakibul Hasan Prince and the executive members who run DPC events, tech, content and community.",
  path: "/committee",
  image: "/committee/rakibul-hasan-prince.webp"
});

export default function CommitteePage() {
  return (
    <main>
      <JsonLd data={committeeJsonLd(committee)} />
      <PageHero eyebrow="Committee" title="The crew behind DPC" intro="The advisor and executive members who organize events, run the tech, tell the club's story and look after the community." />
      <section className="section">
        <CommitteeShowcase members={committee} />
      </section>
    </main>
  );
}