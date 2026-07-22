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

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `pnpm dev`               | Start dev server (Turbopack)                             |
| `pnpm clean`             | Delete `.next` and other build artifacts                 |
| `pnpm build`             | **Clean** + full production build (Hostinger default)    |
| `pnpm build:production`  | Atomic clean build with rollback if build fails          |
| `pnpm start`             | Start production server                                  |
| `pnpm verify:static:prod`| Verify all `/_next/static` assets return HTTP 200 on live |
| `pnpm lint`              | Run ESLint                                               |
| `pnpm format`            | Format source with Prettier                              |
| `pnpm format:check`      | Check formatting without writing                         |

## Hostinger deployment (required)

Every production deploy must be a **full clean build**, never an incremental reuse of `.next`.

1. **Build command** (hPanel → Node.js app):
   ```bash
   pnpm install --frozen-lockfile && pnpm run build:production
   ```
   (`pnpm build` also cleans `.next` first via `prebuild`.)

2. **Start command**:
   ```bash
   pnpm start
   ```

3. **After every successful deploy — purge Hostinger CDN completely** for `doneanddelivered.co.in`  
   (HTML was previously cached with long `s-maxage`, causing old HTML + new chunks → 404.)

4. **Verify**:
   ```bash
   pnpm run verify:static:prod
   ```
   Every `/_next/static/*` referenced by the homepage must return **HTTP 200**.

5. Do **not** copy only part of `.next`. Publish the complete folder from one build.

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
