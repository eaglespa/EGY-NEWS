"use client";

import { useEffect, useRef, useState } from "react";
import type { CommentsDict } from "@/lib/i18n-wire";

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export function Comments({
  lang,
  slug,
  labels,
}: {
  lang: string;
  slug: string;
  labels: CommentsDict;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error("comments failed");
        const data = (await res.json()) as { available: boolean; comments: Comment[] };
        if (ignore) return;
        setAvailable(data.available);
        setComments(data.comments);
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
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || posting) return;
    setPosting(true);
    setPostError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), text: text.trim() }),
      });
      const data = (await res.json()) as { comment?: Comment; error?: string };
      if (!res.ok || !data.comment) {
        setPostError(data.error ?? "error");
        return;
      }
      setComments((prev) => [...prev, data.comment as Comment]);
      setText("");
    } catch {
      setPostError("error");
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-black text-ink">{labels.title}</h2>
        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink3">
          {comments.length}
        </span>
      </div>

      {loading && (
        <p className="text-sm text-ink3">{labels.loading}</p>
      )}

      {!loading && !available && (
        <p className="text-sm text-ink3">{labels.unavailable}</p>
      )}

      {!loading && available && !error && comments.length === 0 && (
        <p className="text-sm text-ink2">{labels.empty}</p>
      )}

      {!loading && error && (
        <p className="text-sm text-ink2">{labels.error}</p>
      )}

      {!loading && available && comments.length > 0 && (
        <ul className="max-h-96 space-y-4 overflow-y-auto">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-xs font-black text-gold uppercase">
                {c.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sm font-bold text-ink">{c.name}</span>
                  <span className="font-mono text-[10px] text-ink3">
                    {timeAgo(c.createdAt, lang)}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-relaxed break-words text-ink2">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {available && !error && (
        <form onSubmit={(e) => void submit(e)} className="mt-6 border-t border-line pt-5">
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            aria-label={labels.namePlaceholder}
            maxLength={60}
            className="mb-3 w-full max-w-xs rounded-full border border-line bg-bg/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink3 focus:border-gold focus:outline-none"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.placeholder}
            rows={3}
            maxLength={2000}
            className="w-full resize-y rounded-2xl border border-line bg-bg/60 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink3 focus:border-gold focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-wider text-ink3 uppercase">
              {text.length}/2000
            </p>
            <button
              type="submit"
              disabled={posting || !name.trim() || !text.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-goldhi disabled:cursor-not-allowed disabled:opacity-40"
            >
              {posting ? "…" : labels.submit}
            </button>
          </div>
          {postError && (
            <p className="mt-3 font-mono text-[11px] text-alert">
              {postError === "rate-limit" ? "…" : labels.error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}

function timeAgo(iso: string, locale: string): string {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (mins < 1) return rtf.format(0, "minute");
    if (mins < 60) return rtf.format(-mins, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(then);
  } catch {
    return new Date(iso).toLocaleDateString();
  }
}
