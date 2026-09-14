// ==========================================
// FITUR DROPDOWN PILIH BAHASA OTOMATIS
// ==========================================

function toggleLangPickerDropdown(forceClose = false) {
    const menu = document.getElementById('lang-picker-menu');
    const arrow = document.getElementById('lang-picker-arrow');
    const searchInput = document.getElementById('lang-picker-search');
    if (!menu) return;

    if (forceClose || !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
        menu.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
        if (searchInput) {
            searchInput.value = '';
            filterLangPickerList('');
            setTimeout(() => searchInput.focus(), 50);
        }
    }
}

// Tutup dropdown jika klik di luar area
document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('custom-lang-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        toggleLangPickerDropdown(true);
    }
});

// Render daftar semua bahasa yang ada di languageMap secara alfabetis
function renderLanguagePickerDropdown() {
    const listContainer = document.getElementById('lang-picker-list');
    if (!listContainer || typeof languageMap === 'undefined') return;

    listContainer.innerHTML = '';

    // Ambil seluruh bahasa yang terdaftar di languageMap
    const languages = Object.entries(languageMap).map(([code, data]) => ({
        code: code,
        name: data.name || code,
        icon: data.icon || (typeof icons !== 'undefined' ? icons.placeholder : '')
    }));

    // Urutkan secara alfabetis berdasarkan nama bahasa
    languages.sort((a, b) => a.name.localeCompare(b.name, 'id'));

    languages.forEach(lang => {
        const isSelected = selectedLangs.includes(lang.code);
        
        let flagHtml = '';
        if (lang.icon && (typeof icons === 'undefined' || lang.icon !== icons.placeholder)) {
            flagHtml = `<span class="inline-block w-6 h-[18px] rounded-xs overflow-hidden shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">${lang.icon}</span>`;
        } else {
            flagHtml = `<span class="inline-block w-6 h-[18px] rounded-xs overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold">?</span>`;
        }

        const activeClass = isSelected
            ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-medium';

        const checkIcon = isSelected 
            ? `<i data-lucide="check" class="w-4 h-4 text-amber-500 stroke-[2.5]"></i>` 
            : '';

        listContainer.innerHTML += `
            <li onclick="handleSelectFromDropdown('${lang.code}')" 
                data-lang-name="${lang.name.toLowerCase()}"
                class="flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer transition-colors text-xs select-none ${activeClass}">
                <div class="flex items-center gap-2.5 truncate pr-2">
                    ${flagHtml}
                    <span class="truncate">${lang.name}</span>
                </div>
                <div class="shrink-0 flex items-center">
                    ${checkIcon}
                </div>
            </li>`;
    });

    updateLanguagePickerUI();
    if (window.lucide) lucide.createIcons();
}

