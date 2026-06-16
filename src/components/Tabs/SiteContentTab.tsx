import React, { useState } from 'react';
import { Save, Search, RefreshCw, Upload, Link as LinkIcon, Home, FileText, Users, GraduationCap, BookOpen, Award, Settings } from 'lucide-react';
import { type DbSiteContent, type DbDosen } from '../../lib/mockData';
import { handleImageUpload } from '../../lib/supabase';
import { getHumanLabel, getHelpText } from '../../lib/cmsLabels';

const KEY_RELATIONS: Record<string, { photoKey: string; emailKey?: string }> = {
  kaprodi_name: { photoKey: 'kaprodi_photo_url' },
  gov_sec_name: { photoKey: 'gov_sec_photo', emailKey: 'gov_sec_email' },
  gov_upm_name: { photoKey: 'gov_upm_photo', emailKey: 'gov_upm_email' }
};

interface SiteContentTabProps {
  siteContent: DbSiteContent[];
  isLoadingData: boolean;
  connectionMode: 'supabase' | 'mock';
  onUpdateContent: (key: string, value: string, valueEn: string | null) => Promise<void>;
  category?: 'beranda' | 'visi_misi' | 'tata_kelola' | 'kurikulum' | 'tugas_akhir' | 'kerjasama' | 'kkn' | 'global';
  hideHeader?: boolean;
  dosenList?: DbDosen[];
  activeSubSection?: string | null;
  setActiveSubSection?: (sub: string | null) => void;
  focusedKey?: string | null;
  setFocusedKey?: (key: string | null) => void;
}

