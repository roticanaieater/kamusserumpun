const swadeshCore = {
    warna: [
        { key: 'Merah', hex: '#e11d48' },
        { key: 'Hijau', hex: '#10b981' },
        { key: 'Kuning', hex: '#fbbf24' },
        { key: 'Hitam', hex: '#0f172a' },
        { key: 'Putih', hex: '#ffffff', border: true }
    ],
    angka: ['Satu', 'Dua', 'Tiga', 'Empat', 'Lima'],
    kepala: ['Telinga', 'Mata', 'Hidung', 'Mulut', 'Gigi', 'Lidah', 'Rambut', 'Leher'],
    badan: ['Kepala', 'Payudara', 'Punggung', 'Perut', 'Tangan', 'Tungkai', 'Lutut', 'Kaki'],
    organ: ['Hati', 'Jantung', 'Usus'],
    animal: ['Anjing', 'Ikan', 'Burung', 'Ular', 'Cacing', 'Kutu'],
    tumbuhan: ['Pohon', 'Hutan', 'Ranting', 'Buah', 'Biji', 'Daun', 'Akar', 'Kulit Kayu', 'Rumput'],
};

// State Global untuk Widget
let activeWarna = 'Hijau';
let activeAngka = 'Empat';
let activeKepala = 'Telinga';
let activeBadan = 'Tangan';
let activeOrgan = 'Jantung';
let currentDataMap = {}; // Menyimpan data hasil fetch agar interaksi tidak perlu loading ulang

// --- DATA I18N DINAMIS & KAMUS LENGKAP MANDIRI ---
let uiTranslationsCache = null;
let currentLangUI = 'id';
let viewMode = 'swadesh'; // 'swadesh' | 'list'
let selectedLangs = [];
let activeDialects = {};
let activeRegisters = {};
let languageCache = {}; // Cache JSON kata
let availableLanguageNames = [];

// Kamus lengkap bawaan (Fallback & Offline-First) agar tetap berjalan di protokol file:// tanpa web server
const FALLBACK_UI_TRANSLATIONS = {
    "id": {
        "current-lang-text": "Indonesia",
        "ui-desc": "Jelajahi perbandingan kosa kata bahasa-bahasa Austronesia di Nusantara.",
        "ui-map-hint": "Klik wilayah di peta untuk memilih bahasa (Maks 3 bahasa)",
        "ui-title-compare": "Perbandingan Bahasa Pilihan",
        "btn-swadesh": "Kamus Swadesh",
        "btn-list": "Daftar Kosa Kata",
        "ui-btn-source": "Lihat Sumber",
        "btn-compare": "Bandingkan",
        "ui-title-bib": "Sumber & Bibliografi",
        "ui-desc-bib": "Kumpulan data linguistik dan kosa kata swadesh pada website ini merujuk pada literatur akademis dan penelitian serumpunologi berikut:",
        "emptyMsg": "Silakan pilih bahasa dari peta untuk memulai.",
        "dialek": "Pilih Dialek",
        "tingkat": "Tingkat Bahasa",
        "menunggu": "Menunggu pilihan bahasa...",
        "tidak_tersedia": "- Tidak tersedia -",
        "kategori_warna": "🎨 Spektrum Warna",
        "kategori_tubuh": "🧍 Anatomi Tubuh",
        "kategori_hewan": "🐕 Fauna",
        "kategori_kerja": "🏃 Kata Kerja Dasar",
        "header_kata_dasar": "Kata Dasar",
        "terpilih_label": "Terpilih:",
        "max_lang_alert": "Maksimal memilih 3 bahasa."
    },
    "my": {
        "current-lang-text": "Melayu",
        "ui-desc": "Terokai perbandingan kosa kata bahasa-bahasa Austronesia di Nusantara.",
        "ui-map-hint": "Klik wilayah pada peta untuk memilih bahasa (Maks 3 bahasa)",
        "ui-title-compare": "Perbandingan Bahasa Pilihan",
        "btn-swadesh": "Kamus Swadesh",
        "btn-list": "Senarai Kosa Kata",
        "ui-btn-source": "Lihat Sumber",
        "btn-compare": "Bandingkan",
        "ui-title-bib": "Sumber & Bibliografi",
        "ui-desc-bib": "Kumpulan data linguistik dan kosa kata swadesh pada laman web ini merujuk kepada literatur akademik dan penyelidikan serumpunologi berikut:",
        "emptyMsg": "Sila pilih bahasa dari peta untuk bermula.",
        "dialek": "Pilih Dialek",
        "tingkat": "Tahap Bahasa",
        "menunggu": "Menunggu pilihan bahasa...",
        "tidak_tersedia": "- Tidak tersedia -",
        "kategori_warna": "🎨 Spektrum Warna",
        "kategori_tubuh": "🧍 Anatomi Tubuh",
        "kategori_hewan": "🐕 Fauna",
        "kategori_kerja": "🏃 Kata Kerja Asas",
        "header_kata_dasar": "Kata Dasar",
        "terpilih_label": "Dipilih:",
        "max_lang_alert": "Maksimum memilih 3 bahasa sahaja."
    },
    "en": {
        "current-lang-text": "English",
        "ui-desc": "Explore the vocabulary comparison of Austronesian languages in the Archipelago.",
        "ui-map-hint": "Click regions on the map to select languages (Max 3 languages)",
        "ui-title-compare": "Comparison of Selected Languages",
        "btn-swadesh": "Swadesh Dictionary",
        "btn-list": "Vocabulary List",
        "ui-btn-source": "View Sources",
        "btn-compare": "Compare",
        "ui-title-bib": "Sources & Bibliography",
        "ui-desc-bib": "The collection of linguistic data and Swadesh vocabulary on this website refers to the following academic literature and cognate research:",
        "emptyMsg": "Please select languages from the map to start.",
        "dialek": "Select Dialect",
        "tingkat": "Language Register",
        "menunggu": "Waiting for language selection...",
        "tidak_tersedia": "- Not available -",
        "kategori_warna": "🎨 Color Spectrum",
        "kategori_tubuh": "🧍 Body Anatomy",
        "kategori_hewan": "🐕 Fauna",
        "kategori_kerja": "🏃 Basic Verbs",
        "header_kata_dasar": "Root Word",
        "terpilih_label": "Selected:",
        "max_lang_alert": "Maximum 3 languages can be selected."
    },
    "jw": {
        "current-lang-text": "ꦗꦮ",
        "ui-desc": "ꦗꦺꦭꦗꦲꦶꦧꦤ꧀ꦢ꧀ꦲꦶꦤ꧀ꦒꦤ꧀ꦠꦺꦩ꧀ꦧꦸꦤ꧀ꦒ꧀ꦧꦱ​ꦧꦱꦄꦲꦸꦱ꧀ꦠ꧀ꦫꦺꦴꦤꦺꦱꦶꦪꦲꦶꦤ꧀ꦒ꧀ꦤꦸꦱ꧀ꦮꦤ꧀ꦠꦫ꧉​",
        "ui-map-hint": "ꦏ꧀ꦭꦶꦏ꧀ꦮꦶꦭꦪꦃꦲꦶꦁꦥꦺꦠꦏꦁꦒꦺꦩꦶꦭꦶꦃꦧꦱ(ꦩꦏ꧀ꦱꦶꦩꦭ꧀꧇꧓꧇ꦧꦱ)",
        "ui-title-compare": "ꦧꦤ꧀ꦢ꧀ꦲꦶꦤ꧀ꦒꦤ꧀ꦧꦱꦥꦶꦤꦶꦭꦶꦃ",
        "btn-swadesh": "ꦏꦩꦸꦱ꧀ꦱ꧀ꦮꦢꦺꦱ꧀ꦃ",
        "btn-list": "ꦢꦥ꦳꧀ꦠꦂꦠꦺꦩ꧀ꦧꦸꦤ꧀ꦒ꧀",
        "ui-btn-source": "ꦢꦼꦊꦁꦱꦸꦩ꧀ꦧꦼꦂ",
        "btn-compare": "ꦧꦤ꧀ꦢ꧀ꦲꦶꦤ꧀ꦒꦏꦺꦤ꧀",
        "ui-title-bib": "ꦱꦸꦩ꧀ꦧꦼꦂꦭꦤ꧀ꦧꦶꦧ꧀ꦭꦶꦪꦺꦴꦒꦿꦥ꦳ꦶ",
        "ui-desc-bib": "ꦏꦸꦩ꧀ꦥꦸꦭꦤ꧀ꦝꦠꦭꦶꦔꦸꦮꦶꦱ꧀ꦠꦶꦏ꧀ꦭꦤ꧀ꦠꦺꦩ꧀ꦧꦸꦁꦱ꧀ꦮꦢꦺꦱ꧀ꦲꦶꦁꦱꦶꦠꦸꦱ꧀ꦲꦶꦏꦶꦚꦸꦮꦸꦤ꧀ꦫꦸꦗꦸꦏꦤ꧀ꦱꦏꦥꦤ꧀ꦭꦶꦠꦺꦤ꧀ꦲꦏꦢꦼꦩꦶꦱ꧀ꦭꦤ꧀ꦥꦱꦶꦤꦲꦺꦴꦤ꧀ꦱꦼꦫꦸꦩ꧀ꦥꦸꦤ꧀ꦲꦶꦏꦶ:",
        "emptyMsg": "ꦱꦸꦩꦤ꧀ꦒ꧀ꦒꦩꦶꦭꦶꦃꦧꦱꦱꦏꦶꦤ꧀ꦒ꧀ꦥꦺꦠꦏꦤ꧀ꦒ꧀ꦒꦺꦩꦶꦮꦶꦠꦶ꧉​",
        "dialek": "ꦥꦶꦭꦶꦃꦢ꧀ꦲꦶꦪꦭꦺꦏ꧀",
        "tingkat": "ꦠꦠꦏ꧀ꦫꦩ",
        "menunggu": "ꦤ꧀ꦒꦤ꧀ꦠꦺꦴꦱꦏꦺꦤ꧀ꦥꦶꦭꦶꦲꦤ꧀ꦧꦱ...",
        "tidak_tersedia": "- ꦩꦺꦴꦠꦺꦤ꧀ꦮꦺꦴꦤ꧀ꦠꦺꦤ꧀ -",
        "kategori_warna": "🎨 ꦮꦼꦂꦤ",
        "kategori_tubuh": "🧍 ꦥꦺꦫꦁꦔꦤꦶꦁꦄꦮꦏ꧀",
        "kategori_hewan": "🐕 ꦱꦠꦺꦴꦏꦺꦮꦤ꧀",
        "kategori_kerja": "🏃 ꦠꦺꦩ꧀ꦧꦸꦁꦏꦿꦶꦪ",
        "header_kata_dasar": "ꦠꦺꦩ꧀ꦧꦸꦁꦮꦶꦒꦠꦶ",
        "terpilih_label": "ꦏꦥꦶꦭꦶꦃ:",
        "max_lang_alert": "ꦩꦏ꧀ꦱꦶꦩꦭ꧀ꦩꦶꦭꦶꦃ꧇꧓꧇ꦧꦱ꧉"
    },
    "su": {
        "current-lang-text": "ᮞᮥᮔ᮪ᮓ",
        "ui-desc": "ᮍᮜᮨᮑᮨᮕᮔ᮪ ᮊᮧᮞᮊᮨᮎᮕ᮪ ᮘᮘᮔ᮪ᮓᮤᮍᮔ᮪ ᮘᮞ ᮃᮅᮞ᮪ᮒᮢᮧᮔᮨᮞᮤᮃ ᮓᮤ ᮊᮕᮥᮜᮧᮃᮔ᮪ ᮄᮔ᮪ᮓᮧᮔᮦᮞᮤᮃ.",
        "ui-map-hint": "Klik wewengkon dina peta pikeun milih basa (Maks 3 basa)",
        "ui-title-compare": "ᮘᮘᮔ᮪ᮓᮤᮍᮔ᮪ ᮘᮞ ᮃᮔᮥ ᮓᮤᮕᮤᮜᮤᮂ",
        "btn-swadesh": "ᮊᮙᮥᮞ᮪ ᮞ᮪ᮝᮓᮦᮞ᮪ᮂ",
        "btn-list": "ᮓᮕ᮪ᮒᮁ ᮊᮧᮞᮊᮨᮎᮕ᮪",
        "ui-btn-source": "Tingali Sumber",
        "btn-compare": "ᮘᮔ᮪ᮓᮤᮀᮊᮩᮔ᮪",
        "ui-title-bib": "ᮞᮥᮙ᮪ᮘᮨᮁ & ᮘᮤᮘᮣᮤᮇᮌᮢᮖᮤ",
        "ui-desc-bib": "Kumpulan data linguistik sareng kosakecap swadesh dina ieu ramatloka dumasar kana literatur akademis sareng panalungtikan serumpunologi ieu:",
        "emptyMsg": "ᮙᮀᮌ ᮕᮤᮜᮤᮂ ᮘᮞ ᮒᮤᮔ ᮕᮨᮒ ᮊᮀᮌᮧ ᮍᮙᮤᮙᮤᮒᮤᮃᮔ᮪.",
        "dialek": "ᮕᮤᮜᮤᮂ ᮓᮤᮃᮜᮦᮊ᮪",
        "tingkat": "ᮒᮤᮀᮊᮒ᮪ ᮘᮞ",
        "menunggu": "ᮍᮔ᮪ᮒᮧᮞᮔ᮪ ᮕᮤᮜᮤᮠᮔ᮪ ᮘᮞ...",
        "tidak_tersedia": "- Teu aya -",
        "kategori_warna": "🎨 Warna",
        "kategori_tubuh": "🧍 Babagian Awak",
        "kategori_hewan": "🐕 Sato",
        "kategori_kerja": "🏃 Kecap Pagawéan",
        "header_kata_dasar": "Kecap Dasar",
        "terpilih_label": "Kacangking:",
        "max_lang_alert": "Maksimal milih 3 basa."
    },
    "tb": {
        "current-lang-text": "ᯖᯬᯅ",
        "ui-desc": "Jalajahi pambandingon hata-hata Austronesia di Nusantara.",
        "ui-map-hint": "Klik luat di peta laho mamillit sahata (Maks 3 sahata)",
        "ui-title-compare": "Pambandingon Hata Na Tarpillit",
        "btn-swadesh": "Kamus Swadesh",
        "btn-list": "Daftar Hata",
        "ui-btn-source": "Ida Sumber",
        "btn-compare": "Pabandinhon",
        "ui-title-bib": "Sumber & Bibliografi",
        "ui-desc-bib": "Kumpulan data linguistik dohot hata swadesh di situs on marojahan tu literatur akademis dohot panalitian serumpunologi on:",
        "emptyMsg": "Pillit ma sahata sian peta laho mamungka.",
        "dialek": "Pillit Dialek",
        "tingkat": "Tingkat Hata",
        "menunggu": "Paimahon pamilliton hata...",
        "tidak_tersedia": "- Ndang adong -",
        "kategori_warna": "🎨 Warna",
        "kategori_tubuh": "🧍 Pamatang",
        "kategori_hewan": "🐕 Binatang",
        "kategori_kerja": "🏃 Hata Karejo",
        "header_kata_dasar": "Hata Dasar",
        "terpilih_label": "Tarpillit:",
        "max_lang_alert": "Maksimal mamillit 3 sahata."
    }
};

// Muat kamus terjemahan UI secara asinkron dengan deteksi kedua varian nama file & proteksi fallback
async function loadUITranslations() {
    if (uiTranslationsCache) return uiTranslationsCache;

    const fileNamesToTry = ['ui_translations.json', 'ui_translation.json'];
    for (const fileName of fileNamesToTry) {
        try {
            const response = await fetch(fileName);
            if (response.ok) {
                uiTranslationsCache = await response.json();
                return uiTranslationsCache;
            }
        } catch (e) {
            // Lanjut mencoba file berikutnya atau gunakan fallback
        }
    }

    // Jika gagal fetch (misalnya dibuka langsung via file:/// atau offline), gunakan fallback internal lengkap
    uiTranslationsCache = FALLBACK_UI_TRANSLATIONS;
    return uiTranslationsCache;
}

// Helper untuk mengambil string teks terjemahan berdasarkan kunci
function t(key, lang = currentLangUI) {
    const all = uiTranslationsCache || FALLBACK_UI_TRANSLATIONS;
    const currentDict = all[lang] || all['id'] || {};

    // Auto-generate kata dasar jika tidak ada di JSON UI (misal: 'word_mata' -> 'Mata')
    if (!currentDict[key] && key.startsWith('word_')) {
        const word = key.replace('word_', '');
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return currentDict[key] || key;
}

// --- 2. INISIALISASI ---
window.onload = async () => {
    lucide.createIcons();
    initMapInteractive();
    await loadUITranslations();
    updateBibliography();
    renderEmptyDictionary();

    availableLanguageNames = Object.values(languageMap).map(lang => lang.name).sort();

    const modalOverlay = document.getElementById('report-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) toggleReportModal(false);
        });
    }
};

