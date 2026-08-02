"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WireDict } from "@/lib/i18n-wire";
import type { WireItem, WireFeedResponse } from "@/lib/wire";

const REFRESH_MS = 10 * 60_000;

const SOURCE_COLORS: Record<string, string> = {
  axios: "#d4a94e",
  reuters: "#ffb35c",
  cnn: "#ff5648",
  aljazeera: "#3ddc97",
  bbc: "#3ab6d9",
  "google-top": "#a8b0bf",
  "google-top-ar": "#a8b0bf",
  "cairo-desk": "#ecc878",
};

const PALETTE = [
  "#d4a94e",
  "#3ab6d9",
  "#3ddc97",
  "#ffb35c",
  "#ff8c42",
  "#c8a2ff",
  "#ecc878",
  "#8ab4ff",
  "#f0c05a",
  "#37b6d9",
  "#7ee8c2",
  "#ff7a59",
];

function sourceColor(name: string): string {
  const key = name.toLowerCase();
  if (SOURCE_COLORS[key]) return SOURCE_COLORS[key];
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

async function requestWire(lang: string): Promise<WireFeedResponse> {
  const res = await fetch(`/api/news?lang=${encodeURIComponent(lang)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("feed failed");
  return (await res.json()) as WireFeedResponse;
}

export function LiveWire({ lang, labels }: { lang: string; labels: WireDict }) {
  const [items, setItems] = useState<WireItem[] | null>(null);
  const [sources, setSources] = useState<WireFeedResponse["sources"]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<number | null>(null);
  const loaded = useRef(false);

  function showToast() {
    setToast(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(false), 2600);
  }

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const data = await requestWire(lang);
        if (ignore) return;
        setItems(data.items);
        setSources(data.sources);
        setUpdatedAt(data.fetchedAt);
        setError(false);
        if (loaded.current) showToast();
        loaded.current = true;
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    void run();
    const timer = setInterval(() => void run(), REFRESH_MS);
    return () => {
      ignore = true;
      clearInterval(timer);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, [lang]);

  async function refresh() {
    setLoading(true);
    setError(false);
    try {
      const data = await requestWire(lang);
      setItems(data.items);
      setSources(data.sources);
      setUpdatedAt(data.fetchedAt);
      showToast();
    } catch {
      setError(true);
      setItems(null);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.title} ${it.excerpt} ${it.source}`.toLowerCase().includes(q),
    );
  }, [items, filter]);

  const sourceCount = useMemo(
    () => new Set((items ?? []).map((i) => i.source)).size,
    [items],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.3em] text-gold uppercase">
            <span className="live-dot inline-block size-2 rounded-full bg-alert" aria-hidden />
            {labels.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            {labels.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {updatedAt && !loading && !error && (
            <span className="hidden font-mono text-[10px] tracking-widest text-ink3 uppercase sm:block">
              {labels.updated} {new Date(updatedAt).toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            type="button"
            onClick={() => refresh()}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink2 transition-all hover:border-gold hover:text-gold disabled:opacity-50"
            disabled={loading}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={loading ? "animate-spin-slow" : ""}>
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
            {labels.refresh}
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="absolute start-3 top-1/2 -translate-y-1/2 text-ink3">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={labels.searchPlaceholder}
            aria-label={labels.searchPlaceholder}
            className="w-full rounded-full border border-line bg-panel py-2.5 pe-4 ps-9 text-sm text-ink placeholder:text-ink3 focus:border-gold focus:outline-none"
          />
        </div>
        {!loading && !error && (
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink3 uppercase">
            {sourceCount} {labels.allSources}
          </p>
        )}
      </div>

      {loading && !items && (
        <div className="space-y-3" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-4">
              <div className="skeleton h-5 w-24 shrink-0 rounded-full" />
              <div className="skeleton h-4 flex-1 rounded" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-alert/30 bg-alert/5 p-8 text-center">
          <p className="text-sm text-ink2">{labels.error}</p>
          <button
            type="button"
            onClick={() => refresh()}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-bold text-gold transition-all hover:bg-gold hover:text-black"
          >
            {labels.retry}
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-2xl border border-line bg-panel p-8 text-center">
          <p className="text-sm text-ink2">{labels.none}</p>
        </div>
      )}

      {!error && filtered.length > 0 && (
        <ul className="grid gap-3" aria-live="polite">
          {filtered.slice(0, 12).map((item) => {
            const color = sourceColor(item.source);
            return (
              <li key={item.id}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-4 transition-colors hover:border-gold/50"
                >
                  <span
                    className="hidden w-28 shrink-0 truncate rounded-full px-2.5 py-1 text-center font-mono text-[9px] font-black tracking-[0.14em] uppercase sm:block"
                    style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                  >
                    {item.source}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors group-hover:text-gold">
                      {item.title}
                    </span>
                    <span className="line-clamp-1 font-mono text-[10px] tracking-wider text-ink3 uppercase">
                      {item.excerpt || "\u00a0"}
                    </span>
                  </span>
                  <span className="shrink-0 text-end font-mono text-[10px] text-ink3" dir="ltr">
                    {timeAgo(item.publishedAt, lang)}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && !error && sources.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.24em] text-ink3 uppercase">
            {labels.source}:
          </span>
          {sources.map((s) => (
            <span
              key={s.id}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-ink2 uppercase"
            >
              {s.name}
            </span>
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="animate-toast-in fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-bg/90 px-5 py-2.5 font-mono text-[11px] tracking-widest text-gold uppercase shadow-xl shadow-black/20 backdrop-blur-xl"
        >
          {labels.updated} ✓
        </div>
      )}
    </div>
  );
}

function timeAgo(iso: string, locale: string): string {
  const then = new Date(iso).getTime();
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
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(then);
  } catch {
    return new Date(iso).toLocaleDateString();
  }
}
