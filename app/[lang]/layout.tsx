import type { Metadata, Viewport } from "next";
import { Fraunces, Cairo, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, getLocale, isLocale, type Locale } from "@/lib/locales";
import { getDict } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ThemeScript } from "@/components/ui/ThemeScript";
import { Hreflang } from "@/components/seo/Hreflang";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["latin", "arabic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);

  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: dict.meta.title,
      template: `%s · ${SITE.brand}`,
    },
    description: dict.meta.description,
    applicationName: SITE.brand,
    authors: [{ name: SITE.studio }],
    creator: SITE.studio,
    publisher: SITE.studio,
    alternates: {
      canonical: `${SITE.domain}/${lang}`,
    },
    openGraph: {
      type: "website",
      siteName: SITE.brand,
      locale: lang,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE.domain}/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon.svg",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = getLocale(lang) as { code: Locale; dir: "ltr" | "rtl" };

  return (
    <html
      lang={lang}
      dir={locale.dir}
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${cairo.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <ThemeScript />
        <Hreflang />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang as Locale} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang as Locale} />
      </body>
    </html>
  );
}
