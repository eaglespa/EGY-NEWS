import type { Locale } from "./locales";
import { LOCALE_CODES, DEFAULT_LOCALE } from "./locales";

export interface Dict {
  meta: { title: string; description: string };
  nav: {
    home: string; world: string; politics: string; economy: string;
    technology: string; sports: string; health: string; culture: string;
    search: string; advertise: string; menu: string;
  };
  ticker: { live: string; breaking: string; watchNow: string };
  hero: { eyebrow: string; latest: string; breakingNow: string; updated: string };
  actions: { readMore: string; viewAll: string; justNow: string; minutes: string; hours: string };
  search: { placeholder: string; title: string; noResults: string; resultsFor: string; tip: string };
  agent: {
    title: string; subtitle: string; placeholder: string; send: string; thinking: string;
    greet: string; s1: string; s2: string; s3: string; cited: string; readArticle: string;
  };
  footer: { about: string; sections: string; follow: string; rights: string; madeBy: string };
  advertise: { title: string; subtitle: string; cta: string; contact: string; plan1: string; plan2: string; plan3: string };
  common: { latest: string; topStories: string; categories: string; readTime: string; byline: string };
  notFound: { title: string; text: string; home: string };
  category: { stories: string; other: string };
}

const en: Dict = {
  meta: {
    title: "EGY NEWS — World News Through Cairo",
    description:
      "EGY NEWS is an independent digital news station reporting from Cairo to the world. Breaking news, politics, economy, technology, sports, health and culture in 30 languages.",
  },
  nav: {
    home: "Home", world: "World", politics: "Politics", economy: "Economy",
    technology: "Technology", sports: "Sports", health: "Health", culture: "Culture",
    search: "Search", advertise: "Advertise", menu: "Menu",
  },
  ticker: { live: "LIVE", breaking: "BREAKING", watchNow: "Watch now" },
  hero: {
    eyebrow: "Around the clock — from Cairo to the world",
    latest: "Latest from the newsroom",
    breakingNow: "Breaking now",
    updated: "Updated",
  },
  actions: { readMore: "Read story", viewAll: "View all", justNow: "Just now", minutes: "min read", hours: "h ago" },
  search: {
    placeholder: "Search 30 languages of news…",
    title: "Search the newsroom",
    noResults: "No stories matched your search. Try a different keyword.",
    resultsFor: "Results for",
    tip: "Tip: try keywords like “economy”, “football”, or “Cairo”.",
  },
  agent: {
    title: "ASK THE AGENT",
    subtitle: "Our on-site AI finds the story you need and talks it through with you.",
    placeholder: "Ask about today’s news…",
    send: "Send",
    thinking: "Scanning the newsroom…",
    greet: "Hello, I'm the EGY NEWS agent. Ask me what's breaking, what's trending, or about any topic and I'll bring you the stories — instantly.",
    s1: "What's breaking right now?",
    s2: "Summarize the economy news",
    s3: "Tell me about technology in Egypt",
    cited: "Sources",
    readArticle: "Read the story",
  },
  footer: {
    about:
      "An independent, multilingual digital news station broadcasting from Cairo. Real stories, straight reporting, in 30 languages.",
    sections: "Sections", follow: "Follow the station", rights: "All rights reserved.",
    madeBy: "Made by Romero's Studios",
  },
  advertise: {
    title: "Advertise with EGY NEWS",
    subtitle: "Put your brand in front of a multilingual audience across 30 languages.",
    cta: "Book on WhatsApp",
    contact: "Direct line",
    plan1: "Breaking-news banner",
    plan2: "In-article placements",
    plan3: "Sponsored segments",
  },
  common: { latest: "Latest", topStories: "Top stories", categories: "Categories", readTime: "read", byline: "By" },
  notFound: { title: "Story not found", text: "The page you're looking for has moved or never existed.", home: "Back to the front page" },
  category: { stories: "stories", other: "More in this section" },
};

const ar: Dict = {
  meta: {
    title: "إيجي نيوز — أخبار العالم من القاهرة",
    description:
      "إيجي نيوز محطة إخبارية رقمية مستقلة تبث من القاهرة إلى العالم. أخبار عاجلة وسياسة واقتصاد وتكنولوجيا ورياضة وصحة وثقافة بـ 30 لغة.",
  },
  nav: {
    home: "الرئيسية", world: "العالم", politics: "سياسة", economy: "اقتصاد",
    technology: "تكنولوجيا", sports: "رياضة", health: "صحة", culture: "ثقافة",
    search: "بحث", advertise: "أعلن معنا", menu: "القائمة",
  },
  ticker: { live: "مباشر", breaking: "عاجل", watchNow: "تابع الآن" },
  hero: {
    eyebrow: "على مدار الساعة — من القاهرة إلى العالم",
    latest: "أحدث أخبار غرفة التحرير",
    breakingNow: "عاجل الآن",
    updated: "آخر تحديث",
  },
  actions: { readMore: "اقرأ الخبر", viewAll: "عرض الكل", justNow: "الآن", minutes: "دقائق", hours: "س منذ" },
  search: {
    placeholder: "ابحث في أخبار 30 لغة…",
    title: "ابحث في غرفة التحرير",
    noResults: "لا توجد نتائج مطابقة. جرّب كلمة مختلفة.",
    resultsFor: "نتائج البحث عن",
    tip: "جرّب كلمات مثل «اقتصاد» أو «كرة القدم» أو «القاهرة».",
  },
  agent: {
    title: "اسأل الوكيل الذكي",
    subtitle: "وكيلنا الذكي داخل الموقع يجد لك الخبر ويتحدث معك عنه.",
    placeholder: "اسأل عن أخبار اليوم…",
    send: "إرسال",
    thinking: "أفحص غرفة التحرير…",
    greet: "مرحبًا، أنا وكيل إيجي نيوز. اسألني عن الأخبار العاجلة أو المواضيع الرائجة وأجلب لك القصص فورًا.",
    s1: "ما هي الأخبار العاجلة الآن؟",
    s2: "لخّص أخبار الاقتصاد",
    s3: "حدثني عن التكنولوجيا في مصر",
    cited: "المصادر",
    readArticle: "اقرأ القصة",
  },
  footer: {
    about: "محطة إخبارية رقمية مستقلة ومتعددة اللغات تبث من القاهرة. قصص حقيقية، وتغطية مباشرة بـ 30 لغة.",
    sections: "الأقسام", follow: "تابع المحطة", rights: "جميع الحقوق محفوظة.",
    madeBy: "من إنتاج روميرو ستوديوز",
  },
  advertise: {
    title: "أعلن مع إيجي نيوز",
    subtitle: "ضع علامتك التجارية أمام جمهور متعدد اللغات عبر 30 لغة.",
    cta: "احجز عبر واتساب",
    contact: "الخط المباشر",
    plan1: "بانر الأخبار العاجلة",
    plan2: "إعلانات داخل المقالات",
    plan3: "فقرات مدعومة",
  },
  common: { latest: "الأحدث", topStories: "الأهم", categories: "الأقسام", readTime: "قراءة", byline: "بقلم" },
  notFound: { title: "القصة غير موجودة", text: "ربما انتقلت الصفحة أو لم تكن موجودة من الأساس.", home: "العودة إلى الرئيسية" },
  category: { stories: "قصة", other: "المزيد من هذا القسم" },
};

const fr: Dict = {
  meta: { title: "EGY NEWS — L'actualité mondiale vue du Caire", description: "EGY NEWS est une station d'information numérique indépendante qui diffuse du Caire vers le monde : actualités, politique, économie, technologie, sport, santé et culture en 30 langues." },
  nav: { home: "Accueil", world: "Monde", politics: "Politique", economy: "Économie", technology: "Technologie", sports: "Sport", health: "Santé", culture: "Culture", search: "Rechercher", advertise: "Publicité", menu: "Menu" },
  ticker: { live: "EN DIRECT", breaking: "URGENT", watchNow: "Regarder" },
  hero: { eyebrow: "24h/24 — du Caire au monde", latest: "Les dernières nouvelles", breakingNow: "En ce moment", updated: "Mis à jour" },
  actions: { readMore: "Lire l'article", viewAll: "Tout voir", justNow: "À l'instant", minutes: "min de lecture", hours: "h" },
  search: { placeholder: "Rechercher dans 30 langues…", title: "Rechercher dans la rédaction", noResults: "Aucun article ne correspond. Essayez un autre mot-clé.", resultsFor: "Résultats pour", tip: "Essayez « économie », « football » ou « Le Caire »." },
  agent: { title: "PARLEZ À L'AGENT", subtitle: "Notre agent IA trouve l'histoire et en discute avec vous.", placeholder: "Posez une question sur l'actualité…", send: "Envoyer", thinking: "Analyse de la rédaction…", greet: "Bonjour, je suis l'agent EGY NEWS. Demandez-moi ce qui se passe et je vous apporte les histoires immédiatement.", s1: "Que se passe-t-il en ce moment ?", s2: "Résumez l'actualité économique", s3: "Parlez-moi de la tech en Égypte", cited: "Sources", readArticle: "Lire l'histoire" },
  footer: { about: "Une station numérique indépendante et multilingue qui diffuse depuis Le Caire. De vraies histoires en 30 langues.", sections: "Sections", follow: "Suivre la station", rights: "Tous droits réservés.", madeBy: "Créé par Romero's Studios" },
  advertise: { title: "Faites de la publicité avec EGY NEWS", subtitle: "Placez votre marque devant un public multilingue dans 30 langues.", cta: "Réserver sur WhatsApp", contact: "Ligne directe", plan1: "Bandeau breaking news", plan2: "Placements dans les articles", plan3: "Segments sponsorisés" },
  common: { latest: "Dernières", topStories: "À la une", categories: "Rubriques", readTime: "lecture", byline: "Par" },
  notFound: { title: "Article introuvable", text: "Cette page a été déplacée ou n'existe pas.", home: "Retour à l'accueil" },
  category: { stories: "articles", other: "Plus dans cette rubrique" },
};

const de: Dict = {
  meta: { title: "EGY NEWS — Weltnachrichten aus Kairo", description: "EGY NEWS ist ein unabhängiger digitaler Nachrichtensender, der von Kairo in die Welt sendet: Nachrichten, Politik, Wirtschaft, Technologie, Sport, Gesundheit und Kultur in 30 Sprachen." },
  nav: { home: "Start", world: "Welt", politics: "Politik", economy: "Wirtschaft", technology: "Technologie", sports: "Sport", health: "Gesundheit", culture: "Kultur", search: "Suchen", advertise: "Werbung", menu: "Menü" },
  ticker: { live: "LIVE", breaking: "EILMELDUNG", watchNow: "Ansehen" },
  hero: { eyebrow: "Rund um die Uhr — von Kairo in die Welt", latest: "Neueste Nachrichten", breakingNow: "Aktuell", updated: "Aktualisiert" },
  actions: { readMore: "Artikel lesen", viewAll: "Alle anzeigen", justNow: "Gerade eben", minutes: "Min. Lesezeit", hours: "Std." },
  search: { placeholder: "In 30 Sprachen suchen…", title: "In der Redaktion suchen", noResults: "Keine Artikel gefunden. Versuchen Sie ein anderes Wort.", resultsFor: "Ergebnisse für", tip: "Versuchen Sie „Wirtschaft“, „Fußball“ oder „Kairo“." },
  agent: { title: "FRAGEN SIE DEN AGENTEN", subtitle: "Unser KI-Agent findet die Geschichte und bespricht sie mit Ihnen.", placeholder: "Fragen Sie zur heutigen Nachrichtenlage…", send: "Senden", thinking: "Redaktion wird gescannt…", greet: "Hallo, ich bin der EGY-NEWS-Agent. Fragen Sie mich nach aktuellen oder beliebten Themen — ich bringe Ihnen die Geschichten sofort.", s1: "Was ist gerade aktuell?", s2: "Fasse die Wirtschaftsnachrichten zusammen", s3: "Erzähl mir von Technologie in Ägypten", cited: "Quellen", readArticle: "Geschichte lesen" },
  footer: { about: "Ein unabhängiger, multilingualer digitaler Nachrichtensender aus Kairo. Echte Geschichten in 30 Sprachen.", sections: "Ressorts", follow: "Sender folgen", rights: "Alle Rechte vorbehalten.", madeBy: "Entwickelt von Romero's Studios" },
  advertise: { title: "Mit EGY NEWS werben", subtitle: "Platzieren Sie Ihre Marke vor einem multilingualen Publikum in 30 Sprachen.", cta: "Per WhatsApp buchen", contact: "Direktleitung", plan1: "Eilmeldungs-Banner", plan2: "Platzierungen im Artikel", plan3: "Gesponserte Segmente" },
  common: { latest: "Neueste", topStories: "Top-Meldungen", categories: "Ressorts", readTime: "Lesedauer", byline: "Von" },
  notFound: { title: "Artikel nicht gefunden", text: "Diese Seite wurde verschoben oder existiert nicht.", home: "Zurück zur Startseite" },
  category: { stories: "Meldungen", other: "Mehr in diesem Ressort" },
};

