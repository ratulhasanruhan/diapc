import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Explore",
    links: [
      { label: "About DPC", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
      { label: "Achievements", href: "/achievements" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Committee", href: "/committee" },
      { label: "Resources", href: "/resources" },
      { label: "Media kit", href: "/media-kit" },
      { label: "Join DPC", href: "/join" },
      { label: "Collaborate", href: "/collaborate" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "Wings", href: "/wings" },
      { label: "AWS Student Builders", href: "https://aws.diapc.dev" },
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
            <Image src="/brand/modern_logo.png" alt="DIA Programming Club home" width={140} height={47} className="h-11 w-auto object-contain" />
          </Link>
          <p className="mt-4 font-mono text-xs font-semibold tracking-[0.25em] text-[#c23b91]">CODE · CREATE · CONNECT</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#667085]">DIA Programming Club - DPC at Daffodil International Academy, Dhaka.</p>
          <a href="mailto:hi@diapc.dev" className="mt-3 block text-sm font-semibold text-[#17213d] hover:text-[#2454d7]">hi@diapc.dev</a>
          <a href="https://aws.diapc.dev" target="_blank" rel="noopener" className="mt-5 flex w-fit items-center gap-2 border border-[#dfe4ee] px-3 py-2 text-sm font-semibold text-[#17213d] hover:border-[#ff9900]">
            <Image src="/brand/awssbg-mark.svg" alt="" width={20} height={20} className="h-5 w-5" />
            AWS Student Builders Group
          </a>
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
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#667085]">{section.title}</p>
              <div className="space-y-2">
                {section.links.map((link) => link.href.startsWith("http") ? <a key={link.href} href={link.href} target="_blank" rel="noopener" className="block text-sm text-[#667085] hover:text-[#2454d7]">{link.label} ↗</a> : <Link key={link.href} href={link.href} className="block text-sm text-[#667085] hover:text-[#2454d7]">{link.label}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#dfe4ee] px-6 py-4 text-center text-xs text-[#667085]">© DIA Programming Club - DPC · Student-run and community-led.</div>
    </footer>
  );
}
