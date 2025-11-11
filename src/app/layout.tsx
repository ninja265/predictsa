import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SA Predicts · Opinions that matter",
  description:
    "SA Predicts is a premium South African prediction market demo. Opinions that matter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-canvas text-slate`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <span className="glow-orb top-10 left-10 bg-primary/20" />
            <span className="glow-orb bottom-10 right-10 bg-accent/20" />
            <Navbar />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
