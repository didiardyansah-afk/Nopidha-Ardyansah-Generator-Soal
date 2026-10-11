import jsPDF from 'jspdf';
import { SchoolIdentity, QuestionItem } from '../types';
import { getQuestionImagePng, ConvertedImageData, convertSvgOrImageToPng } from './imageExportUtils';

// Helper to check page overflow and add new page
function checkPageBreak(
  doc: jsPDF,
  currentY: number,
  requiredSpace: number = 20,
  marginY: number = 20
): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (currentY + requiredSpace > pageHeight - marginY) {
    doc.addPage();
    return marginY;
  }
  return currentY;
}

// Draw formal double line for Indonesian school Kop Surat
function drawKopDoubleLine(doc: jsPDF, y: number, marginX: number, contentWidth: number): number {
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.line(marginX, y, marginX + contentWidth, y);
  doc.setLineWidth(0.2);
  doc.line(marginX, y + 1.2, marginX + contentWidth, y + 1.2);
  return y + 4;
}

// Draw School Kop Surat on top of page
async function drawKopSurat(
  doc: jsPDF,
  schoolInfo: SchoolIdentity,
  startY: number = 15
): Promise<number> {
  const marginX = 20;
  const contentWidth = 170;
  let y = startY;

  // Tut Wuri Handayani or School Logo on left if available
  if (schoolInfo.logoUrl && schoolInfo.logoUrl.startsWith('data:image')) {
    try {
      doc.addImage(schoolInfo.logoUrl, 'PNG', marginX, y, 16, 16);
    } catch {
      // ignore logo draw error
    }
  }

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(
    schoolInfo.pemerintahDaerah || 'PEMERINTAH KABUPATEN BANYUMAS',
    105,
    y,
    { align: 'center' }
  );
  y += 4.5;

  doc.text(schoolInfo.dinasPendidikan || 'DINAS PENDIDIKAN', 105, y, {
    align: 'center',
  });
  y += 5.5;

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(schoolInfo.namaSekolah || 'SMP NEGERI 2 GUMELAR', 105, y, {
    align: 'center',
  });
  y += 4.5;

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(schoolInfo.alamatSekolah, 105, y, {
    align: 'center',
    maxWidth: 145,
  });
  y += 5;

  y = drawKopDoubleLine(doc, y, marginX, contentWidth);
  return y;
}

// Helper to pre-convert all question images in parallel
async function preConvertImages(
  questions: QuestionItem[]
): Promise<Record<string, ConvertedImageData>> {
  const map: Record<string, ConvertedImageData> = {};
  await Promise.all(
    questions.map(async (q) => {
      if (q.gambarUrl || q.gambarSvg) {
        try {
          const imgData = await getQuestionImagePng(q);
          if (imgData) {
            map[q.id] = imgData;
          }
        } catch (err) {
          console.warn(`Failed to process image for question #${q.nomor}:`, err);
        }
      }
    })
  );
  return map;
}

