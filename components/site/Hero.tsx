import Link from "next/link";
import { timeAgo, getLatest } from "@/lib/db";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { ArtImage } from "@/components/ui/ArtImage";
import { LiveClock } from "@/components/ui/LiveClock";
import { TiltCard } from "@/components/ui/TiltCard";
import { getHeroCopy } from "@/lib/hero";

export function Hero({ lang, dict }: { lang: Locale; dict: Dict }) {
  const d = dict.hero;
  const hc = getHeroCopy(lang);
  const featured = getLatest(3);

  return (
    <section className="perspective relative overflow-hidden border-b border-line">
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-20">
        <div className="relative z-10 flex flex-col justify-center animate-fade-up">
          <div className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border border-alert/40 bg-alert/10 px-3.5 py-1.5">
            <span className="live-dot size-2 rounded-full bg-alert" aria-hidden />
            <span className="font-mono text-[10px] font-black tracking-[0.24em] text-alert uppercase">
              {d.breakingNow}
            </span>
            <span className="hidden font-mono text-[10px] tracking-widest text-ink3 sm:inline">
              {d.updated} ·
            </span>
            <LiveClock locale={lang} />
          </div>

          <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
            {d.eyebrow}
          </p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-black tracking-tight text-ink">
            {hc.headline[0]}
            <br />
            <span className="gold-text font-italic">{hc.headline[1]}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink2 sm:text-lg">
            {dict.meta.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lang}/search`}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition-all hover:bg-gold-2 hover:shadow-lg hover:shadow-gold/30"
            >
              {dict.actions.viewAll}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href={`/${lang}/advertise`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink2 transition-all hover:border-gold hover:text-gold"
            >
              {dict.nav.advertise}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            {hc.stats.map((s) => (
              <div key={s[1]}>
                <p className="font-display text-3xl font-black gold-text-static">{s[0]}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink3 uppercase">{s[1]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex min-h-[420px] flex-col justify-center gap-4 lg:min-h-[520px] lg:gap-5 lg:ps-10">
          <div aria-hidden className="absolute -top-16 end-0 size-64 rounded-full border border-gold/20 animate-spin-slow" />
          <div aria-hidden className="absolute -top-10 end-10 size-44 rounded-full border border-nile/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "34s" }} />
          <div aria-hidden className="absolute bottom-4 start-4 size-24 rounded-full bg-gold/10 blur-2xl animate-orb" />

          {featured.map((a, i) => (
              <div
                key={a.id}
                className="animate-float-tiny relative z-10"
                style={{ animationDelay: `${-i * 2.8}s` }}
              >
                <TiltCard max={7}>
                  <Link
                    href={`/${lang}/article/${a.slug}`}
                    className="glass group relative flex items-stretch gap-3 overflow-hidden rounded-2xl p-2.5 transition-all duration-300 hover:border-gold/60 hover:shadow-xl hover:shadow-black/30"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 font-display text-[3.4rem] leading-none font-black text-white/[0.045] tabular-nums select-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArtImage seed={a.imageSeed} className="w-28 shrink-0 self-stretch rounded-xl sm:w-32">
                      <span className="absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                    </ArtImage>
                    <div className="relative flex min-w-0 flex-col justify-center gap-2 py-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="size-1 shrink-0 rounded-full bg-gold" aria-hidden />
                        <span className="truncate font-mono text-[10px] font-semibold tracking-[0.22em] text-gold uppercase">
                          {dict.nav[a.category]}
                        </span>
                        {a.breaking && (
                          <span className="rounded-sm bg-alert px-1.5 py-0.5 font-mono text-[8px] font-black tracking-widest text-black uppercase">
                            {dict.ticker.breaking}
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-[15px] leading-snug font-bold text-ink transition-colors group-hover:text-gold">
                        {a.title}
                      </p>
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-ink3">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        <span>{timeAgo(a.publishedAt, lang)}</span>
                        <span className="text-gold/60">·</span>
                        <span>
                          {a.readTime} {dict.common.readTime}
                        </span>
                      </div>
                    </div>
                    <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  </Link>
                </TiltCard>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
