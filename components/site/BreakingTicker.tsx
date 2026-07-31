import Link from "next/link";
import { getBreaking } from "@/lib/db";
import type { Locale } from "@/lib/locales";
import { getDict } from "@/lib/i18n";

export function BreakingTicker({ lang }: { lang: Locale }) {
  const dict = getDict(lang);
  const items = getBreaking();

  if (!items.length) return null;

  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pe-10" aria-hidden={ariaHidden}>
      {items.map((a) => (
        <Link
          key={a.id + (ariaHidden ? "-b" : "")}
          href={`/${lang}/article/${a.slug}`}
          className="group flex items-center gap-3 whitespace-nowrap"
        >
          <span className="size-1.5 rounded-full bg-alert" />
          <span className="text-sm font-medium text-ink2 transition-colors group-hover:text-gold">
            {a.title}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-bg2/60 backdrop-blur-xl"
      aria-label={dict.ticker.breaking}
    >
      <div className="container-x flex items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 bg-alert px-4 py-2.5 text-black">
          <span className="live-dot size-2 rounded-full bg-black" aria-hidden />
          <span className="font-mono text-xs font-black tracking-[0.2em] uppercase">
            {dict.ticker.breaking}
          </span>
        </div>
        <div className="relative flex min-w-0 flex-1 items-center overflow-hidden py-2.5 edge-fade-l">
          <div className="animate-marquee flex w-max">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
