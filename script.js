// --- 1. METADATA & DATA (Mekanisme ISO 639-3) ---
function getFlag(filename) {
    return `<img src="./flag/${filename}" alt="Bendera" class="w-full h-full object-cover" 
                     onerror="this.src='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23cbd5e1%22%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%228%22 opacity=%220.3%22/%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%224%22/%3E%3C/svg%3E'">`;
}

const icons = {
    placeholder: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" opacity="0.3"/><circle cx="12" cy="12" r="4"/></svg>`,
    indonesia: getFlag('indonesia.svg'),
    malaysia: getFlag('malaysia.svg'),
    brunei: getFlag('brunei.svg'),
    aceh: getFlag('aceh.svg'),
    gayo: getFlag('gayo.svg'),
    jawa: getFlag('jawa.svg'),
    bali: getFlag('bali.svg'),
    sunda: getFlag('sunda.svg'),
    sunbanten: getFlag('sunbanten.svg'),
    banten: getFlag('banten.svg'),
    sasak: getFlag('sasak.svg'),
    betawi: getFlag('betawi.svg'),
    madura: getFlag('madura.svg'),
    sumbawa: getFlag('sumbawa.svg'),
    bima: getFlag('bima.svg'),
    karo: getFlag('karo.svg'),
    simalungun: getFlag('simalungun.svg'),
    pakpak: getFlag('pakpak.svg'),
    toba: getFlag('toba.svg'),
    angkola: getFlag('angkola.svg'),
    kerinci: getFlag('kerinci.svg'),
    sumtim: getFlag('sumtim.svg'),
    asahan: getFlag('asahan.svg'),
    riau: getFlag('riau.svg'),
    kelantan: getFlag('kelantan.svg'),
    terengganu: getFlag('terengganu.svg'),
    pahang: getFlag('pahang.svg'),
    perak: getFlag('perak.svg'),
    negeri: getFlag('negeri.svg'),
    kedah: getFlag('kedah.svg'),
    jambi: getFlag('jambi.svg'),
    musi: getFlag('musi.svg'),
    ketapang: getFlag('ketapang.svg'),
    minang: getFlag('minang.svg'),
    nias: getFlag('nias.svg'),
    api: getFlag('saibatin.svg'),
    nyo: getFlag('pepadun.svg'),
    iban: getFlag('iban.svg'),
    ngaju: getFlag('ngaju.svg'),
    kadazan: getFlag('kadazandusun.svg'),
    tidong: getFlag('tidong.svg'),
    banjar: getFlag('banjar.svg'),
    kutai: getFlag('kutai.svg'),
    makassar: getFlag('makassar.svg'),
    bugis: getFlag('bugis.svg'),
    tolaki: getFlag('tolaki.svg'),
    muna: getFlag('muna.svg'),
    gorontalo: getFlag('gorontalo.svg')
};

const bibliographyBase = [
    `<strong>Blust, Robert.</strong> (2013). <em>The Austronesian Languages</em>. Edisi Revisi. Asia-Pacific Linguistics, Australian National University.`,
    `<strong>Adelaar, K. Alexander & Himmelmann, N.</strong> (2005). <em>The Austronesian Languages of Asia and Madagascar</em>. Routledge.`,
    `<strong>Kridalaksana, Harimurti.</strong> (2008). <em>Kamus Linguistik</em>. Edisi Keempat. Gramedia Pustaka Utama, Jakarta.`,
    `<strong>Swadesh, Morris.</strong> (1955). <em>Towards Greater Accuracy in Lexicostatistic Dating</em>. International Journal of American Linguistics, 21(2), 121-137.`
];

