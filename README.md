# Done & Delivered

Production-ready Next.js application scaffold.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **ESLint** + **Prettier**
- **pnpm**

### Project libraries

- Framer Motion, GSAP, Lenis, Swiper
- Lucide React, React Icons
- React Hook Form, Zod

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm clean` | Delete `.next` and other build artifacts |
| `pnpm build` | **Clean** + production build + local HTML/chunk integrity check |
| `pnpm build:production` | Atomic clean build with rollback if build/integrity fails |
| `pnpm start` | Start production server |
| `pnpm verify:build` | Confirm generated HTML chunk refs exist under `.next/static` |
| `pnpm verify:static:prod` | Confirm live site HTML chunks all return HTTP 200 |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format source with Prettier |
| `pnpm format:check` | Check formatting without writing |

## Hostinger deployment (required)

### Why chunk 404s happen (proven on production)

Live probes against `https://doneanddelivered.co.in` captured **two HTML generations**:

| Variant | HTML `Cache-Control` | Example script | Chunk status |
| --- | --- | --- | --- |
| Stale CDN HTML | `s-maxage=31536000`, `age` ~48h+ | `turbopack-45a8559a9cccbb35.js` | **404** |
| Current origin HTML | short / no CDN store | `turbopack-28dd6a71db85f1fa.js` | **200** |

- `/images/hero-bg.jpg` still **200** while old chunks **404** → static serving works; **previous-build chunk files are gone from origin**.
- Not caused by `.gitignore` ignoring `.next` (Hostinger builds on the server).
- Not `output: "standalone"` missing a copy step in this repo (we use default `next start` + full `.next`).
- Not `assetPrefix` / `basePath` (both unset).

**Exact failure mode:** browser/CDN serves HTML from build A; Node origin only has `/_next/static` from build B → missing hashes → 404 → only unstyled background image.

This repo forces document `Cache-Control: max-age=0, s-maxage=0, must-revalidate` and keeps `/_next/static/*` immutable. **You must still purge Hostinger CDN once** so any year-cached HTML from before this fix is dropped.

### Deploy steps

1. **Build command** (hPanel → Node.js app):
   ```bash
   pnpm install --frozen-lockfile && pnpm run build:production
   ```
   (`pnpm build` also cleans `.next` first via `prebuild` and runs integrity checks.)

2. **Start command**:
   ```bash
   pnpm start
   ```

3. **After every successful deploy — purge Hostinger CDN completely** for `doneanddelivered.co.in`  
   (Required once for any HTML still cached with the old 1-year `s-maxage`.)

4. **Verify**:
   ```bash
   pnpm run verify:static:prod
   ```
   - Homepage `cache-control` must **not** be `s-maxage=31536000`
   - Every `/_next/static/*` referenced by HTML must return **HTTP 200**

5. Publish the **complete** `.next` from a single clean build. Do not mix folders across deploys.

### Config checklist (this repo)

| Setting | Value |
| --- | --- |
| `output` | default (Node server — not `export` / not forced `standalone`) |
| `assetPrefix` | unset |
| `basePath` | unset |
| `distDir` | default `.next` |
| HTML cache | `max-age=0, s-maxage=0, must-revalidate` (never year-cache documents) |
| `/_next/static` cache | `max-age=31536000, immutable` (path excluded from document rule) |

### After deploy (mandatory)

1. hPanel → CDN → **Purge all cache** for `doneanddelivered.co.in`
2. Hard-refresh browser (`Ctrl+Shift+R`) or test in a private window
3. `pnpm run verify:static:prod` — every HTML-referenced chunk must be HTTP 200  
4. Confirm HTML response is **not** `s-maxage=31536000`

## Contact form / email

Copy `.env.example` to `.env.local` (or Hostinger env vars):

| Variable | Purpose |
| --- | --- |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to `Hemanthmukkara@doneanddelivered.co.in`) |
| `RESEND_API_KEY` | Preferred production mail via [Resend](https://resend.com) |
| `CONTACT_FROM_EMAIL` | Verified Resend from address |
| `CONTACT_DELIVERY_MODE=log` | Log-only mode for CI / local QA |

Without Resend, the API uses FormSubmit.co to deliver to `CONTACT_TO_EMAIL` (confirm the first activation email in that inbox).

## Folder structure

```text
app/                 # App Router routes, layouts, global styles
components/
  ui/                # Reusable UI primitives
  layout/            # Header, footer, shell layout pieces
  sections/          # Page sections
  providers/         # Client providers (motion, smooth scroll, etc.)
hooks/               # Shared React hooks
lib/
  utils/             # Pure helpers
  validations/       # Zod schemas
  constants/         # App-wide constants
types/               # Shared TypeScript types
public/
  images/
  icons/
  fonts/
```

## Notes

- Import alias: `@/*`
- No `src/` directory — app lives at the project root
- Homepage and product UI are intentionally not implemented yet
