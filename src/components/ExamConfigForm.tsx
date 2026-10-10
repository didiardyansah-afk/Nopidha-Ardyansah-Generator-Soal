import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  HelpCircle,
  Image as ImageIcon,
  CheckSquare,
  BookMarked,
  Sliders,
  ChevronDown,
  Info,
  RotateCcw,
  GraduationCap
} from 'lucide-react';
import {
  ExamConfig,
  QuestionType,
  CognitiveLevel,
  LearningExperience,
  DifficultyLevel,
} from '../types';
import { SILABUS_IPA_SMP } from '../data/curriculumData';

interface ExamConfigFormProps {
  config: ExamConfig;
  onChange: (updated: ExamConfig) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 50, 75, 100];

const QUESTION_TYPE_LABELS: Record<QuestionType, { title: string; desc: string }> = {
  pilihan_ganda: {
    title: 'Pilihan Ganda',
    desc: '4 pilihan jawaban (A, B, C, D) dengan satu kunci benar.',
  },
  pilihan_ganda_kompleks: {
    title: 'Pilihan Ganda Kompleks',
    desc: 'Beberapa opsi/pernyataan benar (multi-centang).',
  },
  menjodohkan: {
    title: 'Menjodohkan',
    desc: 'Memasangkan kolom premis dan kolom respon sains.',
  },
  benar_salah: {
    title: 'Benar–Salah',
    desc: 'Menentukan validitas pernyataan ilmiah (B atau S).',
  },
  isian_singkat: {
    title: 'Isian Singkat',
    desc: 'Jawaban singkat berupa besaran fisis atau istilah sains.',
  },
  uraian: {
    title: 'Uraian',
    desc: 'Soal esai analitis dengan sub-pertanyaan bertingkat.',
  },
};

