import Image from "next/image";
import { Download, Package } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import CopyButton from "@/components/sections/CopyButton";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/sections/blocks";
import { site } from "@/content/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Media kit",
  description: "DIA Programming Club (DPC) media kit: logos, AWS Student Builders Group marks, brand colours, name and boilerplate text, and the social banner. Free to use for press and partners.",
  path: "/media-kit"
});

type Asset = { name: string; file: string; w: number; h: number; note: string; dark?: boolean; ext: string };

const dpcAssets: Asset[] = [
  { name: "Modern logo", file: "/media-kit/dpc/dpc-logo-modern.png", w: 790, h: 316, note: "Primary wide logo, for light backgrounds", ext: "PNG" },
  { name: "Classic logo", file: "/media-kit/dpc/dpc-logo-classic.png", w: 500, h: 500, note: "The original DPC logo, square canvas", ext: "PNG" },
  { name: "Emblem", file: "/media-kit/dpc/dpc-emblem-512.png", w: 512, h: 512, note: "Icon only, 512 px", ext: "PNG" }
];

const awsAssets: Asset[] = [
  { name: "Wordmark, dark text", file: "/media-kit/awssbg/awssbg-wordmark-dark-text.png", w: 573, h: 128, note: "For light backgrounds", ext: "PNG" },
  { name: "Wordmark, white text", file: "/media-kit/awssbg/awssbg-wordmark-white-text.png", w: 573, h: 128, note: "For dark backgrounds", dark: true, ext: "PNG" },
  { name: "Mark (vector)", file: "/media-kit/awssbg/awssbg-mark.svg", w: 200, h: 200, note: "Scalable icon", ext: "SVG" },
  { name: "Mark (512 px)", file: "/media-kit/awssbg/awssbg-mark-512.png", w: 512, h: 512, note: "Raster icon", ext: "PNG" },
  { name: "Lock-up with DIA", file: "/media-kit/awssbg/awssbg-lockup-dia.webp", w: 480, h: 480, note: "AWS Student Builders Group, Daffodil International Academy", ext: "WebP" }
];

const colours = [
  { name: "DPC Blue", hex: "#2454d7", use: "Primary, links and buttons", dark: true },
  { name: "DPC Magenta", hex: "#c23b91", use: "Accent", dark: true },
  { name: "Ink", hex: "#17213d", use: "Headings and body text", dark: true },
  { name: "Paper", hex: "#fbfaf7", use: "Page background", dark: false },
  { name: "Sky tint", hex: "#eef2ff", use: "Soft panels", dark: false },
  { name: "AWS Orange", hex: "#ff9900", use: "AWS SBG accent only", dark: false }
];

const shortBio = `${site.name} (${site.shortName}) is the student-led programming community at ${site.institution}, Dhaka, founded on ${site.foundingDateLabel}.`;
const longBio = `${site.name} (${site.shortName}) is the student-led, non-profit and non-political programming and technology community at ${site.institution} in Dhaka, Bangladesh. Founded on ${site.foundingDateLabel}, DPC runs workshops, contests, hackathons and events, helps members build real projects, and is organized into wings, including the AWS Student Builders Group at DIA. Motto: ${site.tagline}. Contact: ${site.email}.`;

function AssetCard({ a }: { a: Asset }) {
  return (
    <li className="card flex flex-col overflow-hidden">
      <div className={`flex h-44 items-center justify-center p-6 ${a.dark ? "bg-[linear-gradient(135deg,#0f1630,#232f5c)]" : "bg-[linear-gradient(45deg,#f4f6fb_25%,#fff_25%,#fff_50%,#f4f6fb_50%,#f4f6fb_75%,#fff_75%)] bg-[length:16px_16px]"}`}>
        <Image src={a.file} alt={`${a.name} preview`} width={a.w} height={a.h} sizes="(min-width: 1024px) 320px, 90vw" className="h-auto max-h-28 w-auto max-w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
        <h3 className="text-base text-ink">{a.name}</h3>
        <p className="text-sm leading-6 text-muted">{a.note}</p>
        <a href={a.file} download className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-sm font-bold text-brand-blue hover:text-brand-magenta">
          <Download size={15} aria-hidden="true" /> Download {a.ext}
        </a>
      </div>
    </li>
  );
}

