import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  FileText,
  CheckCircle,
  Loader2,
  FileCheck,
  Info
} from 'lucide-react';
import { printElementToPdf } from '../utils/printPdf';
import { exportHtmlToWordDoc } from '../utils/wordExport';

interface ExportToolbarProps {
  onPrint: () => void;
  documentTitle: string;
  targetElementId: string;
  activeTabName: string;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onPrint,
  documentTitle,
  targetElementId,
  activeTabName,
}) => {
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [showWordSuccess, setShowWordSuccess] = useState(false);
  const [showPdfHint, setShowPdfHint] = useState(false);

  // Trigger high-fidelity Print-to-PDF
  const handleSavePdfOrPrint = async () => {
    try {
      setIsProcessingPdf(true);
      setShowPdfHint(true);
      await printElementToPdf({
        elementId: targetElementId,
        documentTitle: documentTitle,
        pageSize: 'A4',
        orientation: 'portrait',
      });
    } catch (err) {
      console.warn('Print-to-PDF fallback:', err);
      window.print();
    } finally {
      setIsProcessingPdf(false);
      setTimeout(() => setShowPdfHint(false), 6000);
    }
  };

  // Export to Microsoft Word with A4 Paper and strict margins
  const handleExportWordDoc = () => {
    try {
      setIsExportingWord(true);
      exportHtmlToWordDoc(targetElementId, documentTitle);
      setShowWordSuccess(true);
      setTimeout(() => setShowWordSuccess(false), 3500);
    } catch (err) {
      console.error('Word export error:', err);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <div className="no-print bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Info Column */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center flex-shrink-0">
            <FileDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">
                Menu Cetak & Ekspor Dokumen: {activeTabName}
              </h4>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                Format Kertas A4 Resmi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar margin dinas: Atas 2 cm, Bawah 2 cm, Kiri 2.5 cm (jilid), Kanan 2 cm.
            </p>
          </div>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tombol Simpan PDF Otomatis (Print-to-PDF A4) */}
          <button
            onClick={handleSavePdfOrPrint}
            disabled={isProcessingPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-indigo-200 disabled:opacity-60 cursor-pointer"
            title="Simpan dokumen sebagai file PDF A4 resmi"
          >
            {isProcessingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyiapkan PDF A4...</span>
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4 text-cyan-300" />
                <span>Simpan PDF Otomatis</span>
              </>
            )}
          </button>

          {/* Tombol Cetak Dokumen */}
          <button
            onClick={handleSavePdfOrPrint}
            disabled={isProcessingPdf}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors border border-slate-300/80 cursor-pointer"
            title="Cetak langsung naskah ke printer"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span>Cetak Dokumen</span>
          </button>

          {/* Tombol Ekspor Word .doc (A4 Tertata Rapi) */}
          <button
            onClick={handleExportWordDoc}
            disabled={isExportingWord}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-blue-200 cursor-pointer disabled:opacity-60"
            title="Unduh naskah sebagai berkas Microsoft Word (.doc) berformat kertas A4 dan margin rapi"
          >
            {isExportingWord ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyusun Word...</span>
              </>
            ) : showWordSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>Word Terunduh!</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-blue-200" />
                <span>Ekspor Word (.doc) A4</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PDF Hint Helper */}
      {showPdfHint && (
        <div className="mt-3 p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-center gap-2 animate-in fade-in duration-200">
          <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            <strong>Tips Simpan PDF:</strong> Pada jendela pratinjau cetak yang muncul, pilih opsi Tujuan: <em>"Simpan sebagai PDF"</em> (Save as PDF) lalu klik <strong>Simpan</strong>. Berkas tersimpan dengan margin A4 rapi tanpa elemen menu.
          </span>
        </div>
      )}
    </div>
  );
};
