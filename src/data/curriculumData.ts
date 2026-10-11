import { SchoolIdentity, ExamConfig, QuestionItem } from '../types';

export const DEFAULT_SCHOOL_INFO: SchoolIdentity = {
  logoUrl: '', // Will use default SVG badge if empty
  namaSekolah: 'SMP NEGERI 2 GUMELAR',
  alamatSekolah: 'Jl. Raya Gumelar No. 12, Kec. Gumelar, Kab. Banyumas, Jawa Tengah 53165',
  tahunPelajaran: '2025/2026',
  semester: 'Ganjil',
  namaKepalaSekolah: 'Nopidha Ardyansah, S.Pd., M.Pd.',
  nipKepalaSekolah: '19780512 200501 1 008',
  namaGuru: 'Siti Nur Aisyah, S.Pd.',
  nipGuru: '19850314 201001 2 015',
  alokasiWaktu: '90 Menit',
  jenisAsesmen: 'Sumatif Akhir Semester (SAS) Ganjil',
  kelas: '8',
  mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)',
  pemerintahDaerah: 'PEMERINTAH KABUPATEN BANYUMAS',
  dinasPendidikan: 'DINAS PENDIDIKAN',
};

export interface MaterialTopicOption {
  kelas: '7' | '8' | '9';
  kategori: string;
  topik: string;
  tujuanPembelajaranDefault: string;
}

export const SILABUS_IPA_SMP: MaterialTopicOption[] = [
  // KELAS 7
  {
    kelas: '7',
    kategori: 'Hakikat Sains & Pengukuran',
    topik: 'Hakikat Sains, Metode Ilmiah, dan Pengukuran Besaran Pokok & Turunan',
    tujuanPembelajaranDefault: 'Peserta didik mampu merancang penyelidikan ilmiah menggunakan metode ilmiah serta melakukan pengukuran besaran fisis secara tepat dengan alat ukur standar.',
  },
  {
    kelas: '7',
    kategori: 'Zat & Perubahannya',
    topik: 'Wujud Zat, Model Partikel, Kerapatan Zat (Massa Jenis), dan Perubahan Fisika-Kimia',
    tujuanPembelajaranDefault: 'Peserta didik dapat membedakan susunan partikel zat padat, cair, dan gas serta menganalisis fenomena perubahan fisika dan kimia dalam kehidupan sehari-hari.',
  },
  {
    kelas: '7',
    kategori: 'Suhu, Kalor, & Pemuaian',
    topik: 'Suhu, Konversi Termometer, Kalor, dan Asas Black',
    tujuanPembelajaranDefault: 'Peserta didik mampu menganalisis pengaruh kalor terhadap perubahan suhu dan wujud zat serta menghitung kalor menggunakan persamaan Asas Black.',
  },
  {
    kelas: '7',
    kategori: 'Gerak & Gaya',
    topik: 'Gerak Lurus (GLB & GLBB) serta Hukum Newton tentang Gerak',
    tujuanPembelajaranDefault: 'Peserta didik dapat mengidentifikasi konsep kecepatan, percepatan, dan menerapkan Hukum I, II, III Newton dalam peristiwa gerak benda sehari-hari.',
  },
  {
    kelas: '7',
    kategori: 'Organisasi Kehidupan',
    topik: 'Sel sebagai Satuan Terkecil, Mikroskop, Jaringan, dan Organ',
    tujuanPembelajaranDefault: 'Peserta didik mampu mendeskripsikan struktur dan fungsi organel sel hewan dan tumbuhan serta mengoperasikan mikroskop cahaya dengan benar.',
  },
  {
    kelas: '7',
    kategori: 'Ekologi & Lingkungan',
    topik: 'Interaksi Makhluk Hidup, Rantai Makanan, Jaring Makanan, dan Pencemaran Lingkungan',
    tujuanPembelajaranDefault: 'Peserta didik mampu menganalisis interaksi antar komponen biotik dan abiotik dalam ekosistem serta merancang solusi atas permasalahan pencemaran lingkungan.',
  },
  {
    kelas: '7',
    kategori: 'Bumi & Tata Surya',
    topik: 'Sistem Tata Surya, Rotasi-Revolusi Bumi, Gerhana, dan Lapisan Atmosfer',
    tujuanPembelajaranDefault: 'Peserta didik dapat menjelaskan karakteristik planet penyusun tata surya, dampak rotasi dan revolusi bumi serta fase bulan dan gerhana.',
  },

  // KELAS 8
  {
    kelas: '8',
    kategori: 'Sistem Tubuh Manusia',
    topik: 'Struktur dan Fungsi Sel, Jaringan, serta Sistem Pencernaan Makanan',
    tujuanPembelajaranDefault: 'Peserta didik mampu menganalisis keterkaitan struktur organ pencernaan dengan fungsinya serta mengidentifikasi kandungan zat nutrisi dan uji makanan.',
  },
  {
    kelas: '8',
    kategori: 'Sistem Tubuh Manusia',
    topik: 'Sistem Peredaran Darah Manusia dan Kelainan pada Jantung & Pembuluh Darah',
    tujuanPembelajaranDefault: 'Peserta didik dapat menjelaskan mekanisme peredaran darah besar dan kecil serta menganalisis faktor penyebab penyakit jantung dan hipertensi.',
  },
  {
    kelas: '8',
    kategori: 'Struktur Tumbuhan',
    topik: 'Struktur dan Fungsi Jaringan Tumbuhan, Fotosintesis, dan Teknologi Terinspirasi Tumbuhan',
    tujuanPembelajaranDefault: 'Peserta didik mampu membandingkan struktur anatomi akar, batang, dan daun monokotil vs dikotil serta membuktikan proses fotosintesis.',
  },
  {
    kelas: '8',
    kategori: 'Usaha & Pesawat Sederhana',
    topik: 'Usaha, Daya, dan Prinsip Kerja Pesawat Sederhana (Tuas, Bidang Miring, Katrol)',
    tujuanPembelajaranDefault: 'Peserta didik mampu menghitung besar usaha dan keuntungan mekanik pesawat sederhana serta mengidentifikasi penerapannya pada rangka manusia.',
  },
  {
    kelas: '8',
    kategori: 'Tekanan Fluida',
    topik: 'Tekanan Zat Padat, Tekanan Hidrostatis, Hukum Archimedes, dan Hukum Pascal',
    tujuanPembelajaranDefault: 'Peserta didik mampu menerapkan prinsip tekanan hidrostatis, hukum Archimedes (mengapung, melayang, tenggelam), dan hukum Pascal pada teknologi hidrolik.',
  },
  {
    kelas: '8',
    kategori: 'Gelombang & Bunyi',
    topik: 'Getaran, Gelombang Transversal & Longitudinal, serta Resonansi Bunyi',
    tujuanPembelajaranDefault: 'Peserta didik mampu menghitung frekuensi, periode, cepat rambat gelombang dan menjelaskan mekanisme pendengaran pada manusia serta sonar.',
  },
  {
    kelas: '8',
    kategori: 'Cahaya & Optik',
    topik: 'Sifat Cahaya, Pembentukan Bayangan pada Cermin, Lensa, dan Alat Optik (Mata, Kacamata, Mikroskop)',
    tujuanPembelajaranDefault: 'Peserta didik mampu menerapkan hukum pemantulan dan pembiasan cahaya dalam melukis bayangan serta menganalisis cacat mata (miopi dan hipermetropi).',
  },

  // KELAS 9
  {
    kelas: '9',
    kategori: 'Sistem Reproduksi',
    topik: 'Sistem Reproduksi Manusia, Gametogenesis, Siklus Menstruasi, dan Upaya Pencegahan PMS',
    tujuanPembelajaranDefault: 'Peserta didik mampu mendeskripsikan organ reproduksi manusia, proses fertilisasi, pembelahan sel (mitosis dan meiosis), serta menjaga kesehatan organ reproduksi.',
  },
  {
    kelas: '9',
    kategori: 'Pewarisan Sifat',
    topik: 'Genetika, Kromosom, DNA, dan Hukum Pewarisan Sifat Mendel (Monohibrid & Dihibrid)',
    tujuanPembelajaranDefault: 'Peserta didik mampu menganalisis persilangan monohibrid dan dihibrid menggunakan diagram Punnett serta menghitung rasio fenotip dan genotip keturunan.',
  },
  {
    kelas: '9',
    kategori: 'Kelistrikan Statis & Dinamis',
    topik: 'Listrik Statis (Hukum Coulomb), Kuat Arus, Hukum Ohm, Rangkaian Hambatan Seri & Paralel',
    tujuanPembelajaranDefault: 'Peserta didik mampu menghitung gaya elektrostatis Coulomb dan menganalisis kuat arus, tegangan, serta daya listrik pada rangkaian seri dan paralel.',
  },
  {
    kelas: '9',
    kategori: 'Kemagnetan',
    topik: 'Medan Magnet, Elektromagnetik, Gaya Lorentz, dan Transformator',
    tujuanPembelajaranDefault: 'Peserta didik mampu menjelaskan prinsip induksi elektromagnetik dan menghitung tegangan serta kuat arus pada transformator step-up dan step-down.',
  },
  {
    kelas: '9',
    kategori: 'Bioteknologi',
    topik: 'Bioteknologi Konvensional (Fermentasi) dan Bioteknologi Modern (Rekayasa Genetika)',
    tujuanPembelajaranDefault: 'Peserta didik mampu membedakan mikroorganisme dalam pembuatan produk bioteknologi pangan serta menganalisis dampak bioteknologi modern bagi lingkungan.',
  },
  {
    kelas: '9',
    kategori: 'Partikel Materi',
    topik: 'Partikel Penyusun Benda (Atom, Proton, Elektron, Neutron) dan Molekul Senyawa',
    tujuanPembelajaranDefault: 'Peserta didik mampu mengidentifikasi konfigurasi atom sederhana dan membedakan molekul unsur dengan molekul senyawa dalam produk kehidupan sehari-hari.',
  },
];

