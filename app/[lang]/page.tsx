import type { Metadata } from "next";
import Script from "next/script";
import { getDict } from "@/lib/i18n";
import { getLocale, type Locale } from "@/lib/locales";
import { getBreaking, getLatest, CATEGORIES } from "@/lib/db";
import { SITE } from "@/lib/site";
import { Orbs } from "@/components/site/Orbs";
import { Hero } from "@/components/site/Hero";
import { BreakingTicker } from "@/components/site/BreakingTicker";
import { NewsCard } from "@/components/site/NewsCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AdBanner } from "@/components/site/AdBanner";
import { AgentChat } from "@/components/site/AgentChat";
import { LiveWire } from "@/components/site/LiveWire";
import { WeatherSection } from "@/components/site/WeatherSection";
import { MarketsSection } from "@/components/site/MarketsSection";
import { getWeather, getMarkets } from "@/lib/i18n-wire";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: `${SITE.domain}/${lang}` },
    openGraph: { title: dict.meta.title, description: dict.meta.description, url: `${SITE.domain}/${lang}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);
  const breaking = getBreaking();
  const latest = getLatest(6);
  const top = getLatest(4);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE.brand,
    url: `${SITE.domain}/${lang}`,
    slogan: dict.meta.title,
    description: dict.meta.description,
    founder: { "@type": "Organization", name: SITE.studio },
    sameAs: [],
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: `${SITE.domain}/${lang}`,
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.domain}/${lang}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.common.topStories,
    itemListElement: latest.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `${SITE.domain}/${lang}/article/${a.slug}`,
    })),
  };

  return (
    <div className="relative">
      <Orbs />
      <div className="relative z-10">
        <Hero lang={locale} dict={dict} />
        {breaking.length > 0 && <BreakingTicker lang={locale} />}

        <section className="container-x py-14">
          <SectionHeading eyebrow={dict.hero.latest} title={dict.common.latest} linkHref={`/${lang}/search`} linkLabel={dict.actions.viewAll} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a, i) => (
              <NewsCard key={a.id} article={a} lang={locale} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""} />
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-bg2/40">
          <div className="container-x py-14">
            <SectionHeading eyebrow={dict.ticker.breaking} title={dict.common.topStories} />
            <div className="grid gap-4 lg:grid-cols-2">
              {top.map((a, i) => (
                <Link
                  key={a.id}
                  href={`/${lang}/article/${a.slug}`}
                  className="group glass flex items-center gap-5 rounded-2xl p-4 transition-colors hover:border-gold/50"
                >
                  <span className="font-display text-4xl font-black gold-text-static">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink3 uppercase">
                      <span className="text-gold">{dict.nav[a.category]}</span>
                      {a.breaking && <span className="text-alert">{dict.ticker.breaking}</span>}
                    </div>
                    <h3 className="line-clamp-2 font-display text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-gold">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container-x py-14">
          <SectionHeading eyebrow={SITE.brand} title={dict.common.categories} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c}
                href={`/${lang}/category/${c}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-5 text-center transition-all hover:border-gold/50 hover:bg-gold/5"
              >
                <span className="font-mono text-[10px] text-ink3">0{i + 1}</span>
                <p className="mt-3 font-display text-base font-bold text-ink transition-colors group-hover:text-gold">
                  {dict.nav[c]}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-x pb-8">
          <AdBanner lang={locale} />
        </section>

        <section className="border-t border-line bg-bg2/40">
          <div className="container-x py-14">
            <LiveWire lang={locale} labels={dict.wire} />
          </div>
        </section>

        <section className="border-t border-line">
          <div className="container-x py-14">
            <WeatherSection labels={getWeather(lang)} />
          </div>
        </section>

        <section className="border-t border-line bg-bg2/40">
          <div className="container-x py-14">
            <MarketsSection labels={getMarkets(lang)} />
          </div>
        </section>

        <AgentChat lang={locale} dict={dict} />

        <Script id="seo-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(orgJsonLd)}
        </Script>
        <Script id="seo-site" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(siteJsonLd)}
        </Script>
        <Script id="seo-list" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(listJsonLd)}
        </Script>
      </div>
    </div>
  );
}
