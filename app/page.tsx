"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SectionWrapper from "@/components/motion/SectionWrapper";
import {
  Cloud, Code2, Shield, Brain, Globe2, Lock, Beaker,
  CalendarDays, Users, Rocket, ArrowRight, ExternalLink,
  ChevronDown, Sparkles
} from "lucide-react";

/* ---- Wing data (displayed on home) ---- */
const wings = [
  { name: "AWS Student Builders", slug: "aws", status: "active", accent: "#FF9900", icon: Cloud, tagline: "Cloud computing, DevOps, and certifications." },
  { name: "Competitive Programming", slug: "competitive-programming", status: "proposed", accent: "#3B82F6", icon: Code2, tagline: "Algorithms, contests, and problem solving." },
  { name: "AI & Data Science", slug: "ai-ml", status: "proposed", accent: "#8B5CF6", icon: Brain, tagline: "Machine learning, research, and data." },
  { name: "Web & Mobile Dev", slug: "web-app-dev", status: "proposed", accent: "#EC4899", icon: Globe2, tagline: "Full-stack development and modern apps." },
  { name: "Cybersecurity", slug: "cybersecurity", status: "proposed", accent: "#10B981", icon: Lock, tagline: "Security, systems, and ethical hacking." },
  { name: "Research & Innovation", slug: "research", status: "proposed", accent: "#06B6D4", icon: Beaker, tagline: "Academic research and innovation." },
];

