import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import { fetchWireSources } from "@/lib/wire";

export const runtime = "nodejs";

const getCachedWire = unstable_cache(
  async (q: string) => fetchWireSources({ q }),
  ["egy-wire"],
  { revalidate: 180 },
);

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const data = await getCachedWire(q);
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300",
    },
  });
}