const es: Dict = {
  meta: { title: "EGY NEWS — Noticias del mundo desde El Cairo", description: "EGY NEWS es una estación de noticias digital independiente que transmite desde El Cairo al mundo: noticias, política, economía, tecnología, deportes, salud y cultura en 30 idiomas." },
  nav: { home: "Inicio", world: "Mundo", politics: "Política", economy: "Economía", technology: "Tecnología", sports: "Deportes", health: "Salud", culture: "Cultura", search: "Buscar", advertise: "Publicidad", menu: "Menú" },
  ticker: { live: "EN VIVO", breaking: "ÚLTIMA HORA", watchNow: "Ver ahora" },
  hero: { eyebrow: "Las 24 horas — de El Cairo al mundo", latest: "Últimas noticias", breakingNow: "En este momento", updated: "Actualizado" },
  actions: { readMore: "Leer la noticia", viewAll: "Ver todo", justNow: "Hace un momento", minutes: "min de lectura", hours: "h" },
  search: { placeholder: "Buscar en 30 idiomas…", title: "Buscar en la redacción", noResults: "Ninguna noticia coincide. Prueba otra palabra.", resultsFor: "Resultados para", tip: "Prueba «economía», «fútbol» o «El Cairo»." },
  agent: { title: "HABLA CON EL AGENTE", subtitle: "Nuestro agente de IA encuentra la historia y la analiza contigo.", placeholder: "Pregunta por las noticias de hoy…", send: "Enviar", thinking: "Escaneando la redacción…", greet: "Hola, soy el agente de EGY NEWS. Pregúntame qué está pasando y te traigo las historias al instante.", s1: "¿Qué es noticia ahora mismo?", s2: "Resume las noticias de economía", s3: "Háblame de tecnología en Egipto", cited: "Fuentes", readArticle: "Leer la historia" },
  footer: { about: "Una estación digital independiente y multilingüe que transmite desde El Cairo. Historias reales en 30 idiomas.", sections: "Secciones", follow: "Sigue la estación", rights: "Todos los derechos reservados.", madeBy: "Hecho por Romero's Studios" },
  advertise: { title: "Anúnciate con EGY NEWS", subtitle: "Lleva tu marca a una audiencia multilingüe en 30 idiomas.", cta: "Reservar por WhatsApp", contact: "Línea directa", plan1: "Banner de última hora", plan2: "Espacios en artículos", plan3: "Segmentos patrocinados" },
  common: { latest: "Últimas", topStories: "Destacadas", categories: "Secciones", readTime: "lectura", byline: "Por" },
  notFound: { title: "Noticia no encontrada", text: "La página se movió o nunca existió.", home: "Volver al inicio" },
  category: { stories: "noticias", other: "Más en esta sección" },
};

const pt: Dict = {
  meta: { title: "EGY NEWS — Notícias do mundo a partir do Cairo", description: "EGY NEWS é uma estação de notícias digital independente que transmite do Cairo para o mundo: notícias, política, economia, tecnologia, esportes, saúde e cultura em 30 idiomas." },
  nav: { home: "Início", world: "Mundo", politics: "Política", economy: "Economia", technology: "Tecnologia", sports: "Esportes", health: "Saúde", culture: "Cultura", search: "Buscar", advertise: "Publicidade", menu: "Menu" },
  ticker: { live: "AO VIVO", breaking: "URGENTE", watchNow: "Ver agora" },
  hero: { eyebrow: "24 horas — do Cairo para o mundo", latest: "Últimas notícias", breakingNow: "Neste momento", updated: "Atualizado" },
  actions: { readMore: "Ler notícia", viewAll: "Ver tudo", justNow: "Agora mesmo", minutes: "min de leitura", hours: "h" },
  search: { placeholder: "Pesquisar em 30 idiomas…", title: "Pesquisar na redação", noResults: "Nenhuma notícia corresponde. Tente outra palavra.", resultsFor: "Resultados para", tip: "Tente «economia», «futebol» ou «Cairo»." },
  agent: { title: "FALE COM O AGENTE", subtitle: "Nosso agente de IA encontra a história e conversa com você.", placeholder: "Pergunte sobre as notícias de hoje…", send: "Enviar", thinking: "Examinando a redação…", greet: "Olá, sou o agente da EGY NEWS. Pergunte o que está acontecendo e eu trago as histórias na hora.", s1: "O que é notícia agora?", s2: "Resuma as notícias de economia", s3: "Fale sobre tecnologia no Egito", cited: "Fontes", readArticle: "Ler a história" },
  footer: { about: "Uma estação digital independente e multilíngue que transmite do Cairo. Histórias reais em 30 idiomas.", sections: "Seções", follow: "Siga a estação", rights: "Todos os direitos reservados.", madeBy: "Feito por Romero's Studios" },
  advertise: { title: "Anuncie na EGY NEWS", subtitle: "Coloque sua marca diante de um público multilíngue em 30 idiomas.", cta: "Reservar no WhatsApp", contact: "Linha direta", plan1: "Banner de notícias urgentes", plan2: "Espaços em artigos", plan3: "Segmentos patrocinados" },
  common: { latest: "Últimas", topStories: "Principais", categories: "Seções", readTime: "leitura", byline: "Por" },
  notFound: { title: "Notícia não encontrada", text: "A página foi movida ou nunca existiu.", home: "Voltar ao início" },
  category: { stories: "notícias", other: "Mais nesta seção" },
};

const it: Dict = {
  meta: { title: "EGY NEWS — Notizie dal mondo dal Cairo", description: "EGY NEWS è una stazione di notizie digitale indipendente che trasmette dal Cairo al mondo: notizie, politica, economia, tecnologia, sport, salute e cultura in 30 lingue." },
  nav: { home: "Home", world: "Mondo", politics: "Politica", economy: "Economia", technology: "Tecnologia", sports: "Sport", health: "Salute", culture: "Cultura", search: "Cerca", advertise: "Pubblicità", menu: "Menu" },
  ticker: { live: "DIRETTA", breaking: "ULTIM'ORA", watchNow: "Guarda ora" },
  hero: { eyebrow: "24 ore su 24 — dal Cairo al mondo", latest: "Ultime notizie", breakingNow: "In questo momento", updated: "Aggiornato" },
  actions: { readMore: "Leggi la notizia", viewAll: "Vedi tutto", justNow: "Adesso", minutes: "min di lettura", hours: "h" },
  search: { placeholder: "Cerca in 30 lingue…", title: "Cerca nella redazione", noResults: "Nessuna notizia corrisponde. Prova un'altra parola.", resultsFor: "Risultati per", tip: "Prova «economia», «calcio» o «Cairo»." },
  agent: { title: "PARLA CON L'AGENTE", subtitle: "Il nostro agente IA trova la storia e ne parla con te.", placeholder: "Chiedi delle notizie di oggi…", send: "Invia", thinking: "Analisi della redazione…", greet: "Ciao, sono l'agente EGY NEWS. Chiedimi cosa succede e ti porterò le storie all'istante.", s1: "Cosa succede adesso?", s2: "Riassumi le notizie economiche", s3: "Parlami della tecnologia in Egitto", cited: "Fonti", readArticle: "Leggi la storia" },
  footer: { about: "Una stazione digitale indipendente e multilingue che trasmette dal Cairo. Storie vere in 30 lingue.", sections: "Sezioni", follow: "Segui la stazione", rights: "Tutti i diritti riservati.", madeBy: "Creato da Romero's Studios" },
  advertise: { title: "Fai pubblicità con EGY NEWS", subtitle: "Porta il tuo marchio davanti a un pubblico multilingue in 30 lingue.", cta: "Prenota su WhatsApp", contact: "Linea diretta", plan1: "Banner ultim'ora", plan2: "Spazi negli articoli", plan3: "Segmenti sponsorizzati" },
  common: { latest: "Ultime", topStories: "In evidenza", categories: "Sezioni", readTime: "lettura", byline: "Di" },
  notFound: { title: "Notizia non trovata", text: "La pagina è stata spostata o non è mai esistita.", home: "Torna alla home" },
  category: { stories: "notizie", other: "Altro in questa sezione" },
};

const nl: Dict = {
  meta: { title: "EGY NEWS — Wereldnieuws vanuit Caïro", description: "EGY NEWS is een onafhankelijk digitaal nieuwsstation dat uitzendt vanuit Caïro naar de wereld: nieuws, politiek, economie, technologie, sport, gezondheid en cultuur in 30 talen." },
  nav: { home: "Home", world: "Wereld", politics: "Politiek", economy: "Economie", technology: "Technologie", sports: "Sport", health: "Gezondheid", culture: "Cultuur", search: "Zoeken", advertise: "Adverteren", menu: "Menu" },
  ticker: { live: "LIVE", breaking: "BREKEND", watchNow: "Bekijk nu" },
  hero: { eyebrow: "24 uur per dag — van Caïro naar de wereld", latest: "Laatste nieuws", breakingNow: "Op dit moment", updated: "Bijgewerkt" },
  actions: { readMore: "Lees het nieuws", viewAll: "Alles bekijken", justNow: "Zojuist", minutes: "min leestijd", hours: "u" },
  search: { placeholder: "Zoek in 30 talen…", title: "Zoeken in de redactie", noResults: "Geen artikelen gevonden. Probeer een ander woord.", resultsFor: "Resultaten voor", tip: "Probeer 'economie', 'voetbal' of 'Caïro'." },
  agent: { title: "PRAAT MET DE AGENT", subtitle: "Onze AI-agent vindt het verhaal en bespreekt het met je.", placeholder: "Vraag naar het nieuws van vandaag…", send: "Verstuur", thinking: "Redactie wordt gescand…", greet: "Hallo, ik ben de EGY NEWS-agent. Vraag me wat er speelt en ik breng je de verhalen meteen.", s1: "Wat is er nu aan de hand?", s2: "Vat het economienieuws samen", s3: "Vertel me over technologie in Egypte", cited: "Bronnen", readArticle: "Lees het verhaal" },
  footer: { about: "Een onafhankelijk, meertalig digitaal nieuwsstation vanuit Caïro. Echte verhalen in 30 talen.", sections: "Secties", follow: "Volg het station", rights: "Alle rechten voorbehouden.", madeBy: "Gemaakt door Romero's Studios" },
  advertise: { title: "Adverteer bij EGY NEWS", subtitle: "Plaats je merk voor een meertalig publiek in 30 talen.", cta: "Boek via WhatsApp", contact: "Directe lijn", plan1: "Breaking-news banner", plan2: "Plaatsingen in artikelen", plan3: "Gesponsorde segmenten" },
  common: { latest: "Laatste", topStories: "Topverhalen", categories: "Categorieën", readTime: "leestijd", byline: "Door" },
  notFound: { title: "Verhaal niet gevonden", text: "De pagina is verplaatst of heeft nooit bestaan.", home: "Terug naar de homepage" },
  category: { stories: "verhalen", other: "Meer in deze sectie" },
};