// Definisi lengkap Bahasa beserta file sumber dan bibliografi spesifik
const languageMap = {
    'ind': { name: 'Indonesia', code: 'id', icon: icons.indonesia, file: 'bahasa/ind.json' },
    'zsm': { name: 'Melayu (MY)', code: 'my', icon: icons.malaysia, file: 'bahasa/zsm.json', biblio: `<strong>Asmah Haji Omar.</strong> (2015). <em>Ensiklopedia Bahasa Melayu</em>. Dewan Bahasa dan Pustaka, Kuala Lumpur.` },
    'jav': {
        name: 'Jawa',
        icon: icons.jawa,
        dialects: {
            'standard': {
                name: 'Baku',
                registers: {
                    'ngoko': { name: 'Ngoko', file: 'bahasa/jav_ngoko.json' },
                    'krama': { name: 'Krama', file: 'bahasa/jav_krama.json' }
                }
            },
            'cirebon': {
                name: 'Cirebon',
                file: 'bahasa/jav_cirebon.json'
            },
            'tegal': {
                name: 'Tegal',
                file: 'bahasa/jav_tegal.json'
            },
            'ngawi': {
                name: 'Ngawi',
                file: 'bahasa/jav_ngawi.json'
            },
        }
    },
    'sun': {
        name: 'Sunda Jawa Barat',
        icon: icons.sunda,
        dialects: {
            'standard': {
                name: 'Baku (Priangan)',
                registers: {
                    'loma': { name: 'Loma', file: 'bahasa/sun_loma.json' },
                    'lemes': { name: 'Lemes', file: 'bahasa/sun_lemes.json' }
                }
            },
            'bogorkarawang': {
                name: 'Bogor-Karawang',
                file: 'bahasa/sun_bogorkarawang.json',
                biblio: '<strong>Hardja Sudjana, Ahmad S., Ahmad Marzuki, Ahmad Abas, dan Rukmanta Jayawiguna.</strong> (1983). <em>Struktur Bahasa Sunda Pesisir Utara Jawa Barat</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.',
            },
            'indramayu': {
                name: 'Indramayu',
                file: 'bahasa/sun_indramayu.json'
            },
        }
    },
    'sunbanten': {
        name: 'Sunda Banten',
        icon: icons.sunbanten,
        dialects: {
            'standard': {
                name: 'Sérang',
                file: 'bahasa/sun_serang.json',
                biblio: '',
            },
            'tangerang': {
                name: 'Tangerang',
                file: 'bahasa/sun_tangerang.json',
                biblio: '<strong>Sobarna, C.; Wartini, T.; Ampera, T.<strong> (2022). <em>Bahasa dan Sastra Daerah di Kabupaten Tangerang</em>. Tangerang: Pusat Studi Sunda dan Pemerintah Kabupaten Tangerang.',
            },
            'pandeglang': {
                name: 'Pandéglang',
                file: 'bahasa/sun_pandeglang.json',
                biblio: '<strong>Sujana, Dadan.</strong> (Penyunting). (2015). <em>Bahasa Sunda Banten di Pandéglang</em>. Dinas Kebudayaan dan Pariwisata Provinsi Banten dan Banten Heritage, Serang dan Pandeglang.',
            },
            'baduy': {
                name: 'Baduy',
                file: 'bahasa/sun_baduy.json',
                biblio: '',
            },
        }
    },
    'bew': { name: 'Betawi', icon: icons.betawi, file: 'bahasa/bew.json' },
    'mad': { name: 'Madura', icon: icons.madura, file: 'bahasa/mad.json' },
    'ban': { name: 'Bali', icon: icons.bali, registers: { 'andap': { name: 'Andap', file: 'bahasa/ban_andap.json' }, 'alus': { name: 'Alus', file: 'bahasa/ban_alus.json' } }, },
    'banten': { name: 'Jawa Sérang', icon: icons.banten, file: 'bahasa/banten.json' },
    'sas': { name: 'Sasak', icon: icons.sasak, file: 'bahasa/sas.json' },
    'smw': { name: 'Sumbawa', icon: icons.sumbawa, file: 'bahasa/smw.json' },
    'bhp': { name: 'Bima', icon: icons.bima, file: 'bahasa/bhp.json' },
    'ace': { name: 'Aceh', icon: icons.aceh, file: 'bahasa/ace.json' },
    'gay': { name: 'Gayo', icon: icons.gayo, file: 'bahasa/gay.json' },
    'btz': { name: 'Batak Alas', icon: icons.placeholder, file: 'bahasa/btz.json' },
    'btx': { name: 'Batak Karo', icon: icons.karo, file: 'bahasa/btx.json' },
    'bts': { name: 'Batak Simalungun', icon: icons.simalungun, file: 'bahasa/bts.json' },
    'btp': { name: 'Batak Pakpak', icon: icons.pakpak, file: 'bahasa/btp.json' },
    'bbc': { name: 'Batak Toba', icon: icons.toba, file: 'bahasa/bbc.json' },
    'akb': { name: 'Batak Angkola-Mandailing', icon: icons.angkola, file: 'bahasa/akb.json' },
    'kvr': { name: 'Kerinci', icon: icons.kerinci, file: 'bahasa/kvr.json' },
    'deli': {
        name: 'Melayu Sumatera Timur',
        icon: icons.sumtim,
        dialects: {
            'standard': { name: 'Deli', file: 'bahasa/deli.json' },
            'langkat': { name: 'Langkat', file: 'bahasa/langkat.json' },
            'tamiang': { name: 'Tamiang', file: 'bahasa/tamiang.json' },
        }
    },
    'asahan': { name: 'Melayu Asahan-Panai', icon: icons.asahan, file: 'bahasa/asahan.json' },
    'riau': {
        name: 'Melayu Riau',
        icon: icons.riau,
        dialects: {
            'standard': { name: 'Siak', file: 'bahasa/siak.json' },
            'rokan': { name: 'Rokan', file: 'bahasa/rokan.json' },
            'kuansing': { name: 'Kuantan Singingi', file: 'bahasa/kuansing.json' },
        }
    },
    'zlm': { name: 'Melayu Kelantan', icon: icons.kelantan, file: 'bahasa/zlm.json' },
    'terengganu': {
        name: 'Melayu Terengganu',
        icon: icons.terengganu,
        dialects: {
            'standard': { name: 'Pesisir', file: 'bahasa/terengganupesisir.json' },
            'hulu': { name: 'Hulu', file: 'bahasa/terengganuhulu.json' }
        }
    },
    'pahang': {
        name: 'Melayu Pahang',
        icon: icons.pahang,
        dialects: {
            'standard': { name: 'Umum', file: 'bahasa/pahang.json' },
            'timur': { name: 'Timur (Kuantan-Gambang)', file: 'bahasa/pahangtimur.json' },
            'hilir': { name: 'Hilir (Pekan-Rompin)', file: 'bahasa/pahanghilir.json' },
            'tengah': { name: 'Tengah (Temerloh-Teriang)', file: 'bahasa/pahangtengah.json' },
            'barat': { name: 'Barat (Raub)', file: 'bahasa/pahangbarat.json' },
            'hulu': { name: 'Hulu (Lipis)', file: 'bahasa/pahanghulu.json' },
            'tembeling': { name: 'Hulu Tembeling', file: 'bahasa/pahangtembeling.json' },
            'jerantut': { name: 'Jerantut', file: 'bahasa/pahangjerantut.json' },
            'bentong': { name: 'Bentong', file: 'bahasa/pahangbentong.json' },
            'rompin': { name: 'Hulu Rompin', file: 'bahasa/pahangrompin.json' },
        }
    },
    'perak': { name: 'Melayu Perak', icon: icons.perak, file: 'bahasa/perak.json' },
    'meo': {
        name: 'Melayu Kedah',
        icon: icons.kedah,
        dialects: {
            'standard': { name: 'Kedah', file: 'bahasa/meo.json' },
            'perlis': { name: 'Perlis', file: 'bahasa/perlis.json' },
            'pinang': { name: 'Pulau Pinang', file: 'bahasa/pinang.json' },
        }
    },
    'zmi': { name: 'Melayu Negeri Sembilan', icon: icons.negeri, file: 'bahasa/zmi.json' },
    'jax': {
        name: 'Melayu Jambi',
        icon: icons.jambi,
        dialects: {
            'standard': { name: 'Umum', file: 'bahasa/jax.json' },
            'seberang': { name: 'Seberang', file: 'bahasa/jambi_seberang.json' },
            'anakdalam': { name: 'Anak Dalam', file: 'bahasa/jambi_anakdalam.json' },
            'kualajambi': { name: 'Kuala Jambi', file: 'bahasa/jambi_kuala.json', biblio: `<strong>Mira, Gustia, M. Jul Adwin, Rahmadina, & Fitria.</strong> (2025). <em>Kamus Melayu Jambi Dialek Teluk Majelis-Indonesia</em>. Balai Bahasa Provinsi Jambi, Jambi.` },
        }
    },
    'mfb': { name: 'Melayu Bangka', icon: icons.placeholder, file: 'bahasa/mfb.json' },
    'mui': {
        name: 'Melayu Musi',
        icon: icons.musi,
        dialects: {
            'standard': {
                name: 'Musi',
                file: 'bahasa/mui.json'
            },
            'palembang': {
                name: 'Palembang',
                registers: {
                    'sari': { name: 'Sari-sari', file: 'bahasa/palembang_sari.json' },
                    'bebaso': { name: 'Bebaso', file: 'bahasa/palembang_bebaso.json' }
                }
            },
            'lematang': {
                name: 'Lematang',
                file: 'bahasa/lmt.json'
            },
        }
    },
    'pse': {
        name: 'Melayu Tengah',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Besemah', file: 'bahasa/pse.json' },
        }
    },
    'rej': { name: 'Rejang', icon: icons.placeholder, file: 'bahasa/rej.json' },
    'ketapang': { name: 'Melayu Ketapang', icon: icons.ketapang, file: 'bahasa/ketapang.json' },
    'min': { name: 'Minangkabau', icon: icons.minang, file: 'bahasa/min.json' },
    'nia': { name: 'Nias', icon: icons.nias, file: 'bahasa/nia.json' },
    'mwv': {
        name: 'Mentawai',
        icon: icons.placeholder,
        file: 'bahasa/mwv.json',
        biblio: '<strong>Khatib, Yusran, Erizal Gani, Nurzuir Husin, & Jufrizal.</strong> (1998). <em>Kamus Bahasa Indonesia-Mentawai</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.'
    },
    'ljp': { name: 'Lampung Api', icon: icons.api, file: 'bahasa/ljp.json' },
    'abl': { name: 'Lampung Nyo', icon: icons.nyo, file: 'bahasa/abl.json' },
    'kge': { name: 'Komering', icon: icons.placeholder, file: 'bahasa/kge.json' },
    'kxd': { name: 'Melayu Brunei', icon: icons.brunei, file: 'bahasa/kxd.json' },
    'iba': { name: 'Dayak Iban', icon: icons.iban, file: 'bahasa/iba.json' },
    'nij': { name: 'Dayak Ngaju', icon: icons.ngaju, file: 'bahasa/nij.json' },
    'dtp': {
        name: 'Kadazan-Dusun',
        icon: icons.kadazan,
        dialects: {
            'standard': { name: 'BunduLiwan', file: 'bahasa/dtp.json' },
            'tangaa': { name: 'Tangaa', file: 'bahasa/kzj.json' },
            'kimaragang': { name: 'Kimaragang', file: 'bahasa/kqr.json' },
            'klias': { name: 'Sungai Klias', file: 'bahasa/kqt.json' },
            'kinabatangan': { name: 'Labuk-Kinabatangan', file: 'bahasa/dtb.json' },
            'lotud': { name: 'Lotud', file: 'bahasa/dtr.json' },
        }
    },
    'kayan': {
        name: 'Dayak Kayan',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Baram-Sungai Kayan', file: 'bahasa/kayan_baram.json' },
        }
    },
    'tid': {
        name: 'Tidong',
        icon: icons.tidong,
        dialects: {
            'standard': { name: 'Baram-Sungai Kayan', file: 'bahasa/kayan_baram.json' },
        }
    },
    'murut': {
        name: 'Dayak Murut',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Tahol', file: 'bahasa/mvv.json' },
            'timugon': { name: 'Timugon', file: 'bahasa/tih.json' },
        }
    },
    'bjn': { name: 'Banjar', icon: icons.banjar, dialects: { 'standard': { name: 'Kuala', file: 'bahasa/bjn_kuala.json' }, 'hulu': { name: 'Hulu', file: 'bahasa/bjn_hulu.json' } } },
    'vkt': { name: 'Kutai', icon: icons.kutai, dialects: { 'standard': { name: 'Tenggarong', file: 'bahasa/vkt.json' }, 'kotabangun': { name: 'Kota Bangun', file: 'bahasa/mqg.json' } } },
    'bve': { name: 'Berau', icon: icons.placeholder, file: 'bahasa/bve.json' },
    'mak': {
        name: 'Makassar',
        icon: icons.makassar,
        dialects: {
            'standard': { name: 'Baku', file: 'bahasa/mak.json' },
            'selayar': { name: 'Selayar', file: 'bahasa/mak_selayar.json' }
        }
    },
    'bug': { 
        name: 'Bugis', 
        icon: icons.bugis, 
        dialects: {
            'standard': { name: 'Baku', file: 'bahasa/bug.json' },
            'sawitto': { name: 'Sawitto', file: 'bahasa/bug_sawitto.json' }
        }
    },
    'mdr': { name: 'Mandar', icon: icons.placeholder, file: 'bahasa/mdr.json', biblio: '<strong>Muthalib, Abdul.</strong> (1977). <em>Kamus Bahasa Mandar - Indonesia</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.' },
    'lew': { name: 'Kaili Ledo', icon: icons.placeholder, file: 'bahasa/lew.json' },
    'loe': { name: 'Saluan', icon: icons.placeholder, file: 'bahasa/loe.json' },
    'lbw': { name: 'Tolaki', icon: icons.tolaki, file: 'bahasa/lbw.json', biblio: '<strong>Muthalib, Abdul, Alimuddin D.P., Husen Chalik, & Arsamid.</strong> (1985). <em>Kamus Tolaki – Indonesia</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.' },
    'mnb': { name: 'Muna', icon: icons.muna, file: 'bahasa/mnb.json' },
    'gor': { name: 'Gorontalo', icon: icons.gorontalo, file: 'bahasa/gor.json' },
    'tld': { name: 'Talaud', icon: icons.placeholder, file: 'bahasa/tld.json', biblio: '<strong>Balai Bahasa Sulawesi Utara.</strong> (2018). <em>Kamus Dwibahasa Bahasa Talaud-Bahasa Indonesia</em>. Balai Bahasa Sulawesi Utara, Manado.' },
    'mqy': { name: 'Manggarai', icon: icons.placeholder, file: 'bahasa/mqy.json', biblio: '<strong>Lon, Yohanes S., Inosensius Sutam, Fransiska Widyawati, Bonefasius Rampung, Eliterius Sennen, Stanislaus Tatul, Bernadeta Dudet, Andreas Alang, Maria Jelamut, Fransiskus Sawan, & Yohanes Mariano Dangku.</strong> (2018). <em>Kamus Bahasa Indonesia – Manggarai</em>. PT Kanisius & LPPM STKIP Santu Paulus Ruteng, Yogyakarta & Ruteng.' },
    'aoz': { name: 'Uab Meto', icon: icons.placeholder, file: 'bahasa/aoz.json' },
    'bhw': { name: 'Biak', icon: icons.placeholder, file: 'bahasa/bhw.json' },
    'kei': { name: 'Kei', icon: icons.placeholder, file: 'bahasa/kei.json' }
};

