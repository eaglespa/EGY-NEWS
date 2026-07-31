import { XMLParser } from "fast-xml-parser";

export interface WireItem {
  id: string;
  title: string;
  link: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  excerpt: string;
  lang: string;
}

export interface WireSourceMeta {
  id: string;
  name: string;
  lang: string;
}

export interface WireFeedResponse {
  fetchedAt: string;
  items: WireItem[];
  sources: WireSourceMeta[];
  total: number;
}

interface FeedSource {
  id: string;
  name: string;
  site: string;
  kind: "google" | "rss";
  url: string;
  lang: string;
}

function googleNewsUrl(query: string, hl: string, gl: string, ceid: string): string {
  const base = `https://news.google.com/rss`;
  const params = new URLSearchParams({ hl, gl, ceid });
  if (query) params.set("q", query);
  return `${base}?${params.toString()}`;
}

export const WIRE_SOURCES: FeedSource[] = [
  {
    id: "axios",
    name: "Axios",
    site: "https://www.axios.com",
    kind: "google",
    url: googleNewsUrl("site:axios.com", "en-US", "US", "US:en"),
    lang: "en",
  },
  {
    id: "reuters",
    name: "Reuters",
    site: "https://www.reuters.com",
    kind: "google",
    url: googleNewsUrl("site:reuters.com", "en-US", "US", "US:en"),
    lang: "en",
  },
  {
    id: "cnn",
    name: "CNN",
    site: "https://www.cnn.com",
    kind: "google",
    url: googleNewsUrl("site:cnn.com", "en-US", "US", "US:en"),
    lang: "en",
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    site: "https://www.aljazeera.com",
    kind: "google",
    url: googleNewsUrl("site:aljazeera.com", "en-US", "US", "US:en"),
    lang: "en",
  },
  {
    id: "bbc",
    name: "BBC",
    site: "https://www.bbc.com/news",
    kind: "rss",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    lang: "en",
  },
  {
    id: "google-top",
    name: "Google News",
    site: "https://news.google.com",
    kind: "google",
    url: googleNewsUrl("", "en-US", "US", "US:en"),
    lang: "en",
  },
  {
    id: "google-top-ar",
    name: "Google News AR",
    site: "https://news.google.com",
    kind: "google",
    url: googleNewsUrl("", "ar", "EG", "EG:ar"),
    lang: "ar",
  },
  {
    id: "cairo-desk",
    name: "Cairo Desk",
    site: "https://news.google.com",
    kind: "google",
    url: googleNewsUrl("egypt", "ar", "EG", "EG:ar"),
    lang: "ar",
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "#cdata",
});

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function asText(node: unknown): string {
  if (typeof node === "string") return node;
  if (node && typeof node === "object") {
    const rec = node as Record<string, unknown>;
    if (typeof rec["#cdata"] === "string") return rec["#cdata"];
    if (typeof rec["#text"] === "string") return rec["#text"];
  }
  return "";
}

function decodeGoogleLink(link: string): string | null {
  try {
    if (!link.includes("news.google.com/rss/articles/")) return null;
    const part = link.split("?")[0].split("/").pop() ?? "";
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = Buffer.from(b64, "base64").toString("utf8");
    const urlMatch =
      decoded.match(/news\.url\s*:\s*"([^"]+)"/) ||
      decoded.match(/"news\.url":"([^"]+)"/) ||
      decoded.match(/news\.url.{0,4}(https?:\/\/[^\x00-\x1f"\s]+)/) ||
      decoded.match(/https?:\/\/[^\s"]+/);
    if (urlMatch) return urlMatch[1];
  } catch {
    /* fall through */
  }
  return null;
}

function toWireItem(raw: Record<string, unknown>, src: FeedSource): WireItem | null {
  const title = stripHtml(asText(raw.title)).slice(0, 300);
  if (!title) return null;

  const link = asText(raw.link);
  const sourceNode = raw.source;
  const source =
    typeof sourceNode === "string"
      ? sourceNode
      : sourceNode && typeof sourceNode === "object"
        ? asText((sourceNode as Record<string, unknown>)["#text"]) || src.name
        : src.name;
  const sourceUrl =
    sourceNode && typeof sourceNode === "object"
      ? (sourceNode as Record<string, unknown>)["@_url"]
      : undefined;
  const excerpt = stripHtml(asText(raw.description)).slice(0, 240);
  const pubRaw = asText(raw.pubDate) || asText(raw.published);
  const publishedAt = pubRaw
    ? new Date(pubRaw).toISOString()
    : new Date().toISOString();
  const id = Buffer.from(`${link}|${title}`).toString("base64url").slice(0, 24);

  return {
    id,
    title,
    link: decodeGoogleLink(link) ?? link,
    source: (source || src.name).slice(0, 60),
    sourceUrl: (typeof sourceUrl === "string" ? sourceUrl : src.site).slice(0, 200),
    publishedAt,
    excerpt,
    lang: src.lang,
  };
}

async function fetchFeed(src: FeedSource): Promise<WireItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(src.url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "EGYNEWS/1.0 (news aggregator; +https://egy-news.vercel.app)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 180 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = parser.parse(xml) as {
      rss?: { channel?: { item?: Record<string, unknown>[] } };
    };
    const items = parsed?.rss?.channel?.item ?? [];
    const out: WireItem[] = [];
    for (const it of items) {
      const item = toWireItem(it, src);
      if (item) out.push(item);
    }
    return out;
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function matchesQuery(item: WireItem, q: string): boolean {
  const haystack = `${item.title} ${item.excerpt} ${item.source}`.toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

export async function fetchWireSources(
  opts: { q?: string } = {},
): Promise<WireFeedResponse> {
  const q = opts.q?.trim().toLowerCase() ?? "";
  const settled = await Promise.allSettled(WIRE_SOURCES.map((s) => fetchFeed(s)));
  const seen = new Set<string>();
  const items: WireItem[] = [];

  settled.forEach((result) => {
    if (result.status !== "fulfilled") return;
    for (const item of result.value) {
      const key = item.title.toLowerCase().slice(0, 140);
      if (seen.has(key)) continue;
      seen.add(key);
      if (q && !matchesQuery(item, q)) continue;
      items.push(item);
    }
  });

  items.sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return {
    fetchedAt: new Date().toISOString(),
    items: items.slice(0, 80),
    sources: WIRE_SOURCES.map((s) => ({ id: s.id, name: s.name, lang: s.lang })),
    total: items.length,
  };
}