const ru: Dict = {
  meta: { title: "EGY NEWS — мировые новости из Каира", description: "EGY NEWS — независимая цифровая новостная станция, вещающая из Каира по всему миру: новости, политика, экономика, технологии, спорт, здоровье и культура на 30 языках." },
  nav: { home: "Главная", world: "Мир", politics: "Политика", economy: "Экономика", technology: "Технологии", sports: "Спорт", health: "Здоровье", culture: "Культура", search: "Поиск", advertise: "Реклама", menu: "Меню" },
  ticker: { live: "ПРЯМОЙ ЭФИР", breaking: "СРОЧНО", watchNow: "Смотреть" },
  hero: { eyebrow: "Круглосуточно — из Каира в мир", latest: "Последние новости", breakingNow: "Прямо сейчас", updated: "Обновлено" },
  actions: { readMore: "Читать материал", viewAll: "Смотреть все", justNow: "Только что", minutes: "мин чтения", hours: "ч" },
  search: { placeholder: "Поиск на 30 языках…", title: "Поиск в редакции", noResults: "Ничего не найдено. Попробуйте другое слово.", resultsFor: "Результаты по запросу", tip: "Попробуйте «экономика», «футбол» или «Каир»." },
  agent: { title: "СПРОСИТЕ АГЕНТА", subtitle: "Наш ИИ-агент найдёт историю и обсудит её с вами.", placeholder: "Спросите о сегодняшних новостях…", send: "Отправить", thinking: "Сканируем редакцию…", greet: "Привет, я агент EGY NEWS. Спросите, что происходит, и я мгновенно принесу вам истории.", s1: "Что сейчас в новостях?", s2: "Резюмируй экономические новости", s3: "Расскажи о технологиях в Египте", cited: "Источники", readArticle: "Читать историю" },
  footer: { about: "Независимая многоязычная цифровая новостная станция из Каира. Настоящие истории на 30 языках.", sections: "Разделы", follow: "Следите за станцией", rights: "Все права защищены.", madeBy: "Сделано Romero's Studios" },
  advertise: { title: "Реклама в EGY NEWS", subtitle: "Представьте бренд многоязычной аудитории на 30 языках.", cta: "Забронировать в WhatsApp", contact: "Прямая линия", plan1: "Баннер срочных новостей", plan2: "Размещение в статьях", plan3: "Спонсорские сегменты" },
  common: { latest: "Последние", topStories: "Главное", categories: "Рубрики", readTime: "чтения", byline: "Автор" },
  notFound: { title: "Материал не найден", text: "Страница перемещена или не существует.", home: "На главную" },
  category: { stories: "материалов", other: "Больше в этом разделе" },
};

const tr: Dict = {
  meta: { title: "EGY NEWS — Kahire'den dünya haberleri", description: "EGY NEWS, Kahire'den dünyaya yayın yapan bağımsız bir dijital haber kanalıdır: haberler, siyaset, ekonomi, teknoloji, spor, sağlık ve kültür 30 dilde." },
  nav: { home: "Ana Sayfa", world: "Dünya", politics: "Siyaset", economy: "Ekonomi", technology: "Teknoloji", sports: "Spor", health: "Sağlık", culture: "Kültür", search: "Ara", advertise: "Reklam", menu: "Menü" },
  ticker: { live: "CANLI", breaking: "SON DAKİKA", watchNow: "Şimdi izle" },
  hero: { eyebrow: "7/24 — Kahire'den dünyaya", latest: "Son haberler", breakingNow: "Şu anda", updated: "Güncellendi" },
  actions: { readMore: "Haberi oku", viewAll: "Tümünü gör", justNow: "Az önce", minutes: "dk okuma", hours: "s" },
  search: { placeholder: "30 dilde arayın…", title: "Yazı işlerinde ara", noResults: "Eşleşen haber yok. Farklı bir kelime deneyin.", resultsFor: "Sonuçlar", tip: "«ekonomi», «futbol» veya «Kahire» deneyin." },
  agent: { title: "ACENTEYE SORUN", subtitle: "Yapay zekâ ajanımız haberi bulur ve sizinle konuşur.", placeholder: "Bugünün haberlerini sorun…", send: "Gönder", thinking: "Yazı işleri taranıyor…", greet: "Merhaba, ben EGY NEWS ajanıyım. Neler olduğunu sorun, size hikâyeleri anında getireyim.", s1: "Şu anda ne var?", s2: "Ekonomi haberlerini özetle", s3: "Mısır'daki teknolojiyi anlat", cited: "Kaynaklar", readArticle: "Hikâyeyi oku" },
  footer: { about: "Kahire'den yayın yapan bağımsız, çok dilli dijital haber kanalı. 30 dilde gerçek hikâyeler.", sections: "Bölümler", follow: "Kanalı takip edin", rights: "Tüm hakları saklıdır.", madeBy: "Romero's Studios tarafından yapıldı" },
  advertise: { title: "EGY NEWS ile reklam verin", subtitle: "Markanızı 30 dilde çok dilli bir kitleye taşıyın.", cta: "WhatsApp'tan rezervasyon", contact: "Doğrudan hat", plan1: "Son dakika bandı", plan2: "Makale içi yerleşimler", plan3: "Sponsorlu bölümler" },
  common: { latest: "Son", topStories: "Öne çıkanlar", categories: "Bölümler", readTime: "okuma", byline: "Yazar" },
  notFound: { title: "Haber bulunamadı", text: "Sayfa taşınmış veya hiç var olmamış.", home: "Ana sayfaya dön" },
  category: { stories: "haber", other: "Bu bölümde daha fazlası" },
};

const fa: Dict = {
  meta: { title: "ایجی‌نیوز — اخبار جهان از قاهره", description: "ایجی‌نیوز یک ایستگاه خبری دیجیتال مستقل است که از قاهره به جهان پخش می‌کند: اخبار، سیاست، اقتصاد، فناوری، ورزش، سلامت و فرهنگ در ۳۰ زبان." },
  nav: { home: "خانه", world: "جهان", politics: "سیاست", economy: "اقتصاد", technology: "فناوری", sports: "ورزش", health: "سلامت", culture: "فرهنگ", search: "جستجو", advertise: "تبلیغات", menu: "منو" },
  ticker: { live: "زنده", breaking: "فوری", watchNow: "تماشا کنید" },
  hero: { eyebrow: "شبانه‌روزی — از قاهره تا جهان", latest: "آخرین اخبار", breakingNow: "هم‌اکنون", updated: "به‌روزرسانی شد" },
  actions: { readMore: "خواندن خبر", viewAll: "مشاهده همه", justNow: "لحظاتی پیش", minutes: "دقیقه مطالعه", hours: "ساعت پیش" },
  search: { placeholder: "جستجو در ۳۰ زبان…", title: "جستجو در تحریریه", noResults: "خبری یافت نشد. کلمه دیگری را امتحان کنید.", resultsFor: "نتایج برای", tip: "کلماتی مانند «اقتصاد»، «فوتبال» یا «قاهره» را امتحان کنید." },
  agent: { title: "از عامل بپرسید", subtitle: "عامل هوشمند ما خبر را پیدا می‌کند و درباره آن با شما گفتگو می‌کند.", placeholder: "درباره اخبار امروز بپرسید…", send: "ارسال", thinking: "در حال بررسی تحریریه…", greet: "سلام، من عامل ایجی‌نیوز هستم. بپرسید چه خبر است تا فوراً داستان‌ها را برایتان بیاورم.", s1: "الان چه خبر است؟", s2: "اخبار اقتصادی را خلاصه کن", s3: "از فناوری در مصر بگو", cited: "منابع", readArticle: "خواندن داستان" },
  footer: { about: "ایستگاه خبری دیجیتال مستقل و چندزبانه از قاهره. داستان‌های واقعی در ۳۰ زبان.", sections: "بخش‌ها", follow: "دنبال کنید", rights: "تمام حقوق محفوظ است.", madeBy: "ساخته‌شده توسط رومرو استودیوز" },
  advertise: { title: "تبلیغات در ایجی‌نیوز", subtitle: "برند خود را به مخاطبان چندزبانه در ۳۰ زبان برسانید.", cta: "رزرو در واتساپ", contact: "خط مستقیم", plan1: "بنر اخبار فوری", plan2: "جایگاه درون مقاله", plan3: "بخش‌های حمایت‌شده" },
  common: { latest: "آخرین", topStories: "خبرهای برتر", categories: "دسته‌ها", readTime: "مطالعه", byline: "نویسنده" },
  notFound: { title: "خبر یافت نشد", text: "صفحه منتقل شده یا هرگز وجود نداشته است.", home: "بازگشت به خانه" },
  category: { stories: "خبر", other: "بیشتر در این بخش" },
};

const ur: Dict = {
  meta: { title: "ای جی نیوز — قاہرہ سے دنیا کی خبریں", description: "ای جی نیوز ایک آزاد ڈیجیٹل نیوز اسٹیشن ہے جو قاہرہ سے دنیا تک نشر کرتا ہے: خبریں، سیاست، معیشت، ٹیکنالوجی، کھیل، صحت اور ثقافت 30 زبانوں میں۔" },
  nav: { home: "ہوم", world: "دنیا", politics: "سیاست", economy: "معیشت", technology: "ٹیکنالوجی", sports: "کھیل", health: "صحت", culture: "ثقافت", search: "تلاش", advertise: "اشتہار", menu: "مینو" },
  ticker: { live: "براہ راست", breaking: "بریکنگ", watchNow: "اب دیکھیں" },
  hero: { eyebrow: "چوبیس گھنٹے — قاہرہ سے دنیا تک", latest: "تازہ ترین خبریں", breakingNow: "ابھی", updated: "اپ ڈیٹ شدہ" },
  actions: { readMore: "خبر پڑھیں", viewAll: "سب دیکھیں", justNow: "ابھی ابھی", minutes: "منٹ مطالعہ", hours: "گھنٹے پہلے" },
  search: { placeholder: "30 زبانوں میں تلاش کریں…", title: "نیوز روم میں تلاش کریں", noResults: "کوئی خبر نہیں ملی۔ دوسرا لفظ آزمائیں۔", resultsFor: "نتائج برائے", tip: "«معیشت»، «فٹ بال» یا «قاہرہ» آزمائیں۔" },
  agent: { title: "ایجنٹ سے پوچھیں", subtitle: "ہمارا AI ایجنٹ خبر تلاش کرتا ہے اور آپ سے گفتگو کرتا ہے۔", placeholder: "آج کی خبروں کے بارے میں پوچھیں…", send: "بھیجیں", thinking: "نیوز روم اسکین ہو رہا ہے…", greet: "سلام، میں ای جی نیوز ایجنٹ ہوں۔ پوچھیں کیا خبر ہے، میں فوراً کہانیاں لاتا ہوں۔", s1: "ابھی کیا خبر ہے؟", s2: "اقتصادی خبروں کا خلاصہ کریں", s3: "مصر میں ٹیکنالوجی کے بارے میں بتائیں", cited: "ذرائع", readArticle: "کہانی پڑھیں" },
  footer: { about: "قاہرہ سے نشر ہونے والا ایک آزاد، کثیر لسانی ڈیجیٹل نیوز اسٹیشن۔ 30 زبانوں میں سچی کہانیاں۔", sections: "حصے", follow: "اسٹیشن کو فالو کریں", rights: "جملہ حقوق محفوظ ہیں۔", madeBy: "رومیرو سٹوڈیوز کی تیار کردہ" },
  advertise: { title: "ای جی نیوز میں اشتہار دیں", subtitle: "اپنا برانڈ 30 زبانوں میں کثیر لسانی سامعین تک پہنچائیں۔", cta: "واٹس ایپ پر بکنگ کریں", contact: "براہ راست لائن", plan1: "بریکنگ نیوز بینر", plan2: "مضمون میں اشتہار", plan3: "اسپانسرڈ سیگمنٹس" },
  common: { latest: "تازہ", topStories: "اہم خبریں", categories: "اقسام", readTime: "مطالعہ", byline: "تحریر" },
  notFound: { title: "خبر نہیں ملی", text: "یہ صفحہ منتقل ہو چکا ہے یا کبھی موجود نہیں تھا۔", home: "ہوم پیج پر واپس جائیں" },
  category: { stories: "خبریں", other: "اس حصے میں مزید" },
};

