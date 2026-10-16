import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Code2, Sparkles, Users } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/sections/blocks";
import { wings } from "@/content/wings";
import { site, siteStats } from "@/content/site";
import { committee } from "@/content/committee";
import { faqs } from "@/content/faq";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About DPC",
  description: "DIA Programming Club (DPC) was founded on 21 June 2015 at Daffodil International Academy, Dhaka. A student-led club built on three pillars: Code, Create, Connect.",
  path: "/about",
  image: "/events/coding-fest-2026-grand-finale/1.webp"
});

const pillars = [
  { k: "Code", icon: Code2, color: "text-brand-blue", d: "Workshops, bootcamps, study circles and contest practice. From a first \"Hello World\" to algorithms and cloud, we learn by writing code together." },
  { k: "Create", icon: Sparkles, color: "text-brand-magenta", d: "Members turn what they learn into real projects in teams: apps, tools, research and hackathon builds that are worth shipping." },
  { k: "Connect", icon: Users, color: "text-[#8b5cf6]", d: "Wings, collaborations, seminars and competitions link DIA students with other clubs, communities, universities and industry." }
];

const activities = [
  "Run and attend workshops, bootcamps and seminars",
  "Practice for programming contests and represent DIA in competitions",
  "Build projects and take part in hackathons",
  "Join study circles and work toward professional certifications",
  "Organize the club's events, content and community as volunteers"
];

const milestones = [
  { when: "21 Jun 2015", what: "DIA Programming Club is founded at Daffodil International Academy, Dhaka." },
  { when: "2025", what: "ICT Fest 2025: a hands-on DevOps workshop." },
  { when: "2026", what: "Coding Fest 2026 Grand Finale." },
  { when: "Today", what: "Organized into wings under the DPC Constitution, with the AWS Student Builders Group as the first and four active wings today." }
];

export default function AboutPage() {
  const activeWings = wings.filter((w) => w.status === "active").length;
  const archived = siteStats.archivedEvents;
  const execs = committee.filter((m) => m.group === "executive").length;
  const stats = [
    { label: "Founded", value: "2015" },
    { label: "Active wings", value: String(activeWings) },
    { label: "Archived events", value: String(archived) },
    { label: "Executive members", value: String(execs) }
  ];
  const aws = wings.find((w) => w.slug === "aws");

  return (
    <main className="overflow-x-clip">
      <JsonLd data={[breadcrumbJsonLd([{ name: "About", path: "/about" }]), faqJsonLd(faqs)]} />
      <PageHero eyebrow={`About / Est. ${site.foundingDateLabel}`} title="Built by students, since 2015" intro={`${site.name} (DPC) is the student-led, non-profit and non-political programming and technology community at ${site.institution}, Dhaka.`} />

      {/* STORY */}
      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <ScrollReveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">A place to get curious, then get building.</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>DPC was founded on <strong className="text-ink">21 June 2015</strong> at Daffodil International Academy as a place for students to learn programming together. That is still the point of the club: anyone at DIA who is curious about technology is welcome, whatever their level.</p>
              <p>Members learn from each other in workshops and study circles, practice for contests, and build real projects in teams. The club also represents DIA at competitions and works with other clubs, communities and organizations.</p>
              <p>Today DPC is run by a student committee with an advisor, under the <Link href="/constitution" className="font-semibold text-brand-blue underline-offset-4 hover:underline">DPC Constitution</Link>, and is organized into focused wings.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <figure className="relative">
              <div className="absolute -inset-3 -z-10 rotate-2 bg-[linear-gradient(135deg,#dfe6ff,#fbe3f1)]" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden border-4 border-white bg-[#eef2ff] shadow-[18px_22px_0_#d8def2]">
                <Image src="/events/coding-fest-2026-grand-finale/1.webp" alt="Finalists and guests at the Coding Fest 2026 Grand Finale, Daffodil International Academy" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">Coding Fest 2026, Grand Finale</figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS (all derived from site content) */}
      <section className="border-y border-line bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-line px-6 py-8 sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="py-3 text-center">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</dt>
              <dd className="mt-1 text-3xl font-bold text-ink sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PILLARS */}
      <section className="section">
        <SectionHeading eyebrow={site.tagline} title="Three pillars, one club." intro="Everything DPC does fits under one of three words." />
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.k} delay={i * 0.08}>
              <div className="card card-hover h-full p-7">
                <p.icon className={`h-7 w-7 ${p.color}`} aria-hidden="true" />
                <h3 className="mt-6 text-3xl text-ink">{p.k}<span className="text-brand-blue">.</span></h3>
                <p className="mt-3 text-sm leading-6 text-muted">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHAT MEMBERS DO + AWS SBG */}
      <section className="border-y border-line bg-[#eef2ff]/60">
        <div className="section grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="card h-full p-7 sm:p-9">
              <p className="eyebrow">Membership</p>
              <h2 className="mt-3 text-3xl text-ink">What members do</h2>
              <ul className="mt-6 space-y-3">
                {activities.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-6 text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta" aria-hidden="true" />{a}</li>
                ))}
              </ul>
              <Link href="/join" className="btn-primary mt-8">Become a member <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="relative h-full overflow-hidden border border-[#fbd5a5] bg-white p-7 sm:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,#ffedd5_0%,transparent_70%)]" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  {aws?.logo && <Image src={aws.logo} alt="" width={40} height={40} />}
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#b45309]">Active wing</p>
                </div>
                <h2 className="mt-4 text-3xl text-ink">AWS Student Builders Group</h2>
                <p className="mt-4 text-sm leading-6 text-muted">{aws?.description ?? "Cloud and AI, learned by building."} The wing runs its own events, which are published on Meetup and appear on this site automatically.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={site.awsSbg} target="_blank" rel="noopener noreferrer" className="btn-primary">Visit aws.diapc.dev <ArrowUpRight size={16} aria-hidden="true" /></a>
                  <a href={site.meetup} target="_blank" rel="noopener noreferrer" className="btn-ghost">Meetup group <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <SectionHeading eyebrow="Timeline" title="Our journey so far." action={{ label: "All events", href: "/events" }} />
        <ol className="relative ml-2 border-l border-line">
          {milestones.map((m, i) => (
            <li key={m.when + i} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-blue shadow-[0_0_0_1px_#c7d2fe]" aria-hidden="true" />
              <ScrollReveal delay={i * 0.05}>
                <p className="font-mono text-xs font-bold text-brand-magenta">{m.when}</p>
                <p className="mt-1 max-w-2xl text-lg text-ink">{m.what}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ (mirrors the FAQPage JSON-LD above) */}
      <section id="faq" className="border-t border-line bg-white">
        <div className="section">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." intro="The basics about DPC, how to join and how to reach us." />
          <div className="max-w-3xl divide-y divide-line border border-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4 open:bg-[#f7f8fc]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 font-mono text-lg text-brand-blue transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">Still curious? Email <a href={`mailto:${site.email}`} className="font-semibold text-brand-blue">{site.email}</a> or visit the <Link href="/contact" className="font-semibold text-brand-blue">contact page</Link>.</p>
        </div>
      </section>
    </main>
  );
}