// --- 3. UI CONTROLS & I18N ENGINE (Otomatis & Efisien) ---
function toggleLegendCollapse() {
    const list = document.getElementById('legend-list');
    const icon = document.getElementById('legend-collapse-icon');
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        icon.style.transform = 'rotate(0deg)';
    } else {
        list.classList.add('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('theme-icon').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
}

if (localStorage.getItem('theme') == 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Pemetaan ikon bendera untuk dropdown navigasi atas
const navFlagMap = {
    'id': `<img src="./flag/indonesia.svg" alt="Indonesia" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'my': `<img src="./flag/malaysia.svg" alt="Malaysia" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'en': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="w-full h-full object-cover"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 79 480H0v-60l239-178L0 64V0h75z"/><path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20L24 480H0v-24l240-176v-20zM640 0v3L391 191v-20L598 0h42zM0 0l239 176h-60L0 42V0z"/><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/><path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/></svg>`,
    'jw': `<img src="./flag/jawa.svg" alt="Jawa" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'su': `<img src="./flag/sunda.svg" alt="Sunda" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'tb': `<img src="./flag/toba.svg" alt="Toba" class="w-full h-full object-cover" onerror="this.style.display='none'">`
};

function updateNavFlag(lang) {
    const flagContainer = document.getElementById('current-lang-icon');
    if (flagContainer && navFlagMap[lang]) {
        flagContainer.innerHTML = navFlagMap[lang];
    }
}

/**
 * Menerapkan bahasa UI secara deklaratif tanpa getElementById manual berulang-ulang
 */
async function changeUILang(lang) {
    currentLangUI = lang;
    const allTranslations = await loadUITranslations();
    const dictionary = allTranslations[lang] || allTranslations['id'] || {};

    // 1. Perbarui semua elemen dengan atribut [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) el.textContent = dictionary[key];
    });

    // 2. Perbarui elemen berdasarkan ID (backward compatibility dengan markup HTML yang ada)
    for (const [key, text] of Object.entries(dictionary)) {
        const el = document.getElementById(key);
        if (el && !el.hasAttribute('data-i18n')) {
            el.textContent = text;
        }
    }

    // 2b. Perbarui terjemahan pada atribut khusus (placeholder, title)
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dictionary[key]) el.setAttribute('placeholder', dictionary[key]);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const key = el.getAttribute('data-i18n-title');
        if (dictionary[key]) el.setAttribute('title', dictionary[key]);
    });

    // 3. Perbarui ikon bendera pada dropdown navbar
    updateNavFlag(lang);

    // 4. Render ulang elemen yang dinamis
    updateDropdownsUI();
    updateStickyBar();

    if (selectedLangs.length === 0) {
        renderEmptyDictionary();
    } else {
        fetchAndRenderDictionary();
    }

    lucide.createIcons();
}

function scrollToSource() {
    document.getElementById('sumber').scrollIntoView({ behavior: 'smooth' });
}

function setViewMode(mode) {
    viewMode = mode;
    const bg = document.getElementById('toggle-bg');
    const btnSwadesh = document.getElementById('btn-swadesh');
    const btnList = document.getElementById('btn-list');

    if (mode === 'swadesh') {
        bg.style.transform = 'translateX(0)';
        btnSwadesh.classList.replace('text-slate-500', 'text-slate-900');
        btnSwadesh.classList.replace('dark:text-slate-400', 'dark:text-white');
        btnList.classList.replace('text-slate-900', 'text-slate-500');
        btnList.classList.replace('dark:text-white', 'dark:text-slate-400');
    } else {
        bg.style.transform = 'translateX(100%)';
        btnList.classList.replace('text-slate-500', 'text-slate-900');
        btnList.classList.replace('dark:text-slate-400', 'dark:text-white');
        btnSwadesh.classList.replace('text-slate-900', 'text-slate-500');
        btnSwadesh.classList.replace('dark:text-white', 'dark:text-slate-400');
    }

    if (selectedLangs.length > 0) {
        fetchAndRenderDictionary();
    } else {
        renderEmptyDictionary();
    }
}

function resetSelection() {
    selectedLangs.forEach(lang => {
        const el = document.getElementById(`island-${lang}`);
        if (el) el.classList.remove('selected');
    });
    selectedLangs = [];
    activeDialects = {};
    activeRegisters = {};

    updateStickyBar();
    updateDropdownsUI();
    updateBibliography();
    renderEmptyDictionary();

    window.scrollTo({ top: document.getElementById('ui-title-compare').offsetTop - 50, behavior: 'smooth' });
}

// --- 4. MAP INTERACTION ---
let currentZoom = 1;
function zoomMap(factor) {
    const svgWrapper = document.getElementById('svg-wrapper');
    currentZoom *= factor;
    if (currentZoom > 3) currentZoom = 3;
    if (currentZoom < 0.5) currentZoom = 0.5;
    svgWrapper.style.width = (1000 * currentZoom) + 'px';
}

function resetZoom() {
    const svgWrapper = document.getElementById('svg-wrapper');
    const scrollContainer = document.getElementById('map-scroll-container');
    currentZoom = 1;
    svgWrapper.style.width = '1000px';
    scrollContainer.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
}

function initMapInteractive() {
    const scrollContainer = document.getElementById('map-scroll-container');
    let isDown = false, startX, startY, scrollLeft, scrollTop;
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        startY = e.pageY - scrollContainer.offsetTop;
        scrollLeft = scrollContainer.scrollLeft;
        scrollTop = scrollContainer.scrollTop;
    });
    scrollContainer.addEventListener('mouseleave', () => isDown = false);
    scrollContainer.addEventListener('mouseup', () => isDown = false);
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const y = e.pageY - scrollContainer.offsetTop;
        scrollContainer.scrollLeft = scrollLeft - (x - startX);
        scrollContainer.scrollTop = scrollTop - (y - startY);
    });

    const tooltip = document.getElementById('map-tooltip');
    const tooltipIcon = document.getElementById('tooltip-icon');
    const tooltipText = document.getElementById('tooltip-text');

    document.querySelectorAll('.language-region').forEach(region => {
        region.addEventListener('mouseenter', (e) => {
            const lang = languageMap[region.getAttribute('data-lang')];
            if (lang) {
                tooltipIcon.innerHTML = lang.icon || icons.placeholder;
                tooltipText.innerText = lang.name;
                tooltip.classList.remove('hidden', 'opacity-0');
            }
        });
        region.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = e.clientY + 'px';
        });
        region.addEventListener('mouseleave', () => tooltip.classList.add('hidden', 'opacity-0'));
    });
}

function toggleLanguage(langCode) {
    const index = selectedLangs.indexOf(langCode);
    const el = document.getElementById(`island-${langCode}`);

    if (index > -1) {
        selectedLangs.splice(index, 1);
        if (el) el.classList.remove('selected');
        delete activeDialects[langCode];
        delete activeRegisters[langCode];
    } else {
        if (selectedLangs.length >= 3) {
            alert(t('max_lang_alert'));
            return;
        }
        selectedLangs.push(langCode);
        if (el) el.classList.add('selected');

        const langInfo = languageMap[langCode];

        if (langInfo.dialects) {
            const firstDialectKey = Object.keys(langInfo.dialects)[0];
            activeDialects[langCode] = firstDialectKey;
            if (langInfo.dialects[firstDialectKey].registers) {
                activeRegisters[langCode] = Object.keys(langInfo.dialects[firstDialectKey].registers)[0];
            }
        } else if (langInfo.registers) {
            activeRegisters[langCode] = Object.keys(langInfo.registers)[0];
        }
    }

    updateStickyBar();
    updateDropdownsUI();
    updateBibliography();

    if (selectedLangs.length > 0) {
        fetchAndRenderDictionary();
    } else {
        renderEmptyDictionary();
    }
}

function updateStickyBar() {
    const slotsContainer = document.getElementById('selected-slots');
    slotsContainer.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        if (i < selectedLangs.length) {
            const langInfo = languageMap[selectedLangs[i]];
            const iconSvg = langInfo.icon || icons.placeholder;
            slotsContainer.innerHTML += `
                <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-serumpun-yellow text-slate-900 flex items-center justify-center shadow-md relative group cursor-help icon-svg p-2 overflow-hidden border-2 border-white dark:border-slate-700">
                    ${iconSvg}
                    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity font-semibold shadow-sm z-50">
                        ${langInfo.name}
                    </span>
                </div>`;
        } else {
            slotsContainer.innerHTML += `<div class="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium transition-colors">${i + 1}</div>`;
        }
    }

    document.getElementById('lang-counter').innerText = `${selectedLangs.length}/3`;
    document.getElementById('btn-compare').disabled = selectedLangs.length === 0;
}

function handleDialectChange(langCode, dialectKey) {
    activeDialects[langCode] = dialectKey;
    const dialectMeta = languageMap[langCode].dialects[dialectKey];

    if (dialectMeta && dialectMeta.registers) {
        activeRegisters[langCode] = Object.keys(dialectMeta.registers)[0];
    } else {
        delete activeRegisters[langCode];
    }

    updateDropdownsUI();
    fetchAndRenderDictionary();
}

function handleRegisterChange(langCode, registerKey) {
    activeRegisters[langCode] = registerKey;
    fetchAndRenderDictionary();
}

function updateDropdownsUI() {
    const dBox = document.getElementById('dialect-box');
    const dOptions = document.getElementById('dialect-options');
    const rBox = document.getElementById('register-box');
    const rOptions = document.getElementById('register-options');

    let hasDialect = false;
    let hasRegister = false;

    if (selectedLangs.length === 0) {
        dBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        rBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        dOptions.innerHTML = `<span class="text-sm italic text-slate-400">${t('menunggu')}</span>`;
        rOptions.innerHTML = `<span class="text-sm italic text-slate-700">${t('menunggu')}</span>`;
        return;
    }

    dOptions.innerHTML = '';
    rOptions.innerHTML = '';

    selectedLangs.forEach(code => {
        const langInfo = languageMap[code];
        let activeDialectObj = null;

        if (langInfo && langInfo.dialects) {
            hasDialect = true;
            activeDialectObj = langInfo.dialects[activeDialects[code]];
            let selectHTML = `<select class="custom-select bg-slate-700 text-sm font-medium rounded px-2 py-1" onchange="handleDialectChange('${code}', this.value)">`;
            for (let [k, v] of Object.entries(langInfo.dialects)) {
                selectHTML += `<option value="${k}" ${activeDialects[code] === k ? 'selected' : ''}>${langInfo.name} (${v.name})</option>`;
            }
            selectHTML += `</select>`;
            dOptions.innerHTML += selectHTML;
        }

        let registersObj = null;
        let baseName = langInfo.name;

        if (langInfo && langInfo.registers) {
            registersObj = langInfo.registers;
        } else if (activeDialectObj && activeDialectObj.registers) {
            registersObj = activeDialectObj.registers;
            baseName = activeDialectObj.name;
        }

        if (registersObj) {
            hasRegister = true;
            let selectHTML = `<select class="custom-select bg-yellow-400 text-sm font-bold rounded px-2 py-1" onchange="handleRegisterChange('${code}', this.value)">`;
            for (let [k, v] of Object.entries(registersObj)) {
                selectHTML += `<option value="${k}" ${activeRegisters[code] === k ? 'selected' : ''}>${baseName} (${v.name})</option>`;
            }
            selectHTML += `</select>`;
            rOptions.innerHTML += selectHTML;
        }
    });

    if (hasDialect) {
        dBox.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
    } else {
        dBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        dOptions.innerHTML = `<span class="text-sm italic text-slate-400">${t('tidak_tersedia')}</span>`;
    }

    if (hasRegister) {
        rBox.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
    } else {
        rBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        rOptions.innerHTML = `<span class="text-sm italic text-slate-700">${t('tidak_tersedia')}</span>`;
    }
}

function updateBibliography() {
    const bibList = document.getElementById('bibliography-list');
    if (!bibList) return;
    bibList.innerHTML = '';

    bibliographyBase.forEach(bib => {
        bibList.innerHTML += `
            <li class="flex items-start gap-3 fade-in">
                <i data-lucide="bookmark" class="w-4 h-4 mt-0.5 text-serumpun-yellow shrink-0"></i>
                <div class="text-slate-300">${bib}</div>
            </li>`;
    });

    selectedLangs.forEach(langCode => {
        const bib = languageMap[langCode].biblio;
        if (bib) {
            bibList.innerHTML += `
                <li class="flex items-start gap-3 fade-in">
                    <i data-lucide="book-open" class="w-4 h-4 mt-0.5 text-blue-400 shrink-0"></i>
                    <div class="text-slate-300">${bib} <span class="text-xs ml-2 text-slate-500">[Data: ${languageMap[langCode].name}]</span></div>
                </li>`;
        }
    });
    lucide.createIcons();
}

// --- 5. LOGIKA DATA KOSA KATA & RENDERING ---
async function loadLanguageJSON(langCode) {
    const langMeta = languageMap[langCode];
    let fetchKey = langCode;
    let filePath = langMeta.file;
    let currentLevel = langMeta;

    if (langMeta.dialects && activeDialects[langCode]) {
        const activeD = activeDialects[langCode];
        fetchKey += `_${activeD}`;
        currentLevel = langMeta.dialects[activeD];
        if (currentLevel.file) filePath = currentLevel.file;
    }

    if (currentLevel.registers && activeRegisters[langCode]) {
        const activeR = activeRegisters[langCode];
        fetchKey += `_${activeR}`;
        currentLevel = currentLevel.registers[activeR];
        if (currentLevel.file) filePath = currentLevel.file;
    }

    if (languageCache[fetchKey]) return languageCache[fetchKey];

    try {
        const diakritikPath = filePath.replace('bahasa/', 'diakritik/');

        // Fetch paralel untuk bahasa dan diakritik
        const [resBahasa, resDiakritik] = await Promise.allSettled([
            fetch(filePath),
            fetch(diakritikPath)
        ]);

        let wordsData = { words: {} };
        let diakritikData = { words: {} };

        if (resBahasa.status === 'fulfilled' && resBahasa.value.ok) {
            wordsData = await resBahasa.value.json();
        } else {
            throw new Error(`Gagal memuat JSON utama`);
        }

        if (resDiakritik.status === 'fulfilled' && resDiakritik.value.ok) {
            diakritikData = await resDiakritik.value.json();
        }

        const finalData = {
            words: wordsData.words || {},
            diakritik: diakritikData.words || {}
        };

        languageCache[fetchKey] = finalData;
        return finalData;
    } catch (error) {
        // Fallback generator
        const fallback = { words: {}, diakritik: {} };
        Object.values(swadeshCore).flat().forEach(w => {
            let wordKey = typeof w === 'object' ? w.key : w;
            let fake = wordKey.toLowerCase();
            fallback.words[wordKey] = (fake.charAt(0).toUpperCase() + fake.slice(1)) + '*';
        });
        languageCache[fetchKey] = fallback;
        return fallback;
    }
}

async function fetchAndRenderDictionary() {
    // Reset Data Map Global
    currentDataMap = {};
    for (let code of selectedLangs) {
        currentDataMap[code] = await loadLanguageJSON(code);
    }

    const container = document.getElementById('dictionary-container');
    container.innerHTML = '';

    if (viewMode === 'swadesh') {
        container.innerHTML = `
            <!-- Warna & Angka -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
                <div id="widget-warna-container" class="h-full">${renderWidgetWarna()}</div>
                <div id="widget-angka-container" class="h-full">${renderWidgetAngka()}</div>
            </div>

            <!-- Anggota Tubuh -->
            <div class="relative [background-size:20px_20px] rounded-3xl mb-8">
                <div id="widget-anatomi-container">${renderWidgetAnggotaBadan()}</div>
            </div>

            <!-- Animals -->
            <div class="relative rounded-3xl">
                <div id="widget-animal-container">${renderWidgetAnimal()}</div>
            </div>
        `;
    } else {
        container.innerHTML = generatePopulatedTableView(currentDataMap);
    }
}

function getLanguageDisplayName(langCode) {
    const langInfo = languageMap[langCode];
    let displayName = langInfo.name;
    let currentLevel = langInfo;

    if (activeDialects[langCode] && langInfo.dialects) {
        currentLevel = langInfo.dialects[activeDialects[langCode]];
        displayName = currentLevel.name;
    }

    if (activeRegisters[langCode] && currentLevel.registers) {
        displayName += ` (${currentLevel.registers[activeRegisters[langCode]].name})`;
    } else if (activeRegisters[langCode] && langInfo.registers) {
        displayName += ` (${langInfo.registers[activeRegisters[langCode]].name})`;
    }

    return displayName;
}

// --- WIDGET INTERAKTIF CUSTOM ---
window.changeWarna = function (warnaKey) {
    activeWarna = warnaKey;
    document.getElementById('widget-warna-container').innerHTML = renderWidgetWarna();
};

window.changeAngka = function (angkaKey) {
    activeAngka = angkaKey;
    document.getElementById('widget-angka-container').innerHTML = renderWidgetAngka();
};

// --- LOGIKA INTERAKSI BADAN (DIPISAH) ---
window.updateAnatomiWidget = function() {
    const container = document.getElementById('widget-anatomi-container');
    if (container) container.innerHTML = renderWidgetAnggotaBadan();
};

window.changeKepala = function (key) { activeKepala = key; updateAnatomiWidget(); };
window.changeBadan = function (key) { activeBadan = key; updateAnatomiWidget(); };
window.changeOrgan = function (key) { activeOrgan = key; updateAnatomiWidget(); };

window.hoverPart = function (partKey, activeState) {
    const el = document.getElementById('svg-part-' + partKey.toLowerCase());
    const btn = document.getElementById('btn-part-' + partKey.toLowerCase());
    if (el) {
        el.style.filter = "brightness(1.2) drop-shadow(0px 6px 12px rgba(234,179,8,0.4))";
        el.style.transform = "scale(1.04)";
    }
    if (btn && partKey !== activeState) {
        btn.classList.add('bg-slate-200', 'dark:bg-slate-700');
    }
};

window.unhoverPart = function (partKey, activeState) {
    const el = document.getElementById('svg-part-' + partKey.toLowerCase());
    const btn = document.getElementById('btn-part-' + partKey.toLowerCase());
    if (el) {
        el.style.filter = "";
        el.style.transform = "";
    }
    if (btn && partKey !== activeState) {
        btn.classList.remove('bg-slate-200', 'dark:bg-slate-700');
    }
};


function renderWidgetBottomBar(wordKey) {
    let html = `<div class="flex justify-between items-start pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto w-full">`;

    selectedLangs.forEach((langCode, index) => {
        const langInfo = languageMap[langCode];
        const displayName = getLanguageDisplayName(langCode);
        const translated = currentDataMap[langCode]?.words?.[wordKey] || '-';
        const diakritik = currentDataMap[langCode]?.diakritik?.[wordKey];

        const diakritikHtml = diakritik ? `<span class="text-xs text-slate-400 dark:text-slate-500 italic block mt-1">[${diakritik}]</span>` : '';
        const borderClass = index < selectedLangs.length - 1 ? 'border-r border-slate-200 dark:border-slate-700 px-2' : 'px-2';

        let flagHtml = '';
        if (langInfo.icon && langInfo.icon !== icons.placeholder) {
            flagHtml = `<span class="inline-block h-[18px] mr-1.5 rounded-sm overflow-hidden flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] bg-slate-100 dark:bg-slate-800">${langInfo.icon}</span>`;
        }

        html += `
            <div class="flex-1 text-center ${borderClass}">
                <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-center mb-2">
                    ${flagHtml}
                    <span>${displayName}</span>
                </span>
                <span class="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">${translated}</span>
                ${diakritikHtml}
            </div>`;
    });

    return html + `</div>`;
}

window.changeAnimal = function (animalKey) {
    activeAnimal = animalKey;
    document.getElementById('widget-animal-container').innerHTML = renderWidgetAnimal();
};

function renderWidgetWarna() {
    let swatchesHtml = '';
    swadeshCore.warna.forEach(c => {
        const isActive = c.key === activeWarna;
        const scale = isActive ? 'scale-110 shadow-lg z-10' : 'scale-90 hover:scale-100 opacity-80';
        const height = isActive ? 'h-24' : 'h-16';
        const border = c.border ? 'border-2 border-slate-200 dark:border-slate-600' : '';

        swatchesHtml += `
            <button onclick="changeWarna('${c.key}')" 
                class="w-16 ${height} rounded-2xl transition-all duration-300 ease-out cursor-pointer ${scale} ${border}" 
                style="background-color: ${c.hex};"></button>`;
    });

    return `
        <div class="bg-white dark:bg-slate-800 h-full rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col items-center justify-between transition-colors">
            <div class="w-full flex flex-col items-center">
                <div class="bg-slate-900 dark:bg-slate-950 text-white text-sm font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-6 shadow-inner">${t('widget_warna')}</div>
                <h3 class="text-3xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8 relative">
                    ${t('word_' + activeWarna.toLowerCase())}
                    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 dark:bg-slate-400 rounded-full"></div>
                </h3>
                <div class="flex items-center justify-center gap-3 mb-8 h-28">
                    ${swatchesHtml}
                </div>
            </div>
            ${renderWidgetBottomBar(activeWarna)}
        </div>`;
}

function renderWidgetAngka() {
    let sliderHtml = '';
    swadeshCore.angka.forEach((a, idx) => {
        const num = idx + 1;
        const isActive = a === activeAngka;

        if (isActive) {
            sliderHtml += `
                <button class="relative z-10 w-14 h-16 bg-[#fde047] rounded-xl shadow-lg flex items-center justify-center transform scale-110 font-extrabold text-slate-900 text-2xl border-b-4 border-amber-500 transition-all">
                    ${num}
                </button>`;
        } else {
            sliderHtml += `
                <button onclick="changeAngka('${a}')" class="flex-1 h-full flex items-center justify-center font-bold text-white/90 hover:text-white hover:bg-white/10 transition-colors text-xl">
                    ${num}
                </button>`;

            if (idx < swadeshCore.angka.length - 1 && swadeshCore.angka[idx + 1] !== activeAngka) {
                sliderHtml += `<div class="w-px h-8 bg-white/20"></div>`;
            }
        }
    });

    return `
        <div class="bg-white dark:bg-slate-800 h-full rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col items-center justify-between transition-colors">
            <div class="w-full flex flex-col items-center">
                <div class="kategori_animal bg-slate-900 dark:bg-slate-950 text-white text-sm font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-6 shadow-inner">${t('widget_an')}</div>
                <h3 class="text-3xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8 relative">
                    ${t('word_' + activeAngka.toLowerCase())}
                    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 dark:bg-slate-400 rounded-full"></div>
                </h3>
                <div class="w-full max-w-sm h-14 bg-amber-500 rounded-2xl flex items-center px-1.5 mb-8 shadow-inner mt-4">
                    ${sliderHtml}
                </div>
            </div>
            ${renderWidgetBottomBar()}
        </div>`;
}

function renderWidgetAnggotaBadan() {
    // 1. Helper generator tombol per kategori
    const makeButtonList = (list, activeState, changeFnName) => {
        return list.map(item => {
            const isActive = item === activeState;
            const activeClasses = isActive
                ? 'bg-[#fde047] text-slate-900 shadow-md font-bold scale-105 ring-2 ring-amber-400'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700';

            return `
                <button id="btn-part-${item.toLowerCase()}" 
                    onclick="${changeFnName}('${item}')" 
                    onmouseenter="hoverPart('${item}', '${activeState}')" 
                    onmouseleave="unhoverPart('${item}', '${activeState}')"
                    class="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 ease-out cursor-pointer uppercase tracking-wider text-xs ${activeClasses}">
                    ${t('word_' + item.toLowerCase())}
                </button>`;
        }).join('');
    };

    const buttonsKepala = makeButtonList(swadeshCore.kepala, activeKepala, 'changeKepala');
    const buttonsBadan = makeButtonList(swadeshCore.badan, activeBadan, 'changeBadan');
    const buttonsOrgan = makeButtonList(swadeshCore.organ, activeOrgan, 'changeOrgan');

    const svgHead = `
        <svg id="humanHeadSvg" class="w-full max-w-[280px] h-auto drop-shadow-lg select-none mx-auto" viewBox="0 0 600 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs id="defs9">
            <linearGradient id="skinBaseGrad"
       x1="300"
       y1="180"
       x2="300"
       y2="650"
       gradientUnits="userSpaceOnUse"><stop
         offset="0%"
         stop-color="#f8cdb0"
         id="stop1" /><stop
         offset="100%"
         stop-color="#f3bba0"
         id="stop2" /></linearGradient><linearGradient
       id="neckShadowGrad"
       x1="300"
       y1="560"
       x2="300"
       y2="670"
       gradientUnits="userSpaceOnUse"><stop
         offset="0%"
         stop-color="#d89679"
         id="stop3" /><stop
         offset="100%"
         stop-color="#e8ad92"
         id="stop4" /></linearGradient><linearGradient
       id="hairBaseGrad"
       x1="300"
       y1="50"
       x2="300"
       y2="350"
       gradientUnits="userSpaceOnUse"><stop
         offset="0%"
         stop-color="#553424"
         id="stop5" /><stop
         offset="50%"
         stop-color="#462719"
         id="stop6" /><stop
         offset="100%"
         stop-color="#321a10"
         id="stop7" /></linearGradient><linearGradient
       id="hairHighlightGrad"
       x1="300"
       y1="50"
       x2="300"
       y2="250"
       gradientUnits="userSpaceOnUse"><stop
         offset="0%"
         stop-color="#7e4c34"
         id="stop8" /><stop
         offset="100%"
         stop-color="#643b27"
         id="stop9" /></linearGradient>
        </defs>


            <!-- 1. BENTUK KEPALA & KULIT -->
            <g id="svg-kepala">
                <path
       style="fill:#2470b2;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.8472,853.64683 c -65.8252,-3.81535 -123.3876,-22.68903 -162.8238,-53.38706 -6.3153,-4.91594 -16.3912,-14.27992 -16.3912,-15.23299 0,-0.27665 1.2985,-1.15658 2.8856,-1.95539 8.3318,-4.19348 24.8315,-12.87128 25.3331,-13.3236 0.9272,-0.83604 2.5487,-0.60192 3.4492,0.49803 1.3933,1.70187 12.5002,10.37249 18.07,14.10639 27.5975,18.50089 66.8282,31.25248 111.2782,36.17 41.15032,4.55246 86.61278,1.08641 123.90539,-9.44654 22.8868,-6.46417 43.83974,-15.63141 60.14334,-26.31366 5.8184,-3.81226 17.21101,-12.6299 18.75528,-14.51619 1.1091,-1.35475 1.97204,-1.28666 5.06788,0.39985 1.43191,0.78006 8.0027,4.24284 14.60176,7.69509 6.59906,3.45224 11.9983,6.46565 11.9983,6.69647 0,0.83 -10.75061,10.7494 -16.40274,15.13452 -34.25733,26.57805 -82.18619,44.57705 -136.68942,51.33178 -17.77842,2.20333 -45.76539,3.15273 -63.18089,2.1433 z"
       id="path68"
       sodipodi:nodetypes="sssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       style="display:inline;fill:#f2b492;stroke:none;stroke-opacity:1"
       d="m -1016.2772,745.49117 c -18.6181,-2.26972 -36.9286,-9.01067 -50.033,-18.41952 -11.5627,-8.30195 -29.5343,-24.08605 -45.3817,-39.85792 -37.4522,-37.2737 -53.1161,-63.01266 -61.5566,-101.15017 -4.3071,-19.46085 -13.902,-81.49228 -18.9346,-122.41297 -0.5964,-4.84893 -1.1359,-15.04423 -1.3199,-24.94167 -0.4008,-21.55432 0.8319,-73.5645 1.943,-81.97983 1.5273,-11.56858 7.3786,-28.36383 15.0271,-43.13311 l 4.2472,-8.20136 -0.2831,-6.6826 c -0.2353,-5.55372 0.01,-8.27328 1.4336,-16.09897 4.6682,-25.60652 12.3759,-42.17347 26.0411,-55.97276 10.4943,-10.5974 21.6661,-16.37669 41.7206,-21.58273 6.0575,-1.5725 7.4772,-1.71107 17.2328,-1.68206 9.9539,0.0296 11.2895,0.17573 20.959,2.29325 35.4045,7.75317 42.2502,8.77698 62.2696,9.31278 21.71368,0.58115 35.5086,-0.96686 69.86353,-7.83978 20.22824,-4.04679 22.0755,-4.31583 29.76792,-4.33549 25.20325,-0.0644 53.44349,14.20569 66.43617,33.57096 10.34839,15.42402 18.61503,42.71507 18.61503,61.45467 v 7.71625 l 5.13242,10.55464 c 5.35301,11.00826 10.54653,25.11583 12.49596,33.94371 1.77369,8.03209 2.33661,18.23892 3.07811,55.8122 0.69298,35.11483 0.63732,38.11184 -1.00568,54.14685 -2.123,20.71977 -12.48979,91.75081 -16.7132,114.51536 -8.27325,44.59351 -22.41506,70.29707 -59.45872,108.06969 -16.74424,17.07374 -36.89927,35.13693 -48.93162,43.85314 -7.2464,5.24927 -20.63146,11.78609 -29.76792,14.53766 -13.43364,4.04572 -18.37043,4.65479 -39.48806,4.87175 -10.35804,0.10642 -20.88314,-0.0565 -23.38904,-0.36197 z m 32.65676,-74.07856 c 18.0226,-1.8987 31.44647,-7.40716 44.47645,-18.25083 9.55122,-7.9486 20.96728,-24.59103 29.23241,-42.61524 4.95569,-10.80713 4.96166,-11.69693 0.11357,-16.93344 -2.23039,-2.40908 -6.53839,-5.77268 -11.99829,-9.368 -16.25066,-10.701 -27.77324,-16.73785 -38.89391,-20.37711 -5.28328,-1.72896 -6.94607,-1.99568 -12.75768,-2.04642 -6.43881,-0.0562 -6.89313,0.0281 -12.45392,2.31097 -7.63972,3.13636 -10.62891,3.37165 -16.09899,1.26723 -9.599,-3.69289 -10.3731,-3.90081 -14.5802,-3.91622 -11.7988,-0.0432 -28.4098,7.02502 -50.962,21.68508 -13.3161,8.65609 -17.7791,13.32699 -17.1784,17.97865 0.1653,1.27931 2.7506,7.29365 5.7453,13.36518 16.4636,33.37931 34.8589,49.83291 61.8739,55.34293 10.0461,2.04902 23.06578,2.65456 33.48176,1.55722 z m -21.83556,-69.66507 c 0.4386,-0.17549 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.1569,0.34546 -0.7974,0.31908 -0.7077,-0.0292 -0.8516,-0.17311 -0.367,-0.36704 z m 16.51665,-61.80373 c 2.17184,-0.46159 7.46486,-2.39632 11.76227,-4.29939 4.49057,-1.98861 10.73479,-4.17759 14.6827,-5.14717 8.80419,-2.16226 11.69823,-3.59991 15.39978,-7.64999 7.40912,-8.10676 8.15154,-22.46001 1.78006,-34.41413 -2.41277,-4.52682 -6.34634,-8.84326 -7.24233,-7.94727 -0.46958,0.46958 0.0566,1.8374 1.85213,4.81437 4.20543,6.97269 7.16462,19.03535 5.90293,24.06232 l -0.37585,1.49749 -5.02248,-1.53904 c -4.30899,-1.3204 -6.18758,-1.54013 -13.22385,-1.54673 -8.10743,-0.008 -8.29183,0.023 -16.09898,2.67365 -7.71937,2.62082 -8.07585,2.68171 -15.79522,2.69797 -7.76621,0.0164 -8.01911,-0.0264 -15.19681,-2.57159 -8.4904,-3.01066 -13.3878,-3.7467 -20.4301,-3.07055 -4.4571,0.42796 -11.0217,1.92356 -13.9542,3.1792 -0.802,0.34344 -1.0394,-0.10407 -1.305,-2.46051 -0.7289,-6.46705 1.7047,-15.79322 5.8911,-22.5761 2.3251,-3.76717 2.5847,-4.48845 1.7331,-4.81525 -1.4163,-0.54346 -5.2025,3.97047 -7.7556,9.24612 -4.2479,8.77767 -4.9085,18.57606 -1.7033,25.26479 0.8666,1.80846 1.6431,3.61315 1.7255,4.01042 0.245,1.18027 3.1092,4.67512 4.9421,6.03018 3.0903,2.28475 5.5578,3.27415 11.9068,4.77433 3.4504,0.81527 8.9909,2.61597 12.3123,4.00157 15.6581,6.53213 20.25956,7.4757 28.21295,5.78531 z m -30.57985,-37.56455 c -3.4431,-7.81855 -3.5996,-8.49368 -3.269,-14.10121 0.2144,-3.6376 0.8548,-7.01218 1.8972,-9.99794 0.8655,-2.47885 1.4493,-4.6313 1.2974,-4.78324 -0.152,-0.15193 -0.7121,-0.10901 -1.2447,0.0954 -2.0775,0.79722 -5.1591,10.47276 -5.1591,16.19858 0,6.13881 2.9833,13.34782 5.5237,13.34782 0.8045,0 1.1632,-0.28541 0.9545,-0.75939 z m 52.53098,-2.62315 c 2.00764,-4.53859 2.51342,-9.56152 1.52771,-15.17177 -0.98569,-5.61018 -3.19293,-11.21361 -4.41713,-11.21361 -1.08916,0 -1.09585,-0.0641 0.73073,7.00028 2.12923,8.23491 1.79301,13.92506 -1.2466,21.09699 -0.34911,0.82373 -0.15464,1.06314 0.86359,1.06314 0.97628,0 1.6298,-0.71352 2.5417,-2.77503 z m -49.20068,-43.0928 c 2.5309,-9.83357 3.7642,-40.99125 2.1162,-53.46419 -1.1696,-8.85259 -2.7399,-15.21625 -5.5558,-22.51552 -2.5654,-6.64993 -3.5439,-8.16428 -4.6014,-7.1217 -0.5865,0.5782 -0.3506,1.73773 1.1125,5.46757 6.962,17.74783 8.5301,41.66896 4.6826,71.42892 -0.5091,3.93763 -0.7532,7.43835 -0.5424,7.77937 0.7161,1.15861 2.3176,0.25426 2.7883,-1.57445 z m 44.8618,-0.15094 c -0.003,-0.91886 -0.42882,-4.81451 -0.9462,-8.657 -1.27596,-9.47624 -1.86665,-39.76921 -0.93029,-47.70878 0.97419,-8.26029 2.24963,-14.22319 4.38333,-20.49286 1.68964,-4.96485 1.82263,-6.52191 0.55704,-6.52191 -0.62708,0 -3.7865,7.55728 -5.07954,12.15017 -4.06932,14.4543 -4.69521,37.6002 -1.65919,61.35836 1.45837,11.4124 1.4894,11.54266 2.75002,11.54266 0.61123,0 0.92844,-0.57302 0.92483,-1.67064 z m -111.841,-23.55037 c 2.8045,-0.53992 7.8808,-1.89293 11.2808,-3.00668 6.7237,-2.20252 17.337,-7.25175 17.337,-8.24798 0,-1.50092 -2.0561,-1.08499 -7.0717,1.43055 -6.7546,3.3877 -15.5033,6.20697 -23.1598,7.46328 -7.2157,1.18398 -24.9128,0.83437 -31.1268,-0.61492 -2.1719,-0.50653 -4.2906,-0.93057 -4.7082,-0.9423 -1.3056,-0.0367 -0.8285,1.80528 0.6075,2.34531 1.35,0.5077 10.9115,2.24956 15.0358,2.73915 4.0839,0.48478 16.7474,-0.19262 21.8054,-1.16641 z m 206.71631,-0.31028 c 6.48619,-1.31753 7.90178,-1.94695 6.81743,-3.03129 -0.41792,-0.41792 -2.17343,-0.27086 -5.4372,0.45549 -3.77463,0.84004 -7.58693,1.071 -17.57769,1.0649 -11.21741,-0.007 -13.41779,-0.17369 -18.22525,-1.38196 -6.85984,-1.72409 -12.50222,-3.83191 -19.23233,-7.1846 -4.26923,-2.12678 -5.38599,-2.46789 -5.9307,-1.81156 -0.86879,1.04684 -0.39746,1.4154 5.72275,4.47491 8.53274,4.26554 20.85199,7.93998 29.76792,8.87884 5.22156,0.54983 18.00224,-0.2271 24.09507,-1.46473 z m -200.56011,-16.37269 c 3.4995,-0.70356 10.4337,-2.66873 15.4094,-4.36703 6.1117,-2.08606 9.955,-3.06933 11.8464,-3.03083 4.16,0.0847 7.2979,-0.93672 8.0676,-2.62603 0.9979,-2.19019 0.2089,-4.12274 -3.272,-8.01356 l -3.1699,-3.54321 4.232,3.98608 c 4.6513,4.38089 9.0854,7.60351 11.7309,8.52574 7.5141,2.61944 10.0467,-11.14784 5.4866,-29.82581 -1.2029,-4.9268 -4.8387,-13.56987 -6.7506,-16.04762 -0.8084,-1.04761 -0.7551,-1.37415 0.5343,-3.2742 3.3558,-4.945 0.1531,-13.86193 -6.4836,-18.05145 -6.5208,-4.11643 -30.1745,-8.60382 -55.8421,-10.5939 -21.9994,-1.70568 -33.5155,0.51709 -46.5049,8.97611 -10.9891,7.15641 -19.6419,16.11799 -24.9359,25.82578 -2.0601,3.77761 -2.1768,4.2344 -1.3045,5.10666 0.8722,0.87226 1.6268,0.57472 8.4354,-3.3264 9.0801,-5.20266 12.3641,-6.85896 18.5283,-9.34501 10.1236,-4.08283 20.8213,-5.81989 31.9373,-5.18587 l 6.5376,0.37289 4.7013,3.14658 c 2.5857,1.73062 6.9447,4.75406 9.6868,6.71876 2.7421,1.9647 5.7492,3.97864 6.6826,4.47542 1.5877,0.84508 1.4232,0.87298 -2.5555,0.43329 -5.936,-0.65599 -15.4436,-0.46864 -21.8897,0.43134 -9.2986,1.29824 -18.9434,4.91115 -26.4073,9.89209 -3.3982,2.26778 -13.3652,11.99123 -13.3652,13.03866 0,1.4936 1.5972,0.74366 4.278,-2.00861 5.3259,-5.46801 16.9653,-12.23652 25.7937,-14.99945 7.4254,-2.32386 13.1372,-3.10673 22.7816,-3.12253 10.6365,-0.0174 17.1136,0.99424 19.0158,2.97011 0.7346,0.7631 3.6,3.18256 6.3674,5.37659 2.7674,2.19404 7.2782,6.08181 10.0239,8.63951 4.9539,4.61469 4.9637,4.62976 1.281,1.96563 -7.9914,-5.78092 -19.3313,-10.58415 -28.4677,-12.05802 -17.1337,-2.76395 -38.1317,4.42293 -52.4861,17.96417 -4.9554,4.67466 -5.395,6.23526 -2.06,7.31323 1.0842,0.35045 2.8612,1.48491 3.9488,2.52102 3.1075,2.96027 9.2749,6.66347 14.3437,8.61276 4.258,1.63743 13.7301,3.92273 18.9206,4.56486 4.8593,0.60117 18.7755,-0.20159 24.924,-1.43775 z m 25.7452,-23.85882 -1.1573,-1.36689 1.3669,1.1573 c 1.2845,1.08757 1.6435,1.57649 1.1573,1.57649 -0.1153,0 -0.7304,-0.6151 -1.3669,-1.3669 z m 163.18971,25.03601 c 7.11945,-0.87298 15.83885,-3.25114 21.19294,-5.78025 4.63917,-2.1914 11.02916,-6.44816 13.04467,-8.68985 0.62938,-0.70001 1.37552,-1.12986 1.65809,-0.95523 0.88414,0.54643 2.96891,-0.94253 2.96891,-2.12042 0,-1.33361 -6.24568,-7.31691 -11.64991,-11.1605 -15.94309,-11.33902 -35.47632,-15.30381 -51.83474,-10.52124 -7.40116,2.16382 -16.85461,6.90518 -23.25869,11.66535 -2.91181,2.16436 -4.31181,3.03724 -3.1111,1.93971 5.48542,-5.014 12.17898,-10.86824 17.60539,-15.3978 5.74701,-4.79717 6.0441,-4.95824 10.67923,-5.78996 5.89922,-1.05853 20.15903,-1.04609 26.33432,0.023 12.52638,2.16859 27.84361,9.76947 35.51114,17.62173 2.38924,2.4468 3.97692,3.13197 3.97692,1.71626 0,-1.31748 -9.94063,-10.57424 -14.57459,-13.57194 -8.87866,-5.74358 -18.20265,-8.76038 -30.96768,-10.01967 -6.36329,-0.62775 -9.9097,-0.54186 -17.63862,0.4272 l -2.73379,0.34276 4.55631,-3.21091 c 2.50597,-1.766 7.35805,-5.21094 10.78239,-7.65543 l 6.22608,-4.44453 6.83536,-0.38348 c 17.45874,-0.97946 32.3413,3.21587 51.01209,14.38008 6.47119,3.86945 7.38681,4.25448 8.19514,3.44615 1.27642,-1.27641 0.72574,-2.59086 -4.12361,-9.84291 -5.0295,-7.52147 -12.82349,-15.11889 -21.21126,-20.67631 -16.16555,-10.71069 -29.47249,-12.15519 -66.82882,-7.25442 -13.18554,1.72981 -18.85854,2.7711 -26.72001,4.90451 -6.93923,1.88313 -8.44299,2.6219 -12.01796,5.90419 -3.49824,3.21184 -4.97218,6.41331 -4.9893,10.83701 -0.0109,2.80151 0.27081,3.78427 1.50491,5.2509 1.13127,1.34445 1.31084,1.88394 0.70448,2.11662 -1.2929,0.49613 -5.66923,9.44385 -7.04214,14.39815 -5.11883,18.4719 -2.98997,34.43916 4.34615,32.59791 2.53231,-0.63557 9.14369,-5.29845 13.82402,-9.74982 l 4.54189,-4.31971 -4.12011,4.45172 c -3.7251,4.0249 -4.10231,4.66559 -3.93438,6.68259 0.24646,2.96041 2.88083,4.35489 8.22949,4.35622 2.93163,7.3e-4 5.20434,0.53711 10.02389,2.36572 15.04375,5.70783 29.53128,7.7685 43.0029,6.11662 z m -25.60879,-9.54454 c -0.75566,-0.96354 -0.73418,-0.98503 0.22937,-0.22937 0.58472,0.45858 1.06314,0.93699 1.06314,1.06314 0,0.5 -0.49888,0.17819 -1.29251,-0.83377 z M -1235.5399,279.22112 c 0.029,-0.70771 0.1731,-0.85166 0.3671,-0.36703 0.1755,0.43854 0.1539,0.96252 -0.048,1.16439 -0.2019,0.20187 -0.3455,-0.15694 -0.3191,-0.79736 z"
       id="path70"
       sodipodi:nodetypes="sssssssscscssssssssscsssssssssssssssssssssssssssssssssssssscscssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssscsssssssssssssssssssssscsssssssssssssssssssscsscsssssssssssssscssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
       d="m -999.88297,540.19617 c -3.18893,-0.54096 -8.77383,-2.49349 -17.26933,-6.03759 -3.3214,-1.3856 -8.8567,-3.18507 -12.3007,-3.99883 -7.353,-1.73741 -10.3149,-3.12599 -13.5338,-6.34496 -2.3491,-2.34907 -4.067,-4.88084 -3.3118,-4.88084 0.2182,0 1.3772,0.86084 2.5756,1.91297 1.1983,1.05214 3.6567,2.58964 5.4632,3.41666 3.7116,1.69925 10.6089,2.55398 11.3203,1.40285 0.7635,-1.23537 -0.787,-2.29962 -3.8849,-2.66652 -6.367,-0.75407 -12.2102,-4.6976 -14.2632,-9.62611 l -0.9243,-2.21884 2.3118,-0.92502 c 5.8823,-2.3536 18.8151,-3.71545 24.0816,-2.53583 1.0024,0.22453 5.103,1.54679 9.1126,2.93837 7.1204,2.47124 7.4739,2.52975 15.18771,2.51349 7.71937,-0.0163 8.07585,-0.0771 15.79522,-2.69797 7.80715,-2.65063 7.99155,-2.68125 16.09898,-2.67365 7.03212,0.007 8.9159,0.22667 13.21331,1.54368 2.79364,0.85615 5.01194,1.26263 5.01194,0.91839 0,-0.33968 0.15954,-0.45807 0.35452,-0.26309 0.52516,0.52516 -2.02997,5.9906 -3.57361,7.64397 -2.35876,2.52642 -6.38442,4.4504 -10.90596,5.21225 -3.69221,0.62212 -4.40396,0.93184 -4.40396,1.91639 0,1.05596 0.41938,1.16452 4.15975,1.0768 6.53812,-0.15334 11.75211,-3.05211 15.71412,-8.73642 l 1.04109,-1.49367 -0.65395,2.00038 c -0.92437,2.82757 -6.12563,8.29684 -9.39573,9.87986 -1.51947,0.73556 -5.85383,2.09656 -9.63191,3.02444 -3.94791,0.96958 -10.19213,3.15856 -14.6827,5.14717 -10.66224,4.72168 -15.72308,5.73619 -22.70589,4.55167 z m 12.31351,-8.85155 c 1.71206,-0.58336 4.32451,-2.35022 6.71847,-4.54385 2.15442,-1.97413 4.60806,-3.85202 5.45255,-4.17309 0.84448,-0.32107 3.95254,-0.76001 6.90681,-0.97542 6.52502,-0.47576 9.02874,-1.18554 10.22957,-2.89998 2.39642,-3.42136 -0.48279,-6.49946 -6.0732,-6.49272 -4.82446,0.006 -8.79144,2.25327 -15.44679,8.75124 -3.19881,3.12315 -6.71219,6.13155 -7.80754,6.68533 -3.15833,1.59678 -9.0212,1.89404 -13.22921,0.67075 -3.1934,-0.92837 -4.3044,-1.73081 -9.6847,-6.99525 -7.5533,-7.39065 -10.0283,-8.76069 -15.884,-8.79276 -3.4362,-0.0188 -4.6053,0.21702 -5.6195,1.13353 -1.7292,1.56286 -1.6309,4.073 0.2279,5.81928 1.2812,1.2036 2.4337,1.48871 7.652,1.89292 7.2112,0.55858 9.6724,1.02831 9.6724,1.84603 0,0.3273 0.23,0.45291 0.5112,0.27912 0.2812,-0.17378 1.4431,0.65632 2.5819,1.84467 2.7688,2.88903 6.5515,5.46488 9.1004,6.19692 3.3407,0.95944 11.55678,0.82147 14.69174,-0.24672 z m 44.05225,-122.8099 c 1.09191,-0.13521 2.73218,-0.13242 3.64505,0.006 0.91288,0.13862 0.0195,0.24924 -1.98528,0.24583 -2.00478,-0.003 -2.75167,-0.11682 -1.65977,-0.25203 z m -89.04109,-1.41235 c -2.4712,-0.99159 -6.9967,-4.34762 -11.3606,-8.4249 -3.1838,-2.97471 -3.6418,-3.27854 -1.8225,-1.20898 1.3365,1.52034 0.4047,0.69442 -2.0706,-1.83537 -2.4753,-2.52979 -4.3004,-4.18955 -4.0556,-3.68836 0.2447,0.5012 -0.1459,0.15807 -0.868,-0.76251 -0.7222,-0.92058 -1.5694,-1.51536 -1.8827,-1.32174 -0.3133,0.19362 -0.4945,-0.01 -0.4027,-0.4525 0.092,-0.4425 -0.3091,-0.80743 -0.891,-0.81095 -0.5819,-0.004 -0.9919,-0.19337 -0.9112,-0.42189 0.262,-0.7421 -3.9636,-4.72749 -10.6366,-10.03212 -8.3978,-6.67566 -8.6067,-7.47404 -1.2289,-4.69773 5.8859,2.21491 12.5388,5.91551 17.664,9.82541 3.3214,2.53382 4.6109,3.2106 5.1294,2.69209 1.0261,-1.02606 -1.8175,-3.74713 -8.7598,-8.38249 -6.6312,-4.4276 -13.7642,-7.58343 -20.7023,-9.15927 -2.5896,-0.58814 -4.7082,-1.27687 -4.7082,-1.5305 0,-0.25364 -0.3039,-0.46116 -0.6753,-0.46116 -0.3713,0 -3.7202,-2.14928 -7.4419,-4.77619 -3.7218,-2.6269 -8.3684,-5.82919 -10.326,-7.11621 -1.9576,-1.28701 -3.2553,-2.44132 -2.8839,-2.56514 1.1585,-0.38616 17.2265,2.15694 35.9073,5.68309 20.2482,3.82204 27.0885,4.38122 30.0942,2.46019 0.99,-0.63275 1.603,-0.93699 1.3623,-0.67609 -0.2407,0.2609 0.1172,1.25371 0.7955,2.20624 3.8616,5.42308 7.2315,15.98938 8.4981,26.64571 1.1456,9.63735 -0.5294,17.52354 -4.0023,18.84394 -1.858,0.7064 -1.9817,0.70534 -3.8207,-0.0326 z m 69.34198,-0.25732 c -5.74223,-4.02201 -4.30019,-26.86042 2.55558,-40.47416 2.82898,-5.61761 4.11117,-6.89824 5.90767,-5.90054 2.28492,1.26896 10.43039,0.69449 22.61577,-1.595 18.15831,-3.41175 36.33297,-6.47693 37.664,-6.35209 0.6691,0.0628 1.68594,-0.089 2.25965,-0.33728 0.5737,-0.24827 1.37031,-0.34232 1.77023,-0.20901 0.39992,0.1333 -2.52988,2.53487 -6.51068,5.3368 -3.98079,2.80194 -8.66507,6.09831 -10.40949,7.32527 -1.74443,1.22696 -2.99742,2.40511 -2.78442,2.61811 0.213,0.213 -0.31115,0.38727 -1.16479,0.38727 -2.49662,0 -11.95137,2.91269 -16.68803,5.14102 -6.48399,3.05035 -17.80542,11.05616 -17.80542,12.59089 0,1.53489 2.09318,0.8473 5.67594,-1.86448 2.20553,-1.66936 5.87877,-4.14539 8.16274,-5.50227 4.21796,-2.50584 13.76633,-6.32731 14.88106,-5.95574 0.33609,0.11203 -1.67634,2.10456 -4.47205,4.42785 -7.82077,6.4992 -14.22234,12.45008 -14.23743,13.23507 -0.008,0.39008 -0.44944,0.63728 -0.98209,0.54933 -0.53266,-0.0879 -1.34666,0.30626 -1.8089,0.87601 -0.71781,0.88476 -0.71594,0.96087 0.0128,0.52166 0.58353,-0.35168 0.71429,-0.28939 0.41365,0.19705 -0.24178,0.3912 -0.65485,0.57825 -0.91794,0.41565 -0.26309,-0.1626 -1.35499,0.79523 -2.42644,2.1285 -1.07145,1.33328 -2.16236,2.29171 -2.42425,2.12985 -0.48527,-0.29991 -3.86685,2.89783 -3.7589,3.55454 0.0326,0.19829 -0.14578,0.39549 -0.39637,0.43821 -0.2506,0.0427 -2.09591,1.2386 -4.10069,2.6575 -6.54508,4.63232 -8.64726,5.32979 -11.03123,3.65999 z m 20.75137,-11.86274 c 0.60477,-0.66826 0.96289,-1.21502 0.79582,-1.21502 -0.16706,0 -0.79856,0.54676 -1.40333,1.21502 -0.60476,0.66825 -0.96288,1.21501 -0.79582,1.21501 0.16707,0 0.79857,-0.54676 1.40333,-1.21501 z m -6.45633,11.69453 c -0.75566,-0.96354 -0.73417,-0.98503 0.22937,-0.22936 0.58473,0.45857 1.06314,0.93698 1.06314,1.06314 0,0.5 -0.49888,0.17818 -1.29251,-0.83378 z m 6.64618,-1.17438 c 0.43854,-0.17549 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34546 -0.79736,0.31908 -0.70771,-0.0292 -0.85166,-0.17311 -0.36703,-0.36704 z m -2.31613,-3.53381 c 0.78475,-0.83532 1.5635,-1.51877 1.73057,-1.51877 0.16706,0 -0.33831,0.68345 -1.12306,1.51877 -0.78475,0.83533 -1.5635,1.51878 -1.73057,1.51878 -0.16706,0 0.33832,-0.68345 1.12306,-1.51878 z m -139.84087,-35.34649 c 0.4385,-0.1755 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.157,0.34545 -0.7974,0.31907 -0.7077,-0.0292 -0.8516,-0.1731 -0.367,-0.36703 z m 177.3925,0 c 0.43854,-0.1755 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34545 -0.79736,0.31907 -0.70771,-0.0292 -0.85166,-0.1731 -0.36703,-0.36703 z m -198.9855,-15.19391 c 0.5911,-0.15403 1.4113,-0.1439 1.8226,0.0225 0.4113,0.16641 -0.072,0.29244 -1.0747,0.28006 -1.0024,-0.0124 -1.339,-0.14854 -0.7479,-0.30257 z m -66.8156,-53.95092 c 0,-1.67064 0.1225,-2.28199 0.2622,-1.35854 0.1396,0.92345 0.1359,2.29035 -0.01,3.03755 -0.1442,0.74719 -0.2585,-0.008 -0.2539,-1.67901 z m 354.74261,-4.29818 c -0.50455,-11.8428 -6.21169,-32.15822 -13.14703,-46.79887 -7.09847,-14.98501 -17.74545,-25.69952 -33.46463,-33.67689 -13.05355,-6.62458 -25.98362,-9.94898 -38.5709,-9.9168 -7.69242,0.0197 -9.53968,0.2887 -29.76792,4.33549 -34.35493,6.87292 -48.14985,8.42093 -69.86353,7.83978 -20.0194,-0.5358 -26.8651,-1.55961 -62.2696,-9.31278 -9.6695,-2.11752 -11.0051,-2.26365 -20.959,-2.29325 -9.7556,-0.029 -11.1753,0.10956 -17.2328,1.68206 -20.0545,5.20604 -31.2263,10.98533 -41.7206,21.58273 -14.2543,14.39421 -20.9253,29.28677 -26.9774,60.22532 -0.8824,4.51087 -0.8889,4.43513 -0.6487,-7.59386 0.7513,-37.62182 12.0428,-63.68247 33.8035,-78.01822 6.3197,-4.1634 12.4047,-6.7003 21.1506,-8.81803 18.5459,-4.49066 31.851,-3.7572 70.784,3.90203 46.0409,9.05755 58.21587,8.95607 108.46596,-0.90413 28.08998,-5.51188 39.66997,-6.84735 50.11945,-5.78003 28.67121,2.92848 47.37715,14.66089 58.77051,36.861 8.0689,15.72237 12.50899,38.98103 11.869,62.17376 -0.11525,4.17662 -0.26866,6.20643 -0.34091,4.51069 z"
       id="path127"
       sodipodi:nodetypes="sssssssssscssssscsssssssscsssssssssssssssssssssssssscsssssssssscssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssscscccssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       id="path66"
       style="display:inline;fill:#281a16;stroke:none;stroke-opacity:1"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       d="m -765.37492,350.80764 c 2.3e-4,0.005 -2.2e-4,0.0102 0,0.0155 -8.69421,15.63249 -17.28071,31.32886 -24.99356,47.47269 -1.70527,3.56639 -3.36544,7.18176 -5.62589,10.44173 -0.33679,0.48585 -0.678,0.96658 -1.02752,1.44253 0.0801,5.78878 0.13793,11.80439 0.1731,17.93181 0.11133,19.39612 -0.0289,23.17446 -1.24502,33.4113 -3.22205,27.12039 -11.01244,80.22501 -15.95221,108.74488 -8.24775,47.61861 -22.06855,73.52642 -59.76751,112.02719 -17.64362,18.01887 -37.61912,35.93302 -50.0182,44.85615 -13.77821,9.91565 -32.90505,16.82515 -52.47717,18.95712 -6.82604,0.74355 -32.6622,0.72388 -39.359,-0.0289 -19.532,-2.19598 -38.9963,-9.66782 -53.4603,-20.51949 -27.1755,-20.3886 -62.8514,-56.31372 -78.5027,-79.05087 -17.64,-25.62629 -24.3456,-44.8851 -31.7291,-91.12376 -10.3142,-64.59185 -14.1369,-93.84622 -14.7227,-112.69298 -0.1244,-4.00238 -0.1056,-12.12891 0.011,-21.82221 -5.8243,-22.83176 -29.5954,-54.8602 -29.4212,-53.69334 1.7321,1.25952 2.9842,2.93605 4.0991,4.83582 1.0467,1.8903 1.3421,3.98615 1.4203,6.10525 0.012,0.32049 0.016,0.63493 0.013,0.94319 2.7316,6.58659 8.9731,25.19787 14.9003,44.5854 l 5.1354,16.79775 0.9143,11.44929 c 1.1248,14.09929 3.7493,35.29592 7.3148,59.04624 1.4877,9.90987 2.707,18.60787 2.7075,19.32996 0,0.21862 -0.057,0.45923 -0.1664,0.71461 0.4066,1.21196 0.6349,2.47728 0.7878,3.75502 0.028,0.2681 0.052,0.53006 0.071,0.78785 0.1213,-0.0516 0.2065,-0.0749 0.2442,-0.0666 v 0.002 0.002 0.002 0.002 c 0.1037,0.10377 1.4286,7.74114 2.945,16.97308 5.6853,34.61214 8.6797,47.362 14.7427,62.7813 6.1153,15.55249 13.0966,27.51489 24.4276,41.8579 l 3.3134,4.19444 0.5593,12.81858 c 0.6228,14.28166 0.2084,45.0611 -0.7457,55.34005 -1.4757,15.89897 -4.7267,24.14735 -11.4604,29.09036 -2.9284,2.14965 -23.5047,13.26057 -38.4712,20.77249 -4.2338,2.12497 -7.8908,4.17309 -8.1248,4.55175 -0.5071,0.82054 5.0841,6.63392 12.783,13.29129 39.0588,33.77492 98.612,54.97349 167.9754,59.79192 6.7079,0.46596 50.90686,-0.14718 57.10655,-0.79228 35.82834,-3.72809 63.91353,-10.29299 92.94802,-21.729 18.51084,-7.29099 37.03858,-17.22398 50.69952,-27.17956 10.80865,-7.87693 25.23992,-20.99379 25.23991,-22.94073 0,-0.68522 -1.14752,-1.64042 -3.18911,-2.65427 -14.61763,-7.25907 -41.16494,-21.63497 -43.86635,-23.7552 -5.94427,-4.66547 -8.78894,-11.38519 -10.49721,-24.78718 -0.82069,-6.43856 -1.01273,-13.79488 -1.03863,-39.50324 l -0.0333,-31.58927 4.93347,-6.37822 c 16.45181,-21.27301 25.87102,-41.79378 31.86447,-69.41696 2.11761,-9.75987 4.92715,-25.73554 7.55444,-42.97198 0.81641,-5.35612 1.05797,-7.24717 1.69553,-7.53225 0.0248,-0.1647 0.0515,-0.3289 0.0799,-0.49268 0.0124,-0.0754 0.0233,-0.15095 0.0355,-0.22636 -0.042,-0.35527 -0.0572,-0.71214 -0.0444,-1.0697 0.005,-0.13122 0.0165,-0.26398 0.0244,-0.39503 0.0618,-0.80789 0.25523,-1.59473 0.44829,-2.37907 0.0194,-0.0774 0.0408,-0.17353 0.0666,-0.27963 -0.0962,-0.42802 -0.0409,-0.9098 0.0732,-1.59789 3.53712,-21.32484 9.61849,-68.92516 10.43951,-81.71178 0.33914,-5.28177 1.12871,-8.53351 6.04754,-24.90702 5.43951,-18.10642 11.63328,-36.89727 14.17457,-43.12289 0.0401,-0.10501 0.0834,-0.21211 0.13093,-0.31957 0.22247,-0.53313 0.41493,-0.95588 0.57036,-1.26056 0.31153,-0.61064 0.71031,-1.22764 1.18288,-1.83978 0.53466,-0.91874 1.06779,-1.83783 1.57125,-2.77411 0.84139,-1.50955 1.67355,-3.02364 2.52554,-4.52733 0.22529,-0.40717 0.45144,-0.81355 0.67688,-1.22061 -0.67736,0.3107 -1.12099,0.42774 -1.11851,0.26409 0.004,-0.26468 0.82765,-4.58202 1.8309,-9.59396 0.50758,-2.53572 0.70021,-5.01049 0.59699,-7.42572 v -0.002 l 0.002,-0.002 v -0.002 c 0.002,-0.003 0.005,-0.006 0.007,-0.009 z m -22.19727,45.61292 c 0.0113,-6.2e-4 0.0237,-4.9e-4 0.0355,0 0.0861,0.004 0.18409,0.0375 0.28851,0.10209 0.33413,0.2065 0.60808,0.49402 0.60808,0.64137 0,0.14734 -0.27395,0.26854 -0.60808,0.26854 -0.33413,0 -0.60587,-0.28975 -0.60587,-0.6436 0,-0.22804 0.11167,-0.3592 0.28185,-0.3684 z m 2.29918,1.74214 c 0.12527,-0.0109 0.32297,0.10766 0.56814,0.35287 0.39503,0.39539 0.57654,0.86155 0.40391,1.03418 -0.40545,0.40545 -1.12292,-0.31428 -1.12296,-1.12517 0,-0.16655 0.0535,-0.25342 0.15091,-0.26188 z m -1.89083,1.14293 h 0.002 0.002 0.002 c 10e-4,4e-5 0.003,4e-5 0.004,0 0.0782,-0.003 0.23545,0.11492 0.48158,0.34177 1.09663,1.01075 0.59616,2.77877 -0.57479,2.03065 -0.57475,-0.36721 -0.63782,-0.58655 -0.17089,-0.59255 0.44142,-0.006 0.58925,-0.43798 0.36618,-1.07192 -0.14122,-0.40132 -0.19154,-0.6291 -0.13981,-0.69241 9.8e-4,-10e-4 0.006,-0.006 0.007,-0.007 0.006,-0.004 0.0124,-0.007 0.02,-0.009 z m -3.30007,0.14647 c 0.16343,-0.005 0.17976,0.44545 0.17976,1.45585 0,1.42011 0.25145,1.84841 1.02087,1.73548 1.23991,-0.18198 3.21056,1.39038 2.90504,2.31915 -0.12123,0.36853 -0.52149,1.84331 -0.88771,3.27345 -0.42504,1.65984 -0.9115,2.44631 -1.34711,2.17711 -0.45535,-0.28143 -0.54463,-0.0595 -0.26631,0.66579 0.22941,0.59781 -0.0348,2.69956 -0.58811,4.67159 -0.55333,1.97204 -1.28312,3.75623 -1.6223,3.96586 -0.33949,0.20981 -0.43231,0.0838 -0.20639,-0.28185 0.22572,-0.36522 0.0138,-0.88511 -0.46827,-1.15625 -0.62958,-0.35406 -0.93768,-1.99224 -1.09854,-5.81008 -0.12318,-2.92364 -0.0272,-5.31518 0.21305,-5.31518 0.24028,0 0.86643,-0.42923 1.39149,-0.95429 0.52936,-0.52936 0.98764,-0.66498 1.02974,-0.30405 0.0418,0.35799 0.11133,0.9706 0.15313,1.36042 0.0418,0.38982 0.41858,0.82307 0.83889,0.96317 0.58755,0.19585 0.6222,-0.14456 0.1487,-1.46916 -0.28302,-0.79173 -0.42027,-1.20598 -0.38616,-1.28719 l 0.002,-0.002 0.002,-0.002 v -0.002 h 0.002 l 0.002,-0.002 v -0.002 h 0.002 c 10e-4,-1.3e-4 0.008,-10e-6 0.009,0 v 0.002 h 0.002 c 0.0808,0.0241 0.29909,0.28685 0.66357,0.75677 0.87989,1.13448 0.90982,1.11292 0.77675,-0.4949 -0.15707,-1.89784 -1.34995,-3.24867 -1.97516,-2.23704 -0.21654,0.35035 -0.85534,0.63306 -1.42034,0.62806 -0.85149,-0.008 -0.87829,-0.10402 -0.15535,-0.56148 0.64939,-0.41091 0.70308,-0.75705 0.20417,-1.3582 -0.49561,-0.59716 -0.44819,-1.11535 0.18864,-1.98626 0.34041,-0.46556 0.54759,-0.7286 0.67244,-0.74568 h 0.002 0.002 0.002 z m 1.0941,4.25659 c 0.0888,5.2e-4 0.18997,0.0343 0.29961,0.10209 0.33413,0.2065 0.60808,0.49847 0.60808,0.64581 0,0.14735 -0.27395,0.26631 -0.60808,0.26631 -0.33413,0 -0.60587,-0.28974 -0.60587,-0.64359 0,-0.22112 0.10687,-0.35238 0.26854,-0.3684 0.0121,-0.001 0.025,-0.002 0.0377,-0.002 z m -11.92199,130.00117 c -0.0172,0.0642 -0.0378,0.12879 -0.0599,0.19529 -10e-4,0.009 -0.003,0.0178 -0.004,0.0266 0.0247,-0.0712 0.0505,-0.14189 0.0754,-0.21306 -0.004,-0.003 -0.007,-0.006 -0.0111,-0.009 z m -386.9653,1.70663 c 0.017,-0.093 -0.049,0.18116 -0.071,0.27297 -0.01,0.0276 -0.013,0.0567 -0.02,0.0843 0,-0.009 0.01,-0.018 0.011,-0.0266 0.027,-0.11041 0.06,-0.21875 0.08,-0.33067 z m 213.6859,26.65359 c -4.20329,-0.004 -5.50107,0.29696 -10.93663,2.5211 -8.5092,3.48182 -11.70127,3.46893 -20.39297,-0.0843 -6.3164,-2.58229 -6.3493,-2.59001 -12.4569,-2.28586 -11.7182,0.58355 -24.987,6.21303 -46.5206,19.72942 -14.5449,9.12966 -20.0205,14.57909 -19.2722,19.17905 0.5083,3.12486 5.698,14.42097 10.384,22.60118 16.9666,29.61843 34.6474,42.63815 63.5647,46.8069 7.5521,1.08871 26.87585,0.7668 34.1237,-0.56814 24.73851,-4.55644 41.93616,-17.47426 56.97344,-42.79887 4.40939,-7.42594 7.00939,-12.54405 10.36849,-20.40631 2.33929,-5.47525 2.50177,-6.1818 1.88639,-8.23576 -0.8979,-2.99691 -6.02954,-7.8092 -14.04806,-13.17145 -23.73252,-15.87071 -40.79995,-23.27543 -53.67336,-23.28693 z m -40.4908,2.45896 c 2.5371,-0.009 3.8266,0.50118 8.5154,2.43899 5.5473,2.29257 6.95365,2.63229 10.92328,2.64539 3.95652,0.0131 5.31695,-0.30081 10.32854,-2.39683 5.4737,-2.28928 6.08475,-2.41093 11.84653,-2.36353 5.29711,0.0436 6.9017,0.3273 12.53451,2.23482 12.8931,4.36618 35.05967,16.89984 46.32532,26.19419 1.63189,1.34635 2.68843,2.54153 2.35022,2.65427 -0.33821,0.11273 -3.44976,-0.86616 -6.91528,-2.17268 -3.46553,-1.30652 -8.62472,-3.1282 -11.46482,-4.05019 -2.8401,-0.92198 -6.05338,-2.33913 -7.13944,-3.14917 -3.21525,-2.39813 -5.92202,-3.23349 -10.48389,-3.23349 -2.36354,0 -7.90815,-0.44357 -12.32146,-0.98536 -6.26918,-0.76962 -10.21793,-0.88411 -18.04943,-0.51931 -12.55116,0.5842 -21.09556,0.58405 -34.62748,-0.004 -15.7926,-0.6872 -25.1876,0.90142 -46.7048,7.89843 v 0.002 c -5.6146,1.82578 -12.1644,4.12464 -14.5563,5.11101 -2.392,0.98638 -4.3498,1.56571 -4.3498,1.28941 0,-1.52347 9.0623,-8.2067 20.5395,-15.15105 16.6147,-10.05286 30.4364,-15.66631 40.1246,-16.29398 1.2946,-0.0839 2.2791,-0.14576 3.1248,-0.14869 z m -4.2544,19.40985 5.3174,0.0555 c 2.9237,0.0317 8.0481,0.37524 11.3894,0.76122 l 6.07637,0.69907 0.1731,6.47587 c 0.16232,6.11408 0.0885,6.56844 -1.31381,8.20025 h 0.002 c -1.45855,1.69718 -1.60708,1.73013 -8.37336,1.82203 -8.2523,0.11213 -9.0959,-0.0368 -11.0143,-1.95518 -1.7405,-1.74055 -2.2337,-4.17892 -2.2437,-11.0476 z m 44.04612,0.091 3.64406,0.21084 0.19086,4.25436 c 0.33512,7.4807 -0.15685,9.12434 -3.41547,11.38714 -2.70202,1.87626 -3.16213,1.98401 -8.92374,2.1172 -6.36761,0.1472 -7.86658,-0.17566 -9.49853,-2.04396 -1.60243,-1.83449 -1.88599,-3.67228 -1.44032,-9.30324 l 0.42167,-5.31296 7.68759,-0.76121 c 4.22874,-0.41775 9.3291,-0.66415 11.33388,-0.54817 z m 6.46921,0.15979 c 2.78462,-0.0233 12.06195,1.06273 12.05293,1.50468 -0.004,0.20343 -1.03035,1.03014 -2.2792,1.83756 -1.24885,0.80742 -4.07844,2.92724 -6.28723,4.70932 -2.2088,1.78209 -4.18941,3.24015 -4.40306,3.24015 -0.61322,0 -0.45246,-10.82488 0.16644,-11.20738 0.0868,-0.0537 0.35232,-0.0809 0.75012,-0.0843 z m -52.03113,0.0511 0.1776,5.46831 c 0.2231,6.82737 -0.06,7.95085 -2.2837,9.10128 -2.5871,1.33788 -8.3724,1.19743 -10.7657,-0.26188 -2.7129,-1.65413 -3.2291,-2.95279 -3.2291,-8.12479 v -4.52734 l 3.8638,-0.72792 c 2.1246,-0.4009 5.7468,-0.7732 8.0494,-0.8278 z m 73.55152,1.83756 h 0.002 c 3.01049,-0.0119 4.14423,0.29016 6.1807,1.63783 7.18839,4.75705 10.28107,15.80026 7.66985,27.38818 -1.57119,6.97252 -1.96404,7.46958 -6.30055,7.92284 -3.94118,0.41193 -5.58734,1.04374 -7.68981,2.95608 -1.0915,0.9928 -1.53318,1.07357 -2.64761,0.47715 -0.73539,-0.39357 -2.53784,-0.62053 -4.00581,-0.50378 -1.46798,0.11676 -2.66979,0.009 -2.66979,-0.23746 0,-0.24652 1.00918,-2.02481 2.24369,-3.95255 2.5653,-4.00583 5.92264,-11.63718 6.48919,-14.75601 0.14714,-0.81001 0.27347,-1.40228 0.22414,-1.49358 l -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 h -0.002 c -9.1e-4,-9e-5 -0.008,-5e-5 -0.009,0 h -0.002 c -0.17957,0.0761 -1.03484,1.98412 -3.55307,7.49673 -2.45067,5.36473 -6.47246,11.40426 -9.51629,14.28553 -1.73155,1.63906 -1.95824,1.69188 -4.09901,0.98536 -1.33886,-0.44144 -3.83763,-0.62162 -6.10747,-0.43942 -2.12972,0.17095 -4.72905,0.82001 -5.8345,1.45585 -1.91945,1.10407 -2.07434,1.10281 -4.1212,0.0688 -2.691,-1.35976 -8.83215,-1.42008 -12.08178,-0.11984 -2.17102,0.86867 -2.55675,0.86867 -4.23661,0 -2.39144,-1.23669 -9.04379,-1.24869 -12.10839,-0.0222 -2.1704,0.86844 -2.5136,0.84829 -5.0244,-0.29073 -3.3651,-1.52661 -9.9805,-1.70204 -11.9575,-0.31736 -1.2155,0.8514 -1.4303,0.83115 -2.4967,-0.23524 -0.6417,-0.6417 -1.6682,-1.44875 -2.2837,-1.79318 -1.0672,-0.59733 -1.07,-0.67858 -0.058,-1.79984 3.1919,-3.52697 12.2615,-6.78197 25.9235,-9.2988 15.7933,-2.90949 22.46438,-6.19463 39.7828,-19.60292 10.9718,-8.49459 13.37066,-9.78238 18.29799,-9.80258 z m -91.47442,0.26632 v 4.59835 c 0,4.19066 -0.1414,4.72717 -1.6068,6.08527 -2.4126,2.23587 -6.6843,2.1082 -8.9592,-0.26631 -2.1903,-2.28617 -2.8696,-6.35853 -1.2006,-7.20157 1.0445,-0.52759 6.0713,-1.94335 10.0977,-2.8429 z m -15.2975,4.58282 c 0.082,0.004 0.1427,0.0169 0.1798,0.0399 0.9301,0.57484 0.584,3.06781 -0.5726,4.11455 -0.6111,0.55298 -2.0545,1.00756 -3.2069,1.00756 -2.3013,0 -5.2083,-1.65378 -4.3742,-2.48782 0.7748,-0.77477 6.741,-2.73517 7.9739,-2.67423 z m 121.19504,0.98758 c 0.38907,10e-6 1.0801,0.21574 2.14827,0.58811 2.16467,0.75461 2.48017,2.02305 0.7368,2.95608 -1.59257,0.85231 -1.50659,0.89938 -2.64982,-1.49801 -0.69184,-1.4508 -0.88371,-2.0462 -0.23525,-2.04618 z m 21.91098,12.17054 c 0.0407,-0.002 0.0729,0.007 0.0954,0.0289 0.78003,0.77338 -9.1692,20.01885 -14.36542,27.78764 -5.54766,8.29421 -14.13328,17.71165 -20.53946,22.53238 -8.23357,6.19586 -20.27707,11.12718 -31.64254,12.95618 -16.23295,2.61231 -34.7843,1.36257 -48.7266,-3.28232 -20.421,-6.80331 -36.4695,-22.88371 -49.3857,-49.49002 -5.3815,-11.08532 -5.4421,-11.86252 -0.5148,-6.37822 19.3854,21.57718 37.2992,32.26893 61.8736,36.92887 7.9136,1.50059 29.86269,1.45671 38.27371,-0.0754 11.44031,-2.08427 25.25313,-7.46011 34.82499,-13.55538 8.44173,-5.37562 19.56523,-15.50408 27.25723,-24.81825 1.25034,-1.51403 2.45572,-2.61773 2.84956,-2.63429 z m -138.81392,20.67929 c 0.519,-0.002 1.0529,0.0406 1.5579,0.13537 2.4016,0.45055 3.7017,1.8052 4.2633,4.44744 0.3129,1.47236 0.209,1.97517 -0.4128,1.97517 -0.9484,0 -8.3734,-4.94313 -8.3734,-5.57706 0,-0.56703 1.4078,-0.97343 2.965,-0.98092 z m 109.43505,0.19085 c 1.31959,0.0312 2.4168,0.36074 2.4168,0.88106 0,0.2506 -1.43493,1.40533 -3.18911,2.56771 -1.75418,1.16237 -3.80439,2.44263 -4.55618,2.8429 -1.29149,0.6876 -1.36708,0.61305 -1.36708,-1.32713 0,-2.37271 1.33566,-3.83672 4.2699,-4.67825 0.76321,-0.21888 1.63392,-0.30503 2.42567,-0.28629 z m -13.51099,2.6698 c 1.76339,-0.0315 3.34009,0.39513 4.04575,1.40259 1.30785,1.86722 1.18565,3.94835 -0.28185,4.73373 -3.16161,1.69204 -10.85162,4.72108 -11.17187,4.40084 -0.57767,-0.57771 -0.41057,-5.40498 0.24634,-7.13278 0.77053,-2.02668 4.22266,-3.3519 7.16163,-3.40438 z m -82.58616,0.0688 c 1.1212,0.012 2.372,0.1972 3.704,0.57923 2.7272,0.78212 3.056,1.42052 3.067,5.93658 0.01,2.64354 -0.2214,3.79188 -0.7501,3.78388 -0.4177,-0.006 -3.0832,-1.04044 -5.9233,-2.29696 -4.4397,-1.9642 -5.1907,-2.50997 -5.3529,-3.89928 -0.3034,-2.59834 1.8915,-4.13944 5.2553,-4.10345 z m 68.34724,1.83091 c 1.93766,-0.0241 2.50383,0.25792 3.38884,1.14293 1.11931,1.11931 1.29147,1.8891 1.1385,5.08881 l -0.17977,3.76835 -6.37822,1.62007 c -3.50836,0.89082 -6.75532,1.64091 -7.21489,1.66891 -0.6677,0.0407 -0.78142,-0.99145 -0.56369,-5.13986 0.35917,-6.84305 1.08074,-7.63131 7.35248,-8.03381 1.01323,-0.065 1.81086,-0.10737 2.45675,-0.1154 z m -53.93304,0.0111 c 0.6219,-5e-5 1.3158,0.0251 2.0884,0.0688 6.0293,0.34068 6.8305,1.24877 6.9175,7.83629 0.038,2.88091 -0.1915,5.06852 -0.5415,5.15983 -0.7451,0.19427 -6.8698,-1.24091 -10.7835,-2.52776 l -2.8851,-0.94985 v -3.88597 c 0,-4.48387 0.851,-5.70101 5.2042,-5.70134 z m 35.68387,0.55926 h 0.002 c 3.18548,0.17879 6.20109,1.18176 6.59349,2.87398 0.13865,0.5981 0.10408,3.13988 -0.0754,5.64585 l -0.32624,4.55619 -2.73415,0.41057 c -1.50358,0.22583 -4.717,0.43015 -7.13944,0.45495 l -4.40306,0.0444 0.009,-5.61923 c 0.005,-3.0907 0.20947,-5.91959 0.45495,-6.28723 1.07505,-1.61002 4.43316,-2.25749 7.6188,-2.07947 z m -16.93537,0.0133 c 2.9521,0 4.19597,0.28715 5.43061,1.25833 1.52701,1.20116 1.6001,1.52267 1.6001,6.98631 v 5.72797 l -4.70711,-0.0866 c -2.5896,-0.0474 -5.8029,-0.25177 -7.1394,-0.45495 l -2.4301,-0.3684 -0.4927,-4.53622 c -0.7788,-7.15639 0.4622,-8.52648 7.7386,-8.52648 z m -133.6075,35.80591 3.6086,4.11899 c 6.4991,7.41669 25.9418,26.84783 36.7913,36.77131 24.6048,22.50474 37.1681,30.91538 55.0981,36.88448 14.508,4.82986 25.5853,6.34004 46.35416,6.32274 17.56749,-0.0146 24.93513,-0.82146 37.94086,-4.15672 23.80381,-6.1044 38.12606,-15.63112 72.33976,-48.11406 10.09433,-9.58369 21.12097,-20.92687 28.39351,-29.2102 1.12391,-1.28015 2.06224,-2.17903 2.22816,-2.16158 h 0.002 0.002 0.002 0.002 l 0.002,0.002 v 0.002 0.0111 0.002 0.002 c 0.002,0.007 0.004,0.0168 0.004,0.0244 -0.31035,7.1014 0.67579,62.82106 1.1851,66.98241 2.11482,17.27908 6.03314,24.34391 17.05519,30.74816 l 5.03111,2.92502 -2.88506,2.61209 c -8.35893,7.56783 -23.12934,17.20719 -35.23556,22.994 -31.21173,14.91932 -65.84578,23.28697 -106.6299,25.76366 -44.89953,2.72661 -93.70893,-4.38502 -131.22393,-19.12135 -18.6529,-7.32709 -37.4319,-18.44699 -50.0671,-29.64518 l -2.9827,-2.64539 4.8847,-2.81627 c 8.7688,-5.05789 12.5012,-10.03257 15.0245,-20.02237 2.5056,-9.9197 3.0689,-19.06797 3.0693,-49.8451 z m 309.24159,102.84824 15.33303,8.03381 15.33524,8.0338 -5.9277,5.74129 c -34.558,33.46618 -94.59106,56.61548 -162.05649,62.49279 -10.05038,0.87555 -40.11447,1.23735 -50.42437,0.60587 -66.0186,-4.04366 -124.4103,-23.64544 -163.1128,-54.7586 -7.361,-5.9175 -15.6765,-13.86773 -14.887,-14.23226 0.3341,-0.15427 7.2842,-3.78454 15.4462,-8.06709 l 14.8404,-7.78747 5.9521,4.97563 c 8.1561,6.82009 15.58,11.97622 24.3722,16.91982 56.2279,31.61552 143.86008,40.53684 217.62951,22.15732 21.6831,-5.40231 46.19881,-15.30402 62.56382,-25.26654 6.06099,-3.68974 17.17196,-11.86563 21.88878,-16.10755 z"
       sodipodi:nodetypes="cccscscsssscsssscccccsccscccccccccsscccssssssssssssscccssccccccccssccsccccssscccccsccsssssscssscccsssscssccccssssssssssssssssscccccccccccssscsssccccccssssccccccccccccccsssssscsssssssscssssssssssssccccsssscccccccccssccsccssscccsscsssssscccsscccccssssssssssccccccscsscsscsscsssscsscccssssscscssssssssssscssssscscssssccssscsssssssssssssssccssssscccssssscssccsscssscsccssscssscccccssccsssssscccccccccccsccsssscccsccccccssssccccsscc" />
     </g>

     <g id="svg-leher" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Leher')" onmouseenter="hoverKepala('Leher')" onmouseleave="unhoverKepala('Leher')">
                <path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.0489,781.01587 c -18.4828,-2.61391 -36.6556,-9.49104 -52.7403,-19.95844 -15.8824,-10.3358 -41.8926,-35.30529 -60.7843,-58.35218 -10.291,-12.55464 -9.45,-10.53181 -9.8382,-23.66314 -0.2129,-7.20277 -0.1176,-11.2686 0.2641,-11.2686 0.3284,0 3.4895,3.2122 7.0247,7.13823 7.2747,8.07903 21.3754,22.04493 32.6856,32.37323 30.541,27.8895 45.6069,36.332 73.7812,41.34474 10.3478,1.84107 35.26256,2.31824 47.45151,0.90881 23.82232,-2.75462 41.20257,-9.84121 60.07753,-24.49588 15.87683,-12.32691 49.06637,-44.12649 59.77235,-57.26913 l 1.23719,-1.51877 -0.21998,6.37884 c -0.12099,3.50836 -0.24754,9.01883 -0.28122,12.24549 l -0.0612,5.86666 -5.51083,6.89102 c -17.95534,22.45231 -41.05886,45.80757 -57.36631,57.9914 -18.83983,14.07586 -39.32153,22.56893 -61.35836,25.44326 -8.68677,1.13303 -25.92748,1.10498 -34.13348,-0.0555 z m -123.2691,-76.48805 c 7e-4,-5.34608 0.094,-7.45178 0.2065,-4.67935 0.1128,2.77244 0.1122,7.1465 0,9.72014 -0.1136,2.57364 -0.2059,0.30528 -0.2051,-5.04079 z m 285.54281,-10.6314 c 0,-7.51792 0.0872,-10.59343 0.19379,-6.83447 0.10659,3.75896 0.10659,9.90998 0,13.66894 -0.10658,3.75896 -0.19379,0.68345 -0.19379,-6.83447 z m -285.67031,-0.91127 c 0.012,-1.00238 0.1485,-1.33891 0.3026,-0.74782 0.154,0.59109 0.1439,1.41122 -0.023,1.82253 -0.1665,0.4113 -0.2925,-0.0723 -0.2801,-1.07471 z"
       id="path69"
       sodipodi:nodetypes="ssssssssssscsscssssscscccsssscsccc"
       transform="matrix(0.88007022,0,0,0.88007022,1174.8201,-9.844729)" /><path
       style="fill:#f2b492;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.8472,818.03176 c -62.4502,-4.3756 -111.4875,-21.09441 -142.7508,-48.66956 l -2.7201,-2.39918 2.7201,-1.37186 c 16.0946,-8.11721 19.5081,-17.81782 20.4485,-58.11048 l 0.3847,-16.48731 2.583,3.42588 c 18.0597,23.95292 49.3607,54.90352 67.3926,66.63813 16.2095,10.5486 34.2234,17.33985 52.9636,19.96726 8.4219,1.18077 25.05487,1.20424 33.91014,0.0479 22.04486,-2.87879 42.51968,-11.36939 61.35836,-25.44439 16.27021,-12.156 39.4161,-35.5452 57.2738,-57.87585 l 5.41831,-6.77547 0.36689,17.40687 c 0.20179,9.57378 0.6797,20.40444 1.06202,24.06813 1.14247,10.94804 3.74898,19.26463 7.63419,24.3584 1.82537,2.39318 7.5064,6.63394 11.76264,8.78054 l 2.71921,1.37141 -2.71921,2.42523 c -22.45483,20.02718 -60.14459,36.40596 -100.83184,43.81834 -10.64031,1.93845 -26.36354,3.81503 -38.56643,4.60294 -8.775,0.56658 -33.55488,0.7034 -40.40968,0.22312 z"
       id="path128"
       sodipodi:nodetypes="sscsscsssssscsssscsssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.8201,-9.844729)" />
       </g>

            <!-- 2. TELINGA -->
            <g id="svg-telinga" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Telinga')" onmouseenter="hoverKepala('Telinga')" onmouseleave="unhoverKepala('Telinga')">
                <path
       id="path126"
       style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
       d="m -748.3397,381.79771 c -0.7722,-0.0437 -1.53396,0.10329 -2.66314,0.41944 -3.54636,0.99292 -7.87472,4.36334 -11.7511,9.15011 -9.0302,11.151 -27.20502,46.88848 -27.184,53.45143 0.004,1.21871 1.14071,4.57416 2.66314,7.86292 2.15305,4.65102 2.70939,6.58 2.94055,10.18207 0.3611,5.62669 -0.75843,8.75737 -4.78034,13.35343 -4.03409,4.60998 -5.64221,8.13102 -5.92327,12.98059 -0.20917,3.60905 -0.0771,4.16206 1.40481,5.92326 1.30539,1.55137 2.09566,1.94187 3.92147,1.94187 4.27118,0 6.48357,-2.31369 9.989,-10.44616 1.3037,-3.02454 1.93656,-3.71065 5.01558,-5.44834 6.4882,-3.66172 10.01587,-8.39698 12.01963,-16.12975 3.43943,-13.2732 -3.28659,-31.17359 -13.51321,-35.96348 l -3.05373,-1.43144 1.57569,-3.21574 1.57791,-3.21574 2.88728,1.4625 c 6.27816,3.18139 11.58573,3.1411 13.71074,-0.10208 1.48745,-2.27013 0.77226,-8.42616 -1.91081,-16.46265 l -2.27476,-6.81541 1.99735,-2.52111 c 1.78381,-2.25224 2.07674,-2.41285 2.74082,-1.50467 1.36179,1.86235 5.72758,14.33889 7.52781,21.51151 2.46328,9.81443 3.20921,15.92565 3.23349,26.51821 0.0123,5.37957 -0.31573,10.0528 -1.11408,14.37208 1.60484,-2.75654 2.87312,-4.79895 4.1656,-7.04401 0.0278,-0.21303 0.0547,-0.42942 0.0821,-0.64581 0.49639,-3.91357 1.60774,-8.82241 2.68089,-11.84653 3.86906,-10.903 5.69391,-25.57531 4.83582,-38.87962 -0.64293,-9.96839 -2.96635,-14.78117 -8.07819,-16.7334 -1.16819,-0.44614 -1.95086,-0.67979 -2.72306,-0.72348 z m -493.5664,0.0843 c -1.5694,-0.0626 -3.0971,0.30906 -4.6138,1.08745 -5.5638,2.85535 -7.6599,10.68796 -7.1217,26.61364 0.3771,11.16035 1.6354,18.75256 4.4807,27.03309 2.1155,6.15698 2.6257,8.52989 3.8838,18.0694 0.3629,2.75182 0.9203,5.42693 1.6888,8.0671 0.3341,0.54653 0.6551,1.09853 0.8922,1.69109 0.2413,0.60319 0.3538,1.25009 0.5592,1.86642 0.4955,1.48649 1.8841,4.21987 2.6144,5.59925 0.861,1.62644 2.0297,3.10047 2.9871,4.66715 0.3341,0.54666 0.5264,1.18416 0.9321,1.68 0.1762,0.21538 0.563,0.16484 0.7479,0.37284 0.3333,0.37496 0.4674,0.88974 0.7457,1.30716 0.4156,0.62346 1.0779,1.05653 1.4936,1.67999 0.1858,0.27882 0.2004,0.64697 0.3728,0.93432 0.205,0.34167 0.5324,0.59695 0.7479,0.9321 0.3464,0.53891 0.5821,1.14559 0.9321,1.68222 0.5848,0.89672 1.3236,1.68932 1.8664,2.61209 0.6952,1.18172 1.1928,2.47296 1.8398,3.68179 1.6975,2.44364 3.2874,4.9638 4.1678,6.66451 2.4599,4.75156 3.5428,5.82086 4.4341,4.37865 0.7706,-1.24674 -3.8654,-9.50772 -9.6316,-17.16616 -8.9963,-11.94853 -12.2114,-18.66364 -14.0858,-29.41216 -1.7462,-10.01353 -0.8395,-26.80656 2.0595,-38.15391 2.3503,-9.19937 7.5036,-23.39422 8.4821,-23.3624 0.2195,0.007 1.1793,1.11604 2.1327,2.46341 l 1.7333,2.45009 -2.2659,6.79988 c -2.7363,8.21448 -3.3608,13.62982 -1.842,15.94777 2.4013,3.66491 7.2288,3.85427 13.7662,0.5415 l 3.0115,-1.52464 1.4736,3.18023 1.4737,3.18023 -3.1625,1.69553 c -8.7635,4.69705 -14.9436,17.5878 -14.2145,29.64963 0.5732,9.48258 4.1583,16.57516 10.4439,20.66152 6.1052,3.96919 6.8528,4.73006 8.2091,8.36004 2.4875,6.65756 5.0697,9.24997 9.2145,9.24997 4.5047,0 6.5497,-3.66458 5.3329,-9.56067 -0.9008,-4.36516 -2.2017,-6.95264 -5.4283,-10.80791 -3.4561,-4.12945 -4.9173,-7.14631 -5.3108,-10.95882 -0.4193,-4.06286 0.4945,-7.72168 3.5198,-14.09466 1.3116,-2.76304 2.3835,-5.85603 2.3835,-6.87312 0,-3.53948 -8.9002,-23.55347 -15.7813,-35.48856 -10.7869,-18.70971 -18.3635,-27.12584 -25.1645,-27.39705 z m 479.14772,102.95254 c -0.25485,0.32772 -0.51382,0.65739 -0.77675,0.98981 -4.64655,5.87438 -9.52165,14.81265 -8.92596,16.36499 0.72521,1.88987 1.98835,0.874 3.64628,-2.93167 0.40952,-0.94003 1.302,-2.4862 2.45231,-4.28988 0.032,-0.13149 0.0682,-0.26238 0.11097,-0.39059 0.12445,-0.37336 0.42013,-0.67797 0.52819,-1.05638 0.0725,-0.25384 -0.0725,-0.53844 0,-0.79229 0.29689,-1.03913 0.97453,-2.1291 1.32047,-3.16691 0.52955,-1.58865 1.07512,-3.16242 1.64449,-4.72708 z"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       sodipodi:nodetypes="ssssssssssssscccccscccsssccsssssssscscscssssssscssccssssccccscccccssssssssssscssscssssc" /><path
       style="display:inline;fill:#f2b492;stroke:#281a16;stroke-width:3.00430572;stroke-dasharray:none;stroke-opacity:1"
       d="m -1206.2537,536.27778 c -6.1996,-1.93754 -10.8228,-5.87623 -15.6807,-13.35899 -8.4742,-13.05321 -15.1802,-28.60099 -28.9694,-67.16581 -5.2624,-14.71728 -6.8756,-20.30334 -8.3971,-29.07567 -4.1457,-23.90143 -0.3545,-45.01316 9.7657,-54.3827 6.21,-5.74936 12.5225,-6.59499 20.6252,-2.76298 5.2291,2.47298 8.303,5.05323 9.9834,8.38011 3.9867,7.89329 21.0043,62.33382 21.0043,67.19439 0,8.34447 3.7321,39.59487 8.164,68.36016 l 2.6676,17.31399 -2.4006,2.22868 c -4.1455,3.84857 -10.7723,5.14086 -16.7624,3.26882 z m -12.0023,-33.77555 c 0.7706,-1.24674 -3.8638,-9.50788 -9.63,-17.16632 -8.9963,-11.94853 -12.2125,-18.66363 -14.0869,-29.41215 -1.7462,-10.01353 -0.8399,-26.80611 2.0591,-38.15346 2.3503,-9.19937 7.5048,-23.39453 8.4833,-23.36271 0.2195,0.007 1.1791,1.11537 2.1325,2.46274 l 1.7336,2.44978 -2.2657,6.80176 c -2.7363,8.21448 -3.3622,13.62909 -1.8434,15.94704 2.4013,3.66491 7.2301,3.85514 13.7675,0.54237 l 3.011,-1.5258 1.4734,3.18019 1.4735,3.18018 -3.1629,1.69522 c -8.7635,4.69705 -14.9435,17.58762 -14.2144,29.64945 0.5732,9.48258 4.1585,16.57567 10.4441,20.66203 6.1052,3.96919 6.8533,4.7311 8.2096,8.36108 2.4875,6.65756 5.07,9.24993 9.2148,9.24993 4.5047,0 6.5482,-3.66465 5.3314,-9.56074 -0.9008,-4.36516 -2.2005,-6.95358 -5.4271,-10.80885 -3.4561,-4.12945 -4.9182,-7.14585 -5.3117,-10.95836 -0.4193,-4.06286 0.4944,-7.72209 3.5197,-14.09507 1.3116,-2.76304 2.3848,-5.85588 2.3848,-6.87297 0,-3.53948 -8.8999,-23.5539 -15.781,-35.48899 -13.2762,-23.02734 -21.6897,-30.46052 -29.7789,-26.30914 -5.5638,2.85535 -7.6595,10.68721 -7.1213,26.61289 0.3771,11.16035 1.6357,18.7536 4.481,27.03413 2.1155,6.15698 2.6255,8.52982 3.8836,18.06933 1.4732,11.16972 6.1245,21.07165 15.2812,32.53127 2.5918,3.24373 5.8794,8.15183 7.3056,10.90689 2.4599,4.75156 3.5423,5.82049 4.4336,4.37828 z m 422.35399,33.79107 c -2.55708,-0.91258 -7.69986,-4.58133 -7.72802,-5.51302 -0.0101,-0.33413 1.08571,-7.98873 2.43514,-17.01023 3.33549,-22.29915 7.05762,-52.06282 7.93915,-63.48465 0.70286,-9.10676 0.89397,-9.97336 5.81211,-26.35559 6.22941,-20.74998 9.92034,-32.12445 13.1179,-40.42586 3.04448,-7.90398 5.50064,-10.75636 11.93639,-13.86196 3.91796,-1.89063 5.24303,-2.2275 8.85956,-2.25232 10.15696,-0.0697 17.60727,7.60167 21.35703,21.99074 1.25603,4.81982 1.60216,7.85253 1.85501,16.25311 0.47544,15.79617 -1.3721,26.75657 -7.32191,43.43687 -5.95356,16.69081 -14.05038,38.36232 -16.90963,45.25938 -7.45318,17.97855 -16.2029,32.87154 -22.1608,37.72016 -5.65923,4.60556 -13.38847,6.31451 -19.19193,4.24337 z m 27.08616,-37.03575 c 0.92993,-2.1346 4.35666,-7.39714 7.61494,-11.69454 11.22361,-14.80295 14.10894,-21.51872 16.14631,-37.58136 0.49639,-3.91357 1.60691,-8.8223 2.68006,-11.84642 3.86906,-10.903 5.69416,-25.57623 4.83607,-38.88054 -0.64293,-9.96839 -2.966,-14.78049 -8.07784,-16.73272 -2.33639,-0.89228 -3.12782,-0.93706 -5.38617,-0.30476 -3.54636,0.99292 -7.87433,4.36289 -11.75071,9.14966 -9.0302,11.151 -27.20578,46.88801 -27.18476,53.45096 0.004,1.21871 1.14055,4.5754 2.66298,7.86416 2.15305,4.65102 2.7102,6.57962 2.94136,10.18169 0.3611,5.62669 -0.75983,8.75688 -4.78174,13.35294 -4.03409,4.60998 -5.64055,8.13161 -5.92161,12.98118 -0.20917,3.60905 -0.0781,4.16201 1.40384,5.92321 1.30539,1.55137 2.09493,1.94255 3.92074,1.94255 4.27118,0 6.48436,-2.31447 9.98979,-10.44694 1.3037,-3.02454 1.93558,-3.71113 5.0146,-5.44882 6.4882,-3.66172 10.01707,-8.39673 12.02083,-16.1295 3.43943,-13.2732 -3.28675,-31.1739 -13.51337,-35.96379 l -3.0548,-1.43079 1.57737,-3.2162 1.57737,-3.21619 2.88685,1.46287 c 6.27816,3.18139 11.58585,3.14235 13.71086,-0.10083 1.48745,-2.27013 0.77316,-8.4275 -1.90991,-16.46399 l -2.27501,-6.81426 1.9973,-2.52179 c 1.78381,-2.25224 2.07678,-2.41311 2.74086,-1.50493 1.36179,1.86235 5.72807,14.33833 7.5283,21.51095 2.46328,9.81443 3.20841,15.92714 3.23269,26.5197 0.0404,17.61565 -3.58094,27.64984 -15.34746,42.5256 -4.64655,5.87438 -9.52117,14.81136 -8.92548,16.3637 0.72521,1.88987 1.98781,0.87487 3.64574,-2.9308 z"
       id="path125"
       sodipodi:nodetypes="ssssssssscsssssssscssscccssssssssssssssssssssssssssssssssssssssssssssssssssscccssscsssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /></g>

            <!-- 3. RAMBUT -->
            <g id="svg-rambut" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Rambut')" onmouseenter="hoverKepala('Rambut')" onmouseleave="unhoverKepala('Rambut')">
                <path
       style="fill:#4f3429;display:inline;stroke:none;stroke-opacity:1"
       d="m -1237.0576,222.30974 c 2.4543,-17.32809 4.0473,-23.59906 7.3512,-28.93727 3.0798,-4.97617 9.1931,-11.73512 13.0008,-14.37389 1.3268,-0.91946 2.1884,-1.93435 1.9688,-2.3191 -0.2148,-0.37628 -0.1642,-0.47886 0.1124,-0.22797 0.2766,0.2509 1.9841,-0.37972 3.7943,-1.40137 2.9293,-1.65315 3.2494,-1.72502 2.9092,-0.65314 -0.7179,2.26167 1.1706,2.4117 8.0699,0.64113 23.9022,-6.13395 44.8259,-4.60482 63.4061,4.63378 6.7379,3.35027 16.2837,8.88321 16.2837,9.43839 0,0.79131 -4.2936,1.06269 -8.0233,0.50711 -6.9664,-1.03773 -23.519,-1.37884 -30.2497,-0.62337 -15.3855,1.72689 -29.6298,5.80035 -43.3439,12.39512 -8.0339,3.86331 -17.4385,9.65579 -20.0028,12.32009 -1.2094,1.25656 -1.4421,1.30315 -2.36,0.47252 -1.4215,-1.28649 -2.3872,-0.64569 -8.2853,5.49786 l -4.9959,5.20389 z m 479.80087,-1.54315 c -1.3563,-1.57457 -3.5789,-3.63409 -4.93911,-4.57672 -2.0387,-1.41282 -2.69249,-1.59646 -3.72204,-1.04546 -1.0553,0.56478 -1.60461,0.35417 -3.54305,-1.35844 -7.28378,-6.43521 -18.93783,-14.08547 -28.41698,-18.65424 -11.62362,-5.60237 -22.05654,-8.57412 -33.21381,-9.46076 l -5.26843,-0.41867 4.35716,-5.16012 c 2.39644,-2.83807 5.04061,-5.94179 5.87593,-6.89715 2.03518,-2.32765 7.14624,-3.58103 14.55597,-3.56955 9.5792,0.0148 17.17431,2.42784 26.03499,8.27143 6.49862,4.28581 18.15741,15.82989 22.16118,21.94314 1.58653,2.42244 2.9899,4.40443 3.11858,4.40443 0.39377,0 -0.39773,-2.68579 -1.02943,-3.49317 -0.43618,-0.55748 -0.23849,-0.75939 0.74352,-0.75939 1.17025,0 1.28758,0.22811 0.93738,1.82253 -0.28772,1.31001 -0.17317,1.82514 0.40736,1.83183 0.6385,0.007 0.62889,0.12248 -0.0459,0.54966 -0.71055,0.44985 -0.63283,0.91442 0.46396,2.77333 1.13495,1.9236 4.68974,15.95911 4.17288,16.47596 -0.10131,0.10132 -1.2939,-1.10407 -2.6502,-2.67864 z m -249.17977,-22.02163 c -16.7837,-1.12635 -49.0927,-7.10276 -55.7577,-10.31387 -3.5614,-1.71582 -12.3366,-7.97933 -21.2127,-15.14105 -11.6433,-9.39442 -24.6479,-17.53193 -34.4478,-21.55551 -11.173,-4.58729 -25.9889,-7.02588 -42.6864,-7.02588 h -9.7081 l 4.5406,-2.83194 c 11.7187,-7.3089 29.7764,-14.54189 42.8136,-17.14897 17.0109,-3.40171 36.8402,-3.64462 53.7645,-0.65863 15.2035,2.68239 23.7166,6.19168 34.6718,14.29244 7.945,5.87489 22.5675,20.48592 31.2675,31.24284 11.38885,14.08161 18.02264,20.40959 26.73019,25.49798 4.83921,2.82788 5.0182,2.72848 -6.58823,3.65864 -8.52347,0.68308 -13.01548,0.68 -23.38726,-0.016 z m 245.35036,-0.55239 c -0.46122,-0.28505 -1.192,-0.38265 -1.62396,-0.21689 -1.41615,0.54343 -2.22241,-0.46381 -1.05474,-1.31763 0.91886,-0.67188 0.956,-0.93248 0.25354,-1.77889 -0.45266,-0.54543 -0.64738,-1.16733 -0.4327,-1.38201 0.21468,-0.21468 0.39033,-0.0714 0.39033,0.31844 0,0.38982 0.28951,0.70876 0.64336,0.70876 0.35385,0 0.4483,-0.31562 0.20989,-0.70138 -0.26327,-0.42598 -0.1672,-0.5368 0.24469,-0.28224 0.46606,0.28804 0.49599,0.89826 0.0957,1.95111 -0.33378,0.87788 -0.34602,1.38585 -0.0287,1.18972 0.30458,-0.18824 0.70587,0.001 0.89175,0.42091 0.2289,0.51687 0.32044,0.46908 0.28367,-0.14809 -0.13227,-2.21962 0.25648,-2.55317 0.71284,-0.61162 0.57534,2.44774 0.54366,2.54779 -0.58569,1.84981 z m -4.61879,-4.92366 c -0.22025,-0.35636 -0.27015,-0.77822 -0.11091,-0.93746 0.15925,-0.15925 0.45142,0.13232 0.64928,0.64793 0.41079,1.07049 0.0607,1.25879 -0.53837,0.28953 z m -160.4127,-13.10395 c -15.52349,-32.77709 -24.10639,-48.36794 -33.96507,-61.69761 -6.5821,-8.8995 -19.4077,-22.323628 -27.73101,-29.025134 -9.11563,-7.33944 -22.54069,-16.036229 -33.53389,-21.723257 l -9.8136,-5.076837 8.5051,0.366414 c 53.3528,2.298526 92.35392,21.413448 112.37931,55.078444 8.02588,13.49243 13.25047,30.44107 14.87786,48.26394 0.62045,6.79502 0.57291,7.76331 -0.61332,12.49298 -0.70725,2.81988 -1.47711,5.43643 -1.7108,5.81455 -0.23369,0.37812 -4.92864,1.25715 -10.43323,1.95339 -5.50458,0.69625 -10.90026,1.42554 -11.99041,1.62066 l -1.98208,0.35475 z m -197.68867,2.55287 c -15.7409,-9.2745 -26.2669,-13.05758 -40.2099,-14.45165 -10.4216,-1.04198 -23.1483,0.14521 -37.2474,3.4746 -1.5682,0.37032 -1.3874,0.12938 1.2963,-1.72689 5.1202,-3.54158 18.6732,-11.14957 29.6766,-16.65909 l 10.3176,-5.16613 9.1227,0.36256 c 23.9554,0.95203 41.7209,8.53217 66.5322,28.38773 3.8425,3.07501 8.6266,6.82448 10.6314,8.33215 l 3.6451,2.74123 -2.7338,-0.35616 c -18.0996,-2.358 -20.9619,-2.49683 -29.5917,-1.43528 -4.6077,0.56679 -9.3344,1.17826 -10.5039,1.35881 -1.8583,0.2869 -3.2365,-0.32589 -10.9352,-4.86188 z m -102.6968,3.03109 c 0.6526,-0.78623 0.6248,-0.94482 -0.1656,-0.94482 -0.5224,0 -1.1173,-0.27106 -1.3221,-0.60235 -0.4717,-0.76328 1.5672,-7.33506 2.1618,-6.96762 0.2428,0.15009 0.6037,-0.14981 0.8019,-0.66644 0.233,-0.60706 0.1149,-0.78751 -0.3339,-0.51015 -0.475,0.29353 -0.5237,0.1595 -0.1542,-0.42408 0.5721,-0.90365 0.6653,-1.22094 0.7866,-2.67578 0.042,-0.50119 0.5543,-0.91544 1.1391,-0.92056 0.9085,-0.008 0.9306,-0.0949 0.1518,-0.59821 -0.6621,-0.42792 -0.6938,-0.59144 -0.116,-0.5982 0.4633,-0.005 0.6128,-0.32627 0.3582,-0.76869 -0.2403,-0.41766 -0.2133,-0.55672 0.06,-0.30903 0.2734,0.2477 0.9323,0.1242 1.4643,-0.27445 0.8099,-0.60696 0.8436,-0.58635 0.2077,0.12677 -1.1219,1.25812 -0.9223,2.10453 0.2685,1.1386 0.6985,-0.56653 0.8817,-0.59037 0.5717,-0.0744 -0.2609,0.43417 -0.1529,0.75938 0.2521,0.75938 0.3896,0 0.5578,0.39241 0.3738,0.87202 -0.1841,0.4796 -0.01,1.02939 0.3906,1.22175 0.3989,0.19236 0.1098,0.23551 -0.6425,0.0959 -1.4417,-0.26755 -1.3647,0.23078 0.3427,2.21849 0.504,0.58678 0.7358,1.24745 0.5151,1.46815 -0.2207,0.2207 -0.4013,0.12803 -0.4013,-0.20595 0,-0.877 -2.3159,-0.57635 -3.1989,0.41529 -0.6349,0.71299 -0.5869,0.71876 0.3132,0.0376 0.9357,-0.70804 1.0632,-0.64099 1.0632,0.55932 0,1.13855 0.1493,1.23987 0.904,0.61347 1.4094,-1.16964 1.9885,1.02443 0.6122,2.3193 -0.6682,0.62872 -0.8957,0.69077 -0.5967,0.16278 0.3259,-0.57551 0.2517,-0.71016 -0.2281,-0.41365 -0.3912,0.24178 -0.5731,0.66311 -0.4043,0.93629 0.1689,0.27318 -0.076,0.81433 -0.5435,1.20254 -0.6175,0.51249 -0.9645,0.52139 -1.2666,0.0325 -0.2773,-0.44862 -0.6836,-0.30768 -1.2174,0.42228 -0.4708,0.64396 -0.5649,1.24164 -0.2282,1.44976 0.3152,0.19476 -0.1642,0.69001 -1.0652,1.10055 -1.4589,0.66468 -1.5524,0.64295 -0.8542,-0.19839 z m 3.4342,-10.41089 c -0.2028,-0.52852 -0.3688,-1.07528 -0.3688,-1.21502 0,-0.13973 -0.2477,-0.25406 -0.5506,-0.25406 -0.3028,0 -0.4077,0.54675 -0.2329,1.21501 0.1748,0.66826 0.5885,1.21502 0.9194,1.21502 0.3309,0 0.4357,-0.43243 0.2329,-0.96095 z m 356.43133,8.70668 c 0.19334,-1.08592 0.76783,-3.88805 1.27664,-6.22696 0.50881,-2.33891 1.10173,-7.66979 1.3176,-11.84641 1.59712,-30.90084 -11.30495,-65.06514 -33.09444,-87.633111 -5.4868,-5.682828 -7.60133,-6.971325 -8.32892,-5.075254 -0.17897,0.466375 0.53268,2.547799 1.58145,4.625387 9.55185,18.922121 14.35643,44.954978 12.77446,69.216448 -0.36154,5.54468 -0.87817,10.89606 -1.14805,11.89197 -0.43384,1.6009 -0.5423,1.36092 -0.93594,-2.07095 -1.59493,-13.90469 -8.7833,-32.83171 -17.33011,-45.63026 -2.59081,-3.87966 -3.79523,-6.44368 -4.84313,-10.31032 -4.57508,-16.881469 -13.87069,-33.653173 -24.73067,-44.620542 -4.63941,-4.685296 -13.698,-12.378511 -16.58,-14.080947 -1.18447,-0.699684 -1.88525,-1.602152 -1.88525,-2.427844 0,-1.390835 -4.02472,-5.436936 -13.53962,-13.611545 -6.26825,-5.38529 -6.25261,-5.397902 4.91906,-3.966 12.92637,1.656808 30.32073,5.845928 42.33729,10.196181 24.17557,8.752073 41.74378,19.546532 58.4983,35.943198 7.2548,7.099844 8.19508,7.827676 9.25634,7.164914 1.37145,-0.85649 1.64876,-0.330621 5.21714,9.893639 10.05643,28.814036 10.22772,52.365936 0.54565,75.027456 -2.46148,5.76127 -6.27886,12.97019 -8.9011,16.80927 -1.21141,1.77357 -1.50375,2.62421 -0.97521,2.8377 0.48762,0.19697 0.41493,0.32186 -0.20537,0.35285 -0.52808,0.0264 -1.84362,1.27817 -2.92341,2.78175 -1.07979,1.50358 -2.11873,2.73379 -2.30875,2.73379 -0.19002,0 -0.18731,-0.88848 0.006,-1.97441 z m 8.4135,-7.06298 c -0.66686,-0.42272 -0.65789,-0.57216 0.0506,-0.84404 0.49112,-0.18846 0.86095,0.0362 0.86095,0.52297 0,0.46933 -0.0228,0.84915 -0.0506,0.84404 -0.0279,-0.005 -0.41527,-0.24046 -0.86095,-0.52297 z m -30.47637,-10.03413 c 0,-0.13132 0.42427,-0.40157 0.94282,-0.60055 0.54063,-0.20747 0.78449,-0.10562 0.57165,0.23875 -0.35676,0.57726 -1.51447,0.85382 -1.51447,0.3618 z m -316.67396,-24.13668 c 0.4121,-0.41519 0.9023,-0.60184 1.0893,-0.4148 0.1871,0.18704 -0.1501,0.52674 -0.7492,0.75488 -0.8658,0.32968 -0.9356,0.2599 -0.3401,-0.34008 z m -1.2855,-1.41012 c 0.1913,-0.49837 0.6442,-0.84641 1.0065,-0.77345 0.3624,0.073 0.6634,-0.55078 0.669,-1.3861 0.01,-0.83532 0.5214,-1.97648 1.146,-2.5359 0.6247,-0.55942 1.0951,-1.19731 1.0453,-1.41752 -0.05,-0.22022 0.048,-0.53935 0.2183,-0.70919 0.1698,-0.16983 0.2461,0.11841 0.1694,0.64055 -0.077,0.52214 -0.3295,1.13951 -0.5619,1.37194 -0.2324,0.23242 -0.4226,0.82057 -0.4226,1.30699 0,0.7549 0.1557,0.76231 1.0632,0.0506 0.9553,-0.74926 0.9816,-0.72967 0.2593,0.19326 -0.4421,0.56487 -1.1939,0.87734 -1.6707,0.69439 -1.2346,-0.4738 -1.076,0.82356 0.1963,1.60482 0.7745,0.47553 0.8157,0.61409 0.1519,0.51023 -0.5012,-0.0784 -1.5202,0.19448 -2.2645,0.60644 -1.1445,0.6335 -1.2996,0.60927 -1.0055,-0.15708 z m 5.0925,-2.38892 c 0,-0.12615 0.4785,-0.60456 1.0632,-1.06314 0.9635,-0.75566 0.985,-0.73417 0.2294,0.22937 -0.7937,1.01196 -1.2926,1.33377 -1.2926,0.83377 z m 0.07,-3.5317 c -0.039,-0.89914 0.2029,-1.80376 0.5371,-2.01026 0.3341,-0.2065 0.6075,-0.0541 0.6075,0.33875 0,0.41529 0.5089,0.58114 1.2158,0.39627 0.6687,-0.17488 1.0627,-0.0701 0.8754,0.2329 -0.1872,0.30297 -0.851,0.55085 -1.475,0.55085 -0.6241,0 -1.2597,0.47841 -1.4125,1.06314 -0.1748,0.66889 -0.3039,0.45689 -0.3483,-0.57165 z m 5.0934,-0.49149 c 0.2065,-0.33413 0.496,-0.60751 0.6433,-0.60751 0.1474,0 0.2679,0.27338 0.2679,0.60751 0,0.33413 -0.2895,0.60751 -0.6433,0.60751 -0.3539,0 -0.4744,-0.27338 -0.2679,-0.60751 z m 376.95904,-8.54097 c 0,-0.35385 0.27338,-0.47441 0.60751,-0.2679 0.33413,0.2065 0.6075,0.49601 0.6075,0.64336 0,0.14734 -0.27337,0.2679 -0.6075,0.2679 -0.33413,0 -0.60751,-0.28951 -0.60751,-0.64336 z m 0.91126,-1.78667 c -0.79106,-1.52974 -0.80464,-1.82253 -0.0846,-1.82253 0.48879,0 0.973,0.78416 1.1254,1.82253 0.14712,1.00238 0.18517,1.82252 0.0846,1.82252 -0.10061,0 -0.60704,-0.82014 -1.1254,-1.82252 z m -3.03754,0.6075 c -0.20651,-0.33413 -0.086,-0.6075 0.2679,-0.6075 0.35385,0 0.64336,0.27337 0.64336,0.6075 0,0.33413 -0.12055,0.60751 -0.2679,0.60751 -0.14735,0 -0.43686,-0.27338 -0.64336,-0.60751 z m -145.24497,-5.28736 c -20.69802,-16.07641 -43.03259,-27.087053 -64.99139,-32.039856 -10.4871,-2.365377 -19.9873,-3.375853 -31.7388,-3.375853 -22.6286,0 -43.6609,4.049649 -65.885,12.685746 -8.1624,3.171823 -10.087,3.683813 -16.2457,4.321723 -8.087,0.83765 -16.2647,2.41068 -23.9258,4.60229 -2.9683,0.84913 -7.479,1.658 -10.0239,1.7975 -2.5449,0.1395 -7.8281,1.03791 -11.7406,1.99648 l -7.1135,1.74285 1.9135,-2.48626 c 3.9594,-5.1447 21.0634,-21.560501 27.3073,-26.208751 23.9689,-17.843261 49.6498,-29.673419 73.095,-33.671804 4.3437,-0.740782 8.7177,-1.73302 9.7201,-2.204974 1.6836,-0.792659 2.726,-0.629248 13.669,2.14277 10.5298,2.667355 30.1638,8.581623 31.7562,9.565795 0.34,0.210112 0.1711,0.608154 -0.3915,0.923041 -0.5441,0.304495 -0.9893,1.064512 -0.9893,1.688927 0,0.862979 0.9836,1.459813 4.1007,2.488194 9.4574,3.120204 23.7451,10.706934 36.2986,19.274514 9.51068,6.490896 16.6442,12.397521 24.11657,19.968768 8.81549,8.93213 18.19959,20.36194 17.38573,21.17579 -0.16089,0.1609 -3.00364,-1.8132 -6.31721,-4.38689 z m 145.15489,3.61059 c 0.22077,-0.35722 0.0604,-0.76315 -0.35634,-0.90207 -0.55341,-0.18447 -0.48297,-0.52737 0.26123,-1.27156 0.62096,-0.62096 1.16677,-0.77986 1.39732,-0.40682 0.20809,0.3367 0.0596,0.61217 -0.33001,0.61217 -0.3896,0 -0.55436,0.40132 -0.36614,0.89181 0.18822,0.49049 0.0385,1.07949 -0.33263,1.30888 -0.3894,0.24067 -0.50505,0.14236 -0.27343,-0.23241 z"
       id="path74"
       sodipodi:nodetypes="sssssssssssssssscssssssscssssssssscsssssssssscssssssssssssssssssssssssssssssssscssssssscsssssscssscsssssssssssssscsssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscssccsssssssssssssssssssssssssssssssssssssssssssssssssscscsssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       id="path75"
       style="fill:#281a16;display:inline;stroke:none;stroke-opacity:1"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       d="m -985.98054,17.482406 c -1.40713,0.871357 -0.15592,2.628047 3.85933,5.41949 2.40309,1.670648 6.29349,4.66131 8.64633,6.642314 2.35284,1.981005 4.39256,3.687669 4.53178,3.794975 0.13919,0.107306 0.13165,0.321237 -0.02,0.472707 -0.15147,0.151468 -2.18071,-0.428552 -4.50736,-1.287184 -18.36267,-6.77657 -38.04636,-10.021257 -60.72846,-10.008967 -26.3378,0.01427 -48.9575,4.297004 -74.2838,14.063597 -9.5578,3.685752 -11.8533,4.963957 -10.7414,5.985407 0.3198,0.293792 5.0928,1.006981 10.606,1.586787 5.5131,0.579806 10.2447,1.26262 10.5149,1.513551 0.2701,0.250931 -1.2344,0.793599 -3.3422,1.20729 -2.1079,0.413692 -6.9743,1.699081 -10.8168,2.856217 -23.1243,6.963704 -46.074,19.520456 -65.6131,35.903563 -11.6873,9.799498 -27.9711,27.997347 -27.0952,30.279897 0.4766,1.24191 1.5436,1.06951 11.1275,-1.79318 4.0815,-1.21913 7.5891,-2.21706 7.7963,-2.21706 0.2073,0 -3.1566,3.40796 -7.479,7.57219 -4.3224,4.16419 -9.6063,9.79172 -11.7422,12.50344 -15.9437,20.24157 -26.5949,44.28754 -32.0931,72.46626 -4.9425,25.33109 -4.8073,31.87342 0.5171,25.27097 1.1925,-1.47865 3.4924,-4.05472 5.111,-5.72575 2.4694,-2.54942 2.8818,-2.79463 2.5744,-1.52021 -6.0707,25.16987 -7.2953,54.53331 -3.6529,87.48192 1.0315,9.33173 4.153,28.96958 7.2615,45.67951 0.9895,5.31892 1.8245,10.03396 2.0506,11.54249 1.7356,1.26007 2.9894,2.93802 4.1057,4.84026 1.0467,1.8903 1.3421,3.98615 1.4203,6.10525 0.012,0.32695 0.016,0.64672 0.013,0.96095 2.7357,6.60295 8.972,25.19833 14.8936,44.56764 l 3.2424,10.61261 c 0.6311,0.55539 1.2356,1.14191 1.8087,1.75767 0.3532,0.37946 0.6813,0.78452 1.0209,1.17622 1.1971,1.37407 2.0139,2.99592 2.8784,4.58282 -0.348,-15.28119 0.8598,-74.49097 1.7088,-82.61725 1.3376,-12.80434 7.5499,-30.99978 16.0743,-47.08209 l 3.2202,-6.07418 -0.062,-17.61667 c -0.047,-13.70987 0.1727,-19.23619 0.9876,-24.90923 3.8155,-26.56384 11.2662,-43.30077 24.9581,-56.06131 8.6117,-8.02584 17.6641,-12.56156 31.2497,-15.65483 18.5352,-4.22022 30.3061,-3.42095 72.4241,4.91793 21.2197,4.20127 28.9827,5.18818 43.74429,5.56375 18.8035,0.47839 27.75967,-0.54412 59.52339,-6.80211 33.102,-6.52166 44.67587,-7.52476 58.94638,-5.11101 22.04555,3.72884 36.73624,12.63124 47.83887,28.9905 6.6421,9.78686 10.87342,21.55867 14.1679,39.41669 1.16045,6.29037 1.34346,9.64164 1.47583,27.33935 l 0.14869,20.17106 3.64628,6.86424 c 6.91453,13.01736 13.14167,30.71168 14.94021,42.45489 1.10373,7.20659 2.06814,38.09517 2.26589,72.54615 0.0633,11.03467 0.0469,17.01401 -0.20417,22.00419 1.17298,-1.24326 2.04464,-1.51719 3.35999,-0.76343 0.0528,-0.65905 0.0963,-1.26243 0.13094,-1.80206 0.33914,-5.28177 1.12871,-8.53351 6.04755,-24.90702 6.0378,-20.09801 13.00421,-41.03865 14.87363,-44.70302 0.61002,-1.19572 1.55676,-2.41129 2.73416,-3.5797 0.0241,-0.14751 0.0523,-0.3069 0.0821,-0.4949 0.27891,-1.59578 0.86598,-3.10561 1.45807,-4.60501 0.17835,-0.47337 0.37167,-0.9386 0.57258,-1.40259 -6.7e-4,-0.004 -0.002,-0.0116 -0.002,-0.0155 0.004,-0.26468 0.82766,-4.58202 1.83091,-9.59396 2.71183,-13.54765 6.49506,-36.84897 7.94059,-48.90412 1.8458,-15.39315 2.28685,-44.58823 0.88106,-58.32276 -0.9654,-9.43184 -3.23996,-23.39104 -4.52956,-27.7943 -0.31799,-1.08593 -0.35782,-1.97295 -0.0888,-1.97295 0.26873,0 2.60439,2.47513 5.1909,5.49939 5.24251,6.12978 6.82153,6.77911 6.49806,2.67867 -0.50538,-6.40633 -8.45907,-41.74523 -11.41155,-50.70396 -2.09945,-6.37044 -8.53099,-19.28783 -12.9473,-26.00112 -8.59772,-13.06952 -20.70802,-22.79038 -34.93152,-28.04064 l -4.27655,-1.57791 -0.72127,-4.30763 c -3.6947,-22.066672 -17.53103,-43.805642 -39.40559,-61.909124 -2.67303,-2.212219 -6.8679,-5.345027 -9.32321,-6.96411 -6.2825,-4.142806 -7.69808,-3.304737 -4.38087,2.598781 1.92891,3.4328 5.13723,11.164916 5.85669,14.11464 0.40746,1.67055 0.0701,1.470609 -4.05463,-2.432334 -24.73551,-23.405848 -57.01719,-38.287184 -96.08386,-44.290234 -11.00337,-1.690797 -23.39464,-2.937851 -24.2146,-2.436773 z m 10.67697,4.001368 c 1.30867,-0.07646 3.92876,0.25754 8.11814,0.794503 12.92637,1.656808 30.32292,5.847353 42.33948,10.197606 24.17557,8.752073 41.74357,19.544625 58.49809,35.941291 7.2548,7.099844 8.19315,7.828827 9.25441,7.166065 1.05689,-0.660041 1.28239,-0.498192 2.13939,1.540183 1.9918,4.737465 5.26311,14.672473 6.95079,21.11204 6.01197,22.939368 4.94455,42.909228 -3.3267,62.268648 -2.46148,5.76127 -6.27931,12.96977 -8.90155,16.80885 -1.21141,1.77357 -1.5028,2.62497 -0.97426,2.83846 0.48762,0.19697 0.4139,0.32187 -0.2064,0.35287 -0.52808,0.0264 -1.843,1.27718 -2.92279,2.78076 -1.07979,1.50358 -2.11804,2.73416 -2.30806,2.73416 -0.38473,0 -0.0861,-1.90809 1.28275,-8.20025 0.50882,-2.33892 1.10016,-7.67214 1.31603,-11.84876 1.59712,-30.90084 -11.30446,-65.06486 -33.09395,-87.632831 -5.4868,-5.682828 -7.59916,-6.969352 -8.32675,-5.073281 -0.17897,0.466375 0.52914,2.547398 1.57791,4.624986 9.55185,18.922121 14.35839,44.955756 12.77642,69.217226 -0.36153,5.54468 -0.87749,10.89501 -1.14737,11.89092 -0.43384,1.6009 -0.5429,1.36127 -0.93654,-2.0706 -1.59493,-13.90469 -8.78357,-32.83213 -17.33038,-45.63068 -2.59081,-3.87966 -3.79458,-6.44415 -4.84248,-10.31079 -4.57508,-16.881457 -13.87171,-33.651315 -24.73169,-44.618684 -4.63941,-4.685296 -13.69826,-12.381134 -16.58026,-14.08357 -1.18447,-0.699684 -1.88417,-1.602204 -1.88417,-2.427896 0,-1.390835 -4.02495,-5.436255 -13.53985,-13.610864 -3.91766,-3.365806 -5.38133,-4.632936 -3.20021,-4.760362 z M -1084.732,46.7259 c 1.5897,-0.02319 4.4342,0.650852 11.9575,2.556615 10.5298,2.667355 30.1633,8.580938 31.7557,9.56511 0.34,0.210112 0.1698,0.608335 -0.3928,0.923222 -0.5441,0.304495 -0.9876,1.066678 -0.9876,1.691093 0,0.862979 0.982,1.459436 4.0991,2.487817 13.0386,4.301691 33.7058,16.348916 48.44913,28.244816 8.90057,7.181557 22.34775,21.353067 27.9896,29.494277 0.91014,1.31334 1.52354,2.51778 1.36264,2.67867 l -0.002,0.002 -0.002,0.002 -0.002,0.002 c -0.24013,0.0933 -3.04748,-1.86058 -6.30942,-4.39418 -20.69802,-16.07641 -43.03509,-27.08477 -64.99389,-32.037573 -30.1489,-6.800109 -64.6261,-3.514234 -97.6219,9.307673 -8.1624,3.17182 -10.0886,3.68525 -16.2473,4.32316 -8.087,0.83765 -16.2628,2.40897 -23.9239,4.60058 -2.9683,0.84913 -7.4796,1.66034 -10.0245,1.79984 -2.5449,0.1395 -7.8275,1.03656 -11.74,1.99513 l -7.1128,1.74214 1.9108,-2.4856 c 3.9594,-5.14471 21.0644,-21.561482 27.3083,-26.209732 23.9689,-17.843261 49.6491,-29.670359 73.0943,-33.668744 4.3437,-0.740782 8.718,-1.734014 9.7204,-2.205968 0.5261,-0.247706 0.9907,-0.404464 1.7133,-0.415006 z m 53.5713,15.916699 8.5043,0.366182 c 41.83283,1.802215 75.45029,14.121415 96.92718,35.521846 12.22865,12.185123 19.1411,23.601433 25.13338,41.511693 2.54022,7.59243 4.3021,16.52696 5.19534,26.3096 0.62045,6.79502 0.57371,7.76267 -0.61252,12.49234 -0.70725,2.81988 -1.47738,5.43641 -1.71107,5.81453 -0.23369,0.37812 -4.92604,1.25673 -10.43063,1.95297 -5.50458,0.69625 -10.90063,1.42495 -11.99078,1.62007 l -1.98182,0.35731 -3.99028,-8.4244 c -15.52349,-32.77709 -24.10744,-48.36862 -33.96612,-61.69829 -6.5821,-8.8995 -19.40664,-22.322282 -27.72995,-29.023788 -9.11563,-7.33944 -22.54013,-16.037534 -33.53333,-21.724562 z m -64.8186,59.359171 c 9.1992,-0.11269 18.3868,0.57315 26.8489,2.06615 15.2035,2.68238 23.7166,6.19364 34.6718,14.2944 7.945,5.87489 22.5675,20.48393 31.2675,31.24085 11.38876,14.08161 18.02374,20.41117 26.73129,25.49956 4.83921,2.82788 5.01516,2.72722 -6.59127,3.65738 -17.21192,1.37939 -33.99542,-0.15426 -60.56422,-5.53489 -10.6718,-2.16124 -15.9305,-3.5172 -18.5799,-4.79365 -3.5614,-1.71582 -12.3358,-7.98045 -21.2119,-15.14217 -11.6433,-9.39442 -24.6478,-17.5301 -34.4477,-21.55368 -11.173,-4.58729 -25.9882,-7.02625 -42.6857,-7.02625 h -9.7093 l 4.5406,-2.83181 c 11.7187,-7.3089 29.7772,-14.54354 42.8144,-17.15062 8.5055,-1.70086 17.7163,-2.61258 26.9155,-2.72527 z m -104.7102,11.37604 c 0,-2e-5 0.01,-9e-5 0.011,0 h 0.01 c 0.1893,0.004 0.3196,0.16048 0.3196,0.43054 0,0.41527 0.5093,0.58212 1.2162,0.39725 0.6687,-0.17488 1.0617,-0.0699 0.8744,0.23303 -0.1872,0.30297 -0.8496,0.55038 -1.4736,0.55038 -0.6241,0 -1.2587,0.47831 -1.4115,1.06304 -0.06,0.22993 -0.1165,0.35512 -0.1642,0.37949 v 0.002 0.002 c 0,7e-5 -0.011,1e-4 -0.011,0 0,6e-5 0,1.5e-4 -0.01,0 v -0.002 -0.002 c -0,-6.8e-4 -0.01,-0.004 -0.01,-0.004 -0.07,-0.0589 -0.1244,-0.37716 -0.1487,-0.94542 -0.039,-0.89914 0.2028,-1.80639 0.537,-2.01289 0.091,-0.0564 0.1796,-0.0858 0.2575,-0.091 z m 4.9024,1.00312 c 0,-8e-5 0.011,-1e-5 0.013,0 0.1474,0 0.2685,0.27395 0.2685,0.60808 0,0.33413 -0.2898,0.60586 -0.6436,0.60586 -0.3539,0 -0.475,-0.27173 -0.2685,-0.60586 0.2,-0.32369 0.4792,-0.59177 0.6303,-0.60808 z m -6.7089,0.14869 c 0.1126,-0.0157 0.1532,0.2578 0.091,0.6902 -0.077,0.52214 -0.3313,1.13686 -0.5637,1.36929 -0.2324,0.23242 -0.4217,0.82296 -0.4217,1.30938 0,0.75488 0.1555,0.76257 1.063,0.051 0.4403,-0.34536 0.6847,-0.52713 0.7479,-0.53262 0,1e-5 0.011,-1.1e-4 0.011,0 v 0.002 0.002 0.002 0.002 c 0,0.0547 -0.1707,0.2892 -0.5037,0.71461 -0.4421,0.56487 -1.1944,0.87981 -1.6712,0.69686 -1.2346,-0.4738 -1.077,0.82328 0.1953,1.60454 0.4045,0.24833 0.6085,0.408 0.617,0.48602 0,0.001 10e-5,0.003 0,0.004 -10e-5,5e-4 -10e-5,0.006 0,0.007 v 0.002 0.002 0.002 0.002 0.002 c -0.035,0.0442 -0.1898,0.0444 -0.4594,0.002 -0.5012,-0.0784 -1.5194,0.19391 -2.2637,0.60587 -1.1445,0.6335 -1.2994,0.60878 -1.0053,-0.15757 0.1913,-0.49837 0.643,-0.84531 1.0053,-0.77231 0.3624,0.073 0.6603,-0.55173 0.6703,-1.38705 0.01,-0.83532 0.5205,-1.975 1.1451,-2.53442 0.6247,-0.55942 1.0975,-1.19795 1.0475,-1.41813 -0.05,-0.22022 0.045,-0.54033 0.2153,-0.71017 0.029,-0.0292 0.057,-0.0456 0.08,-0.0488 z m 2.7386,2.88507 v 0.002 0.002 0.002 0.002 c 0,8.6e-4 10e-5,0.006 0,0.007 -0.011,0.0647 -0.1896,0.31035 -0.5327,0.7479 -0.7937,1.01196 -1.2938,1.33445 -1.2938,0.83445 0,-0.12615 0.4783,-0.60446 1.063,-1.06304 0.4366,-0.3424 0.6806,-0.52468 0.7457,-0.53262 z m -4.7759,4.90683 h 0 c 0.013,-3.1e-4 0.026,-3.4e-4 0.038,0 0.077,0.003 0.1406,0.0296 0.1865,0.0755 0.1871,0.18704 -0.1511,0.52641 -0.7502,0.75455 -0.4193,0.15969 -0.6515,0.22459 -0.7123,0.18198 v -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 c -0.016,-0.0663 0.1163,-0.23191 0.3861,-0.50378 0.2884,-0.29057 0.6137,-0.47117 0.8478,-0.48824 z m 44.5587,5.86779 9.1235,0.36174 c 23.9554,0.95203 41.7228,8.53351 66.5341,28.38907 3.8425,3.07501 8.6256,6.82352 10.6304,8.33119 l 3.6441,2.74081 -2.732,-0.35508 c -18.0996,-2.358 -20.9621,-2.49743 -29.5919,-1.43588 -4.6077,0.56679 -9.3344,1.17765 -10.5039,1.3582 -1.8583,0.2869 -3.2379,-0.32646 -10.9366,-4.86245 -15.7409,-9.2745 -26.266,-13.0579 -40.209,-14.45197 -10.4216,-1.04198 -23.1471,0.14601 -37.2462,3.4754 -1.5682,0.37032 -1.3899,0.12967 1.2938,-1.7266 5.1202,-3.54158 18.6751,-11.14842 29.6785,-16.65794 z m -61.0569,20.8657 v 0.002 0.002 0.002 0.002 0.002 c -0.01,0.0486 -0.1606,0.23282 -0.4438,0.55038 -1.1219,1.25812 -0.9223,2.10443 0.2685,1.1385 0.3858,-0.31301 0.6196,-0.46162 0.6946,-0.44386 v 0.002 0.002 0.002 0.002 0.002 0.002 0.002 0.002 0.002 c 0.017,0.0459 -0.03,0.16522 -0.142,0.35065 -0.2609,0.43417 -0.152,0.759 0.253,0.759 0.3898,0 0.5568,0.39034 0.3728,0.86995 -0.1841,0.4796 -0.01,1.03047 0.3906,1.22283 0.1117,0.0539 0.171,0.099 0.1798,0.12872 v 0.002 0.002 0.002 0.002 0.002 0.0111 0.007 0.002 0.002 0.002 c -0.057,0.0463 -0.3477,0.0333 -0.8145,-0.0533 -1.4417,-0.26755 -1.3634,0.23158 0.344,2.21929 0.5041,0.58678 0.7334,1.24624 0.5127,1.46694 -0.2207,0.2207 -0.3995,0.12759 -0.3995,-0.20639 0,-0.877 -2.3172,-0.57664 -3.2002,0.41501 -0.2678,0.30078 -0.414,0.47539 -0.4261,0.52597 -10e-5,8.5e-4 0,0.006 0,0.007 v 0.002 0.002 0.002 0.002 0.002 c 0.055,-0.005 0.2941,-0.17608 0.7301,-0.506 0.9357,-0.70804 1.0631,-0.64106 1.0631,0.55926 0,1.13855 0.1507,1.23893 0.9054,0.61253 1.4094,-1.16964 1.9866,1.02649 0.6103,2.32137 -0.3866,0.36348 -0.6262,0.53692 -0.7013,0.51709 -9e-4,-3.4e-4 -0.01,-0.002 -0.01,-0.002 v -0.002 -0.002 -0.002 -0.002 -0.002 c -0.021,-0.0408 0.017,-0.15615 0.122,-0.34177 0.3259,-0.57551 0.2512,-0.71151 -0.2286,-0.415 -0.3913,0.24178 -0.5727,0.66557 -0.4039,0.93875 0.1689,0.27318 -0.076,0.81243 -0.5437,1.20064 -0.6175,0.51251 -0.9651,0.52223 -1.2672,0.0333 -0.2773,-0.44862 -0.6824,-0.3083 -1.2162,0.42166 -0.4708,0.64396 -0.5653,1.24107 -0.2286,1.44919 0.3152,0.19476 -0.1642,0.69023 -1.0652,1.10077 -0.7979,0.3635 -1.1896,0.5196 -1.265,0.45051 v -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 c -0.027,-0.0752 0.1253,-0.28321 0.4172,-0.63471 0.6526,-0.78623 0.624,-0.94542 -0.1664,-0.94542 -0.5224,0 -1.1157,-0.27013 -1.3205,-0.60142 -0.4717,-0.76328 1.5648,-7.33599 2.1594,-6.96855 0.2428,0.15009 0.6051,-0.14916 0.8033,-0.66579 0.233,-0.60706 0.1137,-0.7878 -0.3351,-0.51043 -0.475,0.29353 -0.5226,0.1597 -0.1531,-0.42388 0.5721,-0.90365 0.6665,-1.22162 0.7878,-2.67646 0.042,-0.50119 0.5537,-0.916 1.1385,-0.921 0.9085,-0.008 0.9298,-0.0937 0.151,-0.59699 -0.6621,-0.42792 -0.6933,-0.59222 -0.1155,-0.59921 0.4633,-0.005 0.612,-0.32545 0.3574,-0.76787 -0.1353,-0.23493 -0.1856,-0.38229 -0.1554,-0.42166 v -0.002 -0.004 -0.002 c 0,5e-5 0.011,0 0.011,0 v -0.002 -0.002 -0.002 -0.002 c 0,-1.7e-4 -0,0 0.01,0 10e-4,-1.9e-4 3e-4,1e-4 0.011,0 0.036,-3.9e-4 0.1038,0.0368 0.1953,0.11985 0.2734,0.2477 0.9327,0.12346 1.4647,-0.27519 0.3797,-0.28452 0.5874,-0.43073 0.6369,-0.43277 z m 409.45998,0.57035 c 9.5792,0.0148 17.17374,2.42768 26.03442,8.27127 6.49862,4.28581 18.16021,15.83102 22.16398,21.94427 1.58653,2.42244 2.98719,4.40306 3.11587,4.40306 0.39377,0 -0.39805,-2.68355 -1.02975,-3.49093 -0.43618,-0.55748 -0.23633,-0.76122 0.74568,-0.76122 1.17025,0 1.28674,0.22761 0.93654,1.82203 -0.28772,1.31001 -0.17218,1.82613 0.40835,1.83313 0.63846,0.007 0.6283,0.12099 -0.0466,0.54817 -0.71055,0.44985 -0.63296,0.91519 0.46383,2.7741 0.72461,1.22813 2.00036,5.39491 2.83625,9.26107 0.83589,3.86617 1.43731,7.11358 1.336,7.21489 l -0.002,0.002 h -0.002 l -0.002,0.002 c -0.14839,0.0396 -1.31866,-1.14545 -2.64317,-2.68312 -1.3563,-1.57457 -3.57991,-3.63353 -4.94012,-4.57616 -2.0387,-1.41282 -2.68997,-1.59628 -3.71952,-1.04528 -1.0553,0.56478 -1.60576,0.35219 -3.5442,-1.36042 -7.28378,-6.43521 -18.93877,-14.08432 -28.41792,-18.65308 -11.62362,-5.60238 -22.0543,-8.57416 -33.21157,-9.4608 l -5.2708,-0.41945 4.35867,-5.15983 c 2.39644,-2.83807 5.04135,-5.93995 5.87667,-6.89531 2.03518,-2.32765 7.14432,-3.58233 14.55405,-3.57083 z m -362.61308,1.7488 c 13.5986,-0.23757 26.1285,2.52378 37.7411,8.2979 6.7379,3.35027 16.2829,8.88343 16.2829,9.43861 0,0.79131 -4.2952,1.06157 -8.0249,0.50599 -6.9664,-1.03773 -23.5182,-1.37686 -30.2489,-0.62139 -15.3855,1.72689 -29.6307,5.79992 -43.3448,12.39469 -8.0339,3.86331 -17.4381,9.65494 -20.0024,12.31924 -1.2094,1.25656 -1.4412,1.30334 -2.3591,0.47271 -0.7465,-0.67563 -1.3201,-0.76072 -2.1527,-0.31514 -0.6245,0.33425 -3.3863,2.95015 -6.1341,5.8123 l -4.9934,5.20422 0.364,-2.57437 c 2.4543,-17.32809 4.0463,-23.5968 7.3502,-28.93501 3.0798,-4.97617 9.1929,-11.73775 13.0006,-14.37652 1.3268,-0.91946 2.1881,-1.93218 1.9685,-2.31693 -0.1066,-0.18688 -0.1419,-0.31274 -0.122,-0.35508 v -0.002 -0.002 -0.002 c 0,-3.3e-4 0,5e-4 0.01,0 0,-3.4e-4 0.01,-0.002 0.01,-0.002 0.038,-0.004 0.1134,0.0389 0.2197,0.13538 0.2766,0.2509 1.9848,-0.37872 3.795,-1.40037 2.9292,-1.65315 3.2497,-1.72657 2.9095,-0.65469 -0.7179,2.26167 1.17,2.41189 8.0693,0.64137 8.9634,-2.30024 17.5069,-3.52148 25.666,-3.66403 z m -49.803,2.49447 c -0.3029,0 -0.41,0.54791 -0.2352,1.21617 0.1748,0.66826 0.5901,1.21395 0.921,1.21395 0.3309,0 0.4358,-0.43243 0.233,-0.96095 -0.2028,-0.52852 -0.3684,-1.07421 -0.3684,-1.21395 0,-0.13973 -0.2475,-0.25522 -0.5504,-0.25522 z m 366.15513,2.20153 h 0.002 c 0.31121,0.006 0.51931,0.22525 0.51931,0.59033 0,0.42533 -0.0202,0.77818 -0.0444,0.83667 l -0.002,0.002 h -0.002 v 0.002 0.002 h -0.002 c -0.0279,-0.005 -0.41541,-0.23902 -0.86109,-0.52153 -0.66688,-0.42272 -0.65982,-0.57367 0.0488,-0.84555 0.12279,-0.0471 0.23804,-0.0688 0.34177,-0.0666 z m 92.10469,16.2163 c 0.005,-4.5e-4 0.009,-5e-5 0.0133,0 0.1634,0.001 0.38741,0.27349 0.54817,0.69242 0.41079,1.07049 0.0619,1.25998 -0.53707,0.29072 -0.22024,-0.35636 -0.27242,-0.77729 -0.11318,-0.93653 0.0262,-0.0262 0.0566,-0.0435 0.0888,-0.0466 z m 1.9685,1.10964 c 0.12165,-10e-4 0.20639,0.15145 0.20639,0.41945 0,0.38982 0.28975,0.70795 0.6436,0.70795 0.35385,0 0.44702,-0.31553 0.20861,-0.70129 -0.26327,-0.42598 -0.16777,-0.53641 0.24412,-0.28185 0.46606,0.28804 0.49576,0.90012 0.0954,1.95297 -0.3338,0.87788 -0.34429,1.38566 -0.0266,1.18953 0.30458,-0.18824 0.70405,-2.9e-4 0.88993,0.41945 0.1037,0.2342 0.18043,0.35318 0.22859,0.35508 h 0.002 0.002 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,-0.002 c 0.0435,-0.0325 0.0577,-0.20039 0.0399,-0.49934 -0.13227,-2.21962 0.25603,-2.55407 0.71239,-0.61252 0.57534,2.44774 0.54568,2.54886 -0.58367,1.85088 -0.46122,-0.28509 -1.19256,-0.38325 -1.62452,-0.21749 -1.41615,0.54342 -2.22183,-0.46221 -1.05416,-1.31603 0.91886,-0.67188 0.95546,-0.93346 0.253,-1.77987 -0.4527,-0.54543 -0.64744,-1.16793 -0.43276,-1.38261 0.0671,-0.0671 0.1289,-0.0993 0.1842,-0.0999 z m -0.54816,254.80922 c 0.17118,0.3458 0.39004,0.68505 0.63249,1.01865 -0.10485,-0.339 -0.2896,-0.66225 -0.63249,-1.01865 z" /></g>
     

            <!-- 4. MATA -->
            <g id="svg-mata" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Mata')" onmouseenter="hoverKepala('Mata')" onmouseleave="unhoverKepala('Mata')">
                <path
       id="path71"
       style="fill:#ffffff;display:inline;fill-rule:evenodd;stroke:none;stroke-width:0.0821453;stroke-linejoin:round;stroke-dasharray:0.246436, 0.246436;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -929.97852,945.5332 c -0.25845,0.007 -0.66359,0.0819 -1.10937,0.21094 -2.98486,0.86425 -9.47405,3.94628 -13.70703,6.50977 -1.63004,0.98714 -2.92349,1.87917 -5.0918,3.50976 -2.93483,2.20703 -3.81261,2.96409 -5.18945,4.47461 -0.67949,0.74547 -1.44232,1.54938 -1.69531,1.78711 l -0.46094,0.43164 1.61914,1.46875 c 3.63143,3.29538 5.68126,4.85283 8.55078,6.49805 5.08835,2.91737 12.76771,5.49513 19.92969,6.68945 2.76978,0.46188 6.36998,0.84159 6.71875,0.70899 0.61557,-0.23404 2.23903,-0.15941 2.51367,0.11523 0.1784,0.1784 1.47102,0.17826 1.60156,0 0.21683,-0.29611 2.02611,-0.34845 2.55469,-0.0742 0.29746,0.15434 0.857,0.15024 1.17773,-0.01 0.29505,-0.1472 1.2155,-0.18464 2.15039,-0.0859 1.26804,0.13386 7.33267,-0.64976 12.07422,-1.56055 4.81977,-0.92581 9.38612,-2.14643 14.86914,-3.97656 1.46835,-0.4901 3.09567,-1.02182 3.61524,-1.18164 2.5454,-0.78297 5.96226,-1.60801 7.92578,-1.91211 l 0.41016,-0.0644 -0.32813,-0.043 c -0.47567,-0.0632 -0.43421,-0.26229 0.082,-0.39453 0.55105,-0.14116 1.51953,0.01 1.51953,0.23632 1.9e-4,0.002 10e-4,0.008 0.002,0.01 3.6e-4,9.6e-4 10e-4,0.005 0.002,0.006 l 0.002,0.002 0.002,0.002 0.002,0.002 0.002,0.002 c 8.9e-4,6.1e-4 0.005,0.003 0.006,0.004 0.2581,0.12193 3.02086,-1.43154 3.32422,-1.89453 0.12231,-0.18668 0.11983,-0.22225 -0.0234,-0.48829 -0.085,-0.15775 -0.28536,-0.37332 -0.44726,-0.48046 -0.1619,-0.10714 -0.73665,-0.70381 -1.27539,-1.32618 -1.06009,-1.22464 -1.29405,-1.45949 -2.78516,-2.77148 -0.75173,-0.66147 -1.00253,-0.8396 -1.05273,-0.75 -0.0362,0.0646 -0.0998,0.11719 -0.14258,0.11719 -0.13841,0 -0.75205,-0.60073 -1.2461,-1.22071 -0.51763,-0.64956 -1.01285,-1.07237 -3.0625,-2.60937 -5.38588,-4.03879 -11.16716,-7.64234 -14.91015,-9.29688 -1.26197,-0.55784 -4.11557,-1.69975 -4.46094,-1.78515 -0.0995,-0.0246 -0.15506,-0.0369 -0.18164,-0.0215 -8.5e-4,6e-4 -0.005,0.003 -0.006,0.004 l -0.002,0.002 -0.002,0.002 c -5.8e-4,8.7e-4 -0.003,0.005 -0.004,0.006 -0.0128,0.0284 -0.002,0.0871 0.0215,0.18554 0.0306,0.1297 0.35083,1.01216 0.71094,1.96094 1.07276,2.82634 1.21492,3.24046 1.4668,4.27148 0.23408,0.95816 0.42135,2.19091 0.53711,3.53321 0.0251,0.29046 0.0497,0.4591 0.0742,0.49414 l 0.002,0.002 0.002,0.002 h 0.002 v 0.002 h 0.002 0.002 0.002 0.002 l 0.002,-0.002 0.002,-0.002 0.002,-0.002 c 0.004,-0.007 0.01,-0.0211 0.0137,-0.0371 0.079,-0.30813 0.24225,-0.29699 0.37695,0.0254 0.14147,0.33861 0.15989,0.89558 0.0371,1.125 -0.11446,0.21391 -0.31674,0.19949 -0.40234,-0.0273 -0.0141,-0.0374 -0.0246,-0.0618 -0.0352,-0.0723 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 -0.002 l -0.002,0.002 h -0.002 l -0.002,0.002 -0.002,0.002 c -0.02,0.0269 -0.0362,0.13438 -0.0566,0.33984 -0.14541,1.46432 -0.25296,2.26656 -0.39649,2.98438 -0.55508,2.77603 -1.93416,5.76495 -3.71875,8.05859 -0.19185,0.24658 -0.33515,0.46793 -0.33789,0.51953 v 0.002 l 0.002,0.002 v 0.002 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 c 0.048,-0.005 0.24721,-0.16288 0.46484,-0.37109 0.41069,-0.39293 0.63998,-0.58431 0.70117,-0.58984 0.001,2e-5 0.005,-1.6e-4 0.006,0 h 0.002 0.002 l 0.002,0.002 0.002,0.002 v 0.002 h 0.002 v 0.002 0.002 c 1.1e-4,10e-4 0,0.005 0,0.006 0,0.0283 -0.71435,0.83703 -1.58789,1.79688 -1.7919,1.96895 -2.36828,2.45652 -2.45118,2.07421 -8.8e-4,-0.004 -0.002,-0.009 -0.004,-0.0117 l -0.002,-0.002 c -8.3e-4,-8.1e-4 -0.005,-0.005 -0.006,-0.006 -0.06,-0.0337 -0.30231,0.11155 -0.79493,0.47852 -0.42921,0.31973 -1.17621,0.81972 -1.66015,1.11133 -3.07125,1.8506 -5.71297,2.52953 -9.79883,2.51953 -3.54959,-0.008 -6.20239,-0.56057 -8.80274,-1.83594 -3.92998,-1.9275 -7.11052,-5.09626 -9.02343,-8.99023 -0.59944,-1.22025 -0.99297,-2.31616 -1.30078,-3.61524 -0.92188,-3.89068 -0.73237,-8.50193 0.48242,-11.74609 0.15226,-0.40662 0.73704,-1.6819 1.29883,-2.83399 0.56178,-1.15209 1.00447,-2.12235 0.98437,-2.15625 -0.0272,-0.0459 -0.13008,-0.0669 -0.28516,-0.0625 z m 226.91602,0.20118 c -0.0854,10e-4 -0.10156,0.0445 -0.10156,0.11914 0,0.0878 -0.0947,0.27394 -0.21094,0.4121 -0.25899,0.30779 -0.28868,0.20172 0.62695,2.1836 1.09016,2.35965 1.58279,3.94244 1.89649,6.08008 0.16477,1.12261 0.14122,4.12589 -0.041,5.29687 -1.16057,7.45723 -5.70514,13.20978 -12.39062,15.68164 -2.57975,0.95383 -4.82516,1.36433 -7.45899,1.36133 -1.40648,-0.002 -1.8399,-0.0331 -2.6289,-0.1875 -3.54763,-0.69418 -7.32153,-2.39607 -10.0918,-4.55273 -0.26039,-0.20273 -0.41531,-0.30088 -0.46289,-0.29493 h -0.002 c -8.1e-4,3.1e-4 -0.005,0.002 -0.006,0.002 h -0.002 v 0.002 l -0.002,0.002 c -3.4e-4,7.6e-4 -0.002,0.005 -0.002,0.006 l -0.002,0.002 c -3.9e-4,0.006 9.7e-4,0.0159 0.004,0.0254 0.0698,0.22403 -0.0618,0.38441 -0.26367,0.32031 -0.31019,-0.0984 -1.63042,-1.64909 -1.55274,-1.81641 l 0.002,-0.002 v -0.002 l 0.002,-0.002 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 h 0.002 c 0.0454,-0.008 0.18448,0.0619 0.32617,0.16993 0.18974,0.14473 0.30256,0.21268 0.33398,0.20703 h 0.002 0.002 v -0.002 h 0.002 l 0.002,-0.002 v -0.002 l 0.002,-0.002 v -0.002 c -10e-4,-0.0326 -0.075,-0.13186 -0.22266,-0.28906 -1.87664,-1.99805 -3.59495,-5.45584 -4.29492,-8.64453 -0.24531,-1.11746 -0.45645,-2.66382 -0.46875,-3.4336 -0.004,-0.27266 -0.007,-0.41017 -0.0176,-0.43554 v -0.002 h -0.002 v -0.002 h -0.002 -0.002 v 0.002 l -0.002,0.002 c -0.0119,0.0216 -0.0315,0.10463 -0.0605,0.23437 -0.0847,0.37804 -0.2654,0.46364 -0.3457,0.16406 -0.0272,-0.10164 -0.0488,-0.53563 -0.0488,-0.96484 0,-0.72879 0.0536,-1.12418 0.15234,-1.16211 0.0511,-0.0151 0.11767,0.0616 0.19141,0.23633 0.0196,0.0464 0.035,0.0782 0.0488,0.0879 l 0.002,0.002 h 0.002 0.002 v 0.002 h 0.002 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,-0.002 c 0.0336,-0.0313 0.0539,-0.24883 0.0898,-0.77344 0.0727,-1.06364 0.24706,-2.13395 0.5293,-3.2539 0.25618,-1.01653 0.51106,-1.71678 1.125,-3.10157 0.60069,-1.35492 1.01839,-2.4387 1.09179,-2.83007 0.0477,-0.25453 0.0341,-0.29297 -0.10546,-0.29297 -0.89567,0 -8.13409,3.61323 -12.63086,6.30468 -3.12894,1.87277 -6.14063,4.06356 -9.85743,7.17383 -2.3361,1.95488 -2.60544,2.19838 -2.96289,2.6875 -0.41385,0.56629 -1.1346,1.247 -1.32422,1.25 -0.0862,10e-4 -0.23633,0.14837 -0.35546,0.34961 -0.11295,0.1908 -0.76916,0.91558 -1.45899,1.61133 -0.68983,0.69575 -1.27699,1.35652 -1.30469,1.4668 -0.0783,0.31188 0.11203,0.80764 0.4043,1.05469 0.46385,0.39207 1.2845,0.66962 2.38086,0.80468 0.29769,0.0367 0.39063,0.0208 0.39063,-0.0644 0,-0.30722 1.19132,-0.45526 1.46093,-0.18164 0.13282,0.13476 0.13105,0.14815 -0.0195,0.25976 -0.0407,0.0302 -0.0668,0.0535 -0.0742,0.0703 -2.9e-4,9e-4 -0.002,0.005 -0.002,0.006 v 0.002 0.002 0.002 0.002 l 0.002,0.002 v 0.002 l 0.002,0.002 0.002,0.002 c 8.8e-4,6.2e-4 0.005,0.003 0.006,0.004 0.0395,0.019 0.16514,0.0234 0.40625,0.0234 1.34406,-1e-5 5.18726,1.02334 11.22656,2.99023 10.02289,3.26428 17.76192,5.01302 25.10547,5.66992 1.8245,0.1632 2.14237,0.17099 2.38281,0.0703 0.6019,-0.25206 2.13477,-0.17614 2.13477,0.10547 0,0.16581 0.64934,0.16093 0.77148,-0.006 0.23078,-0.31511 1.88922,-0.33734 2.19727,-0.0293 0.1315,0.13147 0.2843,0.15234 1.06836,0.15234 0.7312,0 0.93351,-0.0253 1.00781,-0.12695 0.15952,-0.21815 1.19325,-0.3239 1.92578,-0.19727 0.79732,0.13781 1.64901,0.11665 3.5,-0.0879 6.96476,-0.76962 14.71271,-2.85386 20.57617,-5.53516 2.43444,-1.11324 5.5404,-3.05142 8.83399,-5.51171 1.88117,-1.40521 2.31706,-1.77495 2.58984,-2.20508 0.32445,-0.51161 1.62068,-1.82549 1.91016,-1.93555 0.12296,-0.0467 0.22461,-0.14204 0.22461,-0.21094 0,-0.0689 -0.24417,-0.35634 -0.54297,-0.63867 -0.29879,-0.28233 -0.72242,-0.7532 -0.94141,-1.04687 -1.18621,-1.59071 -8.26434,-6.93552 -12.07031,-9.11524 -2.92074,-1.67275 -8.41272,-4.24124 -11.37695,-5.32031 -0.77632,-0.2826 -1.11155,-0.39854 -1.25391,-0.39648 z m -10.69922,2.75585 c -0.82893,-0.0298 -1.67769,0.20544 -2.49805,0.69336 -0.11978,0.0713 -0.17105,0.11233 -0.21875,0.17383 -0.034,0.0439 -0.15407,0.19895 -0.26757,0.3457 -0.60176,0.77801 -1.03086,1.19444 -1.24805,1.21094 -0.0404,0.003 -0.0527,0.0169 -0.11914,0.12696 -0.64012,1.06142 -0.82082,2.22581 -0.52149,3.3789 0.1157,0.44574 0.27918,0.83155 0.53125,1.25391 0.0757,0.12685 0.10529,0.16134 0.17579,0.21094 0.0466,0.0328 0.2048,0.15364 0.35156,0.26757 0.78851,0.6122 1.26915,1.08757 1.24805,1.23633 -6.4e-4,0.004 -0.002,0.01 -0.002,0.0137 v 0.002 c 1.9e-4,9.2e-4 0.002,0.005 0.002,0.006 3.7e-4,9.1e-4 10e-4,0.005 0.002,0.006 0.0129,0.0204 0.0562,0.0465 0.16797,0.10742 0.56147,0.30604 1.22805,0.51082 1.86718,0.57422 0.19799,0.0196 0.83074,0.008 1.02344,-0.0195 0.55596,-0.0784 1.02123,-0.22142 1.53711,-0.4707 l 0.25781,-0.125 -0.008,-0.0664 c -0.007,-0.0553 -0.002,-0.077 0.0312,-0.13477 0.12792,-0.21919 0.57091,-0.62995 1.22852,-1.14063 0.35541,-0.27598 0.51019,-0.38166 0.56054,-0.37695 8.6e-4,1.6e-4 0.005,-2.4e-4 0.006,0 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 v 0.002 c 3.3e-4,7.4e-4 0.002,0.005 0.002,0.006 h 0.002 0.002 c 0.0304,-0.0264 0.22109,-0.40995 0.28906,-0.58398 0.12619,-0.32324 0.21497,-0.66514 0.26367,-1.01758 0.0327,-0.23629 0.0448,-0.73287 0.0234,-0.98633 -0.10717,-1.27116 -0.68653,-2.49102 -1.60156,-3.375 -0.85931,-0.83015 -1.91476,-1.28162 -3.09766,-1.32422 z m -206.26367,0.16797 c -0.17081,-10e-4 -0.33945,0.004 -0.44727,0.0156 -0.83172,0.0882 -1.63484,0.39967 -2.36132,0.91797 -0.59996,0.42803 -1.19871,1.05373 -1.61133,1.68359 -0.19601,0.2992 -0.39834,0.73279 -0.49414,1.05859 l -0.0332,0.11133 0.0371,0.0781 c 0.165,0.35421 0.19902,0.93275 0.082,1.39844 -0.0301,0.11972 -0.10061,0.28822 -0.13671,0.32812 -0.0184,0.0202 -0.0167,0.0379 0.008,0.14062 0.14844,0.62152 0.48877,1.29543 0.9414,1.86133 0.88641,1.10824 2.21613,1.85832 3.56641,2.01172 h 0.002 c 0.27219,0.0309 0.84591,0.0208 1.10938,-0.0195 1.17337,-0.17957 2.22093,-0.81046 2.94922,-1.7793 0.89442,-1.18988 1.24753,-2.76484 0.91992,-4.09961 -0.18964,-0.77265 -0.73525,-1.69246 -1.39844,-2.35546 -0.38525,-0.38513 -0.77571,-0.66776 -1.23437,-0.89649 -0.47633,-0.23755 -0.92039,-0.37149 -1.44532,-0.43359 -0.10927,-0.0128 -0.28231,-0.0203 -0.45312,-0.0215 z m 201.51367,3.73828 c 0.0225,-0.003 0.0475,0.0117 0.0762,0.0449 0.13969,0.1616 0.23142,0.67598 0.19532,1.09961 -0.0258,0.30246 -0.11578,0.61849 -0.20118,0.71289 -0.0485,0.0536 -0.11363,0.023 -0.14843,-0.0684 -0.12352,-0.32502 -0.11309,-1.47036 0.0156,-1.72266 0.0207,-0.0405 0.04,-0.0631 0.0625,-0.0664 z m -215.01172,3.42383 h 0.002 c 7.6e-4,4e-5 0.005,-1.2e-4 0.006,0 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 c 0.0231,0.0172 0.0514,0.0779 0.0918,0.18359 0.1463,0.38237 0.19942,1.89996 0.0859,2.44336 -0.10436,0.49976 -0.20021,0.59132 -0.30078,0.28711 -0.0932,-0.28193 -0.0656,-2.64766 0.0332,-2.82422 0.0271,-0.0484 0.0469,-0.0794 0.0645,-0.0898 7.9e-4,-3.9e-4 0.005,-0.002 0.006,-0.002 h 0.002 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -943.51721,408.53472 c 1.09191,-0.13521 2.73218,-0.13242 3.64505,0.006 0.91288,0.13862 0.0195,0.24924 -1.98528,0.24583 -2.00478,-0.003 -2.75167,-0.11682 -1.65977,-0.25203 z m -89.04109,-1.41235 c -2.4712,-0.99159 -6.9967,-4.34762 -11.3606,-8.4249 -3.1838,-2.97471 -3.6418,-3.27854 -1.8225,-1.20898 1.3365,1.52034 0.4047,0.69442 -2.0706,-1.83537 -2.4753,-2.52979 -4.3004,-4.18955 -4.0556,-3.68836 0.2447,0.5012 -0.1459,0.15807 -0.868,-0.76251 -0.7222,-0.92058 -1.5694,-1.51536 -1.8827,-1.32174 -0.3133,0.19362 -0.4945,-0.01 -0.4027,-0.4525 0.092,-0.4425 -0.3091,-0.80743 -0.891,-0.81095 -0.5819,-0.004 -0.9919,-0.19337 -0.9112,-0.42189 0.262,-0.7421 -3.9636,-4.72749 -10.6366,-10.03212 -8.3978,-6.67566 -8.6067,-7.47404 -1.2289,-4.69773 5.8859,2.21491 12.5388,5.91551 17.664,9.82541 3.3214,2.53382 4.6109,3.2106 5.1294,2.69209 1.0261,-1.02606 -1.8175,-3.74713 -8.7598,-8.38249 -6.6312,-4.4276 -13.7642,-7.58343 -20.7023,-9.15927 -2.5896,-0.58814 -4.7082,-1.27687 -4.7082,-1.5305 0,-0.25364 -0.3039,-0.46116 -0.6753,-0.46116 -0.3713,0 -3.7202,-2.14928 -7.4419,-4.77619 -3.7218,-2.6269 -8.3684,-5.82919 -10.326,-7.11621 -1.9576,-1.28701 -3.2553,-2.44132 -2.8839,-2.56514 1.1585,-0.38616 17.2265,2.15694 35.9073,5.68309 20.2482,3.82204 27.0885,4.38122 30.0942,2.46019 0.99,-0.63275 1.603,-0.93699 1.3623,-0.67609 -0.2407,0.2609 0.1172,1.25371 0.7955,2.20624 3.8616,5.42308 7.2315,15.98938 8.4981,26.64571 1.1456,9.63735 -0.5294,17.52354 -4.0023,18.84394 -1.858,0.7064 -1.9817,0.70534 -3.8207,-0.0326 z m 69.34198,-0.25732 c -5.74223,-4.02201 -4.30019,-26.86042 2.55558,-40.47416 2.82898,-5.61761 4.11117,-6.89824 5.90767,-5.90054 2.28492,1.26896 10.43039,0.69449 22.61577,-1.595 18.15831,-3.41175 36.33297,-6.47693 37.664,-6.35209 0.6691,0.0628 1.68594,-0.089 2.25965,-0.33728 0.5737,-0.24827 1.37031,-0.34232 1.77023,-0.20901 0.39992,0.1333 -2.52988,2.53487 -6.51068,5.3368 -3.98079,2.80194 -8.66507,6.09831 -10.40949,7.32527 -1.74443,1.22696 -2.99742,2.40511 -2.78442,2.61811 0.213,0.213 -0.31115,0.38727 -1.16479,0.38727 -2.49662,0 -11.95137,2.91269 -16.68803,5.14102 -6.48399,3.05035 -17.80542,11.05616 -17.80542,12.59089 0,1.53489 2.09318,0.8473 5.67594,-1.86448 2.20553,-1.66936 5.87877,-4.14539 8.16274,-5.50227 4.21796,-2.50584 13.76633,-6.32731 14.88106,-5.95574 0.33609,0.11203 -1.67634,2.10456 -4.47205,4.42785 -7.82077,6.4992 -14.22234,12.45008 -14.23743,13.23507 -0.008,0.39008 -0.44944,0.63728 -0.98209,0.54933 -0.53266,-0.0879 -1.34666,0.30626 -1.8089,0.87601 -0.71781,0.88476 -0.71594,0.96087 0.0128,0.52166 0.58353,-0.35168 0.71429,-0.28939 0.41365,0.19705 -0.24178,0.3912 -0.65485,0.57825 -0.91794,0.41565 -0.26309,-0.1626 -1.35499,0.79523 -2.42644,2.1285 -1.07145,1.33328 -2.16236,2.29171 -2.42425,2.12985 -0.48527,-0.29991 -3.86685,2.89783 -3.7589,3.55454 0.0326,0.19829 -0.14578,0.39549 -0.39637,0.43821 -0.2506,0.0427 -2.09591,1.2386 -4.10069,2.6575 -6.54508,4.63232 -8.64726,5.32979 -11.03123,3.65999 z m 20.75137,-11.86274 c 0.60477,-0.66826 0.96289,-1.21502 0.79582,-1.21502 -0.16706,0 -0.79856,0.54676 -1.40333,1.21502 -0.60476,0.66825 -0.96288,1.21501 -0.79582,1.21501 0.16707,0 0.79857,-0.54676 1.40333,-1.21501 z m -6.45633,11.69453 c -0.75566,-0.96354 -0.73417,-0.98503 0.22937,-0.22936 0.58473,0.45857 1.06314,0.93698 1.06314,1.06314 0,0.5 -0.49888,0.17818 -1.29251,-0.83378 z m 6.64618,-1.17438 c 0.43854,-0.17549 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34546 -0.79736,0.31908 -0.70771,-0.0292 -0.85166,-0.17311 -0.36703,-0.36704 z m -2.31613,-3.53381 c 0.78475,-0.83532 1.5635,-1.51877 1.73057,-1.51877 0.16706,0 -0.33831,0.68345 -1.12306,1.51877 -0.78475,0.83533 -1.5635,1.51878 -1.73057,1.51878 -0.16706,0 0.33832,-0.68345 1.12306,-1.51878 z m -139.84087,-35.34649 c 0.4385,-0.1755 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.157,0.34545 -0.7974,0.31907 -0.7077,-0.0292 -0.8516,-0.1731 -0.367,-0.36703 z m 177.3925,0 c 0.43854,-0.1755 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34545 -0.79736,0.31907 -0.70771,-0.0292 -0.85166,-0.1731 -0.36703,-0.36703 z m -198.9855,-15.19391 c 0.5911,-0.15403 1.4113,-0.1439 1.8226,0.0225 0.4113,0.16641 -0.072,0.29244 -1.0747,0.28006 -1.0024,-0.0124 -1.339,-0.14854 -0.7479,-0.30257 z"
       id="path121"
       sodipodi:nodetypes="sscsssssssssscssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       id="path122"
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -703.69336,892.05859 c -8.66371,-0.10085 -19.2902,0.84386 -33.29883,2.68164 -13.18554,1.72981 -18.85923,2.77089 -26.7207,4.9043 -6.93923,1.88313 -8.44261,2.62201 -12.01758,5.9043 -3.49824,3.21184 -4.97116,6.41419 -4.98828,10.83789 -0.0109,2.80151 0.26981,3.78337 1.50391,5.25 1.13127,1.34445 1.31143,1.88451 0.70507,2.11719 -0.35387,0.13579 -0.9398,0.90386 -1.63085,2.05078 1.51607,-2.37866 2.53959,-2.8317 3.82617,-2.11719 2.28492,1.26896 10.42985,0.69379 22.61523,-1.5957 18.15831,-3.41175 36.33303,-6.47641 37.66406,-6.35157 0.6691,0.0628 1.68606,-0.0896 2.25977,-0.33789 0.5737,-0.24827 1.37156,-0.34229 1.77148,-0.20898 0.34597,0.11532 -1.8023,1.92942 -4.96484,4.23047 l 6.09766,-4.35156 6.83593,-0.38477 c 17.45874,-0.97946 32.34093,3.21665 51.01172,14.38086 6.47119,3.86945 7.38699,4.25364 8.19532,3.44531 1.27642,-1.27641 0.7263,-2.58975 -4.12305,-9.84179 -5.0295,-7.52148 -12.82512,-15.12032 -21.21289,-20.67774 -10.10347,-6.69418 -19.08978,-9.76746 -33.5293,-9.93555 z m -227.8125,0.0488 c -13.1288,0.30209 -22.0412,3.13816 -31.7832,9.48242 -10.9891,7.15641 -19.64155,16.11839 -24.93555,25.82618 -2.0601,3.77761 -2.17699,4.23516 -1.30469,5.10742 0.8722,0.87226 1.62695,0.57495 8.43555,-3.32617 9.0801,-5.20266 12.36314,-6.85966 18.52734,-9.34571 10.1236,-4.08283 20.8215,-5.81956 31.9375,-5.18554 l 2.77149,0.1582 c -0.007,-0.006 -0.014,-0.0145 -0.0176,-0.0215 -4.6e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 l -0.002,-0.002 v -0.002 -0.002 -0.002 -0.002 l 0.002,-0.002 v -0.002 c 0.009,-0.042 0.10301,-0.0897 0.29101,-0.13867 0.5911,-0.15403 1.41097,-0.14296 1.82227,0.0234 0.2909,0.1177 0.13155,0.21325 -0.33985,0.25586 l 2.01172,0.11523 2.87891,1.92578 c -1.2891,-0.93959 -2.03324,-1.6777 -1.74023,-1.77539 1.1585,-0.38616 17.22545,2.15549 35.90624,5.68164 20.2482,3.82204 27.08805,4.38197 30.09376,2.46094 0.78119,-0.49928 1.3307,-0.79362 1.4082,-0.76758 l 0.002,0.002 h 0.002 v 0.002 l 0.002,0.002 v 0.002 0.002 l 0.002,0.002 v 0.002 0.002 0.002 h -0.002 v 0.002 c -0.004,0.0154 -0.0207,0.0397 -0.0508,0.0723 -0.1258,0.1364 -0.0894,0.4723 0.0723,0.89844 -0.0777,-0.52286 0.2441,-1.09468 1.0586,-2.29492 3.3558,-4.945 0.15427,-13.86127 -6.48243,-18.05079 -6.5208,-4.11643 -30.17615,-8.60562 -55.84375,-10.5957 -5.4999,-0.42642 -10.3445,-0.60655 -14.7207,-0.50586 z m 212.61719,28.6875 c -3.89583,2.7421 -8.34703,5.87181 -10.03711,7.06055 -0.44359,0.312 -0.85474,0.62149 -1.21875,0.91211 l 2.26562,-1.5957 c 2.09303,-1.47501 5.82276,-4.12066 8.99024,-6.37696 z m -136.22461,3.58008 c 0.0957,0.16119 0.20256,0.3256 0.31836,0.48828 0.214,0.30046 0.42612,0.61609 0.63672,0.94727 -0.3019,-0.51728 -0.58239,-0.95119 -0.83399,-1.27735 -0.0424,-0.0549 -0.0835,-0.1069 -0.12109,-0.1582 z m -55.04883,0.20117 c 0.1573,0.11208 0.31069,0.22187 0.45899,0.32813 2.7421,1.9647 5.75019,3.97783 6.68359,4.47461 1.4805,0.78803 1.43586,0.86527 -1.80274,0.51562 0.185,0.19775 -0.17258,0.33854 -0.80468,0.3125 -0.7077,-0.0292 -0.85179,-0.17326 -0.36719,-0.36719 0.0523,-0.0209 0.10606,-0.0393 0.16016,-0.0547 -5.9505,-0.62276 -15.27726,-0.42809 -21.63086,0.45898 -9.2986,1.29824 -18.94431,4.91164 -26.40821,9.89258 -3.3982,2.26778 -13.36523,11.98968 -13.36523,13.03711 0,1.4936 1.5985,0.74446 4.2793,-2.00781 5.3259,-5.46801 16.96456,-12.23707 25.79296,-15 7.4254,-2.32386 13.13685,-3.10725 22.78125,-3.12305 10.6365,-0.0174 17.11343,0.99483 19.01563,2.9707 0.112,0.11637 0.7675,0.63358 0.9707,0.82031 -2.3251,-2.24022 -0.93906,-2.08636 4.14844,-0.17187 5.8859,2.21491 12.53886,5.91627 17.66406,9.82617 3.3214,2.53382 4.61041,3.20992 5.12891,2.69141 1.0261,-1.02606 -1.81747,-3.74746 -8.75977,-8.38281 -6.6312,-4.4276 -13.76307,-7.58237 -20.70117,-9.15821 -2.5896,-0.58814 -4.70898,-1.27762 -4.70898,-1.53125 0,-0.25364 -0.30438,-0.46094 -0.67578,-0.46094 -0.3713,0 -3.71971,-2.14848 -7.44141,-4.77539 -0.1379,-0.0973 -0.27767,-0.19615 -0.41797,-0.29492 z m 190.54492,4.63867 c -2.3731,0.0237 -4.81712,0.20954 -7.98047,0.57227 0.0647,0.0261 0.11891,0.0584 0.16016,0.0996 0.20187,0.20187 -0.15645,0.34669 -0.79688,0.32031 -0.59726,-0.0246 -0.79164,-0.13209 -0.54687,-0.28125 -0.30007,0.0364 -0.60657,0.074 -0.91992,0.11328 l -1.9961,0.25 v 0.002 c -0.0414,0.0848 -0.0472,0.1481 -0.0117,0.18359 0.213,0.213 -0.31238,0.38672 -1.16602,0.38672 -2.49662,0 -11.95084,2.91229 -16.6875,5.14062 -6.48399,3.05035 -17.80469,11.05707 -17.80469,12.5918 0,1.53489 2.09302,0.84655 5.67578,-1.86523 2.20553,-1.66936 5.87814,-4.14508 8.16211,-5.50196 4.21796,-2.50584 13.76613,-6.32665 14.88086,-5.95508 0.33609,0.11203 -1.67499,2.10445 -4.4707,4.42774 -2.16667,1.80054 -4.22516,3.55759 -6.06836,5.17578 2.14104,-1.85038 4.23249,-3.62986 6.16406,-5.24219 5.74701,-4.79717 6.04456,-4.95734 10.67969,-5.78906 5.89922,-1.05853 20.15869,-1.04761 26.33398,0.0215 12.52638,2.16859 27.84419,9.77079 35.51172,17.62305 2.38924,2.4468 3.97657,3.13057 3.97657,1.71484 0,-1.31746 -9.94026,-10.57261 -14.57422,-13.57031 -8.87866,-5.74358 -18.20177,-8.76024 -30.9668,-10.01953 -2.87797,-0.28392 -5.18158,-0.42216 -7.55469,-0.39844 z m -65.13867,6.49219 c -0.31876,0.87664 -0.59183,1.70537 -0.79687,2.44531 -0.15046,0.54294 -0.29365,1.08288 -0.43165,1.6211 0.36825,-1.38275 0.77812,-2.74314 1.22852,-4.06641 z m -5.07617,0.62109 c -0.64428,0.0587 -3.78428,7.57545 -5.07227,12.1504 -4.06932,14.4543 -4.69422,37.6012 -1.6582,61.35941 1.45837,11.4124 1.48938,11.543 2.75,11.543 0.61123,0 0.92744,-0.5743 0.92383,-1.6719 -0.003,-0.9189 -0.42793,-4.8138 -0.94531,-8.6563 -1.27596,-9.4762 -1.86801,-39.76941 -0.93164,-47.70898 0.97418,-8.26029 2.25106,-14.22252 4.38476,-20.49219 1.68964,-4.96485 1.82223,-6.52343 0.55664,-6.52344 -0.002,0 -0.005,-2.3e-4 -0.008,0 z m -59.6875,0.0645 c 0.6216,1.96621 1.15198,4.08786 1.64258,6.23633 -0.1564,-0.71301 -0.18744,-1.31824 -0.36524,-2.04688 -0.2976,-1.21883 -0.74494,-2.66535 -1.27734,-4.18945 z m 4.32617,0.0664 c -0.2037,-10e-4 -0.39936,0.1053 -0.59766,0.30079 -0.5865,0.5782 -0.35177,1.73695 1.11133,5.46679 6.962,17.74783 8.5311,41.66978 4.6836,71.42963 -0.5091,3.9377 -0.75377,7.4383 -0.54297,7.7793 0.7161,1.1587 2.31836,0.2526 2.78906,-1.5761 2.5309,-9.8336 3.76323,-40.98997 2.11523,-53.46291 -1.1696,-8.85259 -2.73878,-15.21635 -5.55468,-22.51562 -2.0844,-5.40307 -3.12121,-7.41625 -4.00391,-7.42188 z m -67.55664,2.90235 c -15.6936,-0.29088 -33.34029,6.69243 -45.90039,18.54101 -4.9554,4.67466 -5.39555,6.23453 -2.06055,7.3125 1.0842,0.35045 2.86162,1.48538 3.94922,2.52149 3.1075,2.96027 9.27495,6.66399 14.34375,8.61328 4.258,1.63743 13.72942,3.92232 18.91992,4.56445 4.8593,0.60117 18.77728,-0.20134 24.92578,-1.4375 3.4995,-0.70356 10.43251,-2.6689 15.40821,-4.36718 6.1117,-2.08606 9.9543,-3.06974 11.8457,-3.03126 4.16,0.0847 7.29866,-0.93569 8.06836,-2.625 0.9979,-2.19019 0.20942,-4.12285 -3.27148,-8.01367 l -1.83399,-2.05078 c 0.0351,0.10828 0.38844,0.54113 1.05274,1.29688 0.4072,0.46323 0.60482,0.71008 0.61132,0.75586 v 0.002 h -0.002 v 0.002 0.002 h -0.002 -0.002 -0.002 -0.002 -0.002 c -0.10951,-0.0324 -1.06483,-0.95725 -2.66993,-2.59766 -0.7005,-0.71588 -1.34986,-1.36092 -1.91406,-1.9082 -0.0333,0.0291 -0.0907,0.043 -0.17383,0.043 -0.1153,0 -0.73069,-0.61539 -1.36718,-1.36719 l -0.30665,-0.36328 -0.002,-0.002 c -0.1544,-0.12002 -0.25973,-0.18268 -0.29883,-0.17968 l -0.002,0.002 c -8e-4,2.5e-4 -0.005,0.002 -0.006,0.002 h -0.002 l -0.002,0.002 v 0.002 l -0.002,0.002 c -3e-4,7.8e-4 -0.002,0.005 -0.002,0.006 -10e-4,0.0147 0.005,0.0415 0.0215,0.0742 0.0535,0.10964 0.0764,0.18126 0.0723,0.21289 -2e-4,10e-4 -0.002,0.005 -0.002,0.006 v 0.002 l -0.002,0.002 -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 l -0.002,0.002 h -0.002 c -9e-4,9e-5 -0.005,0 -0.006,0 -0.0891,-0.008 -0.42715,-0.36844 -0.91797,-0.99414 -0.45459,-0.57947 -0.95835,-1.02846 -1.34765,-1.23438 0.369,0.36108 0.55375,0.56304 0.56445,0.61719 v 0.002 0.002 0.002 l -0.002,0.002 v 0.002 h -0.002 l -0.002,0.002 h -0.002 -0.002 c -10e-4,-3e-5 -0.003,-4e-5 -0.004,0 -0.0752,-0.003 -0.44795,-0.25171 -1.09375,-0.71094 -0.2683,0.16127 -0.43847,0.0274 -0.41797,-0.29883 -0.317,-0.2277 -0.6814,-0.49018 -1.0918,-0.78711 -0.1227,-0.0887 -0.24484,-0.17734 -0.36914,-0.26562 -0.1688,-0.055 -0.28426,-0.13443 -0.31836,-0.22461 -7.945,-5.56139 -18.90189,-10.13626 -27.77929,-11.56836 -2.1417,-0.34549 -4.34394,-0.53462 -6.58594,-0.57617 z m 191.25,0.0957 c -4.38075,0.12368 -8.66821,0.77311 -12.75781,1.96875 -7.34081,2.14618 -16.70072,6.82795 -23.10157,11.54883 -0.0302,0.29966 -0.32416,0.50666 -0.71093,0.52539 -0.63008,0.46336 -1.17403,0.85377 -1.61914,1.16406 0.0467,-0.0106 0.0833,-0.007 0.10351,0.008 0.001,9.3e-4 0.005,0.005 0.006,0.006 0.0401,0.0487 -0.008,0.18274 -0.14258,0.40039 -0.24178,0.39122 -0.65487,0.57862 -0.91796,0.41602 -0.26311,-0.1626 -1.35434,0.79368 -2.42579,2.12695 -1.07145,1.33328 -2.16193,2.29272 -2.42382,2.13086 -0.0426,-0.0263 -0.10668,-0.0254 -0.18946,-0.002 h -0.002 l -1.2793,1.38281 c -3.7251,4.0249 -4.10152,4.66464 -3.93359,6.68164 0.0556,0.66803 0.23261,1.25704 0.53515,1.76758 0.034,0.0265 0.0688,0.0532 0.10547,0.082 0.58473,0.45857 1.06446,0.9383 1.06446,1.06446 0,0.0267 -0.003,0.0502 -0.006,0.0723 1.34767,0.92313 3.50447,1.37033 6.52929,1.3711 2.93163,7.2e-4 5.20585,0.53662 10.0254,2.36523 15.04376,5.70783 29.53033,7.76711 43.00195,6.11523 7.11945,-0.87298 15.83927,-3.25018 21.19336,-5.77929 4.63917,-2.1914 11.02941,-6.44777 13.04492,-8.68946 0.62938,-0.70001 1.37563,-1.1297 1.6582,-0.95507 0.88414,0.54643 2.96875,-0.94321 2.96875,-2.1211 0,-1.33361 -6.24616,-7.31656 -11.65039,-11.16015 C -694.38115,943.443 -708.35774,939.086 -721.5,939.45703 Z m -168.30469,1.25586 c 0.3475,0.27998 0.45384,0.40116 0.80274,0.67773 2.1862,1.73325 5.46125,4.52434 8.09375,6.88086 -1.8596,-1.77206 -4.65888,-4.16608 -8.11328,-6.9121 -0.3446,-0.27392 -0.46621,-0.39221 -0.78321,-0.64649 z m -40.17383,4.82031 v 0.002 c 0.15508,-0.004 0.25796,0.0166 0.28516,0.0625 0.0201,0.0339 -0.42259,1.00416 -0.98437,2.15625 -0.56179,1.15209 -1.14657,2.42736 -1.29883,2.83398 -1.21479,3.24416 -1.4043,7.85541 -0.48242,11.74609 0.30781,1.29908 0.70134,2.39499 1.30078,3.61524 1.91291,3.89397 5.09345,7.06273 9.02343,8.99023 2.60035,1.27537 5.25315,1.82794 8.80274,1.83594 4.08586,0.01 6.72758,-0.66893 9.79883,-2.51953 0.48394,-0.29161 1.23094,-0.7916 1.66015,-1.11133 0.48493,-0.36123 0.72828,-0.50813 0.79297,-0.48047 l 0.002,0.002 c 10e-4,10e-4 0.005,0.005 0.006,0.006 l 0.002,0.002 h 0.002 c 10e-4,0.003 10e-4,0.009 0.002,0.0117 0.0829,0.38231 0.65928,-0.10527 2.45118,-2.07422 0.87354,-0.95985 1.58789,-1.76858 1.58789,-1.79688 0,-10e-4 1.1e-4,-0.005 0,-0.006 v -0.002 -0.002 h -0.002 v -0.002 l -0.002,-0.002 -0.002,-0.002 h -0.002 -0.002 c -10e-4,2e-5 -0.005,10e-6 -0.006,0 -0.0612,0.006 -0.29048,0.19691 -0.70117,0.58984 -0.21763,0.20821 -0.41684,0.3661 -0.46484,0.3711 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 v -0.004 -0.002 l -0.002,-0.002 v -0.002 c 0.003,-0.0516 0.14604,-0.27295 0.33789,-0.51953 1.78459,-2.29364 3.16367,-5.28256 3.71875,-8.05859 0.14353,-0.71782 0.25108,-1.52006 0.39649,-2.98438 0.0204,-0.20546 0.0366,-0.31294 0.0566,-0.33984 l 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 c 0.0106,0.0105 0.0211,0.0349 0.0352,0.0723 0.0856,0.22679 0.28788,0.24125 0.40234,0.0273 0.12279,-0.22942 0.10436,-0.78639 -0.0371,-1.125 -0.1347,-0.32239 -0.29795,-0.33352 -0.37695,-0.0254 -0.004,0.016 -0.01,0.0301 -0.0137,0.0371 l -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 -0.002 -0.002 -0.002 v -0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 c -0.0237,-0.042 -0.0499,-0.21276 -0.0742,-0.49414 -0.11576,-1.3423 -0.30303,-2.57505 -0.53711,-3.53321 -0.25188,-1.03102 -0.39404,-1.44514 -1.4668,-4.27148 -0.36011,-0.94878 -0.68034,-1.83124 -0.71094,-1.96094 -0.0235,-0.0984 -0.0343,-0.15714 -0.0215,-0.18554 h 0.002 c 8e-4,-0.001 0.002,-0.005 0.002,-0.006 l 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 0.002,-0.002 c 0.0266,-0.0154 0.0821,-0.003 0.18164,0.0215 0.34537,0.0854 3.19897,1.22731 4.46094,1.78515 3.74299,1.65454 9.52427,5.25809 14.91015,9.29688 2.04965,1.537 2.54487,1.95981 3.0625,2.60937 0.49405,0.61998 1.10769,1.22071 1.2461,1.22071 0.0428,0 0.10638,-0.0526 0.14258,-0.11719 0.0502,-0.0896 0.301,0.0885 1.05273,0.75 1.49111,1.31199 1.72507,1.54684 2.78516,2.77148 0.53874,0.62237 1.11349,1.21904 1.27539,1.32618 0.1619,0.10714 0.36226,0.32272 0.44726,0.48046 0.14323,0.26604 0.14575,0.30161 0.0234,0.48829 -0.30336,0.46299 -3.06612,2.01646 -3.32422,1.89453 -10e-4,-8e-4 -0.005,-0.004 -0.006,-0.004 l -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 v -0.002 c -3.3e-4,-10e-4 -0.002,-0.003 -0.002,-0.004 -6.6e-4,-0.003 -0.002,-0.008 -0.002,-0.01 0,-0.22632 -0.96848,-0.37748 -1.51953,-0.23632 -0.51621,0.13224 -0.5577,0.33133 -0.082,0.39453 l 0.32813,0.043 -0.41016,0.0644 c -1.96352,0.3041 -5.38038,1.12914 -7.92578,1.91211 -0.51957,0.15982 -2.14689,0.69154 -3.61524,1.18164 -5.48302,1.83013 -10.04937,3.05075 -14.86914,3.97656 -4.74155,0.91079 -10.80618,1.69441 -12.07422,1.56055 -0.93489,-0.0987 -1.85534,-0.0613 -2.15039,0.0859 -0.32073,0.16024 -0.88027,0.1641 -1.17773,0.01 -0.52858,-0.27425 -2.33786,-0.22189 -2.55469,0.0742 -0.13054,0.17826 -1.42316,0.1784 -1.60156,0 -0.27464,-0.27464 -1.8981,-0.34927 -2.51367,-0.11523 -0.34877,0.1326 -3.94897,-0.24711 -6.71875,-0.70899 -7.16198,-1.19432 -14.84134,-3.77208 -19.92969,-6.68945 -2.86952,-1.64522 -4.91935,-3.20267 -8.55078,-6.49805 l -1.61914,-1.46875 0.46094,-0.43164 c 0.25299,-0.23773 1.01582,-1.04164 1.69531,-1.78711 1.37684,-1.51052 2.25462,-2.26758 5.18945,-4.47461 2.16831,-1.63059 3.46176,-2.52262 5.0918,-3.50976 4.23298,-2.56349 10.72217,-5.64552 13.70703,-6.50977 0.44578,-0.12904 0.85092,-0.20394 1.10937,-0.21094 z m 226.91602,0.20118 c 0.14236,-0.002 0.47759,0.11388 1.25391,0.39648 2.96423,1.07907 8.45621,3.64756 11.37695,5.32031 3.80597,2.17972 10.8841,7.52453 12.07031,9.11524 0.21899,0.29367 0.64262,0.76454 0.94141,1.04687 0.28946,0.27351 0.52836,0.55305 0.54297,0.63281 1.2e-4,0.001 0,0.005 0,0.006 0,0.0689 -0.10165,0.16424 -0.22461,0.21094 -0.28948,0.11006 -1.58571,1.42394 -1.91016,1.93555 -0.27278,0.43013 -0.70867,0.79987 -2.58984,2.20508 -3.29359,2.46029 -6.39955,4.39847 -8.83399,5.51171 -5.86346,2.6813 -13.61141,4.76554 -20.57617,5.53516 -1.85099,0.20455 -2.70268,0.2257 -3.5,0.0879 -0.73253,-0.12663 -1.76626,-0.0209 -1.92578,0.19727 -0.0743,0.10165 -0.27661,0.12695 -1.00781,0.12695 -0.78406,0 -0.93686,-0.0209 -1.06836,-0.15234 -0.30805,-0.30804 -1.96649,-0.28582 -2.19727,0.0293 -0.12214,0.16693 -0.77148,0.17167 -0.77148,0.006 0,-0.28161 -1.53287,-0.35753 -2.13477,-0.10547 -0.24044,0.10069 -0.55831,0.0929 -2.38281,-0.0703 -7.34355,-0.6569 -15.08258,-2.40564 -25.10547,-5.66992 -6.0393,-1.96689 -9.8825,-2.99024 -11.22656,-2.99023 -0.24111,0 -0.36675,-0.004 -0.40625,-0.0234 -10e-4,-8e-4 -0.005,-0.004 -0.006,-0.004 l -0.002,-0.002 -0.002,-0.002 v -0.002 l -0.002,-0.002 v -0.002 -0.002 -0.002 -0.002 -0.002 l 0.002,-0.002 v -0.002 c 4.7e-4,-10e-4 10e-4,-0.003 0.002,-0.004 0.0105,-0.0161 0.0367,-0.04 0.0723,-0.0664 0.15055,-0.11161 0.15235,-0.125 0.0195,-0.25976 -0.26408,-0.26801 -1.41201,-0.13231 -1.45898,0.16211 0.0245,-0.0511 0.11617,-0.10933 0.27734,-0.17383 0.21927,-0.0877 0.45888,-0.12588 0.66992,-0.11719 0.21105,0.009 0.39323,0.0651 0.49414,0.16602 0.20187,0.20187 -0.15645,0.34474 -0.79687,0.31836 -0.40413,-0.0167 -0.624,-0.0709 -0.64844,-0.15039 -0.0179,0.0642 -0.12098,0.074 -0.38867,0.041 -1.09636,-0.13506 -1.91701,-0.41262 -2.38086,-0.80468 -0.29227,-0.24706 -0.4826,-0.74281 -0.4043,-1.05469 0.0277,-0.11028 0.61486,-0.77105 1.30469,-1.4668 0.12463,-0.12569 0.14425,-0.16675 0.26367,-0.29101 -0.71662,0.74194 -1.39919,1.3457 -1.55273,1.3457 -0.004,0 -0.0105,-10e-4 -0.0137,-0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 c -5.8e-4,-7.3e-4 -0.003,-0.005 -0.004,-0.006 v -0.002 c -0.0319,-0.11908 0.44673,-0.75086 1.15235,-1.50195 0.77248,-0.82227 1.53953,-1.49862 1.72265,-1.51953 h 0.002 0.002 c 0.001,4e-5 0.003,0 0.004,0 h 0.002 c 0.003,4.7e-4 0.006,0.002 0.008,0.002 0.001,2.5e-4 0.005,0.002 0.006,0.002 9e-4,4.1e-4 0.005,0.003 0.006,0.004 h 0.002 c 8.2e-4,10e-4 0.004,0.005 0.004,0.006 v 0.002 l 0.002,0.002 c 0.024,0.0895 -0.29581,0.50973 -0.72851,1.01172 0.19169,-0.21671 0.54776,-0.57857 0.59375,-0.65625 0.11913,-0.20124 0.26927,-0.34861 0.35546,-0.34961 0.18962,-0.003 0.91037,-0.68371 1.32422,-1.25 0.35745,-0.48912 0.62679,-0.73262 2.96289,-2.6875 3.7168,-3.11027 6.72849,-5.30106 9.85743,-7.17383 4.49677,-2.69145 11.73519,-6.30468 12.63086,-6.30468 0.13956,0 0.15316,0.0384 0.10546,0.29297 -0.0734,0.39137 -0.4911,1.47515 -1.09179,2.83007 -0.61394,1.38479 -0.86882,2.08504 -1.125,3.10157 -0.28224,1.11995 -0.4566,2.19026 -0.5293,3.2539 -0.0348,0.50822 -0.0542,0.72782 -0.0859,0.76953 l -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 -0.002 l -0.002,0.002 h -0.002 -0.002 v -0.002 h -0.002 -0.002 l -0.002,-0.002 c -0.0131,-0.0117 -0.0304,-0.0444 -0.0488,-0.0879 -0.0737,-0.17473 -0.14031,-0.25143 -0.19141,-0.23633 -0.0987,0.0379 -0.15234,0.43332 -0.15234,1.16211 0,0.42921 0.0216,0.86321 0.0488,0.96484 0.0803,0.29959 0.261,0.21398 0.3457,-0.16406 0.029,-0.12974 0.0486,-0.21277 0.0605,-0.23437 l 0.002,-0.002 v -0.002 h 0.002 0.002 v 0.002 h 0.002 v 0.002 c 0.0106,0.0254 0.0136,0.16288 0.0176,0.43554 0.0123,0.76978 0.22344,2.31614 0.46875,3.4336 0.69997,3.18869 2.41828,6.64648 4.29492,8.64453 0.14766,0.1572 0.22166,0.25646 0.22266,0.28906 v 0.002 l -0.002,0.002 v 0.002 l -0.002,0.002 h -0.002 v 0.002 h -0.002 -0.002 c -9.8e-4,1.7e-4 -0.003,-4e-5 -0.004,0 -0.039,-0.003 -0.1522,-0.0714 -0.33008,-0.20703 -0.12054,-0.0919 -0.24009,-0.15575 -0.30078,-0.16797 0.107,0.0573 0.3385,0.23035 0.69726,0.51172 0.58472,0.45858 1.0625,0.9383 1.0625,1.06445 0,0.5 -0.49934,0.17796 -1.29297,-0.83398 -0.26795,-0.34167 -0.43873,-0.56673 -0.5039,-0.67969 0.0942,0.31887 1.26165,1.67195 1.55078,1.76367 0.20187,0.0641 0.33347,-0.0963 0.26367,-0.32031 -0.003,-0.01 -0.004,-0.0194 -0.004,-0.0254 l 0.002,-0.002 c 4.5e-4,-10e-4 0.002,-0.005 0.002,-0.006 l 0.002,-0.002 v -0.002 h 0.002 0.002 c 10e-4,-4.6e-4 0.004,-0.002 0.004,-0.002 h 0.002 c 0.0476,-0.006 0.2025,0.0922 0.46289,0.29493 2.77027,2.15666 6.54417,3.85855 10.0918,4.55273 0.789,0.1544 1.22242,0.1855 2.6289,0.1875 2.63383,0.003 4.87924,-0.4075 7.45899,-1.36133 6.68548,-2.47186 11.23005,-8.22441 12.39062,-15.68164 0.18222,-1.17098 0.20579,-4.17426 0.041,-5.29687 -0.3137,-2.13764 -0.80633,-3.72043 -1.89649,-6.08008 -0.91563,-1.98188 -0.88594,-1.87581 -0.62695,-2.1836 0.11624,-0.13815 0.21094,-0.3243 0.21094,-0.4121 0,-0.0746 0.0162,-0.11815 0.10156,-0.11914 z m -10.69922,2.75585 c 1.1829,0.0426 2.23835,0.49407 3.09766,1.32422 0.91503,0.88398 1.49439,2.10384 1.60156,3.375 0.0214,0.25346 0.009,0.75004 -0.0234,0.98633 -0.0487,0.35244 -0.13748,0.69434 -0.26367,1.01758 -0.068,0.17403 -0.25866,0.55758 -0.28906,0.58398 h -0.002 -0.002 c -4.6e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 v -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 -0.002 -0.002 c -0.0503,-0.005 -0.20513,0.10097 -0.56054,0.37695 -0.65761,0.51068 -1.1006,0.92144 -1.22852,1.14063 -0.0332,0.0578 -0.0383,0.0795 -0.0312,0.13477 l 0.008,0.0664 -0.25781,0.125 c -0.51588,0.24928 -0.98115,0.39231 -1.53711,0.4707 -0.1927,0.0275 -0.82545,0.0391 -1.02344,0.0195 -0.63913,-0.0634 -1.30571,-0.26818 -1.86718,-0.57422 -0.11177,-0.0609 -0.15507,-0.087 -0.16797,-0.10742 -3.3e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 v -0.002 c -4.8e-4,-10e-4 -0.002,-0.003 -0.002,-0.004 v -0.002 c 0,-9.2e-4 -1.4e-4,-0.003 0,-0.004 4.2e-4,-0.002 0.002,-0.008 0.002,-0.01 0.0211,-0.14876 -0.45954,-0.62413 -1.24805,-1.23633 -0.14676,-0.11393 -0.30496,-0.23477 -0.35156,-0.26757 -0.0705,-0.0496 -0.10009,-0.0841 -0.17579,-0.21094 -0.25207,-0.42236 -0.41555,-0.80817 -0.53125,-1.25391 -0.29933,-1.15309 -0.11863,-2.31748 0.52149,-3.3789 0.0664,-0.11006 0.0787,-0.12396 0.11914,-0.12696 0.21719,-0.0165 0.64629,-0.43293 1.24805,-1.21094 0.1135,-0.14674 0.23357,-0.3018 0.26757,-0.3457 0.0477,-0.0615 0.099,-0.10253 0.21875,-0.17383 0.82036,-0.48792 1.66912,-0.72316 2.49805,-0.69336 z m -206.26367,0.16797 c 0.17081,10e-4 0.34385,0.009 0.45312,0.0215 0.52493,0.0621 0.96899,0.19604 1.44532,0.43359 0.45866,0.22873 0.84912,0.51136 1.23437,0.89649 0.66319,0.663 1.2088,1.58281 1.39844,2.35546 0.32761,1.33477 -0.0255,2.90973 -0.91992,4.09961 -0.72829,0.96884 -1.77585,1.59973 -2.94922,1.7793 -0.26347,0.0403 -0.83719,0.0504 -1.10938,0.0195 h -0.002 c -1.35028,-0.1534 -2.68,-0.90348 -3.56641,-2.01172 -0.45263,-0.5659 -0.79296,-1.2398 -0.9414,-1.86133 -0.0247,-0.10272 -0.0262,-0.12042 -0.008,-0.14062 0.0361,-0.0399 0.10661,-0.2084 0.13671,-0.32812 0.11702,-0.4657 0.083,-1.04423 -0.082,-1.39844 l -0.0371,-0.0781 0.0332,-0.11133 c 0.0958,-0.3258 0.29813,-0.75939 0.49414,-1.05859 0.41262,-0.62986 1.01137,-1.25556 1.61133,-1.68359 0.72648,-0.5183 1.5296,-0.82977 2.36132,-0.91797 0.10782,-0.0116 0.27646,-0.0166 0.44727,-0.0156 z m 132.2207,0.41016 c -0.59308,4.46427 -0.70408,8.52984 -0.37109,11.91016 -0.3143,-3.48426 -0.18009,-7.6196 0.37109,-11.91016 z m -89.11523,2.88281 c 0.0925,0.0868 0.18032,0.16971 0.26562,0.25 -0.0606,-0.0997 -0.15082,-0.18482 -0.26562,-0.25 z m 158.4043,0.44531 c -0.0207,0.005 -0.0392,0.0284 -0.0586,0.0664 -0.12869,0.2523 -0.13914,1.39764 -0.0156,1.72266 0.0348,0.0914 0.0999,0.12196 0.14843,0.0684 0.0854,-0.0944 0.17538,-0.41043 0.20118,-0.71289 0.0361,-0.42363 -0.0556,-0.93801 -0.19532,-1.09961 -0.0287,-0.0332 -0.0537,-0.0479 -0.0762,-0.0449 -0.001,2.1e-4 -0.003,-3.5e-4 -0.004,0 z m -40.50782,1.17579 c -0.40926,0.14404 -0.83601,0.43089 -1.125,0.78711 -0.30581,0.37693 -0.48138,0.60681 -0.52539,0.71289 0.0146,-0.0135 0.0294,-0.0269 0.0449,-0.041 0.52453,-0.47945 1.06101,-0.96606 1.60547,-1.45898 z m -174.5,2.24804 -0.002,0.002 h -0.002 c -0.001,4.5e-4 -0.005,0.002 -0.006,0.002 -0.0176,0.0104 -0.0374,0.0414 -0.0645,0.0898 -0.0988,0.17656 -0.1264,2.54229 -0.0332,2.82422 0.10057,0.30421 0.19642,0.21265 0.30078,-0.28711 0.11352,-0.5434 0.0604,-2.06099 -0.0859,-2.44336 -0.0404,-0.10569 -0.0687,-0.16639 -0.0918,-0.18359 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 c -10e-4,-1.2e-4 -0.005,4e-5 -0.006,0 z m 40.00196,0.76563 c 0.0579,-0.006 0.12823,0.0883 0.20703,0.28515 0.1755,0.43855 0.15307,0.9622 -0.0488,1.16407 -0.2019,0.20187 -0.34466,-0.15842 -0.31836,-0.79883 0.0172,-0.42021 0.0754,-0.64125 0.16016,-0.65039 z m 130.2832,0.39844 c -0.17862,0.0167 -0.80117,0.55702 -1.39649,1.21484 -0.27964,0.309 -0.50375,0.59164 -0.65039,0.80664 l 2.09375,-1.99219 c -7.3e-4,-0.004 -0.003,-0.009 -0.004,-0.0117 -5.4e-4,-9.1e-4 -0.003,-0.005 -0.004,-0.006 l -0.002,-0.002 -0.002,-0.002 c -8.2e-4,-6.2e-4 -0.005,-0.003 -0.006,-0.004 -9.8e-4,-4.7e-4 -0.005,-0.002 -0.006,-0.002 -0.004,-0.001 -0.01,-0.002 -0.0156,-0.002 -0.003,0 -0.005,-2.8e-4 -0.008,0 z m 0.043,0.0801 -2.15235,2.32617 c 0.23985,-0.11171 0.79141,-0.60481 1.32227,-1.1914 0.46657,-0.51556 0.78502,-0.95912 0.83008,-1.13477 z m -3.93164,3.69141 c -0.32513,0.28367 -0.65934,0.59284 -0.96289,0.90625 0.24039,-0.22085 0.47537,-0.44178 0.70703,-0.66211 z m -11.94727,9.07226 c -1.54152,0.80886 -2.67562,1.12801 -3.66016,1.04493 0.48111,0.0504 0.99142,0.0119 1.5293,-0.12305 0.54282,-0.13624 1.27238,-0.45728 2.13086,-0.92188 z m -71.12695,0.48438 c -0.0324,0.0136 -0.065,0.0266 -0.0977,0.0391 -0.2578,0.098 -0.48144,0.18321 -0.68164,0.25391 0.2703,-0.0689 0.5296,-0.16747 0.7793,-0.29297 z m 87.01172,1.32031 c 0.66066,0.001 1.29942,0.0363 1.75586,0.10547 0.19969,0.0303 0.3155,0.0611 0.34961,0.0879 10e-4,9.5e-4 0.005,0.005 0.006,0.006 v 0.002 l 0.002,0.002 v 0.002 0.002 0.002 0.002 0.002 0.002 l -0.002,0.002 -0.002,0.002 -0.002,0.002 c -0.0857,0.079 -0.94199,0.13323 -2.33594,0.13086 -1.31564,-0.002 -2.09216,-0.0548 -2.16015,-0.12696 l -0.002,-0.002 v -0.002 -0.002 h -0.002 v -0.002 -0.002 l 0.002,-0.002 v -0.002 -0.002 h 0.002 c 6.1e-4,-9e-4 0.003,-0.005 0.004,-0.006 0.0355,-0.032 0.19754,-0.0666 0.4961,-0.10352 0.54595,-0.0676 1.228,-0.10071 1.88867,-0.0996 z m 6.21875,12.02735 c -0.2874,0.0141 -0.47997,0.11936 -0.62891,0.29882 -0.86879,1.04684 -0.39755,1.41706 5.72266,4.47657 8.53274,4.26554 20.8536,7.93809 29.76953,8.87695 5.22156,0.54983 18.00092,-0.22526 24.09375,-1.46289 6.48619,-1.31753 7.90271,-1.94691 6.81836,-3.03125 -0.41792,-0.41792 -2.17373,-0.27127 -5.4375,0.45508 -3.77463,0.84004 -7.58737,1.07055 -17.57813,1.06445 -11.21741,-0.007 -13.41715,-0.17454 -18.22461,-1.38281 -6.85984,-1.72409 -12.50231,-3.83091 -19.23242,-7.1836 -2.93509,-1.46216 -4.38029,-2.08104 -5.17383,-2.11132 -0.0451,-0.002 -0.0879,-0.002 -0.1289,0 z m -120.05664,0.37304 c -1.0432,-0.0235 -3.02145,0.72857 -6.15625,2.30078 -6.7546,3.3877 -15.50366,6.20854 -23.16016,7.46485 -7.2157,1.18398 -24.91295,0.83405 -31.12695,-0.61524 -2.1719,-0.50653 -4.28943,-0.93163 -4.70703,-0.94336 -1.3056,-0.0367 -0.82858,1.80568 0.60742,2.34571 1.35,0.5077 10.91085,2.25064 15.03515,2.74023 4.0839,0.48478 16.74864,-0.19418 21.80664,-1.16797 2.8045,-0.53992 7.8793,-1.89211 11.2793,-3.00586 6.7237,-2.20252 17.33789,-7.25181 17.33789,-8.24804 0,-0.56285 -0.29011,-0.857 -0.91601,-0.8711 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
       </g>

            <!-- 5. HIDUNG -->
            <g id="svg-hidung" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Hidung')" onmouseenter="hoverKepala('Hidung')" onmouseleave="unhoverKepala('Hidung')">
                <path
       id="path115"
       style="fill:#f2b492;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.49805,936.6875 -56.6914,0.23242 z m -1.81054,1.91602 c -0.0351,-0.035 -44.10494,0.13755 -48.38282,0.18945 l -3.52148,0.043 0.4043,0.90039 c 0.53449,1.18865 1.71352,4.16154 2.32812,5.86719 2.00263,5.55771 3.26739,10.41774 4.25,16.3496 0.74208,4.47988 1.04254,7.36841 1.25586,12.05274 0.15308,3.3616 0.12538,15.2214 -0.043,18.60352 l -0.0352,0.74023 h 18.45507 18.45704 l -0.0352,-0.45117 c -0.0444,-0.56539 -0.12776,-2.21317 -0.22266,-4.42774 -0.10057,-2.34639 -0.10064,-12.70258 0,-14.90039 0.54939,-11.99713 1.91912,-20.90882 4.25586,-27.70508 0.71098,-2.06781 1.84786,-4.98602 2.56446,-6.58007 0.16201,-0.36043 0.28323,-0.66794 0.26953,-0.68164 z m -43.6875,54.90234 -0.043,0.43164 c -0.0241,0.23719 -0.0657,1.02321 -0.0918,1.74609 -0.11046,3.06528 -0.46773,8.51701 -0.78516,11.99221 -0.31204,3.4161 -0.74171,6.8464 -1.23828,9.8672 l -0.006,0.035 -1.87109,0.1192 -0.0664,1.0097 -0.12109,-0.2363 c 0,0 -3.4856,18.8208 -21.25977,26.0234 l 0.48633,0.3418 -1.21875,2.8457 c 0,0 0.0218,0.059 0.0606,0.1602 -0.14285,0.2372 -0.30227,0.5037 -0.46875,0.7832 -3.32173,5.5767 -5.26551,11.2063 -6.01367,17.416 -0.16092,1.3359 -0.13872,4.7575 0.0391,5.9414 0.18369,1.2233 0.35634,1.7029 0.66211,1.8496 0.21283,0.1021 0.32578,0.074 1.51758,-0.3828 1.42905,-0.5477 2.18924,-0.7875 3.70898,-1.168 6.18457,-1.5471 15.11853,-2.2755 19.5918,-1.5976 1.23681,0.1874 2.1003,0.4508 8.75,2.6719 3.36591,1.1243 6.57968,2.1557 7.14258,2.2929 1.27051,0.3096 2.49607,0.4933 3.84961,0.5743 v 0 c 1.54375,0.097 8.44292,0.1007 10.24414,0.01 3.37131,-0.1703 4.84542,-0.5203 10.92578,-2.5898 4.92857,-1.6775 6.42212,-2.106 8.51562,-2.4395 1.00823,-0.161 1.49697,-0.176 6.39063,-0.209 8.43468,-0.057 9.75799,0.082 14.82812,1.5625 1.8554,0.5417 3.32382,0.8786 4.0625,0.9336 l 0.53711,0.041 0.17969,-0.3964 c 1.49367,-3.2969 -0.39312,-13.5033 -3.92383,-21.2344 -0.55377,-1.2126 -0.67341,-1.4372 -2.03125,-3.8262 -0.0805,-0.1417 -0.15511,-0.2721 -0.22461,-0.3926 0.18504,-0.1006 0.29102,-0.1601 0.29102,-0.1601 l -1.01953,-3.0567 0.82617,-0.1992 c -18.58736,-7.435 -21.02734,-24.6289 -21.02735,-24.6289 l -0.21484,0.7402 -0.58008,-4.4003 -1.16992,0.4961 c -0.66968,-4.661 -1.44595,-11.1888 -1.82422,-15.3223 -0.24372,-2.66341 -0.53671,-6.59681 -0.53711,-7.209 v -0.43164 h -18.43554 z m -8.92774,54.79104 c -0.18217,1.3533 -0.30104,2.7886 -0.37695,4.4219 -0.19136,4.1173 0.0791,5.28 2.57031,11.0839 0.4512,1.0511 0.80922,1.9919 0.79492,2.0879 -0.0823,0.5531 -1.25357,0.7168 -1.99804,0.2793 -2.06298,-1.2125 -4.07736,-6.0458 -4.60743,-11.0547 -0.1824,-1.7236 -0.11485,-3.67 0.19922,-5.7988 z m 57.45313,4.4179 c 0.0221,1.1285 -0.008,2.2057 -0.0996,3.0586 -0.47371,4.4301 -2.29795,9.1843 -3.79883,9.8965 -0.42562,0.2019 -1.55759,0.1522 -1.72461,-0.076 -0.18857,-0.2581 -0.14331,-0.467 0.42773,-1.9551 1.18593,-3.0902 1.73268,-5.1776 2.04493,-7.8242 0.0592,-0.5022 0.0983,-1.2753 0.11523,-2.1036 1.00545,-0.3311 2.03174,-0.6678 3.03516,-0.9961 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       id="path108"
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:0.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.76562,936.38477 c -0.0854,0.003 -0.14603,0.0448 -0.23438,0.13867 -0.89326,0.94959 -3.76125,8.04299 -4.91016,12.14453 -2.90965,10.38727 -4.08158,25.73615 -3.2539,42.62109 0.37367,7.62291 1.03672,14.34764 2.38476,24.23244 0.54035,3.9622 0.79802,5.1256 1.23438,5.5644 0.21181,0.2129 0.33207,0.2676 0.5957,0.2676 0.41736,0 0.79849,-0.3015 0.91602,-0.7246 0.18999,-0.6841 0.0447,-2.5369 -0.61133,-7.7773 -0.52834,-4.2203 -0.68101,-5.8766 -0.94531,-10.3496 -0.66525,-11.25883 -0.86798,-29.42082 -0.41016,-36.75981 0.14337,-2.29832 0.51022,-5.21898 1.11328,-8.87305 0.84357,-5.11139 1.76601,-8.85042 3.44141,-13.95508 1.61113,-4.90883 1.78951,-6.23325 0.87304,-6.49609 -0.0807,-0.0232 -0.14213,-0.0351 -0.19335,-0.0332 z m -55.5,0.13476 c -0.0801,0.006 -0.15771,0.0295 -0.23438,0.0703 -0.40849,0.21764 -0.53088,0.53257 -0.48828,1.26368 0.0462,0.79343 0.27967,1.54794 1.3457,4.35351 2.28474,6.01299 3.77294,11.54771 4.9082,18.25586 2.44455,14.44442 2.41874,32.14267 -0.0781,52.01952 -0.66861,5.3219 -0.89841,8.3628 -0.67188,8.8946 0.0885,0.2076 0.22191,0.3497 0.40235,0.4277 0.36897,0.1606 0.52945,0.1516 0.94336,-0.049 0.63847,-0.309 1.12987,-1.0683 1.41015,-2.1758 1.67334,-6.612 2.93259,-24.4729 2.7754,-39.38089 -0.0897,-8.50402 -0.36994,-12.16146 -1.41602,-18.44141 -1.15607,-6.94023 -2.78313,-12.69509 -5.54688,-19.61719 -1.61535,-4.04581 -2.57529,-5.67526 -3.3496,-5.62109 z m 53.78124,100.06057 c -0.0403,5e-4 -0.09,0 -0.15039,0.01 -0.40639,0.021 -0.50639,0.1091 -0.52929,0.4668 -0.0348,0.5422 0.16132,1.4089 1.45898,6.4825 0.67567,2.6417 1.01618,4.5051 1.25,6.8242 0.095,0.9397 0.14072,2.4398 0.10352,3.4375 -0.0598,1.6039 -0.1995,2.7983 -0.49805,4.2988 -0.37665,1.893 -0.9472,3.7444 -1.83984,5.959 -0.19637,0.4872 -0.37253,0.955 -0.39063,1.041 -0.0714,0.3378 0.0687,0.515 0.46094,0.584 v 0 c 0.19883,0.037 0.70597,0.036 0.87891,0 0.0847,-0.017 0.25129,-0.079 0.37109,-0.1367 0.55523,-0.2682 1.13156,-1.0846 1.75781,-2.4883 1.04402,-2.3402 1.69804,-4.8282 1.94336,-7.3925 0.1869,-1.9536 0.14689,-4.0408 -0.11719,-6.1856 -0.6053,-4.9161 -2.60576,-11.0595 -4.09179,-12.5625 -0.11232,-0.1136 -0.26615,-0.2364 -0.34375,-0.2734 -0.0935,-0.047 -0.14286,-0.06 -0.26368,-0.059 z m -49.94921,0.045 c -0.0404,-10e-4 -0.0873,7e-4 -0.13868,0 -0.27143,0 -0.64653,0.097 -0.91601,0.2285 -1.40271,0.6826 -3.42546,5.6265 -4.4668,10.9199 -0.54759,2.7836 -0.70002,4.9801 -0.49609,7.1308 0.51647,5.4473 2.91634,10.8208 5.07812,11.3731 0.20517,0.052 0.73963,0.033 0.94532,-0.035 0.0899,-0.03 0.20427,-0.098 0.26757,-0.1582 0.1004,-0.096 0.11133,-0.1197 0.11133,-0.2539 0,-0.1269 -0.0556,-0.2736 -0.38086,-1.0136 -2.68655,-6.1122 -3.09081,-7.5512 -3.03711,-10.7989 0.0638,-3.8635 0.512,-7.3385 1.34375,-10.4101 0.20937,-0.7731 0.34837,-1.2151 0.77149,-2.4707 0.66923,-1.9859 1.09714,-3.4757 1.18554,-4.1211 0.0425,-0.3103 0.0155,-0.3856 -0.26757,-0.3926 z m 67.60351,6.9668 c -0.18797,0.01 -0.32215,0.1109 -0.39062,0.3184 -0.18788,0.5693 0.31987,1.7669 1.87109,4.4082 0.69796,1.1885 1.05414,1.8468 1.52149,2.8125 2.54869,5.2665 4.44701,12.222 4.74023,17.3691 0.0955,1.6769 0.0141,2.8889 -0.27539,4.1211 -0.1016,0.4326 -0.10356,0.4661 -0.0391,0.5371 0.10126,0.1119 0.0866,0.4927 -0.0352,0.9473 -0.37903,1.4148 -1.62808,4.0199 -2.71289,5.6543 -0.42206,0.6358 -0.76937,1.0549 -1.25391,1.5156 -1.7514,1.6653 -4.11,2.9895 -6.97851,3.918 -1.26709,0.4101 -2.14927,0.6162 -4.26172,0.9941 -2.37244,0.4245 -3.21154,0.7206 -3.5,1.2344 -0.0895,0.1594 -0.10352,0.2322 -0.10352,0.5722 0,0.3358 0.0143,0.4121 0.0957,0.543 0.15814,0.2543 0.47155,0.365 1.28125,0.459 v 0 c 0.0791,0.01 0.89174,0.01 1.80664,0 1.71223,-0.016 2.49014,-0.064 3.55664,-0.2226 4.52437,-0.6724 8.37186,-2.8401 11.49804,-6.4785 0.64031,-0.7452 1.04067,-1.2716 1.91211,-2.5117 0.37505,-0.5337 0.70121,-0.9629 0.72461,-0.9629 0.0234,0 0.17281,-0.3822 0.33203,-0.8614 0.77934,-2.3455 1.22596,-4.6843 1.4043,-7.3554 0.0554,-0.8298 0.0555,-3.2193 0,-4.0508 -0.28,-4.1953 -1.22758,-8.1561 -2.88086,-12.0352 -0.418,-0.9807 -1.25777,-2.6857 -1.73633,-3.5273 -2.28189,-4.0127 -5.42745,-7.4498 -6.57617,-7.4004 z m -86.58789,0.4219 c -0.17356,0 -0.36894,0.06 -0.60156,0.1718 -1.75288,0.844 -4.65333,4.6513 -6.70117,8.795 -2.18447,4.4202 -3.46127,9.0191 -3.80664,13.7168 -0.0655,0.8913 -0.0638,3.2193 0.002,4.0468 0.19748,2.4855 0.65485,4.598 1.42187,6.5704 0.11859,0.305 0.41336,0.9804 0.65625,1.5 0.55856,1.1948 0.91063,1.9786 1.21485,2.7089 0.2337,0.561 0.24314,0.5766 0.3789,0.5996 0.25547,0.043 1.01897,0.5788 1.98047,1.3907 0.27108,0.2289 0.70506,0.5883 0.96485,0.7988 1.49965,1.2152 4.0816,2.7393 5.77148,3.4063 2.1978,0.8675 5.3074,1.5217 7.74219,1.6289 v 0 c 0.35014,0.017 0.71038,0.028 0.80078,0.018 0.0904,-0.01 0.35851,-0.02 0.5957,-0.031 0.49027,-0.024 1.00267,-0.1422 1.25,-0.2871 0.19083,-0.1119 0.32748,-0.3268 0.39258,-0.6172 0.0891,-0.3976 -0.13059,-0.8224 -0.5957,-1.1543 -0.72357,-0.5163 -1.82726,-0.8436 -3.65625,-1.0859 -2.03747,-0.27 -4.03391,-0.8535 -5.87305,-1.7168 -3.55294,-1.6678 -6.32528,-4.1827 -7.80078,-7.0742 -0.23634,-0.4632 -1.29687,-2.9432 -1.29687,-3.0332 v 0 h 0.002 v 0 c 0.0217,-0.027 0.20284,-0.1149 0.41992,-0.2012 0.21245,-0.084 0.31304,-0.1271 0.33594,-0.1484 h 0.002 0.002 0.002 v 0 0 h -0.002 -0.002 -0.002 c -0.0115,0 -0.0388,-0.01 -0.0742,-0.01 -0.42297,0 -0.64315,-0.5833 -0.84375,-2.209 -0.14223,-1.1529 -0.1812,-1.9629 -0.1543,-3.2753 0.0347,-1.69 0.16184,-3.0102 0.46094,-4.7793 0.65285,-3.8614 1.99029,-8.0053 3.74023,-11.5899 0.63876,-1.3084 1.04086,-2.0402 1.8711,-3.414 1.70165,-2.8158 2.08789,-3.5791 2.08789,-4.125 0,-0.2663 -0.1206,-0.4293 -0.39258,-0.5332 -0.0934,-0.036 -0.18883,-0.053 -0.29297,-0.051 z m 74.62891,31.498 c -0.75507,-0.01 -1.51343,0.029 -2.02539,0.1094 -2.5047,0.393 -4.57324,1.3015 -7.17188,3.1465 -1.81425,1.2881 -3.55548,2.7964 -6.57031,5.6933 -2.95503,2.8395 -5.75903,5.278 -7.08008,6.1563 -1.07144,0.7123 -2.80583,1.2487 -4.98242,1.543 -1.27868,0.173 -3.79123,0.2158 -5.125,0.088 -3.04913,-0.2924 -5.45384,-1.0429 -7.31836,-2.2871 -1.24808,-0.8329 -2.42186,-1.8737 -5.7793,-5.123 -4.08946,-3.9577 -5.73887,-5.3925 -7.67773,-6.6797 -2.09808,-1.3931 -3.93643,-2.046 -6.37891,-2.2637 -0.88637,-0.083 -4.05604,-0.08 -4.85547,0 -0.81212,0.082 -1.61498,0.285 -2.0625,0.5235 -0.19373,0.1032 -0.53088,0.3537 -0.75,0.5566 -1.64063,1.5189 -1.58939,3.8576 0.1211,5.584 1.31323,1.3255 2.30781,1.5838 7.86523,2.041 3.7143,0.3056 5.45853,0.4906 6.91211,0.7324 1.89231,0.3148 2.59599,0.6135 2.67969,1.1368 0.0438,0.2695 0.17881,0.3662 0.40625,0.2792 0.24225,-0.092 0.44827,-0.019 1.01953,0.3633 0.35946,0.2405 0.9158,0.7348 1.78125,1.5782 2.36502,2.3048 4.35429,3.8288 6.54492,5.0195 2.0516,1.1151 3.5864,1.4708 7.17188,1.6582 v 0 c 0.17571,0.01 0.92147,0.017 1.65625,0.027 3.25204,0.025 6.4026,-0.3024 8.13086,-0.8437 1.58328,-0.4958 4.1692,-2.1951 6.47656,-4.2578 2.59013,-2.3154 4.62914,-3.9123 5.5918,-4.3789 0.81095,-0.393 3.3978,-0.7909 7.02343,-1.0801 5.88876,-0.4696 8.13636,-0.9722 9.62696,-2.1504 0.58393,-0.4616 1.21847,-1.4653 1.43164,-2.2637 0.13208,-0.4929 0.13268,-1.2104 0.002,-1.6562 -0.27679,-0.9437 -1.08313,-1.8009 -2.23828,-2.3809 -0.51679,-0.2595 -1.60765,-0.5906 -2.41406,-0.7324 -0.50471,-0.089 -1.25665,-0.1364 -2.01172,-0.1426 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -999.88297,540.19617 c -3.18893,-0.54096 -8.77383,-2.49349 -17.26933,-6.03759 -3.3214,-1.3856 -8.8567,-3.18507 -12.3007,-3.99883 -7.353,-1.73741 -10.3149,-3.12599 -13.5338,-6.34496 -2.3491,-2.34907 -4.067,-4.88084 -3.3118,-4.88084 0.2182,0 1.3772,0.86084 2.5756,1.91297 1.1983,1.05214 3.6567,2.58964 5.4632,3.41666 3.7116,1.69925 10.6089,2.55398 11.3203,1.40285 0.7635,-1.23537 -0.787,-2.29962 -3.8849,-2.66652 -6.367,-0.75407 -12.2102,-4.6976 -14.2632,-9.62611 l -0.9243,-2.21884 2.3118,-0.92502 c 5.8823,-2.3536 18.8151,-3.71545 24.0816,-2.53583 1.0024,0.22453 5.103,1.54679 9.1126,2.93837 7.1204,2.47124 7.4739,2.52975 15.18771,2.51349 7.71937,-0.0163 8.07585,-0.0771 15.79522,-2.69797 7.80715,-2.65063 7.99155,-2.68125 16.09898,-2.67365 7.03212,0.007 8.9159,0.22667 13.21331,1.54368 2.79364,0.85615 5.01194,1.26263 5.01194,0.91839 0,-0.33968 0.15954,-0.45807 0.35452,-0.26309 0.52516,0.52516 -2.02997,5.9906 -3.57361,7.64397 -2.35876,2.52642 -6.38442,4.4504 -10.90596,5.21225 -3.69221,0.62212 -4.40396,0.93184 -4.40396,1.91639 0,1.05596 0.41938,1.16452 4.15975,1.0768 6.53812,-0.15334 11.75211,-3.05211 15.71412,-8.73642 l 1.04109,-1.49367 -0.65395,2.00038 c -0.92437,2.82757 -6.12563,8.29684 -9.39573,9.87986 -1.51947,0.73556 -5.85383,2.09656 -9.63191,3.02444 -3.94791,0.96958 -10.19213,3.15856 -14.6827,5.14717 -10.66224,4.72168 -15.72308,5.73619 -22.70589,4.55167 z m 12.31351,-8.85155 c 1.71206,-0.58336 4.32451,-2.35022 6.71847,-4.54385 2.15442,-1.97413 4.60806,-3.85202 5.45255,-4.17309 0.84448,-0.32107 3.95254,-0.76001 6.90681,-0.97542 6.52502,-0.47576 9.02874,-1.18554 10.22957,-2.89998 2.39642,-3.42136 -0.48279,-6.49946 -6.0732,-6.49272 -4.82446,0.006 -8.79144,2.25327 -15.44679,8.75124 -3.19881,3.12315 -6.71219,6.13155 -7.80754,6.68533 -3.15833,1.59678 -9.0212,1.89404 -13.22921,0.67075 -3.1934,-0.92837 -4.3044,-1.73081 -9.6847,-6.99525 -7.5533,-7.39065 -10.0283,-8.76069 -15.884,-8.79276 -3.4362,-0.0188 -4.6053,0.21702 -5.6195,1.13353 -1.7292,1.56286 -1.6309,4.073 0.2279,5.81928 1.2812,1.2036 2.4337,1.48871 7.652,1.89292 7.2112,0.55858 9.6724,1.02831 9.6724,1.84603 0,0.3273 0.23,0.45291 0.5112,0.27912 0.2812,-0.17378 1.4431,0.65632 2.5819,1.84467 2.7688,2.88903 6.5515,5.46488 9.1004,6.19692 3.3407,0.95944 11.55678,0.82147 14.69174,-0.24672 z"
       id="path107"
       sodipodi:nodetypes="sssssssssscssssscsssssssscssssssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       id="path114"
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:0.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.76562,936.38477 c -0.0854,0.003 -0.14603,0.0448 -0.23438,0.13867 -0.89326,0.94959 -3.76125,8.04299 -4.91016,12.14453 -2.90965,10.38727 -4.08158,25.73615 -3.2539,42.62109 0.37367,7.62291 1.03672,14.34764 2.38476,24.23244 0.54035,3.9622 0.79802,5.1256 1.23438,5.5644 0.21181,0.2129 0.33207,0.2676 0.5957,0.2676 0.41736,0 0.79849,-0.3015 0.91602,-0.7246 0.18999,-0.6841 0.0447,-2.5369 -0.61133,-7.7773 -0.52834,-4.2203 -0.68101,-5.8766 -0.94531,-10.3496 -0.66525,-11.25883 -0.86798,-29.42082 -0.41016,-36.75981 0.14337,-2.29832 0.51022,-5.21898 1.11328,-8.87305 0.84357,-5.11139 1.76601,-8.85042 3.44141,-13.95508 1.61113,-4.90883 1.78951,-6.23325 0.87304,-6.49609 -0.0807,-0.0232 -0.14213,-0.0351 -0.19335,-0.0332 z m -55.5,0.13476 c -0.0801,0.006 -0.15771,0.0295 -0.23438,0.0703 -0.40849,0.21764 -0.53088,0.53257 -0.48828,1.26368 0.0462,0.79343 0.27967,1.54794 1.3457,4.35351 2.28474,6.01299 3.77294,11.54771 4.9082,18.25586 2.44455,14.44442 2.41874,32.14267 -0.0781,52.01952 -0.66861,5.3219 -0.89841,8.3628 -0.67188,8.8946 0.0885,0.2076 0.22191,0.3497 0.40235,0.4277 0.36897,0.1606 0.52945,0.1516 0.94336,-0.049 0.63847,-0.309 1.12987,-1.0683 1.41015,-2.1758 1.67334,-6.612 2.93259,-24.4729 2.7754,-39.38089 -0.0897,-8.50402 -0.36994,-12.16146 -1.41602,-18.44141 -1.15607,-6.94023 -2.78313,-12.69509 -5.54688,-19.61719 -1.61535,-4.04581 -2.57529,-5.67526 -3.3496,-5.62109 z m 53.78124,100.06057 c -0.0403,5e-4 -0.09,0 -0.15039,0.01 -0.40639,0.021 -0.50639,0.1091 -0.52929,0.4668 -0.0348,0.5422 0.16132,1.4089 1.45898,6.4825 0.67567,2.6417 1.01618,4.5051 1.25,6.8242 0.095,0.9397 0.14072,2.4398 0.10352,3.4375 -0.0598,1.6039 -0.1995,2.7983 -0.49805,4.2988 -0.37665,1.893 -0.9472,3.7444 -1.83984,5.959 -0.19637,0.4872 -0.37253,0.955 -0.39063,1.041 -0.0714,0.3378 0.0687,0.515 0.46094,0.584 v 0 c 0.19883,0.037 0.70597,0.036 0.87891,0 0.0847,-0.017 0.25129,-0.079 0.37109,-0.1367 0.55523,-0.2682 1.13156,-1.0846 1.75781,-2.4883 1.04402,-2.3402 1.69804,-4.8282 1.94336,-7.3925 0.1869,-1.9536 0.14689,-4.0408 -0.11719,-6.1856 -0.6053,-4.9161 -2.60576,-11.0595 -4.09179,-12.5625 -0.11232,-0.1136 -0.26615,-0.2364 -0.34375,-0.2734 -0.0935,-0.047 -0.14286,-0.06 -0.26368,-0.059 z m -49.94921,0.045 c -0.0404,-10e-4 -0.0873,7e-4 -0.13868,0 -0.27143,0 -0.64653,0.097 -0.91601,0.2285 -1.40271,0.6826 -3.42546,5.6265 -4.4668,10.9199 -0.54759,2.7836 -0.70002,4.9801 -0.49609,7.1308 0.51647,5.4473 2.91634,10.8208 5.07812,11.3731 0.20517,0.052 0.73963,0.033 0.94532,-0.035 0.0899,-0.03 0.20427,-0.098 0.26757,-0.1582 0.1004,-0.096 0.11133,-0.1197 0.11133,-0.2539 0,-0.1269 -0.0556,-0.2736 -0.38086,-1.0136 -2.68655,-6.1122 -3.09081,-7.5512 -3.03711,-10.7989 0.0638,-3.8635 0.512,-7.3385 1.34375,-10.4101 0.20937,-0.7731 0.34837,-1.2151 0.77149,-2.4707 0.66923,-1.9859 1.09714,-3.4757 1.18554,-4.1211 0.0425,-0.3103 0.0155,-0.3856 -0.26757,-0.3926 z m 67.60351,6.9668 c -0.18797,0.01 -0.32215,0.1109 -0.39062,0.3184 -0.18788,0.5693 0.31987,1.7669 1.87109,4.4082 0.69796,1.1885 1.05414,1.8468 1.52149,2.8125 2.54869,5.2665 4.44701,12.222 4.74023,17.3691 0.0955,1.6769 0.0141,2.8889 -0.27539,4.1211 -0.1016,0.4326 -0.10356,0.4661 -0.0391,0.5371 0.10126,0.1119 0.0866,0.4927 -0.0352,0.9473 -0.37903,1.4148 -1.62808,4.0199 -2.71289,5.6543 -0.42206,0.6358 -0.76937,1.0549 -1.25391,1.5156 -1.7514,1.6653 -4.11,2.9895 -6.97851,3.918 -1.26709,0.4101 -2.14927,0.6162 -4.26172,0.9941 -2.37244,0.4245 -3.21154,0.7206 -3.5,1.2344 -0.0895,0.1594 -0.10352,0.2322 -0.10352,0.5722 0,0.3358 0.0143,0.4121 0.0957,0.543 0.15814,0.2543 0.47155,0.365 1.28125,0.459 v 0 c 0.0791,0.01 0.89174,0.01 1.80664,0 1.71223,-0.016 2.49014,-0.064 3.55664,-0.2226 4.52437,-0.6724 8.37186,-2.8401 11.49804,-6.4785 0.64031,-0.7452 1.04067,-1.2716 1.91211,-2.5117 0.37505,-0.5337 0.70121,-0.9629 0.72461,-0.9629 0.0234,0 0.17281,-0.3822 0.33203,-0.8614 0.77934,-2.3455 1.22596,-4.6843 1.4043,-7.3554 0.0554,-0.8298 0.0555,-3.2193 0,-4.0508 -0.28,-4.1953 -1.22758,-8.1561 -2.88086,-12.0352 -0.418,-0.9807 -1.25777,-2.6857 -1.73633,-3.5273 -2.28189,-4.0127 -5.42745,-7.4498 -6.57617,-7.4004 z m -86.58789,0.4219 c -0.17356,0 -0.36894,0.06 -0.60156,0.1718 -1.75288,0.844 -4.65333,4.6513 -6.70117,8.795 -2.18447,4.4202 -3.46127,9.0191 -3.80664,13.7168 -0.0655,0.8913 -0.0638,3.2193 0.002,4.0468 0.19748,2.4855 0.65485,4.598 1.42187,6.5704 0.11859,0.305 0.41336,0.9804 0.65625,1.5 0.55856,1.1948 0.91063,1.9786 1.21485,2.7089 0.2337,0.561 0.24314,0.5766 0.3789,0.5996 0.25547,0.043 1.01897,0.5788 1.98047,1.3907 0.27108,0.2289 0.70506,0.5883 0.96485,0.7988 1.49965,1.2152 4.0816,2.7393 5.77148,3.4063 2.1978,0.8675 5.3074,1.5217 7.74219,1.6289 v 0 c 0.35014,0.017 0.71038,0.028 0.80078,0.018 0.0904,-0.01 0.35851,-0.02 0.5957,-0.031 0.49027,-0.024 1.00267,-0.1422 1.25,-0.2871 0.19083,-0.1119 0.32748,-0.3268 0.39258,-0.6172 0.0891,-0.3976 -0.13059,-0.8224 -0.5957,-1.1543 -0.72357,-0.5163 -1.82726,-0.8436 -3.65625,-1.0859 -2.03747,-0.27 -4.03391,-0.8535 -5.87305,-1.7168 -3.55294,-1.6678 -6.32528,-4.1827 -7.80078,-7.0742 -0.23634,-0.4632 -1.29687,-2.9432 -1.29687,-3.0332 v 0 h 0.002 v 0 c 0.0217,-0.027 0.20284,-0.1149 0.41992,-0.2012 0.21245,-0.084 0.31304,-0.1271 0.33594,-0.1484 h 0.002 0.002 0.002 v 0 0 h -0.002 -0.002 -0.002 c -0.0115,0 -0.0388,-0.01 -0.0742,-0.01 -0.42297,0 -0.64315,-0.5833 -0.84375,-2.209 -0.14223,-1.1529 -0.1812,-1.9629 -0.1543,-3.2753 0.0347,-1.69 0.16184,-3.0102 0.46094,-4.7793 0.65285,-3.8614 1.99029,-8.0053 3.74023,-11.5899 0.63876,-1.3084 1.04086,-2.0402 1.8711,-3.414 1.70165,-2.8158 2.08789,-3.5791 2.08789,-4.125 0,-0.2663 -0.1206,-0.4293 -0.39258,-0.5332 -0.0934,-0.036 -0.18883,-0.053 -0.29297,-0.051 z m 74.62891,31.498 c -0.75507,-0.01 -1.51343,0.029 -2.02539,0.1094 -2.5047,0.393 -4.57324,1.3015 -7.17188,3.1465 -1.81425,1.2881 -3.55548,2.7964 -6.57031,5.6933 -2.95503,2.8395 -5.75903,5.278 -7.08008,6.1563 -1.07144,0.7123 -2.80583,1.2487 -4.98242,1.543 -1.27868,0.173 -3.79123,0.2158 -5.125,0.088 -3.04913,-0.2924 -5.45384,-1.0429 -7.31836,-2.2871 -1.24808,-0.8329 -2.42186,-1.8737 -5.7793,-5.123 -4.08946,-3.9577 -5.73887,-5.3925 -7.67773,-6.6797 -2.09808,-1.3931 -3.93643,-2.046 -6.37891,-2.2637 -0.88637,-0.083 -4.05604,-0.08 -4.85547,0 -0.81212,0.082 -1.61498,0.285 -2.0625,0.5235 -0.19373,0.1032 -0.53088,0.3537 -0.75,0.5566 -1.64063,1.5189 -1.58939,3.8576 0.1211,5.584 1.31323,1.3255 2.30781,1.5838 7.86523,2.041 3.7143,0.3056 5.45853,0.4906 6.91211,0.7324 1.89231,0.3148 2.59599,0.6135 2.67969,1.1368 0.0438,0.2695 0.17881,0.3662 0.40625,0.2792 0.24225,-0.092 0.44827,-0.019 1.01953,0.3633 0.35946,0.2405 0.9158,0.7348 1.78125,1.5782 2.36502,2.3048 4.35429,3.8288 6.54492,5.0195 2.0516,1.1151 3.5864,1.4708 7.17188,1.6582 v 0 c 0.17571,0.01 0.92147,0.017 1.65625,0.027 3.25204,0.025 6.4026,-0.3024 8.13086,-0.8437 1.58328,-0.4958 4.1692,-2.1951 6.47656,-4.2578 2.59013,-2.3154 4.62914,-3.9123 5.5918,-4.3789 0.81095,-0.393 3.3978,-0.7909 7.02343,-1.0801 5.88876,-0.4696 8.13636,-0.9722 9.62696,-2.1504 0.58393,-0.4616 1.21847,-1.4653 1.43164,-2.2637 0.13208,-0.4929 0.13268,-1.2104 0.002,-1.6562 -0.27679,-0.9437 -1.08313,-1.8009 -2.23828,-2.3809 -0.51679,-0.2595 -1.60765,-0.5906 -2.41406,-0.7324 -0.50471,-0.089 -1.25665,-0.1364 -2.01172,-0.1426 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /></g>

            <!-- 6. MULUT & BIBIR -->
            <g id="svg-mulut" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Mulut')" onmouseenter="hoverKepala('Mulut')" onmouseleave="unhoverKepala('Mulut')">
                <path
       id="path91"
       style="display:inline;fill:#dc5d57;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.88639;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m 282.42303,487.09606 c -1.14583,-0.0919 -3.86274,0.0308 -5.52107,0.24924 -9.21668,1.21564 -21.73343,6.74045 -37.00935,16.33287 -3.95463,2.48329 -8.15785,5.37397 -10.95448,7.5356 -1.90222,1.47033 -3.56497,3.11818 -3.56497,3.53401 0,0.19089 1.2918,-0.21254 3.78328,-1.18088 5.48983,-2.13382 16.31738,-5.71878 22.95229,-7.6009 12.43617,-3.52776 19.04922,-4.2907 32.51275,-3.75227 10.25622,0.41003 18.6397,0.39163 28.77933,-0.0598 2.53924,-0.11626 4.76705,-0.14442 7.41356,-0.10658 3.80239,0.0546 4.86242,0.12629 9.17198,0.62564 3.51522,0.40739 6.79243,0.66912 9.71515,0.77525 3.58098,0.1299 4.56117,0.27177 6.30316,0.90762 0.99763,0.36409 1.85921,0.83149 3.14385,1.70857 1.75307,1.1969 3.65518,2.02222 8.23003,3.57185 1.59447,0.54001 4.9691,1.73427 7.4995,2.65218 4.40204,1.59689 6.84711,2.39027 6.97353,2.26381 0.17662,-0.17655 -0.82214,-1.21573 -2.44082,-2.5405 -6.83486,-5.59373 -19.18426,-13.15116 -29.98943,-18.35255 -7.07743,-3.40692 -13.21886,-5.61916 -16.97228,-6.11244 -1.69769,-0.22336 -6.28679,-0.31805 -8.00314,-0.16501 -1.91285,0.17047 -2.9117,0.45817 -6.13643,1.75847 -5.48853,2.21267 -5.82197,2.2917 -9.63093,2.29126 -3.98431,-5.3e-4 -4.31392,-0.0783 -10.01939,-2.35489 -3.92807,-1.56767 -4.88456,-1.87182 -6.23612,-1.98016 z m 90.61457,34.77483 c -0.2759,-0.009 -1.4228,1.12051 -2.98226,2.93415 -6.03856,7.02253 -12.56054,13.21056 -19.22061,18.23735 -3.38036,2.55132 -6.35608,4.37747 -10.69835,6.56444 -7.35245,3.70299 -15.37088,6.52511 -22.90073,8.05986 -4.51459,0.9202 -9.21279,1.23588 -18.60695,1.23588 -11.07962,0.009 -14.69176,-0.34023 -21.87972,-2.09184 -14.77531,-3.60063 -26.95444,-10.19341 -38.90185,-21.05981 -2.07617,-1.88837 -7.25976,-7.11863 -9.57421,-9.66018 -2.02404,-2.22262 -3.32539,-3.52715 -3.51683,-3.52715 -0.3833,0 0.30673,1.72283 2.65739,6.64524 6.37934,13.35885 12.84894,22.94316 20.67306,30.62539 4.57751,4.49451 8.95583,7.76204 14.37333,10.72418 8.20762,4.48774 18.59703,7.14283 31.00529,7.92574 1.82857,0.11537 11.463,0.0484 13.08588,-0.0911 7.69141,-0.66164 12.58475,-1.60331 18.35257,-3.52891 5.10011,-1.70276 9.21421,-3.56631 13.3248,-6.03499 3.65993,-2.19806 6.162,-4.18104 9.86813,-7.82092 5.11804,-5.02652 10.08679,-11.11599 13.44858,-16.48416 2.49749,-3.98803 5.49194,-9.42361 8.38129,-15.21386 2.30482,-4.61887 3.39425,-7.18207 3.15417,-7.42216 -0.0105,-0.0106 -0.0246,-0.0167 -0.043,-0.0167 z" />
       </g>

            <!-- 7. GIGI -->
            <g id="svg-gigi" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Gigi')" onmouseenter="hoverKepala('Gigi')" onmouseleave="unhoverKepala('Gigi')">
                <path
         id="path92"
         style="display:inline;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         d="m -840.8457,1147.2461 0.002,2.8184 c 0.003,5.4332 0.25618,8.8857 0.77148,10.4843 0.4497,1.3951 1.22763,2.4959 2.36329,3.3496 0.87175,0.6553 1.83759,0.9737 3.36914,1.1094 0.60699,0.054 2.38937,0.1033 3.96093,0.1133 2.40888,0.014 2.91442,-0.013 3.22852,-0.1699 0.27286,-0.136 0.5043,-0.1627 0.86133,-0.098 0.77989,0.1411 4.02364,0.1064 4.74804,-0.051 0.8471,-0.1837 1.44275,-0.5897 2.24219,-1.5273 1.3689,-1.6056 1.38792,-1.723 1.29102,-8.3477 -0.0424,-2.8994 -0.10813,-5.4881 -0.14453,-5.7539 l -0.0645,-0.4843 -3.85156,-0.4336 c -6.58032,-0.7436 -10.65815,-1.0098 -15.54492,-1.0098 z m 46.2539,0.1562 c -2.03622,-0.1473 -7.21197,-0.084 -9.83398,0.1192 -1.27788,0.099 -4.35171,0.3783 -6.83008,0.6191 -4.24755,0.4127 -4.50889,0.4507 -4.55469,0.6719 -0.0472,0.2281 -0.44298,5.5645 -0.58593,7.9023 -0.0391,0.6389 -0.0137,1.7188 0.0566,2.4004 0.20578,1.995 0.66999,3.066 1.8457,4.2676 0.95725,0.9783 1.91264,1.4193 3.54883,1.6328 v 0 c 1.03528,0.1314 6.82312,0.1338 8.7832,0 2.58286,-0.1763 3.34641,-0.4248 5.27539,-1.709 2.2088,-1.4705 3.17901,-2.7122 3.63477,-4.6543 0.17594,-0.7497 0.21093,-1.415 0.21093,-4.0898 0,-1.7571 -0.0451,-4.0666 -0.0996,-5.1309 l -0.0996,-1.9355 z m 4.61328,0.078 c -0.88111,-5e-4 -1.1357,0.035 -1.1875,0.1699 -0.0362,0.094 -0.13063,0.6308 -0.21093,1.1914 -0.16456,1.1491 -0.21468,8.5208 -0.0625,9.2383 0.0508,0.2396 0.16114,0.4355 0.24414,0.4355 0.18777,0 2.04337,-1.3606 4.22461,-3.0976 2.06412,-1.6438 4.93715,-3.7952 6.53711,-4.8946 1.66632,-1.145 2.06175,-1.4873 1.90234,-1.6484 -0.38988,-0.3941 -8.59094,-1.3945 -11.44727,-1.3945 z m -52.53125,0.037 c -0.0264,-0.027 -1.53256,0.01 -3.3457,0.072 -3.86776,0.1399 -6.50625,0.4197 -9.89648,1.0528 -1.35335,0.2528 -2.50093,0.4602 -2.54883,0.4609 -0.13018,0 -0.10084,7.1353 0.0332,8.0762 0.25405,1.783 0.8404,2.8766 2.05274,3.8281 1.36033,1.0677 3.04981,1.6329 5.3789,1.8008 1.19918,0.086 1.40455,0.082 3.1211,-0.059 1.75415,-0.1432 3.29307,-0.7019 4.20898,-1.5293 1.01782,-0.9196 1.25877,-1.9856 1.25977,-5.6094 8e-4,-2.5492 -0.17698,-8.0067 -0.26368,-8.0937 z m -18.02734,2.1679 c -0.64379,0 -7.71107,1.8271 -10.11719,2.6153 -1.52925,0.501 -1.74731,0.6367 -2.02929,1.2578 -0.7745,1.7058 0.41509,5.1602 2.32421,6.7519 0.76234,0.6356 2.02214,1.2087 3.02735,1.377 1.1976,0.2004 2.8799,-0.055 4.00976,-0.6094 0.95586,-0.4694 2.06154,-1.4934 2.4336,-2.2539 0.42158,-0.8616 0.52439,-2.0131 0.52539,-5.8554 7.7e-4,-2.8385 -0.0233,-3.2833 -0.17383,-3.2833 z m -15.33594,4.5411 c -0.30976,0 -0.76019,0.09 -1.48242,0.2773 -3.12146,0.8111 -6.35742,2.1438 -6.35742,2.6191 0,0.2298 0.71271,0.9001 1.29883,1.2208 0.33984,0.1859 1.01102,0.4549 1.49023,0.5976 v 0 c 1.98106,0.5899 4.34784,0.073 5.22852,-1.1426 0.69371,-0.9577 0.93192,-2.6673 0.45508,-3.2735 -0.15392,-0.1954 -0.32305,-0.294 -0.63282,-0.2968 z m 121.37696,0.998 c -0.20449,0.01 -0.20371,0.077 -0.19141,0.3535 0.0174,0.3888 1.19014,2.9528 1.51562,3.3125 0.26418,0.2919 0.54403,0.2569 1.33008,-0.1621 0.71242,-0.3797 1.37696,-1.0192 1.37696,-1.3262 0,-0.3482 -0.3629,-0.8693 -0.79883,-1.1445 -0.60132,-0.3796 -2.35106,-0.9854 -2.95313,-1.0234 -0.12058,-0.01 -0.21113,-0.012 -0.27929,-0.01 z m -117.17383,32.8223 c -0.81392,0.023 -1.50661,0.1596 -2.00977,0.3984 -0.53589,0.2543 -0.5983,0.4507 -0.25976,0.8164 0.80563,0.8701 5.17561,3.8244 7.24609,4.8985 1.07977,0.5602 1.45522,0.2226 1.22461,-1.1016 -0.5717,-3.283 -2.20457,-4.8078 -5.34961,-4.9961 -0.29547,-0.018 -0.58026,-0.023 -0.85156,-0.016 z m 109.53906,0.1836 c -0.7149,10e-5 -1.44948,0.064 -1.9043,0.1875 -3.26888,0.8897 -4.61546,2.4432 -4.49414,5.1933 0.0209,0.4744 0.0663,0.9288 0.0996,1.0078 v 0 c 0.13503,0.321 0.65176,0.121 2.35157,-0.9063 3.45895,-2.0905 6.5625,-4.3298 6.5625,-4.7363 -10e-6,-0.1811 -0.29956,-0.3827 -0.83399,-0.5605 -0.37104,-0.1243 -1.06635,-0.1876 -1.78125,-0.1875 z m -95.76172,2.7539 c -0.9005,-0.019 -1.74399,0.053 -2.29297,0.2187 -2.02755,0.6124 -2.96284,1.6763 -2.96484,3.3731 -0.002,1.3932 0.50253,1.946 2.8457,3.1191 1.74386,0.8731 5.44004,2.4486 7.31836,3.1192 1.10579,0.3948 1.02325,0.3857 1.25195,0.1328 0.34083,-0.3769 0.4624,-1.6488 0.4043,-4.2461 -0.0647,-2.8915 -0.19433,-3.4872 -0.90625,-4.166 -0.51189,-0.488 -1.28596,-0.8043 -3.01367,-1.2305 -0.78279,-0.1931 -1.74208,-0.3019 -2.64258,-0.3203 z m 82.50977,0.01 c -1.67865,0.01 -1.95796,0.036 -2.88086,0.3184 -1.80134,0.5519 -3.25085,1.4108 -3.85547,2.2832 -0.17825,0.2573 -0.41594,0.8021 -0.5293,1.2109 -0.4476,1.6142 -0.58231,5.4619 -0.21875,6.2598 l 0.13477,0.293 0.78125,-0.2168 c 1.76594,-0.4894 6.08608,-2.2236 8.77539,-3.5235 2.39057,-1.1555 2.71091,-1.5505 2.5918,-3.1972 -0.0605,-0.837 -0.62878,-2.049 -1.19141,-2.543 -0.21708,-0.1906 -0.69965,-0.4696 -1.07227,-0.6191 -0.61447,-0.2468 -0.84936,-0.2757 -2.53515,-0.2657 z m -67.11914,1.834 c -1.45004,-0.034 -2.814,0.026 -3.54493,0.1895 -0.8277,0.1856 -1.64185,0.7535 -1.99023,1.3867 -0.51229,0.9312 -0.60783,1.6162 -0.67383,4.832 l -0.0625,3.0215 0.62305,0.2051 c 4.92321,1.6132 9.00994,2.6941 12.30078,3.2559 0.60913,0.1039 0.74808,0.035 0.90625,-0.4454 0.38094,-1.1576 0.42425,-5.7537 0.0762,-8.2031 -0.3435,-2.417 -1.28538,-3.4393 -3.57226,-3.8769 -1.07482,-0.2057 -2.61246,-0.3317 -4.0625,-0.3653 z m 52.42383,0.025 c -3.17944,0.015 -5.70077,0.3454 -6.79688,0.8887 -0.60249,0.2986 -1.29672,0.9628 -1.58008,1.5117 -0.59809,1.1588 -0.93944,3.8977 -0.96094,7.6973 -0.0102,1.7959 0.0249,2.5087 0.13477,2.7011 0.0961,0.1684 0.26008,0.2618 0.45898,0.2618 0.54458,0 13.29062,-3.1038 13.44336,-3.2735 0.0195,-0.022 0.0948,-1.2932 0.16797,-2.8281 0.1954,-4.0961 0.0495,-4.7968 -1.25976,-6.0215 -0.96723,-0.9042 -1.13647,-0.9495 -3.60742,-0.9375 z m -34.91016,0.5762 c -2.91098,0 -3.98061,0.1084 -5.12891,0.5351 -1.24557,0.4628 -1.92565,1.1929 -2.32812,2.4961 -0.30875,0.9997 -0.26186,3.6859 0.125,7.1211 0.16861,1.4972 0.31898,2.7303 0.33398,2.7403 0.015,0.01 0.83777,0.131 1.82813,0.2675 1.71354,0.2362 4.47541,0.4525 6.62109,0.5215 0.5431,0.017 2.04599,0.044 3.33984,0.057 l 2.35352,0.023 -0.002,-4.3867 c -0.001,-6.3455 -0.11308,-6.9966 -1.37891,-8.0039 -1.52696,-1.2151 -2.17695,-1.3711 -5.76367,-1.3711 z m 16.14844,0 c -2.15799,0 -2.55879,0.024 -3.47071,0.2559 -1.23032,0.3124 -2.54141,0.9719 -2.92187,1.4707 -0.46868,0.6144 -0.54637,1.5179 -0.60547,6.9668 l -0.0547,5.0996 3.81641,-0.066 c 4.08663,-0.071 5.95479,-0.197 8.63281,-0.5898 l 1.68945,-0.2481 0.20118,-2.6719 c 0.11089,-1.4696 0.21552,-3.7448 0.23242,-5.0546 0.034,-2.6374 0.0149,-2.7235 -0.74414,-3.4493 -0.54993,-0.5259 -1.94361,-1.151 -3.23243,-1.4511 -0.9486,-0.2206 -1.44605,-0.2618 -3.54296,-0.2618 z"
         transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
         </g>

            <!-- 8. LIDAH -->
            <g id="svg-lidah" class="cursor-pointer transition-all duration-300" style="transform-origin: center; transform-box: fill-box;" onclick="changeKepala('Lidah')" onmouseenter="hoverKepala('Lidah')" onmouseleave="unhoverKepala('Lidah')">
                <path
         style="display:inline;fill:#da4445;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.782;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         d="m -800.95779,1193.23 c -0.0904,-0.024 -0.6928,-0.2812 -1.33875,-0.5722 -2.00884,-0.905 -3.33975,-1.1409 -6.42398,-1.1386 -2.85545,0 -4.16999,0.2083 -6.24305,0.9794 -1.84318,0.6856 -2.23013,0.692 -3.59517,0.06 -1.07605,-0.4985 -1.50333,-0.6285 -2.77109,-0.8433 -1.30013,-0.2202 -4.10288,-0.3001 -5.62972,-0.1604 -1.97895,0.181 -2.87474,0.3835 -4.88488,1.1043 -0.62439,0.2239 -0.95089,0.2947 -1.36102,0.2954 -0.66671,10e-4 -1.0457,-0.1097 -2.54731,-0.7442 -0.65157,-0.2753 -1.59881,-0.6073 -2.10496,-0.7379 -3.14971,-0.8123 -7.35275,-0.848 -9.40588,-0.08 -0.25053,0.094 -0.70963,0.3351 -1.02021,0.5363 -0.62969,0.408 -0.99233,0.5141 -1.26247,0.3696 -0.0996,-0.053 -0.51937,-0.4018 -0.93278,-0.7743 -0.92664,-0.8351 -1.80988,-1.5201 -2.38212,-1.8475 -0.60037,-0.3435 -0.76035,-0.5321 -0.65093,-0.7673 0.12829,-0.2758 0.8804,-1.1076 1.48742,-1.645 1.73005,-1.5316 5.20666,-3.2617 9.33708,-4.6465 4.47506,-1.5004 8.59264,-2.512 16.10048,-3.9555 9.03714,-1.7376 13.82634,-3.2256 19.43372,-6.0378 5.30412,-2.6602 10.30508,-6.0265 19.83174,-13.3493 8.40781,-6.4629 11.33703,-8.4019 14.05798,-9.3057 1.52469,-0.5065 2.16704,-0.5892 4.589,-0.5909 2.89572,0 3.64688,0.1634 5.3253,1.1723 2.75454,1.6557 4.93688,4.1029 6.53536,7.3283 1.55788,3.1436 2.38218,6.4356 2.64307,10.5557 0.23383,3.6925 -0.20396,7.3986 -1.45555,12.3218 -0.77289,3.0403 -1.37021,4.16 -2.51736,4.719 -0.7181,0.3499 -1.23237,0.4612 -3.42525,0.7415 -3.89695,0.4981 -5.15777,0.9783 -7.25831,2.7642 -0.93582,0.7957 -1.41609,1.0568 -1.82223,0.9909 -0.14749,-0.024 -0.53307,-0.1598 -0.85686,-0.3019 -1.05714,-0.464 -1.47009,-0.5224 -3.78087,-0.5354 -2.60448,-0.014 -2.64688,-0.017 -2.82703,-0.1485 -0.13932,-0.1019 -0.13068,-0.1416 0.15353,-0.706 0.16564,-0.3289 0.61902,-1.1213 1.00751,-1.7608 0.38849,-0.6396 1.05343,-1.7358 1.47763,-2.4361 1.30834,-2.1598 3.16708,-5.9947 4.3797,-9.036 0.90112,-2.26 1.33815,-3.6497 1.63523,-5.1998 0.18715,-0.9766 0.20591,-1.2075 0.0981,-1.2075 -0.11937,0 -0.59028,0.9633 -2.46832,5.0496 -1.81535,3.9498 -2.71042,5.7193 -3.94869,7.8061 -1.49407,2.518 -3.55169,5.4511 -5.01339,7.1467 -0.91252,1.0584 -2.59853,2.6826 -3.07085,2.9582 -0.54632,0.3187 -1.12704,0.311 -2.20449,-0.029 -2.77431,-0.8761 -6.57413,-0.8673 -10.06918,0.023 -1.13151,0.2884 -1.68494,0.5042 -2.8594,1.115 -0.97919,0.5092 -1.48839,0.6443 -1.96072,0.5201 z"
         id="path106"
         transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
         </g>
        </svg>`;
const svgBody = `
        <svg id="humanBodySvg" class="w-full max-w-[200px] h-auto drop-shadow-md select-none mx-auto" viewBox="0 0 400 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Kepala (Sebagai referensi bagian tubuh) -->
            <g id="svg-part-kepala" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Kepala')" onmouseenter="hoverTubuh('Kepala')" onmouseleave="unhoverTubuh('Kepala')">
                <circle cx="200" cy="70" r="50" fill="#f3bba0" stroke="#281a16" stroke-width="3" />
            </g>
            <!-- Payudara / Dada -->
            <g id="svg-part-payudara" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Payudara')" onmouseenter="hoverTubuh('Payudara')" onmouseleave="unhoverTubuh('Payudara')">
                <path d="M 150,150 Q 200,165 250,150 Q 255,210 200,215 Q 145,210 150,150 Z" fill="#e29b7d" stroke="#281a16" stroke-width="3" />
            </g>
            <!-- Perut -->
            <g id="svg-part-perut" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Perut')" onmouseenter="hoverTubuh('Perut')" onmouseleave="unhoverTubuh('Perut')">
                <path d="M 155,215 Q 200,215 245,215 Q 250,310 200,320 Q 150,310 155,215 Z" fill="#f8cdb0" stroke="#281a16" stroke-width="3" />
            </g>
            <!-- Punggung (Area bahu belakang / torso lateral) -->
            <g id="svg-part-punggung" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Punggung')" onmouseenter="hoverTubuh('Punggung')" onmouseleave="unhoverTubuh('Punggung')">
                <path d="M 135,135 Q 200,120 265,135 L 255,160 Q 200,145 145,160 Z" fill="#c97d5d" stroke="#281a16" stroke-width="2.5" />
            </g>
            <!-- Tangan / Lengan -->
            <g id="svg-part-tangan" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Tangan')" onmouseenter="hoverTubuh('Tangan')" onmouseleave="unhoverTubuh('Tangan')">
                <path d="M 135,145 Q 100,240 85,340 Q 95,350 110,340 Q 120,250 150,175 Z" fill="#f3bba0" stroke="#281a16" stroke-width="3" />
                <path d="M 265,145 Q 300,240 315,340 Q 305,350 290,340 Q 280,250 250,175 Z" fill="#f3bba0" stroke="#281a16" stroke-width="3" />
            </g>
            <!-- Tungkai / Paha -->
            <g id="svg-part-tungkai" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Tungkai')" onmouseenter="hoverTubuh('Tungkai')" onmouseleave="unhoverTubuh('Tungkai')">
                <path d="M 150,320 Q 140,420 155,500 L 195,500 Q 195,410 195,320 Z" fill="#e8ad92" stroke="#281a16" stroke-width="3" />
                <path d="M 250,320 Q 260,420 245,500 L 205,500 Q 205,410 205,320 Z" fill="#e8ad92" stroke="#281a16" stroke-width="3" />
            </g>
            <!-- Lutut -->
            <g id="svg-part-lutut" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Lutut')" onmouseenter="hoverTubuh('Lutut')" onmouseleave="unhoverTubuh('Lutut')">
                <ellipse cx="175" cy="515" rx="20" ry="14" fill="#d89679" stroke="#281a16" stroke-width="2.5" />
                <ellipse cx="225" cy="515" rx="20" ry="14" fill="#d89679" stroke="#281a16" stroke-width="2.5" />
            </g>
            <!-- Kaki / Telapak Kaki -->
            <g id="svg-part-kaki" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Kaki')" onmouseenter="hoverTubuh('Kaki')" onmouseleave="unhoverTubuh('Kaki')">
                <path d="M 160,530 L 160,690 Q 130,715 170,725 Q 195,720 190,690 L 190,530 Z" fill="#f8cdb0" stroke="#281a16" stroke-width="3" />
                <path d="M 240,530 L 240,690 Q 270,715 230,725 Q 205,720 210,690 L 210,530 Z" fill="#f8cdb0" stroke="#281a16" stroke-width="3" />
            </g>
        </svg>`;

    // 4. SVG Organ Dalam (Jantung, Hati, Usus)
    const svgOrgans = `
        <svg id="humanOrgansSvg" class="w-full max-w-[420px] h-auto drop-shadow-md select-none mx-auto" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Jantung -->
            <g id="svg-part-jantung" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Jantung')" onmouseenter="hoverTubuh('Jantung')" onmouseleave="unhoverTubuh('Jantung')">
                <circle cx="120" cy="110" r="80" fill="transparent" />
                <path d="M 120,165 C 70,120 60,75 95,55 C 115,45 120,60 120,65 C 120,60 125,45 145,55 C 180,75 170,120 120,165 Z" fill="#e11d48" stroke="#881337" stroke-width="4" />
                <text x="120" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#64748b" class="uppercase tracking-wider">Jantung</text>
            </g>
            <!-- Hati (Liver) -->
            <g id="svg-part-hati" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Hati')" onmouseenter="hoverTubuh('Hati')" onmouseleave="unhoverTubuh('Hati')">
                <circle cx="300" cy="110" r="80" fill="transparent" />
                <path d="M 240,80 C 270,55 350,65 365,95 C 375,125 350,155 315,160 C 275,165 235,135 240,80 Z" fill="#9a3412" stroke="#431407" stroke-width="4" />
                <text x="300" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#64748b" class="uppercase tracking-wider">Hati</text>
            </g>
            <!-- Usus -->
            <g id="svg-part-usus" class="cursor-pointer transition-all duration-300" onclick="changeTubuh('Usus')" onmouseenter="hoverTubuh('Usus')" onmouseleave="unhoverTubuh('Usus')">
                <circle cx="480" cy="110" r="80" fill="transparent" />
                <path d="M 440,75 C 470,60 500,60 520,80 C 490,95 450,105 480,120 C 510,135 460,150 490,165 C 460,170 440,150 455,135 C 420,125 450,90 440,75 Z" fill="#f59e0b" stroke="#78350f" stroke-width="4" />
                <text x="480" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#64748b" class="uppercase tracking-wider">Usus</text>
            </g>
        </svg>`;

    return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col transition-colors w-full">
            <div class="bg-slate-900 dark:bg-slate-950 text-white text-sm font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
                ${t('kategori_tubuh')}
            </div>

            <!-- Baris 1: Kiri (Kepala) & Kanan (Badan) -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 pb-8 border-b border-slate-100 dark:border-slate-700/60 items-start">
                
                <!-- KEPALA -->
                <div class="flex flex-col bg-slate-50/70 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 h-full justify-between relative">
                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">Bagian Kepala</span>
                    <div class="w-full flex items-center justify-center min-h-[220px]">
                        ${svgHead}
                    </div>
                    <div class="w-full mt-4">
                        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">Pilih Bagian:</span>
                        <div class="flex flex-wrap gap-1.5 justify-center">
                            ${buttonsKepala}
                        </div>
                    </div>
                    <!-- TERJEMAHAN KEPALA -->
                    <div class="w-full mt-auto pt-8">
                        <div class="text-center mb-3">
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Terpilih:</span>
                            <span class="text-lg font-black text-amber-500 ml-1 uppercase tracking-tight">${t('word_' + activeKepala.toLowerCase())}</span>
                        </div>
                        ${renderWidgetBottomBar(activeKepala)}
                    </div>
                </div>

                <!-- BADAN -->
                <div class="flex flex-col bg-slate-50/70 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 h-full justify-between relative">
                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">Bagian Badan & Gerak</span>
                    <div class="w-full flex items-center justify-center min-h-[220px]">
                        ${svgBody}
                    </div>
                    <div class="w-full mt-4">
                        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">Pilih Bagian:</span>
                        <div class="flex flex-wrap gap-1.5 justify-center">
                            ${buttonsBadan}
                        </div>
                    </div>
                    <!-- TERJEMAHAN BADAN -->
                    <div class="w-full mt-auto pt-8">
                        <div class="text-center mb-3">
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Terpilih:</span>
                            <span class="text-lg font-black text-amber-500 ml-1 uppercase tracking-tight">${t('word_' + activeBadan.toLowerCase())}</span>
                        </div>
                        ${renderWidgetBottomBar(activeBadan)}
                    </div>
                </div>

            </div>

            <!-- Baris 2: Bawah (Organ Dalam) -->
            <div class="mt-8 flex flex-col items-center bg-slate-50/50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40">
                <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Organ Dalam</span>
                <div class="w-full flex items-center justify-center">
                    ${svgOrgans}
                </div>
                <div class="w-full mt-4 max-w-xl mx-auto">
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${buttonsOrgan}
                    </div>
                    <!-- TERJEMAHAN ORGAN -->
                    <div class="w-full mt-8">
                        <div class="text-center mb-3">
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Terpilih:</span>
                            <span class="text-lg font-black text-amber-500 ml-1 uppercase tracking-tight">${t('word_' + activeOrgan.toLowerCase())}</span>
                        </div>
                        ${renderWidgetBottomBar(activeOrgan)}
                    </div>
                </div>
            </div>

        </div>`;
}


function renderWidgetKepala() {
    return renderWidgetAnggotaBadan();
}

const animalIllustrations = {
    'Anjing': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Anjing">
                <!-- Tail -->
                <path d="M175 145 C195 130 215 110 205 95 C198 85 186 98 178 115" stroke="#E67E22" stroke-width="12" stroke-linecap="round" fill="none"></path>
                <!-- Body -->
                <ellipse cx="120" cy="155" rx="55" ry="45" fill="#F39C12"></ellipse>
                <ellipse cx="120" cy="160" rx="35" ry="30" fill="#FFF2DE"></ellipse>
                <!-- Paws -->
                <ellipse cx="90" cy="195" rx="14" ry="10" fill="#FDEBD0"></ellipse>
                <ellipse cx="150" cy="195" rx="14" ry="10" fill="#FDEBD0"></ellipse>
                <!-- Left Ear (floppy) -->
                <path d="M72 82 C55 85 45 110 48 135 C50 148 60 152 68 142 C78 128 78 98 72 82 Z" fill="#D35400"></path>
                <!-- Right Ear (floppy) -->
                <path d="M168 82 C185 85 195 110 192 135 C190 148 180 152 172 142 C162 128 162 98 168 82 Z" fill="#D35400"></path>
                <!-- Head -->
                <circle cx="120" cy="100" r="46" fill="#F39C12"></circle>
                <!-- Forehead Spot -->
                <path d="M120 70 C128 85 132 95 120 102 C108 95 112 85 120 70 Z" fill="#FFE9CE"></path>
                <!-- Muzzle -->
                <ellipse cx="120" cy="116" rx="24" ry="18" fill="#FFF3E0"></ellipse>
                <!-- Nose -->
                <path d="M113 108 C113 105 127 105 127 108 C127 114 120 117 120 117 C120 117 113 114 113 108 Z" fill="#2C3E50"></path>
                <!-- Mouth & Tongue -->
                <path d="M120 117 L120 123 M114 121 C117 124 120 124 120 124 C120 124 123 124 126 121" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M116 124 C116 132 124 132 124 124 Z" fill="#FF6B6B"></path>
                <!-- Eyes -->
                <ellipse cx="98" cy="96" rx="6.5" ry="7.5" fill="#2C3E50"></ellipse>
                <circle cx="96" cy="94" r="2.2" fill="#FFFFFF"></circle>
                <circle cx="100" cy="98" r="1" fill="#FFFFFF"></circle>
                <ellipse cx="142" cy="96" rx="6.5" ry="7.5" fill="#2C3E50"></ellipse>
                <circle cx="140" cy="94" r="2.2" fill="#FFFFFF"></circle>
                <circle cx="144" cy="98" r="1" fill="#FFFFFF"></circle>
                <!-- Cheeks -->
                <circle cx="86" cy="112" r="5" fill="#FCA5A5"></circle>
                <circle cx="154" cy="112" r="5" fill="#FCA5A5"></circle>
                <!-- Collar & Tag -->
                <path d="M92 140 C108 148 132 148 148 140" stroke="#E74C3C" stroke-width="7" stroke-linecap="round"></path>
                <circle cx="120" cy="148" r="5.5" fill="#F1C40F" stroke="#D68910" stroke-width="1.5"></circle>
              </svg>`,

    'Burung': `
        <!-- SVG: BURUNG (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Burung">
                <!-- Branch Perch -->
                <path d="M40 185 C80 183 160 183 205 185" stroke="#854D0E" stroke-width="7" stroke-linecap="round"></path>
                <circle cx="175" cy="180" r="4" fill="#22C55E"></circle>
                <path d="M175 180 Q185 170 190 178" stroke="#22C55E" stroke-width="2" fill="none"></path>
                <!-- Tail Feathers -->
                <path d="M145 155 L195 195 C198 198 195 205 190 202 L138 168 Z" fill="#047857"></path>
                <path d="M152 150 L205 185 C209 188 206 195 200 192 L145 160 Z" fill="#059669"></path>
                <!-- Feet -->
                <path d="M110 175 L110 185 M106 186 L114 186" stroke="#D97706" stroke-width="3" stroke-linecap="round"></path>
                <path d="M125 175 L125 185 M121 186 L129 186" stroke="#D97706" stroke-width="3" stroke-linecap="round"></path>
                <!-- Body -->
                <ellipse cx="118" cy="130" rx="38" ry="46" fill="#10B981"></ellipse>
                <!-- Yellow Chest (Solid) -->
                <path d="M88 120 C88 155 105 172 125 172 C108 165 96 142 96 122 Z" fill="#FBBF24"></path>
                <!-- Wing (Solid Blue) -->
                <path d="M115 110 C145 110 155 135 150 160 C140 165 125 155 115 135 Z" fill="#2563EB"></path>
                <path d="M125 125 C140 128 145 142 142 154" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round"></path>
                <!-- Head -->
                <circle cx="95" cy="85" r="26" fill="#10B981"></circle>
                <!-- Crest -->
                <path d="M96 60 C92 48 80 50 78 55 C82 65 90 62 96 60 Z" fill="#047857"></path>
                <path d="M102 61 C100 50 90 51 88 56 C92 65 98 62 102 61 Z" fill="#059669"></path>
                <!-- Beak -->
                <path d="M72 82 L48 88 L72 94 Z" fill="#F59E0B"></path>
                <!-- Eye -->
                <circle cx="88" cy="82" r="6.5" fill="#FFFFFF"></circle>
                <circle cx="86" cy="82" r="3.5" fill="#0F172A"></circle>
                <circle cx="85" cy="80" r="1.2" fill="#FFFFFF"></circle>
              </svg>`,

    'Ular': `
        <!-- SVG: ULAR (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Ular">
                <!-- Coiled Body Path (Solid Emerald) -->
                <path d="M190 170 C190 195 150 205 110 205 C65 205 45 185 45 160 C45 135 70 125 110 125 C150 125 180 115 180 95 C180 75 160 65 135 65 C115 65 105 75 105 85" stroke="#0D9488" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <!-- Belly Highlight/Accent Line (Solid Mint) -->
                <path d="M190 173 C190 192 153 201 113 201 C72 201 50 183 50 162 C50 143 72 129 110 129 C145 129 175 120 176 96" stroke="#99F6E4" stroke-width="7" stroke-linecap="round" fill="none"></path>
                <!-- Scales / Diamond pattern spots (Solid dark teal) -->
                <circle cx="80" cy="155" r="3.5" fill="#115E59"></circle>
                <circle cx="120" cy="130" r="4" fill="#115E59"></circle>
                <circle cx="160" cy="115" r="3.5" fill="#115E59"></circle>
                <circle cx="150" cy="70" r="3.5" fill="#115E59"></circle>
                <circle cx="140" cy="195" r="4" fill="#115E59"></circle>
                <!-- Snake Head (Solid Emerald) -->
                <ellipse cx="102" cy="85" rx="20" ry="16" fill="#0D9488"></ellipse>
                <!-- Forked Tongue -->
                <path d="M84 85 L65 85 M65 85 L56 78 M65 85 L56 92" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <!-- Eye & Pupil -->
                <circle cx="96" cy="78" r="6" fill="#FDE047"></circle>
                <ellipse cx="96" cy="78" rx="1.6" ry="4.5" fill="#0F172A"></ellipse>
                <circle cx="94.5" cy="76" r="1" fill="#FFFFFF"></circle>
                <!-- Nostril -->
                <circle cx="86" cy="82" r="1.2" fill="#115E59"></circle>
              </svg>`,

    'Ikan': `
        <!-- SVG: IKAN (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Ikan">
                <!-- Bubbles -->
                <circle cx="45" cy="85" r="5" fill="#38BDF8"></circle>
                <circle cx="35" cy="65" r="3.5" fill="#7DD3FC"></circle>
                <circle cx="55" cy="50" r="2.5" fill="#38BDF8"></circle>
                <!-- Dorsal Fin (Top) -->
                <path d="M100 85 C115 50 160 55 170 82 C145 78 120 80 100 85 Z" fill="#F97316"></path>
                <!-- Ventral Fin (Bottom) -->
                <path d="M120 150 C135 175 160 175 165 152 C150 151 135 150 120 150 Z" fill="#F97316"></path>
                <!-- Tail Fin -->
                <path d="M175 120 C205 85 225 90 220 120 C225 150 205 155 175 120 Z" fill="#EA580C"></path>
                <!-- Body -->
                <ellipse cx="120" cy="120" rx="65" ry="38" fill="#0284C7"></ellipse>
                <!-- White Accent Stripes -->
                <path d="M110 84 C118 96 118 144 110 156 C116 154 124 144 122 120 C124 96 116 86 110 84 Z" fill="#FFFFFF"></path>
                <path d="M152 92 C157 102 157 138 152 148 C156 146 161 138 160 120 C161 102 156 94 152 92 Z" fill="#FFFFFF"></path>
                <!-- Pectoral Fin -->
                <path d="M95 125 C85 135 90 150 105 145 C115 140 115 130 95 125 Z" fill="#FB923C"></path>
                <!-- Eye -->
                <circle cx="78" cy="112" r="9" fill="#FFFFFF"></circle>
                <circle cx="76" cy="112" r="5" fill="#0F172A"></circle>
                <circle cx="74" cy="110" r="1.8" fill="#FFFFFF"></circle>
                <!-- Mouth -->
                <path d="M56 122 C58 125 64 125 66 123" stroke="#082F49" stroke-width="2.5" stroke-linecap="round"></path>
                <!-- Gills -->
                <path d="M92 105 C98 112 98 128 92 135" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
              </svg>`,

    'Cacing': `
        <!-- SVG: CACING (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Cacing">
                <!-- Soil Mound (Solid Dark Brown) -->
                <ellipse cx="120" cy="185" rx="80" ry="24" fill="#543310"></ellipse>
                <ellipse cx="90" cy="175" rx="14" ry="7" fill="#713F12"></ellipse>
                <ellipse cx="150" cy="180" rx="18" ry="8" fill="#713F12"></ellipse>
                <!-- Little Sprout on Ground -->
                <path d="M170 170 Q175 155 185 155 Q180 168 172 170 Z" fill="#4ADE80"></path>
                <path d="M170 170 Q162 160 160 150 Q168 155 170 170 Z" fill="#22C55E"></path>
                <!-- Wavy Worm Body emerging from soil (Solid Pink/Rose) -->
                <path d="M150 180 C155 160 145 145 135 145" stroke="#F43F5E" stroke-width="22" stroke-linecap="round" fill="none"></path>
                <path d="M135 145 C115 145 100 120 120 95 C132 80 128 65 110 65 C95 65 85 78 85 92" stroke="#F43F5E" stroke-width="22" stroke-linecap="round" fill="none"></path>
                <!-- Worm Body Segment Rings (Solid darker rose) -->
                <ellipse cx="124" cy="98" rx="11" ry="3" fill="#BE123C" transform="rotate(-25 124 98)"></ellipse>
                <ellipse cx="114" cy="120" rx="11" ry="3" fill="#BE123C" transform="rotate(30 114 120)"></ellipse>
                <ellipse cx="140" cy="160" rx="11" ry="3" fill="#BE123C" transform="rotate(45 140 160)"></ellipse>
                <!-- Head -->
                <circle cx="86" cy="90" r="14" fill="#FB7185"></circle>
                <!-- Cute Eyes -->
                <circle cx="80" cy="86" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="79" cy="86" r="2.3" fill="#1E293B"></circle>
                <circle cx="78" cy="85" r="0.8" fill="#FFFFFF"></circle>
                <circle cx="90" cy="86" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="89" cy="86" r="2.3" fill="#1E293B"></circle>
                <circle cx="88" cy="85" r="0.8" fill="#FFFFFF"></circle>
                <!-- Smile -->
                <path d="M81 95 Q86 100 91 95" stroke="#9F1239" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <!-- Cheeks -->
                <circle cx="76" cy="92" r="2.5" fill="#FDA4AF"></circle>
                <circle cx="95" cy="92" r="2.5" fill="#FDA4AF"></circle>
              </svg>`,

    'Kutu': `
        <!-- SVG: KUTU (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Kutu">
                <!-- Back Powerful Jumping Legs (Solid Dark Purple) -->
                <path d="M150 145 L185 130 L195 185 L210 195" stroke="#6B21A8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M130 150 L160 160 L165 195 L175 200" stroke="#7E22CE" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <!-- Front Legs -->
                <path d="M90 145 L65 160 L60 190 L50 195" stroke="#7E22CE" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M105 150 L95 170 L95 195 L90 200" stroke="#6B21A8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <!-- Abdomen (Solid Purple) -->
                <ellipse cx="140" cy="125" rx="42" ry="34" fill="#7E22CE"></ellipse>
                <!-- Segment Grooves (Solid Lavender) -->
                <path d="M125 96 C135 112 135 138 125 154" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <path d="M145 94 C155 110 155 140 145 156" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <path d="M165 100 C173 114 173 136 165 150" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <!-- Thorax & Head Combined Shield (Solid Violet) -->
                <circle cx="95" cy="120" r="26" fill="#A855F7"></circle>
                <!-- Antennae -->
                <path d="M82 100 C75 85 62 82 55 84" stroke="#6B21A8" stroke-width="3.5" stroke-linecap="round" fill="none"></path>
                <circle cx="53" cy="84" r="3.5" fill="#C084FC"></circle>
                <path d="M90 96 C88 80 80 75 74 74" stroke="#6B21A8" stroke-width="3.5" stroke-linecap="round" fill="none"></path>
                <circle cx="73" cy="74" r="3.5" fill="#C084FC"></circle>
                <!-- Eye -->
                <circle cx="82" cy="116" r="7.5" fill="#FFFFFF"></circle>
                <circle cx="80" cy="116" r="4.2" fill="#1E1B4B"></circle>
                <circle cx="78.5" cy="114" r="1.5" fill="#FFFFFF"></circle>
                <!-- Mouthparts -->
                <path d="M72 128 L60 134" stroke="#581C87" stroke-width="3" stroke-linecap="round"></path>
                <!-- Body Bristles (Solid light violet) -->
                <path d="M178 115 L188 112 M182 128 L192 128 M176 142 L185 145" stroke="#C084FC" stroke-width="2" stroke-linecap="round"></path>
              </svg>`
};

function renderWidgetAnimal() {
    const animals = swadeshCore.animal;

    const cardsHtml = animals.map(animalKey => {
        const animalTitle = t('word_' + animalKey.toLowerCase()) || animalKey;
        const illustration = animalIllustrations[animalKey] || '';

        let translationListHtml = '';

        if (selectedLangs.length === 0) {
            translationListHtml = `
                <div class="text-[11px] text-slate-400 italic text-center py-2.5">
                    ${t('menunggu')}
                </div>`;
        } else {
            translationListHtml = selectedLangs.map(code => {
                const langInfo = typeof languageMap !== 'undefined' ? languageMap[code] : null;
                const displayName = getLanguageDisplayName(code);
                const translated = currentDataMap[code]?.words?.[animalKey] || '-';
                const diakritik = currentDataMap[code]?.diakritik?.[animalKey];

                let flagHtml = '';
                if (langInfo?.icon && (typeof icons === 'undefined' || langInfo.icon !== icons.placeholder)) {
                    flagHtml = `<span class="inline-block h-[18px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] bg-slate-100 dark:bg-slate-800">${langInfo.icon}</span>`;
                }

                const diakritikHtml = diakritik
                    ? `<span class="text-[10px] text-slate-400 dark:text-slate-400 font-serif italic ml-1">[${diakritik}]</span>`
                    : '';

                return `
                    <div class="flex flex-col items-center justify-between gap-1 py-1.5 px-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 shadow-xs">
                        <span class="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 text-[15px] truncate" title="${displayName}">
                            ${flagHtml}
                            <span class="truncate">${displayName}</span>
                        </span>
                        <div class="text-right whitespace-nowrap pl-1">
                            <span class="font-bold text-slate-800 dark:text-slate-100 text-xl">${translated}</span>
                            ${diakritikHtml}
                        </div>
                    </div>`;
            }).join('');
        }

        return `
            <div class="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <!-- Ilustrasi Hewan -->
                <div class="w-full flex items-center justify-center py-2 min-h-[105px] max-h-[250px]">
                    ${illustration}
                </div>

                <!-- Judul Nama Hewan -->
                <h2 class="text-xl xl:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider my-2 text-center">
                    ${animalTitle}
                </h2>

                <!-- List Terjemahan Bahasa -->
                <div class="w-full mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                    ${translationListHtml}
                </div>
            </div>`;
    }).join('');

    return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col transition-colors w-full">
            <div class="bg-slate-900 dark:bg-slate-950 text-white text-xl font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
                ${t('widget_animal') || 'HEWAN'}
            </div>

            <!-- Grid 6 Kartu Hewan (Anjing, Burung, Ular, Ikan, Cacing, Kutu) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                ${cardsHtml}
            </div>
        </div>`;
}

function generatePopulatedCardGroup(title, words, dataMap) {
    let html = `
        <div class="bg-white dark:bg-serumpun-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="font-bold text-lg mb-4 text-slate-800 dark:text-white">${title}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`;

    words.forEach(w => {
        const wordKey = typeof w === 'object' ? w.key : w;
        const displayWord = t('word_' + wordKey.toLowerCase());
        html += `
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-slate-100 dark:bg-slate-700 py-2 px-3 text-center border-b border-slate-200 dark:border-slate-700">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">${displayWord}</span>
                </div>
                <div class="flex flex-col">
                    ${generateTranslationRows(wordKey, dataMap)}
                </div>
            </div>`;
    });

    html += `</div></div>`;
    return html;
}

function generateTranslationRows(wordKey, dataMap) {
    let html = '';
    selectedLangs.forEach((langCode, index) => {
        const translated = dataMap[langCode]?.words?.[wordKey] || '<span class="text-slate-400 italic">?</span>';
        const displayName = getLanguageDisplayName(langCode);
        const bgClass = index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-800';

        html += `
            <div class="flex justify-between items-center py-2 px-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${bgClass}">
                <span class="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[100px]" title="${displayName}">${displayName}</span>
                <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">${translated}</span>
            </div>`;
    });
    return html;
}

function generatePopulatedTableView(dataMap) {
    const warnaKeys = swadeshCore.warna.map(w => w.key);
    const allWords = [...warnaKeys, ...swadeshCore.angka, ...swadeshCore.kepala, ...swadeshCore.hewan, ...swadeshCore.kerja];

    let headers = `<th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">${t('header_kata_dasar')}</th>`;
    selectedLangs.forEach(code => {
        const displayName = getLanguageDisplayName(code);
        headers += `<th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">${displayName}</th>`;
    });

    let rows = allWords.map((word, i) => {
        const displayWord = t('word_' + word.toLowerCase());
        const bg = i % 2 === 0 ? 'bg-white dark:bg-serumpun-dark' : 'bg-slate-50 dark:bg-slate-800/50';
        let cells = `<td class="py-3 px-4 text-slate-800 dark:text-slate-300 font-bold border-t border-slate-200 dark:border-slate-700">${displayWord}</td>`;

        selectedLangs.forEach(code => {
            const translated = dataMap[code]?.words?.[word] || '-';
            cells += `<td class="py-3 px-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">${translated}</td>`;
        });
        return `<tr class="${bg} hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">${cells}</tr>`;
    }).join('');

    return `
        <div class="bg-white dark:bg-serumpun-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden fade-in">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="border-b border-slate-200 dark:border-slate-600">
                        <tr>${headers}</tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </div>`;
}

// --- 6. PELAPORAN KESALAHAN ---
function toggleReportModal(show) {
    const modalOverlay = document.getElementById('report-modal-overlay');
    const modalContent = document.getElementById('report-modal-content');

    if (show) {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('flex');
        setTimeout(() => {
            modalOverlay.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        modalOverlay.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modalOverlay.classList.remove('flex');
            modalOverlay.classList.add('hidden');
            document.getElementById('report-form').reset();
            document.getElementById('lang-autocomplete-list').classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
}

function handleLangAutocomplete(val) {
    const list = document.getElementById('lang-autocomplete-list');
    list.innerHTML = '';

    if (!val || val.length === 0) {
        list.classList.add('hidden');
        return;
    }

    const filtered = availableLanguageNames.filter(lang => lang.toLowerCase().startsWith(val.toLowerCase()));

    if (filtered.length > 0) {
        filtered.forEach(lang => {
            const li = document.createElement('li');
            li.className = 'px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm text-slate-800 dark:text-slate-200 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0';
            const matchText = lang.substring(0, val.length);
            const remText = lang.substring(val.length);
            li.innerHTML = `<strong>${matchText}</strong>${remText}`;

            li.onclick = () => {
                document.getElementById('report-lang').value = lang;
                list.classList.add('hidden');
            };
            list.appendChild(li);
        });
        list.classList.remove('hidden');
    } else {
        list.classList.add('hidden');
    }
}

document.addEventListener('click', function (e) {
    const input = document.getElementById('report-lang');
    const list = document.getElementById('lang-autocomplete-list');
    if (input && list && e.target !== input && e.target !== list && !list.contains(e.target)) {
        list.classList.add('hidden');
    }
});

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = message;

    toast.classList.remove('opacity-0', '-translate-y-full');
    toast.classList.add('translate-y-0');

    setTimeout(() => {
        toast.classList.remove('translate-y-0');
        toast.classList.add('opacity-0', '-translate-y-full');
    }, 3500);
}

function submitReport(e) {
    e.preventDefault();

    const name = document.getElementById('report-name').value;
    const email = document.getElementById('report-email').value;
    const lang = document.getElementById('report-lang').value;
    const desc = document.getElementById('report-desc').value;

    const targetEmail = "#";
    const subject = encodeURIComponent(`Laporan Kesalahan Bahasa: ${lang}`);
    const bodyText = `Halo Ruang Serumpun,\n\nSaya ingin melaporkan kesalahan / memberikan masukan terkait bahasa pada sistem.\n\n` +
        `---\n` +
        `Nama Pengunjung: ${name}\n` +
        `Email: ${email}\n` +
        `Bahasa yang Diperbaiki: ${lang}\n\n` +
        `Keterangan/Koreksi:\n${desc}\n` +
        `---\n\nTerima kasih.`;
    const body = encodeURIComponent(bodyText);

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    toggleReportModal(false);

    setTimeout(() => {
        showToast("Laporan berhasil disiapkan! Silakan kirim melalui aplikasi email Anda.");
    }, 500);
}