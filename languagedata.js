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
            'ngawi': { name: 'Ngawi', file: 'bahasa/jav_ngawi.json' },
            'surabaya': { name: 'Surabaya', file: 'bahasa/jav_surabaya.json' },
        }
    },
    'sun': {
        name: 'Sunda Jabar',
        icon: icons.sunda,
        dialects: {
            'standard': {
                name: 'Parahyangan',
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
    'bew': {
        name: 'Betawi',
        icon: icons.betawi,
        dialects: {
            'standard': { name: 'Tengahan', file: 'bahasa/bew_tengahan.json' },
            'pinggiran': { name: 'Pinggiran/Ora', file: 'bahasa/bew_pinggiran.json' },
        }
    },
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
    'kvr': { name: 'Kerinci', icon: icons.kerinci, file: 'bahasa/kvr.json', biblio: '<strong>Usman, A. Hakim.</strong> (1985). <em>Kamus Umum Kerinci-Indonesia</em>. Pusat Pembinaan dan Pengembangan Bahasa, Departemen Pendidikan dan Kebudayaan, Jakarta.' },
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
    'bjn': { 
        name: 'Banjar', 
        icon: icons.banjar, 
        dialects: { 
            'standard': { name: 'Kuala', file: 'bahasa/bjn_kuala.json' }, 
            'hulu': { name: 'Hulu', file: 'bahasa/bjn_hulu.json' } } },
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
    'tet': { name: 'Tetun', icon: icons.tetun, file: 'bahasa/tet.json', biblio: `<strong>Manhitu, Yohanes.</strong> (2007). <em>Kamus Indonesia-Tetun, Tetun-Indonesia</em>. Penerbit PT Gramedia Pustaka Utama, Jakarta.` },
    'bhw': { name: 'Biak', icon: icons.placeholder, file: 'bahasa/bhw.json' },
    'kei': { name: 'Kei', icon: icons.placeholder, file: 'bahasa/kei.json' }
};