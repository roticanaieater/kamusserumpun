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
    organlain: ['Hati', 'Jantung', 'Usus', 'Jari', 'Kuku', 'Daging', 'Darah', 'Tulang', 'Lemak'],
    animal: ['Anjing', 'Ikan', 'Burung', 'Ular', 'Cacing', 'Kutu'],
    plant: ['Pohon', 'Hutan', 'Ranting', 'Buah', 'Biji', 'Daun', 'Akar', 'Kulit Kayu', 'Rumput', 'Bunga'],
    verb: [
        'Memegang', 'Meremas', 'Menggosok', 'Mencuci', 'Mengusap', 'Menarik', 'Mendorong',
        'Melempar', 'Mengikat', 'Menjahit', 'Memotong', 'Menusuk', 'Mencakar', 'Menggaruk',
        'Menggali', 'Membelah', 'Memukul', 'Membunuh', 'Menyala', 'Berdiri', 'Duduk',
        'Berbaring', 'Berjalan', 'Datang', 'Terbang', 'Berenang', 'Jatuh', 'Mengalir',
        'Makan', 'Minum', 'Menggigit', 'Menghisap', 'Mengunyah', 'Meludah', 'Meniup',
        'Bernyanyi', 'Tertawa', 'Melihat', 'Mendengar', 'Tahu', 'Berpikir', 'Mencium',
        'Bernapas', 'Tidur', 'Menguap', 'Muntah', 'Bersin', 'Buang air besar'
    ],
};

// State Global untuk Widget
let activeWarna = 'Hijau';
let activeAngka = 'Empat';
let activeKepala = 'Telinga';
let activeBadan = 'Tangan';
let currentDataMap = {}; // Menyimpan data hasil fetch kosa kata terpilih

// --- DATA I18N DINAMIS & KAMUS LENGKAP MANDIRI ---
let uiTranslationsCache = null;
let currentLangUI = 'id';
let viewMode = 'swadesh'; // 'swadesh' | 'list'
let selectedLangs = [];
let activeDialects = {};
let activeRegisters = {};
let languageCache = {}; // Cache JSON kata
let availableLanguageNames = [];

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
        "widget_warna": "WARNA",
        "widget_angka": "ANGKA",
        "widget_badan": "ANATOMI TUBUH",
        "subwidget_kepala": "Bagian Kepala",
        "subwidget_badan": "Bagian Badan & Gerak",
        "widget_organlain": "ORGAN & BAGIAN TUBUH",
        "widget_animal": "FAUNA & HEWAN",
        "widget_plant": "FLORA & TUMBUHAN",
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
        "widget_warna": "WARNA",
        "widget_angka": "ANGKA",
        "widget_badan": "ANATOMI BADAN",
        "subwidget_kepala": "Bahagian Kepala",
        "subwidget_badan": "Bahagian Badan & Gerak",
        "widget_organlain": "ORGAN & RUAS BADAN",
        "widget_animal": "HAIWAN",
        "widget_plant": "TUMBUHAN",
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
        "widget_warna": "COLOR",
        "widget_angka": "NUMBER",
        "widget_badan": "BODY ANATOMY",
        "subwidget_kepala": "Head Region",
        "subwidget_badan": "Torso & Limbs",
        "widget_organlain": "INTERNAL ORGANS & BODY PARTS",
        "widget_animal": "ANIMALS",
        "widget_plant": "PLANTS",
        "header_kata_dasar": "Root Word",
        "terpilih_label": "Selected:",
        "max_lang_alert": "Maximum 3 languages can be selected."
    }
};

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

    uiTranslationsCache = FALLBACK_UI_TRANSLATIONS;
    return uiTranslationsCache;
}

function t(key, lang = currentLangUI) {
    const all = uiTranslationsCache || FALLBACK_UI_TRANSLATIONS;
    const currentDict = all[lang] || all['id'] || {};

    if (!currentDict[key] && key.startsWith('word_')) {
        const word = key.replace('word_', '');
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return currentDict[key] || key;
}

window.onload = async () => {
    if (window.lucide) lucide.createIcons();
    initMapInteractive();
    await loadUITranslations();
    updateBibliography();
    renderEmptyDictionary();

    if (typeof languageMap !== 'undefined') {
        availableLanguageNames = Object.values(languageMap).map(lang => lang.name).sort();
    }

    const modalOverlay = document.getElementById('report-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) toggleReportModal(false);
        });
    }
};

function toggleLegendCollapse() {
    const list = document.getElementById('legend-list');
    const icon = document.getElementById('legend-collapse-icon');
    if (!list) return;
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        list.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    if (window.lucide) lucide.createIcons();
}

if (localStorage.getItem('theme') == 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

const navFlagMap = {
    'id': `<img src="./flag/indonesia.svg" alt="Indonesia" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'my': `<img src="./flag/malaysia.svg" alt="Malaysia" class="w-full h-full object-cover" onerror="this.style.display='none'">`,
    'en': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="w-full h-full object-cover"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 79 480H0v-60l239-178L0 64V0h75z"/><path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20L24 480H0v-24l240-176v-20zM640 0v3L391 191v-20L598 0h42zM0 0l239 176h-60L0 42V0z"/><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/><path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/></svg>`
};

function updateNavFlag(lang) {
    const flagContainer = document.getElementById('current-lang-icon');
    if (flagContainer && navFlagMap[lang]) {
        flagContainer.innerHTML = navFlagMap[lang];
    }
}

async function changeUILang(lang) {
    currentLangUI = lang;
    const allTranslations = await loadUITranslations();
    const dictionary = allTranslations[lang] || allTranslations['id'] || {};

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) el.textContent = dictionary[key];
    });

    for (const [key, text] of Object.entries(dictionary)) {
        const el = document.getElementById(key);
        if (el && !el.hasAttribute('data-i18n')) {
            el.textContent = text;
        }
    }

    updateNavFlag(lang);
    updateDropdownsUI();
    updateStickyBar();

    if (selectedLangs.length === 0) {
        renderEmptyDictionary();
    } else {
        fetchAndRenderDictionary();
    }

    if (window.lucide) lucide.createIcons();
}

function scrollToSource() {
    const target = document.getElementById('sumber') || document.getElementById('bibliography-list');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}

function setViewMode(mode) {
    viewMode = mode;
    const bg = document.getElementById('toggle-bg');
    const btnSwadesh = document.getElementById('btn-swadesh');
    const btnList = document.getElementById('btn-list');

    if (mode === 'swadesh') {
        if (bg) bg.style.transform = 'translateX(0)';
        if (btnSwadesh) {
            btnSwadesh.classList.replace('text-slate-500', 'text-slate-900');
            btnSwadesh.classList.replace('dark:text-slate-400', 'dark:text-white');
        }
        if (btnList) {
            btnList.classList.replace('text-slate-900', 'text-slate-500');
            btnList.classList.replace('dark:text-white', 'dark:text-slate-400');
        }
    } else {
        if (bg) bg.style.transform = 'translateX(100%)';
        if (btnList) {
            btnList.classList.replace('text-slate-500', 'text-slate-900');
            btnList.classList.replace('dark:text-slate-400', 'dark:text-white');
        }
        if (btnSwadesh) {
            btnSwadesh.classList.replace('text-slate-900', 'text-slate-500');
            btnSwadesh.classList.replace('dark:text-white', 'dark:text-slate-400');
        }
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

    const titleCompare = document.getElementById('ui-title-compare');
    if (titleCompare) {
        window.scrollTo({ top: titleCompare.offsetTop - 50, behavior: 'smooth' });
    }
}

let currentZoom = 1;
function zoomMap(factor) {
    const svgWrapper = document.getElementById('svg-wrapper');
    if (!svgWrapper) return;
    currentZoom *= factor;
    if (currentZoom > 3) currentZoom = 3;
    if (currentZoom < 0.5) currentZoom = 0.5;
    svgWrapper.style.width = (1000 * currentZoom) + 'px';
}

function resetZoom() {
    const svgWrapper = document.getElementById('svg-wrapper');
    const scrollContainer = document.getElementById('map-scroll-container');
    currentZoom = 1;
    if (svgWrapper) svgWrapper.style.width = '1000px';
    if (scrollContainer) scrollContainer.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
}

function initMapInteractive() {
    const scrollContainer = document.getElementById('map-scroll-container');
    if (!scrollContainer) return;

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
        region.addEventListener('mouseenter', () => {
            const langKey = region.getAttribute('data-lang');
            const lang = typeof languageMap !== 'undefined' ? languageMap[langKey] : null;
            if (lang && tooltip && tooltipIcon && tooltipText) {
                tooltipIcon.innerHTML = lang.icon || (typeof icons !== 'undefined' ? icons.placeholder : '');
                tooltipText.innerText = lang.name;
                tooltip.classList.remove('hidden', 'opacity-0');
            }
        });
        region.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = e.clientY + 'px';
            }
        });
        region.addEventListener('mouseleave', () => {
            if (tooltip) tooltip.classList.add('hidden', 'opacity-0');
        });
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
            showToast(t('max_lang_alert') || 'Maksimal memilih 3 bahasa.');
            return;
        }
        selectedLangs.push(langCode);
        if (el) el.classList.add('selected');

        const langInfo = typeof languageMap !== 'undefined' ? languageMap[langCode] : null;
        if (langInfo) {
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
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        if (i < selectedLangs.length) {
            const langCode = selectedLangs[i];
            const langInfo = typeof languageMap !== 'undefined' ? languageMap[langCode] : null;
            const iconSvg = langInfo?.icon || (typeof icons !== 'undefined' ? icons.placeholder : '');
            const langName = langInfo?.name || langCode;

            slotsContainer.innerHTML += `
                <div class="h-10 rounded-full bg-serumpun-yellow text-slate-900 flex items-center justify-center shadow-md relative group cursor-help icon-svg p-2 overflow-hidden border-2 border-white dark:border-slate-700">
                    ${iconSvg}
                    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity font-semibold shadow-sm z-50">
                        ${langName}
                    </span>
                </div>`;
        } else {
            slotsContainer.innerHTML += `<div class="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium transition-colors">${i + 1}</div>`;
        }
    }

    const counter = document.getElementById('lang-counter');
    if (counter) counter.innerText = `${selectedLangs.length}/3`;
    const btnCompare = document.getElementById('btn-compare');
    if (btnCompare) btnCompare.disabled = selectedLangs.length === 0;
}

function handleDialectChange(langCode, dialectKey) {
    activeDialects[langCode] = dialectKey;
    const dialectMeta = typeof languageMap !== 'undefined' ? languageMap[langCode]?.dialects?.[dialectKey] : null;

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

    if (!dBox || !dOptions || !rBox || !rOptions) return;

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
        const langInfo = typeof languageMap !== 'undefined' ? languageMap[code] : null;
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
        let baseName = langInfo ? langInfo.name : code;

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

    if (typeof bibliographyBase !== 'undefined') {
        bibliographyBase.forEach(bib => {
            bibList.innerHTML += `
                <li class="flex items-start gap-3 fade-in">
                    <i data-lucide="bookmark" class="w-4 h-4 mt-0.5 text-serumpun-yellow shrink-0"></i>
                    <div class="text-slate-300">${bib}</div>
                </li>`;
        });
    }

    selectedLangs.forEach(langCode => {
        const langInfo = typeof languageMap !== 'undefined' ? languageMap[langCode] : null;
        const bib = langInfo?.biblio;
        if (bib) {
            bibList.innerHTML += `
                <li class="flex items-start gap-3 fade-in">
                    <i data-lucide="book-open" class="w-4 h-4 mt-0.5 text-blue-400 shrink-0"></i>
                    <div class="text-slate-300">${bib} <span class="text-xs ml-2 text-slate-500">[Data: ${langInfo.name}]</span></div>
                </li>`;
        }
    });

    if (window.lucide) lucide.createIcons();
}

async function loadLanguageJSON(langCode) {
    if (typeof languageMap === 'undefined' || !languageMap[langCode]) {
        return { words: {}, diakritik: {} };
    }
    const langMeta = languageMap[langCode];
    let fetchKey = langCode;
    let filePath = langMeta.file || `bahasa/${langCode}.json`;
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
        const [resBahasa, resDiakritik] = await Promise.allSettled([
            fetch(filePath),
            fetch(diakritikPath)
        ]);

        let wordsData = { words: {} };
        let diakritikData = { words: {} };

        if (resBahasa.status === 'fulfilled' && resBahasa.value.ok) {
            wordsData = await resBahasa.value.json();
        } else {
            throw new Error(`Gagal memuat JSON kata`);
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
    currentDataMap = {};
    for (let code of selectedLangs) {
        currentDataMap[code] = await loadLanguageJSON(code);
    }

    const container = document.getElementById('dictionary-container');
    if (!container) return;
    container.innerHTML = '';

    if (viewMode === 'swadesh') {
        container.innerHTML = `
            <!-- Grid 1: Warna & Angka -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
                <div id="widget-warna-container" class="h-full">${renderWidgetWarna()}</div>
                <div id="widget-angka-container" class="h-full">${renderWidgetAngka()}</div>
            </div>

            <!-- Grid 2: Anatomi Tubuh Lengkap (Kepala, Badan & Organ Lain dalam 1 Wadah) -->
            <div class="relative rounded-3xl mb-8">
                <div id="widget-anatomi-container">${renderWidgetAnggotaBadan()}</div>
            </div>

            <!-- Grid 3: Hewan / Fauna (Format Kartu) -->
            <div class="relative rounded-3xl mb-8">
                <div id="widget-animal-container">${renderWidgetAnimal()}</div>
            </div>

            <!-- Grid 4: Tumbuhan / Flora (Format Kartu) -->
            <div class="relative rounded-3xl mb-8">
                <div id="widget-plant-container">${renderWidgetPlant()}</div>
            </div>
        `;
    } else {
        container.innerHTML = generatePopulatedTableView(currentDataMap);
    }

    if (window.lucide) lucide.createIcons();
}

function renderEmptyDictionary() {
    const container = document.getElementById('dictionary-container');
    if (!container) return;
    container.innerHTML = `
        <div class="text-center py-10 opacity-70">
            <i data-lucide="map" class="w-12 h-12 mx-auto mb-3 text-slate-400"></i>
            <p class="text-base font-semibold text-slate-500 dark:text-slate-400">${t('emptyMsg')}</p>
        </div>`;
    if (window.lucide) lucide.createIcons();
}

function getLanguageDisplayName(langCode) {
    if (typeof languageMap === 'undefined' || !languageMap[langCode]) return langCode;
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

window.changeWarna = function (warnaKey) {
    activeWarna = warnaKey;
    const container = document.getElementById('widget-warna-container');
    if (container) container.innerHTML = renderWidgetWarna();
};

window.changeAngka = function (angkaKey) {
    activeAngka = angkaKey;
    const container = document.getElementById('widget-angka-container');
    if (container) container.innerHTML = renderWidgetAngka();
};

function renderWidgetBottomBar(wordKey) {
    let html = `<div class="flex justify-between items-start pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto w-full">`;

    if (selectedLangs.length === 0) {
        html += `<div class="w-full text-center text-xs text-slate-400 italic py-2">${t('menunggu')}</div>`;
    } else {
        selectedLangs.forEach((langCode, index) => {
            const langInfo = typeof languageMap !== 'undefined' ? languageMap[langCode] : null;
            const displayName = getLanguageDisplayName(langCode);
            const translated = currentDataMap[langCode]?.words?.[wordKey] || '-';
            const diakritik = currentDataMap[langCode]?.diakritik?.[wordKey];

            const diakritikHtml = diakritik
                ? `<span class="text-xs text-slate-400 dark:text-slate-500 italic block mt-1">[${diakritik}]</span>`
                : '';
            const borderClass = index < selectedLangs.length - 1
                ? 'border-r border-slate-200 dark:border-slate-700 px-2'
                : 'px-2';

            let flagHtml = '';
            if (langInfo?.icon && (typeof icons === 'undefined' || langInfo.icon !== icons.placeholder)) {
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
    }

    return html + `</div>`;
}

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
                <div class="bg-[#1b242d] dark:bg-[#fde401] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">${t('widget_warna')}</div>
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
                <div class="bg-[#1b242d] dark:bg-[#fde401] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">${t('widget_angka')}</div>
                <h3 class="text-3xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8 relative">
                    ${t('word_' + activeAngka.toLowerCase())}
                    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 dark:bg-slate-400 rounded-full"></div>
                </h3>
                <div class="w-full max-w-sm h-14 bg-amber-500 rounded-2xl flex items-center px-1.5 mb-8 shadow-inner mt-4">
                    ${sliderHtml}
                </div>
            </div>
            ${renderWidgetBottomBar(activeAngka)}
        </div>`;
}

window.updateAnatomiWidget = function () {
    const container = document.getElementById('widget-anatomi-container');
    if (container) container.innerHTML = renderWidgetAnggotaBadan();
};

window.changeKepala = function (key) { activeKepala = key; updateAnatomiWidget(); };
window.changeBadan = function (key) { activeBadan = key; updateAnatomiWidget(); };

window.hoverPart = function (partKey, activeState) {
    const el = document.getElementById('svg-part-' + partKey.toLowerCase());
    const btn = document.getElementById('btn-part-' + partKey.toLowerCase());
    if (el && partKey.toLowerCase() !== activeState.toLowerCase()) {
        el.style.filter = "brightness(1.2) drop-shadow(0px 6px 12px rgba(234,179,8,0.4))";
        el.style.transform = "scale(1.04)";
    }
    if (btn && partKey.toLowerCase() !== activeState.toLowerCase()) {
        btn.classList.add('bg-slate-200', 'dark:bg-slate-700');
    }
};

window.unhoverPart = function (partKey, activeState) {
    const el = document.getElementById('svg-part-' + partKey.toLowerCase());
    const btn = document.getElementById('btn-part-' + partKey.toLowerCase());
    if (el && partKey.toLowerCase() !== activeState.toLowerCase()) {
        el.style.filter = "";
        el.style.transform = "";
    }
    if (btn && partKey.toLowerCase() !== activeState.toLowerCase()) {
        btn.classList.remove('bg-slate-200', 'dark:bg-slate-700');
    }
};

function renderWidgetAnggotaBadan() {
    const isKActive = (p) => activeKepala.toLowerCase() === p.toLowerCase();
    const isBActive = (p) => activeBadan.toLowerCase() === p.toLowerCase();
    const activeGlow = "filter: drop-shadow(0 0 14px rgba(234, 179, 8, 0.95)) drop-shadow(0 0 4px #eab308) brightness(1.28); transform: scale(1.06); transform-box: fill-box; transform-origin: center; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);";
    const normalTransition = "transition: all 0.3s ease; transform-box: fill-box; transform-origin: center;";

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

    const svgHead = `
        <svg id="humanHeadSvg" class="w-full max-w-[280px] h-auto drop-shadow-lg select-none mx-auto" viewBox="0 0 600 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="svg-kepala-base">
                <path
       style="fill:#2470b2;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.8472,853.64683 c -65.8252,-3.81535 -123.3876,-22.68903 -162.8238,-53.38706 -6.3153,-4.91594 -16.3912,-14.27992 -16.3912,-15.23299 0,-0.27665 1.2985,-1.15658 2.8856,-1.95539 8.3318,-4.19348 24.8315,-12.87128 25.3331,-13.3236 0.9272,-0.83604 2.5487,-0.60192 3.4492,0.49803 1.3933,1.70187 12.5002,10.37249 18.07,14.10639 27.5975,18.50089 66.8282,31.25248 111.2782,36.17 41.15032,4.55246 86.61278,1.08641 123.90539,-9.44654 22.8868,-6.46417 43.83974,-15.63141 60.14334,-26.31366 5.8184,-3.81226 17.21101,-12.6299 18.75528,-14.51619 1.1091,-1.35475 1.97204,-1.28666 5.06788,0.39985 1.43191,0.78006 8.0027,4.24284 14.60176,7.69509 6.59906,3.45224 11.9983,6.46565 11.9983,6.69647 0,0.83 -10.75061,10.7494 -16.40274,15.13452 -34.25733,26.57805 -82.18619,44.57705 -136.68942,51.33178 -17.77842,2.20333 -45.76539,3.15273 -63.18089,2.1433 z"
              sodipodi:nodetypes="sssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       style="display:inline;fill:#f2b492;stroke:none;stroke-opacity:1"
       d="m -1016.2772,745.49117 c -18.6181,-2.26972 -36.9286,-9.01067 -50.033,-18.41952 -11.5627,-8.30195 -29.5343,-24.08605 -45.3817,-39.85792 -37.4522,-37.2737 -53.1161,-63.01266 -61.5566,-101.15017 -4.3071,-19.46085 -13.902,-81.49228 -18.9346,-122.41297 -0.5964,-4.84893 -1.1359,-15.04423 -1.3199,-24.94167 -0.4008,-21.55432 0.8319,-73.5645 1.943,-81.97983 1.5273,-11.56858 7.3786,-28.36383 15.0271,-43.13311 l 4.2472,-8.20136 -0.2831,-6.6826 c -0.2353,-5.55372 0.01,-8.27328 1.4336,-16.09897 4.6682,-25.60652 12.3759,-42.17347 26.0411,-55.97276 10.4943,-10.5974 21.6661,-16.37669 41.7206,-21.58273 6.0575,-1.5725 7.4772,-1.71107 17.2328,-1.68206 9.9539,0.0296 11.2895,0.17573 20.959,2.29325 35.4045,7.75317 42.2502,8.77698 62.2696,9.31278 21.71368,0.58115 35.5086,-0.96686 69.86353,-7.83978 20.22824,-4.04679 22.0755,-4.31583 29.76792,-4.33549 25.20325,-0.0644 53.44349,14.20569 66.43617,33.57096 10.34839,15.42402 18.61503,42.71507 18.61503,61.45467 v 7.71625 l 5.13242,10.55464 c 5.35301,11.00826 10.54653,25.11583 12.49596,33.94371 1.77369,8.03209 2.33661,18.23892 3.07811,55.8122 0.69298,35.11483 0.63732,38.11184 -1.00568,54.14685 -2.123,20.71977 -12.48979,91.75081 -16.7132,114.51536 -8.27325,44.59351 -22.41506,70.29707 -59.45872,108.06969 -16.74424,17.07374 -36.89927,35.13693 -48.93162,43.85314 -7.2464,5.24927 -20.63146,11.78609 -29.76792,14.53766 -13.43364,4.04572 -18.37043,4.65479 -39.48806,4.87175 -10.35804,0.10642 -20.88314,-0.0565 -23.38904,-0.36197 z m 32.65676,-74.07856 c 18.0226,-1.8987 31.44647,-7.40716 44.47645,-18.25083 9.55122,-7.9486 20.96728,-24.59103 29.23241,-42.61524 4.95569,-10.80713 4.96166,-11.69693 0.11357,-16.93344 -2.23039,-2.40908 -6.53839,-5.77268 -11.99829,-9.368 -16.25066,-10.701 -27.77324,-16.73785 -38.89391,-20.37711 -5.28328,-1.72896 -6.94607,-1.99568 -12.75768,-2.04642 -6.43881,-0.0562 -6.89313,0.0281 -12.45392,2.31097 -7.63972,3.13636 -10.62891,3.37165 -16.09899,1.26723 -9.599,-3.69289 -10.3731,-3.90081 -14.5802,-3.91622 -11.7988,-0.0432 -28.4098,7.02502 -50.962,21.68508 -13.3161,8.65609 -17.7791,13.32699 -17.1784,17.97865 0.1653,1.27931 2.7506,7.29365 5.7453,13.36518 16.4636,33.37931 34.8589,49.83291 61.8739,55.34293 10.0461,2.04902 23.06578,2.65456 33.48176,1.55722 z m -21.83556,-69.66507 c 0.4386,-0.17549 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.1569,0.34546 -0.7974,0.31908 -0.7077,-0.0292 -0.8516,-0.17311 -0.367,-0.36704 z m 16.51665,-61.80373 c 2.17184,-0.46159 7.46486,-2.39632 11.76227,-4.29939 4.49057,-1.98861 10.73479,-4.17759 14.6827,-5.14717 8.80419,-2.16226 11.69823,-3.59991 15.39978,-7.64999 7.40912,-8.10676 8.15154,-22.46001 1.78006,-34.41413 -2.41277,-4.52682 -6.34634,-8.84326 -7.24233,-7.94727 -0.46958,0.46958 0.0566,1.8374 1.85213,4.81437 4.20543,6.97269 7.16462,19.03535 5.90293,24.06232 l -0.37585,1.49749 -5.02248,-1.53904 c -4.30899,-1.3204 -6.18758,-1.54013 -13.22385,-1.54673 -8.10743,-0.008 -8.29183,0.023 -16.09898,2.67365 -7.71937,2.62082 -8.07585,2.68171 -15.79522,2.69797 -7.76621,0.0164 -8.01911,-0.0264 -15.19681,-2.57159 -8.4904,-3.01066 -13.3878,-3.7467 -20.4301,-3.07055 -4.4571,0.42796 -11.0217,1.92356 -13.9542,3.1792 -0.802,0.34344 -1.0394,-0.10407 -1.305,-2.46051 -0.7289,-6.46705 1.7047,-15.79322 5.8911,-22.5761 2.3251,-3.76717 2.5847,-4.48845 1.7331,-4.81525 -1.4163,-0.54346 -5.2025,3.97047 -7.7556,9.24612 -4.2479,8.77767 -4.9085,18.57606 -1.7033,25.26479 0.8666,1.80846 1.6431,3.61315 1.7255,4.01042 0.245,1.18027 3.1092,4.67512 4.9421,6.03018 3.0903,2.28475 5.5578,3.27415 11.9068,4.77433 3.4504,0.81527 8.9909,2.61597 12.3123,4.00157 15.6581,6.53213 20.25956,7.4757 28.21295,5.78531 z m -30.57985,-37.56455 c -3.4431,-7.81855 -3.5996,-8.49368 -3.269,-14.10121 0.2144,-3.6376 0.8548,-7.01218 1.8972,-9.99794 0.8655,-2.47885 1.4493,-4.6313 1.2974,-4.78324 -0.152,-0.15193 -0.7121,-0.10901 -1.2447,0.0954 -2.0775,0.79722 -5.1591,10.47276 -5.1591,16.19858 0,6.13881 2.9833,13.34782 5.5237,13.34782 0.8045,0 1.1632,-0.28541 0.9545,-0.75939 z m 52.53098,-2.62315 c 2.00764,-4.53859 2.51342,-9.56152 1.52771,-15.17177 -0.98569,-5.61018 -3.19293,-11.21361 -4.41713,-11.21361 -1.08916,0 -1.09585,-0.0641 0.73073,7.00028 2.12923,8.23491 1.79301,13.92506 -1.2466,21.09699 -0.34911,0.82373 -0.15464,1.06314 0.86359,1.06314 0.97628,0 1.6298,-0.71352 2.5417,-2.77503 z m -49.20068,-43.0928 c 2.5309,-9.83357 3.7642,-40.99125 2.1162,-53.46419 -1.1696,-8.85259 -2.7399,-15.21625 -5.5558,-22.51552 -2.5654,-6.64993 -3.5439,-8.16428 -4.6014,-7.1217 -0.5865,0.5782 -0.3506,1.73773 1.1125,5.46757 6.962,17.74783 8.5301,41.66896 4.6826,71.42892 -0.5091,3.93763 -0.7532,7.43835 -0.5424,7.77937 0.7161,1.15861 2.3176,0.25426 2.7883,-1.57445 z m 44.8618,-0.15094 c -0.003,-0.91886 -0.42882,-4.81451 -0.9462,-8.657 -1.27596,-9.47624 -1.86665,-39.76921 -0.93029,-47.70878 0.97419,-8.26029 2.24963,-14.22319 4.38333,-20.49286 1.68964,-4.96485 1.82263,-6.52191 0.55704,-6.52191 -0.62708,0 -3.7865,7.55728 -5.07954,12.15017 -4.06932,14.4543 -4.69521,37.6002 -1.65919,61.35836 1.45837,11.4124 1.4894,11.54266 2.75002,11.54266 0.61123,0 0.92844,-0.57302 0.92483,-1.67064 z m -111.841,-23.55037 c 2.8045,-0.53992 7.8808,-1.89293 11.2808,-3.00668 6.7237,-2.20252 17.337,-7.25175 17.337,-8.24798 0,-1.50092 -2.0561,-1.08499 -7.0717,1.43055 -6.7546,3.3877 -15.5033,6.20697 -23.1598,7.46328 -7.2157,1.18398 -24.9128,0.83437 -31.1268,-0.61492 -2.1719,-0.50653 -4.2906,-0.93057 -4.7082,-0.9423 -1.3056,-0.0367 -0.8285,1.80528 0.6075,2.34531 1.35,0.5077 10.9115,2.24956 15.0358,2.73915 4.0839,0.48478 16.7474,-0.19262 21.8054,-1.16641 z m 206.71631,-0.31028 c 6.48619,-1.31753 7.90178,-1.94695 6.81743,-3.03129 -0.41792,-0.41792 -2.17343,-0.27086 -5.4372,0.45549 -3.77463,0.84004 -7.58693,1.071 -17.57769,1.0649 -11.21741,-0.007 -13.41779,-0.17369 -18.22525,-1.38196 -6.85984,-1.72409 -12.50222,-3.83191 -19.23233,-7.1846 -4.26923,-2.12678 -5.38599,-2.46789 -5.9307,-1.81156 -0.86879,1.04684 -0.39746,1.4154 5.72275,4.47491 8.53274,4.26554 20.85199,7.93998 29.76792,8.87884 5.22156,0.54983 18.00224,-0.2271 24.09507,-1.46473 z m -200.56011,-16.37269 c 3.4995,-0.70356 10.4337,-2.66873 15.4094,-4.36703 6.1117,-2.08606 9.955,-3.06933 11.8464,-3.03083 4.16,0.0847 7.2979,-0.93672 8.0676,-2.62603 0.9979,-2.19019 0.2089,-4.12274 -3.272,-8.01356 l -3.1699,-3.54321 4.232,3.98608 c 4.6513,4.38089 9.0854,7.60351 11.7309,8.52574 7.5141,2.61944 10.0467,-11.14784 5.4866,-29.82581 -1.2029,-4.9268 -4.8387,-13.56987 -6.7506,-16.04762 -0.8084,-1.04761 -0.7551,-1.37415 0.5343,-3.2742 3.3558,-4.945 0.1531,-13.86193 -6.4836,-18.05145 -6.5208,-4.11643 -30.1745,-8.60382 -55.8421,-10.5939 -21.9994,-1.70568 -33.5155,0.51709 -46.5049,8.97611 -10.9891,7.15641 -19.6419,16.11799 -24.9359,25.82578 -2.0601,3.77761 -2.1768,4.2344 -1.3045,5.10666 0.8722,0.87226 1.6268,0.57472 8.4354,-3.3264 9.0801,-5.20266 12.3641,-6.85896 18.5283,-9.34501 10.1236,-4.08283 20.8213,-5.81989 31.9373,-5.18587 l 6.5376,0.37289 4.7013,3.14658 c 2.5857,1.73062 6.9447,4.75406 9.6868,6.71876 2.7421,1.9647 5.7492,3.97864 6.6826,4.47542 1.5877,0.84508 1.4232,0.87298 -2.5555,0.43329 -5.936,-0.65599 -15.4436,-0.46864 -21.8897,0.43134 -9.2986,1.29824 -18.9434,4.91115 -26.4073,9.89209 -3.3982,2.26778 -13.3652,11.99123 -13.3652,13.03866 0,1.4936 1.5972,0.74366 4.278,-2.00861 5.3259,-5.46801 16.9653,-12.23652 25.7937,-14.99945 7.4254,-2.32386 13.1372,-3.10673 22.7816,-3.12253 10.6365,-0.0174 17.1136,0.99424 19.0158,2.97011 0.7346,0.7631 3.6,3.18256 6.3674,5.37659 2.7674,2.19404 7.2782,6.08181 10.0239,8.63951 4.9539,4.61469 4.9637,4.62976 1.281,1.96563 -7.9914,-5.78092 -19.3313,-10.58415 -28.4677,-12.05802 -17.1337,-2.76395 -38.1317,4.42293 -52.4861,17.96417 -4.9554,4.67466 -5.395,6.23526 -2.06,7.31323 1.0842,0.35045 2.8612,1.48491 3.9488,2.52102 3.1075,2.96027 9.2749,6.66347 14.3437,8.61276 4.258,1.63743 13.7301,3.92273 18.9206,4.56486 4.8593,0.60117 18.7755,-0.20159 24.924,-1.43775 z m 25.7452,-23.85882 -1.1573,-1.36689 1.3669,1.1573 c 1.2845,1.08757 1.6435,1.57649 1.1573,1.57649 -0.1153,0 -0.7304,-0.6151 -1.3669,-1.3669 z m 163.18971,25.03601 c 7.11945,-0.87298 15.83885,-3.25114 21.19294,-5.78025 4.63917,-2.1914 11.02916,-6.44816 13.04467,-8.68985 0.62938,-0.70001 1.37552,-1.12986 1.65809,-0.95523 0.88414,0.54643 2.96891,-0.94253 2.96891,-2.12042 0,-1.33361 -6.24568,-7.31691 -11.64991,-11.1605 -15.94309,-11.33902 -35.47632,-15.30381 -51.83474,-10.52124 -7.40116,2.16382 -16.85461,6.90518 -23.25869,11.66535 -2.91181,2.16436 -4.31181,3.03724 -3.1111,1.93971 5.48542,-5.014 12.17898,-10.86824 17.60539,-15.3978 5.74701,-4.79717 6.0441,-4.95824 10.67923,-5.78996 5.89922,-1.05853 20.15903,-1.04609 26.33432,0.023 12.52638,2.16859 27.84361,9.76947 35.51114,17.62173 2.38924,2.4468 3.97692,3.13197 3.97692,1.71626 0,-1.31748 -9.94063,-10.57424 -14.57459,-13.57194 -8.87866,-5.74358 -18.20265,-8.76038 -30.96768,-10.01967 -6.36329,-0.62775 -9.9097,-0.54186 -17.63862,0.4272 l -2.73379,0.34276 4.55631,-3.21091 c 2.50597,-1.766 7.35805,-5.21094 10.78239,-7.65543 l 6.22608,-4.44453 6.83536,-0.38348 c 17.45874,-0.97946 32.3413,3.21587 51.01209,14.38008 6.47119,3.86945 7.38681,4.25448 8.19514,3.44615 1.27642,-1.27641 0.72574,-2.59086 -4.12361,-9.84291 -5.0295,-7.52147 -12.82349,-15.11889 -21.21126,-20.67631 -16.16555,-10.71069 -29.47249,-12.15519 -66.82882,-7.25442 -13.18554,1.72981 -18.85854,2.7711 -26.72001,4.90451 -6.93923,1.88313 -8.44299,2.6219 -12.01796,5.90419 -3.49824,3.21184 -4.97218,6.41331 -4.9893,10.83701 -0.0109,2.80151 0.27081,3.78427 1.50491,5.2509 1.13127,1.34445 1.31084,1.88394 0.70448,2.11662 -1.2929,0.49613 -5.66923,9.44385 -7.04214,14.39815 -5.11883,18.4719 -2.98997,34.43916 4.34615,32.59791 2.53231,-0.63557 9.14369,-5.29845 13.82402,-9.74982 l 4.54189,-4.31971 -4.12011,4.45172 c -3.7251,4.0249 -4.10231,4.66559 -3.93438,6.68259 0.24646,2.96041 2.88083,4.35489 8.22949,4.35622 2.93163,7.3e-4 5.20434,0.53711 10.02389,2.36572 15.04375,5.70783 29.53128,7.7685 43.0029,6.11662 z m -25.60879,-9.54454 c -0.75566,-0.96354 -0.73418,-0.98503 0.22937,-0.22937 0.58472,0.45858 1.06314,0.93699 1.06314,1.06314 0,0.5 -0.49888,0.17819 -1.29251,-0.83377 z M -1235.5399,279.22112 c 0.029,-0.70771 0.1731,-0.85166 0.3671,-0.36703 0.1755,0.43854 0.1539,0.96252 -0.048,1.16439 -0.2019,0.20187 -0.3455,-0.15694 -0.3191,-0.79736 z"
              sodipodi:nodetypes="sssssssscscssssssssscsssssssssssssssssssssssssssssssssssssscscssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssscsssssssssssssssssssssscsssssssssssssssssssscsscsssssssssssssscssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
       d="m -999.88297,540.19617 c -3.18893,-0.54096 -8.77383,-2.49349 -17.26933,-6.03759 -3.3214,-1.3856 -8.8567,-3.18507 -12.3007,-3.99883 -7.353,-1.73741 -10.3149,-3.12599 -13.5338,-6.34496 -2.3491,-2.34907 -4.067,-4.88084 -3.3118,-4.88084 0.2182,0 1.3772,0.86084 2.5756,1.91297 1.1983,1.05214 3.6567,2.58964 5.4632,3.41666 3.7116,1.69925 10.6089,2.55398 11.3203,1.40285 0.7635,-1.23537 -0.787,-2.29962 -3.8849,-2.66652 -6.367,-0.75407 -12.2102,-4.6976 -14.2632,-9.62611 l -0.9243,-2.21884 2.3118,-0.92502 c 5.8823,-2.3536 18.8151,-3.71545 24.0816,-2.53583 1.0024,0.22453 5.103,1.54679 9.1126,2.93837 7.1204,2.47124 7.4739,2.52975 15.18771,2.51349 7.71937,-0.0163 8.07585,-0.0771 15.79522,-2.69797 7.80715,-2.65063 7.99155,-2.68125 16.09898,-2.67365 7.03212,0.007 8.9159,0.22667 13.21331,1.54368 2.79364,0.85615 5.01194,1.26263 5.01194,0.91839 0,-0.33968 0.15954,-0.45807 0.35452,-0.26309 0.52516,0.52516 -2.02997,5.9906 -3.57361,7.64397 -2.35876,2.52642 -6.38442,4.4504 -10.90596,5.21225 -3.69221,0.62212 -4.40396,0.93184 -4.40396,1.91639 0,1.05596 0.41938,1.16452 4.15975,1.0768 6.53812,-0.15334 11.75211,-3.05211 15.71412,-8.73642 l 1.04109,-1.49367 -0.65395,2.00038 c -0.92437,2.82757 -6.12563,8.29684 -9.39573,9.87986 -1.51947,0.73556 -5.85383,2.09656 -9.63191,3.02444 -3.94791,0.96958 -10.19213,3.15856 -14.6827,5.14717 -10.66224,4.72168 -15.72308,5.73619 -22.70589,4.55167 z m 12.31351,-8.85155 c 1.71206,-0.58336 4.32451,-2.35022 6.71847,-4.54385 2.15442,-1.97413 4.60806,-3.85202 5.45255,-4.17309 0.84448,-0.32107 3.95254,-0.76001 6.90681,-0.97542 6.52502,-0.47576 9.02874,-1.18554 10.22957,-2.89998 2.39642,-3.42136 -0.48279,-6.49946 -6.0732,-6.49272 -4.82446,0.006 -8.79144,2.25327 -15.44679,8.75124 -3.19881,3.12315 -6.71219,6.13155 -7.80754,6.68533 -3.15833,1.59678 -9.0212,1.89404 -13.22921,0.67075 -3.1934,-0.92837 -4.3044,-1.73081 -9.6847,-6.99525 -7.5533,-7.39065 -10.0283,-8.76069 -15.884,-8.79276 -3.4362,-0.0188 -4.6053,0.21702 -5.6195,1.13353 -1.7292,1.56286 -1.6309,4.073 0.2279,5.81928 1.2812,1.2036 2.4337,1.48871 7.652,1.89292 7.2112,0.55858 9.6724,1.02831 9.6724,1.84603 0,0.3273 0.23,0.45291 0.5112,0.27912 0.2812,-0.17378 1.4431,0.65632 2.5819,1.84467 2.7688,2.88903 6.5515,5.46488 9.1004,6.19692 3.3407,0.95944 11.55678,0.82147 14.69174,-0.24672 z m 44.05225,-122.8099 c 1.09191,-0.13521 2.73218,-0.13242 3.64505,0.006 0.91288,0.13862 0.0195,0.24924 -1.98528,0.24583 -2.00478,-0.003 -2.75167,-0.11682 -1.65977,-0.25203 z m -89.04109,-1.41235 c -2.4712,-0.99159 -6.9967,-4.34762 -11.3606,-8.4249 -3.1838,-2.97471 -3.6418,-3.27854 -1.8225,-1.20898 1.3365,1.52034 0.4047,0.69442 -2.0706,-1.83537 -2.4753,-2.52979 -4.3004,-4.18955 -4.0556,-3.68836 0.2447,0.5012 -0.1459,0.15807 -0.868,-0.76251 -0.7222,-0.92058 -1.5694,-1.51536 -1.8827,-1.32174 -0.3133,0.19362 -0.4945,-0.01 -0.4027,-0.4525 0.092,-0.4425 -0.3091,-0.80743 -0.891,-0.81095 -0.5819,-0.004 -0.9919,-0.19337 -0.9112,-0.42189 0.262,-0.7421 -3.9636,-4.72749 -10.6366,-10.03212 -8.3978,-6.67566 -8.6067,-7.47404 -1.2289,-4.69773 5.8859,2.21491 12.5388,5.91551 17.664,9.82541 3.3214,2.53382 4.6109,3.2106 5.1294,2.69209 1.0261,-1.02606 -1.8175,-3.74713 -8.7598,-8.38249 -6.6312,-4.4276 -13.7642,-7.58343 -20.7023,-9.15927 -2.5896,-0.58814 -4.7082,-1.27687 -4.7082,-1.5305 0,-0.25364 -0.3039,-0.46116 -0.6753,-0.46116 -0.3713,0 -3.7202,-2.14928 -7.4419,-4.77619 -3.7218,-2.6269 -8.3684,-5.82919 -10.326,-7.11621 -1.9576,-1.28701 -3.2553,-2.44132 -2.8839,-2.56514 1.1585,-0.38616 17.2265,2.15694 35.9073,5.68309 20.2482,3.82204 27.0885,4.38122 30.0942,2.46019 0.99,-0.63275 1.603,-0.93699 1.3623,-0.67609 -0.2407,0.2609 0.1172,1.25371 0.7955,2.20624 3.8616,5.42308 7.2315,15.98938 8.4981,26.64571 1.1456,9.63735 -0.5294,17.52354 -4.0023,18.84394 -1.858,0.7064 -1.9817,0.70534 -3.8207,-0.0326 z m 69.34198,-0.25732 c -5.74223,-4.02201 -4.30019,-26.86042 2.55558,-40.47416 2.82898,-5.61761 4.11117,-6.89824 5.90767,-5.90054 2.28492,1.26896 10.43039,0.69449 22.61577,-1.595 18.15831,-3.41175 36.33297,-6.47693 37.664,-6.35209 0.6691,0.0628 1.68594,-0.089 2.25965,-0.33728 0.5737,-0.24827 1.37031,-0.34232 1.77023,-0.20901 0.39992,0.1333 -2.52988,2.53487 -6.51068,5.3368 -3.98079,2.80194 -8.66507,6.09831 -10.40949,7.32527 -1.74443,1.22696 -2.99742,2.40511 -2.78442,2.61811 0.213,0.213 -0.31115,0.38727 -1.16479,0.38727 -2.49662,0 -11.95137,2.91269 -16.68803,5.14102 -6.48399,3.05035 -17.80542,11.05616 -17.80542,12.59089 0,1.53489 2.09318,0.8473 5.67594,-1.86448 2.20553,-1.66936 5.87877,-4.14539 8.16274,-5.50227 4.21796,-2.50584 13.76633,-6.32731 14.88106,-5.95574 0.33609,0.11203 -1.67634,2.10456 -4.47205,4.42785 -7.82077,6.4992 -14.22234,12.45008 -14.23743,13.23507 -0.008,0.39008 -0.44944,0.63728 -0.98209,0.54933 -0.53266,-0.0879 -1.34666,0.30626 -1.8089,0.87601 -0.71781,0.88476 -0.71594,0.96087 0.0128,0.52166 0.58353,-0.35168 0.71429,-0.28939 0.41365,0.19705 -0.24178,0.3912 -0.65485,0.57825 -0.91794,0.41565 -0.26309,-0.1626 -1.35499,0.79523 -2.42644,2.1285 -1.07145,1.33328 -2.16236,2.29171 -2.42425,2.12985 -0.48527,-0.29991 -3.86685,2.89783 -3.7589,3.55454 0.0326,0.19829 -0.14578,0.39549 -0.39637,0.43821 -0.2506,0.0427 -2.09591,1.2386 -4.10069,2.6575 -6.54508,4.63232 -8.64726,5.32979 -11.03123,3.65999 z m 20.75137,-11.86274 c 0.60477,-0.66826 0.96289,-1.21502 0.79582,-1.21502 -0.16706,0 -0.79856,0.54676 -1.40333,1.21502 -0.60476,0.66825 -0.96288,1.21501 -0.79582,1.21501 0.16707,0 0.79857,-0.54676 1.40333,-1.21501 z m -6.45633,11.69453 c -0.75566,-0.96354 -0.73417,-0.98503 0.22937,-0.22936 0.58473,0.45857 1.06314,0.93698 1.06314,1.06314 0,0.5 -0.49888,0.17818 -1.29251,-0.83378 z m 6.64618,-1.17438 c 0.43854,-0.17549 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34546 -0.79736,0.31908 -0.70771,-0.0292 -0.85166,-0.17311 -0.36703,-0.36704 z m -2.31613,-3.53381 c 0.78475,-0.83532 1.5635,-1.51877 1.73057,-1.51877 0.16706,0 -0.33831,0.68345 -1.12306,1.51877 -0.78475,0.83533 -1.5635,1.51878 -1.73057,1.51878 -0.16706,0 0.33832,-0.68345 1.12306,-1.51878 z m -139.84087,-35.34649 c 0.4385,-0.1755 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.157,0.34545 -0.7974,0.31907 -0.7077,-0.0292 -0.8516,-0.1731 -0.367,-0.36703 z m 177.3925,0 c 0.43854,-0.1755 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34545 -0.79736,0.31907 -0.70771,-0.0292 -0.85166,-0.1731 -0.36703,-0.36703 z m -198.9855,-15.19391 c 0.5911,-0.15403 1.4113,-0.1439 1.8226,0.0225 0.4113,0.16641 -0.072,0.29244 -1.0747,0.28006 -1.0024,-0.0124 -1.339,-0.14854 -0.7479,-0.30257 z m -66.8156,-53.95092 c 0,-1.67064 0.1225,-2.28199 0.2622,-1.35854 0.1396,0.92345 0.1359,2.29035 -0.01,3.03755 -0.1442,0.74719 -0.2585,-0.008 -0.2539,-1.67901 z m 354.74261,-4.29818 c -0.50455,-11.8428 -6.21169,-32.15822 -13.14703,-46.79887 -7.09847,-14.98501 -17.74545,-25.69952 -33.46463,-33.67689 -13.05355,-6.62458 -25.98362,-9.94898 -38.5709,-9.9168 -7.69242,0.0197 -9.53968,0.2887 -29.76792,4.33549 -34.35493,6.87292 -48.14985,8.42093 -69.86353,7.83978 -20.0194,-0.5358 -26.8651,-1.55961 -62.2696,-9.31278 -9.6695,-2.11752 -11.0051,-2.26365 -20.959,-2.29325 -9.7556,-0.029 -11.1753,0.10956 -17.2328,1.68206 -20.0545,5.20604 -31.2263,10.98533 -41.7206,21.58273 -14.2543,14.39421 -20.9253,29.28677 -26.9774,60.22532 -0.8824,4.51087 -0.8889,4.43513 -0.6487,-7.59386 0.7513,-37.62182 12.0428,-63.68247 33.8035,-78.01822 6.3197,-4.1634 12.4047,-6.7003 21.1506,-8.81803 18.5459,-4.49066 31.851,-3.7572 70.784,3.90203 46.0409,9.05755 58.21587,8.95607 108.46596,-0.90413 28.08998,-5.51188 39.66997,-6.84735 50.11945,-5.78003 28.67121,2.92848 47.37715,14.66089 58.77051,36.861 8.0689,15.72237 12.50899,38.98103 11.869,62.17376 -0.11525,4.17662 -0.26866,6.20643 -0.34091,4.51069 z"
       
       sodipodi:nodetypes="sssssssssscssssscsssssssscsssssssssssssssssssssssssscsssssssssscssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssscscccssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
              style="display:inline;fill:#281a16;stroke:none;stroke-opacity:1"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       d="m -765.37492,350.80764 c 2.3e-4,0.005 -2.2e-4,0.0102 0,0.0155 -8.69421,15.63249 -17.28071,31.32886 -24.99356,47.47269 -1.70527,3.56639 -3.36544,7.18176 -5.62589,10.44173 -0.33679,0.48585 -0.678,0.96658 -1.02752,1.44253 0.0801,5.78878 0.13793,11.80439 0.1731,17.93181 0.11133,19.39612 -0.0289,23.17446 -1.24502,33.4113 -3.22205,27.12039 -11.01244,80.22501 -15.95221,108.74488 -8.24775,47.61861 -22.06855,73.52642 -59.76751,112.02719 -17.64362,18.01887 -37.61912,35.93302 -50.0182,44.85615 -13.77821,9.91565 -32.90505,16.82515 -52.47717,18.95712 -6.82604,0.74355 -32.6622,0.72388 -39.359,-0.0289 -19.532,-2.19598 -38.9963,-9.66782 -53.4603,-20.51949 -27.1755,-20.3886 -62.8514,-56.31372 -78.5027,-79.05087 -17.64,-25.62629 -24.3456,-44.8851 -31.7291,-91.12376 -10.3142,-64.59185 -14.1369,-93.84622 -14.7227,-112.69298 -0.1244,-4.00238 -0.1056,-12.12891 0.011,-21.82221 -5.8243,-22.83176 -29.5954,-54.8602 -29.4212,-53.69334 1.7321,1.25952 2.9842,2.93605 4.0991,4.83582 1.0467,1.8903 1.3421,3.98615 1.4203,6.10525 0.012,0.32049 0.016,0.63493 0.013,0.94319 2.7316,6.58659 8.9731,25.19787 14.9003,44.5854 l 5.1354,16.79775 0.9143,11.44929 c 1.1248,14.09929 3.7493,35.29592 7.3148,59.04624 1.4877,9.90987 2.707,18.60787 2.7075,19.32996 0,0.21862 -0.057,0.45923 -0.1664,0.71461 0.4066,1.21196 0.6349,2.47728 0.7878,3.75502 0.028,0.2681 0.052,0.53006 0.071,0.78785 0.1213,-0.0516 0.2065,-0.0749 0.2442,-0.0666 v 0.002 0.002 0.002 0.002 c 0.1037,0.10377 1.4286,7.74114 2.945,16.97308 5.6853,34.61214 8.6797,47.362 14.7427,62.7813 6.1153,15.55249 13.0966,27.51489 24.4276,41.8579 l 3.3134,4.19444 0.5593,12.81858 c 0.6228,14.28166 0.2084,45.0611 -0.7457,55.34005 -1.4757,15.89897 -4.7267,24.14735 -11.4604,29.09036 -2.9284,2.14965 -23.5047,13.26057 -38.4712,20.77249 -4.2338,2.12497 -7.8908,4.17309 -8.1248,4.55175 -0.5071,0.82054 5.0841,6.63392 12.783,13.29129 39.0588,33.77492 98.612,54.97349 167.9754,59.79192 6.7079,0.46596 50.90686,-0.14718 57.10655,-0.79228 35.82834,-3.72809 63.91353,-10.29299 92.94802,-21.729 18.51084,-7.29099 37.03858,-17.22398 50.69952,-27.17956 10.80865,-7.87693 25.23992,-20.99379 25.23991,-22.94073 0,-0.68522 -1.14752,-1.64042 -3.18911,-2.65427 -14.61763,-7.25907 -41.16494,-21.63497 -43.86635,-23.7552 -5.94427,-4.66547 -8.78894,-11.38519 -10.49721,-24.78718 -0.82069,-6.43856 -1.01273,-13.79488 -1.03863,-39.50324 l -0.0333,-31.58927 4.93347,-6.37822 c 16.45181,-21.27301 25.87102,-41.79378 31.86447,-69.41696 2.11761,-9.75987 4.92715,-25.73554 7.55444,-42.97198 0.81641,-5.35612 1.05797,-7.24717 1.69553,-7.53225 0.0248,-0.1647 0.0515,-0.3289 0.0799,-0.49268 0.0124,-0.0754 0.0233,-0.15095 0.0355,-0.22636 -0.042,-0.35527 -0.0572,-0.71214 -0.0444,-1.0697 0.005,-0.13122 0.0165,-0.26398 0.0244,-0.39503 0.0618,-0.80789 0.25523,-1.59473 0.44829,-2.37907 0.0194,-0.0774 0.0408,-0.17353 0.0666,-0.27963 -0.0962,-0.42802 -0.0409,-0.9098 0.0732,-1.59789 3.53712,-21.32484 9.61849,-68.92516 10.43951,-81.71178 0.33914,-5.28177 1.12871,-8.53351 6.04754,-24.90702 5.43951,-18.10642 11.63328,-36.89727 14.17457,-43.12289 0.0401,-0.10501 0.0834,-0.21211 0.13093,-0.31957 0.22247,-0.53313 0.41493,-0.95588 0.57036,-1.26056 0.31153,-0.61064 0.71031,-1.22764 1.18288,-1.83978 0.53466,-0.91874 1.06779,-1.83783 1.57125,-2.77411 0.84139,-1.50955 1.67355,-3.02364 2.52554,-4.52733 0.22529,-0.40717 0.45144,-0.81355 0.67688,-1.22061 -0.67736,0.3107 -1.12099,0.42774 -1.11851,0.26409 0.004,-0.26468 0.82765,-4.58202 1.8309,-9.59396 0.50758,-2.53572 0.70021,-5.01049 0.59699,-7.42572 v -0.002 l 0.002,-0.002 v -0.002 c 0.002,-0.003 0.005,-0.006 0.007,-0.009 z m -22.19727,45.61292 c 0.0113,-6.2e-4 0.0237,-4.9e-4 0.0355,0 0.0861,0.004 0.18409,0.0375 0.28851,0.10209 0.33413,0.2065 0.60808,0.49402 0.60808,0.64137 0,0.14734 -0.27395,0.26854 -0.60808,0.26854 -0.33413,0 -0.60587,-0.28975 -0.60587,-0.6436 0,-0.22804 0.11167,-0.3592 0.28185,-0.3684 z m 2.29918,1.74214 c 0.12527,-0.0109 0.32297,0.10766 0.56814,0.35287 0.39503,0.39539 0.57654,0.86155 0.40391,1.03418 -0.40545,0.40545 -1.12292,-0.31428 -1.12296,-1.12517 0,-0.16655 0.0535,-0.25342 0.15091,-0.26188 z m -1.89083,1.14293 h 0.002 0.002 0.002 c 10e-4,4e-5 0.003,4e-5 0.004,0 0.0782,-0.003 0.23545,0.11492 0.48158,0.34177 1.09663,1.01075 0.59616,2.77877 -0.57479,2.03065 -0.57475,-0.36721 -0.63782,-0.58655 -0.17089,-0.59255 0.44142,-0.006 0.58925,-0.43798 0.36618,-1.07192 -0.14122,-0.40132 -0.19154,-0.6291 -0.13981,-0.69241 9.8e-4,-10e-4 0.006,-0.006 0.007,-0.007 0.006,-0.004 0.0124,-0.007 0.02,-0.009 z m -3.30007,0.14647 c 0.16343,-0.005 0.17976,0.44545 0.17976,1.45585 0,1.42011 0.25145,1.84841 1.02087,1.73548 1.23991,-0.18198 3.21056,1.39038 2.90504,2.31915 -0.12123,0.36853 -0.52149,1.84331 -0.88771,3.27345 -0.42504,1.65984 -0.9115,2.44631 -1.34711,2.17711 -0.45535,-0.28143 -0.54463,-0.0595 -0.26631,0.66579 0.22941,0.59781 -0.0348,2.69956 -0.58811,4.67159 -0.55333,1.97204 -1.28312,3.75623 -1.6223,3.96586 -0.33949,0.20981 -0.43231,0.0838 -0.20639,-0.28185 0.22572,-0.36522 0.0138,-0.88511 -0.46827,-1.15625 -0.62958,-0.35406 -0.93768,-1.99224 -1.09854,-5.81008 -0.12318,-2.92364 -0.0272,-5.31518 0.21305,-5.31518 0.24028,0 0.86643,-0.42923 1.39149,-0.95429 0.52936,-0.52936 0.98764,-0.66498 1.02974,-0.30405 0.0418,0.35799 0.11133,0.9706 0.15313,1.36042 0.0418,0.38982 0.41858,0.82307 0.83889,0.96317 0.58755,0.19585 0.6222,-0.14456 0.1487,-1.46916 -0.28302,-0.79173 -0.42027,-1.20598 -0.38616,-1.28719 l 0.002,-0.002 0.002,-0.002 v -0.002 h 0.002 l 0.002,-0.002 v -0.002 h 0.002 c 10e-4,-1.3e-4 0.008,-10e-6 0.009,0 v 0.002 h 0.002 c 0.0808,0.0241 0.29909,0.28685 0.66357,0.75677 0.87989,1.13448 0.90982,1.11292 0.77675,-0.4949 -0.15707,-1.89784 -1.34995,-3.24867 -1.97516,-2.23704 -0.21654,0.35035 -0.85534,0.63306 -1.42034,0.62806 -0.85149,-0.008 -0.87829,-0.10402 -0.15535,-0.56148 0.64939,-0.41091 0.70308,-0.75705 0.20417,-1.3582 -0.49561,-0.59716 -0.44819,-1.11535 0.18864,-1.98626 0.34041,-0.46556 0.54759,-0.7286 0.67244,-0.74568 h 0.002 0.002 0.002 z m 1.0941,4.25659 c 0.0888,5.2e-4 0.18997,0.0343 0.29961,0.10209 0.33413,0.2065 0.60808,0.49847 0.60808,0.64581 0,0.14735 -0.27395,0.26631 -0.60808,0.26631 -0.33413,0 -0.60587,-0.28974 -0.60587,-0.64359 0,-0.22112 0.10687,-0.35238 0.26854,-0.3684 0.0121,-0.001 0.025,-0.002 0.0377,-0.002 z m -11.92199,130.00117 c -0.0172,0.0642 -0.0378,0.12879 -0.0599,0.19529 -10e-4,0.009 -0.003,0.0178 -0.004,0.0266 0.0247,-0.0712 0.0505,-0.14189 0.0754,-0.21306 -0.004,-0.003 -0.007,-0.006 -0.0111,-0.009 z m -386.9653,1.70663 c 0.017,-0.093 -0.049,0.18116 -0.071,0.27297 -0.01,0.0276 -0.013,0.0567 -0.02,0.0843 0,-0.009 0.01,-0.018 0.011,-0.0266 0.027,-0.11041 0.06,-0.21875 0.08,-0.33067 z m 213.6859,26.65359 c -4.20329,-0.004 -5.50107,0.29696 -10.93663,2.5211 -8.5092,3.48182 -11.70127,3.46893 -20.39297,-0.0843 -6.3164,-2.58229 -6.3493,-2.59001 -12.4569,-2.28586 -11.7182,0.58355 -24.987,6.21303 -46.5206,19.72942 -14.5449,9.12966 -20.0205,14.57909 -19.2722,19.17905 0.5083,3.12486 5.698,14.42097 10.384,22.60118 16.9666,29.61843 34.6474,42.63815 63.5647,46.8069 7.5521,1.08871 26.87585,0.7668 34.1237,-0.56814 24.73851,-4.55644 41.93616,-17.47426 56.97344,-42.79887 4.40939,-7.42594 7.00939,-12.54405 10.36849,-20.40631 2.33929,-5.47525 2.50177,-6.1818 1.88639,-8.23576 -0.8979,-2.99691 -6.02954,-7.8092 -14.04806,-13.17145 -23.73252,-15.87071 -40.79995,-23.27543 -53.67336,-23.28693 z m -40.4908,2.45896 c 2.5371,-0.009 3.8266,0.50118 8.5154,2.43899 5.5473,2.29257 6.95365,2.63229 10.92328,2.64539 3.95652,0.0131 5.31695,-0.30081 10.32854,-2.39683 5.4737,-2.28928 6.08475,-2.41093 11.84653,-2.36353 5.29711,0.0436 6.9017,0.3273 12.53451,2.23482 12.8931,4.36618 35.05967,16.89984 46.32532,26.19419 1.63189,1.34635 2.68843,2.54153 2.35022,2.65427 -0.33821,0.11273 -3.44976,-0.86616 -6.91528,-2.17268 -3.46553,-1.30652 -8.62472,-3.1282 -11.46482,-4.05019 -2.8401,-0.92198 -6.05338,-2.33913 -7.13944,-3.14917 -3.21525,-2.39813 -5.92202,-3.23349 -10.48389,-3.23349 -2.36354,0 -7.90815,-0.44357 -12.32146,-0.98536 -6.26918,-0.76962 -10.21793,-0.88411 -18.04943,-0.51931 -12.55116,0.5842 -21.09556,0.58405 -34.62748,-0.004 -15.7926,-0.6872 -25.1876,0.90142 -46.7048,7.89843 v 0.002 c -5.6146,1.82578 -12.1644,4.12464 -14.5563,5.11101 -2.392,0.98638 -4.3498,1.56571 -4.3498,1.28941 0,-1.52347 9.0623,-8.2067 20.5395,-15.15105 16.6147,-10.05286 30.4364,-15.66631 40.1246,-16.29398 1.2946,-0.0839 2.2791,-0.14576 3.1248,-0.14869 z m -4.2544,19.40985 5.3174,0.0555 c 2.9237,0.0317 8.0481,0.37524 11.3894,0.76122 l 6.07637,0.69907 0.1731,6.47587 c 0.16232,6.11408 0.0885,6.56844 -1.31381,8.20025 h 0.002 c -1.45855,1.69718 -1.60708,1.73013 -8.37336,1.82203 -8.2523,0.11213 -9.0959,-0.0368 -11.0143,-1.95518 -1.7405,-1.74055 -2.2337,-4.17892 -2.2437,-11.0476 z m 44.04612,0.091 3.64406,0.21084 0.19086,4.25436 c 0.33512,7.4807 -0.15685,9.12434 -3.41547,11.38714 -2.70202,1.87626 -3.16213,1.98401 -8.92374,2.1172 -6.36761,0.1472 -7.86658,-0.17566 -9.49853,-2.04396 -1.60243,-1.83449 -1.88599,-3.67228 -1.44032,-9.30324 l 0.42167,-5.31296 7.68759,-0.76121 c 4.22874,-0.41775 9.3291,-0.66415 11.33388,-0.54817 z m 6.46921,0.15979 c 2.78462,-0.0233 12.06195,1.06273 12.05293,1.50468 -0.004,0.20343 -1.03035,1.03014 -2.2792,1.83756 -1.24885,0.80742 -4.07844,2.92724 -6.28723,4.70932 -2.2088,1.78209 -4.18941,3.24015 -4.40306,3.24015 -0.61322,0 -0.45246,-10.82488 0.16644,-11.20738 0.0868,-0.0537 0.35232,-0.0809 0.75012,-0.0843 z m -52.03113,0.0511 0.1776,5.46831 c 0.2231,6.82737 -0.06,7.95085 -2.2837,9.10128 -2.5871,1.33788 -8.3724,1.19743 -10.7657,-0.26188 -2.7129,-1.65413 -3.2291,-2.95279 -3.2291,-8.12479 v -4.52734 l 3.8638,-0.72792 c 2.1246,-0.4009 5.7468,-0.7732 8.0494,-0.8278 z m 73.55152,1.83756 h 0.002 c 3.01049,-0.0119 4.14423,0.29016 6.1807,1.63783 7.18839,4.75705 10.28107,15.80026 7.66985,27.38818 -1.57119,6.97252 -1.96404,7.46958 -6.30055,7.92284 -3.94118,0.41193 -5.58734,1.04374 -7.68981,2.95608 -1.0915,0.9928 -1.53318,1.07357 -2.64761,0.47715 -0.73539,-0.39357 -2.53784,-0.62053 -4.00581,-0.50378 -1.46798,0.11676 -2.66979,0.009 -2.66979,-0.23746 0,-0.24652 1.00918,-2.02481 2.24369,-3.95255 2.5653,-4.00583 5.92264,-11.63718 6.48919,-14.75601 0.14714,-0.81001 0.27347,-1.40228 0.22414,-1.49358 l -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 h -0.002 c -9.1e-4,-9e-5 -0.008,-5e-5 -0.009,0 h -0.002 c -0.17957,0.0761 -1.03484,1.98412 -3.55307,7.49673 -2.45067,5.36473 -6.47246,11.40426 -9.51629,14.28553 -1.73155,1.63906 -1.95824,1.69188 -4.09901,0.98536 -1.33886,-0.44144 -3.83763,-0.62162 -6.10747,-0.43942 -2.12972,0.17095 -4.72905,0.82001 -5.8345,1.45585 -1.91945,1.10407 -2.07434,1.10281 -4.1212,0.0688 -2.691,-1.35976 -8.83215,-1.42008 -12.08178,-0.11984 -2.17102,0.86867 -2.55675,0.86867 -4.23661,0 -2.39144,-1.23669 -9.04379,-1.24869 -12.10839,-0.0222 -2.1704,0.86844 -2.5136,0.84829 -5.0244,-0.29073 -3.3651,-1.52661 -9.9805,-1.70204 -11.9575,-0.31736 -1.2155,0.8514 -1.4303,0.83115 -2.4967,-0.23524 -0.6417,-0.6417 -1.6682,-1.44875 -2.2837,-1.79318 -1.0672,-0.59733 -1.07,-0.67858 -0.058,-1.79984 3.1919,-3.52697 12.2615,-6.78197 25.9235,-9.2988 15.7933,-2.90949 22.46438,-6.19463 39.7828,-19.60292 10.9718,-8.49459 13.37066,-9.78238 18.29799,-9.80258 z m -91.47442,0.26632 v 4.59835 c 0,4.19066 -0.1414,4.72717 -1.6068,6.08527 -2.4126,2.23587 -6.6843,2.1082 -8.9592,-0.26631 -2.1903,-2.28617 -2.8696,-6.35853 -1.2006,-7.20157 1.0445,-0.52759 6.0713,-1.94335 10.0977,-2.8429 z m -15.2975,4.58282 c 0.082,0.004 0.1427,0.0169 0.1798,0.0399 0.9301,0.57484 0.584,3.06781 -0.5726,4.11455 -0.6111,0.55298 -2.0545,1.00756 -3.2069,1.00756 -2.3013,0 -5.2083,-1.65378 -4.3742,-2.48782 0.7748,-0.77477 6.741,-2.73517 7.9739,-2.67423 z m 121.19504,0.98758 c 0.38907,10e-6 1.0801,0.21574 2.14827,0.58811 2.16467,0.75461 2.48017,2.02305 0.7368,2.95608 -1.59257,0.85231 -1.50659,0.89938 -2.64982,-1.49801 -0.69184,-1.4508 -0.88371,-2.0462 -0.23525,-2.04618 z m 21.91098,12.17054 c 0.0407,-0.002 0.0729,0.007 0.0954,0.0289 0.78003,0.77338 -9.1692,20.01885 -14.36542,27.78764 -5.54766,8.29421 -14.13328,17.71165 -20.53946,22.53238 -8.23357,6.19586 -20.27707,11.12718 -31.64254,12.95618 -16.23295,2.61231 -34.7843,1.36257 -48.7266,-3.28232 -20.421,-6.80331 -36.4695,-22.88371 -49.3857,-49.49002 -5.3815,-11.08532 -5.4421,-11.86252 -0.5148,-6.37822 19.3854,21.57718 37.2992,32.26893 61.8736,36.92887 7.9136,1.50059 29.86269,1.45671 38.27371,-0.0754 11.44031,-2.08427 25.25313,-7.46011 34.82499,-13.55538 8.44173,-5.37562 19.56523,-15.50408 27.25723,-24.81825 1.25034,-1.51403 2.45572,-2.61773 2.84956,-2.63429 z m -138.81392,20.67929 c 0.519,-0.002 1.0529,0.0406 1.5579,0.13537 2.4016,0.45055 3.7017,1.8052 4.2633,4.44744 0.3129,1.47236 0.209,1.97517 -0.4128,1.97517 -0.9484,0 -8.3734,-4.94313 -8.3734,-5.57706 0,-0.56703 1.4078,-0.97343 2.965,-0.98092 z m 109.43505,0.19085 c 1.31959,0.0312 2.4168,0.36074 2.4168,0.88106 0,0.2506 -1.43493,1.40533 -3.18911,2.56771 -1.75418,1.16237 -3.80439,2.44263 -4.55618,2.8429 -1.29149,0.6876 -1.36708,0.61305 -1.36708,-1.32713 0,-2.37271 1.33566,-3.83672 4.2699,-4.67825 0.76321,-0.21888 1.63392,-0.30503 2.42567,-0.28629 z m -13.51099,2.6698 c 1.76339,-0.0315 3.34009,0.39513 4.04575,1.40259 1.30785,1.86722 1.18565,3.94835 -0.28185,4.73373 -3.16161,1.69204 -10.85162,4.72108 -11.17187,4.40084 -0.57767,-0.57771 -0.41057,-5.40498 0.24634,-7.13278 0.77053,-2.02668 4.22266,-3.3519 7.16163,-3.40438 z m -82.58616,0.0688 c 1.1212,0.012 2.372,0.1972 3.704,0.57923 2.7272,0.78212 3.056,1.42052 3.067,5.93658 0.01,2.64354 -0.2214,3.79188 -0.7501,3.78388 -0.4177,-0.006 -3.0832,-1.04044 -5.9233,-2.29696 -4.4397,-1.9642 -5.1907,-2.50997 -5.3529,-3.89928 -0.3034,-2.59834 1.8915,-4.13944 5.2553,-4.10345 z m 68.34724,1.83091 c 1.93766,-0.0241 2.50383,0.25792 3.38884,1.14293 1.11931,1.11931 1.29147,1.8891 1.1385,5.08881 l -0.17977,3.76835 -6.37822,1.62007 c -3.50836,0.89082 -6.75532,1.64091 -7.21489,1.66891 -0.6677,0.0407 -0.78142,-0.99145 -0.56369,-5.13986 0.35917,-6.84305 1.08074,-7.63131 7.35248,-8.03381 1.01323,-0.065 1.81086,-0.10737 2.45675,-0.1154 z m -53.93304,0.0111 c 0.6219,-5e-5 1.3158,0.0251 2.0884,0.0688 6.0293,0.34068 6.8305,1.24877 6.9175,7.83629 0.038,2.88091 -0.1915,5.06852 -0.5415,5.15983 -0.7451,0.19427 -6.8698,-1.24091 -10.7835,-2.52776 l -2.8851,-0.94985 v -3.88597 c 0,-4.48387 0.851,-5.70101 5.2042,-5.70134 z m 35.68387,0.55926 h 0.002 c 3.18548,0.17879 6.20109,1.18176 6.59349,2.87398 0.13865,0.5981 0.10408,3.13988 -0.0754,5.64585 l -0.32624,4.55619 -2.73415,0.41057 c -1.50358,0.22583 -4.717,0.43015 -7.13944,0.45495 l -4.40306,0.0444 0.009,-5.61923 c 0.005,-3.0907 0.20947,-5.91959 0.45495,-6.28723 1.07505,-1.61002 4.43316,-2.25749 7.6188,-2.07947 z m -16.93537,0.0133 c 2.9521,0 4.19597,0.28715 5.43061,1.25833 1.52701,1.20116 1.6001,1.52267 1.6001,6.98631 v 5.72797 l -4.70711,-0.0866 c -2.5896,-0.0474 -5.8029,-0.25177 -7.1394,-0.45495 l -2.4301,-0.3684 -0.4927,-4.53622 c -0.7788,-7.15639 0.4622,-8.52648 7.7386,-8.52648 z m -133.6075,35.80591 3.6086,4.11899 c 6.4991,7.41669 25.9418,26.84783 36.7913,36.77131 24.6048,22.50474 37.1681,30.91538 55.0981,36.88448 14.508,4.82986 25.5853,6.34004 46.35416,6.32274 17.56749,-0.0146 24.93513,-0.82146 37.94086,-4.15672 23.80381,-6.1044 38.12606,-15.63112 72.33976,-48.11406 10.09433,-9.58369 21.12097,-20.92687 28.39351,-29.2102 1.12391,-1.28015 2.06224,-2.17903 2.22816,-2.16158 h 0.002 0.002 0.002 0.002 l 0.002,0.002 v 0.002 0.0111 0.002 0.002 c 0.002,0.007 0.004,0.0168 0.004,0.0244 -0.31035,7.1014 0.67579,62.82106 1.1851,66.98241 2.11482,17.27908 6.03314,24.34391 17.05519,30.74816 l 5.03111,2.92502 -2.88506,2.61209 c -8.35893,7.56783 -23.12934,17.20719 -35.23556,22.994 -31.21173,14.91932 -65.84578,23.28697 -106.6299,25.76366 -44.89953,2.72661 -93.70893,-4.38502 -131.22393,-19.12135 -18.6529,-7.32709 -37.4319,-18.44699 -50.0671,-29.64518 l -2.9827,-2.64539 4.8847,-2.81627 c 8.7688,-5.05789 12.5012,-10.03257 15.0245,-20.02237 2.5056,-9.9197 3.0689,-19.06797 3.0693,-49.8451 z m 309.24159,102.84824 15.33303,8.03381 15.33524,8.0338 -5.9277,5.74129 c -34.558,33.46618 -94.59106,56.61548 -162.05649,62.49279 -10.05038,0.87555 -40.11447,1.23735 -50.42437,0.60587 -66.0186,-4.04366 -124.4103,-23.64544 -163.1128,-54.7586 -7.361,-5.9175 -15.6765,-13.86773 -14.887,-14.23226 0.3341,-0.15427 7.2842,-3.78454 15.4462,-8.06709 l 14.8404,-7.78747 5.9521,4.97563 c 8.1561,6.82009 15.58,11.97622 24.3722,16.91982 56.2279,31.61552 143.86008,40.53684 217.62951,22.15732 21.6831,-5.40231 46.19881,-15.30402 62.56382,-25.26654 6.06099,-3.68974 17.17196,-11.86563 21.88878,-16.10755 z"
       sodipodi:nodetypes="cccscscsssscsssscccccsccscccccccccsscccssssssssssssscccssccccccccssccsccccssscccccsccsssssscssscccsssscssccccssssssssssssssssscccccccccccssscsssccccccssssccccccccccccccsssssscsssssssscssssssssssssccccsssscccccccccssccsccssscccsscsssssscccsscccccssssssssssccccccscsscsscsscsssscsscccssssscscssssssssssscssssscscssssccssscsssssssssssssssccssssscccssssscssccsscssscsccssscssscccccssccsssssscccccccccccsccsssscccsccccccssssccccsscc" />
     </g>
            <g id="svg-part-leher" class="cursor-pointer" style="${isKActive('Leher') ? activeGlow : normalTransition}" onclick="changeKepala('Leher')" onmouseenter="hoverPart('Leher', activeKepala)" onmouseleave="unhoverPart('Leher', activeKepala)">
                <path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.0489,781.01587 c -18.4828,-2.61391 -36.6556,-9.49104 -52.7403,-19.95844 -15.8824,-10.3358 -41.8926,-35.30529 -60.7843,-58.35218 -10.291,-12.55464 -9.45,-10.53181 -9.8382,-23.66314 -0.2129,-7.20277 -0.1176,-11.2686 0.2641,-11.2686 0.3284,0 3.4895,3.2122 7.0247,7.13823 7.2747,8.07903 21.3754,22.04493 32.6856,32.37323 30.541,27.8895 45.6069,36.332 73.7812,41.34474 10.3478,1.84107 35.26256,2.31824 47.45151,0.90881 23.82232,-2.75462 41.20257,-9.84121 60.07753,-24.49588 15.87683,-12.32691 49.06637,-44.12649 59.77235,-57.26913 l 1.23719,-1.51877 -0.21998,6.37884 c -0.12099,3.50836 -0.24754,9.01883 -0.28122,12.24549 l -0.0612,5.86666 -5.51083,6.89102 c -17.95534,22.45231 -41.05886,45.80757 -57.36631,57.9914 -18.83983,14.07586 -39.32153,22.56893 -61.35836,25.44326 -8.68677,1.13303 -25.92748,1.10498 -34.13348,-0.0555 z m -123.2691,-76.48805 c 7e-4,-5.34608 0.094,-7.45178 0.2065,-4.67935 0.1128,2.77244 0.1122,7.1465 0,9.72014 -0.1136,2.57364 -0.2059,0.30528 -0.2051,-5.04079 z m 285.54281,-10.6314 c 0,-7.51792 0.0872,-10.59343 0.19379,-6.83447 0.10659,3.75896 0.10659,9.90998 0,13.66894 -0.10658,3.75896 -0.19379,0.68345 -0.19379,-6.83447 z m -285.67031,-0.91127 c 0.012,-1.00238 0.1485,-1.33891 0.3026,-0.74782 0.154,0.59109 0.1439,1.41122 -0.023,1.82253 -0.1665,0.4113 -0.2925,-0.0723 -0.2801,-1.07471 z"
              sodipodi:nodetypes="ssssssssssscsscssssscscccsssscsccc"
       transform="matrix(0.88007022,0,0,0.88007022,1174.8201,-9.844729)" /><path
       style="fill:#f2b492;display:inline;stroke:none;stroke-opacity:1"
       d="m -1013.8472,818.03176 c -62.4502,-4.3756 -111.4875,-21.09441 -142.7508,-48.66956 l -2.7201,-2.39918 2.7201,-1.37186 c 16.0946,-8.11721 19.5081,-17.81782 20.4485,-58.11048 l 0.3847,-16.48731 2.583,3.42588 c 18.0597,23.95292 49.3607,54.90352 67.3926,66.63813 16.2095,10.5486 34.2234,17.33985 52.9636,19.96726 8.4219,1.18077 25.05487,1.20424 33.91014,0.0479 22.04486,-2.87879 42.51968,-11.36939 61.35836,-25.44439 16.27021,-12.156 39.4161,-35.5452 57.2738,-57.87585 l 5.41831,-6.77547 0.36689,17.40687 c 0.20179,9.57378 0.6797,20.40444 1.06202,24.06813 1.14247,10.94804 3.74898,19.26463 7.63419,24.3584 1.82537,2.39318 7.5064,6.63394 11.76264,8.78054 l 2.71921,1.37141 -2.71921,2.42523 c -22.45483,20.02718 -60.14459,36.40596 -100.83184,43.81834 -10.64031,1.93845 -26.36354,3.81503 -38.56643,4.60294 -8.775,0.56658 -33.55488,0.7034 -40.40968,0.22312 z"
       
       sodipodi:nodetypes="sscsscsssssscsssscsssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.8201,-9.844729)" />
       </g>
            <g id="svg-part-telinga" class="cursor-pointer" style="${isKActive('Telinga') ? activeGlow : normalTransition}" onclick="changeKepala('Telinga')" onmouseenter="hoverPart('Telinga', activeKepala)" onmouseleave="unhoverPart('Telinga', activeKepala)">
                <path
       
       style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
       d="m -748.3397,381.79771 c -0.7722,-0.0437 -1.53396,0.10329 -2.66314,0.41944 -3.54636,0.99292 -7.87472,4.36334 -11.7511,9.15011 -9.0302,11.151 -27.20502,46.88848 -27.184,53.45143 0.004,1.21871 1.14071,4.57416 2.66314,7.86292 2.15305,4.65102 2.70939,6.58 2.94055,10.18207 0.3611,5.62669 -0.75843,8.75737 -4.78034,13.35343 -4.03409,4.60998 -5.64221,8.13102 -5.92327,12.98059 -0.20917,3.60905 -0.0771,4.16206 1.40481,5.92326 1.30539,1.55137 2.09566,1.94187 3.92147,1.94187 4.27118,0 6.48357,-2.31369 9.989,-10.44616 1.3037,-3.02454 1.93656,-3.71065 5.01558,-5.44834 6.4882,-3.66172 10.01587,-8.39698 12.01963,-16.12975 3.43943,-13.2732 -3.28659,-31.17359 -13.51321,-35.96348 l -3.05373,-1.43144 1.57569,-3.21574 1.57791,-3.21574 2.88728,1.4625 c 6.27816,3.18139 11.58573,3.1411 13.71074,-0.10208 1.48745,-2.27013 0.77226,-8.42616 -1.91081,-16.46265 l -2.27476,-6.81541 1.99735,-2.52111 c 1.78381,-2.25224 2.07674,-2.41285 2.74082,-1.50467 1.36179,1.86235 5.72758,14.33889 7.52781,21.51151 2.46328,9.81443 3.20921,15.92565 3.23349,26.51821 0.0123,5.37957 -0.31573,10.0528 -1.11408,14.37208 1.60484,-2.75654 2.87312,-4.79895 4.1656,-7.04401 0.0278,-0.21303 0.0547,-0.42942 0.0821,-0.64581 0.49639,-3.91357 1.60774,-8.82241 2.68089,-11.84653 3.86906,-10.903 5.69391,-25.57531 4.83582,-38.87962 -0.64293,-9.96839 -2.96635,-14.78117 -8.07819,-16.7334 -1.16819,-0.44614 -1.95086,-0.67979 -2.72306,-0.72348 z m -493.5664,0.0843 c -1.5694,-0.0626 -3.0971,0.30906 -4.6138,1.08745 -5.5638,2.85535 -7.6599,10.68796 -7.1217,26.61364 0.3771,11.16035 1.6354,18.75256 4.4807,27.03309 2.1155,6.15698 2.6257,8.52989 3.8838,18.0694 0.3629,2.75182 0.9203,5.42693 1.6888,8.0671 0.3341,0.54653 0.6551,1.09853 0.8922,1.69109 0.2413,0.60319 0.3538,1.25009 0.5592,1.86642 0.4955,1.48649 1.8841,4.21987 2.6144,5.59925 0.861,1.62644 2.0297,3.10047 2.9871,4.66715 0.3341,0.54666 0.5264,1.18416 0.9321,1.68 0.1762,0.21538 0.563,0.16484 0.7479,0.37284 0.3333,0.37496 0.4674,0.88974 0.7457,1.30716 0.4156,0.62346 1.0779,1.05653 1.4936,1.67999 0.1858,0.27882 0.2004,0.64697 0.3728,0.93432 0.205,0.34167 0.5324,0.59695 0.7479,0.9321 0.3464,0.53891 0.5821,1.14559 0.9321,1.68222 0.5848,0.89672 1.3236,1.68932 1.8664,2.61209 0.6952,1.18172 1.1928,2.47296 1.8398,3.68179 1.6975,2.44364 3.2874,4.9638 4.1678,6.66451 2.4599,4.75156 3.5428,5.82086 4.4341,4.37865 0.7706,-1.24674 -3.8654,-9.50772 -9.6316,-17.16616 -8.9963,-11.94853 -12.2114,-18.66364 -14.0858,-29.41216 -1.7462,-10.01353 -0.8395,-26.80656 2.0595,-38.15391 2.3503,-9.19937 7.5036,-23.39422 8.4821,-23.3624 0.2195,0.007 1.1793,1.11604 2.1327,2.46341 l 1.7333,2.45009 -2.2659,6.79988 c -2.7363,8.21448 -3.3608,13.62982 -1.842,15.94777 2.4013,3.66491 7.2288,3.85427 13.7662,0.5415 l 3.0115,-1.52464 1.4736,3.18023 1.4737,3.18023 -3.1625,1.69553 c -8.7635,4.69705 -14.9436,17.5878 -14.2145,29.64963 0.5732,9.48258 4.1583,16.57516 10.4439,20.66152 6.1052,3.96919 6.8528,4.73006 8.2091,8.36004 2.4875,6.65756 5.0697,9.24997 9.2145,9.24997 4.5047,0 6.5497,-3.66458 5.3329,-9.56067 -0.9008,-4.36516 -2.2017,-6.95264 -5.4283,-10.80791 -3.4561,-4.12945 -4.9173,-7.14631 -5.3108,-10.95882 -0.4193,-4.06286 0.4945,-7.72168 3.5198,-14.09466 1.3116,-2.76304 2.3835,-5.85603 2.3835,-6.87312 0,-3.53948 -8.9002,-23.55347 -15.7813,-35.48856 -10.7869,-18.70971 -18.3635,-27.12584 -25.1645,-27.39705 z m 479.14772,102.95254 c -0.25485,0.32772 -0.51382,0.65739 -0.77675,0.98981 -4.64655,5.87438 -9.52165,14.81265 -8.92596,16.36499 0.72521,1.88987 1.98835,0.874 3.64628,-2.93167 0.40952,-0.94003 1.302,-2.4862 2.45231,-4.28988 0.032,-0.13149 0.0682,-0.26238 0.11097,-0.39059 0.12445,-0.37336 0.42013,-0.67797 0.52819,-1.05638 0.0725,-0.25384 -0.0725,-0.53844 0,-0.79229 0.29689,-1.03913 0.97453,-2.1291 1.32047,-3.16691 0.52955,-1.58865 1.07512,-3.16242 1.64449,-4.72708 z"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       sodipodi:nodetypes="ssssssssssssscccccscccsssccsssssssscscscssssssscssccssssccccscccccssssssssssscssscssssc" /><path
       style="display:inline;fill:#f2b492;stroke:#281a16;stroke-width:3.00430572;stroke-dasharray:none;stroke-opacity:1"
       d="m -1206.2537,536.27778 c -6.1996,-1.93754 -10.8228,-5.87623 -15.6807,-13.35899 -8.4742,-13.05321 -15.1802,-28.60099 -28.9694,-67.16581 -5.2624,-14.71728 -6.8756,-20.30334 -8.3971,-29.07567 -4.1457,-23.90143 -0.3545,-45.01316 9.7657,-54.3827 6.21,-5.74936 12.5225,-6.59499 20.6252,-2.76298 5.2291,2.47298 8.303,5.05323 9.9834,8.38011 3.9867,7.89329 21.0043,62.33382 21.0043,67.19439 0,8.34447 3.7321,39.59487 8.164,68.36016 l 2.6676,17.31399 -2.4006,2.22868 c -4.1455,3.84857 -10.7723,5.14086 -16.7624,3.26882 z m -12.0023,-33.77555 c 0.7706,-1.24674 -3.8638,-9.50788 -9.63,-17.16632 -8.9963,-11.94853 -12.2125,-18.66363 -14.0869,-29.41215 -1.7462,-10.01353 -0.8399,-26.80611 2.0591,-38.15346 2.3503,-9.19937 7.5048,-23.39453 8.4833,-23.36271 0.2195,0.007 1.1791,1.11537 2.1325,2.46274 l 1.7336,2.44978 -2.2657,6.80176 c -2.7363,8.21448 -3.3622,13.62909 -1.8434,15.94704 2.4013,3.66491 7.2301,3.85514 13.7675,0.54237 l 3.011,-1.5258 1.4734,3.18019 1.4735,3.18018 -3.1629,1.69522 c -8.7635,4.69705 -14.9435,17.58762 -14.2144,29.64945 0.5732,9.48258 4.1585,16.57567 10.4441,20.66203 6.1052,3.96919 6.8533,4.7311 8.2096,8.36108 2.4875,6.65756 5.07,9.24993 9.2148,9.24993 4.5047,0 6.5482,-3.66465 5.3314,-9.56074 -0.9008,-4.36516 -2.2005,-6.95358 -5.4271,-10.80885 -3.4561,-4.12945 -4.9182,-7.14585 -5.3117,-10.95836 -0.4193,-4.06286 0.4944,-7.72209 3.5197,-14.09507 1.3116,-2.76304 2.3848,-5.85588 2.3848,-6.87297 0,-3.53948 -8.8999,-23.5539 -15.781,-35.48899 -13.2762,-23.02734 -21.6897,-30.46052 -29.7789,-26.30914 -5.5638,2.85535 -7.6595,10.68721 -7.1213,26.61289 0.3771,11.16035 1.6357,18.7536 4.481,27.03413 2.1155,6.15698 2.6255,8.52982 3.8836,18.06933 1.4732,11.16972 6.1245,21.07165 15.2812,32.53127 2.5918,3.24373 5.8794,8.15183 7.3056,10.90689 2.4599,4.75156 3.5423,5.82049 4.4336,4.37828 z m 422.35399,33.79107 c -2.55708,-0.91258 -7.69986,-4.58133 -7.72802,-5.51302 -0.0101,-0.33413 1.08571,-7.98873 2.43514,-17.01023 3.33549,-22.29915 7.05762,-52.06282 7.93915,-63.48465 0.70286,-9.10676 0.89397,-9.97336 5.81211,-26.35559 6.22941,-20.74998 9.92034,-32.12445 13.1179,-40.42586 3.04448,-7.90398 5.50064,-10.75636 11.93639,-13.86196 3.91796,-1.89063 5.24303,-2.2275 8.85956,-2.25232 10.15696,-0.0697 17.60727,7.60167 21.35703,21.99074 1.25603,4.81982 1.60216,7.85253 1.85501,16.25311 0.47544,15.79617 -1.3721,26.75657 -7.32191,43.43687 -5.95356,16.69081 -14.05038,38.36232 -16.90963,45.25938 -7.45318,17.97855 -16.2029,32.87154 -22.1608,37.72016 -5.65923,4.60556 -13.38847,6.31451 -19.19193,4.24337 z m 27.08616,-37.03575 c 0.92993,-2.1346 4.35666,-7.39714 7.61494,-11.69454 11.22361,-14.80295 14.10894,-21.51872 16.14631,-37.58136 0.49639,-3.91357 1.60691,-8.8223 2.68006,-11.84642 3.86906,-10.903 5.69416,-25.57623 4.83607,-38.88054 -0.64293,-9.96839 -2.966,-14.78049 -8.07784,-16.73272 -2.33639,-0.89228 -3.12782,-0.93706 -5.38617,-0.30476 -3.54636,0.99292 -7.87433,4.36289 -11.75071,9.14966 -9.0302,11.151 -27.20578,46.88801 -27.18476,53.45096 0.004,1.21871 1.14055,4.5754 2.66298,7.86416 2.15305,4.65102 2.7102,6.57962 2.94136,10.18169 0.3611,5.62669 -0.75983,8.75688 -4.78174,13.35294 -4.03409,4.60998 -5.64055,8.13161 -5.92161,12.98118 -0.20917,3.60905 -0.0781,4.16201 1.40384,5.92321 1.30539,1.55137 2.09493,1.94255 3.92074,1.94255 4.27118,0 6.48436,-2.31447 9.98979,-10.44694 1.3037,-3.02454 1.93558,-3.71113 5.0146,-5.44882 6.4882,-3.66172 10.01707,-8.39673 12.02083,-16.1295 3.43943,-13.2732 -3.28675,-31.1739 -13.51337,-35.96379 l -3.0548,-1.43079 1.57737,-3.2162 1.57737,-3.21619 2.88685,1.46287 c 6.27816,3.18139 11.58585,3.14235 13.71086,-0.10083 1.48745,-2.27013 0.77316,-8.4275 -1.90991,-16.46399 l -2.27501,-6.81426 1.9973,-2.52179 c 1.78381,-2.25224 2.07678,-2.41311 2.74086,-1.50493 1.36179,1.86235 5.72807,14.33833 7.5283,21.51095 2.46328,9.81443 3.20841,15.92714 3.23269,26.5197 0.0404,17.61565 -3.58094,27.64984 -15.34746,42.5256 -4.64655,5.87438 -9.52117,14.81136 -8.92548,16.3637 0.72521,1.88987 1.98781,0.87487 3.64574,-2.9308 z"
       
       sodipodi:nodetypes="ssssssssscsssssssscssscccssssssssssssssssssssssssssssssssssssssssssssssssssscccssscsssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" />
       </g>
            <g id="svg-part-rambut" class="cursor-pointer" style="${isKActive('Rambut') ? activeGlow : normalTransition}" onclick="changeKepala('Rambut')" onmouseenter="hoverPart('Rambut', activeKepala)" onmouseleave="unhoverPart('Rambut', activeKepala)">
                <path
       style="fill:#4f3429;display:inline;stroke:none;stroke-opacity:1"
       d="m -1237.0576,222.30974 c 2.4543,-17.32809 4.0473,-23.59906 7.3512,-28.93727 3.0798,-4.97617 9.1931,-11.73512 13.0008,-14.37389 1.3268,-0.91946 2.1884,-1.93435 1.9688,-2.3191 -0.2148,-0.37628 -0.1642,-0.47886 0.1124,-0.22797 0.2766,0.2509 1.9841,-0.37972 3.7943,-1.40137 2.9293,-1.65315 3.2494,-1.72502 2.9092,-0.65314 -0.7179,2.26167 1.1706,2.4117 8.0699,0.64113 23.9022,-6.13395 44.8259,-4.60482 63.4061,4.63378 6.7379,3.35027 16.2837,8.88321 16.2837,9.43839 0,0.79131 -4.2936,1.06269 -8.0233,0.50711 -6.9664,-1.03773 -23.519,-1.37884 -30.2497,-0.62337 -15.3855,1.72689 -29.6298,5.80035 -43.3439,12.39512 -8.0339,3.86331 -17.4385,9.65579 -20.0028,12.32009 -1.2094,1.25656 -1.4421,1.30315 -2.36,0.47252 -1.4215,-1.28649 -2.3872,-0.64569 -8.2853,5.49786 l -4.9959,5.20389 z m 479.80087,-1.54315 c -1.3563,-1.57457 -3.5789,-3.63409 -4.93911,-4.57672 -2.0387,-1.41282 -2.69249,-1.59646 -3.72204,-1.04546 -1.0553,0.56478 -1.60461,0.35417 -3.54305,-1.35844 -7.28378,-6.43521 -18.93783,-14.08547 -28.41698,-18.65424 -11.62362,-5.60237 -22.05654,-8.57412 -33.21381,-9.46076 l -5.26843,-0.41867 4.35716,-5.16012 c 2.39644,-2.83807 5.04061,-5.94179 5.87593,-6.89715 2.03518,-2.32765 7.14624,-3.58103 14.55597,-3.56955 9.5792,0.0148 17.17431,2.42784 26.03499,8.27143 6.49862,4.28581 18.15741,15.82989 22.16118,21.94314 1.58653,2.42244 2.9899,4.40443 3.11858,4.40443 0.39377,0 -0.39773,-2.68579 -1.02943,-3.49317 -0.43618,-0.55748 -0.23849,-0.75939 0.74352,-0.75939 1.17025,0 1.28758,0.22811 0.93738,1.82253 -0.28772,1.31001 -0.17317,1.82514 0.40736,1.83183 0.6385,0.007 0.62889,0.12248 -0.0459,0.54966 -0.71055,0.44985 -0.63283,0.91442 0.46396,2.77333 1.13495,1.9236 4.68974,15.95911 4.17288,16.47596 -0.10131,0.10132 -1.2939,-1.10407 -2.6502,-2.67864 z m -249.17977,-22.02163 c -16.7837,-1.12635 -49.0927,-7.10276 -55.7577,-10.31387 -3.5614,-1.71582 -12.3366,-7.97933 -21.2127,-15.14105 -11.6433,-9.39442 -24.6479,-17.53193 -34.4478,-21.55551 -11.173,-4.58729 -25.9889,-7.02588 -42.6864,-7.02588 h -9.7081 l 4.5406,-2.83194 c 11.7187,-7.3089 29.7764,-14.54189 42.8136,-17.14897 17.0109,-3.40171 36.8402,-3.64462 53.7645,-0.65863 15.2035,2.68239 23.7166,6.19168 34.6718,14.29244 7.945,5.87489 22.5675,20.48592 31.2675,31.24284 11.38885,14.08161 18.02264,20.40959 26.73019,25.49798 4.83921,2.82788 5.0182,2.72848 -6.58823,3.65864 -8.52347,0.68308 -13.01548,0.68 -23.38726,-0.016 z m 245.35036,-0.55239 c -0.46122,-0.28505 -1.192,-0.38265 -1.62396,-0.21689 -1.41615,0.54343 -2.22241,-0.46381 -1.05474,-1.31763 0.91886,-0.67188 0.956,-0.93248 0.25354,-1.77889 -0.45266,-0.54543 -0.64738,-1.16733 -0.4327,-1.38201 0.21468,-0.21468 0.39033,-0.0714 0.39033,0.31844 0,0.38982 0.28951,0.70876 0.64336,0.70876 0.35385,0 0.4483,-0.31562 0.20989,-0.70138 -0.26327,-0.42598 -0.1672,-0.5368 0.24469,-0.28224 0.46606,0.28804 0.49599,0.89826 0.0957,1.95111 -0.33378,0.87788 -0.34602,1.38585 -0.0287,1.18972 0.30458,-0.18824 0.70587,0.001 0.89175,0.42091 0.2289,0.51687 0.32044,0.46908 0.28367,-0.14809 -0.13227,-2.21962 0.25648,-2.55317 0.71284,-0.61162 0.57534,2.44774 0.54366,2.54779 -0.58569,1.84981 z m -4.61879,-4.92366 c -0.22025,-0.35636 -0.27015,-0.77822 -0.11091,-0.93746 0.15925,-0.15925 0.45142,0.13232 0.64928,0.64793 0.41079,1.07049 0.0607,1.25879 -0.53837,0.28953 z m -160.4127,-13.10395 c -15.52349,-32.77709 -24.10639,-48.36794 -33.96507,-61.69761 -6.5821,-8.8995 -19.4077,-22.323628 -27.73101,-29.025134 -9.11563,-7.33944 -22.54069,-16.036229 -33.53389,-21.723257 l -9.8136,-5.076837 8.5051,0.366414 c 53.3528,2.298526 92.35392,21.413448 112.37931,55.078444 8.02588,13.49243 13.25047,30.44107 14.87786,48.26394 0.62045,6.79502 0.57291,7.76331 -0.61332,12.49298 -0.70725,2.81988 -1.47711,5.43643 -1.7108,5.81455 -0.23369,0.37812 -4.92864,1.25715 -10.43323,1.95339 -5.50458,0.69625 -10.90026,1.42554 -11.99041,1.62066 l -1.98208,0.35475 z m -197.68867,2.55287 c -15.7409,-9.2745 -26.2669,-13.05758 -40.2099,-14.45165 -10.4216,-1.04198 -23.1483,0.14521 -37.2474,3.4746 -1.5682,0.37032 -1.3874,0.12938 1.2963,-1.72689 5.1202,-3.54158 18.6732,-11.14957 29.6766,-16.65909 l 10.3176,-5.16613 9.1227,0.36256 c 23.9554,0.95203 41.7209,8.53217 66.5322,28.38773 3.8425,3.07501 8.6266,6.82448 10.6314,8.33215 l 3.6451,2.74123 -2.7338,-0.35616 c -18.0996,-2.358 -20.9619,-2.49683 -29.5917,-1.43528 -4.6077,0.56679 -9.3344,1.17826 -10.5039,1.35881 -1.8583,0.2869 -3.2365,-0.32589 -10.9352,-4.86188 z m -102.6968,3.03109 c 0.6526,-0.78623 0.6248,-0.94482 -0.1656,-0.94482 -0.5224,0 -1.1173,-0.27106 -1.3221,-0.60235 -0.4717,-0.76328 1.5672,-7.33506 2.1618,-6.96762 0.2428,0.15009 0.6037,-0.14981 0.8019,-0.66644 0.233,-0.60706 0.1149,-0.78751 -0.3339,-0.51015 -0.475,0.29353 -0.5237,0.1595 -0.1542,-0.42408 0.5721,-0.90365 0.6653,-1.22094 0.7866,-2.67578 0.042,-0.50119 0.5543,-0.91544 1.1391,-0.92056 0.9085,-0.008 0.9306,-0.0949 0.1518,-0.59821 -0.6621,-0.42792 -0.6938,-0.59144 -0.116,-0.5982 0.4633,-0.005 0.6128,-0.32627 0.3582,-0.76869 -0.2403,-0.41766 -0.2133,-0.55672 0.06,-0.30903 0.2734,0.2477 0.9323,0.1242 1.4643,-0.27445 0.8099,-0.60696 0.8436,-0.58635 0.2077,0.12677 -1.1219,1.25812 -0.9223,2.10453 0.2685,1.1386 0.6985,-0.56653 0.8817,-0.59037 0.5717,-0.0744 -0.2609,0.43417 -0.1529,0.75938 0.2521,0.75938 0.3896,0 0.5578,0.39241 0.3738,0.87202 -0.1841,0.4796 -0.01,1.02939 0.3906,1.22175 0.3989,0.19236 0.1098,0.23551 -0.6425,0.0959 -1.4417,-0.26755 -1.3647,0.23078 0.3427,2.21849 0.504,0.58678 0.7358,1.24745 0.5151,1.46815 -0.2207,0.2207 -0.4013,0.12803 -0.4013,-0.20595 0,-0.877 -2.3159,-0.57635 -3.1989,0.41529 -0.6349,0.71299 -0.5869,0.71876 0.3132,0.0376 0.9357,-0.70804 1.0632,-0.64099 1.0632,0.55932 0,1.13855 0.1493,1.23987 0.904,0.61347 1.4094,-1.16964 1.9885,1.02443 0.6122,2.3193 -0.6682,0.62872 -0.8957,0.69077 -0.5967,0.16278 0.3259,-0.57551 0.2517,-0.71016 -0.2281,-0.41365 -0.3912,0.24178 -0.5731,0.66311 -0.4043,0.93629 0.1689,0.27318 -0.076,0.81433 -0.5435,1.20254 -0.6175,0.51249 -0.9645,0.52139 -1.2666,0.0325 -0.2773,-0.44862 -0.6836,-0.30768 -1.2174,0.42228 -0.4708,0.64396 -0.5649,1.24164 -0.2282,1.44976 0.3152,0.19476 -0.1642,0.69001 -1.0652,1.10055 -1.4589,0.66468 -1.5524,0.64295 -0.8542,-0.19839 z m 3.4342,-10.41089 c -0.2028,-0.52852 -0.3688,-1.07528 -0.3688,-1.21502 0,-0.13973 -0.2477,-0.25406 -0.5506,-0.25406 -0.3028,0 -0.4077,0.54675 -0.2329,1.21501 0.1748,0.66826 0.5885,1.21502 0.9194,1.21502 0.3309,0 0.4357,-0.43243 0.2329,-0.96095 z m 356.43133,8.70668 c 0.19334,-1.08592 0.76783,-3.88805 1.27664,-6.22696 0.50881,-2.33891 1.10173,-7.66979 1.3176,-11.84641 1.59712,-30.90084 -11.30495,-65.06514 -33.09444,-87.633111 -5.4868,-5.682828 -7.60133,-6.971325 -8.32892,-5.075254 -0.17897,0.466375 0.53268,2.547799 1.58145,4.625387 9.55185,18.922121 14.35643,44.954978 12.77446,69.216448 -0.36154,5.54468 -0.87817,10.89606 -1.14805,11.89197 -0.43384,1.6009 -0.5423,1.36092 -0.93594,-2.07095 -1.59493,-13.90469 -8.7833,-32.83171 -17.33011,-45.63026 -2.59081,-3.87966 -3.79523,-6.44368 -4.84313,-10.31032 -4.57508,-16.881469 -13.87069,-33.653173 -24.73067,-44.620542 -4.63941,-4.685296 -13.698,-12.378511 -16.58,-14.080947 -1.18447,-0.699684 -1.88525,-1.602152 -1.88525,-2.427844 0,-1.390835 -4.02472,-5.436936 -13.53962,-13.611545 -6.26825,-5.38529 -6.25261,-5.397902 4.91906,-3.966 12.92637,1.656808 30.32073,5.845928 42.33729,10.196181 24.17557,8.752073 41.74378,19.546532 58.4983,35.943198 7.2548,7.099844 8.19508,7.827676 9.25634,7.164914 1.37145,-0.85649 1.64876,-0.330621 5.21714,9.893639 10.05643,28.814036 10.22772,52.365936 0.54565,75.027456 -2.46148,5.76127 -6.27886,12.97019 -8.9011,16.80927 -1.21141,1.77357 -1.50375,2.62421 -0.97521,2.8377 0.48762,0.19697 0.41493,0.32186 -0.20537,0.35285 -0.52808,0.0264 -1.84362,1.27817 -2.92341,2.78175 -1.07979,1.50358 -2.11873,2.73379 -2.30875,2.73379 -0.19002,0 -0.18731,-0.88848 0.006,-1.97441 z m 8.4135,-7.06298 c -0.66686,-0.42272 -0.65789,-0.57216 0.0506,-0.84404 0.49112,-0.18846 0.86095,0.0362 0.86095,0.52297 0,0.46933 -0.0228,0.84915 -0.0506,0.84404 -0.0279,-0.005 -0.41527,-0.24046 -0.86095,-0.52297 z m -30.47637,-10.03413 c 0,-0.13132 0.42427,-0.40157 0.94282,-0.60055 0.54063,-0.20747 0.78449,-0.10562 0.57165,0.23875 -0.35676,0.57726 -1.51447,0.85382 -1.51447,0.3618 z m -316.67396,-24.13668 c 0.4121,-0.41519 0.9023,-0.60184 1.0893,-0.4148 0.1871,0.18704 -0.1501,0.52674 -0.7492,0.75488 -0.8658,0.32968 -0.9356,0.2599 -0.3401,-0.34008 z m -1.2855,-1.41012 c 0.1913,-0.49837 0.6442,-0.84641 1.0065,-0.77345 0.3624,0.073 0.6634,-0.55078 0.669,-1.3861 0.01,-0.83532 0.5214,-1.97648 1.146,-2.5359 0.6247,-0.55942 1.0951,-1.19731 1.0453,-1.41752 -0.05,-0.22022 0.048,-0.53935 0.2183,-0.70919 0.1698,-0.16983 0.2461,0.11841 0.1694,0.64055 -0.077,0.52214 -0.3295,1.13951 -0.5619,1.37194 -0.2324,0.23242 -0.4226,0.82057 -0.4226,1.30699 0,0.7549 0.1557,0.76231 1.0632,0.0506 0.9553,-0.74926 0.9816,-0.72967 0.2593,0.19326 -0.4421,0.56487 -1.1939,0.87734 -1.6707,0.69439 -1.2346,-0.4738 -1.076,0.82356 0.1963,1.60482 0.7745,0.47553 0.8157,0.61409 0.1519,0.51023 -0.5012,-0.0784 -1.5202,0.19448 -2.2645,0.60644 -1.1445,0.6335 -1.2996,0.60927 -1.0055,-0.15708 z m 5.0925,-2.38892 c 0,-0.12615 0.4785,-0.60456 1.0632,-1.06314 0.9635,-0.75566 0.985,-0.73417 0.2294,0.22937 -0.7937,1.01196 -1.2926,1.33377 -1.2926,0.83377 z m 0.07,-3.5317 c -0.039,-0.89914 0.2029,-1.80376 0.5371,-2.01026 0.3341,-0.2065 0.6075,-0.0541 0.6075,0.33875 0,0.41529 0.5089,0.58114 1.2158,0.39627 0.6687,-0.17488 1.0627,-0.0701 0.8754,0.2329 -0.1872,0.30297 -0.851,0.55085 -1.475,0.55085 -0.6241,0 -1.2597,0.47841 -1.4125,1.06314 -0.1748,0.66889 -0.3039,0.45689 -0.3483,-0.57165 z m 5.0934,-0.49149 c 0.2065,-0.33413 0.496,-0.60751 0.6433,-0.60751 0.1474,0 0.2679,0.27338 0.2679,0.60751 0,0.33413 -0.2895,0.60751 -0.6433,0.60751 -0.3539,0 -0.4744,-0.27338 -0.2679,-0.60751 z m 376.95904,-8.54097 c 0,-0.35385 0.27338,-0.47441 0.60751,-0.2679 0.33413,0.2065 0.6075,0.49601 0.6075,0.64336 0,0.14734 -0.27337,0.2679 -0.6075,0.2679 -0.33413,0 -0.60751,-0.28951 -0.60751,-0.64336 z m 0.91126,-1.78667 c -0.79106,-1.52974 -0.80464,-1.82253 -0.0846,-1.82253 0.48879,0 0.973,0.78416 1.1254,1.82253 0.14712,1.00238 0.18517,1.82252 0.0846,1.82252 -0.10061,0 -0.60704,-0.82014 -1.1254,-1.82252 z m -3.03754,0.6075 c -0.20651,-0.33413 -0.086,-0.6075 0.2679,-0.6075 0.35385,0 0.64336,0.27337 0.64336,0.6075 0,0.33413 -0.12055,0.60751 -0.2679,0.60751 -0.14735,0 -0.43686,-0.27338 -0.64336,-0.60751 z m -145.24497,-5.28736 c -20.69802,-16.07641 -43.03259,-27.087053 -64.99139,-32.039856 -10.4871,-2.365377 -19.9873,-3.375853 -31.7388,-3.375853 -22.6286,0 -43.6609,4.049649 -65.885,12.685746 -8.1624,3.171823 -10.087,3.683813 -16.2457,4.321723 -8.087,0.83765 -16.2647,2.41068 -23.9258,4.60229 -2.9683,0.84913 -7.479,1.658 -10.0239,1.7975 -2.5449,0.1395 -7.8281,1.03791 -11.7406,1.99648 l -7.1135,1.74285 1.9135,-2.48626 c 3.9594,-5.1447 21.0634,-21.560501 27.3073,-26.208751 23.9689,-17.843261 49.6498,-29.673419 73.095,-33.671804 4.3437,-0.740782 8.7177,-1.73302 9.7201,-2.204974 1.6836,-0.792659 2.726,-0.629248 13.669,2.14277 10.5298,2.667355 30.1638,8.581623 31.7562,9.565795 0.34,0.210112 0.1711,0.608154 -0.3915,0.923041 -0.5441,0.304495 -0.9893,1.064512 -0.9893,1.688927 0,0.862979 0.9836,1.459813 4.1007,2.488194 9.4574,3.120204 23.7451,10.706934 36.2986,19.274514 9.51068,6.490896 16.6442,12.397521 24.11657,19.968768 8.81549,8.93213 18.19959,20.36194 17.38573,21.17579 -0.16089,0.1609 -3.00364,-1.8132 -6.31721,-4.38689 z m 145.15489,3.61059 c 0.22077,-0.35722 0.0604,-0.76315 -0.35634,-0.90207 -0.55341,-0.18447 -0.48297,-0.52737 0.26123,-1.27156 0.62096,-0.62096 1.16677,-0.77986 1.39732,-0.40682 0.20809,0.3367 0.0596,0.61217 -0.33001,0.61217 -0.3896,0 -0.55436,0.40132 -0.36614,0.89181 0.18822,0.49049 0.0385,1.07949 -0.33263,1.30888 -0.3894,0.24067 -0.50505,0.14236 -0.27343,-0.23241 z"
              sodipodi:nodetypes="sssssssssssssssscssssssscssssssssscsssssssssscssssssssssssssssssssssssssssssssscssssssscsssssscssscsssssssssssssscsssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscssccsssssssssssssssssssssssssssssssssssssssssssssssssscscsssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
              style="fill:#281a16;display:inline;stroke:none;stroke-opacity:1"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)"
       d="m -985.98054,17.482406 c -1.40713,0.871357 -0.15592,2.628047 3.85933,5.41949 2.40309,1.670648 6.29349,4.66131 8.64633,6.642314 2.35284,1.981005 4.39256,3.687669 4.53178,3.794975 0.13919,0.107306 0.13165,0.321237 -0.02,0.472707 -0.15147,0.151468 -2.18071,-0.428552 -4.50736,-1.287184 -18.36267,-6.77657 -38.04636,-10.021257 -60.72846,-10.008967 -26.3378,0.01427 -48.9575,4.297004 -74.2838,14.063597 -9.5578,3.685752 -11.8533,4.963957 -10.7414,5.985407 0.3198,0.293792 5.0928,1.006981 10.606,1.586787 5.5131,0.579806 10.2447,1.26262 10.5149,1.513551 0.2701,0.250931 -1.2344,0.793599 -3.3422,1.20729 -2.1079,0.413692 -6.9743,1.699081 -10.8168,2.856217 -23.1243,6.963704 -46.074,19.520456 -65.6131,35.903563 -11.6873,9.799498 -27.9711,27.997347 -27.0952,30.279897 0.4766,1.24191 1.5436,1.06951 11.1275,-1.79318 4.0815,-1.21913 7.5891,-2.21706 7.7963,-2.21706 0.2073,0 -3.1566,3.40796 -7.479,7.57219 -4.3224,4.16419 -9.6063,9.79172 -11.7422,12.50344 -15.9437,20.24157 -26.5949,44.28754 -32.0931,72.46626 -4.9425,25.33109 -4.8073,31.87342 0.5171,25.27097 1.1925,-1.47865 3.4924,-4.05472 5.111,-5.72575 2.4694,-2.54942 2.8818,-2.79463 2.5744,-1.52021 -6.0707,25.16987 -7.2953,54.53331 -3.6529,87.48192 1.0315,9.33173 4.153,28.96958 7.2615,45.67951 0.9895,5.31892 1.8245,10.03396 2.0506,11.54249 1.7356,1.26007 2.9894,2.93802 4.1057,4.84026 1.0467,1.8903 1.3421,3.98615 1.4203,6.10525 0.012,0.32695 0.016,0.64672 0.013,0.96095 2.7357,6.60295 8.972,25.19833 14.8936,44.56764 l 3.2424,10.61261 c 0.6311,0.55539 1.2356,1.14191 1.8087,1.75767 0.3532,0.37946 0.6813,0.78452 1.0209,1.17622 1.1971,1.37407 2.0139,2.99592 2.8784,4.58282 -0.348,-15.28119 0.8598,-74.49097 1.7088,-82.61725 1.3376,-12.80434 7.5499,-30.99978 16.0743,-47.08209 l 3.2202,-6.07418 -0.062,-17.61667 c -0.047,-13.70987 0.1727,-19.23619 0.9876,-24.90923 3.8155,-26.56384 11.2662,-43.30077 24.9581,-56.06131 8.6117,-8.02584 17.6641,-12.56156 31.2497,-15.65483 18.5352,-4.22022 30.3061,-3.42095 72.4241,4.91793 21.2197,4.20127 28.9827,5.18818 43.74429,5.56375 18.8035,0.47839 27.75967,-0.54412 59.52339,-6.80211 33.102,-6.52166 44.67587,-7.52476 58.94638,-5.11101 22.04555,3.72884 36.73624,12.63124 47.83887,28.9905 6.6421,9.78686 10.87342,21.55867 14.1679,39.41669 1.16045,6.29037 1.34346,9.64164 1.47583,27.33935 l 0.14869,20.17106 3.64628,6.86424 c 6.91453,13.01736 13.14167,30.71168 14.94021,42.45489 1.10373,7.20659 2.06814,38.09517 2.26589,72.54615 0.0633,11.03467 0.0469,17.01401 -0.20417,22.00419 1.17298,-1.24326 2.04464,-1.51719 3.35999,-0.76343 0.0528,-0.65905 0.0963,-1.26243 0.13094,-1.80206 0.33914,-5.28177 1.12871,-8.53351 6.04755,-24.90702 6.0378,-20.09801 13.00421,-41.03865 14.87363,-44.70302 0.61002,-1.19572 1.55676,-2.41129 2.73416,-3.5797 0.0241,-0.14751 0.0523,-0.3069 0.0821,-0.4949 0.27891,-1.59578 0.86598,-3.10561 1.45807,-4.60501 0.17835,-0.47337 0.37167,-0.9386 0.57258,-1.40259 -6.7e-4,-0.004 -0.002,-0.0116 -0.002,-0.0155 0.004,-0.26468 0.82766,-4.58202 1.83091,-9.59396 2.71183,-13.54765 6.49506,-36.84897 7.94059,-48.90412 1.8458,-15.39315 2.28685,-44.58823 0.88106,-58.32276 -0.9654,-9.43184 -3.23996,-23.39104 -4.52956,-27.7943 -0.31799,-1.08593 -0.35782,-1.97295 -0.0888,-1.97295 0.26873,0 2.60439,2.47513 5.1909,5.49939 5.24251,6.12978 6.82153,6.77911 6.49806,2.67867 -0.50538,-6.40633 -8.45907,-41.74523 -11.41155,-50.70396 -2.09945,-6.37044 -8.53099,-19.28783 -12.9473,-26.00112 -8.59772,-13.06952 -20.70802,-22.79038 -34.93152,-28.04064 l -4.27655,-1.57791 -0.72127,-4.30763 c -3.6947,-22.066672 -17.53103,-43.805642 -39.40559,-61.909124 -2.67303,-2.212219 -6.8679,-5.345027 -9.32321,-6.96411 -6.2825,-4.142806 -7.69808,-3.304737 -4.38087,2.598781 1.92891,3.4328 5.13723,11.164916 5.85669,14.11464 0.40746,1.67055 0.0701,1.470609 -4.05463,-2.432334 -24.73551,-23.405848 -57.01719,-38.287184 -96.08386,-44.290234 -11.00337,-1.690797 -23.39464,-2.937851 -24.2146,-2.436773 z m 10.67697,4.001368 c 1.30867,-0.07646 3.92876,0.25754 8.11814,0.794503 12.92637,1.656808 30.32292,5.847353 42.33948,10.197606 24.17557,8.752073 41.74357,19.544625 58.49809,35.941291 7.2548,7.099844 8.19315,7.828827 9.25441,7.166065 1.05689,-0.660041 1.28239,-0.498192 2.13939,1.540183 1.9918,4.737465 5.26311,14.672473 6.95079,21.11204 6.01197,22.939368 4.94455,42.909228 -3.3267,62.268648 -2.46148,5.76127 -6.27931,12.96977 -8.90155,16.80885 -1.21141,1.77357 -1.5028,2.62497 -0.97426,2.83846 0.48762,0.19697 0.4139,0.32187 -0.2064,0.35287 -0.52808,0.0264 -1.843,1.27718 -2.92279,2.78076 -1.07979,1.50358 -2.11804,2.73416 -2.30806,2.73416 -0.38473,0 -0.0861,-1.90809 1.28275,-8.20025 0.50882,-2.33892 1.10016,-7.67214 1.31603,-11.84876 1.59712,-30.90084 -11.30446,-65.06486 -33.09395,-87.632831 -5.4868,-5.682828 -7.59916,-6.969352 -8.32675,-5.073281 -0.17897,0.466375 0.52914,2.547398 1.57791,4.624986 9.55185,18.922121 14.35839,44.955756 12.77642,69.217226 -0.36153,5.54468 -0.87749,10.89501 -1.14737,11.89092 -0.43384,1.6009 -0.5429,1.36127 -0.93654,-2.0706 -1.59493,-13.90469 -8.78357,-32.83213 -17.33038,-45.63068 -2.59081,-3.87966 -3.79458,-6.44415 -4.84248,-10.31079 -4.57508,-16.881457 -13.87171,-33.651315 -24.73169,-44.618684 -4.63941,-4.685296 -13.69826,-12.381134 -16.58026,-14.08357 -1.18447,-0.699684 -1.88417,-1.602204 -1.88417,-2.427896 0,-1.390835 -4.02495,-5.436255 -13.53985,-13.610864 -3.91766,-3.365806 -5.38133,-4.632936 -3.20021,-4.760362 z M -1084.732,46.7259 c 1.5897,-0.02319 4.4342,0.650852 11.9575,2.556615 10.5298,2.667355 30.1633,8.580938 31.7557,9.56511 0.34,0.210112 0.1698,0.608335 -0.3928,0.923222 -0.5441,0.304495 -0.9876,1.066678 -0.9876,1.691093 0,0.862979 0.982,1.459436 4.0991,2.487817 13.0386,4.301691 33.7058,16.348916 48.44913,28.244816 8.90057,7.181557 22.34775,21.353067 27.9896,29.494277 0.91014,1.31334 1.52354,2.51778 1.36264,2.67867 l -0.002,0.002 -0.002,0.002 -0.002,0.002 c -0.24013,0.0933 -3.04748,-1.86058 -6.30942,-4.39418 -20.69802,-16.07641 -43.03509,-27.08477 -64.99389,-32.037573 -30.1489,-6.800109 -64.6261,-3.514234 -97.6219,9.307673 -8.1624,3.17182 -10.0886,3.68525 -16.2473,4.32316 -8.087,0.83765 -16.2628,2.40897 -23.9239,4.60058 -2.9683,0.84913 -7.4796,1.66034 -10.0245,1.79984 -2.5449,0.1395 -7.8275,1.03656 -11.74,1.99513 l -7.1128,1.74214 1.9108,-2.4856 c 3.9594,-5.14471 21.0644,-21.561482 27.3083,-26.209732 23.9689,-17.843261 49.6491,-29.670359 73.0943,-33.668744 4.3437,-0.740782 8.718,-1.734014 9.7204,-2.205968 0.5261,-0.247706 0.9907,-0.404464 1.7133,-0.415006 z m 53.5713,15.916699 8.5043,0.366182 c 41.83283,1.802215 75.45029,14.121415 96.92718,35.521846 12.22865,12.185123 19.1411,23.601433 25.13338,41.511693 2.54022,7.59243 4.3021,16.52696 5.19534,26.3096 0.62045,6.79502 0.57371,7.76267 -0.61252,12.49234 -0.70725,2.81988 -1.47738,5.43641 -1.71107,5.81453 -0.23369,0.37812 -4.92604,1.25673 -10.43063,1.95297 -5.50458,0.69625 -10.90063,1.42495 -11.99078,1.62007 l -1.98182,0.35731 -3.99028,-8.4244 c -15.52349,-32.77709 -24.10744,-48.36862 -33.96612,-61.69829 -6.5821,-8.8995 -19.40664,-22.322282 -27.72995,-29.023788 -9.11563,-7.33944 -22.54013,-16.037534 -33.53333,-21.724562 z m -64.8186,59.359171 c 9.1992,-0.11269 18.3868,0.57315 26.8489,2.06615 15.2035,2.68238 23.7166,6.19364 34.6718,14.2944 7.945,5.87489 22.5675,20.48393 31.2675,31.24085 11.38876,14.08161 18.02374,20.41117 26.73129,25.49956 4.83921,2.82788 5.01516,2.72722 -6.59127,3.65738 -17.21192,1.37939 -33.99542,-0.15426 -60.56422,-5.53489 -10.6718,-2.16124 -15.9305,-3.5172 -18.5799,-4.79365 -3.5614,-1.71582 -12.3358,-7.98045 -21.2119,-15.14217 -11.6433,-9.39442 -24.6478,-17.5301 -34.4477,-21.55368 -11.173,-4.58729 -25.9882,-7.02625 -42.6857,-7.02625 h -9.7093 l 4.5406,-2.83181 c 11.7187,-7.3089 29.7772,-14.54354 42.8144,-17.15062 8.5055,-1.70086 17.7163,-2.61258 26.9155,-2.72527 z m -104.7102,11.37604 c 0,-2e-5 0.01,-9e-5 0.011,0 h 0.01 c 0.1893,0.004 0.3196,0.16048 0.3196,0.43054 0,0.41527 0.5093,0.58212 1.2162,0.39725 0.6687,-0.17488 1.0617,-0.0699 0.8744,0.23303 -0.1872,0.30297 -0.8496,0.55038 -1.4736,0.55038 -0.6241,0 -1.2587,0.47831 -1.4115,1.06304 -0.06,0.22993 -0.1165,0.35512 -0.1642,0.37949 v 0.002 0.002 c 0,7e-5 -0.011,1e-4 -0.011,0 0,6e-5 0,1.5e-4 -0.01,0 v -0.002 -0.002 c -0,-6.8e-4 -0.01,-0.004 -0.01,-0.004 -0.07,-0.0589 -0.1244,-0.37716 -0.1487,-0.94542 -0.039,-0.89914 0.2028,-1.80639 0.537,-2.01289 0.091,-0.0564 0.1796,-0.0858 0.2575,-0.091 z m 4.9024,1.00312 c 0,-8e-5 0.011,-1e-5 0.013,0 0.1474,0 0.2685,0.27395 0.2685,0.60808 0,0.33413 -0.2898,0.60586 -0.6436,0.60586 -0.3539,0 -0.475,-0.27173 -0.2685,-0.60586 0.2,-0.32369 0.4792,-0.59177 0.6303,-0.60808 z m -6.7089,0.14869 c 0.1126,-0.0157 0.1532,0.2578 0.091,0.6902 -0.077,0.52214 -0.3313,1.13686 -0.5637,1.36929 -0.2324,0.23242 -0.4217,0.82296 -0.4217,1.30938 0,0.75488 0.1555,0.76257 1.063,0.051 0.4403,-0.34536 0.6847,-0.52713 0.7479,-0.53262 0,1e-5 0.011,-1.1e-4 0.011,0 v 0.002 0.002 0.002 0.002 c 0,0.0547 -0.1707,0.2892 -0.5037,0.71461 -0.4421,0.56487 -1.1944,0.87981 -1.6712,0.69686 -1.2346,-0.4738 -1.077,0.82328 0.1953,1.60454 0.4045,0.24833 0.6085,0.408 0.617,0.48602 0,0.001 10e-5,0.003 0,0.004 -10e-5,5e-4 -10e-5,0.006 0,0.007 v 0.002 0.002 0.002 0.002 0.002 c -0.035,0.0442 -0.1898,0.0444 -0.4594,0.002 -0.5012,-0.0784 -1.5194,0.19391 -2.2637,0.60587 -1.1445,0.6335 -1.2994,0.60878 -1.0053,-0.15757 0.1913,-0.49837 0.643,-0.84531 1.0053,-0.77231 0.3624,0.073 0.6603,-0.55173 0.6703,-1.38705 0.01,-0.83532 0.5205,-1.975 1.1451,-2.53442 0.6247,-0.55942 1.0975,-1.19795 1.0475,-1.41813 -0.05,-0.22022 0.045,-0.54033 0.2153,-0.71017 0.029,-0.0292 0.057,-0.0456 0.08,-0.0488 z m 2.7386,2.88507 v 0.002 0.002 0.002 0.002 c 0,8.6e-4 10e-5,0.006 0,0.007 -0.011,0.0647 -0.1896,0.31035 -0.5327,0.7479 -0.7937,1.01196 -1.2938,1.33445 -1.2938,0.83445 0,-0.12615 0.4783,-0.60446 1.063,-1.06304 0.4366,-0.3424 0.6806,-0.52468 0.7457,-0.53262 z m -4.7759,4.90683 h 0 c 0.013,-3.1e-4 0.026,-3.4e-4 0.038,0 0.077,0.003 0.1406,0.0296 0.1865,0.0755 0.1871,0.18704 -0.1511,0.52641 -0.7502,0.75455 -0.4193,0.15969 -0.6515,0.22459 -0.7123,0.18198 v -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 c -0.016,-0.0663 0.1163,-0.23191 0.3861,-0.50378 0.2884,-0.29057 0.6137,-0.47117 0.8478,-0.48824 z m 44.5587,5.86779 9.1235,0.36174 c 23.9554,0.95203 41.7228,8.53351 66.5341,28.38907 3.8425,3.07501 8.6256,6.82352 10.6304,8.33119 l 3.6441,2.74081 -2.732,-0.35508 c -18.0996,-2.358 -20.9621,-2.49743 -29.5919,-1.43588 -4.6077,0.56679 -9.3344,1.17765 -10.5039,1.3582 -1.8583,0.2869 -3.2379,-0.32646 -10.9366,-4.86245 -15.7409,-9.2745 -26.266,-13.0579 -40.209,-14.45197 -10.4216,-1.04198 -23.1471,0.14601 -37.2462,3.4754 -1.5682,0.37032 -1.3899,0.12967 1.2938,-1.7266 5.1202,-3.54158 18.6751,-11.14842 29.6785,-16.65794 z m -61.0569,20.8657 v 0.002 0.002 0.002 0.002 0.002 c -0.01,0.0486 -0.1606,0.23282 -0.4438,0.55038 -1.1219,1.25812 -0.9223,2.10443 0.2685,1.1385 0.3858,-0.31301 0.6196,-0.46162 0.6946,-0.44386 v 0.002 0.002 0.002 0.002 0.002 0.002 0.002 0.002 0.002 c 0.017,0.0459 -0.03,0.16522 -0.142,0.35065 -0.2609,0.43417 -0.152,0.759 0.253,0.759 0.3898,0 0.5568,0.39034 0.3728,0.86995 -0.1841,0.4796 -0.01,1.03047 0.3906,1.22283 0.1117,0.0539 0.171,0.099 0.1798,0.12872 v 0.002 0.002 0.002 0.002 0.002 0.0111 0.007 0.002 0.002 0.002 c -0.057,0.0463 -0.3477,0.0333 -0.8145,-0.0533 -1.4417,-0.26755 -1.3634,0.23158 0.344,2.21929 0.5041,0.58678 0.7334,1.24624 0.5127,1.46694 -0.2207,0.2207 -0.3995,0.12759 -0.3995,-0.20639 0,-0.877 -2.3172,-0.57664 -3.2002,0.41501 -0.2678,0.30078 -0.414,0.47539 -0.4261,0.52597 -10e-5,8.5e-4 0,0.006 0,0.007 v 0.002 0.002 0.002 0.002 0.002 c 0.055,-0.005 0.2941,-0.17608 0.7301,-0.506 0.9357,-0.70804 1.0631,-0.64106 1.0631,0.55926 0,1.13855 0.1507,1.23893 0.9054,0.61253 1.4094,-1.16964 1.9866,1.02649 0.6103,2.32137 -0.3866,0.36348 -0.6262,0.53692 -0.7013,0.51709 -9e-4,-3.4e-4 -0.01,-0.002 -0.01,-0.002 v -0.002 -0.002 -0.002 -0.002 -0.002 c -0.021,-0.0408 0.017,-0.15615 0.122,-0.34177 0.3259,-0.57551 0.2512,-0.71151 -0.2286,-0.415 -0.3913,0.24178 -0.5727,0.66557 -0.4039,0.93875 0.1689,0.27318 -0.076,0.81243 -0.5437,1.20064 -0.6175,0.51251 -0.9651,0.52223 -1.2672,0.0333 -0.2773,-0.44862 -0.6824,-0.3083 -1.2162,0.42166 -0.4708,0.64396 -0.5653,1.24107 -0.2286,1.44919 0.3152,0.19476 -0.1642,0.69023 -1.0652,1.10077 -0.7979,0.3635 -1.1896,0.5196 -1.265,0.45051 v -0.002 -0.002 -0.002 -0.002 -0.002 -0.002 c -0.027,-0.0752 0.1253,-0.28321 0.4172,-0.63471 0.6526,-0.78623 0.624,-0.94542 -0.1664,-0.94542 -0.5224,0 -1.1157,-0.27013 -1.3205,-0.60142 -0.4717,-0.76328 1.5648,-7.33599 2.1594,-6.96855 0.2428,0.15009 0.6051,-0.14916 0.8033,-0.66579 0.233,-0.60706 0.1137,-0.7878 -0.3351,-0.51043 -0.475,0.29353 -0.5226,0.1597 -0.1531,-0.42388 0.5721,-0.90365 0.6665,-1.22162 0.7878,-2.67646 0.042,-0.50119 0.5537,-0.916 1.1385,-0.921 0.9085,-0.008 0.9298,-0.0937 0.151,-0.59699 -0.6621,-0.42792 -0.6933,-0.59222 -0.1155,-0.59921 0.4633,-0.005 0.612,-0.32545 0.3574,-0.76787 -0.1353,-0.23493 -0.1856,-0.38229 -0.1554,-0.42166 v -0.002 -0.004 -0.002 c 0,5e-5 0.011,0 0.011,0 v -0.002 -0.002 -0.002 -0.002 c 0,-1.7e-4 -0,0 0.01,0 10e-4,-1.9e-4 3e-4,1e-4 0.011,0 0.036,-3.9e-4 0.1038,0.0368 0.1953,0.11985 0.2734,0.2477 0.9327,0.12346 1.4647,-0.27519 0.3797,-0.28452 0.5874,-0.43073 0.6369,-0.43277 z m 409.45998,0.57035 c 9.5792,0.0148 17.17374,2.42768 26.03442,8.27127 6.49862,4.28581 18.16021,15.83102 22.16398,21.94427 1.58653,2.42244 2.98719,4.40306 3.11587,4.40306 0.39377,0 -0.39805,-2.68355 -1.02975,-3.49093 -0.43618,-0.55748 -0.23633,-0.76122 0.74568,-0.76122 1.17025,0 1.28674,0.22761 0.93654,1.82203 -0.28772,1.31001 -0.17218,1.82613 0.40835,1.83313 0.63846,0.007 0.6283,0.12099 -0.0466,0.54817 -0.71055,0.44985 -0.63296,0.91519 0.46383,2.7741 0.72461,1.22813 2.00036,5.39491 2.83625,9.26107 0.83589,3.86617 1.43731,7.11358 1.336,7.21489 l -0.002,0.002 h -0.002 l -0.002,0.002 c -0.14839,0.0396 -1.31866,-1.14545 -2.64317,-2.68312 -1.3563,-1.57457 -3.57991,-3.63353 -4.94012,-4.57616 -2.0387,-1.41282 -2.68997,-1.59628 -3.71952,-1.04528 -1.0553,0.56478 -1.60576,0.35219 -3.5442,-1.36042 -7.28378,-6.43521 -18.93877,-14.08432 -28.41792,-18.65308 -11.62362,-5.60238 -22.0543,-8.57416 -33.21157,-9.4608 l -5.2708,-0.41945 4.35867,-5.15983 c 2.39644,-2.83807 5.04135,-5.93995 5.87667,-6.89531 2.03518,-2.32765 7.14432,-3.58233 14.55405,-3.57083 z m -362.61308,1.7488 c 13.5986,-0.23757 26.1285,2.52378 37.7411,8.2979 6.7379,3.35027 16.2829,8.88343 16.2829,9.43861 0,0.79131 -4.2952,1.06157 -8.0249,0.50599 -6.9664,-1.03773 -23.5182,-1.37686 -30.2489,-0.62139 -15.3855,1.72689 -29.6307,5.79992 -43.3448,12.39469 -8.0339,3.86331 -17.4381,9.65494 -20.0024,12.31924 -1.2094,1.25656 -1.4412,1.30334 -2.3591,0.47271 -0.7465,-0.67563 -1.3201,-0.76072 -2.1527,-0.31514 -0.6245,0.33425 -3.3863,2.95015 -6.1341,5.8123 l -4.9934,5.20422 0.364,-2.57437 c 2.4543,-17.32809 4.0463,-23.5968 7.3502,-28.93501 3.0798,-4.97617 9.1929,-11.73775 13.0006,-14.37652 1.3268,-0.91946 2.1881,-1.93218 1.9685,-2.31693 -0.1066,-0.18688 -0.1419,-0.31274 -0.122,-0.35508 v -0.002 -0.002 -0.002 c 0,-3.3e-4 0,5e-4 0.01,0 0,-3.4e-4 0.01,-0.002 0.01,-0.002 0.038,-0.004 0.1134,0.0389 0.2197,0.13538 0.2766,0.2509 1.9848,-0.37872 3.795,-1.40037 2.9292,-1.65315 3.2497,-1.72657 2.9095,-0.65469 -0.7179,2.26167 1.17,2.41189 8.0693,0.64137 8.9634,-2.30024 17.5069,-3.52148 25.666,-3.66403 z m -49.803,2.49447 c -0.3029,0 -0.41,0.54791 -0.2352,1.21617 0.1748,0.66826 0.5901,1.21395 0.921,1.21395 0.3309,0 0.4358,-0.43243 0.233,-0.96095 -0.2028,-0.52852 -0.3684,-1.07421 -0.3684,-1.21395 0,-0.13973 -0.2475,-0.25522 -0.5504,-0.25522 z m 366.15513,2.20153 h 0.002 c 0.31121,0.006 0.51931,0.22525 0.51931,0.59033 0,0.42533 -0.0202,0.77818 -0.0444,0.83667 l -0.002,0.002 h -0.002 v 0.002 0.002 h -0.002 c -0.0279,-0.005 -0.41541,-0.23902 -0.86109,-0.52153 -0.66688,-0.42272 -0.65982,-0.57367 0.0488,-0.84555 0.12279,-0.0471 0.23804,-0.0688 0.34177,-0.0666 z m 92.10469,16.2163 c 0.005,-4.5e-4 0.009,-5e-5 0.0133,0 0.1634,0.001 0.38741,0.27349 0.54817,0.69242 0.41079,1.07049 0.0619,1.25998 -0.53707,0.29072 -0.22024,-0.35636 -0.27242,-0.77729 -0.11318,-0.93653 0.0262,-0.0262 0.0566,-0.0435 0.0888,-0.0466 z m 1.9685,1.10964 c 0.12165,-10e-4 0.20639,0.15145 0.20639,0.41945 0,0.38982 0.28975,0.70795 0.6436,0.70795 0.35385,0 0.44702,-0.31553 0.20861,-0.70129 -0.26327,-0.42598 -0.16777,-0.53641 0.24412,-0.28185 0.46606,0.28804 0.49576,0.90012 0.0954,1.95297 -0.3338,0.87788 -0.34429,1.38566 -0.0266,1.18953 0.30458,-0.18824 0.70405,-2.9e-4 0.88993,0.41945 0.1037,0.2342 0.18043,0.35318 0.22859,0.35508 h 0.002 0.002 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,-0.002 c 0.0435,-0.0325 0.0577,-0.20039 0.0399,-0.49934 -0.13227,-2.21962 0.25603,-2.55407 0.71239,-0.61252 0.57534,2.44774 0.54568,2.54886 -0.58367,1.85088 -0.46122,-0.28509 -1.19256,-0.38325 -1.62452,-0.21749 -1.41615,0.54342 -2.22183,-0.46221 -1.05416,-1.31603 0.91886,-0.67188 0.95546,-0.93346 0.253,-1.77987 -0.4527,-0.54543 -0.64744,-1.16793 -0.43276,-1.38261 0.0671,-0.0671 0.1289,-0.0993 0.1842,-0.0999 z m -0.54816,254.80922 c 0.17118,0.3458 0.39004,0.68505 0.63249,1.01865 -0.10485,-0.339 -0.2896,-0.66225 -0.63249,-1.01865 z" /></g>
     
            <g id="svg-part-mata" class="cursor-pointer" style="${isKActive('Mata') ? activeGlow : normalTransition}" onclick="changeKepala('Mata')" onmouseenter="hoverPart('Mata', activeKepala)" onmouseleave="unhoverPart('Mata', activeKepala)">
                <path
              style="fill:#ffffff;display:inline;fill-rule:evenodd;stroke:none;stroke-width:0.0821453;stroke-linejoin:round;stroke-dasharray:0.246436, 0.246436;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -929.97852,945.5332 c -0.25845,0.007 -0.66359,0.0819 -1.10937,0.21094 -2.98486,0.86425 -9.47405,3.94628 -13.70703,6.50977 -1.63004,0.98714 -2.92349,1.87917 -5.0918,3.50976 -2.93483,2.20703 -3.81261,2.96409 -5.18945,4.47461 -0.67949,0.74547 -1.44232,1.54938 -1.69531,1.78711 l -0.46094,0.43164 1.61914,1.46875 c 3.63143,3.29538 5.68126,4.85283 8.55078,6.49805 5.08835,2.91737 12.76771,5.49513 19.92969,6.68945 2.76978,0.46188 6.36998,0.84159 6.71875,0.70899 0.61557,-0.23404 2.23903,-0.15941 2.51367,0.11523 0.1784,0.1784 1.47102,0.17826 1.60156,0 0.21683,-0.29611 2.02611,-0.34845 2.55469,-0.0742 0.29746,0.15434 0.857,0.15024 1.17773,-0.01 0.29505,-0.1472 1.2155,-0.18464 2.15039,-0.0859 1.26804,0.13386 7.33267,-0.64976 12.07422,-1.56055 4.81977,-0.92581 9.38612,-2.14643 14.86914,-3.97656 1.46835,-0.4901 3.09567,-1.02182 3.61524,-1.18164 2.5454,-0.78297 5.96226,-1.60801 7.92578,-1.91211 l 0.41016,-0.0644 -0.32813,-0.043 c -0.47567,-0.0632 -0.43421,-0.26229 0.082,-0.39453 0.55105,-0.14116 1.51953,0.01 1.51953,0.23632 1.9e-4,0.002 10e-4,0.008 0.002,0.01 3.6e-4,9.6e-4 10e-4,0.005 0.002,0.006 l 0.002,0.002 0.002,0.002 0.002,0.002 0.002,0.002 c 8.9e-4,6.1e-4 0.005,0.003 0.006,0.004 0.2581,0.12193 3.02086,-1.43154 3.32422,-1.89453 0.12231,-0.18668 0.11983,-0.22225 -0.0234,-0.48829 -0.085,-0.15775 -0.28536,-0.37332 -0.44726,-0.48046 -0.1619,-0.10714 -0.73665,-0.70381 -1.27539,-1.32618 -1.06009,-1.22464 -1.29405,-1.45949 -2.78516,-2.77148 -0.75173,-0.66147 -1.00253,-0.8396 -1.05273,-0.75 -0.0362,0.0646 -0.0998,0.11719 -0.14258,0.11719 -0.13841,0 -0.75205,-0.60073 -1.2461,-1.22071 -0.51763,-0.64956 -1.01285,-1.07237 -3.0625,-2.60937 -5.38588,-4.03879 -11.16716,-7.64234 -14.91015,-9.29688 -1.26197,-0.55784 -4.11557,-1.69975 -4.46094,-1.78515 -0.0995,-0.0246 -0.15506,-0.0369 -0.18164,-0.0215 -8.5e-4,6e-4 -0.005,0.003 -0.006,0.004 l -0.002,0.002 -0.002,0.002 c -5.8e-4,8.7e-4 -0.003,0.005 -0.004,0.006 -0.0128,0.0284 -0.002,0.0871 0.0215,0.18554 0.0306,0.1297 0.35083,1.01216 0.71094,1.96094 1.07276,2.82634 1.21492,3.24046 1.4668,4.27148 0.23408,0.95816 0.42135,2.19091 0.53711,3.53321 0.0251,0.29046 0.0497,0.4591 0.0742,0.49414 l 0.002,0.002 0.002,0.002 h 0.002 v 0.002 h 0.002 0.002 0.002 0.002 l 0.002,-0.002 0.002,-0.002 0.002,-0.002 c 0.004,-0.007 0.01,-0.0211 0.0137,-0.0371 0.079,-0.30813 0.24225,-0.29699 0.37695,0.0254 0.14147,0.33861 0.15989,0.89558 0.0371,1.125 -0.11446,0.21391 -0.31674,0.19949 -0.40234,-0.0273 -0.0141,-0.0374 -0.0246,-0.0618 -0.0352,-0.0723 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 -0.002 l -0.002,0.002 h -0.002 l -0.002,0.002 -0.002,0.002 c -0.02,0.0269 -0.0362,0.13438 -0.0566,0.33984 -0.14541,1.46432 -0.25296,2.26656 -0.39649,2.98438 -0.55508,2.77603 -1.93416,5.76495 -3.71875,8.05859 -0.19185,0.24658 -0.33515,0.46793 -0.33789,0.51953 v 0.002 l 0.002,0.002 v 0.002 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 c 0.048,-0.005 0.24721,-0.16288 0.46484,-0.37109 0.41069,-0.39293 0.63998,-0.58431 0.70117,-0.58984 0.001,2e-5 0.005,-1.6e-4 0.006,0 h 0.002 0.002 l 0.002,0.002 0.002,0.002 v 0.002 h 0.002 v 0.002 0.002 c 1.1e-4,10e-4 0,0.005 0,0.006 0,0.0283 -0.71435,0.83703 -1.58789,1.79688 -1.7919,1.96895 -2.36828,2.45652 -2.45118,2.07421 -8.8e-4,-0.004 -0.002,-0.009 -0.004,-0.0117 l -0.002,-0.002 c -8.3e-4,-8.1e-4 -0.005,-0.005 -0.006,-0.006 -0.06,-0.0337 -0.30231,0.11155 -0.79493,0.47852 -0.42921,0.31973 -1.17621,0.81972 -1.66015,1.11133 -3.07125,1.8506 -5.71297,2.52953 -9.79883,2.51953 -3.54959,-0.008 -6.20239,-0.56057 -8.80274,-1.83594 -3.92998,-1.9275 -7.11052,-5.09626 -9.02343,-8.99023 -0.59944,-1.22025 -0.99297,-2.31616 -1.30078,-3.61524 -0.92188,-3.89068 -0.73237,-8.50193 0.48242,-11.74609 0.15226,-0.40662 0.73704,-1.6819 1.29883,-2.83399 0.56178,-1.15209 1.00447,-2.12235 0.98437,-2.15625 -0.0272,-0.0459 -0.13008,-0.0669 -0.28516,-0.0625 z m 226.91602,0.20118 c -0.0854,10e-4 -0.10156,0.0445 -0.10156,0.11914 0,0.0878 -0.0947,0.27394 -0.21094,0.4121 -0.25899,0.30779 -0.28868,0.20172 0.62695,2.1836 1.09016,2.35965 1.58279,3.94244 1.89649,6.08008 0.16477,1.12261 0.14122,4.12589 -0.041,5.29687 -1.16057,7.45723 -5.70514,13.20978 -12.39062,15.68164 -2.57975,0.95383 -4.82516,1.36433 -7.45899,1.36133 -1.40648,-0.002 -1.8399,-0.0331 -2.6289,-0.1875 -3.54763,-0.69418 -7.32153,-2.39607 -10.0918,-4.55273 -0.26039,-0.20273 -0.41531,-0.30088 -0.46289,-0.29493 h -0.002 c -8.1e-4,3.1e-4 -0.005,0.002 -0.006,0.002 h -0.002 v 0.002 l -0.002,0.002 c -3.4e-4,7.6e-4 -0.002,0.005 -0.002,0.006 l -0.002,0.002 c -3.9e-4,0.006 9.7e-4,0.0159 0.004,0.0254 0.0698,0.22403 -0.0618,0.38441 -0.26367,0.32031 -0.31019,-0.0984 -1.63042,-1.64909 -1.55274,-1.81641 l 0.002,-0.002 v -0.002 l 0.002,-0.002 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 h 0.002 c 0.0454,-0.008 0.18448,0.0619 0.32617,0.16993 0.18974,0.14473 0.30256,0.21268 0.33398,0.20703 h 0.002 0.002 v -0.002 h 0.002 l 0.002,-0.002 v -0.002 l 0.002,-0.002 v -0.002 c -10e-4,-0.0326 -0.075,-0.13186 -0.22266,-0.28906 -1.87664,-1.99805 -3.59495,-5.45584 -4.29492,-8.64453 -0.24531,-1.11746 -0.45645,-2.66382 -0.46875,-3.4336 -0.004,-0.27266 -0.007,-0.41017 -0.0176,-0.43554 v -0.002 h -0.002 v -0.002 h -0.002 -0.002 v 0.002 l -0.002,0.002 c -0.0119,0.0216 -0.0315,0.10463 -0.0605,0.23437 -0.0847,0.37804 -0.2654,0.46364 -0.3457,0.16406 -0.0272,-0.10164 -0.0488,-0.53563 -0.0488,-0.96484 0,-0.72879 0.0536,-1.12418 0.15234,-1.16211 0.0511,-0.0151 0.11767,0.0616 0.19141,0.23633 0.0196,0.0464 0.035,0.0782 0.0488,0.0879 l 0.002,0.002 h 0.002 0.002 v 0.002 h 0.002 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,-0.002 c 0.0336,-0.0313 0.0539,-0.24883 0.0898,-0.77344 0.0727,-1.06364 0.24706,-2.13395 0.5293,-3.2539 0.25618,-1.01653 0.51106,-1.71678 1.125,-3.10157 0.60069,-1.35492 1.01839,-2.4387 1.09179,-2.83007 0.0477,-0.25453 0.0341,-0.29297 -0.10546,-0.29297 -0.89567,0 -8.13409,3.61323 -12.63086,6.30468 -3.12894,1.87277 -6.14063,4.06356 -9.85743,7.17383 -2.3361,1.95488 -2.60544,2.19838 -2.96289,2.6875 -0.41385,0.56629 -1.1346,1.247 -1.32422,1.25 -0.0862,10e-4 -0.23633,0.14837 -0.35546,0.34961 -0.11295,0.1908 -0.76916,0.91558 -1.45899,1.61133 -0.68983,0.69575 -1.27699,1.35652 -1.30469,1.4668 -0.0783,0.31188 0.11203,0.80764 0.4043,1.05469 0.46385,0.39207 1.2845,0.66962 2.38086,0.80468 0.29769,0.0367 0.39063,0.0208 0.39063,-0.0644 0,-0.30722 1.19132,-0.45526 1.46093,-0.18164 0.13282,0.13476 0.13105,0.14815 -0.0195,0.25976 -0.0407,0.0302 -0.0668,0.0535 -0.0742,0.0703 -2.9e-4,9e-4 -0.002,0.005 -0.002,0.006 v 0.002 0.002 0.002 0.002 l 0.002,0.002 v 0.002 l 0.002,0.002 0.002,0.002 c 8.8e-4,6.2e-4 0.005,0.003 0.006,0.004 0.0395,0.019 0.16514,0.0234 0.40625,0.0234 1.34406,-1e-5 5.18726,1.02334 11.22656,2.99023 10.02289,3.26428 17.76192,5.01302 25.10547,5.66992 1.8245,0.1632 2.14237,0.17099 2.38281,0.0703 0.6019,-0.25206 2.13477,-0.17614 2.13477,0.10547 0,0.16581 0.64934,0.16093 0.77148,-0.006 0.23078,-0.31511 1.88922,-0.33734 2.19727,-0.0293 0.1315,0.13147 0.2843,0.15234 1.06836,0.15234 0.7312,0 0.93351,-0.0253 1.00781,-0.12695 0.15952,-0.21815 1.19325,-0.3239 1.92578,-0.19727 0.79732,0.13781 1.64901,0.11665 3.5,-0.0879 6.96476,-0.76962 14.71271,-2.85386 20.57617,-5.53516 2.43444,-1.11324 5.5404,-3.05142 8.83399,-5.51171 1.88117,-1.40521 2.31706,-1.77495 2.58984,-2.20508 0.32445,-0.51161 1.62068,-1.82549 1.91016,-1.93555 0.12296,-0.0467 0.22461,-0.14204 0.22461,-0.21094 0,-0.0689 -0.24417,-0.35634 -0.54297,-0.63867 -0.29879,-0.28233 -0.72242,-0.7532 -0.94141,-1.04687 -1.18621,-1.59071 -8.26434,-6.93552 -12.07031,-9.11524 -2.92074,-1.67275 -8.41272,-4.24124 -11.37695,-5.32031 -0.77632,-0.2826 -1.11155,-0.39854 -1.25391,-0.39648 z m -10.69922,2.75585 c -0.82893,-0.0298 -1.67769,0.20544 -2.49805,0.69336 -0.11978,0.0713 -0.17105,0.11233 -0.21875,0.17383 -0.034,0.0439 -0.15407,0.19895 -0.26757,0.3457 -0.60176,0.77801 -1.03086,1.19444 -1.24805,1.21094 -0.0404,0.003 -0.0527,0.0169 -0.11914,0.12696 -0.64012,1.06142 -0.82082,2.22581 -0.52149,3.3789 0.1157,0.44574 0.27918,0.83155 0.53125,1.25391 0.0757,0.12685 0.10529,0.16134 0.17579,0.21094 0.0466,0.0328 0.2048,0.15364 0.35156,0.26757 0.78851,0.6122 1.26915,1.08757 1.24805,1.23633 -6.4e-4,0.004 -0.002,0.01 -0.002,0.0137 v 0.002 c 1.9e-4,9.2e-4 0.002,0.005 0.002,0.006 3.7e-4,9.1e-4 10e-4,0.005 0.002,0.006 0.0129,0.0204 0.0562,0.0465 0.16797,0.10742 0.56147,0.30604 1.22805,0.51082 1.86718,0.57422 0.19799,0.0196 0.83074,0.008 1.02344,-0.0195 0.55596,-0.0784 1.02123,-0.22142 1.53711,-0.4707 l 0.25781,-0.125 -0.008,-0.0664 c -0.007,-0.0553 -0.002,-0.077 0.0312,-0.13477 0.12792,-0.21919 0.57091,-0.62995 1.22852,-1.14063 0.35541,-0.27598 0.51019,-0.38166 0.56054,-0.37695 8.6e-4,1.6e-4 0.005,-2.4e-4 0.006,0 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 v 0.002 c 3.3e-4,7.4e-4 0.002,0.005 0.002,0.006 h 0.002 0.002 c 0.0304,-0.0264 0.22109,-0.40995 0.28906,-0.58398 0.12619,-0.32324 0.21497,-0.66514 0.26367,-1.01758 0.0327,-0.23629 0.0448,-0.73287 0.0234,-0.98633 -0.10717,-1.27116 -0.68653,-2.49102 -1.60156,-3.375 -0.85931,-0.83015 -1.91476,-1.28162 -3.09766,-1.32422 z m -206.26367,0.16797 c -0.17081,-10e-4 -0.33945,0.004 -0.44727,0.0156 -0.83172,0.0882 -1.63484,0.39967 -2.36132,0.91797 -0.59996,0.42803 -1.19871,1.05373 -1.61133,1.68359 -0.19601,0.2992 -0.39834,0.73279 -0.49414,1.05859 l -0.0332,0.11133 0.0371,0.0781 c 0.165,0.35421 0.19902,0.93275 0.082,1.39844 -0.0301,0.11972 -0.10061,0.28822 -0.13671,0.32812 -0.0184,0.0202 -0.0167,0.0379 0.008,0.14062 0.14844,0.62152 0.48877,1.29543 0.9414,1.86133 0.88641,1.10824 2.21613,1.85832 3.56641,2.01172 h 0.002 c 0.27219,0.0309 0.84591,0.0208 1.10938,-0.0195 1.17337,-0.17957 2.22093,-0.81046 2.94922,-1.7793 0.89442,-1.18988 1.24753,-2.76484 0.91992,-4.09961 -0.18964,-0.77265 -0.73525,-1.69246 -1.39844,-2.35546 -0.38525,-0.38513 -0.77571,-0.66776 -1.23437,-0.89649 -0.47633,-0.23755 -0.92039,-0.37149 -1.44532,-0.43359 -0.10927,-0.0128 -0.28231,-0.0203 -0.45312,-0.0215 z m 201.51367,3.73828 c 0.0225,-0.003 0.0475,0.0117 0.0762,0.0449 0.13969,0.1616 0.23142,0.67598 0.19532,1.09961 -0.0258,0.30246 -0.11578,0.61849 -0.20118,0.71289 -0.0485,0.0536 -0.11363,0.023 -0.14843,-0.0684 -0.12352,-0.32502 -0.11309,-1.47036 0.0156,-1.72266 0.0207,-0.0405 0.04,-0.0631 0.0625,-0.0664 z m -215.01172,3.42383 h 0.002 c 7.6e-4,4e-5 0.005,-1.2e-4 0.006,0 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 c 0.0231,0.0172 0.0514,0.0779 0.0918,0.18359 0.1463,0.38237 0.19942,1.89996 0.0859,2.44336 -0.10436,0.49976 -0.20021,0.59132 -0.30078,0.28711 -0.0932,-0.28193 -0.0656,-2.64766 0.0332,-2.82422 0.0271,-0.0484 0.0469,-0.0794 0.0645,-0.0898 7.9e-4,-3.9e-4 0.005,-0.002 0.006,-0.002 h 0.002 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -943.51721,408.53472 c 1.09191,-0.13521 2.73218,-0.13242 3.64505,0.006 0.91288,0.13862 0.0195,0.24924 -1.98528,0.24583 -2.00478,-0.003 -2.75167,-0.11682 -1.65977,-0.25203 z m -89.04109,-1.41235 c -2.4712,-0.99159 -6.9967,-4.34762 -11.3606,-8.4249 -3.1838,-2.97471 -3.6418,-3.27854 -1.8225,-1.20898 1.3365,1.52034 0.4047,0.69442 -2.0706,-1.83537 -2.4753,-2.52979 -4.3004,-4.18955 -4.0556,-3.68836 0.2447,0.5012 -0.1459,0.15807 -0.868,-0.76251 -0.7222,-0.92058 -1.5694,-1.51536 -1.8827,-1.32174 -0.3133,0.19362 -0.4945,-0.01 -0.4027,-0.4525 0.092,-0.4425 -0.3091,-0.80743 -0.891,-0.81095 -0.5819,-0.004 -0.9919,-0.19337 -0.9112,-0.42189 0.262,-0.7421 -3.9636,-4.72749 -10.6366,-10.03212 -8.3978,-6.67566 -8.6067,-7.47404 -1.2289,-4.69773 5.8859,2.21491 12.5388,5.91551 17.664,9.82541 3.3214,2.53382 4.6109,3.2106 5.1294,2.69209 1.0261,-1.02606 -1.8175,-3.74713 -8.7598,-8.38249 -6.6312,-4.4276 -13.7642,-7.58343 -20.7023,-9.15927 -2.5896,-0.58814 -4.7082,-1.27687 -4.7082,-1.5305 0,-0.25364 -0.3039,-0.46116 -0.6753,-0.46116 -0.3713,0 -3.7202,-2.14928 -7.4419,-4.77619 -3.7218,-2.6269 -8.3684,-5.82919 -10.326,-7.11621 -1.9576,-1.28701 -3.2553,-2.44132 -2.8839,-2.56514 1.1585,-0.38616 17.2265,2.15694 35.9073,5.68309 20.2482,3.82204 27.0885,4.38122 30.0942,2.46019 0.99,-0.63275 1.603,-0.93699 1.3623,-0.67609 -0.2407,0.2609 0.1172,1.25371 0.7955,2.20624 3.8616,5.42308 7.2315,15.98938 8.4981,26.64571 1.1456,9.63735 -0.5294,17.52354 -4.0023,18.84394 -1.858,0.7064 -1.9817,0.70534 -3.8207,-0.0326 z m 69.34198,-0.25732 c -5.74223,-4.02201 -4.30019,-26.86042 2.55558,-40.47416 2.82898,-5.61761 4.11117,-6.89824 5.90767,-5.90054 2.28492,1.26896 10.43039,0.69449 22.61577,-1.595 18.15831,-3.41175 36.33297,-6.47693 37.664,-6.35209 0.6691,0.0628 1.68594,-0.089 2.25965,-0.33728 0.5737,-0.24827 1.37031,-0.34232 1.77023,-0.20901 0.39992,0.1333 -2.52988,2.53487 -6.51068,5.3368 -3.98079,2.80194 -8.66507,6.09831 -10.40949,7.32527 -1.74443,1.22696 -2.99742,2.40511 -2.78442,2.61811 0.213,0.213 -0.31115,0.38727 -1.16479,0.38727 -2.49662,0 -11.95137,2.91269 -16.68803,5.14102 -6.48399,3.05035 -17.80542,11.05616 -17.80542,12.59089 0,1.53489 2.09318,0.8473 5.67594,-1.86448 2.20553,-1.66936 5.87877,-4.14539 8.16274,-5.50227 4.21796,-2.50584 13.76633,-6.32731 14.88106,-5.95574 0.33609,0.11203 -1.67634,2.10456 -4.47205,4.42785 -7.82077,6.4992 -14.22234,12.45008 -14.23743,13.23507 -0.008,0.39008 -0.44944,0.63728 -0.98209,0.54933 -0.53266,-0.0879 -1.34666,0.30626 -1.8089,0.87601 -0.71781,0.88476 -0.71594,0.96087 0.0128,0.52166 0.58353,-0.35168 0.71429,-0.28939 0.41365,0.19705 -0.24178,0.3912 -0.65485,0.57825 -0.91794,0.41565 -0.26309,-0.1626 -1.35499,0.79523 -2.42644,2.1285 -1.07145,1.33328 -2.16236,2.29171 -2.42425,2.12985 -0.48527,-0.29991 -3.86685,2.89783 -3.7589,3.55454 0.0326,0.19829 -0.14578,0.39549 -0.39637,0.43821 -0.2506,0.0427 -2.09591,1.2386 -4.10069,2.6575 -6.54508,4.63232 -8.64726,5.32979 -11.03123,3.65999 z m 20.75137,-11.86274 c 0.60477,-0.66826 0.96289,-1.21502 0.79582,-1.21502 -0.16706,0 -0.79856,0.54676 -1.40333,1.21502 -0.60476,0.66825 -0.96288,1.21501 -0.79582,1.21501 0.16707,0 0.79857,-0.54676 1.40333,-1.21501 z m -6.45633,11.69453 c -0.75566,-0.96354 -0.73417,-0.98503 0.22937,-0.22936 0.58473,0.45857 1.06314,0.93698 1.06314,1.06314 0,0.5 -0.49888,0.17818 -1.29251,-0.83378 z m 6.64618,-1.17438 c 0.43854,-0.17549 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34546 -0.79736,0.31908 -0.70771,-0.0292 -0.85166,-0.17311 -0.36703,-0.36704 z m -2.31613,-3.53381 c 0.78475,-0.83532 1.5635,-1.51877 1.73057,-1.51877 0.16706,0 -0.33831,0.68345 -1.12306,1.51877 -0.78475,0.83533 -1.5635,1.51878 -1.73057,1.51878 -0.16706,0 0.33832,-0.68345 1.12306,-1.51878 z m -139.84087,-35.34649 c 0.4385,-0.1755 0.9625,-0.15391 1.1644,0.048 0.2019,0.20187 -0.157,0.34545 -0.7974,0.31907 -0.7077,-0.0292 -0.8516,-0.1731 -0.367,-0.36703 z m 177.3925,0 c 0.43854,-0.1755 0.96252,-0.15391 1.16439,0.048 0.20187,0.20187 -0.15694,0.34545 -0.79736,0.31907 -0.70771,-0.0292 -0.85166,-0.1731 -0.36703,-0.36703 z m -198.9855,-15.19391 c 0.5911,-0.15403 1.4113,-0.1439 1.8226,0.0225 0.4113,0.16641 -0.072,0.29244 -1.0747,0.28006 -1.0024,-0.0124 -1.339,-0.14854 -0.7479,-0.30257 z"
       
       sodipodi:nodetypes="sscsssssssssscssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -703.69336,892.05859 c -8.66371,-0.10085 -19.2902,0.84386 -33.29883,2.68164 -13.18554,1.72981 -18.85923,2.77089 -26.7207,4.9043 -6.93923,1.88313 -8.44261,2.62201 -12.01758,5.9043 -3.49824,3.21184 -4.97116,6.41419 -4.98828,10.83789 -0.0109,2.80151 0.26981,3.78337 1.50391,5.25 1.13127,1.34445 1.31143,1.88451 0.70507,2.11719 -0.35387,0.13579 -0.9398,0.90386 -1.63085,2.05078 1.51607,-2.37866 2.53959,-2.8317 3.82617,-2.11719 2.28492,1.26896 10.42985,0.69379 22.61523,-1.5957 18.15831,-3.41175 36.33303,-6.47641 37.66406,-6.35157 0.6691,0.0628 1.68606,-0.0896 2.25977,-0.33789 0.5737,-0.24827 1.37156,-0.34229 1.77148,-0.20898 0.34597,0.11532 -1.8023,1.92942 -4.96484,4.23047 l 6.09766,-4.35156 6.83593,-0.38477 c 17.45874,-0.97946 32.34093,3.21665 51.01172,14.38086 6.47119,3.86945 7.38699,4.25364 8.19532,3.44531 1.27642,-1.27641 0.7263,-2.58975 -4.12305,-9.84179 -5.0295,-7.52148 -12.82512,-15.12032 -21.21289,-20.67774 -10.10347,-6.69418 -19.08978,-9.76746 -33.5293,-9.93555 z m -227.8125,0.0488 c -13.1288,0.30209 -22.0412,3.13816 -31.7832,9.48242 -10.9891,7.15641 -19.64155,16.11839 -24.93555,25.82618 -2.0601,3.77761 -2.17699,4.23516 -1.30469,5.10742 0.8722,0.87226 1.62695,0.57495 8.43555,-3.32617 9.0801,-5.20266 12.36314,-6.85966 18.52734,-9.34571 10.1236,-4.08283 20.8215,-5.81956 31.9375,-5.18554 l 2.77149,0.1582 c -0.007,-0.006 -0.014,-0.0145 -0.0176,-0.0215 -4.6e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 l -0.002,-0.002 v -0.002 -0.002 -0.002 -0.002 l 0.002,-0.002 v -0.002 c 0.009,-0.042 0.10301,-0.0897 0.29101,-0.13867 0.5911,-0.15403 1.41097,-0.14296 1.82227,0.0234 0.2909,0.1177 0.13155,0.21325 -0.33985,0.25586 l 2.01172,0.11523 2.87891,1.92578 c -1.2891,-0.93959 -2.03324,-1.6777 -1.74023,-1.77539 1.1585,-0.38616 17.22545,2.15549 35.90624,5.68164 20.2482,3.82204 27.08805,4.38197 30.09376,2.46094 0.78119,-0.49928 1.3307,-0.79362 1.4082,-0.76758 l 0.002,0.002 h 0.002 v 0.002 l 0.002,0.002 v 0.002 0.002 l 0.002,0.002 v 0.002 0.002 0.002 h -0.002 v 0.002 c -0.004,0.0154 -0.0207,0.0397 -0.0508,0.0723 -0.1258,0.1364 -0.0894,0.4723 0.0723,0.89844 -0.0777,-0.52286 0.2441,-1.09468 1.0586,-2.29492 3.3558,-4.945 0.15427,-13.86127 -6.48243,-18.05079 -6.5208,-4.11643 -30.17615,-8.60562 -55.84375,-10.5957 -5.4999,-0.42642 -10.3445,-0.60655 -14.7207,-0.50586 z m 212.61719,28.6875 c -3.89583,2.7421 -8.34703,5.87181 -10.03711,7.06055 -0.44359,0.312 -0.85474,0.62149 -1.21875,0.91211 l 2.26562,-1.5957 c 2.09303,-1.47501 5.82276,-4.12066 8.99024,-6.37696 z m -136.22461,3.58008 c 0.0957,0.16119 0.20256,0.3256 0.31836,0.48828 0.214,0.30046 0.42612,0.61609 0.63672,0.94727 -0.3019,-0.51728 -0.58239,-0.95119 -0.83399,-1.27735 -0.0424,-0.0549 -0.0835,-0.1069 -0.12109,-0.1582 z m -55.04883,0.20117 c 0.1573,0.11208 0.31069,0.22187 0.45899,0.32813 2.7421,1.9647 5.75019,3.97783 6.68359,4.47461 1.4805,0.78803 1.43586,0.86527 -1.80274,0.51562 0.185,0.19775 -0.17258,0.33854 -0.80468,0.3125 -0.7077,-0.0292 -0.85179,-0.17326 -0.36719,-0.36719 0.0523,-0.0209 0.10606,-0.0393 0.16016,-0.0547 -5.9505,-0.62276 -15.27726,-0.42809 -21.63086,0.45898 -9.2986,1.29824 -18.94431,4.91164 -26.40821,9.89258 -3.3982,2.26778 -13.36523,11.98968 -13.36523,13.03711 0,1.4936 1.5985,0.74446 4.2793,-2.00781 5.3259,-5.46801 16.96456,-12.23707 25.79296,-15 7.4254,-2.32386 13.13685,-3.10725 22.78125,-3.12305 10.6365,-0.0174 17.11343,0.99483 19.01563,2.9707 0.112,0.11637 0.7675,0.63358 0.9707,0.82031 -2.3251,-2.24022 -0.93906,-2.08636 4.14844,-0.17187 5.8859,2.21491 12.53886,5.91627 17.66406,9.82617 3.3214,2.53382 4.61041,3.20992 5.12891,2.69141 1.0261,-1.02606 -1.81747,-3.74746 -8.75977,-8.38281 -6.6312,-4.4276 -13.76307,-7.58237 -20.70117,-9.15821 -2.5896,-0.58814 -4.70898,-1.27762 -4.70898,-1.53125 0,-0.25364 -0.30438,-0.46094 -0.67578,-0.46094 -0.3713,0 -3.71971,-2.14848 -7.44141,-4.77539 -0.1379,-0.0973 -0.27767,-0.19615 -0.41797,-0.29492 z m 190.54492,4.63867 c -2.3731,0.0237 -4.81712,0.20954 -7.98047,0.57227 0.0647,0.0261 0.11891,0.0584 0.16016,0.0996 0.20187,0.20187 -0.15645,0.34669 -0.79688,0.32031 -0.59726,-0.0246 -0.79164,-0.13209 -0.54687,-0.28125 -0.30007,0.0364 -0.60657,0.074 -0.91992,0.11328 l -1.9961,0.25 v 0.002 c -0.0414,0.0848 -0.0472,0.1481 -0.0117,0.18359 0.213,0.213 -0.31238,0.38672 -1.16602,0.38672 -2.49662,0 -11.95084,2.91229 -16.6875,5.14062 -6.48399,3.05035 -17.80469,11.05707 -17.80469,12.5918 0,1.53489 2.09302,0.84655 5.67578,-1.86523 2.20553,-1.66936 5.87814,-4.14508 8.16211,-5.50196 4.21796,-2.50584 13.76613,-6.32665 14.88086,-5.95508 0.33609,0.11203 -1.67499,2.10445 -4.4707,4.42774 -2.16667,1.80054 -4.22516,3.55759 -6.06836,5.17578 2.14104,-1.85038 4.23249,-3.62986 6.16406,-5.24219 5.74701,-4.79717 6.04456,-4.95734 10.67969,-5.78906 5.89922,-1.05853 20.15869,-1.04761 26.33398,0.0215 12.52638,2.16859 27.84419,9.77079 35.51172,17.62305 2.38924,2.4468 3.97657,3.13057 3.97657,1.71484 0,-1.31746 -9.94026,-10.57261 -14.57422,-13.57031 -8.87866,-5.74358 -18.20177,-8.76024 -30.9668,-10.01953 -2.87797,-0.28392 -5.18158,-0.42216 -7.55469,-0.39844 z m -65.13867,6.49219 c -0.31876,0.87664 -0.59183,1.70537 -0.79687,2.44531 -0.15046,0.54294 -0.29365,1.08288 -0.43165,1.6211 0.36825,-1.38275 0.77812,-2.74314 1.22852,-4.06641 z m -5.07617,0.62109 c -0.64428,0.0587 -3.78428,7.57545 -5.07227,12.1504 -4.06932,14.4543 -4.69422,37.6012 -1.6582,61.35941 1.45837,11.4124 1.48938,11.543 2.75,11.543 0.61123,0 0.92744,-0.5743 0.92383,-1.6719 -0.003,-0.9189 -0.42793,-4.8138 -0.94531,-8.6563 -1.27596,-9.4762 -1.86801,-39.76941 -0.93164,-47.70898 0.97418,-8.26029 2.25106,-14.22252 4.38476,-20.49219 1.68964,-4.96485 1.82223,-6.52343 0.55664,-6.52344 -0.002,0 -0.005,-2.3e-4 -0.008,0 z m -59.6875,0.0645 c 0.6216,1.96621 1.15198,4.08786 1.64258,6.23633 -0.1564,-0.71301 -0.18744,-1.31824 -0.36524,-2.04688 -0.2976,-1.21883 -0.74494,-2.66535 -1.27734,-4.18945 z m 4.32617,0.0664 c -0.2037,-10e-4 -0.39936,0.1053 -0.59766,0.30079 -0.5865,0.5782 -0.35177,1.73695 1.11133,5.46679 6.962,17.74783 8.5311,41.66978 4.6836,71.42963 -0.5091,3.9377 -0.75377,7.4383 -0.54297,7.7793 0.7161,1.1587 2.31836,0.2526 2.78906,-1.5761 2.5309,-9.8336 3.76323,-40.98997 2.11523,-53.46291 -1.1696,-8.85259 -2.73878,-15.21635 -5.55468,-22.51562 -2.0844,-5.40307 -3.12121,-7.41625 -4.00391,-7.42188 z m -67.55664,2.90235 c -15.6936,-0.29088 -33.34029,6.69243 -45.90039,18.54101 -4.9554,4.67466 -5.39555,6.23453 -2.06055,7.3125 1.0842,0.35045 2.86162,1.48538 3.94922,2.52149 3.1075,2.96027 9.27495,6.66399 14.34375,8.61328 4.258,1.63743 13.72942,3.92232 18.91992,4.56445 4.8593,0.60117 18.77728,-0.20134 24.92578,-1.4375 3.4995,-0.70356 10.43251,-2.6689 15.40821,-4.36718 6.1117,-2.08606 9.9543,-3.06974 11.8457,-3.03126 4.16,0.0847 7.29866,-0.93569 8.06836,-2.625 0.9979,-2.19019 0.20942,-4.12285 -3.27148,-8.01367 l -1.83399,-2.05078 c 0.0351,0.10828 0.38844,0.54113 1.05274,1.29688 0.4072,0.46323 0.60482,0.71008 0.61132,0.75586 v 0.002 h -0.002 v 0.002 0.002 h -0.002 -0.002 -0.002 -0.002 -0.002 c -0.10951,-0.0324 -1.06483,-0.95725 -2.66993,-2.59766 -0.7005,-0.71588 -1.34986,-1.36092 -1.91406,-1.9082 -0.0333,0.0291 -0.0907,0.043 -0.17383,0.043 -0.1153,0 -0.73069,-0.61539 -1.36718,-1.36719 l -0.30665,-0.36328 -0.002,-0.002 c -0.1544,-0.12002 -0.25973,-0.18268 -0.29883,-0.17968 l -0.002,0.002 c -8e-4,2.5e-4 -0.005,0.002 -0.006,0.002 h -0.002 l -0.002,0.002 v 0.002 l -0.002,0.002 c -3e-4,7.8e-4 -0.002,0.005 -0.002,0.006 -10e-4,0.0147 0.005,0.0415 0.0215,0.0742 0.0535,0.10964 0.0764,0.18126 0.0723,0.21289 -2e-4,10e-4 -0.002,0.005 -0.002,0.006 v 0.002 l -0.002,0.002 -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 l -0.002,0.002 h -0.002 c -9e-4,9e-5 -0.005,0 -0.006,0 -0.0891,-0.008 -0.42715,-0.36844 -0.91797,-0.99414 -0.45459,-0.57947 -0.95835,-1.02846 -1.34765,-1.23438 0.369,0.36108 0.55375,0.56304 0.56445,0.61719 v 0.002 0.002 0.002 l -0.002,0.002 v 0.002 h -0.002 l -0.002,0.002 h -0.002 -0.002 c -10e-4,-3e-5 -0.003,-4e-5 -0.004,0 -0.0752,-0.003 -0.44795,-0.25171 -1.09375,-0.71094 -0.2683,0.16127 -0.43847,0.0274 -0.41797,-0.29883 -0.317,-0.2277 -0.6814,-0.49018 -1.0918,-0.78711 -0.1227,-0.0887 -0.24484,-0.17734 -0.36914,-0.26562 -0.1688,-0.055 -0.28426,-0.13443 -0.31836,-0.22461 -7.945,-5.56139 -18.90189,-10.13626 -27.77929,-11.56836 -2.1417,-0.34549 -4.34394,-0.53462 -6.58594,-0.57617 z m 191.25,0.0957 c -4.38075,0.12368 -8.66821,0.77311 -12.75781,1.96875 -7.34081,2.14618 -16.70072,6.82795 -23.10157,11.54883 -0.0302,0.29966 -0.32416,0.50666 -0.71093,0.52539 -0.63008,0.46336 -1.17403,0.85377 -1.61914,1.16406 0.0467,-0.0106 0.0833,-0.007 0.10351,0.008 0.001,9.3e-4 0.005,0.005 0.006,0.006 0.0401,0.0487 -0.008,0.18274 -0.14258,0.40039 -0.24178,0.39122 -0.65487,0.57862 -0.91796,0.41602 -0.26311,-0.1626 -1.35434,0.79368 -2.42579,2.12695 -1.07145,1.33328 -2.16193,2.29272 -2.42382,2.13086 -0.0426,-0.0263 -0.10668,-0.0254 -0.18946,-0.002 h -0.002 l -1.2793,1.38281 c -3.7251,4.0249 -4.10152,4.66464 -3.93359,6.68164 0.0556,0.66803 0.23261,1.25704 0.53515,1.76758 0.034,0.0265 0.0688,0.0532 0.10547,0.082 0.58473,0.45857 1.06446,0.9383 1.06446,1.06446 0,0.0267 -0.003,0.0502 -0.006,0.0723 1.34767,0.92313 3.50447,1.37033 6.52929,1.3711 2.93163,7.2e-4 5.20585,0.53662 10.0254,2.36523 15.04376,5.70783 29.53033,7.76711 43.00195,6.11523 7.11945,-0.87298 15.83927,-3.25018 21.19336,-5.77929 4.63917,-2.1914 11.02941,-6.44777 13.04492,-8.68946 0.62938,-0.70001 1.37563,-1.1297 1.6582,-0.95507 0.88414,0.54643 2.96875,-0.94321 2.96875,-2.1211 0,-1.33361 -6.24616,-7.31656 -11.65039,-11.16015 C -694.38115,943.443 -708.35774,939.086 -721.5,939.45703 Z m -168.30469,1.25586 c 0.3475,0.27998 0.45384,0.40116 0.80274,0.67773 2.1862,1.73325 5.46125,4.52434 8.09375,6.88086 -1.8596,-1.77206 -4.65888,-4.16608 -8.11328,-6.9121 -0.3446,-0.27392 -0.46621,-0.39221 -0.78321,-0.64649 z m -40.17383,4.82031 v 0.002 c 0.15508,-0.004 0.25796,0.0166 0.28516,0.0625 0.0201,0.0339 -0.42259,1.00416 -0.98437,2.15625 -0.56179,1.15209 -1.14657,2.42736 -1.29883,2.83398 -1.21479,3.24416 -1.4043,7.85541 -0.48242,11.74609 0.30781,1.29908 0.70134,2.39499 1.30078,3.61524 1.91291,3.89397 5.09345,7.06273 9.02343,8.99023 2.60035,1.27537 5.25315,1.82794 8.80274,1.83594 4.08586,0.01 6.72758,-0.66893 9.79883,-2.51953 0.48394,-0.29161 1.23094,-0.7916 1.66015,-1.11133 0.48493,-0.36123 0.72828,-0.50813 0.79297,-0.48047 l 0.002,0.002 c 10e-4,10e-4 0.005,0.005 0.006,0.006 l 0.002,0.002 h 0.002 c 10e-4,0.003 10e-4,0.009 0.002,0.0117 0.0829,0.38231 0.65928,-0.10527 2.45118,-2.07422 0.87354,-0.95985 1.58789,-1.76858 1.58789,-1.79688 0,-10e-4 1.1e-4,-0.005 0,-0.006 v -0.002 -0.002 h -0.002 v -0.002 l -0.002,-0.002 -0.002,-0.002 h -0.002 -0.002 c -10e-4,2e-5 -0.005,10e-6 -0.006,0 -0.0612,0.006 -0.29048,0.19691 -0.70117,0.58984 -0.21763,0.20821 -0.41684,0.3661 -0.46484,0.3711 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 v -0.004 -0.002 l -0.002,-0.002 v -0.002 c 0.003,-0.0516 0.14604,-0.27295 0.33789,-0.51953 1.78459,-2.29364 3.16367,-5.28256 3.71875,-8.05859 0.14353,-0.71782 0.25108,-1.52006 0.39649,-2.98438 0.0204,-0.20546 0.0366,-0.31294 0.0566,-0.33984 l 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 h 0.002 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 h 0.002 l 0.002,0.002 c 0.0106,0.0105 0.0211,0.0349 0.0352,0.0723 0.0856,0.22679 0.28788,0.24125 0.40234,0.0273 0.12279,-0.22942 0.10436,-0.78639 -0.0371,-1.125 -0.1347,-0.32239 -0.29795,-0.33352 -0.37695,-0.0254 -0.004,0.016 -0.01,0.0301 -0.0137,0.0371 l -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 -0.002 -0.002 -0.002 v -0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 c -0.0237,-0.042 -0.0499,-0.21276 -0.0742,-0.49414 -0.11576,-1.3423 -0.30303,-2.57505 -0.53711,-3.53321 -0.25188,-1.03102 -0.39404,-1.44514 -1.4668,-4.27148 -0.36011,-0.94878 -0.68034,-1.83124 -0.71094,-1.96094 -0.0235,-0.0984 -0.0343,-0.15714 -0.0215,-0.18554 h 0.002 c 8e-4,-0.001 0.002,-0.005 0.002,-0.006 l 0.002,-0.002 0.002,-0.002 h 0.002 l 0.002,-0.002 0.002,-0.002 c 0.0266,-0.0154 0.0821,-0.003 0.18164,0.0215 0.34537,0.0854 3.19897,1.22731 4.46094,1.78515 3.74299,1.65454 9.52427,5.25809 14.91015,9.29688 2.04965,1.537 2.54487,1.95981 3.0625,2.60937 0.49405,0.61998 1.10769,1.22071 1.2461,1.22071 0.0428,0 0.10638,-0.0526 0.14258,-0.11719 0.0502,-0.0896 0.301,0.0885 1.05273,0.75 1.49111,1.31199 1.72507,1.54684 2.78516,2.77148 0.53874,0.62237 1.11349,1.21904 1.27539,1.32618 0.1619,0.10714 0.36226,0.32272 0.44726,0.48046 0.14323,0.26604 0.14575,0.30161 0.0234,0.48829 -0.30336,0.46299 -3.06612,2.01646 -3.32422,1.89453 -10e-4,-8e-4 -0.005,-0.004 -0.006,-0.004 l -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 -0.002,-0.002 v -0.002 c -3.3e-4,-10e-4 -0.002,-0.003 -0.002,-0.004 -6.6e-4,-0.003 -0.002,-0.008 -0.002,-0.01 0,-0.22632 -0.96848,-0.37748 -1.51953,-0.23632 -0.51621,0.13224 -0.5577,0.33133 -0.082,0.39453 l 0.32813,0.043 -0.41016,0.0644 c -1.96352,0.3041 -5.38038,1.12914 -7.92578,1.91211 -0.51957,0.15982 -2.14689,0.69154 -3.61524,1.18164 -5.48302,1.83013 -10.04937,3.05075 -14.86914,3.97656 -4.74155,0.91079 -10.80618,1.69441 -12.07422,1.56055 -0.93489,-0.0987 -1.85534,-0.0613 -2.15039,0.0859 -0.32073,0.16024 -0.88027,0.1641 -1.17773,0.01 -0.52858,-0.27425 -2.33786,-0.22189 -2.55469,0.0742 -0.13054,0.17826 -1.42316,0.1784 -1.60156,0 -0.27464,-0.27464 -1.8981,-0.34927 -2.51367,-0.11523 -0.34877,0.1326 -3.94897,-0.24711 -6.71875,-0.70899 -7.16198,-1.19432 -14.84134,-3.77208 -19.92969,-6.68945 -2.86952,-1.64522 -4.91935,-3.20267 -8.55078,-6.49805 l -1.61914,-1.46875 0.46094,-0.43164 c 0.25299,-0.23773 1.01582,-1.04164 1.69531,-1.78711 1.37684,-1.51052 2.25462,-2.26758 5.18945,-4.47461 2.16831,-1.63059 3.46176,-2.52262 5.0918,-3.50976 4.23298,-2.56349 10.72217,-5.64552 13.70703,-6.50977 0.44578,-0.12904 0.85092,-0.20394 1.10937,-0.21094 z m 226.91602,0.20118 c 0.14236,-0.002 0.47759,0.11388 1.25391,0.39648 2.96423,1.07907 8.45621,3.64756 11.37695,5.32031 3.80597,2.17972 10.8841,7.52453 12.07031,9.11524 0.21899,0.29367 0.64262,0.76454 0.94141,1.04687 0.28946,0.27351 0.52836,0.55305 0.54297,0.63281 1.2e-4,0.001 0,0.005 0,0.006 0,0.0689 -0.10165,0.16424 -0.22461,0.21094 -0.28948,0.11006 -1.58571,1.42394 -1.91016,1.93555 -0.27278,0.43013 -0.70867,0.79987 -2.58984,2.20508 -3.29359,2.46029 -6.39955,4.39847 -8.83399,5.51171 -5.86346,2.6813 -13.61141,4.76554 -20.57617,5.53516 -1.85099,0.20455 -2.70268,0.2257 -3.5,0.0879 -0.73253,-0.12663 -1.76626,-0.0209 -1.92578,0.19727 -0.0743,0.10165 -0.27661,0.12695 -1.00781,0.12695 -0.78406,0 -0.93686,-0.0209 -1.06836,-0.15234 -0.30805,-0.30804 -1.96649,-0.28582 -2.19727,0.0293 -0.12214,0.16693 -0.77148,0.17167 -0.77148,0.006 0,-0.28161 -1.53287,-0.35753 -2.13477,-0.10547 -0.24044,0.10069 -0.55831,0.0929 -2.38281,-0.0703 -7.34355,-0.6569 -15.08258,-2.40564 -25.10547,-5.66992 -6.0393,-1.96689 -9.8825,-2.99024 -11.22656,-2.99023 -0.24111,0 -0.36675,-0.004 -0.40625,-0.0234 -10e-4,-8e-4 -0.005,-0.004 -0.006,-0.004 l -0.002,-0.002 -0.002,-0.002 v -0.002 l -0.002,-0.002 v -0.002 -0.002 -0.002 -0.002 -0.002 l 0.002,-0.002 v -0.002 c 4.7e-4,-10e-4 10e-4,-0.003 0.002,-0.004 0.0105,-0.0161 0.0367,-0.04 0.0723,-0.0664 0.15055,-0.11161 0.15235,-0.125 0.0195,-0.25976 -0.26408,-0.26801 -1.41201,-0.13231 -1.45898,0.16211 0.0245,-0.0511 0.11617,-0.10933 0.27734,-0.17383 0.21927,-0.0877 0.45888,-0.12588 0.66992,-0.11719 0.21105,0.009 0.39323,0.0651 0.49414,0.16602 0.20187,0.20187 -0.15645,0.34474 -0.79687,0.31836 -0.40413,-0.0167 -0.624,-0.0709 -0.64844,-0.15039 -0.0179,0.0642 -0.12098,0.074 -0.38867,0.041 -1.09636,-0.13506 -1.91701,-0.41262 -2.38086,-0.80468 -0.29227,-0.24706 -0.4826,-0.74281 -0.4043,-1.05469 0.0277,-0.11028 0.61486,-0.77105 1.30469,-1.4668 0.12463,-0.12569 0.14425,-0.16675 0.26367,-0.29101 -0.71662,0.74194 -1.39919,1.3457 -1.55273,1.3457 -0.004,0 -0.0105,-10e-4 -0.0137,-0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 h -0.002 l -0.002,-0.002 -0.002,-0.002 c -5.8e-4,-7.3e-4 -0.003,-0.005 -0.004,-0.006 v -0.002 c -0.0319,-0.11908 0.44673,-0.75086 1.15235,-1.50195 0.77248,-0.82227 1.53953,-1.49862 1.72265,-1.51953 h 0.002 0.002 c 0.001,4e-5 0.003,0 0.004,0 h 0.002 c 0.003,4.7e-4 0.006,0.002 0.008,0.002 0.001,2.5e-4 0.005,0.002 0.006,0.002 9e-4,4.1e-4 0.005,0.003 0.006,0.004 h 0.002 c 8.2e-4,10e-4 0.004,0.005 0.004,0.006 v 0.002 l 0.002,0.002 c 0.024,0.0895 -0.29581,0.50973 -0.72851,1.01172 0.19169,-0.21671 0.54776,-0.57857 0.59375,-0.65625 0.11913,-0.20124 0.26927,-0.34861 0.35546,-0.34961 0.18962,-0.003 0.91037,-0.68371 1.32422,-1.25 0.35745,-0.48912 0.62679,-0.73262 2.96289,-2.6875 3.7168,-3.11027 6.72849,-5.30106 9.85743,-7.17383 4.49677,-2.69145 11.73519,-6.30468 12.63086,-6.30468 0.13956,0 0.15316,0.0384 0.10546,0.29297 -0.0734,0.39137 -0.4911,1.47515 -1.09179,2.83007 -0.61394,1.38479 -0.86882,2.08504 -1.125,3.10157 -0.28224,1.11995 -0.4566,2.19026 -0.5293,3.2539 -0.0348,0.50822 -0.0542,0.72782 -0.0859,0.76953 l -0.002,0.002 -0.002,0.002 -0.002,0.002 h -0.002 -0.002 l -0.002,0.002 h -0.002 -0.002 v -0.002 h -0.002 -0.002 l -0.002,-0.002 c -0.0131,-0.0117 -0.0304,-0.0444 -0.0488,-0.0879 -0.0737,-0.17473 -0.14031,-0.25143 -0.19141,-0.23633 -0.0987,0.0379 -0.15234,0.43332 -0.15234,1.16211 0,0.42921 0.0216,0.86321 0.0488,0.96484 0.0803,0.29959 0.261,0.21398 0.3457,-0.16406 0.029,-0.12974 0.0486,-0.21277 0.0605,-0.23437 l 0.002,-0.002 v -0.002 h 0.002 0.002 v 0.002 h 0.002 v 0.002 c 0.0106,0.0254 0.0136,0.16288 0.0176,0.43554 0.0123,0.76978 0.22344,2.31614 0.46875,3.4336 0.69997,3.18869 2.41828,6.64648 4.29492,8.64453 0.14766,0.1572 0.22166,0.25646 0.22266,0.28906 v 0.002 l -0.002,0.002 v 0.002 l -0.002,0.002 h -0.002 v 0.002 h -0.002 -0.002 c -9.8e-4,1.7e-4 -0.003,-4e-5 -0.004,0 -0.039,-0.003 -0.1522,-0.0714 -0.33008,-0.20703 -0.12054,-0.0919 -0.24009,-0.15575 -0.30078,-0.16797 0.107,0.0573 0.3385,0.23035 0.69726,0.51172 0.58472,0.45858 1.0625,0.9383 1.0625,1.06445 0,0.5 -0.49934,0.17796 -1.29297,-0.83398 -0.26795,-0.34167 -0.43873,-0.56673 -0.5039,-0.67969 0.0942,0.31887 1.26165,1.67195 1.55078,1.76367 0.20187,0.0641 0.33347,-0.0963 0.26367,-0.32031 -0.003,-0.01 -0.004,-0.0194 -0.004,-0.0254 l 0.002,-0.002 c 4.5e-4,-10e-4 0.002,-0.005 0.002,-0.006 l 0.002,-0.002 v -0.002 h 0.002 0.002 c 10e-4,-4.6e-4 0.004,-0.002 0.004,-0.002 h 0.002 c 0.0476,-0.006 0.2025,0.0922 0.46289,0.29493 2.77027,2.15666 6.54417,3.85855 10.0918,4.55273 0.789,0.1544 1.22242,0.1855 2.6289,0.1875 2.63383,0.003 4.87924,-0.4075 7.45899,-1.36133 6.68548,-2.47186 11.23005,-8.22441 12.39062,-15.68164 0.18222,-1.17098 0.20579,-4.17426 0.041,-5.29687 -0.3137,-2.13764 -0.80633,-3.72043 -1.89649,-6.08008 -0.91563,-1.98188 -0.88594,-1.87581 -0.62695,-2.1836 0.11624,-0.13815 0.21094,-0.3243 0.21094,-0.4121 0,-0.0746 0.0162,-0.11815 0.10156,-0.11914 z m -10.69922,2.75585 c 1.1829,0.0426 2.23835,0.49407 3.09766,1.32422 0.91503,0.88398 1.49439,2.10384 1.60156,3.375 0.0214,0.25346 0.009,0.75004 -0.0234,0.98633 -0.0487,0.35244 -0.13748,0.69434 -0.26367,1.01758 -0.068,0.17403 -0.25866,0.55758 -0.28906,0.58398 h -0.002 -0.002 c -4.6e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 v -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 h -0.002 -0.002 -0.002 c -0.0503,-0.005 -0.20513,0.10097 -0.56054,0.37695 -0.65761,0.51068 -1.1006,0.92144 -1.22852,1.14063 -0.0332,0.0578 -0.0383,0.0795 -0.0312,0.13477 l 0.008,0.0664 -0.25781,0.125 c -0.51588,0.24928 -0.98115,0.39231 -1.53711,0.4707 -0.1927,0.0275 -0.82545,0.0391 -1.02344,0.0195 -0.63913,-0.0634 -1.30571,-0.26818 -1.86718,-0.57422 -0.11177,-0.0609 -0.15507,-0.087 -0.16797,-0.10742 -3.3e-4,-10e-4 -0.002,-0.005 -0.002,-0.006 v -0.002 c -4.8e-4,-10e-4 -0.002,-0.003 -0.002,-0.004 v -0.002 c 0,-9.2e-4 -1.4e-4,-0.003 0,-0.004 4.2e-4,-0.002 0.002,-0.008 0.002,-0.01 0.0211,-0.14876 -0.45954,-0.62413 -1.24805,-1.23633 -0.14676,-0.11393 -0.30496,-0.23477 -0.35156,-0.26757 -0.0705,-0.0496 -0.10009,-0.0841 -0.17579,-0.21094 -0.25207,-0.42236 -0.41555,-0.80817 -0.53125,-1.25391 -0.29933,-1.15309 -0.11863,-2.31748 0.52149,-3.3789 0.0664,-0.11006 0.0787,-0.12396 0.11914,-0.12696 0.21719,-0.0165 0.64629,-0.43293 1.24805,-1.21094 0.1135,-0.14674 0.23357,-0.3018 0.26757,-0.3457 0.0477,-0.0615 0.099,-0.10253 0.21875,-0.17383 0.82036,-0.48792 1.66912,-0.72316 2.49805,-0.69336 z m -206.26367,0.16797 c 0.17081,10e-4 0.34385,0.009 0.45312,0.0215 0.52493,0.0621 0.96899,0.19604 1.44532,0.43359 0.45866,0.22873 0.84912,0.51136 1.23437,0.89649 0.66319,0.663 1.2088,1.58281 1.39844,2.35546 0.32761,1.33477 -0.0255,2.90973 -0.91992,4.09961 -0.72829,0.96884 -1.77585,1.59973 -2.94922,1.7793 -0.26347,0.0403 -0.83719,0.0504 -1.10938,0.0195 h -0.002 c -1.35028,-0.1534 -2.68,-0.90348 -3.56641,-2.01172 -0.45263,-0.5659 -0.79296,-1.2398 -0.9414,-1.86133 -0.0247,-0.10272 -0.0262,-0.12042 -0.008,-0.14062 0.0361,-0.0399 0.10661,-0.2084 0.13671,-0.32812 0.11702,-0.4657 0.083,-1.04423 -0.082,-1.39844 l -0.0371,-0.0781 0.0332,-0.11133 c 0.0958,-0.3258 0.29813,-0.75939 0.49414,-1.05859 0.41262,-0.62986 1.01137,-1.25556 1.61133,-1.68359 0.72648,-0.5183 1.5296,-0.82977 2.36132,-0.91797 0.10782,-0.0116 0.27646,-0.0166 0.44727,-0.0156 z m 132.2207,0.41016 c -0.59308,4.46427 -0.70408,8.52984 -0.37109,11.91016 -0.3143,-3.48426 -0.18009,-7.6196 0.37109,-11.91016 z m -89.11523,2.88281 c 0.0925,0.0868 0.18032,0.16971 0.26562,0.25 -0.0606,-0.0997 -0.15082,-0.18482 -0.26562,-0.25 z m 158.4043,0.44531 c -0.0207,0.005 -0.0392,0.0284 -0.0586,0.0664 -0.12869,0.2523 -0.13914,1.39764 -0.0156,1.72266 0.0348,0.0914 0.0999,0.12196 0.14843,0.0684 0.0854,-0.0944 0.17538,-0.41043 0.20118,-0.71289 0.0361,-0.42363 -0.0556,-0.93801 -0.19532,-1.09961 -0.0287,-0.0332 -0.0537,-0.0479 -0.0762,-0.0449 -0.001,2.1e-4 -0.003,-3.5e-4 -0.004,0 z m -40.50782,1.17579 c -0.40926,0.14404 -0.83601,0.43089 -1.125,0.78711 -0.30581,0.37693 -0.48138,0.60681 -0.52539,0.71289 0.0146,-0.0135 0.0294,-0.0269 0.0449,-0.041 0.52453,-0.47945 1.06101,-0.96606 1.60547,-1.45898 z m -174.5,2.24804 -0.002,0.002 h -0.002 c -0.001,4.5e-4 -0.005,0.002 -0.006,0.002 -0.0176,0.0104 -0.0374,0.0414 -0.0645,0.0898 -0.0988,0.17656 -0.1264,2.54229 -0.0332,2.82422 0.10057,0.30421 0.19642,0.21265 0.30078,-0.28711 0.11352,-0.5434 0.0604,-2.06099 -0.0859,-2.44336 -0.0404,-0.10569 -0.0687,-0.16639 -0.0918,-0.18359 h -0.002 l -0.002,-0.002 h -0.002 l -0.002,-0.002 c -10e-4,-1.2e-4 -0.005,4e-5 -0.006,0 z m 40.00196,0.76563 c 0.0579,-0.006 0.12823,0.0883 0.20703,0.28515 0.1755,0.43855 0.15307,0.9622 -0.0488,1.16407 -0.2019,0.20187 -0.34466,-0.15842 -0.31836,-0.79883 0.0172,-0.42021 0.0754,-0.64125 0.16016,-0.65039 z m 130.2832,0.39844 c -0.17862,0.0167 -0.80117,0.55702 -1.39649,1.21484 -0.27964,0.309 -0.50375,0.59164 -0.65039,0.80664 l 2.09375,-1.99219 c -7.3e-4,-0.004 -0.003,-0.009 -0.004,-0.0117 -5.4e-4,-9.1e-4 -0.003,-0.005 -0.004,-0.006 l -0.002,-0.002 -0.002,-0.002 c -8.2e-4,-6.2e-4 -0.005,-0.003 -0.006,-0.004 -9.8e-4,-4.7e-4 -0.005,-0.002 -0.006,-0.002 -0.004,-0.001 -0.01,-0.002 -0.0156,-0.002 -0.003,0 -0.005,-2.8e-4 -0.008,0 z m 0.043,0.0801 -2.15235,2.32617 c 0.23985,-0.11171 0.79141,-0.60481 1.32227,-1.1914 0.46657,-0.51556 0.78502,-0.95912 0.83008,-1.13477 z m -3.93164,3.69141 c -0.32513,0.28367 -0.65934,0.59284 -0.96289,0.90625 0.24039,-0.22085 0.47537,-0.44178 0.70703,-0.66211 z m -11.94727,9.07226 c -1.54152,0.80886 -2.67562,1.12801 -3.66016,1.04493 0.48111,0.0504 0.99142,0.0119 1.5293,-0.12305 0.54282,-0.13624 1.27238,-0.45728 2.13086,-0.92188 z m -71.12695,0.48438 c -0.0324,0.0136 -0.065,0.0266 -0.0977,0.0391 -0.2578,0.098 -0.48144,0.18321 -0.68164,0.25391 0.2703,-0.0689 0.5296,-0.16747 0.7793,-0.29297 z m 87.01172,1.32031 c 0.66066,0.001 1.29942,0.0363 1.75586,0.10547 0.19969,0.0303 0.3155,0.0611 0.34961,0.0879 10e-4,9.5e-4 0.005,0.005 0.006,0.006 v 0.002 l 0.002,0.002 v 0.002 0.002 0.002 0.002 0.002 0.002 l -0.002,0.002 -0.002,0.002 -0.002,0.002 c -0.0857,0.079 -0.94199,0.13323 -2.33594,0.13086 -1.31564,-0.002 -2.09216,-0.0548 -2.16015,-0.12696 l -0.002,-0.002 v -0.002 -0.002 h -0.002 v -0.002 -0.002 l 0.002,-0.002 v -0.002 -0.002 h 0.002 c 6.1e-4,-9e-4 0.003,-0.005 0.004,-0.006 0.0355,-0.032 0.19754,-0.0666 0.4961,-0.10352 0.54595,-0.0676 1.228,-0.10071 1.88867,-0.0996 z m 6.21875,12.02735 c -0.2874,0.0141 -0.47997,0.11936 -0.62891,0.29882 -0.86879,1.04684 -0.39755,1.41706 5.72266,4.47657 8.53274,4.26554 20.8536,7.93809 29.76953,8.87695 5.22156,0.54983 18.00092,-0.22526 24.09375,-1.46289 6.48619,-1.31753 7.90271,-1.94691 6.81836,-3.03125 -0.41792,-0.41792 -2.17373,-0.27127 -5.4375,0.45508 -3.77463,0.84004 -7.58737,1.07055 -17.57813,1.06445 -11.21741,-0.007 -13.41715,-0.17454 -18.22461,-1.38281 -6.85984,-1.72409 -12.50231,-3.83091 -19.23242,-7.1836 -2.93509,-1.46216 -4.38029,-2.08104 -5.17383,-2.11132 -0.0451,-0.002 -0.0879,-0.002 -0.1289,0 z m -120.05664,0.37304 c -1.0432,-0.0235 -3.02145,0.72857 -6.15625,2.30078 -6.7546,3.3877 -15.50366,6.20854 -23.16016,7.46485 -7.2157,1.18398 -24.91295,0.83405 -31.12695,-0.61524 -2.1719,-0.50653 -4.28943,-0.93163 -4.70703,-0.94336 -1.3056,-0.0367 -0.82858,1.80568 0.60742,2.34571 1.35,0.5077 10.91085,2.25064 15.03515,2.74023 4.0839,0.48478 16.74864,-0.19418 21.80664,-1.16797 2.8045,-0.53992 7.8793,-1.89211 11.2793,-3.00586 6.7237,-2.20252 17.33789,-7.25181 17.33789,-8.24804 0,-0.56285 -0.29011,-0.857 -0.91601,-0.8711 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
       </g>
            <g id="svg-part-hidung" class="cursor-pointer" style="${isKActive('Hidung') ? activeGlow : normalTransition}" onclick="changeKepala('Hidung')" onmouseenter="hoverPart('Hidung', activeKepala)" onmouseleave="unhoverPart('Hidung', activeKepala)">
                <path
       
       style="fill:#f2b492;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.49805,936.6875 -56.6914,0.23242 z m -1.81054,1.91602 c -0.0351,-0.035 -44.10494,0.13755 -48.38282,0.18945 l -3.52148,0.043 0.4043,0.90039 c 0.53449,1.18865 1.71352,4.16154 2.32812,5.86719 2.00263,5.55771 3.26739,10.41774 4.25,16.3496 0.74208,4.47988 1.04254,7.36841 1.25586,12.05274 0.15308,3.3616 0.12538,15.2214 -0.043,18.60352 l -0.0352,0.74023 h 18.45507 18.45704 l -0.0352,-0.45117 c -0.0444,-0.56539 -0.12776,-2.21317 -0.22266,-4.42774 -0.10057,-2.34639 -0.10064,-12.70258 0,-14.90039 0.54939,-11.99713 1.91912,-20.90882 4.25586,-27.70508 0.71098,-2.06781 1.84786,-4.98602 2.56446,-6.58007 0.16201,-0.36043 0.28323,-0.66794 0.26953,-0.68164 z m -43.6875,54.90234 -0.043,0.43164 c -0.0241,0.23719 -0.0657,1.02321 -0.0918,1.74609 -0.11046,3.06528 -0.46773,8.51701 -0.78516,11.99221 -0.31204,3.4161 -0.74171,6.8464 -1.23828,9.8672 l -0.006,0.035 -1.87109,0.1192 -0.0664,1.0097 -0.12109,-0.2363 c 0,0 -3.4856,18.8208 -21.25977,26.0234 l 0.48633,0.3418 -1.21875,2.8457 c 0,0 0.0218,0.059 0.0606,0.1602 -0.14285,0.2372 -0.30227,0.5037 -0.46875,0.7832 -3.32173,5.5767 -5.26551,11.2063 -6.01367,17.416 -0.16092,1.3359 -0.13872,4.7575 0.0391,5.9414 0.18369,1.2233 0.35634,1.7029 0.66211,1.8496 0.21283,0.1021 0.32578,0.074 1.51758,-0.3828 1.42905,-0.5477 2.18924,-0.7875 3.70898,-1.168 6.18457,-1.5471 15.11853,-2.2755 19.5918,-1.5976 1.23681,0.1874 2.1003,0.4508 8.75,2.6719 3.36591,1.1243 6.57968,2.1557 7.14258,2.2929 1.27051,0.3096 2.49607,0.4933 3.84961,0.5743 v 0 c 1.54375,0.097 8.44292,0.1007 10.24414,0.01 3.37131,-0.1703 4.84542,-0.5203 10.92578,-2.5898 4.92857,-1.6775 6.42212,-2.106 8.51562,-2.4395 1.00823,-0.161 1.49697,-0.176 6.39063,-0.209 8.43468,-0.057 9.75799,0.082 14.82812,1.5625 1.8554,0.5417 3.32382,0.8786 4.0625,0.9336 l 0.53711,0.041 0.17969,-0.3964 c 1.49367,-3.2969 -0.39312,-13.5033 -3.92383,-21.2344 -0.55377,-1.2126 -0.67341,-1.4372 -2.03125,-3.8262 -0.0805,-0.1417 -0.15511,-0.2721 -0.22461,-0.3926 0.18504,-0.1006 0.29102,-0.1601 0.29102,-0.1601 l -1.01953,-3.0567 0.82617,-0.1992 c -18.58736,-7.435 -21.02734,-24.6289 -21.02735,-24.6289 l -0.21484,0.7402 -0.58008,-4.4003 -1.16992,0.4961 c -0.66968,-4.661 -1.44595,-11.1888 -1.82422,-15.3223 -0.24372,-2.66341 -0.53671,-6.59681 -0.53711,-7.209 v -0.43164 h -18.43554 z m -8.92774,54.79104 c -0.18217,1.3533 -0.30104,2.7886 -0.37695,4.4219 -0.19136,4.1173 0.0791,5.28 2.57031,11.0839 0.4512,1.0511 0.80922,1.9919 0.79492,2.0879 -0.0823,0.5531 -1.25357,0.7168 -1.99804,0.2793 -2.06298,-1.2125 -4.07736,-6.0458 -4.60743,-11.0547 -0.1824,-1.7236 -0.11485,-3.67 0.19922,-5.7988 z m 57.45313,4.4179 c 0.0221,1.1285 -0.008,2.2057 -0.0996,3.0586 -0.47371,4.4301 -2.29795,9.1843 -3.79883,9.8965 -0.42562,0.2019 -1.55759,0.1522 -1.72461,-0.076 -0.18857,-0.2581 -0.14331,-0.467 0.42773,-1.9551 1.18593,-3.0902 1.73268,-5.1776 2.04493,-7.8242 0.0592,-0.5022 0.0983,-1.2753 0.11523,-2.1036 1.00545,-0.3311 2.03174,-0.6678 3.03516,-0.9961 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:0.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.76562,936.38477 c -0.0854,0.003 -0.14603,0.0448 -0.23438,0.13867 -0.89326,0.94959 -3.76125,8.04299 -4.91016,12.14453 -2.90965,10.38727 -4.08158,25.73615 -3.2539,42.62109 0.37367,7.62291 1.03672,14.34764 2.38476,24.23244 0.54035,3.9622 0.79802,5.1256 1.23438,5.5644 0.21181,0.2129 0.33207,0.2676 0.5957,0.2676 0.41736,0 0.79849,-0.3015 0.91602,-0.7246 0.18999,-0.6841 0.0447,-2.5369 -0.61133,-7.7773 -0.52834,-4.2203 -0.68101,-5.8766 -0.94531,-10.3496 -0.66525,-11.25883 -0.86798,-29.42082 -0.41016,-36.75981 0.14337,-2.29832 0.51022,-5.21898 1.11328,-8.87305 0.84357,-5.11139 1.76601,-8.85042 3.44141,-13.95508 1.61113,-4.90883 1.78951,-6.23325 0.87304,-6.49609 -0.0807,-0.0232 -0.14213,-0.0351 -0.19335,-0.0332 z m -55.5,0.13476 c -0.0801,0.006 -0.15771,0.0295 -0.23438,0.0703 -0.40849,0.21764 -0.53088,0.53257 -0.48828,1.26368 0.0462,0.79343 0.27967,1.54794 1.3457,4.35351 2.28474,6.01299 3.77294,11.54771 4.9082,18.25586 2.44455,14.44442 2.41874,32.14267 -0.0781,52.01952 -0.66861,5.3219 -0.89841,8.3628 -0.67188,8.8946 0.0885,0.2076 0.22191,0.3497 0.40235,0.4277 0.36897,0.1606 0.52945,0.1516 0.94336,-0.049 0.63847,-0.309 1.12987,-1.0683 1.41015,-2.1758 1.67334,-6.612 2.93259,-24.4729 2.7754,-39.38089 -0.0897,-8.50402 -0.36994,-12.16146 -1.41602,-18.44141 -1.15607,-6.94023 -2.78313,-12.69509 -5.54688,-19.61719 -1.61535,-4.04581 -2.57529,-5.67526 -3.3496,-5.62109 z m 53.78124,100.06057 c -0.0403,5e-4 -0.09,0 -0.15039,0.01 -0.40639,0.021 -0.50639,0.1091 -0.52929,0.4668 -0.0348,0.5422 0.16132,1.4089 1.45898,6.4825 0.67567,2.6417 1.01618,4.5051 1.25,6.8242 0.095,0.9397 0.14072,2.4398 0.10352,3.4375 -0.0598,1.6039 -0.1995,2.7983 -0.49805,4.2988 -0.37665,1.893 -0.9472,3.7444 -1.83984,5.959 -0.19637,0.4872 -0.37253,0.955 -0.39063,1.041 -0.0714,0.3378 0.0687,0.515 0.46094,0.584 v 0 c 0.19883,0.037 0.70597,0.036 0.87891,0 0.0847,-0.017 0.25129,-0.079 0.37109,-0.1367 0.55523,-0.2682 1.13156,-1.0846 1.75781,-2.4883 1.04402,-2.3402 1.69804,-4.8282 1.94336,-7.3925 0.1869,-1.9536 0.14689,-4.0408 -0.11719,-6.1856 -0.6053,-4.9161 -2.60576,-11.0595 -4.09179,-12.5625 -0.11232,-0.1136 -0.26615,-0.2364 -0.34375,-0.2734 -0.0935,-0.047 -0.14286,-0.06 -0.26368,-0.059 z m -49.94921,0.045 c -0.0404,-10e-4 -0.0873,7e-4 -0.13868,0 -0.27143,0 -0.64653,0.097 -0.91601,0.2285 -1.40271,0.6826 -3.42546,5.6265 -4.4668,10.9199 -0.54759,2.7836 -0.70002,4.9801 -0.49609,7.1308 0.51647,5.4473 2.91634,10.8208 5.07812,11.3731 0.20517,0.052 0.73963,0.033 0.94532,-0.035 0.0899,-0.03 0.20427,-0.098 0.26757,-0.1582 0.1004,-0.096 0.11133,-0.1197 0.11133,-0.2539 0,-0.1269 -0.0556,-0.2736 -0.38086,-1.0136 -2.68655,-6.1122 -3.09081,-7.5512 -3.03711,-10.7989 0.0638,-3.8635 0.512,-7.3385 1.34375,-10.4101 0.20937,-0.7731 0.34837,-1.2151 0.77149,-2.4707 0.66923,-1.9859 1.09714,-3.4757 1.18554,-4.1211 0.0425,-0.3103 0.0155,-0.3856 -0.26757,-0.3926 z m 67.60351,6.9668 c -0.18797,0.01 -0.32215,0.1109 -0.39062,0.3184 -0.18788,0.5693 0.31987,1.7669 1.87109,4.4082 0.69796,1.1885 1.05414,1.8468 1.52149,2.8125 2.54869,5.2665 4.44701,12.222 4.74023,17.3691 0.0955,1.6769 0.0141,2.8889 -0.27539,4.1211 -0.1016,0.4326 -0.10356,0.4661 -0.0391,0.5371 0.10126,0.1119 0.0866,0.4927 -0.0352,0.9473 -0.37903,1.4148 -1.62808,4.0199 -2.71289,5.6543 -0.42206,0.6358 -0.76937,1.0549 -1.25391,1.5156 -1.7514,1.6653 -4.11,2.9895 -6.97851,3.918 -1.26709,0.4101 -2.14927,0.6162 -4.26172,0.9941 -2.37244,0.4245 -3.21154,0.7206 -3.5,1.2344 -0.0895,0.1594 -0.10352,0.2322 -0.10352,0.5722 0,0.3358 0.0143,0.4121 0.0957,0.543 0.15814,0.2543 0.47155,0.365 1.28125,0.459 v 0 c 0.0791,0.01 0.89174,0.01 1.80664,0 1.71223,-0.016 2.49014,-0.064 3.55664,-0.2226 4.52437,-0.6724 8.37186,-2.8401 11.49804,-6.4785 0.64031,-0.7452 1.04067,-1.2716 1.91211,-2.5117 0.37505,-0.5337 0.70121,-0.9629 0.72461,-0.9629 0.0234,0 0.17281,-0.3822 0.33203,-0.8614 0.77934,-2.3455 1.22596,-4.6843 1.4043,-7.3554 0.0554,-0.8298 0.0555,-3.2193 0,-4.0508 -0.28,-4.1953 -1.22758,-8.1561 -2.88086,-12.0352 -0.418,-0.9807 -1.25777,-2.6857 -1.73633,-3.5273 -2.28189,-4.0127 -5.42745,-7.4498 -6.57617,-7.4004 z m -86.58789,0.4219 c -0.17356,0 -0.36894,0.06 -0.60156,0.1718 -1.75288,0.844 -4.65333,4.6513 -6.70117,8.795 -2.18447,4.4202 -3.46127,9.0191 -3.80664,13.7168 -0.0655,0.8913 -0.0638,3.2193 0.002,4.0468 0.19748,2.4855 0.65485,4.598 1.42187,6.5704 0.11859,0.305 0.41336,0.9804 0.65625,1.5 0.55856,1.1948 0.91063,1.9786 1.21485,2.7089 0.2337,0.561 0.24314,0.5766 0.3789,0.5996 0.25547,0.043 1.01897,0.5788 1.98047,1.3907 0.27108,0.2289 0.70506,0.5883 0.96485,0.7988 1.49965,1.2152 4.0816,2.7393 5.77148,3.4063 2.1978,0.8675 5.3074,1.5217 7.74219,1.6289 v 0 c 0.35014,0.017 0.71038,0.028 0.80078,0.018 0.0904,-0.01 0.35851,-0.02 0.5957,-0.031 0.49027,-0.024 1.00267,-0.1422 1.25,-0.2871 0.19083,-0.1119 0.32748,-0.3268 0.39258,-0.6172 0.0891,-0.3976 -0.13059,-0.8224 -0.5957,-1.1543 -0.72357,-0.5163 -1.82726,-0.8436 -3.65625,-1.0859 -2.03747,-0.27 -4.03391,-0.8535 -5.87305,-1.7168 -3.55294,-1.6678 -6.32528,-4.1827 -7.80078,-7.0742 -0.23634,-0.4632 -1.29687,-2.9432 -1.29687,-3.0332 v 0 h 0.002 v 0 c 0.0217,-0.027 0.20284,-0.1149 0.41992,-0.2012 0.21245,-0.084 0.31304,-0.1271 0.33594,-0.1484 h 0.002 0.002 0.002 v 0 0 h -0.002 -0.002 -0.002 c -0.0115,0 -0.0388,-0.01 -0.0742,-0.01 -0.42297,0 -0.64315,-0.5833 -0.84375,-2.209 -0.14223,-1.1529 -0.1812,-1.9629 -0.1543,-3.2753 0.0347,-1.69 0.16184,-3.0102 0.46094,-4.7793 0.65285,-3.8614 1.99029,-8.0053 3.74023,-11.5899 0.63876,-1.3084 1.04086,-2.0402 1.8711,-3.414 1.70165,-2.8158 2.08789,-3.5791 2.08789,-4.125 0,-0.2663 -0.1206,-0.4293 -0.39258,-0.5332 -0.0934,-0.036 -0.18883,-0.053 -0.29297,-0.051 z m 74.62891,31.498 c -0.75507,-0.01 -1.51343,0.029 -2.02539,0.1094 -2.5047,0.393 -4.57324,1.3015 -7.17188,3.1465 -1.81425,1.2881 -3.55548,2.7964 -6.57031,5.6933 -2.95503,2.8395 -5.75903,5.278 -7.08008,6.1563 -1.07144,0.7123 -2.80583,1.2487 -4.98242,1.543 -1.27868,0.173 -3.79123,0.2158 -5.125,0.088 -3.04913,-0.2924 -5.45384,-1.0429 -7.31836,-2.2871 -1.24808,-0.8329 -2.42186,-1.8737 -5.7793,-5.123 -4.08946,-3.9577 -5.73887,-5.3925 -7.67773,-6.6797 -2.09808,-1.3931 -3.93643,-2.046 -6.37891,-2.2637 -0.88637,-0.083 -4.05604,-0.08 -4.85547,0 -0.81212,0.082 -1.61498,0.285 -2.0625,0.5235 -0.19373,0.1032 -0.53088,0.3537 -0.75,0.5566 -1.64063,1.5189 -1.58939,3.8576 0.1211,5.584 1.31323,1.3255 2.30781,1.5838 7.86523,2.041 3.7143,0.3056 5.45853,0.4906 6.91211,0.7324 1.89231,0.3148 2.59599,0.6135 2.67969,1.1368 0.0438,0.2695 0.17881,0.3662 0.40625,0.2792 0.24225,-0.092 0.44827,-0.019 1.01953,0.3633 0.35946,0.2405 0.9158,0.7348 1.78125,1.5782 2.36502,2.3048 4.35429,3.8288 6.54492,5.0195 2.0516,1.1151 3.5864,1.4708 7.17188,1.6582 v 0 c 0.17571,0.01 0.92147,0.017 1.65625,0.027 3.25204,0.025 6.4026,-0.3024 8.13086,-0.8437 1.58328,-0.4958 4.1692,-2.1951 6.47656,-4.2578 2.59013,-2.3154 4.62914,-3.9123 5.5918,-4.3789 0.81095,-0.393 3.3978,-0.7909 7.02343,-1.0801 5.88876,-0.4696 8.13636,-0.9722 9.62696,-2.1504 0.58393,-0.4616 1.21847,-1.4653 1.43164,-2.2637 0.13208,-0.4929 0.13268,-1.2104 0.002,-1.6562 -0.27679,-0.9437 -1.08313,-1.8009 -2.23828,-2.3809 -0.51679,-0.2595 -1.60765,-0.5906 -2.41406,-0.7324 -0.50471,-0.089 -1.25665,-0.1364 -2.01172,-0.1426 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" /><path
       style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
       d="m -999.88297,540.19617 c -3.18893,-0.54096 -8.77383,-2.49349 -17.26933,-6.03759 -3.3214,-1.3856 -8.8567,-3.18507 -12.3007,-3.99883 -7.353,-1.73741 -10.3149,-3.12599 -13.5338,-6.34496 -2.3491,-2.34907 -4.067,-4.88084 -3.3118,-4.88084 0.2182,0 1.3772,0.86084 2.5756,1.91297 1.1983,1.05214 3.6567,2.58964 5.4632,3.41666 3.7116,1.69925 10.6089,2.55398 11.3203,1.40285 0.7635,-1.23537 -0.787,-2.29962 -3.8849,-2.66652 -6.367,-0.75407 -12.2102,-4.6976 -14.2632,-9.62611 l -0.9243,-2.21884 2.3118,-0.92502 c 5.8823,-2.3536 18.8151,-3.71545 24.0816,-2.53583 1.0024,0.22453 5.103,1.54679 9.1126,2.93837 7.1204,2.47124 7.4739,2.52975 15.18771,2.51349 7.71937,-0.0163 8.07585,-0.0771 15.79522,-2.69797 7.80715,-2.65063 7.99155,-2.68125 16.09898,-2.67365 7.03212,0.007 8.9159,0.22667 13.21331,1.54368 2.79364,0.85615 5.01194,1.26263 5.01194,0.91839 0,-0.33968 0.15954,-0.45807 0.35452,-0.26309 0.52516,0.52516 -2.02997,5.9906 -3.57361,7.64397 -2.35876,2.52642 -6.38442,4.4504 -10.90596,5.21225 -3.69221,0.62212 -4.40396,0.93184 -4.40396,1.91639 0,1.05596 0.41938,1.16452 4.15975,1.0768 6.53812,-0.15334 11.75211,-3.05211 15.71412,-8.73642 l 1.04109,-1.49367 -0.65395,2.00038 c -0.92437,2.82757 -6.12563,8.29684 -9.39573,9.87986 -1.51947,0.73556 -5.85383,2.09656 -9.63191,3.02444 -3.94791,0.96958 -10.19213,3.15856 -14.6827,5.14717 -10.66224,4.72168 -15.72308,5.73619 -22.70589,4.55167 z m 12.31351,-8.85155 c 1.71206,-0.58336 4.32451,-2.35022 6.71847,-4.54385 2.15442,-1.97413 4.60806,-3.85202 5.45255,-4.17309 0.84448,-0.32107 3.95254,-0.76001 6.90681,-0.97542 6.52502,-0.47576 9.02874,-1.18554 10.22957,-2.89998 2.39642,-3.42136 -0.48279,-6.49946 -6.0732,-6.49272 -4.82446,0.006 -8.79144,2.25327 -15.44679,8.75124 -3.19881,3.12315 -6.71219,6.13155 -7.80754,6.68533 -3.15833,1.59678 -9.0212,1.89404 -13.22921,0.67075 -3.1934,-0.92837 -4.3044,-1.73081 -9.6847,-6.99525 -7.5533,-7.39065 -10.0283,-8.76069 -15.884,-8.79276 -3.4362,-0.0188 -4.6053,0.21702 -5.6195,1.13353 -1.7292,1.56286 -1.6309,4.073 0.2279,5.81928 1.2812,1.2036 2.4337,1.48871 7.652,1.89292 7.2112,0.55858 9.6724,1.02831 9.6724,1.84603 0,0.3273 0.23,0.45291 0.5112,0.27912 0.2812,-0.17378 1.4431,0.65632 2.5819,1.84467 2.7688,2.88903 6.5515,5.46488 9.1004,6.19692 3.3407,0.95944 11.55678,0.82147 14.69174,-0.24672 z"
       
       sodipodi:nodetypes="sssssssssscssssscsssssssscssssssssssssssssssssssss"
       transform="matrix(0.88007022,0,0,0.88007022,1174.82,-9.8447297)" /><path
       
       style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:0.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m -789.76562,936.38477 c -0.0854,0.003 -0.14603,0.0448 -0.23438,0.13867 -0.89326,0.94959 -3.76125,8.04299 -4.91016,12.14453 -2.90965,10.38727 -4.08158,25.73615 -3.2539,42.62109 0.37367,7.62291 1.03672,14.34764 2.38476,24.23244 0.54035,3.9622 0.79802,5.1256 1.23438,5.5644 0.21181,0.2129 0.33207,0.2676 0.5957,0.2676 0.41736,0 0.79849,-0.3015 0.91602,-0.7246 0.18999,-0.6841 0.0447,-2.5369 -0.61133,-7.7773 -0.52834,-4.2203 -0.68101,-5.8766 -0.94531,-10.3496 -0.66525,-11.25883 -0.86798,-29.42082 -0.41016,-36.75981 0.14337,-2.29832 0.51022,-5.21898 1.11328,-8.87305 0.84357,-5.11139 1.76601,-8.85042 3.44141,-13.95508 1.61113,-4.90883 1.78951,-6.23325 0.87304,-6.49609 -0.0807,-0.0232 -0.14213,-0.0351 -0.19335,-0.0332 z m -55.5,0.13476 c -0.0801,0.006 -0.15771,0.0295 -0.23438,0.0703 -0.40849,0.21764 -0.53088,0.53257 -0.48828,1.26368 0.0462,0.79343 0.27967,1.54794 1.3457,4.35351 2.28474,6.01299 3.77294,11.54771 4.9082,18.25586 2.44455,14.44442 2.41874,32.14267 -0.0781,52.01952 -0.66861,5.3219 -0.89841,8.3628 -0.67188,8.8946 0.0885,0.2076 0.22191,0.3497 0.40235,0.4277 0.36897,0.1606 0.52945,0.1516 0.94336,-0.049 0.63847,-0.309 1.12987,-1.0683 1.41015,-2.1758 1.67334,-6.612 2.93259,-24.4729 2.7754,-39.38089 -0.0897,-8.50402 -0.36994,-12.16146 -1.41602,-18.44141 -1.15607,-6.94023 -2.78313,-12.69509 -5.54688,-19.61719 -1.61535,-4.04581 -2.57529,-5.67526 -3.3496,-5.62109 z m 53.78124,100.06057 c -0.0403,5e-4 -0.09,0 -0.15039,0.01 -0.40639,0.021 -0.50639,0.1091 -0.52929,0.4668 -0.0348,0.5422 0.16132,1.4089 1.45898,6.4825 0.67567,2.6417 1.01618,4.5051 1.25,6.8242 0.095,0.9397 0.14072,2.4398 0.10352,3.4375 -0.0598,1.6039 -0.1995,2.7983 -0.49805,4.2988 -0.37665,1.893 -0.9472,3.7444 -1.83984,5.959 -0.19637,0.4872 -0.37253,0.955 -0.39063,1.041 -0.0714,0.3378 0.0687,0.515 0.46094,0.584 v 0 c 0.19883,0.037 0.70597,0.036 0.87891,0 0.0847,-0.017 0.25129,-0.079 0.37109,-0.1367 0.55523,-0.2682 1.13156,-1.0846 1.75781,-2.4883 1.04402,-2.3402 1.69804,-4.8282 1.94336,-7.3925 0.1869,-1.9536 0.14689,-4.0408 -0.11719,-6.1856 -0.6053,-4.9161 -2.60576,-11.0595 -4.09179,-12.5625 -0.11232,-0.1136 -0.26615,-0.2364 -0.34375,-0.2734 -0.0935,-0.047 -0.14286,-0.06 -0.26368,-0.059 z m -49.94921,0.045 c -0.0404,-10e-4 -0.0873,7e-4 -0.13868,0 -0.27143,0 -0.64653,0.097 -0.91601,0.2285 -1.40271,0.6826 -3.42546,5.6265 -4.4668,10.9199 -0.54759,2.7836 -0.70002,4.9801 -0.49609,7.1308 0.51647,5.4473 2.91634,10.8208 5.07812,11.3731 0.20517,0.052 0.73963,0.033 0.94532,-0.035 0.0899,-0.03 0.20427,-0.098 0.26757,-0.1582 0.1004,-0.096 0.11133,-0.1197 0.11133,-0.2539 0,-0.1269 -0.0556,-0.2736 -0.38086,-1.0136 -2.68655,-6.1122 -3.09081,-7.5512 -3.03711,-10.7989 0.0638,-3.8635 0.512,-7.3385 1.34375,-10.4101 0.20937,-0.7731 0.34837,-1.2151 0.77149,-2.4707 0.66923,-1.9859 1.09714,-3.4757 1.18554,-4.1211 0.0425,-0.3103 0.0155,-0.3856 -0.26757,-0.3926 z m 67.60351,6.9668 c -0.18797,0.01 -0.32215,0.1109 -0.39062,0.3184 -0.18788,0.5693 0.31987,1.7669 1.87109,4.4082 0.69796,1.1885 1.05414,1.8468 1.52149,2.8125 2.54869,5.2665 4.44701,12.222 4.74023,17.3691 0.0955,1.6769 0.0141,2.8889 -0.27539,4.1211 -0.1016,0.4326 -0.10356,0.4661 -0.0391,0.5371 0.10126,0.1119 0.0866,0.4927 -0.0352,0.9473 -0.37903,1.4148 -1.62808,4.0199 -2.71289,5.6543 -0.42206,0.6358 -0.76937,1.0549 -1.25391,1.5156 -1.7514,1.6653 -4.11,2.9895 -6.97851,3.918 -1.26709,0.4101 -2.14927,0.6162 -4.26172,0.9941 -2.37244,0.4245 -3.21154,0.7206 -3.5,1.2344 -0.0895,0.1594 -0.10352,0.2322 -0.10352,0.5722 0,0.3358 0.0143,0.4121 0.0957,0.543 0.15814,0.2543 0.47155,0.365 1.28125,0.459 v 0 c 0.0791,0.01 0.89174,0.01 1.80664,0 1.71223,-0.016 2.49014,-0.064 3.55664,-0.2226 4.52437,-0.6724 8.37186,-2.8401 11.49804,-6.4785 0.64031,-0.7452 1.04067,-1.2716 1.91211,-2.5117 0.37505,-0.5337 0.70121,-0.9629 0.72461,-0.9629 0.0234,0 0.17281,-0.3822 0.33203,-0.8614 0.77934,-2.3455 1.22596,-4.6843 1.4043,-7.3554 0.0554,-0.8298 0.0555,-3.2193 0,-4.0508 -0.28,-4.1953 -1.22758,-8.1561 -2.88086,-12.0352 -0.418,-0.9807 -1.25777,-2.6857 -1.73633,-3.5273 -2.28189,-4.0127 -5.42745,-7.4498 -6.57617,-7.4004 z m -86.58789,0.4219 c -0.17356,0 -0.36894,0.06 -0.60156,0.1718 -1.75288,0.844 -4.65333,4.6513 -6.70117,8.795 -2.18447,4.4202 -3.46127,9.0191 -3.80664,13.7168 -0.0655,0.8913 -0.0638,3.2193 0.002,4.0468 0.19748,2.4855 0.65485,4.598 1.42187,6.5704 0.11859,0.305 0.41336,0.9804 0.65625,1.5 0.55856,1.1948 0.91063,1.9786 1.21485,2.7089 0.2337,0.561 0.24314,0.5766 0.3789,0.5996 0.25547,0.043 1.01897,0.5788 1.98047,1.3907 0.27108,0.2289 0.70506,0.5883 0.96485,0.7988 1.49965,1.2152 4.0816,2.7393 5.77148,3.4063 2.1978,0.8675 5.3074,1.5217 7.74219,1.6289 v 0 c 0.35014,0.017 0.71038,0.028 0.80078,0.018 0.0904,-0.01 0.35851,-0.02 0.5957,-0.031 0.49027,-0.024 1.00267,-0.1422 1.25,-0.2871 0.19083,-0.1119 0.32748,-0.3268 0.39258,-0.6172 0.0891,-0.3976 -0.13059,-0.8224 -0.5957,-1.1543 -0.72357,-0.5163 -1.82726,-0.8436 -3.65625,-1.0859 -2.03747,-0.27 -4.03391,-0.8535 -5.87305,-1.7168 -3.55294,-1.6678 -6.32528,-4.1827 -7.80078,-7.0742 -0.23634,-0.4632 -1.29687,-2.9432 -1.29687,-3.0332 v 0 h 0.002 v 0 c 0.0217,-0.027 0.20284,-0.1149 0.41992,-0.2012 0.21245,-0.084 0.31304,-0.1271 0.33594,-0.1484 h 0.002 0.002 0.002 v 0 0 h -0.002 -0.002 -0.002 c -0.0115,0 -0.0388,-0.01 -0.0742,-0.01 -0.42297,0 -0.64315,-0.5833 -0.84375,-2.209 -0.14223,-1.1529 -0.1812,-1.9629 -0.1543,-3.2753 0.0347,-1.69 0.16184,-3.0102 0.46094,-4.7793 0.65285,-3.8614 1.99029,-8.0053 3.74023,-11.5899 0.63876,-1.3084 1.04086,-2.0402 1.8711,-3.414 1.70165,-2.8158 2.08789,-3.5791 2.08789,-4.125 0,-0.2663 -0.1206,-0.4293 -0.39258,-0.5332 -0.0934,-0.036 -0.18883,-0.053 -0.29297,-0.051 z m 74.62891,31.498 c -0.75507,-0.01 -1.51343,0.029 -2.02539,0.1094 -2.5047,0.393 -4.57324,1.3015 -7.17188,3.1465 -1.81425,1.2881 -3.55548,2.7964 -6.57031,5.6933 -2.95503,2.8395 -5.75903,5.278 -7.08008,6.1563 -1.07144,0.7123 -2.80583,1.2487 -4.98242,1.543 -1.27868,0.173 -3.79123,0.2158 -5.125,0.088 -3.04913,-0.2924 -5.45384,-1.0429 -7.31836,-2.2871 -1.24808,-0.8329 -2.42186,-1.8737 -5.7793,-5.123 -4.08946,-3.9577 -5.73887,-5.3925 -7.67773,-6.6797 -2.09808,-1.3931 -3.93643,-2.046 -6.37891,-2.2637 -0.88637,-0.083 -4.05604,-0.08 -4.85547,0 -0.81212,0.082 -1.61498,0.285 -2.0625,0.5235 -0.19373,0.1032 -0.53088,0.3537 -0.75,0.5566 -1.64063,1.5189 -1.58939,3.8576 0.1211,5.584 1.31323,1.3255 2.30781,1.5838 7.86523,2.041 3.7143,0.3056 5.45853,0.4906 6.91211,0.7324 1.89231,0.3148 2.59599,0.6135 2.67969,1.1368 0.0438,0.2695 0.17881,0.3662 0.40625,0.2792 0.24225,-0.092 0.44827,-0.019 1.01953,0.3633 0.35946,0.2405 0.9158,0.7348 1.78125,1.5782 2.36502,2.3048 4.35429,3.8288 6.54492,5.0195 2.0516,1.1151 3.5864,1.4708 7.17188,1.6582 v 0 c 0.17571,0.01 0.92147,0.017 1.65625,0.027 3.25204,0.025 6.4026,-0.3024 8.13086,-0.8437 1.58328,-0.4958 4.1692,-2.1951 6.47656,-4.2578 2.59013,-2.3154 4.62914,-3.9123 5.5918,-4.3789 0.81095,-0.393 3.3978,-0.7909 7.02343,-1.0801 5.88876,-0.4696 8.13636,-0.9722 9.62696,-2.1504 0.58393,-0.4616 1.21847,-1.4653 1.43164,-2.2637 0.13208,-0.4929 0.13268,-1.2104 0.002,-1.6562 -0.27679,-0.9437 -1.08313,-1.8009 -2.23828,-2.3809 -0.51679,-0.2595 -1.60765,-0.5906 -2.41406,-0.7324 -0.50471,-0.089 -1.25665,-0.1364 -2.01172,-0.1426 z"
       transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
       </g>
            <g id="svg-part-mulut" class="cursor-pointer" style="${isKActive('Mulut') ? activeGlow : normalTransition}" onclick="changeKepala('Mulut')" onmouseenter="hoverPart('Mulut', activeKepala)" onmouseleave="unhoverPart('Mulut', activeKepala)">
                <path
              style="display:inline;fill:#dc5d57;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.88639;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
       d="m 282.42303,487.09606 c -1.14583,-0.0919 -3.86274,0.0308 -5.52107,0.24924 -9.21668,1.21564 -21.73343,6.74045 -37.00935,16.33287 -3.95463,2.48329 -8.15785,5.37397 -10.95448,7.5356 -1.90222,1.47033 -3.56497,3.11818 -3.56497,3.53401 0,0.19089 1.2918,-0.21254 3.78328,-1.18088 5.48983,-2.13382 16.31738,-5.71878 22.95229,-7.6009 12.43617,-3.52776 19.04922,-4.2907 32.51275,-3.75227 10.25622,0.41003 18.6397,0.39163 28.77933,-0.0598 2.53924,-0.11626 4.76705,-0.14442 7.41356,-0.10658 3.80239,0.0546 4.86242,0.12629 9.17198,0.62564 3.51522,0.40739 6.79243,0.66912 9.71515,0.77525 3.58098,0.1299 4.56117,0.27177 6.30316,0.90762 0.99763,0.36409 1.85921,0.83149 3.14385,1.70857 1.75307,1.1969 3.65518,2.02222 8.23003,3.57185 1.59447,0.54001 4.9691,1.73427 7.4995,2.65218 4.40204,1.59689 6.84711,2.39027 6.97353,2.26381 0.17662,-0.17655 -0.82214,-1.21573 -2.44082,-2.5405 -6.83486,-5.59373 -19.18426,-13.15116 -29.98943,-18.35255 -7.07743,-3.40692 -13.21886,-5.61916 -16.97228,-6.11244 -1.69769,-0.22336 -6.28679,-0.31805 -8.00314,-0.16501 -1.91285,0.17047 -2.9117,0.45817 -6.13643,1.75847 -5.48853,2.21267 -5.82197,2.2917 -9.63093,2.29126 -3.98431,-5.3e-4 -4.31392,-0.0783 -10.01939,-2.35489 -3.92807,-1.56767 -4.88456,-1.87182 -6.23612,-1.98016 z m 90.61457,34.77483 c -0.2759,-0.009 -1.4228,1.12051 -2.98226,2.93415 -6.03856,7.02253 -12.56054,13.21056 -19.22061,18.23735 -3.38036,2.55132 -6.35608,4.37747 -10.69835,6.56444 -7.35245,3.70299 -15.37088,6.52511 -22.90073,8.05986 -4.51459,0.9202 -9.21279,1.23588 -18.60695,1.23588 -11.07962,0.009 -14.69176,-0.34023 -21.87972,-2.09184 -14.77531,-3.60063 -26.95444,-10.19341 -38.90185,-21.05981 -2.07617,-1.88837 -7.25976,-7.11863 -9.57421,-9.66018 -2.02404,-2.22262 -3.32539,-3.52715 -3.51683,-3.52715 -0.3833,0 0.30673,1.72283 2.65739,6.64524 6.37934,13.35885 12.84894,22.94316 20.67306,30.62539 4.57751,4.49451 8.95583,7.76204 14.37333,10.72418 8.20762,4.48774 18.59703,7.14283 31.00529,7.92574 1.82857,0.11537 11.463,0.0484 13.08588,-0.0911 7.69141,-0.66164 12.58475,-1.60331 18.35257,-3.52891 5.10011,-1.70276 9.21421,-3.56631 13.3248,-6.03499 3.65993,-2.19806 6.162,-4.18104 9.86813,-7.82092 5.11804,-5.02652 10.08679,-11.11599 13.44858,-16.48416 2.49749,-3.98803 5.49194,-9.42361 8.38129,-15.21386 2.30482,-4.61887 3.39425,-7.18207 3.15417,-7.42216 -0.0105,-0.0106 -0.0246,-0.0167 -0.043,-0.0167 z" />
       </g>
            <g id="svg-part-gigi" class="cursor-pointer" style="${isKActive('Gigi') ? activeGlow : normalTransition}" onclick="changeKepala('Gigi')" onmouseenter="hoverPart('Gigi', activeKepala)" onmouseleave="unhoverPart('Gigi', activeKepala)">
                <path
                  style="display:inline;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         d="m -840.8457,1147.2461 0.002,2.8184 c 0.003,5.4332 0.25618,8.8857 0.77148,10.4843 0.4497,1.3951 1.22763,2.4959 2.36329,3.3496 0.87175,0.6553 1.83759,0.9737 3.36914,1.1094 0.60699,0.054 2.38937,0.1033 3.96093,0.1133 2.40888,0.014 2.91442,-0.013 3.22852,-0.1699 0.27286,-0.136 0.5043,-0.1627 0.86133,-0.098 0.77989,0.1411 4.02364,0.1064 4.74804,-0.051 0.8471,-0.1837 1.44275,-0.5897 2.24219,-1.5273 1.3689,-1.6056 1.38792,-1.723 1.29102,-8.3477 -0.0424,-2.8994 -0.10813,-5.4881 -0.14453,-5.7539 l -0.0645,-0.4843 -3.85156,-0.4336 c -6.58032,-0.7436 -10.65815,-1.0098 -15.54492,-1.0098 z m 46.2539,0.1562 c -2.03622,-0.1473 -7.21197,-0.084 -9.83398,0.1192 -1.27788,0.099 -4.35171,0.3783 -6.83008,0.6191 -4.24755,0.4127 -4.50889,0.4507 -4.55469,0.6719 -0.0472,0.2281 -0.44298,5.5645 -0.58593,7.9023 -0.0391,0.6389 -0.0137,1.7188 0.0566,2.4004 0.20578,1.995 0.66999,3.066 1.8457,4.2676 0.95725,0.9783 1.91264,1.4193 3.54883,1.6328 v 0 c 1.03528,0.1314 6.82312,0.1338 8.7832,0 2.58286,-0.1763 3.34641,-0.4248 5.27539,-1.709 2.2088,-1.4705 3.17901,-2.7122 3.63477,-4.6543 0.17594,-0.7497 0.21093,-1.415 0.21093,-4.0898 0,-1.7571 -0.0451,-4.0666 -0.0996,-5.1309 l -0.0996,-1.9355 z m 4.61328,0.078 c -0.88111,-5e-4 -1.1357,0.035 -1.1875,0.1699 -0.0362,0.094 -0.13063,0.6308 -0.21093,1.1914 -0.16456,1.1491 -0.21468,8.5208 -0.0625,9.2383 0.0508,0.2396 0.16114,0.4355 0.24414,0.4355 0.18777,0 2.04337,-1.3606 4.22461,-3.0976 2.06412,-1.6438 4.93715,-3.7952 6.53711,-4.8946 1.66632,-1.145 2.06175,-1.4873 1.90234,-1.6484 -0.38988,-0.3941 -8.59094,-1.3945 -11.44727,-1.3945 z m -52.53125,0.037 c -0.0264,-0.027 -1.53256,0.01 -3.3457,0.072 -3.86776,0.1399 -6.50625,0.4197 -9.89648,1.0528 -1.35335,0.2528 -2.50093,0.4602 -2.54883,0.4609 -0.13018,0 -0.10084,7.1353 0.0332,8.0762 0.25405,1.783 0.8404,2.8766 2.05274,3.8281 1.36033,1.0677 3.04981,1.6329 5.3789,1.8008 1.19918,0.086 1.40455,0.082 3.1211,-0.059 1.75415,-0.1432 3.29307,-0.7019 4.20898,-1.5293 1.01782,-0.9196 1.25877,-1.9856 1.25977,-5.6094 8e-4,-2.5492 -0.17698,-8.0067 -0.26368,-8.0937 z m -18.02734,2.1679 c -0.64379,0 -7.71107,1.8271 -10.11719,2.6153 -1.52925,0.501 -1.74731,0.6367 -2.02929,1.2578 -0.7745,1.7058 0.41509,5.1602 2.32421,6.7519 0.76234,0.6356 2.02214,1.2087 3.02735,1.377 1.1976,0.2004 2.8799,-0.055 4.00976,-0.6094 0.95586,-0.4694 2.06154,-1.4934 2.4336,-2.2539 0.42158,-0.8616 0.52439,-2.0131 0.52539,-5.8554 7.7e-4,-2.8385 -0.0233,-3.2833 -0.17383,-3.2833 z m -15.33594,4.5411 c -0.30976,0 -0.76019,0.09 -1.48242,0.2773 -3.12146,0.8111 -6.35742,2.1438 -6.35742,2.6191 0,0.2298 0.71271,0.9001 1.29883,1.2208 0.33984,0.1859 1.01102,0.4549 1.49023,0.5976 v 0 c 1.98106,0.5899 4.34784,0.073 5.22852,-1.1426 0.69371,-0.9577 0.93192,-2.6673 0.45508,-3.2735 -0.15392,-0.1954 -0.32305,-0.294 -0.63282,-0.2968 z m 121.37696,0.998 c -0.20449,0.01 -0.20371,0.077 -0.19141,0.3535 0.0174,0.3888 1.19014,2.9528 1.51562,3.3125 0.26418,0.2919 0.54403,0.2569 1.33008,-0.1621 0.71242,-0.3797 1.37696,-1.0192 1.37696,-1.3262 0,-0.3482 -0.3629,-0.8693 -0.79883,-1.1445 -0.60132,-0.3796 -2.35106,-0.9854 -2.95313,-1.0234 -0.12058,-0.01 -0.21113,-0.012 -0.27929,-0.01 z m -117.17383,32.8223 c -0.81392,0.023 -1.50661,0.1596 -2.00977,0.3984 -0.53589,0.2543 -0.5983,0.4507 -0.25976,0.8164 0.80563,0.8701 5.17561,3.8244 7.24609,4.8985 1.07977,0.5602 1.45522,0.2226 1.22461,-1.1016 -0.5717,-3.283 -2.20457,-4.8078 -5.34961,-4.9961 -0.29547,-0.018 -0.58026,-0.023 -0.85156,-0.016 z m 109.53906,0.1836 c -0.7149,10e-5 -1.44948,0.064 -1.9043,0.1875 -3.26888,0.8897 -4.61546,2.4432 -4.49414,5.1933 0.0209,0.4744 0.0663,0.9288 0.0996,1.0078 v 0 c 0.13503,0.321 0.65176,0.121 2.35157,-0.9063 3.45895,-2.0905 6.5625,-4.3298 6.5625,-4.7363 -10e-6,-0.1811 -0.29956,-0.3827 -0.83399,-0.5605 -0.37104,-0.1243 -1.06635,-0.1876 -1.78125,-0.1875 z m -95.76172,2.7539 c -0.9005,-0.019 -1.74399,0.053 -2.29297,0.2187 -2.02755,0.6124 -2.96284,1.6763 -2.96484,3.3731 -0.002,1.3932 0.50253,1.946 2.8457,3.1191 1.74386,0.8731 5.44004,2.4486 7.31836,3.1192 1.10579,0.3948 1.02325,0.3857 1.25195,0.1328 0.34083,-0.3769 0.4624,-1.6488 0.4043,-4.2461 -0.0647,-2.8915 -0.19433,-3.4872 -0.90625,-4.166 -0.51189,-0.488 -1.28596,-0.8043 -3.01367,-1.2305 -0.78279,-0.1931 -1.74208,-0.3019 -2.64258,-0.3203 z m 82.50977,0.01 c -1.67865,0.01 -1.95796,0.036 -2.88086,0.3184 -1.80134,0.5519 -3.25085,1.4108 -3.85547,2.2832 -0.17825,0.2573 -0.41594,0.8021 -0.5293,1.2109 -0.4476,1.6142 -0.58231,5.4619 -0.21875,6.2598 l 0.13477,0.293 0.78125,-0.2168 c 1.76594,-0.4894 6.08608,-2.2236 8.77539,-3.5235 2.39057,-1.1555 2.71091,-1.5505 2.5918,-3.1972 -0.0605,-0.837 -0.62878,-2.049 -1.19141,-2.543 -0.21708,-0.1906 -0.69965,-0.4696 -1.07227,-0.6191 -0.61447,-0.2468 -0.84936,-0.2757 -2.53515,-0.2657 z m -67.11914,1.834 c -1.45004,-0.034 -2.814,0.026 -3.54493,0.1895 -0.8277,0.1856 -1.64185,0.7535 -1.99023,1.3867 -0.51229,0.9312 -0.60783,1.6162 -0.67383,4.832 l -0.0625,3.0215 0.62305,0.2051 c 4.92321,1.6132 9.00994,2.6941 12.30078,3.2559 0.60913,0.1039 0.74808,0.035 0.90625,-0.4454 0.38094,-1.1576 0.42425,-5.7537 0.0762,-8.2031 -0.3435,-2.417 -1.28538,-3.4393 -3.57226,-3.8769 -1.07482,-0.2057 -2.61246,-0.3317 -4.0625,-0.3653 z m 52.42383,0.025 c -3.17944,0.015 -5.70077,0.3454 -6.79688,0.8887 -0.60249,0.2986 -1.29672,0.9628 -1.58008,1.5117 -0.59809,1.1588 -0.93944,3.8977 -0.96094,7.6973 -0.0102,1.7959 0.0249,2.5087 0.13477,2.7011 0.0961,0.1684 0.26008,0.2618 0.45898,0.2618 0.54458,0 13.29062,-3.1038 13.44336,-3.2735 0.0195,-0.022 0.0948,-1.2932 0.16797,-2.8281 0.1954,-4.0961 0.0495,-4.7968 -1.25976,-6.0215 -0.96723,-0.9042 -1.13647,-0.9495 -3.60742,-0.9375 z m -34.91016,0.5762 c -2.91098,0 -3.98061,0.1084 -5.12891,0.5351 -1.24557,0.4628 -1.92565,1.1929 -2.32812,2.4961 -0.30875,0.9997 -0.26186,3.6859 0.125,7.1211 0.16861,1.4972 0.31898,2.7303 0.33398,2.7403 0.015,0.01 0.83777,0.131 1.82813,0.2675 1.71354,0.2362 4.47541,0.4525 6.62109,0.5215 0.5431,0.017 2.04599,0.044 3.33984,0.057 l 2.35352,0.023 -0.002,-4.3867 c -0.001,-6.3455 -0.11308,-6.9966 -1.37891,-8.0039 -1.52696,-1.2151 -2.17695,-1.3711 -5.76367,-1.3711 z m 16.14844,0 c -2.15799,0 -2.55879,0.024 -3.47071,0.2559 -1.23032,0.3124 -2.54141,0.9719 -2.92187,1.4707 -0.46868,0.6144 -0.54637,1.5179 -0.60547,6.9668 l -0.0547,5.0996 3.81641,-0.066 c 4.08663,-0.071 5.95479,-0.197 8.63281,-0.5898 l 1.68945,-0.2481 0.20118,-2.6719 c 0.11089,-1.4696 0.21552,-3.7448 0.23242,-5.0546 0.034,-2.6374 0.0149,-2.7235 -0.74414,-3.4493 -0.54993,-0.5259 -1.94361,-1.151 -3.23243,-1.4511 -0.9486,-0.2206 -1.44605,-0.2618 -3.54296,-0.2618 z"
         transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
         </g>
            <g id="svg-part-lidah" class="cursor-pointer" style="${isKActive('Lidah') ? activeGlow : normalTransition}" onclick="changeKepala('Lidah')" onmouseenter="hoverPart('Lidah', activeKepala)" onmouseleave="unhoverPart('Lidah', activeKepala)">
                <path
         style="display:inline;fill:#da4445;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.782;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         d="m -800.95779,1193.23 c -0.0904,-0.024 -0.6928,-0.2812 -1.33875,-0.5722 -2.00884,-0.905 -3.33975,-1.1409 -6.42398,-1.1386 -2.85545,0 -4.16999,0.2083 -6.24305,0.9794 -1.84318,0.6856 -2.23013,0.692 -3.59517,0.06 -1.07605,-0.4985 -1.50333,-0.6285 -2.77109,-0.8433 -1.30013,-0.2202 -4.10288,-0.3001 -5.62972,-0.1604 -1.97895,0.181 -2.87474,0.3835 -4.88488,1.1043 -0.62439,0.2239 -0.95089,0.2947 -1.36102,0.2954 -0.66671,10e-4 -1.0457,-0.1097 -2.54731,-0.7442 -0.65157,-0.2753 -1.59881,-0.6073 -2.10496,-0.7379 -3.14971,-0.8123 -7.35275,-0.848 -9.40588,-0.08 -0.25053,0.094 -0.70963,0.3351 -1.02021,0.5363 -0.62969,0.408 -0.99233,0.5141 -1.26247,0.3696 -0.0996,-0.053 -0.51937,-0.4018 -0.93278,-0.7743 -0.92664,-0.8351 -1.80988,-1.5201 -2.38212,-1.8475 -0.60037,-0.3435 -0.76035,-0.5321 -0.65093,-0.7673 0.12829,-0.2758 0.8804,-1.1076 1.48742,-1.645 1.73005,-1.5316 5.20666,-3.2617 9.33708,-4.6465 4.47506,-1.5004 8.59264,-2.512 16.10048,-3.9555 9.03714,-1.7376 13.82634,-3.2256 19.43372,-6.0378 5.30412,-2.6602 10.30508,-6.0265 19.83174,-13.3493 8.40781,-6.4629 11.33703,-8.4019 14.05798,-9.3057 1.52469,-0.5065 2.16704,-0.5892 4.589,-0.5909 2.89572,0 3.64688,0.1634 5.3253,1.1723 2.75454,1.6557 4.93688,4.1029 6.53536,7.3283 1.55788,3.1436 2.38218,6.4356 2.64307,10.5557 0.23383,3.6925 -0.20396,7.3986 -1.45555,12.3218 -0.77289,3.0403 -1.37021,4.16 -2.51736,4.719 -0.7181,0.3499 -1.23237,0.4612 -3.42525,0.7415 -3.89695,0.4981 -5.15777,0.9783 -7.25831,2.7642 -0.93582,0.7957 -1.41609,1.0568 -1.82223,0.9909 -0.14749,-0.024 -0.53307,-0.1598 -0.85686,-0.3019 -1.05714,-0.464 -1.47009,-0.5224 -3.78087,-0.5354 -2.60448,-0.014 -2.64688,-0.017 -2.82703,-0.1485 -0.13932,-0.1019 -0.13068,-0.1416 0.15353,-0.706 0.16564,-0.3289 0.61902,-1.1213 1.00751,-1.7608 0.38849,-0.6396 1.05343,-1.7358 1.47763,-2.4361 1.30834,-2.1598 3.16708,-5.9947 4.3797,-9.036 0.90112,-2.26 1.33815,-3.6497 1.63523,-5.1998 0.18715,-0.9766 0.20591,-1.2075 0.0981,-1.2075 -0.11937,0 -0.59028,0.9633 -2.46832,5.0496 -1.81535,3.9498 -2.71042,5.7193 -3.94869,7.8061 -1.49407,2.518 -3.55169,5.4511 -5.01339,7.1467 -0.91252,1.0584 -2.59853,2.6826 -3.07085,2.9582 -0.54632,0.3187 -1.12704,0.311 -2.20449,-0.029 -2.77431,-0.8761 -6.57413,-0.8673 -10.06918,0.023 -1.13151,0.2884 -1.68494,0.5042 -2.8594,1.115 -0.97919,0.5092 -1.48839,0.6443 -1.96072,0.5201 z"
         
         transform="matrix(0.88007022,0,0,0.88007022,1017.7815,-505.49765)" />
         </g>
        </svg>`;

    const svgBody = `
        <svg id="humanBodySvg" class="w-full max-w-[200px] h-auto drop-shadow-md select-none mx-auto" viewBox="0 0 400 750" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs
   id="defs9" /><sodipodi:namedview
   id="namedview9"
   showguides="true" /><!-- Kepala (Sebagai referensi bagian tubuh) --><!-- Payudara / Dada --><!-- Perut --><!-- Punggung (Area bahu belakang / torso lateral) --><!-- Tangan / Lengan --><!-- Tungkai / Paha --><!-- Lutut --><!-- Kaki / Telapak Kaki --><g
   id="g93"
   inkscape:label="body"
   transform="matrix(0.32208223,0,0,0.32208223,433.86414,193.36612)">    
        <path
          style="display:inline;fill:#000000"
     d="m -594.19336,-582.48438 c -1.83749,0.0142 -3.72389,0.0541 -5.66797,0.11524 -2.06159,0.0648 -4.05576,0.14835 -5.99023,0.25586 -9.14251,0.17872 -13.11153,0.72952 -19.92969,2.25586 -0.75339,0.16865 -1.49265,0.33738 -2.21875,0.50781 -5.38426,1.14607 -10.54362,2.6594 -15.83203,4.62891 -5.2446,1.90724 -10.44332,4.21494 -16.5293,7.25781 -8.30095,4.15032 -14.65106,8.11527 -20.97265,12.97851 -0.009,0.006 -0.0186,0.0111 -0.0273,0.0176 -0.003,0.002 -0.009,0.007 -0.0117,0.01 -0.70731,0.54463 -1.45386,0.9705 -2.16211,1.54297 -4.35569,3.52066 -8.77885,7.60318 -13.86718,12.68945 -0.0346,0.0346 -0.0631,0.0689 -0.0977,0.10352 -0.91817,0.92586 -1.84173,1.56347 -2.76562,2.53515 -1.16397,1.22415 -2.03894,2.58478 -3.14844,3.82617 -3.9639,4.36762 -7.70579,8.77759 -11.03711,13.40821 -3.22114,4.57041 -6.16253,9.487 -8.99805,14.61523 -0.81126,1.4533 -1.62691,2.972 -2.42578,4.51367 -18.26193,-35.22855 -46.41598,-60.1929 -82.69922,-72.82226 -19.06891,-6.63745 -28.35414,-8.14063 -50.26758,-8.14063 -16.74389,0 -20.96199,0.32749 -29.84375,2.31641 -31.94177,7.15285 -57.25453,20.98016 -77.85937,42.5332 -20.35163,21.28817 -34.59191,48.89457 -41.66211,80.76563 -6.9319,31.24738 -15.857,106.24647 -18.67,156.88476 -2.5406,45.73209 3.3537,76.98201 19.6075,103.94336 l 5.4765,9.08399 -4.0586,6.72656 c -5.247,8.69966 -7.0309,14.66991 -7.6972,25.74609 -0.3634,6.04156 -1.0496,9.57953 -2.086,10.76367 -0.849,0.97023 -6.5298,4.18763 -12.625,7.1504 -7.5743,3.68168 -13.041,7.16643 -17.2675,11.00976 -7.5696,6.88331 -12.3145,15.58362 -12.3145,22.57617 v 4.681644 l -13.25,6.644531 c -23.1777,11.621599 -31.3545,19.293674 -40.6562,38.150391 -15.0829,30.576223 -22.2211,74.562 -26.0997,160.828124 -6.6291,147.4417 -8.3199,164.04614 -22.4668,220.63867 -12.3784,49.51776 -16.0484,77.17708 -18.5175,139.55664 -3.4245,86.52046 -3.9788,95.32599 -9.6289,152.80274 -1.9072,19.40101 -2.2558,26.14355 -1.4024,27.17187 0.6243,0.75224 2.9263,1.6712 5.1153,2.04102 0.1249,0.0211 0.2457,0.0413 0.3632,0.0625 0.034,0.13786 0.4748,0.23829 1.2246,0.25976 1.7506,0.44282 2.2165,0.99196 1.9375,2.00586 -0.2505,0.91067 -0.7416,4.35625 -1.0898,7.65625 -0.8884,8.419 -4.9185,31.39092 -9.7363,55.5 -5.2152,26.09751 -5.3294,31.8616 -0.8418,42 1.8259,4.125 5.5527,14.475 8.2832,23 6.3083,19.69578 10.7619,29.36229 16.0605,34.86719 2.3126,2.40259 10.0551,9.44312 17.2051,15.64453 7.15,6.20142 15.25,13.60734 18,16.45899 8.3912,8.7013 14.2,10.43995 16.9727,5.07812 0.8391,-1.62269 1.5273,-4.06976 1.5273,-5.4375 0,-2.26387 0.3004,-2.43783 3.3594,-1.9414 5.0606,0.8212 7.6406,-2.39991 7.6406,-9.54297 0,-6.53873 -2.3973,-12.02389 -8.0703,-18.46875 -3.6376,-4.13258 -3.921,-4.86146 -3.332,-8.54493 0.8801,-5.50422 -2.6351,-11.32311 -10.8789,-18.01171 -7.1247,-5.78058 -12.214,-12.01312 -16.3907,-20.07227 -2.287,-4.41283 -2.8193,-6.71068 -2.7793,-11.99414 0.075,-9.9068 1.1938,-15.00933 4.5918,-20.95899 3.7845,-6.62638 4.2446,-6.08111 6.4063,7.57422 2.9261,18.48302 5.5671,30.81906 7.5644,35.33594 6.1495,13.90714 19.863,17.49812 24.4942,6.41406 2.0499,-4.90613 1.7161,-21.80852 -0.6895,-34.90039 -2.9869,-16.2554 -3.3512,-24.21157 -1.9023,-41.68359 1.9553,-23.57871 -0.3775,-36.36066 -10.1465,-55.56836 l -4.707,-9.25195 2.6699,-0.58594 c 1.468,-0.32241 3.7949,-0.92123 5.1699,-1.33008 l 2.5,-0.74219 0.6465,-16.91992 c 1.0767,-28.17561 6.0922,-53.4682 27.8281,-140.33594 22.6885,-90.67543 24.8016,-102.04702 32.541,-175.08203 4.251,-40.11594 14.1244,-121.97599 14.793,-122.64453 0.3874,-0.38742 6.3672,48.41051 8.2168,67.05274 3.3954,34.22284 2.8773,65.12521 -1.4707,87.55468 -1.9914,10.27298 -9.2406,32.79331 -23.0254,71.53711 -8.9045,25.02732 -17.2858,53.30856 -24.9609,84.22266 -7.7716,31.30275 -7.7702,31.29148 -5.6153,32.86719 1.0061,0.73566 2.1784,1.4657 2.6055,1.62304 0.4272,0.15733 -0.086,4.33711 -1.1406,9.28711 -2.4726,11.60568 -7.4468,45.9215 -9.3496,64.5 -2.6519,25.8928 -3.8548,56.41908 -3.1524,80 1.8874,63.3615 8.9621,111.3168 34.2207,232 29.4763,140.8351 29.6537,141.9588 28.3653,179.0001 -0.4261,12.2504 -0.3705,12.6549 2.7812,20.3242 1.7688,4.304 3.2129,8.804 3.2129,10 0,1.1959 -1.5767,5.2987 -3.5,9.1172 -4.0979,8.1357 -4.4129,12.5807 -1.4961,21.0586 2.6251,7.6298 2.5415,10.3415 -0.9531,31.2968 -5.9429,35.6355 -6.5277,42.8809 -6.5117,80.7032 0.015,34.4143 0.071,35.3681 3.3066,57 4.9041,32.7866 10.1755,60.91 20.6016,109.9082 5.1599,24.2498 9.9063,47.6053 10.5468,51.9003 0.7316,4.9072 1.04176,17.3585 0.836,33.5059 l -0.3262,25.6973 4.21878,7.1191 c 6.39163,10.7818 7.06594,14.3747 4.83008,25.7461 -2.69525,13.7079 -0.83114,24.5446 5.95508,34.6289 l 3.47266,5.1602 -3.52735,8.5215 c -5.2818,12.7595 -8.85818,19.4603 -18.19535,34.0976 -9.5777,15.0144 -12.1064,20.8192 -12.9336,29.6777 -0.7303,7.8206 1.79,14.2182 6.8027,17.2754 4.6255,2.8209 17.8179,6.8241 26.87703,8.1543 4.125,0.6057 8.625,1.2947 10,1.5313 0.84901,0.1459 5.29138,0.2137 11.34961,0.1992 -0.0473,0.1587 0.31694,0.2679 1.06641,0.2988 0.80508,0.033 1.34067,-0.097 1.40039,-0.3086 3.14805,-0.018 6.61924,-0.055 10.18359,-0.1132 0.50798,-0.01 1.00486,-0.017 1.49414,-0.025 -0.37305,0.239 -0.0452,0.4074 0.92188,0.4472 1.01857,0.042 1.60512,-0.1776 1.34375,-0.4922 14.15679,-0.2927 20.07019,-0.8261 26.24023,-2.2597 20.58654,-4.7834 29.70987,-12.5049 31.54688,-26.6973 0.74177,-5.7307 -0.69842,-26.7569 -3.61524,-52.7851 l -1.99609,-17.8125 3.02734,-6.1875 c 3.04619,-6.2275 5.03711,-14.2083 5.03711,-20.1915 0,-1.7771 -1.35,-7.329 -3,-12.3359 -3.6192,-10.9824 -3.8518,-17.922 -0.86914,-25.9355 1.17199,-3.1487 2.58916,-8.2058 3.15039,-11.2383 1.07997,-5.8355 1.31611,-4.3061 -5.84375,-37.9863 -2.59423,-12.2033 -2.64543,-13.1053 -2.09179,-38 0.31191,-14.025 1.48319,-39 2.60156,-55.5 3.96069,-58.4344 4.28722,-67.5672 3.75781,-105 -0.40206,-28.4283 -1.13466,-43.8341 -3.16211,-66.5 -3.80678,-42.5578 -3.65591,-47.063 2.58399,-77 2.84682,-13.6581 7.74456,-62.7953 8.82031,-88.5 0.50639,-12.1 0.89599,-40.9 0.86719,-64 -0.0564,-45.26852 3.13784,-91.21544 8.69531,-161.48447 1.02954,1.04517 2.06487,2.10389 2.63476,2.52344 0.35764,0.26327 0.71138,0.51549 1.0586,0.75781 2.25539,1.60622 4.10435,2.67297 5.70117,3.21289 0.84586,0.31923 1.57088,0.48633 2.14648,0.48633 0.59006,0 1.18825,-0.10491 1.7754,-0.29883 0.80794,-0.17947 1.53467,-0.56797 2.19726,-1.16992 1.52617,-1.14108 2.78996,-2.84544 3.39063,-4.73828 0.35433,-0.75026 0.5664,-1.41938 0.5664,-1.8711 0,-0.0209 -4e-4,-0.04 0,-0.0605 0.37175,-0.79616 0.97445,-1.3971 1.86914,-1.86133 0.0135,-4.4e-4 0.0256,0 0.0391,0 0.20902,0 0.41483,-0.0144 0.61718,-0.041 0.60707,-0.0798 1.18345,-0.27659 1.7168,-0.57617 0.0302,-0.0158 0.0598,-0.0306 0.0898,-0.0469 -0.65656,-8.51816 -1.23562,-16.27872 -1.75,-23.46093 -1.27922,-1.67871 -2.77526,-3.41048 -4.5039,-5.22071 -0.0121,-0.0131 -0.025,-0.026 -0.0371,-0.0391 -1.60264,-1.72845 -3.17598,-3.61682 -4.50196,-5.36133 -1.42268,-1.92862 -2.55515,-3.73897 -3.03125,-4.93164 -0.34059,-0.85324 -0.95779,-1.92071 -1.75,-3.06836 -1.21324,-1.82607 -3.04588,-3.98777 -4.98437,-5.82031 0.479,-7.84762 0.93097,-16.32294 1.22461,-23.25781 0.0399,-0.94278 0.0494,-0.71835 0.0879,-1.62891 0.38634,1.63965 0.79061,3.1281 1.22461,4.4961 1.09384,3.63543 2.3174,6.24962 3.78711,8.39453 0.14581,0.21279 0.31134,0.39065 0.46289,0.59375 0.0426,0.0579 0.0879,0.11079 0.13086,0.16797 0.33769,0.44187 0.67673,0.87694 1.03906,1.27148 0.42204,0.46789 0.86139,0.90686 1.31641,1.31055 0.91875,0.81511 1.90211,1.49771 2.9414,2.04101 1.5221,0.80849 3.10148,1.30037 4.64649,1.46875 -0.73712,-12.57601 -1.25303,-23.73966 -1.66602,-35.28711 1.08719,30.39849 2.89221,58.13017 7.54883,116 4.79545,59.59499 5.63648,78.64841 6.57422,149.0001 0.50951,38.225 1.15267,71.075 1.42969,73 0.27703,1.925 1.65931,15.6008 3.07226,30.3925 1.75913,18.4158 3.66586,32.1289 6.04883,43.5 4.84828,23.1351 5.06387,30.2333 1.9375,64.1075 -5.70418,61.805 -5.70319,93.9214 0.01,179.5 1.43187,21.45 2.67612,49.125 2.76562,61.5 l 0.16406,22.5 -3.81054,15.5 c -2.09564,8.525 -4.0729,18.9773 -4.39258,23.2285 -0.51737,6.8801 -0.26416,8.5831 2.29883,15.5 3.834,10.3472 3.86055,18.8035 0.0937,29.1953 -4.28274,11.8152 -2.97004,26.255 3.16796,34.875 2.07836,2.9188 2.09204,3.2068 0.67383,13.3418 -2.20398,15.7502 -4.52134,44.1451 -4.52734,55.4941 -0.005,9.1458 0.2667,10.6597 2.78125,15.5 3.15866,6.08 8.79869,10.4427 17.9043,13.8496 10.65097,3.9849 18.2982,5.103 38.81054,5.6758 4.60202,0.1285 8.90167,0.1666 12.94727,0.1094 0.15411,0.079 0.48016,0.1322 0.96875,0.1523 0.6485,0.026 1.1218,-0.053 1.3125,-0.1954 14.68854,-0.3479 25.95814,-2.0223 36.12305,-5.2598 3.44891,-1.0984 6.20803,-2.167 8.52734,-3.2988 -0.58857,0.287 -1.14022,0.5795 -1.79688,0.8594 1.42676,0.822 2.85416,1.5531 4.31641,2.2091 2.6002,1.17 5.2925,2.0926 8.24414,2.8436 2.9982,0.7702 6.28126,1.3796 10.0293,1.9043 1.15776,0.1621 2.5234,0.2913 4.04297,0.3926 11.61247,1.1307 23.39511,0.6965 33.29101,-0.9922 2.16566,-0.265 4.03674,-0.5667 5.47461,-0.9004 9.02857,-2.0949 13.50517,-4.2613 17.5,-8.4707 l 0.68164,-0.7187 2.31836,-2.1641 v -0.2773 -0.074 l -0.01,-25.9668 c -5.8e-4,-1.4391 -0.0342,-2.2292 -0.0391,-3.5567 -0.007,-1.3648 -0.007,-2.8546 -0.0215,-4.1094 -0.0239,-3.9373 -0.0656,-7.3332 -0.13477,-10.3593 -0.25134,-9.044 -0.78017,-15.1837 -1.77539,-22.295 -0.0942,-0.6734 -0.12222,-0.98 -0.20898,-1.6054 -0.0776,-0.5483 -0.0532,-1.0652 -0.13672,-1.6348 -0.406,-2.7707 -0.73374,-5.0562 -0.98633,-6.959 -0.57625,-5.3553 -0.48403,-8.149 0.38672,-11.4472 1.36021,-2.7528 2.80039,-7.4174 3.85547,-12.045 0.32807,-1.3411 0.59919,-2.6728 0.8125,-3.9882 0.47184,-2.6512 0.75781,-5.0865 0.75781,-6.8926 0,-0.8618 -0.0665,-1.8438 -0.18555,-2.8867 -0.0393,-0.4168 -0.0931,-0.8381 -0.16601,-1.2754 -0.0165,-0.1114 -0.0352,-0.2239 -0.0527,-0.336 -0.2781,-2.4354 -0.80006,-4.7579 -1.56836,-6.9297 -0.60226,-1.7024 -1.10413,-3.3193 -1.50586,-4.8789 -1.26677,-6.0706 -1.18408,-12.9159 0.25195,-19.2695 0.19753,-0.7426 0.41526,-1.4992 0.65234,-2.2754 0.26505,-0.8678 0.52064,-1.7831 0.76172,-2.7129 0.80427,-2.6534 1.32227,-4.976 1.52735,-7.4004 0.18164,-1.2518 0.28515,-2.3305 0.28515,-3.1172 0,-0.8991 -0.22097,-2.5645 -0.60547,-4.7128 -0.57118,-4.0242 -1.73313,-8.9764 -3.54492,-15.8614 -2.87919,-10.9411 -3.83715,-15.5172 -4.3125,-22.9258 -2.2e-4,0 2.2e-4,-0.012 0,-0.014 l 0.10938,-21.3321 c 0.0381,-7.4107 0.3612,-17.0531 0.65039,-26.2402 0.39602,-10.2595 0.91283,-22.1229 1.77148,-36.0391 0.33694,-5.534 0.56559,-10.3156 0.95899,-16.2207 0.51275,-7.6967 0.96702,-14.9984 1.36328,-21.9336 0.0563,-0.8861 0.1117,-1.7422 0.16406,-2.5664 0.29215,-4.5982 0.54475,-9.699 0.75781,-15.1093 1.27621,-27.3856 1.47741,-48.386 0.67188,-65.4707 -0.0431,-0.914 -0.0875,-1.8113 -0.13086,-2.6973 -0.16982,-6.1945 -0.41595,-11.5796 -0.74024,-15.7227 -0.29421,-3.7587 -0.8226,-10.2276 -1.45117,-17.7617 -0.84422,-10.6759 -2.01314,-24.4391 -3.72656,-44.2558 -0.0253,-0.2925 -0.0482,-0.5798 -0.0723,-0.8633 -0.69292,-9.7603 -0.61446,-15.1691 0.59571,-23.8731 0.80079,-5.5788 2.07169,-12.8182 3.96093,-23.3281 1.66769,-9.2773 4.10103,-34.8747 6.32422,-58.0879 0.28339,-2.9733 0.54653,-3.6252 0.83985,-6.8301 0.0292,-0.319 0.0455,-1.2201 0.0742,-1.5566 0.47622,-5.2808 0.97983,-7.6636 1.4082,-12.9434 0.62473,-7.7 1.2716,-37.625 1.4375,-66.5 0.0227,-3.9556 0.0565,-7.5652 0.0879,-11.2519 0.39184,-24.74816 2.25517,-44.30629 3.10742,-63.2109 0.002,-0.0606 0.009,-0.16595 0.0117,-0.22656 5e-5,-0.001 -5e-5,-0.003 0,-0.004 5e-5,-10e-4 -5e-5,-0.003 0,-0.004 v -0.002 -0.002 l 0.002,-0.002 v -0.002 -0.002 c 2.1e-4,-0.005 -2.1e-4,-0.011 0,-0.0156 0.89999,-22.53194 1.64887,-49.78921 4.40235,-83.5 10e-4,-0.015 6.8e-4,-0.0221 0.002,-0.0371 0.31264,-3.63965 0.36714,-5.88774 0.70508,-9.70118 0.06,-0.67684 0.12084,-1.35642 0.18164,-2.03906 0.18274,-2.05195 0.36555,-4.16484 0.54687,-6.32422 -0.034,-0.009 -0.0677,-0.025 -0.10156,-0.0352 0.75502,0.22675 1.5441,0.22126 2.51367,0.0273 2.59116,-0.51823 2.85592,-0.28136 3.39063,3.01367 1.75786,10.83247 9.50056,9.55387 22.16601,-3.6582 -1.37459,1.43392 -2.69,2.72829 -3.94726,3.88086 1.23415,15.16375 2.00457,25.62827 2.875,37.08594 2.76289,35.43235 4.36192,67.781 5.08789,103.1621 0.10655,5.58861 0.22453,10.83469 0.31445,16.78125 0.0498,3.5372 0.10028,7.2193 0.15039,11.0664 0.0599,4.6 0.1209,8.991 0.1836,13.1797 0.0496,3.5398 0.0991,6.8878 0.14843,10.0664 0.0115,7.4348 0.15891,15.0953 0.43946,22.9375 0.135,5.4709 0.28565,10.3391 0.46484,14.8477 0.3465,10.0423 0.73811,17.181 1.19141,21.9687 0.39142,4.1342 0.7685,8.0345 1.13281,11.7305 0.50008,5.1834 1.08601,10.7933 1.77734,17.2402 0.0716,0.6675 0.14295,1.3435 0.2168,2.0293 0.99831,9.2704 1.97621,17.1375 3.13867,25.0215 1.16479,8.0746 2.41235,15.4771 3.89063,23.3614 0.60032,3.2017 1.08232,6.1827 1.44922,9.123 0.98442,8.0119 1.12292,15.6259 0.44726,26.75 -0.31755,5.0862 -0.8104,10.883 -1.47656,17.7441 -1.19664,12.3248 -1.43758,21.0703 -1.9336,30.3243 -0.49762,5.8512 -0.83386,10.8354 -1.05859,16.2558 -0.0488,0.8813 -0.0866,1.7242 -0.10937,2.4961 -0.49251,9.2601 -1.81978,20.6048 -1.89063,29.9024 -0.33734,23.4425 0.65319,47.0082 2.88477,80.0605 0.38206,6.3899 0.82255,13.3894 1.27929,20.584 0.21212,3.3249 0.37136,6.578 0.57227,9.9687 1.76416,30.3294 3.04312,57.799 2.80859,68.6778 -0.0135,1.1048 0.18281,4.623 0.14453,5.414 -0.1283,2.4965 -0.3734,5.0669 -0.77539,7.8731 -0.85907,5.1974 -2.27334,11.9463 -3.82422,18.0293 -1.06566,4.1798 -1.34434,6.5668 -1.98046,9.6992 -0.25982,1.1807 -0.50873,2.4086 -0.70899,3.4707 -1.18475,6.9423 -1.5944,12.6362 -0.41601,17.9707 0.39948,1.8176 0.93268,3.7029 1.59765,5.7734 1.30993,4.0788 2.00489,7.1361 2.0332,10.3184 0.0139,2.3349 -0.33219,4.7663 -1.06445,7.7832 -0.51343,2.0697 -1.2153,4.3995 -2.11328,7.1504 -1.34689,4.1261 -2.44922,8.59 -2.44922,9.918 0,2.1948 0.70112,6.2575 1.68555,10.455 1.24514,6.0937 3.05742,11.5872 4.83594,14.4766 1.23771,2.9545 1.05805,4.4121 -0.0469,11.3008 -0.55438,3.4563 -1.02964,6.5609 -1.43359,9.459 -0.5414,3.7891 -0.95697,7.3132 -1.27149,10.9004 -0.76267,8.4815 -0.92763,16.8419 -0.84961,30.0957 0.0606,10.2834 0.11527,16.7927 0.58203,21.1523 l -0.002,4.3203 1.30664,1.4004 h 0.002 c 0.14804,0.3302 0.30693,0.6384 0.48046,0.9277 h 0.002 c 0.17357,0.2891 0.35936,0.5601 0.56054,0.8164 h 0.002 c 0.40306,0.5136 0.864,0.9694 1.39062,1.4024 h 0.002 c 0.52686,0.433 1.11955,0.8425 1.78711,1.2617 h 0.002 c 0.66785,0.4194 1.41063,0.8479 2.23633,1.3203 3.28852,1.8814 6.60096,3.2707 10.53906,4.2676 6.56436,1.6636 14.86749,2.2426 27.68945,2.207 19.86279,-0.055 30.1433,-1.6356 39.74024,-7.3554 1.59351,-0.9488 3.16746,-2.0117 4.76367,-3.2012 h 0.002 0.002 v 0 h 0.002 v 0 h 0.002 v 0 0 c 1.599,-1.192 3.21988,-2.5109 4.9043,-3.9687 4.07906,-3.5301 11.50275,-9.118 16.49609,-12.418 11.64164,-7.6938 14.67702,-12.2092 15.35938,-22.8418 0.34677,-5.4036 -0.095,-10.0448 -1.53711,-14.4101 -0.76594,-2.7245 -1.78025,-5.1872 -2.99024,-7.1387 -0.38188,-0.6159 -1.45319,-1.9294 -2.92969,-3.6192 -1.87488,-2.4238 -4.13457,-4.8898 -6.81835,-7.4902 -0.49302,-0.4776 -0.98716,-0.9677 -1.48047,-1.4668 -4.51741,-4.7693 -9.25788,-10.3996 -10.84375,-12.9082 l -1.8558,-2.9219 c -0.30216,-0.6175 -0.46995,-1.1099 -0.47656,-1.4453 -0.0119,-0.6017 0.4439,-2.24 1.14257,-4.2246 l 0.5586,-1.1016 c 2.42939,-4.7942 3.82352,-10.2986 4.11914,-16.0117 0.0946,-1.8287 0.0643,-3.678 -0.0684,-5.5332 -0.16029,-2.6352 -0.47495,-5.3567 -1.07422,-8.291 -0.2349,-1.1502 -0.43713,-2.2143 -0.60547,-3.211 -1.07251,-8.4757 0.0836,-12.7021 4.58399,-21.414 0.29142,-0.5641 0.56584,-1.0985 0.82421,-1.6074 h 0.002 v 0 c -2e-5,0 -1.8e-4,-0.01 0,-0.01 h 0.002 l 4.17578,-7.9942 -0.0293,-3.789 c 0.13092,-1.1115 0.22316,-2.3355 0.30664,-3.7774 0.23444,-4.0499 -0.003,-12.7519 -0.53125,-19.9296 -0.052,-4.2654 -0.10931,-8.6072 -0.16407,-12.3399 -0.0843,-5.7474 -0.16016,-9.5528 0.11133,-13.543 0.58069,-8.5346 2.74635,-17.9153 9.79883,-48.957 3.66254,-16.1208 8.30504,-38.5545 12.08008,-58.082 1.93504,-10.0096 3.64288,-19.2555 4.87304,-26.4961 1.97446,-11.6213 3.63175,-22.3674 4.98438,-32.4844 0.85097,-6.3648 1.58145,-12.4819 2.19336,-18.4101 0.25816,-2.3525 0.37765,-5.5635 0.54883,-8.2969 1.58568,-17.5163 2.45685,-33.4988 1.84765,-46.7305 -0.10299,-2.237 -0.21697,-4.4723 -0.34179,-6.7012 -0.47184,-10.9256 -1.389,-22.021 -2.72852,-33.7988 -0.45661,-4.0147 -0.85792,-7.314 -1.32031,-10.6641 -1.00507,-7.6148 -2.11824,-14.5027 -3.30469,-20.3105 -0.003,-0.016 -0.006,-0.033 -0.01,-0.049 -0.37371,-2.1139 -0.78452,-4.4151 -1.23828,-6.9453 -0.75122,-5.144 -0.9055,-9.2974 -0.47265,-13.336 0.17696,-0.8929 0.39493,-1.8854 0.65429,-3.0273 0.44376,-1.9536 0.80022,-3.813 1.07032,-5.586 1.23693,-5.3694 1.14604,-10.1925 -0.14844,-14.8574 h -0.002 v 0 0 c 0,-9e-4 1.2e-4,0 0,0 -0.17057,-0.7245 -0.36894,-1.428 -0.59571,-2.1133 -0.38375,-1.1598 -0.84743,-2.2649 -1.39258,-3.3223 -1.46665,-2.8452 -2.30247,-5.3302 -2.5039,-7.7891 -0.24847,-3.1953 0.55404,-6.3565 2.41406,-10.1718 0.0523,-0.1071 0.10624,-0.214 0.16016,-0.3223 l 2.74023,-5.5 -0.0703,-5.0762 c 3.8e-4,0 1.9e-4,-0.011 0,-0.014 v 0 0 c 0.43462,-3.4913 0.29477,-7.4556 -0.18945,-13.7832 l -0.0488,-3.625 c -0.0132,-0.9619 -0.0238,-1.8942 -0.0332,-2.8028 -0.0972,-9.3426 0.005,-15.945 0.36914,-21.4219 0.2092,-3.1479 0.51604,-5.9036 0.91015,-8.6152 1.79267,-12.0507 10.40379,-54.636 18.5293,-94.2578 1.20317,-5.75077 2.40687,-11.502 3.56445,-16.91602 0.53052,-2.48126 0.72562,-3.71951 1.24219,-6.14648 1.0458,-4.99015 2.04155,-9.83386 3.09961,-14.83789 7.47733,-35.36383 13.53821,-65.35488 18.40625,-91.5293 2.35514,-12.66312 3.02789,-20.65421 4.84961,-31.70703 0.003,-0.0156 0.005,-0.0331 0.008,-0.0488 0.62044,-3.74435 1.16649,-7.39088 1.69922,-10.97656 0.62698,-3.97393 1.22031,-7.85757 1.78125,-11.66211 2.04605,-12.75551 4.58858,-26.84479 5.70898,-37.43555 0.48375,-4.23523 0.93855,-8.43924 1.36914,-12.64062 0.59789,-5.83367 1.05589,-13.20616 1.37696,-21.46289 0.63845,-11.84676 0.92191,-23.38999 0.92383,-35.14454 1.6e-4,-0.99951 -0.003,-2.00012 -0.008,-3.00195 -0.0825,-9.01364 -0.39482,-18.22721 -0.93554,-27.63476 -0.10942,-2.97654 -0.23349,-5.87143 -0.37305,-8.66211 -0.38408,-7.68031 -0.88303,-14.55813 -1.49219,-20.09375 -0.71565,-6.5033 -1.48437,-12.9073 -2.3125,-19.24219 -0.44531,-3.53299 -1.53867,-7.5919 -2.04297,-11.16797 -2.0605,-14.35983 -4.95067,-29.35078 -8.00976,-44.47461 -0.60833,-3.11201 -1.2367,-6.24255 -1.88282,-9.39062 -1.44623,-7.80564 -2.31127,-15.11391 -4.23828,-23.35743 -0.27319,-1.1687 -0.52148,-2.24155 -0.74804,-3.23047 -1.44866,-6.39625 -1.96281,-9.46508 -1.75391,-10.77343 0.0517,-0.25527 0.13216,-0.4557 0.23828,-0.6211 0.0689,-0.0826 0.14952,-0.13826 0.24219,-0.17382 0.36607,-0.14047 0.69784,-0.47676 0.9375,-0.90625 0.2369,-0.17844 0.38281,-0.41537 0.38281,-0.67188 0,-0.11005 -0.008,-0.2465 -0.0234,-0.4082 0.0156,-0.11802 0.0234,-0.23735 0.0234,-0.35547 0,-0.0321 -0.16308,-0.56041 -0.16406,-0.5957 -0.0231,-0.14265 -0.0301,-0.23035 -0.0586,-0.39063 -0.17677,-1.61778 -0.71085,-4.16475 -1.65235,-8.3418 -3.35301,-14.87592 -16.83516,-62.39739 -26.85351,-94.78125 -0.434,-1.40288 -0.86136,-2.77501 -1.28125,-4.11718 -2.02549,-6.47444 -2.21865,-8.54034 -3.84961,-13.94532 -0.006,-0.0191 -0.006,-0.0278 -0.0117,-0.0469 -6.54272,-22.38823 -12.53862,-43.82947 -14.12696,-54.88477 -1.00054,-7.82113 -1.34597,-15.19469 -1.33007,-24.125 7.4e-4,-0.41928 0.0221,-0.66563 0.0234,-1.07031 0.20012,-10.29963 1.79629,-24.4304 3.53516,-38.94336 0.9528,-7.41314 1.307,-11.74589 2.78125,-22.08789 1.10544,-7.7547 2.06311,-14.28425 2.88477,-19.64453 1.70514,-11.01831 2.80049,-16.99011 3.41601,-18.61719 0.2928,1.42682 0.67769,3.70179 1.14063,6.72071 0.8279,7.20959 2.55185,21.16024 4.51758,36.45703 2.73414,21.27652 7.2411,59.16054 10.01562,84.18554 0.40622,3.66394 0.82474,7.38105 1.24805,11.08399 0.96757,8.5639 1.87088,16.2889 2.76367,23.46289 1.46599,12.06302 2.75276,21.99376 3.46484,26.56445 1.11815,7.177 2.65796,15.60739 4.62305,25.30664 4.20467,20.75332 10.35652,47.3164 18.49023,79.85156 4.10455,16.41834 7.05139,28.68863 10.12305,41.42383 2.12886,8.89365 4.24435,17.91599 5.86914,25.08399 0.002,0.007 0.004,0.0181 0.006,0.0254 2.53864,11.00024 3.9774,18.53762 5.77149,27.16797 1.1895,6.20159 3.12397,14.66067 3.86914,19.54882 2.19739,13.27462 3.44979,24.08543 3.81054,34.23438 0.0326,0.91593 0.0614,1.83036 0.084,2.74609 0.12196,4.95 0.56956,9.7085 0.99609,10.57422 0.0319,0.0647 0.0743,0.13056 0.125,0.19922 l 0.0352,0.6543 1.19726,0.39648 c 0.44874,0.38535 1.05681,0.66129 1.91406,0.97461 0.50275,0.21287 1.03233,0.40502 1.56446,0.56445 0.11208,0.0336 0.22217,0.0676 0.33203,0.10157 1.80421,0.64991 3.31411,1.28871 3.53125,1.50586 0.0978,0.0978 -0.0926,0.72942 -0.49414,1.71875 -0.78013,1.68813 -2.14499,4.49838 -3.69141,7.58007 -2.40942,4.80151 -5.67192,12.55547 -7.25,17.23047 l -2.86914,8.5 -0.006,8.89453 c -2.6e-4,0.004 2.7e-4,0.008 0,0.0117 -0.0331,0.48715 -0.0621,0.9795 -0.0879,1.47657 -0.22721,3.24818 -0.23536,6.91851 -0.0215,12.10937 0.0287,0.77551 0.0635,1.56539 0.10156,2.37109 1.6e-4,0.003 -1.6e-4,0.008 0,0.0117 l -0.004,6.12696 c -0.0145,26.52658 -0.28937,32.29873 -1.9082,40 -2.44933,11.65221 -2.66046,30.88542 -0.43359,36.47265 0.0361,0.0927 0.0719,0.1821 0.10937,0.26758 0.0663,0.15124 0.13714,0.29948 0.21094,0.44727 1.69866,3.5139 4.41375,5.50602 7.46094,5.91406 1.18025,0.26847 2.36106,0.29165 3.45312,0.0176 1.02696,-0.25775 2.15536,-0.80644 3.30274,-1.57032 1.31884,-0.77963 2.61152,-1.84087 3.82812,-3.1875 0.28926,-0.32018 0.49505,-0.62331 0.76367,-0.93554 0.0558,-0.0639 0.10492,-0.13085 0.16016,-0.19531 3.38762,-3.98541 5.23955,-7.59936 6.7793,-15.64844 0.85564,-4.34395 1.64835,-10.30774 2.74804,-19.72461 1.06533,-9.1226 2.20678,-16.85717 2.53711,-17.1875 1.2204,-1.2204 4.07592,1.58259 6.50586,6.38672 2.25489,4.45804 2.49919,6.11992 2.49219,16.94336 -0.007,11.29224 -0.23225,12.65615 -3.83203,23.13281 -3.51332,10.22502 -4.27415,11.5587 -9.31641,16.33789 -3.1254,2.96234 -6.3455,7.19923 -7.47656,9.83789 -0.0173,0.0405 -0.0362,0.0816 -0.0547,0.12305 -1.14559,2.57425 -4.44715,7.14926 -7.41406,10.25976 -0.46645,0.48903 -0.91936,0.97988 -1.35742,1.47461 -3.72839,4.18257 -6.21197,8.11568 -7.58789,12.03906 -1.0289,2.7809 -1.43594,5.3874 -1.13477,7.63282 0.11836,0.88246 0.35111,1.70642 0.64258,2.48437 0.0505,0.13705 0.0908,0.28109 0.14648,0.41406 0.14388,0.34148 0.31512,0.65559 0.48829,0.96875 0.0571,0.10147 0.10367,0.21252 0.16406,0.31055 0.0981,0.16342 0.20492,0.31272 0.31054,0.4668 0.0397,0.0557 0.0802,0.10973 0.1211,0.16406 1.16722,1.62242 2.73285,2.6889 4.42773,2.82813 0.11428,0.0125 0.22811,0.0216 0.34375,0.0234 0.0131,1.1e-4 0.026,0.002 0.0391,0.002 0.007,3e-5 0.013,0 0.0195,0 0.0212,0 0.043,5.7e-4 0.0644,0.002 0.0497,0.003 0.0997,0.009 0.15039,0.0195 0.48033,0.20467 0.87837,0.46504 1.20508,0.79492 0.12366,0.13362 0.24613,0.28412 0.36914,0.44727 0.22706,0.32603 0.40801,0.70268 0.55078,1.13867 0.0476,0.14533 0.0915,0.29651 0.13086,0.45508 0.45959,1.85257 1.52488,3.58067 2.84375,4.87695 0.036,0.0356 0.0671,0.0783 0.10351,0.11328 0.16875,0.16105 0.35125,0.29148 0.52735,0.4375 0.18586,0.15494 0.36606,0.32459 0.55859,0.46094 0.92391,0.65431 1.91467,1.08811 2.88867,1.21484 h 0.002 0.002 0.002 c 0.1939,0.025 0.38633,0.0389 0.57813,0.0391 h 0.002 0.002 c 0.66542,-10e-6 1.38789,-0.13542 2.1836,-0.40039 0.2188,-0.0728 0.43378,-0.1386 0.66601,-0.23438 l 0.002,-0.002 c 0.35835,-0.14789 0.73389,-0.32296 1.1289,-0.5293 l 0.002,-0.002 c 0.30334,-0.15852 0.68184,-0.42766 1.00976,-0.62305 1.17829,-0.70205 2.52332,-1.63875 4.09571,-2.87891 0.27371,-0.21594 0.49152,-0.3578 0.77929,-0.59179 l 0.002,-0.002 c 4.80446,-3.90539 11.61288,-10.35817 21.89257,-20.55273 8.00059,-7.93433 13.28604,-13.21515 17.08204,-17.72461 2.91291,-3.30299 4.69464,-5.66422 5.57617,-7.33398 0.39629,-0.75066 0.92558,-1.94834 1.54297,-3.46875 2.16958,-4.54881 3.87434,-9.90483 6.35156,-17.9668 0.0596,-0.18801 0.12065,-0.37701 0.17969,-0.56445 2.62227,-8.32653 6.20482,-18.63249 8.3789,-24.14649 0.18536,-0.44844 0.36621,-0.89407 0.54102,-1.33984 0.0193,-0.0466 0.0377,-0.0931 0.0566,-0.13867 1.89379,-4.55455 3.05596,-8.22934 3.50586,-12.32032 0.50975,-3.09623 0.62812,-5.88059 0.32226,-8.17968 -0.10509,-0.79 -0.42081,-2.66504 -0.86718,-5.17383 -0.50848,-3.61386 -1.27179,-7.82061 -2.28321,-12.91016 -1.34901,-6.78831 -4.4479,-26.2192 -7.03711,-43.41015 -2.24147,-15.03305 -4.11518,-28.3856 -4.10937,-29.97657 0.002,-0.56609 2.02706,-1.86192 4.5,-2.8789 1.5732,-0.64697 2.77086,-1.32534 3.5332,-1.98828 l 0.002,-0.002 0.20118,-0.0918 -0.006,-0.0879 c 0.0897,-0.0867 0.1718,-0.1739 0.24609,-0.25977 0.33173,-0.34671 0.51953,-0.66432 0.51953,-0.92188 0,-0.0256 -0.003,-0.0647 -0.006,-0.11914 0.003,-0.0338 0.006,-0.0681 0.006,-0.10156 0,-0.73677 -0.80568,-9.11745 -1.92969,-20.17383 -0.4167,-4.2038 -0.89148,-8.92459 -1.38086,-13.76562 -3.68238,-35.45642 -5.4764,-62.12252 -7.59374,-108.14258 -0.31672,-6.8491 -0.62715,-13.14356 -0.95704,-20.91406 -0.21793,-5.13348 -0.44043,-10.48651 -0.66796,-16.08203 -0.0589,-1.4475 -0.17618,-2.16672 -0.23633,-3.57422 -0.0805,-1.74745 -0.20651,-4.4778 -0.27344,-5.92578 -0.89795,-19.42582 -1.8744,-34.74308 -3.35352,-48.77149 -0.25244,-2.3943 -0.99947,-4.91088 -1.2832,-7.24414 -0.26496,-2.28859 -0.71947,-4.70365 -1.18945,-7.08008 -0.37108,-2.52884 -0.74662,-4.68651 -1.12696,-6.45703 -0.12624,-0.58766 -0.23517,-1.09263 -0.32812,-1.50976 -0.32575,-2.11464 -0.64145,-4.21318 -0.95703,-6.31446 -0.13085,-1.32197 -0.41458,-3.18792 -0.83985,-5.54492 -1.31357,-8.54298 -2.80569,-17.38495 -5.24218,-27.7207 -1.14391,-4.86603 -2.38167,-9.95142 -3.72266,-15.32422 -6.71197,-26.89205 -10.37732,-43.45429 -13.23047,-70.9043 -0.69053,-6.79699 -1.31768,-18.22358 -1.96094,-26.72461 -1.39737,-16.99963 -2.9015,-42.15559 -4.35156,-69.78515 -0.60813,-11.80909 -1.13698,-21.27553 -1.84375,-35.61914 -1.01066,-20.51131 -1.9472,-23.561978 -2.78515,-35.958988 -0.37598,-9.497111 -1.18118,-23.220726 -2.09571,-34.517578 -0.068,-0.840502 -0.13595,-1.667616 -0.20508,-2.478516 -0.3354,-3.934778 -0.64664,-7.671725 -0.89257,-10.730469 -0.0282,-0.350522 -0.0536,-0.691444 -0.0801,-1.023437 -0.0353,-0.578233 -0.0712,-1.272455 -0.10742,-1.638672 -0.13905,-1.20796 -0.2396,-4.547614 -0.38868,-5.777344 -0.24803,-2.046023 -0.69131,-3.607577 -0.95898,-5.615234 -0.33081,-2.364721 -0.47849,-8.714517 -0.8457,-11.009766 -0.3461,-2.171065 -0.70929,-4.3193041 -1.09375,-6.4785154 -0.65764,-3.7061308 -1.37553,-7.46097552 -2.16797,-11.4238281 -1.82651,-9.1340375 -3.82765,-17.4332625 -6.06836,-24.9902345 -5.00034,-17.083151 -11.19156,-29.962281 -19.26367,-40.367187 -0.25617,-0.341508 -0.54238,-0.643571 -0.80274,-0.978516 -1.44837,-1.807763 -2.82414,-3.704598 -4.40429,-5.359375 -8.56337,-9.155548 -19.01963,-16.06277 -32,-21.664062 -0.82772,-0.357176 -1.54545,-0.67246 -2.16797,-0.958985 -2.42811,-1.246088 -3.44622,-2.029523 -3.97852,-3.164063 -0.23667,-0.62028 -0.36563,-1.37515 -0.5,-2.37695 -0.99997,-7.45532 -5.17405,-14.72188 -11.87109,-21.05078 -4.06976,-3.91656 -9.03373,-7.41595 -14.66602,-10.23243 -0.0218,-0.0109 -0.0426,-0.0204 -0.0644,-0.0312 -0.33049,-0.1712 -0.66439,-0.34196 -1,-0.50976 -5.29331,-2.6465 -10.57034,-5.05603 -11.72656,-5.35547 -0.33333,-0.0863 -0.61866,-0.20104 -0.8711,-0.37695 -0.0661,-0.0486 -0.13044,-0.0986 -0.1914,-0.15235 -0.0202,-0.0181 -0.0409,-0.0355 -0.0606,-0.0547 -0.0143,-0.0134 -0.027,-0.0292 -0.041,-0.043 -0.92171,-0.94977 -1.35613,-3.18321 -2.11914,-9.13282 -1.4708,-11.46872 -4.36779,-20.41515 -9.14843,-28.29296 -0.0214,-0.0352 -0.0371,-0.0742 -0.0586,-0.10938 l -0.006,-0.0117 -3.39844,-5.56836 v -0.002 -0.002 c -0.0734,-0.36345 -0.064,-0.74649 0.0469,-1.20899 l 2.04492,-3.35547 c 1.34717,-2.21052 2.27052,-4.68231 3.51953,-6.98242 2.47137,-4.27776 4.62523,-8.6091 6.54688,-12.99414 0.45063,-1.0404 1.10942,-2.00463 1.53515,-3.04687 0.1021,-0.2499 0.16891,-0.49619 0.26954,-0.7461 1.48353,-3.68503 2.84109,-7.3728 3.98046,-11 1.2181,-3.87715 2.22576,-7.68643 2.99414,-11.35937 0.0107,-0.0511 0.0226,-0.10327 0.0332,-0.1543 0.17262,-0.83052 0.33666,-1.68492 0.49414,-2.5625 1.0444,-5.81204 1.73006,-12.73741 2.10937,-20.74609 0.0739,-1.59151 -0.003,-3.7617 0.0449,-5.44922 0.19295,-6.6489 0.26873,-13.76274 0.0488,-21.99805 -0.15622,-5.7612 -1.14193,-15.21673 -1.5,-21.82227 -0.0176,-0.32477 -0.0562,-0.74342 -0.0742,-1.07031 -0.13597,-2.2329 0.0363,-3.4702 -0.12305,-5.79492 -0.1714,-2.49989 -0.58951,-4.77427 -0.78321,-7.37695 -0.88839,-13.01364 -1.14941,-23.21585 -2.71093,-39.39649 -0.29684,-3.07584 -0.57131,-5.07788 -0.86328,-8.0039 -0.0815,-0.81617 -0.0654,-1.17187 -0.14844,-1.9961 -1.40586,-13.94835 -2.70671,-25.88774 -3.99024,-36.32422 -1.35625,-11.02786 -2.8082,-18.33957 -4.22461,-26.61132 -0.0875,-0.52816 -0.1876,-2.06508 -0.27343,-2.56446 -0.15203,-0.88453 -0.37932,-1.65389 -0.53711,-2.52929 v -0.002 -0.002 c -0.5708,-3.10011 -1.05422,-7.6306 -1.66211,-10.46875 -0.76894,-3.67958 -1.78462,-6.39888 -2.62109,-9.73828 -0.10418,-0.40888 -0.22046,-0.80237 -0.32618,-1.20899 -2.08086,-8.12317 -4.45332,-15.97681 -7.11718,-22.88085 -1.76232,-4.64964 -3.62354,-9.19378 -5.6836,-13.52735 -0.56465,-1.19301 -0.93902,-2.44414 -1.53125,-3.64258 -0.68813,-1.39252 -1.61943,-2.58196 -2.3457,-3.94336 -1.96841,-3.6452 -4.07153,-7.14506 -6.26953,-10.54492 -1.87018,-2.88954 -3.64996,-5.85045 -5.70703,-8.57422 -0.26714,-0.3562 -0.54251,-0.70351 -0.8125,-1.05664 -3.3941,-4.40663 -6.9501,-8.66633 -10.82422,-12.61914 -12.05824,-12.40373 -26.32731,-22.41799 -42.79102,-30.02344 -10.93928,-5.09728 -22.77071,-9.09234 -35.40625,-11.92187 -5.4724,-1.22545 -9.1254,-1.81817 -15.17383,-2.09375 -4.73278,-0.39607 -9.66032,-0.55896 -15.00195,-0.51758 z m -34.28516,1089.79883 c 13.07648,52.96312 18.85934,79.95635 21.1836,100.97461 -2.32414,-21.01847 -8.1068,-48.01019 -21.1836,-100.97461 z m 23.3125,134.68946 c 0.0599,0.17277 0.12469,0.31734 0.19336,0.43359 -0.0687,-0.11625 -0.13342,-0.26082 -0.19336,-0.43359 z m -253.49804,78.81054 c -0.21864,0.004 -0.42155,0.0185 -0.61719,0.043 0.19558,-0.0245 0.39863,-0.0392 0.61719,-0.043 z m -0.72461,0.0547 c -0.0327,0.005 -0.0637,0.0135 -0.0957,0.0195 0.0321,-0.006 0.063,-0.0144 0.0957,-0.0195 z m -0.31836,0.0703 c -0.0784,0.0221 -0.15583,0.0457 -0.23047,0.0762 0.0744,-0.0304 0.15229,-0.0541 0.23047,-0.0762 z m -0.30469,0.10938 c -0.0288,0.0132 -0.0577,0.0263 -0.0859,0.041 0.0283,-0.0147 0.0571,-0.0278 0.0859,-0.041 z m -0.41211,0.25976 c -0.0264,0.0218 -0.0542,0.0426 -0.0801,0.0664 0.0261,-0.024 0.0535,-0.0444 0.0801,-0.0664 z m -0.33008,0.33789 c -0.0575,0.0733 -0.11108,0.15944 -0.16601,0.2461 0.0547,-0.0862 0.10875,-0.17314 0.16601,-0.2461 z m -0.29101,0.45899 c -0.0395,0.0728 -0.077,0.1473 -0.11524,0.22851 0.0381,-0.0809 0.0758,-0.15599 0.11524,-0.22851 z m -0.20703,0.4375 c -0.0398,0.0947 -0.0807,0.18961 -0.11914,0.29492 0.0385,-0.1055 0.0792,-0.20012 0.11914,-0.29492 z m -0.16602,0.43945 c -0.0591,0.17167 -0.112,0.39768 -0.16797,0.59766 0.0557,-0.1989 0.10916,-0.42679 0.16797,-0.59766 z m 251.87109,1.08789 c 0.20214,4.78153 0.0996,8.72943 -0.36718,12.97461 0.46698,-4.24591 0.56934,-8.19238 0.36718,-12.97461 z m -252.49414,1.91797 c -0.0826,0.50741 -0.169,0.96477 -0.24609,1.58203 0.074,-0.58662 0.16699,-1.09587 0.24609,-1.58203 z m 284.45704,7.1582 c 0.0299,0.0147 0.0593,0.0327 0.0898,0.0527 -0.0301,-0.0198 -0.0603,-0.0381 -0.0898,-0.0527 z m -0.88477,0.7168 c -0.0283,0.0658 -0.0551,0.13116 -0.084,0.20703 0.029,-0.0761 0.0556,-0.14101 0.084,-0.20703 z m -0.15234,0.4082 c -0.2357,0.67072 -0.51736,1.91796 -0.82422,3.38868 0.29869,-1.42324 0.59336,-2.73004 0.82422,-3.38868 z m 7.99804,30.42969 c -0.53656,1.62661 -1.41186,3.47606 -2.78125,6.29102 1.36939,-2.81496 2.24469,-4.66441 2.78125,-6.29102 z m -5.05859,10.53711 c -0.27739,0.46162 -0.63294,0.91848 -0.92969,1.36719 0.2999,-0.4533 0.64954,-0.90071 0.92969,-1.36719 z m -11.42774,1.48633 c 0.19579,3.59933 0.40577,7.2933 0.625,11.04492 -0.61843,0.61402 -0.76723,0.86826 -1.46093,1.54688 -11.23026,10.98607 -12.53259,13.2235 -11.62891,19.96093 0.46368,3.45705 0.12166,4.22488 -3.40039,7.66407 -0.43235,0.42217 -0.85025,0.85563 -1.25391,1.29687 0.59497,-8.29094 1.15875,-16.72994 1.67188,-24.9707 -0.0889,0.008 -0.17824,0.0137 -0.26758,0.0195 6.67344,-0.43663 12.03059,-6.14398 15.71484,-16.5625 z m 8.8086,2.30078 c -0.7496,0.96148 -2.30768,2.47318 -3.2832,3.55273 1.00337,-1.10836 2.51713,-2.56868 3.2832,-3.55273 z m -32.50781,61.78711 c 0.1593,0.32416 0.34337,0.63114 0.53906,0.92773 -0.196,-0.29694 -0.37956,-0.60315 -0.53906,-0.92773 z m 3.87304,3.93945 c 0.05,0.0228 0.1004,0.042 0.15039,0.0625 -0.0498,-0.0205 -0.10059,-0.0398 -0.15039,-0.0625 z m -117.37304,757.89455 c -0.18525,0.6587 -0.41592,1.2673 -0.61914,1.914 0.20223,-0.6435 0.43469,-1.2586 0.61914,-1.914 z m -1.9043,5.7148 c -0.0669,0.1741 -0.11557,0.3708 -0.18359,0.543 0.0958,0.2641 0.19141,0.5266 0.2871,0.7891 0.16179,0.4436 0.28336,0.8948 0.44922,1.3203 0.64241,1.6476 1.29582,3.1084 1.80469,3.9843 l 1.49805,2.5762 c 0.0608,0.3968 0.0713,0.7506 0.0391,1.086 l -2.83984,4.3339 c -0.84866,1.295 -2.57474,3.4035 -4.66407,5.7559 -0.13461,-0.341 -0.32544,-0.6651 -0.45898,-1.0098 l -2.74023,-7.0761 2.54687,-3.75 c 1.54129,-2.2713 2.99506,-5.2588 4.26172,-8.5528 z m 0.81836,30.1114 c 0.86574,1.8042 1.51419,3.5474 2.52344,5.455 -0.99846,-1.8881 -1.66566,-3.6683 -2.52344,-5.455 z m 26.54883,56.748 c -6.9e-4,1.2582 -0.0656,2.4044 -0.17383,3.4902 0.10835,-1.0863 0.17314,-2.2313 0.17383,-3.4902 z m -0.50977,5.7832 c -0.0691,0.334 -0.14513,0.6611 -0.23047,0.9785 0.0855,-0.3178 0.16125,-0.6441 0.23047,-0.9785 z m -0.31641,1.3145 c -0.13393,0.4581 -0.28521,0.9004 -0.45703,1.3261 0.17201,-0.4261 0.32297,-0.8676 0.45703,-1.3261 z m -0.58593,1.6093 c -0.14129,0.3272 -0.29272,0.6477 -0.45899,0.9571 0.16625,-0.3094 0.31771,-0.63 0.45899,-0.9571 z m -0.68555,1.3477 c -0.15097,0.2572 -0.31013,0.5101 -0.48047,0.7558 0.17054,-0.2459 0.32934,-0.4983 0.48047,-0.7558 z m -0.77734,1.166 c -0.18654,0.2461 -0.38545,0.4872 -0.59375,0.7227 0.20849,-0.2356 0.40706,-0.4764 0.59375,-0.7227 z m -0.87891,1.043 c -0.28749,0.3038 -0.59427,0.6007 -0.92187,0.8886 0.32793,-0.2881 0.63411,-0.5846 0.92187,-0.8886 z m -1.0293,0.9883 c -0.36665,0.3158 -0.7653,0.6223 -1.18359,0.9218 0.41874,-0.2997 0.81658,-0.6058 1.18359,-0.9218 z m -1.72461,1.2578 c -0.72266,0.4837 -1.5099,0.9535 -2.38476,1.4062 0.87589,-0.4531 1.66134,-0.9221 2.38476,-1.4062 z"
     sodipodi:nodetypes="cscsccscccsscsccccsssssssccsssssccsssssssccssssssssssssssssssssssscccccsssssssssssssssssssscssscccsscsssssscscccscsssccsssssssssssscsccscccsccssccccccsccsccscccscccsssssssccsssssssssscccsccccscccsccccccccscsccccscccsccsccscsscsccscscscscsccscscssccsssccccscccssccsscccccsccccscsscsccsccccccccccscccsccssccsccsccccccccccccscsccccccccccssscscscccsccscscsccsscccscssssssccscscccccsccccscsscscccscscccsccscsscccccscsccssccccscccscscsccssscccsccscccssccssscccccscsccccscscsscccccsccscsccscscccssscssscsccscccccccsssccccscsccsccccscssccccssccscscccccccscscsscccccscscccsscssccsccccscccscsssccscccsccccsccscscssccccssccccccsccsccscccccscscsscscsccccccccsccccccscccccccccccccccccccccccccccccccccccccccccccccccccccccccccccsssccccccccccccccccccsscccsccccccccccccccccccccccccccccccccccc" /><path
          style="fill:#47769e"
     d="m -633.78906,485.76562 c -16.09979,7.25684 5.27331,46.05041 -0.24219,67.10157 10.00632,59.5894 14.23101,120.36875 7.76758,180.59765 40.83012,-15.35202 -7.10296,-7.59959 8.8119,-9.23039 8.52602,-25.14067 14.45034,-68.55162 11.43388,-100.738 -3.53302,-50.23833 -17.59223,-90.31489 -27.77117,-137.73083 z m 98.47656,0.0625 c 0.75512,38.82835 -4.80826,55.79855 38.89286,39.71349 32.8527,-11.05264 104.95886,-7.15932 106.05245,-25.6627 -33.10483,5.59555 -98.51622,12.56809 -111.01917,13.97673 22.01524,-7.66081 89.29103,-17.79007 81.44136,-17.03081 -38.1632,-6.21247 -76.85918,-8.0953 -115.3675,-10.99671 z m 34.875,2.95704 2.23828,0.58203 c 0.009,-0.0128 0.008,-0.0178 0.008,-0.022 l -2.24609,-0.56054 z m 16.30664,1.12109 2.62304,0.82617 z m 80.89453,14.40625 c 10.39126,7.18703 -30.73516,0.29119 0,0 z m -28.69336,1.99219 c 0.14552,0.0865 -0.92883,0.13928 0,0 z m 13.31836,0.0195 c 6.27271,9.7283 -29.84916,-3.33968 0,0 z m -12.31055,0.53711 0.95028,2.51613 z m -4.64453,2.13281 c 13.11568,4.71383 -30.58193,1.93552 0,0 z m -14.77539,2.54297 c -2.92569,8.46679 -15.63449,-2.27705 0,0 z m 65.42188,1.41016 c -46.17599,12.13838 -119.65216,1.43295 -147.70793,32.21775 1.00953,40.72047 13.52535,87.45106 0.49898,119.48136 7.38342,39.07707 2.41779,88.07257 54.76754,82.12901 -61.00184,-14.67372 -45.97978,59.74532 -84.78711,82.90625 -30.01666,37.2312 -0.0743,96.77441 -8.1658,143.20297 1.77907,79.31662 5.25023,158.76262 16.07596,237.42792 -16.07141,100.6428 4.68865,202.8978 -1.89217,303.414 -12.45414,39.6373 -13.34676,109.1507 40.48231,115.0836 50.56971,6.2283 50.59038,-47.8596 54.32619,-83.7322 4.17459,-95.8147 41.33752,-187.0433 39.48328,-283.5184 -0.96938,-57.2624 -14.84518,-112.974 -7.28302,-170.4924 8.98207,-115.33237 45.60046,-226.58534 57.81118,-341.64694 10.82833,-79.09661 6.00574,-159.07591 -13.60941,-236.47292 z m -81.11133,0.60937 c 2.17885,11.19689 -21.3033,-3.39581 0,0 z m -17.43359,3.07422 c 13.84435,4.4094 -29.32232,3.40292 0,0 z m -15.64649,3.05664 c 12.50742,4.38007 -27.11955,3.2159 0,0 z m -14.5,2.63086 c 2.07457,9.73613 -22.5089,-0.74061 0,0 z m -560.19527,25.90234 c -14.069,27.41092 -7.9892,50.5215 26.3568,35.64202 21.2377,-2.5709 57.08285,-25.99397 12.9533,-24.59301 -10.8099,-4.1019 -40.9193,-7.10431 -39.3101,-11.04901 z m 432.45699,1.17578 c -5.85566,9.79374 -90.0203,7.32833 -47.49224,27.41211 21.16635,9.73224 73.25116,23.90546 50.72463,-18.09686 l -2.63478,-9.20196 -0.59766,-0.11329 z m -433.06449,4.82032 c -1.8657,11.83002 -0.9988,3.79981 0,0 z m 71.4414,11.26367 c -13.48,30.564 -79.77,14.09628 -77.4026,36.912 27.4529,8.57982 95.79444,-18.55185 82.7835,-36.32216 -17.5217,5.74943 -21.1113,18.24388 -5.3809,-0.58984 z m 290.33403,0.1543 c 7.31073,3.41038 -21.91984,-0.66295 0.75976,13.88476 -31.33142,-26.43544 41.10643,40.52327 64.83091,23.62479 57.64757,-9.89746 -71.80954,-16.94998 -65.59067,-37.50955 z m -302.68363,1.54492 -7.9511,5.57812 z m 32.37503,1.02343 c -16.7081,18.2093 6.80225,-10.71114 -14.88476,13.11133 -20.15137,41.72964 -99.24397,-2.36263 -87.62527,53.40841 -9.5769,148.71294 43.2836,291.44601 61.9823,437.12597 -4.8902,24.2718 8.4158,48.6248 0.7808,70.0414 4.5395,47.6169 -12.4414,95.6312 -7.5164,144.1665 2.2807,75.8102 29.0455,148.4444 36.0176,223.5063 -1.85889,36.7164 7.40878,71.2064 14.84524,105.7515 31.03884,-28.8442 110.66032,27.9531 84.08044,-41.0423 10.61197,-44.1571 -10.33136,-88.2016 -2.09369,-133.5669 6.28499,-78.2964 8.00069,-157.037 -0.70227,-235.1979 7.25946,-61.9008 17.14916,-123.8583 15.16961,-186.5374 -2.28206,-66.71429 7.39041,-133.22924 7.52605,-199.72166 -2.14857,51.97558 1.52139,-41.21876 -6.6442,-57.68392 -3.28965,-24.76004 -24.52162,-45.54048 -51.12843,-52.67263 -62.81666,-8.57981 76.28569,0.0135 46.27299,0.20316 49.1527,14.82826 17.14859,-49.66505 25.28924,-76.56223 -7.4555,-36.61505 16.0942,-58.61607 -22.57095,-55.44832 -33.00767,-1.90614 -66.00874,-4.59647 -98.7983,-8.88131 z m 253.10547,0.86719 c 2.2673,1.85328 -39.3235,2.62793 -52.41373,5.5877 -45.25624,-10.89123 -38.49238,25.284 -39.6722,57.66035 4.37298,-24.15859 0.25497,-82.19521 -0.005,-23.97136 15.75555,40.54962 -39.30751,43.63334 -35.17601,73.09745 -18.36087,50.43326 59.73789,18.22755 55.40606,28.28994 11.11104,-1.99361 20.78836,1.92212 9.36136,4.4101 -36.43875,9.51656 -40.7157,33.30757 -43.78289,66.58868 -3.55821,21.19406 -1.67749,84.55678 -1.31949,82.30817 -0.64257,-17.99546 -2.07857,-57.41067 -2.7902,-17.22698 11.73995,100.07132 3.10335,201.28327 15.47974,301.17837 17.52594,70.8121 -5.82313,143.1377 2.26468,214.8602 1.67833,59.1722 13.92259,119.3413 -2.16253,177.5133 12.03605,30.6071 -18.20774,96.9118 39.07302,66.4408 37.58001,8.7937 69.60552,11.7346 55.83809,-38.5449 14.30745,-19.409 8.09562,-43.2745 9.49973,-65.7792 13.40258,-98.7779 49.44619,-198.0894 30.61482,-298.9292 -8.62753,-27.4955 0.0732,-54.5368 -6.39021,-81.3302 11.25305,-26.1455 -1.13397,-55.7439 8.59006,-82.7803 20.46238,-100.76488 39.41106,-201.88126 55.89471,-303.32878 -0.68406,-39.62806 12.96527,-98.34506 -5.89698,-128.49729 -35.16433,2.54517 -69.51533,-9.98586 -92.41254,-37.54685 z m -264.4707,0.18164 c -1.50043,4.38654 -9.2136,11.08341 0,0 z m 297.76562,0.87696 8.29688,4.95898 z m 59.44141,7.09375 c 0.50536,4.59784 0.17287,3.25057 0,0 z m -188.49609,0.0937 c 5.1704,6.28175 -45.22282,-9.48171 -31.20181,25.45309 -0.37993,71.18791 0.39951,-61.39485 -0.26823,-23.36952 0.42213,26.73693 -12.16916,113.84446 26.46854,61.69661 6.99205,-20.16255 6.08841,-42.7672 5.0015,-63.78018 z m 147.54101,2.01367 c 23.59705,6.13009 24.70225,6.81787 0,0 z m -361.95115,0.93164 c -0.7189,0.258 -5.1978,1.45552 0,0 z m 16.25,2.54492 c -17.609,7.78635 -14.5197,6.21532 0,0 z m -54.5567,0.35156 c 2.2803,2.1868 7.5384,2.35533 0,0 z m 437.67387,1.52149 -9.70899,0.41601 z m -370.05857,0.58984 c -4.9339,3.33955 -9.544,5.73143 0,0 z m 2.7363,6.6582 c -13.526,8.61016 -13.5609,8.61162 0,0 z m 317.4043,0.5625 c 17.73986,7.29334 16.79182,6.77005 0,0 z m -8.40039,3.86133 c 22.82326,9.14708 -0.0551,1.42496 0,0 z m 35.14648,4.38867 c 27.21124,0.53923 32.08632,0.81608 0,0 z m -163.38476,11.39649 c -2.59828,25.2075 -5.24126,39.55553 0,0 z m 4.6875,22.67578 -3.2461,8.16797 z m -3.34766,8.38477 c -0.25187,1.38706 -4.3958,7.36847 0,0 z m 223.82031,0.33007 c -6.62343,21.72546 -4.52236,-7.0504 2.9375,0.77344 z m -235.48632,4.77735 c -0.0715,0.0957 -0.28778,0.2688 0,0 z m -17.65625,19.31445 c -0.26034,11.70942 -1.62075,1.57399 0,0 z m 488.01562,18.32422 c -0.80746,17.77572 -1.39912,33.83701 0,0 z M -940.9707,703.0214 c 25.94804,0.4561 33.60778,1.14632 0,0 z m -7.44727,5.33399 6.60938,0.98047 z m 17.03711,2.00195 c 6.23355,1.55286 2.03706,0.5096 0,0 z m 301.08203,58.91602 c -13.72037,101.60661 -42.36826,200.74513 -56.25425,302.16494 6.45784,23.3325 -13.74138,64.3813 9.4418,67.3998 -29.11952,-3.4298 12.17796,17.1821 -8.91606,12.9235 32.38386,-6.6041 26.70567,-0.945 -1.31446,5.5528 -0.53443,50.9851 14.86403,102.5402 5.73652,154.1071 -5.67551,67.2729 -28.97329,132.0305 -33.63326,199.1503 -13.12437,20.3674 23.38603,40.0475 0.58625,28.6664 16.74797,7.9776 73.20469,39.226 23.73062,16.9061 -32.31778,-31.0069 -30.00949,20.3566 -33.78727,13.3029 -5.27236,43.5058 34.68579,75.3637 75.25781,51.3066 -45.94761,9.94 33.34737,-5.5216 22.70707,-37.6027 4.69224,-53.5575 -16.65885,-105.8856 -6.67269,-160.473 4.50818,-70.536 7.71791,-141.701 -0.64071,-211.8699 8.85224,-88.1217 17.23696,-176.4347 15.03288,-265.07496 3.03764,-58.62803 15.63132,-121.3249 -11.27425,-176.45988 z m -18.78515,851.22454 c -4.31757,2.6865 18.09455,-4.0318 0,0 z m 34.69336,-848.39642 c -1.12335,3.21834 1.54724,5.93454 0,0 z m -220.46485,118.1211 c 2.44683,33.6672 2.1913,30.18593 0,0 z m -211.95113,43.35351 c 4.597,21.32318 12.1639,57.45289 3.4394,16.04102 l -2.012,-8.9524 z m 588.20699,191.40621 c -33.84542,6.135 -50.63223,9.4704 0,0 z m 4.01758,0.377 c -18.65751,17.1377 -93.80642,14.4201 -32.97266,7.207 11.02803,-2.216 22.16793,-4.0073 32.97266,-7.207 z m -551.64457,3.0566 c 0.4345,0.017 -0.4205,0.018 0,0 z m 0.1426,0 c 0.5106,-0.087 -0,0.1305 0,0 z m -0.7558,0.1 -0.043,0.014 z m 552.39839,0.5391 c -17.17106,9.1236 -20.8124,2.8081 0,0 z m -551.81249,0.7617 c 9.27636,8.9086 71.4401,27.3559 26.27909,17.0982 -9.06463,-4.0527 -21.61919,-7.3113 -26.27909,-17.0982 z m 333.94531,5.0254 c 11.61267,4.7439 -6.55393,2.1178 0,0 z m 144.8125,11.4727 6.96334,1.0178 z m -501.92191,0.4511 c -1.204,2.5958 1.7277,4.7525 0,0 z m 500.83597,0.2246 c 20.48413,5.7216 100.21702,10.634 38.59259,9.4293 -10.62127,-6.8706 -37.34418,4.567 -38.59259,-9.4293 z m 0.21875,3.5254 c 3.4802,4.6669 21.68296,2.8071 0,0 z m 69.02539,2.6172 1.76367,0.4004 z m -250.26758,2.8477 c 0.0151,0 0.0141,0 0,0 z m -0.89648,1.7383 c -14.75446,15.2008 -67.62059,9.2329 -15.35394,3.5256 l 8.3598,-2.0491 z m 1.66015,0.9941 -1.76758,3.0273 z m -295.5352,3.25 c 16.0867,1.7047 88.76601,5.6168 33.58214,6.6106 -4.78862,-0.1044 -41.56284,-2.1576 -33.58214,-6.6106 z m 287.14458,2.8066 c -9.97632,2.9441 -47.54662,9.6917 0,0 z m -35.60352,2.7364 0.59766,0.8144 z m -197.29883,1.6464 c -1.49318,0.4986 -6.84185,0.7253 0,0 z m 165.65039,0.6856 c 0.93154,0.2224 3.2096,1.1744 0,0 z m -1.13085,0.051 c 10.46212,11.495 94.39488,24.8243 41.51817,19.4227 -12.63607,-3.6885 -36.676,-8.2568 -41.51817,-19.4227 z M -918,1171.416 c -0.97994,19.3314 -98.8179,35.0741 -40.49131,18.6075 14.45784,-3.9662 28.20527,-10.5789 40.49131,-18.6075 z m 132.32031,2.4629 c 4.45075,3.2054 1.03068,1.5583 0,0 z m 24.24219,12.8203 c 17.46319,5.4378 28.6003,8.0968 0,0 z m -186.95703,6.4766 c -23.08362,6.762 -28.14602,7.6813 0,0 z m -34.21289,4.1855 0.0332,0.3926 z m 161.68164,95.4199 c -1.23324,17.6278 0.27471,71.078 1.06457,77.6536 -1.52354,-25.8522 -1.74178,-51.7692 -1.06457,-77.6536 z m -203.44922,36.9532 c 2.4534,21.8942 16.2448,85.2448 5.2895,31.3424 -2.0454,-10.3964 -4.3298,-20.7691 -5.2895,-31.3424 z m 16.1914,86.1894 c 9.4443,35.5088 20.12578,108.7079 14.57909,121.964 6.25365,-41.8368 -7.69199,-81.2991 -14.57909,-121.964 z m 554.75587,80.8457 0.17942,2.7486 z m 0.0156,19.3321 0.16563,3.4343 z m 0.98438,11.6679 0.17942,2.7486 z m -19.1543,9.9395 c -8.0457,17.7609 -77.03664,37.889 -28.1186,14.8025 9.77489,-4.1621 19.15688,-9.1003 28.1186,-14.8025 z m 19.0625,4.9492 0.26285,2.3817 z m -523.1582,0.9727 c 27.46903,6.1014 -5.49067,-0.1497 0,0 z m -1.95313,0.5781 c 26.20236,5.9165 72.54646,27.3115 21.51161,10.0878 -3.54037,-4.6059 -26.35687,-1.7392 -21.51161,-10.0878 z m 236.41211,3.3242 c 5.36957,1.236 -11.07726,0.093 0,0 z m 1.33203,0.9258 c -16.09661,9.2419 -98.80081,24.7638 -34.9551,33.6387 24.5797,2.9453 33.71607,11.2246 6.0918,4.8048 -28.136,0.1152 -57.15541,-20.3835 -11.59185,-27.9647 13.23415,-4.4196 26.96914,-7.254 40.45515,-10.4788 z M -969.2207,1552 c 24.3049,7.1526 2.09485,1.1127 0,0 z m 17.10351,5.1211 c 6.0309,1.6078 1.25549,0.3818 0,0 z m 35.19141,8.5664 c 0.14418,-0 0.47034,0.028 0,0 z m -66.58594,0.3965 c 2.05723,11.2196 -3.10891,26.2098 0.65915,6.0883 z m 67.125,1.3808 c -14.8642,17.553 -83.1427,26.2333 -24.75667,9.4479 8.37677,-2.8252 16.48142,-6.3965 24.75667,-9.4479 z m 370.33789,1.2559 c 2.34713,0.6287 -2.21546,0.7451 0,0 z m -99.13672,0.8789 c 5.56639,1.1544 -11.9301,0.8024 0,0 z m 99.76172,0.6836 c 18.76232,8.0535 80.56469,29.136 26.27753,15.3928 -10.07828,-1.3257 -21.20782,-6.0828 -26.27753,-15.3928 z m -98.77929,0.4238 c -8.23,24.2198 -82.59002,20.3973 -27.98749,10.5148 10.86692,0.3605 19.18913,-5.1035 27.98749,-10.5148 z m 1.70117,0.5235 -0.99454,3.936 z m 107.29101,2.414 c 7.16888,2.8765 10.58149,4.1267 0,0 z m -119.39258,0.4785 c -5.82076,7.7562 -6.62474,-1.9216 0,0 z m 126.31836,1.6504 c 0.66789,0.051 -0.34307,0.049 0,0 z m -427.14648,4.2754 c -23.92051,10.6821 -2.11699,-0.8014 0,0 z m 285.05469,1.1739 c -17.35351,4.6892 -20.26925,3.8412 0,0 z m -91.72071,1.5566 c 1.63018,-0.536 20.11454,6.8153 0,0 z m -58.99414,3.1602 c -2.14795,20.7672 -2.5952,21.1906 0,0 z m -142.74414,2.166 c -0.19893,0.8712 -3.46623,-0.5775 0,0 z m 196.48633,1.2871 c 22.76169,1.0955 15.16137,1.2018 0,0 z m 306.83008,0.2656 0.26285,2.3817 z m 0.0918,6.1113 0.17942,2.7486 z m -162.0918,2.8887 0.26285,2.3817 z m -360.57031,4.9043 c 1.22492,3.4985 -0.0271,0.1888 0,0 z m 198.29296,0.084 c -22.04677,4.8402 -22.10686,4.8184 0,0 z m -169.06445,0.8203 c -23.88999,7.2036 -23.90364,7.1781 0,0 z m 483.94922,2.9355 -2.38134,5.1994 z m -428.84375,4.5704 0.92188,0.066 z m 1.33398,0.01 -0.14648,0.035 z m -78.64648,0.2832 -1.65039,0.078 z m 245.20117,5.0449 c -5.07215,3.1068 -2.61085,4.1911 0,0 z" /><path
          style="fill:#1295cf"
     d="m -403.4043,-95.703125 c -40.49458,12.244182 -61.13718,55.602167 -95.95703,77.664063 -20.75151,24.6702212 -73.21633,20.9346713 -84.68385,38.250189 14.37492,109.256793 2.33874,221.972643 34.49355,328.685833 14.2877,36.13177 3.35501,91.45583 20.30049,117.7645 46.19795,1.22005 92.07417,9.22021 137.6944,14.22606 -9.48157,-78.31113 -59.33426,-153.01767 -42.23216,-234.39776 9.77593,-61.26566 15.436,-123.69301 33.1127,-183.327795 10.43188,-11.412926 -9.56979,50.574445 -9.30875,66.378525 -11.4096,49.05476 6.23965,98.27985 8.51427,147.51303 7.36589,67.45336 15.96986,134.83292 34.98344,200.18595 13.11736,51.95713 27.34464,104.00144 30.19232,157.78397 28.46238,15.14898 88.86011,14.35327 65.30343,-33.52118 -9.63122,-79.69675 -3.32026,-160.97943 -18.79111,-239.91235 -18.01413,-63.59927 -25.16014,-129.29178 -27.22049,-195.20316 -5.5932,-74.793099 0.78207,-154.265229 -31.75043,-223.853668 -12.01517,-18.860928 -32.30748,-34.530639 -54.65078,-38.236207 z m -267.10937,1.275391 c -48.47092,4.499656 -74.89052,53.981072 -119.32515,69.228831 -75.29798,33.6171698 -163.67671,5.133694 -222.18178,-48.210342 -27.3788,-35.189365 -74.1986,-11.832473 -92.6107,19.68529 -32.3503,76.842643 -23.945,162.848055 -30.7404,244.226085 -0.3423,62.521 -14.662,123.29883 -28.3349,183.89923 -13.4506,84.17623 -8.4024,170.02051 -18.6595,254.61036 -3.3532,28.00792 57.2706,12.77219 67.2424,3.23685 1.2808,-65.17449 24.9603,-127.15457 38.3838,-190.41854 22.8172,-88.53043 24.2975,-180.63784 38.3921,-270.64284 -14.1622,-41.42582 -15.2322,-89.657402 4.7028,-129.473493 -0.8971,35.974392 -16.7537,79.476453 0.4243,116.645823 3.5651,18.36231 57.2342,62.18284 12.9903,32.60337 -15.4976,-8.18437 4.2192,48.25603 1.4646,63.3702 8.0806,55.54259 -2.8044,111.59599 -25.3815,162.5682 -7.9572,35.10743 -33.8813,82.17685 -24.3402,111.74189 93.25563,27.94332 192.54921,27.32656 288.97318,22.8548 46.47098,-3.90218 94.31188,-8.01252 137.99575,-24.64141 -7.28433,-67.93103 -43.58657,-128.99736 -54.78209,-196.07141 -7.1905,-47.85459 3.77645,-95.55482 7.06634,-143.19336 -15.51717,16.26114 -38.41966,19.09399 -11.13318,-0.71167 37.27268,-38.71904 26.86462,-96.986541 16.98253,-144.066272 20.61497,29.835079 20.9765,76.731142 10.78326,112.476672 -8.78673,43.91343 10.3273,89.95429 10.43556,134.92614 5.78083,69.1616 18.79052,137.28722 37.4123,204.09778 10.46775,47.21803 25.42545,93.83775 26.32812,142.5586 25.18965,5.32865 83.01546,21.23041 64.6543,-24.5586 -9.23125,-77.37681 -5.02699,-155.80336 -16.46693,-232.86891 -12.99544,-59.73146 -28.53253,-119.27566 -28.63762,-180.89671 -7.14944,-83.78583 0.94388,-171.358261 -30.45554,-251.068291 -12.1584,-21.941541 -37.13249,-37.006922 -61.18215,-41.908273 z m -10.4336,281.027344 c -10.3834,68.92697 -21.08582,142.66665 9.24805,208.37695 13.08318,21.40347 9.53053,65.34256 32.99219,70.70117 -26.00575,-91.07476 -29.19343,-185.78827 -42.24024,-279.07812 z" /><path
          style="fill:#47769e"
     d="m -599.77734,-578.05664 c -53.45588,-0.90453 -100.24858,36.49108 -123.11719,82.85937 14.00141,30.54675 16.56812,50.27743 21.34823,83.14052 4.64696,19.83766 4.19727,69.52995 10.40447,29.3073 3.46924,-4.14432 -7.73512,32.35915 -1.48155,44.15138 3.21668,36.4152 7.85378,73.37041 1.7484,109.75237 14.97892,-25.50087 27.89266,-52.59595 35.96229,-81.08944 -5.46703,12.44518 -13.93516,38.09866 -5.74635,11.57911 4.47701,-19.94113 13.19038,-20.46356 5.51854,0.36494 -2.80865,6.87645 -6.54736,24.68294 -1.34971,7.30164 -1.02476,29.95963 -21.37038,53.05005 -37.23566,75.7407 1.17999,16.17498 -21.06878,31.96267 -10.96942,45.86477 13.34661,-8.04761 35.06827,-18.16482 9.91351,-4.24892 -24.47065,11.96103 22.10913,-8.22123 27.8211,-14.77126 14.14974,-8.18011 45.11186,-61.80918 28.0556,-21.40836 -11.44637,30.74684 -86.93216,35.50721 -49.1242,69.66877 14.86714,2.60988 -8.11199,-1.88955 9.26953,5.14063 30.53912,2.45185 61.7801,7.26555 92.13477,0.96093 -10.57401,2.15384 -40.7013,2.69092 -13.24786,1.30657 15.40966,1.14176 45.32161,-13.53045 50.85772,-12.96589 -13.49456,7.87586 -53.23056,14.70181 -17.74072,8.3937 -31.07636,19.04171 -68.46943,14.00287 -102.26558,5.98106 -9.73999,-1.85072 19.06893,20.6528 16.51949,34.944719 29.47206,18.477644 67.84809,21.632024 98.5486,3.758285 34.51213,-16.160964 67.50182,-48.084384 109.05882,-50.826644 0.92265,-16.65987 -12.36598,-48.06838 -24.22928,-67.39601 -12.57096,-21.45609 -33.79031,-57.24923 -38.72584,-69.80524 -4.32228,-14.54822 -15.49894,-52.15637 -5.26953,-17.72965 5.63458,17.21949 5.33261,20.12475 -1.50538,0.82672 -9.16302,-35.79254 -19.40812,-71.94826 -22.349,-108.95593 16.84541,75.68313 39.09976,152.20049 84.0829,216.51706 35.68895,-53.72746 21.10742,-121.79551 2.74121,-178.9338 -10.22,-33.1957 -20.7966,-66.60034 -33.0677,-98.78927 27.0672,46.97495 36.81802,100.97488 51.32618,152.31309 -5.33208,-68.01127 -5.16579,-141.50867 -43.14964,-201.1754 -26.15891,-41.75823 -76.61355,-63.05456 -124.73675,-61.77782 z m 14.58007,444.07617 c -0.5163,-0.0699 -3.28917,0.70481 0,0 z m -74.07031,-146.67383 c -3.25082,6.29341 -6.72907,24.7332 0,0 z m -207.63867,-295.84961 c -63.47198,2.42931 -119.80423,51.65803 -133.05292,113.43569 -13.05463,53.16818 -15.89073,108.28784 -20.45783,162.65279 -4.285,47.41691 5.5944,99.8288 44.07474,131.56964 41.94222,40.14419 107.35961,40.43132 157.32241,16.15587 57.87879,-24.43116 96.25619,-80.53337 109.46759,-140.62608 9.91173,-23.60022 1.52714,27.11759 -4.10833,35.96791 -28.49759,88.78259 -131.88827,149.59185 -222.53517,121.59151 -25.31172,-3.39176 -49.06923,-40.04288 -65.67704,-37.74058 -17.3319,37.62416 11.39063,78.863109 41.64376,100.282834 13.96215,8.054854 35.57461,26.711288 7.97003,12.205212 -29.13834,-15.251648 -49.49709,-43.630476 -60.47539,-74.090496 -23.7845,0.44546 -57.4,37.569316 -15.7706,40.429415 34.57781,22.874522 64.42453,54.608405 105.66316,66.118434 61.20596,22.1112035 133.01268,8.298094 180.65134,-36.218142 21.81362,-17.517736 46.74568,-41.024297 76.77914,-36.206187 0.68666,-21.4612 -49.72082,-21.22991 -67.18354,-8.96952 -39.13386,24.370742 -73.28721,62.181711 -121.44026,67.746391 0.9672,-7.317065 44.56934,-14.598647 57.33295,-29.704169 31.37399,-22.50754 62.98856,-57.127712 105.15231,-51.637932 41.67823,10.98577 -18.05455,-18.25543 -17.64961,-37.97123 -10.63005,-11.5172 -29.26713,26.82528 -46.69242,31.70219 -16.54657,13.37738 -57.10812,27.31903 -65.18124,24.7985 50.909,-19.9488 106.50919,-51.41951 120.58728,-108.6271 15.3383,-69.38223 -1.29252,-140.51943 -8.57056,-209.86985 -5.62989,-63.1137 -43.09473,-128.01225 -106.64882,-146.8549 -16.54623,-5.24051 -33.93795,-6.51421 -51.20098,-6.1402 z m -6.29102,2.18555 c -9.13496,1.83035 -8.90575,0.568 9e-5,-3.3e-4 z m 16.89063,68.24414 c 62.8805,5.01529 105.17199,65.89909 112.87882,124.45734 5.23252,41.61225 13.33999,-14.41773 10.30346,-29.42078 1.2328,-13.86017 -12.9514,-74.61931 -7.15402,-60.36877 15.71809,33.18978 15.14974,72.26252 10.53443,108.00649 -7.60398,39.32115 -19.62663,77.93635 -33.50529,115.38595 -17.1149,31.39379 -46.65019,57.23266 -80.42185,68.9014 -43.06254,8.45594 -77.09697,-27.67658 -101.73339,-57.77523 -18.0987,-27.42073 -20.50202,-61.52252 -31.57614,-91.99204 -11.16639,-41.57953 -19.9774,-87.38041 -6.06357,-129.13348 1.87208,27.82607 -4.96241,82.39236 7.97736,96.14049 6.38484,-51.85225 27.68256,-107.37302 76.75497,-132.62875 12.92105,-6.86176 27.3329,-11.16311 42.00522,-11.57262 z m 365.70898,140.47852 c 23.28621,37.55298 30.10274,83.54861 31.93377,127.06316 -5.2878,25.19917 -1.72936,-32.68827 -7.27169,-43.16371 -5.35632,-28.71866 -14.63008,-56.52322 -24.66208,-83.89945 z m -524.58204,18.67968 -0.035,1.0625 c 0.061,-1.42542 -0.076,1.88866 0.035,-1.0625 z m -0.3574,3.39454 c -1.5234,17.34036 -3.0897,21.40541 0,0 z m 12.8574,3.30859 c 12.89302,38.09313 20.6222,79.04103 45.92563,111.60787 15.4396,21.76185 34.79559,40.73411 56.86149,55.73588 -52.62374,-20.37975 -82.23858,-75.00527 -97.12631,-126.6964 -3.05271,-13.17946 -6.77151,-27.26685 -5.66081,-40.64735 z m 279.2129,15.29101 c -2.14595,83.00943 -69.44177,164.80163 -154.78999,169.83937 -14.37802,4.93074 -61.397,-10.28449 -53.31593,-13.58946 52.70434,19.78494 113.02559,0.30105 150.16641,-40.29416 30.57424,-30.92013 47.47082,-72.34487 56.7735,-114.1491 l 0.95446,-1.47887 z m 26.92578,19.7168 -0.13671,1.92383 z m 135.6211,23.44141 c 3.83035,10.18504 14.50639,36.89718 15.71717,40.00711 -4.66107,-16.47774 -15.74025,-30.1193 -4.78278,-5.15969 12.0465,22.55778 25.40471,45.92893 47.44061,60.07836 -15.69672,-10.67164 -19.12455,-14.97682 -2.89851,1.7236 11.76767,11.17093 32.02261,21.28831 6.58146,8.67521 -36.45485,-21.70214 -58.43291,-63.79694 -62.05795,-105.32459 z m 42.67969,82.97461 c -0.94791,-1.20633 -0.29647,-0.2514 0,0 z m -0.4668,-0.54688 c 0.12077,-0.25494 -1.46205,-1.44625 0,0 z m -472.21485,-79.24023 c 1.38149,2.76224 -2.32405,0.42209 0,0 z m 287.63086,69.96875 c 0.51479,1.79355 -4.54586,6.71298 0,0 z m 250.84961,14.47656 -0.65429,0.44336 v -0.002 z m -56.96679,38.55469 c 12.86172,0.0304 61.99379,0.4966 24.94051,3.8912 -14.43815,0.92029 -54.87003,7.91881 -52.10111,6.78232 9.25013,-3.02764 18.32439,-6.59261 27.1606,-10.67352 z m -12.61328,0.79297 c -9.2892,3.22239 -12.76111,3.00917 0,0 z m 14.48632,4.10156 c -14.40421,1.5426 -8.41808,2.98189 0,0 z m 41.91993,8.33789 c -13.30792,3.84701 -44.14899,20.30367 -15.65636,5.63088 5.0627,-2.27622 10.28814,-4.20752 15.65636,-5.63088 z m 14.96289,5.51758 c -56.70746,4.56805 -94.64296,67.094767 -154.27145,59.091644 -16.77925,-4.248661 -26.8466,-6.87344 -9.0921,6.987374 7.62204,26.561733 29.47883,23.738598 51.92214,16.491293 -6.5027,7.918385 -55.54903,10.035417 -25.13672,8.482421 -24.39321,-0.544572 4.54098,35.611362 1.34375,53.5683599 55.28601,-4.5265722 100.50838,-42.5277399 140.52017,-77.7317259 17.05913,-13.394739 19.76734,-23.265795 12.17319,-19.629602 5.53877,-2.141833 46.59308,-30.557574 10.77012,-40.149224 -8.56073,-4.81494 -18.3905,-7.41917 -28.2291,-7.11054 z m 31.96093,38.890623 c -14.4775,5.074324 -10.52548,12.659272 0,0 z m -4.56836,5.310547 c -0.85558,3.80197 17.40587,-3.684466 0,0 z m -5.3164,0.740234 c -5.65522,-0.20264 -5.1121,5.572956 0,0 z m -548.02735,-40.697264 c 26.28453,19.5418 52.37472,42.840093 86.85311,45.163518 17.408,4.212803 62.63077,-2.813171 61.46866,0.04208 -51.38426,19.013542 -118.51749,2.463409 -148.32177,-45.205598 z m 549.39063,13.34375 c -49.53578,30.273249 -89.86589,75.212639 -143.10548,99.580874 -18.09859,2.570255 -19.16625,-4.283357 -0.58063,-4.759761 44.5374,-22.018516 81.83627,-55.803077 122.91663,-83.321353 23.14392,-10.80832 5.47081,-4.12994 5.1788,-3.72562 5.01642,-3.14514 9.08698,-8.69596 15.59068,-7.77414 z m -397.80664,16.13476 0.25896,0.31801 z m 153.17773,6.546879 c -4.78285,0.755866 4.78482,0.75641 0,0 z m 70.42774,18.361329 c 6.25191,1.178175 17.21286,-0.251308 0,0 z m -350.92969,19.951171 c 4.03385,-0.02463 -0.31506,1.716287 0,0 z m 429.64844,6.384766 c -13.06545,7.114334 -17.99396,13.416323 0,0 z m -37.11133,26.314453 c -14.13332,2.292326 -19.59303,6.051452 0,0 z"
     sodipodi:nodetypes="cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" /><path
          style="fill:#254d6b"
     d="m -772.97266,1605.4336 c -0.725,0 -1.48546,0.054 -2.10742,0.1738 -1.24391,0.2392 -0.46172,0.4441 1.73828,0.4551 2.19996,0.011 3.21781,-0.1852 2.26172,-0.4355 -0.47804,-0.1251 -1.16758,-0.1898 -1.89258,-0.1934 z m -169.99023,0.01 c -0.54375,-0.01 -1.12484,0.053 -1.61133,0.1796 -0.97297,0.2536 -0.41758,0.4781 1.23242,0.4981 1.65,0.02 2.44461,-0.187 1.76758,-0.4609 -0.33851,-0.1369 -0.84492,-0.2101 -1.38867,-0.2168 z m 10,0 c -0.54375,-0.01 -1.12484,0.053 -1.61133,0.1796 -0.97297,0.2536 -0.41758,0.4781 1.23242,0.4981 1.65,0.02 2.44461,-0.187 1.76758,-0.4609 -0.33851,-0.1369 -0.84492,-0.2101 -1.38867,-0.2168 z m 152,0 c -0.54375,-0.01 -1.12484,0.053 -1.61133,0.1796 -0.97297,0.2536 -0.41758,0.4781 1.23242,0.4981 1.65,0.02 2.44461,-0.187 1.76758,-0.4609 -0.33851,-0.1369 -0.84492,-0.2101 -1.38867,-0.2168 z m -157.37891,5.373 c -15.95313,-4e-4 -20.83123,0.9163 -32.51758,6.1113 -5.21734,2.3193 -5.64779,2.7906 -7.89453,8.67 -4.77042,12.4835 -12.07897,26.5351 -20.14843,38.7343 -10.17956,15.3894 -11.92656,19.2467 -12.56836,27.7657 -0.879,11.6685 2.6187,15.4192 17.96679,19.2617 6.35472,1.591 17.17168,3.2129 29.16211,4.375 7.50479,0.7273 29.9984,-0.3769 38.7461,-1.9024 14.33568,-2.4999 21.55457,-5.3141 26.8789,-10.4804 5.30064,-5.1432 6.86747,-9.3775 6.85547,-18.5352 -0.0141,-10.7806 -3.86168,-53.3431 -5.58398,-61.7734 -0.68712,-3.3634 -4.31065,-5.3732 -16.89649,-9.3692 -8.24012,-2.6162 -10.26648,-2.8571 -24,-2.8574 z m 161,0.031 c -14.75429,0.031 -15.18678,0.095 -26.32617,3.8964 -6.22869,2.1256 -11.91652,4.4576 -12.64062,5.1817 -1.14654,1.1466 -2.10867,6.5392 -4.08008,22.8906 -1.11312,9.2326 -2.45265,30.7442 -2.53125,40.6309 -0.0913,11.4875 1.27934,15.9979 6.23047,20.5058 5.94052,5.4086 20.29706,9.7665 37.10351,11.2637 13.35729,1.1901 19.80268,1.2065 32.74414,0.084 21.86806,-1.8969 35.99628,-5.8156 40.57227,-11.2539 2.4975,-2.9681 2.62805,-3.6348 2.21094,-11.1934 -0.51899,-9.4047 -2.27914,-13.3783 -13.00782,-29.3691 -7.32534,-10.9183 -14.61091,-24.8642 -19.26562,-36.875 -3.14877,-8.125 -4.3396,-8.9886 -18.55664,-13.4532 -6.45717,-2.0277 -9.45886,-2.3355 -22.45313,-2.3085 z m 59.17969,10.5761 c -0.0253,0 -0.0432,0.01 -0.0547,0.014 h -0.002 c -3.8e-4,3e-4 -0.003,0 -0.004,0 h -0.002 v 0 c -0.14307,0.2007 -2.00081,2.8402 -4.12695,5.8652 -1.13601,1.6163 -3.14158,4.039 -5.40235,6.5743 3.67546,8.3962 8.23964,16.6106 16.14258,29.3007 6.77047,10.8717 10.15268,17.2521 11.67774,22.9844 2.43985,0.6531 4.79536,1.1902 7.02343,1.5938 9.26177,1.6776 29.23436,1.9179 39.59766,0.4765 10.69475,-1.4875 19.63742,-4.4353 22.41016,-7.3867 2.31007,-2.459 2.33399,-2.7158 1.71875,-17.7695 -0.53679,-13.1342 -3.11872,-37.5484 -4.07227,-38.502 -0.17188,-0.1719 -4.99085,0.8651 -10.70898,2.3028 -8.23836,2.0713 -13.73532,2.7235 -26.47657,3.1445 -18.43774,0.6093 -27.87752,-0.7782 -40.22265,-5.9121 -3.76498,-1.5657 -6.99161,-2.7205 -7.49805,-2.6934 z m 247.33984,0.084 -7.52734,2.9238 c -12.45101,4.8347 -21.77961,6.1416 -40.01172,5.6055 -13.15263,-0.3867 -17.83937,-0.9526 -26.33594,-3.1797 -5.68478,-1.49 -10.46088,-2.5588 -10.61328,-2.3769 -1.18382,1.4128 -3.87752,25.2864 -4.29883,38.1054 -0.45744,13.9188 -0.31785,15.995 1.18555,17.6563 2.69967,2.983 10.91962,6.0447 20.35938,7.582 12.9709,2.1124 38.30018,1.3488 48.60742,-1.4648 22.92239,-6.257 46.61304,-19.5646 46.58594,-26.168 -0.0209,-5.1017 -4.83437,-12.7586 -13.25,-21.0762 -4.62215,-4.5683 -9.82141,-10.397 -11.55274,-12.955 z m 17.97071,14.7969 h -0.002 -0.002 -0.002 -0.002 -0.002 v 0 h -0.002 -0.002 v 0 h -0.002 c -0.0177,0.081 0.28417,0.4863 0.87696,1.2421 1.30637,1.6657 2.1289,2.1961 2.1289,1.3731 0,-0.2077 -0.7875,-0.9952 -1.75,-1.75 -0.75585,-0.5928 -1.15936,-0.8966 -1.24023,-0.8789 z m 10.39844,33.1172 c -0.30431,0.017 -0.8183,0.4278 -1.5879,1.1816 -3.30823,3.2403 -23.65111,13.9345 -33.32031,17.5156 -21.07012,7.8041 -57.92576,7.8419 -77.75,0.08 l -4.75,-1.8594 v 8.9844 c 0,7.7958 0.2769,9.2633 2.09961,11.086 3.15706,3.1571 9.71323,5.7155 18.51172,7.2226 4.33865,0.7431 13.74573,1.4491 20.9043,1.5703 21.75945,0.3685 33.95919,-3.24 45.2539,-13.3847 3.15184,-2.8309 10.34587,-8.1766 15.98633,-11.8789 10.60811,-6.9631 13.46232,-10.3604 14.72461,-17.5254 0.36716,-2.0841 0.40243,-3.0184 -0.0723,-2.9922 z m -186.40821,16.959 -4.27929,1.8339 c -11.79431,5.0556 -31.90739,7.065 -51.60547,5.1543 -5.06862,-0.4916 -9.76992,-1.1817 -14.27735,-2.1289 0.1247,1.2864 0.17848,2.5986 0.17774,3.9805 -0.004,6.8954 -1.4631,11.0308 -6.12696,14.293 5.00853,2.1569 11.75481,4.2048 17.61133,5.1504 5.77586,0.9326 35.99203,-0.3018 41.5,-1.6953 14.4949,-3.6676 17,-6.3572 17,-18.2579 z m 126.91602,32.0527 c -0.3474,-0.014 -0.74258,0.049 -1.10352,0.1934 -0.79773,0.3193 -0.56142,0.5555 0.60352,0.6035 1.05417,0.043 1.64479,-0.1931 1.3125,-0.5254 -0.16615,-0.1662 -0.46511,-0.2572 -0.8125,-0.2715 z m -457.98047,1.0059 c -0.3474,-0.014 -0.74258,0.049 -1.10352,0.1933 -0.79773,0.3192 -0.56143,0.5555 0.60352,0.6035 1.05416,0.043 1.64479,-0.1932 1.3125,-0.5254 -0.16615,-0.1662 -0.46511,-0.2571 -0.8125,-0.2714 z m 14,0 c -0.3474,-0.014 -0.74258,0.049 -1.10352,0.1933 -0.79773,0.3192 -0.56143,0.5555 0.60352,0.6035 1.05416,0.043 1.64479,-0.1932 1.3125,-0.5254 -0.16615,-0.1662 -0.46511,-0.2571 -0.8125,-0.2714 z m 192,0 c -0.3474,-0.014 -0.74258,0.049 -1.10352,0.1933 -0.79773,0.3192 -0.56143,0.5555 0.60352,0.6035 1.05416,0.043 1.64479,-0.1932 1.3125,-0.5254 -0.16615,-0.1662 -0.46511,-0.2571 -0.8125,-0.2714 z" /><path
          style="display:inline;fill:#eeaf8e"
     d="m -858.77539,-459.30469 c -3.43037,0.0219 -6.78469,0.21799 -10.03516,0.59375 -28.92161,3.34344 -55.71993,15.32935 -74.9375,33.51758 -10.38933,9.83285 -14.6824,15.58035 -16.62695,22.25781 -3.37639,11.59428 -8.43172,39.82364 -8.44922,47.17969 -0.0326,13.69128 8.19464,60.87946 14.42383,82.72656 4.69813,16.47735 7.44273,22.89086 13.7207,32.05664 11.28507,16.47611 42.03062,43.89837 57.63086,51.40235 3.46109,1.66485 9.08609,3.63503 12.5,4.37695 13.33301,2.89756 27.38444,1.25243 39.26367,-4.5957 3.38997,-1.66888 11.06362,-6.70568 17.05274,-11.19336 20.4636,-15.33349 38.69311,-34.91134 44.88281,-48.20313 7.46849,-16.03788 13.71145,-39.00405 18.48438,-68 5.32622,-32.35724 5.67905,-37.436 3.58984,-51.65039 -2.10764,-14.33981 -6.80859,-34.36966 -9.44922,-40.26172 -2.32458,-5.18684 -19.21522,-21.56709 -28.61719,-27.75195 -21.69612,-14.27229 -49.421,-22.60816 -73.43359,-22.45508 z m -63.06641,57.18164 c 11.93048,0.0646 29.97699,3.43391 37.4961,7.00196 3.88405,1.8431 5.91079,6.23316 4.54101,9.83593 -0.48636,1.27924 -1.74578,2.5508 -2.79883,2.82618 -1.83878,0.48085 -4.04105,-0.017 -25.23828,-5.70704 -18.05126,-4.84553 -28.70759,-4.17873 -40.73632,2.55079 -2.87918,1.61076 -5.69168,2.92968 -6.25,2.92968 -4.31168,0 7.28507,-12.02764 16.03906,-16.63476 5.10808,-2.68832 6.16094,-2.86114 16.94726,-2.80274 z m 127.01368,0.0293 c 11.04007,-0.0877 11.78061,0.0408 18,3.12305 6.74472,3.34262 16.98632,12.27927 16.98632,14.82226 0,1.99302 -0.78644,1.8469 -5.95508,-1.10742 -6.54167,-3.73914 -15.29809,-6.42969 -20.92578,-6.42969 -6.75974,0 -17.81175,2.22027 -32.08984,6.44922 -6.5916,1.95232 -12.41079,3.55078 -12.93359,3.55078 -1.94055,0 -5.14274,-5.2805 -4.49219,-7.4082 1.5343,-5.01807 4.73855,-6.73706 19.1289,-10.26758 8.25476,-2.02521 13.45384,-2.66222 22.28126,-2.73242 z m -119.01368,22.9707 c 6.44495,0.0161 10.64847,0.53238 13.07227,1.60547 4.15144,1.83798 10.06817,6.81813 13.00976,10.94922 2.71761,3.81653 1.05497,3.68612 -2.64648,-0.20703 -10.92419,-11.49 -30.16587,-12.70821 -45.48047,-2.88086 -6.08822,3.90681 -7.1106,3.75741 -3.03906,-0.44336 1.82,-1.87776 6.06992,-4.68136 9.44531,-6.23047 5.38003,-2.46912 7.31056,-2.81387 15.63867,-2.79297 z m 112,0 c 7.31342,0.048 10.78295,0.5675 15.07813,2.25782 5.10847,2.01039 14.57936,8.85421 13.60351,9.83007 -0.25157,0.21182 -3.75089,-1.38877 -7.79687,-3.57031 -12.75608,-6.87787 -25.77771,-7.57162 -36.4668,-1.94531 -2.15488,1.13425 -5.60547,3.68345 -7.66797,5.66601 -5.05042,4.85467 -4.79137,2.28268 0.33008,-3.27343 6.49188,-7.04286 11.59719,-9.03915 22.91992,-8.96485 z m -109.6914,5.50391 c 3.49832,-0.0251 5.3048,0.52496 8.92773,2.18359 3.02621,1.38545 7.29432,4.1386 9.48438,6.11719 4.77583,4.31467 9.85229,11.39184 8.87304,12.37109 -0.38661,0.38661 -1.12114,0.0415 -1.63281,-0.76757 -0.61291,-0.96915 -0.93717,-1.0507 -0.94726,-0.23828 -0.0206,1.66301 -8.65874,5.93955 -15.70704,7.77539 -12.95664,3.37478 -26.76316,0.28373 -33.87304,-7.58399 -1.06381,-1.1772 -4.0711,-3.22401 -6.6836,-4.54883 -5.50532,-2.79179 -5.91845,-3.89169 -1.77343,-4.7207 1.63712,-0.32742 4.72811,-1.75502 6.86914,-3.17187 6.19122,-4.09716 14.05193,-6.64489 22.27148,-7.21876 1.67198,-0.11673 3.0253,-0.18889 4.19141,-0.19726 z m 111.1914,0.44922 c 8.67164,-0.0103 14.52723,1.70276 22.5,6.58008 2.475,1.51408 5.7375,3.05921 7.25,3.43554 3.59537,0.89455 3.47351,2.04213 -0.42968,4.06055 -1.74846,0.90416 -5.46096,3.45844 -8.25,5.67578 -2.78903,2.21734 -7.02133,4.90138 -9.4043,5.96485 -5.7115,2.54892 -17.15459,3.19143 -23.73828,1.33203 -2.78978,-0.78791 -7.73978,-2.65704 -11,-4.1543 -3.26022,-1.49726 -6.26524,-2.65241 -6.67774,-2.56641 -1.98826,0.41443 -0.34086,-3.55648 3.26172,-7.85937 4.00627,-4.78505 12.48024,-10.94954 16.41016,-11.9375 1.14275,-0.28728 5.67812,-0.52625 10.07812,-0.53125 z m -74.42382,0.53125 c 0.16355,-0.0163 0.55482,0.27111 1.23242,0.82226 0.92623,0.7534 2.65049,4.3534 3.83203,8 1.83191,5.65386 2.13569,8.8397 2.05469,21.63086 -0.0522,8.25 -0.48112,16.31944 -0.95118,17.9336 -0.47006,1.61416 -1.42673,3.12596 -2.12695,3.35937 -0.98229,0.32743 -1.09823,-0.68447 -0.50391,-4.43359 2.05934,-12.99093 0.42538,-36.18082 -3.23242,-45.85938 -0.36704,-0.97121 -0.50208,-1.43351 -0.30468,-1.45312 z m 32.42968,1.18359 c 0.0359,-0.002 0.0672,0.009 0.0918,0.0332 0.31552,0.31552 -0.1977,3.74741 -1.14063,7.62696 -1.38924,5.71584 -1.63046,10.28441 -1.27148,24.08203 0.24365,9.36493 0.0839,17.02734 -0.35352,17.02734 -1.69588,0 -2.33203,-6.14767 -2.33203,-22.5 0,-15.54456 0.19326,-17.41965 2.26172,-21.90429 1.14697,-2.48675 2.32049,-4.33846 2.74414,-4.36524 z m 39.41016,21.89258 c -0.3474,-0.0143 -0.74258,0.0489 -1.10352,0.19336 -0.79773,0.31922 -0.56143,0.55551 0.60352,0.60352 1.05416,0.0434 1.64479,-0.1931 1.3125,-0.5254 -0.16615,-0.16612 -0.46511,-0.25718 -0.8125,-0.27148 z m -33.2207,42.88672 c 0.65494,0.007 1.87473,0.93311 2.95898,2.58789 2.08111,3.17617 2.34529,11.15571 0.48438,14.63672 -0.74793,1.39907 -2.45643,3.04355 -3.79688,3.65429 -3.01054,1.3717 -4.04872,1.39577 -4.84375,0.10938 -0.34055,-0.55103 0.50621,-1.43048 1.88086,-1.95312 1.37466,-0.52266 3.02687,-1.93542 3.67187,-3.14063 1.18786,-2.21953 0.86652,-10.84697 -0.52734,-14.1543 -0.50368,-1.19514 -0.33752,-1.74573 0.17188,-1.74023 z m -42.60547,0.11523 c 0.712,0.0152 0.475,1.56807 -0.72657,4.62696 -2.18437,5.56086 -1.18204,10.5829 2.68164,13.43945 1.62465,1.20115 2.95508,2.54952 2.95508,2.99609 0,1.9273 -4.40313,0.56367 -7.19531,-2.22851 -2.84685,-2.84685 -3.01175,-3.42233 -2.60547,-9.03906 0.31944,-4.41622 1.00089,-6.56729 2.58789,-8.1543 1.10591,-1.1059 1.87554,-1.64974 2.30274,-1.64063 z m 5.95312,10.41016 c 0.87147,0.004 2.22192,0.19972 3.98242,0.60351 2.46009,0.56425 9.27236,0.86945 15.13672,0.67969 5.86436,-0.18975 10.47892,-0.0484 10.25586,0.3125 -0.22306,0.36092 0.74656,0.94355 2.1543,1.29688 3.62141,0.90891 2.73062,3.76651 -1.58008,5.06445 -1.92062,0.5783 -5.06719,2.05185 -6.99219,3.27539 -4.81822,3.0625 -11.49742,2.99886 -15.5,-0.14844 -1.65,-1.29743 -4.575,-2.69966 -6.5,-3.11523 -1.925,-0.41558 -3.81232,-1.24575 -4.19336,-1.8457 -0.89704,-1.41241 0.97237,-3.65413 3.06446,-3.67383 1.39186,-0.0131 1.41425,-0.14972 0.15625,-0.94531 -1.55533,-0.98362 -1.43682,-1.5102 0.0156,-1.50391 z m 2.18164,32.67969 c 0.92924,-0.002 1.8983,0.11196 3.11133,0.28515 6.06318,0.86554 13.19181,0.86101 20.16406,-0.01 4.63664,-0.57907 5.8218,-0.21854 16.3086,4.94336 6.21975,3.06153 12.40725,5.5664 13.75,5.5664 3.38194,0 3.049,1.44366 -0.86328,3.75196 -1.81681,1.07194 -6.26284,4.71708 -9.88086,8.10156 -3.61802,3.38449 -8.7696,7.13352 -11.44727,8.33203 -3.89265,1.74233 -7.17223,2.24264 -16.36719,2.49023 -16.28579,0.43852 -19.97893,-0.91892 -32.02539,-11.77343 -4.13863,-3.72913 -8.80072,-7.26482 -10.35937,-7.85742 -2.35617,-0.89582 -2.62516,-1.32915 -1.60156,-2.5625 0.67713,-0.81589 2.24154,-1.48243 3.47851,-1.48243 1.23696,0 7.07114,-2.30378 12.96484,-5.11914 7.55343,-3.60819 9.97986,-4.65864 12.76758,-4.66601 z m 543.04883,909.14453 -5.67187,12.34179 c -3.11916,6.78789 -6.60757,16.26885 -7.75391,21.06836 -1.9333,8.09436 -2.03588,10.50102 -1.41406,33.22657 0.60565,22.13418 0.47246,25.61048 -1.38086,36 -2.4504,13.73668 -2.87223,35.52325 -0.74414,38.43359 1.96966,2.69366 6.34061,2.2564 9.70898,-0.9707 4.54768,-4.35696 5.96409,-9.86992 10.00391,-38.96289 l 2.08203,-15 -3.3125,-2.5 c -4.3171,-3.25871 -8.99989,-8.14465 -8.39063,-8.75391 0.26363,-0.26363 2.63925,0.84839 5.2793,2.4707 2.64004,1.6223 7.74221,4.35225 11.33789,6.06641 9.35661,4.46056 11.9587,9.91651 13.89649,29.13867 0.77863,7.72365 0.62238,9.0914 -1.9961,17.44336 -1.5628,4.98473 -2.59862,9.30524 -2.30078,9.59961 1.43318,1.41651 5.74523,-6.64867 9.33789,-17.46484 l 3.98633,-12 -1.37109,-9 c -1.98548,-13.0226 -2.88281,-15.74828 -10.14844,-30.85743 -7.7896,-16.19879 -11.44141,-29.21424 -11.44141,-40.77148 0,-4.32947 0.41362,-7.87109 0.91992,-7.87109 0.98814,0 1.32729,1.40018 3.14649,13 1.73357,11.05373 4.3851,18.93297 11.44531,34 6.66352,14.22046 9.08542,21.85993 10.14649,32.01172 0.35455,3.39216 1.15362,6.36296 1.77539,6.60156 1.05397,0.40444 -2.46816,13.23956 -7.20508,26.2539 -1.87814,5.16003 -8.86644,13.08034 -17.83985,20.22071 -7.04982,5.6097 -8.97891,8.49184 -10.01367,14.96289 l -0.68164,4.25976 3.26953,-0.65429 c 6.58518,-1.31704 26.88337,-15.43306 35.58789,-24.75 4.69941,-5.03003 5.49033,-6.67453 11.35938,-23.61524 3.46946,-10.01442 6.91849,-19.01442 7.66601,-20 1.2429,-1.63873 1.36153,-1.53526 1.39063,1.19922 0.0393,3.6976 -7.27104,28.87928 -10.51172,36.20703 -3.99323,9.0294 -16.00537,19.61211 -35.6875,31.44141 -9.23968,5.55322 -14.83253,6.47695 -16.8125,2.77734 -1.08419,-2.02583 -1.17139,-2.03269 -3.15234,-0.25 -5.48924,4.93988 -10.54303,15.429 -9.3086,19.31836 0.93469,2.94494 4.50832,2.51885 9.55469,-1.13672 2.46628,-1.78657 4.50667,-2.67727 4.71289,-2.05859 0.4044,1.21319 14.86564,-7.24158 25.73828,-15.04883 13.30448,-9.55345 20.51136,-15.84461 22.38086,-19.53516 1.03215,-2.03754 3.77173,-10.00507 6.08594,-17.70507 2.31421,-7.7 6.20994,-18.90236 8.6582,-24.89258 2.44826,-5.99023 4.68552,-12.74023 4.97266,-15 0.3328,-2.61915 -0.74942,-10.45176 -2.98828,-21.60742 -1.93167,-9.625 -5.41981,-30.6762 -7.75,-46.7793 l -4.23633,-29.27734 -6.0625,0.77734 c -9.13502,1.17298 -31.1376,0.63846 -39.16406,-0.95117 z m -798.70504,0.89453 c -0.3815,-0.0236 -0.7987,0.0499 -1.3008,0.1543 -5.4012,1.12309 -20.9561,2.5808 -34.502,3.23437 l -13.7343,0.66406 -0.4024,3.09571 c -1.4033,10.76301 -7.3979,46.21688 -10.7129,63.36718 -4.9783,25.75749 -4.9808,28.49418 -0.057,40.95899 2.1227,5.37356 5.4932,15.00334 7.4902,21.39844 6.5812,21.07505 9.8334,27.63482 17.3067,34.91406 l 6.6289,6.45898 -4.5215,-6.5 c -7.1765,-10.31649 -8.4442,-13.58817 -15.8067,-40.79297 -6.8479,-25.30312 -7.8321,-30.20703 -6.0664,-30.20703 1.469,0 3.7218,6.70424 10.1348,30.17383 3.3535,12.27267 6.9104,24.11732 7.9062,26.32031 3.6745,8.12872 18.7808,28.17662 29.5684,39.24219 6.0496,6.20537 11.7856,11.27844 12.748,11.27344 1.4476,-0.008 1.75,-0.93569 1.75,-5.36133 0,-7.84022 -1.3319,-10.79738 -11.2675,-24.99805 -14.2349,-20.34561 -16.5154,-26.26695 -18.8887,-49.03515 -1.9075,-18.2997 0.6923,-31.19159 8.207,-40.67969 3.5126,-4.43492 3.4541,-5.03204 -1.4238,-14.43555 -1.7118,-3.3 -3.2658,-6.3375 -3.4531,-6.75 -0.9304,-2.04928 2.8082,-0.35727 5.5234,2.5 6.3632,6.69628 9.7816,17.02659 13.3184,40.25 4.2501,27.90746 8.1079,36.5 16.3926,36.5 1.8416,0 2.9921,-0.87357 4.1816,-3.17383 2.2431,-4.33759 1.4506,-23.58904 -1.5566,-37.82617 -2.042,-9.66757 -2.1515,-11.88738 -1.3907,-28 1.6194,-34.29356 0.541,-41.56705 -9.1718,-61.83398 -4.2679,-8.90546 -5.2473,-10.81002 -6.9004,-10.91211 z m 537.39254,0.0449 c -0.22404,0.0103 -0.38213,0.0312 -0.46875,0.0644 -2.15919,0.82856 -12.38308,22.73768 -14.48828,31.04688 -2.33602,9.22023 -2.53623,18.75653 -0.83203,39.5957 1.16249,14.21511 1.12785,14.80673 -1.63867,29.5 -3.29809,17.51643 -3.92791,33.20636 -1.52539,37.99414 1.9972,3.98007 6.22912,4.55879 9.69336,1.32617 5.12645,-4.78368 8.05268,-13.5633 10.27343,-30.82617 1.78462,-13.87258 4.04527,-24.02495 7.15821,-32.14453 2.95123,-7.69781 8.03101,-15.85547 9.87304,-15.85547 1.67183,0 1.13646,2.33542 -2.39258,10.45117 l -3.38476,7.78711 3.92383,5.59961 c 8.12248,11.59523 10.42454,29.24184 6.47851,49.66211 -3.04723,15.76909 -4.52904,19.10357 -16.34375,36.79102 -6.169,9.23543 -11.67964,18.46043 -12.24609,20.5 -1.16755,4.20387 -1.37378,10.54224 -0.375,11.54101 1.78145,1.78146 4.55309,-0.0687 12.85547,-8.58203 12.61168,-12.93211 27.43449,-32.78402 31.35547,-41.99414 0.99674,-2.34128 3.95192,-12.13086 6.56836,-21.75586 6.36104,-23.4001 9.44468,-33 10.59765,-33 1.8065,0 0.94492,4.81242 -4.58594,25.63477 -8.65168,32.57151 -8.77874,32.91681 -16.73242,44.86523 l -3.99414,6 5.54492,-5.37695 c 7.52312,-7.29545 9.52535,-11.36414 18.35743,-37.27344 4.19051,-12.29304 8.53741,-24.97593 9.66015,-28.18554 l 2.04297,-5.83594 -2.17187,-12.66406 c -1.19356,-6.96539 -3.72306,-21.07578 -5.62305,-31.35547 -2.99745,-16.21744 -5.13414,-29.87815 -7.09961,-45.4043 l -0.51953,-4.09766 -13.95508,-0.63476 c -7.67562,-0.34916 -18.73941,-1.34476 -24.58594,-2.21289 -5.1157,-0.75962 -9.85164,-1.23212 -11.41992,-1.16016 z m -593.96094,2.83008 c -0.4531,0 -0.9062,0.0703 -1.25,0.20898 -0.6875,0.27741 -0.125,0.50391 1.25,0.50391 1.375,0 1.9375,-0.2265 1.25,-0.50391 -0.3437,-0.1387 -0.7969,-0.20898 -1.25,-0.20898 z m 571.52539,43.47461 -0.002,0.002 h -0.002 l -0.002,0.002 c -0.12983,0.0772 -0.2207,1.31289 -0.2207,3.39257 0,2.07969 0.0889,3.31345 0.21875,3.39063 l 0.002,0.002 h 0.002 l 0.002,0.002 c 7.5e-4,1.4e-4 0.005,-6e-5 0.006,0 h 0.002 0.002 0.002 0.002 c 0.0534,-0.022 0.11509,-0.23095 0.17774,-0.64453 0.22913,-1.5125 0.22913,-3.9875 0,-5.5 -0.0627,-0.41357 -0.12234,-0.6225 -0.17578,-0.64453 h -0.002 -0.002 l -0.002,-0.002 h -0.002 c -7.5e-4,6e-5 -0.005,-1.4e-4 -0.006,0 z m -246.49609,27.89648 c -2.04029,0 -3.19193,-0.22084 -4.01953,3.70703 1.17609,-0.63858 2.18532,-1.21584 2.89844,-1.66601 1.43629,-0.90669 2.46905,-1.45817 3.11132,-1.68555 -0.57674,-0.26653 -1.23402,-0.35547 -1.99023,-0.35547 z m 2.67578,0.79297 c -0.43621,0.86861 -2.17095,2.72403 -5.14062,5.37305 l -2.19141,1.95508 c -0.42395,4.06988 -0.78538,10.17505 -1.21484,19.33398 3.32782,27.11794 6.19061,36.62886 11.875,39.56836 0.92801,0.47989 1.67668,0.83483 2.31445,1.0625 -0.59702,-10.70134 -1.03759,-20.49649 -1.39844,-30.58594 -0.94434,-26.40433 -1.58834,-34.46334 -4.24414,-36.70703 z m 245.64649,0.0508 c -0.14544,-0.003 -0.24419,0.36238 -0.27344,1.07227 -0.0434,1.05416 0.19309,1.64479 0.52539,1.3125 0.33225,-0.33229 0.36699,-1.19414 0.0781,-1.91602 -0.12469,-0.31161 -0.23685,-0.46653 -0.33007,-0.46875 z m 40.13476,34.49414 c -0.15051,-10e-4 -0.25586,0.79356 -0.25586,2.16211 0,1.925 0.20747,2.7125 0.45899,1.75 0.25153,-0.9625 0.25153,-2.5375 0,-3.5 -0.0727,-0.27822 -0.14193,-0.41154 -0.20313,-0.41211 z m -1.89648,22.57422 c -0.10316,0.002 -0.28431,0.20277 -0.54493,0.58789 -0.55828,0.825 -1.02324,2.36185 -1.03124,3.41602 -0.0204,2.55844 0.55253,1.76091 1.375,-1.91602 0.31777,-1.42067 0.39144,-2.09137 0.20117,-2.08789 z m -572.20705,0.58789 c -0.2116,0.0206 -0.3828,0.68789 -0.3828,1.5 0,0.825 0.436,1.5 0.9688,1.5 0.5327,0 0.7091,-0.675 0.3925,-1.5 -0.3166,-0.825 -0.7526,-1.5 -0.9687,-1.5 0,0 -0.01,-3.2e-4 -0.01,0 z m 0.6563,3.5 0.5664,3.96485 c 0.9032,6.32969 2.8746,9.0184 10.9316,14.90234 7.3488,5.36679 10.4629,6.20797 10.4629,2.82617 0,-0.87589 -4.4821,-5.93898 -9.959,-11.25 -5.477,-5.31102 -9.524,-8.84559 -8.9941,-7.85547 0.5299,0.99013 1.4376,2.09275 2.0176,2.45118 0.6608,0.40843 0.3784,1.15028 -0.7559,1.98632 -1.6417,1.21007 -1.9233,0.94597 -3.0391,-2.8457 z m 567.7109,2.10743 c 1.55978,-1.82751 -3.12651,2.42629 -14.91992,13.54687 -3.08036,2.90462 -3.82799,4.29107 -3.64062,6.75 0.12969,1.70201 0.28309,3.0957 0.34179,3.0957 1.18084,0 10.87062,-8.4992 10.63477,-9.32812 -0.18334,-0.64434 0.0138,-0.82604 0.4375,-0.40235 0.81457,0.81457 8.39648,-6.03364 8.39648,-7.58398 0,-0.49931 -0.88509,0.15469 -1.96679,1.45312 -1.0817,1.29838 -1.9817,1.88805 -2,1.31055 -0.0183,-0.5775 0.52929,-1.64376 1.21679,-2.37109 1.03506,-1.09502 0.82011,-1.10458 -1.25,-0.0547 -2.43991,1.23744 -2.45794,1.21977 -0.75,-0.70703 0.9625,-1.08584 1.75,-2.35302 1.75,-2.81641 0,-0.46338 0.7875,-1.76487 1.75,-2.89257 z m 1.60157,1.73632 c -0.14544,-0.003 -0.24419,0.36238 -0.27344,1.07227 -0.0434,1.05416 0.19309,1.64479 0.52539,1.3125 0.33225,-0.33229 0.36699,-1.19414 0.0781,-1.91602 -0.12469,-0.31161 -0.23685,-0.46653 -0.33007,-0.46875 z m -563.12307,2.70703 c 0.093,-0.0177 0.529,0.3898 1.3496,1.17579 0.9912,0.94941 1.5873,1.94004 1.3242,2.20312 -0.2631,0.26308 -1.0745,-0.51407 -1.8027,-1.72656 -0.6127,-1.02025 -0.9247,-1.5497 -0.8867,-1.63867 v -0.002 -0.002 -0.002 -0.002 -0.002 0 -0.002 c 6e-4,-2.6e-4 0.01,-0.002 0.01,-0.002 z m -2.1972,2.94922 c 0.5328,0 0.9687,0.675 0.9687,1.5 0,0.825 -0.1783,1.5 -0.3945,1.5 -0.2161,0 -0.6522,-0.675 -0.9688,-1.5 -0.3166,-0.825 -0.1381,-1.5 0.3946,-1.5 z m 555.81245,1.47657 c 0.0779,4.7e-4 0.1522,0.0217 0.22461,0.0664 0.46345,0.28643 0.58912,1.18089 0.2793,1.98828 -0.84693,2.20705 -2.23845,1.76653 -1.64063,-0.51953 0.24135,-0.92291 0.71603,-1.53771 1.13672,-1.53515 z m -4.10156,4.5371 c 0.41879,-0.0148 0.0192,0.51101 -1.24219,1.98633 -1.89668,2.21829 -1.9031,2.30318 -0.10937,1.64649 1.62784,-0.59595 1.70944,-0.47443 0.58789,0.87695 -0.93739,1.12949 -1.50362,1.24492 -2.01953,0.41016 -0.52496,-0.84939 -0.83568,-0.80739 -1.15625,0.15429 -0.2998,0.89941 -0.65158,0.96702 -1.11524,0.2168 -0.37254,-0.60278 0.0242,-1.36461 0.88086,-1.69336 0.85674,-0.32875 1.27787,-1.05158 0.93555,-1.60547 -0.34232,-0.55388 -0.40896,-1.00586 -0.14649,-1.00586 0.26248,0 1.30307,-0.30166 2.31055,-0.66992 0.52516,-0.19196 0.88386,-0.30968 1.07422,-0.31641 z m 10.67773,2.62891 -7.52148,6.09766 c -8.27233,6.70684 -11.25907,9.71888 -8.64258,8.71484 0.84717,-0.32509 1.85334,-0.0872 2.23438,0.5293 1.21096,1.95937 2.76199,0.58002 8.41406,-7.47852 z m -546.91992,2.68945 c 0.7207,0 1.0783,0.60065 0.7969,1.33399 -0.2814,0.73333 -0.6395,1.33398 -0.7969,1.33398 -0.1573,0 -0.5174,-0.60065 -0.7988,-1.33398 -0.2814,-0.73334 0.079,-1.33399 0.7988,-1.33399 z m -12.3965,0.875 c -0.6827,-0.005 0.9986,2.36861 4.75,7.54297 2.4922,3.4375 4.6952,6.25 4.8965,6.25 0.2014,0 0.088,-0.45 -0.252,-1 -0.3398,-0.55 -0.1409,-1 0.4415,-1 0.5825,0 1.0585,-0.47613 1.0585,-1.05859 0,-0.58246 -0.5624,-0.74167 -1.25,-0.35352 -0.4316,0.24376 -0.6737,0.35185 -0.7285,0.31055 v -0.002 c -7e-4,-9.1e-4 0,-0.005 0,-0.006 -0.034,-0.0735 0.1904,-0.3602 0.6719,-0.88086 0.9593,-1.03758 1.4969,-0.96992 2.8203,0.35351 1.6332,1.63317 2.4941,2.04133 2.4941,1.18165 0,-0.25029 -3.6739,-3.25187 -8.1641,-6.66993 -3.9768,-3.02732 -6.1667,-4.66399 -6.7324,-4.66797 z m 269.19533,1.37891 c -0.27209,4.07251 -0.54071,7.72957 -0.78125,10.58594 -0.0371,0.44038 -0.0745,0.88034 -0.11133,1.31836 4.00682,1.56545 4.72286,0.40067 3.90235,-4.99414 -0.42445,-2.79071 -1.02147,-4.59203 -3.00977,-6.91016 z m -249.85543,5.73242 c -0.062,-5.6e-4 -0.1189,0.0231 -0.168,0.0723 -0.2622,0.26213 -0.1809,0.95638 0.1816,1.54297 0.9862,1.59546 1.563,1.28554 0.8868,-0.47657 -0.2647,-0.68958 -0.6315,-1.13621 -0.9004,-1.13867 z m 257.56637,7.34961 c -0.042,-0.001 -0.0831,6.7e-4 -0.12305,0.004 -0.58114,0.0471 -0.9452,0.57157 -1.08789,1.57617 -0.35684,2.51239 -3.35424,2.99421 -7.75781,1.60742 -0.32075,3.82806 -0.63337,7.56378 -0.93555,11.21289 2.6431,1.47316 4.63092,2.39424 5.54102,2.49414 1.2204,0.13397 4.15846,1.61756 6.52734,3.29493 11.35642,8.0412 14.33344,-0.61159 4.67383,-13.58204 -3.24633,-4.359 -5.53562,-6.56791 -6.83789,-6.60742 z m 552.4707,12.15039 -6.5,3.64453 c -3.575,2.00355 -9.7625,5.2911 -13.75,7.30664 -7.40626,3.74359 -8.98261,6.09356 -6.05078,9.0254 0.66,0.65999 1.71713,1.20117 2.34961,1.20117 1.97345,0 8.64573,-5.46651 16.45117,-13.47852 z m -300.05859,2.63867 c -0.1572,0.0351 -0.26563,0.59766 -0.26563,1.54297 0,1.375 0.22845,1.9375 0.50586,1.25 0.27741,-0.6875 0.27741,-1.8125 0,-2.5 -0.0867,-0.21484 -0.16878,-0.30891 -0.24023,-0.29297 z m -262.74805,4.85743 c -0.14911,1.81243 -0.29693,3.604 -0.44141,5.37304 2.98461,2.68227 5.68616,5.01336 7.09766,6.0586 3.56066,2.63674 6.19179,2.88613 7.04297,0.66797 1.4542,-3.78956 0.58467,-5.18141 -4.64258,-7.42969 -1.95865,-0.84244 -5.48701,-2.67393 -9.05664,-4.66992 z" /><path
     style="display:inline;fill:#fdfdfd"
     d="m -922.34265,-349.02015 c -8.70975,-2.89597 -13.97344,-6.96923 -13.32917,-10.31467 0.3616,-1.87762 7.23335,-6.30654 9.82917,-6.33501 1.103,-0.0121 1.5,1.12001 1.5,4.27753 0,5.40613 2.56408,9.41702 7.2797,11.38734 4.75156,1.98532 10.06038,0.48588 13.73303,-3.87881 2.16548,-2.57354 2.59622,-3.96476 2.31649,-7.48194 -0.189,-2.37631 -0.19647,-4.32057 -0.0166,-4.32057 0.84273,0 8.90302,6.00676 10.62054,7.91473 2.57963,2.86569 1.13379,4.2481 -7.43316,7.10704 -8.09189,2.7004 -19.10155,3.43934 -24.5,1.64436 z m 108.82405,-0.5952 c -10.24867,-2.77496 -13.61306,-4.66239 -12.38873,-6.95008 0.99594,-1.86093 6.01861,-5.99176 9.56468,-7.86635 1.86897,-0.98801 2,-0.74303 2,3.73913 0,7.98705 6.72509,13.09994 14.48295,11.01096 5.7894,-1.55892 8.25214,-5.24061 7.84596,-11.72936 -0.36822,-5.8823 -0.15474,-5.94778 7.23799,-2.22001 6.03681,3.04406 6.69353,4.54163 3.46798,7.90837 -6.63217,6.92249 -19.90545,9.43917 -32.21083,6.10734 z m -95.79143,-12.01814 c -0.87924,-1.42264 0.24198,-3.05279 2.09972,-3.05279 0.87615,0 1.37805,0.70256 1.19098,1.66713 -0.38952,2.00847 -2.38617,2.84922 -3.2907,1.38566 z m 110.15488,0.30138 c -1.41552,-1.41552 -0.61453,-3.35417 1.38582,-3.35417 1.39796,0 1.96801,0.54305 1.75,1.66713 -0.35694,1.84048 -2.064,2.75886 -3.13582,1.68704 z"
          sodipodi:nodetypes="ssssssssssssssssssssssssssss" /><path
          style="display:inline;fill:#c88f76"
     d="m -873.17773,-296.25 c -0.2745,-0.005 -0.45139,0.0178 -0.50586,0.0723 -0.70085,0.70085 2.47963,3.32317 4.4414,3.66211 0.24747,0.0428 0.55702,0.16162 0.90039,0.33007 1.10636,0.54276 2.59575,1.65682 3.75,2.85547 1.5125,1.57066 2.75,2.49199 2.75,2.04883 0,-0.44317 0.53922,-0.26547 1.19922,0.39453 0.66,0.66 2.14578,1.19922 3.30078,1.19922 1.155,0 2.63883,-0.53922 3.29883,-1.19922 0.66,-0.66 1.20117,-0.83845 1.20117,-0.39648 0,0.44198 1.58908,-0.59185 3.53321,-2.29883 1.94414,-1.70697 3.92251,-3.10547 4.39453,-3.10547 0.47201,0 1.07551,-0.56584 1.34179,-1.25977 0.37592,-0.97967 -1.89103,-1.18491 -10.14257,-0.91796 -5.84494,0.1891 -12.64148,-0.11935 -15.10157,-0.6836 -1.84506,-0.42319 -3.53785,-0.68694 -4.36132,-0.70117 z m 4.83593,4.06445 1.9043,2.25 c 1.04774,1.2375 2.06024,2.25 2.25,2.25 0.80025,0 0.21014,-0.80548 -1.9043,-2.5957 z m 25.62696,-1.48633 c -1.09459,0.01 -0.80831,0.4694 0.87304,1.40235 3.30982,1.83656 3.46027,1.84351 2,0.084 -0.68469,-0.825 -1.97788,-1.49432 -2.87304,-1.48633 z m -22.62696,33.01563 c -0.53238,0 -0.33931,0.41019 0.42188,0.91992 -4.30436,-1.25047 -6.02926,-1.04729 -9.42188,0.56836 -1.51193,0.72005 -2.23916,1.07729 -2.24218,1.24219 -0.003,0.15013 0.59507,0.14031 1.74218,0.10156 1.65109,-0.0558 2.79572,-0.0528 3.53907,0.0352 -0.74937,-0.0843 -1.90083,-0.0647 -3.53907,0.0371 -1.19717,0.0744 -1.74964,0.0415 -1.74218,-0.17383 0.005,-0.14415 0.26123,-0.37114 0.74218,-0.70117 0.825,-0.56612 1.05,-1.0293 0.5,-1.0293 -1.35182,0 -4.26442,1.92658 -3,1.98437 0.28149,0.0129 0.32945,0.14603 0.17969,0.34766 -0.004,-0.0147 -0.0136,-0.0272 -0.0254,-0.0391 -0.3229,-0.32291 -2.01692,0.30902 -3.67383,1.15234 -0.051,-0.0223 -0.0999,-0.0486 -0.14453,-0.0762 -0.69077,-0.42691 -0.84391,-0.29419 -0.45898,0.39258 -0.45144,0.24533 -0.88652,0.50003 -1.27539,0.74805 -0.87807,-0.18294 -1.97702,-0.14103 -2.68555,0.13086 -1.27522,0.48934 -1.32393,0.77235 -0.25,1.45312 0.17977,0.11396 0.34399,0.21661 0.49414,0.30664 -0.26196,-0.0249 -0.57014,-0.0782 -0.91016,-0.16016 -1.60761,-0.38758 -1.96081,-0.22733 -1.23437,0.56055 0.50172,0.54415 4.41103,1.04262 9.97461,1.30859 -0.61579,0.0265 -1.20613,0.0728 -1.72266,0.13672 -0.51955,0.0643 -0.78739,0.1249 -0.82422,0.17969 v 0.002 l -0.002,0.002 v 0.002 c -1.6e-4,7.3e-4 -0.002,0.005 -0.002,0.006 v 0.002 0.002 0.002 l 0.002,0.002 v 0.002 l 0.002,0.002 c 0.0852,0.12082 1.36524,0.20695 3.55664,0.21094 2.35745,0.004 3.78031,-0.0887 3.85352,-0.22461 l 0.002,-0.002 v -0.002 -0.002 l 0.002,-0.002 v -0.002 c -8e-5,-7.5e-4 -0.002,-0.005 -0.002,-0.006 v -0.002 -0.002 c -0.0252,-0.0474 -0.20754,-0.10146 -0.56055,-0.15625 2.36844,0.0568 5.02148,0.0913 7.82813,0.10546 -0.47971,0.25078 0.0977,0.44727 1.37695,0.44727 1.26633,0 1.84239,-0.19232 1.38868,-0.43945 5.11422,0.003 10.56925,-0.0556 15.62695,-0.15821 -0.1001,0.0104 -0.19614,0.0216 -0.28906,0.0332 -0.44381,0.0552 -0.67084,0.10868 -0.70118,0.15625 v 0.002 l -0.002,0.002 v 0.002 0.002 l -0.002,0.002 c 10e-5,7.3e-4 0.002,0.005 0.002,0.006 v 0.002 l 0.002,0.002 v 0.002 l 0.002,0.002 c 0.11978,0.12841 1.76562,0.21766 4.47265,0.21485 2.55664,-0.003 4.05472,-0.0839 4.16602,-0.20117 l 0.002,-0.002 0.002,-0.002 0.002,-0.002 c 2.7e-4,-7e-4 -1.7e-4,-0.005 0,-0.006 l 0.002,-0.002 v -0.002 -0.002 l -0.002,-0.002 v -0.002 l -0.002,-0.002 c -0.0376,-0.0532 -0.34362,-0.11516 -0.94335,-0.17774 -0.61744,-0.0644 -1.32895,-0.10924 -2.07227,-0.13476 6.7869,-0.18606 12.27691,-0.45637 14.29102,-0.76758 0.61859,-0.0956 1.12478,-0.17414 1.5,-0.25586 -0.16201,0.0656 -0.3115,0.12421 -0.44532,0.17383 -0.88056,0.32649 -0.40897,0.58846 1.14258,0.63477 1.50242,0.0449 2.89431,-0.57753 3.22656,-1.44336 0.45129,-1.17602 0.19123,-1.3204 -1.14257,-0.63477 -0.58071,0.29851 -1.34884,0.65719 -2.04688,0.96094 0.13488,-0.25654 -0.52582,-0.64404 -2.2168,-1.39453 0.0931,0.0206 0.18969,0.0456 0.28711,0.0723 0.9596,0.26235 1.46293,0.37858 1.54492,0.31641 0.002,-0.002 0.006,-0.007 0.008,-0.01 l 0.002,-0.002 c 0.0277,-0.0824 -0.33657,-0.33796 -1.0625,-0.79297 -0.96221,-0.60311 -2.22013,-0.80573 -2.80273,-0.45508 -0.41714,-0.17687 -0.86806,-0.36744 -1.35352,-0.57226 0.43544,-0.046 0.19185,-0.4622 -0.58594,-0.96485 -0.825,-0.53316 -1.95,-0.9707 -2.5,-0.9707 -0.4409,0 -0.38494,0.28014 0.0801,0.66602 -0.77507,-0.32587 -1.41919,-0.5941 -1.95508,-0.81055 0.005,-0.0877 0.0302,-0.17187 0.0781,-0.25195 0.30951,-0.5167 -0.007,-0.4908 -0.71289,0.002 -0.88868,-0.34398 -1.38345,-0.49236 -1.65821,-0.48828 -0.15506,-1.39862 -2.13764,-2.67485 -3.14257,-1.66992 -0.0209,0.0209 -0.0379,0.0403 -0.0527,0.0605 -2.04646,-0.43529 -5.52746,-0.13055 -9.1582,0.96875 -1.44226,0.43668 -2.55331,0.75935 -3.49219,0.96875 -0.034,-0.0411 -0.10637,-0.0854 -0.21875,-0.13086 -0.67703,-0.27397 -2.02703,-0.29065 -3,-0.0371 -0.57247,0.14918 -0.6157,0.28756 -0.21875,0.38086 -0.91663,-0.12719 -1.91415,-0.40652 -3.25586,-0.83593 0.057,-0.16464 -0.22569,-0.48496 -0.79297,-0.85157 -0.825,-0.53316 -1.95,-0.9707 -2.5,-0.9707 z m 23.01563,2.36523 c 0.0714,0.009 0.14505,0.0288 0.22265,0.0586 -0.0776,-0.0298 -0.15129,-0.0496 -0.22265,-0.0586 z m -28.20117,0.67969 c 0.41576,0.17947 0.44571,0.46596 0.20507,0.89063 0.23524,-0.41942 0.19332,-0.71116 -0.20507,-0.89063 z m 30.74218,0.29492 c 0.0755,0.21835 0.21998,0.37173 0.39844,0.42579 -0.53688,0.35593 -0.60948,0.22222 -0.39844,-0.42579 z m 4.27344,1.28321 c 0.69802,0.26044 1.41276,0.55629 2.06641,0.85547 -0.70678,-0.20094 -1.43813,-0.50595 -2.06641,-0.85547 z m -46.54687,0.89648 c 0.13168,0.3796 -0.0589,0.47874 -0.60743,0.32617 0.1792,-0.10501 0.38131,-0.21354 0.60743,-0.32617 z m 11.75195,0.24219 c 0.0655,0.14347 0.14407,0.28214 0.23437,0.41406 -0.0903,-0.13196 -0.16888,-0.27055 -0.23437,-0.41406 z m -14.5957,0.20898 c 0.13617,0 0.26686,0.0252 0.38672,0.0723 -0.57479,0.43428 -0.90391,0.80275 -0.78321,0.99805 -0.0142,-0.0235 -0.0279,-0.0459 -0.043,-0.0703 -0.33992,-0.55 -0.143,-1 0.43946,-1 z m 54.01757,1.07227 c 0.0273,0.0463 0.043,0.0884 0.043,0.12695 0,0.38175 -2.16696,0.70335 -5.03711,0.78125 2.82666,-0.0802 4.69714,-0.41716 4.99414,-0.9082 z m -58.95703,0.0273 c -0.36666,0 -0.7345,0.23256 -1.20117,0.69922 -0.93333,0.93333 -0.6655,1.20117 1.20117,1.20117 1.86667,0 2.13255,-0.26784 1.19922,-1.20117 -0.46666,-0.46666 -0.83255,-0.69922 -1.19922,-0.69922 z m 8.39649,0.6836 c 1.27133,0.12189 2.92471,0.18071 5.10351,0.12304 -2.21522,0.0586 -3.88548,0.01 -5.10351,-0.12304 z m 24.60351,2.33789 c -0.63437,0 -1.26875,0.0637 -1.75,0.18945 -0.9625,0.25152 -0.175,0.45703 1.75,0.45703 1.925,0 2.7125,-0.20551 1.75,-0.45703 -0.48125,-0.12577 -1.11562,-0.18945 -1.75,-0.18945 z m 30.75586,2.08984 c -5.65254,-0.10629 -6.55198,0.12599 -2.75586,0.85352 -2.52052,-0.25031 -5.98659,-0.45859 -9.5,-0.54493 -5.07416,-0.1247 -7.52306,-0.15329 -7.67187,-0.0547 l -0.002,0.002 -0.002,0.002 -0.002,0.002 v 0.002 0.002 0.002 c 10e-4,0.002 0.004,0.006 0.006,0.008 0.11963,0.0827 1.38466,0.23404 3.67187,0.46094 2.79727,0.27749 4.51149,0.56459 4.60742,0.74218 4.3e-4,9.5e-4 0.002,0.005 0.002,0.006 l 0.002,0.002 c 1.4e-4,9.2e-4 -4e-5,0.005 0,0.006 -5e-5,9.2e-4 1.4e-4,0.005 0,0.006 -2.4e-4,9.1e-4 -0.002,0.005 -0.002,0.006 v 0.002 c -0.0309,0.0521 -0.2291,0.0944 -0.60938,0.11914 -0.18723,0.0122 -0.37963,0.0312 -0.57422,0.0547 -0.64435,-0.24739 -7.00014,-0.48095 -16.3125,-0.61132 -0.893,-0.19524 -2.362,-0.21126 -3.50976,-0.043 -1.86596,-0.0194 -3.8224,-0.036 -5.85352,-0.0469 -16.0875,-0.0863 -29.25,-0.0158 -29.25,0.1543 0,0.17014 1.23363,1.39904 2.74219,2.73242 1.09251,0.96563 1.67123,1.43735 1.76953,1.42383 l 0.002,-0.002 h 0.002 0.002 l 0.002,-0.002 0.002,-0.002 h 0.002 v -0.002 l 0.002,-0.002 v -0.002 -0.002 c 0.0115,-0.075 -0.25834,-0.43647 -0.79492,-1.07617 l -0.54492,-0.65039 c 0.84244,0.79723 2.38815,2.11122 4.03906,3.41796 2.28022,1.80485 3.81592,2.74225 3.44922,2.10938 0.41059,0.27767 0.99124,0.60197 1.69336,0.95117 -0.13506,0.33644 0.12489,0.4634 0.64258,0.31055 2.70371,1.27471 6.73635,2.79474 9.99023,3.68164 -0.0121,0.005 -0.0238,0.009 -0.0371,0.0137 -0.31031,0.0999 -0.48677,0.16588 -0.51953,0.19727 l -0.002,0.002 -0.002,0.002 -0.002,0.002 v 0.002 0.002 0.002 h 0.002 v 0.002 h 0.002 l 0.002,0.002 c 0.048,0.0192 0.34963,-0.0221 0.92188,-0.12891 0.35227,0.0925 0.69491,0.17689 1.02344,0.25196 1.11355,0.25443 2.28579,0.46103 3.5039,0.62304 -0.40819,0.12875 -0.60145,0.22179 -0.59766,0.2793 v 0.002 0.002 0.002 c 0.0428,0.10451 0.82219,0.0767 2.22461,-0.0977 11.13023,1.08968 25.23932,-1.307 31.57422,-5.74414 l 1.55274,-1.08593 c 0.2223,0.13434 0.35351,0.30556 0.35351,0.50195 0,0.51582 -0.50274,0.82695 -1.11718,0.68945 -0.61444,-0.1375 -1.25119,0.54253 -1.41407,1.51172 -0.15387,0.91568 1.28296,0.0246 3.72461,-2.26172 0.316,0.047 1.00139,-0.56329 1.9336,-1.75195 0.18013,-0.22969 0.33333,-0.42633 0.45898,-0.5918 3.12323,-3.13053 3.75103,-3.98554 2.92578,-4.58203 0.75258,0.31845 1.14107,0.67684 0.95703,0.97461 -0.97682,1.58052 0.11387,1.06774 1.88086,-0.88476 1.59409,-1.76146 1.40957,-1.84024 -4.59375,-1.95313 z m -55.21484,1.92773 c 0.0173,-2.9e-4 0.0316,2.9e-4 0.0488,0 -5.4315,0.0916 -9.74584,0.47285 -10.03321,0.86915 l -0.58007,-0.69141 z m -1.88086,6.2754 c 0.17381,-2.8e-4 0.43317,0.0676 0.78125,0.20117 0.38231,0.14671 0.68439,0.36115 0.87305,0.59765 -0.85981,-0.29274 -1.52564,-0.49909 -1.91797,-0.59375 0.002,-0.13629 0.0899,-0.2048 0.26367,-0.20507 z"
     sodipodi:nodetypes="ssssssssssssssssccsccssssscssscssssscscsccsscsscscccccccccccccccccccccccsccsccccccccccscsccccccccccscscssssccscccsccssccsccscscssccssccccccccccccccccccsccsscsccssssscccsssssscsccccccccssccssccscccssscccccccccccccsccccsscccccccccccscsccccccssscsccssscccccssccs" /></g>
    
    <g
   id="svg-part-kepala"
   class="cursor-pointer"
   style="${isBActive('Kepala') ? activeGlow : normalTransition}"
   onclick="changeBadan('Kepala')"
   onmouseenter="hoverPart('Kepala', activeBadan)"
   onmouseleave="unhoverPart('Kepala', activeBadan)">
                
            <circle
   cx="212.19366"
   cy="69.675896"
   r="14.431149"
   fill="#ed2939"
   id="circle3"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="kepala" /></g>
            <g
   id="svg-part-payudara"
   class="cursor-pointer"
   style="${isBActive('Payudara') ? activeGlow : normalTransition}"
   onclick="changeBadan('Payudara')"
   onmouseenter="hoverPart('Payudara', activeBadan)"
   onmouseleave="unhoverPart('Payudara', activeBadan)">
                
            <circle
   cx="157.62512"
   cy="229.48203"
   r="14.431149"
   fill="#ed2939"
   id="circle94"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="payudara" /></g>
            <g
   id="svg-part-perut"
   class="cursor-pointer"
   style="${isBActive('Perut') ? activeGlow : normalTransition}"
   onclick="changeBadan('Perut')"
   onmouseenter="hoverPart('Perut', activeBadan)"
   onmouseleave="unhoverPart('Perut', activeBadan)">
                
            <circle
   cx="157.62512"
   cy="309.48203"
   r="14.431149"
   fill="#ed2939"
   id="circle99"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="perut" /></g>
            <g
   id="svg-part-punggung"
   class="cursor-pointer"
   style="${isBActive('Punggung') ? activeGlow : normalTransition}"
   onclick="changeBadan('Punggung')"
   onmouseenter="hoverPart('Punggung', activeBadan)"
   onmouseleave="unhoverPart('Punggung', activeBadan)">
                
            <circle
   cx="274.41907"
   cy="213.92567"
   r="14.431149"
   fill="#ed2939"
   id="circle95"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="punggung" /></g>
            <g
   id="svg-part-tangan"
   class="cursor-pointer"
   style="${isBActive('Tangan') ? activeGlow : normalTransition}"
   onclick="changeBadan('Tangan')"
   onmouseenter="hoverPart('Tangan', activeBadan)"
   onmouseleave="unhoverPart('Tangan', activeBadan)">
                
                
            <circle
   cx="251.08455"
   cy="424.64349"
   r="14.431149"
   fill="#ed2939"
   id="circle96"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="tangan" /></g>
            <g
   id="svg-part-tungkai"
   class="cursor-pointer"
   style="${isBActive('Tungkai') ? activeGlow : normalTransition}"
   onclick="changeBadan('Tungkai')"
   onmouseenter="hoverPart('Tungkai', activeBadan)"
   onmouseleave="unhoverPart('Tungkai', activeBadan)">
                
                
            <circle
   cx="120.77336"
   cy="488.1004"
   fill="#ed2939"
   id="circle100"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="tungkai"
   r="14.431149" /></g>
            <g
   id="svg-part-lutut"
   class="cursor-pointer"
   style="${isBActive('Lutut') ? activeGlow : normalTransition}"
   onclick="changeBadan('Lutut')"
   onmouseenter="hoverPart('Lutut', activeBadan)"
   onmouseleave="unhoverPart('Lutut', activeBadan)">
                
                
            <circle
   cx="190.27336"
   cy="569.6004"
   fill="#ed2939"
   id="circle97"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="lutut"
   r="14.431149" /></g>
            <g
   id="svg-part-kaki"
   class="cursor-pointer"
   style="${isBActive('Kaki') ? activeGlow : normalTransition}"
   onclick="changeBadan('Kaki')"
   onmouseenter="hoverPart('Kaki', activeBadan)"
   onmouseleave="unhoverPart('Kaki', activeBadan)">
                
                
            <circle
   cx="185.32361"
   cy="725.16388"
   r="14.431149"
   fill="#ed2939"
   id="circle98"
   style="fill:#ffcc00;stroke:#f800d4;stroke-width:6.96607;stroke-dasharray:none;stroke-opacity:1"
   inkscape:label="kaki" /></g>
    
    </svg>
`;

    return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col transition-colors w-full">
            <div class="bg-[#1b242d] dark:bg-[#fde401] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
                ${t('widget_badan')}
            </div>

            <!-- Baris 1: Kiri (Kepala) & Kanan (Badan) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start pb-10 border-b border-slate-200/80 dark:border-slate-700/60">
                
                <!-- KEPALA -->
                <div class="flex flex-col bg-slate-50/70 dark:bg-[#1b242d]/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 h-full justify-between relative">
                    <span class="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">${t('subwidget_kepala')}</span>
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
                <div class="flex flex-col bg-slate-50/70 dark:bg-[#1b242d]/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 h-full justify-between relative">
                    <span class="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">${t('subwidget_badan')}</span>
                    <div class="flex flex-row ">
                        <div class="w-3/5 flex items-center justify-center min-h-[220px]">
                        ${svgBody}
                    </div>
                    <div class="w-2/5 mt-4">
                        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">Pilih Bagian:</span>
                        <div class="flex flex-wrap gap-1.5 justify-center">
                            ${buttonsBadan}
                        </div>
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

            <!-- Baris 2: Organ & Bagian Tubuh Lainnya (Dalam Kontainer yang Sama Berformat Kartu) -->
            <div class="mt-10 flex flex-col w-full">
                <div class="flex items-center gap-3 mb-6">
                    <div class="h-px flex-1 bg-slate-200 dark:bg-slate-700/60"></div>
                    <span class="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#1b242d]/60 border border-slate-200/70 dark:border-slate-700/50">
                        ${t('subwidget_organlain') || t('widget_organlain') || 'ORGAN & BAGIAN TUBUH LAINNYA'}
                    </span>
                    <div class="h-px flex-1 bg-slate-200 dark:bg-slate-700/60"></div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                    ${renderOrganLainCardsHtml()}
                </div>
            </div>
        </div>`;
}

function renderWidgetKepala() {
    return renderWidgetAnggotaBadan();
}

const organIllustrations = {
    'Hati': `<!-- SVG: HATI (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Hati">
                <path d="M148 45 L152 75 L150 170" stroke="#2563EB" stroke-width="12" stroke-linecap="round"></path>
                <path d="M142 55 L138 78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"></path>
                <path d="M130 90 C155 75 195 80 200 110 C205 135 180 155 145 150 Z" fill="#9F1239"></path>
                <path d="M140 85 C115 70 55 80 42 120 C32 155 60 178 115 178 C140 178 152 165 155 140 C158 110 152 92 140 85 Z" fill="#BE123C"></path>
                <path d="M136 82 C134 105 136 135 142 155" stroke="#E11D48" stroke-width="4" stroke-linecap="round" fill="none"></path>
                <ellipse cx="112" cy="170" rx="14" ry="9" fill="#15803D" transform="rotate(-15 112 170)"></ellipse>
                <path d="M116 163 L126 150" stroke="#16A34A" stroke-width="4" stroke-linecap="round"></path>
                <path d="M60 115 C70 98 105 92 125 96 C110 106 75 118 60 115 Z" fill="#E11D48"></path>
                <circle cx="85" cy="140" r="3" fill="#881337"></circle>
                <circle cx="102" cy="148" r="2.5" fill="#881337"></circle>
              </svg>`,
    'Jantung': `<!-- SVG: JANTUNG (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Jantung">
                <path d="M135 85 C145 75 168 70 178 72 L182 82 C168 82 152 86 142 98 Z" fill="#1D4ED8"></path>
                <path d="M110 80 L100 68 C88 72 82 80 84 90 L95 90 Z" fill="#1D4ED8"></path>
                <rect x="75" y="42" width="16" height="35" rx="5" fill="#2563EB"></rect>
                <path d="M102 75 C100 48 140 45 150 72 L136 78 C130 62 114 62 116 75 Z" fill="#DC2626"></path>
                <rect x="110" y="36" width="6" height="15" rx="3" fill="#DC2626"></rect>
                <rect x="122" y="34" width="6" height="17" rx="3" fill="#DC2626"></rect>
                <rect x="134" y="38" width="6" height="13" rx="3" fill="#DC2626"></rect>
                <path d="M78 95 C62 105 60 135 78 152 C95 168 118 198 135 208 C155 192 182 155 178 125 C175 100 155 90 135 95 C125 78 95 82 78 95 Z" fill="#E11D48"></path>
                <path d="M135 208 C155 192 182 155 178 125 C175 100 155 90 135 95 C145 125 142 165 135 208 Z" fill="#BE123C"></path>
                <path d="M125 98 Q120 130 132 155 T134 195" stroke="#991B1B" stroke-width="4" stroke-linecap="round" fill="none"></path>
                <path d="M122 125 Q105 135 95 145" stroke="#991B1B" stroke-width="3" stroke-linecap="round" fill="none"></path>
                <path d="M128 145 Q145 152 155 160" stroke="#991B1B" stroke-width="3" stroke-linecap="round" fill="none"></path>
                <path d="M85 110 C80 125 82 142 90 148 C85 138 85 120 92 112 Z" fill="#FB7185"></path>
              </svg>`,
    'Usus': `<!-- SVG: USUS (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Usus">
                <path d="M110 38 L110 52" stroke="#E11D48" stroke-width="8" stroke-linecap="round"></path>
                <path d="M60 165 C50 165 48 115 52 82 C55 60 85 58 120 58 C155 58 185 60 188 82 C192 115 190 165 180 165 C172 165 170 185 155 188 C140 190 135 205 132 215" stroke="#FB7185" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M75 58 L75 70 M100 58 L100 70 M140 58 L140 70 M165 58 L165 70" stroke="#E11D48" stroke-width="3"></path>
                <path d="M42 98 L56 102 M42 128 L56 132" stroke="#E11D48" stroke-width="3"></path>
                <path d="M184 98 L198 102 M184 128 L198 132" stroke="#E11D48" stroke-width="3"></path>
                <path d="M60 174 Q52 188 56 195" stroke="#E11D48" stroke-width="5" stroke-linecap="round" fill="none"></path>
                <path d="M92 95 C115 90 125 105 145 95 C155 108 140 120 150 132 C135 140 145 155 125 152 C105 152 115 138 95 138 C85 125 105 118 92 108 Z" fill="#FDA4AF"></path>
                <path d="M92 105 C110 102 125 115 145 110" stroke="#F43F5E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M98 122 C115 120 125 135 142 128" stroke="#F43F5E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M95 140 C110 136 125 146 135 142" stroke="#F43F5E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <rect x="126" y="210" width="12" height="10" rx="3" fill="#BE123C"></rect>
              </svg>`,
    'Jari': `<!-- SVG: JARI (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Jari">
                <path d="M85 215 L85 185 C85 170 155 170 155 185 L155 215 Z" fill="#FDBA74"></path>
                <path d="M98 185 L98 62 C98 42 142 42 142 62 L142 185 Z" fill="#FED7AA"></path>
                <path d="M125 50 C138 52 142 58 142 68 L142 185 L125 185 Z" fill="#FDBA74"></path>
                <path d="M107 65 C107 54 133 54 133 65 L133 80 C133 82 107 82 107 80 Z" fill="#FECDD3"></path>
                <path d="M110 60 C114 56 126 56 130 60" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path>
                <path d="M106 98 Q120 102 134 98" stroke="#EA580C" stroke-width="3" stroke-linecap="round"></path>
                <path d="M110 103 Q120 106 130 103" stroke="#EA580C" stroke-width="2" stroke-linecap="round"></path>
                <path d="M104 142 Q120 146 136 142" stroke="#EA580C" stroke-width="3.5" stroke-linecap="round"></path>
                <path d="M108 148 Q120 151 132 148" stroke="#EA580C" stroke-width="2" stroke-linecap="round"></path>
                <circle cx="114" cy="136" r="1.5" fill="#C2410C"></circle>
                <circle cx="126" cy="136" r="1.5" fill="#C2410C"></circle>
              </svg>`,
    'Kuku': `<!-- SVG: KUKU (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Kuku">
                <path d="M60 215 L60 110 C60 50 180 50 180 110 L180 215 Z" fill="#FED7AA"></path>
                <path d="M60 110 C60 70 90 55 105 52 L105 215 L60 215 Z" fill="#FDBA74"></path>
                <rect x="78" y="80" width="84" height="110" rx="20" fill="#FDA4AF"></rect>
                <path d="M82 82 C82 72 158 72 158 82 L158 175 C158 185 82 185 82 175 Z" fill="#FECDD3"></path>
                <path d="M82 82 C82 72 158 72 158 82 L158 92 C158 84 82 84 82 92 Z" fill="#FFFFFF"></path>
                <path d="M102 185 C102 168 138 168 138 185 Z" fill="#FFFFFF"></path>
                <path d="M78 182 Q120 192 162 182" stroke="#F43F5E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M92 98 L92 160" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"></path>
                <path d="M98 105 L98 135" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path>
              </svg>`,
    'Daging': `<!-- SVG: DAGING (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Daging">
                <path d="M52 145 C40 105 70 65 120 62 C185 58 205 105 195 145 C185 185 130 195 82 188 C62 185 55 165 52 145 Z" fill="#FEF3C7"></path>
                <path d="M60 142 C50 110 76 75 120 72 C175 68 192 110 185 142 C176 175 128 185 88 180 C70 176 62 160 60 142 Z" fill="#DC2626"></path>
                <path d="M125 74 C165 72 188 105 182 142 C175 170 140 182 110 180 C145 165 160 125 125 74 Z" fill="#991B1B"></path>
                <path d="M85 105 Q115 108 128 95 T160 102" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"></path>
                <path d="M78 135 Q105 132 125 142 T168 138" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M92 158 Q118 152 142 160" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none"></path>
                <circle cx="108" cy="118" r="16" fill="#F5F5F4"></circle>
                <circle cx="108" cy="118" r="9" fill="#EF4444"></circle>
                <circle cx="108" cy="118" r="4" fill="#B91C1C"></circle>
              </svg>`,
    'Darah': `<!-- SVG: DARAH (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Darah">
                <ellipse cx="120" cy="198" rx="65" ry="14" fill="#991B1B"></ellipse>
                <ellipse cx="120" cy="198" rx="48" ry="8" fill="#B91C1C"></ellipse>
                <path d="M120 45 C120 45 68 115 68 152 C68 182 91 202 120 202 C149 202 172 182 172 152 C172 115 120 45 120 45 Z" fill="#DC2626"></path>
                <path d="M120 45 C120 45 172 115 172 152 C172 182 149 202 120 202 C135 185 145 155 132 115 Z" fill="#B91C1C"></path>
                <path d="M92 135 C88 148 90 172 105 184 C96 175 96 155 100 140 Z" fill="#FCA5A5"></path>
                <circle cx="106" cy="122" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="52" cy="98" r="16" fill="#DC2626"></circle>
                <circle cx="52" cy="98" r="8" fill="#991B1B"></circle>
                <circle cx="188" cy="115" r="14" fill="#DC2626"></circle>
                <circle cx="188" cy="115" r="7" fill="#991B1B"></circle>
                <circle cx="64" cy="180" r="4" fill="#DC2626"></circle>
                <circle cx="180" cy="178" r="5" fill="#DC2626"></circle>
              </svg>`,
    'Tulang': `<!-- SVG: TULANG (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Tulang">
                <g transform="rotate(45 120 120)">
                  <circle cx="68" cy="108" r="18" fill="#E7E5E4"></circle>
                  <circle cx="68" cy="132" r="18" fill="#D6D3D1"></circle>
                  <circle cx="172" cy="108" r="18" fill="#E7E5E4"></circle>
                  <circle cx="172" cy="132" r="18" fill="#D6D3D1"></circle>
                  <rect x="75" y="110" width="90" height="20" rx="8" fill="#F5F5F4"></rect>
                  <rect x="78" y="111" width="84" height="8" rx="4" fill="#FFFFFF"></rect>
                  <circle cx="66" cy="110" r="16" fill="#F5F5F4"></circle>
                  <circle cx="66" cy="130" r="16" fill="#E7E5E4"></circle>
                  <circle cx="174" cy="110" r="16" fill="#F5F5F4"></circle>
                  <circle cx="174" cy="130" r="16" fill="#E7E5E4"></circle>
                  <circle cx="120" cy="120" r="2.5" fill="#A8A29E"></circle>
                  <circle cx="132" cy="123" r="1.8" fill="#A8A29E"></circle>
                </g>
                <path d="M75 55 L78 62 L85 65 L78 68 L75 75 L72 68 L65 65 L72 62 Z" fill="#CBD5E1"></path>
                <path d="M175 168 L177 172 L182 174 L177 176 L175 180 L173 176 L168 174 L173 172 Z" fill="#CBD5E1"></path>
              </svg>`,
    'Lemak': `<!-- SVG: LEMAK (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Lemak">
                <path d="M40 120 L200 120 M120 40 L120 200 M65 65 L175 175 M175 65 L65 175" stroke="#FDE68A" stroke-width="6" stroke-linecap="round"></path>
                <circle cx="85" cy="95" r="32" fill="#EAB308"></circle>
                <circle cx="155" cy="95" r="32" fill="#EAB308"></circle>
                <circle cx="120" cy="155" r="36" fill="#CA8A04"></circle>
                <circle cx="85" cy="92" r="30" fill="#FACC15"></circle>
                <circle cx="85" cy="92" r="22" fill="#FEF08A"></circle>
                <circle cx="62" cy="85" r="5" fill="#B45309"></circle>
                <circle cx="155" cy="92" r="30" fill="#FACC15"></circle>
                <circle cx="155" cy="92" r="22" fill="#FEF08A"></circle>
                <circle cx="178" cy="85" r="5" fill="#B45309"></circle>
                <circle cx="120" cy="150" r="35" fill="#FDE047"></circle>
                <circle cx="120" cy="150" r="26" fill="#FEF9C3"></circle>
                <circle cx="100" cy="172" r="6" fill="#B45309"></circle>
                <circle cx="78" cy="82" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="148" cy="82" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="112" cy="138" r="5.5" fill="#FFFFFF"></circle>
                <circle cx="48" cy="148" r="12" fill="#FACC15"></circle>
                <circle cx="192" cy="145" r="13" fill="#FACC15"></circle>
                <circle cx="120" cy="48" r="11" fill="#FACC15"></circle>
              </svg>`,
};

function renderOrganLainCardsHtml() {
    const organItems = swadeshCore.organlain || [];

    return organItems.map(itemKey => {
        const itemTitle = t('word_' + itemKey.toLowerCase()) || itemKey;
        const illustration = organIllustrations[itemKey] || '';

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
                const translated = currentDataMap[code]?.words?.[itemKey] || '-';
                const diakritik = currentDataMap[code]?.diakritik?.[itemKey];

                let flagHtml = '';
                if (langInfo?.icon && (typeof icons === 'undefined' || langInfo.icon !== icons.placeholder)) {
                    flagHtml = `<span class="inline-block h-[18px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] bg-slate-100 dark:bg-slate-800">${langInfo.icon}</span>`;
                }

                const diakritikHtml = diakritik
                    ? `<span class="text-[12px] text-slate-400 dark:text-slate-400 font-serif italic ml-1">[${diakritik}]</span>`
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
            <div class="bg-slate-50 dark:bg-[#1b242d]/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div class="w-full h-28 sm:h-32 flex items-center justify-center p-2 overflow-hidden">
                    ${illustration}
                </div>

                <h4 class="text-base sm:text-lg xl:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider my-2 text-center">
                    ${itemTitle}
                </h4>

                <div class="w-full mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                    ${translationListHtml}
                </div>
            </div>`;
    }).join('');
}

function renderWidgetOrganLain() {
    return `
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            ${renderOrganLainCardsHtml()}
        </div>`;
}

const animalIllustrations = {
    'Anjing': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Anjing">
                <path d="M175 145 C195 130 215 110 205 95 C198 85 186 98 178 115" stroke="#E67E22" stroke-width="12" stroke-linecap="round" fill="none"></path>
                <ellipse cx="120" cy="155" rx="55" ry="45" fill="#F39C12"></ellipse>
                <ellipse cx="120" cy="160" rx="35" ry="30" fill="#FFF2DE"></ellipse>
                <ellipse cx="90" cy="195" rx="14" ry="10" fill="#FDEBD0"></ellipse>
                <ellipse cx="150" cy="195" rx="14" ry="10" fill="#FDEBD0"></ellipse>
                <path d="M72 82 C55 85 45 110 48 135 C50 148 60 152 68 142 C78 128 78 98 72 82 Z" fill="#D35400"></path>
                <path d="M168 82 C185 85 195 110 192 135 C190 148 180 152 172 142 C162 128 162 98 168 82 Z" fill="#D35400"></path>
                <circle cx="120" cy="100" r="46" fill="#F39C12"></circle>
                <path d="M120 70 C128 85 132 95 120 102 C108 95 112 85 120 70 Z" fill="#FFE9CE"></path>
                <ellipse cx="120" cy="116" rx="24" ry="18" fill="#FFF3E0"></ellipse>
                <path d="M113 108 C113 105 127 105 127 108 C127 114 120 117 120 117 C120 117 113 114 113 108 Z" fill="#2C3E50"></path>
                <path d="M120 117 L120 123 M114 121 C117 124 120 124 120 124 C120 124 123 124 126 121" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M116 124 C116 132 124 132 124 124 Z" fill="#FF6B6B"></path>
                <ellipse cx="98" cy="96" rx="6.5" ry="7.5" fill="#2C3E50"></ellipse>
                <circle cx="96" cy="94" r="2.2" fill="#FFFFFF"></circle>
                <circle cx="100" cy="98" r="1" fill="#FFFFFF"></circle>
                <ellipse cx="142" cy="96" rx="6.5" ry="7.5" fill="#2C3E50"></ellipse>
                <circle cx="140" cy="94" r="2.2" fill="#FFFFFF"></circle>
                <circle cx="144" cy="98" r="1" fill="#FFFFFF"></circle>
                <circle cx="86" cy="112" r="5" fill="#FCA5A5"></circle>
                <circle cx="154" cy="112" r="5" fill="#FCA5A5"></circle>
                <path d="M92 140 C108 148 132 148 148 140" stroke="#E74C3C" stroke-width="7" stroke-linecap="round"></path>
                <circle cx="120" cy="148" r="5.5" fill="#F1C40F" stroke="#D68910" stroke-width="1.5"></circle>
              </svg>`,
    'Burung': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Burung">
                <path d="M40 185 C80 183 160 183 205 185" stroke="#854D0E" stroke-width="7" stroke-linecap="round"></path>
                <circle cx="175" cy="180" r="4" fill="#22C55E"></circle>
                <path d="M175 180 Q185 170 190 178" stroke="#22C55E" stroke-width="2" fill="none"></path>
                <path d="M145 155 L195 195 C198 198 195 205 190 202 L138 168 Z" fill="#047857"></path>
                <path d="M152 150 L205 185 C209 188 206 195 200 192 L145 160 Z" fill="#059669"></path>
                <path d="M110 175 L110 185 M106 186 L114 186" stroke="#D97706" stroke-width="3" stroke-linecap="round"></path>
                <path d="M125 175 L125 185 M121 186 L129 186" stroke="#D97706" stroke-width="3" stroke-linecap="round"></path>
                <ellipse cx="118" cy="130" rx="38" ry="46" fill="#10B981"></ellipse>
                <path d="M88 120 C88 155 105 172 125 172 C108 165 96 142 96 122 Z" fill="#FBBF24"></path>
                <path d="M115 110 C145 110 155 135 150 160 C140 165 125 155 115 135 Z" fill="#2563EB"></path>
                <path d="M125 125 C140 128 145 142 142 154" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round"></path>
                <circle cx="95" cy="85" r="26" fill="#10B981"></circle>
                <path d="M96 60 C92 48 80 50 78 55 C82 65 90 62 96 60 Z" fill="#047857"></path>
                <path d="M102 61 C100 50 90 51 88 56 C92 65 98 62 102 61 Z" fill="#059669"></path>
                <path d="M72 82 L48 88 L72 94 Z" fill="#F59E0B"></path>
                <circle cx="88" cy="82" r="6.5" fill="#FFFFFF"></circle>
                <circle cx="86" cy="82" r="3.5" fill="#0F172A"></circle>
                <circle cx="85" cy="80" r="1.2" fill="#FFFFFF"></circle>
              </svg>`,
    'Ular': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Ular">
                <path d="M190 170 C190 195 150 205 110 205 C65 205 45 185 45 160 C45 135 70 125 110 125 C150 125 180 115 180 95 C180 75 160 65 135 65 C115 65 105 75 105 85" stroke="#0D9488" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M190 173 C190 192 153 201 113 201 C72 201 50 183 50 162 C50 143 72 129 110 129 C145 129 175 120 176 96" stroke="#99F6E4" stroke-width="7" stroke-linecap="round" fill="none"></path>
                <circle cx="80" cy="155" r="3.5" fill="#115E59"></circle>
                <circle cx="120" cy="130" r="4" fill="#115E59"></circle>
                <circle cx="160" cy="115" r="3.5" fill="#115E59"></circle>
                <circle cx="150" cy="70" r="3.5" fill="#115E59"></circle>
                <circle cx="140" cy="195" r="4" fill="#115E59"></circle>
                <ellipse cx="102" cy="85" rx="20" ry="16" fill="#0D9488"></ellipse>
                <path d="M84 85 L65 85 M65 85 L56 78 M65 85 L56 92" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <circle cx="96" cy="78" r="6" fill="#FDE047"></circle>
                <ellipse cx="96" cy="78" rx="1.6" ry="4.5" fill="#0F172A"></ellipse>
                <circle cx="94.5" cy="76" r="1" fill="#FFFFFF"></circle>
                <circle cx="86" cy="82" r="1.2" fill="#115E59"></circle>
              </svg>`,
    'Ikan': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Ikan">
                <circle cx="45" cy="85" r="5" fill="#38BDF8"></circle>
                <circle cx="35" cy="65" r="3.5" fill="#7DD3FC"></circle>
                <circle cx="55" cy="50" r="2.5" fill="#38BDF8"></circle>
                <path d="M100 85 C115 50 160 55 170 82 C145 78 120 80 100 85 Z" fill="#F97316"></path>
                <path d="M120 150 C135 175 160 175 165 152 C150 151 135 150 120 150 Z" fill="#F97316"></path>
                <path d="M175 120 C205 85 225 90 220 120 C225 150 205 155 175 120 Z" fill="#EA580C"></path>
                <ellipse cx="120" cy="120" rx="65" ry="38" fill="#0284C7"></ellipse>
                <path d="M110 84 C118 96 118 144 110 156 C116 154 124 144 122 120 C124 96 116 86 110 84 Z" fill="#FFFFFF"></path>
                <path d="M152 92 C157 102 157 138 152 148 C156 146 161 138 160 120 C161 102 156 94 152 92 Z" fill="#FFFFFF"></path>
                <path d="M95 125 C85 135 90 150 105 145 C115 140 115 130 95 125 Z" fill="#FB923C"></path>
                <circle cx="78" cy="112" r="9" fill="#FFFFFF"></circle>
                <circle cx="76" cy="112" r="5" fill="#0F172A"></circle>
                <circle cx="74" cy="110" r="1.8" fill="#FFFFFF"></circle>
                <path d="M56 122 C58 125 64 125 66 123" stroke="#082F49" stroke-width="2.5" stroke-linecap="round"></path>
                <path d="M92 105 C98 112 98 128 92 135" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
              </svg>`,
    'Cacing': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Cacing">
                <ellipse cx="120" cy="185" rx="80" ry="24" fill="#543310"></ellipse>
                <ellipse cx="90" cy="175" rx="14" ry="7" fill="#713F12"></ellipse>
                <ellipse cx="150" cy="180" rx="18" ry="8" fill="#713F12"></ellipse>
                <path d="M170 170 Q175 155 185 155 Q180 168 172 170 Z" fill="#4ADE80"></path>
                <path d="M170 170 Q162 160 160 150 Q168 155 170 170 Z" fill="#22C55E"></path>
                <path d="M150 180 C155 160 145 145 135 145" stroke="#F43F5E" stroke-width="22" stroke-linecap="round" fill="none"></path>
                <path d="M135 145 C115 145 100 120 120 95 C132 80 128 65 110 65 C95 65 85 78 85 92" stroke="#F43F5E" stroke-width="22" stroke-linecap="round" fill="none"></path>
                <ellipse cx="124" cy="98" rx="11" ry="3" fill="#BE123C" transform="rotate(-25 124 98)"></ellipse>
                <ellipse cx="114" cy="120" rx="11" ry="3" fill="#BE123C" transform="rotate(30 114 120)"></ellipse>
                <ellipse cx="140" cy="160" rx="11" ry="3" fill="#BE123C" transform="rotate(45 140 160)"></ellipse>
                <circle cx="86" cy="90" r="14" fill="#FB7185"></circle>
                <circle cx="80" cy="86" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="79" cy="86" r="2.3" fill="#1E293B"></circle>
                <circle cx="78" cy="85" r="0.8" fill="#FFFFFF"></circle>
                <circle cx="90" cy="86" r="4.5" fill="#FFFFFF"></circle>
                <circle cx="89" cy="86" r="2.3" fill="#1E293B"></circle>
                <circle cx="88" cy="85" r="0.8" fill="#FFFFFF"></circle>
                <path d="M81 95 Q86 100 91 95" stroke="#9F1239" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <circle cx="76" cy="92" r="2.5" fill="#FDA4AF"></circle>
                <circle cx="95" cy="92" r="2.5" fill="#FDA4AF"></circle>
              </svg>`,
    'Kutu': `
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Kutu">
                <path d="M150 145 L185 130 L195 185 L210 195" stroke="#6B21A8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M130 150 L160 160 L165 195 L175 200" stroke="#7E22CE" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M90 145 L65 160 L60 190 L50 195" stroke="#7E22CE" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <path d="M105 150 L95 170 L95 195 L90 200" stroke="#6B21A8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <ellipse cx="140" cy="125" rx="42" ry="34" fill="#7E22CE"></ellipse>
                <path d="M125 96 C135 112 135 138 125 154" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <path d="M145 94 C155 110 155 140 145 156" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <path d="M165 100 C173 114 173 136 165 150" stroke="#D8B4FE" stroke-width="2.5" stroke-linecap="round"></path>
                <circle cx="95" cy="120" r="26" fill="#A855F7"></circle>
                <path d="M82 100 C75 85 62 82 55 84" stroke="#6B21A8" stroke-width="3.5" stroke-linecap="round" fill="none"></path>
                <circle cx="53" cy="84" r="3.5" fill="#C084FC"></circle>
                <path d="M90 96 C88 80 80 75 74 74" stroke="#6B21A8" stroke-width="3.5" stroke-linecap="round" fill="none"></path>
                <circle cx="73" cy="74" r="3.5" fill="#C084FC"></circle>
                <circle cx="82" cy="116" r="7.5" fill="#FFFFFF"></circle>
                <circle cx="80" cy="116" r="4.2" fill="#1E1B4B"></circle>
                <circle cx="78.5" cy="114" r="1.5" fill="#FFFFFF"></circle>
                <path d="M72 128 L60 134" stroke="#581C87" stroke-width="3" stroke-linecap="round"></path>
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
                    ? `<span class="text-[12px] text-slate-400 dark:text-slate-400 font-serif italic ml-1">[${diakritik}]</span>`
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
            <div class="bg-slate-50 dark:bg-[#1b242d]/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div class="w-full h-28 sm:h-32 flex items-center justify-center p-2 overflow-hidden">
                    ${illustration}
                </div>
                <h2 class="text-xl xl:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider my-2 text-center">
                    ${animalTitle}
                </h2>
                <div class="w-full mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                    ${translationListHtml}
                </div>
            </div>`;
    }).join('');

    return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col transition-colors w-full">
            <div class="bg-[#1b242d] dark:bg-[#fde401] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
                ${t('widget_animal') || 'HEWAN'}
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                ${cardsHtml}
            </div>
        </div>`;
}

const plantIllustrations = {
    'Akar': `<!-- SVG: AKAR (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Akar">
                <rect x="20" y="65" width="200" height="150" rx="12" fill="#542709"></rect>
                <path d="M20 75 Q70 65 120 70 T220 75" stroke="#16A34A" stroke-width="8" stroke-linecap="round"></path>
                <polygon points="60,65 65,45 70,65" fill="#22C55E"></polygon>
                <polygon points="68,65 75,40 82,65" fill="#15803D"></polygon>
                <polygon points="150,65 155,42 162,65" fill="#22C55E"></polygon>
                <polygon points="160,65 168,38 174,65" fill="#15803D"></polygon>
                <rect x="114" y="45" width="12" height="25" fill="#78350F"></rect>
                <path d="M120 70 Q116 115 122 155 T118 205" stroke="#F59E0B" stroke-width="10" stroke-linecap="round" fill="none"></path>
                <path d="M118 95 Q90 110 65 125" stroke="#D97706" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M118 105 Q150 120 175 130" stroke="#D97706" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M120 135 Q95 150 78 170" stroke="#B45309" stroke-width="5" stroke-linecap="round" fill="none"></path>
                <path d="M120 145 Q145 160 162 180" stroke="#B45309" stroke-width="5" stroke-linecap="round" fill="none"></path>
                <path d="M78 118 Q62 120 52 132" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M165 125 Q180 130 190 142" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M85 162 Q72 172 65 182" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M152 170 Q168 180 178 190" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <circle cx="45" cy="165" r="4.5" fill="#78350F"></circle>
                <circle cx="195" cy="100" r="5" fill="#78350F"></circle>
                <circle cx="185" cy="180" r="4" fill="#78350F"></circle>
              </svg>`,
    'Buah': `<!-- SVG: BUAH (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Buah">
                <path d="M120 75 C115 50 135 35 145 28" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M124 60 C145 42 175 48 180 62 C160 74 135 70 124 60 Z" fill="#15803D"></path>
                <path d="M128 61 C146 54 165 56 172 61" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <path d="M120 78 C95 55 50 65 46 115 C42 165 80 205 110 208 C118 209 122 209 130 208 C160 205 198 165 194 115 C190 65 145 55 120 78 Z" fill="#DC2626"></path>
                <path d="M128 208 C158 204 194 165 190 118 C187 78 152 64 132 75 C146 95 152 145 128 208 Z" fill="#B91C1C"></path>
                <path d="M68 95 C62 115 65 150 82 175 C80 162 76 125 82 102 C84 92 78 88 68 95 Z" fill="#EF4444"></path>
                <circle cx="75" cy="98" r="4.5" fill="#FCA5A5"></circle>
                <ellipse cx="120" cy="74" rx="10" ry="4" fill="#991B1B"></ellipse>
                <ellipse cx="120" cy="206" rx="8" ry="3" fill="#7F1D1D"></ellipse>
              </svg>`,
    'Bunga': `<!-- SVG: BUNGA (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Bunga">
                <path d="M120 125 Q122 170 112 215" stroke="#15803D" stroke-width="8" stroke-linecap="round" fill="none"></path>
                <path d="M118 168 C90 156 72 135 78 124 C95 124 114 146 118 168 Z" fill="#16A34A"></path>
                <path d="M116 166 Q98 145 80 126" stroke="#86EFAC" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <path d="M118 185 C146 178 165 160 162 148 C144 148 125 165 118 185 Z" fill="#15803D"></path>
                <path d="M118 184 Q140 168 160 150" stroke="#86EFAC" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <ellipse cx="120" cy="115" rx="15" ry="8" fill="#166534"></ellipse>
                <polygon points="120,118 114,130 120,126 126,130" fill="#166534"></polygon>
                <ellipse cx="120" cy="50" rx="20" ry="32" fill="#BE123C"></ellipse>
                <ellipse cx="120" cy="150" rx="20" ry="32" fill="#BE123C"></ellipse>
                <ellipse cx="70" cy="100" rx="32" ry="20" fill="#BE123C"></ellipse>
                <ellipse cx="170" cy="100" rx="32" ry="20" fill="#BE123C"></ellipse>
                <g transform="rotate(45 120 100)">
                  <ellipse cx="120" cy="50" rx="20" ry="32" fill="#9F1239"></ellipse>
                  <ellipse cx="120" cy="150" rx="20" ry="32" fill="#9F1239"></ellipse>
                  <ellipse cx="70" cy="100" rx="32" ry="20" fill="#9F1239"></ellipse>
                  <ellipse cx="170" cy="100" rx="32" ry="20" fill="#9F1239"></ellipse>
                </g>
                <ellipse cx="120" cy="58" rx="16" ry="26" fill="#E11D48"></ellipse>
                <ellipse cx="120" cy="142" rx="16" ry="26" fill="#E11D48"></ellipse>
                <ellipse cx="78" cy="100" rx="26" ry="16" fill="#E11D48"></ellipse>
                <ellipse cx="162" cy="100" rx="26" ry="16" fill="#E11D48"></ellipse>
                <g transform="rotate(45 120 100)">
                  <ellipse cx="120" cy="58" rx="16" ry="26" fill="#FB7185"></ellipse>
                  <ellipse cx="120" cy="142" rx="16" ry="26" fill="#FB7185"></ellipse>
                  <ellipse cx="78" cy="100" rx="26" ry="16" fill="#FB7185"></ellipse>
                  <ellipse cx="162" cy="100" rx="26" ry="16" fill="#FB7185"></ellipse>
                </g>
                <ellipse cx="120" cy="68" rx="11" ry="18" fill="#FDA4AF"></ellipse>
                <ellipse cx="120" cy="132" rx="11" ry="18" fill="#FDA4AF"></ellipse>
                <ellipse cx="88" cy="100" rx="18" ry="11" fill="#FDA4AF"></ellipse>
                <ellipse cx="152" cy="100" rx="18" ry="11" fill="#FDA4AF"></ellipse>
                <circle cx="120" cy="100" r="24" fill="#D97706"></circle>
                <circle cx="120" cy="100" r="20" fill="#F59E0B"></circle>
                <circle cx="120" cy="100" r="16" fill="#FBBF24"></circle>
                <circle cx="112" cy="94" r="2.5" fill="#78350F"></circle>
                <circle cx="128" cy="94" r="2.5" fill="#78350F"></circle>
                <circle cx="112" cy="106" r="2.5" fill="#78350F"></circle>
                <circle cx="128" cy="106" r="2.5" fill="#78350F"></circle>
                <circle cx="120" cy="100" r="3.5" fill="#F59E0B"></circle>
              </svg>`,
    'Biji': `<!-- SVG: BIJI (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Biji">
                <path d="M40 190 Q120 180 200 190 L200 215 L40 215 Z" fill="#542709"></path>
                <ellipse cx="70" cy="188" rx="8" ry="4" fill="#78350F"></ellipse>
                <ellipse cx="170" cy="189" rx="10" ry="5" fill="#78350F"></ellipse>
                <path d="M120 165 Q115 190 105 205" stroke="#FDE68A" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M112 188 Q98 194 92 200" stroke="#FDE68A" stroke-width="3" stroke-linecap="round" fill="none"></path>
                <path d="M118 160 C80 160 65 125 78 95 C88 72 108 75 115 90 C110 115 112 140 118 160 Z" fill="#B45309"></path>
                <path d="M122 160 C160 160 175 125 162 95 C152 72 132 75 125 90 C130 115 128 140 122 160 Z" fill="#92400E"></path>
                <ellipse cx="120" cy="120" rx="18" ry="26" fill="#FDE68A"></ellipse>
                <ellipse cx="120" cy="120" rx="12" ry="18" fill="#FCD34D"></ellipse>
                <path d="M120 100 Q120 65 120 50" stroke="#15803D" stroke-width="5" stroke-linecap="round" fill="none"></path>
                <path d="M120 50 Q105 38 92 46 Q100 60 120 50 Z" fill="#22C55E"></path>
                <path d="M120 50 Q135 38 148 46 Q140 60 120 50 Z" fill="#4ADE80"></path>
              </svg>`,
    'Daun': `<!-- SVG: DAUN (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Daun">
                <path d="M50 200 Q75 170 95 145" stroke="#15803D" stroke-width="7" stroke-linecap="round" fill="none"></path>
                <path d="M95 145 C70 120 50 75 120 30 C110 70 100 110 95 145 Z" fill="#16A34A"></path>
                <path d="M95 145 C120 155 175 140 185 85 C170 50 145 35 120 30 C110 70 100 110 95 145 Z" fill="#15803D"></path>
                <path d="M95 145 Q108 85 120 30" stroke="#86EFAC" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M102 125 Q82 115 72 108" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M106 105 Q88 95 80 82" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M112 78 Q100 65 96 55" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M102 125 Q125 130 142 125" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M106 105 Q135 105 156 95" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <path d="M112 78 Q135 75 150 62" stroke="#86EFAC" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
                <ellipse cx="140" cy="115" rx="5" ry="4" fill="#67E8F9"></ellipse>
                <circle cx="138" cy="113" r="1.5" fill="#FFFFFF"></circle>
              </svg>`,
    'Hutan': `<!-- SVG: HUTAN (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Hutan">
                <circle cx="178" cy="70" r="22" fill="#FDE047"></circle>
                <polygon points="20,175 75,100 130,175" fill="#99F6E4"></polygon>
                <polygon points="90,175 160,80 230,175" fill="#5EEAD4"></polygon>
                <polygon points="50,180 65,130 80,180" fill="#0F766E"></polygon>
                <polygon points="75,180 95,120 115,180" fill="#115E59"></polygon>
                <polygon points="140,180 155,135 170,180" fill="#0F766E"></polygon>
                <polygon points="165,180 185,125 205,180" fill="#115E59"></polygon>
                <polygon points="25,190 45,150 65,190" fill="#047857"></polygon>
                <polygon points="30,165 45,135 60,165" fill="#059669"></polygon>
                <rect x="42" y="190" width="6" height="15" fill="#78350F"></rect>
                <polygon points="95,190 120,130 145,190" fill="#065F46"></polygon>
                <polygon points="100,160 120,110 140,160" fill="#047857"></polygon>
                <polygon points="105,130 120,90 135,130" fill="#10B981"></polygon>
                <rect x="117" y="190" width="6" height="18" fill="#78350F"></rect>
                <circle cx="175" cy="155" r="22" fill="#15803D"></circle>
                <circle cx="175" cy="148" r="16" fill="#22C55E"></circle>
                <rect x="172" y="172" width="6" height="24" fill="#78350F"></rect>
                <path d="M10 195 Q70 185 130 192 T230 195 L230 220 L10 220 Z" fill="#064E3B"></path>
                <path d="M55 75 Q62 70 70 75 Q78 70 85 75" stroke="#0F766E" stroke-width="2" stroke-linecap="round" fill="none"></path>
                <path d="M80 62 Q85 58 92 62 Q98 58 104 62" stroke="#0F766E" stroke-width="2" stroke-linecap="round" fill="none"></path>
              </svg>`,
    'Kulit Kayu': `<!-- SVG: KULIT KAYU (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Kulit Kayu">
                <rect x="50" y="25" width="140" height="190" rx="16" fill="#78350F"></rect>
                <path d="M75 35 L72 80 L78 120 L74 165 L76 205" stroke="#3B1803" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M110 30 L114 70 L108 115 L112 160 L109 210" stroke="#3B1803" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M145 35 L142 85 L148 130 L144 175 L146 205" stroke="#3B1803" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <path d="M88 45 L92 90 L87 135 L90 180" stroke="#92400E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M125 50 L122 95 L127 140 L123 185" stroke="#92400E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <path d="M160 45 L164 85 L158 130 L162 175" stroke="#92400E" stroke-width="4.5" stroke-linecap="round" fill="none"></path>
                <circle cx="120" cy="115" r="28" fill="#FDE68A" stroke="#B45309" stroke-width="3.5"></circle>
                <circle cx="120" cy="115" r="20" fill="#FDE68A" stroke="#B45309" stroke-width="2.5"></circle>
                <circle cx="120" cy="115" r="12" fill="#FDE68A" stroke="#B45309" stroke-width="2"></circle>
                <circle cx="120" cy="115" r="4" fill="#78350F"></circle>
                <circle cx="62" cy="70" r="7" fill="#16A34A"></circle>
                <circle cx="58" cy="78" r="5" fill="#22C55E"></circle>
                <circle cx="178" cy="160" r="7" fill="#16A34A"></circle>
                <circle cx="182" cy="168" r="5" fill="#22C55E"></circle>
              </svg>`,
    'Pohon': `<!-- SVG: POHON (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Pohon">
                <ellipse cx="120" cy="208" rx="80" ry="14" fill="#15803D"></ellipse>
                <ellipse cx="120" cy="210" rx="60" ry="8" fill="#166534"></ellipse>
                <path d="M100 185 Q85 198 70 206 M140 185 Q155 198 170 206" stroke="#78350F" stroke-width="8" stroke-linecap="round" fill="none"></path>
                <path d="M106 202 L110 135 L90 105 L98 95 L116 120 L124 120 L142 95 L150 105 L130 135 L134 202 Z" fill="#78350F"></path>
                <path d="M113 148 L113 185 M127 155 L127 195" stroke="#542709" stroke-width="3" stroke-linecap="round"></path>
                <ellipse cx="120" cy="165" rx="5" ry="8" fill="#3B1803"></ellipse>
                <circle cx="85" cy="115" r="32" fill="#15803D"></circle>
                <circle cx="155" cy="115" r="32" fill="#15803D"></circle>
                <circle cx="120" cy="80" r="38" fill="#15803D"></circle>
                <circle cx="95" cy="100" r="28" fill="#16A34A"></circle>
                <circle cx="145" cy="100" r="28" fill="#16A34A"></circle>
                <circle cx="120" cy="65" r="30" fill="#22C55E"></circle>
                <circle cx="115" cy="55" r="16" fill="#4ADE80"></circle>
                <circle cx="88" cy="90" r="14" fill="#4ADE80"></circle>
                <circle cx="152" cy="90" r="14" fill="#4ADE80"></circle>
                <circle cx="82" cy="120" r="4.5" fill="#EF4444"></circle>
                <circle cx="158" cy="122" r="4.5" fill="#EF4444"></circle>
                <circle cx="112" cy="92" r="4.5" fill="#EF4444"></circle>
                <circle cx="138" cy="74" r="4.5" fill="#EF4444"></circle>
              </svg>`,
    'Ranting': `<!-- SVG: RANTING (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Ranting">
                <path d="M35 195 Q85 160 125 125 T205 60" stroke="#78350F" stroke-width="12" stroke-linecap="round" fill="none"></path>
                <path d="M85 160 Q70 125 75 95" stroke="#92400E" stroke-width="8" stroke-linecap="round" fill="none"></path>
                <path d="M140 112 Q170 110 185 130" stroke="#92400E" stroke-width="7" stroke-linecap="round" fill="none"></path>
                <path d="M175 80 Q160 55 145 50" stroke="#92400E" stroke-width="6" stroke-linecap="round" fill="none"></path>
                <circle cx="85" cy="160" r="6" fill="#542709"></circle>
                <circle cx="140" cy="112" r="5" fill="#542709"></circle>
                <path d="M75 95 Q60 80 50 82 Q55 98 75 95 Z" fill="#15803D"></path>
                <path d="M75 95 Q85 75 98 80 Q92 95 75 95 Z" fill="#22C55E"></path>
                <path d="M185 130 Q205 130 212 142 Q195 148 185 130 Z" fill="#16A34A"></path>
                <path d="M185 130 Q192 112 206 116 Q200 128 185 130 Z" fill="#4ADE80"></path>
                <path d="M145 50 Q130 35 135 25 Q148 35 145 50 Z" fill="#15803D"></path>
                <path d="M145 50 Q158 38 162 48 Q155 58 145 50 Z" fill="#22C55E"></path>
                <path d="M205 60 Q220 50 225 40 Q215 55 205 60 Z" fill="#4ADE80"></path>
                <path d="M205 60 Q212 72 224 72 Q218 62 205 60 Z" fill="#22C55E"></path>
                <circle cx="120" cy="120" r="5" fill="#F43F5E"></circle>
                <circle cx="118" cy="118" r="2" fill="#FDA4AF"></circle>
              </svg>`,
    'Rumput': `<!-- SVG: RUMPUT (Solid Flat) -->
              <svg class="max-h-full max-w-full w-auto h-auto object-contain mx-auto select-none transition-transform duration-300 group-hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi Rumput">
                <ellipse cx="120" cy="208" rx="85" ry="12" fill="#14532D"></ellipse>
                <ellipse cx="120" cy="210" rx="70" ry="7" fill="#052E16"></ellipse>
                <path d="M70 205 Q55 130 40 95 Q65 140 80 205 Z" fill="#166534"></path>
                <path d="M110 205 Q105 110 100 65 Q118 120 120 205 Z" fill="#166534"></path>
                <path d="M150 205 Q170 120 195 85 Q175 140 160 205 Z" fill="#166534"></path>
                <path d="M85 205 Q80 145 68 115 Q95 150 100 205 Z" fill="#15803D"></path>
                <path d="M125 205 Q135 130 145 90 Q142 145 135 205 Z" fill="#15803D"></path>
                <path d="M140 205 Q150 155 170 125 Q155 165 145 205 Z" fill="#15803D"></path>
                <path d="M95 205 Q115 150 120 105 Q125 155 115 205 Z" fill="#22C55E"></path>
                <path d="M105 205 Q85 160 60 140 Q90 170 110 205 Z" fill="#22C55E"></path>
                <path d="M130 205 Q155 165 180 145 Q150 175 135 205 Z" fill="#4ADE80"></path>
                <circle cx="68" cy="135" r="5" fill="#FBBF24"></circle>
                <circle cx="68" cy="135" r="2.5" fill="#D97706"></circle>
                <circle cx="172" cy="148" r="4.5" fill="#FBBF24"></circle>
                <circle cx="172" cy="148" r="2" fill="#D97706"></circle>
              </svg>`,
};

function renderWidgetPlant() {
    const plants = swadeshCore.plant || [];

    const cardsHtml = plants.map(plantKey => {
        const plantTitle = t('word_' + plantKey.toLowerCase()) || plantKey;
        const illustration = plantIllustrations[plantKey] || '';

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
                const translated = currentDataMap[code]?.words?.[plantKey] || '-';
                const diakritik = currentDataMap[code]?.diakritik?.[plantKey];

                let flagHtml = '';
                if (langInfo?.icon && (typeof icons === 'undefined' || langInfo.icon !== icons.placeholder)) {
                    flagHtml = `<span class="inline-block h-[18px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] bg-slate-100 dark:bg-slate-800">${langInfo.icon}</span>`;
                }

                const diakritikHtml = diakritik
                    ? `<span class="text-[12px] text-slate-400 dark:text-slate-400 font-serif italic ml-1">[${diakritik}]</span>`
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
            <div class="bg-slate-50 dark:bg-[#1b242d]/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div class="w-full h-28 sm:h-32 flex items-center justify-center p-2 overflow-hidden">
                    ${illustration}
                </div>

                <h2 class="text-xl xl:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider my-2 text-center">
                    ${plantTitle}
                </h2>

                <div class="w-full mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                    ${translationListHtml}
                </div>
            </div>`;
    }).join('');

    return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col transition-colors w-full">
            <div class="bg-[#1b242d] dark:bg-[#fde401] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
                ${t('widget_plant') || 'FLORA & TUMBUHAN'}
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
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
    const allWords = [
        ...warnaKeys,
        ...swadeshCore.angka,
        ...swadeshCore.kepala,
        ...swadeshCore.badan,
        ...(swadeshCore.organlain || []),
        ...swadeshCore.animal,
        ...swadeshCore.plant
    ];

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
            const diakritik = dataMap[code]?.diakritik?.[word];
            const diakritikHtml = diakritik ? `<span class="text-xs text-slate-400 dark:text-slate-500 italic block font-serif">[${diakritik}]</span>` : '';
            cells += `<td class="py-3 px-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">${translated} ${diakritikHtml}</td>`;
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