import Link from "next/link";
import type { Article } from "@/lib/db";
import { timeAgo } from "@/lib/db";
import type { Locale } from "@/lib/locales";
import { getDict } from "@/lib/i18n";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";

export function NewsCard({
  article,
  lang,
  className = "",
}: {
  article: Article;
  lang: Locale;
  className?: string;
}) {
  const dict = getDict(lang);

  return (
    <TiltCard className={className}>
      <Link
        href={`/${lang}/article/${article.slug}`}
        className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:border-gold/50"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <ArtImage seed={article.imageSeed} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
              {dict.nav[article.category]}
            </span>
            {article.breaking && (
              <span className="live-dot rounded-full bg-alert px-2.5 py-1 font-mono text-[10px] font-black tracking-[0.16em] text-black uppercase">
                {dict.ticker.breaking}
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-ink3">
            <span>{timeAgo(article.publishedAt, lang)}</span>
            <span>·</span>
            <span>
              {article.readTime} {dict.common.readTime}
            </span>
          </div>
          <h3 className="font-display text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-gold">
            {article.title}
          </h3>
          <p className="mt-auto line-clamp-2 text-sm leading-relaxed text-ink2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}
