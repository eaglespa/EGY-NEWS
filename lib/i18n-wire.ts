import type { Locale } from "./locales";
import { DEFAULT_LOCALE } from "./locales";

export interface WireDict {
  liveLabel: string;
  title: string;
  eyebrow: string;
  loading: string;
  refresh: string;
  updated: string;
  allSources: string;
  source: string;
  error: string;
  retry: string;
  none: string;
  searchPlaceholder: string;
}

export interface CommentsDict {
  title: string;
  placeholder: string;
  namePlaceholder: string;
  submit: string;
  empty: string;
  loading: string;
  unavailable: string;
  error: string;
}

export interface ShareDict {
  title: string;
  copy: string;
  copied: string;
}

export const WIRE: Record<Locale, WireDict> = {
  en: {
    liveLabel: "Live", title: "Live from the wire", eyebrow: "Real sources, real headlines",
    loading: "Pulling the latest from around the world…", refresh: "Refresh", updated: "Updated",
    allSources: "All sources", source: "Source", error: "The live feed is unreachable right now.",
    retry: "Try again", none: "No stories matched.", searchPlaceholder: "Filter the wire…",
  },
  ar: {
    liveLabel: "مباشر", title: "مباشر من الأسلاك", eyebrow: "مصادر حقيقية، عناوين حقيقية",
    loading: "نجلب أحدث الأخبار من حول العالم…", refresh: "تحديث", updated: "آخر تحديث",
    allSources: "كل المصادر", source: "المصدر", error: "الخلاصة المباشرة غير متاحة الآن.",
    retry: "إعادة المحاولة", none: "لا توجد أخبار مطابقة.", searchPlaceholder: "تصفية الخلاصة…",
  },
  fr: {
    liveLabel: "En direct", title: "En direct du fil", eyebrow: "De vraies sources, de vrais titres",
    loading: "Collecte des dernières nouvelles dans le monde…", refresh: "Actualiser", updated: "Mis à jour",
    allSources: "Toutes les sources", source: "Source", error: "Le fil en direct est inaccessible pour le moment.",
    retry: "Réessayer", none: "Aucune histoire ne correspond.", searchPlaceholder: "Filtrer le fil…",
  },
  de: {
    liveLabel: "Live", title: "Live vom Draht", eyebrow: "Echte Quellen, echte Schlagzeilen",
    loading: "Sammle die neuesten Nachrichten aus aller Welt…", refresh: "Aktualisieren", updated: "Aktualisiert",
    allSources: "Alle Quellen", source: "Quelle", error: "Der Live-Feed ist gerade nicht erreichbar.",
    retry: "Erneut versuchen", none: "Keine passenden Meldungen.", searchPlaceholder: "Feed filtern…",
  },
  es: {
    liveLabel: "En vivo", title: "En vivo desde el cable", eyebrow: "Fuentes reales, titulares reales",
    loading: "Trayendo lo último desde todo el mundo…", refresh: "Actualizar", updated: "Actualizado",
    allSources: "Todas las fuentes", source: "Fuente", error: "El feed en vivo no está disponible ahora.",
    retry: "Reintentar", none: "No hay noticias que coincidan.", searchPlaceholder: "Filtrar el cable…",
  },
  pt: {
    liveLabel: "Ao vivo", title: "Ao vivo da agência", eyebrow: "Fontes reais, manchetes reais",
    loading: "Buscando as últimas notícias do mundo…", refresh: "Atualizar", updated: "Atualizado",
    allSources: "Todas as fontes", source: "Fonte", error: "O feed ao vivo está indisponível agora.",
    retry: "Tentar novamente", none: "Nenhuma notícia correspondente.", searchPlaceholder: "Filtrar o feed…",
  },
  it: {
    liveLabel: "Live", title: "Live dal filo", eyebrow: "Fonti reali, titoli reali",
    loading: "Raccogliendo le ultime notizie dal mondo…", refresh: "Aggiorna", updated: "Aggiornato",
    allSources: "Tutte le fonti", source: "Fonte", error: "Il feed live non è raggiungibile al momento.",
    retry: "Riprova", none: "Nessuna notizia corrispondente.", searchPlaceholder: "Filtra il filo…",
  },
  nl: {
    liveLabel: "Live", title: "Live van de draad", eyebrow: "Echte bronnen, echte koppen",
    loading: "De laatste wereldwijde berichten ophalen…", refresh: "Vernieuwen", updated: "Bijgewerkt",
    allSources: "Alle bronnen", source: "Bron", error: "De live feed is momenteel niet bereikbaar.",
    retry: "Opnieuw proberen", none: "Geen overeenkomende berichten.", searchPlaceholder: "Feed filteren…",
  },
  ru: {
    liveLabel: "В прямом эфире", title: "Лента мировых новостей", eyebrow: "Реальные источники, реальные заголовки",
    loading: "Собираем последние новости со всего мира…", refresh: "Обновить", updated: "Обновлено",
    allSources: "Все источники", source: "Источник", error: "Прямой эфир сейчас недоступен.",
    retry: "Повторить", none: "Подходящих новостей нет.", searchPlaceholder: "Фильтр ленты…",
  },
  tr: {
    liveLabel: "Canlı", title: "Hattan canlı", eyebrow: "Gerçek kaynaklar, gerçek manşetler",
    loading: "Dünyanın dört bir yanından son haberler…", refresh: "Yenile", updated: "Güncellendi",
    allSources: "Tüm kaynaklar", source: "Kaynak", error: "Canlı yayın şu anda ulaşılamıyor.",
    retry: "Tekrar dene", none: "Eşleşen haber yok.", searchPlaceholder: "Akışı filtrele…",
  },
  fa: {
    liveLabel: "زنده", title: "زنده از خبرگزاری‌ها", eyebrow: "منابع واقعی، تیترهای واقعی",
    loading: "در حال دریافت آخرین اخبار از سراسر جهان…", refresh: "به‌روزرسانی", updated: "به‌روزرسانی شد",
    allSources: "همه منابع", source: "منبع", error: "فید زنده در حال حاضر در دسترس نیست.",
    retry: "تلاش دوباره", none: "خبری مطابق پیدا نشد.", searchPlaceholder: "فیلتر فید…",
  },
  ur: {
    liveLabel: "براہ راست", title: "براہ راست خبر", eyebrow: "حقیقی ذرائع، حقیقی سرخیاں",
    loading: "دنیا بھر سے تازہ خبریں لا رہے ہیں…", refresh: "تازہ کاری", updated: "اپ ڈیٹ شدہ",
    allSources: "تمام ذرائع", source: "ذرائع", error: "لائیو فیڈ ابھی دستیاب نہیں ہے۔",
    retry: "دوبارہ کوشش کریں", none: "کوئی مماثل خبر نہیں۔", searchPlaceholder: "فیڈ فلٹر کریں…",
  },
  hi: {
    liveLabel: "लाइव", title: "वायर से लाइव", eyebrow: "असली स्रोत, असली सुर्खियाँ",
    loading: "दुनिया भर से ताज़ा खबरें ला रहे हैं…", refresh: "रिफ्रेश करें", updated: "अपडेटेड",
    allSources: "सभी स्रोत", source: "स्रोत", error: "लाइव फ़ीड अभी उपलब्ध नहीं है।",
    retry: "फिर कोशिश करें", none: "कोई मेल खाती खबर नहीं।", searchPlaceholder: "फ़ीड फ़िल्टर करें…",
  },
  bn: {
    liveLabel: "লাইভ", title: "ওয়্যার থেকে লাইভ", eyebrow: "প্রকৃত উৎস, প্রকৃত শিরোনাম",
    loading: "বিশ্বজুড়ে থেকে সর্বশেষ সংবাদ আনা হচ্ছে…", refresh: "রিফ্রেশ", updated: "আপডেট হয়েছে",
    allSources: "সব উৎস", source: "উৎস", error: "লাইভ ফিড এখন উপলব্ধ নয়।",
    retry: "আবার চেষ্টা করুন", none: "কোনো মিলে যাওয়া সংবাদ নেই।", searchPlaceholder: "ফিড ফিল্টার করুন…",
  },
  zh: {
    liveLabel: "直播", title: "实时快讯", eyebrow: "真实来源，真实头条",
    loading: "正在聚合全球最新消息…", refresh: "刷新", updated: "已更新",
    allSources: "全部来源", source: "来源", error: "实时快讯暂时无法访问。",
    retry: "重试", none: "没有匹配的报道。", searchPlaceholder: "筛选快讯…",
  },
  "zh-TW": {
    liveLabel: "直播", title: "即時快訊", eyebrow: "真實來源，真實頭條",
    loading: "正在匯集全球最新消息…", refresh: "重新整理", updated: "已更新",
    allSources: "全部來源", source: "來源", error: "即時快訊暫時無法訪問。",
    retry: "重試", none: "沒有相符的報導。", searchPlaceholder: "篩選快訊…",
  },
  ja: {
    liveLabel: "ライブ", title: "世界の速報", eyebrow: "本物のソース、本物の見出し",
    loading: "世界各地の最新ニュースを集めています…", refresh: "更新", updated: "更新済み",
    allSources: "すべての情報源", source: "情報源", error: "ライブ配信は現在利用できません。",
    retry: "再試行", none: "該当するニュースがありません。", searchPlaceholder: "速報を絞り込む…",
  },
  ko: {
    liveLabel: "라이브", title: "실시간 속보", eyebrow: "실제 소스, 실제 헤드라인",
    loading: "전 세계 최신 뉴스를 모으는 중…", refresh: "새로고침", updated: "업데이트됨",
    allSources: "모든 소스", source: "출처", error: "라이브 피드를 지금 사용할 수 없습니다.",
    retry: "다시 시도", none: "일치하는 기사가 없습니다.", searchPlaceholder: "피드 필터…",
  },
  id: {
    liveLabel: "Langsung", title: "Langsung dari jaringan", eyebrow: "Sumber nyata, berita utama nyata",
    loading: "Mengambil berita terbaru dari seluruh dunia…", refresh: "Muat ulang", updated: "Diperbarui",
    allSources: "Semua sumber", source: "Sumber", error: "Feed langsung tidak dapat diakses saat ini.",
    retry: "Coba lagi", none: "Tidak ada berita yang cocok.", searchPlaceholder: "Filter feed…",
  },
  ms: {
    liveLabel: "Langsung", title: "Langsung daripada wayar", eyebrow: "Sumber sebenar, tajuk sebenar",
    loading: "Mengambil berita terkini dari seluruh dunia…", refresh: "Muat semula", updated: "Dikemas kini",
    allSources: "Semua sumber", source: "Sumber", error: "Feed langsung tidak dapat diakses buat masa ini.",
    retry: "Cuba lagi", none: "Tiada berita sepadan.", searchPlaceholder: "Tapis wayar…",
  },
  vi: {
    liveLabel: "Trực tiếp", title: "Trực tiếp từ tin tức", eyebrow: "Nguồn thật, tiêu đề thật",
    loading: "Đang lấy tin mới nhất từ khắp thế giới…", refresh: "Làm mới", updated: "Đã cập nhật",
    allSources: "Tất cả nguồn", source: "Nguồn", error: "Luồng tin trực tiếp hiện không khả dụng.",
    retry: "Thử lại", none: "Không có tin nào khớp.", searchPlaceholder: "Lọc luồng tin…",
  },
  th: {
    liveLabel: "ถ่ายทอดสด", title: "สดจากข่าวด่วน", eyebrow: "แหล่งข่าวจริง หัวข้อข่าวจริง",
    loading: "กำลังรวบรวมข่าวล่าสุดจากทั่วโลก…", refresh: "รีเฟรช", updated: "อัปเดตแล้ว",
    allSources: "ทุกแหล่ง", source: "แหล่งข่าว", error: "ฟีดสดไม่สามารถเข้าถึงได้ในขณะนี้",
    retry: "ลองอีกครั้ง", none: "ไม่พบข่าวที่ตรงกัน", searchPlaceholder: "กรองฟีด…",
  },
  sw: {
    liveLabel: "Moja kwa moja", title: "Moja kwa moja kutoka kwenye waya", eyebrow: "Vyanzo halisi, vichwa halisi",
    loading: "Inakusanya habari za hivi punde kutoka duniani…", refresh: "Fungua upya", updated: "Imesasishwa",
    allSources: "Vyanzo vyote", source: "Chanzo", error: "Mkondo wa moja kwa moja haupatikani kwa sasa.",
    retry: "Jaribu tena", none: "Hakuna habari inayolingana.", searchPlaceholder: "Chuja mkondo…",
  },
  ha: {
    liveLabel: "Kai tsaye", title: "Kai tsaye daga labarai", eyebrow: "Majiyoyi na gaskiya, kanunni na gaskiya",
    loading: "Ana kawo sabbin labarai daga ko'ina a duniya…", refresh: "Sabunta", updated: "An sabunta",
    allSources: "Duk majiyoyi", source: "Majiya", error: "Fitar kai tsaye ba ta samuwa a yanzu.",
    retry: "Sake gwadawa", none: "Babu labarin da ya dace.", searchPlaceholder: "Tace fitar…",
  },
  yo: {
    liveLabel: "Tààrà", title: "Tààrà láti inú okùn ìròyìn", eyebrow: "Àwọn orísun gidi, àwọn àkọ́lé gidi",
    loading: "Ó ń mú àwọn ìròyìn tuntun wá láti gbogbo àgbáyé…", refresh: "Tun ṣe", updated: "Imudojuiwọn",
    allSources: "Gbogbo àwọn orísun", source: "Orísun", error: "Ìkàn tààrà kò sí ní àyè báyìí.",
    retry: "Gbìyànjú lẹ́ẹ̀kan síi", none: "Kò sí ìròyìn tó bá a mu.", searchPlaceholder: "Dè àwọn ìròyìn…",
  },
  ig: {
    liveLabel: "Ndụ", title: "Ndụ site na akụkọ", eyebrow: "Ezi isi mmalite, ezi isi akụkọ",
    loading: "Na-eweta akụkọ kachasị ọhụrụ gburugburu ụwa…", refresh: "Mmelite", updated: "Emelite",
    allSources: "Isi mmalite niile", source: "Isi mmalite", error: "Feed ndụ enweghịzi ike ịnweta ugbu a.",
    retry: "Nwaa ọzọ", none: "Enweghị akụkọ dabara.", searchPlaceholder: "Zachaa feed…",
  },
  el: {
    liveLabel: "Ζωντανά", title: "Ζωντανά από το πρακτορείο", eyebrow: "Πραγματικές πηγές, πραγματικοί τίτλοι",
    loading: "Συγκεντρώνουμε τα τελευταία νέα από όλο τον κόσμο…", refresh: "Ανανέωση", updated: "Ενημερώθηκε",
    allSources: "Όλες οι πηγές", source: "Πηγή", error: "Η ζωντανή ροή δεν είναι διαθέσιμη αυτή τη στιγμή.",
    retry: "Δοκιμάστε ξανά", none: "Δεν βρέθηκαν ειδήσεις.", searchPlaceholder: "Φίλτρο ροής…",
  },
  he: {
    liveLabel: "חי", title: "חי מהסוכנות", eyebrow: "מקורות אמיתיים, כותרות אמיתיות",
    loading: "שולפים את החדשות האחרונות מכל העולם…", refresh: "רענן", updated: "עודכן",
    allSources: "כל המקורות", source: "מקור", error: "העדכון החי אינו זמין כרגע.",
    retry: "נסו שוב", none: "אין ידיעות מתאימות.", searchPlaceholder: "סנן את העדכון…",
  },
  pl: {
    liveLabel: "Na żywo", title: "Na żywo z agencji", eyebrow: "Prawdziwe źródła, prawdziwe nagłówki",
    loading: "Zbieramy najnowsze wiadomości z całego świata…", refresh: "Odśwież", updated: "Zaktualizowano",
    allSources: "Wszystkie źródła", source: "Źródło", error: "Na żywo jest teraz niedostępne.",
    retry: "Spróbuj ponownie", none: "Brak pasujących wiadomości.", searchPlaceholder: "Filtruj kanał…",
  },
  ro: {
    liveLabel: "În direct", title: "În direct din agenții", eyebrow: "Surse reale, titluri reale",
    loading: "Adunăm cele mai noi știri din întreaga lume…", refresh: "Reîmprospătează", updated: "Actualizat",
    allSources: "Toate sursele", source: "Sursă", error: "Feedul live nu este disponibil momentan.",
    retry: "Încearcă din nou", none: "Nicio știre potrivită.", searchPlaceholder: "Filtrează feedul…",
  },
};