export const ExamConfigForm: React.FC<ExamConfigFormProps> = ({
  config,
  onChange,
  onGenerate,
  isGenerating,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  // Filter silabus according to current grade
  const currentSyllabus = SILABUS_IPA_SMP.filter((s) => s.kelas === config.kelas);

  const toggleQuestionType = (type: QuestionType) => {
    let nextSelected = [...config.bentukSoalDipilih];
    if (nextSelected.includes(type)) {
      // Must keep at least 1 question type
      if (nextSelected.length > 1) {
        nextSelected = nextSelected.filter((t) => t !== type);
      }
    } else {
      nextSelected.push(type);
    }

    onChange({
      ...config,
      bentukSoalDipilih: nextSelected,
    });
  };

  const handleCountChange = (type: QuestionType, count: number) => {
    onChange({
      ...config,
      jumlahSoalPerBentuk: {
        ...config.jumlahSoalPerBentuk,
        [type]: count,
      },
    });
  };

  const toggleCognitiveLevel = (level: CognitiveLevel) => {
    let nextLevels = [...config.cognitiveLevelsDipilih];
    if (nextLevels.includes(level)) {
      if (nextLevels.length > 1) {
        nextLevels = nextLevels.filter((l) => l !== level);
      }
    } else {
      nextLevels.push(level);
    }
    onChange({ ...config, cognitiveLevelsDipilih: nextLevels });
  };

  const toggleLearningExperience = (exp: LearningExperience) => {
    let nextExp = [...config.learningExperiencesDipilih];
    if (nextExp.includes(exp)) {
      if (nextExp.length > 1) {
        nextExp = nextExp.filter((e) => e !== exp);
      }
    } else {
      nextExp.push(exp);
    }
    onChange({ ...config, learningExperiencesDipilih: nextExp });
  };

  const handleApplyPreset = (topik: string, tp: string) => {
    onChange({
      ...config,
      topikMateri: topik,
      tujuanPembelajaran: tp,
    });
    setShowPresets(false);
  };

  // Calculate total questions requested
  const totalQuestionsRequested = config.bentukSoalDipilih.reduce((sum, b) => {
    return sum + (config.jumlahSoalPerBentuk[b] || 5);
  }, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden">
      {/* Header Form */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-cyan-300" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Panel Konfigurasi Asesmen IPA SMP
              </h2>
              <p className="text-xs text-indigo-200">
                Sesuaikan jenjang SMP, materi, bentuk soal bertingkat, kognitif, dan pengalaman belajar
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold">
            Jenjang: SMP
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* ROW 1: JENJANG SMP & PILIHAN KELAS & SUB-DISIPLIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Jenjang Pendidikan
            </label>
            <div className="w-full px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-bold text-sm flex items-center justify-between">
              <span>SMP (Sekolah Menengah Pertama)</span>
              <span className="text-[11px] bg-indigo-200/70 text-indigo-800 px-1.5 py-0.5 rounded font-mono">
                Fase D
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Khusus jenjang SMP (Fase D) Kurikulum Nasional & Merdeka.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Tingkat Kelas & Semester
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={config.kelas}
                onChange={(e) =>
                  onChange({
                    ...config,
                    kelas: e.target.value as '7' | '8' | '9',
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-800 bg-white text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7">Kelas 7 SMP</option>
                <option value="8">Kelas 8 SMP</option>
                <option value="9">Kelas 9 SMP</option>
              </select>

              <select
                value={config.semester}
                onChange={(e) =>
                  onChange({
                    ...config,
                    semester: e.target.value as 'Ganjil' | 'Genap',
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-800 bg-white text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Ganjil">Smt Ganjil</option>
                <option value="Genap">Smt Genap</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Jenis Soal (Mata Pelajaran IPA SMP)
            </label>
            <select
              value={config.subDisiplinIPA}
              onChange={(e) =>
                onChange({
                  ...config,
                  subDisiplinIPA: e.target.value as any,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-800 bg-white text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Terpadu">IPA Terpadu (Fisika, Biologi, Kimia, Bumi)</option>
              <option value="Fisika">Fisika SMP (Mekanika, Kalor, Listrik, Optik)</option>
              <option value="Biologi">Biologi SMP (Sel, Organ, Ekologi, Genetika)</option>
              <option value="Kimia">Kimia SMP (Zat, Partikel, Asam-Basa, Larutan)</option>
              <option value="Bumi dan Antariksa">Bumi & Tata Surya SMP (Geologi & Antariksa)</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Fokus kurikuler IPA jenjang SMP.
            </p>
          </div>
        </div>

        {/* ROW 2: TOPIK MATERI & TUJUAN PEMBELAJARAN (TEXT BOXES) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-indigo-600" />
              Topik atau Materi yang Diinginkan
            </label>
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Pilih dari Silabus Kelas {config.kelas}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showPresets ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Quick presets popdown */}
          {showPresets && (
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 text-xs animate-in fade-in duration-100">
              <p className="font-semibold text-indigo-950">
                Pilih rekomendasi materi dan tujuan pembelajaran silabus IPA SMP Kelas {config.kelas}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {currentSyllabus.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(item.topik, item.tujuanPembelajaranDefault)}
                    className="text-left p-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-2xs group"
                  >
                    <div className="font-bold text-indigo-900 group-hover:text-indigo-950">
                      {item.kategori}
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-1">
                      {item.topik}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <textarea
              rows={2}
              value={config.topikMateri}
              onChange={(e) => onChange({ ...config, topikMateri: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm text-slate-900 leading-relaxed font-sans placeholder:text-slate-400"
              placeholder="Ketik topik materi IPA SMP di sini, contoh: Sistem Pencernaan Manusia, Uji Zat Makanan, dan Gangguan Organ Pencernaan..."
              required
            />
            <p className="text-[11px] text-slate-500">
              Guru dapat mengetik bebas materi apa saja dalam lingkup IPA SMP.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-900">
              Tujuan Pembelajaran (TP) / Capaian Pembelajaran
            </label>
            <textarea
              rows={2}
              value={config.tujuanPembelajaran}
              onChange={(e) =>
                onChange({ ...config, tujuanPembelajaran: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm text-slate-900 leading-relaxed font-sans placeholder:text-slate-400"
              placeholder="Ketik tujuan pembelajaran di sini, contoh: Peserta didik mampu menganalisis struktur organ pencernaan serta merefleksikan pola makan sehat untuk mencegah gastritis..."
              required
            />
            <p className="text-[11px] text-slate-500">
              Tujuan pembelajaran akan menjadi dasar perumusan indikator kisi-kisi dan kartu soal.
            </p>
          </div>
        </div>

        {/* ROW 3: BENTUK SOAL (MULTI-SELECT) + DROPDOWN JUMLAH SOAL OTOMATIS */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                Bentuk Soal & Jumlah Soal
              </label>
              <p className="text-xs text-slate-500">
                Pilih satu atau lebih bentuk soal. Setiap bentuk yang dicentang akan otomatis menampilkan pilihan jumlah soal.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800">
              Total Soal Terpilih: {totalQuestionsRequested} Butir
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((type) => {
              const isSelected = config.bentukSoalDipilih.includes(type);
              const count = config.jumlahSoalPerBentuk[type] || 5;
              const info = QUESTION_TYPE_LABELS[type];

              return (
                <div
                  key={type}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id={`cb-${type}`}
                      checked={isSelected}
                      onChange={() => toggleQuestionType(type)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`cb-${type}`}
                        className="text-sm font-bold text-slate-900 cursor-pointer select-none block"
                      >
                        {info.title}
                      </label>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {info.desc}
                      </p>

                      {/* Dropdown Jumlah Soal Muncul Otomatis Saat Dipilih */}
                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-indigo-200/80 flex items-center justify-between gap-2 animate-in fade-in duration-150">
                          <span className="text-xs font-semibold text-indigo-900">
                            Jumlah Soal:
                          </span>
                          <select
                            value={count}
                            onChange={(e) =>
                              handleCountChange(type, Number(e.target.value))
                            }
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-indigo-300 bg-white text-indigo-900 focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
                          >
                            {QUESTION_COUNT_OPTIONS.map((val) => (
                              <option key={val} value={val}>
                                {val} Butir
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 4: OPSI SOAL BERGAMBAR */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="soalBergambarCheckbox"
              checked={config.sertakanGambar}
              onChange={(e) =>
                onChange({ ...config, sertakanGambar: e.target.checked })
              }
              className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <div>
              <label
                htmlFor="soalBergambarCheckbox"
                className="text-sm font-bold text-emerald-950 flex items-center gap-1.5 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Sertakan Soal Bergambar / Diagram IPA
              </label>
              <p className="text-xs text-emerald-700">
                Menyisipkan stimulus berupa ilustrasi ilmiah, organ, diagram mekanika, mikroskop, atau skema eksperimen.
              </p>
            </div>
          </div>

          {config.sertakanGambar && (
            <div className="flex items-center gap-2 pl-7 sm:pl-0">
              <span className="text-xs font-semibold text-emerald-900 whitespace-nowrap">
                Jumlah Soal Bergambar:
              </span>
              <input
                type="number"
                min={1}
                max={Math.min(totalQuestionsRequested, 20)}
                value={config.jumlahSoalBergambar}
                onChange={(e) =>
                  onChange({
                    ...config,
                    jumlahSoalBergambar: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-20 px-2.5 py-1 text-xs font-bold rounded-lg border border-emerald-300 bg-white text-emerald-900 text-center focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-emerald-800">butir</span>
            </div>
          )}
        </div>

        {/* ROW 5: LEVEL KOGNITIF (LOTS, MOTS, HOTS - DAPAT DIPILIH KETIGANYA) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Tingkat Kesulitan & Level Kognitif (Dapat Dipilih Ketiganya)
            </label>
            <span className="text-xs text-slate-500">
              Tingkat: Rendah, Sedang, Sulit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* LOTS */}
            <div
              onClick={() => toggleCognitiveLevel('LOTS')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.cognitiveLevelsDipilih.includes('LOTS')
                  ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-900">
                  LOTS (Rendah / C1-C2)
                </span>
                <input
                  type="checkbox"
                  checked={config.cognitiveLevelsDipilih.includes('LOTS')}
                  onChange={() => {}}
                  className="rounded text-blue-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-blue-800 mt-1">
                Mengingat & Mengetahui definisi, nama organ, besaran, dan rumus dasar IPA.
              </p>
            </div>

            {/* MOTS */}
            <div
              onClick={() => toggleCognitiveLevel('MOTS')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.cognitiveLevelsDipilih.includes('MOTS')
                  ? 'bg-amber-50/80 border-amber-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-900">
                  MOTS (Sedang / C3)
                </span>
                <input
                  type="checkbox"
                  checked={config.cognitiveLevelsDipilih.includes('MOTS')}
                  onChange={() => {}}
                  className="rounded text-amber-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                Mengaplikasikan prinsip sains, rumus hitungan fisika, dan klasifikasi terarah.
              </p>
            </div>

            {/* HOTS */}
            <div
              onClick={() => toggleCognitiveLevel('HOTS')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.cognitiveLevelsDipilih.includes('HOTS')
                  ? 'bg-rose-50/80 border-rose-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-rose-900">
                  HOTS (Sulit / C4-C6)
                </span>
                <input
                  type="checkbox"
                  checked={config.cognitiveLevelsDipilih.includes('HOTS')}
                  onChange={() => {}}
                  className="rounded text-rose-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-rose-800 mt-1">
                Menganalisis data percobaan, evaluasi fenomena, pemecahan masalah kritis dan sintesis.
              </p>
            </div>
          </div>
        </div>

        {/* ROW 6: PENGALAMAN BELAJAR (MEMAHAMI, MENGAPLIKASI, MEREFLEKSI - DAPAT DIPILIH KETIGANYA) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Target Pengalaman Belajar (Dapat Dipilih Ketiganya)
            </label>
            <span className="text-xs text-purple-700 font-medium">
              Standar Capaian Pembelajaran Kurikulum Merdeka
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Memahami */}
            <div
              onClick={() => toggleLearningExperience('Memahami')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.learningExperiencesDipilih.includes('Memahami')
                  ? 'bg-sky-50/90 border-sky-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-sky-900">
                  1. Memahami
                </span>
                <input
                  type="checkbox"
                  checked={config.learningExperiencesDipilih.includes('Memahami')}
                  onChange={() => {}}
                  className="rounded text-sky-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-sky-800 mt-1">
                <strong>Menguji Pemahaman Dasar:</strong> Mampu mengenali konsep ilmiah, struktur materi, fakta sains, dan terminologi baku.
              </p>
            </div>

            {/* Mengaplikasi */}
            <div
              onClick={() => toggleLearningExperience('Mengaplikasi')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.learningExperiencesDipilih.includes('Mengaplikasi')
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900">
                  2. Mengaplikasi
                </span>
                <input
                  type="checkbox"
                  checked={config.learningExperiencesDipilih.includes('Mengaplikasi')}
                  onChange={() => {}}
                  className="rounded text-emerald-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                <strong>Aplikasi dalam Konteks:</strong> Menerapkan konsep sains untuk memecahkan kasus riil, perhitungan fisis, atau prosedur lab.
              </p>
            </div>

            {/* Merefleksi */}
            <div
              onClick={() => toggleLearningExperience('Merefleksi')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                config.learningExperiencesDipilih.includes('Merefleksi')
                  ? 'bg-purple-50/90 border-purple-400 shadow-2xs'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-900">
                  3. Merefleksi
                </span>
                <input
                  type="checkbox"
                  checked={config.learningExperiencesDipilih.includes('Merefleksi')}
                  onChange={() => {}}
                  className="rounded text-purple-600 pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-purple-800 mt-1">
                <strong>Refleksi Kritis:</strong> Menganalisis dampak sains/teknologi terhadap lingkungan, isu keberlanjutan, dan pola hidup sehat.
              </p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            Hasil otomatis meliputi: <strong className="text-slate-800">Naskah Soal, Kisi-Kisi, Kunci Jawaban, Kartu Soal, Norma Penilaian, & Tabel Nilai Skor 100</strong>.
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating || totalQuestionsRequested === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyusun Paket Soal IPA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Buat Paket Soal Asesmen Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
