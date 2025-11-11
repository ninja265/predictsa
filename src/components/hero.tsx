"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { LiveMarketPreview } from "@/components/live-market-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Market, type Outcome } from "@/lib/markets";

type HeroProps = {
  market: Market;
  quickOutcome: Outcome;
  quickStake: string;
  onOutcomeChange: (outcome: Outcome) => void;
  onStakeChange: (value: string) => void;
  onPredict: () => void;
  quickPayout: number;
  stakeOptions: number[];
};

export function Hero({
  market,
  quickOutcome,
  quickStake,
  onOutcomeChange,
  onStakeChange,
  onPredict,
  quickPayout,
  stakeOptions,
}: HeroProps) {
  return (
    <motion.section
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-24 pb-16 lg:grid-cols-[0.45fr,0.55fr]">
        <div className="space-y-6">
          <Badge tone="accent" className="inline-flex items-center">
            SA PREDICTS • LIVE DEMO
          </Badge>
          <div className="space-y-4">
            <h1 className="font-heading text-6xl font-semibold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-7xl">
              Opinions that matter.
            </h1>
            <p className="text-base text-slate/80">
              Trade South Africa’s defining calls with investor-grade clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link href="/#markets">Launch live demo</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/#markets">See markets</Link>
            </Button>
          </div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate/60">
            <span className="h-2 w-2 rounded-full bg-primary animate-dot-pulse" />
            Investor demo mode · all prices simulated
          </p>
        </div>
        <LiveMarketPreview
          market={market}
          stake={quickStake}
          outcome={quickOutcome}
          onOutcomeChange={onOutcomeChange}
          onStakeChange={onStakeChange}
          onPredict={onPredict}
          payout={quickPayout}
          stakeOptions={stakeOptions}
        />
      </div>
    </motion.section>
  );
}
