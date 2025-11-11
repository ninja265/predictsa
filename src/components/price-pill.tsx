type PricePillProps = {
  label: string;
  value: number;
  variant?: "neutral" | "yes" | "no";
};

const pillStyles: Record<
  NonNullable<PricePillProps["variant"]>,
  { container: string; value: string }
> = {
  neutral: {
    container: "rounded-[4px] border border-border bg-surface-muted text-slate",
    value: "text-slate",
  },
  yes: {
    container: "rounded-[4px] border border-primary/30 bg-primary/5 text-primary",
    value: "text-primary",
  },
  no: {
    container: "rounded-[4px] border border-support/30 bg-support/5 text-support",
    value: "text-support",
  },
};

export function PricePill({ label, value, variant = "neutral" }: PricePillProps) {
  const styles = pillStyles[variant];
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold ${styles.container}`}>
      <span className="text-slate-muted">{label}</span>
      <span className={styles.value}>{value.toFixed(2)}</span>
    </div>
  );
}
