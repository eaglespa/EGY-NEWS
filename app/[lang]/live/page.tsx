import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";
import { getLocale, type Locale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { LiveWire } from "@/components/site/LiveWire";
import { AdBanner } from "@/components/site/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: `${dict.wire.title} — ${SITE.brand}`,
    description: dict.wire.eyebrow,
    alternates: { canonical: `${SITE.domain}/${lang}/live` },
    openGraph: { title: `${dict.wire.title} — ${SITE.brand}`, description: dict.wire.eyebrow, url: `${SITE.domain}/${lang}/live` },
  };
}

export default async function LivePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocale(lang).code as Locale;
  const dict = getDict(lang);

  return (
    <div className="container-x py-12">
      <LiveWire lang={locale} labels={dict.wire} />
      <div className="mt-12">
        <AdBanner lang={locale} />
      </div>
    </div>
  );
}
