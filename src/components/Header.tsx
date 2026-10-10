import React from 'react';
import { School, Settings, Sparkles, BookOpen, UserCheck, ShieldCheck, Printer } from 'lucide-react';
import { SchoolIdentity } from '../types';

interface HeaderProps {
  schoolInfo: SchoolIdentity;
  onOpenSettings: () => void;
  onPrintActive: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  schoolInfo,
  onOpenSettings,
  onPrintActive,
  activeTab,
}) => {
  return (
    <header className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-800/40 shadow-lg sticky top-0 z-30">
      {/* Developer Banner bar */}
      <div className="bg-indigo-950/80 border-b border-indigo-800/30 px-4 py-1.5 text-xs text-indigo-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Fase D (SMP Kelas 7, 8, 9)
          </span>
          <span className="hidden sm:inline text-indigo-300">
            Kurikulum Merdeka & Kurikulum Nasional • IPA Terpadu
          </span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <UserCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Pengembang:</span>
          <strong className="text-amber-300 font-semibold">
            Nopidha Ardyansah, S.Pd., M.Pd.
          </strong>
          <span className="hidden md:inline text-indigo-300">
            (Kepala SMP Negeri 2 Gumelar, Kab. Banyumas, Prov. Jawa Tengah)
          </span>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                SIP-IPA SMP
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-normal">
                  v2.5 Pro
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-300 line-clamp-1">
              Generator & Bank Soal Asesmen IPA Terpadu SMP • Kisi-Kisi, Kunci, Kartu Soal, Norma Skor 100
            </p>
          </div>
        </div>

        {/* School Info Preview & Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition-colors shadow-sm"
            title="Ubah identitas sekolah, kop surat, kepala sekolah, dan guru"
          >
            <School className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-semibold text-slate-100">
              {schoolInfo.namaSekolah || 'Pengaturan Sekolah'}
            </span>
            <Settings className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          <button
            onClick={onPrintActive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shadow-indigo-900/50"
            title="Cetak langsung atau simpan sebagai PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak Dokumen</span>
          </button>
        </div>
      </div>
    </header>
  );
};
