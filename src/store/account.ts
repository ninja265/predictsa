"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
};

export type Transaction = {
  id: string;
  date: string;
  type: "Deposit" | "Withdraw" | "Trade Payout";
  method: string;
  amount: number;
  status: "Completed" | "Pending";
};

type AccountState = {
  user: User | null;
  transactions: Transaction[];
  login: (email: string) => void;
  logout: () => void;
  adjustBalance: (delta: number) => void;
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
};

const initialTransactions: Transaction[] = [
  {
    id: nanoid(),
    date: "2025-02-12 09:15",
    type: "Deposit",
    method: "Bank",
    amount: 5000,
    status: "Completed",
  },
  {
    id: nanoid(),
    date: "2025-02-11 14:40",
    type: "Trade Payout",
    method: "YES · Cyril term",
    amount: 1800,
    status: "Completed",
  },
  {
    id: nanoid(),
    date: "2025-02-10 10:22",
    type: "Withdraw",
    method: "Crypto",
    amount: 2500,
    status: "Pending",
  },
];

export const useAccountStore = create<AccountState>((set) => ({
  user: null,
  transactions: initialTransactions,
  login: (email) =>
    set(() => ({
      user: {
        id: nanoid(6).toUpperCase(),
        name: "Naledi Nkosi",
        email,
        balance: 25000,
      },
    })),
  logout: () =>
    set(() => ({
      user: null,
    })),
  adjustBalance: (delta) =>
    set((state) =>
      state.user
        ? { user: { ...state.user, balance: Math.max(0, state.user.balance + delta) } }
        : state
    ),
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          id: nanoid(),
          date: new Intl.DateTimeFormat("en-ZA", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date()),
          ...transaction,
        },
        ...state.transactions,
      ],
    })),
}));
