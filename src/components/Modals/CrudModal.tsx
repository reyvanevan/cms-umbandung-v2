import React from 'react';
import { X, Save } from 'lucide-react';
import { type TabType } from '../../App';
import { handleImageUpload } from '../../lib/supabase';
import {
  type DbNews,
  type DbEvent,
  type DbTestimonial,
  type DbPartner,
  type DbLandingStat,
  type DbLandingPortfolioItem,
  type DbDosen,
  type DbKurikulumCourse,
  type DbKurikulumPlo,
  type DbKurikulumProfile,
  type DbTaStep,
  type DbPrestasi,
  type DbPublikasiDosen,
  type DbKegiatanDosen,
  type DbKegiatanMahasiswa,
  type DbAlumni,
  type DbStatistikMaba,
  type DbLaboratorium,
  type DbKknDocument
} from '../../lib/mockData';

interface CrudModalProps {
  activeModal: 'create' | 'edit' | null;
  activeTab: TabType;
  connectionMode: 'supabase' | 'mock';
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newsForm: Omit<DbNews, 'id' | 'created_at'>;
  setNewsForm: React.Dispatch<React.SetStateAction<Omit<DbNews, 'id' | 'created_at'>>>;
  eventForm: Omit<DbEvent, 'id' | 'created_at'>;
  setEventForm: React.Dispatch<React.SetStateAction<Omit<DbEvent, 'id' | 'created_at'>>>;
  testimonialForm: Omit<DbTestimonial, 'id' | 'created_at'>;
  setTestimonialForm: React.Dispatch<React.SetStateAction<Omit<DbTestimonial, 'id' | 'created_at'>>>;
  partnerForm: Omit<DbPartner, 'id' | 'created_at'>;
  setPartnerForm: React.Dispatch<React.SetStateAction<Omit<DbPartner, 'id' | 'created_at'>>>;
  statForm: Omit<DbLandingStat, 'id'>;
  setStatForm: React.Dispatch<React.SetStateAction<Omit<DbLandingStat, 'id'>>>;
  portfolioForm: Omit<DbLandingPortfolioItem, 'id'>;
  setPortfolioForm: React.Dispatch<React.SetStateAction<Omit<DbLandingPortfolioItem, 'id'>>>;
  dosenForm?: Omit<DbDosen, 'id' | 'created_at'>;
  setDosenForm?: React.Dispatch<React.SetStateAction<Omit<DbDosen, 'id' | 'created_at'>>>;
  courseForm?: Omit<DbKurikulumCourse, 'id' | 'created_at'>;
  setCourseForm?: React.Dispatch<React.SetStateAction<Omit<DbKurikulumCourse, 'id' | 'created_at'>>>;
  ploForm?: Omit<DbKurikulumPlo, 'id' | 'created_at'>;
  setPloForm?: React.Dispatch<React.SetStateAction<Omit<DbKurikulumPlo, 'id' | 'created_at'>>>;
  profileForm?: Omit<DbKurikulumProfile, 'id' | 'created_at'>;
  setProfileForm?: React.Dispatch<React.SetStateAction<Omit<DbKurikulumProfile, 'id' | 'created_at'>>>;
  stepForm?: Omit<DbTaStep, 'id' | 'created_at'>;
  setStepForm?: React.Dispatch<React.SetStateAction<Omit<DbTaStep, 'id' | 'created_at'>>>;
  prestasiForm?: Omit<DbPrestasi, 'id' | 'created_at'>;
  setPrestasiForm?: React.Dispatch<React.SetStateAction<Omit<DbPrestasi, 'id' | 'created_at'>>>;
  publikasiForm?: Omit<DbPublikasiDosen, 'id' | 'created_at'>;
  setPublikasiForm?: React.Dispatch<React.SetStateAction<Omit<DbPublikasiDosen, 'id' | 'created_at'>>>;
  kegiatanDosenForm?: Omit<DbKegiatanDosen, 'id' | 'created_at'>;
  setKegiatanDosenForm?: React.Dispatch<React.SetStateAction<Omit<DbKegiatanDosen, 'id' | 'created_at'>>>;
  kegiatanMahasiswaForm?: Omit<DbKegiatanMahasiswa, 'id' | 'created_at'>;
  setKegiatanMahasiswaForm?: React.Dispatch<React.SetStateAction<Omit<DbKegiatanMahasiswa, 'id' | 'created_at'>>>;
  alumniForm?: Omit<DbAlumni, 'id' | 'created_at'>;
  setAlumniForm?: React.Dispatch<React.SetStateAction<Omit<DbAlumni, 'id' | 'created_at'>>>;
  statistikMabaForm?: Omit<DbStatistikMaba, 'id' | 'created_at'>;
  setStatistikMabaForm?: React.Dispatch<React.SetStateAction<Omit<DbStatistikMaba, 'id' | 'created_at'>>>;
  laboratoriumForm?: Omit<DbLaboratorium, 'id' | 'created_at'>;
  setLaboratoriumForm?: React.Dispatch<React.SetStateAction<Omit<DbLaboratorium, 'id' | 'created_at'>>>;
  kknDocumentForm?: Omit<DbKknDocument, 'id' | 'created_at'>;
  setKknDocumentForm?: React.Dispatch<React.SetStateAction<Omit<DbKknDocument, 'id' | 'created_at'>>>;
}

