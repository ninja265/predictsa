"use client";

import { useMemo } from "react";

type Props = {
  price: number;
};

export function MiniSparkline({ price }: Props) {
  const data = useMemo(() => {
    const base = price * 100;
    return Array.from({ length: 30 }, (_, index) => {
      const variation = (Math.random() - 0.5) * 3;
      return {
        x: (index / 29) * 100,
        y: 100 - (base + variation),
      };
    });
  }, [price]);

  const points = data.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="border border-border bg-surface p-6">
      <p className="text-sm text-slate-muted">YES price trend</p>
      <p className="text-3xl font-heading text-slate">
        {(price * 100).toFixed(1)}%
      </p>
      <svg viewBox="0 0 100 100" className="mt-4 h-24 w-full">
        <polyline
          fill="none"
          stroke="#0f8b6b"
          strokeWidth={2}
          strokeLinecap="round"
          points={points}
        />
      </svg>
    </div>
  );
}
