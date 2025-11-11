"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PricePill } from "@/components/price-pill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Market, type Outcome } from "@/lib/markets";
import { estPayout, estProfit, fee, impliedOdds } from "@/lib/math";
import { cn, formatCurrency } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";

type Props = {
  market: Market;
};

const increments = [50, 100, 250];

export function OrderTicket({ market }: Props) {
  const [outcome, setOutcome] = useState<Outcome>("NO");
  const [stake, setStake] = useState("250");
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const addPosition = usePortfolioStore((state) => state.addPosition);

  const price = outcome === "YES" ? market.yesPrice : market.noPrice;

  const stakeValue = Number(stake) > 0 ? Number(stake) : 0;

  const { odds, payout, fees, profit } = useMemo(() => {
    if (!stakeValue) {
      return { odds: 0, payout: 0, fees: 0, profit: 0 };
    }

    const implied = impliedOdds(price);
    const payoutValue = estPayout(stakeValue, price);
    const feeValue = fee(stakeValue);
    const profitValue = estProfit(stakeValue, price);

    return {
      odds: implied,
      payout: payoutValue,
      fees: feeValue,
      profit: profitValue,
    };
  }, [price, stakeValue]);

  const canPreview = stakeValue > 0;

  const handleIncrement = (value: number) => {
    setStake((prev) => {
      const numeric = Number(prev) > 0 ? Number(prev) : 0;
      return String(numeric + value);
    });
  };

  const handleConfirm = () => {
    if (!stakeValue) return;

    addPosition({
      marketId: market.id,
      marketSlug: market.slug,
      marketQuestion: market.question,
      outcome,
      stake: stakeValue,
      price,
    });

    toast.success("Prediction placed in demo mode");
    setPreviewOpen(false);
  };

  return (
    <aside className="rounded-[6px] border border-white/10 bg-white/5 p-6 shadow-soft dark:bg-surface lg:sticky lg:top-28">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-muted">
        Prediction slip
      </p>
      <h3 className="mt-2 text-2xl font-heading text-slate">
        Place your prediction
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(["YES", "NO"] as Outcome[]).map((side) => {
          const isSelected = outcome === side;
          const isYes = side === "YES";
          const activeClass = isYes
            ? "bg-[#00C977] text-white ring-2 ring-white/10"
            : "bg-[#E03C31] text-white ring-2 ring-white/10";
          const inactiveClass = isYes
            ? "border border-primary/30 bg-transparent text-primary hover:border-primary/50"
            : "border border-support/40 bg-transparent text-support hover:border-support/60";
          return (
            <button
              key={side}
              type="button"
              onClick={() => setOutcome(side)}
              className={cn(
                "rounded-[6px] px-4 py-3 text-left text-sm font-semibold transition",
                isSelected ? activeClass : inactiveClass
              )}
              aria-pressed={isSelected}
            >
              <span className="text-xs uppercase tracking-[0.3em]">{side}</span>
              <span className="mt-1 block text-2xl font-heading">
                {side === "YES" ? market.yesPrice.toFixed(2) : market.noPrice.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <PricePill
          label={`${outcome} price`}
          value={price}
          variant={outcome === "YES" ? "yes" : "no"}
        />
      </div>
      <div className="mt-6 space-y-2">
        <Label htmlFor="stake-input">Stake (ZAR)</Label>
        <Input
          id="stake-input"
          type="number"
          inputMode="decimal"
          value={stake}
          onChange={(event) => setStake(event.target.value)}
          aria-describedby="stake-hint"
          placeholder="0.00"
        />
        <p id="stake-hint" className="text-xs text-slate-muted">
          Fees are 2% of stake. Increment buttons add to current value.
        </p>
      </div>
      <div className="mt-4 flex gap-3">
        {increments.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleIncrement(value)}
            className="flex-1 rounded-[4px] border border-gray-300 bg-transparent py-2 text-sm text-slate transition hover:border-primary/40"
          >
            +R{value}
          </button>
        ))}
      </div>
      <dl className="mt-6 space-y-3 text-sm text-slate">
        <div className="flex items-center justify-between">
          <dt>Implied odds</dt>
          <dd>{odds ? `${odds.toFixed(0)}%` : "—"}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Est. payout</dt>
          <dd>{payout ? formatCurrency(payout) : "—"}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Fees</dt>
          <dd>{fees ? formatCurrency(fees) : "—"}</dd>
        </div>
        <div className="flex items-center justify-between text-slate">
          <dt>Est. profit</dt>
          <dd className={profit >= 0 ? "text-primary" : "text-support"}>
            {profit ? formatCurrency(profit) : "—"}
          </dd>
        </div>
      </dl>
      <Button
        className="mt-6 w-full"
        disabled={!canPreview}
        onClick={() => setPreviewOpen(true)}
        variant="primary"
      >
        Preview
      </Button>

      <Dialog open={isPreviewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogTitle>Confirm your demo prediction</DialogTitle>
          <DialogDescription>
            This is a simulation for demonstration. No actual funds are used.
          </DialogDescription>
          <div className="mt-6 space-y-4 border border-border bg-surface-muted p-6 text-sm">
            <div className="flex justify-between text-slate">
              <span>Market</span>
              <span className="font-semibold">{market.question}</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Outcome</span>
              <span className="font-semibold">{outcome}</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Stake</span>
              <span>{formatCurrency(stakeValue)}</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Entry price</span>
              <span>{price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Est. payout</span>
              <span>{payout ? formatCurrency(payout) : "—"}</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Est. profit</span>
              <span>{profit ? formatCurrency(profit) : "—"}</span>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleConfirm}
            disabled={!canPreview}
            variant="primary"
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
