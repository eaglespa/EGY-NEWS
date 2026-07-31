"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchArticles, type Article } from "@/lib/db";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/i18n";
import { NewsCard } from "@/components/site/NewsCard";
import { ArtImage } from "@/components/ui/ArtImage";

export function SearchClient({ lang, dict }: { lang: Locale; dict: Dict }) {
  const router = useRouter();
  const sp = useSearchParams();
  const initial = sp.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<Article[]>(() => {
    const term = q.trim();
    if (!term) return [];
    return searchArticles(term);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.replace(term ? `/${lang}/search?q=${encodeURIComponent(term)}` : `/${lang}/search`);
  };

  const clear = () => {
    setQ("");
    inputRef.current?.focus();
    router.replace(`/${lang}/search`);
  };

  return (
    <div className="relative">
      <section className="container-x pt-14">
        <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
          EGY NEWS
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight text-ink">
          {dict.search.title}
        </h1>
      </section>

      <section className="container-x py-10">
        <form onSubmit={submit} role="search" className="glass flex items-center gap-3 rounded-2xl p-2">
          <span aria-hidden className="pl-3 text-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.search.placeholder}
            aria-label={dict.search.title}
            className="w-full bg-transparent py-3 text-base text-ink placeholder:text-ink3 focus:outline-none"
          />
          {q && (
            <button type="button" onClick={clear} aria-label="Clear" className="rounded-full px-2 text-ink3 transition-colors hover:text-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <button type="submit" className="rounded-xl bg-gold px-5 py-3 font-mono text-xs font-black tracking-widest text-black uppercase transition-all hover:bg-gold/80">
            {dict.nav.search}
          </button>
        </form>

        {q.trim() && (
          <p className="mt-6 font-mono text-[11px] tracking-widest text-ink3 uppercase">
            {dict.search.resultsFor} <span className="text-gold">“{q.trim()}”</span> — {results.length}
          </p>
        )}

        <div className="mt-8">
          {q.trim() && results.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center">
              <ArtImage seed={`none-${lang}`} className="mx-auto size-40" />
              <h2 className="mt-6 font-display text-2xl font-black text-ink">{dict.search.noResults}</h2>
              <p className="mt-2 text-sm text-ink3">{dict.search.tip}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <NewsCard key={a.id} article={a} lang={lang} />
              ))}
            </div>
          )}

          {!q.trim() && (
            <div className="glass rounded-2xl p-10 text-center">
              <ArtImage seed={`idle-${lang}`} className="mx-auto size-40" />
              <h2 className="mt-6 font-display text-2xl font-black text-ink">{dict.meta.title}</h2>
              <p className="mt-2 text-sm text-ink3">{dict.search.tip}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
