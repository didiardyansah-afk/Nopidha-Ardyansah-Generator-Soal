import React from 'react';
import { SchoolIdentity, QuestionItem } from '../types';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface KunciJawabanViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
}

export const KunciJawabanView: React.FC<KunciJawabanViewProps> = ({
  schoolInfo,
  questions,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-slate-900 mb-6 font-serif">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
          {schoolInfo.pemerintahDaerah} • {schoolInfo.dinasPendidikan}
        </h3>
        <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 mt-0.5">
          KUNCI JAWABAN & PEMBAHASAN ASESMEN IPA SMP
        </h2>
        <h3 className="text-sm sm:text-base font-bold uppercase text-indigo-900">
          {schoolInfo.namaSekolah} • KELAS {schoolInfo.kelas} • SEMESTER {schoolInfo.semester.toUpperCase()}
        </h3>
        <p className="text-xs text-slate-600 mt-1 italic font-sans">
          Mata Pelajaran: {schoolInfo.mataPelajaran} • Tahun Pelajaran: {schoolInfo.tahunPelajaran}
        </p>
      </div>

      {/* Quick Summary Grid */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <h4 className="font-bold text-slate-900 mb-2">Ringkasan Kunci Jawaban Singkat:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between"
            >
              <span className="font-bold text-slate-700">No. {idx + 1}</span>
              <span className="font-extrabold text-indigo-600 truncate ml-2">
                {q.kunciJawaban.length > 15 ? q.kunciJawaban.slice(0, 15) + '...' : q.kunciJawaban}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Question Keys & Scientific Solutions */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
          Kunci Jawaban, Pembahasan Ilmiah & Rubrik Penskoran:
        </h4>

        {questions.map((q, idx) => (
          <div
            key={q.id || idx}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors space-y-2.5"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-sm text-slate-900">
                  {q.materi}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium capitalize">
                  {q.bentukSoal.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  {q.cognitiveLevel}
                </span>
                <span className="text-slate-500 font-medium">
                  Bobot: {q.bobotSkor} Poin
                </span>
              </div>
            </div>

            {/* Stimulus & Prompt snippet */}
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-700">Soal: </span>
              {q.pertanyaan}
            </div>

            {/* Kunci Jawaban Resmi */}
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  KUNCI JAWABAN RESMI:
                </span>
                <span className="text-sm font-bold text-emerald-800 whitespace-pre-line">
                  {q.kunciJawaban}
                </span>
              </div>
            </div>

            {/* Pembahasan Ilmiah */}
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                PEMBAHASAN SAINTIFIK & ALASAN ILMIAH:
              </span>
              <p className="whitespace-pre-line text-slate-700">
                {q.pembahasan}
              </p>
            </div>

            {/* Rubrik Penskoran Detail */}
            {q.rubrikPenskoran && q.rubrikPenskoran.length > 0 && (
              <div className="text-xs text-slate-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/80">
                <span className="font-bold text-amber-950 block mb-1">
                  Pedoman Penskoran:
                </span>
                <ul className="list-disc list-inside space-y-0.5">
                  {q.rubrikPenskoran.map((rb, rIdx) => (
                    <li key={rIdx}>{rb}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Signature Section */}
      <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 text-xs sm:text-sm font-sans">
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
            <p className="font-bold text-slate-900">Guru Pengampu IPA</p>
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
