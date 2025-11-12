# SA Predicts

“Opinions that matter.” SA Predicts is a polished prediction-market *demo* for investor walk-throughs. Everything runs in-browser—no custody, wallets, or live rails—so you can show the full experience without compliance overhead.

## Architecture overview

| Layer           | Details |
| --------------- | ------- |
| Runtime         | Next.js 13 App Router, React 18, TypeScript |
| Styling         | Tailwind CSS + custom theme tokens + shadcn/ui primitives |
| State           | Zustand stores for portfolio, account, and UI; persisted to `localStorage` |
| UI Kit          | Custom components under `src/components` (hero, grids, wallet, dialogs, etc.) |
| Notifications   | Sonner toasts |
| Icons           | Lucide |

### Key directories

- `src/app/` – App Router pages. Routes include:
  - `page.tsx`: Landing page (hero → spotlight markets → stats strip → demo toolkit).
  - `market/[slug]/`: Market detail with order ticket, order book, and trades feed.
  - `portfolio/`: Local portfolio table.
  - `legal/`: Disclaimer copy.
- `src/components/` – Reusable UI:
  - `hero.tsx`, `market-grid.tsx`, `stats-strip.tsx`, `account-functions.tsx`.
  - `login-dialog.tsx`, `wallet-dialog.tsx`: mocked auth + wallet flows.
  - `ui/`: shadcn-style primitives (button, dialog, dropdown, etc.).
- `src/store/` – Zustand stores:
  - `portfolio.ts`: local bet positions.
  - `account.ts`: demo user, wallet balance, transactions.
  - `ui.ts`: modal visibility state.
- `src/lib/` – Static market data, math helpers, formatter utils.

## Feature tour

1. **Hero + Spotlight**
   - Real-time preview card with mocked bet placement.
   - Spotlight markets (Cyril, Helen, Bafana) with flag accents, implied odds, and CTAs.

2. **Stats strip + demo utility band**
   - Compact KPI cards.
   - Profile/Login/Balance band linked to the wallet/login modals.

3. **Wallet / Auth simulation**
   - Account dropdown handles login/logout, theme, wallet.
   - `LoginDialog` simulates OTP sign-in (no backend).
   - `WalletDialog` has overview, deposit (bank/crypto/card/Apple Pay), withdraw (bank/crypto), and mock transaction history.

4. **Market detail**
   - Sticky order ticket with YES/NO selections, stake inputs, preview modal.
   - Sparkline, order book, trades feed for extra depth.

5. **Portfolio + Legal**
   - Portfolio table calculates mark-to-market PnL from stored positions.
   - Legal page repeats the demo-only disclaimer.

## Development workflow

```bash
npm install
npm run dev
# app runs at http://localhost:3000
```

Useful scripts:

- `npm run lint` – ESLint via Next.js.
- `npm run build` – Production build (optional for the demo).

## Extending the demo

- **Add markets**: Edit `src/lib/markets.ts` and adjust hero/spotlight if needed.
- **Change tokenomics visuals**: Theme tokens live in `tailwind.config.ts` and `src/app/globals.css`.
- **Wire real auth/payments**: Swap the Zustand stores + mock dialogs with API calls; the UI already anticipates those flows.
- **Deploy**: Standard Next.js deployments (Vercel, Netlify, Fly.io) work out of the box.

## Notes

- Image assets live in `/public`. Large hero images are referenced there with SafeImage fallbacks.
- The repo was originally intended as a showpiece; commit history references the (now legendary) line: “this gonna be huge.” We kept a nod to that heritage.

Happy demoing! If you extend it, keep the “demo only” messaging intact to avoid implying real-money rails.
