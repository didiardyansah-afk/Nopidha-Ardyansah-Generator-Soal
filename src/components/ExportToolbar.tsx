import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  FileText,
  Download,
  Share2,
  CheckCircle,
  Sparkles,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Automatic Direct PDF Download using jsPDF & html2canvas
  const handleAutoDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      const element = document.getElementById(targetElementId);
      if (!element) {
        // Fallback to window.print if target element not found
        window.print();
        setIsExportingPdf(false);
        return;
      }

      // Hide no-print elements during capture
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (el) => el.classList.contains('no-print'),
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      // Add subsequent pages if content overflows A4
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      const safeFileName = `${documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      pdf.save(safeFileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Export to Microsoft Word (.doc)
  const handleExportWord = () => {
    const element = document.getElementById(targetElementId);
    if (!element) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${documentTitle}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.3; }
          table { border-collapse: collapse; width: 100%; margin: 10px 0; }
          th, td { border: 1px solid #333; padding: 6px; font-size: 10pt; }
          .no-print { display: none !important; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
          <FileDown className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Ekspor & Cetak: {activeTabName}
          </h4>
          <p className="text-xs text-slate-500">
            File akan otomatis terunduh dengan tata letak resmi sekolah.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Tombol Cetak Langsung */}
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
          title="Buka dialog cetak browser (Ctrl + P)"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Cetak Naskah</span>
        </button>

        {/* Tombol Simpan PDF Otomatis (File Terunduh Otomatis) */}
        <button
          onClick={handleAutoDownloadPdf}
          disabled={isExportingPdf}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-indigo-200 disabled:opacity-50 cursor-pointer"
          title="Download dokumen langsung dalam format PDF"
        >
          {isExportingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses PDF...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>PDF Berhasil Diunduh!</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 text-cyan-300" />
              <span>Simpan PDF Otomatis</span>
            </>
          )}
        </button>

        {/* Tombol Ekspor Word .doc */}
        <button
          onClick={handleExportWord}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs sm:text-sm font-semibold transition-colors"
          title="Simpan sebagai file Microsoft Word (.doc)"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Ekspor Word (.doc)</span>
        </button>
      </div>
    </div>
  );
};
