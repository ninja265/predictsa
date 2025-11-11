"use client";

import { useEffect, useState } from "react";

import { type Market, type Outcome } from "@/lib/markets";
import { formatCurrency } from "@/lib/utils";

type Trade = {
  id: string;
  side: Outcome;
  price: number;
  stake: number;
  timestamp: string;
};

type Props = {
  market: Market;
};

const randomTrade = (market: Market): Trade => {
  const side: Outcome = Math.random() > 0.5 ? "YES" : "NO";
  const basePrice = side === "YES" ? market.yesPrice : market.noPrice;
  const price = Number((basePrice + (Math.random() - 0.5) * 0.05).toFixed(2));
  const stake = Math.round(Math.random() * 600 + 100);
  return {
    id: `${Date.now()}-${Math.random()}`,
    side,
    price,
    stake,
    timestamp: new Date().toISOString(),
  };
};

export function RecentTrades({ market }: Props) {
  const [trades, setTrades] = useState<Trade[]>(() =>
    Array.from({ length: 8 }, () => randomTrade(market))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTrades((prev) => [randomTrade(market), ...prev].slice(0, 10));
    }, 3000);
    return () => clearInterval(interval);
  }, [market]);

  return (
    <div className="border border-border bg-surface p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-muted">
        Recent predictions
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        {trades.map((trade) => (
          <li
            key={trade.id}
            className="flex items-center justify-between border border-border bg-surface-muted px-4 py-3"
          >
            <span
              className={`px-3 py-1 text-xs font-semibold ${
                trade.side === "YES"
                  ? "bg-primary/10 text-primary"
                  : "bg-support/10 text-support"
              }`}
            >
              {trade.side}
            </span>
            <span>{trade.price.toFixed(2)}</span>
            <span>{formatCurrency(trade.stake, { maximumFractionDigits: 0 })}</span>
            <span className="text-slate-muted">
              {new Date(trade.timestamp).toLocaleTimeString("en-ZA", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
