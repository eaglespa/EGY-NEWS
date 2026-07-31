import { createClient } from "@vercel/kv";

export interface Comment {
  id: string;
  slug: string;
  name: string;
  text: string;
  createdAt: string;
}

let client: ReturnType<typeof createClient> | null | undefined;

function getClient() {
  if (client === undefined) {
    client =
      process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
        ? createClient({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
          })
        : null;
  }
  return client;
}

export function commentsAvailable(): boolean {
  return getClient() !== null;
}

const keyFor = (slug: string) => `egy:comments:${slug}`;
const rateKeyFor = (ip: string) => `egy:rl:${ip}`;

export async function listComments(slug: string): Promise<Comment[]> {
  const kv = getClient();
  if (!kv) return [];
  try {
    const raw = await kv.get<Comment[]>(keyFor(slug));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export async function addComment(input: {
  slug: string;
  name: string;
  text: string;
  ip?: string;
}): Promise<{ ok: boolean; comment?: Comment; error?: string }> {
  const kv = getClient();
  if (!kv) return { ok: false, error: "unavailable" };

  const slug = input.slug.trim();
  const name = input.name.trim().slice(0, 60);
  const text = input.text.trim().slice(0, 2000);

  if (!/^[a-z0-9-]{1,120}$/i.test(slug)) return { ok: false, error: "bad-slug" };
  if (name.length < 1 || name.length > 60) return { ok: false, error: "bad-name" };
  if (text.length < 2 || text.length > 2000) return { ok: false, error: "bad-text" };

  const ip = input.ip?.slice(0, 64) ?? "unknown";
  try {
    const now = Date.now();
    const last = await kv.get<number>(rateKeyFor(ip));
    if (last && now - last < 20000) return { ok: false, error: "rate-limit" };

    const existing = await listComments(slug);
    const comment: Comment = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      slug,
      name,
      text,
      createdAt: new Date().toISOString(),
    };
    const next = [...existing, comment].slice(-200);
    await kv.set(keyFor(slug), next);
    await kv.set(rateKeyFor(ip), now, { ex: 20 });
    return { ok: true, comment };
  } catch {
    return { ok: false, error: "storage" };
  }
}