export default function CrudModal({
  activeModal,
  activeTab,
  connectionMode,
  onClose,
  onSubmit,
  newsForm,
  setNewsForm,
  eventForm,
  setEventForm,
  testimonialForm,
  setTestimonialForm,
  partnerForm,
  setPartnerForm,
  statForm,
  setStatForm,
  portfolioForm,
  setPortfolioForm,
  dosenForm,
  setDosenForm,
  courseForm,
  setCourseForm,
  ploForm,
  setPloForm,
  profileForm,
  setProfileForm,
  stepForm,
  setStepForm,
  prestasiForm,
  setPrestasiForm,
  publikasiForm,
  setPublikasiForm,
  kegiatanDosenForm,
  setKegiatanDosenForm,
  kegiatanMahasiswaForm,
  setKegiatanMahasiswaForm,
  alumniForm,
  setAlumniForm,
  statistikMabaForm,
  setStatistikMabaForm,
  laboratoriumForm,
  setLaboratoriumForm,
  kknDocumentForm,
  setKknDocumentForm
}: CrudModalProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploadSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const isSupabase = connectionMode === 'supabase';
      const url = await handleImageUpload(file, isSupabase);
      onUploadSuccess(url);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
    }
  };

  if (!activeModal) return null;

  const getTabTitle = () => {
    switch (activeTab) {
      case 'news': return 'Artikel Berita';
      case 'events': return 'Agenda Kegiatan';
      case 'testimonials': return 'Testimoni Alumni';
      case 'partners': return 'Mitra Industri';
      case 'landing_stats': return 'Statistik Ribbon';
      case 'landing_portfolio': return 'Portofolio';
      case 'dosen': return 'Dosen & Staff';
      case 'kurikulum_courses': return 'Mata Kuliah';
      case 'kurikulum_plos': return 'CPL Akademik';
      case 'kurikulum_profiles': return 'Profil Lulusan';
      case 'tugas_akhir_steps': return 'Tahapan Tugas Akhir';
      case 'prestasi': return 'Prestasi';
      case 'publikasi_dosen': return 'Publikasi Dosen';
      case 'kegiatan_dosen': return 'Kegiatan Dosen';
      case 'kegiatan_mahasiswa': return 'Kegiatan Mahasiswa';
      case 'alumni': return 'Alumni';
      case 'statistik_maba': return 'Statistik Maba';
      case 'laboratorium': return 'Laboratorium';
      case 'kkn_documents': return 'Dokumen KKN';
      default: return 'Data';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white border border-gray-100 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden glass-card">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {activeModal === 'create' ? 'Tambah' : 'Edit'} {getTabTitle()}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* NEWS FIELDS */}
          {activeTab === 'news' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Berita (Bahasa Indonesia)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Berita (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={newsForm.title_en || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori (English)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={newsForm.category_en || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, category_en: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ringkasan Berita (Bahasa Indonesia)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[80px]"
                  value={newsForm.snippet}
                  onChange={(e) => setNewsForm({ ...newsForm, snippet: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ringkasan Berita (English)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[80px]"
                  value={newsForm.snippet_en || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, snippet_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Tampilan (contoh: 12 Okt 2026)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Foto Berita</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {newsForm.img_src && (
                      <img src={newsForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, (url) => setNewsForm({ ...newsForm, img_src: url }))}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                        disabled={isUploading}
                      />
                      <input
                        type="text"
                        placeholder="Atau masukkan URL gambar langsung..."
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                        value={newsForm.img_src}
                        onChange={(e) => setNewsForm({ ...newsForm, img_src: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                  {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
                </div>
              </div>
            </>
          )}

          {/* EVENTS FIELDS */}
          {activeTab === 'events' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hari / Tanggal Angka (contoh: 24)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={eventForm.date_day}
                    onChange={(e) => setEventForm({ ...eventForm, date_day: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bulan Singkat (contoh: OKT)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={eventForm.date_month}
                    onChange={(e) => setEventForm({ ...eventForm, date_month: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Agenda (Bahasa Indonesia)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Agenda (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={eventForm.title_en || ''}
                  onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Lokasi (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Lokasi (English)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={eventForm.location_en || ''}
                    onChange={(e) => setEventForm({ ...eventForm, location_en: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          {/* TESTIMONIALS FIELDS */}
          {activeTab === 'testimonials' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Isi Kutipan Testimoni (Bahasa Indonesia)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[90px]"
                  value={testimonialForm.testimonial}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Isi Kutipan Testimoni (English)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[90px]"
                  value={testimonialForm.testimonial_en || ''}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Alumni & Jabatan (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={testimonialForm.by}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, by: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Alumni & Jabatan (English)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={testimonialForm.by_en || ''}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, by_en: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Alumni</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {testimonialForm.img_src && (
                    <img src={testimonialForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setTestimonialForm({ ...testimonialForm, img_src: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL avatar langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={testimonialForm.img_src}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, img_src: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* PARTNERS FIELDS */}
          {activeTab === 'partners' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 mb-1 block">Nama Mitra Kerja</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 mb-1 block">Kategori Mitra</label>
                <select
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={partnerForm.category || 'industri'}
                  onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value, category_en: e.target.value })}
                  required
                >
                  <option value="industri">Mitra Industri & Korporasi (Industrial)</option>
                  <option value="akademik">Kemitraan Akademik & Universitas (Academic)</option>
                  <option value="pemerintah">Mitra Lembaga Publik & Pemerintah (Government)</option>
                </select>
              </div>
            </div>
          )}

          {/* LANDING STATS FIELDS */}
          {activeTab === 'landing_stats' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Angka / Nilai (contoh: 100+)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={statForm.number}
                    onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={statForm.sort_order}
                    onChange={(e) => setStatForm({ ...statForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Label Statistik (Bahasa Indonesia)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={statForm.label}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Label Statistik (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={statForm.label_en || ''}
                  onChange={(e) => setStatForm({ ...statForm, label_en: e.target.value })}
                />
              </div>
            </>
          )}

          {/* LANDING PORTFOLIO FIELDS */}
          {activeTab === 'landing_portfolio' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Karya</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun Pembuatan</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.year}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Medium / Alat</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.medium}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, medium: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Teknik</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.technique}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, technique: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Ukuran Grid (contoh: col-span-1)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.gridClass}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, gridClass: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={portfolioForm.sort_order}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Karya / Portfolio</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {portfolioForm.image && (
                    <img src={portfolioForm.image} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setPortfolioForm({ ...portfolioForm, image: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL gambar langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={portfolioForm.image}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* DOSEN FIELDS */}
          {activeTab === 'dosen' && dosenForm && setDosenForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.name}
                    onChange={(e) => setDosenForm({ ...dosenForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.category || 'dosen'}
                    onChange={(e) => setDosenForm({ ...dosenForm, category: e.target.value as any })}
                    required
                  >
                    <option value="dosen">Dosen / Tenaga Pengajar</option>
                    <option value="karyawan_laboran">Karyawan & Laboran</option>
                    <option value="kepala_laboratorium">Kepala Laboratorium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-slate-700">Peran / Jabatan (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    placeholder="contoh: Dosen Lektor / Laboran Kimia / Tendik Administrasi"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.role || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, role: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.sort_order}
                    onChange={(e) => setDosenForm({ ...dosenForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Peran / Jabatan (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Lecturer / Chemistry Lab Technician / Administrative Staff"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={dosenForm.role_en || ''}
                  onChange={(e) => setDosenForm({ ...dosenForm, role_en: e.target.value })}
                />
              </div>

              {dosenForm.category === 'dosen' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Bidang Keahlian (Bahasa Indonesia)</label>
                    <input
                      type="text"
                      placeholder="contoh: Manajemen Agribisnis / Bioteknologi Pangan"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={dosenForm.expertise || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, expertise: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Bidang Keahlian (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Agribusiness Management / Food Biotechnology"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={dosenForm.expertise_en || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, expertise_en: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {dosenForm.category === 'dosen' && (
                <div className="grid grid-cols-3 gap-4 border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">ID Scopus</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      value={dosenForm.scopus || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, scopus: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">ID Sinta</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      value={dosenForm.sinta || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, sinta: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">ID Scholar</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      value={dosenForm.scholar || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, scholar: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Facebook URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.facebook || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, facebook: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Twitter URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.twitter || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, twitter: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">TikTok URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.tiktok || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, tiktok: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Instagram URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.instagram || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, instagram: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Profil</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {dosenForm.img_src && (
                    <img src={dosenForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setDosenForm({ ...dosenForm, img_src: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={dosenForm.img_src || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, img_src: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* KURIKULUM COURSES FORM */}
          {activeTab === 'kurikulum_courses' && courseForm && setCourseForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Semester</label>
                  <select
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={courseForm.semester}
                    onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })}
                    required
                  >
                    <option value="I">Semester I</option>
                    <option value="II">Semester II</option>
                    <option value="III">Semester III</option>
                    <option value="IV">Semester IV</option>
                    <option value="V">Semester V</option>
                    <option value="VI">Semester VI</option>
                    <option value="VII">Semester VII</option>
                    <option value="VIII">Semester VIII</option>
                    <option value="Pilihan">Mata Kuliah Pilihan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bobot SKS</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={courseForm.credits}
                    onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Mata Kuliah (ID)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  placeholder="Contoh: Pengantar Teknologi Pangan"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Mata Kuliah (EN)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={courseForm.name_en || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, name_en: e.target.value })}
                  placeholder="Contoh: Introduction to Food Technology"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Link File RPS (Google Drive / Direct Link)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={courseForm.rps_url || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, rps_url: e.target.value })}
                  placeholder="Masukkan link unduhan langsung atau link sharing Google Drive..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={courseForm.sort_order}
                  onChange={(e) => setCourseForm({ ...courseForm, sort_order: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </>
          )}

          {/* KURIKULUM PLOS FORM */}
          {activeTab === 'kurikulum_plos' && ploForm && setPloForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kode CPL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={ploForm.code}
                    onChange={(e) => setPloForm({ ...ploForm, code: e.target.value })}
                    placeholder="Contoh: CPL-01"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={ploForm.sort_order}
                    onChange={(e) => setPloForm({ ...ploForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Aspek / Kategori (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={ploForm.type}
                    onChange={(e) => setPloForm({ ...ploForm, type: e.target.value })}
                    placeholder="Contoh: Sikap & Tata Nilai"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Aspek / Kategori (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={ploForm.type_en || ''}
                    onChange={(e) => setPloForm({ ...ploForm, type_en: e.target.value })}
                    placeholder="Contoh: Attitude & Values"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi CPL (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={ploForm.text}
                  onChange={(e) => setPloForm({ ...ploForm, text: e.target.value })}
                  placeholder="Masukkan deskripsi capaian pembelajaran..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi CPL (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={ploForm.text_en || ''}
                  onChange={(e) => setPloForm({ ...ploForm, text_en: e.target.value })}
                  placeholder="Enter learning outcome description in English..."
                />
              </div>
            </>
          )}

          {/* KURIKULUM PROFILES FORM */}
          {activeTab === 'kurikulum_profiles' && profileForm && setProfileForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-semibold">Profil Lulusan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    placeholder="Contoh: Peneliti Pangan"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-semibold">Profil Lulusan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={profileForm.title_en || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, title_en: e.target.value })}
                    placeholder="Contoh: Food Researcher"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi / Peran Kerja (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={profileForm.desc}
                  onChange={(e) => setProfileForm({ ...profileForm, desc: e.target.value })}
                  placeholder="Masukkan peran kerja profil lulusan..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi / Peran Kerja (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={profileForm.desc_en || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, desc_en: e.target.value })}
                  placeholder="Enter role description in English..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={profileForm.sort_order}
                  onChange={(e) => setProfileForm({ ...profileForm, sort_order: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </>
          )}

          {/* TUGAS AKHIR STEPS FORM */}
          {activeTab === 'tugas_akhir_steps' && stepForm && setStepForm && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nomor Tahap</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={stepForm.num}
                    onChange={(e) => setStepForm({ ...stepForm, num: e.target.value })}
                    placeholder="Contoh: 01"
                    required
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={stepForm.sort_order}
                    onChange={(e) => setStepForm({ ...stepForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Tahapan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={stepForm.title}
                    onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                    placeholder="Contoh: Pengajuan Proposal"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Tahapan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={stepForm.title_en || ''}
                    onChange={(e) => setStepForm({ ...stepForm, title_en: e.target.value })}
                    placeholder="Contoh: Proposal Submission"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Penjelasan / Deskripsi (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={stepForm.desc}
                  onChange={(e) => setStepForm({ ...stepForm, desc: e.target.value })}
                  placeholder="Masukkan penjelasan tahapan skripsi..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Penjelasan / Deskripsi (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={stepForm.desc_en || ''}
                  onChange={(e) => setStepForm({ ...stepForm, desc_en: e.target.value })}
                  placeholder="Enter step description in English..."
                />
              </div>
            </>
          )}

          {/* PRESTASI FORM */}
          {activeTab === 'prestasi' && prestasiForm && setPrestasiForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tingkat / Kategori Prestasi</label>
                  <select
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.type}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, type: e.target.value as any })}
                    required
                  >
                    <option value="prodi">Prodi</option>
                    <option value="mahasiswa">Mahasiswa</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.year}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, year: e.target.value })}
                    placeholder="Contoh: 2024"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Prestasi (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.title}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, title: e.target.value })}
                    placeholder="Contoh: Juara 1 Lomba Nasional"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Prestasi (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.title_en || ''}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, title_en: e.target.value })}
                    placeholder="Contoh: 1st Place National Competition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Penyelenggara / Host (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.host || ''}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, host: e.target.value })}
                    placeholder="Contoh: Kemendikbudristek"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Penyelenggara / Host (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.host_en || ''}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, host_en: e.target.value })}
                    placeholder="Contoh: Ministry of Education"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Peserta / Peraih (contoh: Tim Himatika)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.competitor || ''}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, competitor: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={prestasiForm.sort_order}
                    onChange={(e) => setPrestasiForm({ ...prestasiForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Prestasi (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={prestasiForm.desc}
                  onChange={(e) => setPrestasiForm({ ...prestasiForm, desc: e.target.value })}
                  placeholder="Deskripsikan detail pencapaian..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Prestasi (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={prestasiForm.desc_en || ''}
                  onChange={(e) => setPrestasiForm({ ...prestasiForm, desc_en: e.target.value })}
                  placeholder="Detail achievement in English..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Sertifikat / Kegiatan</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {prestasiForm.image_url && (
                    <img src={prestasiForm.image_url} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setPrestasiForm({ ...prestasiForm, image_url: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={prestasiForm.image_url || ''}
                      onChange={(e) => setPrestasiForm({ ...prestasiForm, image_url: e.target.value })}
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* PUBLIKASI DOSEN FORM */}
          {activeTab === 'publikasi_dosen' && publikasiForm && setPublikasiForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Jurnal / Artikel (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.title}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, title: e.target.value })}
                    placeholder="Judul publikasi..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Jurnal / Artikel (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.title_en || ''}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, title_en: e.target.value })}
                    placeholder="Publication title in English..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Penulis (Author)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.author}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, author: e.target.value })}
                    placeholder="Contoh: Hanif Alamudin, dkk."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun Publikasi</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.year}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, year: e.target.value })}
                    placeholder="Contoh: 2023"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Jurnal / Seminar (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.journal}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, journal: e.target.value })}
                    placeholder="Contoh: Jurnal Pangan Indonesia"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Jurnal / Seminar (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.journal_en || ''}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, journal_en: e.target.value })}
                    placeholder="Contoh: Indonesian Food Journal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori Publikasi (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.category}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, category: e.target.value })}
                    placeholder="Contoh: Jurnal Internasional Bereputasi"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori Publikasi (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.category_en || ''}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, category_en: e.target.value })}
                    placeholder="Contoh: Reputable International Journal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Link Publikasi (URL)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.link || ''}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, link: e.target.value })}
                    placeholder="Contoh: https://sciencedirect.com/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={publikasiForm.sort_order}
                    onChange={(e) => setPublikasiForm({ ...publikasiForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* KEGIATAN DOSEN FORM */}
          {activeTab === 'kegiatan_dosen' && kegiatanDosenForm && setKegiatanDosenForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Kegiatan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.title}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, title: e.target.value })}
                    placeholder="Nama kegiatan..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Kegiatan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.title_en || ''}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, title_en: e.target.value })}
                    placeholder="Activity name in English..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Kegiatan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.date_text}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, date_text: e.target.value })}
                    placeholder="Contoh: 12-15 Nov 2024"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Kegiatan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.date_text_en || ''}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, date_text_en: e.target.value })}
                    placeholder="Contoh: Nov 12-15, 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Lokasi / Tempat</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.location}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, location: e.target.value })}
                    placeholder="Contoh: Aula UM Bandung"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanDosenForm.sort_order}
                    onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Kegiatan (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={kegiatanDosenForm.desc}
                  onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, desc: e.target.value })}
                  placeholder="Detail deskripsi kegiatan..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Kegiatan (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={kegiatanDosenForm.desc_en || ''}
                  onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, desc_en: e.target.value })}
                  placeholder="Description in English..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Kegiatan</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {kegiatanDosenForm.image_url && (
                    <img src={kegiatanDosenForm.image_url} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setKegiatanDosenForm({ ...kegiatanDosenForm, image_url: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={kegiatanDosenForm.image_url || ''}
                      onChange={(e) => setKegiatanDosenForm({ ...kegiatanDosenForm, image_url: e.target.value })}
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* KEGIATAN MAHASISWA FORM */}
          {activeTab === 'kegiatan_mahasiswa' && kegiatanMahasiswaForm && setKegiatanMahasiswaForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Kegiatan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.title}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, title: e.target.value })}
                    placeholder="Nama kegiatan..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Kegiatan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.title_en || ''}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, title_en: e.target.value })}
                    placeholder="Activity name in English..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Kegiatan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.date_text}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, date_text: e.target.value })}
                    placeholder="Contoh: 12-15 Nov 2024"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Kegiatan (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.date_text_en || ''}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, date_text_en: e.target.value })}
                    placeholder="Contoh: Nov 12-15, 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Lokasi / Tempat</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.location}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, location: e.target.value })}
                    placeholder="Contoh: Aula UM Bandung"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={kegiatanMahasiswaForm.sort_order}
                    onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Kegiatan (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={kegiatanMahasiswaForm.desc}
                  onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, desc: e.target.value })}
                  placeholder="Detail deskripsi kegiatan..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Kegiatan (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={kegiatanMahasiswaForm.desc_en || ''}
                  onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, desc_en: e.target.value })}
                  placeholder="Description in English..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Kegiatan</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {kegiatanMahasiswaForm.image_url && (
                    <img src={kegiatanMahasiswaForm.image_url} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, image_url: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={kegiatanMahasiswaForm.image_url || ''}
                      onChange={(e) => setKegiatanMahasiswaForm({ ...kegiatanMahasiswaForm, image_url: e.target.value })}
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* ALUMNI FORM */}
          {activeTab === 'alumni' && alumniForm && setAlumniForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Alumni</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.name}
                    onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                    placeholder="Nama lengkap..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.sort_order}
                    onChange={(e) => setAlumniForm({ ...alumniForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Angkatan / Tahun Lulus (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.class_of}
                    onChange={(e) => setAlumniForm({ ...alumniForm, class_of: e.target.value })}
                    placeholder="Contoh: Angkatan 2018"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Angkatan / Tahun Lulus (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.class_of_en || ''}
                    onChange={(e) => setAlumniForm({ ...alumniForm, class_of_en: e.target.value })}
                    placeholder="Contoh: Class of 2018"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pekerjaan / Peran (Role)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.role}
                    onChange={(e) => setAlumniForm({ ...alumniForm, role: e.target.value })}
                    placeholder="Contoh: Quality Control Specialist"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Perusahaan / Institusi</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={alumniForm.company}
                    onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })}
                    placeholder="Contoh: PT Indofood CBP"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Kutipan / Testimoni (ID)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={alumniForm.quote}
                  onChange={(e) => setAlumniForm({ ...alumniForm, quote: e.target.value })}
                  placeholder="Kutipan pengalaman alumni..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Kutipan / Testimoni (EN)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition resize-none"
                  value={alumniForm.quote_en || ''}
                  onChange={(e) => setAlumniForm({ ...alumniForm, quote_en: e.target.value })}
                  placeholder="Alumni testimonial in English..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Foto Profil Alumni</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {alumniForm.image_url && (
                    <img src={alumniForm.image_url} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setAlumniForm({ ...alumniForm, image_url: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={alumniForm.image_url || ''}
                      onChange={(e) => setAlumniForm({ ...alumniForm, image_url: e.target.value })}
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* LABORATORIUM FORM */}
          {activeTab === 'laboratorium' && laboratoriumForm && setLaboratoriumForm && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Laboratorium (Bahasa Indonesia)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={laboratoriumForm.name}
                  onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Laboratorium (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={laboratoriumForm.name_en || ''}
                  onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, name_en: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Laboratorium (Bahasa Indonesia)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[80px]"
                  value={laboratoriumForm.desc}
                  onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, desc: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Laboratorium (English)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition min-h-[80px]"
                  value={laboratoriumForm.desc_en || ''}
                  onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, desc_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Foto Laboratorium</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {laboratoriumForm.image_url && (
                      <img src={laboratoriumForm.image_url} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" alt="Preview" />
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, (url) => setLaboratoriumForm({ ...laboratoriumForm, image_url: url }))}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                        disabled={isUploading}
                      />
                      <input
                        type="text"
                        placeholder="URL gambar..."
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                        value={laboratoriumForm.image_url}
                        onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, image_url: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah gambar...</p>}
                  {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Urutan (Sort Order)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={laboratoriumForm.sort_order}
                    onChange={(e) => setLaboratoriumForm({ ...laboratoriumForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* KKN DOCUMENTS FORM */}
          {activeTab === 'kkn_documents' && kknDocumentForm && setKknDocumentForm && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lampiran / Dokumen (Bahasa Indonesia)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={kknDocumentForm.name}
                  onChange={(e) => setKknDocumentForm({ ...kknDocumentForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lampiran / Dokumen (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={kknDocumentForm.name_en || ''}
                  onChange={(e) => setKknDocumentForm({ ...kknDocumentForm, name_en: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Berkas Dokumen (PDF, Word, Excel, dsb.)</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={(e) => handleFileChange(e, (url) => setKknDocumentForm({ ...kknDocumentForm, file_url: url }))}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL berkas langsung..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                      value={kknDocumentForm.file_url || ''}
                      onChange={(e) => setKknDocumentForm({ ...kknDocumentForm, file_url: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah berkas...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Urutan (Sort Order)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={kknDocumentForm.sort_order}
                  onChange={(e) => setKknDocumentForm({ ...kknDocumentForm, sort_order: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </>
          )}

          {/* STATISTIK MABA FORM */}
          {activeTab === 'statistik_maba' && statistikMabaForm && setStatistikMabaForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun Akademik</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={statistikMabaForm.year}
                    onChange={(e) => setStatistikMabaForm({ ...statistikMabaForm, year: e.target.value })}
                    placeholder="Contoh: 2024/2025"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jumlah Mahasiswa Baru</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={statistikMabaForm.count}
                    onChange={(e) => setStatistikMabaForm({ ...statistikMabaForm, count: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">No. Urut (Sort Order)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                  value={statistikMabaForm.sort_order}
                  onChange={(e) => setStatistikMabaForm({ ...statistikMabaForm, sort_order: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </>
          )}

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-gray-200/50 transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