const hi: Dict = {
  meta: { title: "EGY NEWS — काहिरा से दुनिया की खबरें", description: "EGY NEWS एक स्वतंत्र डिजिटल समाचार चैनल है जो काहिरा से दुनिया तक प्रसारित करता है: समाचार, राजनीति, अर्थव्यवस्था, तकनीक, खेल, स्वास्थ्य और संस्कृति 30 भाषाओं में।" },
  nav: { home: "होम", world: "विश्व", politics: "राजनीति", economy: "अर्थव्यवस्था", technology: "तकनीक", sports: "खेल", health: "स्वास्थ्य", culture: "संस्कृति", search: "खोजें", advertise: "विज्ञापन", menu: "मेन्यू" },
  ticker: { live: "लाइव", breaking: "ब्रेकिंग", watchNow: "अभी देखें" },
  hero: { eyebrow: "चौबीसों घंटे — काहिरा से दुनिया तक", latest: "ताज़ा खबरें", breakingNow: "अभी", updated: "अपडेटेड" },
  actions: { readMore: "खबर पढ़ें", viewAll: "सभी देखें", justNow: "अभी", minutes: "मिनट पढ़ें", hours: "घंटे पहले" },
  search: { placeholder: "30 भाषाओं में खोजें…", title: "न्यूज़रूम में खोजें", noResults: "कोई खबर नहीं मिली। कोई दूसरा शब्द आज़माएँ।", resultsFor: "परिणाम", tip: "«अर्थव्यवस्था», «फ़ुटबॉल» या «काहिरा» आज़माएँ।" },
  agent: { title: "एजेंट से पूछें", subtitle: "हमारा AI एजेंट खबर ढूँढ़ता है और आपसे बात करता है।", placeholder: "आज की खबरों के बारे में पूछें…", send: "भेजें", thinking: "न्यूज़रूम स्कैन हो रहा है…", greet: "नमस्ते, मैं EGY NEWS एजेंट हूँ। पूछिए क्या चल रहा है, मैं तुरंत कहानियाँ लाता हूँ।", s1: "अभी क्या खबर है?", s2: "अर्थव्यवस्था की खबरों का सारांश दें", s3: "मिस्र की तकनीक के बारे में बताएँ", cited: "स्रोत", readArticle: "कहानी पढ़ें" },
  footer: { about: "काहिरा से प्रसारित होने वाला एक स्वतंत्र, बहुभाषी डिजिटल समाचार चैनल। 30 भाषाओं में असली कहानियाँ।", sections: "अनुभाग", follow: "चैनल को फ़ॉलो करें", rights: "सर्वाधिकार सुरक्षित।", madeBy: "रोमेरो स्टूडियोज़ द्वारा निर्मित" },
  advertise: { title: "EGY NEWS में विज्ञापन दें", subtitle: "अपना ब्रांड 30 भाषाओं में बहुभाषी दर्शकों तक पहुँचाएँ।", cta: "WhatsApp पर बुक करें", contact: "सीधी लाइन", plan1: "ब्रेकिंग न्यूज़ बैनर", plan2: "लेख में विज्ञापन", plan3: "प्रायोजित सेगमेंट" },
  common: { latest: "ताज़ा", topStories: "मुख्य खबरें", categories: "श्रेणियाँ", readTime: "पढ़ें", byline: "द्वारा" },
  notFound: { title: "खबर नहीं मिली", text: "पृष्ठ स्थानांतरित हो गया है या कभी अस्तित्व में नहीं था।", home: "होम पेज पर वापस जाएँ" },
  category: { stories: "खबरें", other: "इस अनुभाग में और" },
};

const bn: Dict = {
  meta: { title: "EGY NEWS — কায়রো থেকে বিশ্ব সংবাদ", description: "EGY NEWS একটি স্বাধীন ডিজিটাল নিউজ স্টেশন যা কায়রো থেকে বিশ্বে সম্প্রচার করে: সংবাদ, রাজনীতি, অর্থনীতি, প্রযুক্তি, খেলাধুলা, স্বাস্থ্য ও সংস্কৃতি ৩০টি ভাষায়।" },
  nav: { home: "হোম", world: "বিশ্ব", politics: "রাজনীতি", economy: "অর্থনীতি", technology: "প্রযুক্তি", sports: "খেলাধুলা", health: "স্বাস্থ্য", culture: "সংস্কৃতি", search: "অনুসন্ধান", advertise: "বিজ্ঞাপন", menu: "মেনু" },
  ticker: { live: "লাইভ", breaking: "ব্রেকিং", watchNow: "এখনই দেখুন" },
  hero: { eyebrow: "চব্বিশ ঘণ্টা — কায়রো থেকে বিশ্বে", latest: "সর্বশেষ সংবাদ", breakingNow: "এখনই", updated: "আপডেটেড" },
  actions: { readMore: "সংবাদ পড়ুন", viewAll: "সব দেখুন", justNow: "এইমাত্র", minutes: "মিনিট পড়া", hours: "ঘণ্টা আগে" },
  search: { placeholder: "৩০টি ভাষায় খুঁজুন…", title: "নিউজরুমে খুঁজুন", noResults: "কোনো সংবাদ পাওয়া যায়নি। অন্য শব্দ চেষ্টা করুন।", resultsFor: "ফলাফল", tip: "«অর্থনীতি», «ফুটবল» বা «কায়রো» চেষ্টা করুন।" },
  agent: { title: "এজেন্টকে জিজ্ঞেস করুন", subtitle: "আমাদের AI এজেন্ট খবর খুঁজে আনে এবং আপনার সঙ্গে আলোচনা করে।", placeholder: "আজকের সংবাদ নিয়ে প্রশ্ন করুন…", send: "পাঠান", thinking: "নিউজরুম স্ক্যান হচ্ছে…", greet: "হ্যালো, আমি EGY NEWS এজেন্ট। জিজ্ঞেস করুন কী হচ্ছে, আমি সঙ্গে সঙ্গে গল্প নিয়ে আসব।", s1: "এখন কী সংবাদ?", s2: "অর্থনীতির সংবাদ সারসংক্ষেপ করুন", s3: "মিশরের প্রযুক্তি সম্পর্কে বলুন", cited: "সূত্র", readArticle: "গল্প পড়ুন" },
  footer: { about: "কায়রো থেকে সম্প্রচারিত একটি স্বাধীন, বহুভাষিক ডিজিটাল নিউজ স্টেশন। ৩০টি ভাষায় সত্যিকারের গল্প।", sections: "বিভাগ", follow: "স্টেশন অনুসরণ করুন", rights: "সর্বস্বত্ব সংরক্ষিত।", madeBy: "রোমেরো স্টুডিওজ নির্মিত" },
  advertise: { title: "EGY NEWS-এ বিজ্ঞাপন দিন", subtitle: "৩০টি ভাষায় বহুভাষিক দর্শকের কাছে আপনার ব্র্যান্ড পৌঁছান।", cta: "WhatsApp-এ বুক করুন", contact: "সরাসরি লাইন", plan1: "ব্রেকিং নিউজ ব্যানার", plan2: "নিবন্ধে বিজ্ঞাপন", plan3: "স্পনসরড সেগমেন্ট" },
  common: { latest: "সর্বশেষ", topStories: "শীর্ষ সংবাদ", categories: "বিভাগ", readTime: "পড়া", byline: "লেখক" },
  notFound: { title: "সংবাদ পাওয়া যায়নি", text: "পৃষ্ঠাটি সরানো হয়েছে বা কখনো ছিল না।", home: "হোমপেজে ফিরুন" },
  category: { stories: "সংবাদ", other: "এই বিভাগে আরও" },
};

const zh: Dict = {
  meta: { title: "EGY NEWS — 来自开罗的世界新闻", description: "EGY NEWS 是一家独立的数字新闻台，从开罗向世界播出：新闻、政治、经济、科技、体育、健康与文化，覆盖30种语言。" },
  nav: { home: "首页", world: "世界", politics: "政治", economy: "经济", technology: "科技", sports: "体育", health: "健康", culture: "文化", search: "搜索", advertise: "广告", menu: "菜单" },
  ticker: { live: "直播", breaking: "突发", watchNow: "立即观看" },
  hero: { eyebrow: "全天候 — 从开罗到世界", latest: "最新新闻", breakingNow: "此时此刻", updated: "已更新" },
  actions: { readMore: "阅读新闻", viewAll: "查看全部", justNow: "刚刚", minutes: "分钟阅读", hours: "小时前" },
  search: { placeholder: "搜索30种语言…", title: "在编辑部搜索", noResults: "没有匹配的新闻，请尝试其他关键词。", resultsFor: "搜索结果", tip: "试试「经济」「足球」或「开罗」。" },
  agent: { title: "咨询AI助手", subtitle: "我们的AI助手为您找到新闻并一起讨论。", placeholder: "询问今日新闻…", send: "发送", thinking: "正在扫描编辑部…", greet: "你好，我是EGY NEWS助手。问我正在发生什么，我会立刻为你带来报道。", s1: "现在有什么突发新闻？", s2: "总结经济新闻", s3: "讲讲埃及的科技", cited: "来源", readArticle: "阅读报道" },
  footer: { about: "一家从开罗播出的独立多语言数字新闻台。用30种语言讲述真实故事。", sections: "栏目", follow: "关注新闻台", rights: "版权所有。", madeBy: "Romero's Studios 出品" },
  advertise: { title: "与EGY NEWS合作广告", subtitle: "让您的品牌覆盖30种语言的多语种受众。", cta: "通过WhatsApp预订", contact: "直拨热线", plan1: "突发新闻横幅", plan2: "文章内广告位", plan3: "赞助栏目" },
  common: { latest: "最新", topStories: "头条", categories: "栏目", readTime: "阅读", byline: "作者" },
  notFound: { title: "未找到报道", text: "该页面已被移动或从未存在。", home: "返回首页" },
  category: { stories: "篇报道", other: "本栏目更多" },
};

