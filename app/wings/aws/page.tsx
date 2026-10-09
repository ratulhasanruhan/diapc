import ScrollReveal from "@/components/motion/ScrollReveal";
import SectionWrapper from "@/components/motion/SectionWrapper";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Cloud, ExternalLink, Layers, ShieldCheck, Terminal } from "lucide-react";

export const metadata = { title: "AWS Student Builder Group at DIA" };

const tracks = [
  { name: "Cloud Foundations", desc: "Core services, regions, pricing, and shared responsibility.", icon: Cloud },
  { name: "Compute & Networking", desc: "EC2, Lambda, VPC, and load balancing in practice.", icon: Layers },
  { name: "Storage & Databases", desc: "S3, DynamoDB, RDS, and data management patterns.", icon: ShieldCheck },
  { name: "DevOps & CI/CD", desc: "Automation, infrastructure as code, and deployment.", icon: Terminal },
];

const programs = [
  "Hands-on workshops with live AWS console demos",
  "Build sessions: deploy real applications to the cloud",
  "Certification study circles for Cloud Practitioner and SAA",
  "Tech talks with the wider AWS community",
  "Hackathons and cloud challenge events",
];

function AwsMark() {
  return (
    <div className="relative inline-flex flex-col items-center font-bold tracking-[-0.08em] text-white" aria-label="AWS">
      <span className="text-5xl leading-none">aws</span>
      <svg viewBox="0 0 100 28" className="-mt-2 h-5 w-24" aria-hidden="true">
        <path d="M6 8c28 20 63 17 87-1" fill="none" stroke="#ff9900" strokeLinecap="round" strokeWidth="7" />
        <path d="m81 5 13 2-8 10" fill="none" stroke="#ff9900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      </svg>
    </div>
  );
}

export default function AWSWingPage() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-[#17213d] px-6 py-24 text-white sm:py-32">
        <div className="absolute -right-20 top-12 h-80 w-80 rounded-full border border-[#ff9900]/20" />
        <div className="absolute -right-4 top-28 h-56 w-56 rounded-full border border-[#ff9900]/20" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-5"><AwsMark /><span className="h-10 w-px bg-white/20" /><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffca80]">Student Builder Group · DIA</span></div>
            <h1 className="max-w-3xl text-5xl leading-[0.98] sm:text-7xl">Build above the <span className="text-[#ff9900]">ground.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#cbd5ee]">A student-led cloud community for learning AWS by building. Start with foundations, ship useful things, and grow with peers.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/join?wing=aws" className="inline-flex items-center gap-2 bg-[#ff9900] px-5 py-3.5 text-sm font-bold text-[#17213d] hover:bg-[#ffb83d]">Join this wing <ArrowUpRight size={17} /></Link>
              <a href="https://skillbuilder.aws" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 text-sm font-semibold text-white hover:border-[#ff9900]">Open Skill Builder <ExternalLink size={15} /></a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 rounded-[40%] bg-[#ff9900]/15 blur-3xl" />
              <div className="relative border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-widest text-[#cbd5ee]"><span>cloud / dia</span><span className="text-[#ff9900]">online</span></div>
                <div className="grid grid-cols-3 gap-3 py-10">
                  {["Learn", "Build", "Ship"].map((label, index) => <div key={label} className="flex aspect-square flex-col items-center justify-center gap-2 border border-[#ff9900]/30 bg-[#ff9900]/10 text-center"><span className="font-mono text-2xl text-[#ff9900]">0{index + 1}</span><span className="text-xs font-semibold">{label}</span></div>)}
                </div>
                <p className="font-mono text-xs text-[#cbd5ee]">&gt; new cloud_builder();</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper label="The program" number="01" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <ScrollReveal><h2 className="text-4xl text-[#17213d] sm:text-5xl">A practical path into the cloud.</h2><p className="mt-5 text-[#667085]">No previous cloud experience is required. Each activity is designed to turn a concept into a working mental model or a working build.</p></ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2">{programs.map((program, index) => <ScrollReveal key={program} delay={index * 0.06}><div className="flex gap-3 border-b border-border py-4"><CheckCircle className="mt-0.5 shrink-0 text-[#ff9900]" size={18} /><span className="text-sm leading-6 text-[#667085]">{program}</span></div></ScrollReveal>)}</div>
        </div>
      </SectionWrapper>

      <SectionWrapper label="Learning roadmap" number="02" className="border-t border-border bg-[#f5f7ff]">
        <ScrollReveal><h2 className="text-4xl text-[#17213d] sm:text-5xl">Your route to the cloud.</h2><p className="mt-4 max-w-xl text-[#667085]">Explore the official AWS Skill Builder resources alongside our community sessions.</p></ScrollReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">{tracks.map((track, index) => { const Icon = track.icon; return <ScrollReveal key={track.name} delay={index * 0.08}><a href="https://skillbuilder.aws" target="_blank" rel="noopener noreferrer" className="group flex gap-5 border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#ff9900] hover:shadow-[8px_8px_0_#ffe0ae]"><span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#fff1dc] text-[#d97706]"><Icon size={21} /></span><span><span className="flex items-center justify-between gap-4 font-bold text-[#17213d]">{track.name}<ExternalLink size={15} className="text-[#98a2b3] group-hover:text-[#ff9900]" /></span><span className="mt-2 block text-sm leading-6 text-[#667085]">{track.desc}</span></span></a></ScrollReveal>; })}</div>
      </SectionWrapper>

      <SectionWrapper label="Leadership" number="03" className="border-t border-border">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><ScrollReveal><h2 className="text-4xl text-[#17213d] sm:text-5xl">Build with people.</h2><p className="mt-4 max-w-md text-[#667085]">The wing is led by students and grows through shared practice, questions, and generous documentation.</p></ScrollReveal><ScrollReveal delay={0.1}><div className="border-l-4 border-[#ff9900] bg-[#fff7eb] p-6"><p className="font-bold text-[#17213d]">Ratul Hasan Ruhan</p><p className="mt-1 text-sm text-[#667085]">AWS Student Builder Group Leader at DIA</p></div></ScrollReveal></div>
      </SectionWrapper>

      <section className="border-t border-border px-6 py-12"><p className="mx-auto max-w-6xl text-xs leading-6 text-[#667085]">The AWS Student Builder Group at DIA is a student community. This page is not an official Amazon Web Services site. AWS and related marks belong to Amazon.com, Inc. or its affiliates. No AWS credits, vouchers, or specific program benefits are claimed unless explicitly verified.</p></section>
    </main>
  );
}
