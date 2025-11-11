import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "outline";
};

export function Badge({
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["tone"]>, string> = {
    default: "bg-frost/10 text-slate",
    accent: "bg-primary/10 text-primary",
    outline: "border border-border/20 text-slate/70",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        styles[tone],
        className
      )}
      {...props}
    />
  );
}
