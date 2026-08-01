"use client";

import { useEffect, useState } from "react";
import type { WeatherDict } from "@/lib/i18n-wire";
import type { CityWeather, WeatherResponse } from "@/lib/weather";
import { WeatherMarquee } from "./WeatherMarquee";

async function requestWeather(): Promise<WeatherResponse> {
  const res = await fetch("/api/weather", { cache: "no-store" });
  if (!res.ok) throw new Error("weather failed");
  return (await res.json()) as WeatherResponse;
}

export function WeatherStrip({ labels }: { labels: WeatherDict }) {
  const [cities, setCities] = useState<CityWeather[] | null>(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const data = await requestWeather();
        if (ignore) return;
        setCities(data.cities);
      } catch {
        if (!ignore) setCities(null);
      }
    }
    void run();
    return () => {
      ignore = true;
    };
  }, []);

  return <WeatherMarquee cities={cities} labels={labels} />;
}
