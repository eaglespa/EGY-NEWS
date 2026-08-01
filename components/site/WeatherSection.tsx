"use client";

import { useEffect, useState } from "react";
import type { WeatherDict } from "@/lib/i18n-wire";
import type { CityWeather, WeatherResponse } from "@/lib/weather";

type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "showers" | "snow" | "thunder";

function kindFromCode(code: number): WeatherKind {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

const KIND_LABEL: Record<WeatherKind, keyof WeatherDict> = {
  clear: "clear",
  partly: "partly",
  cloudy: "cloudy",
  fog: "fog",
  drizzle: "drizzle",
  rain: "rain",
  showers: "showers",
  snow: "snow",
  thunder: "thunder",
};

function WeatherIcon({ kind, className = "" }: { kind: WeatherKind; className?: string }) {
  const cloud = "M7 18.5a4.5 4.5 0 1 1 .6-8.96A5.5 5.5 0 0 1 18 11.5a4 4 0 0 1-1 7H7Z";
  const sun = "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {kind === "clear" && (
        <g>
          <circle cx="12" cy="12" r="4.5" />
          <path d={sun} />
        </g>
      )}
      {kind === "partly" && (
        <g>
          <circle cx="8" cy="7" r="3.5" fill="currentColor" fillOpacity="0.9" />
          <path d="M3 8.5V8M2 4l1 1M5 2h.5M7.5 2h.5" />
          <path d={cloud} />
        </g>
      )}
      {kind === "cloudy" && <path d={cloud} />}
      {kind === "fog" && (
        <g>
          <path d="M5 8h14M4 12h14M5 16h14" strokeWidth="2" opacity="0.7" />
        </g>
      )}
      {kind === "drizzle" && (
        <g>
          <path d={cloud} />
          <path d="M9 17.5 8 20M14 17.5 13 20M11 18.5 10 21" strokeWidth="1.4" />
        </g>
      )}
      {kind === "rain" && (
        <g>
          <path d={cloud} />
          <path d="M8.5 17.5 7.5 20.5M12.5 17.5 11.5 20.5M16 17.5 15 20.5" strokeWidth="1.6" />
        </g>
      )}
      {kind === "showers" && (
        <g>
          <circle cx="8.5" cy="9" r="3" fill="currentColor" fillOpacity="0.9" />
          <path d={cloud} />
          <path d="M9 17.5 8 20M13 17.5 12 20" strokeWidth="1.6" />
        </g>
      )}
      {kind === "snow" && (
        <g>
          <path d={cloud} />
          <path d="M9 17.5h0M13 18h0M17 17h0" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {kind === "thunder" && (
        <g>
          <path d={cloud} />
          <path d="M12 14.5 10 18.5h3l-1.5 4 4-6h-3l1-2.5Z" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  );
}

async function requestWeather(): Promise<WeatherResponse> {
  const res = await fetch("/api/weather", { cache: "no-store" });
  if (!res.ok) throw new Error("weather failed");
  return (await res.json()) as WeatherResponse;
}

function round(n: number): string {
  return `${Math.round(n)}°`;
}

function localTime(c: CityWeather): string {
  return c.localTime.split("T")[1]?.slice(0, 5) ?? "";
}

export function WeatherSection({ labels }: { labels: WeatherDict }) {
  const [cities, setCities] = useState<CityWeather[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const data = await requestWeather();
        if (ignore) return;
        setCities(data.cities);
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
      const data = await requestWeather();
      setCities(data.cities);
      setUpdatedAt(data.fetchedAt);
    } catch {
      setError(true);
      setCities(null);
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {(cities ?? Array.from({ length: 10 })).map((c, i) => {
          const isPlaceholder = !cities;
          const city = isPlaceholder ? null : (c as CityWeather);
          const kind = city ? kindFromCode(city.code) : "cloudy";
          return (
            <article
              key={city?.id ?? i}
              className={`glass rounded-2xl p-4 transition-colors hover:border-gold/40 ${isPlaceholder ? "animate-pulse" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-bold text-ink">
                    {city?.name ?? "…"}
                  </h3>
                  <p className="truncate font-mono text-[9px] tracking-[0.18em] text-ink3 uppercase">
                    {city?.country ?? ""}
                  </p>
                </div>
                <WeatherIcon kind={kind} className="size-8 shrink-0 text-gold" />
              </div>
              <p className="mt-3 font-display text-4xl font-black tracking-tight text-ink">
                {city ? round(city.temp) : "··"}
              </p>
              <p className="mt-0.5 text-xs leading-tight text-ink2">
                {city ? labels[KIND_LABEL[kind]] : ""}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-line/70 pt-2.5 font-mono text-[10px] text-ink3">
                <span>
                  {labels.hi} {city ? round(city.high) : "··"}
                </span>
                <span>
                  {labels.lo} {city ? round(city.low) : "··"}
                </span>
              </div>
              {city && (
                <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-ink3">
                  <span className="inline-flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8h18M6 12h12M9 16h6" />
                    </svg>
                    {Math.round(city.wind)} km/h
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z" />
                    </svg>
                    {Math.round(city.humidity)}%
                  </span>
                </div>
              )}
              {city?.localTime && (
                <p className="mt-1.5 font-mono text-[10px] tracking-widest text-gold/70 uppercase">
                  {localTime(city)}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
