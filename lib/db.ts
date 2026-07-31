import rawArticles from "@/data/articles.json";

export type Category =
  | "world" | "politics" | "economy" | "technology" | "sports" | "health" | "culture";

export type Tone = "positive" | "negative" | "neutral";

export interface Article {
  id: string;
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  body: string[];
  location: string;
  publishedAt: string;
  author: string;
  readTime: number;
  tags: string[];
  breaking: boolean;
  tone: Tone;
  imageSeed: string;
  source: string;
}

export const CATEGORIES: Category[] = [
  "world", "politics", "economy", "technology", "sports", "health", "culture",
];

export const ARTICLES: Article[] = rawArticles as Article[];

const byId = new Map(ARTICLES.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return byId.get(slug);
}

export function getBreaking(): Article[] {
  return ARTICLES.filter((a) => a.breaking).sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export function getLatest(limit?: number): Article[] {
  const sorted = [...ARTICLES].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getByCategory(category: Category): Article[] {
  return ARTICLES.filter((a) => a.category === category).sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export function getRelated(article: Article, limit = 3): Article[] {
  return ARTICLES.filter(
    (a) => a.id !== article.id && a.category === article.category,
  )
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored = ARTICLES.map((a) => {
    const haystack = `${a.title} ${a.excerpt} ${a.body.join(" ")} ${a.tags.join(" ")} ${a.location} ${a.author}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (haystack.includes(t)) score += 2;
      if (a.title.toLowerCase().includes(t)) score += 4;
      if (a.tags.some((tag) => tag.toLowerCase().includes(t))) score += 3;
    }
    return { a, score };
  })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);
  return scored.slice(0, 12);
}

export function timeAgo(iso: string, locale = "en"): string {
  const then = +new Date(iso);
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (mins < 1) return rtf.format(0, "minute");
    if (mins < 60) return rtf.format(-mins, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
    }).format(then);
  } catch {
    return new Date(iso).toLocaleDateString();
  }
}

export function formatDate(iso: string, locale = "en"): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleDateString();
  }
}

export interface AgentIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  location: string;
  breaking: boolean;
  tone: Tone;
  publishedAt: string;
}

export const AGENT_INDEX: AgentIndexItem[] = ARTICLES.map((a) => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  tags: a.tags,
  location: a.location,
  breaking: a.breaking,
  tone: a.tone,
  publishedAt: a.publishedAt,
}));
