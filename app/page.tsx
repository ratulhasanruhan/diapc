import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, CalendarDays } from "lucide-react";
import AstronautVector from "@/components/illustrations/AstronautVector";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { SectionHeading, EventCard, EventGallery, AchievementCard, ProjectCard, MemberCard, LogoWall, WingCard, EmptyState } from "@/components/sections/blocks";
import { site } from "@/content/site";
import { collaborations } from "@/content/collaborations";
import { achievements } from "@/content/achievements";
import { projects } from "@/content/projects";
import { committee } from "@/content/committee";
import { wings } from "@/content/wings";
import { getEvents } from "@/lib/events";
import { pageMeta, JsonLd } from "@/lib/seo";
import { eventJsonLd } from "@/lib/jsonld";
import { MiniAstronaut, Satellite, RingedPlanet } from "@/components/space/Art";
import SpaceDivider from "@/components/space/SpaceDivider";
import MotionGate from "@/components/space/MotionGate";

export const metadata = pageMeta({ description: site.description, path: "/" });

const pillars = [
  { k: "Code", d: "Workshops, contest practice and peer learning, from first program to algorithms." },
  { k: "Create", d: "Real projects in teams: apps, tools, research and things worth shipping." },
  { k: "Connect", d: "Wings, collaborations and events that link students with the wider tech community." }
];

