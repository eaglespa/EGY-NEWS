import { XMLParser } from "fast-xml-parser";
import { mapLimit } from "./async";

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

const EN_REGION = ["en-US", "US", "US:en"] as const;
const AR_REGION = ["ar", "EG", "EG:ar"] as const;

function googleSite(
  site: string,
  region: readonly [string, string, string] = EN_REGION,
): string {
  return googleNewsUrl(`site:${site}`, region[0], region[1], region[2]);
}

function src(
  id: string,
  name: string,
  site: string,
  kind: "google" | "rss",
  url: string,
  lang: string,
): FeedSource {
  return { id, name, site, kind, url, lang };
}

export const WIRE_SOURCES: FeedSource[] = [
  src("google-top", "Google News", "https://news.google.com", "google", googleNewsUrl("", "en-US", "US", "US:en"), "en"),
  src("google-top-ar", "Google News AR", "https://news.google.com", "google", googleNewsUrl("", "ar", "EG", "EG:ar"), "ar"),
  src("cairo-desk", "Cairo Desk", "https://news.google.com", "google", googleNewsUrl("egypt", "ar", "EG", "EG:ar"), "ar"),
  src("bbc", "BBC", "https://www.bbc.com/news", "rss", "https://feeds.bbci.co.uk/news/world/rss.xml", "en"),

  src("msn", "MSN", "https://www.msn.com", "google", googleSite("msn.com"), "en"),
  src("axios", "Axios", "https://www.axios.com", "google", googleSite("axios.com"), "en"),
  src("reuters", "Reuters", "https://www.reuters.com", "google", googleSite("reuters.com"), "en"),
  src("ap", "Associated Press", "https://apnews.com", "google", googleSite("apnews.com"), "en"),
  src("cnn", "CNN", "https://www.cnn.com", "google", googleSite("cnn.com"), "en"),
  src("aljazeera", "Al Jazeera", "https://www.aljazeera.com", "google", googleSite("aljazeera.com"), "en"),
  src("guardian", "The Guardian", "https://www.theguardian.com", "google", googleSite("theguardian.com"), "en"),
  src("nytimes", "The New York Times", "https://www.nytimes.com", "google", googleSite("nytimes.com"), "en"),
  src("wapo", "The Washington Post", "https://www.washingtonpost.com", "google", googleSite("washingtonpost.com"), "en"),
  src("bloomberg", "Bloomberg", "https://www.bloomberg.com", "google", googleSite("bloomberg.com"), "en"),
  src("cnbc", "CNBC", "https://www.cnbc.com", "google", googleSite("cnbc.com"), "en"),
  src("nbc", "NBC News", "https://www.nbcnews.com", "google", googleSite("nbcnews.com"), "en"),
  src("cbs", "CBS News", "https://www.cbsnews.com", "google", googleSite("cbsnews.com"), "en"),
  src("abc", "ABC News", "https://abcnews.go.com", "google", googleSite("abcnews.go.com"), "en"),
  src("usatoday", "USA Today", "https://www.usatoday.com", "google", googleSite("usatoday.com"), "en"),
  src("forbes", "Forbes", "https://www.forbes.com", "google", googleSite("forbes.com"), "en"),
  src("yahoo", "Yahoo News", "https://news.yahoo.com", "google", googleSite("news.yahoo.com"), "en"),
  src("huffpost", "HuffPost", "https://www.huffpost.com", "google", googleSite("huffpost.com"), "en"),
  src("npr", "NPR", "https://www.npr.org", "google", googleSite("npr.org"), "en"),
  src("politico", "Politico", "https://www.politico.com", "google", googleSite("politico.com"), "en"),
  src("verge", "The Verge", "https://www.theverge.com", "google", googleSite("theverge.com"), "en"),
  src("wired", "WIRED", "https://www.wired.com", "google", googleSite("wired.com"), "en"),
  src("techcrunch", "TechCrunch", "https://techcrunch.com", "google", googleSite("techcrunch.com"), "en"),
  src("insider", "Business Insider", "https://www.businessinsider.com", "google", googleSite("businessinsider.com"), "en"),
  src("sky", "Sky News", "https://news.sky.com", "google", googleSite("news.sky.com"), "en"),
  src("dw", "DW", "https://www.dw.com", "google", googleSite("dw.com"), "en"),
  src("france24", "France 24", "https://www.france24.com", "google", googleSite("france24.com"), "en"),
  src("indiatoday", "India Today", "https://www.indiatoday.in", "google", googleSite("indiatoday.in"), "en"),
  src("toi", "The Times of India", "https://timesofindia.indiatimes.com", "google", googleSite("timesofindia.indiatimes.com"), "en"),
  src("scmp", "South China Morning Post", "https://www.scmp.com", "google", googleSite("scmp.com"), "en"),
  src("japantimes", "The Japan Times", "https://www.japantimes.co.jp", "google", googleSite("japantimes.co.jp"), "en"),
  src("alarabiya", "Al Arabiya", "https://english.alarabiya.net", "google", googleSite("english.alarabiya.net"), "en"),
  src("arabnews", "Arab News", "https://www.arabnews.com", "google", googleSite("arabnews.com"), "en"),
  src("timesofisrael", "The Times of Israel", "https://www.timesofisrael.com", "google", googleSite("timesofisrael.com"), "en"),
  src("thenational", "The National", "https://www.thenationalnews.com", "google", googleSite("thenationalnews.com"), "en"),

  src("aljazeera-ar", "الجزيرة", "https://www.aljazeera.net", "google", googleSite("aljazeera.net", AR_REGION), "ar"),
  src("bbc-ar", "بي بي سي عربي", "https://www.bbc.com/arabic", "google", googleSite("bbc.com/arabic", AR_REGION), "ar"),
  src("alarabiya-ar", "العربية", "https://www.alarabiya.net", "google", googleSite("alarabiya.net", AR_REGION), "ar"),
  src("sky-ar", "سكاي نيوز عربية", "https://www.skynewsarabia.com", "google", googleSite("skynewsarabia.com", AR_REGION), "ar"),
  src("rt-ar", "RT Arabic", "https://arabic.rt.com", "google", googleSite("arabic.rt.com", AR_REGION), "ar"),
  src("france24-ar", "فرانس 24", "https://www.france24.com/ar", "google", googleSite("france24.com/ar", AR_REGION), "ar"),
  src("asharq", "الشرق", "https://asharq.com", "google", googleSite("asharq.com", AR_REGION), "ar"),
  src("aawsat", "الشرق الأوسط", "https://aawsat.com", "google", googleSite("aawsat.com", AR_REGION), "ar"),
  src("youm7", "اليوم السابع", "https://www.youm7.com", "google", googleSite("youm7.com", AR_REGION), "ar"),
  src("ahram", "الأهرام", "https://www.ahram.org.eg", "google", googleSite("ahram.org.eg", AR_REGION), "ar"),
  src("almasryalyoum", "المصري اليوم", "https://www.almasryalyoum.com", "google", googleSite("almasryalyoum.com", AR_REGION), "ar"),
  src("elwatan", "الوطن", "https://www.elwatannews.com", "google", googleSite("elwatannews.com", AR_REGION), "ar"),
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
  const timer = setTimeout(() => controller.abort(), 7000);
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
  const results = await mapLimit(WIRE_SOURCES, 6, (s) => fetchFeed(s));
  const seen = new Set<string>();
  const items: WireItem[] = [];

  for (const feed of results) {
    for (const item of feed) {
      const key = item.title.toLowerCase().slice(0, 140);
      if (seen.has(key)) continue;
      seen.add(key);
      if (q && !matchesQuery(item, q)) continue;
      items.push(item);
    }
  }

  items.sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return {
    fetchedAt: new Date().toISOString(),
    items: items.slice(0, 150),
    sources: WIRE_SOURCES.map((s) => ({ id: s.id, name: s.name, lang: s.lang })),
    total: items.length,
  };
}
