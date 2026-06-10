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
  type DbTaStep
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
  setStepForm
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
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Nama Mitra Kerja</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                value={partnerForm.name}
                onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                required
              />
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
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ID Scopus</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.scopus || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, scopus: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ID Sinta</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.sinta || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, sinta: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ID Scholar</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
                    value={dosenForm.scholar || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, scholar: e.target.value })}
                  />
                </div>
              </div>
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
                <label className="text-xs font-bold text-slate-700 block">Foto Dosen</label>
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

          {/* Modal Actions */}
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
