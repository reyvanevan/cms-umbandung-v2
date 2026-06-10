import React, { useState } from 'react';
import { Save, Search, RefreshCw, Upload, Link as LinkIcon } from 'lucide-react';
import { type DbSiteContent } from '../../lib/mockData';
import { handleImageUpload } from '../../lib/supabase';
import { getHumanLabel, getHelpText } from '../../lib/cmsLabels';

interface SiteContentTabProps {
  siteContent: DbSiteContent[];
  isLoadingData: boolean;
  connectionMode: 'supabase' | 'mock';
  onUpdateContent: (key: string, value: string, valueEn: string | null) => Promise<void>;
}

export default function SiteContentTab({
  siteContent,
  isLoadingData,
  connectionMode,
  onUpdateContent
}: SiteContentTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editValues, setEditValues] = useState<{ [key: string]: { id: string; en: string } }>({});
  const [savingKeys, setSavingKeys] = useState<{ [key: string]: boolean }>({});
  const [uploadingKeys, setUploadingKeys] = useState<{ [key: string]: boolean }>({});
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({});

  const handleFileUpload = async (key: string, file: File) => {
    setUploadingKeys((prev) => ({ ...prev, [key]: true }));
    setUploadErrors((prev) => ({ ...prev, [key]: '' }));
    try {
      const isSupabase = connectionMode === 'supabase';
      const url = await handleImageUpload(file, isSupabase);
      handleInputChange(key, 'id', url);
      handleInputChange(key, 'en', url);
    } catch (err: any) {
      console.error(err);
      setUploadErrors((prev) => ({ ...prev, [key]: err.message || 'Gagal mengunggah gambar' }));
    } finally {
      setUploadingKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Initialize input state when values change
  React.useEffect(() => {
    const initial: typeof editValues = {};
    siteContent.forEach((item) => {
      initial[item.key] = {
        id: item.value || '',
        en: item.value_en || ''
      };
    });
    setEditValues(initial);
  }, [siteContent]);

  const handleInputChange = (key: string, lang: 'id' | 'en', val: string) => {
    setEditValues((prev) => {
      const current = prev[key] || { id: '', en: '' };
      if (lang === 'id') {
        const shouldSyncEn = !current.en || current.en === current.id;
        return {
          ...prev,
          [key]: {
            id: val,
            en: shouldSyncEn ? val : current.en
          }
        };
      }
      return {
        ...prev,
        [key]: {
          ...current,
          en: val
        }
      };
    });
  };

  const handleSave = async (key: string) => {
    const vals = editValues[key];
    if (!vals) return;

    setSavingKeys((prev) => ({ ...prev, [key]: true }));
    try {
      await onUpdateContent(key, vals.id, vals.en || null);
    } finally {
      setSavingKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Helper to resolve section from content key prefix
  const getSectionName = (key: string) => {
    if (key.startsWith('hero_')) return 'Hero';
    if (key.startsWith('kaprodi_')) return 'Kaprodi';
    if (key.startsWith('philosophy_')) return 'Philosophy';
    return 'General';
  };

  // Group content by section
  const sections = Array.from(new Set(siteContent.map((c) => getSectionName(c.key))));

  const getSectionTitle = (sec: string) => {
    switch (sec.toLowerCase()) {
      case 'hero': return 'Hero / Spanduk Utama';
      case 'kaprodi': return 'Profil Kepala Program Studi';
      case 'philosophy': return 'Filosofi Pembelajaran';
      default: return 'Pengaturan Umum';
    }
  };

  const filteredContent = siteContent.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const sec = getSectionName(item.key);
    const humanLabel = getHumanLabel(item.key).toLowerCase();
    return (
      item.key.toLowerCase().includes(q) ||
      humanLabel.includes(q) ||
      item.value.toLowerCase().includes(q) ||
      (item.value_en && item.value_en.toLowerCase().includes(q)) ||
      sec.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Editor Konten Halaman</h2>
          <p className="text-xs text-slate-500 mt-1">Perbarui teks, gambar, dan media bilingual pada website utama Anda tanpa mengubah kode.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kata kunci atau nama label..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-slate-900" />
          <p className="text-xs font-medium">Memuat data editor...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map((sectionName) => {
            const sectionItems = filteredContent.filter((c) => getSectionName(c.key) === sectionName);
            if (sectionItems.length === 0) return null;

            return (
              <div key={sectionName} className="space-y-4">
                {/* Section title header */}
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-4.5 bg-slate-900 rounded-full" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                    {getSectionTitle(sectionName)}
                  </h3>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 gap-6">
                  {sectionItems.map((item) => {
                    const vals = editValues[item.key] || { id: '', en: '' };
                    const isSaving = savingKeys[item.key] || false;

                    return (
                      <div key={item.key} className="p-6 bg-white border border-slate-200/70 rounded-2xl flex flex-col gap-6 shadow-xs hover:border-slate-300 transition-colors">
                        
                        {/* Item Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">
                                {getHumanLabel(item.key)}
                              </h4>
                              <span className="text-[9px] font-mono font-medium text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/30">
                                {item.key}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                              {getHelpText(item.key)}
                            </p>
                          </div>

                          <button
                            onClick={() => handleSave(item.key)}
                            disabled={isSaving}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
                          >
                            {isSaving ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                            <span>Simpan</span>
                          </button>
                        </div>

                        {/* Item Inputs */}
                        <div className="w-full">
                          {item.key.includes('photo') || item.key.includes('image') || item.key.includes('_url') ? (
                            <div className="space-y-4">
                              <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50/50 p-4 border border-slate-150 rounded-xl">
                                {vals.id && (
                                  vals.id.toLowerCase().endsWith('.mp4') ||
                                  vals.id.toLowerCase().endsWith('.webm') ||
                                  vals.id.toLowerCase().endsWith('.ogg') ||
                                  vals.id.startsWith('data:video/') ? (
                                    <video src={vals.id} className="w-24 h-24 object-cover rounded-xl border border-slate-200 shrink-0 bg-white shadow-xs" controls muted />
                                  ) : (
                                    <img src={vals.id} className="w-24 h-24 object-cover rounded-xl border border-slate-200 shrink-0 bg-white shadow-xs" alt="Preview" />
                                  )
                                )}
                                <div className="flex-1 w-full space-y-3">
                                  <div className="space-y-1">
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                      <Upload className="w-3.5 h-3.5" />
                                      <span>Unggah File Baru</span>
                                    </span>
                                    <input
                                      type="file"
                                      accept="image/*,video/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileUpload(item.key, file);
                                      }}
                                      className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                                      disabled={uploadingKeys[item.key]}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                      <LinkIcon className="w-3.5 h-3.5" />
                                      <span>Atau Alamat URL Media</span>
                                    </span>
                                    <input
                                      type="text"
                                      placeholder="Masukkan url gambar/video, misal: /assets/nama-file.png"
                                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                                      value={vals.id}
                                      onChange={(e) => {
                                        handleInputChange(item.key, 'id', e.target.value);
                                        handleInputChange(item.key, 'en', e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              {uploadingKeys[item.key] && (
                                <p className="text-[10px] text-indigo-600 animate-pulse font-medium">Sedang mengunggah file...</p>
                              )}
                              {uploadErrors[item.key] && (
                                <p className="text-[10px] text-red-500 font-semibold">{uploadErrors[item.key]}</p>
                              )}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                              {/* Indonesian Input */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200/50">ID</span>
                                  <span className="text-xs font-semibold text-slate-600">Bahasa Indonesia</span>
                                </div>
                                <textarea
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-450 focus:bg-white transition min-h-[90px] leading-relaxed"
                                  value={vals.id}
                                  onChange={(e) => handleInputChange(item.key, 'id', e.target.value)}
                                />
                              </div>

                              {/* English Input */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 rounded text-indigo-600 border border-indigo-100/50">EN</span>
                                  <span className="text-xs font-semibold text-slate-600">English Translation</span>
                                </div>
                                <textarea
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-450 focus:bg-white transition min-h-[90px] leading-relaxed"
                                  value={vals.en}
                                  onChange={(e) => handleInputChange(item.key, 'en', e.target.value)}
                                  placeholder="Biarkan kosong untuk menggunakan teks bahasa Indonesia"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
