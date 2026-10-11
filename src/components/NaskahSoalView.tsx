import React, { useState } from 'react';
import { SchoolIdentity, QuestionItem, QuestionType } from '../types';
import { KopSurat } from './KopSurat';
import { Edit3, Trash2, Plus, Sparkles, Image as ImageIcon, Eye, Edit, RotateCcw } from 'lucide-react';

interface NaskahSoalViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
  onEditQuestion: (q: QuestionItem) => void;
  onDeleteQuestion: (id: string) => void;
  onAddNewQuestion: () => void;
  onResetQuestions?: () => void;
}

export const NaskahSoalView: React.FC<NaskahSoalViewProps> = ({
  schoolInfo,
  questions,
  onEditQuestion,
  onDeleteQuestion,
  onAddNewQuestion,
  onResetQuestions,
}) => {
  // Mode toggle: Clean Student Preview vs Teacher Admin Editor
  const [isCleanPreview, setIsCleanPreview] = useState(false);

  // Summary of question types
  const typeSet = new Set(questions.map((q) => q.bentukSoal));
  const typeMap: Record<QuestionType, string> = {
    pilihan_ganda: 'Pilihan Ganda',
    pilihan_ganda_kompleks: 'Pilihan Ganda Kompleks',
    menjodohkan: 'Menjodohkan',
    benar_salah: 'Benar–Salah',
    isian_singkat: 'Isian Singkat',
    uraian: 'Uraian',
  };
  const summaryStr = Array.from(typeSet)
    .map((t) => typeMap[t])
    .join(', ');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* Official Kop Surat */}
      <KopSurat
        schoolInfo={schoolInfo}
        bentukSoalSummary={summaryStr}
        showPetunjukUmum={true}
      />

      {/* View Mode Toggle & Admin Bar */}
      <div className="no-print my-4 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-900">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold">
            Naskah Soal Siswa ({questions.length} Butir Soal Terdaftar)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Clean Preview vs Edit Mode */}
          <button
            onClick={() => setIsCleanPreview(!isCleanPreview)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              isCleanPreview
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Sembunyikan tombol edit dan bilah admin untuk tampilan naskah bersih siap cetak"
          >
            {isCleanPreview ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Mode: Pratinjau Naskah Bersih (Tanpa Tombol)</span>
              </>
            ) : (
              <>
                <Edit className="w-3.5 h-3.5" />
                <span>Mode: Editor Guru (Tombol Tampil)</span>
              </>
            )}
          </button>

          {!isCleanPreview && (
            <>
              <button
                onClick={onAddNewQuestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Butir Soal</span>
              </button>

              {onResetQuestions && (
                <button
                  onClick={onResetQuestions}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold transition-colors shadow-2xs cursor-pointer"
                  title="Reset atau kembalikan ke paket soal preset awal"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  <span>Reset Soal</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* List of Questions */}
      <div className="space-y-6 pt-2">
        {questions.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl my-4">
            <RotateCcw className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-700 mb-1">
              Naskah Soal Masih Kosong
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Belum ada butir soal terdaftar. Anda dapat memulihkan bank soal standar awal atau membuat soal baru.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {onResetQuestions && (
                <button
                  onClick={onResetQuestions}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Pulihkan Soal Preset Awal</span>
                </button>
              )}
              <button
                onClick={onAddNewQuestion}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Soal Manual</span>
              </button>
            </div>
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={q.id || idx}
              data-question-id={q.id}
              className="group relative pb-6 border-b border-slate-200 last:border-b-0 break-inside-avoid page-break-inside-avoid"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-slate-900">
                    {idx + 1}.
                  </span>

                  {/* Metadata pills only shown in teacher editor mode */}
                  {!isCleanPreview && (
                    <>
                      <span className="no-print text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {typeMap[q.bentukSoal] || q.bentukSoal}
                      </span>
                      <span
                        className={`no-print text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          q.cognitiveLevel === 'HOTS'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : q.cognitiveLevel === 'MOTS'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {q.cognitiveLevel}
                      </span>
                      <span className="no-print text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        {q.learningExperience}
                      </span>
                      {(q.hasDiagram || q.gambarSvg || q.gambarUrl) && (
                        <span className="no-print text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-emerald-700" />
                          {q.isVisualAnalysis ? 'Analisis Visual' : 'Diagram'}
                          {q.visualTargetPart ? `: ${q.visualTargetPart}` : ''}
                        </span>
                      )}
                      <span className="no-print text-[11px] text-slate-500">
                        Bobot: {q.bobotSkor} poin
                      </span>
                    </>
                  )}
                </div>

                {/* Edit & Delete Actions (Hidden in clean preview and print) */}
                {!isCleanPreview && (
                  <div className="no-print flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditQuestion(q)}
                      className="p-1.5 rounded-md hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Edit butir soal ini"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Hapus butir soal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Stimulus / Context */}
              {q.stimulus && (
                <div className="ml-6 mb-2.5 p-2.5 bg-slate-50 rounded-lg border-l-4 border-indigo-400 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
                  {q.stimulus}
                </div>
              )}

              {/* Scientific Diagram / Image */}
              {q.gambarUrl ? (
                <div className="ml-6 my-3 p-2.5 bg-white rounded-xl border border-slate-200 max-w-lg shadow-2xs">
                  <img
                    src={q.gambarUrl}
                    alt={q.gambarDeskripsi || 'Diagram Soal'}
                    className="max-h-56 mx-auto object-contain rounded"
                  />
                  {q.gambarDeskripsi && (
                    <p className="text-[11px] text-slate-500 text-center mt-1.5 italic">
                      {q.gambarDeskripsi}
                    </p>
                  )}
                </div>
              ) : q.gambarSvg ? (
                <div className="ml-6 my-3 p-2.5 bg-white rounded-xl border border-slate-200 max-w-lg shadow-2xs">
                  <div
                    dangerouslySetInnerHTML={{ __html: q.gambarSvg }}
                    className="overflow-hidden flex items-center justify-center"
                  />
                  {q.gambarDeskripsi && (
                    <p className="text-[11px] text-slate-500 text-center mt-1.5 italic">
                      {q.gambarDeskripsi}
                    </p>
                  )}
                </div>
              ) : q.gambarDeskripsi ? (
                <div className="ml-6 my-2 p-2 bg-slate-50 rounded border border-dashed border-slate-300 text-xs text-slate-600 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>[Ilustrasi Diagram]: {q.gambarDeskripsi}</span>
                </div>
              ) : null}

              {/* Question Text */}
              <div className="ml-6 text-sm sm:text-base font-normal text-slate-900 leading-relaxed whitespace-pre-line mb-3">
                {q.pertanyaan}
              </div>

              {/* SPECIFIC RENDERING BASED ON QUESTION TYPE */}

              {/* 1. Pilihan Ganda (A, B, C, D) - Menurun ke bawah */}
              {q.bentukSoal === 'pilihan_ganda' && q.pilihan && (
                <div className="ml-6 flex flex-col space-y-2 text-xs sm:text-sm text-slate-900">
                  {q.pilihan.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className="flex items-start gap-2.5 py-1.5 px-2.5 rounded-lg bg-slate-50/80 border border-slate-200"
                    >
                      <span className="font-bold text-slate-900 w-5 flex-shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1 leading-snug">
                        {opt.replace(/^[A-D]\.\s*/, '')}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. Pilihan Ganda Kompleks (Multi-check) */}
              {q.bentukSoal === 'pilihan_ganda_kompleks' && q.pilihanKompleks && (
                <div className="ml-6 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  <p className="text-[11px] text-slate-500 italic mb-1">
                    Beri tanda centang (✓) pada kotak di depan setiap pernyataan yang benar:
                  </p>
                  {q.pilihanKompleks.map((item, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-3"
                    >
                      <div className="w-4 h-4 mt-0.5 border-2 border-slate-400 rounded flex-shrink-0 bg-white"></div>
                      <span className="leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Menjodohkan */}
              {q.bentukSoal === 'menjodohkan' && q.menjodohkanPairs && (
                <div className="ml-6 my-2 text-xs sm:text-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 text-left">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2 font-bold w-1/2">
                            Kolom A (Konsep / Instrumen)
                          </th>
                          <th className="border border-slate-300 p-2 font-bold w-1/2">
                            Kolom B (Karakteristik / Fungsi)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.menjodohkanPairs.map((pair, pIdx) => (
                          <tr key={pIdx} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-2 font-medium">
                              {pair.left}
                            </td>
                            <td className="border border-slate-300 p-2 text-slate-700">
                              {pair.right}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. Benar - Salah */}
              {q.bentukSoal === 'benar_salah' && q.pernyataanBenarSalah && (
                <div className="ml-6 my-2 text-xs sm:text-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 text-left">
                      <thead>
                        <tr className="bg-slate-100 text-center">
                          <th className="border border-slate-300 p-2 font-bold text-left">
                            Pernyataan Ilmiah
                          </th>
                          <th className="border border-slate-300 p-2 font-bold w-20">
                            BENAR
                          </th>
                          <th className="border border-slate-300 p-2 font-bold w-20">
                            SALAH
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.pernyataanBenarSalah.map((bs, bsIdx) => (
                          <tr key={bsIdx} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-2">
                              {bs.statement}
                            </td>
                            <td className="border border-slate-300 p-2 text-center">
                              <span className="inline-block w-4 h-4 border border-slate-400 rounded"></span>
                            </td>
                            <td className="border border-slate-300 p-2 text-center">
                              <span className="inline-block w-4 h-4 border border-slate-400 rounded"></span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. Isian Singkat */}
              {q.bentukSoal === 'isian_singkat' && (
                <div className="ml-6 mt-3 text-xs sm:text-sm font-sans text-slate-700">
                  <span className="font-semibold">Jawaban:</span>{' '}
                  <span className="border-b border-dashed border-slate-500 inline-block w-64 h-5"></span>
                </div>
              )}

              {/* 6. Uraian */}
              {q.bentukSoal === 'uraian' && (
                <div className="ml-6 mt-3 p-3 bg-slate-50/50 rounded-lg border border-dashed border-slate-300 text-xs sm:text-sm text-slate-500 italic">
                  [Lembar Jawaban Uraian Siswa: Tuliskan jawaban Anda beserta langkah perhitungan/penjelasan ilmiah secara terstruktur]
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Signature & Validation Footer for Print */}
      <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 text-xs sm:text-sm font-sans break-inside-avoid page-break-inside-avoid">
        <div className="text-center space-y-16">
          <div>
            <p className="text-slate-700">Mengetahui,</p>
            <p className="font-bold text-slate-900">Kepala {schoolInfo.namaSekolah}</p>
          </div>
          <div>
            <p className="font-bold underline text-slate-900">
              {schoolInfo.namaKepalaSekolah}
            </p>
            <p className="text-slate-700">
              NIP. {schoolInfo.nipKepalaSekolah || '.....................................'}
            </p>
          </div>
        </div>

        <div className="text-center space-y-16">
          <div>
            <p className="text-slate-700">
              Banyumas, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="font-bold text-slate-900">Guru Pengampu Mata Pelajaran</p>
          </div>
          <div>
            <p className="font-bold underline text-slate-900">
              {schoolInfo.namaGuru || '.....................................'}
            </p>
            <p className="text-slate-700">
              NIP. {schoolInfo.nipGuru || '.....................................'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
