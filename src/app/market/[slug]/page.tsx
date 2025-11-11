import { notFound } from "next/navigation";

import { OrderBook } from "@/components/order-book";
import { OrderTicket } from "@/components/order-ticket";
import { MiniSparkline } from "@/components/mini-sparkline";
import { PricePill } from "@/components/price-pill";
import { RecentTrades } from "@/components/recent-trades";
import { SafeImage } from "@/components/safe-image";
import { Badge } from "@/components/ui/badge";
import { getMarketBySlug } from "@/lib/markets";
import { formatCurrency, formatDate } from "@/lib/utils";

type Props = {
  params: {
    slug: string;
  };
};

export default function MarketPage({ params }: Props) {
  const market = getMarketBySlug(params.slug);

  if (!market) {
    notFound();
  }

  return (
    <main className="container py-14">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <section className="space-y-8">
          <div className="overflow-hidden border border-border bg-surface shadow-soft">
            <div className="relative h-96">
              <SafeImage
                src={market.imageUrl}
                alt={market.question}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
              <div className="absolute left-6 top-6">
                <Badge tone="accent">{market.category}</Badge>
              </div>
              <div className="absolute bottom-6 left-6 space-y-3 text-white">
                <p className="text-sm uppercase text-white/80">
                  Closes {formatDate(market.closesAt)}
                </p>
                <h1 className="text-4xl font-heading">{market.question}</h1>
              </div>
            </div>
            <div className="grid gap-6 p-8 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  Overview
                </p>
                <p className="text-slate-muted">{market.description}</p>
              </div>
              <div className="space-y-4 border border-border bg-surface-muted p-6 text-sm text-slate">
                <div className="flex items-center justify-between">
                  <span>Closes</span>
                  <span>{formatDate(market.closesAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mock volume</span>
                  <span>
                    {formatCurrency(market.volumeZAR, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <PricePill label="YES price" value={market.yesPrice} variant="yes" />
                  <PricePill label="NO price" value={market.noPrice} variant="no" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <MiniSparkline price={market.yesPrice} />
            <div className="border border-border bg-surface p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-muted">
                Order flow
              </p>
              <p className="mt-3 text-4xl font-heading text-slate">
                {formatCurrency(market.yesPrice * market.volumeZAR * 0.2, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-2 text-sm text-slate-muted">
                Estimated liquidity routed through YES bids.
              </p>
              <div className="mt-4 h-2 w-full bg-surface-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${market.yesPrice * 100}%` }}
                />
              </div>
            </div>
          </div>
          <OrderBook market={market} />
          <RecentTrades market={market} />
        </section>
        <OrderTicket market={market} />
      </div>
    </main>
  );
}
