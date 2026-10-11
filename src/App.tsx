import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Key,
  Layers,
  Award,
  Calculator,
  Sliders,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';
import {
  SchoolIdentity,
  ExamConfig,
  QuestionItem,
  QuestionType,
} from './types';
import {
  DEFAULT_SCHOOL_INFO,
  DEFAULT_EXAM_CONFIG,
  INITIAL_PRESET_QUESTIONS,
  SCIENTIFIC_SVGS,
} from './data/curriculumData';
import { Header } from './components/Header';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { ExamConfigForm } from './components/ExamConfigForm';
import { NaskahSoalView } from './components/NaskahSoalView';
import { KisiKisiView } from './components/KisiKisiView';
import { KunciJawabanView } from './components/KunciJawabanView';
import { KartuSoalView } from './components/KartuSoalView';
import { NormaPenilaianView } from './components/NormaPenilaianView';
import { TabelPenilaianView } from './components/TabelPenilaianView';
import { EditQuestionModal } from './components/EditQuestionModal';
import { ExportToolbar } from './components/ExportToolbar';
import { DeveloperFooter } from './components/DeveloperFooter';
import { printElementToPdf } from './utils/printPdf';

type TabKey =
  | 'config'
  | 'naskah'
  | 'kisi_kisi'
  | 'kunci'
  | 'kartu_soal'
  | 'norma'
  | 'tabel_skor';

