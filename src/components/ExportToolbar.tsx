import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  FileText,
  CheckCircle,
  Loader2,
  FileCheck,
  Download,
  Check
} from 'lucide-react';
import { printElementToPdf } from '../utils/printPdf';
import { exportHtmlToWordDoc } from '../utils/wordExport';
import {
  downloadNaskahSoalPdf,
  downloadKunciJawabanPdf,
  downloadKartuSoalPdf,
} from '../utils/directPdfDownload';
import { SchoolIdentity, QuestionItem } from '../types';

interface ExportToolbarProps {
  onPrint: () => void;
  documentTitle: string;
  targetElementId: string;
  activeTabName: string;
  schoolInfo: SchoolIdentity;
  questions: QuestionItem[];
  activeTabKey: string;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onPrint,
  documentTitle,
  targetElementId,
  activeTabName,
  schoolInfo,
  questions,
  activeTabKey,
}) => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // 1. Automatic Direct PDF Download directly to user's device Downloads folder
  const handleAutoDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);

      if (activeTabKey === 'kunci') {
        await downloadKunciJawabanPdf(schoolInfo, questions, documentTitle);
      } else if (activeTabKey === 'kartu') {
        await downloadKartuSoalPdf(schoolInfo, questions, documentTitle);
      } else {
        await downloadNaskahSoalPdf(schoolInfo, questions, documentTitle);
      }

      setDownloadSuccessMsg('File PDF beserta seluruh diagram/gambar lengkap berhasil tersimpan di folder Unduhan (Downloads)!');
      setTimeout(() => setDownloadSuccessMsg(null), 4000);
    } catch (err) {
      console.warn('Direct PDF download fallback to print:', err);
      handlePrintToPdf();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // 2. High-fidelity Print / Save to PDF Dialog with isolated A4 format
  const handlePrintToPdf = async () => {
    try {
      setIsPrinting(true);
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
      setIsPrinting(false);
    }
  };

  // 3. Export to Microsoft Word with A4 Paper and strict margins
  const handleExportWordDoc = () => {
    try {
      setIsExportingWord(true);
      exportHtmlToWordDoc(targetElementId, documentTitle);
      setDownloadSuccessMsg('Berkas Word (.doc) A4 berhasil diunduh!');
      setTimeout(() => setDownloadSuccessMsg(null), 4000);
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
                Menu Cetak & Unduh Dokumen: {activeTabName}
              </h4>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                Standar Kertas A4
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Margin resmi: Atas 2 cm, Bawah 2 cm, Kiri 2.5 cm, Kanan 2 cm • Bebas dari tombol antarmuka/navigasi.
            </p>
          </div>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tombol Simpan PDF Otomatis (Tersimpan Langsung di Folder Downloads) */}
          <button
            onClick={handleAutoDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-emerald-200 disabled:opacity-60 cursor-pointer"
            title="Unduh otomatis file PDF langsung tersimpan di folder Downloads laptop/komputer"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan ke Folder...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-emerald-200" />
                <span>Simpan PDF Otomatis</span>
              </>
            )}
          </button>

          {/* Tombol Cetak Dokumen (Buka Print Preview A4) */}
          <button
            onClick={handlePrintToPdf}
            disabled={isPrinting}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            title="Buka jendela pratinjau cetak resmi A4"
          >
            {isPrinting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyiapkan Cetak...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4 text-cyan-200" />
                <span>Cetak Dokumen</span>
              </>
            )}
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
            ) : (
              <>
                <FileText className="w-4 h-4 text-blue-200" />
                <span>Ekspor Word (.doc)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification Bar */}
      {downloadSuccessMsg && (
        <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{downloadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
