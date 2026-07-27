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

### Why chunk 404s happen

Fully static Next.js pages default to `Cache-Control: s-maxage=31536000`. Hostinger **hCDN** then serves **stale HTML for up to a year** while the Node origin runs a **new** build with different `/_next/static/chunks/*` hashes. The browser loads old HTML → requests missing chunks → **404**.

This repo overrides document cache headers (`s-maxage=60`) and keeps hashed `/_next/static/*` immutable.

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
| HTML cache | `max-age=0, s-maxage=60, stale-while-revalidate=300` |
| `/_next/static` cache | `max-age=31536000, immutable` |

## Contact form / email

Copy `.env.example` to `.env.local` (or Hostinger env vars):

| Variable | Purpose |
| --- | --- |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to `hello@doneanddelivered.com`) |
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
