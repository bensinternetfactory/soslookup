# SOSLookup

A fast, mobile-first directory that links out to every US Secretary of State
(or equivalent agency) business entity search — all 50 states plus DC.

Live: https://soslookup.com

## Stack

- **Next.js 15** (App Router, React 19, fully statically generated)
- **TypeScript 5.7** strict mode
- **Tailwind CSS v4** with OKLCH color tokens and native dark mode
- **next-themes** for system-aware light/dark
- **lucide-react** icons
- No database, no API routes — every state page is pre-rendered HTML

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
npm run lint
```

## Project layout

```
src/
├── app/
│   ├── layout.tsx              Root layout, metadata, theme provider
│   ├── page.tsx                Homepage with hero + search/filter grid
│   ├── [state]/page.tsx        Per-state detail page (generateStaticParams)
│   ├── about/page.tsx
│   ├── not-found.tsx
│   ├── globals.css             Tailwind v4 theme tokens
│   ├── sitemap.ts              /sitemap.xml
│   ├── robots.ts               /robots.txt
│   ├── manifest.ts             /manifest.webmanifest (PWA)
│   ├── icon.tsx                Dynamic favicon
│   └── opengraph-image.tsx     Dynamic OG social card
├── components/
│   ├── header.tsx, footer.tsx, container.tsx
│   ├── state-card.tsx          Grid card for one state
│   ├── state-search.tsx        Client-side instant filter
│   ├── theme-provider.tsx      next-themes wrapper
│   └── theme-toggle.tsx
└── lib/
    ├── site.ts                 Site-wide metadata constants
    └── states.ts               Canonical state data (edit here)
```

**All 51 state URLs live in one file: `src/lib/states.ts`.** If an agency
migrates its business-search system, update that file and every page, card,
sitemap entry, and metadata string updates automatically.

## Deploying to Vercel (first-time setup)

1. Open [vercel.com/new](https://vercel.com/new) on any device.
2. Sign in with GitHub, authorize access to `bensinternetfactory/soslookup`.
3. Import the repo. Vercel auto-detects Next.js — no configuration needed.
4. Click **Deploy**.

After the first import, Vercel builds a **preview URL for every branch push**
and updates the production URL on every push to `main`. That's it.

### Custom domain

In the Vercel project → Settings → Domains → add `soslookup.com`. Vercel issues
the cert automatically via Let's Encrypt.

## Accessibility & performance notes

- Skip-to-content link, semantic landmarks, `aria-live` on filter count.
- Focus-visible ring on every interactive element.
- All color pairs meet WCAG AA contrast in both light and dark themes.
- `prefers-reduced-motion` disables transitions and smooth scroll.
- 100% static rendering — no JS required to browse; the search input
  progressively enhances with client-side filtering.
- 2 kB per route, ~105 kB shared JS (gzipped, Next 15 default chunks).

## License

MIT. See `LICENSE`.
