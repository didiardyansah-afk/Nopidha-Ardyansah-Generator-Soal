import React from 'react';
import { SchoolIdentity, QuestionItem, QuestionType } from '../types';
import { Award, Calculator, CheckCircle2 } from 'lucide-react';

interface NormaPenilaianViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
}

export const NormaPenilaianView: React.FC<NormaPenilaianViewProps> = ({
  schoolInfo,
  questions,
}) => {
  // Aggregate total raw score per question type
  const typeStats = questions.reduce((acc, q) => {
    if (!acc[q.bentukSoal]) {
      acc[q.bentukSoal] = { count: 0, totalScore: 0 };
    }
    acc[q.bentukSoal].count += 1;
    acc[q.bentukSoal].totalScore += q.bobotSkor;
    return acc;
  }, {} as Record<QuestionType, { count: number; totalScore: number }>);

  const totalMaxRawScore = questions.reduce((sum, q) => sum + q.bobotSkor, 0);

  const typeLabels: Record<QuestionType, string> = {
    pilihan_ganda: 'Pilihan Ganda',
    pilihan_ganda_kompleks: 'Pilihan Ganda Kompleks',
    menjodohkan: 'Menjodohkan',
    benar_salah: 'Benar–Salah',
    isian_singkat: 'Isian Singkat',
    uraian: 'Uraian',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* Document Header */}
      <div className="text-center pb-4 border-b-2 border-slate-900 mb-6 font-serif">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
          {schoolInfo.pemerintahDaerah} • {schoolInfo.dinasPendidikan}
        </h3>
        <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 mt-0.5">
          NORMA PENILAIAN & PEDOMAN PENSKORAN ASESMEN IPA
        </h2>
        <h3 className="text-sm sm:text-base font-bold uppercase text-indigo-900">
          {schoolInfo.namaSekolah} • KELAS {schoolInfo.kelas} • SEMESTER {schoolInfo.semester.toUpperCase()}
        </h3>
        <p className="text-xs text-slate-600 mt-1 italic font-sans">
          Mata Pelajaran: {schoolInfo.mataPelajaran} • Standar Konversi Skor Akhir: 100
        </p>
      </div>

      {/* BAB I: KETENTUAN PENSKORAN PER BENTUK SOAL */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-300 pb-1.5 uppercase tracking-wide">
          <Award className="w-4 h-4 text-indigo-600" />
          I. Tabel Rekapitulasi Bentuk Soal dan Bobot Skor Mentah
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-xs text-left">
            <thead>
              <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                <th className="border border-slate-300 p-2.5 w-12">No</th>
                <th className="border border-slate-300 p-2.5">Bentuk Soal</th>
                <th className="border border-slate-300 p-2.5 w-24">Jumlah Butir</th>
                <th className="border border-slate-300 p-2.5 w-28">Skor / Butir</th>
                <th className="border border-slate-300 p-2.5 w-32">Total Skor Maksimal</th>
                <th className="border border-slate-300 p-2.5 w-28">Persentase Kontribusi</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(typeStats) as QuestionType[]).map((type, idx) => {
                const stat = typeStats[type];
                const percentage =
                  totalMaxRawScore > 0
                    ? ((stat.totalScore / totalMaxRawScore) * 100).toFixed(1)
                    : '0';
                return (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-2.5 text-center font-bold">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-300 p-2.5 font-semibold text-slate-800">
                      {typeLabels[type]}
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center font-medium">
                      {stat.count} Butir
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center text-slate-700">
                      {(stat.totalScore / stat.count).toFixed(1)} poin
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center font-bold text-indigo-900">
                      {stat.totalScore} Poin
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center font-medium text-slate-700">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-indigo-50/70 font-bold text-slate-900">
                <td colSpan={2} className="border border-slate-300 p-2.5 text-center">
                  TOTAL KESELURUHAN
                </td>
                <td className="border border-slate-300 p-2.5 text-center">
                  {questions.length} Butir
                </td>
                <td className="border border-slate-300 p-2.5 text-center">-</td>
                <td className="border border-slate-300 p-2.5 text-center text-indigo-950 font-black text-sm">
                  {totalMaxRawScore} Poin
                </td>
                <td className="border border-slate-300 p-2.5 text-center">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BAB II: RUMUS PERHITUNGAN NILAI AKHIR (SKOR AKHIR 100) */}
      <div className="space-y-3 mb-8 p-4 bg-indigo-50/60 rounded-xl border border-indigo-200 text-xs sm:text-sm">
        <h3 className="font-bold text-indigo-950 uppercase flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-700" />
          II. Rumus Standar Penilaian Skor Akhir 100
        </h3>
        <p className="text-slate-800 leading-relaxed">
          Nilai Akhir (NA) siswa pada asesmen IPA SMP dihitung secara proporsional menggunakan formula baku konversi nilai berikut:
        </p>
        <div className="p-4 bg-white rounded-lg border border-indigo-300 font-mono text-center text-sm sm:text-base font-bold text-indigo-900 shadow-2xs">
          Nilai Akhir (Skala 0 - 100) = ( Total Skor Mentah Siswa ÷ {totalMaxRawScore} ) × 100
        </div>
        <p className="text-[11px] text-slate-600 italic">
          * Catatan: Jika seorang siswa memperoleh total skor mentah {totalMaxRawScore}, maka nilai akhir otomatis setara dengan nilai sempurna 100.
        </p>
      </div>

      {/* BAB III: INTERVAL PREDIKAT & KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-300 pb-1.5">
          III. Kategori Interval Nilai & Kriteria Ketuntasan (KKTP IPA SMP)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50">
            <span className="font-extrabold text-emerald-900 text-sm block">Predikat A</span>
            <span className="font-bold text-emerald-800">Rentang 90 - 100</span>
            <p className="text-[11px] text-emerald-950 mt-1">
              <strong>Sangat Mahir:</strong> Menguasai seluruh konsep IPA dengan sangat mendalam dan mampu merefleksikan aplikasi sains secara analitis.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-blue-300 bg-blue-50">
            <span className="font-extrabold text-blue-900 text-sm block">Predikat B</span>
            <span className="font-bold text-blue-800">Rentang 80 - 89</span>
            <p className="text-[11px] text-blue-950 mt-1">
              <strong>Mahir:</strong> Menguasai konsep dasar dan terampil dalam mengaplikasikan prinsip IPA pada pemecahan masalah.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-amber-300 bg-amber-50">
            <span className="font-extrabold text-amber-900 text-sm block">Predikat C</span>
            <span className="font-bold text-amber-800">Rentang 70 - 79</span>
            <p className="text-[11px] text-amber-950 mt-1">
              <strong>Cukup (Tuntas):</strong> Telah mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP minimal), perlu penguatan latihan soal HOTS.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-rose-300 bg-rose-50">
            <span className="font-extrabold text-rose-900 text-sm block">Predikat D</span>
            <span className="font-bold text-rose-800">Rentang &lt; 70</span>
            <p className="text-[11px] text-rose-950 mt-1">
              <strong>Perlu Bimbingan:</strong> Belum mencapai KKTP, wajib mengikuti program remedial terstruktur pada indikator materi terkait.
            </p>
          </div>
        </div>
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
