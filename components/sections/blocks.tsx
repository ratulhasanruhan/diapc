/* Server-rendered building blocks shared by the homepage and the listing pages. */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Trophy, Code2, ExternalLink, Users, ImageIcon } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { EventItem } from "@/lib/events";
import { formatDate } from "@/lib/events";
import type { Achievement } from "@/content/achievements";
import type { Project } from "@/content/projects";
import type { CommitteeMember } from "@/content/committee";
import type { Collaboration } from "@/content/collaborations";
import type { Wing } from "@/content/wings";
import { site } from "@/content/site";

export function SectionHeading({ index, eyebrow, title, intro, action, as: Tag = "h2" }: { index?: string; eyebrow: string; title: string; intro?: string; action?: { label: string; href: string }; as?: "h1" | "h2" }) {
  return (
    <ScrollReveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{index ? `${index} / ` : ""}{eyebrow}</p>
        <Tag className={`mt-4 max-w-2xl text-ink ${Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>{title}</Tag>
        {intro && <p className="mt-4 max-w-xl leading-7 text-muted">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-magenta">
          {action.label} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </ScrollReveal>
  );
}

export function SampleBadge({ show }: { show?: boolean }) {
  return show ? <span className="badge-sample" title="Placeholder content, replace in content/*.ts">Sample</span> : null;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: { label: string; href: string } }) {
  return (
    <div className="border border-dashed border-[#c9d2e6] bg-white/70 px-6 py-12 text-center">
      <p className="text-lg font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{body}</p>
      {action && (
        <a href={action.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue">
          {action.label} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const d = formatDate(event.date);
  const external = event.url?.startsWith("http");
  const body = (
    <>
      <div className="flex w-16 shrink-0 flex-col items-center justify-center self-start border border-line bg-[#eef2ff] px-2 py-2 text-center" aria-hidden="true">
        {d.precision === "day" ? (
          <>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-magenta">{d.month}</span>
            <span className="text-2xl font-bold text-ink">{d.day}</span>
            <span className="font-mono text-[10px] text-muted">{d.year}</span>
          </>
        ) : (
          <>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-magenta">{d.precision === "year" ? "Year" : "Date"}</span>
            <span className="text-lg font-bold text-ink">{d.year || "n/a"}</span>
          </>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {event.wing && <span className="font-mono text-[10px] uppercase tracking-widest text-brand-blue">{event.wing}</span>}
          {event.source === "meetup" && <span className="border border-[#fbd5a5] bg-[#fff7ed] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-[#b45309]">Meetup</span>}
          <SampleBadge show={event.sample} />
          {past && <span className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Past</span>}
        </div>
        <h3 className="mt-1.5 text-xl text-ink">{event.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" />{d.precision === "unknown" ? <span>{d.full}</span> : <time dateTime={event.date}>{d.full}</time>}</span>
          {event.venue && <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{event.venue}</span>}
          {typeof event.rsvps === "number" && event.rsvps > 0 && <span className="inline-flex items-center gap-1.5"><Users size={14} aria-hidden="true" />{event.rsvps} going</span>}
        </p>
        {event.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{event.description}</p>}
      </div>
      {event.url && <ArrowUpRight className="hidden shrink-0 text-brand-blue sm:block" size={20} aria-hidden="true" />}
    </>
  );
  const cls = "card card-hover flex gap-5 p-5";
  return event.url ? (
    <a href={event.url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls}>{body}</a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function EventGallery({ event }: { event: EventItem }) {
  const photos = event.gallery ?? [];
  return (
    <article className="card overflow-hidden">
      {photos.length > 0 ? (
        <div className={`grid gap-1 ${photos.length === 1 ? "grid-cols-1" : photos.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {photos.slice(0, 5).map((p, i) => (
            <div key={p.src} className={`relative overflow-hidden bg-[#eef2ff] ${photos.length === 1 ? "aspect-[16/9]" : photos.length === 2 ? "aspect-[4/5] sm:aspect-square" : `aspect-square ${i === 0 ? "col-span-2 row-span-2" : ""}`}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      ) : event.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.cover} alt={event.coverAlt ?? `Photo from ${event.title}`} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-[repeating-linear-gradient(135deg,#eef2ff_0_10px,#f7f8fc_10px_20px)] text-[#5d6679]">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><ImageIcon size={16} aria-hidden="true" /> Photos coming soon</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{formatDate(event.date).full}</span>
          <SampleBadge show={event.sample} />
        </div>
        <h3 className="mt-1.5 text-lg text-ink">{event.title}</h3>
        {(event.recapUrl || event.url) && (
          <a href={event.recapUrl ?? event.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-blue">
            {event.recapUrl ? "View recap" : "Event page"} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function AchievementCard({ a }: { a: Achievement }) {
  return (
    <article className="card card-hover flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4e0] text-[#d97706]"><Trophy size={20} aria-hidden="true" /></span>
        <SampleBadge show={a.sample} />
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-brand-magenta">{a.result}{a.scope ? ` · ${a.scope}` : ""}</p>
      <h3 className="mt-2 text-xl text-ink">{a.title}</h3>
      <p className="mt-1 text-sm text-muted">{a.event} · {formatDate(a.date).year}</p>
      {a.description && <p className="mt-3 text-sm leading-6 text-muted">{a.description}</p>}
      {a.members && a.members.length > 0 && <p className="mt-3 text-xs text-muted">Team: {a.members.join(", ")}</p>}
      {a.link && <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4 text-sm font-bold text-brand-blue">Details ↗</a>}
    </article>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      {p.image ? (
        <div className="relative aspect-[16/10] bg-[#eef2ff]"><Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,#eef2ff,#fdf2f8)] font-mono text-sm text-[#5d6679]" aria-hidden="true">{"</>"}</div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2"><h3 className="text-xl text-ink">{p.title}</h3><SampleBadge show={p.sample} /></div>
        <p className="mt-2 text-sm leading-6 text-muted">{p.description}</p>
        {p.tags && <ul className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t} className="border border-line px-2 py-0.5 font-mono text-[10px] text-muted">{t}</li>)}</ul>}
        {(p.repo || p.demo) && (
          <div className="mt-auto flex gap-4 pt-5 text-sm font-bold">
            {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-brand-blue"><Code2 size={15} aria-hidden="true" /> Code</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-blue"><ExternalLink size={15} aria-hidden="true" /> Live</a>}
          </div>
        )}
      </div>
    </article>
  );
}

const initials = (n: string) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Featured advisor card: large portrait, gradient frame, orbit accents. */
export function AdvisorCard({ m }: { m: CommitteeMember }) {
  return (
    <article className="group relative overflow-hidden border border-line bg-white shadow-[0_24px_60px_-36px_rgba(36,84,215,.45)]">
      <div className="paper-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#dfe6ff_0%,transparent_65%)]" aria-hidden="true" />
      <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-[radial-gradient(circle,#fbe3f1_0%,transparent_65%)]" aria-hidden="true" />
      <div className="relative grid items-center gap-6 p-5 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-8">
        <div className="relative mx-auto w-44 sm:w-52">
          <div className="absolute -inset-2 rounded-[28px] bg-[linear-gradient(135deg,#2454d7,#8b3fb8,#c23b91)] opacity-90 transition-transform duration-500 group-hover:rotate-2" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border-4 border-white bg-[#eef2ff]">
            {m.photo ? (
              <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="208px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <span className="flex h-full items-center justify-center text-5xl font-bold text-brand-blue" aria-hidden="true">{initials(m.name)}</span>
            )}
          </div>
          <span className="absolute -right-3 top-6 h-3 w-3 rounded-full bg-[#f59e0b] shadow-[0_0_0_4px_#fff]" aria-hidden="true" />
          <span className="absolute -left-3 bottom-10 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_0_3px_#fff]" aria-hidden="true" />
        </div>
        <div className="text-center sm:text-left">
          <p className="inline-flex items-center gap-2 border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-magenta">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" aria-hidden="true" /> Advisor
          </p>
          <h3 className="mt-4 text-3xl text-ink sm:text-4xl">{m.name}</h3>
          <p className="mt-2 text-base font-semibold text-brand-blue">{m.role}</p>
          <p className="mt-1 text-sm text-muted">Daffodil International Academy</p>
        </div>
      </div>
    </article>
  );
}

/** Executive member card: consistent 4:5 portrait, role tags, hover lift. */
export function MemberCard({ m }: { m: CommitteeMember }) {
  return (
    <article className="group relative h-full overflow-hidden border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b7c3e2] hover:shadow-[0_24px_50px_-28px_rgba(36,84,215,.45)] focus-within:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(160deg,#e8edff,#f5f0ff)]">
        {m.photo ? (
          <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center" aria-hidden="true">
            <div className="paper-grid absolute inset-0 opacity-60" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-magenta text-2xl font-bold text-white shadow-[6px_8px_0_#d8def2] sm:h-24 sm:w-24 sm:text-3xl">{initials(m.name)}</span>
            <span className="relative mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#5d6679]">Photo soon</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#17213d]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <span className="absolute left-0 top-0 h-1 w-0 bg-[linear-gradient(90deg,#2454d7,#c23b91)] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm leading-snug text-ink sm:text-base">{m.name}</h3>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-brand-blue sm:text-[10px]">{m.role}</p>
        {m.tags && m.tags.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1" aria-label="Areas">
            {m.tags.map((t) => <li key={t} className="border border-line bg-[#f7f8fc] px-1.5 py-0.5 text-[10px] font-medium text-muted sm:text-[11px]">{t}</li>)}
          </ul>
        )}
        {m.links && m.links.length > 0 && (
          <p className="mt-2 flex gap-3 text-xs">{m.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand-blue">{l.label}</a>)}</p>
        )}
      </div>
    </article>
  );
}

/** Advisor + executive grid, used on the homepage and /committee. */
export function CommitteeShowcase({ members, limit }: { members: CommitteeMember[]; limit?: number }) {
  const advisors = members.filter((m) => m.group === "advisor");
  const execs = members.filter((m) => m.group === "executive").sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
  const shown = typeof limit === "number" ? execs.slice(0, limit) : execs;
  return (
    <div className="space-y-8 sm:space-y-10">
      {advisors.map((m) => <ScrollReveal key={m.id}><AdvisorCard m={m} /></ScrollReveal>)}
      {shown.length > 0 && (
        <div>
          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink">Executive members</h3>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="font-mono text-[10px] text-muted">{execs.length}</span>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {shown.map((m, i) => <li key={m.id}><ScrollReveal delay={(i % 4) * 0.05} className="h-full"><MemberCard m={m} /></ScrollReveal></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function LogoWall({ items }: { items: Collaboration[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => {
        const inner = (
          <div className={`flex h-32 flex-col items-center justify-center gap-2 bg-white p-5 text-center transition-colors hover:bg-[#f7f8fc] ${c.sample ? "opacity-70" : ""}`}>
            {c.logo ? (
              <>
                <Image src={c.logo} alt="" width={120} height={48} className="h-10 w-auto max-w-[140px] object-contain" />
                <span className="text-xs font-semibold text-ink">{c.name}</span>
              </>
            ) : (
              <span className={`text-sm font-semibold ${c.sample ? "text-muted" : "text-ink"}`}>{c.name}</span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">{c.type}{c.sample && <SampleBadge show />}</span>
          </div>
        );
        return <li key={c.name}>{c.url ? <a href={c.url} target={c.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={c.name}>{inner}</a> : inner}</li>;
      })}
      <li>
        <Link href="/collaborate" className="flex h-32 flex-col items-center justify-center gap-1 bg-[#eef2ff] p-5 text-center text-sm font-bold text-brand-blue hover:bg-[#e3e9ff]">
          Partner with DPC <span className="font-mono text-[10px] font-normal uppercase tracking-widest text-muted">Clubs · orgs · sponsors</span>
        </Link>
      </li>
    </ul>
  );
}

export function WingCard({ w }: { w: Wing }) {
  return (
    <a
      href={w.href}
      {...(w.external ? { target: "_blank", rel: "noopener" } : {})}
      className="card card-hover group relative flex h-full flex-col p-6"
      style={w.status === "active" ? { borderColor: `${w.accent}66`, background: `linear-gradient(160deg, ${w.accent}14, #fff 55%)` } : undefined}
    >
      <div className="flex items-start justify-between">
        {w.logo ? (
          <Image src={w.logo} alt="" width={44} height={44} className="h-11 w-11" />
        ) : (
          <span className="h-11 w-11 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, #fff, ${w.accent} 70%)` }} aria-hidden="true" />
        )}
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: w.status === "active" ? "#b45309" : "#5d6679" }}>{w.status === "active" ? "● Active" : "Proposed"}</span>
      </div>
      <h3 className="mt-6 text-xl text-ink">{w.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{w.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold" style={{ color: w.status === "active" ? "#b45309" : "#2454d7" }}>
        {w.external ? "Visit aws.diapc.dev" : "Express interest"} <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}

/** "Live from Meetup" label: AWS SBG events are pulled from Meetup and refreshed hourly. */
export function MeetupLiveLabel({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <span className="inline-flex items-center gap-2 border border-[#fbd5a5] bg-[#fff7ed] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45309]">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ea580c]" />
        </span>
        Live from Meetup
      </span>
      <a href={site.meetup} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline">
        AWS SBG on Meetup <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <span className="text-xs text-muted">AWS SBG events sync hourly; DPC events come from our own archive.</span>
    </div>
  );
}