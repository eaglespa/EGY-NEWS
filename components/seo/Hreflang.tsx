"use client";

import { usePathname } from "next/navigation";
import { LOCALE_CODES } from "@/lib/locales";
import { SITE } from "@/lib/site";

export function Hreflang() {
  const pathname = usePathname();

  const rest = pathname.replace(/^\/[a-z]{2}(-[A-Za-z]{2})?/, "");

  return (
    <>
      {LOCALE_CODES.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={code}
          href={`${SITE.domain}/${code}${rest}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE.domain}/en${rest}`} />
    </>
  );
}
