export type HeroCopy = {
  headline: [string, string];
  stats: [string, string][];
};

export const HERO_COPY: Record<string, HeroCopy> = {
  en: { headline: ["The world's story,", "told from Cairo."], stats: [["30", "Languages"], ["24/7", "Coverage"], ["100%", "Independent"]] },
  ar: { headline: ["قصة العالم،", "تُروى من القاهرة."], stats: [["30", "لغة"], ["24/7", "تغطية"], ["100%", "مستقل"]] },
  fr: { headline: ["L'histoire du monde,", "racontée depuis le Caire."], stats: [["30", "Langues"], ["24/7", "Couverture"], ["100%", "Indépendant"]] },
  de: { headline: ["Die Geschichte der Welt,", "erzählt aus Kairo."], stats: [["30", "Sprachen"], ["24/7", "Berichterstattung"], ["100%", "Unabhängig"]] },
  es: { headline: ["La historia del mundo,", "contada desde El Cairo."], stats: [["30", "Idiomas"], ["24/7", "Cobertura"], ["100%", "Independiente"]] },
  pt: { headline: ["A história do mundo,", "contada a partir do Cairo."], stats: [["30", "Idiomas"], ["24/7", "Cobertura"], ["100%", "Independente"]] },
  it: { headline: ["La storia del mondo,", "raccontata dal Cairo."], stats: [["30", "Lingue"], ["24/7", "Copertura"], ["100%", "Indipendente"]] },
  nl: { headline: ["Het verhaal van de wereld,", "verteld vanuit Caïro."], stats: [["30", "Talen"], ["24/7", "Berichtgeving"], ["100%", "Onafhankelijk"]] },
  ru: { headline: ["История мира,", "рассказанная из Каира."], stats: [["30", "языков"], ["24/7", "вещание"], ["100%", "независимость"]] },
  tr: { headline: ["Dünyanın hikâyesi,", "Kahire'den anlatılıyor."], stats: [["30", "Dil"], ["24/7", "Yayın"], ["100%", "Bağımsız"]] },
  fa: { headline: ["داستان جهان،", "روایت از قاهره."], stats: [["۳۰", "زبان"], ["۲۴/۷", "پوشش"], ["۱۰۰٪", "مستقل"]] },
  ur: { headline: ["دنیا کی کہانی،", "قاہرہ سے سنائی گئی۔"], stats: [["30", "زبانیں"], ["24/7", "کوریج"], ["100%", "آزاد"]] },
  hi: { headline: ["दुनिया की कहानी,", "काहिरा से सुनाई गई।"], stats: [["30", "भाषाएँ"], ["24/7", "कवरेज"], ["100%", "स्वतंत्र"]] },
  bn: { headline: ["বিশ্বের গল্প,", "কায়রো থেকে বলা।"], stats: [["30", "ভাষা"], ["24/7", "কভারেজ"], ["100%", "স্বাধীন"]] },
  zh: { headline: ["世界的故事，", "从开罗讲述。"], stats: [["30", "种语言"], ["24/7", "报道"], ["100%", "独立"]] },
  "zh-TW": { headline: ["世界的故事，", "從開羅講述。"], stats: [["30", "種語言"], ["24/7", "報導"], ["100%", "獨立"]] },
  ja: { headline: ["世界の物語を、", "カイロから届けます。"], stats: [["30", "言語"], ["24/7", "取材"], ["100%", "独立"]] },
  ko: { headline: ["세상의 이야기를", "카이로에서 전합니다."], stats: [["30", "개 언어"], ["24/7", "보도"], ["100%", "독립"]] },
  id: { headline: ["Kisah dunia,", "diceritakan dari Kairo."], stats: [["30", "Bahasa"], ["24/7", "Liputan"], ["100%", "Independen"]] },
  ms: { headline: ["Kisah dunia,", "diceritakan dari Kaherah."], stats: [["30", "Bahasa"], ["24/7", "Liputan"], ["100%", "Bebas"]] },
  vi: { headline: ["Câu chuyện thế giới,", "kể từ Cairo."], stats: [["30", "Ngôn ngữ"], ["24/7", "Đưa tin"], ["100%", "Độc lập"]] },
  th: { headline: ["เรื่องราวของโลก", "เล่าจากไคโร"], stats: [["30", "ภาษา"], ["24/7", "รายงาน"], ["100%", "อิสระ"]] },
  sw: { headline: ["Hadithi ya dunia,", "kusimuliwa kutoka Cairo."], stats: [["30", "Lugha"], ["24/7", "Uandishi"], ["100%", "Huru"]] },
  ha: { headline: ["Labarin duniya,", "a ruwa shi daga Alkahira."], stats: [["30", "Harsuna"], ["24/7", "Rahoton"], ["100%", "Mai zaman kansa"]] },
  yo: { headline: ["Ìtàn àgbáyé,", "a rò ó láti Cairo."], stats: [["30", "Èdè"], ["24/7", "Ìròyìn"], ["100%", "Àlàáfíà"]] },
  ig: { headline: ["Akụkọ ụwa,", "a kọrọ ya site na Cairo."], stats: [["30", "Asụsụ"], ["24/7", "Akụkọ"], ["100%", "Nweere onwe"]] },
  el: { headline: ["Η ιστορία του κόσμου,", "αφηγημένη από το Κάιρο."], stats: [["30", "γλώσσες"], ["24/7", "κάλυψη"], ["100%", "ανεξάρτητο"]] },
  he: { headline: ["סיפורו של העולם,", "מסופר מקהיר."], stats: [["30", "שפות"], ["24/7", "סיקור"], ["100%", "עצמאי"]] },
  pl: { headline: ["Historia świata,", "opowiedziana z Kairu."], stats: [["30", "języków"], ["24/7", "relacja"], ["100%", "niezależność"]] },
  ro: { headline: ["Povestea lumii,", "spusă din Cairo."], stats: [["30", "limbi"], ["24/7", "acoperire"], ["100%", "independent"]] },
};

export function getHeroCopy(lang: string): HeroCopy {
  return HERO_COPY[lang] ?? HERO_COPY.en;
}
