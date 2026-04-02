import React, { useState, useEffect, useRef } from 'react';
import { HISN_AL_MUSLIM } from './data/azkar';
import { ARBAEEN_HADITHS } from './data/hadiths';

// ============================================================================
// DONNÉES ET CONSTANTES GLOBALES
// ============================================================================

const UI_DICT = {
  ar: {
    appTitle: "نعيم الذاكرين",
    home: "الرئيسية",
    quranPlayer: "القرآن الكريم (بث حي)",
    prayerTimes: "مواقيت الصلاة",
    privacyPolicy: "سياسة الخصوصية",
    blogLanguage: "لغة المنصة",
    aboutUs: "من نحن",
    aboutTitle: "من نحن",
    aboutText1: '"نعيم الذاكرين" هي منصة قرآنية إبداعية مصممة لتوفير تجربة استماع وتدبر غامرة.',
    aboutText2: 'نقدم تلاوات لأكثر من 50 قارئاً، مع توفير تراجم بـ 10 لغات، وتفاسير ومعاني ميسرة للآيات. نسأل الله أن يجعل هذا العمل خالصاً لوجهه الكريم وأن ينفع به كل من زاره.',
    country: "البلد",
    city: "الولاية / المدينة",
    commune: "البلدية",
    updateLocation: "تحديث",
    detectLocation: "تحديد الموقع تلقائياً",
    detectedLocation: "الموقع المكتشف",
    ayahOfDay: "آية اليوم",
    duaOfDay: "دعاء اليوم",
    tafsirTitle: "التفسير:",
    loading: "جاري التحميل...",
    searchSurah: "ابحث عن سورة...",
    translation: "الترجمة",
    privacyTitle: "سياسة الخصوصية",
    privacyText: "نحن في نعيم الذاكرين نحترم خصوصيتك. لا نقوم بجمع أو تخزين أي بيانات شخصية خاصة بك. يتم حفظ إعدادات لغتك ومدينتك محلياً في متصفحك فقط لتحسين تجربتك.",
    quranSearch: "البحث في القرآن",
    searchPlaceholder: "أدخل كلمة للبحث عنها...",
    searchResults: "نتائج البحث",
    noResults: "لا توجد نتائج مطابقة لبحثك.",
    listenAyah: "استماع للآية",
    radio: "الراديو الإسلامي",
    azkar: "نعيم للأذكار",
    hadith: "الأحاديث النبوية",
    radioTitle: "بث مباشر لإذاعات القرآن الكريم",
    azkarTitle: "نعيم للأذكار - حصن المسلم",
    hadithTitle: "الأحاديث النبوية الشريفة",
    quranReader: "قراءة القرآن",
    tafsir: "التفاسير",
    reciters: "القراء",
    settings: "الإعدادات",
    searchBySurah: "بحث بالسورة",
    searchByJuz: "بحث بالجزء",
    searchByHizb: "بحث بالحزب",
    memorizationAid: "مساعد الحفظ",
    voiceRecording: "تسجيل صوتي",
    favorites: "المفضلة",
    bookmarks: "العلامات",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    mushafLibrary: "مكتبة المصاحف",
    downloadManager: "إدارة التحميلات",
    userGuide: "دليل الاستخدام",
    upgrade: "ترقية البرنامج",
    aboutProject: "عن المشروع"
  },
  fr: {
    appTitle: "Naimaldakirine",
    home: "Accueil",
    quranPlayer: "TV Coranique",
    prayerTimes: "Horaires de Prière",
    privacyPolicy: "Confidentialité",
    blogLanguage: "Langue",
    aboutUs: "À propos",
    aboutTitle: "À propos de nous",
    aboutText1: '"Naeim Al-Thakireen" est une plateforme coranique créative conçue pour offrir une expérience d\'écoute immersive.',
    aboutText2: 'Nous proposons des récitations avec traductions et exégèses. Nous demandons à Allah d\'accepter ce travail.',
    country: "Pays",
    city: "Wilaya / Ville",
    commune: "Commune",
    updateLocation: "Mettre à jour",
    detectLocation: "Localisation auto",
    detectedLocation: "Lieu détecté",
    ayahOfDay: "Verset du Jour",
    duaOfDay: "Invocation du Jour",
    tafsirTitle: "Exégèse (Tafsir):",
    loading: "Chargement...",
    searchSurah: "Chercher une sourate...",
    translation: "Traduction",
    privacyTitle: "Politique de confidentialité",
    privacyText: "Nous ne collectons aucune donnée personnelle. Vos préférences sont sauvegardées localement.",
    quranSearch: "Recherche Coranique",
    searchPlaceholder: "Entrez un mot à rechercher...",
    searchResults: "Résultats de recherche",
    noResults: "Aucun résultat trouvé.",
    listenAyah: "Écouter le verset",
    radio: "Radio Islamique",
    azkar: "Naeim Al-Azkar",
    hadith: "Hadiths",
    radioTitle: "Radios Coraniques en Direct",
    azkarTitle: "Naeim Al-Azkar - Hisn Al-Muslim",
    hadithTitle: "Hadiths du Prophète (PSL)",
    quranReader: "Lecture du Coran",
    tafsir: "Exégèses (Tafsir)",
    reciters: "Récitateurs",
    settings: "Paramètres",
    searchBySurah: "Recherche par Sourate",
    searchByJuz: "Recherche par Juz",
    searchByHizb: "Recherche par Hizb",
    memorizationAid: "Aide à la mémorisation",
    voiceRecording: "Enregistrement vocal",
    favorites: "Favoris",
    bookmarks: "Signets",
    zoomIn: "Zoom (+)",
    zoomOut: "Zoom (-)",
    mushafLibrary: "Bibliothèque de Mushafs",
    downloadManager: "Gestion des téléchargements",
    userGuide: "Guide d'utilisation",
    upgrade: "Mise à niveau",
    aboutProject: "À propos du projet"
  },
  en: {
    appTitle: "Naeim Al-Thakireen",
    home: "Home",
    quranPlayer: "Quran TV",
    prayerTimes: "Prayer Times",
    privacyPolicy: "Privacy Policy",
    blogLanguage: "Language",
    aboutUs: "About Us",
    aboutTitle: "About Us",
    aboutText1: '"Naeim Al-Thakireen" is a creative Quranic platform designed to provide an immersive listening experience.',
    aboutText2: 'We offer recitations with translations and Tafsir. We ask Allah to accept this work.',
    country: "Country",
    city: "State / City",
    commune: "Municipality",
    updateLocation: "Update",
    detectLocation: "Auto-detect Location",
    detectedLocation: "Detected Location",
    ayahOfDay: "Ayah of the Day",
    duaOfDay: "Dua of the Day",
    tafsirTitle: "Tafsir:",
    loading: "Loading...",
    searchSurah: "Search Surah...",
    translation: "Translation",
    privacyTitle: "Privacy Policy",
    privacyText: "We do not collect any personal data. Your preferences are saved locally.",
    quranSearch: "Quran Search",
    searchPlaceholder: "Enter a word to search...",
    searchResults: "Search Results",
    noResults: "No results found.",
    listenAyah: "Listen to Ayah",
    radio: "Islamic Radio",
    azkar: "Naeim Al-Azkar",
    hadith: "Hadiths",
    radioTitle: "Live Quran Radios",
    azkarTitle: "Naeim Al-Azkar - Hisn Al-Muslim",
    hadithTitle: "Prophetic Hadiths",
    quranReader: "Quran Reader",
    tafsir: "Tafsir",
    reciters: "Reciters",
    settings: "Settings",
    searchBySurah: "Search by Surah",
    searchByJuz: "Search by Juz",
    searchByHizb: "Search by Hizb",
    memorizationAid: "Memorization Aid",
    voiceRecording: "Voice Recording",
    favorites: "Favorites",
    bookmarks: "Bookmarks",
    zoomIn: "Zoom (+)",
    zoomOut: "Zoom (-)",
    mushafLibrary: "Mushaf Library",
    downloadManager: "Download Manager",
    userGuide: "User Guide",
    upgrade: "Upgrade",
    aboutProject: "About Project"
  }
};

const PRAYER_COUNTRIES = [
  { id: "Algeria", nameAr: "الجزائر", nameFr: "Algérie", nameEn: "Algeria" },
  { id: "Morocco", nameAr: "المغرب", nameFr: "Maroc", nameEn: "Morocco" },
  { id: "Tunisia", nameAr: "تونس", nameFr: "Tunisie", nameEn: "Tunisia" },
  { id: "Egypt", nameAr: "مصر", nameFr: "Égypte", nameEn: "Egypt" },
  { id: "Saudi Arabia", nameAr: "السعودية", nameFr: "Arabie Saoudite", nameEn: "Saudi Arabia" },
  { id: "Palestine", nameAr: "فلسطين", nameFr: "فلسطين", nameEn: "Palestine" },
  { id: "France", nameAr: "فرنسا", nameFr: "France", nameEn: "France" }
];

