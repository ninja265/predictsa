import { PortfolioTable } from "@/components/portfolio-table";

export default function PortfolioPage() {
  return (
    <main className="container space-y-10 py-14">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          Portfolio
        </p>
        <h1 className="text-4xl font-heading text-slate">
          Demo positions & PnL
        </h1>
        <p className="text-slate-muted">
          Positions settle instantly after you confirm a prediction in demo mode.
          Everything stays local to this browser session.
        </p>
      </div>
      <PortfolioTable />
    </main>
  );
}