// Filter pencarian nama bahasa
function filterLangPickerList(keyword) {
    const listContainer = document.getElementById('lang-picker-list');
    if (!listContainer) return;

    const items = listContainer.querySelectorAll('li');
    const term = keyword.trim().toLowerCase();

    items.forEach(item => {
        const langName = item.getAttribute('data-lang-name') || '';
        if (langName.includes(term)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Aksi ketika item bahasa di dropdown diklik
function handleSelectFromDropdown(langCode) {
    // Memanggil fungsi pemilihan bahasa utama agar sinkron dengan peta & slot
    toggleLanguage(langCode);
    
    // Perbarui checklist di dropdown
    renderLanguagePickerDropdown();
}

// Perbarui teks tombol dropdown & badge counter
function updateLanguagePickerUI() {
    const btnText = document.getElementById('lang-picker-selected-text');
    const countBadge = document.getElementById('picker-count-badge');
    
    if (countBadge) {
        countBadge.innerText = `${selectedLangs.length}/3`;
    }

    if (btnText) {
        if (selectedLangs.length === 0) {
            btnText.innerHTML = `<span class="text-slate-400 dark:text-slate-500 font-normal">-- Cari atau Pilih Bahasa --</span>`;
        } else {
            // Tampilkan icon bendera bahasa yang sedang dipilih di tombol
            let iconsHtml = selectedLangs.map(code => {
                const lang = typeof languageMap !== 'undefined' ? languageMap[code] : null;
                if (lang?.icon) {
                    return `<span class="inline-block w-5 h-[14px] rounded-xs overflow-hidden shadow-xs">${lang.icon}</span>`;
                }
                return '';
            }).join('');

            btnText.innerHTML = `
                <div class="flex items-center gap-1.5 truncate">
                    <div class="flex items-center gap-1">${iconsHtml}</div>
                    <span class="text-xs font-bold text-slate-800 dark:text-white truncate">${selectedLangs.length} Bahasa Terpilih</span>
                </div>`;
        }
    }
}

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
    earth: ['Hujan', 'Sungai', 'Danau' ,'Laut', 'Garam', 'Batu', 'Pasir', 'Awan', 'Kabut', 'Tanah', 'Langit', 'Angin'],
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

let tableSortOrder = 'asc';

window.toggleTableSortOrder = function () {
    tableSortOrder = tableSortOrder === 'asc' ? 'desc' : 'asc';
    const container = document.getElementById('dictionary-container');
    if (container && viewMode === 'list') {
        container.innerHTML = generatePopulatedTableView(currentDataMap);
        if (window.lucide) lucide.createIcons();
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
        // Render dropdown daftar bahasa
        renderLanguagePickerDropdown();
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
    };

    renderLanguagePickerDropdown();
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

    renderLanguagePickerDropdown();
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
            let selectHTML = `<select class="custom-select bg-[#323a42] dark:bg-[#e2e8f0] text-sm font-medium rounded px-2 py-1" onchange="handleDialectChange('${code}', this.value)">`;
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
                <div class="bg-[#1b242d] dark:bg-[#e2e8f0] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">${t('widget_warna')}</div>
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
                <div class="bg-[#1b242d] dark:bg-[#e2e8f0] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">${t('widget_angka')}</div>
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
                <path id="path68"
         d="M282.563 737.424c-57.93-3.357-108.59-19.968-143.296-46.984-5.558-4.326-14.426-12.567-14.426-13.406 0-.244 1.143-1.018 2.54-1.72 7.333-3.691 21.853-11.329 22.295-11.727.816-.735 2.243-.53 3.035.439 1.227 1.497 11.002 9.128 15.903 12.414 24.288 16.282 58.814 27.505 97.933 31.832 36.215 4.007 76.225.957 109.045-8.313 20.142-5.69 38.582-13.757 52.93-23.158 5.121-3.355 15.148-11.115 16.507-12.775.976-1.193 1.735-1.133 4.46.352 1.26.686 7.043 3.734 12.85 6.772 5.808 3.038 10.56 5.69 10.56 5.893 0 .73-9.462 9.46-14.436 13.32-30.149 23.39-72.33 39.23-120.296 45.175-15.646 1.94-40.277 2.775-55.604 1.886z"
         style="display:inline;fill:#2470b2;stroke:#281a16;stroke-width:2.78;stroke-dasharray:none;stroke-opacity:1" />
      <path id="path70"
         d="M-896.685 189.33c-8.982.184-20.764 1.97-41.832 6.103-50.25 9.86-62.424 9.963-108.465.906-38.933-7.66-52.238-8.395-70.784-3.904-8.746 2.118-14.83 4.656-21.15 8.82-21.76 14.335-33.053 40.394-33.804 78.016-.147 7.377-.201 10.26-.018 10.344l.01.002s.012-.002.015-.004c-.208-5.57.449 15.781.449 15.781l-4.248 8.203c-7.648 14.769-13.5 31.563-15.027 43.131-1.11 8.416-2.345 60.426-1.944 81.98.184 9.898.724 20.094 1.32 24.943 5.033 40.921 14.629 102.95 18.936 122.412 8.44 38.137 24.104 63.876 61.556 101.15 15.847 15.772 33.82 31.556 45.382 39.858 13.104 9.41 31.413 16.15 50.032 18.42 2.505.306 13.03.469 23.389.362 21.117-.217 26.056-.825 39.49-4.871 9.136-2.752 22.52-9.29 29.767-14.539 12.032-8.716 32.186-26.779 48.93-43.853 37.044-37.772 51.186-63.476 59.46-108.07 4.223-22.765 14.59-93.795 16.713-114.515 1.643-16.035 1.698-19.031 1.005-54.146-.741-37.573-1.304-47.78-3.078-55.813-1.95-8.828-7.141-22.935-12.494-33.944l-5.134-10.555v-7.716c-11.833-39.39-2.595-49.142.131-4.632.016.371.036.564.058.595h.002v.002h.002v.002h.004l.002-.002.002-.002c.079-.126.186-2.04.27-5.107.64-23.192-3.799-46.45-11.868-62.173-11.393-22.2-30.1-33.931-58.771-36.86a67 67 0 0 0-8.289-.324z"
         style="display:inline;fill:#f2b492;stroke:#281a16;stroke-width:3.15884;stroke-dasharray:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
      <path id="path127"
         d="M-999.883 540.196c-3.189-.54-8.774-2.493-17.27-6.037-3.32-1.386-8.856-3.185-12.3-4-7.353-1.737-10.315-3.125-13.534-6.344-2.349-2.35-4.067-4.881-3.312-4.881.219 0 1.378.86 2.576 1.913s3.657 2.59 5.463 3.417c3.712 1.699 10.61 2.554 11.32 1.402.764-1.235-.786-2.3-3.884-2.666-6.367-.754-12.21-4.698-14.264-9.626l-.924-2.219 2.312-.925c5.882-2.354 18.815-3.716 24.082-2.536 1.002.225 5.103 1.547 9.112 2.938 7.12 2.472 7.474 2.53 15.188 2.514 7.72-.016 8.076-.077 15.795-2.698 7.807-2.65 7.992-2.681 16.099-2.674 7.032.007 8.916.227 13.213 1.544 2.794.856 5.012 1.263 5.012.918 0-.34.16-.458.355-.263.525.525-2.03 5.99-3.574 7.644-2.359 2.527-6.384 4.45-10.906 5.213-3.692.622-4.404.931-4.404 1.916 0 1.056.42 1.164 4.16 1.077 6.538-.154 11.752-3.052 15.714-8.737l1.041-1.493-.654 2c-.924 2.828-6.125 8.297-9.395 9.88-1.52.735-5.854 2.096-9.632 3.024-3.948.97-10.193 3.159-14.683 5.148-10.662 4.721-15.723 5.736-22.706 4.551m12.314-8.851c1.712-.584 4.324-2.35 6.718-4.544 2.154-1.974 4.608-3.852 5.453-4.173.844-.321 3.952-.76 6.906-.976 6.525-.475 9.03-1.185 10.23-2.9 2.396-3.421-.483-6.5-6.073-6.492-4.825.006-8.792 2.253-15.447 8.75-3.199 3.124-6.712 6.132-7.808 6.686-3.158 1.597-9.02 1.894-13.229.67-3.193-.927-4.304-1.73-9.685-6.994-7.553-7.391-10.028-8.761-15.884-8.793-3.436-.019-4.605.217-5.619 1.133-1.73 1.563-1.63 4.073.228 5.82 1.281 1.203 2.434 1.488 7.652 1.893 7.211.558 9.672 1.028 9.672 1.846 0 .327.23.453.512.279.28-.174 1.443.656 2.581 1.844 2.77 2.89 6.552 5.465 9.1 6.197 3.342.96 11.558.822 14.693-.246m44.052-122.81c1.092-.135 2.732-.133 3.645.006.913.138.02.249-1.985.246s-2.752-.117-1.66-.252zm-89.041-1.413c-2.472-.991-6.997-4.347-11.36-8.425-3.185-2.974-3.643-3.278-1.823-1.209 1.336 1.52.404.695-2.071-1.835s-4.3-4.19-4.056-3.688c.245.501-.146.158-.868-.763-.722-.92-1.569-1.515-1.882-1.321-.314.193-.495-.01-.403-.453.092-.442-.31-.807-.891-.81-.582-.005-.992-.194-.911-.423.262-.742-3.964-4.727-10.637-10.032-8.398-6.676-8.607-7.474-1.229-4.698 5.886 2.215 12.54 5.916 17.664 9.826 3.322 2.534 4.611 3.21 5.13 2.692 1.026-1.026-1.818-3.747-8.76-8.383-6.631-4.427-13.764-7.583-20.702-9.159-2.59-.588-4.709-1.277-4.709-1.53s-.304-.462-.675-.462-3.72-2.149-7.442-4.776-8.368-5.829-10.326-7.116c-1.957-1.287-3.255-2.441-2.884-2.565 1.159-.386 17.227 2.157 35.908 5.683 20.248 3.822 27.088 4.381 30.094 2.46.99-.633 1.603-.937 1.362-.676s.117 1.254.796 2.206c3.861 5.423 7.231 15.99 8.498 26.646 1.145 9.637-.53 17.524-4.003 18.844-1.858.706-1.981.705-3.82-.033m69.342-.257c-5.743-4.022-4.3-26.86 2.555-40.474 2.83-5.618 4.111-6.898 5.908-5.9 2.285 1.268 10.43.694 22.616-1.596 18.158-3.411 36.333-6.477 37.664-6.352.669.063 1.686-.089 2.26-.337s1.37-.342 1.77-.209-2.53 2.535-6.511 5.337c-3.98 2.802-8.665 6.098-10.41 7.325-1.744 1.227-2.997 2.405-2.784 2.618s-.311.387-1.165.387c-2.496 0-11.951 2.913-16.688 5.141-6.484 3.05-17.805 11.057-17.805 12.591 0 1.535 2.093.848 5.676-1.864 2.205-1.67 5.878-4.146 8.162-5.502 4.218-2.506 13.767-6.328 14.881-5.956.337.112-1.676 2.104-4.472 4.428-7.82 6.499-14.222 12.45-14.237 13.235-.008.39-.45.637-.982.55-.533-.089-1.347.305-1.809.875-.718.885-.716.961.013.522.583-.352.714-.29.413.197-.241.391-.654.578-.917.415-.264-.162-1.355.796-2.427 2.129-1.071 1.333-2.162 2.292-2.424 2.13-.485-.3-3.867 2.898-3.76 3.554.034.199-.145.396-.395.439-.251.042-2.096 1.238-4.101 2.657-6.545 4.632-8.647 5.33-11.031 3.66m20.751-11.863c.605-.668.963-1.215.796-1.215s-.799.547-1.403 1.215c-.605.669-.963 1.215-.796 1.215s.798-.546 1.403-1.215m-6.456 11.695c-.756-.964-.734-.985.23-.23.584.46 1.062.937 1.062 1.064 0 .5-.499.178-1.292-.834m6.646-1.175c.438-.175.962-.153 1.164.048.202.202-.157.346-.797.32-.708-.03-.852-.174-.367-.367m-2.316-3.533c.785-.836 1.563-1.52 1.73-1.52s-.338.684-1.123 1.52c-.784.835-1.563 1.518-1.73 1.518s.338-.683 1.123-1.518m-139.841-35.347c.438-.175.962-.154 1.164.048s-.157.346-.797.32c-.708-.03-.852-.174-.367-.368m177.392 0c.439-.175.963-.154 1.165.048s-.157.346-.798.32c-.707-.03-.851-.174-.367-.368m-198.985-15.194c.591-.154 1.411-.144 1.822.023s-.072.292-1.074.28c-1.003-.013-1.34-.149-.748-.303m287.927-58.249c-.505-11.843-6.212-32.158-13.147-46.799-7.099-14.985-17.746-25.7-33.465-33.677-13.053-6.624-25.983-9.949-38.57-9.916-7.693.02-9.54.288-29.769 4.335-34.355 6.873-48.15 8.421-69.863 7.84-20.02-.536-26.865-1.56-62.27-9.313-9.67-2.117-11.005-2.264-20.959-2.293-9.755-.03-11.175.11-17.233 1.682-20.054 5.206-31.226 10.985-41.72 21.583-14.254 14.394-20.925 29.286-26.978 60.225-.882 4.51-.888 4.435-.648-7.594.751-37.622 12.043-63.682 33.803-78.018 6.32-4.164 12.405-6.7 21.15-8.818 18.547-4.49 31.852-3.757 70.785 3.902 46.04 9.057 58.216 8.956 108.466-.904 28.09-5.512 39.67-6.848 50.12-5.78 28.67 2.928 47.376 14.66 58.77 36.86 8.069 15.723 12.509 38.982 11.869 62.174-.115 4.177-.269 6.207-.341 4.511"
         style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
         </g>
            <g id="svg-part-leher" class="cursor-pointer" style="${isKActive('Leher') ? activeGlow : normalTransition}" onclick="changeKepala('Leher')" onmouseenter="hoverPart('Leher', activeKepala)" onmouseleave="unhoverPart('Leher', activeKepala)">
                <path id="path128"
         d="m-854.118 666.254-1.236 1.52c-10.706 13.143-43.897 44.942-59.774 57.27-18.875 14.654-36.253 21.741-60.076 24.496-12.189 1.409-37.105.93-47.453-.91-28.174-5.013-43.239-13.456-73.78-41.346-11.31-10.328-25.41-24.293-32.685-32.372-3.535-3.926-6.698-7.137-7.026-7.137-.382 0-.477 4.064-.265 11.267.247 8.349 0 10.573 2.428 14.312l-1.78-2.361-.383 16.487c-.94 40.292-4.354 49.994-20.449 58.112l-2.72 1.371 2.72 2.4c31.263 27.574 80.299 44.292 142.749 48.668 6.855.48 31.636.345 40.41-.222 12.204-.788 27.927-2.664 38.567-4.603 40.688-7.412 78.377-23.792 100.831-43.82l2.719-2.423-2.719-1.371c-4.256-2.147-9.936-6.389-11.762-8.782-3.885-5.094-6.492-13.41-7.634-24.359-.383-3.664-.86-14.494-1.061-24.068l-.368-17.404v-.002l.186-.23.06-5.868c.034-3.227.16-8.738.282-12.246z"
         style="display:inline;fill:#f2b492;stroke:#281a16;stroke-width:3.15884;stroke-dasharray:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
      <path id="path69"
         d="M-1013.049 781.016c-18.483-2.614-36.656-9.491-52.74-19.959-15.883-10.335-41.893-35.305-60.784-58.352-10.291-12.554-9.45-10.532-9.839-23.663-.213-7.203-.117-11.268.264-11.268.329 0 3.49 3.212 7.025 7.138 7.275 8.079 21.376 22.045 32.686 32.373 30.54 27.89 45.607 36.332 73.78 41.345 10.349 1.84 35.263 2.318 47.452.909 23.823-2.755 41.203-9.842 60.078-24.496 15.877-12.327 49.066-44.127 59.772-57.27l1.237-1.518-.22 6.379a619 619 0 0 0-.28 12.245l-.062 5.867-5.51 6.89c-17.956 22.453-41.06 45.808-57.367 57.992-18.84 14.076-39.322 22.57-61.358 25.443-8.687 1.133-25.928 1.105-34.134-.055"
         style="display:inline;fill:#d49072;stroke:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
       </g>
            <g id="svg-part-telinga" class="cursor-pointer" style="${isKActive('Telinga') ? activeGlow : normalTransition}" onclick="changeKepala('Telinga')" onmouseenter="hoverPart('Telinga', activeKepala)" onmouseleave="unhoverPart('Telinga', activeKepala)">
                <path id="path126"
         d="M514.229 326.164c-.68-.038-1.35.091-2.344.37-3.121.873-6.93 3.84-10.342 8.052-7.947 9.814-23.942 41.265-23.924 47.041.004 1.072 1.004 4.026 2.344 6.92 1.895 4.093 2.384 5.79 2.588 8.96.318 4.953-.668 7.708-4.207 11.753-3.55 4.057-4.966 7.156-5.213 11.424-.184 3.176-.068 3.662 1.236 5.212 1.149 1.366 1.845 1.71 3.451 1.71 3.76 0 5.706-2.037 8.791-9.194 1.148-2.662 1.705-3.266 4.414-4.795 5.71-3.222 8.815-7.39 10.579-14.195 3.026-11.681-2.893-27.435-11.893-31.65l-2.688-1.26 1.387-2.83 1.389-2.83 2.54 1.287c5.526 2.8 10.197 2.764 12.067-.09 1.31-1.998.68-7.416-1.681-14.488l-2.002-5.998 1.758-2.22c1.57-1.981 1.827-2.123 2.412-1.323 1.198 1.639 5.04 12.619 6.625 18.931 2.167 8.638 2.824 14.016 2.845 23.338.011 4.734-.278 8.847-.98 12.649 1.412-2.426 2.528-4.224 3.666-6.2l.072-.568c.437-3.444 1.415-7.764 2.36-10.426 3.405-9.595 5.01-22.508 4.255-34.217-.565-8.773-2.61-13.008-7.109-14.726-1.028-.393-1.717-.598-2.396-.637m-430.374.074c-1.38-.055-2.725.272-4.06.957-4.897 2.513-6.741 9.406-6.268 23.422.332 9.822 1.44 16.504 3.944 23.791 1.861 5.419 2.31 7.507 3.418 15.903a47.5 47.5 0 0 0 1.486 7.1c.294.48.576.966.785 1.487.213.531.312 1.1.492 1.643.436 1.308 1.658 3.714 2.301 4.928.758 1.431 1.786 2.728 2.629 4.107.294.481.463 1.042.82 1.479.155.19.496.145.659.328.293.33.41.783.656 1.15.366.549.948.93 1.314 1.479.164.245.177.57.328.822.18.3.469.525.659.82.304.475.512 1.009.82 1.48.515.79 1.165 1.487 1.642 2.3.612 1.04 1.05 2.176 1.62 3.24 1.494 2.15 2.893 4.368 3.668 5.865 2.164 4.182 3.118 5.123 3.902 3.854.678-1.098-3.402-8.368-8.477-15.108-7.917-10.515-10.747-16.425-12.396-25.885-1.537-8.812-.739-23.591 1.812-33.578 2.069-8.096 6.604-20.588 7.465-20.56.193.006 1.038.982 1.877 2.168l1.526 2.156-1.995 5.984c-2.408 7.23-2.957 11.996-1.62 14.035 2.113 3.226 6.361 3.392 12.115.477l2.65-1.342 1.297 2.8 1.297 2.798-2.784 1.492c-7.712 4.134-13.15 15.479-12.51 26.094.505 8.345 3.66 14.587 9.192 18.183 5.373 3.494 6.031 4.163 7.225 7.358 2.189 5.859 4.461 8.14 8.11 8.14 3.964 0 5.763-3.225 4.692-8.414-.792-3.841-1.937-6.118-4.777-9.511-3.041-3.635-4.327-6.29-4.674-9.645-.369-3.575.435-6.795 3.098-12.404 1.154-2.432 2.098-5.154 2.098-6.049 0-3.115-7.833-20.729-13.89-31.232-9.492-16.466-16.16-23.873-22.146-24.112m417.684 90.606q-.336.432-.684.87c-4.089 5.17-8.38 13.037-7.855 14.403.638 1.663 1.75.77 3.209-2.58.36-.827 1.146-2.188 2.158-3.775q.042-.174.098-.344c.11-.329.37-.597.465-.93.063-.223-.064-.474 0-.697.261-.914.857-1.874 1.162-2.787q.697-2.096 1.447-4.16"
         style="display:inline;fill:#d49072;stroke:none;stroke-width:.88007;stroke-opacity:1" />
      <path id="path125"
         d="M87.857 313.322c-3.848-.16-7.3 1.316-10.716 4.479-8.907 8.246-12.243 26.826-8.594 47.861 1.339 7.72 2.76 12.636 7.39 25.588 12.136 33.94 18.037 47.624 25.495 59.111 4.275 6.586 8.344 10.051 13.8 11.756 5.272 1.648 11.104.51 14.752-2.877l2.114-1.96-2.348-15.239c-3.9-25.315-7.186-52.816-7.186-60.16 0-4.278-14.977-52.19-18.486-59.137-1.479-2.928-4.183-5.198-8.785-7.375-2.674-1.265-5.126-1.95-7.436-2.047zm421.803.162c-3.183.022-4.349.319-7.797 1.983-5.664 2.733-7.824 5.243-10.504 12.199-2.814 7.306-6.062 17.317-11.545 35.578-4.328 14.418-4.496 15.179-5.115 23.193-.776 10.053-4.05 36.247-6.986 55.872-1.188 7.94-2.154 14.676-2.145 14.97.025.82 4.553 4.049 6.803 4.852 5.108 1.823 11.908.319 16.889-3.735 5.243-4.267 12.944-17.374 19.504-33.197 2.516-6.07 9.641-25.14 14.88-39.83 5.237-14.68 6.864-24.327 6.446-38.228-.223-7.393-.528-10.061-1.633-14.303-3.3-12.663-9.858-19.415-18.797-19.354zm4.569 12.68c.68.039 1.368.244 2.396.637 4.499 1.718 6.544 5.953 7.11 14.726.755 11.71-.851 24.622-4.256 34.217-.945 2.662-1.923 6.982-2.36 10.426-1.793 14.136-4.331 20.046-14.209 33.074-2.867 3.782-5.883 8.415-6.701 10.293-1.46 3.35-2.57 4.243-3.209 2.58-.524-1.366 3.766-9.232 7.855-14.402 10.356-13.092 13.542-21.923 13.506-37.426-.021-9.322-.678-14.7-2.845-23.338-1.585-6.312-5.427-17.292-6.625-18.931-.585-.8-.843-.658-2.412 1.324l-1.758 2.219 2.002 5.998c2.361 7.072 2.99 12.49 1.681 14.488-1.87 2.854-6.54 2.89-12.066.09l-2.541-1.287-1.389 2.83-1.387 2.83 2.688 1.26c9 4.215 14.92 19.969 11.893 31.65-1.764 6.805-4.868 10.973-10.579 14.195-2.71 1.53-3.266 2.133-4.414 4.795-3.085 7.157-5.032 9.193-8.79 9.193-1.607 0-2.303-.343-3.452-1.709-1.304-1.55-1.42-2.036-1.236-5.212.247-4.268 1.662-7.367 5.213-11.424 3.54-4.045 4.525-6.8 4.207-11.752-.204-3.17-.693-4.868-2.588-8.961-1.34-2.894-2.34-5.848-2.344-6.92-.018-5.776 15.977-37.227 23.924-47.041 3.411-4.213 7.22-7.179 10.342-8.053.994-.278 1.664-.407 2.344-.369zm-430.374.074c5.986.239 12.654 7.646 22.147 24.112 6.056 10.503 13.889 28.117 13.889 31.232 0 .895-.944 3.617-2.098 6.049-2.663 5.609-3.467 8.829-3.098 12.404.347 3.355 1.633 6.01 4.674 9.645 2.84 3.393 3.985 5.67 4.777 9.511 1.071 5.19-.728 8.414-4.693 8.414-3.648 0-5.92-2.281-8.11-8.14-1.193-3.195-1.85-3.864-7.224-7.358-5.532-3.596-8.687-9.838-9.191-18.183-.642-10.615 4.797-21.96 12.51-26.094l2.783-1.492-1.297-2.799-1.297-2.799-2.65 1.342c-5.754 2.916-10.002 2.749-12.116-.477-1.336-2.04-.787-6.805 1.621-14.035l1.995-5.984-1.526-2.156c-.839-1.186-1.684-2.162-1.877-2.168-.86-.028-5.396 12.464-7.465 20.56-2.55 9.987-3.349 24.766-1.812 33.578 1.65 9.46 4.479 15.37 12.396 25.885 5.075 6.74 9.155 14.01 8.477 15.108-.784 1.269-1.738.328-3.902-3.854-1.256-2.425-4.15-6.743-6.43-9.598-8.059-10.085-12.153-18.8-13.45-28.63-1.107-8.396-1.556-10.484-3.417-15.903-2.504-7.287-3.612-13.969-3.944-23.79-.473-14.017 1.371-20.91 6.268-23.423 1.335-.685 2.68-1.012 4.06-.957z"
         style="display:inline;fill:#f2b492;stroke:#281a16;stroke-width:2.644;stroke-dasharray:none;stroke-opacity:1" />
   </g>
            <g id="svg-part-rambut" class="cursor-pointer" style="${isKActive('Rambut') ? activeGlow : normalTransition}" onclick="changeKepala('Rambut')" onmouseenter="hoverPart('Rambut', activeKepala)" onmouseleave="unhoverPart('Rambut', activeKepala)">
                <path id="path74"
         d="M-985.98 17.482c-1.408.872-.156 2.628 3.859 5.42 2.403 1.67 6.293 4.661 8.646 6.642a657 657 0 0 0 4.532 3.795c.14.107.132.321-.02.473s-2.18-.429-4.507-1.287c-18.363-6.777-38.047-10.022-60.729-10.01-26.338.015-48.957 4.298-74.284 14.064-9.557 3.686-11.853 4.964-10.741 5.986.32.294 5.093 1.007 10.606 1.587s10.245 1.262 10.515 1.513-1.235.794-3.342 1.207-6.975 1.7-10.817 2.857c-23.125 6.963-46.074 19.52-65.613 35.903-11.688 9.8-27.971 27.998-27.096 30.28.477 1.242 1.544 1.07 11.128-1.793 4.082-1.22 7.59-2.217 7.796-2.217.208 0-3.156 3.408-7.479 7.572-4.322 4.164-9.606 9.792-11.742 12.503-15.944 20.242-26.595 44.288-32.093 72.467-4.942 25.33-4.807 31.873.517 25.27 1.193-1.478 3.492-4.054 5.111-5.725 2.47-2.55 2.882-2.795 2.574-1.52-6.07 25.17-7.295 54.533-3.652 87.482 1.031 9.331 4.153 28.97 7.261 45.68.99 5.318 1.825 10.033 2.05 11.542 1.736 1.26 2.99 2.938 4.106 4.84 1.047 1.89 1.343 3.986 1.42 6.105q.019.49.014.961c2.735 6.603 8.972 25.198 14.893 44.568l3.243 10.612a25 25 0 0 1 1.808 1.758c.354.38.682.785 1.021 1.176 1.197 1.374 2.014 2.996 2.879 4.583-.348-15.281.86-74.49 1.709-82.617 1.337-12.805 7.55-31 16.074-47.082l3.22-6.074-.062-17.617c-.047-13.71.173-19.236.988-24.91 3.815-26.563 11.266-43.3 24.958-56.06 8.611-8.027 17.664-12.562 31.25-15.656 18.535-4.22 30.306-3.42 72.424 4.918 21.22 4.202 28.982 5.189 43.744 5.564 18.803.479 27.76-.544 59.523-6.802 33.102-6.522 44.676-7.525 58.947-5.11 22.045 3.728 36.736 12.63 47.838 28.99 6.643 9.786 10.874 21.558 14.168 39.416 1.16 6.29 1.344 9.642 1.476 27.34l.149 20.17 3.646 6.865c6.915 13.017 13.142 30.712 14.94 42.455 1.104 7.206 2.068 38.095 2.266 72.546.064 11.035.047 17.014-.204 22.004 1.173-1.243 2.045-1.517 3.36-.763q.079-.992.131-1.802c.34-5.282 1.129-8.534 6.048-24.907 6.037-20.098 13.004-41.039 14.873-44.703.61-1.196 1.557-2.412 2.734-3.58.024-.148.053-.307.082-.495.28-1.596.866-3.106 1.458-4.605q.27-.708.573-1.403l-.002-.015c.004-.265.828-4.582 1.831-9.594 2.712-13.548 6.495-36.849 7.94-48.904 1.846-15.393 2.287-44.588.882-58.323-.966-9.432-3.24-23.391-4.53-27.794-.318-1.086-.358-1.973-.089-1.973s2.605 2.475 5.191 5.5c5.243 6.129 6.822 6.778 6.498 2.678-.505-6.406-8.459-41.745-11.411-50.704-2.1-6.37-8.531-19.288-12.948-26.001-8.597-13.07-20.708-22.79-34.931-28.04l-4.277-1.579-.721-4.307c-3.695-22.067-17.531-43.806-39.406-61.91-2.673-2.212-6.867-5.345-9.323-6.964-6.282-4.142-7.698-3.304-4.38 2.6 1.928 3.432 5.137 11.164 5.856 14.114.408 1.67.07 1.47-4.055-2.433-24.735-23.405-57.017-38.287-96.083-44.29-11.004-1.69-23.395-2.938-24.215-2.437zm-165.044 53.308a219 219 0 0 0-18.236 12.228c-6.244 4.648-23.349 21.063-27.308 26.207 3.96-5.144 21.064-21.561 27.308-26.21a219 219 0 0 1 18.236-12.225m386.716 377.415c.171.346.39.685.632 1.018-.105-.339-.29-.662-.632-1.018"
         style="display:inline;fill:#000;stroke:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
   </g>
   <g id="svg-part-mata" class="cursor-pointer" style="${isKActive('Mata') ? activeGlow : normalTransition}" onclick="changeKepala('Mata')" onmouseenter="hoverPart('Mata', activeKepala)" onmouseleave="unhoverPart('Mata', activeKepala)">
                <path id="path71"
         d="M-929.979 945.533c-.258.007-.663.082-1.109.211-2.985.864-9.474 3.946-13.707 6.51-1.63.987-2.923 1.88-5.092 3.51-2.935 2.207-3.812 2.964-5.19 4.474-.679.746-1.441 1.55-1.694 1.787l-.461.432 1.619 1.469c3.631 3.295 5.681 4.853 8.55 6.498 5.089 2.917 12.768 5.495 19.93 6.69 2.77.461 6.37.84 6.719.708.616-.234 2.239-.16 2.514.116.178.178 1.47.178 1.601 0 .217-.297 2.026-.349 2.555-.075.297.155.857.15 1.178-.01.295-.147 1.215-.184 2.15-.086 1.268.134 7.333-.65 12.074-1.56 4.82-.926 9.386-2.147 14.87-3.977 1.468-.49 3.095-1.022 3.615-1.181 2.545-.783 5.962-1.608 7.925-1.912l.41-.065-.328-.043c-.475-.063-.434-.262.082-.394.551-.142 1.52.01 1.52.236 0 .002 0 .008.002.01 0 0 0 .005.002.006l.002.002.002.002.002.002.002.002.006.004c.258.122 3.02-1.432 3.324-1.895.122-.186.12-.222-.023-.488a1.6 1.6 0 0 0-.448-.48c-.161-.107-.736-.704-1.275-1.327-1.06-1.224-1.294-1.459-2.785-2.771-.752-.661-1.003-.84-1.053-.75-.036.065-.1.117-.142.117-.139 0-.752-.6-1.246-1.22-.518-.65-1.013-1.073-3.063-2.61-5.386-4.039-11.167-7.642-14.91-9.297-1.262-.558-4.116-1.7-4.461-1.785-.1-.025-.155-.037-.182-.021l-.006.004-.002.002-.002.002-.004.006c-.013.028-.002.087.022.185.03.13.35 1.012.71 1.961 1.073 2.826 1.216 3.24 1.468 4.272.234.958.42 2.19.537 3.533.025.29.05.459.074.494l.002.002.002.002h.002v.002h.008l.002-.002.002-.002.002-.002a.2.2 0 0 0 .014-.037c.079-.308.242-.297.376.025.142.339.16.896.038 1.125-.115.214-.317.2-.403-.027a.2.2 0 0 0-.035-.072l-.002-.002h-.002l-.002-.002h-.002l-.002-.002h-.004l-.002.002h-.002l-.002.002-.002.002c-.02.026-.036.134-.057.34-.145 1.464-.253 2.266-.396 2.984-.555 2.776-1.934 5.765-3.719 8.058-.192.247-.335.468-.338.52v.002l.002.002v.004l.002.002h.002l.002.002h.002c.048-.005.248-.163.465-.371.41-.393.64-.584.701-.59h.01l.002.002.002.002v.002h.002v.01c0 .028-.714.837-1.588 1.797-1.791 1.969-2.368 2.456-2.45 2.074l-.005-.012-.002-.002-.006-.006c-.06-.033-.302.112-.795.479-.429.32-1.176.82-1.66 1.111-3.071 1.85-5.713 2.53-9.799 2.52-3.55-.008-6.202-.56-8.802-1.836a19.73 19.73 0 0 1-9.024-8.99c-.6-1.22-.993-2.317-1.3-3.616-.922-3.89-.733-8.502.482-11.746.152-.406.737-1.682 1.299-2.834s1.004-2.122.984-2.156c-.027-.046-.13-.067-.285-.062zm226.917.201c-.086.001-.102.045-.102.12 0 .087-.095.273-.211.412-.259.307-.289.201.627 2.183 1.09 2.36 1.583 3.943 1.896 6.08.165 1.123.142 4.126-.04 5.297-1.161 7.457-5.706 13.21-12.391 15.682-2.58.954-4.825 1.364-7.46 1.361-1.406-.002-1.84-.033-2.628-.187-3.548-.695-7.322-2.396-10.092-4.553q-.39-.304-.463-.295h-.002l-.006.002h-.002v.002l-.002.002-.002.006-.002.002q0 .01.004.025c.07.224-.062.385-.263.32-.31-.098-1.63-1.648-1.553-1.816l.002-.002v-.002l.002-.002.002-.002.002-.002h.002l.002-.002h.002c.045-.008.184.062.326.17q.286.217.334.207h.004v-.002h.002l.002-.002v-.002l.002-.002v-.002c-.001-.032-.075-.132-.223-.289-1.876-1.998-3.595-5.456-4.295-8.644-.245-1.118-.456-2.664-.468-3.434-.004-.273-.007-.41-.018-.435v-.002h-.002v-.002h-.004v.002l-.002.002a2 2 0 0 0-.06.234c-.085.378-.266.464-.346.164-.027-.102-.049-.536-.049-.965 0-.729.054-1.124.152-1.162.051-.015.118.062.192.236.02.047.035.079.049.088l.002.002h.004v.002h.004l.002-.002h.004l.002-.002c.033-.031.053-.249.09-.773.072-1.064.246-2.134.529-3.254.256-1.017.51-1.717 1.125-3.102.6-1.355 1.018-2.438 1.091-2.83.048-.254.035-.293-.105-.293-.896 0-8.134 3.614-12.63 6.305-3.13 1.873-6.141 4.064-9.858 7.174-2.336 1.955-2.606 2.198-2.963 2.687-.414.567-1.135 1.247-1.324 1.25-.087.001-.237.149-.356.35-.113.19-.769.915-1.459 1.611s-1.277 1.357-1.305 1.467c-.078.312.113.808.405 1.055.464.392 1.284.67 2.38.804.298.037.391.021.391-.064 0-.307 1.192-.455 1.461-.182.133.135.131.149-.02.26a.3.3 0 0 0-.073.07l-.002.006v.008l.002.002v.002l.002.002.002.002.006.004c.039.02.165.024.406.024 1.344 0 5.187 1.023 11.226 2.99 10.023 3.264 17.762 5.013 25.106 5.67 1.824.163 2.142.17 2.383.07.601-.252 2.134-.176 2.134.106 0 .166.65.16.772-.006.23-.315 1.89-.338 2.197-.03.132.132.284.153 1.068.153.732 0 .934-.026 1.008-.127.16-.218 1.194-.324 1.926-.197.797.137 1.65.116 3.5-.088 6.965-.77 14.713-2.854 20.576-5.536 2.435-1.113 5.54-3.05 8.834-5.511 1.881-1.405 2.317-1.775 2.59-2.205.325-.512 1.62-1.826 1.91-1.936.123-.047.225-.142.225-.21 0-.07-.244-.357-.543-.64a10 10 0 0 1-.942-1.046c-1.186-1.591-8.264-6.936-12.07-9.116-2.92-1.672-8.413-4.24-11.377-5.32-.776-.282-1.111-.398-1.254-.396zm-10.7 2.756c-.829-.03-1.677.206-2.498.694a.7.7 0 0 0-.219.173l-.267.346c-.602.778-1.031 1.195-1.248 1.211-.04.003-.053.017-.12.127-.64 1.061-.82 2.226-.52 3.379.115.446.278.831.53 1.254.076.127.106.161.176.21.047.034.205.154.352.268.788.613 1.269 1.088 1.248 1.237l-.002.013v.002l.002.006q0 .003.002.006c.013.02.056.047.168.108.561.306 1.228.51 1.867.574.198.02.83.008 1.023-.02a5 5 0 0 0 1.538-.47l.257-.125-.008-.067c-.007-.055-.002-.077.032-.134.128-.22.57-.63 1.228-1.141.356-.276.51-.382.56-.377h.007l.002.002h.002l.002.002h.002l.002.002v.002l.002.006h.004c.03-.026.22-.41.289-.584q.19-.486.263-1.018c.033-.236.045-.732.024-.986a5.36 5.36 0 0 0-1.602-3.375 4.6 4.6 0 0 0-3.097-1.324zm-206.263.168c-.171 0-.34.004-.448.016-.831.088-1.635.4-2.361.918a6.6 6.6 0 0 0-1.611 1.683c-.196.3-.399.733-.494 1.059l-.034.111.037.078c.165.355.2.933.082 1.399-.03.12-.1.288-.136.328-.019.02-.017.038.008.14.148.622.489 1.296.941 1.862.887 1.108 2.216 1.858 3.567 2.012h.002c.272.03.845.02 1.109-.02a4.54 4.54 0 0 0 2.95-1.78c.894-1.19 1.247-2.764.92-4.099-.19-.772-.736-1.692-1.4-2.355a4.6 4.6 0 0 0-1.234-.897 4.2 4.2 0 0 0-1.445-.433 5 5 0 0 0-.453-.022zm201.513 3.738q.034-.005.076.045c.14.162.232.676.196 1.1-.026.302-.116.618-.201.713-.049.053-.114.023-.149-.069-.123-.325-.113-1.47.016-1.722q.03-.06.062-.067m-215.011 3.424h.008l.002.002h.002l.002.002h.002q.033.026.091.184c.147.382.2 1.9.086 2.443-.104.5-.2.592-.3.287-.094-.282-.066-2.647.033-2.824q.04-.073.064-.09l.006-.002h.002z"
         style="fill:#fff;display:inline;fill-rule:evenodd;stroke:none;stroke-width:.0821453;stroke-linejoin:round;stroke-dasharray:.246436,.246436;stroke-opacity:1;paint-order:stroke markers fill"
         transform="translate(1017.782 -505.498)scale(.88007)" />
      <path id="path121"
         d="M-943.517 408.535c1.092-.135 2.732-.133 3.645.006.913.138.02.249-1.985.246s-2.752-.117-1.66-.252zm-89.041-1.413c-2.471-.991-6.997-4.347-11.36-8.425-3.185-2.974-3.643-3.278-1.823-1.209 1.336 1.52.404.695-2.071-1.835s-4.3-4.19-4.056-3.688c.245.501-.145.158-.868-.763-.722-.92-1.569-1.515-1.882-1.321-.314.193-.495-.01-.403-.453.092-.442-.31-.807-.891-.81-.582-.005-.992-.194-.911-.423.262-.742-3.964-4.727-10.637-10.032-8.398-6.676-8.607-7.474-1.229-4.698 5.886 2.215 12.54 5.916 17.664 9.826 3.322 2.534 4.611 3.21 5.13 2.692 1.026-1.026-1.818-3.747-8.76-8.383-6.631-4.427-13.764-7.583-20.702-9.159-2.59-.588-4.709-1.277-4.709-1.53s-.304-.462-.675-.462-3.72-2.149-7.442-4.776-8.368-5.829-10.326-7.116c-1.957-1.287-3.255-2.441-2.884-2.565 1.159-.386 17.227 2.157 35.908 5.683 20.248 3.822 27.088 4.381 30.094 2.46.99-.633 1.603-.937 1.362-.676-.24.26.117 1.254.796 2.206 3.861 5.423 7.231 15.99 8.498 26.646 1.145 9.637-.53 17.524-4.003 18.844-1.858.706-1.981.705-3.82-.033m69.342-.257c-5.743-4.022-4.3-26.86 2.555-40.474 2.83-5.618 4.111-6.898 5.908-5.9 2.285 1.268 10.43.694 22.616-1.596 18.158-3.411 36.333-6.477 37.664-6.352.669.063 1.686-.089 2.26-.337s1.37-.342 1.77-.209-2.53 2.535-6.511 5.337c-3.98 2.802-8.665 6.098-10.41 7.325-1.744 1.227-2.997 2.405-2.784 2.618s-.311.387-1.165.387c-2.496 0-11.951 2.913-16.688 5.141-6.484 3.05-17.805 11.057-17.805 12.591 0 1.535 2.093.848 5.676-1.864 2.205-1.67 5.878-4.146 8.162-5.502 4.218-2.506 13.767-6.328 14.881-5.956.337.112-1.676 2.104-4.472 4.428-7.82 6.499-14.222 12.45-14.237 13.235-.008.39-.45.637-.982.55-.533-.089-1.347.305-1.809.875-.718.885-.716.961.013.522.583-.352.714-.29.413.197-.241.391-.654.578-.917.415-.264-.162-1.355.796-2.427 2.129-1.071 1.333-2.162 2.292-2.424 2.13-.485-.3-3.867 2.898-3.76 3.554.034.199-.145.396-.395.439-.251.042-2.096 1.238-4.101 2.657-6.545 4.632-8.647 5.33-11.031 3.66m20.751-11.863c.605-.668.963-1.215.796-1.215s-.799.547-1.403 1.215c-.605.669-.963 1.215-.796 1.215s.798-.546 1.403-1.215m-6.456 11.695c-.756-.964-.734-.985.23-.23.584.46 1.062.937 1.062 1.064 0 .5-.499.178-1.292-.834m6.646-1.175c.438-.175.962-.153 1.164.048.202.202-.157.346-.797.32-.708-.03-.852-.174-.367-.367m-2.316-3.533c.785-.836 1.563-1.52 1.73-1.52s-.338.684-1.123 1.52c-.784.835-1.563 1.518-1.73 1.518s.338-.683 1.123-1.518m-139.841-35.347c.438-.175.962-.154 1.164.048s-.157.346-.797.32c-.708-.03-.852-.174-.367-.368m177.392 0c.439-.175.963-.154 1.165.048s-.157.346-.798.32c-.707-.03-.851-.174-.367-.368m-198.985-15.194c.591-.154 1.411-.144 1.823.023.41.166-.072.292-1.075.28-1.003-.013-1.34-.149-.748-.303"
         style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
      <path id="path122"
         d="M-703.693 892.059c-8.664-.101-19.29.843-33.3 2.681-13.185 1.73-18.858 2.771-26.72 4.905-6.94 1.883-8.442 2.622-12.017 5.904-3.499 3.212-4.972 6.414-4.989 10.838-.01 2.801.27 3.783 1.504 5.25 1.131 1.344 1.312 1.884.705 2.117-.354.136-.94.904-1.63 2.05 1.515-2.378 2.539-2.831 3.826-2.116 2.284 1.268 10.43.693 22.615-1.596 18.158-3.412 36.333-6.477 37.664-6.352.669.063 1.686-.09 2.26-.338s1.371-.342 1.771-.209c.346.116-1.802 1.93-4.965 4.23l6.098-4.35 6.836-.385c17.459-.98 32.34 3.216 51.012 14.38 6.47 3.87 7.387 4.254 8.195 3.446 1.276-1.277.726-2.59-4.123-9.842-5.03-7.522-12.825-15.12-21.213-20.678-10.104-6.694-19.09-9.767-33.53-9.935m-227.813.048c-13.129.302-22.041 3.139-31.783 9.483-10.99 7.156-19.642 16.118-24.936 25.826-2.06 3.778-2.177 4.235-1.304 5.107.872.873 1.627.575 8.435-3.326 9.08-5.202 12.363-6.86 18.528-9.345 10.123-4.083 20.821-5.82 31.937-5.186l2.772.158a.1.1 0 0 1-.018-.021l-.002-.006-.002-.002v-.008l.002-.002v-.002c.009-.042.103-.09.291-.139.591-.154 1.411-.143 1.822.023.291.118.132.214-.34.256l2.012.116 2.879 1.925c-1.29-.94-2.033-1.677-1.74-1.775 1.158-.386 17.225 2.155 35.906 5.682 20.248 3.822 27.088 4.382 30.094 2.46.781-.499 1.33-.793 1.408-.767l.002.002h.002v.002l.002.002v.004l.002.002v.006h-.002v.002a.2.2 0 0 1-.05.072c-.127.137-.09.473.072.899-.078-.523.244-1.095 1.058-2.295 3.356-4.945.154-13.862-6.482-18.051-6.521-4.116-30.176-8.606-55.844-10.596-5.5-.426-10.345-.606-14.72-.506m212.617 28.688c-3.896 2.742-8.347 5.872-10.037 7.06-.443.312-.855.622-1.219.913l2.266-1.596a2570 2570 0 0 0 8.99-6.377m-136.224 3.58q.143.243.318.488.32.45.637.948a12 12 0 0 0-.834-1.278q-.065-.082-.121-.158m-55.05.201.46.328c2.742 1.965 5.75 3.978 6.683 4.475 1.481.788 1.436.865-1.802.515.185.198-.173.339-.805.313-.708-.03-.852-.173-.367-.367q.079-.032.16-.055c-5.95-.623-15.277-.428-21.63.46-9.3 1.297-18.945 4.91-26.409 9.892-3.398 2.267-13.365 11.99-13.365 13.037 0 1.493 1.598.744 4.279-2.008 5.326-5.468 16.965-12.237 25.793-15 7.425-2.324 13.137-3.107 22.781-3.123 10.637-.017 17.114.995 19.016 2.97.112.117.767.634.97.82-2.325-2.24-.939-2.085 4.149-.17 5.886 2.214 12.539 5.915 17.664 9.825 3.321 2.534 4.61 3.21 5.129 2.692 1.026-1.026-1.818-3.748-8.76-8.383-6.631-4.428-13.763-7.583-20.701-9.158-2.59-.589-4.709-1.278-4.709-1.532 0-.253-.304-.46-.676-.46-.371 0-3.72-2.15-7.441-4.776zm190.546 4.639c-2.373.024-4.817.21-7.98.572a.5.5 0 0 1 .16.1c.201.202-.157.346-.797.32-.598-.025-.792-.132-.547-.281l-.92.113-1.996.25v.002q-.064.129-.012.184c.213.213-.312.386-1.166.386-2.497 0-11.95 2.913-16.687 5.14-6.484 3.051-17.805 11.058-17.805 12.593s2.093.846 5.676-1.865c2.205-1.67 5.878-4.146 8.162-5.502 4.218-2.506 13.766-6.327 14.88-5.956.337.113-1.674 2.105-4.47 4.428a298 298 0 0 0-6.068 5.176c2.14-1.85 4.232-3.63 6.164-5.242 5.747-4.797 6.044-4.958 10.68-5.79 5.898-1.058 20.158-1.047 26.333.022 12.527 2.169 27.844 9.771 35.512 17.623 2.39 2.447 3.977 3.13 3.977 1.715 0-1.317-9.94-10.572-14.575-13.57-8.878-5.744-18.201-8.76-30.966-10.02-2.878-.284-5.182-.422-7.555-.398m-65.139 6.492a34 34 0 0 0-.797 2.445q-.225.814-.431 1.621a63 63 0 0 1 1.228-4.066m-5.076.621c-.644.059-3.784 7.576-5.072 12.15-4.07 14.455-4.695 37.602-1.659 61.36 1.459 11.412 1.49 11.543 2.75 11.543.612 0 .928-.574.924-1.672-.003-.919-.428-4.814-.945-8.656-1.276-9.476-1.868-39.77-.932-47.71.975-8.26 2.251-14.222 4.385-20.491 1.69-4.965 1.822-6.524.557-6.524zm-59.688.065c.622 1.966 1.152 4.087 1.643 6.236-.156-.713-.187-1.318-.365-2.047-.298-1.219-.745-2.665-1.278-4.19m4.327.066c-.204-.001-.4.105-.598.3-.587.579-.352 1.738 1.111 5.468 6.962 17.747 8.531 41.67 4.684 71.43-.51 3.937-.754 7.437-.543 7.778.716 1.16 2.318.253 2.789-1.576 2.53-9.833 3.763-40.99 2.115-53.463-1.17-8.852-2.739-15.216-5.554-22.515-2.085-5.403-3.122-7.416-4.004-7.422m-67.557 2.902c-15.694-.29-33.34 6.693-45.9 18.541-4.956 4.675-5.396 6.235-2.06 7.313 1.083.35 2.86 1.485 3.948 2.521 3.108 2.96 9.275 6.664 14.344 8.614 4.258 1.637 13.73 3.922 18.92 4.564 4.86.601 18.777-.201 24.926-1.437 3.5-.704 10.432-2.67 15.408-4.368 6.112-2.086 9.954-3.07 11.846-3.03 4.16.084 7.298-.937 8.068-2.626.998-2.19.21-4.123-3.271-8.014l-1.834-2.05q.054.162 1.052 1.297c.407.463.605.71.612.755v.002h-.002v.004h-.01c-.11-.032-1.065-.957-2.67-2.597-.7-.716-1.35-1.361-1.914-1.908q-.05.043-.174.043c-.116 0-.73-.616-1.367-1.368l-.307-.363-.002-.002c-.154-.12-.26-.183-.299-.18l-.002.002-.006.002h-.002l-.002.002v.002l-.002.002-.002.006a.2.2 0 0 0 .022.075q.079.164.072.212l-.002.006v.002l-.002.002-.002.002-.002.002-.002.002h-.002l-.002.002h-.008c-.09-.008-.427-.368-.918-.994-.455-.58-.958-1.028-1.348-1.234.37.361.554.563.565.617v.006l-.002.002v.002h-.002l-.002.002h-.008c-.075-.003-.448-.252-1.094-.71-.268.16-.438.027-.418-.3q-.476-.341-1.092-.787l-.369-.265c-.169-.055-.284-.135-.318-.225-7.945-5.561-18.902-10.136-27.78-11.568a47 47 0 0 0-6.586-.576zm191.25.096c-4.38.124-8.668.773-12.758 1.969-7.34 2.146-16.7 6.828-23.101 11.549-.03.3-.325.506-.711.525-.63.463-1.174.854-1.62 1.164q.072-.015.104.008l.006.006q.06.074-.143.4c-.241.392-.654.58-.917.416-.264-.162-1.355.794-2.426 2.127-1.072 1.334-2.162 2.293-2.424 2.131q-.065-.038-.19-.002h-.002l-1.279 1.383c-3.725 4.025-4.101 4.665-3.933 6.682q.081 1.002.535 1.767l.105.082c.585.459 1.065.939 1.065 1.065a1 1 0 0 1-.006.072c1.347.923 3.504 1.37 6.529 1.371 2.932 0 5.206.537 10.025 2.365 15.044 5.708 29.53 7.768 43.002 6.116 7.12-.873 15.84-3.25 21.194-5.78 4.639-2.191 11.03-6.447 13.045-8.69.629-.7 1.375-1.129 1.658-.954.884.546 2.969-.943 2.969-2.121 0-1.334-6.247-7.317-11.65-11.16-11.958-8.505-25.935-12.862-39.077-12.491m-168.305 1.256c.348.28.454.401.803.678 2.186 1.733 5.461 4.524 8.094 6.88-1.86-1.772-4.66-4.166-8.113-6.912-.345-.274-.467-.392-.784-.646m-40.174 4.82v.002c.156-.004.258.017.286.063.02.034-.423 1.004-.985 2.156s-1.146 2.427-1.299 2.834c-1.214 3.244-1.404 7.855-.482 11.746.308 1.3.701 2.395 1.3 3.615a19.73 19.73 0 0 0 9.024 8.99c2.6 1.276 5.253 1.828 8.803 1.836 4.086.01 6.728-.668 9.799-2.52a25 25 0 0 0 1.66-1.11c.485-.362.728-.509.793-.48l.002.001.006.006.002.002h.002c0 .003 0 .01.002.012.083.382.66-.105 2.451-2.074.874-.96 1.588-1.769 1.588-1.797v-.01h-.002v-.002l-.002-.002-.002-.002h-.01c-.061.006-.29.197-.701.59-.218.208-.417.366-.465.37h-.002l-.002-.001h-.002l-.002-.002v-.006l-.002-.002v-.002c.003-.052.146-.273.338-.52 1.784-2.294 3.164-5.282 3.719-8.058.143-.718.25-1.52.396-2.985.02-.205.037-.313.057-.34l.002-.002.002-.002h.002l.002-.002h.004l.002.002h.002l.002.002h.002l.002.002q.014.016.035.073c.086.226.288.24.402.027.123-.23.105-.786-.037-1.125-.135-.322-.298-.334-.377-.025a.2.2 0 0 1-.014.037l-.002.002-.002.002-.002.002h-.007v-.002h-.002l-.002-.002-.002-.002c-.024-.042-.05-.213-.075-.495-.115-1.342-.303-2.575-.537-3.533-.252-1.03-.394-1.445-1.467-4.271-.36-.949-.68-1.831-.71-1.961-.024-.099-.035-.157-.022-.186h.002l.002-.006.002-.002.002-.002h.002l.002-.002.002-.002c.027-.015.082-.003.182.022.345.085 3.199 1.227 4.46 1.785 3.744 1.654 9.525 5.258 14.91 9.297 2.05 1.537 2.546 1.96 3.063 2.61.494.62 1.108 1.22 1.246 1.22.043 0 .107-.053.143-.117.05-.09.3.088 1.053.75 1.49 1.312 1.725 1.547 2.785 2.771.538.623 1.113 1.22 1.275 1.326.162.108.362.323.447.48.144.267.146.302.024.49-.304.462-3.066 2.016-3.324 1.894l-.006-.004-.002-.002-.002-.002-.002-.002-.002-.002v-.002l-.002-.004-.002-.01c0-.227-.969-.378-1.52-.237-.516.133-.558.332-.082.395l.328.043-.41.064c-1.963.304-5.38 1.13-7.926 1.912-.52.16-2.147.692-3.615 1.182-5.483 1.83-10.05 3.05-14.87 3.977-4.74.91-10.805 1.694-12.073 1.56-.935-.099-1.856-.061-2.15.086-.321.16-.881.164-1.178.01-.53-.274-2.338-.222-2.555.074-.13.178-1.423.179-1.602 0-.274-.274-1.898-.349-2.513-.115-.35.133-3.95-.247-6.72-.709-7.161-1.194-14.84-3.772-19.929-6.69-2.87-1.645-4.92-3.202-8.55-6.497l-1.62-1.47.461-.43c.253-.239 1.016-1.043 1.695-1.788 1.377-1.51 2.255-2.268 5.19-4.475 2.168-1.63 3.462-2.522 5.092-3.51 4.233-2.563 10.722-5.645 13.707-6.51.446-.128.85-.203 1.11-.21zm226.917.201c.142-.002.477.114 1.253.397 2.965 1.079 8.457 3.647 11.377 5.32 3.806 2.18 10.884 7.525 12.07 9.115.22.294.643.765.942 1.047.29.274.528.553.543.633v.006c0 .069-.102.164-.225.211-.289.11-1.585 1.424-1.91 1.936-.273.43-.708.8-2.59 2.205-3.293 2.46-6.4 4.398-8.834 5.511-5.863 2.682-13.611 4.766-20.576 5.536-1.85.204-2.702.225-3.5.087-.732-.126-1.766-.02-1.926.198-.074.101-.276.127-1.007.127-.784 0-.937-.021-1.069-.153-.308-.308-1.966-.286-2.197.03-.122.167-.771.171-.771.006 0-.282-1.533-.358-2.135-.106-.24.1-.558.093-2.383-.07-7.344-.657-15.083-2.406-25.105-5.67-6.04-1.967-9.883-2.99-11.227-2.99-.241 0-.367-.004-.406-.024l-.006-.004-.002-.002-.002-.002v-.002l-.002-.002v-.01l.002-.002v-.002q0-.001.002-.004a.3.3 0 0 1 .072-.066c.15-.112.152-.125.02-.26-.265-.268-1.412-.132-1.46.162q.037-.077.278-.174c.22-.087.459-.125.67-.117.21.01.393.065.494.166.202.202-.157.345-.797.319-.404-.017-.624-.071-.648-.15-.018.063-.121.073-.389.04-1.096-.135-1.917-.412-2.38-.804-.293-.248-.483-.743-.405-1.055.028-.11.615-.771 1.304-1.467.125-.126.145-.167.264-.291-.716.742-1.399 1.346-1.553 1.346l-.013-.002h-.002l-.002-.002-.002-.002h-.002l-.002-.002-.002-.002-.004-.006v-.002c-.032-.12.446-.751 1.152-1.502.773-.822 1.54-1.499 1.723-1.52h.01l.008.002.006.002.006.004h.002l.004.006v.002l.002.002c.024.09-.296.51-.729 1.012.192-.217.548-.579.594-.656.12-.202.27-.349.355-.35.19-.003.91-.684 1.325-1.25.357-.489.626-.732 2.963-2.687 3.716-3.11 6.728-5.301 9.857-7.174 4.497-2.692 11.735-6.305 12.63-6.305.14 0 .154.039.106.293-.073.391-.49 1.475-1.091 2.83-.614 1.385-.87 2.085-1.125 3.102a18.4 18.4 0 0 0-.53 3.254c-.035.508-.054.727-.086.77l-.002.001-.002.002-.002.002h-.004l-.002.002h-.004v-.002h-.004l-.002-.002a.3.3 0 0 1-.048-.088q-.112-.26-.192-.236c-.099.038-.152.433-.152 1.162 0 .43.021.863.049.965.08.3.26.214.345-.164.03-.13.049-.213.06-.235l.003-.002v-.002h.004v.002h.002v.002c.01.026.013.163.017.436.013.77.224 2.316.47 3.434.7 3.188 2.417 6.646 4.294 8.644.148.157.222.257.223.29v.001l-.002.002v.002l-.002.002h-.002v.002h-.008c-.04-.003-.153-.071-.33-.207a1 1 0 0 0-.301-.168q.16.087.697.512c.585.458 1.063.938 1.063 1.064 0 .5-.5.178-1.293-.834-.268-.341-.44-.566-.504-.68.094.32 1.261 1.673 1.55 1.764.202.064.334-.096.264-.32l-.004-.025.002-.002.002-.006.002-.002v-.002h.004l.004-.002h.002q.072-.01.463.295c2.77 2.156 6.544 3.858 10.092 4.552.789.155 1.222.186 2.629.188 2.634.003 4.879-.408 7.459-1.362 6.685-2.471 11.23-8.224 12.39-15.681.183-1.171.206-4.174.041-5.297-.313-2.138-.806-3.72-1.896-6.08-.916-1.982-.886-1.876-.627-2.184.116-.138.21-.324.21-.412 0-.074.017-.118.102-.119zm-10.7 2.756a4.6 4.6 0 0 1 3.098 1.324 5.36 5.36 0 0 1 1.602 3.375c.02.254.009.75-.024.987a4.5 4.5 0 0 1-.264 1.017c-.068.174-.258.558-.289.584h-.004l-.002-.006v-.002l-.002-.002h-.002l-.002-.002h-.002l-.002-.002h-.006c-.05-.005-.205.101-.56.377-.658.511-1.1.922-1.229 1.14-.033.059-.038.08-.03.136l.007.066-.258.125c-.516.25-.98.392-1.537.47a7.4 7.4 0 0 1-1.023.02 5 5 0 0 1-1.867-.574c-.112-.06-.155-.087-.168-.107l-.002-.006v-.002l-.002-.004v-.006l.002-.01c.02-.15-.46-.624-1.248-1.237a16 16 0 0 0-.352-.267c-.07-.05-.1-.084-.176-.211a4.6 4.6 0 0 1-.531-1.254c-.3-1.153-.119-2.318.521-3.379.067-.11.08-.124.12-.127.217-.016.646-.433 1.248-1.21l.267-.347a.7.7 0 0 1 .219-.173c.82-.488 1.67-.724 2.498-.694zm-206.263.168c.17.001.343.01.453.022.525.062.969.196 1.445.433.459.229.85.512 1.234.897.664.663 1.21 1.583 1.399 2.355.327 1.335-.026 2.91-.92 4.1a4.54 4.54 0 0 1-2.95 1.78c-.263.04-.836.05-1.109.019h-.002c-1.35-.154-2.68-.904-3.566-2.012-.453-.566-.793-1.24-.941-1.861-.025-.103-.027-.12-.008-.141.036-.04.106-.208.136-.328.117-.466.083-1.044-.082-1.399l-.037-.078.033-.111c.096-.326.298-.76.494-1.059a6.6 6.6 0 0 1 1.612-1.683 4.95 4.95 0 0 1 2.361-.918c.108-.012.277-.017.447-.016zm132.22.41c-.593 4.465-.704 8.53-.37 11.91-.315-3.484-.18-7.62.37-11.91m-89.115 2.883.266.25a.7.7 0 0 0-.266-.25m158.404.445q-.03.009-.058.067c-.129.252-.14 1.398-.016 1.723.035.09.1.122.149.068.085-.094.175-.41.2-.713.037-.424-.055-.938-.195-1.1q-.042-.049-.076-.044zm-40.507 1.176c-.41.144-.836.431-1.125.787-.306.377-.482.607-.526.713l.045-.04q.788-.72 1.606-1.46m-174.5 2.248-.002.002h-.002l-.006.002q-.026.016-.065.09c-.099.177-.126 2.542-.033 2.824.1.305.196.213.3-.287.114-.543.061-2.06-.085-2.443q-.059-.159-.092-.184h-.002l-.002-.002h-.002l-.002-.002zm40.002.766q.087-.01.207.285c.175.439.153.962-.05 1.164-.201.202-.344-.158-.318-.799.018-.42.076-.64.16-.65m130.283.398c-.179.017-.801.557-1.397 1.215-.28.31-.504.592-.65.807l2.094-1.992-.004-.012-.004-.006-.002-.002-.002-.002-.006-.004-.006-.002-.016-.002h-.008zm.043.08-2.153 2.327c.24-.112.792-.605 1.323-1.192.466-.515.785-.959.83-1.135m-3.932 3.692c-.325.284-.66.593-.963.906q.36-.331.707-.662zm-11.947 9.072c-1.542.809-2.676 1.128-3.66 1.045.48.05.991.012 1.529-.123.543-.136 1.272-.457 2.13-.922m-71.127.485-.098.039c-.258.098-.481.183-.681.254q.405-.105.779-.293m87.012 1.32c.66 0 1.299.036 1.755.105q.3.046.35.088l.006.006v.002l.002.002v.012l-.002.002-.002.002-.002.002c-.086.08-.942.133-2.336.131-1.316-.002-2.092-.055-2.16-.127l-.002-.002v-.004h-.002v-.004l.002-.002v-.004h.002l.004-.006c.035-.032.197-.066.496-.103.546-.068 1.228-.101 1.889-.1zm6.218 12.027c-.287.014-.48.12-.629.299-.868 1.047-.397 1.417 5.723 4.477 8.533 4.265 20.854 7.938 29.77 8.877 5.221.55 18-.226 24.093-1.463 6.487-1.318 7.903-1.947 6.819-3.032-.418-.418-2.174-.27-5.438.455-3.774.84-7.587 1.071-17.578 1.065-11.217-.007-13.417-.175-18.225-1.383-6.86-1.724-12.502-3.83-19.232-7.183-2.935-1.463-4.38-2.082-5.174-2.112a1 1 0 0 0-.129 0m-120.056.373c-1.044-.023-3.022.729-6.157 2.301-6.754 3.388-15.503 6.209-23.16 7.465-7.215 1.184-24.913.834-31.127-.615-2.172-.507-4.29-.932-4.707-.944-1.305-.036-.828 1.806.608 2.346 1.35.508 10.91 2.25 15.035 2.74 4.084.485 16.749-.194 21.807-1.168 2.804-.54 7.879-1.892 11.279-3.006 6.724-2.202 17.338-7.251 17.338-8.248 0-.563-.29-.857-.916-.87"
         style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         transform="translate(1017.782 -505.498)scale(.88007)" />
       </g>
            <g id="svg-part-hidung" class="cursor-pointer" style="${isKActive('Hidung') ? activeGlow : normalTransition}" onclick="changeKepala('Hidung')" onmouseenter="hoverPart('Hidung', activeKepala)" onmouseleave="unhoverPart('Hidung', activeKepala)">
                <path id="path115"
         d="m-789.498 936.688-56.691.232zm-1.81 1.916c-.036-.035-44.106.137-48.383.189l-3.522.043.404.9c.535 1.189 1.714 4.162 2.329 5.868 2.002 5.557 3.267 10.417 4.25 16.35.742 4.479 1.042 7.368 1.255 12.052.153 3.361.126 15.221-.043 18.603l-.035.74h36.912l-.035-.45c-.044-.566-.128-2.214-.223-4.428-.1-2.347-.1-12.703 0-14.9.55-11.998 1.92-20.91 4.256-27.706.711-2.068 1.848-4.986 2.565-6.58.162-.36.283-.668.27-.681zm-43.688 54.902-.043.432a42 42 0 0 0-.092 1.746c-.11 3.065-.468 8.517-.785 11.992a142 142 0 0 1-1.238 9.867l-.006.035-1.871.12-.067 1.009-.12-.236s-3.487 18.82-21.26 26.023l.486.342-1.22 2.845.061.16-.468.784c-3.322 5.577-5.266 11.206-6.014 17.416-.16 1.336-.139 4.757.04 5.941.183 1.224.356 1.703.661 1.85.213.102.326.074 1.518-.383 1.429-.548 2.19-.787 3.709-1.168 6.184-1.547 15.118-2.275 19.592-1.598 1.236.188 2.1.451 8.75 2.672 3.366 1.125 6.58 2.156 7.142 2.293 1.27.31 2.496.494 3.85.575 1.544.097 8.443.1 10.244.01 3.371-.17 4.845-.52 10.926-2.59 4.928-1.678 6.422-2.106 8.515-2.44 1.009-.16 1.497-.176 6.391-.209 8.435-.057 9.758.082 14.828 1.563 1.856.541 3.324.878 4.063.933l.537.041.18-.396c1.493-3.297-.394-13.503-3.924-21.234-.554-1.213-.674-1.438-2.032-3.827l-.224-.392c.185-.1.29-.16.29-.16l-1.019-3.057.826-.2c-18.587-7.434-21.027-24.628-21.027-24.628l-.215.74-.58-4.4-1.17.496c-.67-4.661-1.446-11.189-1.824-15.322-.244-2.664-.537-6.597-.537-7.21v-.431h-18.436zm-8.928 54.79a51 51 0 0 0-.377 4.423c-.191 4.117.08 5.28 2.57 11.084.452 1.05.81 1.992.795 2.088-.082.553-1.253.716-1.998.279-2.063-1.213-4.077-6.046-4.607-11.055-.182-1.723-.115-3.67.2-5.799zm57.453 4.419c.022 1.128-.008 2.206-.1 3.058-.473 4.43-2.297 9.185-3.798 9.897-.426.202-1.558.152-1.725-.076-.188-.258-.143-.467.428-1.955 1.186-3.09 1.733-5.178 2.045-7.824.06-.503.098-1.276.115-2.104 1.006-.331 2.032-.668 3.035-.996z"
         style="fill:#f2b492;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         transform="translate(1017.782 -505.498)scale(.88007)" />
      <path id="path108"
         d="M-789.766 936.385c-.085.003-.146.045-.234.138-.893.95-3.761 8.043-4.91 12.145-2.91 10.387-4.082 25.736-3.254 42.621.374 7.623 1.037 14.348 2.385 24.233.54 3.962.798 5.125 1.234 5.564.212.213.332.268.596.268.417 0 .798-.302.916-.725.19-.684.044-2.537-.612-7.777-.528-4.22-.68-5.877-.945-10.35-.665-11.259-.868-29.42-.41-36.76.143-2.298.51-5.219 1.113-8.873.844-5.111 1.766-8.85 3.442-13.955 1.61-4.909 1.79-6.233.873-6.496a.6.6 0 0 0-.194-.033zm-55.5.135a.6.6 0 0 0-.234.07c-.408.217-.53.532-.488 1.264.046.793.28 1.547 1.345 4.353 2.285 6.013 3.773 11.548 4.909 18.256 2.444 14.444 2.418 32.143-.078 52.02-.67 5.321-.899 8.362-.672 8.894q.132.312.402.428c.369.16.53.151.943-.05.639-.308 1.13-1.068 1.41-2.175 1.674-6.612 2.933-24.473 2.776-39.381-.09-8.504-.37-12.161-1.416-18.441-1.156-6.94-2.783-12.695-5.547-19.618-1.615-4.045-2.575-5.675-3.35-5.62zm53.782 100.06c-.04 0-.09 0-.15.01-.407.021-.507.11-.53.467-.035.542.161 1.409 1.459 6.482.676 2.642 1.016 4.506 1.25 6.825.095.94.14 2.44.103 3.437-.06 1.604-.2 2.798-.498 4.299-.376 1.893-.947 3.744-1.84 5.959-.196.487-.372.955-.39 1.04-.071.339.069.516.46.585.2.037.707.036.88 0a2 2 0 0 0 .37-.137c.556-.268 1.132-1.084 1.759-2.488a23.6 23.6 0 0 0 1.943-7.393c.187-1.953.147-4.04-.117-6.185-.605-4.916-2.606-11.06-4.092-12.563a1.7 1.7 0 0 0-.344-.273.47.47 0 0 0-.263-.06zm-49.95.045h-.138c-.272 0-.647.097-.916.229-1.403.682-3.426 5.626-4.467 10.92-.548 2.783-.7 4.98-.496 7.13.516 5.448 2.916 10.821 5.078 11.373.205.052.74.033.945-.035a.8.8 0 0 0 .268-.158c.1-.096.111-.12.111-.254 0-.127-.055-.273-.38-1.013-2.687-6.112-3.092-7.551-3.038-10.8.064-3.863.512-7.338 1.344-10.41.21-.772.348-1.214.771-2.47.67-1.986 1.098-3.476 1.186-4.121.042-.31.015-.386-.268-.393zm67.604 6.967c-.188.01-.322.11-.39.318-.189.57.32 1.767 1.87 4.409.698 1.188 1.055 1.846 1.522 2.812 2.549 5.267 4.447 12.222 4.74 17.37.096 1.676.014 2.888-.275 4.12-.102.433-.104.466-.04.537.102.112.087.493-.035.948-.379 1.414-1.628 4.02-2.712 5.654-.423.636-.77 1.055-1.254 1.516-1.752 1.665-4.11 2.989-6.979 3.918-1.267.41-2.15.616-4.262.994-2.372.424-3.211.72-3.5 1.234-.09.16-.103.232-.103.572 0 .336.014.412.096.543.158.254.471.365 1.28.46.08.01.893.01 1.807 0 1.713-.017 2.49-.065 3.557-.223 4.524-.673 8.372-2.84 11.498-6.479.64-.745 1.04-1.272 1.912-2.512.375-.533.701-.962.725-.962.023 0 .173-.383.332-.862.78-2.345 1.226-4.684 1.404-7.355.056-.83.056-3.22 0-4.051a36.5 36.5 0 0 0-2.88-12.035c-.419-.981-1.258-2.686-1.737-3.528-2.282-4.012-5.427-7.45-6.576-7.4zm-86.588.422c-.174 0-.369.06-.602.172-1.752.844-4.653 4.65-6.7 8.795-2.185 4.42-3.462 9.019-3.807 13.716-.066.892-.064 3.22.002 4.047.197 2.486.655 4.598 1.422 6.57.118.306.413.981.656 1.5a69 69 0 0 1 1.215 2.71c.233.56.243.576.379.6.255.042 1.018.578 1.98 1.39.271.229.705.588.965.799 1.5 1.215 4.081 2.739 5.771 3.406 2.198.867 5.308 1.522 7.743 1.629.35.017.71.028.8.018s.359-.02.596-.031c.49-.024 1.003-.142 1.25-.287.19-.112.327-.327.393-.617.089-.398-.131-.823-.596-1.155-.724-.516-1.827-.843-3.656-1.086a20 20 0 0 1-5.873-1.716c-3.553-1.668-6.326-4.183-7.801-7.075-.237-.463-1.297-2.943-1.297-3.033h.002c.022-.027.203-.115.42-.201.212-.084.313-.127.336-.148h.006-.006c-.012 0-.039-.01-.074-.01-.423 0-.644-.584-.844-2.21-.142-1.152-.181-1.962-.154-3.275.034-1.69.161-3.01.46-4.78.653-3.86 1.99-8.004 3.74-11.589.64-1.308 1.042-2.04 1.872-3.414 1.701-2.816 2.088-3.58 2.088-4.125 0-.266-.12-.43-.393-.533a.8.8 0 0 0-.293-.051zm74.629 31.498c-.755-.01-1.513.029-2.025.11-2.505.392-4.574 1.3-7.172 3.146-1.815 1.288-3.556 2.796-6.57 5.693-2.956 2.84-5.76 5.278-7.08 6.156-1.072.713-2.807 1.249-4.983 1.543-1.279.173-3.791.216-5.125.088-3.05-.292-5.454-1.043-7.318-2.287-1.249-.833-2.422-1.873-5.78-5.123-4.09-3.957-5.739-5.392-7.678-6.68-2.098-1.393-3.936-2.045-6.378-2.263-.887-.083-4.056-.08-4.856 0-.812.082-1.615.285-2.062.523-.194.104-.531.354-.75.557-1.641 1.519-1.59 3.858.12 5.584 1.314 1.325 2.309 1.584 7.866 2.04 3.714.307 5.458.492 6.912.733 1.892.315 2.596.614 2.68 1.137.044.27.179.366.406.28.242-.093.448-.02 1.02.363.359.24.915.734 1.78 1.578 2.366 2.305 4.355 3.829 6.546 5.02 2.051 1.114 3.586 1.47 7.172 1.658.175.01.921.017 1.656.027 3.252.025 6.402-.303 8.13-.844 1.584-.496 4.17-2.195 6.477-4.258 2.59-2.315 4.63-3.912 5.592-4.379.811-.393 3.398-.79 7.023-1.08 5.89-.47 8.137-.972 9.627-2.15.584-.462 1.219-1.466 1.432-2.264.132-.493.133-1.21.002-1.656-.277-.944-1.083-1.801-2.238-2.381-.517-.26-1.608-.59-2.414-.733-.505-.089-1.257-.136-2.012-.142z"
         style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         transform="translate(1017.782 -505.498)scale(.88007)" />
      <path id="path107"
         d="M-999.883 540.196c-3.189-.54-8.774-2.493-17.27-6.037-3.32-1.386-8.856-3.185-12.3-4-7.353-1.737-10.315-3.125-13.534-6.344-2.349-2.35-4.067-4.881-3.312-4.881.219 0 1.378.86 2.576 1.913s3.657 2.59 5.463 3.417c3.712 1.699 10.61 2.554 11.32 1.402.764-1.235-.786-2.3-3.884-2.666-6.367-.754-12.21-4.698-14.264-9.626l-.924-2.219 2.312-.925c5.882-2.354 18.815-3.716 24.082-2.536 1.002.225 5.103 1.547 9.112 2.938 7.12 2.472 7.474 2.53 15.188 2.514 7.72-.016 8.076-.077 15.795-2.698 7.807-2.65 7.992-2.681 16.099-2.674 7.032.007 8.916.227 13.213 1.544 2.794.856 5.012 1.263 5.012.918 0-.34.16-.458.355-.263.525.525-2.03 5.99-3.574 7.644-2.359 2.527-6.384 4.45-10.906 5.213-3.692.622-4.404.931-4.404 1.916 0 1.056.42 1.164 4.16 1.077 6.538-.154 11.752-3.052 15.714-8.737l1.041-1.493-.654 2c-.924 2.828-6.125 8.297-9.395 9.88-1.52.735-5.854 2.096-9.632 3.024-3.948.97-10.193 3.159-14.683 5.148-10.662 4.721-15.723 5.736-22.706 4.551m12.314-8.851c1.712-.584 4.324-2.35 6.718-4.544 2.154-1.974 4.608-3.852 5.453-4.173.844-.321 3.952-.76 6.906-.976 6.525-.475 9.03-1.185 10.23-2.9 2.396-3.421-.483-6.5-6.073-6.492-4.825.006-8.792 2.253-15.447 8.75-3.199 3.124-6.712 6.132-7.808 6.686-3.158 1.597-9.02 1.894-13.229.67-3.193-.927-4.304-1.73-9.685-6.994-7.553-7.391-10.028-8.761-15.884-8.793-3.436-.019-4.605.217-5.619 1.133-1.73 1.563-1.63 4.073.228 5.82 1.281 1.203 2.434 1.488 7.652 1.893 7.211.558 9.672 1.028 9.672 1.846 0 .327.23.453.512.279.28-.174 1.443.656 2.581 1.844 2.77 2.89 6.552 5.465 9.1 6.197 3.342.96 11.558.822 14.693-.246"
         style="fill:#d49072;display:inline;stroke:none;stroke-opacity:1"
         transform="translate(1174.82 -9.845)scale(.88007)" />
      <path id="path114"
         d="M-789.766 936.385c-.085.003-.146.045-.234.138-.893.95-3.761 8.043-4.91 12.145-2.91 10.387-4.082 25.736-3.254 42.621.374 7.623 1.037 14.348 2.385 24.233.54 3.962.798 5.125 1.234 5.564.212.213.332.268.596.268.417 0 .798-.302.916-.725.19-.684.044-2.537-.612-7.777-.528-4.22-.68-5.877-.945-10.35-.665-11.259-.868-29.42-.41-36.76.143-2.298.51-5.219 1.113-8.873.844-5.111 1.766-8.85 3.442-13.955 1.61-4.909 1.79-6.233.873-6.496a.6.6 0 0 0-.194-.033zm-55.5.135a.6.6 0 0 0-.234.07c-.408.217-.53.532-.488 1.264.046.793.28 1.547 1.345 4.353 2.285 6.013 3.773 11.548 4.909 18.256 2.444 14.444 2.418 32.143-.078 52.02-.67 5.321-.899 8.362-.672 8.894q.132.312.402.428c.369.16.53.151.943-.05.639-.308 1.13-1.068 1.41-2.175 1.674-6.612 2.933-24.473 2.776-39.381-.09-8.504-.37-12.161-1.416-18.441-1.156-6.94-2.783-12.695-5.547-19.618-1.615-4.045-2.575-5.675-3.35-5.62zm53.782 100.06c-.04 0-.09 0-.15.01-.407.021-.507.11-.53.467-.035.542.161 1.409 1.459 6.482.676 2.642 1.016 4.506 1.25 6.825.095.94.14 2.44.103 3.437-.06 1.604-.2 2.798-.498 4.299-.376 1.893-.947 3.744-1.84 5.959-.196.487-.372.955-.39 1.04-.071.339.069.516.46.585.2.037.707.036.88 0a2 2 0 0 0 .37-.137c.556-.268 1.132-1.084 1.759-2.488a23.6 23.6 0 0 0 1.943-7.393c.187-1.953.147-4.04-.117-6.185-.605-4.916-2.606-11.06-4.092-12.563a1.7 1.7 0 0 0-.344-.273.47.47 0 0 0-.263-.06zm-49.95.045h-.138c-.272 0-.647.097-.916.229-1.403.682-3.426 5.626-4.467 10.92-.548 2.783-.7 4.98-.496 7.13.516 5.448 2.916 10.821 5.078 11.373.205.052.74.033.945-.035a.8.8 0 0 0 .268-.158c.1-.096.111-.12.111-.254 0-.127-.055-.273-.38-1.013-2.687-6.112-3.092-7.551-3.038-10.8.064-3.863.512-7.338 1.344-10.41.21-.772.348-1.214.771-2.47.67-1.986 1.098-3.476 1.186-4.121.042-.31.015-.386-.268-.393zm67.604 6.967c-.188.01-.322.11-.39.318-.189.57.32 1.767 1.87 4.409.698 1.188 1.055 1.846 1.522 2.812 2.549 5.267 4.447 12.222 4.74 17.37.096 1.676.014 2.888-.275 4.12-.102.433-.104.466-.04.537.102.112.087.493-.035.948-.379 1.414-1.628 4.02-2.712 5.654-.423.636-.77 1.055-1.254 1.516-1.752 1.665-4.11 2.989-6.979 3.918-1.267.41-2.15.616-4.262.994-2.372.424-3.211.72-3.5 1.234-.09.16-.103.232-.103.572 0 .336.014.412.096.543.158.254.471.365 1.28.46.08.01.893.01 1.807 0 1.713-.017 2.49-.065 3.557-.223 4.524-.673 8.372-2.84 11.498-6.479.64-.745 1.04-1.272 1.912-2.512.375-.533.701-.962.725-.962.023 0 .173-.383.332-.862.78-2.345 1.226-4.684 1.404-7.355.056-.83.056-3.22 0-4.051a36.5 36.5 0 0 0-2.88-12.035c-.419-.981-1.258-2.686-1.737-3.528-2.282-4.012-5.427-7.45-6.576-7.4zm-86.588.422c-.174 0-.369.06-.602.172-1.752.844-4.653 4.65-6.7 8.795-2.185 4.42-3.462 9.019-3.807 13.716-.066.892-.064 3.22.002 4.047.197 2.486.655 4.598 1.422 6.57.118.306.413.981.656 1.5a69 69 0 0 1 1.215 2.71c.233.56.243.576.379.6.255.042 1.018.578 1.98 1.39.271.229.705.588.965.799 1.5 1.215 4.081 2.739 5.771 3.406 2.198.867 5.308 1.522 7.743 1.629.35.017.71.028.8.018s.359-.02.596-.031c.49-.024 1.003-.142 1.25-.287.19-.112.327-.327.393-.617.089-.398-.131-.823-.596-1.155-.724-.516-1.827-.843-3.656-1.086a20 20 0 0 1-5.873-1.716c-3.553-1.668-6.326-4.183-7.801-7.075-.237-.463-1.297-2.943-1.297-3.033h.002c.022-.027.203-.115.42-.201.212-.084.313-.127.336-.148h.006-.006c-.012 0-.039-.01-.074-.01-.423 0-.644-.584-.844-2.21-.142-1.152-.181-1.962-.154-3.275.034-1.69.161-3.01.46-4.78.653-3.86 1.99-8.004 3.74-11.589.64-1.308 1.042-2.04 1.872-3.414 1.701-2.816 2.088-3.58 2.088-4.125 0-.266-.12-.43-.393-.533a.8.8 0 0 0-.293-.051zm74.629 31.498c-.755-.01-1.513.029-2.025.11-2.505.392-4.574 1.3-7.172 3.146-1.815 1.288-3.556 2.796-6.57 5.693-2.956 2.84-5.76 5.278-7.08 6.156-1.072.713-2.807 1.249-4.983 1.543-1.279.173-3.791.216-5.125.088-3.05-.292-5.454-1.043-7.318-2.287-1.249-.833-2.422-1.873-5.78-5.123-4.09-3.957-5.739-5.392-7.678-6.68-2.098-1.393-3.936-2.045-6.378-2.263-.887-.083-4.056-.08-4.856 0-.812.082-1.615.285-2.062.523-.194.104-.531.354-.75.557-1.641 1.519-1.59 3.858.12 5.584 1.314 1.325 2.309 1.584 7.866 2.04 3.714.307 5.458.492 6.912.733 1.892.315 2.596.614 2.68 1.137.044.27.179.366.406.28.242-.093.448-.02 1.02.363.359.24.915.734 1.78 1.578 2.366 2.305 4.355 3.829 6.546 5.02 2.051 1.114 3.586 1.47 7.172 1.658.175.01.921.017 1.656.027 3.252.025 6.402-.303 8.13-.844 1.584-.496 4.17-2.195 6.477-4.258 2.59-2.315 4.63-3.912 5.592-4.379.811-.393 3.398-.79 7.023-1.08 5.89-.47 8.137-.972 9.627-2.15.584-.462 1.219-1.466 1.432-2.264.132-.493.133-1.21.002-1.656-.277-.944-1.083-1.801-2.238-2.381-.517-.26-1.608-.59-2.414-.733-.505-.089-1.257-.136-2.012-.142z"
         style="fill:#281a16;display:inline;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:.152626;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
         transform="translate(1017.782 -505.498)scale(.88007)" />
       </g>
            <g id="svg-part-mulut" class="cursor-pointer" style="${isKActive('Mulut') ? activeGlow : normalTransition}" onclick="changeKepala('Mulut')" onmouseenter="hoverPart('Mulut', activeKepala)" onmouseleave="unhoverPart('Mulut', activeKepala)">
                <path id="path66"
         d="M317.211 484.734c-3.7-.004-4.841.262-9.625 2.219-7.489 3.064-10.298 3.053-17.947-.074-5.56-2.273-5.588-2.28-10.963-2.012-10.313.514-21.99 5.468-40.942 17.363-12.8 8.035-17.619 12.831-16.96 16.88.447 2.75 5.014 12.69 9.138 19.89 14.932 26.066 30.492 37.524 55.942 41.193 6.646.958 23.652.675 30.03-.5 21.772-4.01 36.908-15.378 50.141-37.666 3.881-6.535 6.17-11.04 9.125-17.959 2.06-4.818 2.202-5.44 1.66-7.248-.79-2.637-5.306-6.872-12.363-11.592-20.886-13.967-35.906-20.484-47.236-20.494"
         style="display:inline;fill:#281a16;stroke:none;stroke-width:.88007;stroke-opacity:1" />
      <path id="path91"
         d="M282.423 487.096c-1.146-.092-3.863.03-5.521.25-9.217 1.215-21.733 6.74-37.01 16.332-3.954 2.483-8.157 5.374-10.954 7.536-1.902 1.47-3.565 3.118-3.565 3.534 0 .19 1.292-.213 3.783-1.181 5.49-2.134 16.318-5.719 22.953-7.601 12.436-3.528 19.049-4.29 32.512-3.752 10.257.41 18.64.391 28.78-.06a118 118 0 0 1 7.413-.107c3.803.055 4.863.127 9.172.626 3.516.407 6.793.67 9.716.775 3.58.13 4.56.272 6.303.908.997.364 1.859.831 3.144 1.708 1.753 1.197 3.655 2.023 8.23 3.572 1.594.54 4.969 1.735 7.499 2.652 4.402 1.597 6.847 2.39 6.974 2.264.176-.176-.823-1.215-2.441-2.54-6.835-5.594-19.185-13.151-29.99-18.353-7.077-3.407-13.219-5.619-16.972-6.112-1.698-.224-6.287-.318-8.003-.165-1.913.17-2.912.458-6.137 1.758-5.488 2.213-5.821 2.292-9.63 2.292-3.985-.001-4.314-.079-10.02-2.355-3.928-1.568-4.884-1.872-6.236-1.98zm90.615 34.775c-.276-.01-1.423 1.12-2.983 2.934-6.038 7.023-12.56 13.21-19.22 18.237-3.38 2.552-6.356 4.378-10.699 6.565-7.352 3.703-15.37 6.525-22.9 8.06-4.515.92-9.213 1.236-18.607 1.236-11.08.009-14.692-.34-21.88-2.092-14.775-3.6-26.954-10.194-38.902-21.06-2.076-1.888-7.26-7.119-9.574-9.66-2.024-2.223-3.325-3.527-3.517-3.527-.383 0 .307 1.722 2.657 6.645 6.38 13.359 12.85 22.943 20.674 30.625 4.577 4.495 8.955 7.762 14.373 10.724 8.207 4.488 18.597 7.143 31.005 7.926 1.829.116 11.463.049 13.086-.091 7.691-.662 12.585-1.603 18.353-3.529 5.1-1.703 9.214-3.566 13.324-6.035 3.66-2.198 6.162-4.18 9.869-7.82 5.118-5.027 10.086-11.117 13.448-16.485 2.498-3.988 5.492-9.424 8.381-15.214 2.305-4.619 3.395-7.182 3.155-7.422a.06.06 0 0 0-.043-.017z"
         style="display:inline;fill:#dc5d57;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.88639;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill" />
      <g id="svg-part-gigi" class="cursor-pointer" style="${isKActive('Gigi') ? activeGlow : normalTransition}" onclick="changeKepala('Gigi')" onmouseenter="hoverPart('Gigi', activeKepala)" onmouseleave="unhoverPart('Gigi', activeKepala)">
                <path id="path92"
            d="m-840.846 1147.246.002 2.818c.003 5.434.256 8.886.772 10.485.45 1.395 1.227 2.496 2.363 3.35.872.655 1.838.973 3.37 1.109.606.054 2.389.103 3.96.113 2.409.014 2.915-.013 3.229-.17.273-.136.504-.162.861-.098.78.141 4.024.107 4.748-.05.847-.184 1.443-.59 2.242-1.528 1.37-1.606 1.388-1.723 1.291-8.348-.042-2.9-.108-5.488-.144-5.754l-.065-.484-3.851-.434c-6.58-.743-10.659-1.01-15.545-1.01zm46.254.156c-2.036-.147-7.212-.084-9.834.12-1.278.099-4.351.378-6.83.619-4.247.412-4.509.45-4.555.671-.047.229-.443 5.565-.585 7.903a18 18 0 0 0 .056 2.4c.206 1.995.67 3.066 1.846 4.268.957.978 1.912 1.42 3.549 1.633 1.035.131 6.823.133 8.783 0 2.583-.177 3.346-.425 5.275-1.71 2.209-1.47 3.18-2.712 3.635-4.654.176-.75.21-1.415.21-4.09 0-1.757-.044-4.066-.099-5.13l-.1-1.936zm4.613.078c-.88 0-1.135.035-1.187.17-.036.094-.13.631-.21 1.192-.166 1.149-.216 8.52-.063 9.238.05.24.16.435.244.435.187 0 2.043-1.36 4.224-3.097 2.064-1.644 4.937-3.795 6.537-4.895 1.667-1.145 2.062-1.487 1.903-1.648-.39-.394-8.591-1.395-11.448-1.395zm-52.53.037c-.027-.027-1.533.01-3.346.072-3.868.14-6.507.42-9.897 1.053-1.353.253-2.5.46-2.549.461-.13 0-.1 7.135.033 8.076.254 1.783.84 2.877 2.053 3.828 1.36 1.068 3.05 1.633 5.38 1.801 1.198.086 1.404.082 3.12-.059 1.754-.143 3.293-.702 4.21-1.53 1.017-.919 1.258-1.985 1.259-5.609 0-2.549-.177-8.006-.264-8.093zm-18.028 2.168c-.644 0-7.711 1.827-10.117 2.615-1.53.501-1.748.637-2.03 1.258-.774 1.706.416 5.16 2.325 6.752.762.636 2.022 1.209 3.027 1.377 1.198.2 2.88-.055 4.01-.61.956-.469 2.061-1.493 2.433-2.253.422-.862.525-2.013.526-5.856 0-2.838-.024-3.283-.174-3.283zm-15.336 4.541c-.31 0-.76.09-1.482.278-3.122.81-6.358 2.143-6.358 2.619 0 .23.713.9 1.299 1.22.34.186 1.011.455 1.49.598 1.981.59 4.348.073 5.229-1.143.693-.957.932-2.667.455-3.273-.154-.195-.323-.294-.633-.297zm121.377.998c-.205.01-.204.077-.191.354.017.389 1.19 2.953 1.515 3.312.264.292.544.257 1.33-.162.713-.38 1.377-1.019 1.377-1.326 0-.348-.363-.87-.799-1.145-.601-.38-2.35-.985-2.953-1.023-.12-.01-.21-.012-.28-.01zm-117.174 32.823c-.814.023-1.507.16-2.01.398-.536.254-.598.45-.26.816.806.87 5.176 3.825 7.247 4.899 1.08.56 1.455.222 1.224-1.102-.571-3.283-2.204-4.808-5.35-4.996a10 10 0 0 0-.85-.016zm109.54.183c-.716 0-1.45.064-1.905.188-3.269.89-4.616 2.443-4.494 5.193.02.474.066.929.1 1.008.134.32.651.12 2.35-.906 3.46-2.091 6.563-4.33 6.563-4.737 0-.18-.3-.383-.834-.56-.37-.125-1.066-.188-1.78-.188zm-95.763 2.754c-.9-.019-1.744.053-2.293.219-2.027.612-2.962 1.676-2.964 3.373-.002 1.393.502 1.946 2.845 3.119 1.744.873 5.44 2.449 7.319 3.12 1.105.394 1.023.385 1.252.132.34-.377.462-1.649.404-4.246-.065-2.892-.194-3.487-.906-4.166-.512-.488-1.286-.804-3.014-1.23-.783-.194-1.742-.303-2.643-.32zm82.51.01c-1.678.01-1.958.036-2.88.318-1.802.552-3.252 1.411-3.856 2.284-.178.257-.416.802-.53 1.21-.447 1.615-.582 5.463-.218 6.26l.135.293.78-.216c1.767-.49 6.087-2.224 8.776-3.524 2.39-1.155 2.711-1.55 2.592-3.197-.06-.837-.629-2.05-1.191-2.543-.217-.19-.7-.47-1.073-.62-.614-.246-.849-.275-2.535-.265zm-67.119 1.834c-1.45-.034-2.814.026-3.545.19-.828.185-1.642.753-1.99 1.386-.512.931-.608 1.616-.674 4.832l-.062 3.022.623.205c4.923 1.613 9.01 2.694 12.3 3.256.61.104.748.035.907-.446.38-1.157.424-5.753.076-8.203-.344-2.417-1.286-3.439-3.572-3.877-1.075-.205-2.613-.331-4.063-.365zm52.424.025c-3.18.015-5.7.345-6.797.889-.602.298-1.297.963-1.58 1.512-.598 1.158-.94 3.897-.961 7.697-.01 1.796.025 2.509.135 2.7.096.17.26.263.459.263.544 0 13.29-3.104 13.443-3.274.02-.022.095-1.293.168-2.828.195-4.096.05-4.797-1.26-6.021-.967-.905-1.136-.95-3.607-.938zm-34.91.576c-2.911 0-3.98.109-5.13.535-1.245.463-1.925 1.193-2.327 2.497-.31 1-.262 3.685.125 7.12.168 1.498.319 2.73.334 2.74s.837.132 1.828.268c1.713.237 4.475.453 6.62.522.544.017 2.047.044 3.34.057l2.354.023-.002-4.387c0-6.345-.113-6.996-1.379-8.004-1.527-1.215-2.177-1.37-5.763-1.37zm16.148 0c-2.158 0-2.559.024-3.47.256-1.23.313-2.542.972-2.922 1.47-.47.615-.547 1.519-.606 6.968l-.055 5.1 3.817-.067c4.086-.07 5.955-.197 8.633-.59l1.69-.248.2-2.671c.111-1.47.216-3.745.233-5.055.034-2.637.015-2.724-.744-3.45-.55-.525-1.944-1.15-3.233-1.45-.948-.221-1.446-.262-3.543-.262z"
            style="display:inline;fill:#fff;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.716;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
            transform="translate(1017.782 -505.498)scale(.88007)" />
         </g>
            <g id="svg-part-lidah" class="cursor-pointer" style="${isKActive('Lidah') ? activeGlow : normalTransition}" onclick="changeKepala('Lidah')" onmouseenter="hoverPart('Lidah', activeKepala)" onmouseleave="unhoverPart('Lidah', activeKepala)">
                <path id="path106"
            d="M-800.958 1193.23c-.09-.024-.693-.281-1.339-.572-2.008-.905-3.34-1.141-6.424-1.139-2.855 0-4.17.208-6.243.98-1.843.685-2.23.692-3.595.06-1.076-.499-1.503-.629-2.77-.844-1.301-.22-4.104-.3-5.63-.16-1.98.18-2.875.383-4.885 1.104-.625.224-.951.295-1.361.296-.667 0-1.046-.11-2.548-.745-.651-.275-1.599-.607-2.105-.738-3.15-.812-7.352-.848-9.406-.08-.25.094-.71.336-1.02.537-.63.408-.992.514-1.262.37-.1-.054-.52-.402-.933-.775-.927-.835-1.81-1.52-2.382-1.847-.6-.344-.76-.533-.651-.768.128-.276.88-1.107 1.487-1.645 1.73-1.531 5.207-3.261 9.337-4.646 4.475-1.5 8.593-2.512 16.1-3.956 9.038-1.737 13.827-3.225 19.435-6.038 5.304-2.66 10.305-6.026 19.831-13.349 8.408-6.463 11.337-8.402 14.058-9.306 1.525-.506 2.167-.589 4.59-.59 2.895 0 3.646.163 5.325 1.172 2.754 1.656 4.936 4.103 6.535 7.328 1.558 3.144 2.382 6.436 2.643 10.556.234 3.692-.204 7.398-1.456 12.322-.772 3.04-1.37 4.16-2.517 4.719-.718.35-1.232.46-3.425.741-3.897.498-5.158.978-7.258 2.764-.936.796-1.417 1.057-1.823.991-.147-.024-.533-.16-.857-.302-1.057-.464-1.47-.522-3.78-.535-2.605-.014-2.647-.017-2.827-.149-.14-.101-.131-.141.153-.706.166-.328.62-1.12 1.008-1.76l1.477-2.436c1.309-2.16 3.167-5.995 4.38-9.036.901-2.26 1.338-3.65 1.635-5.2.187-.977.206-1.208.098-1.208-.12 0-.59.964-2.468 5.05-1.815 3.95-2.71 5.72-3.949 7.806-1.494 2.518-3.551 5.451-5.013 7.147-.913 1.058-2.599 2.682-3.071 2.958-.546.319-1.127.31-2.204-.03-2.775-.875-6.575-.866-10.07.024-1.131.288-1.685.504-2.859 1.115-.98.51-1.488.644-1.96.52z"
            style="display:inline;fill:#da4445;fill-opacity:1;fill-rule:evenodd;stroke:#281a16;stroke-width:3.782;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill"
            transform="translate(1017.782 -505.498)scale(.88007)" />
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
            <div class="bg-[#1b242d] dark:bg-[#e2e8f0] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
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
            <div class="bg-[#1b242d] dark:bg-[#e2e8f0] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
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
            <div class="bg-[#1b242d] dark:bg-[#e2e8f0] text-white dark:text-[#1b242d] text-lg font-bold uppercase tracking-widest px-10 py-2.5 rounded-xl mb-8 shadow-inner self-center">
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
    
    // Gabungkan seluruh kata dasar dan hilangkan duplikasi (jika ada)
    const rawWords = [
        ...warnaKeys,
        ...swadeshCore.angka,
        ...swadeshCore.kepala,
        ...swadeshCore.badan,
        ...(swadeshCore.organlain || []),
        ...swadeshCore.animal,
        ...swadeshCore.plant
    ];
    const allWords = [...new Set(rawWords)];

    // Pemetaan locale untuk Bahasa Indonesia (id), Melayu (ms), dan Inggris (en)
    const localeMap = {
        'id': 'id',
        'my': 'ms',
        'en': 'en'
    };
    const activeLocale = localeMap[currentLangUI] || 'id';

    // Urutkan secara alfabetis berdasarkan teks terjemahan bahasa UI yang sedang aktif
    allWords.sort((keyA, keyB) => {
        const wordA = t('word_' + keyA.toLowerCase(), currentLangUI);
        const wordB = t('word_' + keyB.toLowerCase(), currentLangUI);
        const comparison = wordA.localeCompare(wordB, activeLocale, { sensitivity: 'base' });
        return tableSortOrder === 'asc' ? comparison : -comparison;
    });

    // Header kolom Kata Dasar dengan tombol toggle sortir A-Z / Z-A
    const sortBadgeText = tableSortOrder === 'asc' ? 'A → Z' : 'Z → A';
    const sortIconName = tableSortOrder === 'asc' ? 'arrow-down-a-z' : 'arrow-up-z-a';

    let headers = `
        <th onclick="toggleTableSortOrder()" class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <div class="flex items-center justify-between gap-3">
                <span>${t('header_kata_dasar')}</span>
                <span class="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-400 text-slate-900 shadow-xs">
                    <span>${sortBadgeText}</span>
                    <i data-lucide="${sortIconName}" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                </span>
            </div>
        </th>`;

    // Header untuk setiap bahasa terpilih beserta benderanya
    selectedLangs.forEach(code => {
        const langInfo = typeof languageMap !== 'undefined' ? languageMap[code] : null;
        const displayName = getLanguageDisplayName(code);

        let flagHtml = '';
        if (langInfo?.icon && (typeof icons === 'undefined' || langInfo.icon !== icons.placeholder)) {
            flagHtml = `<span class="inline-block h-[18px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] bg-slate-100 dark:bg-slate-800">${langInfo.icon}</span>`;
        }

        headers += `
            <th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 whitespace-nowrap">
                <div class="flex items-center gap-2">
                    ${flagHtml}
                    <span>${displayName}</span>
                </div>
            </th>`;
    });

    // Render baris data tabel
    let rows = allWords.map((word, i) => {
        const displayWord = t('word_' + word.toLowerCase(), currentLangUI);
        const bg = i % 2 === 0 ? 'bg-white dark:bg-serumpun-dark' : 'bg-slate-50 dark:bg-slate-800/50';
        let cells = `<td class="py-3 px-4 text-slate-800 dark:text-slate-200 font-bold border-t border-slate-200 dark:border-slate-700">${displayWord}</td>`;

        selectedLangs.forEach(code => {
            const translated = dataMap[code]?.words?.[word] || '-';
            const diakritik = dataMap[code]?.diakritik?.[word];
            const diakritikHtml = diakritik 
                ? `<span class="text-xs text-slate-400 dark:text-slate-500 italic block font-serif">[${diakritik}]</span>` 
                : '';

            cells += `<td class="py-3 px-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">${translated} ${diakritikHtml}</td>`;
        });

        return `<tr class="${bg} hover:bg-amber-500/10 transition-colors">${cells}</tr>`;
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