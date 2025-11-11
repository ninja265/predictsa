"use client";

import { LogIn, PiggyBank, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const demoProfile = {
  name: "Naledi Nkosi",
  tier: "Executive Demo",
  email: "naledi.demo@sapredicts.africa",
};

const trustClaims = ["SA-first design", "Transparent pricing", "Demo only"];

export function AccountFunctions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [balance, setBalance] = useState(25000);

  const handleLogin = () => {
    setIsLoggedIn((prev) => {
      const next = !prev;
      toast.success(next ? "Logged into demo space." : "Logged out of demo space.");
      return next;
    });
  };

  const handleTopUp = () => {
    setBalance((prev) => {
      const next = prev + 500;
      toast.success("Added R500 demo credits.");
      return next;
    });
  };

  return (
    <section
      id="account-functions"
      className="mx-auto max-w-6xl px-6 pb-16"
    >
      <div className="mb-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate/60">
        {trustClaims.map((claim, index) => (
          <div key={claim} className="flex items-center gap-2">
            <span>{claim}</span>
            {index < trustClaims.length - 1 && <span className="text-slate/40">•</span>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 text-sm text-gray-500 md:grid-cols-3">
        <article className="rounded-[6px] border border-black/5 bg-white/40 p-5 text-slate shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3 text-gray-700 dark:text-slate">
            <span className="rounded-[4px] bg-primary/15 p-2 text-primary">
              <UserRound className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Profile</p>
              <p className="text-base font-heading text-slate">{demoProfile.name}</p>
            </div>
          </div>
          <p className="mt-3">
            {showProfile
              ? `${demoProfile.email} • ${demoProfile.tier}`
              : "Reveal the demo identity used for investor walkthroughs."}
          </p>
          <Button
            variant="secondary"
            className="mt-4 w-full"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {showProfile ? "Hide details" : "View details"}
          </Button>
        </article>
        <article className="rounded-[6px] border border-black/5 bg-white/40 p-5 text-slate shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-support/15 p-2 text-support">
              <LogIn className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Login</p>
              <p className="text-base font-heading text-slate">
                {isLoggedIn ? "Demo session active" : "Logged out"}
              </p>
            </div>
          </div>
          <p className="mt-3">
            Toggle a simulated session to narrate auth and governance flows in minutes.
          </p>
          <Button
            variant="primary"
            className="mt-4 w-full"
            onClick={handleLogin}
          >
            {isLoggedIn ? "Log out" : "Login"}
          </Button>
        </article>
        <article className="rounded-[6px] border border-black/5 bg-white/40 p-5 text-slate shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-accent/15 p-2 text-accent">
              <PiggyBank className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Balance</p>
              <p className="text-base font-heading text-slate">
                {formatCurrency(balance, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
          <p className="mt-3">
            Demo funds reset nightly. Use top-ups to illustrate payouts and treasury.
          </p>
          <Button variant="secondary" className="mt-4 w-full" onClick={handleTopUp}>
            Add demo funds
          </Button>
        </article>
      </div>
    </section>
  );
}
