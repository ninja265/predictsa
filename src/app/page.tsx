"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AccountFunctions } from "@/components/account-functions";
import { Hero } from "@/components/hero";
import { MarketGrid } from "@/components/market-grid";
import { StatsStrip } from "@/components/stats-strip";
import { estPayout } from "@/lib/math";
import { type Outcome, markets } from "@/lib/markets";
import { usePortfolioStore } from "@/store/portfolio";

const heroMetrics = [
  { label: "Demo positions tracked", value: "24", delta: "+5 today" },
  { label: "Avg. implied odds", value: "54%", delta: "across YES markets" },
  { label: "Open interest (mock)", value: "R1.8m", delta: "live sample" },
];

const quickStakeOptions = [100, 250, 500];

export default function Home() {
  const [liveMarkets, setLiveMarkets] = useState(markets);
  const addPosition = usePortfolioStore((state) => state.addPosition);
  const [quickOutcome, setQuickOutcome] = useState<Outcome>("YES");
  const [quickStake, setQuickStake] = useState("250");

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMarkets((prev) =>
        prev.map((market, index) => {
          const base = markets[index]?.yesPrice ?? market.yesPrice;
          const jitter = (Math.random() - 0.5) * 0.04;
          const yesPrice = Math.min(
            0.95,
            Math.max(0.05, Number((base + jitter).toFixed(2)))
          );
          const noPrice = Number((1 - yesPrice).toFixed(2));
          return { ...market, yesPrice, noPrice };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const featuredMarket = liveMarkets[0];
  if (!featuredMarket) return null;

  const quickStakeValue = Number(quickStake) > 0 ? Number(quickStake) : 0;
  const quickPrice =
    quickOutcome === "YES" ? featuredMarket.yesPrice : featuredMarket.noPrice;
  const quickPayout = quickStakeValue
    ? estPayout(quickStakeValue, quickPrice)
    : 0;

  const handleQuickPredict = () => {
    if (!quickStakeValue) return;
    addPosition({
      marketId: featuredMarket.id,
      marketSlug: featuredMarket.slug,
      marketQuestion: featuredMarket.question,
      outcome: quickOutcome,
      stake: quickStakeValue,
      price: quickPrice,
    });
    toast.success("Prediction saved to your demo portfolio.");
  };

  return (
    <main className="pb-16">
      <Hero
        market={featuredMarket}
        quickOutcome={quickOutcome}
        quickStake={quickStake}
        onOutcomeChange={setQuickOutcome}
        onStakeChange={setQuickStake}
        onPredict={handleQuickPredict}
        quickPayout={quickPayout}
        stakeOptions={quickStakeOptions}
      />
      <MarketGrid markets={liveMarkets} />
      <StatsStrip stats={heroMetrics} />
      <AccountFunctions />
    </main>
  );
}
