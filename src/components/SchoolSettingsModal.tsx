import React, { useState } from 'react';
import { X, Upload, Check, Image as ImageIcon, School, User, Calendar, Clock, RefreshCw } from 'lucide-react';
import { SchoolIdentity } from '../types';

interface SchoolSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolInfo: SchoolIdentity;
  onSave: (updated: SchoolIdentity) => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  isOpen,
  onClose,
  schoolInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState<SchoolIdentity>({ ...schoolInfo });
  const [logoPreview, setLogoPreview] = useState<string>(schoolInfo.logoUrl);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetLogo = (type: string) => {
    // Generate clean SVG data URI for preset logos
    let svgContent = '';
    if (type === 'tutwuri') {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="#1e3a8a" stroke="#fbbf24" stroke-width="4"/>
        <path d="M50 16 L22 40 L34 84 L66 84 L78 40 Z" fill="#fbbf24"/>
        <circle cx="50" cy="46" r="14" fill="#1e3a8a"/>
        <path d="M50 36 L54 44 L62 44 L56 50 L58 58 L50 52 L42 58 L44 50 L38 44 L46 44 Z" fill="#fbbf24"/>
        <text x="50" y="93" font-size="8" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">TUT WURI HANDAYANI</text>
      </svg>`;
    } else if (type === 'ipa') {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="#065f46" stroke="#34d399" stroke-width="4"/>
        <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="#6ee7b7" stroke-width="3" transform="rotate(30 50 50)"/>
        <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="#6ee7b7" stroke-width="3" transform="rotate(-30 50 50)"/>
        <circle cx="50" cy="50" r="10" fill="#fbbf24"/>
        <text x="50" y="88" font-size="9" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">IPA SMP</text>
      </svg>`;
    } else {
      svgContent = '';
    }

    if (svgContent) {
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
      setLogoPreview(dataUri);
      setFormData((prev) => ({ ...prev, logoUrl: dataUri }));
    } else {
      setLogoPreview('');
      setFormData((prev) => ({ ...prev, logoUrl: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <School className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">Pengaturan Identitas & Kop Surat Sekolah</h2>
              <p className="text-xs text-indigo-200">
                Data resmi untuk Kop Naskah Soal, Lembar Jawaban, Kisi-Kisi, dan Kartu Soal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Logo Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Unggah Logo Sekolah (Kop Surat)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-indigo-300 bg-white flex items-center justify-center p-2 overflow-hidden shadow-inner flex-shrink-0">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Sekolah"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                    <span className="text-[10px]">Logo Default</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                    <Upload className="w-4 h-4" />
                    Pilih File Gambar (PNG/JPG)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => handlePresetLogo('clear')}
                      className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors"
                    >
                      Hapus Logo
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                  <span>Atau pilih logo siap pakai:</span>
                  <button
                    type="button"
                    onClick={() => handlePresetLogo('tutwuri')}
                    className="px-2.5 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium border border-blue-200"
                  >
                    Tut Wuri Handayani
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetLogo('ipa')}
                    className="px-2.5 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium border border-emerald-200"
                  >
                    Logo IPA Sains
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* School Name & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pemerintah Daerah / Provinsi
              </label>
              <input
                type="text"
                value={formData.pemerintahDaerah}
                onChange={(e) => setFormData({ ...formData, pemerintahDaerah: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Contoh: PEMERINTAH KABUPATEN BANYUMAS"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dinas Pendidikan
              </label>
              <input
                type="text"
                value={formData.dinasPendidikan}
                onChange={(e) => setFormData({ ...formData, dinasPendidikan: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Contoh: DINAS PENDIDIKAN"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Sekolah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaSekolah}
                onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800 text-sm"
                placeholder="Contoh: SMP NEGERI 2 GUMELAR"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Sekolah Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.alamatSekolah}
                onChange={(e) => setFormData({ ...formData, alamatSekolah: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Contoh: Jl. Raya Gumelar No. 12, Kec. Gumelar, Kab. Banyumas, Jawa Tengah 53165"
                required
              />
            </div>
          </div>

          {/* Academic Year, Semester, Assessment Type, Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tahun Pelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.tahunPelajaran}
                onChange={(e) => setFormData({ ...formData, tahunPelajaran: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="2025/2026"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as 'Ganjil' | 'Genap' })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="Ganjil">Semester Ganjil</option>
                <option value="Genap">Semester Genap</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alokasi Waktu Ujian
              </label>
              <input
                type="text"
                value={formData.alokasiWaktu}
                onChange={(e) => setFormData({ ...formData, alokasiWaktu: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Contoh: 90 Menit"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenis Asesmen / Nama Ujian
              </label>
              <input
                type="text"
                value={formData.jenisAsesmen}
                onChange={(e) => setFormData({ ...formData, jenisAsesmen: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Contoh: Sumatif Akhir Semester (SAS) Ganjil / Asesmen Sumatif Tengah Semester (STS)"
                required
              />
            </div>
          </div>

          {/* Principal and Teacher Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <User className="w-4 h-4 text-indigo-600" />
                Kepala Sekolah
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Kepala Sekolah & Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaKepalaSekolah}
                  onChange={(e) => setFormData({ ...formData, namaKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  placeholder="Nopidha Ardyansah, S.Pd., M.Pd."
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={formData.nipKepalaSekolah}
                  onChange={(e) => setFormData({ ...formData, nipKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  placeholder="19780512 200501 1 008"
                />
              </div>
            </div>

            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <User className="w-4 h-4 text-emerald-600" />
                Guru Pengampu IPA
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Guru Pengampu & Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaGuru}
                  onChange={(e) => setFormData({ ...formData, namaGuru: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                  placeholder="Nama Lengkap Guru IPA"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  NIP Guru Pengampu
                </label>
                <input
                  type="text"
                  value={formData.nipGuru}
                  onChange={(e) => setFormData({ ...formData, nipGuru: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                  placeholder="19850314 201001 2 015"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Simpan Identitas Sekolah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
