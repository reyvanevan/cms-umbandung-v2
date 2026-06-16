import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  LayoutGrid,
  TrendingUp,
  FileText,
  GraduationCap,
  BookOpen,
  Award,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Building2,
  Trophy,
  Activity,
  BarChart3
} from 'lucide-react';
import { type TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUserEmail: string | null;
  handleSignOut: () => void;
  activeSubSection: string | null;
  setActiveSubSection: (sub: string | null) => void;
}

interface NavItem {
  tab: TabType;
  subSection?: string;
  label: string;
  icon: React.ReactNode;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentUserEmail,
  handleSignOut,
  activeSubSection,
  setActiveSubSection
}: SidebarProps) {
  const getAvatarUrl = () => {
    const name = currentUserEmail || 'Admin';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff&size=128`;
  };

  // Which groups are open — default: open the one containing current activeTab/subSection
  const getInitialOpen = () => {
    return {
      beranda: ['laboratorium', 'landing_stats', 'news', 'events', 'prestasi', 'partners', 'testimonials'].includes(activeTab) || (activeTab === 'site_content' && activeSubSection !== 'Panduan Kurikulum & MBKM' && activeSubSection !== 'Kerjasama & Kemitraan' && activeSubSection !== 'Informasi Kontak & Sosial Media (Footer)'),
      tentang_kami: ['dosen', 'dosen_content', 'visi_misi', 'tata_kelola', 'laboratorium', 'kerjasama_content'].includes(activeTab),
      akademik: ['kurikulum_content', 'kurikulum_courses', 'kurikulum_plos', 'kurikulum_profiles', 'publikasi_content', 'publikasi_dosen', 'tugas_akhir_content', 'tugas_akhir_steps', 'kkn_documents'].includes(activeTab) || activeTab === 'kkn_content',
      statistik: ['statistik_content', 'statistik_maba'].includes(activeTab),
      mahasiswa_alumni: ['prestasi', 'testimonials', 'alumni_content', 'alumni', 'alumni_sectors'].includes(activeTab),
      galeri_kegiatan: ['news', 'events', 'kegiatan_dosen_content', 'kegiatan_dosen', 'kegiatan_mahasiswa_content', 'kegiatan_mahasiswa'].includes(activeTab),
      pengaturan: ['settings', 'global_content'].includes(activeTab),
    };
  };

  const [open, setOpen] = useState(getInitialOpen);

  useEffect(() => {
    const initial = getInitialOpen();
    setOpen(prev => {
      const next = { ...prev };
      Object.entries(initial).forEach(([key, val]) => {
        if (val) next[key as keyof typeof prev] = true;
      });
      return next;
    });
  }, [activeTab, activeSubSection]);

  const toggleGroup = (group: keyof ReturnType<typeof getInitialOpen>) => {
    setOpen(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'beranda',
      label: 'Halaman Beranda (Home)',
      icon: <LayoutGrid className="w-4 h-4" />,
      items: [
        { tab: 'site_content', subSection: 'Ringkasan Landing Page', label: 'Ringkasan Landing Page', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
        { tab: 'site_content', subSection: 'Spanduk & Jumbotron', label: 'Spanduk & Jumbotron', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'site_content', subSection: 'Sambutan Kepala Program Studi', label: 'Sambutan Kaprodi', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'site_content', subSection: 'Informasi Singkat Landing Page', label: 'Informasi Singkat Beranda', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'laboratorium', label: 'Laboratorium', icon: <Building2 className="w-3.5 h-3.5" /> },
        { tab: 'site_content', subSection: 'Video Profil', label: 'Video Profil', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'landing_stats', label: 'Statistik Ribbon', icon: <TrendingUp className="w-3.5 h-3.5" /> },
        { tab: 'news', label: 'Berita Terkini', icon: <Newspaper className="w-3.5 h-3.5" /> },
        { tab: 'events', label: 'Event Terkini', icon: <Calendar className="w-3.5 h-3.5" /> },
        { tab: 'prestasi', label: 'Galeri Prestasi', icon: <Trophy className="w-3.5 h-3.5" /> },
        { tab: 'site_content', subSection: 'Editorial Slider', label: 'Quote / Editorial Slider', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'partners', label: 'Mitra & Kolaborasi', icon: <Building2 className="w-3.5 h-3.5" /> },
        { tab: 'testimonials', label: 'Testimoni Alumni', icon: <MessageSquare className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'tentang_kami',
      label: 'Halaman Tentang Kami',
      icon: <Building2 className="w-4 h-4" />,
      items: [
        { tab: 'visi_misi', subSection: 'Visi & Misi Akademik', label: 'Visi & Misi Akademik', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'tata_kelola', subSection: 'Sekretaris & UPM (Tata Kelola)', label: 'Struktur Organisasi (Tata Kelola)', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'dosen_content', subSection: 'Teks Halaman Dosen', label: 'Teks Halaman Dosen', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'dosen', label: 'Dosen & Staff (SDM)', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'kerjasama_content', subSection: 'Kerjasama & Kemitraan', label: 'Kerjasama & Kemitraan', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'laboratorium', label: 'Laboratorium', icon: <Building2 className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'akademik',
      label: 'Halaman Akademik',
      icon: <GraduationCap className="w-4 h-4" />,
      items: [
        { tab: 'kurikulum_content', subSection: 'Panduan Kurikulum & MBKM', label: 'Ringkasan Kurikulum & MBKM', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'kurikulum_courses', label: 'Editor Mata Kuliah (Kurikulum)', icon: <BookOpen className="w-3.5 h-3.5" /> },
        { tab: 'kurikulum_plos', label: 'Capaian Pembelajaran (CPL)', icon: <Award className="w-3.5 h-3.5" /> },
        { tab: 'kurikulum_profiles', label: 'Profil Lulusan', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'publikasi_content', subSection: 'Teks Halaman Publikasi', label: 'Teks Halaman Publikasi', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'publikasi_dosen', label: 'Publikasi Dosen', icon: <BookOpen className="w-3.5 h-3.5" /> },
        { tab: 'tugas_akhir_content', subSection: 'Persyaratan & Timeline Tugas Akhir', label: 'Teks & Dokumen Tugas Akhir', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'tugas_akhir_steps', label: 'Tahapan Tugas Akhir', icon: <GraduationCap className="w-3.5 h-3.5" /> },
        { tab: 'kkn_content', subSection: 'Praktik Kerja & KKN', label: 'Praktik Kerja & KKN (Teks)', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'kkn_documents', label: 'Dokumen Praktik Kerja & KKN', icon: <BookOpen className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'statistik',
      label: 'Halaman Statistik',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        { tab: 'statistik_content', subSection: 'Teks Halaman Statistik', label: 'Teks Halaman Statistik', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'statistik_maba', label: 'Statistik Mahasiswa Baru (Maba)', icon: <BarChart3 className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'mahasiswa_alumni',
      label: 'Halaman Mahasiswa & Alumni',
      icon: <Users className="w-4 h-4" />,
      items: [
        { tab: 'prestasi', label: 'Prestasi Mahasiswa', icon: <Trophy className="w-3.5 h-3.5" /> },
        { tab: 'testimonials', label: 'Testimoni Alumni', icon: <MessageSquare className="w-3.5 h-3.5" /> },
        { tab: 'alumni_content', subSection: 'Teks Halaman Alumni', label: 'Teks & Tracer Alumni', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'alumni_sectors', label: 'Sektor Karier Alumni', icon: <BarChart3 className="w-3.5 h-3.5" /> },
        { tab: 'alumni', label: 'Direktori Alumni', icon: <GraduationCap className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'galeri_kegiatan',
      label: 'Halaman Galeri Kegiatan',
      icon: <Newspaper className="w-4 h-4" />,
      items: [
        { tab: 'news', label: 'Berita & Artikel', icon: <Newspaper className="w-3.5 h-3.5" /> },
        { tab: 'events', label: 'Event Terkini', icon: <Calendar className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_dosen_content', subSection: 'Teks Halaman Kegiatan Dosen', label: 'Teks Halaman Kegiatan Dosen', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_dosen', label: 'Kegiatan Dosen', icon: <Activity className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_mahasiswa_content', subSection: 'Teks Halaman Kegiatan Mahasiswa', label: 'Teks Halaman Kegiatan Mahasiswa', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_mahasiswa', label: 'Kegiatan Mahasiswa', icon: <Activity className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: <Settings className="w-4 h-4" />,
      items: [
        { tab: 'global_content', subSection: 'Informasi Kontak & Sosial Media (Footer)', label: 'Footer & Kontak Global', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'settings', label: 'Setup Database & Akun', icon: <Settings className="w-3.5 h-3.5" /> },
      ],
    },
  ];

  const handleNavClick = (tab: TabType, subSection?: string) => {
    setActiveTab(tab);
    setActiveSubSection(subSection || null);
  };

  return (
    <aside className="w-60 flex flex-col h-screen select-none flex-shrink-0" style={{ background: '#0F172A' }}>
      {/* Brand Logo */}
      <div className="px-5 py-5 flex items-center gap-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3B82F6' }}>
          <LayoutGrid className="text-white w-4 h-4" />
        </div>
        <div className="leading-tight">
          <p className="text-white font-bold text-sm tracking-tight">CMS Prodi</p>
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Academic Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Standalone Dashboard Item */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left mb-1"
          style={{
            background: activeTab === 'dashboard' ? 'rgba(59,130,246,0.15)' : 'transparent',
            color: activeTab === 'dashboard' ? '#93C5FD' : 'rgba(255,255,255,0.55)',
          }}
          onMouseEnter={e => {
            if (activeTab !== 'dashboard') (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
            if (activeTab !== 'dashboard') (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
          }}
          onMouseLeave={e => {
            if (activeTab !== 'dashboard') (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            if (activeTab !== 'dashboard') (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)';
          }}
        >
          <span style={{ color: activeTab === 'dashboard' ? '#60A5FA' : 'rgba(255,255,255,0.3)' }}>
            <LayoutDashboard className="w-4 h-4" />
          </span>
          <span>Dashboard Utama</span>
        </button>

        {/* Divider */}
        <div className="pb-2">
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Collapsible Groups */}
        {navGroups.map(group => {
          const isGroupOpen = open[group.id as keyof ReturnType<typeof getInitialOpen>];
          const hasActiveChild = group.items.some(item => {
            if (item.tab !== activeTab) return false;
            if (item.subSection && item.subSection !== activeSubSection) return false;
            return true;
          });

          return (
            <div key={group.id}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id as keyof ReturnType<typeof getInitialOpen>)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
                style={{
                  background: hasActiveChild ? 'rgba(59,130,246,0.10)' : 'transparent',
                  color: hasActiveChild ? '#93C5FD' : 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={e => {
                  if (!hasActiveChild) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  if (!hasActiveChild) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: hasActiveChild ? '#60A5FA' : 'rgba(255,255,255,0.3)' }}>
                    {group.icon}
                  </span>
                  <span>{group.label}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {isGroupOpen
                    ? <ChevronDown className="w-3.5 h-3.5" />
                    : <ChevronRight className="w-3.5 h-3.5" />
                  }
                </span>
              </button>

              {/* Sub Items */}
              {isGroupOpen && (
                <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l pl-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  {group.items.map(item => {
                    const isActive = activeTab === item.tab && (!item.subSection || activeSubSection === item.subSection);
                    return (
                      <button
                        key={`${item.tab}-${item.subSection || 'main'}`}
                        onClick={() => handleNavClick(item.tab, item.subSection)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left"
                        style={{
                          background: isActive ? 'rgba(59,130,246,0.2)' : 'transparent',
                          color: isActive ? '#93C5FD' : 'rgba(255,255,255,0.45)',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                          if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
                        }}
                      >
                        <span style={{ color: isActive ? '#60A5FA' : 'rgba(255,255,255,0.25)' }}>
                          {item.icon}
                        </span>
                        {item.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="pt-2 pb-1">
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Preview Portal Link */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
          <span>Preview Portal</span>
          <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide" style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>Live</span>
        </a>
      </nav>

      {/* User Profile Footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <img
            src={getAvatarUrl()}
            className="w-8 h-8 rounded-full flex-shrink-0"
            alt="User Avatar"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'rgba(255,255,255,0.85)' }} title={currentUserEmail || 'Admin'}>
              {currentUserEmail ? currentUserEmail.split('@')[0] : 'Administrator'}
            </p>
            <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>Academic Admin</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-lg transition-all flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            title="Log Out"
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = '#F87171';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)';
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
