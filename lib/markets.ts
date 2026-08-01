import { mapLimit } from "./async";

export interface FxRate {
  code: string;
  name: string;
  perUsd: number;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  currency: string;
}

export interface MarketsResponse {
  fetchedAt: string;
  base: string;
  fxUpdatedAt: string;
  fx: FxRate[];
  stocksUpdatedAt: string;
  stocks: StockQuote[];
}

const FX_CURRENCIES: [string, string][] = [
  ["EGP", "Egyptian Pound"],
  ["AED", "UAE Dirham"],
  ["SAR", "Saudi Riyal"],
  ["KWD", "Kuwaiti Dinar"],
  ["EUR", "Euro"],
  ["GBP", "British Pound"],
  ["CHF", "Swiss Franc"],
  ["TRY", "Turkish Lira"],
  ["USD", "US Dollar"],
  ["JPY", "Japanese Yen"],
  ["CNY", "Chinese Yuan"],
  ["INR", "Indian Rupee"],
  ["RUB", "Russian Ruble"],
  ["BRL", "Brazilian Real"],
  ["CAD", "Canadian Dollar"],
  ["AUD", "Australian Dollar"],
  ["MAD", "Moroccan Dirham"],
  ["NGN", "Nigerian Naira"],
  ["KES", "Kenyan Shilling"],
  ["ZAR", "South African Rand"],
];

const STOCK_SYMBOLS = [
  "^GSPC",
  "^IXIC",
  "^DJI",
  "^N225",
  "^GDAXI",
  "^FTSE",
  "^FCHI",
  "^HSI",
  "^BSESN",
  "000001.SS",
  "^EGX30",
  "AAPL",
  "MSFT",
  "NVDA",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "COMI.CA",
  "VOD.L",
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function asNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

async function fetchWithTimeout(url: string, ms: number, headers: Record<string, string>): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, headers });
  } finally {
    clearTimeout(timer);
  }
}

async function loadFx(): Promise<{ rates: FxRate[]; updatedAt: string }> {
  const res = await fetchWithTimeout(
    "https://open.er-api.com/v6/latest/USD",
    8000,
    { "User-Agent": UA, Accept: "application/json" },
  );
  if (!res.ok) throw new Error(`fx ${res.status}`);
  const j = (await res.json()) as {
    result?: string;
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };
  const rates = j.rates ?? {};
  const out: FxRate[] = FX_CURRENCIES.map(([code, name]) => ({
    code,
    name,
    perUsd: asNumber(rates[code]) ?? 0,
  })).filter((r) => r.perUsd > 0);
  return { rates: out, updatedAt: j.time_last_update_utc ?? new Date().toISOString() };
}

interface YahooMeta {
  regularMarketPrice?: unknown;
  chartPreviousClose?: unknown;
  previousClose?: unknown;
  currency?: unknown;
  longName?: unknown;
  shortName?: unknown;
}

async function fetchStock(symbol: string): Promise<StockQuote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
    const res = await fetchWithTimeout(url, 8000, {
      "User-Agent": UA,
      Accept: "application/json",
    });
    if (!res.ok) return null;
    const j = (await res.json()) as {
      chart?: { result?: { meta?: YahooMeta }[]; error?: unknown };
    };
    const meta = j?.chart?.result?.[0]?.meta;
    const price = asNumber(meta?.regularMarketPrice);
    if (!meta || price === null) return null;
    const prev = asNumber(meta?.chartPreviousClose) ?? asNumber(meta?.previousClose) ?? price;
    const changePct = prev > 0 ? ((price - prev) / prev) * 100 : 0;
    return {
      symbol,
      name: typeof meta.longName === "string" ? meta.longName : typeof meta.shortName === "string" ? meta.shortName : symbol,
      price,
      changePct,
      currency: typeof meta.currency === "string" ? meta.currency : "USD",
    };
  } catch {
    return null;
  }
}

async function loadStocks(): Promise<{ stocks: StockQuote[]; updatedAt: string }> {
  const results = await mapLimit(STOCK_SYMBOLS, 8, fetchStock);
  return {
    stocks: results.filter((s): s is StockQuote => s !== null),
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchMarkets(): Promise<MarketsResponse> {
  const [fx, st] = await Promise.all([
    loadFx().catch(() => ({ rates: [] as FxRate[], updatedAt: "" })),
    loadStocks().catch(() => ({ stocks: [] as StockQuote[], updatedAt: "" })),
  ]);
  return {
    fetchedAt: new Date().toISOString(),
    base: "USD",
    fxUpdatedAt: fx.updatedAt,
    fx: fx.rates,
    stocksUpdatedAt: st.updatedAt,
    stocks: st.stocks,
  };
}
