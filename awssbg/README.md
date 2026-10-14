AWS Student Builder Group · DIA
================================

Standalone website for the AWS Student Builder Group (AWS SBG) at Daffodil International Academy.

Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion

Local development
1) pnpm install
2) cp .env.example .env.local
3) pnpm dev
Open http://localhost:3000

Environment variables
- NEXT_PUBLIC_AWSSBG_SITE_URL=https://aws.diapc.dev
- NEXT_PUBLIC_FIREBASE_API_KEY=
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
- NEXT_PUBLIC_FIREBASE_APP_ID=
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

Build
- pnpm build
- pnpm start

Vercel setup
- Create a new Vercel Project and import this repository (root directory = /).
- Framework preset: Next.js
- Build command: pnpm build
- Output directory: .vercel/output (managed by Next.js)
- Env vars: set the keys from the list above (do not commit real keys).
- Domains: add aws.diapc.dev

Cloudflare DNS (for aws.diapc.dev)
- In Cloudflare DNS for diapc.dev, add:
  - Type: CNAME
  - Name: aws
  - Target: cname.vercel-dns.com
  - Proxy status: DNS only (recommended)
After saving, verify the domain in Vercel → Project Settings → Domains.

Branding and content
- Temporary logo/icon: public/brand/awssbg-mark.svg (replace later)
- Committee data file: content/committee.ts (placeholder entries)
- Copy: home sections have obvious text blocks to edit

License
- Student community site; not an official AWS website. AWS marks belong to Amazon.com, Inc. or affiliates.
