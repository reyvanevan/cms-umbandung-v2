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
  type DbDosen
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
  setDosenForm
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
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Berita (Indonesian)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Berita (English Translation)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                  value={newsForm.title_en || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={newsForm.category_en || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, category_en: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ringkasan / Snippet (ID)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition min-h-[80px]"
                  value={newsForm.snippet}
                  onChange={(e) => setNewsForm({ ...newsForm, snippet: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Snippet (EN)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition min-h-[80px]"
                  value={newsForm.snippet_en || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, snippet_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Tampilan (e.g. 12 Okt 2026)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Foto Berita</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {newsForm.img_src && (
                      <img src={newsForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" alt="Preview" />
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, (url) => setNewsForm({ ...newsForm, img_src: url }))}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                        disabled={isUploading}
                      />
                      <input
                        type="text"
                        placeholder="Atau masukkan URL gambar langsung..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                        value={newsForm.img_src}
                        onChange={(e) => setNewsForm({ ...newsForm, img_src: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {isUploading && <p className="text-[10px] text-gray-500 animate-pulse">Mengunggah gambar...</p>}
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
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hari / Tanggal Angka (e.g. 24)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={eventForm.date_day}
                    onChange={(e) => setEventForm({ ...eventForm, date_day: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bulan Singkat (e.g. OKT)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={eventForm.date_month}
                    onChange={(e) => setEventForm({ ...eventForm, date_month: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Agenda (Indonesian)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Agenda (English)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                  value={eventForm.title_en || ''}
                  onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lokasi (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
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
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Isi Kutipan Testimoni (ID)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition min-h-[90px]"
                  value={testimonialForm.testimonial}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Testimonial Quote (EN)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition min-h-[90px]"
                  value={testimonialForm.testimonial_en || ''}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial_en: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Alumni & Jabatan (ID)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={testimonialForm.by}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, by: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Alumni & Role Title (EN)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={testimonialForm.by_en || ''}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, by_en: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Avatar / Foto Alumni</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {testimonialForm.img_src && (
                    <img src={testimonialForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setTestimonialForm({ ...testimonialForm, img_src: url }))}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL avatar langsung..."
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                      value={testimonialForm.img_src}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, img_src: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-gray-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* PARTNERS FIELDS */}
          {activeTab === 'partners' && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Nama Mitra Kerja</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
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
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Angka / Nilai (e.g. 100+)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={statForm.number}
                    onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={statForm.sort_order}
                    onChange={(e) => setStatForm({ ...statForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keterangan Label Stat (Indonesian)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                  value={statForm.label}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keterangan Label Stat (English Translation)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
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
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Karya</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahun Pembuatan</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.year}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Medium / Alat</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.medium}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, medium: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Teknik</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.technique}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, technique: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Grid Class (e.g. col-span-1)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.gridClass}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, gridClass: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={portfolioForm.sort_order}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Foto Karya / Portfolio</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {portfolioForm.image && (
                    <img src={portfolioForm.image} className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setPortfolioForm({ ...portfolioForm, image: url }))}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL gambar langsung..."
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                      value={portfolioForm.image}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-gray-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
              </div>
            </>
          )}

          {/* DOSEN FIELDS */}
          {activeTab === 'dosen' && dosenForm && setDosenForm && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.name}
                    onChange={(e) => setDosenForm({ ...dosenForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Urutan Tampilan</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.sort_order}
                    onChange={(e) => setDosenForm({ ...dosenForm, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Scopus</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.scopus || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, scopus: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Sinta</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.sinta || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, sinta: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Scholar</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.scholar || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, scholar: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Facebook URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.facebook || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, facebook: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Twitter URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.twitter || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, twitter: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TikTok URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.tiktok || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, tiktok: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instagram URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                    value={dosenForm.instagram || ''}
                    onChange={(e) => setDosenForm({ ...dosenForm, instagram: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Foto Dosen</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {dosenForm.img_src && (
                    <img src={dosenForm.img_src} className="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" alt="Preview" />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, (url) => setDosenForm({ ...dosenForm, img_src: url }))}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                      disabled={isUploading}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL foto langsung..."
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
                      value={dosenForm.img_src || ''}
                      onChange={(e) => setDosenForm({ ...dosenForm, img_src: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {isUploading && <p className="text-[10px] text-gray-500 animate-pulse">Mengunggah gambar...</p>}
                {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}
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
