import ScrollReveal from "@/components/motion/ScrollReveal";
import SectionWrapper from "@/components/motion/SectionWrapper";
import Link from "next/link";
import { Cloud, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";

export const metadata = { title: "AWS Student Builder Group at DIA" };

const tracks = [
  { name: "Cloud Foundations", desc: "Core AWS services, pricing, and architecture.", url: "https://skillbuilder.aws" },
  { name: "Compute & Networking", desc: "EC2, Lambda, VPC, and load balancing.", url: "https://skillbuilder.aws" },
  { name: "Storage & Databases", desc: "S3, DynamoDB, RDS, and data management.", url: "https://skillbuilder.aws" },
  { name: "DevOps & CI/CD", desc: "CodePipeline, CloudFormation, and deployment.", url: "https://skillbuilder.aws" },
  { name: "Build & Deploy", desc: "Real-world projects using AWS services.", url: "https://skillbuilder.aws" },
];

const programs = [
  "Hands-on workshops with live AWS console demos",
  "Build sessions: deploy real applications to the cloud",
  "Certification study circles for Cloud Practitioner and SAA",
  "Tech talks with the wider AWS community",
  "Hackathons and cloud challenge events",
];

export default function AWSWingPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-aws-orange/8 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-aws-orange/10 border border-aws-orange/30 text-aws-orange text-xs font-mono font-bold mb-6">
              <Cloud className="w-3.5 h-3.5" /> Part of the AWS Student Builder Groups program
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AWS Student Builder Group
              <span className="block text-text-secondary text-2xl md:text-3xl font-normal mt-2">at DIA</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mb-8">
              Master the cloud. Build the future. Open to every discipline, all years, free.
            </p>
            <Link
              href="/join?wing=aws"
              className="inline-flex items-center gap-2 px-6 py-3 bg-aws-orange text-white font-bold rounded-lg hover:bg-aws-orange/90 transition-colors"
            >
              Join this wing <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs */}
      <SectionWrapper label="Programs" number="01" className="border-t border-border">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">What we do</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {programs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-5 rounded-xl bg-glass-light flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-aws-orange mt-0.5 shrink-0" />
                <span className="text-text-secondary">{p}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Learning Roadmap */}
      <SectionWrapper label="Learning Roadmap" number="02" className="border-t border-border">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-4">Your path to the cloud</h2>
          <p className="text-text-muted mb-8 text-sm">Roadmap tracks link to official AWS Skill Builder resources.</p>
        </ScrollReveal>
        <div className="relative max-w-2xl">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-aws-orange/20" />
          {tracks.map((track, i) => (
            <ScrollReveal key={track.name} delay={i * 0.08}>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-start gap-6 pl-2 mb-6 group"
              >
                <div className="w-7 h-7 rounded-full bg-midnight border-2 border-aws-orange/40 flex items-center justify-center z-10 group-hover:bg-aws-orange group-hover:border-aws-orange transition-colors shrink-0 mt-1">
                  <span className="text-[10px] font-mono font-bold text-aws-orange group-hover:text-white transition-colors">{i + 1}</span>
                </div>
                <div className="flex-1 p-4 rounded-xl bg-glass-light group-hover:bg-aws-orange/5 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{track.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <p className="text-sm text-text-muted">{track.desc}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Wing Leader */}
      <SectionWrapper label="Leadership" number="03" className="border-t border-border">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">Wing Leader</h2>
          <div className="p-8 rounded-2xl bg-glass-light max-w-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-aws-orange to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div>
                <h3 className="font-bold text-lg">Ratul Hasan Ruhan</h3>
                <p className="text-sm text-text-muted">AWS Student Builder Group Leader at DIA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Disclaimer */}
      <section className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-text-muted leading-relaxed max-w-2xl">
            The AWS Student Builder Group at DIA is a student community. This page is not
            an official Amazon Web Services site. AWS and related marks belong to Amazon.com,
            Inc. or its affiliates. No AWS credits, vouchers, or specific program benefits
            are claimed unless explicitly verified.
          </p>
        </div>
      </section>
    </main>
  );
}
