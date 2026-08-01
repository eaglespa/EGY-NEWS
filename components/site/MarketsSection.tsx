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

  const fxList = fx ?? Array.from({ length: 12 });
  const stockList = stocks ?? Array.from({ length: 10 });

  const labelChip = (text: string, suffix: string) => (
    <span key={"lbl" + suffix} className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] font-black tracking-[0.25em] text-gold uppercase">
      {text}
    </span>
  );

  const fxChip = (f: FxRate | undefined, i: number, suffix: string) => (
    <span key={(f?.code ?? "fx" + i) + suffix} className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap ${f ? "" : "animate-pulse"}`}>
      <span className="size-1 rounded-full bg-gold/60" aria-hidden />
      <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-ink3 uppercase">
        USD/{f?.code ?? "…"}
      </span>
      <span className="font-display text-lg font-black tracking-tight text-ink tabular-nums">
        {f ? fmtNum(f.perUsd) : "····"}
      </span>
    </span>
  );

  const stockChip = (s: StockQuote | undefined, i: number, suffix: string) => {
    const up = (s?.changePct ?? 0) >= 0;
    return (
      <span key={(s?.symbol ?? "stk" + i) + suffix} className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap ${s ? "" : "animate-pulse"}`}>
        <span className="size-1 rounded-full bg-gold/60" aria-hidden />
        <span className="text-sm font-semibold text-ink">{s?.symbol ?? "…"}</span>
        <span className="font-display text-base font-bold tracking-tight text-ink tabular-nums">
          {s ? (s.currency === "USD" ? "$" : "") + fmtNum(s.price) : "····"}
        </span>
        {s && (
          <span className={`font-mono text-[11px] font-bold tabular-nums ${up ? "text-good" : "text-alert"}`}>
            {up ? "▲" : "▼"} {Math.abs(s.changePct).toFixed(2)}%
          </span>
        )}
      </span>
    );
  };

  const marqueeRow = (ariaHidden: boolean) => {
    const suffix = ariaHidden ? "-b" : "";
    return (
      <div className="flex shrink-0 items-center gap-8 pe-8" aria-hidden={ariaHidden}>
        {labelChip(labels.fxTitle, suffix + "fx")}
        {fxList.map((f, i) => fxChip(f as FxRate | undefined, i, suffix))}
        {labelChip(labels.stocksTitle, suffix + "stk")}
        {stockList.map((s, i) => stockChip(s as StockQuote | undefined, i, suffix))}
      </div>
    );
  };

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

      <div className="relative overflow-hidden edge-fade-l py-1">
        <div className="animate-marquee flex w-max items-center">
          {marqueeRow(false)}
          {marqueeRow(true)}
        </div>
      </div>
    </div>
  );
}
