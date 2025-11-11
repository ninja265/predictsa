import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number, options?: { maximumFractionDigits?: number }) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(value);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

export const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%230b1116'/%3E%3Cpath d='M0 350 Q300 300 600 360 V400 H0 Z' fill='%23007A4D' opacity='0.35'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='Montserrat, Arial, sans-serif' font-size='24' opacity='0.45'%3ESA Predicts%3C/text%3E%3C/svg%3E";
