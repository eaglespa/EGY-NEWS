export interface WeatherCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CityWeather extends WeatherCity {
  temp: number;
  feels: number;
  humidity: number;
  wind: number;
  code: number;
  high: number;
  low: number;
  localTime: string;
  timezone: string;
}

export interface WeatherResponse {
  fetchedAt: string;
  cities: CityWeather[];
}

export const WEATHER_CITIES: WeatherCity[] = [
  { id: "cairo", name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
  { id: "london", name: "London", country: "United Kingdom", lat: 51.5072, lon: -0.1276 },
  { id: "new-york", name: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
  { id: "moscow", name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
  { id: "beijing", name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
  { id: "los-angeles", name: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437 },
  { id: "istanbul", name: "Istanbul", country: "Türkiye", lat: 41.0082, lon: 28.9784 },
  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729 },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
  { id: "madrid", name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
  { id: "mumbai", name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  { id: "singapore", name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
  { id: "toronto", name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332 },
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
  { id: "johannesburg", name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
];

const UA =
  "EGYNEWS/1.0 (news aggregator; +https://egy-news.vercel.app)";

function asNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export async function fetchWeather(): Promise<WeatherResponse> {
  const lat = WEATHER_CITIES.map((c) => c.lat).join(",");
  const lon = WEATHER_CITIES.map((c) => c.lon).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(`weather ${res.status}`);
    const raw = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error(`weather: invalid json ${raw.slice(0, 120)}`);
    }

    const cities: CityWeather[] = WEATHER_CITIES.map((c, i) => {
      if (Array.isArray(parsed)) {
        const entry = (parsed[i] ?? {}) as {
          timezone?: unknown;
          current?: {
            time?: unknown;
            temperature_2m?: unknown;
            apparent_temperature?: unknown;
            relative_humidity_2m?: unknown;
            weather_code?: unknown;
            wind_speed_10m?: unknown;
          };
          daily?: {
            temperature_2m_max?: unknown;
            temperature_2m_min?: unknown;
          };
        };
        const cur = entry.current ?? {};
        const daily = entry.daily ?? {};
        return {
          ...c,
          temp: asNumber(cur.temperature_2m) ?? 0,
          feels: asNumber(cur.apparent_temperature) ?? 0,
          humidity: asNumber(cur.relative_humidity_2m) ?? 0,
          wind: asNumber(cur.wind_speed_10m) ?? 0,
          code: asNumber(cur.weather_code) ?? 0,
          high: asNumber(Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max[0] : undefined) ?? 0,
          low: asNumber(Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min[0] : undefined) ?? 0,
          localTime: typeof cur.time === "string" ? cur.time : "",
          timezone: typeof entry.timezone === "string" ? entry.timezone : "",
        };
      }

      const obj = parsed as {
        current?: {
          time?: unknown;
          temperature_2m?: unknown;
          apparent_temperature?: unknown;
          relative_humidity_2m?: unknown;
          weather_code?: unknown;
          wind_speed_10m?: unknown;
        };
        daily?: {
          temperature_2m_max?: unknown;
          temperature_2m_min?: unknown;
        };
        timezone?: unknown;
      };
      if (!obj.current || !Array.isArray(obj.current.temperature_2m)) {
        throw new Error(`weather: unexpected payload ${raw.slice(0, 160)}`);
      }
      const cur = obj.current;
      const daily = obj.daily ?? {};
      const maxArr = Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max : [];
      const minArr = Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min : [];
      const temps = Array.isArray(cur.temperature_2m) ? cur.temperature_2m : [];
      const feelsArr = Array.isArray(cur.apparent_temperature) ? cur.apparent_temperature : [];
      const humArr = Array.isArray(cur.relative_humidity_2m) ? cur.relative_humidity_2m : [];
      const windArr = Array.isArray(cur.wind_speed_10m) ? cur.wind_speed_10m : [];
      const codeArr = Array.isArray(cur.weather_code) ? cur.weather_code : [];
      const timeArr = Array.isArray(cur.time) ? cur.time : [];
      const tzArr = Array.isArray(obj.timezone) ? obj.timezone : [];

      return {
        ...c,
        temp: asNumber(temps[i]) ?? 0,
        feels: asNumber(feelsArr[i]) ?? 0,
        humidity: asNumber(humArr[i]) ?? 0,
        wind: asNumber(windArr[i]) ?? 0,
        code: asNumber(codeArr[i]) ?? 0,
        high: asNumber(maxArr[i]) ?? 0,
        low: asNumber(minArr[i]) ?? 0,
        localTime: typeof timeArr[i] === "string" ? (timeArr[i] as string) : "",
        timezone: typeof tzArr[i] === "string" ? (tzArr[i] as string) : "",
      };
    });

    return { fetchedAt: new Date().toISOString(), cities };
  } finally {
    clearTimeout(timer);
  }
}