export default function App() {
  // Local state initialized with rich defaults
  const [schoolInfo, setSchoolInfo] = useState<SchoolIdentity>(() => {
    const saved = localStorage.getItem('sip_ipa_school_info');
    return saved ? JSON.parse(saved) : DEFAULT_SCHOOL_INFO;
  });

  const [examConfig, setExamConfig] = useState<ExamConfig>(() => {
    const saved = localStorage.getItem('sip_ipa_exam_config');
    return saved ? JSON.parse(saved) : DEFAULT_EXAM_CONFIG;
  });

  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    const saved = localStorage.getItem('sip_ipa_questions');
    return saved ? JSON.parse(saved) : INITIAL_PRESET_QUESTIONS;
  });

  const [activeTab, setActiveTab] = useState<TabKey>('naskah');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Edit question modal state
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sip_ipa_school_info', JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem('sip_ipa_exam_config', JSON.stringify(examConfig));
  }, [examConfig]);

  useEffect(() => {
    localStorage.setItem('sip_ipa_questions', JSON.stringify(questions));
  }, [questions]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Generate Questions via Backend Gemini API
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-soal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...examConfig,
          schoolInfo,
        }),
      });

      const result = await response.json();

      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        // Attach diagrams if needed
        const enhancedQuestions = result.data.map((q: QuestionItem, i: number) => {
          let svg = q.gambarSvg;
          if (examConfig.sertakanGambar && i < examConfig.jumlahSoalBergambar && !svg) {
            // Pick a matching SVG from catalog
            const svgs = [
              SCIENTIFIC_SVGS.selTumbuhan,
              SCIENTIFIC_SVGS.mikroskop,
              SCIENTIFIC_SVGS.tuasPengungkit,
              SCIENTIFIC_SVGS.rangkaianListrik,
              SCIENTIFIC_SVGS.hukumArchimedes,
            ];
            svg = svgs[i % svgs.length];
          }
          return {
            ...q,
            gambarSvg: svg,
            nomor: i + 1,
          };
        });

        setQuestions(enhancedQuestions);
        setActiveTab('naskah');
        showNotification(
          `Berhasil menyusun ${enhancedQuestions.length} butir soal IPA SMP (${result.source === 'gemini-3.8-flash' ? 'Google AI Gemini' : 'Kurikulum Terpadu'})!`
        );
      } else {
        throw new Error(result.warning || 'Gagal memproses pembuatan soal');
      }
    } catch (err: any) {
      console.warn('API error, using initial curated bank:', err);
      showNotification('Memuat bank soal kurikulum terpadu IPA SMP.');
      setActiveTab('naskah');
    } finally {
      setIsGenerating(false);
    }
  };

  // Question Edit & Delete handlers
  const handleOpenEdit = (q: QuestionItem) => {
    setEditingQuestion(q);
    setIsEditModalOpen(true);
  };

  const handleSaveQuestion = (updated: QuestionItem) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
    showNotification(`Soal nomor ${updated.nomor} berhasil diperbarui.`);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Yakin ingin menghapus butir soal ini?')) {
      const updated = questions
        .filter((q) => q.id !== id)
        .map((q, idx) => ({ ...q, nomor: idx + 1 }));
      setQuestions(updated);
      showNotification('Butir soal berhasil dihapus.');
    }
  };

  const handleAddNewQuestion = () => {
    const nextNum = questions.length + 1;
    const newQ: QuestionItem = {
      id: `q-custom-${Date.now()}`,
      nomor: nextNum,
      bentukSoal: 'pilihan_ganda',
      tingkatKesulitan: 'sedang',
      cognitiveLevel: 'MOTS',
      learningExperience: 'Mengaplikasi',
      learningTargetExplanation: 'Aplikasi konsep materi IPA SMP.',
      materi: examConfig.topikMateri.split(',')[0] || 'IPA SMP',
      tujuanPembelajaran: examConfig.tujuanPembelajaran,
      indikatorSoal: 'Peserta didik mampu menganalisis konsep IPA secara tepat.',
      pertanyaan: 'Ketik butir pertanyaan baru di sini...',
      pilihan: [
        'A. Pilihan jawaban pertama',
        'B. Pilihan jawaban kedua',
        'C. Pilihan jawaban ketiga',
        'D. Pilihan jawaban keempat',
      ],
      kunciJawaban: 'A',
      pembahasan: 'Penjelasan konsep ilmiah untuk butir soal ini.',
      bobotSkor: 1,
    };
    setQuestions([...questions, newQ]);
    handleOpenEdit(newQ);
  };

  const handleResetToDefault = () => {
    if (confirm('Kembalikan ke paket soal preset awal IPA SMP?')) {
      setQuestions(INITIAL_PRESET_QUESTIONS);
      setExamConfig(DEFAULT_EXAM_CONFIG);
      setSchoolInfo(DEFAULT_SCHOOL_INFO);
      showNotification('Data telah direset ke preset awal.');
    }
  };

  const handlePrint = () => {
    printElementToPdf({
      elementId: 'printable-content',
      documentTitle: getExportTitle(),
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  // Document title for exports
  const getExportTitle = () => {
    const tabNames: Record<TabKey, string> = {
      config: 'Konfigurasi_Asesmen_IPA',
      naskah: `Naskah_Soal_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
      kisi_kisi: `Kisi_Kisi_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
      kunci: `Kunci_Jawaban_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
      kartu_soal: `Kartu_Soal_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
      norma: `Norma_Penilaian_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
      tabel_skor: `Daftar_Nilai_IPA_Kelas${schoolInfo.kelas}_${schoolInfo.namaSekolah}`,
    };
    return tabNames[activeTab] || 'Dokumen_IPA_SMP';
  };

  const tabTitles: Record<TabKey, string> = {
    config: 'Konfigurasi Asesmen',
    naskah: 'Naskah Soal Siswa',
    kisi_kisi: 'Kisi-Kisi Soal',
    kunci: 'Kunci & Pembahasan',
    kartu_soal: 'Kartu Soal',
    norma: 'Norma Penilaian',
    tabel_skor: 'Tabel Nilai (Skor 100)',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        schoolInfo={schoolInfo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onPrintActive={handlePrint}
        activeTab={activeTab}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs Bar */}
        <div className="no-print mb-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
            <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'config'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>1. Konfigurasi & Generator</span>
              </button>

              <button
                onClick={() => setActiveTab('naskah')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'naskah'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>2. Naskah Soal ({questions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('kisi_kisi')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'kisi_kisi'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>3. Kisi-Kisi Soal</span>
              </button>

              <button
                onClick={() => setActiveTab('kunci')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'kunci'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>4. Kunci & Pembahasan</span>
              </button>

              <button
                onClick={() => setActiveTab('kartu_soal')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'kartu_soal'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>5. Kartu Soal</span>
              </button>

              <button
                onClick={() => setActiveTab('norma')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'norma'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>6. Norma Penilaian</span>
              </button>

              <button
                onClick={() => setActiveTab('tabel_skor')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'tabel_skor'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>7. Tabel Nilai (Skor 100)</span>
              </button>
            </nav>

            <button
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Reset ke paket soal awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Soal</span>
            </button>
          </div>
        </div>

        {/* Export Toolbar (Visible on printable tabs) */}
        {activeTab !== 'config' && (
          <ExportToolbar
            onPrint={handlePrint}
            documentTitle={getExportTitle()}
            targetElementId="printable-content"
            activeTabName={tabTitles[activeTab]}
          />
        )}

        {/* Tab Content Display */}
        <div id="printable-content" className="w-full">
          {activeTab === 'config' && (
            <div className="space-y-6">
              <ExamConfigForm
                config={examConfig}
                onChange={setExamConfig}
                onGenerate={handleGenerateQuestions}
                isGenerating={isGenerating}
              />
            </div>
          )}

          {activeTab === 'naskah' && (
            <NaskahSoalView
              schoolInfo={schoolInfo}
              questions={questions}
              onEditQuestion={handleOpenEdit}
              onDeleteQuestion={handleDeleteQuestion}
              onAddNewQuestion={handleAddNewQuestion}
            />
          )}

          {activeTab === 'kisi_kisi' && (
            <KisiKisiView
              schoolInfo={schoolInfo}
              questions={questions}
            />
          )}

          {activeTab === 'kunci' && (
            <KunciJawabanView
              schoolInfo={schoolInfo}
              questions={questions}
            />
          )}

          {activeTab === 'kartu_soal' && (
            <KartuSoalView
              schoolInfo={schoolInfo}
              questions={questions}
            />
          )}

          {activeTab === 'norma' && (
            <NormaPenilaianView
              schoolInfo={schoolInfo}
              questions={questions}
            />
          )}

          {activeTab === 'tabel_skor' && (
            <TabelPenilaianView
              schoolInfo={schoolInfo}
              questions={questions}
            />
          )}
        </div>
      </main>

      {/* School Settings Modal */}
      <SchoolSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        schoolInfo={schoolInfo}
        onSave={(updated) => {
          setSchoolInfo(updated);
          showNotification('Identitas sekolah dan kop surat berhasil diperbarui!');
        }}
      />

      {/* Edit Question Modal */}
      <EditQuestionModal
        isOpen={isEditModalOpen}
        question={editingQuestion}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveQuestion}
      />

      {/* Developer Honor Footer */}
      <DeveloperFooter />
    </div>
  );
}
