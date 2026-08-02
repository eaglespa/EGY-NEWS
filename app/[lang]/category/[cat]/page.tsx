import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getByCategory, CATEGORIES } from "@/lib/db";
import { getDict } from "@/lib/i18n";
import { LOCALE_CODES, getLocale, type Locale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { NewsCard } from "@/components/site/NewsCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import Link from "next/link";

export async function generateStaticParams() {
  return LOCALE_CODES.flatMap((lang) => CATEGORIES.map((cat) => ({ lang, cat })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; cat: string }>;
}): Promise<Metadata> {
  const { lang, cat } = await params;
  if (!CATEGORIES.includes(cat as never)) return {};
  const dict = getDict(lang);
  const name = dict.nav[cat as keyof typeof dict.nav];
  const title = name;
  const url = `${SITE.domain}/${lang}/category/${cat}`;

  return {
    title,
    description: `${dict.meta.title} · ${name}`,
    alternates: { canonical: url },
    openGraph: { title, description: name, url, siteName: SITE.brand, locale: lang },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; cat: string }>;
}) {
  const { lang, cat } = await params;
  if (!CATEGORIES.includes(cat as never)) notFound();

  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);
  const name = dict.nav[cat as keyof typeof dict.nav];
  const stories = getByCategory(cat as never);
  const siblings = CATEGORIES.filter((c) => c !== cat);

  return (
    <div className="relative">
      <section className="container-x pt-14">
        <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
          {SITE.brand}
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight text-ink">
          {name}
        </h1>
        <p className="mt-3 font-mono text-[11px] tracking-widest text-ink3 uppercase">
          {stories.length} {dict.category.stories}
        </p>
      </section>

      <section className="container-x py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((a, i) => (
            <NewsCard key={a.id} article={a} lang={locale} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""} />
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <SectionHeading eyebrow={SITE.brand} title={dict.footer.sections} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {siblings.map((c) => (
            <Link
              key={c}
              href={`/${lang}/category/${c}`}
              className="group rounded-2xl border border-line bg-panel p-5 text-center transition-all hover:border-gold/50 hover:bg-gold/5"
            >
              <p className="font-display text-base font-bold text-ink transition-colors group-hover:text-gold">
                {dict.nav[c as keyof typeof dict.nav]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
