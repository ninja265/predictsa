"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/safe-image";
import { type Market } from "@/lib/markets";
import { formatCurrency } from "@/lib/utils";

type MarketGridProps = {
  markets: Market[];
};

const SOUTH_AFRICA_FLAG = [
  "#007A4D",
  "#FFD100",
  "#000000",
  "#FFFFFF",
  "#DE3831",
  "#002395",
] as const;

export function MarketGrid({ markets }: MarketGridProps) {
  return (
    <section id="markets" className="mx-auto max-w-6xl px-6 pb-16">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate/60">Markets</p>
        <h2 className="font-heading text-4xl text-slate">Spotlight predictions.</h2>
        <p className="max-w-3xl text-base text-slate/70">
          High-conviction events ready for the boardroom: clear probabilities, transparent spreads, and a single tap into deeper detail.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {markets.map((market) => {
          const impliedChance = Math.round(market.yesPrice * 100);
          return (
            <motion.article
              key={market.id}
              className="group relative flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="absolute inset-x-0 top-0 flex h-1 w-full overflow-hidden rounded-[6px]">
                {SOUTH_AFRICA_FLAG.map((color) => (
                  <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </span>
              <Link href={`/market/${market.slug}`} className="h-40 w-full overflow-hidden rounded-[4px]">
                <SafeImage
                  src={market.imageUrl}
                  alt={market.question}
                  width={560}
                  height={280}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-4 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate/60">{market.category}</p>
                  <Link href={`/market/${market.slug}`}>
                    <h3 className="mt-2 text-xl font-heading text-slate transition group-hover:text-primary">
                      {market.question}
                    </h3>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-[4px] border border-primary/25 bg-primary/10 px-3 py-3 text-primary">
                    <p className="text-xs uppercase tracking-[0.3em]">YES</p>
                    <p className="text-2xl font-heading">{market.yesPrice.toFixed(2)}</p>
                  </div>
                  <div className="rounded-[4px] border border-support/30 bg-support/10 px-3 py-3 text-support">
                    <p className="text-xs uppercase tracking-[0.3em]">NO</p>
                    <p className="text-2xl font-heading">{market.noPrice.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-sm text-slate/70">
                  Implied chance {impliedChance}% · Mock volume{" "}
                  {formatCurrency(market.volumeZAR, { maximumFractionDigits: 0 })}
                </p>
                <Button variant="secondary" className="mt-auto w-full justify-center" asChild>
                  <Link href={`/market/${market.slug}`}>View market</Link>
                </Button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
