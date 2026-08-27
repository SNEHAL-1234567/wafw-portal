# WAFW Portal

Website and resource-access portal for the **World Academy for the Future of Women** — an initiative of Global Interactions, Inc.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Supabase.

## Features

- **Public site** — home page with a scroll-expansion hero, mission, the 8-module curriculum, and a searchable facilitator directory with individual profile pages.
- **Hidden admin** at `/admin` — not linked anywhere in the UI and disallowed in `robots.txt`. Supabase Auth login gated by an `admins` allowlist table, with full facilitator CRUD (create, edit, delete, photo upload, per-record public/hidden toggle).
- **Privacy by default** — the public site reads from a restricted `public_facilitators` view that exposes only non-PII columns. Phone numbers, emails, street addresses, and internal notes are stored but never served publicly. Row Level Security enforces this at the database level.

## Local development

```bash
npm install
npm run dev
```

Requires a `.env.local` file (not committed):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # setup scripts only
```

## Database setup

The schema, RLS policies, and storage buckets live in `supabase/migrations/`. Apply them with:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## One-time setup scripts

```bash
npm run seed:admin -- you@example.com   # creates the first /admin login
npm run seed:facilitators               # imports facilitator records + photos
```

Both are idempotent and safe to re-run. They read from `source-data/`, which is gitignored because it contains personal data.

## Deployment

Deployed on Vercel. Set the three environment variables above in the Vercel project settings — `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required at build and runtime; `SUPABASE_SERVICE_ROLE_KEY` is only needed if running the setup scripts.
