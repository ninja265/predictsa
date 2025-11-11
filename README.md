# SA Predicts

**Tagline:** Opinions that matter.

SA Predicts is a polished demo web app for showcasing a premium, South African-first prediction market experience. It runs entirely in the browser—no wallets, custody, or live betting rails—making it perfect for projector walk-throughs and stakeholder demos.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS with custom theme + shadcn-style components
- Zustand store persisted to `localStorage`
- Lucide icons & Sonner toasts

## Features

- Landing page with hero, three markets above the fold, how-it-works steps, trust bar, and CTA banner.
- Dynamic market detail route with sticky bet slip, live calcs, preview → confirm flow, sparkline, mock order book, and simulated trades feed.
- Portfolio route that reads local positions, shows mark-to-market summary, and a detailed table with PnL.
- Legal page with the required disclaimer copy.
- Remote hero imagery hotlinked from Wikimedia (with fallbacks via Next Image).

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and click through the markets. Confirming a mock bet stores the position locally and triggers the toast copy “Bet placed in demo mode”.

> Legacy note from the very first doc: “this gonna be huge.”
> And yes—this is the beginning of something yuuuuuge.
