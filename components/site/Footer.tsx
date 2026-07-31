import { SITE, WHATSAPP_NUMBERS } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { CATEGORIES } from "@/lib/db";

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDict(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative mt-20 border-t border-line bg-bg2/60">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <span className="relative grid size-10 place-items-center" aria-hidden>
              <span className="animate-globe absolute size-9 rounded-full border border-gold/50" />
              <span className="relative text-sm text-gold">●</span>
            </span>
            <span className="font-display text-2xl font-black tracking-[0.08em] gold-text-static">
              EGY NEWS
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink2">{dict.footer.about}</p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-ink3">
            {dict.meta.title}
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold tracking-[0.28em] text-gold uppercase">
            {dict.footer.sections}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <a
                  href={`/${lang}/category/${c}`}
                  className="text-sm text-ink2 transition-colors hover:text-gold"
                >
                  {dict.nav[c]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold tracking-[0.28em] text-gold uppercase">
            {dict.footer.follow}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {WHATSAPP_NUMBERS.map((n) => (
              <li key={n.raw}>
                <a
                  href={`https://wa.me/${n.raw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-ink2 transition-colors hover:text-gold"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-good/70 group-hover:text-good">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-1.5-.6c-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4-.1.6.4l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.2.2-.4.4-.2.7.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.3.2.6.1.8-.1l.6-.8c.2-.3.5-.3.7-.2l2 .9c.3.1.5.2.5.3 0 .2 0 .7-.1 1.1Z" />
                  </svg>
                  {n.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              href={`/${lang}/advertise`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-bold text-gold transition-all hover:bg-gold hover:text-black"
            >
              {dict.nav.advertise}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-start">
          <p className="font-mono text-[11px] tracking-wider text-ink3">
            © {year} {SITE.brand}. {dict.footer.rights}
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-ink2">
            {dict.footer.madeBy} <span className="text-gold">◆</span> {SITE.studio}
          </p>
        </div>
      </div>
    </footer>
  );
}
