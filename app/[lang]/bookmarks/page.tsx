import type { Metadata } from "next";
import { getLocale, type Locale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { getBookmarks } from "@/lib/i18n-bookmarks";
import { BookmarksClient } from "@/components/site/BookmarksClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const bm = getBookmarks(lang);
  return {
    title: bm.title,
    description: bm.hint,
    alternates: { canonical: `${SITE.domain}/${lang}/bookmarks` },
  };
}

export default async function BookmarksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocale(lang).code as Locale;
  const bm = getBookmarks(lang);

  return (
    <div className="container-x py-12">
      <BookmarksClient lang={locale} dict={bm} />
    </div>
  );
}
