import { NextRequest } from "next/server";
import { listComments, addComment, commentsAvailable } from "@/lib/comments";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const available = commentsAvailable();
  const comments = available && /^[a-z0-9-]{1,120}$/i.test(slug) ? await listComments(slug) : [];
  return Response.json({ available, comments }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: NextRequest) {
  let body: { slug?: string; name?: string; text?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* invalid json */
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const result = await addComment({
    slug: body.slug ?? "",
    name: body.name ?? "",
    text: body.text ?? "",
    ip,
  });
  if (!result.ok) {
    return Response.json(
      { error: result.error },
      { status: result.error === "rate-limit" ? 429 : 400 },
    );
  }
  return Response.json({ comment: result.comment }, { status: 201 });
}
