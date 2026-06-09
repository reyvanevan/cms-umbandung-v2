import React, { useState } from 'react';
import { Save, Search, RefreshCw } from 'lucide-react';
import { type DbSiteContent } from '../../lib/mockData';
import { handleImageUpload } from '../../lib/supabase';

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
    setEditValues((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: val
      }
    }));
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
      case 'hero': return 'Hero / Banner Utama';
      case 'kaprodi': return 'Tentang Kaprodi';
      case 'philosophy': return 'Filosofi Desain';
      default: return 'General / Umum';
    }
  };

  const filteredContent = siteContent.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const sec = getSectionName(item.key);
    return (
      item.key.toLowerCase().includes(q) ||
      item.value.toLowerCase().includes(q) ||
      (item.value_en && item.value_en.toLowerCase().includes(q)) ||
      sec.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-950 uppercase tracking-wider">Editor Teks Halaman</h2>
          <p className="text-xs text-gray-400 mt-0.5">Edit teks statis bilingual di website utama Anda secara dinamis.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari teks berdasarkan kata kunci..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data konten teks...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((sectionName) => {
            const sectionItems = filteredContent.filter((c) => getSectionName(c.key) === sectionName);
            if (sectionItems.length === 0) return null;

            return (
              <div key={sectionName} className="space-y-4">
                {/* Section title banner */}
                <div className="px-4 py-2 bg-gray-50 border-l-2 border-indigo-600 rounded-r-xl">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Section: {getSectionTitle(sectionName)}
                  </h3>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 gap-6">
                  {sectionItems.map((item) => {
                    const vals = editValues[item.key] || { id: '', en: '' };
                    const isSaving = savingKeys[item.key] || false;

                    return (
                      <div key={item.key} className="p-5 border border-gray-100 rounded-2xl flex flex-col md:flex-row gap-5 items-start bg-gray-50/20">
                        {/* Description field */}
                        <div className="md:w-1/4">
                          <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                            {item.key}
                          </span>
                          <span className="block text-[10px] text-gray-400 mt-1">
                            Digunakan pada bagian {getSectionTitle(sectionName)}
                          </span>
                        </div>

                        {/* Input Fields */}
                        <div className="flex-1 w-full space-y-3">
                          {item.key.includes('photo') || item.key.includes('image') || item.key.includes('_url') ? (
                            <div className="space-y-3">
                              <div className="flex flex-col sm:flex-row gap-3 items-center">
                                {vals.id && (
                                  vals.id.toLowerCase().endsWith('.mp4') ||
                                  vals.id.toLowerCase().endsWith('.webm') ||
                                  vals.id.toLowerCase().endsWith('.ogg') ||
                                  vals.id.startsWith('data:video/') ? (
                                    <video src={vals.id} className="w-20 h-20 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" controls muted />
                                  ) : (
                                    <img src={vals.id} className="w-20 h-20 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-50" alt="Preview" />
                                  )
                                )}
                                <div className="flex-1 w-full space-y-2">
                                  <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFileUpload(item.key, file);
                                    }}
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                                    disabled={uploadingKeys[item.key]}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Atau masukkan URL media langsung..."
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                                    value={vals.id}
                                    onChange={(e) => {
                                      handleInputChange(item.key, 'id', e.target.value);
                                      handleInputChange(item.key, 'en', e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              {uploadingKeys[item.key] && <p className="text-[10px] text-gray-500 animate-pulse">Mengunggah gambar...</p>}
                              {uploadErrors[item.key] && <p className="text-[10px] text-red-500 font-semibold">{uploadErrors[item.key]}</p>}
                            </div>
                          ) : (
                            <>
                              {/* Indonesian */}
                              <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">ID</span>
                                  <span className="text-xs font-semibold text-gray-500">Bahasa Indonesia</span>
                                </div>
                                <textarea
                                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition min-h-[60px]"
                                  value={vals.id}
                                  onChange={(e) => handleInputChange(item.key, 'id', e.target.value)}
                                />
                              </div>

                              {/* English */}
                              <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">EN</span>
                                  <span className="text-xs font-semibold text-gray-500">English Translation</span>
                                </div>
                                <textarea
                                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition min-h-[60px]"
                                  value={vals.en}
                                  onChange={(e) => handleInputChange(item.key, 'en', e.target.value)}
                                  placeholder="Leave blank to use Indonesian value"
                                />
                              </div>
                            </>
                          )}
                        </div>

                        {/* Save Button */}
                        <div className="md:self-center">
                          <button
                            onClick={() => handleSave(item.key)}
                            disabled={isSaving}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-100 transition cursor-pointer w-full md:w-auto"
                          >
                            {isSaving ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                            <span>Update</span>
                          </button>
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