const swadeshCore = {
    warna: ['Merah', 'Putih', 'Hitam', 'Hijau'],
    tubuh: ['Kepala', 'Tangan', 'Mata', 'Kaki'],
    hewan: ['Anjing', 'Ikan', 'Burung', 'Ular'],
    kerja: ['Makan', 'Minum', 'Tidur', 'Jalan']
};

const translationsUI = {
    id: {
        emptyMsg: "Silakan pilih bahasa dari peta untuk memulai.",
        dialek: "Pilih Dialek",
        tingkat: "Tingkat Bahasa",
        menunggu: "Menunggu pilihan bahasa..."
    },
    my: {
        emptyMsg: "Sila pilih bahasa dari peta untuk bermula.",
        dialek: "Pilih Dialek",
        tingkat: "Tahap Bahasa",
        menunggu: "Menunggu pilihan bahasa..."
    },
    en: {
        emptyMsg: "Please select languages from the map to start.",
        dialek: "Select Dialect",
        tingkat: "Language Register",
        menunggu: "Waiting for language selection..."
    }
};

let currentLangUI = 'id';
let viewMode = 'swadesh'; // 'swadesh' | 'list'
let selectedLangs = [];
let activeDialects = {};
let activeRegisters = {};
let languageCache = {}; // Cache JSON

