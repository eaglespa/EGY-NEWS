export type Locale =
  | "en" | "ar" | "fr" | "de" | "es" | "pt" | "it" | "nl" | "ru" | "tr"
  | "fa" | "ur" | "hi" | "bn" | "zh" | "zh-TW" | "ja" | "ko" | "id" | "ms"
  | "vi" | "th" | "sw" | "ha" | "yo" | "ig" | "el" | "he" | "pl" | "ro";

export interface LocaleInfo {
  code: Locale;
  name: string;
  native: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const LOCALES: LocaleInfo[] = [
  { code: "en", name: "English", native: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", dir: "rtl", flag: "🇪🇬" },
  { code: "fr", name: "French", native: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", dir: "ltr", flag: "🇩🇪" },
  { code: "es", name: "Spanish", native: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", native: "Português", dir: "ltr", flag: "🇵🇹" },
  { code: "it", name: "Italian", native: "Italiano", dir: "ltr", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", native: "Nederlands", dir: "ltr", flag: "🇳🇱" },
  { code: "ru", name: "Russian", native: "Русский", dir: "ltr", flag: "🇷🇺" },
  { code: "tr", name: "Turkish", native: "Türkçe", dir: "ltr", flag: "🇹🇷" },
  { code: "fa", name: "Persian", native: "فارسی", dir: "rtl", flag: "🇮🇷" },
  { code: "ur", name: "Urdu", native: "اردو", dir: "rtl", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", native: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", dir: "ltr", flag: "🇧🇩" },
  { code: "zh", name: "Chinese (Simplified)", native: "简体中文", dir: "ltr", flag: "🇨🇳" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文", dir: "ltr", flag: "🇹🇼" },
  { code: "ja", name: "Japanese", native: "日本語", dir: "ltr", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", dir: "ltr", flag: "🇰🇷" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", dir: "ltr", flag: "🇮🇩" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", dir: "ltr", flag: "🇲🇾" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", dir: "ltr", flag: "🇻🇳" },
  { code: "th", name: "Thai", native: "ไทย", dir: "ltr", flag: "🇹🇭" },
  { code: "sw", name: "Swahili", native: "Kiswahili", dir: "ltr", flag: "🇰🇪" },
  { code: "ha", name: "Hausa", native: "Hausa", dir: "ltr", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", native: "Yorùbá", dir: "ltr", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", native: "Igbo", dir: "ltr", flag: "🇳🇬" },
  { code: "el", name: "Greek", native: "Ελληνικά", dir: "ltr", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", native: "עברית", dir: "rtl", flag: "🇮🇱" },
  { code: "pl", name: "Polish", native: "Polski", dir: "ltr", flag: "🇵🇱" },
  { code: "ro", name: "Romanian", native: "Română", dir: "ltr", flag: "🇷🇴" },
];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function getLocale(code: string): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isLocale(code: string): code is Locale {
  return LOCALES.some((l) => l.code === code);
}

export function isRtl(code: string): boolean {
  return getLocale(code).dir === "rtl";
}
