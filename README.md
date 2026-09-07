# Center for Intelligent Technologies

Bilingual (BG/EN) website of the Center for Intelligent Technologies (CIT / Център за интелигентни технологии), institutionally anchored at UASG.

## Run

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` negotiates locale; default `bg`).

```sh
npm run check   # typecheck, lint, tests, production build
```

## Content and admin

Editorial seed lives in `src/content/`. The V2 admin at `/admin` uses a local file store or Supabase. See `docs/CONTENT_ARCHITECTURE.md`, `docs/ADMIN.md`, `docs/SUPABASE.md`.

Copy `.env.example` to `.env.local`. Do not commit secrets.

Preview/staging remain `noindex,nofollow` unless `CIT_ALLOW_INDEXING=true` on an explicit production deployment.

## Docs

- `AGENTS.md` — product rules and authority order
- `PLAN.md` / `BUILD_PROGRESS.md`
- `docs/` — design system, IA, admin, Supabase