const PRAYER_CITIES = {
  "Algeria": ["أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "إن صالح", "إن قزام", "تقرت", "جانت", "المغير", "المنيعة"],
  "Morocco": ["Casablanca", "Rabat", "Fes", "Marrakech", "Tangier", "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan"],
  "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabes", "Ariana", "Gafsa"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "Mansoura", "Tanta"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Tabuk", "Buraydah"],
  "Palestine": ["Jerusalem", "Gaza", "Hebron", "Nablus", "Ramallah", "Bethlehem", "Jenin", "Jericho"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"]
};

const PRAYER_COMMUNES = {
  "أدرار": ["أدرار", "فنوغيل", "تمنطيط", "رقان", "أولف", "زاوية كنتة"],
  "الشلف": ["الشلف", "تنس", "بوقادير", "أولاد فارس", "الشطية", "وادي الفضة", "المرسى", "بني حواء"],
  "الأغواط": ["الأغواط", "أفلو", "عين ماضي", "حاسي الرمل", "قصر الحيران"],
  "أم البواقي": ["أم البواقي", "عين البيضاء", "عين مليلة", "عين فكرون", "مسكيانة"],
  "باتنة": ["باتنة", "بريكة", "عين التوتة", "مروانة", "آريس", "نقاوس", "تازولت", "الشمرة"],
  "بجاية": ["بجاية", "أقبو", "أميزور", "القصر", "خراطة", "سوق الإثنين", "صدوق", "تيشي"],
  "بسكرة": ["بسكرة", "سيدي عقبة", "طولقة", "جمورة", "الوطاية"],
  "بشار": ["بشار", "القنادسة", "تاغيت", "لحمر", "موغل"],
  "البليدة": ["البليدة", "أولاد يعيش", "بوفاريك", "موزاية", "العفرون", "الشفة", "بوقرة", "الأربعاء"],
  "البويرة": ["البويرة", "الأخضرية", "سور الغزلان", "عين بسام", "مشد الله"],
  "تمنراست": ["تمنراست", "أباليسا"],
  "تبسة": ["تبسة", "بئر العاتر", "الشريعة", "الونزة", "العوينات", "مرسط"],
  "تلمسان": ["تلمسان", "مغنية", "الغزوات", "سبدو", "أولاد ميمون", "الحناية", "الرمشي", "بني صاف"],
  "تيارت": ["تيارت", "السوقر", "فرندة", "قصر الشلالة", "مهدية", "حمادية"],
  "تيزي وزو": ["تيزي وزو", "عزازقة", "ذراع الميزان", "واضية", "أزفون", "تيكزيرت", "مقلع", "بني دوالة", "بوغني", "إعكوران", "عين الحمام"],
  "الجزائر": ["الجزائر الوسطى", "سيدي امحمد", "باب الوادي", "بئر مراد رايس", "الحراش", "بوزريعة", "الشراقة", "الدار البيضاء", "زرالدة", "الرويبة", "الرغاية", "براقي", "حسين داي"],
  "الجلفة": ["الجلفة", "حاسي بحبح", "عين وسارة", "مسعد", "الإدريسية", "شارف"],
  "جيجل": ["جيجل", "الطاهير", "الميلية", "جيملة", "الشقفة", "العنصر", "سيدي معروف"],
  "سطيف": ["سطيف", "العلمة", "عين أرنات", "عين الكبيرة", "بوقاعة", "بني عزيز", "عين ولمان"],
  "سعيدة": ["سعيدة", "الحساسنة", "عين الحجر", "يوب", "سيدي بوبكر"],
  "سكيكدة": ["سكيكدة", "الحروش", "القل", "عزابة", "تمالوس", "بن عزوز", "سيدي مزغيش"],
  "سيدي بلعباس": ["سيدي بلعباس", "تسالة", "سفيزف", "بن باديس", "تلاغ", "مولاي سليسن"],
  "عنابة": ["عنابة", "البوني", "الحجار", "برحال", "شطايبي", "سرايدي", "عين الباردة"],
  "قالمة": ["قالمة", "وادي الزناتي", "بوشقوف", "هيوب", "حمام النبائل"],
  "قسنطينة": ["قسنطينة", "الخروب", "عين سمارة", "حامة بوزيان", "زيغود يوسف", "ديدوش مراد"],
  "المدية": ["المدية", "البرواقية", "قصر البخاري", "بني سليمان", "تابلاط", "عزيز"],
  "مستغانم": ["مستغانم", "عين تادلس", "بوقيراط", "حاسي ماماش", "سيدي لخضر", "ماسرة"],
  "المسيلة": ["المسيلة", "بوسعادة", "سيدي عيسى", "مقرة", "حمام الضلعة", "أولاد دراج"],
  "معسكر": ["معسكر", "سيق", "المحمدية", "تيغنيف", "غريس", "بوحنيفية"],
  "ورقلة": ["ورقلة", "حاسي مسعود", "عين البيضاء", "الرويسات"],
  "وهران": ["وهران", "بئر الجير", "السانية", "أرزيو", "عين الترك", "بطيوة", "قديل", "مسرغين"],
  "البيض": ["البيض", "بوقطب", "الأبيض سيدي الشيخ", "بريزينة"],
  "إليزي": ["إليزي", "برج الحواس"],
  "برج بوعريريج": ["برج بوعريريج", "رأس الوادي", "المنصورة", "مجانة", "برج غدير"],
  "بومرداس": ["بومرداس", "برج منايل", "دلس", "بودواو", "الثنية", "خميس الخشنة"],
  "الطارف": ["الطارف", "القالة", "الذرعان", "بوثلجة", "البسباس"],
  "تندوف": ["تندوف"],
  "تيسمسيلت": ["تيسمسيلت", "ثنية الحد", "لرجام", "خميستي"],
  "الوادي": ["الوادي", "قمار", "الرقيبة", "البياضة", "رباح"],
  "خنشلة": ["خنشلة", "قايس", "ششار", "أولاد رشاش", "الحامة"],
  "سوق أهراس": ["سوق أهراس", "سدراتة", "مداوروش", "تاورة", "المراهنة"],
  "تيبازة": ["تيبازة", "القليعة", "حجوط", "شرشال", "بوسماعيل", "فوكة"],
  "ميلة": ["ميلة", "شلغوم العيد", "فرجيوة", "تاجنانت", "تلاغمة"],
  "عين الدفلى": ["عين الدفلى", "خميس مليانة", "العطاف", "مليانة", "جليدة"],
  "النعامة": ["النعامة", "مشرية", "عين الصفراء", "عسلة"],
  "عين تموشنت": ["عين تموشنت", "بني صاف", "حمام بوحجر", "المالح", "عين الأربعاء"],
  "غرداية": ["غرداية", "متليلي", "القرارة", "بريان", "المنيعة"],
  "غليزان": ["غليزان", "وادي ارهيو", "مازونة", "عمي موسى", "يلل"],
  "تيميمون": ["تيميمون", "أوقروت", "شروين"],
  "برج باجي مختار": ["برج باجي مختار", "تيمياوين"],
  "أولاد جلال": ["أولاد جلال", "الدوسن", "سيدي خالد"],
  "بني عباس": ["بني عباس", "كرزاز", "الواتة"],
  "إن صالح": ["إن صالح", "إن غار"],
  "إن قزام": ["إن قزام", "تين زواتين"],
  "تقرت": ["تقرت", "تماسين", "الطيبات"],
  "جانت": ["جانت", "برج الحواس"],
  "المغير": ["المغير", "جامعة"],
  "المنيعة": ["المنيعة", "حاسي القارة"]
};

const DAILY_AYAHS_REF = ["2:255", "2:286", "3:8", "3:190", "18:10", "20:114", "21:87", "23:118", "24:35", "26:83", "27:62", "28:24", "39:53", "40:60", "59:22", "65:2", "65:3", "67:1", "71:10", "73:9", "75:1", "78:1", "87:1", "93:5", "94:5", "97:1", "99:7", "100:1", "108:1", "112:1", "113:1"];

const DAILY_DUAS = [
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
  "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ.",
  "رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي.",
  "رَّبِّ زِدْنِي عِلْمًا.",
  "لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ.",
  "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ.",
  "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ.",
  "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ.",
  "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.",
  "اللَّهُمَّ يَامُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ."
];

const RECITERS = [
  { id: "ar.alafasy", name: "مشاري راشد العفاسي", nameFr: "Mishari Alafasy" },
  { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد (مرتل)", nameFr: "AbdulBaset (Murattal)" },
  { id: "ar.abdulsamad", name: "عبد الباسط عبد الصمد (مجود)", nameFr: "AbdulBaset (Mujawwad)" },
  { id: "ar.mahermuaiqly", name: "ماهر المعيقلي", nameFr: "Maher Al-Muaiqly" },
  { id: "ar.sudais", name: "عبد الرحمن السديس", nameFr: "Abderrahman Al-Sudais" },
  { id: "ar.shuraym", name: "سعود الشريم", nameFr: "Saud Al-Shuraim" },
  { id: "ar.minshawi", name: "محمد صديق المنشاوي (مرتل)", nameFr: "Al-Minshawi (Murattal)" },
  { id: "ar.minshawimujawwad", name: "محمد صديق المنشاوي (مجود)", nameFr: "Al-Minshawi (Mujawwad)" },
  { id: "ar.husary", name: "محمود خليل الحصري (مرتل)", nameFr: "Al-Husary (Murattal)" },
  { id: "ar.husarymujawwad", name: "محمود خليل الحصري (مجود)", nameFr: "Al-Husary (Mujawwad)" },
  { id: "ar.ahmedajamy", name: "أحمد بن علي العجمي", nameFr: "Ahmed Al-Ajmi" },
  { id: "ar.shaatree", name: "أبو بكر الشاطري", nameFr: "Abu Bakr Al-Shatri" },
  { id: "ar.hudhaify", name: "علي بن عبد الرحمن الحذيفي", nameFr: "Ali Al-Hudhaify" },
  { id: "ar.muhammadayyoub", name: "محمد أيوب", nameFr: "Muhammad Ayyub" },
  { id: "ar.muhammadjibreel", name: "محمد جبريل", nameFr: "Muhammad Jibreel" },
  { id: "ar.haniarifai", name: "هاني الرفاعي", nameFr: "Hani Ar-Rifai" },
  { id: "ar.abdullahbasfar", name: "عبد الله بصفر", nameFr: "Abdullah Basfar" },
  { id: "ar.aymansuwaid", name: "أيمن سويد", nameFr: "Ayman Suwayd" },
  { id: "ar.ibrahimakhbar", name: "إبراهيم الأخضر", nameFr: "Ibrahim Al-Akhdar" },
  { id: "ar.parhizgar", name: "شهريار برهيزغار", nameFr: "Shahriar Parhizgar" },
  { id: "ar.saad_alghamidi", name: "سعد الغامدي", nameFr: "Saad Al-Ghamdi" },
  { id: "ar.nasseralqatami", name: "ناصر القطامي", nameFr: "Nasser Al-Qatami" },
  { id: "ar.yasserdossari", name: "ياسر الدوسري", nameFr: "Yasser Al-Dosari" },
  { id: "ar.faresabbad", name: "فارس عباد", nameFr: "Fares Abbad" },
  { id: "ar.khalidgalilee", name: "خالد الجليل", nameFr: "Khalid Al-Jalil" },
  { id: "ar.idreesabkr", name: "إدريس أبكر", nameFr: "Idrees Abkar" },
  { id: "ar.muhammadhassan", name: "محمد حسان", nameFr: "Muhammad Hassan" },
  { id: "ar.salahbukhatir", name: "صلاح بو خاطر", nameFr: "Salah Bukhatir" },
  { id: "ar.muhammadluhaidan", name: "محمد اللحيدان", nameFr: "Muhammad Al-Luhaidan" },
  { id: "ar.alzain", name: "الزين محمد أحمد", nameFr: "Alzain M. Ahmad" }
];

const TRANSLATIONS = [
  { id: "fr.hamidullah", name: "Français (Hamidullah)" },
  { id: "en.sahih", name: "English (Sahih)" },
  { id: "es.cortes", name: "Español (Cortes)" },
  { id: "ur.jalandhry", name: "اردو (Jalandhry)" },
  { id: "id.indonesian", name: "Indonesia" },
  { id: "tr.diyanet", name: "Türkçe (Diyanet)" }
];

const SURAH_VIRTUES = {
  1: "أعظم سورة في القرآن، وهي السبع المثاني والقرآن العظيم.",
  2: "أخذها بركة وتركها حسرة ولا تستطيعها البطلة (السحرة).",
  18: "من قرأ سورة الكهف في يوم الجمعة أضاء له من النور ما بين الجمعتين.",
  36: "قلب القرآن، من قرأها يريد وجه الله غفر له.",
  67: "المانعة من عذاب القبر، شفعت لرجل حتى غفر له.",
  112: "تعدل ثلث القرآن."
};

const toArabicNumerals = (num: number | string) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num ? num.toString().replace(/[0-9]/g, w => arabicNumerals[parseInt(w)]) : '';
};

// ============================================================================
// COMPOSANT : CHARGEMENT PERSONNALISÉ (SPINNER)
// ============================================================================
const LoadingSpinner = ({ size = "md", text = "جاري التحميل..." }: { size?: "sm" | "md" | "lg", text?: string }) => {
  const sizes = {
    sm: { container: "w-16 h-16", inner: "inset-2", logo: "w-8 h-8", border: "border-2" },
    md: { container: "w-32 h-32 md:w-48 md:h-48", inner: "inset-4", logo: "w-16 h-16 md:w-24 md:h-24", border: "border-4" },
    lg: { container: "w-48 h-48 md:w-64 md:h-64", inner: "inset-6", logo: "w-24 h-24 md:w-32 md:h-32", border: "border-4" }
  };
  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fadeIn">
      <div className={`relative ${currentSize.container} flex items-center justify-center`}>
        {/* Outer Circle - Clockwise */}
        <div className={`absolute inset-0 ${currentSize.border} border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/30 border-l-transparent rounded-full animate-spin-slow`}></div>
        {/* Inner Circle - Counter Clockwise */}
        <div className={`absolute ${currentSize.inner} ${currentSize.border} border-t-transparent border-r-[#D4AF37] border-b-transparent border-l-[#D4AF37]/30 rounded-full animate-spin-reverse-slow`}></div>
        {/* Logo with pulsing effect */}
        <div className={`relative ${currentSize.logo} rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse-gentle`}>
          <img 
            src="https://yt3.ggpht.com/QrZ62zK_7WCq3eS4m0cXx3P18RljKqHs2Epjr6A5VsTokL6SrWlWD3mhrh7oIkOV6XFoTEuXaw=s88-c-k-c0x00ffffff-no-rj" 
            alt="Loading Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {text && <span className="font-amiri text-[#D4AF37] text-xl md:text-2xl animate-pulse-gentle tracking-widest">{text}</span>}
    </div>
  );
};

// ============================================================================
// COMPOSANT 1 : TABLEAU DE BORD (ACCUEIL)
// ============================================================================
const DashboardView = ({ uiLang, t }: { uiLang: string, t: any }) => {
  const [prayerCountry, setPrayerCountry] = useState("Algeria");
  const [prayerCity, setPrayerCity] = useState("تيزي وزو");
  const [prayerCommune, setPrayerCommune] = useState("بني زمنزر");
  
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [ayahOfDay, setAyahOfDay] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);

  const availableCommunes = (PRAYER_COMMUNES as any)[prayerCity] || [];

  useEffect(() => {
    const addressQuery = prayerCommune ? `${prayerCommune}, ${prayerCity}, ${prayerCountry}` : `${prayerCity}, ${prayerCountry}`;
    
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(addressQuery)}&method=3`)
      .then(res => res.json())
      .then(data => { if(data && data.data) setPrayerTimes(data.data.timings); });
  }, [prayerCity, prayerCountry, prayerCommune]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Use coordinates to get timings directly
        fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=3`)
          .then(res => res.json())
          .then(data => {
            if (data && data.data) {
              setPrayerTimes(data.data.timings);
              // Optionally, try to reverse geocode to update selectors
              fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`)
                .then(res => res.json())
                .then(geoData => {
                  if (geoData && geoData.address) {
                    const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state;
                    const country = geoData.address.country;
                    if (city) setPrayerCity(city);
                    if (country) setPrayerCountry(country);
                    setDetectedLocation(`${city}, ${country}`);
                  }
                })
                .catch(err => console.log("Reverse geocoding error:", err));
            }
            setIsDetecting(false);
          })
          .catch(err => {
            console.error(err);
            setIsDetecting(false);
          });
      },
      (error) => {
        console.error(error);
        setIsDetecting(false);
      }
    );
  };

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    const index = (dayOfMonth - 1) % DAILY_AYAHS_REF.length;
    const ref = DAILY_AYAHS_REF[index];

    fetch(`https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,ar.saadi`)
      .then(res => res.json())
      .then(data => {
        if(data && data.code === 200) {
           setAyahOfDay({
             textAr: data.data[0].text,
             surahName: data.data[0].surah.name,
             ayahNumber: data.data[0].numberInSurah,
             tafsir: data.data[1].text
           });
        }
      });
  }, []);

  const currentDua = DAILY_DUAS[(new Date().getDate() - 1) % DAILY_DUAS.length];

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-8 pb-16 z-20">
      {/* مواقيت الصلاة */}
      <div className="bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(212,175,55,0.1)] text-center">
        <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] mb-8 text-glow">{t.prayerTimes}</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-4xl mx-auto justify-center font-cairo">
          <select 
            value={prayerCountry} 
            onChange={(e) => { 
              const newCountry = e.target.value;
              const countryCities = (PRAYER_CITIES as any)[newCountry] || [];
              const newCity = countryCities.length > 0 ? countryCities[0] : "";
              setPrayerCountry(newCountry); 
              setPrayerCity(newCity); 
              const newCommunes = (PRAYER_COMMUNES as any)[newCity] || [];
              setPrayerCommune(newCommunes.length > 0 ? newCommunes[0] : "");
              setDetectedLocation(null);
            }} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-4 md:py-3 rounded-xl text-center outline-none focus:border-[#D4AF37] cursor-pointer"
            title={t.country}
          >
            {PRAYER_COUNTRIES.map(c => <option key={c.id} value={c.id}>{uiLang === 'ar' ? c.nameAr : uiLang === 'fr' ? c.nameFr : c.nameEn}</option>)}
          </select>

          <select 
            value={prayerCity} 
            onChange={(e) => { 
              const newCity = e.target.value;
              setPrayerCity(newCity); 
              const newCommunes = (PRAYER_COMMUNES as any)[newCity] || [];
              setPrayerCommune(newCommunes.length > 0 ? newCommunes[0] : "");
              setDetectedLocation(null);
            }} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-4 md:py-3 rounded-xl text-center outline-none focus:border-[#D4AF37] cursor-pointer"
            title={t.city}
          >
            {((PRAYER_CITIES as any)[prayerCountry] || []).map((city: string) => <option key={city} value={city}>{city}</option>)}
          </select>

          <select 
            value={prayerCommune} 
            onChange={(e) => {
              setPrayerCommune(e.target.value);
              setDetectedLocation(null);
            }} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-4 md:py-3 rounded-xl text-center outline-none focus:border-[#D4AF37] font-cairo cursor-pointer"
            title={t.commune}
          >
            {availableCommunes.length > 0 ? (
              availableCommunes.map((commune: string) => <option key={commune} value={commune}>{commune}</option>)
            ) : (
              <option value={prayerCity}>{prayerCity}</option>
            )}
          </select>

          <button 
            onClick={detectLocation}
            disabled={isDetecting}
            className="flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-cairo font-bold hover:bg-[#b8962d] transition-all disabled:opacity-50 active:scale-95"
          >
            {isDetecting ? (
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-t-black border-r-transparent border-b-black/30 border-l-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute inset-1 border-2 border-t-transparent border-r-black border-b-transparent border-l-black/30 rounded-full animate-spin-reverse-slow"></div>
              </div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            )}
            {t.detectLocation}
          </button>
        </div>

        {detectedLocation && (
          <div className="text-[#D4AF37] text-sm font-cairo mb-2 animate-fadeIn">
            📍 {t.detectedLocation || 'Detected'}: {detectedLocation}
          </div>
        )}

        {prayerTimes ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 font-cairo mt-4">
            {Object.entries({Fajr:"الفجر", Sunrise:"الشروق", Dhuhr:"الظهر", Asr:"العصر", Maghrib:"المغرب", Isha:"العشاء"}).map(([key, name]) => (
              <div key={key} className="bg-black/60 border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center hover:border-[#D4AF37] hover:-translate-y-1 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                <span className="text-emerald-200 text-lg md:text-xl mb-2">{name}</span>
                <span className="text-white text-2xl md:text-3xl font-bold font-sans" dir="ltr">{prayerTimes[key]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#D4AF37] font-cairo flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            {t.loading}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] text-glow mb-6 border-b border-[#D4AF37]/20 pb-4 flex items-center gap-3">
             <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"></path></svg>
             {t.ayahOfDay}
          </h2>
          {ayahOfDay ? (
            <div className="flex-1 flex flex-col justify-center">
              <p className="font-amiri text-2xl md:text-4xl text-white leading-[2] mb-6 text-center" dir="rtl">
                {ayahOfDay.textAr} <span className="text-[#D4AF37] mx-2">﴿{toArabicNumerals(ayahOfDay.ayahNumber)}﴾</span>
              </p>
              <div className="mt-auto bg-[#011a14]/60 border border-[#D4AF37]/20 p-4 md:p-6 rounded-2xl">
                <span className="text-[#D4AF37] font-cairo font-bold mb-2 block">{t.tafsirTitle} (سورة {ayahOfDay.surahName})</span>
                <p className="font-cairo text-emerald-50 leading-relaxed text-sm md:text-base text-justify" dir="rtl">{ayahOfDay.tafsir}</p>
              </div>
            </div>
          ) : <div className="text-emerald-200 font-cairo text-center m-auto">{t.loading}</div>}
        </div>

        <div className="bg-[#022c22]/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 flex flex-col relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] text-glow mb-6 border-b border-[#D4AF37]/20 pb-4 relative z-10 flex items-center gap-3">
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            {t.duaOfDay}
          </h2>
          <div className="flex-1 flex items-center justify-center relative z-10">
             <p className="font-amiri text-2xl md:text-4xl text-white leading-loose text-center" dir="rtl">« {currentDua} »</p>
          </div>
          <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-[#D4AF37] opacity-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT 2 : QURAN TV (DIFFUSION ET RECHERCHE INTÉGRÉE)
// ============================================================================
const QuranTVView = ({ uiLang, t }: { uiLang: string, t: any }) => {
  const [surahsList, setSurahsList] = useState<any[]>([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  
  const getDefaultTranslation = (lang: string) => {
    if (lang === 'fr') return 'fr.hamidullah';
    if (lang === 'en') return 'en.sahih';
    return 'en.sahih';
  };
  const [selectedTranslation, setSelectedTranslation] = useState(getDefaultTranslation(uiLang));
  
  const [playlistMode, setPlaylistMode] = useState<'surah' | 'search'>('surah'); 
  const [searchMatches, setSearchMatches] = useState<any[]>([]);
  
  const [ayahs, setAyahs] = useState<any[]>([]); 
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [activeVerse, setActiveVerse] = useState<any>(null); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatingVerse, setIsRepeatingVerse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [currentSurahInfo, setCurrentSurahInfo] = useState({ nameAr: "", nameEn: "" });
  
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const [searchError, setSearchError] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSurahRef = useRef(selectedSurah);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah').then(res => res.json()).then(data => setSurahsList(data.data));
  }, []);

  useEffect(() => {
    setSelectedTranslation(getDefaultTranslation(uiLang));
  }, [uiLang]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedReciter}`).then(res => res.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedTranslation}`).then(res => res.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/ar.saadi`).then(res => res.json())
    ]).then(([arData, translationData, tafsirData]) => {
       if(arData.code === 200) {
         setAyahs(arData.data.ayahs.map((ayah: any, idx: number) => ({
           id: ayah.number, 
           numberInSurah: ayah.numberInSurah, 
           textAr: ayah.text, 
           audioUrl: ayah.audio || undefined,
           translatedText: translationData.data.ayahs[idx].text, 
           tafsir: tafsirData.data.ayahs[idx].text,
           surahNameAr: arData.data.name,
           surahNameEn: arData.data.englishName
         })));
         
         if (playlistMode === 'surah') {
           setCurrentSurahInfo({ nameAr: arData.data.name, nameEn: arData.data.englishName });
           if (prevSurahRef.current !== selectedSurah) {
             setCurrentAyahIndex(0);
             prevSurahRef.current = selectedSurah;
           }
         }
       }
    }).finally(() => setIsLoading(false));
  }, [selectedSurah, selectedReciter, selectedTranslation]);

  useEffect(() => {
    if (playlistMode === 'surah' && ayahs.length > 0) {
      const verse = ayahs[currentAyahIndex];
      if (verse) {
        setActiveVerse(verse);
        setCurrentSurahInfo({ nameAr: verse.surahNameAr, nameEn: verse.surahNameEn });
      }
    } else if (playlistMode === 'search' && searchMatches.length > 0) {
      const match = searchMatches[currentAyahIndex];
      if (!match) return;
      
      setIsLoadingVerse(true);
      Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/${selectedReciter}`).then(res=>res.json()),
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/${selectedTranslation}`).then(res=>res.json()),
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/ar.saadi`).then(res=>res.json())
      ]).then(([arData, transData, tafsirData]) => {
        if (arData.code === 200) {
          setActiveVerse({
            id: match.number,
            numberInSurah: match.numberInSurah,
            textAr: arData.data.text,
            audioUrl: arData.data.audio || undefined,
            translatedText: transData?.data?.text || "",
            tafsir: tafsirData?.data?.text || "",
            surahNameAr: match.surah.name,
            surahNameEn: match.surah.englishName
          });
          setCurrentSurahInfo({
            nameAr: match.surah.name,
            nameEn: match.surah.englishName
          });
        }
      }).finally(() => setIsLoadingVerse(false));
    }
  }, [currentAyahIndex, playlistMode, ayahs, searchMatches, selectedReciter, selectedTranslation]);

  useEffect(() => {
    if (isPlaying && audioRef.current && activeVerse) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) playPromise.catch(e => console.log("Audio play prevented:", e));
    }
  }, [activeVerse, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current && activeVerse) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
      else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false)); }
    }
  };

  const handleAyahEnded = () => {
    if (isRepeatingVerse && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio replay prevented:", e));
      return;
    }
    const maxIndex = playlistMode === 'surah' ? ayahs.length - 1 : searchMatches.length - 1;
    if (currentAyahIndex < maxIndex) {
      setCurrentAyahIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentAyahIndex(0); 
    }
  };

  const maxIndex = playlistMode === 'surah' ? Math.max(0, ayahs.length - 1) : Math.max(0, searchMatches.length - 1);
  const progressPercentage = maxIndex > 0 ? (currentAyahIndex / maxIndex) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maxIndex === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const isRtl = uiLang === 'ar';
    const effectivePos = isRtl ? 1 - pos : pos;
    setCurrentAyahIndex(Math.min(Math.floor(effectivePos * (maxIndex + 1)), maxIndex));
  };

  const restartRecitation = () => {
    setCurrentAyahIndex(0);
    if (!isPlaying) setIsPlaying(true);
    else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio restart prevented:", e));
    }
  };

  const restartAyah = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) setIsPlaying(true);
      else audioRef.current.play().catch(e => console.log("Audio restart prevented:", e));
    }
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearchQuery.trim()) return;
    setIsSearchingGlobal(true);
    setSearchError("");

    fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(globalSearchQuery)}/all/ar`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.matches.length > 0) {
          setSearchMatches(data.data.matches);
          setPlaylistMode('search');
          setCurrentAyahIndex(0);
          setIsPlaying(true);
        } else {
          setSearchError(t.noResults);
          setTimeout(() => setSearchError(""), 3000);
        }
      })
      .catch(() => {
        setSearchError(t.noResults);
        setTimeout(() => setSearchError(""), 3000);
      })
      .finally(() => setIsSearchingGlobal(false));
  };

  const displaySurahName = playlistMode === 'search' 
    ? (activeVerse ? activeVerse.surahNameAr.replace('سُورَةُ ', '') : '') 
    : (currentSurahInfo.nameAr ? currentSurahInfo.nameAr.replace('سُورَةُ ', '') : '');

  const currentReciter = RECITERS.find(r => r.id === selectedReciter);

  return (
    <div className="w-full flex-1 flex flex-col relative z-20">
      <div className="flex flex-wrap gap-4 font-cairo justify-center mb-6 items-center w-full max-w-5xl mx-auto relative">
        {searchError && (
          <div className="absolute -top-12 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm z-50 shadow-lg animate-pulse">
            {searchError}
          </div>
        )}

        <form onSubmit={handleGlobalSearch} className="flex items-center gap-2 bg-black/80 border border-[#D4AF37]/50 rounded-xl px-4 py-3 hover:border-[#D4AF37] transition-colors relative">
          <button type="submit" disabled={isSearchingGlobal} className="text-[#D4AF37] hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center active:scale-90 transition-transform">
            {isSearchingGlobal ? (
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/30 border-l-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute inset-1 border-2 border-t-transparent border-r-[#D4AF37] border-b-transparent border-l-[#D4AF37]/30 rounded-full animate-spin-reverse-slow"></div>
                <img 
                  src="https://yt3.ggpht.com/QrZ62zK_7WCq3eS4m0cXx3P18RljKqHs2Epjr6A5VsTokL6SrWlWD3mhrh7oIkOV6XFoTEuXaw=s88-c-k-c0x00ffffff-no-rj" 
                  alt="Logo" 
                  className="w-3 h-3 rounded-full animate-pulse-gentle"
                />
              </div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            )}
          </button>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={globalSearchQuery} 
            onChange={(e) => setGlobalSearchQuery(e.target.value)} 
            className="bg-transparent text-white outline-none w-48 md:w-64 text-sm placeholder-gray-400" 
            dir={uiLang === 'ar' ? 'rtl' : 'ltr'} 
          />
        </form>

        <select 
          value={playlistMode === 'surah' ? selectedSurah : ""} 
          onChange={(e) => {
            setSelectedSurah(Number(e.target.value)); 
            setPlaylistMode('surah');
            setIsPlaying(true);
          }} 
          className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black"
        >
          {playlistMode === 'search' ? <option value="" disabled className="bg-[#022c22]">{t.searchResults}...</option> : null}
          {surahsList.map(s => <option key={s.number} value={s.number} className="bg-[#022c22]">{s.number}. {s.name}</option>)}
        </select>

        <select value={selectedReciter} onChange={(e) => setSelectedReciter(e.target.value)} className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black">
          {RECITERS.map(r => <option key={r.id} value={r.id} className="bg-[#022c22]">{r.name}</option>)}
        </select>

        <select value={selectedTranslation} onChange={(e) => setSelectedTranslation(e.target.value)} className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black">
          {TRANSLATIONS.map(tr => <option key={tr.id} value={tr.id} className="bg-[#022c22]">{t.translation}: {tr.name}</option>)}
        </select>
      </div>

      <div className={`relative w-full transition-all duration-1000 ease-in-out ${isPlaying ? 'max-w-full' : 'max-w-[1280px]'} mx-auto aspect-[9/16] sm:aspect-[3/4] md:aspect-video overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#D4AF37]/30`}
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1565552643952-b5b63023e387?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <audio ref={audioRef} src={activeVerse ? activeVerse.audioUrl : undefined} onEnded={handleAyahEnded} />

        <div className="absolute inset-0 bg-black/70 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-islamic-pattern mix-blend-screen opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-3/4 h-3/4 bg-emerald-500/20 blur-[100px] rounded-full"></div></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`, animationDelay: `${Math.random() * 15}s`, animationDuration: `${10 + Math.random() * 20}s` }}></div>
          ))}
        </div>

        <div className={`absolute transition-all duration-1000 ease-in-out z-40 pointer-events-none
          ${isPlaying 
            ? 'top-14 left-1/2 -translate-x-[calc(100%+8px)] w-auto opacity-100' 
            : 'right-0 md:right-4 top-0 bottom-12 w-28 md:w-56 flex flex-col items-center justify-end translate-x-0 opacity-100'
          }`}>
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-1000 ${isPlaying ? 'scale-[0.6] sm:scale-75 md:scale-90 origin-top' : 'pt-10 px-3'}`}>
            <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-[#D4AF37]/60 rounded-lg p-3 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] relative before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-4 before:bg-[#D4AF37]/40">
              <span className="font-amiri text-[#D4AF37] text-sm md:text-xl text-glow block mb-1 opacity-80">
                سورة
              </span>
              <span className="font-amiri text-white text-xl md:text-4xl font-bold text-glow leading-tight block">
                {displaySurahName}
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-2" />
              <span className="font-cairo text-emerald-100/80 text-[10px] md:text-xs tracking-widest uppercase block">
                {currentSurahInfo.nameEn}
              </span>
            </div>
          </div>
          {!isPlaying && (
            <svg viewBox="0 0 100 800" className="h-48 md:h-64 w-full fill-[#D4AF37] opacity-40 mt-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              <path d="M50,0 C80,100 20,200 50,400 C80,600 20,700 50,800 L0,800 L0,0 Z" />
              <path d="M25,350 L50,400 L25,450 Z" opacity="0.5"/>
            </svg>
          )}
        </div>

        <div className={`absolute transition-all duration-1000 ease-in-out z-40 pointer-events-none
          ${isPlaying 
            ? 'top-14 left-1/2 translate-x-2 w-auto opacity-100' 
            : 'left-0 md:left-4 top-0 bottom-12 w-28 md:w-56 flex flex-col items-center justify-end translate-x-0 opacity-100'
          }`}>
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-1000 ${isPlaying ? 'scale-[0.6] sm:scale-75 md:scale-90 origin-top' : 'pt-10 px-3'}`}>
            <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-[#D4AF37]/60 rounded-lg p-3 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] relative before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-4 before:bg-[#D4AF37]/40">
              <span className="font-amiri text-[#D4AF37] text-sm md:text-xl text-glow block mb-1 opacity-80">
                القارئ
              </span>
              <span className="font-amiri text-white text-xl md:text-3xl font-bold text-glow leading-tight block">
                {currentReciter?.name.split(' (')[0]}
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-2" />
              <span className="font-cairo text-emerald-100/80 text-[10px] md:text-xs tracking-widest uppercase block" dir="ltr">
                {currentReciter?.nameFr}
              </span>
            </div>
          </div>
          {!isPlaying && (
            <svg viewBox="0 0 100 800" className="h-48 md:h-64 w-full fill-[#D4AF37] opacity-40 mt-4 rotate-180 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              <path d="M50,0 C80,100 20,200 50,400 C80,600 20,700 50,800 L0,800 L0,0 Z" />
              <path d="M25,350 L50,400 L25,450 Z" opacity="0.5"/>
            </svg>
          )}
        </div>

        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-md border-b border-[#D4AF37]/30 flex items-center z-30 overflow-hidden pointer-events-none">
            <div className="bg-[#D4AF37] text-black px-6 h-full flex items-center justify-center font-bold shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-40">
              <span className="font-amiri text-lg whitespace-nowrap">بث حي</span>
            </div>
            <div className="flex-1 relative h-full flex items-center">
              <div className="flex whitespace-nowrap animate-top-ticker font-amiri text-white text-xl md:text-2xl items-center h-full">
                <span className="mx-8">📖 سورة {displaySurahName} ({currentSurahInfo.nameEn})</span>
                <span className="mx-8 text-[#D4AF37]">•</span>
                <span className="mx-8">🎙️ القارئ: {currentReciter?.name.split(' (')[0]} ({currentReciter?.nameFr})</span>
                <span className="mx-8 text-[#D4AF37]">•</span>
                <span className="mx-8">✨ قناة نعيم الذاكرين - تلاوات خاشعة ✨</span>
                <span className="mx-8 text-[#D4AF37]">•</span>
                <span className="mx-8">📖 سورة {displaySurahName} ({currentSurahInfo.nameEn})</span>
                <span className="mx-8 text-[#D4AF37]">•</span>
                <span className="mx-8">🎙️ القارئ: {currentReciter?.name.split(' (')[0]} ({currentReciter?.nameFr})</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-white font-cairo text-xs font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-between z-10 p-4 md:p-8 pb-16 pointer-events-none">
          <header className="flex flex-col relative z-20 pointer-events-auto items-center">
            {playlistMode === 'search' && (
               <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-1 rounded-full border border-[#D4AF37]/30 text-sm font-cairo mb-2">
                 {t.searchResults}: "{globalSearchQuery}" ({currentAyahIndex + 1}/{searchMatches.length})
               </span>
            )}
          </header>

          <main className={`flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-10 md:px-20 lg:px-32 overflow-hidden transition-all duration-1000 ${isPlaying ? 'pt-28 md:pt-24' : ''}`}>
            {(isLoading && playlistMode === 'surah') || isLoadingVerse ? (
              <LoadingSpinner size="lg" text={t.loading || "جاري التحميل..."} />
            ) : activeVerse && (
              <div key={activeVerse.id} className="animate-verse w-full flex flex-col items-center pointer-events-none">
                <h1 className={`font-amiri text-white text-glow w-full leading-[1.8] transition-all duration-1000 ${isPlaying ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-2xl sm:text-4xl md:text-6xl lg:text-7xl'}`}>{activeVerse.textAr}</h1>
                <p className={`text-emerald-50 font-light max-w-4xl opacity-90 mt-6 transition-all duration-1000 ${isPlaying ? 'text-lg sm:text-xl md:text-3xl' : 'text-sm sm:text-lg md:text-xl'}`} dir="auto">{activeVerse.translatedText}</p>
              </div>
            )}
          </main>

          <footer className="w-full pointer-events-auto mt-auto mb-2 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <button 
                onClick={restartRecitation}
                className="flex items-center gap-2 px-5 py-3 md:px-4 md:py-2 bg-black/40 hover:bg-black/60 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm md:text-base font-cairo transition-all active:scale-95"
                title="إعادة التلاوة من البداية"
              >
                <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                إعادة التلاوة
              </button>

              <button 
                onClick={() => setIsRepeatingVerse(!isRepeatingVerse)}
                className={`flex items-center gap-2 px-5 py-3 md:px-4 md:py-2 border rounded-full text-sm md:text-base font-cairo transition-all active:scale-95 ${isRepeatingVerse ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black/40 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-black/60'}`}
                title="تكرار الآية الحالية"
              >
                <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                {isRepeatingVerse ? "إلغاء التكرار" : "إعادة الآية"}
              </button>
            </div>

            <div className="relative w-full h-2 bg-black/60 border border-white/20 rounded-full cursor-pointer overflow-hidden" onClick={handleProgressClick}>
              <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-[#D4AF37] to-yellow-200 transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </footer>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14 bg-black/80 backdrop-blur-lg border-t border-[#D4AF37]/40 flex z-20 pointer-events-none">
          <div className="bg-[#D4AF37] text-black px-4 md:px-8 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] z-30 h-full relative border-l-2 border-yellow-200/50">
            <span className="font-amiri font-bold md:text-xl whitespace-nowrap">نعيم الذاكرين</span>
          </div>
          <div className="flex-1 overflow-hidden relative flex items-center h-full">
            <div className="flex whitespace-nowrap animate-ticker font-amiri text-[#D4AF37] text-lg md:text-2xl items-center h-full">
              <span className="mx-6 md:mx-12">✨ قناة نعيم الذاكرين - تلاوات خاشعة تريح القلب ✨</span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12 text-emerald-200">
                {playlistMode === 'search' 
                  ? `جاري عرض نتائج البحث عن الكلمة (${currentAyahIndex + 1}/${searchMatches.length})`
                  : `فضل السورة: ${SURAH_VIRTUES[selectedSurah as keyof typeof SURAH_VIRTUES] || "من قرأ حرفاً من كتاب الله فله به حسنة."}`
                }
              </span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12 text-white">
                تفسير السعدي (الآية {activeVerse?.numberInSurah}): {activeVerse?.tafsir || "..." }
              </span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12 text-emerald-300">
                تدبر في آيات الله البينات: {activeVerse?.textAr ? "تلاوة خاشعة" : "..."}
              </span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12">اللهم صل وسلم على نبينا محمد</span>
            </div>
          </div>
        </div>

        {!isPlaying && !isLoading && !isLoadingVerse && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-6 pointer-events-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={restartRecitation} 
                className="flex items-center gap-2 font-cairo bg-black/60 hover:bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                title="إعادة تلاوة السورة"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                إعادة تلاوة السورة
              </button>
              
              <button 
                onClick={togglePlay} 
                className="flex items-center gap-3 font-cairo bg-[#D4AF37] hover:bg-yellow-400 text-black px-10 py-5 rounded-full font-bold transition-all transform hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                {currentAyahIndex === 0 ? "بدء التلاوة" : "إكمال التلاوة"}
              </button>

              <button 
                onClick={restartAyah} 
                className="flex items-center gap-2 font-cairo bg-black/60 hover:bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                title="إعادة تلاوة الآية"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                إعادة تلاوة الآية
              </button>
            </div>
          </div>
        )}
        
        {isPlaying && (
          <div className="absolute inset-0 z-0 cursor-pointer pointer-events-auto" onClick={togglePlay} />
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT 3 : RADIO ISLAMIQUE
// ============================================================================
const RadioView = ({ t }: { t: any }) => {
  const [radios, setRadios] = useState<any[]>([]);
  const [currentRadio, setCurrentRadio] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('https://mp3quran.net/api/v3/radios')
      .then(res => res.json())
      .then(data => {
        if (data && data.radios) {
          setRadios(data.radios);
        }
      })
      .catch(err => console.error("Radio fetch error:", err));
  }, []);

  const filteredRadios = radios.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePlay = (radio: any) => {
    if (currentRadio?.url === radio.url && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentRadio(radio);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = radio.url;
        audioRef.current.play();
      }
    }
  };

  // Mock data for frequency, summary and Riwaya
  const getRadioInfo = (name: string) => {
    let riwaya = "حفص عن عاصم";
    let region = "عالمي";
    if (name.includes("ورش")) riwaya = "ورش عن نافع";
    if (name.includes("قالون")) riwaya = "قالون عن نافع";
    if (name.includes("الدوري")) riwaya = "الدوري عن أبي عمرو";

    if (name.includes("القاهرة")) region = "مصر";
    else if (name.includes("السعودية")) region = "السعودية";
    else if (name.includes("زايد") || name.includes("أبوظبي")) region = "الإمارات";
    else if (name.includes("الكويت")) region = "الكويت";
    else if (name.includes("البحرين")) region = "البحرين";
    else if (name.includes("عمان")) region = "عمان";
    else if (name.includes("قطر")) region = "قطر";
    else if (name.includes("الجزائر")) region = "الجزائر";
    else if (name.includes("المغرب")) region = "المغرب";
    else if (name.includes("تونس")) region = "تونس";
    else if (name.includes("فلسطين")) region = "فلسطين";
    else if (name.includes("لبنان")) region = "لبنان";

    if (name.includes("القاهرة")) return { freq: "11766 H", summary: "إذاعة القرآن الكريم من القاهرة، أعرق إذاعة قرآنية في العالم الإسلامي.", riwaya: "روايات متنوعة", region: "مصر" };
    if (name.includes("السعودية")) return { freq: "12149 H", summary: "إذاعة القرآن الكريم من المملكة العربية السعودية، تلاوات خاشعة ومباشرة من الحرمين.", riwaya: "حفص عن عاصم", region: "السعودية" };
    if (name.includes("زايد")) return { freq: "12226 H", summary: "إذاعة زايد للقرآن الكريم، تلاوات متنوعة وبرامج إيمانية.", riwaya: "حفص عن عاصم", region: "الإمارات" };
    
    return { 
      freq: "11766 H / 12149 H", 
      summary: "بث مباشر لإذاعة القرآن الكريم بجودة عالية على مدار الساعة.",
      riwaya: riwaya,
      region: region
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      {/* Sticky Header Section */}
      <div className="sticky top-[-1rem] md:top-[-2rem] z-40 bg-black/90 backdrop-blur-xl -mx-4 md:-mx-8 px-4 md:px-8 pt-4 pb-2 rounded-b-3xl border-b border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-8">
        <h2 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] text-center mb-4 text-glow">
          {t.radioTitle}
        </h2>

        {/* Search and Dropdown */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 animate-fadeIn">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="بحث عن إذاعة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#011a14] border border-[#D4AF37]/30 text-white px-10 py-3 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-cairo text-sm md:text-base"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37]">🔍</span>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 hover:text-[#D4AF37]">✖</button>
            )}
          </div>
          
          <div className="md:w-64 relative">
            <select 
              onChange={(e) => {
                const radio = radios.find(r => r.url === e.target.value);
                if (radio) togglePlay(radio);
              }}
              value={currentRadio?.url || ""}
              className="w-full bg-[#011a14] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-3 rounded-xl outline-none focus:border-[#D4AF37] transition-all font-cairo appearance-none cursor-pointer text-sm md:text-base"
            >
              <option value="">اختر إذاعة من القائمة...</option>
              {radios.map((radio, idx) => (
                <option key={idx} value={radio.url}>{idx + 1}. {radio.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">▼</span>
          </div>
        </div>

        {/* Selected Radio Player - 50% Transparent inside the sticky header */}
        {currentRadio && (
          <div className="animate-fadeIn mb-2">
            <div className="bg-gradient-to-br from-[#022c22]/50 to-black/50 border border-[#D4AF37]/50 rounded-2xl p-3 md:p-4 shadow-[0_0_20px_rgba(212,175,55,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center">
                <div className="animate-pulse">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37]/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6 relative z-10">
                <button 
                  onClick={() => togglePlay(currentRadio)}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95 shrink-0"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                
                <div className="text-right flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-3 truncate">
                      <h3 className="text-lg md:text-2xl font-amiri text-white truncate">{currentRadio.name}</h3>
                      {isPlaying && (
                        <div className="flex items-end gap-0.5 h-4 mb-1">
                          <div className="w-0.5 bg-[#D4AF37] animate-[music-bar_0.8s_ease-in-out_infinite] h-full"></div>
                          <div className="w-0.5 bg-[#D4AF37] animate-[music-bar_1.2s_ease-in-out_infinite] h-2/3"></div>
                          <div className="w-0.5 bg-[#D4AF37] animate-[music-bar_0.6s_ease-in-out_infinite] h-1/2"></div>
                          <div className="w-0.5 bg-[#D4AF37] animate-[music-bar_1s_ease-in-out_infinite] h-3/4"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {getRadioInfo(currentRadio.name).region !== "عالمي" && (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-cairo">
                          {getRadioInfo(currentRadio.name).region}
                        </span>
                      )}
                      {getRadioInfo(currentRadio.name).riwaya !== "حفص عن عاصم" && (
                        <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full text-[10px] font-cairo">
                          رواية: {getRadioInfo(currentRadio.name).riwaya}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#D4AF37]/80 font-cairo text-[10px] md:text-xs">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a11 11 0 0115.658 0M2.929 9.293a16 16 0 0122.142 0"/></svg>
                      {getRadioInfo(currentRadio.name).freq}
                    </span>
                    <span className="w-1 h-1 bg-[#D4AF37]/40 rounded-full hidden md:block"></span>
                    <span className="truncate opacity-70">{getRadioInfo(currentRadio.name).summary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRadios.map((radio, idx) => (
          <div key={idx} className={`bg-[#011a14]/80 border ${currentRadio?.url === radio.url ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50' : 'border-[#D4AF37]/20'} rounded-2xl p-6 flex items-center justify-between hover:border-[#D4AF37] transition-all group shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm border border-[#D4AF37]/20">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-white font-cairo font-bold text-sm md:text-base leading-tight">{radio.name}</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                  {getRadioInfo(radio.name).region !== "عالمي" && (
                    <span className="text-emerald-400/80 text-[9px] font-cairo">
                      {getRadioInfo(radio.name).region}
                    </span>
                  )}
                  {getRadioInfo(radio.name).riwaya !== "حفص عن عاصم" && (
                    <span className="text-[#D4AF37]/60 text-[9px] font-cairo">
                      {getRadioInfo(radio.name).riwaya}
                    </span>
                  )}
                  <span className="text-emerald-200/40 text-[9px] font-mono">
                    {getRadioInfo(radio.name).freq}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => togglePlay(radio)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentRadio?.url === radio.url && isPlaying ? 'bg-red-500 text-white' : 'bg-[#D4AF37] text-black hover:scale-110'}`}
            >
              {currentRadio?.url === radio.url && isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          </div>
        ))}
      </div>
      <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
    </div>
  );
};

// ============================================================================
// COMPOSANT 4 : AZKAR (INVOCATIONS)
// ============================================================================
const ZikrItem = ({ item, playingId, onPlay }: any) => {
  const initialCount = parseInt(item.count) || 1;
  const [count, setCount] = useState(initialCount);

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count > 0) {
      setCount(prev => prev - 1);
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(initialCount);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(item.zekr);
  };

  return (
    <div 
      onClick={handleDecrement}
      className={`bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-2xl p-6 md:p-8 shadow-lg transition-all cursor-pointer hover:border-[#D4AF37]/50 active:bg-[#022a20] active:scale-[0.99] ${count === 0 ? 'opacity-40 grayscale scale-[0.98]' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <button 
          onClick={handlePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${playingId === item.zekr ? 'bg-red-500 text-white animate-pulse' : 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`}
          title="استماع"
        >
          {playingId === item.zekr ? '⏹' : '🔊'}
        </button>
        <p className="text-[#D4AF37] font-amiri text-xl md:text-2xl leading-loose text-right flex-1 select-none" dir="rtl">{item.zekr}</p>
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-[#D4AF37]/10">
        <div className="flex items-center gap-4">
           <div 
             className={`px-6 py-2 rounded-full font-bold text-lg transition-all flex items-center gap-3 shadow-lg ${
               count === 0 
               ? 'bg-gray-600 text-gray-300' 
               : 'bg-[#D4AF37] text-black'
             }`}
           >
             <span className="font-cairo text-sm md:text-base">التكرار:</span>
             <span className="text-2xl font-mono">{count}</span>
           </div>
           {count !== initialCount && (
             <button 
               onClick={handleReset} 
               className="p-2 bg-white/5 rounded-full text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all"
               title="إعادة التكرار"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
             </button>
           )}
        </div>
        {(item.description || item.reference) && (
          <p className="text-emerald-200/60 font-cairo text-xs md:text-sm text-right italic max-w-md select-none" dir="rtl">
            {item.description || item.reference}
          </p>
        )}
      </div>
      {count === 0 && (
        <div className="mt-4 text-center">
          <span className="text-[#D4AF37] font-cairo text-sm font-bold">تم الانتهاء ✅</span>
        </div>
      )}
    </div>
  );
};

const AzkarView = ({ t }: { t: any }) => {
  const [azkar, setAzkar] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMainGroup, setSelectedMainGroup] = useState<'daily' | 'worship' | 'general' | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const mainGroups = {
    daily: { 
      name: "أذكار يومية", 
      cats: ["أذكار الصباح", "أذكار المساء", "أذكار النوم", "أذكار الاستيقاظ من النوم", "الذكر عند دخول المنزل", "الذكر عند الخروج من المنزل"] 
    },
    worship: { 
      name: "أذكار متعلقة بالعبادات", 
      cats: ["أذكار الصلاة", "أذكار الأذان", "الذكر قبل الوضوء", "الذكر بعد الفراغ من الوضوء", "دعاء الذهاب إلى المسجد", "دعاء دخول المسجد", "دعاء الخروج من المسجد", "أذكار الحج والعمرة"] 
    },
    general: { 
      name: "أذكار عامة", 
      cats: ["أدعية عامة", "أذكار السفر", "أذكار الطعام والشراب", "دعاء لبس الثوب", "دعاء لبس الثوب الجديد", "ما يقول إذا وضع ثوبه", "دعاء دخول الخلاء", "دعاء الخروج من الخلاء", "أذكار الاستغفار والتوبة", "أذكار الكرب والهم", "أذكار المرض", "أذكار الزواج", "أذكار متفرقة"] 
    }
  };

  useEffect(() => {
    setAzkar(HISN_AL_MUSLIM);
    setLoading(false);
  }, []);

  const playZikr = (text: string) => {
    if (playingId === text) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for "calm" effect
    utterance.pitch = 0.9; // Lower pitch for "male" effect
    utterance.onend = () => setPlayingId(null);
    
    // Try to find a male voice
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => v.lang.startsWith('ar') && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('maged')));
    if (maleVoice) utterance.voice = maleVoice;

    window.speechSynthesis.speak(utterance);
    setPlayingId(text);
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><LoadingSpinner size="lg" text={t.loading || "جاري التحميل..."} /></div>;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] text-center mb-12 text-glow">
        {t.azkarTitle}
      </h2>

      <div className="flex flex-col gap-8">
        {/* Main Groups Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(mainGroups) as Array<keyof typeof mainGroups>).map((key) => (
            <button 
              key={key}
              onClick={() => {
                setSelectedMainGroup(key);
                setSelectedCategory(null);
              }}
              className={`p-6 rounded-2xl border transition-all font-cairo font-bold text-lg shadow-lg ${selectedMainGroup === key ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#011a14]/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]'}`}
            >
              {mainGroups[key].name}
            </button>
          ))}
        </div>

        {selectedMainGroup && (
          <div className="animate-fadeIn">
            <div className="relative mb-8">
              <select 
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory || ""}
                className="w-full bg-[#011a14] border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-4 rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-cairo appearance-none cursor-pointer text-lg text-right"
                dir="rtl"
              >
                <option value="">اختر التصنيف...</option>
                {mainGroups[selectedMainGroup].cats.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">▼</span>
            </div>

            {selectedCategory && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                  <h3 className="text-2xl font-amiri text-[#D4AF37] text-center border-b-2 border-[#D4AF37] pb-2 px-8">{selectedCategory}</h3>
                  <button 
                    onClick={() => setResetKey(prev => prev + 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-cairo transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    إعادة تصفير الكل
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6" key={resetKey}>
                  {azkar.find(g => g.category === selectedCategory)?.items.map((item: any, idx: number) => (
                    <ZikrItem 
                      key={`${idx}-${resetKey}`} 
                      item={item} 
                      playingId={playingId}
                      onPlay={playZikr}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT 5 : HADITH (LES PAROLES DU PROPHÈTE)
// ============================================================================
const HadithView = ({ t }: { t: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIntro, setShowIntro] = useState(false);
  const [activeTab, setActiveTab] = useState<'definition' | 'collection' | 'types'>('definition');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<number, 'ar' | 'fr' | 'en'>>({});

  const filteredHadiths = ARBAEEN_HADITHS.items.filter(h => 
    h.text.includes(searchTerm) || 
    h.narrator.includes(searchTerm) || 
    h.title.includes(searchTerm)
  );

  const HADITH_TYPES = [
    {
      title: "أولًا: من حيث القائل (المصدر)",
      items: [
        { name: "الحديث القدسي", desc: "ما يرويه النبي ﷺ عن الله تعالى، لكن ليس من القرآن. المعنى من الله، واللفظ من النبي." },
        { name: "الحديث النبوي", desc: "ما صدر عن النبي ﷺ من قول أو فعل أو تقرير." }
      ]
    },
    {
      title: "ثانيًا: من حيث الصحة (القبول والرد)",
      items: [
        { name: "حديث صحيح", desc: "سنده متصل، ورواته ثقات، وخالٍ من الشذوذ والعلة. يُعمل به.", color: "text-emerald-400" },
        { name: "حديث حسن", desc: "أقل درجة من الصحيح، لكن مقبول. يُعمل به أيضًا.", color: "text-blue-400" },
        { name: "حديث ضعيف", desc: "فيه خلل في السند أو الرواة. لا يُعمل به في الأحكام (إلا بشروط في فضائل الأعمال عند بعض العلماء).", color: "text-orange-400" },
        { name: "حديث موضوع", desc: "مكذوب على النبي ﷺ. لا يجوز روايته إلا للتحذير منه.", color: "text-red-400" }
      ]
    },
    {
      title: "ثالثًا: من حيث عدد الرواة",
      items: [
        { name: "حديث متواتر", desc: "رواه عدد كبير يستحيل تواطؤهم على الكذب. يفيد اليقين." },
        { name: "حديث آحاد", desc: "لم يبلغ درجة التواتر، وينقسم إلى: مشهور، عزيز، غريب." }
      ]
    },
    {
      title: "رابعًا: من حيث السند",
      items: [
        { name: "حديث متصل", desc: "كل راوٍ سمع ممن فوقه." },
        { name: "حديث منقطع", desc: "فيه سقوط راوٍ أو أكثر." },
        { name: "حديث مرسل", desc: "رواه التابعي مباشرة عن النبي ﷺ (بدون الصحابي)." },
        { name: "حديث معضل", desc: "سقط منه راويان متتاليان أو أكثر." }
      ]
    },
    {
      title: "خامسًا: من حيث المتن (المحتوى)",
      items: [
        { name: "قولي", desc: "كلام قاله النبي ﷺ" },
        { name: "فعلي", desc: "فعل قام به" },
        { name: "تقريري", desc: "أقرّ شيئًا فعله أحد الصحابة ولم ينكره" }
      ]
    }
  ];

  const playHadith = async (text: string, id: number, lang: 'ar' | 'fr' | 'en' = 'ar') => {
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(id + 1000); // Temporary state to trigger re-render if needed, but actually just stop
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
    setPlayingId(id);
  };

  const setLang = (id: number, lang: 'ar' | 'fr' | 'en') => {
    setVisibleTranslations(prev => ({ ...prev, [id]: lang }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-amiri text-[#D4AF37] mb-4 text-glow">
          الأحاديث النبوية الشريفة
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button 
            onClick={() => setActiveTab('definition')}
            className={`px-6 py-2 rounded-full font-cairo transition-all text-sm md:text-base ${activeTab === 'definition' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#011a14] text-[#D4AF37] border border-[#D4AF37]/30'}`}
          >
            تعريف الحديث
          </button>
          <button 
            onClick={() => setActiveTab('collection')}
            className={`px-6 py-2 rounded-full font-cairo transition-all text-sm md:text-base ${activeTab === 'collection' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#011a14] text-[#D4AF37] border border-[#D4AF37]/30'}`}
          >
            الأربعون الأربعينية
          </button>
          <button 
            onClick={() => setActiveTab('types')}
            className={`px-6 py-2 rounded-full font-cairo transition-all text-sm md:text-base ${activeTab === 'types' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#011a14] text-[#D4AF37] border border-[#D4AF37]/30'}`}
          >
            تصنيفات الحديث
          </button>
        </div>
      </div>

      {activeTab === 'definition' && (
        <div className="animate-fadeIn space-y-8">
          <div className="bg-[#011a14]/80 border border-[#D4AF37]/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
            <h3 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] mb-6 text-right" dir="rtl">ما هو الحديث النبوي؟</h3>
            <div className="space-y-6 text-emerald-50/90 font-amiri text-xl md:text-2xl leading-loose text-right" dir="rtl">
              <p>الحديث النبوي هو كل ما أثر عن النبي محمد ﷺ من <span className="text-[#D4AF37] font-bold">قول</span>، أو <span className="text-[#D4AF37] font-bold">فعل</span>، أو <span className="text-[#D4AF37] font-bold">تقرير</span>، أو <span className="text-[#D4AF37] font-bold">صفة خَلقية</span> أو <span className="text-[#D4AF37] font-bold">خُلقية</span>.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-black/40 p-6 rounded-2xl border border-[#D4AF37]/10">
                  <h4 className="text-[#D4AF37] font-bold mb-2">القولي</h4>
                  <p className="text-sm opacity-70">ما قاله النبي ﷺ في مختلف المناسبات.</p>
                </div>
                <div className="bg-black/40 p-6 rounded-2xl border border-[#D4AF37]/10">
                  <h4 className="text-[#D4AF37] font-bold mb-2">الفعلي</h4>
                  <p className="text-sm opacity-70">أفعاله ﷺ التي نقلها الصحابة مثل كيفية الصلاة والحج.</p>
                </div>
                <div className="bg-black/40 p-6 rounded-2xl border border-[#D4AF37]/10">
                  <h4 className="text-[#D4AF37] font-bold mb-2">التقريري</h4>
                  <p className="text-sm opacity-70">ما فعله الصحابة أمامه أو بلغ عنه فسكت عنه أو أقره.</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('collection')}
            className="w-full py-4 bg-[#D4AF37] text-black rounded-2xl font-bold text-xl hover:scale-[1.02] transition-transform shadow-lg"
          >
            انتقل إلى الأربعين الأربعينية
          </button>
        </div>
      )}

      {activeTab === 'collection' && (
        <div className="animate-fadeIn">
          {/* Introduction */}
          <div className="mb-12">
            <button 
              onClick={() => setShowIntro(!showIntro)}
              className="w-full flex items-center justify-between bg-[#011a14] border border-[#D4AF37]/30 p-4 rounded-2xl text-[#D4AF37] font-amiri text-xl hover:bg-[#022c22] transition-colors"
            >
              <span>المقدمة</span>
              <span>{showIntro ? '▲' : '▼'}</span>
            </button>
            {showIntro && (
              <div className="mt-4 bg-[#011a14]/40 border border-[#D4AF37]/10 rounded-2xl p-6 md:p-8 text-emerald-100 leading-loose font-amiri text-lg md:text-xl text-right whitespace-pre-line" dir="rtl">
                {ARBAEEN_HADITHS.introduction}
              </div>
            )}
          </div>

          {/* Search and Dropdown */}
          <div className="sticky top-[-1rem] z-40 bg-black/90 backdrop-blur-xl -mx-4 md:-mx-8 px-4 md:px-8 pt-4 pb-4 rounded-b-3xl border-b border-[#D4AF37]/20 shadow-lg mb-12">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="بحث في الأحاديث..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#011a14] border border-[#D4AF37]/30 text-white px-12 py-3 rounded-xl outline-none focus:border-[#D4AF37] transition-all font-cairo"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50">🔍</span>
              </div>
              
              <div className="md:w-72 relative">
                <select 
                  onChange={(e) => {
                    const id = e.target.value;
                    if (id) {
                      const element = document.getElementById(`hadith-${id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }}
                  className="w-full bg-[#011a14] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-3 rounded-xl outline-none focus:border-[#D4AF37] transition-all font-cairo appearance-none cursor-pointer"
                >
                  <option value="">اختر حديثاً...</option>
                  {ARBAEEN_HADITHS.items.map((h) => (
                    <option key={h.id} value={h.id}>{h.id}. {h.title}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">▼</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {filteredHadiths.map((h) => {
              const currentLang = (visibleTranslations[h.id] || 'ar') as 'ar' | 'fr' | 'en';
              const displayText = currentLang === 'ar' ? h.text : currentLang === 'fr' ? h.textFr || "Traduction bientôt disponible..." : h.textEn || "Translation coming soon...";
              
              return (
                <div 
                  key={h.id} 
                  id={`hadith-${h.id}`}
                  className="bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center">
                    <span className="text-[#D4AF37] font-bold text-xl mr-4 mt-4">#{h.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-2">
                       <button 
                        onClick={() => playHadith(displayText, h.id, currentLang)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${playingId === h.id ? 'bg-red-500 text-white animate-pulse' : 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`}
                        title="استماع"
                      >
                        {playingId === h.id ? '⏹' : '🔊'}
                      </button>
                    </div>
                    <h4 className="text-[#D4AF37] font-amiri text-xl text-right">{h.title}</h4>
                  </div>
                  
                  <p className="text-emerald-200/70 font-cairo text-sm md:text-base text-right mb-6" dir="rtl">
                    {h.narrator}
                  </p>
                  
                  <p className={`text-white leading-relaxed mb-8 ${currentLang === 'ar' ? 'font-amiri text-2xl md:text-3xl text-right' : 'font-sans text-lg md:text-xl text-left'}`} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    {displayText}
                  </p>
                  
                  <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-t border-[#D4AF37]/10 pt-6">
                    <div className="flex bg-black/40 rounded-xl p-1 border border-[#D4AF37]/20">
                      <button onClick={() => setLang(h.id, 'ar')} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${currentLang === 'ar' ? 'bg-[#D4AF37] text-black' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>AR</button>
                      <button onClick={() => setLang(h.id, 'fr')} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${currentLang === 'fr' ? 'bg-[#D4AF37] text-black' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>FR</button>
                      <button onClick={() => setLang(h.id, 'en')} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${currentLang === 'en' ? 'bg-[#D4AF37] text-black' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>EN</button>
                    </div>
                    
                    <div className="bg-black/20 rounded-xl px-4 py-2 border-r-4 border-[#D4AF37] text-right">
                      <p className="text-emerald-100/40 font-cairo text-[10px] md:text-xs italic" dir="rtl">
                        {h.source}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredHadiths.length === 0 && (
              <div className="text-center py-12 text-emerald-100/40 font-cairo">
                لا توجد نتائج مطابقة لبحثك
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'types' && (
        <div className="space-y-12 animate-fadeIn">
          {HADITH_TYPES.map((section, sIdx) => (
            <div key={sIdx} className="bg-[#011a14]/60 border border-[#D4AF37]/20 rounded-3xl p-6 md:p-10 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] mb-8 border-b border-[#D4AF37]/20 pb-4 text-right" dir="rtl">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="bg-black/40 p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group">
                    <h4 className={`text-xl font-bold font-cairo mb-3 text-right ${item.color || 'text-white'}`} dir="rtl">
                      {item.name}
                    </h4>
                    <p className="text-emerald-100/70 font-cairo text-sm leading-relaxed text-right" dir="rtl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPOSANT 7 : LECTURE DU CORAN (READER)
// ============================================================================
const QuranReaderView = ({ t, uiLang, fontSize, fontFamily }: any) => {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [verseSearchQuery, setVerseSearchQuery] = useState('');
  const [verseSearchResults, setVerseSearchResults] = useState<any[]>([]);
  const [isSearchingVerses, setIsSearchingVerses] = useState(false);
  
  const [showTafsir, setShowTafsir] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const [selectedReciter, setSelectedReciter] = useState('ar.alafasy');
  const [selectedTafsir, setSelectedTafsir] = useState('ar.jalalayn');
  const [selectedTranslation, setSelectedTranslation] = useState('en.sahih');
  const [selectedMushaf, setSelectedMushaf] = useState('quran-uthmani');
  
  const [reciters, setReciters] = useState<any[]>([]);
  const [tafsirs, setTafsirs] = useState<any[]>([]);
  const [translations, setTranslations] = useState<any[]>([]);
  const [mushafs, setMushafs] = useState<any[]>([]);
  
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [hiddenVerses, setHiddenVerses] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://api.alquran.cloud/v1/surah').then(res => res.json()),
      fetch('https://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse').then(res => res.json()),
      fetch('https://api.alquran.cloud/v1/edition?type=tafsir').then(res => res.json()),
      fetch('https://api.alquran.cloud/v1/edition?type=translation').then(res => res.json()),
      fetch('https://api.alquran.cloud/v1/edition?format=text&type=quran').then(res => res.json())
    ]).then(([surahData, reciterData, tafsirData, translationData, mushafData]) => {
      setSurahs(surahData.data);
      setReciters(reciterData.data);
      setTafsirs(tafsirData.data);
      setTranslations(translationData.data);
      setMushafs(mushafData.data);
      setLoading(false);
    });
  }, []);

  const loadSurah = (number: number) => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/${selectedMushaf},${selectedTafsir},${selectedTranslation}`)
      .then(res => res.json())
      .then(data => {
        const uthmani = data.data[0].ayahs;
        const tafsir = data.data[1].ayahs;
        const translation = data.data[2].ayahs;
        
        const merged = uthmani.map((ayah: any, index: number) => ({
          ...ayah,
          tafsir: tafsir[index].text,
          translation: translation[index].text
        }));
        
        setVerses(merged);
        setSelectedSurah(surahs.find(s => s.number === number));
        setLoading(false);
        setIsSearchingVerses(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  };

  const searchVerses = () => {
    if (!verseSearchQuery.trim()) return;
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/search/${verseSearchQuery}/all/ar`)
      .then(res => res.json())
      .then(data => {
        setVerseSearchResults(data.data.matches);
        setIsSearchingVerses(true);
        setLoading(false);
      });
  };

  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [recordings, setRecordings] = useState<Record<number, string>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = (ayahNumber: number) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        const url = URL.createObjectURL(blob);
        setRecordings(prev => ({ ...prev, [ayahNumber]: url }));
      };
      
      mediaRecorder.start();
      setIsRecording(ayahNumber);
    });
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(null);
  };

  const shareVerse = (text: string, surahName: string, ayahNumber: number) => {
    if (navigator.share) {
      navigator.share({
        title: `${surahName} - ${ayahNumber}`,
        text: `${text}\n\n(Shared from ${t.appTitle})`,
        url: window.location.href
      });
    } else {
      copyVerse(text);
    }
  };

  const playAyah = (ayahNumber: number) => {
    if (playingAyah === ayahNumber) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }
    setPlayingAyah(ayahNumber);
    const url = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayahNumber}.mp3`;
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  const copyVerse = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple feedback could be added here
  };

  const toggleHideVerse = (index: number) => {
    const newHidden = new Set(hiddenVerses);
    if (newHidden.has(index)) newHidden.delete(index);
    else newHidden.add(index);
    setHiddenVerses(newHidden);
  };

  const toggleFavorite = (ayahKey: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(ayahKey)) newFavs.delete(ayahKey);
    else newFavs.add(ayahKey);
    setFavorites(newFavs);
  };

  if (loading && surahs.length === 0) return <div className="flex-1 flex items-center justify-center"><LoadingSpinner size="lg" text={t.loading || "جاري التحميل..."} /></div>;

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 font-cairo">
      {!selectedSurah && !isSearchingVerses ? (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-3xl font-amiri text-[#D4AF37] text-glow">{t.quranReader}</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text" 
                  placeholder={t.searchSurah}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#011a14] border border-[#D4AF37]/30 rounded-full py-2 px-6 text-white outline-none focus:border-[#D4AF37] transition-all text-sm"
                />
              </div>
              <div className="relative flex-1 md:w-64 flex">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={verseSearchQuery}
                  onChange={(e) => setVerseSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchVerses()}
                  className="w-full bg-[#011a14] border border-[#D4AF37]/30 rounded-l-full py-2 px-6 text-white outline-none focus:border-[#D4AF37] transition-all text-sm"
                />
                <button onClick={searchVerses} className="bg-[#D4AF37] text-black px-4 rounded-r-full hover:bg-[#b8962d] transition-colors">🔍</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {surahs.filter(s => s.name.includes(searchQuery) || s.englishName.toLowerCase().includes(searchQuery.toLowerCase())).map(surah => (
              <button 
                key={surah.number}
                onClick={() => loadSurah(surah.number)}
                className="bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-2xl p-6 flex justify-between items-center hover:border-[#D4AF37] transition-all group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    {surah.number}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{surah.name}</p>
                    <p className="text-emerald-100/50 text-xs">{surah.englishName} • {surah.numberOfAyahs} {t.ayahs || 'آية'}</p>
                  </div>
                </div>
                <span className="text-[#D4AF37] text-sm font-amiri">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
              </button>
            ))}
          </div>
        </div>
      ) : isSearchingVerses ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <button onClick={() => setIsSearchingVerses(false)} className="text-[#D4AF37] hover:underline">← العودة</button>
            <h2 className="text-2xl font-amiri text-[#D4AF37]">{t.searchResults} ({verseSearchResults.length})</h2>
          </div>
          <div className="space-y-6">
            {verseSearchResults.map((match, idx) => (
              <div key={idx} className="bg-[#011a14]/60 border border-[#D4AF37]/10 p-6 rounded-2xl">
                <div className="flex justify-between mb-4">
                  <span className="text-[#D4AF37] font-bold">{match.surah.name} : {match.numberInSurah}</span>
                  <button onClick={() => loadSurah(match.surah.number)} className="text-xs text-emerald-400 hover:underline">الذهاب للسورة</button>
                </div>
                <p className="text-right text-xl leading-loose font-amiri" dir="rtl">{match.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 px-2 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedSurah(null)} className="text-[#D4AF37] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <h3 className="text-2xl font-amiri text-[#D4AF37]">{selectedSurah.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <select value={selectedMushaf} onChange={(e) => setSelectedMushaf(e.target.value)} className="bg-black/40 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg px-2 py-1 text-[10px] outline-none max-w-[100px]">
                {mushafs.map(ed => <option key={ed.identifier} value={ed.identifier} className="bg-[#022c22]">{ed.name}</option>)}
              </select>
              <select value={selectedTafsir} onChange={(e) => setSelectedTafsir(e.target.value)} className="bg-black/40 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg px-2 py-1 text-[10px] outline-none max-w-[100px]">
                {tafsirs.map(ed => <option key={ed.identifier} value={ed.identifier} className="bg-[#022c22]">{ed.name}</option>)}
              </select>
              <select value={selectedTranslation} onChange={(e) => setSelectedTranslation(e.target.value)} className="bg-black/40 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg px-2 py-1 text-[10px] outline-none max-w-[100px]">
                {translations.map(ed => <option key={ed.identifier} value={ed.identifier} className="bg-[#022c22]">{ed.name}</option>)}
              </select>
              <button onClick={() => setShowTafsir(!showTafsir)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${showTafsir ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30'}`}>{t.tafsir}</button>
              <button onClick={() => setShowTranslation(!showTranslation)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${showTranslation ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30'}`}>{t.translation}</button>
            </div>
          </div>

          <div className="flex flex-col gap-12 pb-32">
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <p className="text-center text-3xl font-amiri text-[#D4AF37] mb-8">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            )}
            
            {verses.map((ayah, idx) => (
              <div key={ayah.number} className="group relative border-b border-[#D4AF37]/10 pb-8">
                <div className="flex justify-between items-start gap-6 mb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => playAyah(ayah.number)} className={`p-2 rounded-full hover:bg-[#D4AF37]/20 transition-colors ${playingAyah === ayah.number ? 'text-emerald-400' : 'text-[#D4AF37]'}`}>
                        {playingAyah === ayah.number ? '⏸️' : '▶️'}
                      </button>
                      <button onClick={() => isRecording === ayah.number ? stopRecording() : startRecording(ayah.number)} className={`p-2 rounded-full hover:bg-[#D4AF37]/20 transition-colors ${isRecording === ayah.number ? 'text-red-500 animate-pulse' : 'text-[#D4AF37]'}`} title={t.voiceRecording}>
                        {isRecording === ayah.number ? '⏹️' : '🎙️'}
                      </button>
                      {recordings[ayah.number] && (
                        <button onClick={() => {
                          const audio = new Audio(recordings[ayah.number]);
                          audio.play();
                        }} className="p-2 rounded-full text-emerald-400 hover:bg-[#D4AF37]/20 transition-colors" title="Play Recording">
                          🎧
                        </button>
                      )}
                      <button onClick={() => copyVerse(ayah.text)} className="p-2 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors" title="Copy">
                        📋
                      </button>
                      <button onClick={() => shareVerse(ayah.text, selectedSurah.name, ayah.numberInSurah)} className="p-2 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors" title="Share">
                        📤
                      </button>
                      <button onClick={() => toggleFavorite(`${selectedSurah.number}:${ayah.numberInSurah}`)} className={`p-2 rounded-full hover:bg-[#D4AF37]/20 transition-colors ${favorites.has(`${selectedSurah.number}:${ayah.numberInSurah}`) ? 'text-red-500' : 'text-[#D4AF37]'}`}>
                        {favorites.has(`${selectedSurah.number}:${ayah.numberInSurah}`) ? '❤️' : '🤍'}
                      </button>
                      <button onClick={() => toggleHideVerse(idx)} className="p-2 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors" title={t.memorizationAid}>
                        {hiddenVerses.has(idx) ? '👁️' : '🙈'}
                      </button>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                      {ayah.numberInSurah}
                    </span>
                  </div>

                  <p 
                    className={`flex-1 text-right leading-loose transition-all duration-500 ${hiddenVerses.has(idx) ? 'blur-md select-none opacity-20' : ''}`}
                    style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily === 'amiri' ? 'Amiri' : fontFamily === 'cairo' ? 'Cairo' : fontFamily }}
                    dir="rtl"
                  >
                    {ayah.text}
                  </p>
                </div>

                {showTafsir && !hiddenVerses.has(idx) && (
                  <div className="mt-4 p-4 bg-[#D4AF37]/5 rounded-xl border-r-4 border-[#D4AF37] text-emerald-100/80 text-sm leading-relaxed text-right font-cairo" dir="rtl">
                    <span className="text-[#D4AF37] font-bold ml-2">التفسير:</span>
                    {ayah.tafsir}
                  </div>
                )}

                {showTranslation && !hiddenVerses.has(idx) && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border-l-4 border-emerald-500/30 text-emerald-100/80 text-sm leading-relaxed font-sans" dir="ltr">
                    <span className="text-emerald-400 font-bold mr-2">Translation:</span>
                    {ayah.translation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Player Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#011a14]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 p-4 z-[100] flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select 
                value={selectedReciter} 
                onChange={(e) => setSelectedReciter(e.target.value)}
                className="bg-black/40 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg px-4 py-3 md:px-3 md:py-1 text-sm md:text-xs outline-none flex-1 md:flex-none cursor-pointer"
              >
                {reciters.map(r => (
                  <option key={r.identifier} value={r.identifier} className="bg-[#022c22]">{r.name}</option>
                ))}
              </select>
            </div>
            
            <audio 
              ref={audioRef} 
              controls 
              className="w-full md:w-1/2 h-10 md:h-8 custom-audio-player"
              onEnded={() => setPlayingAyah(null)}
            />

            <div className="flex gap-6 md:gap-4">
              <button className="text-[#D4AF37] text-2xl md:text-xl hover:scale-110 transition-transform active:scale-90">🔁</button>
              <button className="text-[#D4AF37] text-2xl md:text-xl hover:scale-110 transition-transform active:scale-90" onClick={() => {
                const next = playingAyah ? playingAyah + 1 : 1;
                playAyah(next);
              }}>⏭️</button>
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef} className="hidden" onEnded={() => setPlayingAyah(null)} />
    </div>
  );
};
const SettingsView = ({ t, uiLang, setUiLang, fontSize, setFontSize, fontFamily, setFontFamily }: any) => {
  const [openSection, setOpenSection] = useState<string | null>('font');

  const sections = [
    { id: 'font', title: t.settings, icon: '⚙️' },
    { id: 'downloads', title: t.downloadManager, icon: '📥' },
    { id: 'guide', title: t.userGuide, icon: '📖' },
    { id: 'upgrade', title: t.upgrade, icon: '🚀' },
    { id: 'about', title: t.aboutProject, icon: 'ℹ️' },
    { id: 'privacy', title: t.privacyPolicy, icon: '🔒' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 font-cairo">
      <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] text-center mb-12 text-glow">{t.settings}</h2>
      
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.id} className="border border-[#D4AF37]/20 rounded-2xl overflow-hidden bg-[#011a14]/80 shadow-lg">
            <button 
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{section.icon}</span>
                <span className="text-xl font-bold text-[#D4AF37]">{section.title}</span>
              </div>
              <span className={`text-[#D4AF37] transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {openSection === section.id && (
              <div className="px-6 py-6 border-t border-[#D4AF37]/10 animate-fadeIn">
                {section.id === 'font' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[#D4AF37] mb-4 font-bold">{t.blogLanguage}</label>
                      <div className="flex flex-wrap gap-4">
                        {['ar', 'fr', 'en'].map(lang => (
                          <button 
                            key={lang}
                            onClick={() => setUiLang(lang)}
                            className={`px-8 py-3 md:px-6 md:py-2 rounded-xl border transition-all active:scale-95 ${uiLang === lang ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/30 text-emerald-100 hover:border-[#D4AF37]'}`}
                          >
                            {lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[#D4AF37] mb-4 font-bold">حجم الخط (Font Size)</label>
                      <div className="flex items-center gap-6">
                        <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all active:scale-90">-</button>
                        <span className="text-2xl font-bold text-white w-12 text-center">{fontSize}</span>
                        <button onClick={() => setFontSize(Math.min(48, fontSize + 2))} className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all active:scale-90">+</button>
                        <button onClick={() => { setFontSize(24); setFontFamily('amiri'); }} className="ml-4 text-sm text-[#D4AF37]/60 hover:text-[#D4AF37] underline py-2">إعادة تعيين</button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#D4AF37] mb-4 font-bold">نوع الخط (Font Family)</label>
                      <div className="flex flex-wrap gap-4">
                        {['amiri', 'cairo', 'serif', 'sans-serif'].map(font => (
                          <button 
                            key={font}
                            onClick={() => setFontFamily(font)}
                            className={`px-6 py-2 rounded-xl border transition-all ${fontFamily === font ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/30 text-emerald-100 hover:border-[#D4AF37]'}`}
                            style={{ fontFamily: font === 'amiri' ? 'Amiri' : font === 'cairo' ? 'Cairo' : font }}
                          >
                            {font.charAt(0).toUpperCase() + font.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 bg-black/40 rounded-2xl border border-[#D4AF37]/10">
                      <p className="text-[#D4AF37]/50 text-xs mb-2">معاينة (Preview):</p>
                      <p className="text-center leading-loose" style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily === 'amiri' ? 'Amiri' : fontFamily === 'cairo' ? 'Cairo' : fontFamily }} dir="rtl">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.
                      </p>
                    </div>
                  </div>
                )}

                {section.id === 'downloads' && (
                  <div className="text-center py-8">
                    <p className="text-emerald-100/60 mb-6">إدارة المساحة والملفات المحملة (قريباً)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-black/20 rounded-xl border border-[#D4AF37]/10">
                        <p className="text-[#D4AF37] font-bold">الصوتيات</p>
                        <p className="text-2xl text-white">0 MB</p>
                      </div>
                      <div className="p-4 bg-black/20 rounded-xl border border-[#D4AF37]/10">
                        <p className="text-[#D4AF37] font-bold">التفاسير</p>
                        <p className="text-2xl text-white">0 MB</p>
                      </div>
                      <div className="p-4 bg-black/20 rounded-xl border border-[#D4AF37]/10">
                        <p className="text-[#D4AF37] font-bold">الترجمات</p>
                        <p className="text-2xl text-white">0 MB</p>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'guide' && (
                  <div className="space-y-4 text-emerald-100">
                    <p>• استخدم القائمة العلوية للتنقل بين الأقسام.</p>
                    <p>• في مشغل القرآن، يمكنك اختيار القارئ والسورة من القوائم الجانبية.</p>
                    <p>• في قسم الأذكار، اضغط على الذكر لتقليل العداد.</p>
                    <p>• يمكنك تغيير حجم الخط ولغة الواجهة من هذا القسم.</p>
                  </div>
                )}

                {section.id === 'upgrade' && (
                  <div className="text-center py-4">
                    <p className="text-xl text-white mb-2">الإصدار الحالي: <span className="text-[#D4AF37]">v1.1</span></p>
                    <p className="text-emerald-100/60 mb-6">أنت تستخدم أحدث نسخة مستقرة.</p>
                    <button className="px-8 py-3 bg-[#D4AF37] text-black rounded-full font-bold hover:scale-105 transition-transform">التحقق من وجود تحديثات</button>
                  </div>
                )}

                {section.id === 'about' && (
                  <div className="space-y-4 text-emerald-100 text-center">
                    <p className="text-xl font-bold text-[#D4AF37]">مشروع "نعيم الذاكرين"</p>
                    <p>منصة متكاملة لخدمة كتاب الله وسنة نبيه صلى الله عليه وسلم.</p>
                    <div className="flex justify-center gap-6 mt-6">
                      <a href="#" className="text-[#D4AF37] hover:underline">الموقع الرسمي</a>
                      <a href="#" className="text-[#D4AF37] hover:underline">تواصل معنا</a>
                    </div>
                  </div>
                )}

                {section.id === 'privacy' && (
                  <div className="text-emerald-100 leading-relaxed">
                    <p>{t.privacyText}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [uiLang, setUiLang] = useState('ar');
  const [currentView, setCurrentView] = useState('home'); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('amiri');
  
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const t = (UI_DICT as any)[uiLang];
  const dir = uiLang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const initialLoad = setTimeout(() => setIsAppLoading(false), 2000);
    return () => {
      clearInterval(timer);
      clearTimeout(initialLoad);
    };
  }, []);

  if (isAppLoading) {
    return (
      <div className="h-screen bg-[#011a14] flex items-center justify-center font-amiri">
        <LoadingSpinner size="lg" text="نعيم الذاكرين..." />
      </div>
    );
  }

  const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-nu-latn', {day: 'numeric', month: 'long', year : 'numeric'}).format(currentTime);
  const gregorianDate = new Intl.DateTimeFormat('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(currentTime);
  const timeString = currentTime.toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="h-screen bg-black flex flex-col font-sans text-white overflow-hidden" dir={dir}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;700&display=swap');
        .font-amiri { font-family: 'Amiri', serif; }
        .font-cairo { font-family: 'Cairo', sans-serif; }
        @keyframes float { 0% { transform: translateY(0px) scale(1); opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { transform: translateY(-100px) scale(1.5); opacity: 0; } }
        @keyframes tickerAnim { 0% { transform: translateX(-100%); } 100% { transform: translateX(100vw); } }
        @keyframes topTickerAnim { 0% { transform: translateX(-100%); } 100% { transform: translateX(100vw); } }
        .animate-ticker { display: inline-flex; animation: tickerAnim 60s linear infinite; will-change: transform; }
        .animate-top-ticker { display: inline-flex; animation: topTickerAnim 45s linear infinite; will-change: transform; }
        .particle { position: absolute; background: radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%); border-radius: 50%; animation: float 15s infinite linear; }
        @keyframes slideInRight { from { transform: translateX(-30px); opacity: 0; filter: blur(4px); } to { transform: translateX(0); opacity: 1; filter: blur(0); } }
        .animate-verse { animation: slideInRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .bg-islamic-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15L15 15 30 0zm0 30l15 15-15 15-15-15 15-15zM0 30l15-15 15 15-15 15L0 30zm60 0L45 15l-15 15 15 15 15-15z' fill='%23D4AF37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E"); }
        .text-glow { text-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 4px 10px rgba(0,0,0,0.8); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); } .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes pulse-gentle { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 2s linear infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
      `}} />

      <div className="w-full bg-[#011a14]/95 px-4 md:px-8 py-2 flex justify-between items-center z-[60] relative shadow-md border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4 font-cairo text-xs md:text-sm text-emerald-100">
          <span dir="rtl">{gregorianDate}</span> <span className="text-[#D4AF37]/50">|</span> <span dir="rtl">{hijriDate}</span>
        </div>
        <div className="flex items-center gap-4">
          <select value={uiLang} onChange={(e) => setUiLang(e.target.value)} className="bg-transparent text-emerald-100 font-cairo outline-none cursor-pointer hover:text-[#D4AF37] transition-colors appearance-none">
            <option value="ar" className="bg-[#022c22]">العربية</option>
            <option value="fr" className="bg-[#022c22]">Français</option>
            <option value="en" className="bg-[#022c22]">English</option>
          </select>
          <div className="font-cairo text-lg font-bold text-[#D4AF37] tracking-widest" dir="ltr">{timeString}</div>
        </div>
      </div>

      <nav className="w-full bg-[#022c22]/90 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-[60] relative shadow-lg">
        <button className="flex items-center gap-3 cursor-pointer outline-none active:scale-95 transition-transform" onClick={() => setCurrentView('home')}>
          <img src="https://yt3.ggpht.com/QrZ62zK_7WCq3eS4m0cXx3P18RljKqHs2Epjr6A5VsTokL6SrWlWD3mhrh7oIkOV6XFoTEuXaw=s88-c-k-c0x00ffffff-no-rj" alt="Logo" className="w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
          <span className="text-[#D4AF37] font-amiri font-bold text-xl text-glow">{t.appTitle}</span>
        </button>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-cairo">
          <button onClick={() => setCurrentView('home')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'home' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.home}</button>
          <button onClick={() => setCurrentView('tv')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'tv' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.quranPlayer}</button>
          <button onClick={() => setCurrentView('quran')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'quran' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.quranReader}</button>
          <button onClick={() => setCurrentView('radio')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'radio' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.radio}</button>
          <button onClick={() => setCurrentView('azkar')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'azkar' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.azkar}</button>
          <button onClick={() => setCurrentView('hadith')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'hadith' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.hadith}</button>
          <button onClick={() => setCurrentView('settings')} className={`text-base font-bold py-3 px-2 transition-all active:scale-95 ${currentView === 'settings' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.settings}</button>
          <button onClick={() => setShowPrivacyModal(true)} className="text-emerald-100 hover:text-[#D4AF37] text-base py-3 px-2 transition-all active:scale-95">{t.privacyPolicy}</button>
          <button onClick={() => setShowAboutModal(true)} className="text-emerald-100 hover:text-[#D4AF37] text-base py-3 px-2 transition-all active:scale-95">{t.aboutUs}</button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative w-full z-10 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="fixed inset-0 bg-islamic-pattern mix-blend-screen opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none"><div className="w-[80vw] h-[80vh] bg-emerald-700/10 blur-[150px] rounded-full"></div></div>
        
        {currentView === 'home' && <DashboardView uiLang={uiLang} t={t} />}
        {currentView === 'tv' && <QuranTVView uiLang={uiLang} t={t} />}
        {currentView === 'radio' && <RadioView t={t} />}
        {currentView === 'azkar' && <AzkarView t={t} />}
        {currentView === 'hadith' && <HadithView t={t} />}
        {currentView === 'quran' && <QuranReaderView t={t} uiLang={uiLang} fontSize={fontSize} fontFamily={fontFamily} />}
        {currentView === 'settings' && (
          <SettingsView 
            t={t} 
            uiLang={uiLang} 
            setUiLang={setUiLang} 
            fontSize={fontSize} 
            setFontSize={setFontSize} 
            fontFamily={fontFamily} 
            setFontFamily={setFontFamily} 
          />
        )}
      </main>

      {(showAboutModal || showPrivacyModal) && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl p-6 flex items-center justify-center pointer-events-auto">
          <div className="bg-[#022c22] border border-[#D4AF37]/30 p-8 md:p-12 rounded-3xl max-w-2xl text-center relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
             <button onClick={() => {setShowAboutModal(false); setShowPrivacyModal(false);}} className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} text-gray-400 hover:text-white`}>✖</button>
             <h2 className="text-3xl font-amiri text-[#D4AF37] mb-6">{showAboutModal ? t.aboutTitle : t.privacyTitle}</h2>
             <div className="font-cairo text-emerald-100 text-lg leading-relaxed">{showAboutModal ? <><span className="text-[#D4AF37]">{t.aboutText1}</span><br/><br/>{t.aboutText2}</> : t.privacyText}</div>
          </div>
        </div>
      )}
    </div>
  );
}
