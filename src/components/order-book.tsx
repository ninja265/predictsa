import { Market } from "@/lib/markets";

const makeLevels = (price: number, direction: "up" | "down") => {
  return Array.from({ length: 5 }, (_, index) => {
    const delta = (index + 1) * 0.01;
    const adjusted =
      direction === "up" ? price + delta : Math.max(price - delta, 0.05);
    const size = Math.round((Math.random() * 1500 + 500) / adjusted);
    return {
      price: Number(adjusted.toFixed(2)),
      size,
    };
  });
};

type Props = {
  market: Market;
};

export function OrderBook({ market }: Props) {
  const yesLevels = makeLevels(market.yesPrice, "down");
  const noLevels = makeLevels(market.noPrice, "up");

  return (
    <div className="border border-border bg-surface p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-muted">
          Order book
        </p>
        <span className="text-xs text-slate-muted">Top 5 levels</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase text-primary">YES bids</p>
          <ul className="space-y-2 text-sm">
            {yesLevels.map((level, index) => (
              <li
                key={`yes-${level.price}-${index}`}
                className="flex items-center justify-between border border-border bg-primary/5 px-3 py-2 text-slate"
              >
                <span>{level.price.toFixed(2)}</span>
                <span className="text-slate-muted">{level.size} qty</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase text-support-red">NO asks</p>
          <ul className="space-y-2 text-sm">
            {noLevels.map((level, index) => (
              <li
                key={`no-${level.price}-${index}`}
                className="flex items-center justify-between border border-border bg-support/10 px-3 py-2 text-slate"
              >
                <span>{level.price.toFixed(2)}</span>
                <span className="text-slate-muted">{level.size} qty</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