const zhTW: Dict = {
  meta: { title: "EGY NEWS — 來自開羅的世界新聞", description: "EGY NEWS 是一家獨立的數位新聞台，從開羅向世界播出：新聞、政治、經濟、科技、體育、健康與文化，涵蓋30種語言。" },
  nav: { home: "首頁", world: "世界", politics: "政治", economy: "經濟", technology: "科技", sports: "體育", health: "健康", culture: "文化", search: "搜尋", advertise: "廣告", menu: "選單" },
  ticker: { live: "直播", breaking: "突發", watchNow: "立即觀看" },
  hero: { eyebrow: "全天候 — 從開羅到世界", latest: "最新新聞", breakingNow: "此時此刻", updated: "已更新" },
  actions: { readMore: "閱讀新聞", viewAll: "查看全部", justNow: "剛剛", minutes: "分鐘閱讀", hours: "小時前" },
  search: { placeholder: "搜尋30種語言…", title: "在編輯部搜尋", noResults: "沒有相符的新聞，請嘗試其他關鍵詞。", resultsFor: "搜尋結果", tip: "試試「經濟」「足球」或「開羅」。" },
  agent: { title: "諮詢AI助手", subtitle: "我們的AI助手為您找到新聞並一起討論。", placeholder: "詢問今日新聞…", send: "傳送", thinking: "正在掃描編輯部…", greet: "你好，我是EGY NEWS助手。問我正在發生什麼，我會立刻為你帶來報導。", s1: "現在有什麼突發新聞？", s2: "總結經濟新聞", s3: "講講埃及的科技", cited: "來源", readArticle: "閱讀報導" },
  footer: { about: "一家從開羅播出的獨立多語言數位新聞台。用30種語言講述真實故事。", sections: "欄目", follow: "關注新聞台", rights: "版權所有。", madeBy: "Romero's Studios 出品" },
  advertise: { title: "與EGY NEWS合作廣告", subtitle: "讓您的品牌覆蓋30種語言的多語種受眾。", cta: "透過WhatsApp預訂", contact: "直撥熱線", plan1: "突發新聞橫幅", plan2: "文章內廣告位", plan3: "贊助欄目" },
  common: { latest: "最新", topStories: "頭條", categories: "欄目", readTime: "閱讀", byline: "作者" },
  notFound: { title: "未找到報導", text: "該頁面已被移動或從未存在。", home: "返回首頁" },
  category: { stories: "篇報導", other: "本欄目更多" },
};

const ja: Dict = {
  meta: { title: "EGY NEWS — カイロから世界へ", description: "EGY NEWS はカイロから世界へ放送する独立系デジタルニュース局です。ニュース、政治、経済、テクノロジー、スポーツ、健康、文化を30言語でお届けします。" },
  nav: { home: "ホーム", world: "世界", politics: "政治", economy: "経済", technology: "テクノロジー", sports: "スポーツ", health: "健康", culture: "文化", search: "検索", advertise: "広告", menu: "メニュー" },
  ticker: { live: "ライブ", breaking: "速報", watchNow: "今すぐ見る" },
  hero: { eyebrow: "24時間 — カイロから世界へ", latest: "最新ニュース", breakingNow: "いま", updated: "更新済み" },
  actions: { readMore: "記事を読む", viewAll: "すべて見る", justNow: "たった今", minutes: "分で読了", hours: "時間前" },
  search: { placeholder: "30言語で検索…", title: "編集部を検索", noResults: "一致するニュースがありません。別のキーワードをお試しください。", resultsFor: "検索結果", tip: "「経済」「サッカー」「カイロ」などを試してください。" },
  agent: { title: "エージェントに質問", subtitle: "AIエージェントが記事を見つけ、あなたと対話します。", placeholder: "今日のニュースを質問…", send: "送信", thinking: "編集部をスキャン中…", greet: "こんにちは、EGY NEWSエージェントです。何が起きているか聞いてください。すぐに記事をお届けします。", s1: "いま何が起きていますか？", s2: "経済ニュースを要約して", s3: "エジプトのテクノロジーを教えて", cited: "情報源", readArticle: "記事を読む" },
  footer: { about: "カイロから発信する独立系・多言語デジタルニュース局。30言語で本当の物語を。", sections: "セクション", follow: "ニュース局をフォロー", rights: "無断転載を禁じます。", madeBy: "Romero's Studios 制作" },
  advertise: { title: "EGY NEWSで広告掲載", subtitle: "30言語の多言語オーディエンスにブランドを届けます。", cta: "WhatsAppで予約", contact: "直通回線", plan1: "速報バナー", plan2: "記事内広告", plan3: "スポンサーセグメント" },
  common: { latest: "最新", topStories: "トップ", categories: "カテゴリー", readTime: "読了", byline: "著者" },
  notFound: { title: "記事が見つかりません", text: "ページは移動されたか、存在しません。", home: "ホームへ戻る" },
  category: { stories: "記事", other: "このセクションの詳細" },
};

const ko: Dict = {
  meta: { title: "EGY NEWS — 카이로에서 보는 세계 뉴스", description: "EGY NEWS는 카이로에서 전 세계로 방송하는 독립 디지털 뉴스 스테이션입니다. 뉴스, 정치, 경제, 기술, 스포츠, 건강, 문화를 30개 언어로 제공합니다." },
  nav: { home: "홈", world: "세계", politics: "정치", economy: "경제", technology: "기술", sports: "스포츠", health: "건강", culture: "문화", search: "검색", advertise: "광고", menu: "메뉴" },
  ticker: { live: "라이브", breaking: "속보", watchNow: "지금 보기" },
  hero: { eyebrow: "24시간 — 카이로에서 세계로", latest: "최신 뉴스", breakingNow: "지금", updated: "업데이트됨" },
  actions: { readMore: "기사 읽기", viewAll: "전체 보기", justNow: "방금", minutes: "분 소요", hours: "시간 전" },
  search: { placeholder: "30개 언어로 검색…", title: "편집국에서 검색", noResults: "일치하는 기사가 없습니다. 다른 단어를 시도하세요.", resultsFor: "검색 결과", tip: "‘경제’, ‘축구’, ‘카이로’ 등을 시도해 보세요." },
  agent: { title: "에이전트에게 물어보기", subtitle: "AI 에이전트가 기사를 찾아 함께 이야기합니다.", placeholder: "오늘의 뉴스를 물어보세요…", send: "보내기", thinking: "편집국을 스캔하는 중…", greet: "안녕하세요, EGY NEWS 에이전트입니다. 무슨 일이 일어나고 있는지 물어보세요. 즉시 기사를 가져오겠습니다.", s1: "지금 무슨 일이 있나요?", s2: "경제 뉴스를 요약해 줘", s3: "이집트의 기술에 대해 알려줘", cited: "출처", readArticle: "기사 읽기" },
  footer: { about: "카이로에서 방송하는 독립적이고 다국어 지원 디지털 뉴스 스테이션. 30개 언어로 진짜 이야기를 전합니다.", sections: "섹션", follow: "스테이션 팔로우", rights: "모든 권리 보유.", madeBy: "Romero's Studios 제작" },
  advertise: { title: "EGY NEWS에서 광고하기", subtitle: "30개 언어의 다국어 사용자에게 브랜드를 알리세요.", cta: "WhatsApp으로 예약", contact: "직통", plan1: "속보 배너", plan2: "기사 내 광고", plan3: "스폰서 세그먼트" },
  common: { latest: "최신", topStories: "주요 기사", categories: "카테고리", readTime: "읽기", byline: "작성자" },
  notFound: { title: "기사를 찾을 수 없습니다", text: "페이지가 이동되었거나 존재하지 않습니다.", home: "홈으로 돌아가기" },
  category: { stories: "기사", other: "이 섹션에서 더 보기" },
};

const id: Dict = {
  meta: { title: "EGY NEWS — Berita dunia dari Kairo", description: "EGY NEWS adalah stasiun berita digital independen yang menyiarkan dari Kairo ke dunia: berita, politik, ekonomi, teknologi, olahraga, kesehatan, dan budaya dalam 30 bahasa." },
  nav: { home: "Beranda", world: "Dunia", politics: "Politik", economy: "Ekonomi", technology: "Teknologi", sports: "Olahraga", health: "Kesehatan", culture: "Budaya", search: "Cari", advertise: "Iklan", menu: "Menu" },
  ticker: { live: "LANGSUNG", breaking: "BERITA TERKINI", watchNow: "Tonton sekarang" },
  hero: { eyebrow: "24 jam — dari Kairo ke dunia", latest: "Berita terbaru", breakingNow: "Saat ini", updated: "Diperbarui" },
  actions: { readMore: "Baca berita", viewAll: "Lihat semua", justNow: "Baru saja", minutes: "menit baca", hours: "jam lalu" },
  search: { placeholder: "Cari dalam 30 bahasa…", title: "Cari di ruang redaksi", noResults: "Tidak ada berita yang cocok. Coba kata lain.", resultsFor: "Hasil untuk", tip: "Coba kata seperti 'ekonomi', 'sepak bola', atau 'Kairo'." },
  agent: { title: "TANYA AGEN", subtitle: "Agen AI kami menemukan beritanya dan membahasnya bersama Anda.", placeholder: "Tanyakan berita hari ini…", send: "Kirim", thinking: "Memindai ruang redaksi…", greet: "Halo, saya agen EGY NEWS. Tanyakan apa yang sedang terjadi, dan saya akan membawakan beritanya seketika.", s1: "Apa berita terbaru sekarang?", s2: "Ringkas berita ekonomi", s3: "Ceritakan teknologi di Mesir", cited: "Sumber", readArticle: "Baca berita" },
  footer: { about: "Stasiun berita digital independen dan multibahasa dari Kairo. Kisah nyata dalam 30 bahasa.", sections: "Bagian", follow: "Ikuti stasiun", rights: "Hak cipta dilindungi.", madeBy: "Dibuat oleh Romero's Studios" },
  advertise: { title: "Beriklan dengan EGY NEWS", subtitle: "Tunjukkan merek Anda kepada audiens multibahasa dalam 30 bahasa.", cta: "Pesan lewat WhatsApp", contact: "Jalur langsung", plan1: "Banner berita terkini", plan2: "Penempatan dalam artikel", plan3: "Segmen bersponsor" },
  common: { latest: "Terbaru", topStories: "Berita utama", categories: "Kategori", readTime: "baca", byline: "Oleh" },
  notFound: { title: "Berita tidak ditemukan", text: "Halaman telah dipindahkan atau tidak pernah ada.", home: "Kembali ke beranda" },
  category: { stories: "berita", other: "Lebih banyak di bagian ini" },
};

const ms: Dict = {
  meta: { title: "EGY NEWS — Berita dunia dari Kaherah", description: "EGY NEWS ialah stesen berita digital bebas yang bersiaran dari Kaherah ke dunia: berita, politik, ekonomi, teknologi, sukan, kesihatan dan budaya dalam 30 bahasa." },
  nav: { home: "Utama", world: "Dunia", politics: "Politik", economy: "Ekonomi", technology: "Teknologi", sports: "Sukan", health: "Kesihatan", culture: "Budaya", search: "Cari", advertise: "Iklan", menu: "Menu" },
  ticker: { live: "LANGSUNG", breaking: "MENCURI PERHATIAN", watchNow: "Tonton sekarang" },
  hero: { eyebrow: "24 jam — dari Kaherah ke dunia", latest: "Berita terkini", breakingNow: "Sekarang", updated: "Dikemas kini" },
  actions: { readMore: "Baca berita", viewAll: "Lihat semua", justNow: "Baru sahaja", minutes: "minit baca", hours: "jam lalu" },
  search: { placeholder: "Cari dalam 30 bahasa…", title: "Cari di bilik berita", noResults: "Tiada berita sepadan. Cuba perkataan lain.", resultsFor: "Hasil untuk", tip: "Cuba 'ekonomi', 'bola sepak' atau 'Kaherah'." },
  agent: { title: "TANYA AGEN", subtitle: "Agen AI kami mencari cerita dan membincangkannya dengan anda.", placeholder: "Tanya tentang berita hari ini…", send: "Hantar", thinking: "Mengimbas bilik berita…", greet: "Halo, saya agen EGY NEWS. Tanyakan apa yang berlaku dan saya bawa ceritanya segera.", s1: "Apa berita terkini sekarang?", s2: "Ringkaskan berita ekonomi", s3: "Ceritakan teknologi di Mesir", cited: "Sumber", readArticle: "Baca cerita" },
  footer: { about: "Stesen berita digital bebas dan pelbagai bahasa dari Kaherah. Kisah sebenar dalam 30 bahasa.", sections: "Bahagian", follow: "Ikuti stesen", rights: "Hak cipta terpelihara.", madeBy: "Dicipta oleh Romero's Studios" },
  advertise: { title: "Iklan dengan EGY NEWS", subtitle: "Bawa jenama anda kepada khalayak pelbagai bahasa dalam 30 bahasa.", cta: "Tempah melalui WhatsApp", contact: "Talian terus", plan1: "Sepanduk berita terkini", plan2: "Penempatan dalam artikel", plan3: "Segmen tajaan" },
  common: { latest: "Terkini", topStories: "Berita utama", categories: "Kategori", readTime: "baca", byline: "Oleh" },
  notFound: { title: "Cerita tidak ditemui", text: "Halaman telah dipindahkan atau tidak pernah wujud.", home: "Kembali ke laman utama" },
  category: { stories: "cerita", other: "Lagi dalam bahagian ini" },
};