export default function SiteContentTab({
  siteContent,
  isLoadingData,
  connectionMode,
  onUpdateContent,
  category,
  hideHeader = false,
  dosenList = [],
  activeSubSection,
  focusedKey,
  setFocusedKey
}: SiteContentTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'beranda' | 'visi_misi' | 'tata_kelola' | 'kurikulum' | 'tugas_akhir' | 'kerjasama' | 'kkn' | 'global'>(category || 'beranda');

  React.useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

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

  // Handle focusedKey auto scroll and text area focus
  React.useEffect(() => {
    if (focusedKey) {
      const el = document.getElementById(`editor-card-${focusedKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const textarea = document.getElementById(`input-id-${focusedKey}`) as HTMLTextAreaElement | null;
        if (textarea) {
          textarea.focus();
        }

        const timer = setTimeout(() => {
          if (setFocusedKey) setFocusedKey(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [focusedKey, setFocusedKey]);

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

      // Automatically save relations (like photoKey or emailKey) if they exist
      const rel = KEY_RELATIONS[key];
      if (rel) {
        const promises: Promise<any>[] = [];
        const linkedDosen = dosenList.find(d => d.name === vals.id);

        if (rel.photoKey) {
          const photoVals = editValues[rel.photoKey] || { id: '', en: '' };
          const photoVal = (linkedDosen && linkedDosen.img_src) ? linkedDosen.img_src : photoVals.id;
          promises.push(onUpdateContent(rel.photoKey, photoVal, photoVal || null));
        }
        if (rel.emailKey) {
          const emailVals = editValues[rel.emailKey] || { id: '', en: '' };
          promises.push(onUpdateContent(rel.emailKey, emailVals.id, emailVals.id || null));
        }
        if (promises.length > 0) {
          await Promise.all(promises);
        }
      }

      // If saving logo_prodi_url, save the style keys too
      if (key === 'logo_prodi_url') {
        const extraKeys = ['logo_prodi_height', 'logo_prodi_padding', 'logo_prodi_radius', 'logo_prodi_object_fit'];
        const logoPromises = extraKeys.map(k => {
          const kVal = editValues[k];
          return kVal ? onUpdateContent(k, kVal.id, kVal.id || null) : Promise.resolve();
        });
        await Promise.all(logoPromises);
      }
    } finally {
      setSavingKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSaveKeys = async (keys: string[], savingKey: string) => {
    setSavingKeys((prev) => ({ ...prev, [savingKey]: true }));
    try {
      await Promise.all(keys.map((key) => {
        const vals = editValues[key] || { id: '', en: '' };
        return onUpdateContent(key, vals.id, vals.en || null);
      }));
    } finally {
      setSavingKeys((prev) => ({ ...prev, [savingKey]: false }));
    }
  };

  const getValue = (key: string, lang: 'id' | 'en' = 'id') => {
    const vals = editValues[key] || { id: '', en: '' };
    return lang === 'id' ? vals.id : vals.en;
  };

  const isVideoUrl = (url: string) => {
    const lower = url.toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.startsWith('data:video/');
  };

  const renderTextField = (key: string, label: string, options?: { multiline?: boolean; placeholder?: string }) => {
    const multiline = options?.multiline ?? false;
    const baseClass = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition';
    return (
      <div className="space-y-3">
        <div>
          <p className="text-xs font-bold text-slate-800">{label}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{getHelpText(key)}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Bahasa Indonesia</span>
            {multiline ? (
              <textarea
                id={`input-id-${key}`}
                className={`${baseClass} min-h-[112px] leading-relaxed resize-y`}
                value={getValue(key, 'id')}
                placeholder={options?.placeholder}
                onChange={(e) => handleInputChange(key, 'id', e.target.value)}
              />
            ) : (
              <input
                id={`input-id-${key}`}
                className={baseClass}
                value={getValue(key, 'id')}
                placeholder={options?.placeholder}
                onChange={(e) => handleInputChange(key, 'id', e.target.value)}
              />
            )}
          </label>
          <label className="space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">English</span>
            {multiline ? (
              <textarea
                id={`input-en-${key}`}
                className={`${baseClass} min-h-[112px] leading-relaxed resize-y`}
                value={getValue(key, 'en')}
                placeholder="Kosongkan untuk memakai teks Indonesia"
                onChange={(e) => handleInputChange(key, 'en', e.target.value)}
              />
            ) : (
              <input
                id={`input-en-${key}`}
                className={baseClass}
                value={getValue(key, 'en')}
                placeholder="Kosongkan untuk memakai teks Indonesia"
                onChange={(e) => handleInputChange(key, 'en', e.target.value)}
              />
            )}
          </label>
        </div>
      </div>
    );
  };

  const renderMediaField = (key: string, label: string, accept = 'image/*,video/*') => {
    const val = getValue(key, 'id');
    return (
      <div className="space-y-3">
        <div>
          <p className="text-xs font-bold text-slate-800">{label}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{getHelpText(key)}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="w-full md:w-48 aspect-video bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
            {val ? (
              isVideoUrl(val) ? (
                <video src={val} className="w-full h-full object-cover" controls muted />
              ) : (
                <img src={val} className="w-full h-full object-cover" alt="Preview" />
              )
            ) : (
              <span className="text-[10px] font-medium text-slate-400">Belum ada media</span>
            )}
          </div>
          <div className="flex-1 space-y-3 min-w-0">
            <label className="space-y-1.5 block">
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                <Upload className="w-3.5 h-3.5" />
                Unggah File
              </span>
              <input
                type="file"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(key, file);
                }}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                disabled={uploadingKeys[key]}
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                <LinkIcon className="w-3.5 h-3.5" />
                URL Media
              </span>
              <input
                id={`input-id-${key}`}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                value={val}
                placeholder="/assets/nama-file.png atau https://..."
                onChange={(e) => {
                  handleInputChange(key, 'id', e.target.value);
                  handleInputChange(key, 'en', e.target.value);
                }}
              />
            </label>
            {uploadingKeys[key] && <p className="text-[10px] text-indigo-600 animate-pulse font-medium">Sedang mengunggah file...</p>}
            {uploadErrors[key] && <p className="text-[10px] text-red-500 font-semibold">{uploadErrors[key]}</p>}
          </div>
        </div>
      </div>
    );
  };

  const renderHeroEditor = () => {
    const keys = ['hero_title', 'hero_subtitle', 'hero_bg_url', 'hero_overlay_opacity'];
    const savingKey = 'section:hero';
    const bgUrl = getValue('hero_bg_url');
    const overlay = getValue('hero_overlay_opacity') || '40';

    return (
      <div className="space-y-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Spanduk & Jumbotron</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl">Atur pesan utama, latar visual, dan tingkat gelap overlay hero di halaman depan.</p>
                </div>
                <button
                  onClick={() => handleSaveKeys(keys, savingKey)}
                  disabled={savingKeys[savingKey]}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
                >
                  {savingKeys[savingKey] ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Simpan Hero
                </button>
              </div>
              {renderTextField('hero_title', 'Judul utama')}
              {renderTextField('hero_subtitle', 'Subjudul', { multiline: true })}
              {renderMediaField('hero_bg_url', 'Background hero')}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Overlay gelap</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">0 terang penuh, 100 gelap penuh.</p>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{overlay}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlay}
                  onChange={(e) => {
                    handleInputChange('hero_overlay_opacity', 'id', e.target.value);
                    handleInputChange('hero_overlay_opacity', 'en', e.target.value);
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>
            <div className="bg-slate-950 p-5 flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Preview</p>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                {bgUrl && (
                  isVideoUrl(bgUrl)
                    ? <video src={bgUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted />
                    : <img src={bgUrl} className="absolute inset-0 w-full h-full object-cover" alt="Hero preview" />
                )}
                <div className="absolute inset-0 bg-black" style={{ opacity: (parseFloat(overlay) || 0) / 100 }} />
                <div className="relative h-full p-6 flex flex-col justify-center text-white">
                  <p className="text-[9px] uppercase tracking-widest text-white/60 mb-3">Universitas Muhammadiyah Bandung</p>
                  <h4 className="font-serif text-3xl leading-none">{getValue('hero_title') || 'Judul Hero'}</h4>
                  <p className="text-xs leading-relaxed text-white/75 mt-4 line-clamp-4">{getValue('hero_subtitle') || 'Subjudul hero akan tampil di sini.'}</p>
                </div>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">Preview ini membantu cek keterbacaan teks terhadap background dan overlay.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditorialEditor = () => {
    const slideCount = 4;
    const keys = Array.from({ length: slideCount }).flatMap((_, idx) => {
      const n = idx + 1;
      return [
        `editorial_slide_${n}_title`,
        `editorial_slide_${n}_subtitle`,
        `editorial_slide_${n}_description`,
        `editorial_slide_${n}_accent`,
        `editorial_slide_${n}_image_url`
      ];
    });
    const savingKey = 'section:editorial';

    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Editorial Slider</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">Kelola empat slide editorial di beranda: judul, tokoh/subjudul, narasi, warna aksen, dan gambar.</p>
          </div>
          <button
            onClick={() => handleSaveKeys(keys, savingKey)}
            disabled={savingKeys[savingKey]}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
          >
            {savingKeys[savingKey] ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Simpan Semua Slide
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {Array.from({ length: slideCount }).map((_, idx) => {
            const n = idx + 1;
            const accentKey = `editorial_slide_${n}_accent`;
            const imageKey = `editorial_slide_${n}_image_url`;
            const accent = getValue(accentKey) || '#C4956A';
            const imageUrl = getValue(imageKey);

            return (
              <div key={n} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-5">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="lg:w-64 shrink-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Slide {n}</p>
                      <span className="text-[10px] font-mono text-slate-400">editorial_slide_{n}</span>
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-200">
                      {imageUrl && <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={`Editorial slide ${n}`} />}
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}55 0%, rgba(0,0,0,0.75) 65%)` }} />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p className="text-[9px] font-mono mb-1" style={{ color: accent }}>{String(n).padStart(2, '0')} / 04</p>
                        <p className="font-serif text-xl leading-tight line-clamp-2">{getValue(`editorial_slide_${n}_title`) || `Slide ${n}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-5">
                    {renderTextField(`editorial_slide_${n}_title`, 'Judul slide')}
                    {renderTextField(`editorial_slide_${n}_subtitle`, 'Subjudul / tokoh')}
                    {renderTextField(`editorial_slide_${n}_description`, 'Deskripsi', { multiline: true })}
                    <div className="grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-5">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold text-slate-800">Warna aksen</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Kode HEX untuk aksen slide.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={/^#[0-9A-Fa-f]{6}$/.test(accent) ? accent : '#C4956A'}
                            onChange={(e) => {
                              handleInputChange(accentKey, 'id', e.target.value);
                              handleInputChange(accentKey, 'en', e.target.value);
                            }}
                            className="h-10 w-12 rounded-lg border border-slate-200 bg-white p-1 cursor-pointer"
                          />
                          <input
                            className="min-w-0 flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                            value={accent}
                            onChange={(e) => {
                              handleInputChange(accentKey, 'id', e.target.value);
                              handleInputChange(accentKey, 'en', e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {renderMediaField(imageKey, 'Gambar slide', 'image/*')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper to categorize content key
  const getCategoryForKey = (key: string) => {
    if (key.startsWith('kkn_')) return 'kkn';
    if (key.startsWith('footer_')) return 'global';
    if (key.startsWith('hero_') || key.startsWith('kaprodi_') || key.startsWith('logo_') || key.startsWith('sambutan_') || key.startsWith('info_singkat_') || key.startsWith('video_profile_') || key.startsWith('editorial_')) {
      return 'beranda';
    }
    if (key.startsWith('visi_misi_')) return 'visi_misi';
    if (key.startsWith('gov_')) return 'tata_kelola';
    if (key.startsWith('kurikulum_')) return 'kurikulum';
    if (key.startsWith('tugas_akhir_')) return 'tugas_akhir';
    if (key.startsWith('kerjasama_')) return 'kerjasama';
    return 'beranda';
  };

  const getSubSectionName = (key: string) => {
    if (key.startsWith('kkn_')) return 'Praktik Kerja & KKN';
    if (key === 'hero_video_url') return 'Video Profil';
    if (key.startsWith('hero_')) return 'Spanduk & Jumbotron';
    if (key.startsWith('kaprodi_')) return 'Sambutan Kepala Program Studi';
    if (key.startsWith('video_profile_') || key === 'hero_video_url') return 'Video Profil';
    if (key.startsWith('editorial_')) return 'Editorial Slider';
    if (key.startsWith('footer_')) return 'Informasi Kontak & Sosial Media (Footer)';
    if (key.startsWith('info_singkat_') || key.startsWith('info_')) return 'Informasi Singkat Landing Page';
    if (key.startsWith('gov_sec_') || key.startsWith('gov_upm_') || key.startsWith('gov_')) return 'Sekretaris & UPM (Tata Kelola)';
    if (key.startsWith('visi_misi_')) return 'Visi & Misi Akademik';
    if (key.startsWith('kurikulum_')) return 'Panduan Kurikulum & MBKM';
    if (key.startsWith('tugas_akhir_')) return 'Persyaratan & Timeline Tugas Akhir';
    if (key.startsWith('kerjasama_')) return 'Kerjasama & Kemitraan';
    return 'General';
  };

  const CATEGORIES = [
    { id: 'beranda', name: 'Beranda / Landing', icon: Home, desc: 'Pengaturan slide utama, sambutan, dan filosofi.' },
    { id: 'visi_misi', name: 'Visi & Misi', icon: FileText, desc: 'Rumusan tujuan akademik, visi, dan misi.' },
    { id: 'tata_kelola', name: 'Tata Kelola', icon: Users, desc: 'Kontak dan foto pimpinan (Sekretaris & UPM).' },
    { id: 'kurikulum', name: 'Kurikulum', icon: GraduationCap, desc: 'Pengantar sebaran SKS dan program magang.' },
    { id: 'tugas_akhir', name: 'Tugas Akhir', icon: BookOpen, desc: 'Persyaratan dan timeline skripsi mahasiswa.' },
    { id: 'kerjasama', name: 'Kerjasama', icon: Award, desc: 'Kalimat pembuka daftar mitra industri.' },
    { id: 'kkn', name: 'Praktik Kerja & KKN', icon: BookOpen, desc: 'Pengaturan deskripsi dan tautan halaman KKN.' },
    { id: 'global', name: 'Global', icon: Settings, desc: 'Konten yang dipakai lintas halaman seperti footer, kontak, dan sosial media.' }
  ] as const;

  // Filter content by search query, subsection, & category
  const filteredContent = siteContent.filter((item) => {
    // Exclude logo tuning keys from main list (they will be rendered inside logo_prodi_url card)
    if (['logo_prodi_height', 'logo_prodi_padding', 'logo_prodi_radius', 'logo_prodi_object_fit'].includes(item.key)) {
      return false;
    }

    // Exclude obsolete Kepala Laboratorium keys
    if (item.key.startsWith('gov_lab_')) {
      return false;
    }

    // Obsolete Home copy: the current landing page uses Editorial Slider/Quote instead.
    if (item.key.startsWith('philosophy_')) {
      return false;
    }

    const keyCategory = getCategoryForKey(item.key);
    const keySubSection = getSubSectionName(item.key);
    
    // If searching, show match regardless of category (helps find things quickly)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const subSec = keySubSection.toLowerCase();
      const humanLabel = getHumanLabel(item.key).toLowerCase();
      return (
        item.key.toLowerCase().includes(q) ||
        humanLabel.includes(q) ||
        item.value.toLowerCase().includes(q) ||
        (item.value_en && item.value_en.toLowerCase().includes(q)) ||
        subSec.includes(q)
      );
    }

    // Filter strictly by activeSubSection if passed
    if (activeSubSection) {
      return keySubSection === activeSubSection;
    }

    // Else filter strictly by active category
    return keyCategory === activeCategory;
  });

  // Unique subsections for rendering group titles
  const subsections = Array.from(new Set(filteredContent.map((c) => getSubSectionName(c.key))));

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      {!hideHeader && (
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
      )}

      {/* Sub-tabs Category Selector (only visible when not searching and no parent category restriction is passed) */}
      {!category && !searchQuery && !activeSubSection && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Pilih Halaman Yang Ingin Diedit</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer select-none group ${
                    isActive
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold">{cat.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-3 px-1 italic">
            * {CATEGORIES.find((c) => c.id === activeCategory)?.desc}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-slate-900" />
          <p className="text-xs font-medium">Memuat data editor...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredContent.length === 0 ? (
            <div className="py-16 bg-white border border-slate-200 rounded-2xl text-center space-y-2">
              <p className="text-sm font-medium text-slate-600">Tidak ada konten yang cocok</p>
              <p className="text-xs text-slate-400">Coba kata kunci pencarian lain.</p>
            </div>
          ) : (
            subsections.map((subName) => {
              const sectionItems = filteredContent.filter((c) => getSubSectionName(c.key) === subName);
              if (sectionItems.length === 0) return null;

              if (!searchQuery && subName === 'Spanduk & Jumbotron') {
                return <div key={subName}>{renderHeroEditor()}</div>;
              }

              if (!searchQuery && subName === 'Editorial Slider') {
                return <div key={subName}>{renderEditorialEditor()}</div>;
              }

              return (
                <div key={subName} className="space-y-4">
                  {/* Section title header */}
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1.5 h-4.5 bg-slate-900 rounded-full" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                      {subName}
                    </h3>
                  </div>

                  {/* Items grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {sectionItems.map((item) => {
                      const vals = editValues[item.key] || { id: '', en: '' };
                      const isSaving = savingKeys[item.key] || false;

                      // Check if this is a linked photo field
                      const parentRelation = Object.entries(KEY_RELATIONS).find(
                        ([_, rel]) => rel.photoKey === item.key
                      );
                      const parentKey = parentRelation ? parentRelation[0] : null;
                      const parentVal = parentKey ? (editValues[parentKey]?.id || '') : '';
                      const linkedDosen = parentVal ? dosenList.find(d => d.name === parentVal) : null;

                      const isFocused = focusedKey === item.key;

                      return (
                        <div 
                          key={item.key} 
                          id={`editor-card-${item.key}`}
                          className={`p-6 bg-white border rounded-2xl flex flex-col gap-6 shadow-xs transition-all duration-500 ${
                            isFocused
                              ? 'ring-2 ring-indigo-500 border-indigo-400 scale-[1.01] shadow-md'
                              : 'border-slate-200/70 hover:border-slate-300'
                          }`}
                        >
                          
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
                                {linkedDosen ? (
                                  <div className="flex flex-col md:flex-row gap-4 items-center bg-indigo-50/50 p-4 border border-indigo-150 rounded-xl">
                                    {(linkedDosen.img_src || vals.id) && (
                                      <img src={linkedDosen.img_src || vals.id} className="w-24 h-24 object-cover rounded-xl border border-indigo-200 shrink-0 bg-white shadow-xs" alt="Preview" />
                                    )}
                                    <div className="flex-1 w-full">
                                      <p className="text-xs font-bold text-indigo-900 mb-1">
                                        Foto Terhubung Otomatis
                                      </p>
                                      <p className="text-[11px] text-indigo-700 leading-relaxed">
                                        Foto ini diambil otomatis dari profil dosen <b>{linkedDosen.name}</b>. Untuk mengubah foto ini, silakan edit foto di tab <b>Dosen</b> atau pilih nama non-dosen pada input nama di atas.
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50/50 p-4 border border-slate-150 rounded-xl">
                                    {vals.id && (
                                      vals.id.toLowerCase().endsWith('.mp4') ||
                                      vals.id.toLowerCase().endsWith('.webm') ||
                                      vals.id.toLowerCase().endsWith('.ogg') ||
                                      vals.id.startsWith('data:video/') ? (
                                        <video src={vals.id} className="w-24 h-24 object-cover rounded-xl border border-slate-200 shrink-0 bg-white shadow-xs" controls muted />
                                      ) : (
                                        <img 
                                          src={vals.id} 
                                          className="w-24 h-24 rounded-xl border border-slate-200 shrink-0 bg-white shadow-xs" 
                                          style={item.key === 'logo_prodi_url' ? {
                                            height: `${editValues['logo_prodi_height']?.id || '48'}px`,
                                            width: 'auto',
                                            padding: `${editValues['logo_prodi_padding']?.id || '0'}px`,
                                            borderRadius: `${editValues['logo_prodi_radius']?.id || '0'}px`,
                                            objectFit: (editValues['logo_prodi_object_fit']?.id || 'contain') as any,
                                          } : {
                                            objectFit: 'cover'
                                          }}
                                          alt="Preview" 
                                        />
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
                                          id={`input-id-${item.key}`}
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
                                )}

                                {item.key === 'logo_prodi_url' && (
                                  <div className="mt-6 p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-5">
                                    <div className="border-b border-slate-100 pb-2">
                                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                        <span className="w-1.5 h-3 bg-indigo-500 rounded-full" />
                                        <span>Style Tuner (Pengaturan Tampilan Logo)</span>
                                      </h5>
                                      <p className="text-[10px] text-slate-400 mt-0.5">Sesuaikan tampilan logo agar presisi di header website utama secara real-time.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                      {/* Height Slider */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                          <span>Tinggi Logo (Height)</span>
                                          <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">{editValues['logo_prodi_height']?.id || '48'}px</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="24"
                                          max="80"
                                          value={editValues['logo_prodi_height']?.id || '48'}
                                          onChange={(e) => {
                                            handleInputChange('logo_prodi_height', 'id', e.target.value);
                                            handleInputChange('logo_prodi_height', 'en', e.target.value);
                                          }}
                                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                        />
                                      </div>

                                      {/* Padding Slider */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                          <span>Jarak Dalam (Padding)</span>
                                          <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">{editValues['logo_prodi_padding']?.id || '0'}px</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0"
                                          max="24"
                                          value={editValues['logo_prodi_padding']?.id || '0'}
                                          onChange={(e) => {
                                            handleInputChange('logo_prodi_padding', 'id', e.target.value);
                                            handleInputChange('logo_prodi_padding', 'en', e.target.value);
                                          }}
                                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                        />
                                      </div>

                                      {/* Border Radius Slider */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                          <span>Kelengkungan Sudut (Radius)</span>
                                          <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">{editValues['logo_prodi_radius']?.id || '0'}px</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0"
                                          max="40"
                                          value={editValues['logo_prodi_radius']?.id || '0'}
                                          onChange={(e) => {
                                            handleInputChange('logo_prodi_radius', 'id', e.target.value);
                                            handleInputChange('logo_prodi_radius', 'en', e.target.value);
                                          }}
                                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                        />
                                      </div>

                                      {/* Object Fit Dropdown */}
                                      <div className="space-y-1.5">
                                        <span className="text-[11px] font-bold text-slate-600 block">Kesesuaian Tampilan (Object Fit)</span>
                                        <select
                                          value={editValues['logo_prodi_object_fit']?.id || 'contain'}
                                          onChange={(e) => {
                                            handleInputChange('logo_prodi_object_fit', 'id', e.target.value);
                                            handleInputChange('logo_prodi_object_fit', 'en', e.target.value);
                                          }}
                                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition cursor-pointer"
                                        >
                                          <option value="contain">Contain (Utuh Proporsional)</option>
                                          <option value="cover">Cover (Penuhi Area)</option>
                                          <option value="fill">Fill (Rentangkan Penuh)</option>
                                        </select>
                                      </div>
                                    </div>
                                    <p className="text-[10px] text-indigo-500 italic mt-2">
                                      * Perubahan pada tuner di atas akan langsung tersimpan ketika Anda menekan tombol <b>Simpan</b> di atas.
                                    </p>
                                  </div>
                                )}
                                {uploadingKeys[item.key] && (
                                  <p className="text-[10px] text-indigo-600 animate-pulse font-medium">Sedang mengunggah file...</p>
                                )}
                                {uploadErrors[item.key] && (
                                  <p className="text-[10px] text-red-500 font-semibold">{uploadErrors[item.key]}</p>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-4 w-full">
                                {KEY_RELATIONS[item.key] && dosenList.length > 0 && (
                                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                    <label className="text-xs font-bold text-slate-700 block">Hubungkan dengan Data Dosen:</label>
                                    <select
                                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition cursor-pointer"
                                      value={dosenList.some(d => d.name === vals.id) ? dosenList.find(d => d.name === vals.id)?.name : ''}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (val) {
                                          const selectedDosen = dosenList.find(d => d.name === val);
                                          if (selectedDosen) {
                                            // 1. Update name
                                            handleInputChange(item.key, 'id', selectedDosen.name);
                                            handleInputChange(item.key, 'en', selectedDosen.name);
                                            // 2. Update photo if relation exists
                                            const rel = KEY_RELATIONS[item.key];
                                            if (rel && selectedDosen.img_src) {
                                              handleInputChange(rel.photoKey, 'id', selectedDosen.img_src);
                                              handleInputChange(rel.photoKey, 'en', selectedDosen.img_src);
                                            }
                                          }
                                        }
                                      }}
                                    >
                                      <option value="">-- Ketik Manual / Non-Dosen --</option>
                                      {dosenList.map((dosen) => (
                                        <option key={dosen.id} value={dosen.name}>
                                          {dosen.name}
                                        </option>
                                      ))}
                                    </select>
                                    <p className="text-[10px] text-slate-400">
                                      Memilih dosen akan otomatis memperbarui nama dan foto. Menekan tombol <b>Simpan</b> pada nama juga akan menyimpan fotonya secara otomatis.
                                    </p>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                                  {/* Indonesian Input */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200/50">ID</span>
                                      <span className="text-xs font-semibold text-slate-600">Bahasa Indonesia</span>
                                    </div>
                                    <textarea
                                      id={`input-id-${item.key}`}
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
                                      id={`input-en-${item.key}`}
                                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-450 focus:bg-white transition min-h-[90px] leading-relaxed"
                                      value={vals.en}
                                      onChange={(e) => handleInputChange(item.key, 'en', e.target.value)}
                                      placeholder="Biarkan kosong untuk menggunakan teks bahasa Indonesia"
                                    />
                                  </div>
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
            })
          )}
        </div>
      )}
    </div>
  );
}
