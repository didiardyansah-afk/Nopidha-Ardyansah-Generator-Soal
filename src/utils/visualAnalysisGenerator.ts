import { QuestionItem, QuestionType } from '../types';
import { SCIENTIFIC_SVGS } from '../data/curriculumData';

export interface VisualAnalysisTemplate {
  id: string;
  title: string;
  diagramKey: keyof typeof SCIENTIFIC_SVGS;
  targetPart: string;
  materi: string;
  kelas: '7' | '8' | '9';
  tujuanPembelajaran: string;
  indikatorSoal: string;
  stimulus: string;
  pertanyaan: string;
  bentukSoal: QuestionType;
  pilihan?: string[];
  pilihanKompleks?: { text: string; isCorrect: boolean }[];
  menjodohkanPairs?: { left: string; right: string }[];
  pernyataanBenarSalah?: { statement: string; isCorrect: boolean }[];
  kunciJawaban: string;
  pembahasan: string;
  bobotSkor: number;
  cognitiveLevel: 'LOTS' | 'MOTS' | 'HOTS';
  learningExperience: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
  learningTargetExplanation: string;
  gambarDeskripsi: string;
  rubrikPenskoran: string[];
}

export const VISUAL_ANALYSIS_CATALOG: VisualAnalysisTemplate[] = [
  // 1. Sel Tumbuhan - Bagian X (Dinding Sel)
  {
    id: 'va-sel-dinding',
    title: 'Sel Tumbuhan: Identifikasi Fungsi Dinding Sel (Bagian X)',
    diagramKey: 'selTumbuhan',
    targetPart: 'Bagian X (Dinding Sel)',
    materi: 'Struktur dan Fungsi Organel Sel Tumbuhan',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi struktur organel sel tumbuhan dan menganalisis fungsi perlindungan dinding sel.',
    indikatorSoal: 'Disajikan diagram struktur sel tumbuhan berlabel, peserta didik dapat mengidentifikasi fungsi utama organel sel yang ditunjuk oleh huruf X dengan tepat.',
    stimulus: 'Perhatikan penampang mikroskopis sel tumbuhan berikut ini dengan cermat!',
    pertanyaan: 'Berdasarkan gambar sel tumbuhan di atas, bagian yang ditunjuk oleh huruf X adalah dinding sel. Fungsi spesifik dari bagian X tersebut bagi tumbuhan adalah ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Memberikan bentuk yang kaku dan melindungi isi bagian dalam sel tumbuhan dari tekanan turgor',
      'B. Tempat terjadinya respirasi seluler aerobik guna memproduksi molekul energi ATP',
      'C. Mengontrol seluruh aktivitas sel dan menyimpan materi hereditas kromosom',
      'D. Mensintesis molekul lipid dan menetralkan racun di dalam sitoplasma'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Dinding sel tumbuhan tersusun dari selulosa, hemiselulosa, dan pektin. Dinding sel bersifat kaku dan kuat sehingga memberikan bentuk tetap pada sel tumbuhan, memperkokoh jaringan, serta melindungi sel dari pecah akibat tekanan osmosis (turgor).',
    bobotSkor: 1,
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    learningTargetExplanation: 'Menguji kemampuan peserta didik mengenali organel dinding sel dan fungsinya pada tingkat dasar.',
    gambarDeskripsi: 'Diagram vektor penampang sel tumbuhan dengan label merah huruf X yang menunjuk langsung pada dinding sel.',
    rubrikPenskoran: ['Skor 1: Memilih jawaban A dengan benar.', 'Skor 0: Memilih jawaban selain A atau kosong.']
  },

  // 2. Sel Tumbuhan - Kloroplas & Fotosintesis
  {
    id: 'va-sel-kloroplas',
    title: 'Sel Tumbuhan: Organel Kloroplas dan Fotosintesis',
    diagramKey: 'selTumbuhan',
    targetPart: 'Kloroplas (1 & 2)',
    materi: 'Organel Sel dan Proses Fotosintesis',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis fungsi kloroplas sebagai organel pengubah energi cahaya menjadi energi kimia.',
    indikatorSoal: 'Disajikan gambar sel tumbuhan, peserta didik dapat mengidentifikasi organel tempat berlangsungnya reaksi fotosintesis.',
    stimulus: 'Amati organel berwarna hijau berlabel Kloroplas (1) dan (2) pada diagram sel tumbuhan berikut.',
    pertanyaan: 'Organel Kloroplas yang terlihat pada gambar sel tumbuhan di atas mengandung pigmen klorofil. Fungsi vital dari organel tersebut adalah ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Menangkap energi cahaya matahari untuk melangsungkan sintesis karbohidrat (glukosa)',
      'B. Mencerna zat sisa metabolisme yang sudah tidak terpakai oleh sel tumbuhan',
      'C. Mengatur keluar masuknya ion natrium dan kalium melalui transport aktif',
      'D. Menyimpan cadangan pigmen antosianin pembentuk warna bunga'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Kloroplas adalah plastida yang mengandung klorofil dan tilakoid tempat terjadinya fotosintesis: mengubah CO2 dan H2O menjadi C6H12O6 dan O2 dengan bantuan foton cahaya matahari.',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Menerapkan pemahaman struktur kloroplas terhadap proses metabolisme fotosintesis.',
    gambarDeskripsi: 'Diagram sel tumbuhan memperlihatkan organel kloroplas dengan grana hijau di bagian sitoplasma.',
    rubrikPenskoran: ['Skor 1: Memilih opsi A.', 'Skor 0: Salah atau kosong.']
  },

  // 3. Mikroskop - Identifikasi Lensa Okuler (Bagian A)
  {
    id: 'va-mikroskop-okuler',
    title: 'Mikroskop Optik: Identifikasi Lensa Okuler (Bagian A)',
    diagramKey: 'mikroskop',
    targetPart: 'Bagian A (Lensa Okuler)',
    materi: 'Alat Optik dan Pengenalan Mikroskop',
    kelas: '7',
    tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi komponen mikroskop optik dan perannya dalam pembentukan bayangan objek.',
    indikatorSoal: 'Disajikan skema mikroskop optik dengan label A, B, C, dan D, peserta didik dapat menentukan fungsi komponen A dengan benar.',
    stimulus: 'Perhatikan skema bagian-bagian mikroskop optik berikut saat digunakan dalam pengamatan jaringan biologi.',
    pertanyaan: 'Pada instrumen mikroskop di atas, komponen yang ditunjuk oleh huruf A adalah lensa okuler. Fungsi utama dari lensa okuler adalah ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Memperbesar bayangan nyata yang dibentuk lensa objektif sehingga dapat diamati langsung oleh mata',
      'B. Membentuk bayangan nyata, terbalik, dan diperbesar yang berada dekat dengan meja spesimen',
      'C. Memutar revolver untuk memilih perbesaran lensa 10x, 40x, atau 100x',
      'D. Mengatur intensitas cahaya yang dipantulkan oleh cermin cekung menuju kondensor'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Lensa okuler berada di bagian atas tabung mikroskop (dekat mata pengamat). Fungsinya memperbesar bayangan nyata yang telah dibentuk oleh lensa objektif sehingga menghasilkan bayangan maya, tegak, dan diperbesar yang nyaman dilihat mata.',
    bobotSkor: 1,
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    learningTargetExplanation: 'Menguji pengenalan bagian optik mikroskop dan peran perbesaran okuler.',
    gambarDeskripsi: 'Skema mikroskop optik dengan penunjuk huruf A pada lensa okuler di bagian atas.',
    rubrikPenskoran: ['Skor 1: Jawaban A.', 'Skor 0: Opsi selain A.']
  },

  // 4. Mikroskop - Bagian D (Makrometer)
  {
    id: 'va-mikroskop-makrometer',
    title: 'Mikroskop Optik: Fungsi Pengatur Fokus Kasar (Bagian D)',
    diagramKey: 'mikroskop',
    targetPart: 'Bagian D (Makrometer / Pemutar Kasar)',
    materi: 'Keterampilan Proses Sains & Penggunaan Mikroskop',
    kelas: '7',
    tujuanPembelajaran: 'Peserta didik mampu menentukan langkah operasional pemfokusan bayangan menggunakan sekrup makrometer.',
    indikatorSoal: 'Disajikan diagram mikroskop optik, peserta didik dapat menganalisis fungsi bagian D ketika mencari fokus bayangan preparat.',
    stimulus: 'Seorang peserta didik ingin memfokuskan bayangan preparat sel epidermis bawang merah yang belum terlihat jelas.',
    pertanyaan: 'Untuk menaikkan atau menurunkan tabung mikroskop secara cepat agar diperoleh fokus bayangan awal, bagian yang harus diputar adalah bagian yang ditunjuk huruf ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Bagian A (Lensa Okuler)',
      'B. Bagian B (Lensa Objektif)',
      'C. Bagian C (Meja Preparat)',
      'D. Bagian D (Makrometer / Sekrup Pengarah Kasar)'
    ],
    kunciJawaban: 'D',
    pembahasan: 'Bagian D adalah makrometer (pemutar kasar) yang berfungsi menaikkan dan menurunkan tabung mikroskop secara cepat untuk menemukan fokus kasar bayangan preparat.',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Mengaplikasikan prosedur laboratorium dalam pemfokusan instrumen mikroskop optik.',
    gambarDeskripsi: 'Diagram mikroskop optik dengan label penunjuk D pada kenop pemutar makrometer.',
    rubrikPenskoran: ['Skor 1: Memilih opsi D.', 'Skor 0: Salah.']
  },

  // 5. Sistem Pencernaan - Lambung (Bagian X)
  {
    id: 'va-pencernaan-lambung',
    title: 'Sistem Pencernaan: Identifikasi Organ & Enzim Lambung (Bagian X)',
    diagramKey: 'sistemPencernaan',
    targetPart: 'Bagian X (Lambung / Ventrikulus)',
    materi: 'Sistem Pencernaan Makanan pada Manusia',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik mampu menganalisis proses pencernaan kimiawi dan mekanis pada organ lambung (bagian X).',
    indikatorSoal: 'Disajikan gambar diagram saluran organ pencernaan manusia, peserta didik dapat mengidentifikasi fungsi getah lambung pada bagian X.',
    stimulus: 'Perhatikan alur saluran pencernaan manusia dari esofagus hingga usus besar pada gambar berikut.',
    pertanyaan: 'Organ yang ditunjuk oleh huruf X adalah Lambung (Ventrikulus). Proses pencernaan kimiawi yang berlangsung di dalam organ X tersebut melibatkan getah lambung yang berfungsi untuk ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Mengubah protein menjadi pepton oleh enzim pepsin serta membunuh bakteri oleh HCl',
      'B. Mengemulsi lemak dari makanan menjadi butiran asam lemak oleh getah empedu',
      'C. Memecah amilum menjadi maltosa oleh enzim ptialin dalam kondisi basa',
      'D. Menyerap air dan garam mineral sisa metabolisme oleh dinding vili'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Lambung (X) mensekresikan getah lambung yang mengandung Asam Klorida (HCl) untuk membunuh patogen dan mengasamkan kimus, enzim Pepsin untuk memecah protein menjadi pepton, serta Renin untuk mengendapkan kasein susu.',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Menganalisis keterkaitan struktur organ lambung dengan biokimia pencernaan protein.',
    gambarDeskripsi: 'Diagram anatomis organ pencernaan manusia dengan label huruf X pada organ lambung merah muda.',
    rubrikPenskoran: ['Skor 1: Memilih A.', 'Skor 0: Salah.']
  },

  // 6. Tuas Pengungkit - Analisis Titik Tumpu & Gaya Kuasa
  {
    id: 'va-tuas-mekanika',
    title: 'Pesawat Sederhana: Analisis Bagian Tuas Jenis Pertama',
    diagramKey: 'tuasPengungkit',
    targetPart: 'Titik Tumpu (T), Kuasa (F), Beban (W)',
    materi: 'Pesawat Sederhana (Tuas/Pengungkit Jenis I)',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik mampu menganalisis hubungan panjang lengan beban dan lengan kuasa untuk menghasilkan keuntungan mekanis.',
    indikatorSoal: 'Disajikan skema tuas jenis pertama dengan beban W = 600 N, peserta didik dapat menghitung besar gaya kuasa F minimum yang diperlukan.',
    stimulus: 'Perhatikan diagram tuas pengungkit jenis pertama dengan titik tumpu (T) terletak di antara beban (W) dan kuasa (F).',
    pertanyaan: 'Berdasarkan posisi titik tumpu (T) dan ukuran panjang lengan pada diagram di atas, berapakah besar gaya kuasa (F) minimum untuk menyeimbangkan beban batu seberat 600 N?',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. 200 Newton dengan keuntungan mekanis tuas bernilai 3',
      'B. 400 Newton dengan keuntungan mekanis tuas bernilai 1,5',
      'C. 600 Newton karena posisi tumpu berada tepat di tengah batang',
      'D. 1.800 Newton karena lengan beban lebih pendek dari lengan kuasa'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Hukum Kesetimbangan Tuas: W × lb = F × lk. Diketahui W = 600 N, lb = 50 cm, lk = 150 cm. F = (600 × 50) / 150 = 200 N. Keuntungan mekanis KM = lk / lb = 150 / 50 = 3.',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Mengaplikasikan formulasi momen gaya pesawat sederhana pada diagram tuas.',
    gambarDeskripsi: 'Skema tuas pengungkit lengkap dengan titik tumpu segitiga T, lengan beban 50 cm, dan lengan kuasa 150 cm.',
    rubrikPenskoran: ['Skor 1: Memilih A.', 'Skor 0: Salah.']
  },

  // 7. Rangkaian Listrik - Hukum Ohm & Kuat Arus
  {
    id: 'va-listrik-seri',
    title: 'Rangkaian Listrik: Analisis Resistor Seri & Kuat Arus (I)',
    diagramKey: 'rangkaianListrik',
    targetPart: 'Resistor R1, R2, dan Sumber Tegangan V',
    materi: 'Rangkaian Listrik Tertutup dan Hukum Ohm',
    kelas: '9',
    tujuanPembelajaran: 'Peserta didik mampu menghitung besar arus listrik I yang mengalir pada rangkaian seri dua resistor.',
    indikatorSoal: 'Disajikan skema rangkaian listrik seri dengan resistor 4 Ω dan 2 Ω serta tegangan 12 Volt, peserta didik dapat menentukan besar kuat arus I.',
    stimulus: 'Perhatikan diagram skematis rangkaian listrik tertutup berarus searah (DC) berikut ini.',
    pertanyaan: 'Berdasarkan susunan hambatan dan baterai pada diagram rangkaian di atas, kuat arus listrik (I) yang mengalir melalui hambatan R2 adalah sebesar ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. 2 Ampere, karena pada rangkaian seri kuat arus yang mengalir di setiap komponen sama besar',
      'B. 3 Ampere, karena tegangan terbagi rata pada masing-masing resistor',
      'C. 6 Ampere, karena hambatan total rangkaian berkurang',
      'D. 12 Ampere, sama dengan besar tegangan sumber baterai'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Hambatan total rangkaian seri: R_tot = R1 + R2 = 4 Ω + 2 Ω = 6 Ω. Kuat arus total: I = V / R_tot = 12 V / 6 Ω = 2 A. Pada rangkaian seri tanpa percabangan, arus di setiap titik sama besar (I_total = I_R1 = I_R2 = 2 A).',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Menganalisis karakteristik kuat arus pada konfigurasi hambatan listrik seri.',
    gambarDeskripsi: 'Skema rangkaian listrik persegi tertutup dengan R1 = 4 Ω, R2 = 2 Ω, baterai 12 V, dan penunjuk panah kuat arus I.',
    rubrikPenskoran: ['Skor 1: Memilih opsi A.', 'Skor 0: Salah.']
  },

  // 8. Tekanan Fluida Archimedes - Benda A, B, C
  {
    id: 'va-archimedes-apung',
    title: 'Fluida & Archimedes: Posisi Benda Terapung, Melayang, Tenggelam',
    diagramKey: 'hukumArchimedes',
    targetPart: 'Benda A (Terapung), Benda B (Melayang), Benda C (Tenggelam)',
    materi: 'Tekanan Zat Cair & Prinsip Hukum Archimedes',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik mampu membandingkan massa jenis ketiga benda terhadap massa jenis zat cair.',
    indikatorSoal: 'Disajikan gambar tiga benda dalam bejana zat cair seragam, peserta didik dapat menganalisis urutan massa jenis benda dengan tepat.',
    stimulus: 'Tiga buah balok kubus A, B, dan C dicelupkan ke dalam bejana berisi cairan seragam seperti gambar di bawah.',
    pertanyaan: 'Berdasarkan posisi keseimbangan benda A, B, dan C pada bejana fluida di atas, kesimpulan yang paling tepat mengenai perbandingan massa jenis adalah ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. ρ_A < ρ_cair, ρ_B = ρ_cair, dan ρ_C > ρ_cair (urutan massa jenis: ρ_A < ρ_B < ρ_C)',
      'B. ρ_A > ρ_cair, ρ_B = ρ_cair, dan ρ_C < ρ_cair',
      'C. Gaya apung pada benda C adalah yang paling besar sehingga benda tenggelam',
      'D. Benda A mengalami gaya berat lebih besar daripada gaya apung Archimedes'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Benda A terapung karena massa jenisnya lebih kecil daripada zat cair (ρ_A < ρ_cair). Benda B melayang karena massa jenisnya sama (ρ_B = ρ_cair). Benda C tenggelam di dasar karena massa jenisnya lebih besar (ρ_C > ρ_cair).',
    bobotSkor: 1,
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    learningTargetExplanation: 'Merefleksikan hukum Archimedes terhadap kestabilan benda di dalam zat cair.',
    gambarDeskripsi: 'Gambar bejana fluida biru berisi balok A terapung di permukaan, balok B melayang di tengah, dan balok C tenggelam di dasar bejana.',
    rubrikPenskoran: ['Skor 1: Memilih opsi A.', 'Skor 0: Salah.']
  },

  // 9. Percobaan Ingenhousz - Identifikasi Gas Oksigen
  {
    id: 'va-fotosintesis-gas',
    title: 'Fotosintesis Ingenhousz: Identifikasi Gelembung Gas O2',
    diagramKey: 'fotosintesisIngenhousz',
    targetPart: 'Ruang Gas di Ujung Tabung Reaksi',
    materi: 'Fotosintesis & Percobaan Ingenhousz',
    kelas: '8',
    tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi zat hasil reaksi fotosintesis pada percobaan Ingenhousz.',
    indikatorSoal: 'Disajikan skema percobaan Ingenhousz tanaman Hydrilla sp., peserta didik dapat mengidentifikasi jenis gas dan cara mengujinya.',
    stimulus: 'Perhatikan rangkaian alat percobaan fotosintesis Ingenhousz berikut yang disinari cahaya matahari.',
    pertanyaan: 'Gelembung-gelembung gas yang terkumpul di ujung tabung reaksi di atas dihasilkan oleh tanaman Hydrilla verticillata saat fotosintesis. Gas tersebut adalah ...',
    bentukSoal: 'pilihan_ganda',
    pilihan: [
      'A. Oksigen (O2), yang dibuktikan dengan nyala bara api yang semakin membesar saat didekatkan',
      'B. Karbon dioksida (CO2), yang mengeruhkan larutan air kapur saat dialirkan',
      'C. Hidrogen (H2), yang meledak dengan letupan kecil saat disulut korek api',
      'D. Uap air (H2O), yang mengembun menjadi tetesan cairan pada dinding tabung'
    ],
    kunciJawaban: 'A',
    pembahasan: 'Percobaan Ingenhousz membuktikan bahwa fotosintesis menghasilkan gas oksigen (O2). Ketika tanaman air Hydrilla terkena foton cahaya, terjadi fotolisis air melepaskan molekul gas O2 yang ditampung di tabung reaksi terbalik. Buktinya nyala bara dupa/api akan semakin terang.',
    bobotSkor: 1,
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    learningTargetExplanation: 'Menerapkan metode ilmiah pembuktian gas hasil reaksi fotosintesis.',
    gambarDeskripsi: 'Diagram perangkat percobaan fotosintesis Ingenhousz: corong kaca terbalik, tabung reaksi, gelembung gas O2, dan Hydrilla sp.',
    rubrikPenskoran: ['Skor 1: Memilih opsi A.', 'Skor 0: Salah.']
  }
];