export default async function Home() {
  const { upcoming, past } = await getEvents();
  const featuredProjects = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 3);
  const leaders = committee.filter((m) => m.group === "advisor" || m.group === "executive").slice(0, 6);

  return (
    <main className="overflow-hidden">
      <MotionGate />
      <JsonLd data={upcoming.filter((e) => !e.sample).slice(0, 5).map(eventJsonLd)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-paper px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="paper-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" aria-hidden="true" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,#dfe6ff_0%,transparent_65%)]" aria-hidden="true" />
        <div className="absolute -bottom-48 -left-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#fbe3f1_0%,transparent_65%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative z-10">
            <p className="inline-flex flex-wrap items-center gap-2 border border-line bg-white/80 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-muted shadow-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16845b]" aria-hidden="true" /> EST. {site.foundingDateLabel.toUpperCase()}<span className="hidden sm:inline"> · {site.institution.toUpperCase()}</span>
            </p>
            <h1 className="mt-7 max-w-3xl text-[44px] leading-[1.02] text-ink sm:text-7xl lg:text-[84px]">
              We turn <span className="text-gradient">curiosity</span> into code<span className="text-brand-magenta">.</span>
            </h1>
            <p className="mt-6 font-mono text-xs font-semibold tracking-[0.32em] text-brand-magenta sm:text-sm">{site.tagline}</p>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">{site.fullName} is the student-led programming and technology community at {site.institution}, Dhaka.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/join" className="btn-primary">Join DPC <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link href="#events" className="btn-ghost"><CalendarDays size={16} aria-hidden="true" /> Upcoming events</Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line border-y border-line py-4 text-center">
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Since</dt><dd className="mt-1 text-lg font-bold sm:text-2xl text-ink">2015</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Active wing</dt><dd className="mt-1 text-lg font-bold sm:text-2xl text-[#d97706]">AWS SBG</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Open to</dt><dd className="mt-1 text-lg font-bold sm:text-2xl text-ink">All levels</dd></div>
            </dl>
          </div>

          <div data-space className="space-layer relative mx-auto h-[340px] w-full max-w-[480px] sm:h-[460px]" aria-hidden="true">
            <div className="orbit-line absolute left-1/2 top-1/2 h-[220px] w-[400px] -translate-x-1/2 -translate-y-1/2 sm:h-[270px] sm:w-[500px]" />
            <div className="orbit-line absolute left-1/2 top-1/2 h-[320px] w-[230px] -translate-x-1/2 -translate-y-1/2 rotate-[62deg] sm:h-[400px] sm:w-[280px]" />
            <div className="orbit-spin absolute z-20 left-1/2 top-1/2 -ml-[170px] -mt-[170px] h-[340px] w-[340px] sm:-ml-[215px] sm:-mt-[215px] sm:h-[430px] sm:w-[430px]">
              <Satellite className="absolute left-1/2 top-0 w-16 -translate-x-1/2 sm:w-20" />
            </div>
            <span className="twinkle absolute left-[6%] top-[40%] h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span className="twinkle delay-2 absolute right-[4%] top-[14%] h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span className="twinkle delay-3 absolute bottom-[8%] left-[40%] h-1.5 w-1.5 rounded-full bg-brand-magenta" />
            <div className="bob absolute left-[2%] top-[4%] h-12 w-12 rounded-full bg-brand-magenta shadow-[8px_10px_0_#f4c6e2] sm:h-16 sm:w-16" />
            <RingedPlanet className="bob bob-slow absolute bottom-[4%] right-[0%] w-24 sm:w-28" color="#c7d2fe" />
            <div className="anim drift-float relative z-10 mx-auto h-full w-[230px] overflow-hidden rounded-[48%_48%_42%_42%] border-[10px] border-white bg-[linear-gradient(180deg,#e8edff,#f5f0ff)] shadow-[18px_22px_0_#d8def2] sm:w-[290px]">
              <AstronautVector className="relative z-10 h-full w-full p-5" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white p-2 shadow-lg"><Image src="/brand/classic_logo.png" alt="" width={32} height={32} /></div>
            </div>
            <div className="anim drift-float absolute -right-2 top-[18%] z-20 w-14 [animation-delay:-4s] sm:right-[-4%] sm:w-20">
              <MiniAstronaut className="bob h-auto w-full" visor="#8b5cf6" accent="#2454d7" />
            </div>
            <div className="absolute bottom-0 left-0 z-20 bg-white px-3 py-2 font-mono text-[10px] tracking-wider text-muted shadow-sm">{site.motto}</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-y border-line bg-white">
        <div className="section">
          <SectionHeading index="01" eyebrow="About" title="A launchpad for student builders." intro="Open to every DIA student who is curious about technology, whatever your level. We learn in public, build together and help each other ship." action={{ label: "More about DPC", href: "/about" }} />
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.k} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <p className="font-mono text-xs text-brand-magenta">0{i + 1}</p>
                  <h3 className="mt-6 text-3xl text-ink">{p.k}<span className="text-brand-blue">.</span></h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{p.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SpaceDivider variant={0} />

      {/* COLLABORATIONS */}
      <section id="collaborations" className="cv-auto">
        <div className="section">
          <SectionHeading index="02" eyebrow="Collaborations" title="Who we build with." intro="Clubs, communities and organizations DPC has partnered with." action={{ label: "Collaborate with us", href: "/collaborate" }} />
          <ScrollReveal><LogoWall items={collaborations} /></ScrollReveal>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section id="events" className="border-y border-line bg-[#eef2ff]/60">
        <div className="section">
          <SectionHeading index="03" eyebrow="Upcoming events" title="Missions in the making." action={{ label: "All events", href: "/events" }} />
          {upcoming.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {upcoming.slice(0, 4).map((e, i) => <ScrollReveal key={e.id} delay={i * 0.06}><EventCard event={e} /></ScrollReveal>)}
            </div>
          ) : (
            <EmptyState title="No upcoming events right now" body="New sessions are announced on Facebook and Meetup first. Follow along so you don't miss the next one." action={{ label: "Follow DPC on Facebook", href: site.facebook }} />
          )}
        </div>
      </section>

      {/* PAST EVENTS */}
      <section id="past-events" className="cv-auto">
        <div className="section">
          <SectionHeading index="04" eyebrow="Past events" title="Moments from the mission log." action={{ label: "Full gallery", href: "/gallery" }} />
          {past.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.slice(0, 3).map((e, i) => <ScrollReveal key={e.id} delay={i * 0.06}><EventGallery event={e} /></ScrollReveal>)}
            </div>
          ) : (
            <EmptyState title="Our story starts here" body="Photos and recaps from DPC events will appear here." />
          )}
        </div>
      </section>

      <SpaceDivider variant={1} />

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="cv-auto border-y border-line bg-white">
        <div className="section">
          <SectionHeading index="05" eyebrow="Achievements" title="Wins worth celebrating." action={{ label: "All achievements", href: "/achievements" }} />
          <p className="-mt-6 mb-8 text-sm text-muted">Won something as a DPC member? <Link href="/submit/achievement" className="font-semibold text-brand-blue">Submit an achievement →</Link></p>
          {achievements.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.slice(0, 3).map((a, i) => <ScrollReveal key={a.id} delay={i * 0.06}><AchievementCard a={a} /></ScrollReveal>)}
            </div>
          ) : (
            <EmptyState title="The trophy shelf is waiting" body="Contest results and recognitions earned by DPC members will be listed here." action={{ label: "Submit an achievement", href: "/submit/achievement" }} />
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="cv-auto">
        <div className="section">
          <SectionHeading index="06" eyebrow="Projects" title="Things our members ship." action={{ label: "All projects", href: "/projects" }} />
          <p className="-mt-6 mb-8 text-sm text-muted">Built something? <Link href="/submit/project" className="font-semibold text-brand-blue">Submit a project →</Link></p>
          {featuredProjects.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p, i) => <ScrollReveal key={p.id} delay={i * 0.06}><ProjectCard p={p} /></ScrollReveal>)}
            </div>
          ) : (
            <EmptyState title="First projects are in the works" body="Built something with DPC? Tell us and we'll feature it." action={{ label: "Submit a project", href: "/submit/project" }} />
          )}
        </div>
      </section>

      {/* COMMITTEE */}
      <section id="committee" className="cv-auto border-y border-line bg-white">
        <div className="section">
          <SectionHeading index="07" eyebrow="Committee" title="The crew behind DPC." action={{ label: "Full committee", href: "/committee" }} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((m, i) => <ScrollReveal key={`${m.role}-${i}`} delay={i * 0.05}><MemberCard m={m} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      <SpaceDivider variant={2} />

      {/* WINGS */}
      <section id="wings" className="cv-auto">
        <div className="section">
          <SectionHeading index="08" eyebrow="Wings" title="Find your orbit." intro="Focused sub-communities inside DPC. Active and proposed wings are clearly marked." action={{ label: "All wings", href: "/wings" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wings.slice(0, 6).map((w, i) => <ScrollReveal key={w.slug} delay={i * 0.05}><WingCard w={w} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-space className="space-layer relative overflow-hidden bg-[linear-gradient(135deg,#c23b91,#8b3fb8_60%,#2454d7)] text-white">
        <span className="twinkle absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
        <span className="twinkle delay-2 absolute right-[30%] top-[12%] h-1 w-1 rounded-full bg-white" aria-hidden="true" />
        <span className="twinkle delay-3 absolute bottom-[14%] left-[44%] h-1.5 w-1.5 rounded-full bg-[#ffd27a]" aria-hidden="true" />
        <div className="anim drift-float pointer-events-none absolute right-[4%] top-8 hidden w-24 opacity-90 md:block lg:right-[38%]" aria-hidden="true"><MiniAstronaut className="bob h-auto w-full" visor="#17213d" accent="#ffd27a" /></div>
        <div className="section grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <ScrollReveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#f8d9ed]">09 / Contact</p>
            <h2 className="mt-5 max-w-2xl text-5xl sm:text-6xl">Ready to make something real?</h2>
            <p className="mt-5 max-w-lg text-[#fbe7f3]">Questions, collaborations or sponsorships: write to us and a real person from the club will reply.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex flex-col gap-3">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 bg-white px-5 py-3.5 text-sm font-bold text-brand-magenta transition-transform hover:-translate-y-0.5"><Mail size={17} aria-hidden="true" /> {site.email}</a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/50 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10"><span className="flex h-4 w-4 items-center justify-center bg-white text-[11px] font-bold text-brand-magenta" aria-hidden="true">f</span> facebook.com/diadpc</a>
            <Link href="/join" className="inline-flex items-center gap-2 px-1 py-2 text-sm font-bold text-white underline-offset-4 hover:underline">Join DPC <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
