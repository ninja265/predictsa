"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "day";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/30 bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate transition hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
      aria-label="Toggle day or night mode"
    >
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
        {isDay ? (
          <Sun className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Moon className="h-3.5 w-3.5" aria-hidden />
        )}
      </span>
      {isDay ? "Day" : "Night"}
    </button>
  );
}
