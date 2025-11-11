export type Outcome = "YES" | "NO";

export type Market = {
  id: string;
  slug: string;
  question: string;
  closesAt: string;
  imageUrl: string;
  category: "Politics" | "Civics" | "Sports" | "Culture";
  description: string;
  yesPrice: number;
  noPrice: number;
  volumeZAR: number;
};

export const markets: Market[] = [
  {
    id: "ramaphosa-term",
    slug: "will-cyril-complete-his-term",
    question: "Will Cyril complete his term?",
    closesAt: "2026-12-31T23:59:59Z",
    imageUrl: "/cyril-ramaphosa-2156-1120.jpg",
    category: "Politics",
    description:
      "Resolution criteria: counts as YES if Cyril Ramaphosa remains President through the end of his current term without resigning or being removed before the official end date. Otherwise NO.",
    yesPrice: 0.62,
    noPrice: 0.38,
    volumeZAR: 1823500,
  },
  {
    id: "zille-joburg",
    slug: "will-helen-zille-win-as-joburg-mayor",
    question: "Will Helen Zille win as Joburg Mayor?",
    closesAt: "2026-06-30T23:59:59Z",
    imageUrl: "/helen-zille.jpg",
    category: "Civics",
    description:
      "YES if Helen Zille is officially elected and sworn in as Executive Mayor of the City of Johannesburg by the resolution date. Otherwise NO.",
    yesPrice: 0.31,
    noPrice: 0.69,
    volumeZAR: 734200,
  },
  {
    id: "bafana-round16",
    slug: "will-bafana-make-world-cup-round-of-16",
    question: "Will Bafana make it into the World Cup Round of 16?",
    closesAt: "2026-07-01T00:00:00Z",
    imageUrl: "/bafana.jpg",
    category: "Sports",
    description:
      "YES if South Africa’s men’s national team reaches the Round of 16 at the FIFA World Cup. Otherwise NO.",
    yesPrice: 0.18,
    noPrice: 0.82,
    volumeZAR: 1259000,
  },
  {
    id: "podcast-chill",
    slug: "will-podcast-and-chill-hit-5m-subs-2026",
    question: "Will Podcast & Chill hit 5M subs in 2026?",
    closesAt: "2026-12-31T23:59:59Z",
    imageUrl: "/podcast-and-chill.jpg",
    category: "Culture",
    description:
      "YES if Podcast & Chill crosses 5 million YouTube subscribers by the end of 2026. Screenshot proof from the official channel required.",
    yesPrice: 0.44,
    noPrice: 0.56,
    volumeZAR: 512000,
  },
];

export const getMarketBySlug = (slug: string) =>
  markets.find((market) => market.slug === slug);
