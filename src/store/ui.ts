"use client";

import { create } from "zustand";

type UIState = {
  isLoginOpen: boolean;
  isWalletOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openWallet: () => void;
  closeWallet: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isLoginOpen: false,
  isWalletOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  openWallet: () => set({ isWalletOpen: true }),
  closeWallet: () => set({ isWalletOpen: false }),
}));