const vi: Dict = {
  meta: { title: "EGY NEWS — Tin tức thế giới từ Cairo", description: "EGY NEWS là kênh tin tức kỹ thuật số độc lập phát sóng từ Cairo ra thế giới: tin tức, chính trị, kinh tế, công nghệ, thể thao, sức khỏe và văn hóa bằng 30 ngôn ngữ." },
  nav: { home: "Trang chủ", world: "Thế giới", politics: "Chính trị", economy: "Kinh tế", technology: "Công nghệ", sports: "Thể thao", health: "Sức khỏe", culture: "Văn hóa", search: "Tìm kiếm", advertise: "Quảng cáo", menu: "Menu" },
  ticker: { live: "TRỰC TIẾP", breaking: "TIN NÓNG", watchNow: "Xem ngay" },
  hero: { eyebrow: "24 giờ — từ Cairo ra thế giới", latest: "Tin mới nhất", breakingNow: "Ngay lúc này", updated: "Đã cập nhật" },
  actions: { readMore: "Đọc tin", viewAll: "Xem tất cả", justNow: "Vừa xong", minutes: "phút đọc", hours: "giờ trước" },
  search: { placeholder: "Tìm kiếm trong 30 ngôn ngữ…", title: "Tìm kiếm trong tòa soạn", noResults: "Không có tin tức nào khớp. Thử từ khóa khác.", resultsFor: "Kết quả cho", tip: "Thử 'kinh tế', 'bóng đá' hoặc 'Cairo'." },
  agent: { title: "HỎI TRỢ LÝ AI", subtitle: "Trợ lý AI của chúng tôi tìm tin và trao đổi cùng bạn.", placeholder: "Hỏi về tin tức hôm nay…", send: "Gửi", thinking: "Đang quét tòa soạn…", greet: "Xin chào, tôi là trợ lý EGY NEWS. Hãy hỏi điều gì đang xảy ra, tôi sẽ mang tin đến ngay.", s1: "Có tin gì nóng ngay bây giờ?", s2: "Tóm tắt tin tức kinh tế", s3: "Kể về công nghệ ở Ai Cập", cited: "Nguồn", readArticle: "Đọc bài" },
  footer: { about: "Kênh tin tức kỹ thuật số độc lập, đa ngôn ngữ phát sóng từ Cairo. Những câu chuyện thật bằng 30 ngôn ngữ.", sections: "Chuyên mục", follow: "Theo dõi kênh", rights: "Đã đăng ký bản quyền.", madeBy: "Tạo bởi Romero's Studios" },
  advertise: { title: "Quảng cáo cùng EGY NEWS", subtitle: "Đưa thương hiệu của bạn đến khán giả đa ngôn ngữ bằng 30 ngôn ngữ.", cta: "Đặt qua WhatsApp", contact: "Đường dây trực tiếp", plan1: "Banner tin nóng", plan2: "Vị trí trong bài viết", plan3: "Phân đoạn tài trợ" },
  common: { latest: "Mới nhất", topStories: "Tin nổi bật", categories: "Chuyên mục", readTime: "đọc", byline: "Bởi" },
  notFound: { title: "Không tìm thấy bài", text: "Trang đã được di chuyển hoặc chưa từng tồn tại.", home: "Về trang chủ" },
  category: { stories: "bài", other: "Xem thêm trong chuyên mục" },
};

const th: Dict = {
  meta: { title: "EGY NEWS — ข่าวโลกจากไคโร", description: "EGY NEWS เป็นสถานีข่าวดิจิทัลอิสระที่ออกอากาศจากไคโรสู่โลก: ข่าว การเมือง เศรษฐกิจ เทคโนโลยี กีฬา สุขภาพ และวัฒนธรรม ใน 30 ภาษา" },
  nav: { home: "หน้าแรก", world: "โลก", politics: "การเมือง", economy: "เศรษฐกิจ", technology: "เทคโนโลยี", sports: "กีฬา", health: "สุขภาพ", culture: "วัฒนธรรม", search: "ค้นหา", advertise: "โฆษณา", menu: "เมนู" },
  ticker: { live: "สด", breaking: "ด่วน", watchNow: "ดูเลย" },
  hero: { eyebrow: "ตลอด 24 ชั่วโมง — จากไคโรสู่โลก", latest: "ข่าวล่าสุด", breakingNow: "ขณะนี้", updated: "อัปเดตแล้ว" },
  actions: { readMore: "อ่านข่าว", viewAll: "ดูทั้งหมด", justNow: "เมื่อสักครู่", minutes: "นาทีอ่าน", hours: "ชม.ก่อน" },
  search: { placeholder: "ค้นหาใน 30 ภาษา…", title: "ค้นหาในห้องข่าว", noResults: "ไม่พบข่าวที่ตรงกัน ลองคำอื่น", resultsFor: "ผลลัพธ์สำหรับ", tip: "ลอง 'เศรษฐกิจ' 'ฟุตบอล' หรือ 'ไคโร'" },
  agent: { title: "ถามเอเจนต์ AI", subtitle: "เอเจนต์ AI ของเราช่วยหาข่าวและพูดคุยกับคุณ", placeholder: "ถามเกี่ยวกับข่าววันนี้…", send: "ส่ง", thinking: "กำลังสแกนห้องข่าว…", greet: "สวัสดี ฉันคือเอเจนต์ EGY NEWS ถามว่ามีอะไรเกิดขึ้น แล้วฉันจะนำข่าวมาให้ทันที", s1: "ตอนนี้มีข่าวด่วนอะไร?", s2: "สรุปข่าวเศรษฐกิจ", s3: "เล่าเรื่องเทคโนโลยีในอียิปต์", cited: "แหล่งข่าว", readArticle: "อ่านข่าว" },
  footer: { about: "สถานีข่าวดิจิทัลอิสระและหลายภาษาจากไคโร เรื่องจริงใน 30 ภาษา", sections: "หมวดหมู่", follow: "ติดตามสถานี", rights: "สงวนลิขสิทธิ์", madeBy: "สร้างโดย Romero's Studios" },
  advertise: { title: "โฆษณากับ EGY NEWS", subtitle: "นำแบรนด์ของคุณสู่ผู้ชมหลากภาษาใน 30 ภาษา", cta: "จองผ่าน WhatsApp", contact: "สายตรง", plan1: "แบนเนอร์ข่าวด่วน", plan2: "พื้นที่ในบทความ", plan3: "เซ็กเมนต์สปอนเซอร์" },
  common: { latest: "ล่าสุด", topStories: "ข่าวเด่น", categories: "หมวดหมู่", readTime: "อ่าน", byline: "โดย" },
  notFound: { title: "ไม่พบข่าว", text: "หน้านี้ถูกย้ายหรือไม่เคยมีอยู่", home: "กลับหน้าหลัก" },
  category: { stories: "ข่าว", other: "เพิ่มเติมในหมวดนี้" },
};

const sw: Dict = {
  meta: { title: "EGY NEWS — Habari za dunia kutoka Cairo", description: "EGY NEWS ni kituo cha habari cha kidijitali kinachojitegemea kinachotangaza kutoka Cairo hadi ulimwenguni: habari, siasa, uchumi, teknolojia, michezo, afya na utamaduni katika lugha 30." },
  nav: { home: "Nyumbani", world: "Dunia", politics: "Siasa", economy: "Uchumi", technology: "Teknolojia", sports: "Michezo", health: "Afya", culture: "Utamaduni", search: "Tafuta", advertise: "Tangaza", menu: "Menyu" },
  ticker: { live: "MOJA KWA MOJA", breaking: "HARAKA", watchNow: "Tazama sasa" },
  hero: { eyebrow: "Saa 24 — kutoka Cairo hadi ulimwenguni", latest: "Habari za karibuni", breakingNow: "Hivi sasa", updated: "Imesasishwa" },
  actions: { readMore: "Soma habari", viewAll: "Ona zote", justNow: "Muda mfupi uliopita", minutes: "dakika kusoma", hours: "saa zilizopita" },
  search: { placeholder: "Tafuta kwa lugha 30…", title: "Tafuta katika chumba cha habari", noResults: "Hakuna habari iliyolingana. Jaribu neno lingine.", resultsFor: "Matokeo ya", tip: "Jaribu 'uchumi', 'mpira' au 'Cairo'." },
  agent: { title: "ULIZA WAKALA", subtitle: "Wakala wetu wa AI hupata habari na kuzungumza nawe juu yake.", placeholder: "Uliza kuhusu habari za leo…", send: "Tuma", thinking: "Inachanganua chumba cha habari…", greet: "Habari, mimi ni wakala wa EGY NEWS. Niulize kinachoendelea na nitaleta habari mara moja.", s1: "Kuna habari gani sasa hivi?", s2: "Fupisha habari za uchumi", s3: "Niambie kuhusu teknolojia nchini Misri", cited: "Vyanzo", readArticle: "Soma habari" },
  footer: { about: "Kituo cha habari cha kidijitali kinachojitegemea, cha lugha nyingi kutoka Cairo. Hadithi za kweli kwa lugha 30.", sections: "Sehemu", follow: "Fuata kituo", rights: "Haki zote zimehifadhiwa.", madeBy: "Imetengenezwa na Romero's Studios" },
  advertise: { title: "Tangaza na EGY NEWS", subtitle: "Leta chapa yako kwa hadhira ya lugha nyingi katika lugha 30.",     cta: "WeKa nafasi kupitia WhatsApp", contact: "Mstari wa moja kwa moja", plan1: "Bendera ya habari za haraka", plan2: "Nafasi ndani ya makala", plan3: "Sehemu zinazofadhiliwa" },
  common: { latest: "Karibuni", topStories: "Habari kuu", categories: "Kategoria", readTime: "kusoma", byline: "Na" },
  notFound: { title: "Habari haijapatikana", text: "Ukurasa umehamishwa au haujawahi kuwepo.", home: "Rudi kwenye ukurasa wa mwanzo" },
  category: { stories: "habari", other: "Zaidi katika sehemu hii" },
};

