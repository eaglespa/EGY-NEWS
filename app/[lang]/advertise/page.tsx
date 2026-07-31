import type { Metadata } from "next";
import Script from "next/script";
import { getDict } from "@/lib/i18n";
import { getLocale, type Locale } from "@/lib/locales";
import { SITE, WHATSAPP_NUMBERS, waLink } from "@/lib/site";
import { AdBanner } from "@/components/site/AdBanner";
import { ArtImage } from "@/components/ui/ArtImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: `${dict.nav.advertise} — ${SITE.brand}`,
    description: dict.advertise.subtitle,
    alternates: { canonical: `${SITE.domain}/${lang}/advertise` },
  };
}

export default async function AdvertisePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);
  const a = dict.advertise;
  const plans = [a.plan1, a.plan2, a.plan3];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: `${SITE.domain}/${lang}`,
    description: a.subtitle,
    contactPoint: WHATSAPP_NUMBERS.map((n, i) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${n.raw}`,
      availableLanguage: LOCALE_NAMES,
    })),
  };

  return (
    <div className="relative">
      <section className="container-x pt-14">
        <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">{SITE.brand}</p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight text-ink">{a.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink2">{a.subtitle}</p>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p}
              className={`glass group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                i === 1 ? "border-gold/60 bg-gold/5" : "border-line"
              }`}
            >
              <span className="font-display text-5xl font-black gold-text-static">0{i + 1}</span>
              <div className="mt-6 h-1 w-10 rounded-full bg-gold" />
              <h2 className="mt-6 font-display text-xl font-black text-ink">{p}</h2>
              <div className="mt-8">
                <a
                  href={waLink(WHATSAPP_NUMBERS[0].raw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-black text-black transition-all hover:bg-gold/80"
                >
                  {a.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-2xl font-black text-ink">{a.contact}</h2>
              <div className="mt-6 flex flex-col gap-3">
                {WHATSAPP_NUMBERS.map((n) => (
                  <a
                    key={n.raw}
                    href={waLink(n.raw)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-3 rounded-full border border-good/40 bg-good/10 px-5 py-2.5 text-sm font-bold text-good transition-all hover:bg-good hover:text-black"
                  >
                    <span aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a16 16 0 0 1-1.6-.6c-2.8-1.2-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.1.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2.1 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4Z"/></svg>
                    </span>
                    +{n.raw}
                  </a>
                ))}
              </div>
            </div>
            <ArtImage seed={`ad-${locale}`} className="w-40 lg:w-52" />
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <AdBanner lang={locale} />
      </section>

      <Script id="seo-advertise-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgJsonLd)}
      </Script>
    </div>
  );
}

const LOCALE_NAMES = ["ar", "en", "fr", "de", "es", "pt", "it", "nl", "tr", "ru", "zh", "hi", "ja", "ko", "id", "ur", "sw", "vi", "pl", "ro", "bn", "th", "he", "uk", "fa", "ms", "ha", "yo", "ig", "am"];
