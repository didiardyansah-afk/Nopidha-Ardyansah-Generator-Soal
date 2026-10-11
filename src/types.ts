export type QuestionType =
  | 'pilihan_ganda'
  | 'pilihan_ganda_kompleks'
  | 'isian_singkat'
  | 'uraian'
  | 'menjodohkan'
  | 'benar_salah';

export type DifficultyLevel = 'rendah' | 'sedang' | 'sulit';

export type CognitiveLevel = 'LOTS' | 'MOTS' | 'HOTS';

export type LearningExperience = 'Memahami' | 'Mengaplikasi' | 'Merefleksi';

export interface SchoolIdentity {
  logoUrl: string;
  namaSekolah: string;
  alamatSekolah: string;
  tahunPelajaran: string;
  semester: 'Ganjil' | 'Genap';
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  namaGuru: string;
  nipGuru: string;
  alokasiWaktu: string;
  jenisAsesmen: string; // e.g. "Sumatif Akhir Semester (SAS) Ganjil"
  kelas: '7' | '8' | '9';
  mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)';
  pemerintahDaerah: string;
  dinasPendidikan: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface StatementItem {
  statement: string;
  isCorrect: boolean; // true = Benar, false = Salah
}

export interface QuestionItem {
  id: string;
  nomor: number;
  bentukSoal: QuestionType;
  tingkatKesulitan: DifficultyLevel;
  cognitiveLevel: CognitiveLevel; // LOTS / MOTS / HOTS
  learningExperience: LearningExperience; // Memahami / Mengaplikasi / Merefleksi
  learningTargetExplanation?: string; // Penjelasan pemahaman dasar / aplikasi konteks / refleksi kritis
  materi: string;
  tujuanPembelajaran: string;
  indikatorSoal: string;
  stimulus?: string; // Bacaan, data tabel, atau konteks sains
  pertanyaan: string;
  gambarSvg?: string; // Diagram/ilustrasi ilmiah dalam SVG
  gambarUrl?: string; // URL atau data:image base64 gambar yang diunggah pengguna
  gambarDeskripsi?: string;
  
  // Spesifik bentuk soal:
  pilihan?: string[]; // Untuk PG (4 opsi A, B, C, D)
  pilihanKompleks?: { text: string; isCorrect: boolean }[]; // Untuk PGK
  kunciJawaban: string; // Jawaban benar atau ringkasan
  pembahasan: string; // Pembahasan ilmiah komprehensif
  bobotSkor: number; // Skor mentah untuk soal ini
  
  // Khusus Menjodohkan
  menjodohkanPairs?: MatchingPair[];
  
  // Khusus Benar-Salah
  pernyataanBenarSalah?: StatementItem[];

  // Pedoman penskoran detail (terutama untuk uraian/isian)
  rubrikPenskoran?: string[];
}

export interface ExamConfig {
  kelas: '7' | '8' | '9';
  semester: 'Ganjil' | 'Genap';
  subDisiplinIPA: 'Terpadu' | 'Fisika' | 'Biologi' | 'Kimia' | 'Bumi dan Antariksa';
  topikMateri: string;
  tujuanPembelajaran: string;
  bentukSoalDipilih: QuestionType[];
  jumlahSoalPerBentuk: Record<QuestionType, number>;
  sertakanGambar: boolean;
  jumlahSoalBergambar: number;
  cognitiveLevelsDipilih: CognitiveLevel[]; // Bisa pilih LOTS, MOTS, HOTS ketiganya
  learningExperiencesDipilih: LearningExperience[]; // Bisa pilih Memahami, Mengaplikasi, Merefleksi ketiganya
  tingkatKesulitanUtama: DifficultyLevel | 'Kombinasi Seimbang';
}

export interface StudentScoreSimulation {
  id: string;
  namaSiswa: string;
  nomorAbsen: number;
  skorPerBentuk: Record<QuestionType, number>;
  totalSkorMentah: number;
  nilaiAkhir100: number;
  tuntas: boolean;
}

export interface ExamPackage {
  id: string;
  judul: string;
  createdAt: string;
  schoolInfo: SchoolIdentity;
  config: ExamConfig;
  questions: QuestionItem[];
  keterangan: string;
}