// High quality scientific SVG diagrams for IPA SMP with explicit dimensions & vector paths
export const SCIENTIFIC_SVGS = {
  selTumbuhan: `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240" class="w-full h-auto max-h-56 mx-auto bg-emerald-50 rounded-lg border border-emerald-200">
      <rect width="100%" height="100%" fill="#f0fdf4"/>
      <!-- Dinding Sel & Membran Sel -->
      <polygon points="50,30 350,30 380,120 350,210 50,210 20,120" fill="#d1fae5" stroke="#059669" stroke-width="6" stroke-linejoin="round"/>
      <polygon points="58,38 342,38 370,120 342,202 58,202 30,120" fill="#ecfdf5" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Vakuola Tengah Besar -->
      <path d="M120,65 Q230,55 270,105 Q300,165 240,185 Q140,195 100,140 Q80,95 120,65 Z" fill="#93c5fd" opacity="0.65" stroke="#3b82f6" stroke-width="2"/>
      <text x="175" y="130" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1e40af">Vakuola Besar</text>

      <!-- Nukleus / Inti Sel -->
      <circle cx="310" cy="85" r="28" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
      <circle cx="310" cy="85" r="11" fill="#be185d"/>
      <text x="290" y="125" font-size="11" font-family="sans-serif" font-weight="bold" fill="#9d174d">Nukleus</text>

      <!-- Kloroplas -->
      <g>
        <ellipse cx="90" cy="75" rx="20" ry="12" fill="#15803d" stroke="#166534" stroke-width="1.5" transform="rotate(-15 90 75)"/>
        <line x1="77" y1="75" x2="103" y2="75" stroke="#bbf7d0" stroke-width="2"/>
        <line x1="79" y1="71" x2="101" y2="71" stroke="#bbf7d0" stroke-width="1.5"/>
        <line x1="81" y1="79" x2="99" y2="79" stroke="#bbf7d0" stroke-width="1.5"/>
        <text x="65" y="100" font-size="10" font-family="sans-serif" fill="#166534">Kloroplas (1)</text>
      </g>
      <g>
        <ellipse cx="85" cy="170" rx="20" ry="12" fill="#15803d" stroke="#166534" stroke-width="1.5" transform="rotate(25 85 170)"/>
        <line x1="72" y1="170" x2="98" y2="170" stroke="#bbf7d0" stroke-width="2"/>
        <text x="65" y="196" font-size="10" font-family="sans-serif" fill="#166534">Kloroplas (2)</text>
      </g>

      <!-- Mitokondria -->
      <ellipse cx="280" cy="165" rx="18" ry="10" fill="#f97316" stroke="#c2410c" stroke-width="1.5" transform="rotate(-30 280 165)"/>
      <path d="M268,165 Q274,160 280,165 Q286,170 292,165" fill="none" stroke="#ffedd5" stroke-width="1.5"/>
      <text x="250" y="190" font-size="10" font-family="sans-serif" fill="#c2410c">Mitokondria</text>

      <!-- Keterangan Label X -->
      <line x1="30" y1="35" x2="65" y2="35" stroke="#dc2626" stroke-width="2"/>
      <circle cx="65" cy="35" r="4" fill="#dc2626"/>
      <rect x="5" y="20" width="26" height="20" rx="3" fill="#dc2626"/>
      <text x="13" y="35" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">X</text>
    </svg>
  `,

  mikroskop: `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="260" viewBox="0 0 360 260" class="w-full h-auto max-h-56 mx-auto bg-slate-50 rounded-lg border border-slate-200">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <!-- Alas Mikroskop -->
      <ellipse cx="180" cy="235" rx="90" ry="16" fill="#334155" stroke="#1e293b" stroke-width="2"/>
      <rect x="140" y="220" width="80" height="15" fill="#475569"/>

      <!-- Lengan Mikroskop -->
      <path d="M190,220 C230,190 230,110 180,80" fill="none" stroke="#475569" stroke-width="16" stroke-linecap="round"/>

      <!-- Lensa Okuler (Bagian A) -->
      <rect x="145" y="20" width="22" height="35" fill="#0284c7" rx="2" stroke="#0369a1" stroke-width="1.5"/>
      <rect x="141" y="15" width="30" height="7" fill="#0369a1" rx="2"/>
      <line x1="100" y1="30" x2="140" y2="30" stroke="#e11d48" stroke-width="2"/>
      <rect x="75" y="20" width="22" height="20" rx="3" fill="#e11d48"/>
      <text x="81" y="35" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">A</text>

      <!-- Tabung Mikroskop -->
      <rect x="148" y="55" width="16" height="45" fill="#64748b"/>

      <!-- Revolver & Lensa Objektif (Bagian B) -->
      <ellipse cx="156" cy="102" rx="22" ry="8" fill="#0f172a"/>
      <rect x="145" y="105" width="10" height="26" fill="#eab308" stroke="#ca8a04" stroke-width="1"/>
      <rect x="160" y="105" width="12" height="34" fill="#0284c7" stroke="#0369a1" stroke-width="1"/>
      <line x1="95" y1="120" x2="140" y2="120" stroke="#e11d48" stroke-width="2"/>
      <rect x="70" y="110" width="22" height="20" rx="3" fill="#e11d48"/>
      <text x="76" y="125" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">B</text>

      <!-- Meja Preparat (Bagian C) -->
      <polygon points="110,145 205,145 220,155 125,155" fill="#1e293b"/>
      <rect x="145" y="143" width="25" height="3" fill="#38bdf8"/>
      <line x1="225" y1="150" x2="265" y2="150" stroke="#e11d48" stroke-width="2"/>
      <rect x="268" y="140" width="22" height="20" rx="3" fill="#e11d48"/>
      <text x="274" y="155" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">C</text>

      <!-- Makrometer & Mikrometer (Bagian D) -->
      <circle cx="205" cy="115" r="12" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
      <circle cx="205" cy="115" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
      <line x1="220" y1="115" x2="260" y2="115" stroke="#e11d48" stroke-width="2"/>
      <rect x="263" y="105" width="22" height="20" rx="3" fill="#e11d48"/>
      <text x="269" y="120" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">D</text>

      <!-- Cermin / Sumber Cahaya -->
      <circle cx="156" cy="185" r="10" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
      <line x1="156" y1="195" x2="156" y2="220" stroke="#64748b" stroke-width="3"/>
    </svg>
  `,

  tuasPengungkit: `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="180" viewBox="0 0 380 180" class="w-full h-auto max-h-48 mx-auto bg-amber-50 rounded-lg border border-amber-200">
      <rect width="100%" height="100%" fill="#fffbeb"/>
      <!-- Garis Batang Tuas -->
      <rect x="40" y="80" width="300" height="12" fill="#78350f" rx="3" stroke="#451a03" stroke-width="1.5"/>

      <!-- Titik Tumpu (Segitiga) T -->
      <polygon points="150,92 135,130 165,130" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
      <rect x="120" y="130" width="60" height="8" fill="#475569"/>
      <text x="144" y="148" font-size="11" font-family="sans-serif" font-weight="bold" fill="#b91c1c">Tumpu (T)</text>

      <!-- Beban (W) di sisi kiri -->
      <rect x="45" y="42" width="38" height="38" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5" rx="3"/>
      <text x="52" y="66" font-size="11" font-family="sans-serif" font-weight="bold" fill="#ffffff">W = 600 N</text>

      <!-- Gaya Kuasa (F) di ujung kanan -->
      <path d="M320,30 L320,74" stroke="#16a34a" stroke-width="3.5"/>
      <polygon points="320,78 314,66 326,66" fill="#16a34a"/>
      <text x="305" y="24" font-size="12" font-family="sans-serif" font-weight="bold" fill="#15803d">F = ?</text>

      <!-- Jarak Lengan Beban (lb) & Lengan Kuasa (lk) -->
      <line x1="64" y1="105" x2="150" y2="105" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="85" y="120" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">lb = 50 cm</text>

      <line x1="150" y1="105" x2="320" y2="105" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="210" y="120" font-size="11" font-family="sans-serif" font-weight="bold" fill="#334155">lk = 150 cm</text>
    </svg>
  `,

  rangkaianListrik: `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="200" viewBox="0 0 380 200" class="w-full h-auto max-h-50 mx-auto bg-blue-50 rounded-lg border border-blue-200">
      <rect width="100%" height="100%" fill="#eff6ff"/>
      <!-- Kabel Utama Persegi -->
      <rect x="50" y="40" width="280" height="120" fill="none" stroke="#334155" stroke-width="3" rx="8"/>

      <!-- Sumber Tegangan (Baterai E) di bawah -->
      <rect x="160" y="155" width="60" height="10" fill="#eff6ff"/>
      <line x1="175" y1="150" x2="175" y2="170" stroke="#dc2626" stroke-width="4"/>
      <line x1="195" y1="155" x2="195" y2="165" stroke="#1e293b" stroke-width="3"/>
      <text x="168" y="144" font-size="11" font-weight="bold" fill="#dc2626">+</text>
      <text x="194" y="144" font-size="11" font-weight="bold" fill="#1e293b">-</text>
      <text x="165" y="187" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1e40af">V = 12 Volt</text>

      <!-- Resistor R1 di atas -->
      <rect x="100" y="34" width="45" height="14" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" rx="2"/>
      <text x="105" y="26" font-size="11" font-family="sans-serif" font-weight="bold" fill="#b45309">R1 = 4 Ω</text>

      <!-- Resistor R2 di atas -->
      <rect x="230" y="34" width="45" height="14" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" rx="2"/>
      <text x="235" y="26" font-size="11" font-family="sans-serif" font-weight="bold" fill="#b45309">R2 = 2 Ω</text>

      <!-- Indikator Arus I -->
      <path d="M70,105 L70,85" stroke="#2563eb" stroke-width="2.5"/>
      <polygon points="70,80 66,90 74,90" fill="#2563eb"/>
      <text x="80" y="95" font-size="11" font-family="sans-serif" font-weight="bold" fill="#1d4ed8">I (Kuat Arus)</text>
    </svg>
  `,

  hukumArchimedes: `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="200" viewBox="0 0 380 200" class="w-full h-auto max-h-50 mx-auto bg-cyan-50 rounded-lg border border-cyan-200">
      <rect width="100%" height="100%" fill="#ecfeff"/>
      <!-- Gelas Beaker -->
      <path d="M60,30 L60,170 Q60,185 80,185 L300,185 Q320,185 320,170 L320,30" fill="none" stroke="#475569" stroke-width="3"/>
      
      <!-- Permukaan Zat Cair -->
      <rect x="63" y="70" width="254" height="113" fill="#bae6fd" opacity="0.6"/>
      <path d="M63,70 Q120,65 190,70 T317,70" fill="none" stroke="#0284c7" stroke-width="2"/>

      <!-- Benda A (Terapung) -->
      <rect x="90" y="55" width="40" height="35" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" rx="3"/>
      <text x="102" y="77" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">A</text>
      <text x="82" y="110" font-size="10" font-family="sans-serif" fill="#0369a1">Terapung</text>

      <!-- Benda B (Melayang) -->
      <rect x="170" y="105" width="40" height="35" fill="#10b981" stroke="#047857" stroke-width="1.5" rx="3"/>
      <text x="183" y="127" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">B</text>
      <text x="165" y="160" font-size="10" font-family="sans-serif" fill="#0369a1">Melayang</text>

      <!-- Benda C (Tenggelam di dasar) -->
      <rect x="250" y="150" width="40" height="35" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5" rx="3"/>
      <text x="263" y="172" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">C</text>
      <text x="245" y="145" font-size="10" font-family="sans-serif" fill="#0369a1">Tenggelam</text>

      <text x="80" y="25" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0369a1">Massa Jenis Zat Cair = ρ_cair</text>
    </svg>
  `,

  sistemPencernaan: `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="230" viewBox="0 0 380 230" class="w-full h-auto max-h-56 mx-auto bg-rose-50 rounded-lg border border-rose-200">
      <rect width="100%" height="100%" fill="#fff1f2"/>
      <!-- Kerongkongan / Esofagus -->
      <rect x="178" y="15" width="24" height="60" fill="#fda4af" stroke="#e11d48" stroke-width="1.5" rx="3"/>
      <text x="110" y="35" font-size="10" font-family="sans-serif" fill="#9f1239">1. Esofagus</text>
      <line x1="160" y1="35" x2="178" y2="35" stroke="#e11d48" stroke-width="1"/>

      <!-- Lambung (Bagian X) -->
      <path d="M190,75 C230,75 255,100 245,130 C235,155 185,150 170,135 C160,115 170,85 190,75 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
      <text x="195" y="115" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff">Lambung (X)</text>

      <!-- Hati / Liver di sebelah kiri -->
      <path d="M110,80 C150,75 165,100 160,125 C145,135 105,125 110,80 Z" fill="#b91c1c" stroke="#991b1b" stroke-width="1.5"/>
      <text x="115" y="105" font-size="10" font-family="sans-serif" font-weight="bold" fill="#fef2f2">Hati</text>

      <!-- Usus Halus -->
      <path d="M175,145 Q210,140 195,160 Q170,175 200,185 Q220,195 185,210" fill="none" stroke="#fb923c" stroke-width="10" stroke-linecap="round"/>
      <text x="235" y="175" font-size="10" font-family="sans-serif" font-weight="bold" fill="#c2410c">Usus Halus</text>
      <line x1="230" y1="172" x2="205" y2="172" stroke="#ea580c" stroke-width="1"/>

      <!-- Usus Besar -->
      <path d="M145,140 L145,215 L235,215 L235,140" fill="none" stroke="#84cc16" stroke-width="5" stroke-dasharray="4,2"/>
      <text x="75" y="180" font-size="10" font-family="sans-serif" font-weight="bold" fill="#4d7c0f">Usus Besar</text>
      <line x1="125" y1="178" x2="145" y2="178" stroke="#65a30d" stroke-width="1"/>
    </svg>
  `,

  fotosintesisIngenhousz: `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="210" viewBox="0 0 380 210" class="w-full h-auto max-h-52 mx-auto bg-emerald-50 rounded-lg border border-emerald-200">
      <rect width="100%" height="100%" fill="#ecfdf5"/>
      <!-- Gelas Kimia Besar -->
      <rect x="70" y="40" width="240" height="150" fill="#e0f2fe" opacity="0.7" stroke="#0284c7" stroke-width="2.5" rx="4"/>
      
      <!-- Corong Kaca Terbalik -->
      <polygon points="120,175 260,175 195,95 185,95" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/>
      <!-- Pipa Leher Corong -->
      <rect x="185" y="45" width="10" height="50" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/>

      <!-- Tabung Reaksi Penampung Oksigen -->
      <rect x="180" y="25" width="20" height="65" fill="#f0f9ff" stroke="#0284c7" stroke-width="2" rx="3"/>
      <!-- Ruang Gas Oksigen O2 di ujung atas -->
      <rect x="182" y="27" width="16" height="20" fill="#fed7aa" stroke="#f97316" stroke-width="1"/>
      <text x="210" y="38" font-size="10" font-family="sans-serif" font-weight="bold" fill="#c2410c">Gas O2</text>
      <line x1="205" y1="36" x2="198" y2="36" stroke="#ea580c" stroke-width="1"/>

      <!-- Gelembung-gelembung Gas -->
      <circle cx="190" cy="55" r="2.5" fill="#ffffff" stroke="#0284c7"/>
      <circle cx="191" cy="65" r="2" fill="#ffffff" stroke="#0284c7"/>
      <circle cx="189" cy="78" r="3" fill="#ffffff" stroke="#0284c7"/>
      <circle cx="192" cy="88" r="2.5" fill="#ffffff" stroke="#0284c7"/>

      <!-- Tanaman Hydrilla verticillata di dalam corong -->
      <path d="M150,170 Q160,140 170,165 Q180,135 190,168 Q200,140 210,167 Q220,135 230,170" fill="none" stroke="#15803d" stroke-width="4"/>
      <text x="140" y="195" font-size="10" font-family="sans-serif" font-weight="bold" fill="#166534">Tanaman Hydrilla sp.</text>

      <!-- Sinar Matahari / Cahaya -->
      <circle cx="45" cy="35" r="14" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <line x1="60" y1="45" x2="85" y2="65" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2"/>
      <text x="25" y="65" font-size="9" font-family="sans-serif" fill="#b45309">Cahaya</text>
    </svg>
  `
};

