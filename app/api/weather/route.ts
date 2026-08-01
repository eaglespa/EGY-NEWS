import { unstable_cache } from "next/cache";
import { fetchWeather } from "@/lib/weather";

export const runtime = "nodejs";

const getCachedWeather = unstable_cache(fetchWeather, ["egy-weather"], {
  revalidate: 600,
});

export async function GET() {
  const data = await getCachedWeather();
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=900",
    },
  });
}
