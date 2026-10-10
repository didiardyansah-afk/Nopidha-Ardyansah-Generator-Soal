import React, { useState } from 'react';
import { SchoolIdentity, QuestionItem, QuestionType } from '../types';
import { Calculator, Plus, Trash2, Download, Check, AlertCircle } from 'lucide-react';

interface TabelPenilaianViewProps {
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
}

interface StudentRow {
  id: string;
  absen: number;
  nis: string;
  nama: string;
  scores: Record<QuestionType, number>;
}

export const TabelPenilaianView: React.FC<TabelPenilaianViewProps> = ({
  schoolInfo,
  questions,
}) => {
  // Aggregate max score per question type
  const typeMax: Record<QuestionType, number> = questions.reduce((acc, q) => {
    acc[q.bentukSoal] = (acc[q.bentukSoal] || 0) + q.bobotSkor;
    return acc;
  }, {} as Record<QuestionType, number>);

  const activeTypes = (Object.keys(typeMax) as QuestionType[]).filter(
    (t) => (typeMax[t] || 0) > 0
  );

  const totalMaxRaw = questions.reduce((sum, q) => sum + q.bobotSkor, 0);

  // Initial demo student rows for simulation
  const [students, setStudents] = useState<StudentRow[]>([
    {
      id: 's-1',
      absen: 1,
      nis: '242507001',
      nama: 'Aditya Pratama Putra',
      scores: {
        pilihan_ganda: Math.round((typeMax['pilihan_ganda'] || 0) * 0.9),
        pilihan_ganda_kompleks: Math.round((typeMax['pilihan_ganda_kompleks'] || 0) * 0.8),
        isian_singkat: Math.round((typeMax['isian_singkat'] || 0) * 0.85),
        uraian: Math.round((typeMax['uraian'] || 0) * 0.8),
        menjodohkan: Math.round((typeMax['menjodohkan'] || 0) * 0.9),
        benar_salah: Math.round((typeMax['benar_salah'] || 0) * 1.0),
      },
    },
    {
      id: 's-2',
      absen: 2,
      nis: '242507002',
      nama: 'Anindya Kirana Putri',
      scores: {
        pilihan_ganda: Math.round((typeMax['pilihan_ganda'] || 0) * 1.0),
        pilihan_ganda_kompleks: Math.round((typeMax['pilihan_ganda_kompleks'] || 0) * 1.0),
        isian_singkat: Math.round((typeMax['isian_singkat'] || 0) * 0.9),
        uraian: Math.round((typeMax['uraian'] || 0) * 0.9),
        menjodohkan: Math.round((typeMax['menjodohkan'] || 0) * 1.0),
        benar_salah: Math.round((typeMax['benar_salah'] || 0) * 1.0),
      },
    },
    {
      id: 's-3',
      absen: 3,
      nis: '242507003',
      nama: 'Bagus Satria Wibowo',
      scores: {
        pilihan_ganda: Math.round((typeMax['pilihan_ganda'] || 0) * 0.7),
        pilihan_ganda_kompleks: Math.round((typeMax['pilihan_ganda_kompleks'] || 0) * 0.6),
        isian_singkat: Math.round((typeMax['isian_singkat'] || 0) * 0.6),
        uraian: Math.round((typeMax['uraian'] || 0) * 0.5),
        menjodohkan: Math.round((typeMax['menjodohkan'] || 0) * 0.7),
        benar_salah: Math.round((typeMax['benar_salah'] || 0) * 0.7),
      },
    },
    {
      id: 's-4',
      absen: 4,
      nis: '242507004',
      nama: 'Cantika Dewi Lestari',
      scores: {
        pilihan_ganda: Math.round((typeMax['pilihan_ganda'] || 0) * 0.85),
        pilihan_ganda_kompleks: Math.round((typeMax['pilihan_ganda_kompleks'] || 0) * 0.9),
        isian_singkat: Math.round((typeMax['isian_singkat'] || 0) * 0.8),
        uraian: Math.round((typeMax['uraian'] || 0) * 0.85),
        menjodohkan: Math.round((typeMax['menjodohkan'] || 0) * 0.8),
        benar_salah: Math.round((typeMax['benar_salah'] || 0) * 0.9),
      },
    },
    {
      id: 's-5',
      absen: 5,
      nis: '242507005',
      nama: 'Dimas Rizky Ramadhan',
      scores: {
        pilihan_ganda: Math.round((typeMax['pilihan_ganda'] || 0) * 0.6),
        pilihan_ganda_kompleks: Math.round((typeMax['pilihan_ganda_kompleks'] || 0) * 0.5),
        isian_singkat: Math.round((typeMax['isian_singkat'] || 0) * 0.4),
        uraian: Math.round((typeMax['uraian'] || 0) * 0.5),
        menjodohkan: Math.round((typeMax['menjodohkan'] || 0) * 0.6),
        benar_salah: Math.round((typeMax['benar_salah'] || 0) * 0.5),
      },
    },
  ]);

  const kktp = 75; // Kriteria Ketercapaian Tujuan Pembelajaran standar SMP

  const handleScoreChange = (
    studentId: string,
    type: QuestionType,
    value: number
  ) => {
    const maxVal = typeMax[type] || 0;
    const clamped = Math.max(0, Math.min(maxVal, value));
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, scores: { ...s.scores, [type]: clamped } }
          : s
      )
    );
  };

  const handleAddStudent = () => {
    const nextAbsen = students.length + 1;
    const newStudent: StudentRow = {
      id: `s-${Date.now()}`,
      absen: nextAbsen,
      nis: `2425070${nextAbsen < 10 ? '0' + nextAbsen : nextAbsen}`,
      nama: `Siswa Baru ${nextAbsen}`,
      scores: activeTypes.reduce((acc, t) => {
        acc[t] = Math.round((typeMax[t] || 0) * 0.75);
        return acc;
      }, {} as Record<QuestionType, number>),
    };
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Calculations
  const calculatedRows = students.map((s) => {
    const totalRaw = activeTypes.reduce(
      (sum, t) => sum + (s.scores[t] || 0),
      0
    );
    const finalScore =
      totalMaxRaw > 0 ? Math.round((totalRaw / totalMaxRaw) * 100) : 0;
    const predikat =
      finalScore >= 90
        ? 'A'
        : finalScore >= 80
        ? 'B'
        : finalScore >= kktp
        ? 'C'
        : 'D';
    const isTuntas = finalScore >= kktp;

    return {
      ...s,
      totalRaw,
      finalScore,
      predikat,
      isTuntas,
    };
  });

  const avgFinalScore =
    calculatedRows.length > 0
      ? (
          calculatedRows.reduce((sum, r) => sum + r.finalScore, 0) /
          calculatedRows.length
        ).toFixed(1)
      : '0';

  const highestScore = Math.max(...calculatedRows.map((r) => r.finalScore), 0);
  const lowestScore = Math.min(...calculatedRows.map((r) => r.finalScore), 100);
  const totalPassed = calculatedRows.filter((r) => r.isTuntas).length;
  const passRate =
    calculatedRows.length > 0
      ? ((totalPassed / calculatedRows.length) * 100).toFixed(1)
      : '0';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
      {/* Document Header */}
      <div className="text-center pb-4 border-b-2 border-slate-900 mb-6 font-serif">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
          {schoolInfo.pemerintahDaerah} • {schoolInfo.dinasPendidikan}
        </h3>
        <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 mt-0.5">
          TABEL PENILAIAN & DAFTAR NILAI SISWA (SKOR AKHIR 100)
        </h2>
        <h3 className="text-sm sm:text-base font-bold uppercase text-indigo-900">
          {schoolInfo.namaSekolah} • KELAS {schoolInfo.kelas} • SEMESTER {schoolInfo.semester.toUpperCase()}
        </h3>
        <p className="text-xs text-slate-600 mt-1 italic font-sans">
          Mata Pelajaran: {schoolInfo.mataPelajaran} • KKTP Minimal: {kktp}
        </p>
      </div>

      {/* Class Statistics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 no-print">
        <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
          <span className="text-xs font-semibold text-indigo-900 block">
            Rata-rata Nilai Kelas
          </span>
          <span className="text-2xl font-black text-indigo-700">
            {avgFinalScore}
          </span>
          <span className="text-[10px] text-indigo-600">Skala 100</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-xs font-semibold text-emerald-900 block">
            Ketuntasan Belajar
          </span>
          <span className="text-2xl font-black text-emerald-700">
            {passRate}%
          </span>
          <span className="text-[10px] text-emerald-600">
            {totalPassed} dari {students.length} Siswa Tuntas
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
          <span className="text-xs font-semibold text-blue-900 block">
            Nilai Tertinggi
          </span>
          <span className="text-2xl font-black text-blue-700">
            {highestScore}
          </span>
          <span className="text-[10px] text-blue-600">Skor Maksimal 100</span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-xs font-semibold text-amber-900 block">
            Nilai Terendah
          </span>
          <span className="text-2xl font-black text-amber-700">
            {lowestScore}
          </span>
          <span className="text-[10px] text-amber-600">Perlu Bimbingan Remedial</span>
        </div>
      </div>

      {/* Admin Action Bar for student table */}
      <div className="no-print mb-4 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-600">
          Total Skor Maksimum Asesmen:{' '}
          <strong className="text-indigo-900 font-bold">{totalMaxRaw} Poin</strong>{' '}
          (Dikonversi otomatis menjadi nilai 100).
        </div>
        <button
          onClick={handleAddStudent}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Siswa
        </button>
      </div>

      {/* Main Student Score Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-400 text-xs text-left">
          <thead>
            <tr className="bg-slate-100 font-bold text-slate-900 text-center">
              <th className="border border-slate-400 p-2 w-10">No</th>
              <th className="border border-slate-400 p-2 w-24">NIS</th>
              <th className="border border-slate-400 p-2 min-w-44 text-left">
                Nama Siswa
              </th>
              {activeTypes.map((type) => (
                <th key={type} className="border border-slate-400 p-2 w-24">
                  <div className="capitalize">{type.replace('_', ' ')}</div>
                  <div className="text-[10px] font-normal text-slate-600">
                    (Maks: {typeMax[type]})
                  </div>
                </th>
              ))}
              <th className="border border-slate-400 p-2 w-20">
                Total Skor Mentah
                <div className="text-[10px] font-normal text-slate-600">
                  (Maks: {totalMaxRaw})
                </div>
              </th>
              <th className="border border-slate-400 p-2 w-20 bg-indigo-100 text-indigo-950 font-black">
                Nilai Akhir (0-100)
              </th>
              <th className="border border-slate-400 p-2 w-16">Predikat</th>
              <th className="border border-slate-400 p-2 w-24">Keterangan</th>
              <th className="border border-slate-400 p-2 w-10 no-print">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {calculatedRows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="border border-slate-400 p-2 text-center font-bold">
                  {idx + 1}
                </td>
                <td className="border border-slate-400 p-2 text-center font-mono text-[11px]">
                  {row.nis}
                </td>
                <td className="border border-slate-400 p-2 font-semibold text-slate-900">
                  {row.nama}
                </td>

                {/* Score inputs per question type */}
                {activeTypes.map((type) => (
                  <td key={type} className="border border-slate-400 p-1.5 text-center">
                    <input
                      type="number"
                      min={0}
                      max={typeMax[type] || 0}
                      value={row.scores[type] || 0}
                      onChange={(e) =>
                        handleScoreChange(
                          row.id,
                          type,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 px-1 py-0.5 text-center font-semibold rounded border border-slate-300 focus:ring-1 focus:ring-indigo-500 text-xs no-print"
                    />
                    <span className="hidden print:inline font-semibold">
                      {row.scores[type] || 0}
                    </span>
                  </td>
                ))}

                <td className="border border-slate-400 p-2 text-center font-bold text-slate-800">
                  {row.totalRaw}
                </td>

                <td className="border border-slate-400 p-2 text-center font-black text-sm bg-indigo-50 text-indigo-950">
                  {row.finalScore}
                </td>

                <td className="border border-slate-400 p-2 text-center font-bold">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                      row.predikat === 'A'
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.predikat === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : row.predikat === 'C'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {row.predikat}
                  </span>
                </td>

                <td className="border border-slate-400 p-2 text-center font-semibold">
                  {row.isTuntas ? (
                    <span className="text-emerald-700">TUNTAS</span>
                  ) : (
                    <span className="text-rose-600 font-bold">REMEDIAL</span>
                  )}
                </td>

                <td className="border border-slate-400 p-1 text-center no-print">
                  <button
                    onClick={() => handleDeleteStudent(row.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Hapus baris siswa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