const values = [
  { word: "Learn", desc: "Structured learning paths from beginner to advanced." },
  { word: "Build", desc: "Real projects with real impact, not just tutorials." },
  { word: "Compete", desc: "Represent DIA in national and international contests." },
  { word: "Contribute", desc: "Open-source, community, and giving back." },
];

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <main>
      {/* =========================================
          HERO — Enter the Universe
         ========================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background nebula blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-magenta/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet/5 rounded-full blur-[80px]" />
        </div>

        {/* Orbital ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 border border-white/[0.04] rounded-full" style={{ animation: reduced ? "none" : "orbit 60s linear infinite" }} />
          <div className="absolute inset-12 border border-white/[0.03] rounded-full" style={{ animation: reduced ? "none" : "orbit 80s linear infinite reverse" }} />
          {/* Small satellite dot */}
          <div className="absolute inset-0" style={{ animation: reduced ? "none" : "orbit 20s linear infinite" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-blue rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Mission status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-light text-xs font-mono text-text-secondary border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Recruitment open
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Your Universe.
              <br />
              <span className="text-gradient">Your Next</span>
              <br />
              Breakthrough.
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              A student-driven community at DIA where curious minds learn to code, 
              build real projects, explore emerging technologies, and create meaningful impact.
            </p>

            {/* Tagline */}
            <div className="font-mono text-sm text-text-muted">
              <span className="text-brand-magenta">=</span>{" "}
              <span className="text-electric">new</span>{" "}
              <span className="text-text-secondary">instance of</span>{" "}
              <span className="text-gradient font-bold">future</span>
              <span className="text-text-muted">();</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#universe"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue/90 transition-colors shadow-lg shadow-brand-blue/20"
              >
                Explore the Universe <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary font-semibold rounded-lg hover:bg-white/5 transition-colors"
              >
                Join DPC
              </Link>
            </div>
          </motion.div>

          {/* Right — Astronaut + Logo */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Logo glow behind */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-brand-blue/10 blur-[60px]" />

            {/* Astronaut */}
            <div className="relative" style={{ animation: reduced ? "none" : "float 8s ease-in-out infinite" }}>
              <Image
                src="/brand/astronaut.jpg"
                alt="DPC Astronaut — Your guide to the Developer Universe"
                width={420}
                height={560}
                className="drop-shadow-2xl"
                priority
              />
              {/* Logo badge overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-glass rounded-full p-3 shadow-lg">
                <Image
                  src="/brand/classic_logo.png"
                  alt="DPC Logo"
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted font-mono text-xs"
        >
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================
          ABOUT — Who we are
         ========================================= */}
      <SectionWrapper label="About DPC" number="01">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built by students,
              <br />
              <span className="text-gradient">for the future.</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              DPC is the programming club at Daffodil International Academy, Dhaka. 
              We create an inclusive environment where beginners are welcomed and experienced 
              developers are challenged — through workshops, bootcamps, contests, hackathons, 
              open-source projects, and certification prep.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-electric transition-colors font-medium"
            >
              Learn our full story <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={v.word}
                  className="p-6 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-colors group"
                >
                  <h3 className="text-2xl font-bold text-gradient mb-2">{v.word}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* =========================================
          WINGS — The DPC System
         ========================================= */}
      <SectionWrapper label="Wings" number="02" className="border-t border-border">
        <ScrollReveal>
          <div className="max-w-2xl mb-12" id="universe">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Your Path
            </h2>
            <p className="text-text-secondary text-lg">
              Specialized sub-communities within DPC, each focused on a domain. 
              Active wings run workshops, projects, and study circles. Proposed wings 
              are waiting for founding members like you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wings.map((wing, i) => (
            <ScrollReveal key={wing.slug} delay={i * 0.08}>
              <Link
                href={wing.status === "active" ? `/wings/${wing.slug}` : `/join?wing=${wing.slug}`}
                className="block p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] group"
                style={{
                  borderColor: wing.status === "active" ? `${wing.accent}33` : "var(--color-border)",
                  background: wing.status === "active" ? `linear-gradient(135deg, ${wing.accent}08, transparent)` : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <wing.icon
                    className="w-8 h-8 transition-colors"
                    style={{ color: wing.accent }}
                  />
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      color: wing.status === "active" ? wing.accent : "var(--color-text-muted)",
                      background: wing.status === "active" ? `${wing.accent}20` : "var(--color-surface)",
                      border: wing.status === "proposed" ? "1px dashed var(--color-border)" : "none",
                    }}
                  >
                    {wing.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-text-primary transition-colors">
                  {wing.name}
                </h3>
                <p className="text-sm text-text-muted">{wing.tagline}</p>
                {wing.status === "proposed" && (
                  <p className="text-xs text-brand-blue mt-3 font-medium">
                    Be a founding member →
                  </p>
                )}
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-8 text-center">
          <Link
            href="/wings"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-mono text-sm transition-colors"
          >
            View all wings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>
      </SectionWrapper>

      {/* =========================================
          EVENTS — Mission Control
         ========================================= */}
      <SectionWrapper label="Mission Control" number="03" className="border-t border-border">
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming Missions
            </h2>
            <p className="text-text-secondary text-lg">
              Workshops, contests, hackathons, and community meetups. 
              Every event is a mission — and every mission matters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder event cards */}
          {[
            { title: "AWS Cloud Practitioner Workshop", date: "Coming Soon", wing: "AWS Student Builders", accent: "#FF9900" },
            { title: "Intro to Competitive Programming", date: "Coming Soon", wing: "Competitive Programming", accent: "#3B82F6" },
            { title: "DPC Orientation Session", date: "Coming Soon", wing: "General", accent: "#8B5CF6" },
          ].map((event, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-6 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-all group cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="w-4 h-4 text-text-muted" />
                  <span className="text-xs font-mono text-text-muted">{event.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-brand-blue transition-colors">
                  {event.title}
                </h3>
                <span
                  className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ color: event.accent, background: `${event.accent}15` }}
                >
                  {event.wing}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-8 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-mono text-sm transition-colors"
          >
            View all events <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>
      </SectionWrapper>

      {/* =========================================
          CREW — The People
         ========================================= */}
      <SectionWrapper label="Crew" number="04" className="border-t border-border">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet the Crew
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              DPC is led by students who are passionate about technology, 
              community, and making opportunities accessible to everyone at DIA.
            </p>
            <Link
              href="/crew"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-electric transition-colors font-medium"
            >
              View full committee <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Founding convener card */}
            <div className="p-8 rounded-2xl bg-glass-light">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-magenta flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-xl">Ratul Hasan Ruhan</h3>
                  <p className="text-sm text-text-muted">Founding Convener</p>
                  <p className="text-xs text-text-muted mt-0.5 font-mono">AWS Student Builder Group Leader at DIA</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Leading DPC&apos;s mission to create an inclusive community where every student
                can discover their potential in technology.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* =========================================
          COLLABORATE — Dock with us
         ========================================= */}
      <SectionWrapper label="Collaborate" number="05" className="border-t border-border">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Sparkles className="w-10 h-10 text-brand-magenta mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dock With Us
            </h2>
            <p className="text-text-secondary text-lg">
              We welcome partnerships with clubs, universities, companies, and communities.
              Co-host events, sponsor missions, or launch joint projects.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="text-center">
          <Link
            href="/collaborate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-magenta text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            <Rocket className="w-5 h-5" /> Request Collaboration
          </Link>
        </ScrollReveal>
      </SectionWrapper>

      {/* =========================================
          JOIN CTA — Final
         ========================================= */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/5 to-transparent pointer-events-none" />
        <ScrollReveal className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            Ready to launch?
          </h2>
          <p className="text-xl text-text-secondary">
            Whether you&apos;re writing your first line of code or preparing for ICPC, 
            there&apos;s a place for you in DPC.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-lg hover:bg-brand-blue/90 transition-colors shadow-lg shadow-brand-blue/20"
          >
            Become an Explorer <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
