import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { EventGallery, EmptyState } from "@/components/sections/blocks";
import { getEvents } from "@/lib/events";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Gallery", description: "Photos and recaps from DIA Programming Club events.", path: "/gallery" });

export default async function GalleryPage() {
  const { past } = await getEvents();
  return (
    <main>
      <PageHero eyebrow="Gallery" title="The mission log" intro="Photos and recaps from past DPC events." />
      <section className="section">
        {past.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{past.map((e) => <ScrollReveal key={e.id}><EventGallery event={e} /></ScrollReveal>)}</div>
        ) : (
          <EmptyState title="No photos yet" body="Event photos will appear here after our first sessions." />
        )}
      </section>
    </main>
  );
}
