import { unstable_cache } from "next/cache";
import { fetchMarkets } from "@/lib/markets";

export const runtime = "nodejs";

const getCachedMarkets = unstable_cache(fetchMarkets, ["egy-markets"], {
  revalidate: 300,
});

export async function GET() {
  const data = await getCachedMarkets();
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
