"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Cloud, Compass, Sparkles } from "lucide-react";
import AstronautVector from "@/components/illustrations/AstronautVector";

const destinations = [
  { label: "AWS Student Builders", note: "Cloud + certifications", href: "/aws", accent: "#f59e0b", icon: Cloud, active: true },
  { label: "Competitive Programming", note: "Algorithms + problem solving", href: "/join?wing=competitive-programming", accent: "#2454d7", icon: Code2, active: false },
  { label: "AI & Data Science", note: "A proposed learning path", href: "/join?wing=ai-ml", accent: "#8b5cf6", icon: Sparkles, active: false },
];

const events = [
  { date: "Coming soon", title: "AWS Cloud Practitioner Workshop", wing: "AWS Student Builders", color: "#f59e0b" },
  { date: "Coming soon", title: "Intro to Competitive Programming", wing: "Competitive Programming", color: "#2454d7" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[720px] bg-[#fbfaf7] px-6 pb-24 pt-36 sm:pt-44">
        <div className="paper-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <span className="star-dot left-[11%] top-[27%]" aria-hidden="true" />
        <span className="star-dot right-[16%] top-[22%] bg-[#2454d7]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <p className="mb-6 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#667085]">DAFFODIL INTERNATIONAL ACADEMY · DHAKA, BANGLADESH</p>
            <h1 className="max-w-3xl text-6xl text-[#17213d] sm:text-7xl lg:text-[88px]">
              We turn <span className="text-[#2454d7]">curiosity</span> into code<span className="text-[#c23b91]">.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-8 text-[#667085]">A community of builders, thinkers, and future-shapers. Find your orbit, learn out loud, and make something that matters.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="#universe" className="inline-flex items-center gap-2 bg-[#2454d7] px-5 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-1">Explore DPC <ArrowUpRight size={17} /></Link>
              <Link href="/join" className="inline-flex items-center gap-2 border-b-2 border-[#c23b91] px-1 py-3 text-sm font-bold text-[#17213d]">Join the mission <span aria-hidden="true">↗</span></Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto h-[420px] w-full max-w-[500px]">
            <div className="orbit-line absolute left-1/2 top-1/2 h-[270px] w-[520px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
            <div className="orbit-line absolute left-1/2 top-1/2 h-[390px] w-[280px] -translate-x-1/2 -translate-y-1/2 rotate-[62deg]" aria-hidden="true" />
            <div className="absolute left-[8%] top-[8%] h-16 w-16 rounded-full bg-[#c23b91] shadow-[10px_12px_0_#f4c6e2] float-delayed" aria-hidden="true" />
            <div className="absolute bottom-[13%] right-[6%] h-7 w-7 rounded-full bg-[#2454d7]" aria-hidden="true" />
            <motion.div
              className="relative z-10 mx-auto h-full w-[300px] overflow-hidden rounded-[48%_48%_42%_42%] border-[10px] border-white bg-[#e8edff] shadow-[20px_24px_0_#d8def2]"
              animate={reduced ? undefined : { y: [0, -12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <AstronautVector className="relative z-10 h-full w-full p-5" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white p-2 shadow-lg"><Image src="/brand/classic_logo.png" alt="" width={32} height={32} /></div>
            </motion.div>
            <div className="absolute bottom-0 left-0 bg-white px-3 py-2 font-mono text-[10px] tracking-wider text-[#667085] shadow-sm">MISSION 01 / BEGIN</div>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-[#98a2b3]"><span className="h-8 w-px bg-[#c23b91]" /> SCROLL TO EXPLORE</div>
      </section>

      <section id="universe" className="relative bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c23b91]">01 / The universe</p><h2 className="mt-4 max-w-xl text-5xl text-[#17213d] sm:text-6xl">Find your orbit.</h2></div>
            <p className="max-w-xs text-sm leading-6 text-[#667085]">DPC is a place to explore real interests with other students. Active and proposed destinations are clearly marked.</p>
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {destinations.map((destination, index) => {
              const Icon = destination.icon;
              return <Reveal key={destination.label} delay={index * 0.1}>
                <Link href={destination.href} className="group relative block min-h-[260px] overflow-hidden border border-[#dfe4ee] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#2454d7] hover:shadow-[12px_14px_0_#eef2ff]">
                  <div className="mb-14 flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${destination.accent}18`, color: destination.accent }}><Icon size={22} /></span><span className="font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">{destination.active ? "Active" : "Proposed"}</span></div>
                  <h3 className="max-w-[220px] text-2xl text-[#17213d]">{destination.label}</h3><p className="mt-2 text-sm text-[#667085]">{destination.note}</p>
                  <ArrowUpRight className="absolute bottom-7 right-7 text-[#2454d7] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                </Link>
              </Reveal>;
            })}
          </div>
          <Reveal delay={0.15} className="mt-6 flex items-center justify-between border-t border-[#dfe4ee] pt-5"><span className="font-mono text-xs text-[#98a2b3]">MORE DESTINATIONS ARE WAITING TO BE STARTED</span><Link href="/wings" className="text-sm font-bold text-[#2454d7]">View all wings ↗</Link></Reveal>
        </div>
      </section>

      <section className="bg-[#eef2ff] px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c23b91]">02 / What is happening?</p><h2 className="mt-4 text-5xl text-[#17213d] sm:text-6xl">Missions in the making.</h2><Link href="/events" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2454d7]">See all events <ArrowUpRight size={16} /></Link></Reveal>
          <div className="space-y-4">{events.map((event, index) => <Reveal key={event.title} delay={index * 0.12}><Link href="/events" className="group flex flex-col gap-5 border-b border-[#cbd5ee] py-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-5"><span className="mt-1 font-mono text-xs text-[#667085]">0{index + 1}</span><div><p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: event.color }}>{event.date} · {event.wing}</p><h3 className="mt-2 text-xl text-[#17213d] group-hover:text-[#2454d7]">{event.title}</h3></div></div><ArrowUpRight className="text-[#2454d7]" size={20} /></Link></Reveal>)}</div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <Reveal><div className="relative mx-auto max-w-md"><div className="absolute -inset-4 border border-[#c23b91] rotate-3" /><div className="relative bg-[#17213d] p-8 text-white sm:p-12"><Compass className="mb-16 text-[#f59e0b]" size={28} /><p className="font-mono text-xs tracking-widest text-[#aebcf0]">DPC PRINCIPLE / 001</p><p className="mt-5 text-4xl leading-tight">Learn together. Build bravely.</p><code className="mt-12 block text-xs text-[#f4c6e2]">= new instance of future();</code></div></div></Reveal>
          <Reveal delay={0.12}><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c23b91]">03 / Built by the community</p><h2 className="mt-4 text-5xl text-[#17213d] sm:text-6xl">Your next idea belongs here.</h2><p className="mt-7 max-w-md text-lg leading-8 text-[#667085]">From first lines of code to ambitious projects, DPC gives curious students room to learn, collaborate, and ship. Start small. Find your people.</p><Link href="/projects" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#2454d7] pb-2 text-sm font-bold text-[#17213d]">Explore projects <ArrowUpRight size={16} /></Link></Reveal>
        </div>
      </section>

      <section className="bg-[#c23b91] px-6 py-24 text-white sm:py-32">
        <Reveal className="mx-auto max-w-6xl"><div className="grid items-end gap-10 md:grid-cols-[1fr_auto]"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#f8d9ed]">04 / Your launch window</p><h2 className="mt-5 max-w-2xl text-5xl sm:text-7xl">Ready to make something real?</h2></div><Link href="/join" className="inline-flex items-center gap-2 bg-white px-5 py-3.5 text-sm font-bold text-[#c23b91] transition-transform hover:-translate-y-1">Join the mission <ArrowUpRight size={17} /></Link></div></Reveal>
      </section>
    </main>
  );
}