const ha: Dict = {
  meta: { title: "EGY NEWS — Labaran duniya daga Alkahira", description: "EGY NEWS tashar labarai ce ta dijital mai zaman kanta da ke watsa daga Alkahira zuwa duniya: labarai, siyasa, tattalin arziki, fasaha, wasanni, lafiya da al'adu cikin harsuna 30." },
  nav: { home: "Gida", world: "Duniya", politics: "Siyasa", economy: "Tattalin arziki", technology: "Fasaha", sports: "Wasanni", health: "Lafiya", culture: "Al'adu", search: "Nema", advertise: "Tallata", menu: "Menu" },
  ticker: { live: "KAI TSAYE", breaking: "GAGGABAWA", watchNow: "Duba yanzu" },
  hero: { eyebrow: "Sawowi 24 — daga Alkahira zuwa duniya", latest: "Sabbin labarai", breakingNow: "Yanzu haka", updated: "An sabunta" },
  actions: { readMore: "Karanta labari", viewAll: "Duba duka", justNow: "Yanzun nan", minutes: "mintuna karantawa", hours: "sa'o'i da suka wuce" },
  search: { placeholder: "Nema cikin harsuna 30…", title: "Nema a dakin labarai", noResults: "Babu labarin da ya dace. Gwada wata kalma.", resultsFor: "Sakamako na", tip: "Gwada 'tattalin arziki', 'kwallon kafa' ko 'Alkahira'." },
  agent: { title: "TAMBAYI WAKILIN", subtitle: "Wakilinmu na AI yana nemo labari ya tattauna da kai.", placeholder: "Tambayi labaran yau…", send: "Aika", thinking: "Ana duba dakin labarai…", greet: "Sannu, ni wakilin EGY NEWS ne. Tambaye ni abin da ke faruwa, zan kawo maka labarai nan take.", s1: "Mene ne labari yanzu?", s2: "Taƙaita labaran tattalin arziki", s3: "Fada min game da fasaha a Masar", cited: "Majiyoyi", readArticle: "Karanta labari" },
  footer: { about: "Tashar labarai ta dijital mai zaman kanta da harsuna da yawa daga Alkahira. Labarai na gaskiya cikin harsuna 30.", sections: "Sassan", follow: "Bi tashar", rights: "Duk hakki ya tabbata.", madeBy: "Wanda Romero's Studios ya yi" },
  advertise: { title: "Yi talla tare da EGY NEWS", subtitle: "Ka kai alamar kasuwanka ga masu sauraro na harsuna da yawa a cikin harsuna 30.", cta: "Rijista ta WhatsApp", contact: "Layin kai tsaye", plan1: "Banner na gaggawa", plan2: "Wurare a cikin labarai", plan3: "Sassan da aka dauki nauyi" },
  common: { latest: "Sabbi", topStories: "Manyan labarai", categories: "Bangarori", readTime: "karantawa", byline: "Daga" },
  notFound: { title: "Ba a sami labari ba", text: "Shafin ya koma ko kuma bai taba wanzuwa ba.", home: "Komawa gida" },
  category: { stories: "labarai", other: "Kara a wannan sashe" },
};

const yo: Dict = {
  meta: { title: "EGY NEWS — Àwọn ìròyìn àgbáyé láti Cairo", description: "EGY NEWS jẹ́ ilé iṣẹ́ ìròyìn oníṣiro olómìnira tí ń tànkálẹ̀ láti Cairo dé àgbáyé: ìròyìn, ìṣèlú, ètò ọrọ̀-ajé, ìmọ̀-ẹ̀rọ, eré-ìdárayá, ìlera àti àṣà ní àwọn èdè 30." },
  nav: { home: "Ile", world: "Àgbáyé", politics: "Ìṣèlú", economy: "Ètò ọrọ̀-ajé", technology: "Ìmọ̀-ẹ̀rọ", sports: "Eré-ìdárayá", health: "Ìlera", culture: "Àṣà", search: "Ṣàwárí", advertise: "Ìpolówó", menu: "Àkójọ" },
  ticker: { live: "TÀÀRÀ", breaking: "PÀJÁWỊRỊ", watchNow: "Wo báyìí" },
  hero: { eyebrow: "Wákàtí 24 — láti Cairo dé àgbáyé", latest: "Àwọn ìròyìn tuntun", breakingNow: "Lọ́wọ́ báyìí", updated: "Imudojuiwọn" },
  actions: { readMore: "Ka ìròyìn", viewAll: "Wo gbogbo rẹ̀", justNow: "Ṣẹ̀ṣẹ̀", minutes: "ìṣẹ́jú kíkà", hours: "wákàtí séyìn" },
  search: { placeholder: "Ṣàwárí ní èdè 30…", title: "Ṣàwárí nínú yàrá ìròyìn", noResults: "Kò sí ìròyìn tó bá àwárí. Gbìyànjú ọ̀rọ̀ mìíràn.", resultsFor: "Àbájáde fún", tip: "Gbìyànjú 'ètò ọrọ̀-ajé', 'bọ́ọ̀lù' tàbí 'Cairo'." },
  agent: { title: "BÉÈRÈ AṢẸ́DÁ", subtitle: "Aṣẹ́dá AI wa rí ìtàn náà ó sì bá ọ sọ̀rọ̀.", placeholder: "Béèrè nípa ìròyìn òní…", send: "Ránṣẹ́", thinking: "Ṣíṣàyẹ̀wò yàrá ìròyìn…", greet: "Pẹ̀lẹ́, èmi ni aṣẹ́dá EGY NEWS. Béèrè ohun tó ń ṣẹlẹ̀, èmi ó mú àwọn ìtàn wá fún ọ lẹ́sẹ̀kẹsẹ̀.", s1: "Kí ni ìròyìn báyìí?", s2: "Ṣàkópọ̀ àwọn ìròyìn ètò ọrọ̀-ajé", s3: "Sọ fún mi nípa ìmọ̀-ẹ̀rọ ní Egypt", cited: "Àwọn orísun", readArticle: "Ka ìtàn náà" },
  footer: { about: "Ilé iṣẹ́ ìròyìn oníṣiro olómìnira, oní-lóyèṣe láti Cairo. Àwọn ìtàn gidi ní èdè 30.", sections: "Àwọn apá", follow: "Tẹ̀lé ilé iṣẹ́ náà", rights: "Gbogbo ẹ̀tọ́ ní ojú." , madeBy: "Ti Romero's Studios ṣe" },
  advertise: { title: "Kópolówó pẹ̀lú EGY NEWS", subtitle: "Mú àmì ọjà rẹ dé ọ̀dọ̀ àwọn oní-lóyèṣe ní èdè 30.", cta: "Fì àdúgbò múlẹ̀ lórí WhatsApp", contact: "Láìlàbọ́", plan1: "Banner ìròyìn pàjáwịrị", plan2: "Àwọn ibùdó nínú ìwé", plan3: "Àwọn apá onígbàgbọ́" },
  common: { latest: "Tuntun", topStories: "Àwọn ìtàn pàtàkì", categories: "Àwọn apá", readTime: "kíkà", byline: "Láti ọwọ́" },
  notFound: { title: "A kò rí ìtàn", text: "Ojúewé náà ti kúrò tàbí kò sí rí.", home: "Padà sí ojúewé àkọ́kọ́" },
  category: { stories: "ìtàn", other: "Síwájú síi nínú apá yìí" },
};

const ig: Dict = {
  meta: { title: "EGY NEWS — Akụkọ ụwa site na Cairo", description: "EGY NEWS bụ ụlọ akụkọ dijitalụ nweere onwe ya nke na-agbasa site na Cairo gaa n'ụwa: akụkọ, ndọrọ ndọrọ ọchịchị, akụ na ụba, teknụzụ, egwuregwu, ahụike na omenala n'asụsụ 30." },
  nav: { home: "Ụlọ", world: "Ụwa", politics: "Ọchịchị", economy: "Akụ na ụba", technology: "Teknụzụ", sports: "Egwuregwu", health: "Ahụike", culture: "Omenala", search: "Chọọ", advertise: "Mgbasa", menu: "Menu" },
  ticker: { live: "NDỤ", breaking: "AKỤKỌ ỌHỤRỤ", watchNow: "Lee ugbu a" },
  hero: { eyebrow: "Elekere 24 — site na Cairo gaa n'ụwa", latest: "Akụkọ ọhụrụ", breakingNow: "Ugbu a", updated: "Emelite" },
  actions: { readMore: "Gụọ akụkọ", viewAll: "Hụ ihe niile", justNow: "Obere oge gara", minutes: "nkeji ịgụ", hours: "awa gara" },
  search: { placeholder: "Chọọ n'asụsụ 30…", title: "Chọọ n'ime ụlọ akụkọ", noResults: "Enweghị akụkọ dabara. Nwaa okwu ọzọ.", resultsFor: "Nsonaazụ maka", tip: "Nwaa 'akụ na ụba', 'bọọlụ' ma ọ bụ 'Cairo'." },
  agent: { title: "JUO ONYINYERE", subtitle: "Onyinyere AI anyị na-achọta akụkọ ma na-agwa gị okwu.", placeholder: "Jụọ maka akụkọ taa…", send: "Ziga", thinking: "Na-enyocha ụlọ akụkọ…", greet: "Ndewo, abụ m onyinyere EGY NEWS. Jụọ m ihe na-eme, m ga-ewetara gị akụkọ ozugbo.", s1: "Gịnị na-eme ugbu a?", s2: "Chịkọta akụkọ akụ na ụba", s3: "Gwa m maka teknụzụ na Egypt", cited: "Isi mmalite", readArticle: "Gụọ akụkọ" },
  footer: { about: "Ụlọ akụkọ dijitalụ nweere onwe ya, asụsụ dị iche iche site na Cairo. Ezi akụkọ n'asụsụ 30.", sections: "Ngalaba", follow: "Soro ụlọ akụkọ", rights: "Echekwara ikike niile.", madeBy: "Romero's Studios mere" },
  advertise: { title: "Mgbasa na EGY NEWS", subtitle: "Buru akara gị gaa n'ihu ndị na-asụ asụsụ dị iche iche n'asụsụ 30.", cta: "Debe n'akara na WhatsApp", contact: "Ahịrị ozugbo", plan1: "Banner akụkọ ọhụrụ", plan2: "Ebe n'ime ederede", plan3: "Ngalaba akwadoro" },
  common: { latest: "Ọhụrụ", topStories: "Akụkọ dị ịrịba ama", categories: "Ngalaba", readTime: "ịgụ", byline: "Site na" },
  notFound: { title: "Ahụghị akụkọ", text: "Ibe a ebugharịala ma ọ bụ dịbeghị.", home: "Laghachi na ibe mbụ" },
  category: { stories: "akụkọ", other: "Ọzọ na ngalaba a" },
};

