/* Server-rendered building blocks shared by the homepage and the listing pages. */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Trophy, Code2, ExternalLink, Users } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { EventItem } from "@/lib/events";
import { formatDate } from "@/lib/events";
import type { Achievement } from "@/content/achievements";
import type { Project } from "@/content/projects";
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

export function EmptyState({ title, body, action }: { title: string; body: string; action?: { label: string; href: string; primary?: boolean } }) {
  return (
    <div className="border border-dashed border-[#c9d2e6] bg-white/70 px-6 py-12 text-center">
      <p className="text-lg font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{body}</p>
      {action && (
        <a href={action.href} className={action.primary ? "btn-primary mt-6" : "mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue"}>
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

export function AchievementCard({ a }: { a: Achievement }) {
  const year = a.date ? formatDate(a.date).year : "";
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      {a.image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#eef2ff]">
          <Image src={a.image} alt={a.imageAlt ?? a.title} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-[#d97706] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-white shadow-sm"><Trophy size={13} aria-hidden="true" /> {a.result}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {!a.image && <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4e0] text-[#d97706]"><Trophy size={20} aria-hidden="true" /></span>}
        <p className={`font-mono text-[11px] uppercase tracking-widest text-brand-magenta ${a.image ? "" : "mt-6"}`}>{a.result}{a.scope ? ` · ${a.scope}` : ""}</p>
        <h3 className="mt-2 text-xl text-ink">{a.title}</h3>
        <p className="mt-1 text-sm text-muted">{a.event}{year ? ` · ${year}` : ""}</p>
        {a.description && <p className="mt-3 text-sm leading-6 text-muted">{a.description}</p>}
        {a.members && a.members.length > 0 && <p className="mt-3 text-xs text-muted">Team: {a.members.join(", ")}</p>}
        {a.link && <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4 text-sm font-bold text-brand-blue">Details ↗</a>}
      </div>
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
        <div className="flex items-center justify-between gap-2"><h3 className="text-xl text-ink">{p.title}</h3></div>
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

export function LogoWall({ items }: { items: Collaboration[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c) => (
        <li key={c.name}>
          <a
            href={c.url}
            target={c.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={`${c.name} (opens in a new tab)`}
            className="card card-hover group flex h-full flex-col overflow-hidden"
          >
            <div className={`flex h-32 items-center justify-center p-6 ${c.dark ? "bg-[linear-gradient(135deg,#0f1630,#232f5c)]" : "bg-white"}`}>
              <Image src={c.logo} alt={c.alt ?? c.name} width={240} height={90} className="h-auto max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{c.name}</span>
                {c.type && <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">{c.type}</span>}
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-brand-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </a>
        </li>
      ))}
      <li>
        <Link href="/collaborate" className="flex h-full min-h-[11rem] flex-col items-center justify-center gap-1 border border-dashed border-[#b7c3e2] bg-[#eef2ff] p-5 text-center text-sm font-bold text-brand-blue transition-colors hover:bg-[#e3e9ff]">
          Partner with DPC <span className="font-mono text-[10px] font-normal uppercase tracking-widest text-[#5d6679]">Clubs · orgs · sponsors</span>
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
        {w.external ? "Visit aws.diapc.dev" : w.status === "active" ? "Join this wing" : "Express interest"} <ArrowUpRight size={15} aria-hidden="true" />
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