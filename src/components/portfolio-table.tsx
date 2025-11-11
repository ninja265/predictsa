"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";

export function PortfolioTable() {
  const positions = usePortfolioStore((state) => state.positions);
  const markToMarket = usePortfolioStore((state) => state.markToMarket);

  const rows = markToMarket();

  const totals = rows.reduce(
    (acc, row) => {
      acc.stake += row.position.stake;
      acc.payout += row.markPayout;
      acc.profit += row.markProfit;
      return acc;
    },
    { stake: 0, payout: 0, profit: 0 }
  );

  if (!positions.length) {
    return (
      <div className="border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-lg font-heading text-slate">
          You have no demo positions yet.
        </p>
        <p className="mt-2 text-sm text-slate-muted">
          Place a prediction from any market to see it appear here instantly.
        </p>
        <Button asChild className="mt-6">
          <Link href="/#markets">Browse markets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border border-border bg-surface p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-muted">
          Mark-to-market
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs text-slate-muted">Total stake</p>
            <p className="text-2xl font-heading text-slate">
              {formatCurrency(totals.stake)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-muted">Est. payout</p>
            <p className="text-2xl font-heading text-slate">
              {formatCurrency(totals.payout)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-muted">Est. profit</p>
            <p
              className={`text-2xl font-heading ${
                totals.profit >= 0 ? "text-primary" : "text-support"
              }`}
            >
              {formatCurrency(totals.profit)}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto border border-border bg-surface shadow-soft">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="text-slate-muted">
            <tr>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Market
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Side
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Stake
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Entry price
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Est. payout
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Est. profit
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-slate">
            {rows.map(({ position, markPayout, markProfit }) => {
              const entryPrice = position.price.toFixed(2);
              const time = formatDate(position.timestamp);

              return (
                <tr key={position.id}>
                  <td className="px-6 py-4">
                    <Link
                      href={`/market/${position.marketSlug}`}
                      className="text-slate hover:underline"
                    >
                      {position.marketQuestion}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold ${
                        position.outcome === "YES"
                          ? "bg-primary/10 text-primary"
                          : "bg-support/10 text-support"
                      }`}
                    >
                      {position.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatCurrency(position.stake)}</td>
                  <td className="px-6 py-4">{entryPrice}</td>
                  <td className="px-6 py-4">{formatCurrency(markPayout)}</td>
                  <td
                    className={`px-6 py-4 ${
                      markProfit >= 0 ? "text-primary" : "text-support"
                    }`}
                  >
                    {formatCurrency(markProfit)}
                  </td>
                  <td className="px-6 py-4 text-slate-muted">{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
