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

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start dev server (Turbopack) |
| `pnpm build`        | Production build (Turbopack) |
| `pnpm start`        | Start production server      |
| `pnpm lint`         | Run ESLint                   |
| `pnpm format`       | Format source with Prettier  |
| `pnpm format:check` | Check formatting without writing |

## Hostinger deployment

- **Build command:** `pnpm build`
- **Start command:** `pnpm start`
- **Production domain:** `https://doneanddelivered.co.in`

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