/**
 * Builds a QuestionItem from a VisualAnalysisTemplate
 * Always guarantees:
 * - hasDiagram: true
 * - isVisualAnalysis: true
 * - gambarSvg populated from SCIENTIFIC_SVGS
 */
export function buildQuestionFromTemplate(
  template: VisualAnalysisTemplate,
  nomor: number = 1
): QuestionItem {
  const svg = SCIENTIFIC_SVGS[template.diagramKey] || '';
  return {
    id: `va-q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    nomor,
    bentukSoal: template.bentukSoal,
    tingkatKesulitan: template.cognitiveLevel === 'LOTS' ? 'rendah' : template.cognitiveLevel === 'MOTS' ? 'sedang' : 'sulit',
    cognitiveLevel: template.cognitiveLevel,
    learningExperience: template.learningExperience,
    learningTargetExplanation: template.learningTargetExplanation,
    materi: template.materi,
    tujuanPembelajaran: template.tujuanPembelajaran,
    indikatorSoal: template.indikatorSoal,
    stimulus: template.stimulus,
    pertanyaan: template.pertanyaan,
    hasDiagram: true, // Always true for Visual Analysis questions
    isVisualAnalysis: true, // Flag as Visual Analysis question
    visualTargetPart: template.targetPart,
    gambarSvg: svg,
    gambarDeskripsi: template.gambarDeskripsi,
    pilihan: template.pilihan,
    pilihanKompleks: template.pilihanKompleks,
    menjodohkanPairs: template.menjodohkanPairs,
    pernyataanBenarSalah: template.pernyataanBenarSalah,
    kunciJawaban: template.kunciJawaban,
    pembahasan: template.pembahasan,
    bobotSkor: template.bobotSkor,
    rubrikPenskoran: template.rubrikPenskoran,
  };
}

/**
 * Generates an array of Visual Analysis questions based on count and optional criteria.
 * Ensures every returned question has hasDiagram: true.
 */
export function generateVisualAnalysisQuestions(options: {
  count?: number;
  diagramKey?: keyof typeof SCIENTIFIC_SVGS;
  startIndex?: number;
}): QuestionItem[] {
  const { count = 5, diagramKey, startIndex = 1 } = options;

  let pool = [...VISUAL_ANALYSIS_CATALOG];
  if (diagramKey) {
    const filtered = pool.filter((item) => item.diagramKey === diagramKey);
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  const result: QuestionItem[] = [];
  for (let i = 0; i < count; i++) {
    const template = pool[i % pool.length];
    result.push(buildQuestionFromTemplate(template, startIndex + i));
  }

  return result;
}
