import type { AgentIndexItem, Category } from "./db";

export interface AgentReply {
  text: string;
  articles: AgentIndexItem[];
  intent: Intent;
}

type Intent =
  | "breaking" | "latest" | "category" | "summary" | "search"
  | "advertise" | "greeting" | "help" | "thanks" | "unknown";

const CAT_KEYWORDS: Record<Category, string[]> = {
  world: ["world", "global", "international", "nile", "عالم", "monde", "mundo"],
  politics: ["politics", "political", "policy", "سياسة", "politics", "politique", "política"],
  economy: ["economy", "economic", "trade", "market", "finance", "gas", "energy", "canal", "investment", "اقتصاد", "بورصة", "economía", "économie"],
  technology: ["technology", "tech", "ai", "digital", "internet", "startup", "app", "تكنولوجيا", "ذكاء", "technologie", "tecnología"],
  sports: ["sports", "football", "basketball", "match", "team", "qualifier", "كرة", "رياضة", "sport", "deportes"],
  health: ["health", "hospital", "disease", "heat", "medical", "صحة", "مستشفى", "santé", "salud"],
  culture: ["culture", "museum", "history", "archaeology", "tourism", "library", "ثقافة", "متحف", "turismo", "culture"],
};

const BREAKING_KEYWORDS = ["breaking", "urgent", "now", "live", "alert", "عاجل", "الآن", "حادث", "urgence", "última"];
const LATEST_KEYWORDS = ["latest", "recent", "new", "newest", "top", "headlines", "أحدث", "جديد", "dernières", "últimas"];
const ADVERTISE_KEYWORDS = ["advertise", "advertising", "sponsor", "promote", "business", "أعلن", "إعلان", "إعلانات", "publicité", "publicidad", "whatsapp"];
const GREETING_KEYWORDS = ["hello", "hi", "hey", "salam", "السلام", "مرحبا", "أهلا", "أهلاً", "bonjour", "hola", "مرحبا"];
const THANKS_KEYWORDS = ["thank", "thanks", "شكرا", "شكرًا", "merci", "gracias"];
const HELP_KEYWORDS = ["help", "assist", "what can you", "how do you", "مساعدة", "ساعد", "aide", "ayuda"];

const CATEGORY_NAMES: Record<Category, { en: string; ar: string }> = {
  world: { en: "World", ar: "العالم" },
  politics: { en: "Politics", ar: "السياسة" },
  economy: { en: "Economy", ar: "الاقتصاد" },
  technology: { en: "Technology", ar: "التكنولوجيا" },
  sports: { en: "Sports", ar: "الرياضة" },
  health: { en: "Health", ar: "الصحة" },
  culture: { en: "Culture", ar: "الثقافة" },
};

function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[؟?.,!;:«»"'()]/g, " ").trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter(Boolean);
}

function scoreMatch(article: AgentIndexItem, terms: string[]): number {
  const hay = `${article.title} ${article.excerpt} ${article.tags.join(" ")} ${article.location}`.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (t.length < 2) continue;
    if (hay.includes(t)) score += 2;
    if (article.title.toLowerCase().includes(t)) score += 3;
    if (article.tags.some((tag) => tag.includes(t))) score += 2;
  }
  return score;
}

