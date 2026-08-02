import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import Link from "next/link";
import { Orbs } from "@/components/site/Orbs";

export default async function LocaleNotFound() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  const locale = lang && isLocale(lang) ? lang : "en";
  const dict = getDict(locale);
  return (
    <div className="relative">
      <Orbs />
      <section className="relative z-10 container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] font-black leading-none gold-text">404</p>
        <h1 className="mt-6 font-display text-3xl font-black text-ink sm:text-4xl">{dict.notFound.title}</h1>
        <p className="mt-3 max-w-md text-ink2">{dict.notFound.text}</p>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-black text-black transition-all hover:bg-gold/80"
        >
          {dict.notFound.home} →
        </Link>
      </section>
    </div>
  );
}
