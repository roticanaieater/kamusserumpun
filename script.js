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
    gorontalo: getFlag('gorontalo.svg'),
    tetun: getFlag('timor.svg')
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
            'cirebon': { name: 'Cirebon', file: 'bahasa/jav_cirebon.json' },
            'tegal': { name: 'Tegal', file: 'bahasa/jav_tegal.json' },
            'ngawi': { name: 'Ngawi', file: 'bahasa/jav_ngawi.json' }
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
                biblio: '<strong>Hardja Sudjana, Ahmad S., Ahmad Marzuki, Ahmad Abas, dan Rukmanta Jayawiguna.</strong> (1983). <em>Struktur Bahasa Sunda Pesisir Utara Jawa Barat</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.'
            },
            'indramayu': { name: 'Indramayu', file: 'bahasa/sun_indramayu.json' }
        }
    },
    'sunbanten': {
        name: 'Sunda Banten',
        icon: icons.sunbanten,
        dialects: {
            'standard': { name: 'Sérang', file: 'bahasa/sun_serang.json' },
            'tangerang': {
                name: 'Tangerang',
                file: 'bahasa/sun_tangerang.json',
                biblio: '<strong>Sobarna, C.; Wartini, T.; Ampera, T.</strong> (2022). <em>Bahasa dan Sastra Daerah di Kabupaten Tangerang</em>. Tangerang: Pusat Studi Sunda dan Pemerintah Kabupaten Tangerang.'
            },
            'pandeglang': {
                name: 'Pandéglang',
                file: 'bahasa/sun_pandeglang.json',
                biblio: '<strong>Sujana, Dadan.</strong> (Penyunting). (2015). <em>Bahasa Sunda Banten di Pandéglang</em>. Dinas Kebudayaan dan Pariwisata Provinsi Banten dan Banten Heritage, Serang dan Pandeglang.'
            },
            'baduy': { name: 'Baduy', file: 'bahasa/sun_baduy.json' }
        }
    },
    'bew': { name: 'Betawi', icon: icons.betawi, file: 'bahasa/bew.json' },
    'mad': { name: 'Madura', icon: icons.madura, file: 'bahasa/mad.json' },
    'ban': { name: 'Bali', icon: icons.bali, registers: { 'andap': { name: 'Andap', file: 'bahasa/ban_andap.json' }, 'alus': { name: 'Alus', file: 'bahasa/ban_alus.json' } } },
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
    'kvr': { name: 'Kerinci', icon: icons.kerinci, file: 'bahasa/kvr.json', biblio:'<strong>Usman, A. Hakim.</strong> (1985). <em>Kamus Umum Kerinci-Indonesia</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.' },
    'deli': {
        name: 'Melayu Sumatera Timur',
        icon: icons.sumtim,
        dialects: {
            'standard': { name: 'Deli', file: 'bahasa/deli.json' },
            'langkat': { name: 'Langkat', file: 'bahasa/langkat.json' },
            'tamiang': { name: 'Tamiang', file: 'bahasa/tamiang.json' }
        }
    },
    'asahan': { name: 'Melayu Asahan-Panai', icon: icons.asahan, file: 'bahasa/asahan.json' },
    'riau': {
        name: 'Melayu Riau',
        icon: icons.riau,
        dialects: {
            'standard': { name: 'Siak', file: 'bahasa/siak.json' },
            'rokan': { name: 'Rokan', file: 'bahasa/rokan.json' },
            'kuansing': { name: 'Kuantan Singingi', file: 'bahasa/kuansing.json' }
        }
    },
    'mfa': { name: 'Melayu Kelantan', icon: icons.kelantan, file: 'bahasa/mfa.json' },
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
            'rompin': { name: 'Hulu Rompin', file: 'bahasa/pahangrompin.json' }
        }
    },
    'perak': { name: 'Melayu Perak', icon: icons.perak, file: 'bahasa/perak.json' },
    'meo': {
        name: 'Melayu Kedah',
        icon: icons.kedah,
        dialects: {
            'standard': { name: 'Kedah', file: 'bahasa/meo.json' },
            'perlis': { name: 'Perlis', file: 'bahasa/perlis.json' },
            'pinang': { name: 'Pulau Pinang', file: 'bahasa/pinang.json' }
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
            'kualajambi': { name: 'Kuala Jambi', file: 'bahasa/jambi_kuala.json', biblio: `<strong>Mira, Gustia, M. Jul Adwin, Rahmadina, & Fitria.</strong> (2025). <em>Kamus Melayu Jambi Dialek Teluk Majelis-Indonesia</em>. Balai Bahasa Provinsi Jambi, Jambi.` }
        }
    },
    'mfb': { name: 'Melayu Bangka', icon: icons.placeholder, file: 'bahasa/mfb.json', biblio: `<strong>Khaliffitriansyah, Feri Pristiawan, Prima Hariyanto, Dwi Oktarina, Dewi Septi Kurniawati, dan Edwin Dwijaya.</strong> (2018). <em>Kamus Bahasa Melayu Bangka - Indonesia</em>. Kantor Bahasa Kepulauan Bangka Belitung, Kementerian Pendidikan dan Kebudayaan, Pangkalpinang.` },
    'mui': {
        name: 'Melayu Musi',
        icon: icons.musi,
        dialects: {
            'standard': { name: 'Musi', file: 'bahasa/mui.json' },
            'palembang': {
                name: 'Palembang',
                registers: {
                    'sari': { name: 'Sari-sari', file: 'bahasa/palembang_sari.json' },
                    'bebaso': { name: 'Bebaso', file: 'bahasa/palembang_bebaso.json' }
                }
            },
            'lematang': { name: 'Lematang', file: 'bahasa/lmt.json' }
        }
    },
    'pse': {
        name: 'Melayu Tengah',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Besemah', file: 'bahasa/pse.json' }
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
            'lotud': { name: 'Lotud', file: 'bahasa/dtr.json' }
        }
    },
    'kayan': {
        name: 'Dayak Kayan',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Baram-Sungai Kayan', file: 'bahasa/kayan_baram.json' }
        }
    },
    'tid': {
        name: 'Tidong',
        icon: icons.tidong,
        dialects: {
            'standard': { name: 'Baram-Sungai Kayan', file: 'bahasa/kayan_baram.json' }
        }
    },
    'murut': {
        name: 'Dayak Murut',
        icon: icons.placeholder,
        dialects: {
            'standard': { name: 'Tahol', file: 'bahasa/mvv.json' },
            'timugon': { name: 'Timugon', file: 'bahasa/tih.json' }
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
    'mqy': { name: 'Manggarai', icon: icons.placeholder, file: 'bahasa/mqy.json', biblio: '<strong>Lon, Yohanes S., dkk.</strong> (2018). <em>Kamus Bahasa Indonesia – Manggarai</em>. PT Kanisius & LPPM STKIP Santu Paulus Ruteng.' },
    'aoz': { name: 'Uab Meto', icon: icons.placeholder, file: 'bahasa/aoz.json' },
    'tet': { name: 'Tetun', icon: icons.tetun, file: 'bahasa/tet.json',  biblio: `<strong>Manhitu, Yohanes.</strong> (2007). <em>Kamus Indonesia-Tetun, Tetun-Indonesia</em>. Penerbit PT Gramedia Pustaka Utama, Jakarta.` },
    'bhw': { name: 'Biak', icon: icons.placeholder, file: 'bahasa/bhw.json' },
    'kei': { name: 'Kei', icon: icons.placeholder, file: 'bahasa/kei.json' }
};

const swadeshCore = {
    warna: ['Merah', 'Putih', 'Hitam', 'Hijau'],
    tubuh: ['Kepala', 'Tangan', 'Mata', 'Kaki'],
    hewan: ['Anjing', 'Ikan', 'Burung', 'Ular'],
    kerja: ['Makan', 'Minum', 'Tidur', 'Jalan']
};

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
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP Error`);
        const data = await response.json();
        languageCache[fetchKey] = data;
        return data;
    } catch (error) {
        const fallback = { words: {} };
        Object.values(swadeshCore).flat().forEach(w => {
            let fake = w.toLowerCase();
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
    const msg = t('emptyMsg');

    if (viewMode === 'swadesh') {
        container.innerHTML = `
            <div class="text-center py-6 mb-4 opacity-70">
                <i data-lucide="map" class="w-10 h-10 mx-auto mb-2 text-slate-400"></i>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${msg}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in opacity-50 grayscale">
                ${generateEmptyCardGroup(t('kategori_warna'), swadeshCore.warna)}
                ${generateEmptyCardGroup(t('kategori_tubuh'), swadeshCore.tubuh)}
                ${generateEmptyCardGroup(t('kategori_hewan'), swadeshCore.hewan)}
                ${generateEmptyCardGroup(t('kategori_kerja'), swadeshCore.kerja)}
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
                    ${t('menunggu')}
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
                ${generatePopulatedCardGroup(t('kategori_warna'), swadeshCore.warna, dataMap)}
                ${generatePopulatedCardGroup(t('kategori_tubuh'), swadeshCore.tubuh, dataMap)}
                ${generatePopulatedCardGroup(t('kategori_hewan'), swadeshCore.hewan, dataMap)}
                ${generatePopulatedCardGroup(t('kategori_kerja'), swadeshCore.kerja, dataMap)}
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

    let headers = `<th class="py-3 px-4 text-left font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">${t('header_kata_dasar')}</th>`;
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