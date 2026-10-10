import React, { useState } from 'react';
import { SchoolIdentity, QuestionItem } from '../types';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface KartuSoalViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
}

export const KartuSoalView: React.FC<KartuSoalViewProps> = ({
  schoolInfo,
  questions,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewAll, setViewAll] = useState<boolean>(true);

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-400">
        Belum ada kartu soal yang dibuat.
      </div>
    );
  }

  const renderSingleCard = (q: QuestionItem, index: number) => {
    return (
      <div
        key={q.id || index}
        className="bg-white rounded-xl border-2 border-slate-700 p-6 text-slate-900 font-sans break-inside-avoid page-break-after mb-8"
      >
        {/* Kartu Soal Header */}
        <div className="text-center pb-3 border-b-2 border-slate-800 font-serif">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            {schoolInfo.pemerintahDaerah} • {schoolInfo.dinasPendidikan}
          </h3>
          <h2 className="text-base font-black uppercase text-slate-900">
            KARTU SOAL ASESMEN SUMATIF
          </h2>
          <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-900">
            {schoolInfo.namaSekolah} • TAHUN PELAJARAN {schoolInfo.tahunPelajaran}
          </h3>
        </div>

        {/* Identity Table */}
        <div className="grid grid-cols-2 text-xs border-b border-slate-300 py-2.5 gap-x-4 gap-y-1">
          <div>
            <span className="font-semibold text-slate-600">Satuan Pendidikan:</span>{' '}
            <span className="font-bold">{schoolInfo.namaSekolah}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Kelas / Semester:</span>{' '}
            <span>Kelas {schoolInfo.kelas} / {schoolInfo.semester}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Mata Pelajaran:</span>{' '}
            <span>{schoolInfo.mataPelajaran}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Bentuk Soal:</span>{' '}
            <span className="capitalize font-semibold text-indigo-800">
              {q.bentukSoal.replace('_', ' ')}
            </span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Buku Sumber:</span>{' '}
            <span>Buku Siswa IPA SMP Kelas {schoolInfo.kelas} Kemendikbudristek</span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Penyusun:</span>{' '}
            <span>{schoolInfo.namaGuru}</span>
          </div>
        </div>

        {/* Competency & Indicators Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs py-3 border-b border-slate-300">
          <div className="space-y-2">
            <div>
              <span className="font-bold text-slate-900 block">Capaian / Tujuan Pembelajaran (TP):</span>
              <p className="text-slate-700 leading-relaxed mt-0.5">{q.tujuanPembelajaran}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Materi Pokok:</span>
              <p className="text-slate-800 font-medium mt-0.5">{q.materi}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="font-bold text-slate-900 block">Indikator Soal:</span>
              <p className="text-slate-700 leading-relaxed mt-0.5">{q.indikatorSoal}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="p-1.5 rounded bg-slate-100 text-center">
                <span className="text-[10px] text-slate-500 block font-semibold">Nomor Soal</span>
                <span className="font-black text-indigo-700 text-sm">{index + 1}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-100 text-center">
                <span className="text-[10px] text-slate-500 block font-semibold">Level Kognitif</span>
                <span className="font-bold text-slate-800">{q.cognitiveLevel}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-100 text-center">
                <span className="text-[10px] text-slate-500 block font-semibold">Pengalaman</span>
                <span className="font-bold text-slate-800">{q.learningExperience}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rumusan Butir Soal */}
        <div className="py-3 text-xs sm:text-sm border-b border-slate-300">
          <span className="font-bold text-slate-900 block mb-1.5 uppercase text-xs tracking-wider">
            RUMUSAN BUTIR SOAL:
          </span>

          {q.stimulus && (
            <div className="p-2.5 rounded bg-slate-50 border-l-4 border-indigo-500 mb-2.5 text-xs text-slate-700 italic">
              {q.stimulus}
            </div>
          )}

          {q.gambarSvg && (
            <div className="my-2.5 p-2 bg-white rounded border border-slate-200 max-w-sm mx-auto">
              <div dangerouslySetInnerHTML={{ __html: q.gambarSvg }} />
            </div>
          )}

          <div className="font-medium text-slate-900 leading-relaxed whitespace-pre-line mb-2">
            {q.pertanyaan}
          </div>

          {/* Opsi jika PG (Menurun A, B, C, D) */}
          {q.bentukSoal === 'pilihan_ganda' && q.pilihan && (
            <div className="flex flex-col space-y-1.5 mt-2 text-xs">
              {q.pilihan.map((p, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 p-1.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-bold w-4 flex-shrink-0 text-slate-900">{String.fromCharCode(65 + pIdx)}.</span>
                  <span className="flex-1 text-slate-800">{p.replace(/^[A-D]\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kunci Jawaban & Pedoman Penskoran */}
        <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="font-bold text-emerald-950 block mb-1">KUNCI JAWABAN:</span>
            <p className="font-bold text-emerald-800 text-sm whitespace-pre-line">
              {q.kunciJawaban}
            </p>
            <p className="text-[11px] text-emerald-900/80 mt-1.5 italic">
              Pembahasan: {q.pembahasan}
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-950">PEDOMAN PENSKORAN:</span>
              <span className="font-bold text-amber-900">Skor Maks: {q.bobotSkor}</span>
            </div>
            {q.rubrikPenskoran && q.rubrikPenskoran.length > 0 ? (
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-900">
                {q.rubrikPenskoran.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-amber-900">
                Jawaban benar mendapat skor {q.bobotSkor}, salah atau tidak menjawab mendapat skor 0.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* View Switcher Toolbar (Hidden in Print) */}
      <div className="no-print mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-800">
            Kartu Soal Asesmen Standar BSNP / Kemdikbud ({questions.length} Kartu)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {viewAll ? 'Tampilkan Mode Per Butir' : 'Tampilkan Semua Sekaligus'}
          </button>

          {!viewAll && (
            <div className="flex items-center gap-1">
              <button
                disabled={activePageIndex === 0}
                onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
                className="p-1.5 rounded bg-white border border-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-bold text-indigo-900">
                Kartu {activePageIndex + 1} dari {questions.length}
              </span>
              <button
                disabled={activePageIndex === questions.length - 1}
                onClick={() =>
                  setActivePageIndex((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                className="p-1.5 rounded bg-white border border-slate-300 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render Cards */}
      {viewAll ? (
        questions.map((q, idx) => renderSingleCard(q, idx))
      ) : (
        renderSingleCard(questions[activePageIndex], activePageIndex)
      )}
    </div>
  );
};
