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
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-magenta">{d.month}</span>
        <span className="text-2xl font-bold text-ink">{d.day}</span>
        <span className="font-mono text-[10px] text-muted">{d.year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {event.wing && <span className="font-mono text-[10px] uppercase tracking-widest text-brand-blue">{event.wing}</span>}
          <SampleBadge show={event.sample} />
          {past && <span className="font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">Past</span>}
        </div>
        <h3 className="mt-1.5 text-xl text-ink">{event.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" /><time dateTime={event.date}>{d.full}</time></span>
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
        <div className="grid grid-cols-3 gap-1">
          {photos.slice(0, 5).map((p, i) => (
            <div key={p.src} className={`relative bg-[#eef2ff] ${i === 0 ? "col-span-2 row-span-2" : ""} aspect-square`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      ) : event.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.cover} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-[repeating-linear-gradient(135deg,#eef2ff_0_10px,#f7f8fc_10px_20px)] text-[#98a2b3]">
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
        <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,#eef2ff,#fdf2f8)] font-mono text-sm text-[#98a2b3]" aria-hidden="true">{"</>"}</div>
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

export function MemberCard({ m }: { m: CommitteeMember }) {
  return (
    <article className={`card flex items-center gap-4 p-5 ${m.placeholder ? "border-dashed" : ""}`}>
      {m.photo ? (
        <Image src={m.photo} alt={m.name} width={64} height={80} className="h-20 w-16 shrink-0 object-cover" />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-magenta font-bold text-white" aria-hidden="true">
          {m.placeholder ? "?" : initials(m.name)}
        </span>
      )}
      <div className="min-w-0">
        <h3 className={`text-lg ${m.placeholder ? "text-muted" : "text-ink"}`}>{m.name}</h3>
        <p className="text-sm text-brand-blue">{m.role}</p>
        {m.links && m.links.length > 0 && (
          <p className="mt-1 flex gap-3 text-xs">{m.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand-blue">{l.label}</a>)}</p>
        )}
      </div>
    </article>
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
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">{c.type}{c.sample && <SampleBadge show />}</span>
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
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: w.status === "active" ? "#b45309" : "#98a2b3" }}>{w.status === "active" ? "● Active" : "Proposed"}</span>
      </div>
      <h3 className="mt-6 text-xl text-ink">{w.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{w.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold" style={{ color: w.status === "active" ? "#b45309" : "#2454d7" }}>
        {w.external ? "Visit aws.diapc.dev" : "Express interest"} <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}
