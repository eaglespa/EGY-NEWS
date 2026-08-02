import type { Metadata } from "next";
import { Suspense } from "react";
import { getDict } from "@/lib/i18n";
import { getLocale, type Locale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { SearchClient } from "@/components/site/SearchClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: dict.nav.search,
    description: dict.meta.description,
    alternates: { canonical: `${SITE.domain}/${lang}/search` },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);
  return (
    <Suspense
      fallback={
        <div className="container-x pt-14">
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">EGY NEWS</p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight text-ink">
            {dict.search.title}
          </h1>
        </div>
      }
    >
      <SearchClient lang={locale} dict={dict} />
    </Suspense>
  );
}
