<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Install with `pnpm install --frozen-lockfile`. `package.json` pins `pnpm@12.10.1` via `packageManager`. Node 22 is required (Next.js 16).
- Dev server: `pnpm dev --hostname 0.0.0.0 --port 3000`, then open http://localhost:3000.
- Checks that exist: `pnpm lint` and `pnpm build`. There is no test script. `pnpm build` includes the TypeScript check.
- The join, collaborate, and contact forms write to the production Firestore project `diadpc`. Exercise the forms in the browser, and do not submit them.
