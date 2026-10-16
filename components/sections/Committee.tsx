/* Committee showcase: advisor, president and convener leadership tier, then the executive grid. Server component. */
import Image from "next/image";
import { Mail } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { CommitteeMember } from "@/content/committee";

const initials = (n: string) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const BADGE: Record<string, { label: string; dot: string; text: string; ring: string }> = {
  advisor: { label: "Advisor", dot: "bg-brand-magenta", text: "text-brand-magenta", ring: "from-[#8b3fb8] via-[#c23b91] to-[#f59e0b]" },
  president: { label: "President", dot: "bg-brand-blue", text: "text-brand-blue", ring: "from-[#2454d7] via-[#5b7cf0] to-[#8b3fb8]" },
  convener: { label: "Convener", dot: "bg-[#0e8f6e]", text: "text-[#0b7a5e]", ring: "from-[#0891b2] via-[#2454d7] to-[#8b3fb8]" },
  executive: { label: "Executive", dot: "bg-brand-blue", text: "text-brand-blue", ring: "" }
};

function EmailLink({ m, className = "" }: { m: CommitteeMember; className?: string }) {
  if (!m.email) return null;
  return (
    <a
      href={`mailto:${m.email}`}
      aria-label={`Email ${m.name}`}
      className={`inline-flex items-center gap-1.5 border border-line bg-white px-2.5 py-1 text-xs font-bold text-brand-blue transition-colors hover:border-brand-blue hover:bg-[#eef2ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${className}`}
    >
      <Mail size={13} aria-hidden="true" /> Email
    </a>
  );
}

function RoleBadge({ group }: { group: string }) {
  const b = BADGE[group] ?? BADGE.executive;
  return (
    <p className={`inline-flex items-center gap-2 border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${b.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} aria-hidden="true" /> {b.label}
    </p>
  );
}

/** Leadership card (advisor, president, convener): large framed portrait, role badge, optional email. */
function LeaderCard({ m, featured = false }: { m: CommitteeMember; featured?: boolean }) {
  const b = BADGE[m.group] ?? BADGE.executive;
  return (
    <article className="group relative h-full overflow-hidden border border-line bg-white shadow-[0_24px_60px_-36px_rgba(36,84,215,.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-34px_rgba(36,84,215,.55)]">
      <div className="paper-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#dfe6ff_0%,transparent_65%)]" aria-hidden="true" />
      <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-[radial-gradient(circle,#fbe3f1_0%,transparent_65%)]" aria-hidden="true" />
      <div className={`relative grid items-center gap-6 p-5 sm:gap-8 sm:p-8 ${featured ? "sm:grid-cols-[auto_1fr] sm:gap-10" : "sm:grid-cols-[auto_1fr]"}`}>
        <div className={`relative mx-auto ${featured ? "w-44 sm:w-56" : "w-40 sm:w-40 lg:w-44"}`}>
          <div className={`absolute -inset-2 rounded-[28px] bg-gradient-to-br ${b.ring} opacity-90 transition-transform duration-500 group-hover:rotate-2`} aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border-4 border-white bg-[#eef2ff]">
            {m.photo ? (
              <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes={featured ? "224px" : "176px"} className="object-cover transition-transform duration-500 group-hover:scale-105" priority={featured} />
            ) : (
              <span className="flex h-full items-center justify-center text-5xl font-bold text-brand-blue" aria-hidden="true">{initials(m.name)}</span>
            )}
          </div>
          <span className="absolute -right-3 top-6 h-3 w-3 rounded-full bg-[#f59e0b] shadow-[0_0_0_4px_#fff]" aria-hidden="true" />
          <span className="absolute -left-3 bottom-10 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_0_3px_#fff]" aria-hidden="true" />
        </div>
        <div className="text-center sm:text-left">
          <RoleBadge group={m.group} />
          <h3 className={`mt-4 text-ink ${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{m.name}</h3>
          <p className="mt-2 text-base font-semibold text-brand-blue">{m.role}</p>
          <p className="mt-1 text-sm text-muted">DIA Programming Club{m.group === "advisor" ? " · Daffodil International Academy" : ""}</p>
          {m.email && <EmailLink m={m} className="mt-4" />}
        </div>
      </div>
    </article>
  );
}

/** Executive member card: consistent 4:5 portrait, hover card with focus areas, role badge. */
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
        <span className="absolute left-2 top-2 border border-line bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-brand-blue">Executive</span>
        {m.tags && m.tags.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-[#101938]/90 via-[#101938]/70 to-transparent px-3 pb-3 pt-10 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">Focus areas</p>
            <ul className="mt-1.5 flex flex-wrap gap-1">{m.tags.map((t) => <li key={t} className="bg-white/95 px-1.5 py-0.5 text-[11px] font-semibold text-[#17213d]">{t}</li>)}</ul>
          </div>
        )}
        <span className="absolute left-0 top-0 h-1 w-0 bg-[linear-gradient(90deg,#2454d7,#c23b91)] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm leading-snug text-ink sm:text-base">{m.name}</h3>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-brand-blue sm:text-[10px]">{m.role}</p>
        {m.tags && m.tags.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1 md:hidden" aria-label="Areas">
            {m.tags.map((t) => <li key={t} className="border border-line bg-[#f7f8fc] px-1.5 py-0.5 text-[10px] font-medium text-muted">{t}</li>)}
          </ul>
        )}
        <EmailLink m={m} className="mt-3" />
      </div>
    </article>
  );
}

/** Hierarchy: advisor, president + convener, then executive members. Used on the homepage and /committee. */
export function CommitteeShowcase({ members, limit }: { members: CommitteeMember[]; limit?: number }) {
  const pick = (g: CommitteeMember["group"]) => members.filter((m) => m.group === g);
  const advisors = pick("advisor");
  const duo = [...pick("president"), ...pick("convener")];
  const execs = pick("executive").sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
  const shown = typeof limit === "number" ? execs.slice(0, limit) : execs;
  return (
    <div className="space-y-6 sm:space-y-8">
      {advisors.map((m) => <ScrollReveal key={m.id}><LeaderCard m={m} featured /></ScrollReveal>)}
      {duo.length > 0 && (
        <>
          <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#b7c3e2] to-transparent" aria-hidden="true" />
          <ul className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {duo.map((m, i) => <li key={m.id}><ScrollReveal delay={i * 0.06} className="h-full"><LeaderCard m={m} /></ScrollReveal></li>)}
          </ul>
        </>
      )}
      {shown.length > 0 && (
        <div className="pt-4 sm:pt-6">
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
