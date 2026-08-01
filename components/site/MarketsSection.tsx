"use client";

import { useEffect, useState } from "react";
import type { MarketsDict } from "@/lib/i18n-wire";
import type { FxRate, MarketsResponse, StockQuote } from "@/lib/markets";

async function requestMarkets(): Promise<MarketsResponse> {
  const res = await fetch("/api/markets", { cache: "no-store" });
  if (!res.ok) throw new Error("markets failed");
  return (await res.json()) as MarketsResponse;
}

function fmtNum(n: number, digits = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: n >= 100 ? 2 : digits,
  });
}

export function MarketsSection({ labels }: { labels: MarketsDict }) {
  const [fx, setFx] = useState<FxRate[] | null>(null);
  const [stocks, setStocks] = useState<StockQuote[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const data = await requestMarkets();
        if (ignore) return;
        setFx(data.fx);
        setStocks(data.stocks);
        setUpdatedAt(data.fetchedAt);
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    void run();
    return () => {
      ignore = true;
    };
  }, []);

  async function refresh() {
    setLoading(true);
    setError(false);
    try {
      const data = await requestMarkets();
      setFx(data.fx);
      setStocks(data.stocks);
      setUpdatedAt(data.fetchedAt);
    } catch {
      setError(true);
      setFx(null);
      setStocks(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 font-mono text-[10px] font-semibold tracking-[0.3em] text-gold uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            {labels.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {updatedAt && !loading && !error && (
            <span className="hidden font-mono text-[10px] tracking-widest text-ink3 uppercase sm:block">
              {labels.updated} {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            type="button"
            onClick={() => refresh()}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink2 transition-all hover:border-gold hover:text-gold disabled:opacity-50"
            disabled={loading}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={loading ? "animate-spin-slow" : ""}>
              <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" />
            </svg>
            {labels.retry}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-alert/30 bg-alert/10 px-4 py-3 text-sm text-ink2">
          {labels.error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
        <div className="glass rounded-2xl p-5">
          <h3 className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            {labels.fxTitle}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(fx ?? Array.from({ length: 12 })).map((f, i) => {
              const isPlaceholder = !fx;
              const rate = isPlaceholder ? null : (f as FxRate);
              return (
                <div
                  key={rate?.code ?? i}
                  className={`rounded-xl border border-line bg-panel p-3 ${isPlaceholder ? "animate-pulse" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-ink3">
                      USD/{rate?.code ?? "…"}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold/70">
                      <path d="M3 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                  <p className="mt-1.5 truncate font-display text-lg font-black tracking-tight text-ink">
                    {rate ? fmtNum(rate.perUsd) : "····"}
                  </p>
                  <p className="truncate font-mono text-[9px] tracking-wider text-ink3 uppercase">
                    {rate?.name ?? ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M15 7h6v6" />
            </svg>
            {labels.stocksTitle}
          </h3>
          <ul className="mt-3 divide-y divide-line/70">
            {(stocks ?? Array.from({ length: 10 })).map((s, i) => {
              const isPlaceholder = !stocks;
              const st = isPlaceholder ? null : (s as StockQuote);
              const up = (st?.changePct ?? 0) >= 0;
              return (
                <li key={st?.symbol ?? i} className={`flex items-center justify-between gap-3 py-3 ${isPlaceholder ? "animate-pulse" : ""}`}>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {st?.name ?? "…"}
                    </p>
                    <p className="font-mono text-[10px] tracking-widest text-ink3 uppercase">
                      {st?.symbol ?? ""}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="font-display text-base font-bold tracking-tight text-ink tabular-nums">
                      {st ? `${st.currency === "USD" ? "$" : ""}${fmtNum(st.price)}` : "····"}
                    </p>
                    <p className={`font-mono text-[11px] font-bold tabular-nums ${up ? "text-good" : "text-alert"}`}>
                      {st ? `${up ? "▲" : "▼"} ${Math.abs(st.changePct).toFixed(2)}%` : ""}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
