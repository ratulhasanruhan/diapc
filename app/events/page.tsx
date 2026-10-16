import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { EventCard, EmptyState, SectionHeading, MeetupLiveLabel } from "@/components/sections/blocks";
import { getEvents, datePrecision } from "@/lib/events";
import { toPastViews } from "@/lib/pastEvents";
import PastEvents from "@/components/sections/PastEvents";
import { eventJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMeta({ title: "Events", description: "Upcoming and past DIA Programming Club events: workshops, contests, builder sessions and AWS Student Builders Group meetups.", path: "/events", image: "/events/ict-fest-2025-devops-workshop/cover.webp" });

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Events", path: "/events" }]), ...[...upcoming, ...past].filter((e) => !e.sample && datePrecision(e.date) === "day").map(eventJsonLd)]} />
      <PageHero eyebrow="Events" title="Workshops, contests and meetups" intro="Everything DPC and its wings are running. AWS Student Builders Group events sync automatically from Meetup.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn-primary">Follow on Facebook <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={site.meetup} target="_blank" rel="noopener noreferrer" className="btn-ghost">AWS SBG on Meetup <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </PageHero>
      <section className="section">
        <SectionHeading eyebrow="Upcoming" title="Next up" />
        <MeetupLiveLabel className="-mt-4 mb-8" />
        {upcoming.length ? (
          <div className="grid gap-4 lg:grid-cols-2">{upcoming.map((e) => <ScrollReveal key={e.id}><EventCard event={e} /></ScrollReveal>)}</div>
        ) : (
          <EmptyState title="No upcoming events right now" body="New events are announced on Facebook and Meetup first." action={{ label: "Follow DPC on Facebook", href: site.facebook }} />
        )}
      </section>
      <section className="section cv-auto pt-0">
        <SectionHeading eyebrow="Archive" title="Past events" action={{ label: "Photo gallery", href: "/gallery" }} />
        {past.length ? (
          <PastEvents events={toPastViews(past)} />
        ) : (
          <EmptyState title="No past events yet" body="Our event history starts soon." />
        )}
      </section>
    </main>
  );
}
