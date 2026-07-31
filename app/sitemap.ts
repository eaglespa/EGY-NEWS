import type { MetadataRoute } from "next";
import { ARTICLES, CATEGORIES } from "@/lib/db";
import { LOCALE_CODES } from "@/lib/locales";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const base = SITE.domain;

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALE_CODES) {
    entries.push({
      url: `${base}/${lang}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1,
    });
    entries.push({
      url: `${base}/${lang}/search`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.4,
    });
    entries.push({
      url: `${base}/${lang}/advertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    });
    for (const cat of CATEGORIES) {
      entries.push({
        url: `${base}/${lang}/category/${cat}`,
        lastModified: now,
        changeFrequency: "hourly",
        priority: 0.8,
      });
    }
  }

  for (const article of ARTICLES) {
    for (const lang of LOCALE_CODES) {
      entries.push({
        url: `${base}/${lang}/article/${article.slug}`,
        lastModified: article.publishedAt,
        changeFrequency: "daily",
        priority: 0.9,
      });
    }
  }

  return entries;
}
