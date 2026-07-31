import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getArticle, getRelated, formatDate, timeAgo } from "@/lib/db";
import { getDict } from "@/lib/i18n";
import { LOCALE_CODES, getLocale, type Locale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { ArtImage } from "@/components/ui/ArtImage";
import { NewsCard } from "@/components/site/NewsCard";
import { AdBanner } from "@/components/site/AdBanner";
import { ShareBar } from "@/components/site/ShareBar";
import { Comments } from "@/components/site/Comments";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = (await import("@/data/articles.json")).default.map((a) => a.slug);
  return LOCALE_CODES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${SITE.domain}/${lang}/article/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      siteName: SITE.brand,
      locale: lang,
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: `${SITE.domain}/${lang}/article/${slug}/opengraph-image`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${SITE.domain}/${lang}/article/${slug}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);
  const related = getRelated(article);
  const url = `${SITE.domain}/${lang}/article/${slug}`;
  const shareUrl = `${url}?source=share`;

  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [`${SITE.domain}/${lang}/article/${slug}/opengraph-image`],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: dict.nav[article.category],
    keywords: article.tags.join(", "),
    inLanguage: lang,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${SITE.domain}/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.nav[article.category], item: `${SITE.domain}/${lang}/category/${article.category}` },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <div className="relative">
      <article>
        <header className="container-x pt-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest text-ink3 uppercase">
            <Link href={`/${lang}`} className="transition-colors hover:text-gold">{dict.nav.home}</Link>
            <span>/</span>
            <Link href={`/${lang}/category/${article.category}`} className="transition-colors hover:text-gold">{dict.nav[article.category]}</Link>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                  {dict.nav[article.category]}
                </span>
                {article.breaking && (
                  <span className="live-dot rounded-full bg-alert px-3 py-1 font-mono text-[10px] font-black tracking-[0.2em] text-black uppercase">
                    {dict.ticker.breaking}
                  </span>
                )}
                <span className="font-mono text-[11px] text-ink3">{formatDate(article.publishedAt, lang)} · {timeAgo(article.publishedAt, lang)}</span>
              </div>

              <h1 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.05] font-black tracking-tight text-ink">
                {article.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink2">{article.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink2">
                <span className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-gold/15 font-display font-black text-gold">
                    {article.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    {dict.common.byline} <strong className="font-semibold text-ink">{article.author}</strong>
                  </span>
                </span>
                <span className="font-mono text-[11px] text-ink3">{article.readTime} {dict.common.readTime} · {article.source}</span>
              </div>
            </div>

            <div className="hidden lg:block" aria-hidden>
              <div className="flex h-full items-center justify-center">
                <div className="animate-globe relative grid size-44 place-items-center">
                  <span className="absolute inset-0 rounded-full border border-gold/25 animate-spin-slow" />
                  <span className="absolute inset-6 rounded-full border border-nile/25 animate-spin-slow" style={{ animationDirection: "reverse" }} />
                  <span className="font-display text-2xl font-black gold-text-static">{SITE.brand.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-x mt-10">
          <div className="perspective">
            <div className="tilt-card relative aspect-[16/7] overflow-hidden rounded-3xl border border-line" >
              <ArtImage seed={article.imageSeed} className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">{article.location}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white/90">{article.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="prose-egy space-y-5">
              {article.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-xl leading-relaxed text-ink sm:text-2xl"
                      : "text-[1.05rem] leading-[1.9] text-ink2"
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-[11px] text-ink2">
                  #{t.replace(/\s+/g, "")}
                </span>
              ))}
            </div>

            <ShareBar title={article.title} url={shareUrl} labels={dict.share} />

            <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-[11px] tracking-widest text-ink3 uppercase">
                {dict.footer.follow}
              </p>
              <a
                href="https://wa.me/201107871007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-good/40 bg-good/10 px-4 py-2 text-xs font-bold text-good transition-all hover:bg-good hover:text-black"
              >
                WhatsApp
              </a>
            </div>

            <Comments lang={locale} slug={article.slug} labels={dict.comments} />
          </div>

          <aside className="space-y-8">
            <AdBanner lang={locale} />
            {related.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-xl font-black text-ink">{dict.category.other}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {related.map((a) => (
                    <NewsCard key={a.id} article={a} lang={locale} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>

      <Script id="seo-news" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(newsJsonLd)}
      </Script>
      <Script id="seo-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    </div>
  );
}