export default function MediaKitPage() {
  return (
    <main className="overflow-x-clip">
      <JsonLd data={breadcrumbJsonLd([{ name: "Media kit", path: "/media-kit" }])} />
      <PageHero eyebrow="Media kit" title="Logos, colours and words" intro="Everything press, partners and event organizers need to represent DPC and the AWS Student Builders Group at DIA.">
        <a href="/media-kit/dpc-media-kit.zip" download className="btn-primary mt-8"><Package size={16} aria-hidden="true" /> Download all (zip)</a>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-[#5d6679]">10 files · logos, banner, colours and text</p>
      </PageHero>

      <section className="section">
        <SectionHeading index="01" eyebrow="DPC" title="DIA Programming Club logos" intro="Use the logo as supplied. Keep clear space around it, and do not stretch, recolour or add effects." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dpcAssets.map((a, i) => <ScrollReveal key={a.file} delay={i * 0.05} className="h-full"><AssetCard a={a} /></ScrollReveal>)}
        </ul>
      </section>

      <section className="section pt-0">
        <SectionHeading index="02" eyebrow="AWS SBG" title="AWS Student Builders Group at DIA" intro="Marks for DPC's AWS wing. AWS and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awsAssets.map((a, i) => <ScrollReveal key={a.file} delay={(i % 3) * 0.05} className="h-full"><AssetCard a={a} /></ScrollReveal>)}
        </ul>
        <p className="mt-4 text-sm text-muted">More on the wing at <a href={site.awsSbg} className="font-semibold text-brand-blue underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">aws.diapc.dev</a>.</p>
      </section>

      <section className="section pt-0">
        <SectionHeading index="03" eyebrow="Colour" title="Brand colours" />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colours.map((c) => (
            <li key={c.hex} className="card overflow-hidden">
              <div className="h-24 border-b border-line" style={{ background: c.hex }} role="img" aria-label={`${c.name} swatch ${c.hex}`} />
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold text-ink">{c.name}</p>
                <p className="font-mono text-xs text-muted">{c.hex}</p>
                <p className="text-xs leading-5 text-muted">{c.use}</p>
                <CopyButton value={c.hex} label="Copy hex" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section pt-0">
        <SectionHeading index="04" eyebrow="Words" title="Name, tagline and boilerplate" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card space-y-5 p-6">
            <dl className="space-y-4 text-sm">
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Name</dt><dd className="mt-1 text-ink">{site.name} (short: {site.shortName})</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Tagline</dt><dd className="mt-1 text-ink">{site.tagline}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Founded</dt><dd className="mt-1 text-ink">{site.foundingDateLabel}, {site.institution}, Dhaka</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-[#5d6679]">Press contact</dt><dd className="mt-1"><a href={`mailto:${site.email}`} className="font-semibold text-brand-blue hover:underline">{site.email}</a></dd></div>
            </dl>
          </div>
          <div className="space-y-5">
            <div className="card p-6">
              <div className="flex items-center justify-between gap-3"><h3 className="text-base text-ink">Short bio</h3><CopyButton value={shortBio} /></div>
              <p className="mt-3 text-sm leading-7 text-muted">{shortBio}</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between gap-3"><h3 className="text-base text-ink">Boilerplate</h3><CopyButton value={longBio} /></div>
              <p className="mt-3 text-sm leading-7 text-muted">{longBio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <SectionHeading index="05" eyebrow="Social" title="Open Graph banner" intro="1200 × 630 px, for link previews and event posts." />
        <div className="card overflow-hidden">
          <Image src="/media-kit/dpc/dpc-og-banner-1200x630.png" alt="DPC social banner: DIA Programming Club, we turn curiosity into code" width={1200} height={630} sizes="(min-width: 1152px) 1100px, 92vw" className="h-auto w-full" />
          <div className="flex items-center justify-between gap-3 border-t border-line p-4">
            <p className="text-sm text-muted">dpc-og-banner-1200x630.png</p>
            <a href="/media-kit/dpc/dpc-og-banner-1200x630.png" download className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-magenta"><Download size={15} aria-hidden="true" /> Download PNG</a>
          </div>
        </div>
      </section>
    </main>
  );
}