// --- 2. INISIALISASI ---
window.onload = () => {
    lucide.createIcons();
    initMapInteractive();
    updateBibliography();
    renderEmptyDictionary();
};

// --- 3. UI CONTROLS ---
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('theme-icon').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
}

function changeUILang(lang) {
    currentLangUI = lang;
    const t = translationsUI[lang];

    if (lang === 'id') { document.getElementById('current-lang-text').innerText = 'Indonesia'; document.getElementById('ui-desc').innerText = 'Jelajahi perbandingan kosa kata bahasa-bahasa Austronesia di Nusantara.'; }
    if (lang === 'my') { document.getElementById('current-lang-text').innerText = 'Melayu'; document.getElementById('ui-desc').innerText = 'Terokai perbandingan kosa kata bahasa-bahasa Austronesia di Nusantara.'; }
    if (lang === 'en') { document.getElementById('current-lang-text').innerText = 'English'; document.getElementById('ui-desc').innerText = 'Explore the vocabulary comparison of Austronesian languages in the Archipelago.'; }

    if (selectedLangs.length === 0) {
        renderEmptyDictionary();
    } else {
        fetchAndRenderDictionary();
    }
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
    scrollContainer.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - scrollContainer.offsetLeft; startY = e.pageY - scrollContainer.offsetTop; scrollLeft = scrollContainer.scrollLeft; scrollTop = scrollContainer.scrollTop; });
    scrollContainer.addEventListener('mouseleave', () => isDown = false);
    scrollContainer.addEventListener('mouseup', () => isDown = false);
    scrollContainer.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - scrollContainer.offsetLeft; const y = e.pageY - scrollContainer.offsetTop; scrollContainer.scrollLeft = scrollLeft - (x - startX); scrollContainer.scrollTop = scrollTop - (y - startY); });

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
        region.addEventListener('mousemove', (e) => { tooltip.style.left = e.clientX + 'px'; tooltip.style.top = e.clientY + 'px'; });
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
            alert("Maksimal memilih 3 bahasa.");
            return;
        }
        selectedLangs.push(langCode);
        if (el) el.classList.add('selected');

        const langInfo = languageMap[langCode];

        // Setup initial default logic (PENTING untuk mekanisme nested)
        if (langInfo.dialects) {
            const firstDialectKey = Object.keys(langInfo.dialects)[0];
            activeDialects[langCode] = firstDialectKey;

            // Cek apakah dialek pertama ini punya register di dalamnya
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

// Handler khusus saat dialek diubah
function handleDialectChange(langCode, dialectKey) {
    activeDialects[langCode] = dialectKey;
    const dialectMeta = languageMap[langCode].dialects[dialectKey];

    // Cek apakah dialek yang baru dipilih memiliki tingkatan bahasa (register)
    if (dialectMeta && dialectMeta.registers) {
        activeRegisters[langCode] = Object.keys(dialectMeta.registers)[0];
    } else {
        // Hapus register jika dialek ini tidak punya tingkatan
        delete activeRegisters[langCode];
    }

    updateDropdownsUI();
    fetchAndRenderDictionary();
}

// Handler khusus saat register diubah
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
        dOptions.innerHTML = `<span class="text-sm italic text-slate-400">Pilih bahasa...</span>`;
        rOptions.innerHTML = `<span class="text-sm italic text-slate-700">Pilih bahasa...</span>`;
        return;
    }

    dOptions.innerHTML = '';
    rOptions.innerHTML = '';

    selectedLangs.forEach(code => {
        const langInfo = languageMap[code];
        let activeDialectObj = null;

        // Render Opsi Dialek
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

        // Tentukan dari mana asal Register (apakah dari root bahasa, atau dari dalam dialek yang aktif)
        let registersObj = null;
        let baseName = langInfo.name;

        if (langInfo && langInfo.registers) {
            registersObj = langInfo.registers;
        } else if (activeDialectObj && activeDialectObj.registers) {
            registersObj = activeDialectObj.registers;
            baseName = activeDialectObj.name; // Tampilkan nama dialek di dropdown register
        }

        // Render Opsi Register
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

    // Toggle Box Appearance
    if (hasDialect) {
        dBox.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
    } else {
        dBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        dOptions.innerHTML = `<span class="text-sm italic text-slate-400">- Tidak tersedia -</span>`;
    }

    if (hasRegister) {
        rBox.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
    } else {
        rBox.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        rOptions.innerHTML = `<span class="text-sm italic text-slate-700">- Tidak tersedia -</span>`;
    }
}

function updateBibliography() {
    const bibList = document.getElementById('bibliography-list');
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

// --- 5. LOGIKA DATA JSON & RENDERING ---
async function loadLanguageJSON(langCode) {
    const langMeta = languageMap[langCode];
    let fetchKey = langCode;
    let filePath = langMeta.file;
    let currentLevel = langMeta;

    // Cek Level 1: Dialek
    if (langMeta.dialects && activeDialects[langCode]) {
        const activeD = activeDialects[langCode];
        fetchKey += `_${activeD}`;
        currentLevel = langMeta.dialects[activeD];
        if (currentLevel.file) filePath = currentLevel.file;
    }

    // Cek Level 2: Register (Bisa di root, bisa di dalam dialek)
    if (currentLevel.registers && activeRegisters[langCode]) {
        const activeR = activeRegisters[langCode];
        fetchKey += `_${activeR}`;
        currentLevel = currentLevel.registers[activeR];
        if (currentLevel.file) filePath = currentLevel.file;
    }

    if (languageCache[fetchKey]) return languageCache[fetchKey];

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP Error`);
        const data = await response.json();
        languageCache[fetchKey] = data;
        return data;
    } catch (error) {
        // Fallback Mockup Data (Agar Preview Tetap Berjalan meskipun file tidak ada)
        const fallback = { words: {} };
        Object.values(swadeshCore).flat().forEach(w => {
            let fake = w.toLowerCase();
            // Mockup sederhana membedakan tiap string berdasarkan key agar terlihat nyata
            fake = fake.replace(/[aeiou]/g, (match) => {
                if (fetchKey.includes('palembang_bebaso')) return 'o';
                if (fetchKey.includes('jav_krama')) return 'i';
                return match;
            });
            fallback.words[w] = (fake.charAt(0).toUpperCase() + fake.slice(1)) + '*';
        });
        languageCache[fetchKey] = fallback;
        return fallback;
    }
}

function renderEmptyDictionary() {
    const container = document.getElementById('dictionary-container');
    const msg = translationsUI[currentLangUI].emptyMsg;

    if (viewMode === 'swadesh') {
        container.innerHTML = `
                    <div class="text-center py-6 mb-4 opacity-70">
                        <i data-lucide="map" class="w-10 h-10 mx-auto mb-2 text-slate-400"></i>
                        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${msg}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in opacity-50 grayscale">
                        ${generateEmptyCardGroup('🎨 Spektrum Warna', swadeshCore.warna)}
                        ${generateEmptyCardGroup('🧍 Anatomi Tubuh', swadeshCore.tubuh)}
                        ${generateEmptyCardGroup('🐕 Fauna', swadeshCore.hewan)}
                        ${generateEmptyCardGroup('🏃 Kata Kerja Dasar', swadeshCore.kerja)}
                    </div>
                `;
    } else {
        container.innerHTML = `
                    <div class="text-center py-10 opacity-70">
                        <i data-lucide="table" class="w-10 h-10 mx-auto mb-2 text-slate-400"></i>
                        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${msg}</p>
                    </div>
                    <div class="bg-white dark:bg-serumpun-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden fade-in opacity-30 grayscale h-64 flex items-center justify-center">
                    </div>
                `;
    }
    lucide.createIcons();
}

function generateEmptyCardGroup(title, words) {
    let html = `
            <div class="bg-white dark:bg-serumpun-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 class="font-bold text-lg mb-4 text-slate-800 dark:text-white">${title}</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`;

    words.forEach(word => {
        html += `
                <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shadow-sm">
                    <div class="bg-slate-100 dark:bg-slate-700 py-2 px-3 text-center border-b border-slate-200 dark:border-slate-700">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">${word}</span>
                    </div>
                    <div class="flex flex-col py-4 px-3 text-center text-xs text-slate-400 italic">
                        ${translationsUI[currentLangUI].menunggu}
                    </div>
                </div>`;
    });

    html += `</div></div>`;
    return html;
}

async function fetchAndRenderDictionary() {
    const dataMap = {};
    for (let code of selectedLangs) {
        dataMap[code] = await loadLanguageJSON(code);
    }

    const container = document.getElementById('dictionary-container');
    container.innerHTML = '';

    if (viewMode === 'swadesh') {
        container.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
                        ${generatePopulatedCardGroup('🎨 Spektrum Warna', swadeshCore.warna, dataMap)}
                        ${generatePopulatedCardGroup('🧍 Anatomi Tubuh', swadeshCore.tubuh, dataMap)}
                        ${generatePopulatedCardGroup('🐕 Fauna', swadeshCore.hewan, dataMap)}
                        ${generatePopulatedCardGroup('🏃 Kata Kerja Dasar', swadeshCore.kerja, dataMap)}
                    </div>
                `;
    } else {
        container.innerHTML = generatePopulatedTableView(dataMap);
    }
}

function getLanguageDisplayName(langCode) {
    const langInfo = languageMap[langCode];
    let displayName = langInfo.name;
    let currentLevel = langInfo;

    // Cek tambahan nama Dialek
    if (activeDialects[langCode] && langInfo.dialects) {
        currentLevel = langInfo.dialects[activeDialects[langCode]];
        displayName = currentLevel.name;
    }

    // Cek tambahan nama Register
    if (activeRegisters[langCode] && currentLevel.registers) {
        displayName += ` (${currentLevel.registers[activeRegisters[langCode]].name})`;
    } else if (activeRegisters[langCode] && langInfo.registers) {
        // Fallback jika registernya ada di root
        displayName += ` (${langInfo.registers[activeRegisters[langCode]].name})`;
    }

    return displayName;
}

function generatePopulatedCardGroup(title, words, dataMap) {
    let html = `
            <div class="bg-white dark:bg-serumpun-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 class="font-bold text-lg mb-4 text-slate-800 dark:text-white">${title}</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`;

    words.forEach(word => {
        html += `
                <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div class="bg-slate-100 dark:bg-slate-700 py-2 px-3 text-center border-b border-slate-200 dark:border-slate-700">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">${word}</span>
                    </div>
                    <div class="flex flex-col">
                        ${generateTranslationRows(word, dataMap)}
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
    const allWords = [...swadeshCore.warna, ...swadeshCore.tubuh, ...swadeshCore.hewan, ...swadeshCore.kerja];

    let headers = `<th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">Kata Dasar</th>`;
    selectedLangs.forEach(code => {
        const displayName = getLanguageDisplayName(code);
        headers += `<th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">${displayName}</th>`;
    });

    let rows = allWords.map((word, i) => {
        const bg = i % 2 === 0 ? 'bg-white dark:bg-serumpun-dark' : 'bg-slate-50 dark:bg-slate-800/50';
        let cells = `<td class="py-3 px-4 text-slate-800 dark:text-slate-300 font-bold border-t border-slate-200 dark:border-slate-700">${word}</td>`;

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