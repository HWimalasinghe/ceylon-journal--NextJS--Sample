# Ceylon Journal — Luxury Sri Lanka Travel

A runnable fictional travel brand built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion, GSAP ScrollTrigger, Swiper, Lucide, React Hook Form and Zod. Optional Sanity and Supabase adapters are included. All journeys, illustrative prices, accommodation descriptions and services are sample content. Imagery is illustrative; replace with verified, licensed destination photography before launch.

## Run on Windows (PowerShell or VS Code Terminal)

1. Extract the ZIP to a folder of your choice.
2. Open the `ceylon-journal` folder in VS Code.
3. Install an active LTS Node.js version 22 or 24 (minimum 22).
4. Run `npm ci` (or `npm install` if no package lock is provided).
5. Run `npm run dev`.
6. Open http://localhost:3000.

No cloud accounts or credentials are needed for the default demo. The `.env.example` file documents optional settings. Copy it to `.env.local` when required. Never commit `.env.local`.

## Features

- Cinematic editorial homepage and reduced-motion support
- Responsive navigation, journey filtering, itinerary accordions, image gallery
- Interactive illustrative Sri Lanka map and linked destination content
- Journeys, destinations, experiences, stays, journal, about, contact, FAQ, travel guide, terms and privacy pages
- Four-step inquiry planner with client and server validation, spam honeypot, basic demo rate limiter
- Server-side POST `/api/inquiries`; stores locally in `data/inquiries.jsonl` (gitignored)
- Optional Supabase persistent store and Sanity published-content adapter
- Optional password-protected local demo dashboard at `/admin`
- SEO metadata, sitemap and robots; indexing deliberately disabled for the fictional demo

## Test the inquiry flow

Choose a tour, click Personalize this journey, progress through the form, choose interests and use fictional contact details. A success page shows the stored unique reference. The local JSONL file is created automatically. No real emails, payments or bookings occur.

## Enable the demo staff dashboard

Copy `.env.example` to `.env.local`; set `ADMIN_PASSWORD` to a long, unique ASCII secret and restart the development server. Open `/admin`. Username is `staff`, password is your configured value. This HTTP Basic challenge is for local demonstration only; for production use HTTPS and a proper staff identity provider, RBAC and audited authorization. Do not expose the demo publicly with real customer data.

## Optional cloud services

- Supabase: run `supabase/schema.sql` inside your own project, then set `SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Never share this key or prefix it with `NEXT_PUBLIC_`. The local JSON file is not suitable for stateless serverless deployments.
- Sanity: see `sanity/README.md` for content model requirements. Set the project and dataset variables to load published documents. Remove the settings to return to demo data. Studio is a separate setup, not required to run this project.
- Transactional email is not connected: add an email provider with background delivery and retries before launch.

## Build and verify

```powershell
npm run typecheck
npm run build
npm run start
```

To exercise the live HTTP routes and a sample form submission, start the production server with `npm run start -- --port 3100` (in a separate terminal) and run `node scripts/http-smoke.mjs`. For optional browser interaction tests, install Playwright (`npm install -D playwright`, `npx playwright install chromium`), then run `node scripts/smoke-test.mjs` while the server is active. Both scripts create fictional sample inquiries, which can be removed from the disposable demo data file after testing.

## Architecture

`src/app` contains routes, shared layout and the API; `src/components` contains UI and client interactions; `src/lib/data.ts` contains sample content; `src/lib/content.ts` is the content adapter; `src/lib/inquiry.ts` is the shared validation schema; `src/server/inquiries.ts` is the secure persistence adapter. CSS design tokens and responsive rules are in `src/app/globals.css`. All media is served from `public/images`.

## Production checklist

Replace the fictional brand, content and proposed prices with approved real business information; license photography, verify destination and accommodation details, set canonical site URL, revise metadata and robots for indexing, replace the schematic map for actual navigation, enable secure staff auth, Supabase storage, email delivery, durable rate limiting and monitoring, privacy/retention policy and accessibility testing. Deploy to a Next.js-compatible runtime such as Vercel rather than GitHub Pages. This is a demonstrable starter application, not a live booking platform.