// 1. Download Naskah Soal Siswa directly to PDF file with ALL diagrams & images included!
export async function downloadNaskahSoalPdf(
  schoolInfo: SchoolIdentity,
  questions: QuestionItem[],
  filename: string
): Promise<void> {
  // Pre-convert all images/SVGs to PNG with high DPI
  const imageMap = await preConvertImages(questions);

  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  const marginX = 20;
  const contentWidth = 170;
  let y = 15;

  // Kop Surat
  y = await drawKopSurat(doc, schoolInfo, y);

  // Exam Title
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(
    schoolInfo.jenisAsesmen.toUpperCase() || 'NASKAH SOAL ASESMEN SUMATIF IPA',
    105,
    y,
    { align: 'center' }
  );
  y += 4.5;

  doc.setFontSize(9);
  doc.text(
    `TAHUN PELAJARAN ${schoolInfo.tahunPelajaran} • SEMESTER ${schoolInfo.semester.toUpperCase()}`,
    105,
    y,
    { align: 'center' }
  );
  y += 6;

  // Meta Table Box
  doc.setDrawColor(148, 163, 184);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(marginX, y, contentWidth, 16, 1.5, 1.5, 'FD');

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);

  // Col 1
  doc.text(`Mata Pelajaran : ${schoolInfo.mataPelajaran}`, marginX + 3, y + 4.5);
  doc.text(`Kelas / Fase   : Kelas ${schoolInfo.kelas} (Fase D SMP)`, marginX + 3, y + 9);
  doc.text(`Guru Pengampu  : ${schoolInfo.namaGuru}`, marginX + 3, y + 13.5);

  // Col 2
  doc.text(`Alokasi Waktu : ${schoolInfo.alokasiWaktu}`, marginX + 90, y + 4.5);
  doc.text(`Jumlah Soal   : ${questions.length} Butir`, marginX + 90, y + 9);
  doc.text(`Hari / Tgl    : .......................................`, marginX + 90, y + 13.5);

  y += 19;

  // General Instructions
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(241, 245, 249);
  doc.rect(marginX, y, contentWidth, 13, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('PETUNJUK UMUM:', marginX + 2.5, y + 3.5);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.text('1. Berdoalah sebelum mulai mengerjakan soal sesuai keyakinan masing-masing.', marginX + 2.5, y + 6.5);
  doc.text('2. Periksa dan bacalah setiap butir soal dengan teliti sebelum menjawab.', marginX + 2.5, y + 9.5);
  doc.text('3. Laporkan kepada pengawas jika terdapat tulisan atau gambar yang kurang jelas.', marginX + 2.5, y + 12.5);

  y += 16;

  // Questions List
  questions.forEach((q, idx) => {
    y = checkPageBreak(doc, y, 28);

    // Number & Meta
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);

    const typeLabel = q.bentukSoal.replace('_', ' ').toUpperCase();
    doc.text(`${idx + 1}. [${typeLabel}]`, marginX, y);
    y += 4.5;

    // Stimulus if any
    if (q.stimulus) {
      y = checkPageBreak(doc, y, 12);
      doc.setFont('times', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);

      const splitStimulus = doc.splitTextToSize(q.stimulus, contentWidth - 6);
      doc.text(splitStimulus, marginX + 4, y);
      y += splitStimulus.length * 3.8 + 2;
    }

    // EMBED SCIENTIFIC DIAGRAM / IMAGE IF PRESENT
    const imgData = imageMap[q.id];
    if (imgData && imgData.pngUrl) {
      // Calculate scaled dimensions to preserve exact aspect ratio
      const aspect = imgData.aspect || 1.8;
      let imgW = 92; // mm
      let imgH = imgW / aspect;
      // Cap height to 50mm to prevent page waste
      if (imgH > 50) {
        imgH = 50;
        imgW = imgH * aspect;
      }
      if (imgW > contentWidth - 10) {
        imgW = contentWidth - 10;
        imgH = imgW / aspect;
      }

      y = checkPageBreak(doc, y, imgH + 12);
      const imgX = marginX + (contentWidth - imgW) / 2;

      try {
        // Outline frame for image
        doc.setDrawColor(203, 213, 225);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 1.5, y - 1.5, imgW + 3, imgH + 3, 1, 1, 'FD');

        doc.addImage(imgData.pngUrl, 'PNG', imgX, y, imgW, imgH);
        y += imgH + 2.5;

        if (q.gambarDeskripsi) {
          doc.setFont('times', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text(`Gambar: ${q.gambarDeskripsi}`, 105, y, {
            align: 'center',
            maxWidth: contentWidth - 10,
          });
          y += 4;
        }
      } catch (imgErr) {
        console.warn('Failed to embed diagram image to PDF:', imgErr);
      }
    } else if (q.gambarDeskripsi) {
      y = checkPageBreak(doc, y, 8);
      doc.setFont('times', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`[Ilustrasi Diagram]: ${q.gambarDeskripsi}`, marginX + 4, y);
      y += 4.5;
    }

    // Question Prompt
    y = checkPageBreak(doc, y, 12);
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    const splitQ = doc.splitTextToSize(q.pertanyaan, contentWidth - 4);
    doc.text(splitQ, marginX + 4, y);
    y += splitQ.length * 4 + 1.5;

    // Multiple Choice Options (Stacked downward A, B, C, D)
    if (q.bentukSoal === 'pilihan_ganda' && q.pilihan) {
      q.pilihan.forEach((opt, oIdx) => {
        y = checkPageBreak(doc, y, 7);
        const letter = String.fromCharCode(65 + oIdx);
        const cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
        const optText = `${letter}.  ${cleanOpt}`;
        const splitOpt = doc.splitTextToSize(optText, contentWidth - 8);

        doc.setFont('times', 'normal');
        doc.setFontSize(8.5);
        doc.text(splitOpt, marginX + 6, y);
        y += splitOpt.length * 3.8 + 1;
      });
      y += 1.5;
    }

    // Pilihan Ganda Kompleks
    if (q.bentukSoal === 'pilihan_ganda_kompleks' && q.pilihanKompleks) {
      q.pilihanKompleks.forEach((item) => {
        y = checkPageBreak(doc, y, 7);
        doc.rect(marginX + 6, y - 2.5, 3, 3);
        const splitPk = doc.splitTextToSize(item.text, contentWidth - 14);
        doc.text(splitPk, marginX + 11, y);
        y += splitPk.length * 3.8 + 1;
      });
      y += 1.5;
    }

    // Menjodohkan
    if (q.bentukSoal === 'menjodohkan' && q.menjodohkanPairs) {
      y = checkPageBreak(doc, y, 20);
      q.menjodohkanPairs.forEach((pair) => {
        doc.setFont('times', 'normal');
        doc.setFontSize(8);
        doc.text(`[ ] ${pair.left}`, marginX + 6, y);
        doc.text(`--->  ${pair.right}`, marginX + 75, y, { maxWidth: 90 });
        y += 4.5;
      });
      y += 1.5;
    }

    // Benar Salah
    if (q.bentukSoal === 'benar_salah' && q.pernyataanBenarSalah) {
      y = checkPageBreak(doc, y, 20);
      q.pernyataanBenarSalah.forEach((bs, bsIdx) => {
        doc.setFont('times', 'normal');
        doc.setFontSize(8);
        doc.text(
          `[ B / S ]  ${bsIdx + 1}. ${bs.statement}`,
          marginX + 6,
          y,
          { maxWidth: contentWidth - 10 }
        );
        y += 4.5;
      });
      y += 1.5;
    }

    // Isian Singkat
    if (q.bentukSoal === 'isian_singkat') {
      y = checkPageBreak(doc, y, 8);
      doc.setFont('times', 'italic');
      doc.setFontSize(8);
      doc.text(
        'Jawaban: .....................................................................................',
        marginX + 6,
        y
      );
      y += 5;
    }

    // Uraian
    if (q.bentukSoal === 'uraian') {
      y = checkPageBreak(doc, y, 12);
      doc.setDrawColor(203, 213, 225);
      doc.rect(marginX + 6, y, contentWidth - 12, 10);
      doc.setFont('times', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('(Ruang pengerjaan jawaban uraian siswa)', marginX + 8, y + 5.5);
      y += 13;
    }

    // Separator line between questions
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.15);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 4;
  });

  // Signature Block at the end
  y = checkPageBreak(doc, y, 35);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);

  // Left: Kepala Sekolah
  doc.text('Mengetahui,', marginX + 15, y, { align: 'center' });
  doc.text(`Kepala ${schoolInfo.namaSekolah}`, marginX + 15, y + 4, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.text(schoolInfo.namaKepalaSekolah, marginX + 15, y + 22, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.text(
    `NIP. ${schoolInfo.nipKepalaSekolah || '.....................................'}`,
    marginX + 15,
    y + 26,
    { align: 'center' }
  );

  // Right: Guru Pengampu
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Banyumas, ${todayStr}`, marginX + contentWidth - 25, y, { align: 'center' });
  doc.text('Guru Pengampu Mata Pelajaran', marginX + contentWidth - 25, y + 4, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.text(schoolInfo.namaGuru, marginX + contentWidth - 25, y + 22, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.text(
    `NIP. ${schoolInfo.nipGuru || '.....................................'}`,
    marginX + contentWidth - 25,
    y + 26,
    { align: 'center' }
  );

  // Add automated page numbers to footer
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${schoolInfo.namaSekolah} • Naskah Soal IPA Kelas ${schoolInfo.kelas} • Halaman ${i} dari ${totalPages}`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Trigger automated file download directly into the Downloads folder
  const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
  doc.save(safeFilename);
}

// 2. Download Kunci Jawaban & Pembahasan to PDF
export async function downloadKunciJawabanPdf(
  schoolInfo: SchoolIdentity,
  questions: QuestionItem[],
  filename: string
): Promise<void> {
  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  const marginX = 20;
  const contentWidth = 170;
  let y = 15;

  y = await drawKopSurat(doc, schoolInfo, y);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('KUNCI JAWABAN & PEMBAHASAN ASESMEN IPA SMP', 105, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9);
  doc.text(
    `KELAS ${schoolInfo.kelas} • TAHUN PELAJARAN ${schoolInfo.tahunPelajaran} • SEMESTER ${schoolInfo.semester.toUpperCase()}`,
    105,
    y,
    { align: 'center' }
  );
  y += 8;

  // Grid of quick answers
  doc.setFillColor(241, 245, 249);
  doc.rect(marginX, y, contentWidth, 7, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.text('TABEL KUNCI SINGKAT:', marginX + 3, y + 4.5);
  y += 9;

  let xCol = marginX;
  questions.forEach((q, idx) => {
    if (xCol + 28 > marginX + contentWidth) {
      xCol = marginX;
      y += 6;
      y = checkPageBreak(doc, y, 15);
    }
    doc.setFont('times', 'normal');
    doc.setFontSize(7.5);
    doc.text(
      `No.${idx + 1}: ${
        q.kunciJawaban.length > 8 ? q.kunciJawaban.slice(0, 8) + '..' : q.kunciJawaban
      }`,
      xCol,
      y
    );
    xCol += 28;
  });

  y += 10;

  // Detailed Solutions
  questions.forEach((q, idx) => {
    y = checkPageBreak(doc, y, 22);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nomor ${idx + 1}. [${q.materi}] - Bobot: ${q.bobotSkor} Poin`, marginX, y);
    y += 4;

    // Kunci
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(5, 150, 105);
    doc.text(`KUNCI: ${q.kunciJawaban}`, marginX + 4, y);
    y += 4;

    // Pembahasan
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitPembahasan = doc.splitTextToSize(
      `Pembahasan: ${q.pembahasan}`,
      contentWidth - 8
    );
    doc.text(splitPembahasan, marginX + 4, y);
    y += splitPembahasan.length * 3.6 + 4;
  });

  const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
  doc.save(safeFilename);
}

// 3. Download Kartu Soal directly to PDF with all images embedded!
export async function downloadKartuSoalPdf(
  schoolInfo: SchoolIdentity,
  questions: QuestionItem[],
  filename: string
): Promise<void> {
  const imageMap = await preConvertImages(questions);

  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  const marginX = 15;
  const contentWidth = 180;

  for (let i = 0; i < questions.length; i++) {
    if (i > 0) doc.addPage();
    const q = questions[i];
    let y = 14;

    // Card Header Border
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.4);
    doc.rect(marginX, y, contentWidth, 260);

    // Header Title
    doc.setFillColor(241, 245, 249);
    doc.rect(marginX, y, contentWidth, 12, 'FD');
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('KARTU SOAL ASESMEN STANDAR NASIONAL / KURIKULUM MERDEKA', 105, y + 5, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.text(
      `${schoolInfo.namaSekolah} • TAHUN PELAJARAN ${schoolInfo.tahunPelajaran}`,
      105,
      y + 9.5,
      { align: 'center' }
    );
    y += 12;

    // Info Table
    doc.setFontSize(8);
    doc.setFont('times', 'normal');

    // Row 1
    doc.rect(marginX, y, contentWidth / 2, 7);
    doc.rect(marginX + contentWidth / 2, y, contentWidth / 2, 7);
    doc.text(`Satuan Pendidikan : ${schoolInfo.namaSekolah}`, marginX + 2, y + 4.5);
    doc.text(`Penyusun : ${schoolInfo.namaGuru}`, marginX + contentWidth / 2 + 2, y + 4.5);
    y += 7;

    // Row 2
    doc.rect(marginX, y, contentWidth / 2, 7);
    doc.rect(marginX + contentWidth / 2, y, contentWidth / 2, 7);
    doc.text(`Mata Pelajaran    : ${schoolInfo.mataPelajaran}`, marginX + 2, y + 4.5);
    doc.text(`Bentuk Soal : ${q.bentukSoal.toUpperCase()}`, marginX + contentWidth / 2 + 2, y + 4.5);
    y += 7;

    // Row 3
    doc.rect(marginX, y, contentWidth / 2, 7);
    doc.rect(marginX + contentWidth / 2, y, contentWidth / 2, 7);
    doc.text(`Kelas / Semester  : ${schoolInfo.kelas} / ${schoolInfo.semester}`, marginX + 2, y + 4.5);
    doc.text(`Nomor Soal : ${i + 1}  •  Skor: ${q.bobotSkor}`, marginX + contentWidth / 2 + 2, y + 4.5);
    y += 7;

    // Row 4: Kompetensi / Capaian
    doc.rect(marginX, y, contentWidth, 12);
    doc.setFont('times', 'bold');
    doc.text('Tujuan Pembelajaran (TP):', marginX + 2, y + 4);
    doc.setFont('times', 'normal');
    const tpText = doc.splitTextToSize(q.tujuanPembelajaran, contentWidth - 6);
    doc.text(tpText, marginX + 2, y + 8);
    y += 12;

    // Row 5: Materi & Indikator
    doc.rect(marginX, y, contentWidth / 2, 16);
    doc.rect(marginX + contentWidth / 2, y, contentWidth / 2, 16);

    doc.setFont('times', 'bold');
    doc.text('Materi Pokok:', marginX + 2, y + 4);
    doc.setFont('times', 'normal');
    const matText = doc.splitTextToSize(q.materi, contentWidth / 2 - 4);
    doc.text(matText, marginX + 2, y + 8);

    doc.setFont('times', 'bold');
    doc.text('Indikator Soal:', marginX + contentWidth / 2 + 2, y + 4);
    doc.setFont('times', 'normal');
    const indText = doc.splitTextToSize(q.indikatorSoal, contentWidth / 2 - 4);
    doc.text(indText, marginX + contentWidth / 2 + 2, y + 8);
    y += 16;

    // Row 6: Level & Pengalaman
    doc.setFillColor(248, 250, 252);
    doc.rect(marginX, y, contentWidth, 7, 'FD');
    doc.setFont('times', 'bold');
    doc.text(
      `Level Kognitif : ${q.cognitiveLevel}  |  Pengalaman Belajar : ${q.learningExperience} (${q.tingkatKesulitan.toUpperCase()})`,
      105,
      y + 4.5,
      { align: 'center' }
    );
    y += 7;

    // Body: Butir Soal
    doc.setFont('times', 'bold');
    doc.text('RUMUSAN BUTIR SOAL:', marginX + 3, y + 5);
    y += 7;

    if (q.stimulus) {
      doc.setFont('times', 'italic');
      doc.setFontSize(8);
      const stim = doc.splitTextToSize(q.stimulus, contentWidth - 8);
      doc.text(stim, marginX + 4, y);
      y += stim.length * 3.5 + 2;
    }

    // EMBED IMAGE IN KARTU SOAL IF PRESENT!
    const imgData = imageMap[q.id];
    if (imgData && imgData.pngUrl) {
      const aspect = imgData.aspect || 1.8;
      let imgW = 75;
      let imgH = imgW / aspect;
      if (imgH > 36) {
        imgH = 36;
        imgW = imgH * aspect;
      }
      const imgX = marginX + (contentWidth - imgW) / 2;

      try {
        doc.setDrawColor(203, 213, 225);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 1, y - 1, imgW + 2, imgH + 2, 1, 1, 'FD');
        doc.addImage(imgData.pngUrl, 'PNG', imgX, y, imgW, imgH);
        y += imgH + 3;
      } catch (e) {
        console.warn('Kartu soal image embed error:', e);
      }
    }

    // Question Text
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    const qSplit = doc.splitTextToSize(q.pertanyaan, contentWidth - 8);
    doc.text(qSplit, marginX + 4, y);
    y += qSplit.length * 3.8 + 2;

    // Options if PG
    if (q.bentukSoal === 'pilihan_ganda' && q.pilihan) {
      q.pilihan.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        const optText = `${letter}.  ${opt.replace(/^[A-D]\.\s*/, '')}`;
        doc.text(doc.splitTextToSize(optText, contentWidth - 10), marginX + 6, y);
        y += 4;
      });
    }

    // Bottom section: Kunci & Penskoran
    y = Math.max(y + 2, 220);
    doc.setDrawColor(30, 41, 59);
    doc.line(marginX, y, marginX + contentWidth, y);

    doc.rect(marginX, y, contentWidth / 2, 34);
    doc.rect(marginX + contentWidth / 2, y, contentWidth / 2, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.text('KUNCI JAWABAN & PEMBAHASAN:', marginX + 2, y + 4.5);
    doc.setFont('times', 'normal');
    doc.text(`Kunci: ${q.kunciJawaban}`, marginX + 2, y + 9);
    const pemb = doc.splitTextToSize(`Pembahasan: ${q.pembahasan}`, contentWidth / 2 - 4);
    doc.text(pemb.slice(0, 5), marginX + 2, y + 13.5);

    doc.setFont('times', 'bold');
    doc.text('PEDOMAN PENSKORAN:', marginX + contentWidth / 2 + 2, y + 4.5);
    doc.setFont('times', 'normal');
    doc.text(`Skor Maksimal: ${q.bobotSkor}`, marginX + contentWidth / 2 + 2, y + 9);
    const rubrik = q.rubrikPenskoran && q.rubrikPenskoran.length > 0
      ? q.rubrikPenskoran.join('\n')
      : `Jawaban benar = ${q.bobotSkor}, Salah = 0`;
    const rSplit = doc.splitTextToSize(rubrik, contentWidth / 2 - 4);
    doc.text(rSplit.slice(0, 4), marginX + contentWidth / 2 + 2, y + 13.5);
  }

  const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}_KartuSoal.pdf`;
  doc.save(safeFilename);
}
