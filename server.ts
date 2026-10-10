import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Generate IPA SMP Exam endpoint
app.post('/api/generate-soal', async (req, res) => {
  try {
    const {
      kelas = '8',
      semester = 'Ganjil',
      subDisiplinIPA = 'Terpadu',
      topikMateri = 'Sistem Organ Manusia & Usaha Pesawat Sederhana',
      tujuanPembelajaran = 'Menganalisis keterkaitan struktur dan fungsi organ serta prinsip pesawat sederhana.',
      bentukSoalDipilih = ['pilihan_ganda', 'uraian'],
      jumlahSoalPerBentuk = { pilihan_ganda: 5, uraian: 2 },
      sertakanGambar = true,
      jumlahSoalBergambar = 2,
      cognitiveLevelsDipilih = ['LOTS', 'MOTS', 'HOTS'],
      learningExperiencesDipilih = ['Memahami', 'Mengaplikasi', 'Merefleksi'],
      tingkatKesulitanUtama = 'Kombinasi Seimbang',
      schoolInfo = {}
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined, returning fallback structured questions');
      return res.status(200).json({
        success: true,
        source: 'local_engine',
        message: 'Generated using local IPA curriculum engine (API key not configured).',
        data: generateLocalQuestions({
          kelas,
          semester,
          subDisiplinIPA,
          topikMateri,
          tujuanPembelajaran,
          bentukSoalDipilih,
          jumlahSoalPerBentuk,
          sertakanGambar,
          jumlahSoalBergambar,
          cognitiveLevelsDipilih,
          learningExperiencesDipilih,
        }),
      });
    }

    // Build targeted prompt for Gemini 3.8 Flash
    const systemPrompt = `Anda adalah Tim Pakar Pengembang Kurikulum dan Pembuat Soal Asesmen Nasional Kemendikbudristek untuk Mata Pelajaran IPA SMP (Fase D: Kelas 7, 8, dan 9).
Tugas Anda adalah menyusun paket naskah soal asesmen resmi lengkap dan komprehensif berstandar Kurikulum Merdeka dan Kurikulum Nasional.
Soal harus berbasis stimulus saintifik otentik (kontekstual dunia nyata, tabel data, eksperimen, grafik, fenomena alam, atau diagram).
Setiap butir soal WAJIB memiliki:
1. Capaian / Indikator Soal terukur
2. Level Kognitif: ${cognitiveLevelsDipilih.join(', ')}
3. Pengalaman Belajar: ${learningExperiencesDipilih.join(', ')} (jelaskan apakah menguji pemahaman dasar, aplikasi dalam konteks, atau refleksi kritis)
4. Tingkat Kesulitan: Sulit, Sedang, atau Rendah
5. Kunci Jawaban yang pasti dan akurat
6. Pembahasan saintifik mendalam dengan alasan ilmiah dan rumus (jika hitungan fisika/kimia)
7. Rubrik pedoman penskoran
8. Bentuk soal yang diminta: ${bentukSoalDipilih.join(', ')}.

PENTING UNTUK BENTUK SOAL:
- pilihan_ganda: memiliki 4 pilihan (A, B, C, D) dengan satu jawaban benar.
- pilihan_ganda_kompleks: memiliki 4 pernyataan atau opsi centang, di mana terdapat lebih dari 1 opsi yang benar (misal 2 atau 3 benar).
- isian_singkat: pertanyaan ringkas dengan jawaban berupa istilah sains atau angka hitungan pasti.
- uraian: pertanyaan esai analitis dengan sub-pertanyaan bertingkat (misal a, b, c) disertai rubrik skor 0-5.
- menjodohkan: terdiri dari kolom premis kiri dan respon kanan (minimal 3-4 pasang).
- benar_salah: terdiri dari 3-4 pernyataan ilmiah yang harus ditentukan status Benar (B) atau Salah (S).

Kembalikan output HANYA dalam format JSON valid yang dapat di-JSON.parse(), tanpa formatting markdown di luar blok JSON.`;

    const userPrompt = `Buatkan butir-butir soal IPA SMP dengan rincian berikut:
- Jenjang: SMP
- Kelas: ${kelas}
- Semester: ${semester}
- Sub-Disiplin IPA: ${subDisiplinIPA}
- Topik/Materi: ${topikMateri}
- Tujuan Pembelajaran (TP): ${tujuanPembelajaran}
- Bentuk Soal dan Jumlah yang diminta:
${bentukSoalDipilih.map((b: string) => `  * ${b}: ${jumlahSoalPerBentuk[b] || 5} butir`).join('\n')}
- Level Kognitif: ${cognitiveLevelsDipilih.join(', ')}
- Target Pengalaman Belajar: ${learningExperiencesDipilih.join(', ')}
- Soal Bergambar: ${sertakanGambar ? `Ya, sediakan minimal ${jumlahSoalBergambar} butir soal dengan stimulus diagram ilmiah / gambar deskriptif (sertakan deskripsi visual yang jelas).` : 'Tidak'}

FORMAT JSON YANG DIHARAPKAN:
{
  "questions": [
    {
      "nomor": 1,
      "bentukSoal": "pilihan_ganda",
      "tingkatKesulitan": "rendah",
      "cognitiveLevel": "LOTS",
      "learningExperience": "Memahami",
      "learningTargetExplanation": "Menguji pemahaman konsep dasar...",
      "materi": "${topikMateri}",
      "tujuanPembelajaran": "${tujuanPembelajaran}",
      "indikatorSoal": "Disajikan...",
      "stimulus": "Teks pengantar atau kasus...",
      "pertanyaan": "Pertanyaan soal...",
      "gambarDeskripsi": "Deskripsi visual diagram jika soal bergambar (kosongkan jika tidak)",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "pilihanKompleks": [{"text": "Pernyataan...", "isCorrect": true}],
      "kunciJawaban": "Jawaban lengkap",
      "pembahasan": "Penjelasan ilmiah detail...",
      "bobotSkor": 1,
      "menjodohkanPairs": [{"left": "...", "right": "..."}],
      "pernyataanBenarSalah": [{"statement": "...", "isCorrect": true}],
      "rubrikPenskoran": ["Kriteria skor..."]
    }
  ]
}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = geminiResponse.text?.trim() || '';
    let parsedData: any = null;

    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      // Try regex extracting json block if any backticks
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse Gemini JSON output');
      }
    }

    const questions = Array.isArray(parsedData?.questions) ? parsedData.questions : [];

    // Ensure questions have ids and fallback formatting
    const formattedQuestions = questions.map((q: any, idx: number) => ({
      ...q,
      id: q.id || `ai-q-${Date.now()}-${idx + 1}`,
      nomor: idx + 1,
      bobotSkor: q.bobotSkor || (q.bentukSoal === 'uraian' ? 5 : q.bentukSoal === 'pilihan_ganda' ? 1 : 2),
    }));

    return res.status(200).json({
      success: true,
      source: 'gemini-3.8-flash',
      data: formattedQuestions,
    });
  } catch (error: any) {
    console.error('Error generating questions with Gemini:', error);
    // Provide graceful fallback so teacher isn't interrupted
    const fallback = generateLocalQuestions(req.body);
    return res.status(200).json({
      success: true,
      source: 'local_fallback',
      warning: 'Fallback engine used due to AI connection: ' + (error?.message || 'unknown error'),
      data: fallback,
    });
  }
});

// Intelligent local generation engine based on IPA SMP curriculum
function generateLocalQuestions(config: any) {
  const {
    kelas = '8',
    subDisiplinIPA = 'Terpadu',
    topikMateri = 'Sistem Organ & Mekanika IPA SMP',
    tujuanPembelajaran = 'Menganalisis fenomena sains dalam kehidupan sehari-hari.',
    bentukSoalDipilih = ['pilihan_ganda', 'uraian'],
    jumlahSoalPerBentuk = {},
    sertakanGambar = true,
    jumlahSoalBergambar = 2,
    cognitiveLevelsDipilih = ['LOTS', 'MOTS', 'HOTS'],
    learningExperiencesDipilih = ['Memahami', 'Mengaplikasi', 'Merefleksi'],
  } = config;

  const results: any[] = [];
  let currentNum = 1;
  let remainingImages = sertakanGambar ? Number(jumlahSoalBergambar) || 2 : 0;

  for (const b of bentukSoalDipilih) {
    const targetCount = Number(jumlahSoalPerBentuk[b]) || 5;

    for (let i = 0; i < targetCount; i++) {
      const cog = cognitiveLevelsDipilih[(currentNum - 1) % cognitiveLevelsDipilih.length] || 'MOTS';
      const exp = learningExperiencesDipilih[(currentNum - 1) % learningExperiencesDipilih.length] || 'Mengaplikasi';
      const hasImage = remainingImages > 0;
      if (hasImage) remainingImages--;

      const expExplanation = exp === 'Memahami'
        ? 'Menguji pemahaman konsep dasar dan terminologi sains IPA.'
        : exp === 'Mengaplikasi'
        ? 'Menguji kemampuan menerapkan prinsip dan hukum sains dalam konteks pemecahan masalah.'
        : 'Menguji kemampuan analisis kritis dan refleksi dampak sains/teknologi terhadap manusia & lingkungan.';

      const difficulty = cog === 'LOTS' ? 'rendah' : cog === 'MOTS' ? 'sedang' : 'sulit';

      if (b === 'pilihan_ganda') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'pilihan_ganda',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Peserta didik mampu ${exp.toLowerCase()} konsep ${topikMateri.split(',')[0] || 'IPA'} berdasarkan stimulus fenomena fisis/biologis.`,
          stimulus: `Dua orang siswa SMP melakukan eksperimen laboratorium untuk membuktikan keterkaitan besaran fisis dan biologis pada materi ${topikMateri}.`,
          pertanyaan: `Berdasarkan pengamatan pada materi ${topikMateri}, manakah pernyataan yang paling tepat mengenai hubungan variabel yang terjadi?`,
          gambarDeskripsi: hasImage ? `Diagram skematis alat percobaan IPA dan grafik hubungan variabel pada materi ${topikMateri}.` : undefined,
          pilihan: [
            `A. Nilai variabel berbanding lurus secara proporsional dengan peningkatan energi sistem`,
            `B. Terjadi pengurangan massa zat secara spontan tanpa pelepasan energi panas`,
            `C. Sistem mengalami kesetimbangan dinamis saat gaya reaksi melebihi gaya aksi`,
            `D. Tidak terjadi perubahan apapun karena zat berada dalam ruang hampa udara`
          ],
          kunciJawaban: 'A',
          pembahasan: `Secara kaidah ilmiah IPA SMP, peningkatan energi dalam sistem akan sebanding dengan peningkatan variabel terikat (berbanding lurus). Hal ini sesuai dengan hukum kekekalan energi dan prinsip termodinamika dasar.`,
          bobotSkor: 1,
          rubrikPenskoran: ['Skor 1: Memilih A', 'Skor 0: Memilih opsi selain A']
        });
      } else if (b === 'pilihan_ganda_kompleks') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'pilihan_ganda_kompleks',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Disajikan beberapa pernyataan terkait ${topikMateri}, peserta didik dapat menganalisis kebenaran multi-fakta secara kritis.`,
          stimulus: `Dalam kajian sains modern tentang ${topikMateri}, para ilmuwan menemukan beberapa prinsip dasar yang saling berinteraksi.`,
          pertanyaan: `Pilihlah seluruh pernyataan berikut yang bernilai BENAR terkait prinsip sains pada ${topikMateri}! (Pilihan benar lebih dari satu):`,
          gambarDeskripsi: hasImage ? `Tabel data hasil pengukuran dan diagram keterkaitan konsep sains.` : undefined,
          pilihanKompleks: [
            { text: `Proses tersebut mematuhi hukum kekekalan materi dan energi secara konsisten.`, isCorrect: true },
            { text: `Faktor lingkungan seperti suhu dan tekanan berpengaruh nyata terhadap laju reaksi/perubahan.`, isCorrect: true },
            { text: `Reaksi hanya berlangsung satu arah dan mustahil mencapai kondisi kesetimbangan.`, isCorrect: false },
            { text: `Struktur mikroskopis materi menentukan karakteristik makroskopis yang teramati.`, isCorrect: true },
          ],
          kunciJawaban: 'Pernyataan 1, 2, dan 4 bernilai BENAR.',
          pembahasan: 'Pernyataan 1, 2, dan 4 benar sesuai konsep dasar IPA terpadu. Pernyataan 3 keliru karena banyak proses di alam bersifat bolak-balik (reversibel) dan dinamis.',
          bobotSkor: 3,
          rubrikPenskoran: [
            'Skor 3: Memilih ketiga opsi benar tanpa opsi salah',
            'Skor 2: Memilih 2 opsi benar',
            'Skor 1: Memilih 1 opsi benar',
            'Skor 0: Tidak menjawab atau salah'
          ]
        });
      } else if (b === 'isian_singkat') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'isian_singkat',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Peserta didik mampu menyebutkan istilah sains kunci atau hasil perhitungan numerik pada ${topikMateri}.`,
          stimulus: `Pengamatan kuantitatif dilakukan untuk mengukur besaran fisis pada topik ${topikMateri}.`,
          pertanyaan: `Nama satuan internasional (SI) atau istilah ilmiah organ/proses utama yang berperan dalam peristiwa ${topikMateri} adalah ...`,
          kunciJawaban: 'Joule / Newton / Selulosa (disesuaikan konsep materi terkait)',
          pembahasan: 'Istilah tersebut merupakan standar nomenklatur internasional yang dipelajari pada silabus IPA SMP Fase D.',
          bobotSkor: 2,
          rubrikPenskoran: [
            'Skor 2: Menuliskan kata kunci/angka tepat',
            'Skor 1: Menuliskan konsep mendekati',
            'Skor 0: Salah atau kosong'
          ]
        });
      } else if (b === 'uraian') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'uraian',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Peserta didik mampu menguraikan mekanisme dan memberikan solusi berbasis sains terkait permasalahan ${topikMateri}.`,
          stimulus: `Sebuah studi kasus di lingkungan sekitar menunjukkan adanya fenomena perubahan terkait ${topikMateri} yang berdampak pada kehidupan sehari-hari masyarakat.`,
          pertanyaan: `Berdasarkan konsep IPA yang telah Anda pelajari:\na. Uraikan mekanisme ilmiah yang mendasari peristiwa pada topik ${topikMateri}!\nb. Analisislah dua faktor utama yang mempercepat atau memperlambat proses tersebut!\nc. Berikan sebuah contoh penerapan praktis teknologi ramah lingkungan yang memanfaatkan prinsip sains tersebut!`,
          kunciJawaban: 'a. Mekanisme ilmiah dijelaskan secara runtut dengan prinsip sebab-akibat fisika/biologi.\nb. Dua faktor utama: luas permukaan sentuh/suhu dan keberadaan katalis/gaya dorong.\nc. Contoh penerapan: teknologi biokonversi atau alat mekanik sederhana efisiensi energi.',
          pembahasan: 'Pemecahan masalah memerlukan penguasaan konsep integratif sains antara teori dasar dan aplikasi kontekstual di masyarakat.',
          bobotSkor: 5,
          rubrikPenskoran: [
            'Skor 5: Jawaban a, b, dan c lengkap dan ilmiah',
            'Skor 3-4: Menjawab 2 poin dengan benar',
            'Skor 1-2: Menjawab 1 poin secara terbatas',
            'Skor 0: Tidak menjawab'
          ]
        });
      } else if (b === 'menjodohkan') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'menjodohkan',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Peserta didik mampu memasangkan konsep/alat dengan fungsi atau perannya pada ${topikMateri}.`,
          stimulus: `Berikut disajikan tabel konsep komponen dan peranan masing-masing dalam kajian ${topikMateri}.`,
          pertanyaan: `Pasangkanlah butir pada Kolom A dengan penjelasan fungsinya yang sesuai pada Kolom B!`,
          menjodohkanPairs: [
            { left: '1. Komponen Utama A', right: 'Penerima dan penyerap rangsang/energi awal' },
            { left: '2. Komponen Pengatur B', right: 'Mengendalikan laju perpindahan dan reaksi' },
            { left: '3. Saluran Penghubung C', right: 'Mentransfer materi dan energi ke target sasaran' },
            { left: '4. Komponen Pelindung D', right: 'Mencegah kerusakan akibat tekanan dari luar' },
          ],
          kunciJawaban: '1 pasang dengan respon 1, 2 dengan respon 2, 3 dengan respon 3, 4 dengan respon 4',
          pembahasan: 'Setiap komponen memiliki spesialisasi peran fungsional yang saling mendukung sistem kerja secara komprehensif.',
          bobotSkor: 4,
          rubrikPenskoran: [
            'Skor 4: Benar semua pasangan',
            'Skor 1-3: Skor 1 per pasangan benar',
            'Skor 0: Salah semua'
          ]
        });
      } else if (b === 'benar_salah') {
        results.push({
          id: `q-gen-${currentNum}`,
          nomor: currentNum,
          bentukSoal: 'benar_salah',
          tingkatKesulitan: difficulty,
          cognitiveLevel: cog,
          learningExperience: exp,
          learningTargetExplanation: expExplanation,
          materi: topikMateri,
          tujuanPembelajaran: tujuanPembelajaran,
          indikatorSoal: `Peserta didik mampu mengevaluasi kebenaran fakta dan prinsip ilmiah terkait ${topikMateri}.`,
          stimulus: `Bacalah dengan cermat pernyataan ilmiah terkait topik ${topikMateri} berikut ini.`,
          pertanyaan: `Berikan tanda centang (✓) pada kolom BENAR jika pernyataan tepat, atau SALAH jika pernyataan keliru!`,
          pernyataanBenarSalah: [
            { statement: `Prinsip dasar pada ${topikMateri} berlaku universal dalam kondisi standar di alam.`, isCorrect: true },
            { statement: `Energi kinetik partikel selalu berkurang saat suhu sistem ditingkatkan.`, isCorrect: false },
            { statement: `Hukum kekekalan massa berlaku pada sistem reaksi tertutup.`, isCorrect: true },
            { statement: `Perubahan kimia selalu menghasilkan zat baru dengan sifat yang berbeda dari zat semula.`, isCorrect: true },
          ],
          kunciJawaban: '1 = Benar, 2 = Salah, 3 = Benar, 4 = Benar',
          pembahasan: 'Pernyataan 2 salah karena kenaikan suhu justru meningkatkan getaran dan energi kinetik rata-rata partikel zat.',
          bobotSkor: 4,
          rubrikPenskoran: [
            'Skor 4: Benar semua pernyataan',
            'Skor 1-3: 1 skor per pernyataan benar',
            'Skor 0: Salah semua'
          ]
        });
      }

      currentNum++;
    }
  }

  return results;
}

// Development Vite middleware or Production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
