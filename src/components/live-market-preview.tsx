import { Coins, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PricePill } from "@/components/price-pill";
import { SafeImage } from "@/components/safe-image";
import { type Market, type Outcome } from "@/lib/markets";
import { cn, formatCurrency } from "@/lib/utils";

type LiveMarketPreviewProps = {
  market: Market;
  stake: string;
  outcome: Outcome;
  onOutcomeChange: (outcome: Outcome) => void;
  onStakeChange: (value: string) => void;
  onPredict: () => void;
  payout: number;
  stakeOptions: number[];
};

export function LiveMarketPreview({
  market,
  stake,
  outcome,
  onOutcomeChange,
  onStakeChange,
  onPredict,
  payout,
  stakeOptions,
}: LiveMarketPreviewProps) {
  const price = outcome === "YES" ? market.yesPrice : market.noPrice;

  const delegates = [
    { type: "image" as const, src: market.imageUrl, alt: market.question },
    { type: "image" as const, src: "/logo-sa-predicts.png", alt: "SA Predicts" },
    { type: "emoji" as const, emoji: "🏛️", alt: "Parliament" },
  ];

  const selectionClasses = (selected: boolean, tone: "yes" | "no") =>
    selected
      ? tone === "yes"
        ? "bg-[#00C977] text-white ring-2 ring-white/10"
        : "bg-[#E03C31] text-white ring-2 ring-white/10"
      : "border border-gray-300/70 bg-transparent text-slate hover:border-primary/40 dark:border-white/20";

  return (
    <div className="relative rounded-[6px] border border-gray-200/50 bg-surface/80 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/10 sm:p-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate/60">
        <span>Featured market</span>
        <RefreshCcw className="h-4 w-4 text-slate/50" />
      </div>
      <h3 className="mt-4 text-2xl font-heading text-slate">{market.question}</h3>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOutcomeChange("YES")}
          className={cn(
            "rounded-[6px] px-4 py-3 text-left text-sm font-semibold transition",
            selectionClasses(outcome === "YES", "yes")
          )}
        >
          <span className="text-xs uppercase tracking-[0.3em]">YES</span>
          <span className="mt-1 block text-2xl">{market.yesPrice.toFixed(2)}</span>
        </button>
        <button
          type="button"
          onClick={() => onOutcomeChange("NO")}
          className={cn(
            "rounded-[6px] px-4 py-3 text-left text-sm font-semibold transition",
            selectionClasses(outcome === "NO", "no")
          )}
        >
          <span className="text-xs uppercase tracking-[0.3em]">NO</span>
          <span className="mt-1 block text-2xl">{market.noPrice.toFixed(2)}</span>
        </button>
      </div>
      <div className="mt-5">
        <PricePill
          label="Selected price"
          value={price}
          variant={outcome === "YES" ? "yes" : "no"}
        />
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate/60">
          <span>Stake (ZAR)</span>
          <span className="text-slate/80">Quick add</span>
        </div>
        <input
          type="number"
          value={stake}
          onChange={(event) => onStakeChange(event.target.value)}
          className="w-full rounded-[4px] border border-gray-300 bg-canvas-soft/70 px-4 py-3 text-base text-slate outline-none transition focus:ring-2 focus:ring-primary/30 dark:border-white/15"
          placeholder="Enter amount"
        />
        <div className="flex gap-2">
          {stakeOptions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onStakeChange(String(value))}
              className="flex-1 rounded-[4px] border border-gray-300 bg-transparent py-2 text-sm text-slate transition hover:border-primary/40 dark:border-white/20"
            >
              R{value}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-[4px] border border-gray-200/60 bg-surface-muted/50 px-4 py-3 text-sm text-slate">
        <span>Est. payout</span>
        <span className="font-heading">{payout ? formatCurrency(payout) : "—"}</span>
      </div>
      <Button
        onClick={onPredict}
        className="mt-5 w-full"
        variant="primary"
        disabled={!stake || Number(stake) <= 0}
      >
        <Coins className="mr-2 h-4 w-4" />
        Predict now
      </Button>
      <div className="mt-8 flex items-center justify-between text-xs text-slate/70">
        <div className="flex -space-x-2">
          {delegates.map((delegate, index) =>
            delegate.type === "image" ? (
              <div
                key={`${delegate.src}-${index}`}
                className="rounded-[4px] border border-white/20 bg-frost/5 p-1"
              >
                <SafeImage
                  src={delegate.src}
                  alt={delegate.alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-[4px] object-cover"
                />
              </div>
            ) : (
              <div
                key={`emoji-${index}`}
                className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-white/20 bg-frost/5 text-base"
              >
                {delegate.emoji}
              </div>
            )
          )}
        </div>
        <p>Delegates monitoring</p>
      </div>
    </div>
  );
}
