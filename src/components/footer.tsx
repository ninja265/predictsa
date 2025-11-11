import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 text-sm text-gray-400">
      <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-sa-predicts.png"
            alt="SA Predicts"
            width={140}
            height={40}
            className="h-6 w-auto object-contain"
          />
          <span>© {new Date().getFullYear()} SA Predicts. Demo only.</span>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-400">
          <Link href="/#markets" className="transition hover:text-primary">
            Markets
          </Link>
          <Link href="/#how-it-works" className="transition hover:text-primary">
            About
          </Link>
          <Link href="/legal" className="transition hover:text-primary">
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
