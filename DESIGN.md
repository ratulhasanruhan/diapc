# DPC Design System

## Brand

The logo shows four people around a `</>` mark in a ring: community and code.
Blue and purple together. A serif wordmark gives it a confident, editorial feel.
The tagline `= new instance of future();` is the personality: nerdy, optimistic, a little witty.

**Tone:** confident, playful, technical, welcoming. Never corporate.

## Colors

Sample exact values from the logo file with an eyedropper. Starting estimates:

| Token | Approx. hex | Use |
|---|---|---|
| `--brand-blue` | `#0A6BC9` | Primary |
| `--brand-purple` | `#9A2A92` | Secondary |
| `--ink` | `#1B2437` | Text, dark surfaces |
| `--electric` | `#2563EB` | Links, focus, highlights |
| `--paper` | `#FAFAFC` | Light background |

Gradient signature: `blue → purple`, used sparingly (hero accent, key CTAs, glows).

## Typography

| Role | Font | Notes |
|---|---|---|
| Display | An editorial serif, e.g. Fraunces or Instrument Serif | Matches the logo wordmark |
| Body | Geist or Inter | Clean, readable |
| Code / accents | JetBrains Mono | Labels, tags, terminal |
| Bangla | Hind Siliguri or Noto Sans Bengali | For the future language toggle |

Scale: fluid type with `clamp()`. The hero headline should be huge (8–12vw on desktop).

## Themes

Each theme = color tokens + its own animated background + cursor tint.

| Theme | Background | Mood |
|---|---|---|
| **Daylight** | Soft mesh gradient (blue/purple blobs drifting slowly), fine grain, faint dot grid | Fresh, friendly |
| **Midnight** (default dark) | Deep navy with a particle network that bends toward the cursor | Techy, premium |
| **Terminal** | Near-black, faint code-glyph rain, scanlines, mono type accents | Hacker, fun |
| **Blueprint** (phase 3) | Blue engineering grid paper, lines draw in as you scroll | Builder, technical |

Theme switch: a toggle in the nav with a circular reveal transition from the click point
(View Transitions API, with a fade fallback). Persist in localStorage, respect `prefers-color-scheme` on first visit.

## Motion principles

- Motion explains, it doesn't decorate. Everything animated has a reason.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Springs for cursor and magnetic effects.
- Durations: micro 150–250ms, reveals 500–800ms, page transitions 600ms.
- Stagger lists by 40–80ms.
- Animate only `transform` and `opacity` where possible.
- `prefers-reduced-motion`: disable parallax, particles, trail, and magnetic effects. Keep simple fades.

## Cursor spec

- **Dot:** 8px, follows the pointer instantly
- **Ring:** 36px, follows with a spring (stiffness ~300, damping ~28)
- **On links/buttons:** ring grows and fills with a translucent brand color
- **On special elements:** ring becomes a labeled pill ("View", "Join", "Drag")
- **Magnetic buttons:** pull up to ~12px toward the pointer within an 80px radius
- **Hero trail:** short-lived code glyphs (`{ } ; </> =>`) spawn behind the pointer and fade
- **Spotlight cards:** radial glow follows the pointer via `--mx` / `--my` CSS variables
- **Disabled** on touch devices (`pointer: coarse`) and with reduced motion

## Hero concept

1. Full-viewport, themed animated background
2. Logo mark animates in: the four circles orbit into place around `</>`
3. Headline types out: **"DIA Programming Club"**
4. Subline types after: `= new instance of future();` with syntax-colored `future()`
5. Two CTAs: **Join the club** (magnetic) and **Explore events**
6. Scroll cue: a small animated `↓` in monospace

## Key components

`CustomCursor`, `MagneticButton`, `SpotlightCard`, `ThemeToggle`, `ThemedBackground`,
`TypedHeadline`, `ScrollReveal`, `EventCard` (with countdown), `TeamCard` (flip or tilt on hover),
`CommandPalette`, `Marquee` (tech stack ticker), `Footer`.

## AWS section (`/aws`)

Same design system, with a restrained AWS touch: use AWS's own colors only where the
AWS logo appears. Follow AWS logo and branding guidelines. Page title: "AWS Student Builder Group at DIA".
Include: what we do, upcoming workshops, certification circles, how to join, resources, leader bio.

## Accessibility

- WCAG AA contrast in every theme
- Full keyboard navigation, visible focus rings (electric blue)
- Semantic HTML, proper heading order, alt text
- Custom cursor never replaces the native cursor for accessibility needs (keep `cursor: auto` on form fields)

## Performance budget

Many students will visit on mobile and on slow connections.

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on mobile
- LCP < 2.5s, CLS < 0.1
- Heavy effects (3D, particles) lazy-loaded, with lighter fallbacks on low-end devices
- Fonts: `next/font`, subsetted, `display: swap`
- Images: `next/image`, AVIF/WebP