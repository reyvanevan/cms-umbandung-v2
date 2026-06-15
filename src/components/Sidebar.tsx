import { useState } from 'react';
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
  Image,
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
}

interface NavItem {
  tab: TabType;
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
  handleSignOut
}: SidebarProps) {
  const getAvatarUrl = () => {
    const name = currentUserEmail || 'Admin';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff&size=128`;
  };

  // Which groups are open — default: open the one containing current activeTab
  const getInitialOpen = () => {
    return {
      beranda: ['landing_portfolio', 'landing_stats', 'site_content'].includes(activeTab),
      tentang_kami: ['dosen', 'partners', 'visi_misi', 'tata_kelola', 'laboratorium'].includes(activeTab),
      akademik: ['kurikulum_courses', 'kurikulum_plos', 'kurikulum_profiles', 'publikasi_dosen', 'tugas_akhir_steps', 'kkn_content', 'kkn_documents'].includes(activeTab),
      statistik: ['statistik_maba'].includes(activeTab),
      mahasiswa_alumni: ['prestasi', 'testimonials', 'alumni'].includes(activeTab),
      galeri_kegiatan: ['news', 'events', 'kegiatan_dosen', 'kegiatan_mahasiswa'].includes(activeTab),
      pengaturan: ['settings'].includes(activeTab),
    };
  };

  const [open, setOpen] = useState(getInitialOpen);

  const toggleGroup = (group: keyof ReturnType<typeof getInitialOpen>) => {
    setOpen(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'beranda',
      label: 'Beranda / Landing',
      icon: <LayoutGrid className="w-4 h-4" />,
      items: [
        { tab: 'landing_portfolio', label: 'Galeri Portfolio', icon: <Image className="w-3.5 h-3.5" /> },
        { tab: 'landing_stats', label: 'Statistik Ribbon', icon: <TrendingUp className="w-3.5 h-3.5" /> },
        { tab: 'site_content', label: 'Pengaturan Teks Beranda', icon: <FileText className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'tentang_kami',
      label: 'Tentang Kami',
      icon: <Building2 className="w-4 h-4" />,
      items: [
        { tab: 'visi_misi', label: 'Visi & Misi', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'tata_kelola', label: 'Tata Kelola & Pimpinan', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'dosen', label: 'Dosen & Staff (SDM)', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'partners', label: 'Kemitraan Industri', icon: <Building2 className="w-3.5 h-3.5" /> },
        { tab: 'laboratorium', label: 'Laboratorium', icon: <Building2 className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'akademik',
      label: 'Akademik',
      icon: <GraduationCap className="w-4 h-4" />,
      items: [
        { tab: 'kurikulum_courses', label: 'Editor Mata Kuliah (Kurikulum)', icon: <BookOpen className="w-3.5 h-3.5" /> },
        { tab: 'kurikulum_plos', label: 'CPL / PLO', icon: <Award className="w-3.5 h-3.5" /> },
        { tab: 'kurikulum_profiles', label: 'Profil Lulusan', icon: <Users className="w-3.5 h-3.5" /> },
        { tab: 'publikasi_dosen', label: 'Publikasi Dosen', icon: <BookOpen className="w-3.5 h-3.5" /> },
        { tab: 'tugas_akhir_steps', label: 'Tahapan Tugas Akhir', icon: <GraduationCap className="w-3.5 h-3.5" /> },
        { tab: 'kkn_content', label: 'Teks Praktik Kerja & KKN', icon: <FileText className="w-3.5 h-3.5" /> },
        { tab: 'kkn_documents', label: 'Dokumen Praktik Kerja & KKN', icon: <BookOpen className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'statistik',
      label: 'Statistik',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        { tab: 'statistik_maba', label: 'Statistik Mahasiswa Baru (Maba)', icon: <BarChart3 className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'mahasiswa_alumni',
      label: 'Mahasiswa & Alumni',
      icon: <Users className="w-4 h-4" />,
      items: [
        { tab: 'prestasi', label: 'Prestasi Mahasiswa', icon: <Trophy className="w-3.5 h-3.5" /> },
        { tab: 'testimonials', label: 'Testimoni Alumni', icon: <MessageSquare className="w-3.5 h-3.5" /> },
        { tab: 'alumni', label: 'Direktori Alumni', icon: <GraduationCap className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'galeri_kegiatan',
      label: 'Galeri Kegiatan',
      icon: <Newspaper className="w-4 h-4" />,
      items: [
        { tab: 'news', label: 'Berita & Artikel', icon: <Newspaper className="w-3.5 h-3.5" /> },
        { tab: 'events', label: 'Agenda Kegiatan', icon: <Calendar className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_dosen', label: 'Kegiatan Dosen', icon: <Activity className="w-3.5 h-3.5" /> },
        { tab: 'kegiatan_mahasiswa', label: 'Kegiatan Mahasiswa', icon: <Activity className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: <Settings className="w-4 h-4" />,
      items: [
        { tab: 'settings', label: 'Setup Database & Akun', icon: <Settings className="w-3.5 h-3.5" /> },
      ],
    },
  ];

  // Map tab → which group it lives in, so we auto-open on click
  const tabToGroup: Record<string, keyof ReturnType<typeof getInitialOpen>> = {
    landing_portfolio: 'beranda',
    landing_stats: 'beranda',
    site_content: 'beranda',
    visi_misi: 'tentang_kami',
    tata_kelola: 'tentang_kami',
    dosen: 'tentang_kami',
    partners: 'tentang_kami',
    laboratorium: 'tentang_kami',
    kurikulum_courses: 'akademik',
    kurikulum_plos: 'akademik',
    kurikulum_profiles: 'akademik',
    publikasi_dosen: 'akademik',
    tugas_akhir_steps: 'akademik',
    statistik_maba: 'statistik',
    prestasi: 'mahasiswa_alumni',
    testimonials: 'mahasiswa_alumni',
    alumni: 'mahasiswa_alumni',
    news: 'galeri_kegiatan',
    events: 'galeri_kegiatan',
    kegiatan_dosen: 'galeri_kegiatan',
    kegiatan_mahasiswa: 'galeri_kegiatan',
    settings: 'pengaturan',
  };

  const handleNavClick = (tab: TabType) => {
    const group = tabToGroup[tab];
    if (group) setOpen(prev => ({ ...prev, [group]: true }));
    setActiveTab(tab);
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
          onClick={() => setActiveTab('dashboard')}
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
          const hasActiveChild = group.items.some(item => item.tab === activeTab);

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
                    const isActive = activeTab === item.tab;
                    return (
                      <button
                        key={item.tab}
                        onClick={() => handleNavClick(item.tab)}
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
