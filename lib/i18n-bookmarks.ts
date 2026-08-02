import type { Locale } from "./locales";
import { DEFAULT_LOCALE } from "./locales";

export interface BookmarksDict {
  title: string;
  eyebrow: string;
  empty: string;
  hint: string;
  back: string;
  save: string;
}

export const BOOKMARKS: Record<Locale, BookmarksDict> = {
  en: { title: "Saved stories", eyebrow: "Your library", empty: "Nothing saved yet.", hint: "Tap the heart on any story to build your reading list.", back: "Back to the front page", save: "Save story" },
  ar: { title: "القصص المحفوظة", eyebrow: "مكتبتك", empty: "لم تحفظ أي شيء بعد.", hint: "اضغط على القلب في أي قصة لبناء قائمة قراءتك.", back: "العودة إلى الرئيسية", save: "احفظ القصة" },
  fr: { title: "Articles enregistrés", eyebrow: "Votre bibliothèque", empty: "Rien n'est enregistré pour le moment.", hint: "Touchez le cœur sur une histoire pour créer votre liste de lecture.", back: "Retour à l'accueil", save: "Enregistrer l'article" },
  de: { title: "Gespeicherte Artikel", eyebrow: "Deine Bibliothek", empty: "Noch nichts gespeichert.", hint: "Tippe auf das Herz einer Geschichte, um deine Leseliste zu erstellen.", back: "Zurück zur Startseite", save: "Artikel speichern" },
  es: { title: "Noticias guardadas", eyebrow: "Tu biblioteca", empty: "Aún no has guardado nada.", hint: "Toca el corazón de cualquier noticia para crear tu lista de lectura.", back: "Volver al inicio", save: "Guardar noticia" },
  pt: { title: "Notícias salvas", eyebrow: "Sua biblioteca", empty: "Nada salvo ainda.", hint: "Toque no coração de qualquer notícia para montar sua lista de leitura.", back: "Voltar ao início", save: "Salvar notícia" },
  it: { title: "Storie salvate", eyebrow: "La tua libreria", empty: "Ancora nessun salvataggio.", hint: "Tocca il cuore su una storia per creare la tua lista di lettura.", back: "Torna alla home", save: "Salva la storia" },
  nl: { title: "Opgeslagen verhalen", eyebrow: "Jouw bibliotheek", empty: "Nog niets opgeslagen.", hint: "Tik op het hart bij een verhaal om je leeslijst te maken.", back: "Terug naar de homepage", save: "Verhaal opslaan" },
  ru: { title: "Сохранённые статьи", eyebrow: "Ваша библиотека", empty: "Пока ничего не сохранено.", hint: "Нажмите на сердечко у любой статьи, чтобы составить список чтения.", back: "На главную", save: "Сохранить статью" },
  tr: { title: "Kaydedilen haberler", eyebrow: "Kitaplığınız", empty: "Henüz bir şey kaydedilmedi.", hint: "Hikayelerden birindeki kalbe dokunarak okuma listenizi oluşturun.", back: "Ana sayfaya dön", save: "Haberi kaydet" },
  fa: { title: "داستان‌های ذخیره‌شده", eyebrow: "کتابخانه شما", empty: "هنوز چیزی ذخیره نشده است.", hint: "برای ساختن فهرست مطالعه، روی قلب هر داستان بزنید.", back: "بازگشت به خانه", save: "ذخیره داستان" },
  ur: { title: "محفوظ شدہ کہانیاں", eyebrow: "آپ کی لائبریری", empty: "ابھی کچھ محفوظ نہیں ہے۔", hint: "اپنی مطالعے کی فہرست بنانے کے لیے کسی بھی کہانی پر دل پر ٹیپ کریں۔", back: "ہوم پیج پر واپس جائیں", save: "کہانی محفوظ کریں" },
  hi: { title: "सहेजी गई कहानियाँ", eyebrow: "आपकी लाइब्रेरी", empty: "अभी तक कुछ सहेजा नहीं गया है।", hint: "अपनी पठन सूची बनाने के लिए किसी भी कहानी पर दिल पर टैप करें।", back: "होम पेज पर वापस जाएँ", save: "कहानी सहेजें" },
  bn: { title: "সংরক্ষিত সংবাদ", eyebrow: "আপনার সংগ্রহ", empty: "এখনো কিছু সংরক্ষিত হয়নি।", hint: "যেকোনো সংবাদে হৃদয় চিহ্নে ট্যাপ করে আপনার পড়ার তালিকা তৈরি করুন।", back: "হোমপেজে ফিরুন", save: "সংবাদটি সংরক্ষণ করুন" },
  zh: { title: "收藏的报道", eyebrow: "你的收藏", empty: "还没有收藏任何报道。", hint: "点击任何报道上的爱心即可建立你的阅读清单。", back: "返回首页", save: "收藏报道" },
  "zh-TW": { title: "收藏的報導", eyebrow: "你的收藏", empty: "還沒有收藏任何報導。", hint: "點擊任何報導上的愛心即可建立你的閱讀清單。", back: "返回首頁", save: "收藏報導" },
  ja: { title: "保存した記事", eyebrow: "あなたのライブラリ", empty: "まだ保存されていません。", hint: "どの記事のハートをタップして読書リストを作りましょう。", back: "ホームへ戻る", save: "記事を保存" },
  ko: { title: "저장한 기사", eyebrow: "내 라이브러리", empty: "아직 저장된 기사가 없습니다.", hint: "아무 기사나 하트를 눌러 읽기 목록을 만드세요.", back: "홈페이지로 돌아가기", save: "기사 저장" },
  id: { title: "Cerita tersimpan", eyebrow: "Pustaka Anda", empty: "Belum ada cerita yang disimpan.", hint: "Ketuk hati pada cerita mana pun untuk membuat daftar bacaan Anda.", back: "Kembali ke halaman depan", save: "Simpan cerita" },
  ms: { title: "Cerita disimpan", eyebrow: "Pustaka anda", empty: "Tiada cerita disimpan lagi.", hint: "Ketik hati pada mana-mana cerita untuk membuat senarai bacaan anda.", back: "Kembali ke halaman utama", save: "Simpan cerita" },
  vi: { title: "Tin đã lưu", eyebrow: "Thư viện của bạn", empty: "Chưa lưu tin nào.", hint: "Nhấn vào trái tim của bất kỳ tin nào để tạo danh sách đọc của bạn.", back: "Quay lại trang chính", save: "Lưu tin" },
  th: { title: "เรื่องที่บันทึกไว้", eyebrow: "คลังของคุณ", empty: "ยังไม่มีเรื่องที่บันทึกไว้", hint: "แตะหัวใจบนเรื่องใดก็ได้เพื่อสร้างรายการอ่านของคุณ", back: "กลับไปหน้าหลัก", save: "บันทึกเรื่อง" },
  sw: { title: "Hadith zilizohifadhiwa", eyebrow: "Maktaba yako", empty: "Bado hakuna hadithi iliyohifadhiwa.", hint: "Gusa moyo kwenye hadithi yoyote ili kuunda orodha yako ya usomaji.", back: "Rudi kwenye ukurasa wa mbele", save: "Hifadhi hadithi" },
  ha: { title: "Labaran da aka ajiye", eyebrow: "Laburaren ku", empty: "Babu labarin da aka ajiye tukuna.", hint: "Danna zuciya a kan kowane labari don gina jerin karatun ku.", back: "Koma zuwa shafin farko", save: "Ajiye labari" },
  yo: { title: "Àwọn ìtàn tí a fi pamọ́", eyebrow: "Ilé-ìkàwé rẹ", empty: "Kò sí ìtàn tí a fi pamọ́ sibẹ̀síbẹ̀.", hint: "Tẹ àwọn ọkàn lórí ìtàn èyíkéyìí láti ṣe àtòjọ kíka rẹ.", back: "Padà sí ojú-ewé àkọ́kọ́", save: "Fi ìtàn pamọ́" },
  ig: { title: "Akụkọ echekwara", eyebrow: "Ọba akwụkwọ gị", empty: "Enwebeghị akụkọ echekwara.", hint: "Pị obi na akụkọ ọ bụla iji wuo ndepụta ịgụ gị.", back: "Laghachi na ibe mbụ", save: "Chekwa akụkọ" },
  el: { title: "Αποθηκευμένες ιστορίες", eyebrow: "Η βιβλιοθήκη σας", empty: "Δεν έχει αποθηκευτεί τίποτα ακόμα.", hint: "Πατήστε την καρδιά σε μια ιστορία για να φτιάξετε τη λίστα ανάγνωσής σας.", back: "Επιστροφή στην αρχική", save: "Αποθήκευση ιστορίας" },
  he: { title: "סיפורים שמורים", eyebrow: "הספרייה שלכם", empty: "עדיין לא נשמר כלום.", hint: "הקישו על הלב בסיפור כדי לבנות את רשימת הקריאה שלכם.", back: "חזרה לדף הבית", save: "שמור סיפור" },
  pl: { title: "Zapisane artykuły", eyebrow: "Twoja biblioteka", empty: "Nic jeszcze nie zapisano.", hint: "Dotknij serca przy dowolnym artykule, aby stworzyć listę do czytania.", back: "Wróć na stronę główną", save: "Zapisz artykuł" },
  ro: { title: "Articole salvate", eyebrow: "Biblioteca ta", empty: "Nimic salvat încă.", hint: "Atingeți inima de la orice articol pentru a crea lista de lectură.", back: "Înapoi la prima pagină", save: "Salvează articolul" },
};

export function getBookmarks(locale: string): BookmarksDict {
  return BOOKMARKS[locale as Locale] ?? BOOKMARKS[DEFAULT_LOCALE];
}
