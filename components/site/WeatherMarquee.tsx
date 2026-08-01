import type { WeatherDict } from "@/lib/i18n-wire";
import type { CityWeather } from "@/lib/weather";

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

function round(n: number): string {
  return `${Math.round(n)}°`;
}

export function WeatherMarquee({
  cities,
  labels,
}: {
  cities: CityWeather[] | null;
  labels: WeatherDict;
}) {
  const list = cities ?? Array.from({ length: 10 });

  const cityChip = (c: CityWeather | undefined, i: number, suffix: string) => {
    const kind = c ? kindFromCode(c.code) : "cloudy";
    return (
      <span
        key={(c?.id ?? "ph" + i) + suffix}
        className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap ${c ? "" : "animate-pulse"}`}
      >
        <span className="size-1 rounded-full bg-gold/60" aria-hidden />
        <WeatherIcon kind={kind} className="size-5 shrink-0 text-gold" />
        <span className="max-w-[12rem] truncate font-display text-lg font-bold text-ink">
          {c?.name ?? "…"}
        </span>
        <span className="font-display text-lg font-black text-ink2">
          {c ? round(c.temp) : "··"}
        </span>
        {c && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-ink3 uppercase">
            {labels[KIND_LABEL[kind]]}
          </span>
        )}
      </span>
    );
  };

  const marqueeRow = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center gap-8 pe-8" aria-hidden={ariaHidden}>
      {list.map((c, i) => cityChip(c as CityWeather | undefined, i, ariaHidden ? "-b" : ""))}
    </div>
  );

  return (
    <div className="relative overflow-hidden edge-fade-l py-1">
      <div className="animate-marquee flex w-max items-center">
        {marqueeRow(false)}
        {marqueeRow(true)}
      </div>
    </div>
  );
}
