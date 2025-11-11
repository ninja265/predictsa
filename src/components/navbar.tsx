"use client";

import { useEffect, useMemo, useState } from "react";
import { LogIn, LogOut, Settings, Sun, Moon, UserRound, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn, formatCurrency } from "@/lib/utils";
import { useAccountStore } from "@/store/account";
import { useUIStore } from "@/store/ui";
import { LoginDialog } from "@/components/login-dialog";
import { WalletDialog } from "@/components/wallet-dialog";

const links = [
  { href: "/#markets", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#how-it-works", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "day";
  const user = useAccountStore((state) => state.user);
  const logout = useAccountStore((state) => state.logout);
  const { openLogin, openWallet } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userBalance = user?.balance ?? 25000;
  const formattedBalance = useMemo(
    () => formatCurrency(userBalance, { maximumFractionDigits: 0 }),
    [userBalance]
  );

  const headerClasses = cn(
    "fixed top-0 z-50 w-full border-b border-black/5 bg-white/60 px-6 backdrop-blur-md transition-all duration-300 dark:border-white/5 dark:bg-black/40",
    scrolled && "shadow-sm"
  );

  const handleLogout = () => {
    logout();
    toast.success("Demo session ended.");
  };

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 py-3">
        <Link href="/" aria-label="SA Predicts" className="flex items-center gap-3">
          <Image
            src="/logo-sa-predicts.png"
            alt="SA Predicts"
            width={180}
            height={54}
            className="mr-4 h-10 max-h-[40px] w-auto object-contain"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-800 dark:text-gray-200 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="primary">
            <Link href="/#markets">Launch app</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "border border-border/30"
                )}
                aria-label="Account menu"
              >
                <UserRound className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[16rem]">
              {!user ? (
                <>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      openLogin();
                    }}
                    className="flex items-center justify-between text-primary"
                  >
                    Login
                    <LogIn className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      toggleTheme();
                    }}
                    className="flex items-center justify-between"
                  >
                    Display {isDay ? "Light" : "Dark"}
                    {isDay ? (
                      <Sun className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-300" />
                    )}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-slate/60">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      openWallet();
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Balance</p>
                        <p className="font-heading text-base text-slate">{formattedBalance}</p>
                      </div>
                      <Wallet className="h-4 w-4 text-primary" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      openWallet();
                    }}
                  >
                    View wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/#profile-function" className="flex w-full items-center justify-between">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/#account-functions" className="flex w-full items-center justify-between">
                      Settings
                      <Settings className="h-4 w-4 text-slate/50" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      handleLogout();
                    }}
                    className="flex items-center justify-between"
                  >
                    Logout
                    <LogOut className="h-4 w-4 text-slate/60" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      toggleTheme();
                    }}
                    className="flex items-center justify-between"
                  >
                    Display {isDay ? "Light" : "Dark"}
                    {isDay ? (
                      <Sun className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-300" />
                    )}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LoginDialog />
      <WalletDialog />
    </header>
  );
}
