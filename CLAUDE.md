# DIA Programming Club (DPC)

> `= new instance of future();`

The official home of the DIA Programming Club at Daffodil International Academy, Dhaka.
Includes the AWS Student Builder Group at DIA wing.

🌐 **diapc.dev** · 📍 Daffodil International Academy, Dhaka

---

## Vision

A club website that feels like something built by programmers, not a template.
Animated, interactive, fast on mobile, and fun to explore. Students should open
it and think "I want to be part of this."

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS variables for themes |
| Animation | Motion (Framer Motion), GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Backgrounds | Canvas 2D (default), React Three Fiber (optional, lazy-loaded) |
| Theming | next-themes + custom theme tokens |
| Content | MDX / JSON in repo (events, team, projects) |
| Forms | Next.js route handlers → Supabase (phase 2) |
| Hosting | Vercel |
| Package manager | pnpm |

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, about, what we do, upcoming events, AWS wing, team, join CTA |
| `/aws` | AWS Student Builder Group at DIA: workshops, cert circles, resources |
| `/events` | Upcoming and past events, with countdowns |
| `/projects` | Member projects showcase |
| `/team` | Core committee |
| `/join` | Membership form |
| `/terminal` | Hidden interactive terminal (easter egg) |

## Signature features

- **Custom cursor:** dot + spring-following ring, magnetic buttons, context labels, code-glyph trail in the hero
- **Theme-based backgrounds:** each theme has its own animated background, not just a color swap
- **Spotlight cards:** a glow follows the pointer across card borders
- **Hero typing sequence:** ends on the club tagline
- **Command palette (`Ctrl/⌘ + K`):** jump to any page, switch theme, open socials
- **Scroll storytelling:** sections reveal and transform as you scroll
- **Hidden terminal:** `/terminal` and a Konami-code trigger
- **Reduced motion respected:** everything degrades gracefully

## Getting started

```bash
git clone https://github.com/<org>/diapc.dev.git
cd diapc.dev
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000

## Project structure

```
.
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── aws/
│   │   ├── events/
│   │   ├── projects/
│   │   ├── team/
│   │   ├── join/
│   │   └── terminal/
│   ├── api/join/route.ts
│   └── layout.tsx
├── components/
│   ├── cursor/          # CustomCursor, MagneticButton, GlyphTrail
│   ├── backgrounds/     # Daylight, Midnight, Terminal, Blueprint
│   ├── sections/        # Hero, About, Events, AwsWing, Team, JoinCTA
│   ├── ui/              # Button, Card, SpotlightCard, Badge
│   └── palette/         # CommandPalette
├── content/             # events.json, team.json, projects.json, *.mdx
├── lib/                 # theme tokens, motion presets, utils
├── public/
│   ├── brand/           # logo files (svg + png)
│   └── og/
├── DESIGN.md
├── CLAUDE.md
└── README.md
```

## Environment variables

```
NEXT_PUBLIC_SITE_URL=https://diapc.dev
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

## Deployment

1. Push to GitHub, import the repo in Vercel
2. Add `diapc.dev` and `www.diapc.dev` under Project → Domains
3. Add the DNS records Vercel shows at your domain registrar
4. `.dev` domains are HTTPS-only, and Vercel handles the certificate

## Roadmap

**Phase 1: Foundation**
- [ ] Project setup, design tokens, fonts, logo assets
- [ ] Theme system with 3 themes and animated backgrounds
- [ ] Custom cursor + magnetic buttons
- [ ] Home page: hero, about, what we do
- [ ] `/aws` page
- [ ] Deploy to diapc.dev

**Phase 2: Community**
- [ ] `/join` form with Supabase
- [ ] Events page with countdowns
- [ ] Team page
- [ ] Command palette

**Phase 3: Delight**
- [ ] Projects showcase
- [ ] `/terminal` easter egg
- [ ] Bangla language toggle (EN / বাংলা)
- [ ] 4th theme (Blueprint)
- [ ] OG image generation per page

## Contributing

DPC members are encouraged to contribute. Branch from `main`, use
conventional commits (`feat:`, `fix:`, `docs:`), and open a PR.

## Disclaimer

This is a student-run site. The AWS Student Builder Group at DIA is a student
community. This website is not an official Amazon Web Services site. AWS and
related marks belong to Amazon.com, Inc. or its affiliates.