import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import { searchNews } from "@/lib/wire";

export const runtime = "nodejs";

const getCachedSearch = unstable_cache(
  async (q: string) => searchNews({ q }),
  ["egy-agent-search"],
  { revalidate: 180 },
);

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return Response.json({ items: [] }, { status: 400 });
  }
  const items = await getCachedSearch(q);
  return Response.json({ items }, {
    headers: {
      "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300",
    },
  });
}
