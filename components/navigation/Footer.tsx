import Link from "next/link";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "About DPC", href: "/about" },
      { label: "Wings", href: "/wings" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Crew", href: "/crew" },
      { label: "Resources", href: "/resources" },
      { label: "Gallery", href: "/gallery" },
      { label: "Collaborate", href: "/collaborate" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "Constitution", href: "/constitution" },
      { label: "Join DPC", href: "/join" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-midnight/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-bold text-xl tracking-tight mb-3">DPC</div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              DIA Programming Club at Daffodil International Academy, Dhaka.
            </p>
            <code className="text-xs text-text-muted font-mono">
              = new instance of future();
            </code>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} DIA Programming Club. All rights reserved.</p>
          <p>
            Not an official Amazon Web Services site. AWS and related marks
            belong to Amazon.com, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
