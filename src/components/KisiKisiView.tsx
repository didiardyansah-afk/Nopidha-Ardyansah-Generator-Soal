import React from 'react';
import { SchoolIdentity, QuestionItem } from '../types';

interface KisiKisiViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
}

export const KisiKisiView: React.FC<KisiKisiViewProps> = ({
  schoolInfo,
  questions,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* Document Header */}
      <div className="text-center pb-4 border-b-2 border-slate-900 mb-6 font-serif">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
          {schoolInfo.pemerintahDaerah} • {schoolInfo.dinasPendidikan}
        </h3>
        <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 mt-0.5">
          KISI-KISI PENULISAN SOAL ASESMEN SUMATIF
        </h2>
        <h3 className="text-sm sm:text-base font-bold uppercase text-indigo-900">
          MATA PELAJARAN ILMU PENGETAHUAN ALAM (IPA) SMP
        </h3>
        <p className="text-xs text-slate-600 mt-1 italic font-sans">
          Satuan Pendidikan: {schoolInfo.namaSekolah} • Tahun Pelajaran: {schoolInfo.tahunPelajaran} • Semester: {schoolInfo.semester}
        </p>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div>
          <p><span className="font-semibold text-slate-700">Fase / Kelas:</span> Fase D / Kelas {schoolInfo.kelas} SMP</p>
          <p><span className="font-semibold text-slate-700">Mata Pelajaran:</span> {schoolInfo.mataPelajaran}</p>
          <p><span className="font-semibold text-slate-700">Kurikulum:</span> Kurikulum Merdeka / Nasional</p>
        </div>
        <div>
          <p><span className="font-semibold text-slate-700">Alokasi Waktu:</span> {schoolInfo.alokasiWaktu || '90 Menit'}</p>
          <p><span className="font-semibold text-slate-700">Jumlah Soal:</span> {questions.length} Butir</p>
          <p><span className="font-semibold text-slate-700">Penyusun:</span> {schoolInfo.namaGuru}</p>
        </div>
      </div>

      {/* Official Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-400 text-xs text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold text-center">
              <th className="border border-slate-400 p-2 w-10">No</th>
              <th className="border border-slate-400 p-2 min-w-44">Tujuan Pembelajaran (TP)</th>
              <th className="border border-slate-400 p-2 min-w-36">Materi Pokok</th>
              <th className="border border-slate-400 p-2 w-16">Kelas / Smt</th>
              <th className="border border-slate-400 p-2 min-w-56">Indikator Soal</th>
              <th className="border border-slate-400 p-2 w-20">Level Kognitif</th>
              <th className="border border-slate-400 p-2 w-24">Pengalaman Belajar</th>
              <th className="border border-slate-400 p-2 w-28">Bentuk Soal</th>
              <th className="border border-slate-400 p-2 w-12">No. Soal</th>
              <th className="border border-slate-400 p-2 w-12">Bobot</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, idx) => (
              <tr key={q.id || idx} className="hover:bg-slate-50/80">
                <td className="border border-slate-400 p-2 text-center font-semibold">
                  {idx + 1}
                </td>
                <td className="border border-slate-400 p-2 leading-relaxed">
                  {q.tujuanPembelajaran}
                </td>
                <td className="border border-slate-400 p-2 font-medium">
                  {q.materi}
                </td>
                <td className="border border-slate-400 p-2 text-center whitespace-nowrap">
                  {schoolInfo.kelas} / {schoolInfo.semester === 'Ganjil' ? '1' : '2'}
                </td>
                <td className="border border-slate-400 p-2 leading-relaxed">
                  {q.indikatorSoal}
                </td>
                <td className="border border-slate-400 p-2 text-center font-bold">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                      q.cognitiveLevel === 'HOTS'
                        ? 'bg-rose-100 text-rose-800'
                        : q.cognitiveLevel === 'MOTS'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {q.cognitiveLevel}
                  </span>
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  <span className="font-semibold text-slate-800 block">
                    {q.learningExperience}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-2">
                    {q.learningExperience === 'Memahami'
                      ? 'Pemahaman Dasar'
                      : q.learningExperience === 'Mengaplikasi'
                      ? 'Aplikasi Konteks'
                      : 'Refleksi Kritis'}
                  </span>
                </td>
                <td className="border border-slate-400 p-2 capitalize text-center">
                  {q.bentukSoal.replace('_', ' ')}
                </td>
                <td className="border border-slate-400 p-2 text-center font-bold text-indigo-900">
                  {idx + 1}
                </td>
                <td className="border border-slate-400 p-2 text-center font-medium">
                  {q.bobotSkor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="mt-12 pt-6 grid grid-cols-2 text-xs sm:text-sm font-sans">
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
            <p className="font-bold text-slate-900">Guru Penyusun / Pengampu IPA</p>
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
