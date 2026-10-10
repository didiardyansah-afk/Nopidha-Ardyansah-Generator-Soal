import React from 'react';
import { SchoolIdentity } from '../types';

interface KopSuratProps {
  schoolInfo: SchoolIdentity;
  bentukSoalSummary?: string;
  showPetunjukUmum?: boolean;
}

export const KopSurat: React.FC<KopSuratProps> = ({
  schoolInfo,
  bentukSoalSummary,
  showPetunjukUmum = true,
}) => {
  return (
    <div className="w-full text-slate-900 mb-6 font-serif">
      {/* Official Header Table Layout */}
      <div className="flex items-center justify-between gap-4 pb-3">
        {/* Left Logo */}
        <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
          {schoolInfo.logoUrl ? (
            <img
              src={schoolInfo.logoUrl}
              alt="Logo Sekolah"
              className="max-h-20 max-w-20 object-contain"
            />
          ) : (
            /* Official Tut Wuri Handayani SVG Logo */
            <svg
              className="w-18 h-18 text-indigo-900"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#1e3a8a" stroke="#d97706" strokeWidth="4" />
              <path d="M50 16 L22 40 L34 84 L66 84 L78 40 Z" fill="#f59e0b" />
              <circle cx="50" cy="46" r="14" fill="#1e3a8a" />
              <path d="M50 36 L54 44 L62 44 L56 50 L58 58 L50 52 L42 58 L44 50 L38 44 L46 44 Z" fill="#fbbf24" />
              <text x="50" y="93" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                TUT WURI HANDAYANI
              </text>
            </svg>
          )}
        </div>

        {/* Center Text Header */}
        <div className="flex-1 text-center font-serif leading-tight">
          <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-700">
            {schoolInfo.pemerintahDaerah || 'PEMERINTAH KABUPATEN BANYUMAS'}
          </h4>
          <h3 className="text-sm sm:text-base font-bold tracking-wider uppercase text-slate-800">
            {schoolInfo.dinasPendidikan || 'DINAS PENDIDIKAN'}
          </h3>
          <h2 className="text-lg sm:text-2xl font-black tracking-wide uppercase text-slate-950 mt-0.5">
            {schoolInfo.namaSekolah || 'SMP NEGERI 2 GUMELAR'}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 italic font-sans max-w-xl mx-auto">
            {schoolInfo.alamatSekolah}
          </p>
        </div>

        {/* Right Badge / IPA Logo for symmetry */}
        <div className="w-20 h-20 flex-shrink-0 hidden sm:flex items-center justify-center">
          <svg className="w-16 h-16 text-emerald-800" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="#ecfdf5" stroke="#047857" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke="#059669" strokeWidth="2.5" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke="#059669" strokeWidth="2.5" transform="rotate(-30 50 50)" />
            <circle cx="50" cy="50" r="8" fill="#d97706" />
            <text x="50" y="86" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#047857" textAnchor="middle">
              IPA SMP
            </text>
          </svg>
        </div>
      </div>

      {/* Official Indonesian Government Double Border */}
      <div className="border-b-[3px] border-slate-900 w-full mb-[2px]"></div>
      <div className="border-b border-slate-800 w-full mb-4"></div>

      {/* Assessment Sub-header */}
      <div className="text-center my-3">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 underline underline-offset-4">
          {schoolInfo.jenisAsesmen || 'NASKAH SOAL ASESMEN SUMATIF IPA'}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
          TAHUN PELAJARAN {schoolInfo.tahunPelajaran} • SEMESTER {schoolInfo.semester.toUpperCase()}
        </p>
      </div>

      {/* Exam Meta Table */}
      <div className="bg-slate-50/80 border border-slate-300 rounded-lg p-3 text-xs sm:text-sm font-sans my-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        <div className="space-y-1">
          <div className="flex">
            <span className="w-32 font-semibold text-slate-700">Mata Pelajaran</span>
            <span className="font-bold text-slate-900">: {schoolInfo.mataPelajaran}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-slate-700">Kelas / Fase</span>
            <span className="text-slate-900">: Kelas {schoolInfo.kelas} (Fase D SMP)</span>
          </div>
          {bentukSoalSummary && (
            <div className="flex">
              <span className="w-32 font-semibold text-slate-700">Bentuk Soal</span>
              <span className="text-slate-900">: {bentukSoalSummary}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex">
            <span className="w-32 font-semibold text-slate-700">Alokasi Waktu</span>
            <span className="font-bold text-slate-900">: {schoolInfo.alokasiWaktu || '90 Menit'}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-slate-700">Guru Pengampu</span>
            <span className="text-slate-900">: {schoolInfo.namaGuru || '-'}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-slate-700">Hari / Tanggal</span>
            <span className="text-slate-900">: .......................................</span>
          </div>
        </div>
      </div>

      {/* General Instructions Box */}
      {showPetunjukUmum && (
        <div className="bg-slate-100/70 border border-slate-300/80 rounded p-2.5 my-3 text-[11px] sm:text-xs font-sans text-slate-800 leading-relaxed">
          <span className="font-bold underline">PETUNJUK UMUM:</span>
          <ol className="list-decimal list-inside mt-1 space-y-0.5 text-slate-700">
            <li>Berdoalah sebelum mengerjakan soal sesuai dengan agama dan keyakinan masing-masing.</li>
            <li>Tuliskan identitas Anda secara lengkap dan benar pada Lembar Jawaban yang telah disediakan.</li>
            <li>Periksa dan bacalah setiap butir soal dengan cermat dan teliti sebelum Anda menjawabnya.</li>
            <li>Laporkan kepada pengawas ujian apabila terdapat lembar soal yang rusak, tidak terbaca, atau kurang lengkap.</li>
            <li>Kerjakan terlebih dahulu soal-soal yang Anda anggap mudah, lalu periksa kembali pekerjaan Anda sebelum dikumpulkan.</li>
          </ol>
        </div>
      )}
    </div>
  );
};
