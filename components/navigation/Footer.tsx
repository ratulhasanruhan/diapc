import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Explore",
    links: [
      { label: "About DPC", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Crew", href: "/crew" },
      { label: "Resources", href: "/resources" },
      { label: "Join DPC", href: "/join" },
      { label: "Collaborate", href: "/collaborate" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "Wings", href: "/wings" },
      { label: "AWS wing", href: "/aws" },
      { label: "Constitution", href: "/constitution" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#dfe4ee] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brand/modern_logo.png" alt="DPC logo" width={140} height={47} className="h-11 w-auto object-contain" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#667085]">DIA Programming Club at Daffodil International Academy, Dhaka.</p>
          <code className="mt-4 block text-xs text-[#c23b91]">= new instance of future();</code>
          <a
            href="https://www.facebook.com/diadpc"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2454d7] transition-colors hover:text-[#c23b91]"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#2454d7] text-[11px] font-bold text-white" aria-hidden="true">f</span>
            Follow DPC on Facebook
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">{section.title}</p>
              <div className="space-y-2">
                {section.links.map((link) => <Link key={link.href} href={link.href} className="block text-sm text-[#667085] hover:text-[#2454d7]">{link.label}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#dfe4ee] px-6 py-4 text-center text-xs text-[#98a2b3]">DIA Programming Club · Student-run and community-led.</div>
    </footer>
  );
}