function topMatches(items: AgentIndexItem[], terms: string[], limit = 3): AgentIndexItem[] {
  return items
    .map((a) => ({ a, s: scoreMatch(a, terms) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map((x) => x.a);
}

function detectCategory(query: string): Category | null {
  const q = normalize(query);
  for (const [cat, words] of Object.entries(CAT_KEYWORDS) as [Category, string[]][]) {
    if (words.some((w) => q.includes(w))) return cat;
  }
  return null;
}

function listTitles(items: AgentIndexItem[], ar: boolean): string {
  return items.map((a, i) => `${i + 1}. ${a.title}`).join("\n");
}

export function askAgent(rawQuery: string, items: AgentIndexItem[]): AgentReply {
  const q = rawQuery.trim();
  const ar = hasArabic(q);
  const norm = normalize(q);
  const terms = tokenize(q);
  const sorted = [...items].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  if (!q) {
    return { intent: "help", text: ar ? HELP_AR : HELP_EN, articles: [] };
  }

  const breaking = sorted.filter((a) => a.breaking);

  if (BREAKING_KEYWORDS.some((w) => norm.includes(w))) {
    const picked = breaking.length ? breaking : sorted.slice(0, 3);
    if (!breaking.length) {
      return {
        intent: "breaking",
        articles: picked,
        text: ar
          ? "لا توجد أخبار عاجلة في هذه اللحظة. إليك أحدث القصص من غرفة التحرير:\n" + listTitles(picked, true)
          : "Nothing is flagged as breaking this exact moment. Here are the freshest stories from the newsroom:\n" + listTitles(picked, false),
      };
    }
    return {
      intent: "breaking",
      articles: picked,
      text: ar
        ? `هذه الأخبار العاجلة الآن:\n${listTitles(picked, true)}`
        : `These stories are breaking right now:\n${listTitles(picked, false)}`,
    };
  }

  if (LATEST_KEYWORDS.some((w) => norm.includes(w))) {
    const picked = sorted.slice(0, 5);
    return {
      intent: "latest",
      articles: picked,
      text: ar
        ? `أحدث ما في غرفة التحرير:\n${listTitles(picked, true)}`
        : `The latest from the newsroom:\n${listTitles(picked, false)}`,
    };
  }

  if (ADVERTISE_KEYWORDS.some((w) => norm.includes(w))) {
    return {
      intent: "advertise",
      articles: [],
      text: ar
        ? "للإعلان مع إيجي نيوز، تواصل مباشرة عبر واتساب: +20 110 787 1007 أو +20 122 427 8490. فريق المبيعات سيرد عليك سريعًا."
        : "To advertise with EGY NEWS, message us directly on WhatsApp: +20 110 787 1007 or +20 122 427 8490. The sales team replies fast.",
    };
  }

  if (GREETING_KEYWORDS.some((w) => norm.includes(w))) {
    return {
      intent: "greeting",
      articles: sorted.slice(0, 2),
      text: ar
        ? `أهلًا بك! أنا وكيل إيجي نيوز الذكي. اسألني: ما الأخبار العاجلة؟ أو لخّص الاقتصاد. أو اطلب أي موضوع.\n\nفي هذه الأثناء، إليك ما يجري:\n${listTitles(sorted.slice(0, 2), true)}`
        : `Hello! I'm the EGY NEWS agent. Ask me: "What's breaking?", "Summarize the economy", or search any topic.\n\nMeanwhile, here's what's moving:\n${listTitles(sorted.slice(0, 2), false)}`,
    };
  }

  if (THANKS_KEYWORDS.some((w) => norm.includes(w))) {
    return {
      intent: "thanks",
      articles: [],
      text: ar
        ? "على الرحب والسعة! عُد إليّ في أي وقت — أنا هنا للمساعدة في أي خبر."
        : "You're welcome! Come back anytime — I'm here for every story.",
    };
  }

  if (HELP_KEYWORDS.some((w) => norm.includes(w))) {
    return { intent: "help", text: ar ? HELP_AR : HELP_EN, articles: [] };
  }

  const category = detectCategory(q);
  const newsWord = /(news|stories|خبر|أخبار|nouvelles|noticias|nachrichten|haber|खबर|新闻)/i.test(norm);

  if (category && newsWord) {
    const picked = sorted.filter((a) => a.category === category).slice(0, 4);
    if (picked.length) {
      return {
        intent: "category",
        articles: picked,
        text: ar
          ? `أحدث قصص ${CATEGORY_NAMES[category].ar}:\n${listTitles(picked, true)}`
          : `The latest in ${CATEGORY_NAMES[category].en}:\n${listTitles(picked, false)}`,
      };
    }
  }

  if (category) {
    const picked = sorted.filter((a) => a.category === category).slice(0, 4);
    if (picked.length) {
      return {
        intent: "category",
        articles: picked,
        text: ar
          ? `هذه قصص من قسم ${CATEGORY_NAMES[category].ar}:\n${listTitles(picked, true)}`
          : `Here's what's happening in ${CATEGORY_NAMES[category].en}:\n${listTitles(picked, false)}`,
      };
    }
  }

  if (norm.includes("summar") || norm.includes("لخص") || norm.includes("لخّص") || norm.includes("résume") || norm.includes("resume")) {
    const matches = topMatches(sorted, terms, 3);
    if (matches.length) {
      const summary = matches
        .map((m, i) => `${i + 1}. ${m.title} — ${m.excerpt}`)
        .join("\n");
      return {
        intent: "summary",
        articles: matches,
        text: ar
          ? `إليك ملخص سريع:\n${summary}`
          : `Here's a quick summary of what we have:\n${summary}`,
      };
    }
  }

  const matches = topMatches(sorted, terms, 3);
  if (matches.length) {
    const byCategory = category ? ` in ${CATEGORY_NAMES[category][ar ? "ar" : "en"]}` : "";
    return {
      intent: "search",
      articles: matches,
      text: ar
        ? `وجدت هذه القصص${byCategory} عن «${q}»:\n${matches.map((m, i) => `${i + 1}. ${m.title}`).join("\n")}`
        : `Here are the stories${byCategory} I found about "${q}":\n${matches.map((m, i) => `${i + 1}. ${m.title}`).join("\n")}`,
    };
  }

  return {
    intent: "unknown",
    articles: [],
    text: ar
      ? "لم أجد ما يطابق ذلك تمامًا. جرّب: «ما الأخبار العاجلة؟» أو «أخبار الاقتصاد» أو اسم موضوع مثل «متحف» أو «هاتف»."
      : "I couldn't find an exact match. Try: \"What's breaking?\", \"Economy news\", or a specific topic like \"museum\" or \"football\".",
  };
}

const HELP_EN = `I'm the EGY NEWS agent — a live index of everything in the newsroom, on-device and instant.
Try asking:
• "What's breaking right now?"
• "Summarize the economy news"
• "Latest technology stories"
• "Tell me about the museum"
I can also help you advertise: ask about advertising and I'll point you to our WhatsApp sales line.`;
const HELP_AR = `أنا وكيل إيجي نيوز — فهرس حي لكل ما في غرفة التحرير، يعمل على جهازك فورًا.
جرّب أن تسأل:
• «ما الأخبار العاجلة الآن؟»
• «لخّص أخبار الاقتصاد»
• «أحدث قصص التكنولوجيا»
• «حدثني عن المتحف»
كما أستطيع مساعدتك في الإعلان: اسأل عن الإعلانات وسأرشدك إلى خط المبيعات عبر واتساب.`;
