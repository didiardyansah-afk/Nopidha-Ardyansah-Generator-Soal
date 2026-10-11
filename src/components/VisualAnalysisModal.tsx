import React, { useState } from 'react';
import {
  X,
  Eye,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  RefreshCw,
  Layers,
  HelpCircle
} from 'lucide-react';
import { QuestionItem } from '../types';
import { SCIENTIFIC_SVGS } from '../data/curriculumData';
import {
  VISUAL_ANALYSIS_CATALOG,
  buildQuestionFromTemplate,
  generateVisualAnalysisQuestions,
  VisualAnalysisTemplate
} from '../utils/visualAnalysisGenerator';

interface VisualAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuestions: (newQuestions: QuestionItem[], mode: 'replace' | 'append') => void;
  currentQuestionCount: number;
}

export const VisualAnalysisModal: React.FC<VisualAnalysisModalProps> = ({
  isOpen,
  onClose,
  onApplyQuestions,
  currentQuestionCount,
}) => {
  const [selectedDiagramKey, setSelectedDiagramKey] = useState<string>('all');
  const [selectedCount, setSelectedCount] = useState<number>(3);
  const [applyMode, setApplyMode] = useState<'append' | 'replace'>('append');
  const [previewTemplateIndex, setPreviewTemplateIndex] = useState<number>(0);

  if (!isOpen) return null;

  // Filter templates based on selected diagram
  const filteredTemplates =
    selectedDiagramKey === 'all'
      ? VISUAL_ANALYSIS_CATALOG
      : VISUAL_ANALYSIS_CATALOG.filter((t) => t.diagramKey === selectedDiagramKey);

  const activeTemplate: VisualAnalysisTemplate =
    filteredTemplates[previewTemplateIndex % filteredTemplates.length] ||
    VISUAL_ANALYSIS_CATALOG[0];

  const handleGenerateAndApply = () => {
    let generated: QuestionItem[] = [];

    if (selectedDiagramKey === 'all') {
      generated = generateVisualAnalysisQuestions({
        count: selectedCount,
        startIndex: applyMode === 'append' ? currentQuestionCount + 1 : 1,
      });
    } else {
      generated = generateVisualAnalysisQuestions({
        count: selectedCount,
        diagramKey: selectedDiagramKey as keyof typeof SCIENTIFIC_SVGS,
        startIndex: applyMode === 'append' ? currentQuestionCount + 1 : 1,
      });
    }

    onApplyQuestions(generated, applyMode);
    onClose();
  };

  const handleApplySingleTemplate = (template: VisualAnalysisTemplate) => {
    const q = buildQuestionFromTemplate(
      template,
      applyMode === 'append' ? currentQuestionCount + 1 : 1
    );
    onApplyQuestions([q], applyMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <Eye className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Generator Soal Analisis Visual IPA SMP
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  SCIENTIFIC_SVGS
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Susun butir soal berstimulus gambar dengan tugas identifikasi bagian organ, instrumen, atau fungsinya secara spesifik.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Filter Diagram */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Pilih Topik Diagram Sains:
              </label>
              <select
                value={selectedDiagramKey}
                onChange={(e) => {
                  setSelectedDiagramKey(e.target.value);
                  setPreviewTemplateIndex(0);
                }}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">Semua Diagram Sains (Koleksi Lengkap)</option>
                <option value="selTumbuhan">Sel Tumbuhan (Organel & Dinding Sel X)</option>
                <option value="mikroskop">Mikroskop Optik (Lensa Okuler A, Makrometer D)</option>
                <option value="sistemPencernaan">Sistem Pencernaan (Lambung X & Enzim)</option>
                <option value="tuasPengungkit">Tuas Pengungkit (Beban W, Tumpu T, Kuasa F)</option>
                <option value="rangkaianListrik">Rangkaian Listrik Seri (Resistor & Arus I)</option>
                <option value="hukumArchimedes">Hukum Archimedes (Fluida Terapung & Melayang)</option>
                <option value="fotosintesisIngenhousz">Fotosintesis Ingenhousz (Gas Oksigen O2)</option>
              </select>
            </div>

            {/* Jumlah Soal */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Jumlah Soal Dihasilkan:
              </label>
              <select
                value={selectedCount}
                onChange={(e) => setSelectedCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value={1}>1 Butir Soal Spesifik</option>
                <option value={2}>2 Butir Soal</option>
                <option value={3}>3 Butir Soal Bergambar</option>
                <option value={5}>5 Butir Soal Analisis Visual</option>
                <option value={7}>7 Butir Soal Beragam Topik</option>
                <option value={9}>9 Butir Soal Lengkap</option>
              </select>
            </div>

            {/* Mode Penerapan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Tindakan Pada Naskah Soal:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setApplyMode('append')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    applyMode === 'append'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Tambahkan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setApplyMode('replace')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                    applyMode === 'replace'
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ganti Semua</span>
                </button>
              </div>
            </div>
          </div>

          {/* Realtime Live Preview of Selected Template */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Pratinjau Soal: {activeTemplate.title}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Target: {activeTemplate.targetPart}
                </span>
              </div>
              {filteredTemplates.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">
                    Opsi {previewTemplateIndex + 1} dari {filteredTemplates.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewTemplateIndex((prev) => (prev + 1) % filteredTemplates.length)
                    }
                    className="text-xs font-semibold px-2 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Selanjutnya →
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Diagram SVG Preview */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col items-center">
                <span className="text-[11px] font-semibold text-slate-500 mb-2">
                  Diagram Ilmiah yang Disematkan (hasDiagram: true):
                </span>
                <div
                  className="w-full flex items-center justify-center max-h-56 overflow-hidden rounded bg-white p-2 border border-slate-200"
                  dangerouslySetInnerHTML={{
                    __html: SCIENTIFIC_SVGS[activeTemplate.diagramKey] || '',
                  }}
                />
                <p className="text-[11px] text-slate-600 italic mt-2 text-center">
                  {activeTemplate.gambarDeskripsi}
                </p>
              </div>

              {/* Question Text & Options */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                  <strong>Stimulus:</strong> {activeTemplate.stimulus}
                </div>

                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {activeTemplate.pertanyaan}
                </div>

                {activeTemplate.pilihan && (
                  <div className="space-y-1.5 pl-2">
                    {activeTemplate.pilihan.map((opt, i) => (
                      <div
                        key={i}
                        className={`text-xs p-1.5 rounded ${
                          opt.startsWith(activeTemplate.kunciJawaban)
                            ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                            : 'text-slate-700'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="text-emerald-700">Kunci Jawaban:</strong>{' '}
                  {activeTemplate.kunciJawaban}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleApplySingleTemplate(activeTemplate)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Gunakan Butir Soal Ini Saja
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Standar Soal Analisis Visual:</p>
              <p className="text-sky-800 text-[11px] leading-relaxed mt-0.5">
                Setiap butir soal yang dibuat otomatis diberi atribut <code>hasDiagram: true</code> dan <code>isVisualAnalysis: true</code>, disematkan gambar vektor SVG dengan dimensi terstandar, serta memuat rubrik penskoran dan pembahasan saintifik komprehensif.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            Akan menghasilkan <strong className="text-slate-900">{selectedCount} butir</strong> soal analisis visual berdiagram.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleGenerateAndApply}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-md hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Generate {selectedCount} Soal Analisis Visual</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
