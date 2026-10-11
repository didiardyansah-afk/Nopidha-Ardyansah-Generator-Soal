import React, { useState } from 'react';
import { X, Check, Trash2, Plus, Sparkles, Layers, Image as ImageIcon, Upload } from 'lucide-react';
import { QuestionItem, QuestionType, CognitiveLevel, LearningExperience, DifficultyLevel } from '../types';
import { SCIENTIFIC_SVGS } from '../data/curriculumData';

interface EditQuestionModalProps {
  question: QuestionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: QuestionItem) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !question) return null;

  const [formData, setFormData] = useState<QuestionItem>({ ...question });

  const handleOptionChange = (idx: number, val: string) => {
    const nextPilihan = [...(formData.pilihan || [])];
    nextPilihan[idx] = val;
    setFormData({ ...formData, pilihan: nextPilihan });
  };

  const handleAddOption = () => {
    const nextPilihan = [...(formData.pilihan || []), `Pilihan Baru`];
    setFormData({ ...formData, pilihan: nextPilihan });
  };

  const handleRemoveOption = (idx: number) => {
    const nextPilihan = (formData.pilihan || []).filter((_, i) => i !== idx);
    setFormData({ ...formData, pilihan: nextPilihan });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          gambarUrl: reader.result as string,
          gambarSvg: undefined,
          gambarDeskripsi: formData.gambarDeskripsi || file.name.replace(/\.[^/.]+$/, ''),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetSvg = (key: string) => {
    const svgMap: Record<string, { svg: string; desc: string }> = {
      selTumbuhan: {
        svg: SCIENTIFIC_SVGS.selTumbuhan,
        desc: 'Struktur mikroskopis sel tumbuhan dengan organel dinding sel (X), vakuola, kloroplas, dan nukleus.',
      },
      mikroskop: {
        svg: SCIENTIFIC_SVGS.mikroskop,
        desc: 'Komponen mikroskop optik laboratorium: Lensa okuler (A), Lensa objektif (B), Meja preparat (C), Makrometer (D).',
      },
      tuasPengungkit: {
        svg: SCIENTIFIC_SVGS.tuasPengungkit,
        desc: 'Skema pesawat sederhana tuas jenis 1: Beban W = 600 N, lengan beban lb = 50 cm, lengan kuasa lk = 150 cm.',
      },
      rangkaianListrik: {
        svg: SCIENTIFIC_SVGS.rangkaianListrik,
        desc: 'Skema rangkaian listrik tertutup seri dua hambatan R1 = 4 Ω dan R2 = 2 Ω dengan tegangan V = 12 Volt.',
      },
      hukumArchimedes: {
        svg: SCIENTIFIC_SVGS.hukumArchimedes,
        desc: 'Bejana zat cair berisi benda A (terapung), benda B (melayang), dan benda C (tenggelam di dasar bejana).',
      },
      sistemPencernaan: {
        svg: SCIENTIFIC_SVGS.sistemPencernaan,
        desc: 'Anatomi organ pencernaan manusia: Esofagus, Lambung (X), Hati, Usus Halus, dan Usus Besar.',
      },
      fotosintesisIngenhousz: {
        svg: SCIENTIFIC_SVGS.fotosintesisIngenhousz,
        desc: 'Eksperimen fotosintesis Ingenhousz tanaman Hydrilla membuktikan pelepasan gas oksigen (O2) di bawah sinar.',
      },
    };

    if (svgMap[key]) {
      setFormData({
        ...formData,
        gambarSvg: svgMap[key].svg,
        gambarUrl: undefined,
        gambarDeskripsi: svgMap[key].desc,
      });
    }
  };

  const handleClearImage = () => {
    setFormData({
      ...formData,
      gambarSvg: undefined,
      gambarUrl: undefined,
      gambarDeskripsi: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Edit Butir Soal Nomor {formData.nomor}
              </h2>
              <p className="text-xs text-indigo-200">
                Sesuaikan pertanyaan, opsi, indikator kisi-kisi, kunci jawaban, dan pembahasan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Bentuk Soal
              </label>
              <select
                value={formData.bentukSoal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bentukSoal: e.target.value as QuestionType,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
              >
                <option value="pilihan_ganda">Pilihan Ganda</option>
                <option value="pilihan_ganda_kompleks">Pilihan Ganda Kompleks</option>
                <option value="menjodohkan">Menjodohkan</option>
                <option value="benar_salah">Benar–Salah</option>
                <option value="isian_singkat">Isian Singkat</option>
                <option value="uraian">Uraian</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Level Kognitif
              </label>
              <select
                value={formData.cognitiveLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cognitiveLevel: e.target.value as CognitiveLevel,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
              >
                <option value="LOTS">LOTS (C1-C2 Rendah)</option>
                <option value="MOTS">MOTS (C3 Sedang)</option>
                <option value="HOTS">HOTS (C4-C6 Sulit)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Pengalaman Belajar
              </label>
              <select
                value={formData.learningExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    learningExperience: e.target.value as LearningExperience,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
              >
                <option value="Memahami">Memahami (Dasar)</option>
                <option value="Mengaplikasi">Mengaplikasi (Konteks)</option>
                <option value="Merefleksi">Merefleksi (Kritis)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Bobot Skor (Poin)
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={formData.bobotSkor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bobotSkor: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 text-center"
              />
            </div>
          </div>

          {/* Materi & Indikator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Materi Pokok
              </label>
              <input
                type="text"
                value={formData.materi}
                onChange={(e) => setFormData({ ...formData, materi: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Indikator Soal
              </label>
              <input
                type="text"
                value={formData.indikatorSoal}
                onChange={(e) => setFormData({ ...formData, indikatorSoal: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
                required
              />
            </div>
          </div>

          {/* Stimulus */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Stimulus (Teks Pengantar / Konteks Sains)
            </label>
            <textarea
              rows={2}
              value={formData.stimulus || ''}
              onChange={(e) => setFormData({ ...formData, stimulus: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 leading-relaxed font-sans"
              placeholder="Contoh: Perhatikan hasil percobaan laju fotosintesis tanaman Hydrilla berikut..."
            />
          </div>

          {/* Ilustrasi / Diagram Ilmiah Soal */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>Gambar / Diagram Stimulus Soal</span>
              </label>
              {(formData.gambarSvg || formData.gambarUrl) && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Gambar
                </button>
              )}
            </div>

            {/* Current Image / SVG Preview */}
            {(formData.gambarUrl || formData.gambarSvg) ? (
              <div className="p-2.5 bg-white rounded-lg border border-slate-300 max-w-md mx-auto text-center">
                {formData.gambarUrl ? (
                  <img
                    src={formData.gambarUrl}
                    alt="Pratinjau Diagram"
                    className="max-h-48 mx-auto object-contain rounded"
                  />
                ) : formData.gambarSvg ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: formData.gambarSvg }}
                    className="overflow-hidden flex items-center justify-center max-h-48"
                  />
                ) : null}
                <div className="mt-2">
                  <input
                    type="text"
                    value={formData.gambarDeskripsi || ''}
                    onChange={(e) => setFormData({ ...formData, gambarDeskripsi: e.target.value })}
                    placeholder="Keterangan gambar (misal: Gambar: Penampang melintang batang dikotil)"
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 text-slate-700 italic"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Soal ini saat ini berupa teks saja (tidak memiliki diagram). Anda dapat menyematkan diagram sains dari bank kurikulum atau mengunggah gambar sendiri.
              </p>
            )}

            {/* Actions: Upload or Select Preset */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200">
              <div className="relative">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold cursor-pointer border border-indigo-200 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah File Gambar (PNG/JPG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">atau</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) handleSelectPresetSvg(e.target.value);
                  }}
                  defaultValue=""
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700"
                >
                  <option value="" disabled>-- Pilih Diagram Sains SMP Siap Pakai --</option>
                  <option value="selTumbuhan">Sel Tumbuhan (Organel & Dinding Sel)</option>
                  <option value="mikroskop">Mikroskop Optik & Komponennya</option>
                  <option value="tuasPengungkit">Tuas / Pengungkit Pesawat Sederhana</option>
                  <option value="rangkaianListrik">Rangkaian Listrik Seri (Hukum Ohm)</option>
                  <option value="hukumArchimedes">Hukum Archimedes & Bejana Fluida</option>
                  <option value="sistemPencernaan">Sistem Organ Pencernaan Manusia</option>
                  <option value="fotosintesisIngenhousz">Percobaan Fotosintesis Ingenhousz</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pertanyaan */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Rumusan Butir Pertanyaan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.pertanyaan}
              onChange={(e) => setFormData({ ...formData, pertanyaan: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 leading-relaxed font-sans font-medium"
              required
            />
          </div>

          {/* Opsi Jawaban untuk Pilihan Ganda */}
          {formData.bentukSoal === 'pilihan_ganda' && (
            <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Pilihan Jawaban (A, B, C, D)
                </label>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Opsi
                </button>
              </div>

              {(formData.pilihan || []).map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 w-6 text-center">
                    {String.fromCharCode(65 + oIdx)}.
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white"
                  />
                  {(formData.pilihan?.length || 0) > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(oIdx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Kunci Jawaban */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Kunci Jawaban Resmi <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.kunciJawaban}
              onChange={(e) => setFormData({ ...formData, kunciJawaban: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-emerald-800"
              required
            />
          </div>

          {/* Pembahasan Ilmiah */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Pembahasan Ilmiah & Alasan Saintifik <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.pembahasan}
              onChange={(e) => setFormData({ ...formData, pembahasan: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 leading-relaxed font-sans text-slate-800"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
