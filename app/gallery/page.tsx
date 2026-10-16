import PageHero from "@/components/sections/PageHero";
import { EmptyState } from "@/components/sections/blocks";
import PastEvents from "@/components/sections/PastEvents";
import { getEvents } from "@/lib/events";
import { toPastViews } from "@/lib/pastEvents";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({ title: "Gallery", description: "Photos and recaps from DIA Programming Club events: Coding Fest, ICT Fest, APOAI and more.", path: "/gallery", image: "/events/coding-fest-2026-grand-finale/1.webp" });

export default async function GalleryPage() {
  const { past } = await getEvents();
  const views = toPastViews(past).filter((v) => v.photos.length > 0);
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />
      <PageHero eyebrow="Gallery" title="The mission log" intro="Photos and recaps from past DPC events. Tap a photo to view it full screen." />
      <section className="section">
        {views.length ? <PastEvents events={views} /> : <EmptyState title="No photos yet" body="Event photos will appear here after our first sessions." />}
      </section>
    </main>
  );
}
