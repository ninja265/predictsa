import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { type Outcome, markets } from "@/lib/markets";
import { estPayout, fee } from "@/lib/math";

export type Position = {
  id: string;
  marketId: string;
  marketSlug: string;
  marketQuestion: string;
  outcome: Outcome;
  stake: number;
  price: number;
  timestamp: string;
};

type PortfolioState = {
  positions: Position[];
  addPosition: (position: Omit<Position, "id" | "timestamp">) => Position;
  markToMarket: () => Array<{
    position: Position;
    markPrice: number;
    markPayout: number;
    markProfit: number;
  }>;
};

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  key: () => null,
  length: 0,
  clear: () => undefined,
};

const storage = createJSONStorage<PortfolioState>(() =>
  typeof window === "undefined" ? noopStorage : window.localStorage
);

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      positions: [],
      addPosition: (payload) => {
        const id =
          (typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`) ?? `${Date.now()}`;

        const position: Position = {
          ...payload,
          id,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          positions: [position, ...state.positions],
        }));

        return position;
      },
      markToMarket: () => {
        const { positions } = get();
        return positions.map((position) => {
          const market = markets.find((m) => m.id === position.marketId);
          const markPrice =
            position.outcome === "YES"
              ? market?.yesPrice ?? position.price
              : market?.noPrice ?? position.price;
          const markPayout = estPayout(position.stake, markPrice);
          const markProfit = markPayout - position.stake - fee(position.stake);
          return {
            position,
            markPrice,
            markPayout,
            markProfit,
          };
        });
      },
    }),
    {
      name: "sapredicts-portfolio",
      storage,
    }
  )
);
