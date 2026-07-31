import { ImageResponse } from "next/og";
import { getArticle, getByCategory } from "@/lib/db";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { toAscii } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EGY NEWS";

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article) return new ImageResponse(<div>EGY NEWS</div>, size);

  const dict = getDict(lang);
  const locale = getLocale(lang);
  const categoryLabel = toAscii(dict.nav[article.category]);
  const related = getByCategory(article.category).length;
  const breakingLabel = toAscii(dict.ticker.breaking);
  const native = toAscii(locale.native);
  const storiesLabel = toAscii(dict.category.stories);
  const title = toAscii(article.title);
  const excerpt = toAscii(article.excerpt);
  const location = toAscii(article.location);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "radial-gradient(900px 500px at 15% -10%, #16243a 0%, rgba(22,36,58,0) 55%), radial-gradient(900px 500px at 110% 110%, #2a2414 0%, rgba(42,36,20,0) 55%), linear-gradient(150deg, #0a0a0f 0%, #101320 60%, #0a0a0f 100%)",
          color: "#f5f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#d4af37", boxShadow: "0 0 20px rgba(212,175,55,0.8)" }} />
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 3, color: "#d4af37" }}>{SITE.brand}</div>
          <div style={{ flex: 1 }} />
          {article.breaking && (
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 3, color: "#000", background: "#ff4d3d", padding: "6px 16px", borderRadius: 999 }}>
              {breakingLabel}
            </div>
          )}
          <div style={{ fontSize: 20, letterSpacing: 2, color: "rgba(245,241,232,0.5)", textTransform: "uppercase" }}>
            {categoryLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1020 }}>
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 24, color: "rgba(245,241,232,0.7)", maxWidth: 900 }}>
            {excerpt}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, #d4af37, rgba(212,175,55,0))" }} />
          <div style={{ display: "flex", fontSize: 20, color: "rgba(245,241,232,0.55)", letterSpacing: 1.5 }}>
            {`${location} . ${native} . ${related} ${storiesLabel}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