const el: Dict = {
  meta: { title: "EGY NEWS — Παγκόσμιες ειδήσεις από το Κάιρο", description: "Το EGY NEWS είναι ένας ανεξάρτητος ψηφιακός ειδησεογραφικός σταθμός που εκπέμπει από το Κάιρο σε όλο τον κόσμο: ειδήσεις, πολιτική, οικονομία, τεχνολογία, αθλητικά, υγεία και πολιτισμός σε 30 γλώσσες." },
  nav: { home: "Αρχική", world: "Κόσμος", politics: "Πολιτική", economy: "Οικονομία", technology: "Τεχνολογία", sports: "Αθλητικά", health: "Υγεία", culture: "Πολιτισμός", search: "Αναζήτηση", advertise: "Διαφήμιση", menu: "Μενού" },
  ticker: { live: "ΖΩΝΤΑΝΑ", breaking: "ΕΚΤΑΚΤΟ", watchNow: "Δείτε τώρα" },
  hero: { eyebrow: "Όλο το 24ωρο — από το Κάιρο στον κόσμο", latest: "Τελευταίες ειδήσεις", breakingNow: "Αυτή τη στιγμή", updated: "Ενημερώθηκε" },
  actions: { readMore: "Διαβάστε το άρθρο", viewAll: "Δείτε όλα", justNow: "Μόλις τώρα", minutes: "λεπτά ανάγνωσης", hours: "ώρες πριν" },
  search: { placeholder: "Αναζήτηση σε 30 γλώσσες…", title: "Αναζήτηση στο newsroom", noResults: "Δεν βρέθηκε καμία είδηση. Δοκιμάστε άλλη λέξη.", resultsFor: "Αποτελέσματα για", tip: "Δοκιμάστε «οικονομία», «ποδόσφαιρο» ή «Κάιρο»." },
  agent: { title: "ΡΩΤΗΣΤΕ ΤΟΝ ΠΡΑΚΤΟΡΑ", subtitle: "Ο πράκτορας AI μας βρίσκει την ιστορία και τη συζητά μαζί σας.", placeholder: "Ρωτήστε για τα σημερινά νέα…", send: "Αποστολή", thinking: "Σάρωση του newsroom…", greet: "Γεια σας, είμαι ο πράκτορας του EGY NEWS. Ρωτήστε με τι συμβαίνει και θα σας φέρω τις ιστορίες αμέσως.", s1: "Τι είναι πρωτοσέλιδο τώρα;", s2: "Σύνοψε τις οικονομικές ειδήσεις", s3: "Πες μου για την τεχνολογία στην Αίγυπτο", cited: "Πηγές", readArticle: "Διαβάστε την ιστορία" },
  footer: { about: "Ένας ανεξάρτητος, πολύγλωσσος ψηφιακός ειδησεογραφικός σταθμός από το Κάιρο. Αληθινές ιστορίες σε 30 γλώσσες.", sections: "Ενότητες", follow: "Ακολουθήστε τον σταθμό", rights: "Με επιφύλαξη παντός δικαιώματος.", madeBy: "Δημιουργήθηκε από τη Romero's Studios" },
  advertise: { title: "Διαφημιστείτε στο EGY NEWS", subtitle: "Φέρτε το brand σας μπροστά σε πολύγλωσσο κοινό σε 30 γλώσσες.", cta: "Κράτηση μέσω WhatsApp", contact: "Απευθείας γραμμή", plan1: "Banner έκτακτων ειδήσεων", plan2: "Θέσεις εντός άρθρων", plan3: "Χορηγούμενα τμήματα" },
  common: { latest: "Τελευταία", topStories: "Κορυφαίες ιστορίες", categories: "Κατηγορίες", readTime: "ανάγνωση", byline: "Από" },
  notFound: { title: "Η ιστορία δεν βρέθηκε", text: "Η σελίδα μετακινήθηκε ή δεν υπήρξε ποτέ.", home: "Επιστροφή στην αρχική" },
  category: { stories: "ιστορίες", other: "Περισσότερα σε αυτή την ενότητα" },
};

const he: Dict = {
  meta: { title: "EGY NEWS — חדשות העולם מקהיר", description: "EGY NEWS הוא ערוץ חדשות דיגיטלי עצמאי המשדר מקהיר לעולם: חדשות, פוליטיקה, כלכלה, טכנולוגיה, ספורט, בריאות ותרבות ב-30 שפות." },
  nav: { home: "בית", world: "עולם", politics: "פוליטיקה", economy: "כלכלה", technology: "טכנולוגיה", sports: "ספורט", health: "בריאות", culture: "תרבות", search: "חיפוש", advertise: "פרסום", menu: "תפריט" },
  ticker: { live: "שידור חי", breaking: "מבזק", watchNow: "צפו עכשיו" },
  hero: { eyebrow: "מסביב לשעון — מקהיר לעולם", latest: "החדשות האחרונות", breakingNow: "ברגעים אלה", updated: "עודכן" },
  actions: { readMore: "קראו את הידיעה", viewAll: "הצג הכול", justNow: "לפני רגע", minutes: "דקות קריאה", hours: "שעות" },
  search: { placeholder: "חיפוש ב-30 שפות…", title: "חיפוש במערכת", noResults: "לא נמצאו ידיעות. נסו מילה אחרת.", resultsFor: "תוצאות עבור", tip: "נסו «כלכלה», «כדורגל» או «קהיר»." },
  agent: { title: "שאלו את הסוכן", subtitle: "סוכן ה-AI שלנו מוצא את הסיפור ומשוחח אתכם עליו.", placeholder: "שאלו על החדשות של היום…", send: "שליחה", thinking: "סורק את מערכת החדשות…", greet: "שלום, אני הסוכן של EGY NEWS. שאלו אותי מה קורה ואביא לכם את הסיפורים מיד.", s1: "מה החדשות עכשיו?", s2: "סכם את חדשות הכלכלה", s3: "ספר לי על טכנולוגיה במצרים", cited: "מקורות", readArticle: "קראו את הסיפור" },
  footer: { about: "ערוץ חדשות דיגיטלי עצמאי ורב-לשוני מקהיר. סיפורים אמיתיים ב-30 שפות.", sections: "מדורים", follow: "עקבו אחר הערוץ", rights: "כל הזכויות שמורות.", madeBy: "נוצר על ידי Romero's Studios" },
  advertise: { title: "פרסום ב-EGY NEWS", subtitle: "הביאו את המותג שלכם לקהל רב-לשוני ב-30 שפות.", cta: "הזמנה בוואטסאפ", contact: "קו ישיר", plan1: "באנר מבזקים", plan2: "מיקום בתוך כתבות", plan3: "פלחים בחסות" },
  common: { latest: "אחרונות", topStories: "כותרות", categories: "מדורים", readTime: "קריאה", byline: "מאת" },
  notFound: { title: "הסיפור לא נמצא", text: "הדף הועבר או מעולם לא היה קיים.", home: "חזרה לדף הבית" },
  category: { stories: "סיפורים", other: "עוד במדור זה" },
};

const pl: Dict = {
  meta: { title: "EGY NEWS — Wiadomości ze świata z Kairu", description: "EGY NEWS to niezależna cyfrowa stacja informacyjna nadająca z Kairu na cały świat: wiadomości, polityka, gospodarka, technologia, sport, zdrowie i kultura w 30 językach." },
  nav: { home: "Strona główna", world: "Świat", politics: "Polityka", economy: "Gospodarka", technology: "Technologia", sports: "Sport", health: "Zdrowie", culture: "Kultura", search: "Szukaj", advertise: "Reklama", menu: "Menu" },
  ticker: { live: "NA ŻYWO", breaking: "NAJŚWIEŻSZE", watchNow: "Oglądaj teraz" },
  hero: { eyebrow: "Całą dobę — z Kairu na świat", latest: "Najnowsze wiadomości", breakingNow: "W tej chwili", updated: "Zaktualizowano" },
  actions: { readMore: "Czytaj wiadomość", viewAll: "Zobacz wszystkie", justNow: "Przed chwilą", minutes: "min czytania", hours: "godz. temu" },
  search: { placeholder: "Szukaj w 30 językach…", title: "Szukaj w redakcji", noResults: "Brak pasujących wiadomości. Spróbuj innego słowa.", resultsFor: "Wyniki dla", tip: "Spróbuj „gospodarka”, „piłka nożna” lub „Kair”." },
  agent: { title: "ZAPYTAJ AGENTA", subtitle: "Nasz agent AI znajduje historię i omawia ją z Tobą.", placeholder: "Zapytaj o dzisiejsze wiadomości…", send: "Wyślij", thinking: "Skanowanie redakcji…", greet: "Cześć, jestem agentem EGY NEWS. Zapytaj, co się dzieje, a natychmiast przyniosę Ci historie.", s1: "Co teraz jest na pierwszych stronach?", s2: "Podsumuj wiadomości gospodarcze", s3: "Opowiedz o technologii w Egipcie", cited: "Źródła", readArticle: "Czytaj historię" },
  footer: { about: "Niezależna, wielojęzyczna cyfrowa stacja informacyjna z Kairu. Prawdziwe historie w 30 językach.", sections: "Sekcje", follow: "Obserwuj stację", rights: "Wszelkie prawa zastrzeżone.", madeBy: "Stworzone przez Romero's Studios" },
  advertise: { title: "Reklamuj się w EGY NEWS", subtitle: "Przedstaw swoją markę wielojęzycznej publiczności w 30 językach.", cta: "Zarezerwuj przez WhatsApp", contact: "Linia bezpośrednia", plan1: "Baner najświeższych wiadomości", plan2: "Miejsca w artykułach", plan3: "Sponsorowane segmenty" },
  common: { latest: "Najnowsze", topStories: "Najważniejsze", categories: "Kategorie", readTime: "czytania", byline: "Autor" },
  notFound: { title: "Nie znaleziono historii", text: "Strona została przeniesiona lub nigdy nie istniała.", home: "Wróć na stronę główną" },
  category: { stories: "historii", other: "Więcej w tej sekcji" },
};

const ro: Dict = {
  meta: { title: "EGY NEWS — Știri mondiale din Cairo", description: "EGY NEWS este un post de știri digital independent care transmite din Cairo către lume: știri, politică, economie, tehnologie, sport, sănătate și cultură în 30 de limbi." },
  nav: { home: "Acasă", world: "Lume", politics: "Politică", economy: "Economie", technology: "Tehnologie", sports: "Sport", health: "Sănătate", culture: "Cultură", search: "Caută", advertise: "Publicitate", menu: "Meniu" },
  ticker: { live: "ÎN DIRECT", breaking: "ȘTIRI DE ULTIMĂ ORĂ", watchNow: "Vezi acum" },
  hero: { eyebrow: "Non-stop — din Cairo în lume", latest: "Ultimele știri", breakingNow: "Chiar acum", updated: "Actualizat" },
  actions: { readMore: "Citește știrea", viewAll: "Vezi toate", justNow: "Chiar acum", minutes: "min de citire", hours: "ore în urmă" },
  search: { placeholder: "Caută în 30 de limbi…", title: "Caută în redacție", noResults: "Nicio știre nu se potrivește. Încearcă alt cuvânt.", resultsFor: "Rezultate pentru", tip: "Încearcă „economie”, „fotbal” sau „Cairo”." },
  agent: { title: "ÎNTREABĂ AGENTUL", subtitle: "Agentul nostru AI găsește povestea și o discută cu tine.", placeholder: "Întreabă despre știrile de azi…", send: "Trimite", thinking: "Se scanează redacția…", greet: "Salut, sunt agentul EGY NEWS. Întreabă-mă ce se întâmplă și îți aduc poveștile imediat.", s1: "Ce este în știri acum?", s2: "Rezumă știrile economice", s3: "Spune-mi despre tehnologia din Egipt", cited: "Surse", readArticle: "Citește povestea" },
  footer: { about: "Un post de știri digital independent și multilingv din Cairo. Povești reale în 30 de limbi.", sections: "Secțiuni", follow: "Urmărește postul", rights: "Toate drepturile rezervate.", madeBy: "Creat de Romero's Studios" },
  advertise: { title: "Fă reclamă la EGY NEWS", subtitle: "Adu-ți brandul în fața unui public multilingv în 30 de limbi.", cta: "Rezervă pe WhatsApp", contact: "Linie directă", plan1: "Banner de ultimă oră", plan2: "Amplasări în articole", plan3: "Segmente sponsorizate" },
  common: { latest: "Ultimele", topStories: "Știri de top", categories: "Categorii", readTime: "citire", byline: "De" },
  notFound: { title: "Povestea nu a fost găsită", text: "Pagina a fost mutată sau nu a existat niciodată.", home: "Înapoi la prima pagină" },
  category: { stories: "povești", other: "Mai multe în această secțiune" },
};

export const DICTS: Record<Locale, Dict> = {
  en, ar, fr, de, es, pt, it, nl, ru, tr, fa, ur, hi, bn, zh, "zh-TW": zhTW, ja, ko, id, ms, vi, th, sw, ha, yo, ig, el, he, pl, ro,
};

export function getDict(locale: string): Dict {
  return DICTS[locale as Locale] ?? DICTS[DEFAULT_LOCALE];
}

export const DICT_CODES = LOCALE_CODES;
