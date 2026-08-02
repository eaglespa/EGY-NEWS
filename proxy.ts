import { NextRequest, NextResponse } from "next/server";

const LOCALE_CODES = [
  "en", "ar", "fr", "de", "es", "pt", "it", "nl", "ru", "tr",
  "fa", "ur", "hi", "bn", "zh", "zh-TW", "ja", "ko", "id", "ms",
  "vi", "th", "sw", "ha", "yo", "ig", "el", "he", "pl", "ro",
];

const DEFAULT_LOCALE = "en";

const LANG_COOKIE = "lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// zh-* region tags that resolve to Traditional Chinese
const ZH_TRADITIONAL = new Set(["tw", "hk", "mo", "hant"]);

function isLocale(code: string): boolean {
  return LOCALE_CODES.includes(code);
}

function normalizeTag(tag: string): string | null {
  const base = tag.split("-")[0].toLowerCase();
  if (base === "zh") {
    const region = tag.toLowerCase();
    for (const r of ZH_TRADITIONAL) {
      if (region.includes(r)) return "zh-TW";
    }
    return "zh";
  }
  const matched = LOCALE_CODES.find(
    (l) => l.toLowerCase() === base || l.toLowerCase() === tag,
  );
  return matched ?? null;
}

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const segments = header
    .split(",")
    .map((part) => {
      const [tag, qRaw] = part.split(";");
      const q = qRaw ? parseFloat(qRaw.split("=")[1]) || 0 : 1;
      return { tag: tag.trim(), q };
    })
    .filter((s) => s.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of segments) {
    const locale = normalizeTag(tag);
    if (locale) return locale;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  url.search = request.nextUrl.search;

  const response = NextResponse.redirect(url, 308);

  // Persist detected locale so later visits skip detection entirely
  if (!request.cookies.get(LANG_COOKIE)) {
    response.cookies.set(LANG_COOKIE, locale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.svg|opengraph-image|manifest.webmanifest).*)"],
};
