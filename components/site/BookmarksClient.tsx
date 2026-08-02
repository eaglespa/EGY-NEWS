"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import type { BookmarksDict } from "@/lib/i18n-bookmarks";
import type { Locale } from "@/lib/locales";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from "@/lib/bookmarks";
import { ARTICLES } from "@/lib/db";
import { NewsCard } from "@/components/site/NewsCard";
import { ArtImage } from "@/components/ui/ArtImage";

export function BookmarksClient({ lang, dict }: { lang: Locale; dict: BookmarksDict }) {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const articles = useMemo(
    () =>
      slugs
        .map((s) => ARTICLES.find((a) => a.slug === s))
        .filter((a): a is (typeof ARTICLES)[number] => Boolean(a)),
    [slugs],
  );

  return (
    <div>
      <header className="mb-10">
        <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
          {dict.eyebrow}
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black tracking-tight text-ink">
          {dict.title}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-ink3">{dict.hint}</p>
      </header>

      {articles.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <ArtImage seed={`bookmarks-${lang}`} className="mx-auto size-40" />
          <h2 className="mt-6 font-display text-2xl font-black text-ink">{dict.empty}</h2>
          <Link
            href={`/${lang}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition-all hover:bg-gold-2 hover:shadow-lg hover:shadow-gold/30"
          >
            {dict.back}
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <NewsCard key={a.id} article={a} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
