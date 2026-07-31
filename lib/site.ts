export const SITE = {
  brand: "EGY NEWS",
  brandAr: "إيجي نيوز",
  tagline: "The World, Through Cairo",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://egy-news.vercel.app",
  studio: "Romero's Studios",
  copyrightOwner: "EGY NEWS / Romero's Studios",
  whatsapp: ["+201107871007", "+201224278490"],
  whatsappLink: "https://wa.me/201107871007",
  founded: 2026,
} as const;

export const WHATSAPP_NUMBERS = [
  { display: "+20 110 787 1007", raw: "201107871007" },
  { display: "+20 122 427 8490", raw: "201224278490" },
] as const;

export function waLink(number: string, text?: string) {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
