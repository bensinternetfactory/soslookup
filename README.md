# Dover Watch

An independent civic-transparency site for Dover, New Hampshire. Every
meeting, every representative, every bid, every budget line — with citations
back to the primary source.

## Current phase

**Frontend shell with realistic mock data.** All pages render, navigation
works, layouts are mobile-first. Real data scrapers, Mapbox integration, and
email subscriptions will wire in next.

## Stack

- **Next.js 15** (App Router, React 19, statically rendered)
- **TypeScript 5.7** strict
- **Tailwind CSS v4** with OKLCH tokens and dark-mode support
- **next-themes** for system-aware light/dark
- **lucide-react** icons
- No database yet — mock data lives in `src/lib/data.ts`

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Layout

```
src/
├── app/
│   ├── layout.tsx              Root layout, header, bottom nav, theme
│   ├── page.tsx                Home: next meeting, open bids, map teaser
│   ├── meetings/               Meeting calendar + individual agendas
│   ├── representatives/        Directory + per-rep profile
│   ├── bids/                   Bids board + individual bid page
│   ├── vendors/                Vendor leaderboard + individual profile
│   ├── wards/                  Ward directory + per-ward page
│   ├── budget/                 Budget breakdown + tax rate history
│   ├── map/                    Interactive map (placeholder)
│   ├── about/                  Methodology & corrections
│   ├── sitemap.ts, robots.ts, manifest.ts, icon.tsx
│   └── globals.css
├── components/
│   ├── header.tsx, footer.tsx, bottom-nav.tsx, container.tsx
│   ├── theme-*.tsx
│   ├── status-pill.tsx, section-header.tsx
│   ├── meeting-card.tsx, rep-card.tsx, bid-card.tsx, vendor-card.tsx
│   ├── address-lookup.tsx      Mock ward resolver
│   └── dover-map.tsx           SVG ward map (Mapbox drop-in next)
└── lib/
    ├── site.ts                 Site metadata
    ├── types.ts                Domain types
    └── data.ts                 Mock Dover data
```

## Next wiring steps

1. **Scrape dover.nh.gov** — scheduled GitHub Action, commits normalized
   JSON back to the repo; site rebuilds via Vercel hook.
2. **Mapbox GL JS** — replace the SVG ward map, add live bid pins and
   permit-hearing 500ft abutter circles. GeoJSON served from `/public/geo/`.
3. **Full-text search** — index all meeting minutes + bid packets via
   [Pagefind](https://pagefind.app/), 100% static.
4. **Subscribe / alerts** — Supabase table + Resend for email delivery.
5. **AI summaries** (optional) — Claude Haiku summarizes agenda packets into
   two-sentence plain-English blurbs, cached after first run.

## License

MIT. See `LICENSE`.
