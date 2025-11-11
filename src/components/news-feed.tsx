import { ArrowUpRight, Radio } from "lucide-react";
import Link from "next/link";

const news = [
  {
    title: "Bafana surge past Nigeria puts World Cup odds in focus",
    source: "News24",
    time: "2h ago",
    sentiment: "Bullish",
    href: "https://www.news24.com/sport/soccer/bafana-bafana-and-banyana-banyana/first-take-from-nigeria-a-miracle-rises-bafana-bafana-are-going-to-the-world-cup-20251014-1149",
  },
  {
    title: "Helen Zille hints at future moves after DA leadership change",
    source: "Mossel Bay Advertiser",
    time: "4h ago",
    sentiment: "Neutral",
    href: "https://www.mosselbayadvertiser.com/News/Article/National-News/helen-zille-to-step-down-as-da-leader-20170711",
  },
  {
    title: "Ramaphosa shrugs off G20 criticism amid policy push",
    source: "News24 Politics",
    time: "6h ago",
    sentiment: "Watch",
    href: "https://www.news24.com/politics/noise-has-quietened-down-says-ramaphosa-despite-trumps-g20-criticism-20251106-1045",
  },
  {
    title: "Podcast & Chill closing in on 5M subscribers",
    source: "Channel Monitor",
    time: "8h ago",
    sentiment: "Bullish",
    href: "https://podcastandchill.africa",
  },
];

const sentimentColor: Record<string, string> = {
  Bullish: "text-primary",
  Neutral: "text-slate",
  Watch: "text-support",
};

export function NewsFeed() {
  return (
    <section className="container py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate/60">
            Market radar
          </p>
          <h2 className="mt-2 text-3xl font-heading text-slate">News feed</h2>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-slate/60">
          <Radio className="h-4 w-4 text-primary" />
          Auto-updates
        </span>
      </div>
      <div className="mt-6 rounded-[6px] border border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="grid grid-cols-[2fr,1fr,1fr,auto] border-b border-border/10 px-4 py-3 text-xs uppercase tracking-wide text-slate/60">
          <span>Headline</span>
          <span>Source</span>
          <span>Sentiment</span>
          <span>Link</span>
        </div>
        {news.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-[2fr,1fr,1fr,auto] border-t border-border/10 px-4 py-4 text-sm text-slate"
          >
            <div className="pr-4">
              <p className="font-medium text-slate">{item.title}</p>
              <p className="text-xs text-slate/60">{item.time}</p>
            </div>
            <span>{item.source}</span>
            <span
              className={`font-semibold ${
                sentimentColor[item.sentiment] ?? "text-slate"
              }`}
            >
              {item.sentiment}
            </span>
            <Link
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-primary"
            >
              Open <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
