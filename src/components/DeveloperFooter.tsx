import React from 'react';
import { Award, School, MapPin, UserCheck, HeartHandshake } from 'lucide-react';

export const DeveloperFooter: React.FC = () => {
  return (
    <footer className="no-print bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-10 pb-8 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Developer Highlight Card */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-500 p-0.5 shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <School className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                Inovator & Pengembang Aplikasi
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Nopidha Ardyansah, S.Pd., M.Pd.
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                Kepala SMP Negeri 2 Gumelar Kabupaten Banyumas Propinsi Jawa Tengah
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Kabupaten Banyumas, Jawa Tengah</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Pendidikan IPA Terpadu SMP</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs pt-4 border-t border-slate-800">
          <p>
            © {new Date().getFullYear()} SIP-IPA SMP • Aplikasi Asesmen & Pembuatan Soal IPA SMP Terpadu.
          </p>
          <p className="flex items-center gap-1">
            <span>Didedikasikan untuk guru & kemajuan pendidikan sains IPA di Indonesia.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
