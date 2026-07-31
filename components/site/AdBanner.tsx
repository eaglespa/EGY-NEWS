import { SITE, WHATSAPP_NUMBERS } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

export function AdBanner({ lang }: { lang: Locale }) {
  const dict = getDict(lang);
  const d = dict.advertise;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/10 via-transparent to-nile/10 p-1">
      <div className="relative flex flex-col items-center gap-4 rounded-[1.3rem] bg-bg2/60 px-6 py-10 text-center backdrop-blur-xl sm:px-10">
        <p className="font-mono text-[10px] font-semibold tracking-[0.3em] text-gold uppercase">
          {dict.nav.advertise} · {SITE.brand}
        </p>
        <h3 className="max-w-xl font-display text-2xl font-black tracking-tight text-ink sm:text-4xl">
          {d.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ink2 sm:text-base">{d.subtitle}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBERS[0].raw}?text=${encodeURIComponent(`Hello EGY NEWS — I'd like to advertise.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition-all hover:bg-gold-2 hover:shadow-lg hover:shadow-gold/30"
          >
            {d.cta}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <span className="font-mono text-xs tracking-wider text-ink3">
            {d.contact}: {WHATSAPP_NUMBERS.map((n) => n.display).join(" · ")}
          </span>
        </div>
      </div>
    </section>
  );
}
