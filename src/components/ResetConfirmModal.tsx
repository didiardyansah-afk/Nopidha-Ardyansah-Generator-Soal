import React from 'react';
import { RotateCcw, AlertTriangle, X, Trash2, CheckCircle2 } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmResetPreset: () => void;
  onConfirmClearAll: () => void;
  totalQuestions: number;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmResetPreset,
  onConfirmClearAll,
  totalQuestions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shadow-xs">
              <RotateCcw className="w-5 h-5 text-amber-600 animate-spin-reverse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Konfirmasi Reset Soal</h3>
              <p className="text-xs text-amber-800 font-medium">
                Pilih opsi pengaturan ulang naskah soal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Saat ini terdapat <strong>{totalQuestions} butir soal</strong> dalam naskah. Anda dapat mengembalikannya ke bank soal awal kurikulum atau mengosongkan seluruhnya untuk mengetik baru.
            </span>
          </div>

          <div className="space-y-3">
            {/* Opsi 1: Reset ke Preset Awal */}
            <button
              onClick={() => {
                onConfirmResetPreset();
                onClose();
              }}
              className="w-full text-left p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 transition-all flex items-start gap-3.5 cursor-pointer group hover:shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-950 group-hover:text-indigo-900 flex items-center gap-1.5">
                  Kembalikan ke Paket Soal Baku (Preset IPA)
                  <span className="text-[10px] px-1.5 py-0.2 bg-indigo-200 text-indigo-800 rounded font-semibold">Direkomendasikan</span>
                </h4>
                <p className="text-xs text-indigo-800/80 mt-0.5">
                  Memulihkan 10 butir soal standar kurikulum IPA SMP (Fase D) lengkap dengan diagram SVG, kisi-kisi, kunci jawaban, dan norma skor.
                </p>
              </div>
            </button>

            {/* Opsi 2: Kosongkan Seluruh Butir Soal */}
            <button
              onClick={() => {
                onConfirmClearAll();
                onClose();
              }}
              className="w-full text-left p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all flex items-start gap-3.5 cursor-pointer group hover:shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-950 group-hover:text-rose-900">
                  Kosongkan Seluruh Soal (Mulai dari Nol)
                </h4>
                <p className="text-xs text-rose-800/80 mt-0.5">
                  Menghapus semua soal saat ini sehingga Anda bisa menambahkan soal secara manual atau menyusun dari generator baru.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