export const COMMENTS: Record<Locale, CommentsDict> = {
  en: {
    title: "Comments", placeholder: "Share your thoughts…", namePlaceholder: "Your name",
    submit: "Post comment", empty: "No comments yet — start the conversation.",
    loading: "Loading comments…", unavailable: "Comments are temporarily unavailable.",
    error: "Couldn't load comments. Please try again.",
  },
  ar: {
    title: "التعليقات", placeholder: "شارك رأيك…", namePlaceholder: "اسمك",
    submit: "نشر التعليق", empty: "لا توجد تعليقات بعد — ابدأ النقاش.",
    loading: "جارٍ تحميل التعليقات…", unavailable: "التعليقات غير متاحة مؤقتًا.",
    error: "تعذّر تحميل التعليقات. حاول مجددًا.",
  },
  fr: {
    title: "Commentaires", placeholder: "Partagez votre avis…", namePlaceholder: "Votre nom",
    submit: "Publier le commentaire", empty: "Pas encore de commentaires — lancez la conversation.",
    loading: "Chargement des commentaires…", unavailable: "Les commentaires sont temporairement indisponibles.",
    error: "Impossible de charger les commentaires. Réessayez.",
  },
  de: {
    title: "Kommentare", placeholder: "Teile deine Gedanken…", namePlaceholder: "Dein Name",
    submit: "Kommentar posten", empty: "Noch keine Kommentare – starte das Gespräch.",
    loading: "Kommentare werden geladen…", unavailable: "Kommentare sind vorübergehend nicht verfügbar.",
    error: "Kommentare konnten nicht geladen werden. Bitte erneut versuchen.",
  },
  es: {
    title: "Comentarios", placeholder: "Comparte tu opinión…", namePlaceholder: "Tu nombre",
    submit: "Publicar comentario", empty: "Aún no hay comentarios — inicia la conversación.",
    loading: "Cargando comentarios…", unavailable: "Los comentarios no están disponibles temporalmente.",
    error: "No se pudieron cargar los comentarios. Inténtalo de nuevo.",
  },
  pt: {
    title: "Comentários", placeholder: "Compartilhe sua opinião…", namePlaceholder: "Seu nome",
    submit: "Publicar comentário", empty: "Ainda sem comentários — inicie a conversa.",
    loading: "Carregando comentários…", unavailable: "Os comentários estão temporariamente indisponíveis.",
    error: "Não foi possível carregar os comentários. Tente novamente.",
  },
  it: {
    title: "Commenti", placeholder: "Condividi il tuo pensiero…", namePlaceholder: "Il tuo nome",
    submit: "Pubblica commento", empty: "Ancora nessun commento — avvia la conversazione.",
    loading: "Caricamento commenti…", unavailable: "I commenti non sono temporaneamente disponibili.",
    error: "Impossibile caricare i commenti. Riprova.",
  },
  nl: {
    title: "Reacties", placeholder: "Deel je gedachten…", namePlaceholder: "Je naam",
    submit: "Reactie plaatsen", empty: "Nog geen reacties — begin het gesprek.",
    loading: "Reacties laden…", unavailable: "Reacties zijn tijdelijk niet beschikbaar.",
    error: "Reacties konden niet worden geladen. Probeer het opnieuw.",
  },
  ru: {
    title: "Комментарии", placeholder: "Поделитесь мнением…", namePlaceholder: "Ваше имя",
    submit: "Оставить комментарий", empty: "Комментариев пока нет — начните обсуждение.",
    loading: "Загрузка комментариев…", unavailable: "Комментарии временно недоступны.",
    error: "Не удалось загрузить комментарии. Попробуйте ещё раз.",
  },
  tr: {
    title: "Yorumlar", placeholder: "Düşüncelerini paylaş…", namePlaceholder: "Adın",
    submit: "Yorum yayınla", empty: "Henüz yorum yok — sohbeti başlat.",
    loading: "Yorumlar yükleniyor…", unavailable: "Yorumlar şu anda kullanılamıyor.",
    error: "Yorumlar yüklenemedi. Lütfen tekrar deneyin.",
  },
  fa: {
    title: "نظرات", placeholder: "نظر خود را بنویسید…", namePlaceholder: "نام شما",
    submit: "ارسال نظر", empty: "هنوز نظری ثبت نشده — گفتگو را آغاز کنید.",
    loading: "در حال بارگذاری نظرات…", unavailable: "نظرات به‌طور موقت در دسترس نیستند.",
    error: "بارگذاری نظرات ممکن نشد. دوباره تلاش کنید.",
  },
  ur: {
    title: "تبصرے", placeholder: "اپنی رائے دیں…", namePlaceholder: "آپ کا نام",
    submit: "تبصرہ شائع کریں", empty: "ابھی کوئی تبصرہ نہیں — گفتگو شروع کریں۔",
    loading: "تبصرے لوڈ ہو رہے ہیں…", unavailable: "تبصرے فی الحال دستیاب نہیں ہیں۔",
    error: "تبصرے لوڈ نہیں ہو سکے۔ دوبارہ کوشش کریں۔",
  },
  hi: {
    title: "टिप्पणियाँ", placeholder: "अपने विचार साझा करें…", namePlaceholder: "आपका नाम",
    submit: "टिप्पणी पोस्ट करें", empty: "अभी कोई टिप्पणी नहीं — बातचीत शुरू करें।",
    loading: "टिप्पणियाँ लोड हो रही हैं…", unavailable: "टिप्पणियाँ फ़िलहाल उपलब्ध नहीं हैं।",
    error: "टिप्पणियाँ लोड नहीं हो सकीं। फिर कोशिश करें।",
  },
  bn: {
    title: "মন্তব্য", placeholder: "আপনার মতামত দিন…", namePlaceholder: "আপনার নাম",
    submit: "মন্তব্য পোস্ট করুন", empty: "এখনো কোনো মন্তব্য নেই — আলোচনা শুরু করুন।",
    loading: "মন্তব্য লোড হচ্ছে…", unavailable: "মন্তব্য সাময়িকভাবে উপলব্ধ নয়।",
    error: "মন্তব্য লোড করা যায়নি। আবার চেষ্টা করুন।",
  },
  zh: {
    title: "评论", placeholder: "分享你的看法…", namePlaceholder: "你的名字",
    submit: "发表评论", empty: "还没有评论 — 开始讨论吧。",
    loading: "正在加载评论…", unavailable: "评论暂时不可用。",
    error: "评论加载失败，请重试。",
  },
  "zh-TW": {
    title: "留言", placeholder: "分享你的看法…", namePlaceholder: "你的名字",
    submit: "發表留言", empty: "還沒有留言 — 開始討論吧。",
    loading: "正在載入留言…", unavailable: "留言暫時無法使用。",
    error: "留言載入失敗，請重試。",
  },
  ja: {
    title: "コメント", placeholder: "感想を共有しましょう…", namePlaceholder: "お名前",
    submit: "コメントを投稿", empty: "まだコメントはありません — 会話を始めましょう。",
    loading: "コメントを読み込み中…", unavailable: "コメントは一時的に利用できません。",
    error: "コメントを読み込めませんでした。もう一度お試しください。",
  },
  ko: {
    title: "댓글", placeholder: "생각을 공유하세요…", namePlaceholder: "이름",
    submit: "댓글 작성", empty: "아직 댓글이 없습니다 — 대화를 시작하세요.",
    loading: "댓글 로드 중…", unavailable: "댓글을 일시적으로 사용할 수 없습니다.",
    error: "댓글을 불러오지 못했습니다. 다시 시도하세요.",
  },
  id: {
    title: "Komentar", placeholder: "Bagikan pendapat Anda…", namePlaceholder: "Nama Anda",
    submit: "Kirim komentar", empty: "Belum ada komentar — mulai perbincangan.",
    loading: "Memuat komentar…", unavailable: "Komentar untuk sementara tidak tersedia.",
    error: "Komentar gagal dimuat. Silakan coba lagi.",
  },
  ms: {
    title: "Komen", placeholder: "Kongsi pandangan anda…", namePlaceholder: "Nama anda",
    submit: "Hantar komen", empty: "Tiada komen lagi — mulakan perbualan.",
    loading: "Memuatkan komen…", unavailable: "Komen buat sementara tidak tersedia.",
    error: "Komen gagal dimuatkan. Sila cuba lagi.",
  },
  vi: {
    title: "Bình luận", placeholder: "Chia sẻ suy nghĩ của bạn…", namePlaceholder: "Tên của bạn",
    submit: "Đăng bình luận", empty: "Chưa có bình luận nào — hãy bắt đầu cuộc trò chuyện.",
    loading: "Đang tải bình luận…", unavailable: "Bình luận tạm thời không khả dụng.",
    error: "Không tải được bình luận. Vui lòng thử lại.",
  },
  th: {
    title: "ความคิดเห็น", placeholder: "แสดงความคิดเห็นของคุณ…", namePlaceholder: "ชื่อของคุณ",
    submit: "โพสต์ความคิดเห็น", empty: "ยังไม่มีความคิดเห็น — เริ่มการสนทนา",
    loading: "กำลังโหลดความคิดเห็น…", unavailable: "ความคิดเห็นไม่พร้อมใช้งานชั่วคราว",
    error: "ไม่สามารถโหลดความคิดเห็นได้ โปรดลองอีกครั้ง",
  },
  sw: {
    title: "Maoni", placeholder: "Shiriki mawazo yako…", namePlaceholder: "Jina lako",
    submit: "Chapisha maoni", empty: "Hakuna maoni bado — anza mazungumzo.",
    loading: "Inapakia maoni…", unavailable: "Maoni hayapatikani kwa muda.",
    error: "Maoni hayakuweza kupakiwa. Jaribu tena.",
  },
  ha: {
    title: "Sharhi", placeholder: "Bada ra'ayinka…", namePlaceholder: "Sunanka",
    submit: "Sanya sharhi", empty: "Babu sharhi tukuna — fara tattaunawa.",
    loading: "Ana loda sharhi…", unavailable: "Sharhi ba su samuwa na ɗan lokaci.",
    error: "An kasa loda sharhi. Da fatan za a sake gwadawa.",
  },
  yo: {
    title: "Àwọn ìfìwérọ̀", placeholder: "Pín àwọn èrò rẹ…", namePlaceholder: "Orúkọ rẹ",
    submit: "Fi ìfìwérọ̀ sílẹ̀", empty: "Kò sí ìfìwérọ̀ sibẹ̀síbẹ̀ — bẹ̀rẹ̀ ìjíròrò.",
    loading: "Ò ń gbé àwọn ìfìwérọ̀…", unavailable: "Àwọn ìfìwérọ̀ kò sí ní àyè fún ìgbà díẹ̀.",
    error: "A kò lè gbé àwọn ìfìwérọ̀. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi.",
  },
  ig: {
    title: "Okwu", placeholder: "Kekọrịta echiche gị…", namePlaceholder: "Aha gị",
    submit: "Debanye okwu", empty: "Enweghị okwu ọ bụla — malite mkparịta ụka.",
    loading: "Na-ebugo okwu…", unavailable: "Okwu anọghị adị ruo nwa oge.",
    error: "Enweghị ike ibu okwu. Biko nwaa ọzọ.",
  },
  el: {
    title: "Σχόλια", placeholder: "Μοιραστείτε τις σκέψεις σας…", namePlaceholder: "Το όνομά σας",
    submit: "Δημοσίευση σχολίου", empty: "Δεν υπάρχουν ακόμη σχόλια — ξεκινήστε τη συζήτηση.",
    loading: "Φόρτωση σχολίων…", unavailable: "Τα σχόλια δεν είναι προσωρινά διαθέσιμα.",
    error: "Δεν ήταν δυνατή η φόρτωση σχολίων. Δοκιμάστε ξανά.",
  },
  he: {
    title: "תגובות", placeholder: "שתפו את דעתכם…", namePlaceholder: "השם שלכם",
    submit: "פרסם תגובה", empty: "עדיין אין תגובות — פתחו את השיחה.",
    loading: "טוען תגובות…", unavailable: "התגובות אינן זמינות כרגע.",
    error: "לא ניתן היה לטעון תגובות. נסו שוב.",
  },
  pl: {
    title: "Komentarze", placeholder: "Podziel się opinią…", namePlaceholder: "Twoje imię",
    submit: "Opublikuj komentarz", empty: "Brak komentarzy — zacznij rozmowę.",
    loading: "Ładowanie komentarzy…", unavailable: "Komentarze są tymczasowo niedostępne.",
    error: "Nie udało się załadować komentarzy. Spróbuj ponownie.",
  },
  ro: {
    title: "Comentarii", placeholder: "Împărtășește-ți părerea…", namePlaceholder: "Numele tău",
    submit: "Publică comentariu", empty: "Niciun comentariu încă — începe conversația.",
    loading: "Se încarcă comentariile…", unavailable: "Comentariile sunt temporar indisponibile.",
    error: "Comentariile nu au putut fi încărcate. Încearcă din nou.",
  },
};

