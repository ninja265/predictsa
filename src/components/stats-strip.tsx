type Stat = {
  label: string;
  value: string;
  delta: string;
};

type StatsStripProps = {
  stats: Stat[];
};

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[6px] border border-black/5 bg-white/60 px-4 py-3 text-slate shadow-sm dark:border-white/10 dark:bg-white/10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate/60">{stat.label}</p>
            <p className="mt-2 text-3xl font-heading text-slate">{stat.value}</p>
            <p className="text-sm text-slate/70">{stat.delta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