export const INITIAL_PRESET_QUESTIONS: QuestionItem[] = [
  // 1. Pilihan Ganda (LOTS - Memahami)
  {
    id: 'soal-1',
    nomor: 1,
    bentukSoal: 'pilihan_ganda',
    tingkatKesulitan: 'rendah',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    learningTargetExplanation: 'Menguji pemahaman dasar struktur organel sel dan fungsinya pada sel tumbuhan.',
    materi: 'Struktur & Organisasi Sel Tumbuhan',
    tujuanPembelajaran: 'Peserta didik mampu mendeskripsikan struktur dan fungsi organel sel tumbuhan.',
    indikatorSoal: 'Disajikan gambar struktur sel tumbuhan, peserta didik dapat mengidentifikasi fungsi bagian yang ditunjuk huruf X dengan benar.',
    stimulus: 'Perhatikan gambar penampang mikroskopis sel tumbuhan berikut ini dengan teliti.',
    gambarSvg: SCIENTIFIC_SVGS.selTumbuhan,
    gambarDeskripsi: 'Gambar skematis sel tumbuhan dengan penunjuk huruf X pada dinding sel.',
    pertanyaan: 'Berdasarkan gambar sel tumbuhan di atas, bagian yang ditunjuk oleh huruf X adalah dinding sel. Fungsi utama dari bagian tersebut adalah ...',
    pilihan: [
      'A. Memberikan bentuk tetap dan melindungi bagian dalam sel tumbuhan',
      'B. Tempat terjadinya respirasi seluler untuk menghasilkan energi ATP',
      'C. Mengatur seluruh aktivitas dan metabolisme di dalam sel',
      'D. Tempat sintesis protein dan pembentukan senyawa lipid'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Dinding sel tumbuhan tersusun atas selulosa, hemiselulosa, dan pektin yang bersifat kaku dan kuat. Fungsi utamanya adalah memberi bentuk yang tetap, memberi kekuatan mekanik, serta melindungi bagian protoplasma sel dari tekanan turgor.',
    bobotSkor: 1,
    rubrikPenskoran: [
      'Skor 1: Memilih opsi A dengan tepat.',
      'Skor 0: Memilih opsi selain A atau tidak menjawab.'
    ]
  },

  // 2. Pilihan Ganda (MOTS - Mengaplikasi)
  {
    id: 'soal-2',
    nomor: 2,
    bentukSoal: 'pilihan_ganda',
    tingkatKesulitan: 'sedang',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Aplikasi konsep prinsip pesawat sederhana tuas jenis pertama dalam pemecahan masalah fisis.',
    materi: 'Pesawat Sederhana (Tuas/Pengungkit)',
    tujuanPembelajaran: 'Peserta didik mampu menghitung besar kuasa dan keuntungan mekanis pada tuas.',
    indikatorSoal: 'Disajikan ilustrasi tuas dengan beban 600 N dan panjang lengan tertentu, peserta didik dapat menentukan besar gaya kuasa minimal untuk mengangkat beban.',
    stimulus: 'Seorang pekerja ingin mengangkat sebongkah batu seberat 600 N menggunakan sebatang tongkat tuas seperti skema di bawah.',
    gambarSvg: SCIENTIFIC_SVGS.tuasPengungkit,
    gambarDeskripsi: 'Skema tuas jenis pertama: Beban W = 600 N, lengan beban lb = 50 cm, lengan kuasa lk = 150 cm.',
    pertanyaan: 'Besar gaya kuasa (F) minimal yang diperlukan untuk mengangkat batu tersebut dalam posisi seimbang adalah ...',
    pilihan: [
      'A. 150 N',
      'B. 200 N',
      'C. 300 N',
      'D. 1.800 N'
    ],
    kunciJawaban: 'B',
    pembahasan: 'Berdasarkan prinsip kesetimbangan tuas: W × lb = F × lk. Diketahui W = 600 N, lb = 50 cm, lk = 150 cm. Maka F = (W × lb) / lk = (600 × 50) / 150 = 30.000 / 150 = 200 N. Keuntungan mekanisnya (KM) = 150 / 50 = 3.',
    bobotSkor: 1,
    rubrikPenskoran: [
      'Skor 1: Memilih opsi B.',
      'Skor 0: Memilih opsi salah atau tidak menjawab.'
    ]
  },

  // 3. Pilihan Ganda Kompleks (HOTS - Merefleksi)
  {
    id: 'soal-3',
    nomor: 3,
    bentukSoal: 'pilihan_ganda_kompleks',
    tingkatKesulitan: 'sulit',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    learningTargetExplanation: 'Refleksi kritis terhadap fenomena gaya apung dan massa jenis zat cair menurut Hukum Archimedes.',
    materi: 'Tekanan Fluida & Hukum Archimedes',
    tujuanPembelajaran: 'Peserta didik mampu mengevaluasi posisi benda dalam zat cair berdasarkan kerapatan massa jenis.',
    indikatorSoal: 'Disajikan fenomena tiga benda A, B, dan C yang berada dalam satu bejana zat cair, peserta didik dapat menganalisis kebenaran beberapa pernyataan ilmiah terkait massa jenis dan gaya apung.',
    stimulus: 'Tiga benda padat A, B, dan C dengan volume yang sama dimasukkan ke dalam bejana berisi cairan seragam seperti pada ilustrasi berikut.',
    gambarSvg: SCIENTIFIC_SVGS.hukumArchimedes,
    gambarDeskripsi: 'Bejana fluida berisi benda A (terapung), benda B (melayang), dan benda C (tenggelam di dasar).',
    pertanyaan: 'Manakah pernyataan-pernyataan berikut yang bernilai BENAR? (Pilihlah lebih dari satu jawaban yang benar):',
    pilihanKompleks: [
      { text: 'Massa jenis benda A lebih kecil dibandingkan massa jenis zat cair (ρ_A < ρ_cair)', isCorrect: true },
      { text: 'Benda B mengalami gaya apung yang sama besar dengan berat benda B (Fa_B = W_B)', isCorrect: true },
      { text: 'Benda C memiliki massa jenis paling kecil dibandingkan benda A dan B', isCorrect: false },
      { text: 'Pada benda C, gaya apung Archimedes lebih kecil daripada gaya berat bendanya (Fa_C < W_C)', isCorrect: true }
    ],
    kunciJawaban: 'Pernyataan 1, 2, dan 4 BENAR.',
    pembahasan: 'Benda A terapung karena ρ_A < ρ_cair. Benda B melayang dalam kesetimbangan vertikal, sehingga Fa_B = W_B dan ρ_B = ρ_cair. Benda C tenggelam di dasar karena beratnya melampaui gaya apung maksimumnya (W_C > Fa_C) sehingga ρ_C > ρ_cair. Pernyataan 3 salah.',
    bobotSkor: 3,
    rubrikPenskoran: [
      'Skor 3: Memilih ketiga pernyataan benar (1, 2, 4) tanpa memilih pernyataan salah.',
      'Skor 2: Memilih 2 pernyataan benar dengan tepat.',
      'Skor 1: Memilih 1 pernyataan benar dengan tepat.',
      'Skor 0: Memilih opsi salah atau tidak menjawab.'
    ]
  },

  // 4. Menjodohkan (MOTS - Mengaplikasi)
  {
    id: 'soal-4',
    nomor: 4,
    bentukSoal: 'menjodohkan',
    tingkatKesulitan: 'sedang',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Aplikasi pengetahuan mengenai fungsi bagian-bagian instrumen mikroskop optik.',
    materi: 'Mikroskop dan Pengamatan Sel',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi komponen mikroskop optik beserta fungsi operasionalnya.',
    indikatorSoal: 'Peserta didik dapat menjodohkan bagian mikroskop optik dengan peran operasionalnya saat praktikum pengamatan preparat sel.',
    stimulus: 'Saat melakukan praktikum IPA di laboratorium SMP Negeri 2 Gumelar, siswa menggunakan mikroskop optik untuk mengamati preparat stomata daun.',
    gambarSvg: SCIENTIFIC_SVGS.mikroskop,
    gambarDeskripsi: 'Diagram komponen mikroskop optik dengan label A (Lensa Okuler), B (Lensa Objektif), C (Meja Preparat), D (Makrometer/Mikrometer).',
    pertanyaan: 'Jodohkanlah komponen mikroskop di Kolom A dengan fungsi utamanya di Kolom B secara tepat!',
    menjodohkanPairs: [
      { left: '1. Lensa Okuler (A)', right: 'Memperbesar bayangan objek yang langsung diamati oleh mata pengamat' },
      { left: '2. Lensa Objektif (B)', right: 'Membentuk bayangan nyata pertama yang dekat dengan spesimen preparat' },
      { left: '3. Meja Preparat (C)', right: 'Tempat meletakkan kaca objek/benda yang akan diamati' },
      { left: '4. Makrometer (D)', right: 'Menaikkan atau menurunkan tabung mikroskop secara cepat untuk mencari fokus' }
    ],
    kunciJawaban: '1-Pasangan 1, 2-Pasangan 2, 3-Pasangan 3, 4-Pasangan 4',
    pembahasan: 'Lensa okuler berada dekat mata (pembesaran 5x-15x). Lensa objektif dekat preparat (pembesaran 4x, 10x, 40x, 100x). Meja preparat dilengkapi penjepit untuk menstabilkan kaca objek. Makrometer berfungsi mengatur fokus kasar.',
    bobotSkor: 4,
    rubrikPenskoran: [
      'Skor 4: Menjodohkan keempat pasangan secara tepat (skor 1 per pasangan benar).',
      'Skor 0-3: Sesuai jumlah pasangan yang dijodohkan dengan benar.'
    ]
  },

  // 5. Benar–Salah (LOTS / MOTS - Memahami)
  {
    id: 'soal-5',
    nomor: 5,
    bentukSoal: 'benar_salah',
    tingkatKesulitan: 'rendah',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    learningTargetExplanation: 'Menguji ketepatan pemahaman konsep perubahan wujud dan kalor.',
    materi: 'Kalor dan Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses penyerapan dan pelepasan kalor pada perubahan wujud.',
    indikatorSoal: 'Disajikan beberapa pernyataan terkait proses kalor dan perubahan wujud, peserta didik dapat menentukan kebenaran (Benar atau Salah) tiap pernyataan.',
    stimulus: 'Perubahan wujud zat selalu melibatkan perpindahan energi kalor, baik berupa penyerapan kalor (endoterm) maupun pelepasan kalor (eksoterm).',
    pertanyaan: 'Tentukan apakah setiap pernyataan di bawah ini BENAR (B) atau SALAH (S) dengan memberi tanda centang!',
    pernyataanBenarSalah: [
      { statement: 'Peristiwa mencair dan menguap merupakan proses yang memerlukan/menyerap kalor dari lingkungan.', isCorrect: true },
      { statement: 'Suhu suatu zat akan terus mengalami kenaikan drastis saat zat tersebut sedang mengalami proses mendidih.', isCorrect: false },
      { statement: 'Kondensasi (mengembun) adalah perubahan wujud dari gas menjadi cair yang melepaskan kalor ke lingkungan.', isCorrect: true },
      { statement: 'Kalor jenis suatu benda dipengaruhi oleh jumlah massa zat dan selalu bernilai tetap untuk semua jenis materi di alam.', isCorrect: false }
    ],
    kunciJawaban: '1 = Benar, 2 = Salah, 3 = Benar, 4 = Salah',
    pembahasan: 'Pernyataan 1 Benar (mencair dan menguap menyerap kalor). Pernyataan 2 Salah (pada saat mendidih, suhu zat konstan karena kalor digunakan untuk mengubah wujud zat / kalor laten). Pernyataan 3 Benar (kondensasi melepas kalor). Pernyataan 4 Salah (kalor jenis adalah karakteristik khas masing-masing bahan, bukan seragam untuk semua materi).',
    bobotSkor: 4,
    rubrikPenskoran: [
      'Skor 4: Benar seluruhnya (1 poin per butir pernyataan).',
      'Skor 0-3: Proporsional sesuai jumlah jawaban benar.'
    ]
  },

  // 6. Isian Singkat (MOTS - Mengaplikasi)
  {
    id: 'soal-6',
    nomor: 6,
    bentukSoal: 'isian_singkat',
    tingkatKesulitan: 'sedang',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Aplikasi perhitungan matematis Hukum Ohm pada rangkaian listrik tertutup.',
    materi: 'Rangkaian Listrik & Hukum Ohm',
    tujuanPembelajaran: 'Peserta didik dapat menghitung kuat arus listrik total pada rangkaian seri.',
    indikatorSoal: 'Disajikan diagram rangkaian listrik seri dengan sumber tegangan 12 Volt dan dua resistor 4 Ω dan 2 Ω, peserta didik dapat menghitung kuat arus listrik total.',
    stimulus: 'Perhatikan diagram rangkaian listrik seri berikut dengan seksama.',
    gambarSvg: SCIENTIFIC_SVGS.rangkaianListrik,
    gambarDeskripsi: 'Rangkaian listrik seri dua hambatan R1 = 4 Ω dan R2 = 2 Ω dihubungkan sumber tegangan baterai 12 Volt.',
    pertanyaan: 'Berdasarkan skema rangkaian di atas, besar kuat arus listrik total (I) yang mengalir pada rangkaian tersebut adalah sebesar ... Ampere.',
    kunciJawaban: '2 Ampere (atau 2 A / 2)',
    pembahasan: 'Hambatan pengganti rangkaian seri: R_total = R1 + R2 = 4 Ω + 2 Ω = 6 Ω. Berdasarkan Hukum Ohm: I = V / R_total = 12 Volt / 6 Ω = 2 Ampere.',
    bobotSkor: 2,
    rubrikPenskoran: [
      'Skor 2: Menuliskan angka "2" atau "2 A" atau "2 Ampere".',
      'Skor 1: Menuliskan rumus benar (I = V/R) namun salah dalam hasil akhir hitungan.',
      'Skor 0: Jawaban kosong atau salah total.'
    ]
  },

  // 7. Uraian (HOTS - Merefleksi)
  {
    id: 'soal-7',
    nomor: 7,
    bentukSoal: 'uraian',
    tingkatKesulitan: 'sulit',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    learningTargetExplanation: 'Refleksi kritis dan pemecahan masalah kontekstual mengenai sistem pencernaan makanan serta pola hidup sehat.',
    materi: 'Sistem Pencernaan Manusia & Pola Makan Sehat',
    tujuanPembelajaran: 'Peserta didik mampu menganalisis mekanisme pencernaan enzimatis serta merefleksikan dampaknya terhadap gangguan kesehatan lambung.',
    indikatorSoal: 'Disajikan studi kasus kebiasaan makan seseorang yang mengalami sakit maag (gastritis), peserta didik dapat menganalisis peran enzim/HCl di lambung dan merancang 2 langkah solutif berbasis sains.',
    stimulus: 'Andi sering melewatkan sarapan pagi dan memiliki kebiasaan mengonsumsi makanan yang sangat pedas serta minuman bersoda di siang hari saat perut kosong. Belakangan ini, Andi sering mengeluhkan rasa perih terbakar di ulu hati, mual, dan kembung. Dokter mendiagnosis Andi mengalami gastritis akut.',
    pertanyaan: 'Berdasarkan analisis fisiologi sistem pencernaan manusia:\na. Jelaskan mengapa produksi asam lambung (HCl) yang berlebih saat lambung kosong dapat menyebabkan rasa nyeri dan iritasi pada dinding lambung!\nb. Sebutkan peran penting asam klorida (HCl) dalam kondisi normal di lambung!\nc. Rancanglah 2 (dua) tindakan preventif berbasis gaya hidup ilmiah yang harus dilakukan Andi agar terhindar dari kekambuhan gastritis!',
    kunciJawaban: 'a. Dinding lambung dilindungi lapisan mukus. Saat lambung kosong, HCl yang diproduksi tidak memiliki substrat makanan untuk dicerna, sehingga kontak langsung dengan mukosa lambung menyebabkan pengikisan (erosi), peradangan, dan sensasi perih terbakar.\nb. Peran normal HCl: membunuh kuman/bakteri patogen pada makanan (desinfektan) dan mengaktifkan pepsinogen menjadi enzim pepsin aktif untuk mencerna protein.\nc. 2 Tindakan preventif: 1) Makan teratur dengan porsi sedang pada jam yang konsisten agar asam lambung selalu bereaksi dengan makanan; 2) Menghindari konsumsi iritan mukosa lambung seperti makanan terlalu pedas, asam tinggi, kafein berlebih, dan soda saat perut kosong.',
    pembahasan: 'Asam klorida (pH 1-2) disekresikan sel parietal lambung. Tanpa makanan, HCl mengikis mukosa pelindung. Penanganannya membutuhkan keteraturan jadwal pengisian lambung dan pencegahan iritasi kimiawi.',
    bobotSkor: 5,
    rubrikPenskoran: [
      'Skor 5: Menjawab poin a, b, dan c dengan penjelasan ilmiah lengkap, runtut, dan tepat.',
      'Skor 4: Menjawab ketiga poin dengan baik, namun salah satu penjelasan kurang mendalam.',
      'Skor 3: Hanya menjelaskan 2 dari 3 poin pertanyaan dengan benar.',
      'Skor 2: Hanya menjawab 1 poin dengan tepat.',
      'Skor 1: Mencoba menjawab namun konsep sains kurang tepat.',
      'Skor 0: Tidak menjawab.'
    ]
  }
];

export const DEFAULT_EXAM_CONFIG: ExamConfig = {
  kelas: '8',
  semester: 'Ganjil',
  subDisiplinIPA: 'Terpadu',
  topikMateri: 'Sistem Organ Manusia, Pesawat Sederhana, Tekanan Fluida, dan Rangkaian Listrik',
  tujuanPembelajaran: 'Peserta didik mampu menganalisis konsep fisis dan biologis pada sistem organ, mekanika tuas, tekanan fluida, serta rangkaian listrik tertutup dalam kehidupan sehari-hari.',
  bentukSoalDipilih: [
    'pilihan_ganda',
    'pilihan_ganda_kompleks',
    'menjodohkan',
    'benar_salah',
    'isian_singkat',
    'uraian'
  ],
  jumlahSoalPerBentuk: {
    pilihan_ganda: 10,
    pilihan_ganda_kompleks: 5,
    isian_singkat: 5,
    uraian: 5,
    menjodohkan: 5,
    benar_salah: 5,
  },
  sertakanGambar: true,
  jumlahSoalBergambar: 4,
  cognitiveLevelsDipilih: ['LOTS', 'MOTS', 'HOTS'],
  learningExperiencesDipilih: ['Memahami', 'Mengaplikasi', 'Merefleksi'],
  tingkatKesulitanUtama: 'Kombinasi Seimbang',
};
