import Link from "next/link";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { CATEGORIES } from "@/lib/db";
import { getBookmarks } from "@/lib/i18n-bookmarks";
import { LiveClock } from "@/components/ui/LiveClock";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GlassBar } from "@/components/ui/GlassBar";
import { HeaderSearch } from "@/components/ui/HeaderSearch";
import { MobileNav, type NavItem } from "@/components/ui/MobileNav";

export function Header({ lang }: { lang: Locale }) {
  const dict = getDict(lang);
  const t = dict.nav;
  const bm = getBookmarks(lang);

  const catHrefs: Record<string, string> = {
    world: `/category/world`, politics: `/category/politics`, economy: `/category/economy`,
    technology: `/category/technology`, sports: `/category/sports`, health: `/category/health`,
    culture: `/category/culture`,
  };

  const items: NavItem[] = [
    { href: `/${lang}`, label: t.home },
    ...CATEGORIES.map((c) => ({ href: `/${lang}${catHrefs[c]}`, label: t[c] })),
    { href: `/${lang}/live`, label: dict.wire.liveLabel },
    { href: `/${lang}/bookmarks`, label: bm.title },
    { href: `/${lang}/search`, label: t.search },
    { href: `/${lang}/advertise`, label: t.advertise },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-bg2/70 font-mono text-[10px] tracking-[0.22em] backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4 py-1.5 text-ink3">
          <span className="hidden truncate sm:block">ROMERO&apos;S STUDIOS · {dict.common.topStories}</span>
          <span className="truncate">{dict.meta.title}</span>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <LiveClock locale={lang} />
            <span className="hidden md:inline">· 30 LANGUAGES</span>
          </div>
        </div>
      </div>

      <GlassBar>
        <Link href={`/${lang}`} className="group flex shrink-0 items-center">
          <span className="logo-lockup">
            <span className="relative grid size-10 place-items-center" aria-hidden>
              <span className="animate-globe absolute size-9 rounded-full border border-gold/50" />
              <span className="animate-globe absolute size-9 rounded-full border border-gold/20" style={{ animationDirection: "reverse", animationDuration: "34s" }} />
              <span className="relative text-sm text-gold">●</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl font-black tracking-[0.08em] gold-text">
                EGY <span className="font-italic">NEWS</span>
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.34em] text-ink3">
                {dict.hero.eyebrow}
              </span>
            </span>
          </span>
        </Link>

        <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label={t.menu}>
          <Link
            href={`/${lang}`}
            className="nav-link rounded-full px-3.5 py-2 text-sm font-medium text-ink2 transition-colors hover:text-gold"
          >
            {t.home}
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/${lang}${catHrefs[c]}`}
              className="nav-link rounded-full px-3.5 py-2 text-sm font-medium text-ink2 transition-colors hover:text-gold"
            >
              {t[c]}
            </Link>
          ))}
          <Link
            href={`/${lang}/live`}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-gold transition-colors hover:text-gold-2"
          >
            <span className="live-dot inline-block size-1.5 rounded-full bg-alert" aria-hidden />
            {dict.wire.liveLabel}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link
            href={`/${lang}/bookmarks`}
            aria-label={bm.title}
            className="press hidden size-10 place-items-center rounded-full border border-line bg-panel text-ink2 transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21C12 21 3 15.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z" />
            </svg>
          </Link>
          <HeaderSearch lang={lang} label={t.search} placeholder={dict.search.placeholder} />
          <Link
            href={`/${lang}/advertise`}
            className="press hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-black md:flex"
          >
            {t.advertise}
          </Link>
          <ThemeToggle />
          <LocaleSwitcher current={lang} />
          <MobileNav items={items} menuLabel={t.menu} />
        </div>
      </GlassBar>
    </header>
  );
}