export const SHARE: Record<Locale, ShareDict> = {
  en: { title: "Share", copy: "Copy link", copied: "Link copied!" },
  ar: { title: "مشاركة", copy: "نسخ الرابط", copied: "تم نسخ الرابط!" },
  fr: { title: "Partager", copy: "Copier le lien", copied: "Lien copié !" },
  de: { title: "Teilen", copy: "Link kopieren", copied: "Link kopiert!" },
  es: { title: "Compartir", copy: "Copiar enlace", copied: "¡Enlace copiado!" },
  pt: { title: "Compartilhar", copy: "Copiar link", copied: "Link copiado!" },
  it: { title: "Condividi", copy: "Copia link", copied: "Link copiato!" },
  nl: { title: "Delen", copy: "Link kopiëren", copied: "Link gekopieerd!" },
  ru: { title: "Поделиться", copy: "Копировать ссылку", copied: "Ссылка скопирована!" },
  tr: { title: "Paylaş", copy: "Bağlantıyı kopyala", copied: "Bağlantı kopyalandı!" },
  fa: { title: "اشتراک‌گذاری", copy: "کپی لینک", copied: "لینک کپی شد!" },
  ur: { title: "شیئر کریں", copy: "لنک کاپی کریں", copied: "لنک کاپی ہو گیا!" },
  hi: { title: "साझा करें", copy: "लिंक कॉपी करें", copied: "लिंक कॉपी हो गया!" },
  bn: { title: "শেয়ার করুন", copy: "লিংক কপি করুন", copied: "লিংক কপি হয়েছে!" },
  zh: { title: "分享", copy: "复制链接", copied: "链接已复制！" },
  "zh-TW": { title: "分享", copy: "複製連結", copied: "連結已複製！" },
  ja: { title: "シェア", copy: "リンクをコピー", copied: "リンクをコピーしました！" },
  ko: { title: "공유", copy: "링크 복사", copied: "링크가 복사되었습니다!" },
  id: { title: "Bagikan", copy: "Salin tautan", copied: "Tautan disalin!" },
  ms: { title: "Kongsi", copy: "Salin pautan", copied: "Pautan disalin!" },
  vi: { title: "Chia sẻ", copy: "Sao chép liên kết", copied: "Đã sao chép liên kết!" },
  th: { title: "แชร์", copy: "คัดลอกลิงก์", copied: "คัดลอกลิงก์แล้ว!" },
  sw: { title: "Shiriki", copy: "Nakili kiungo", copied: "Kiungo kimenakiliwa!" },
  ha: { title: "Raba", copy: "Kwafi hanyar", copied: "An kwafi hanyar!" },
  yo: { title: "Pín", copy: "Da pọ́ọ́nà kópi", copied: "A ti da pọ́ọ́nà kópi!" },
  ig: { title: "Kekọrịta", copy: "Detuo njikọ", copied: "Edetuola njikọ!" },
  el: { title: "Κοινοποίηση", copy: "Αντιγραφή συνδέσμου", copied: "Ο σύνδεσμος αντιγράφηκε!" },
  he: { title: "שיתוף", copy: "העתק קישור", copied: "הקישור הועתק!" },
  pl: { title: "Udostępnij", copy: "Kopiuj link", copied: "Link skopiowany!" },
  ro: { title: "Distribuie", copy: "Copiază linkul", copied: "Linkul a fost copiat!" },
};

export function getWire(locale: string): WireDict {
  return WIRE[locale as Locale] ?? WIRE[DEFAULT_LOCALE];
}

export function getComments(locale: string): CommentsDict {
  return COMMENTS[locale as Locale] ?? COMMENTS[DEFAULT_LOCALE];
}

export function getShare(locale: string): ShareDict {
  return SHARE[locale as Locale] ?? SHARE[DEFAULT_LOCALE];
}
