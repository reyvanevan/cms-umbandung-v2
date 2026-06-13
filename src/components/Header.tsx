import { RefreshCw, Database, Wifi, WifiOff } from 'lucide-react';
import { type TabType } from '../App';
import { type ConnectionMode } from '../lib/dataService';

interface HeaderProps {
  activeTab: TabType;
  connectionMode: ConnectionMode;
  dbStatusMessage: string;
  isStatusChecking: boolean;
  checkDatabaseConnection: () => void;
  children?: React.ReactNode;
}

const TAB_LABELS: Record<TabType, string> = {
  dashboard: 'Dashboard Utama',
  landing_portfolio: 'Galeri Portfolio',
  landing_stats: 'Statistik Ribbon',
  site_content: 'Pengaturan Teks Beranda',
  visi_misi: 'Visi & Misi',
  tata_kelola: 'Tata Kelola & Pimpinan',
  dosen: 'Dosen & Staff (SDM)',
  partners: 'Kemitraan Industri',
  kurikulum_courses: 'Editor Mata Kuliah (Kurikulum)',
  kurikulum_plos: 'CPL / PLO',
  kurikulum_profiles: 'Profil Lulusan',
  publikasi_dosen: 'Publikasi Dosen',
  tugas_akhir_steps: 'Tahapan Tugas Akhir',
  statistik_maba: 'Statistik Mahasiswa Baru (Maba)',
  prestasi: 'Prestasi Mahasiswa',
  testimonials: 'Testimoni Alumni',
  alumni: 'Direktori Alumni',
  news: 'Berita & Artikel',
  events: 'Agenda Kegiatan',
  kegiatan_dosen: 'Kegiatan Dosen',
  kegiatan_mahasiswa: 'Kegiatan Mahasiswa',
  settings: 'Setup Database & Akun',
};

const TAB_GROUPS: Partial<Record<TabType, string>> = {
  dashboard: 'Beranda / Landing',
  landing_portfolio: 'Beranda / Landing',
  landing_stats: 'Beranda / Landing',
  site_content: 'Beranda / Landing',
  visi_misi: 'Tentang Kami',
  tata_kelola: 'Tentang Kami',
  dosen: 'Tentang Kami',
  partners: 'Tentang Kami',
  kurikulum_courses: 'Akademik',
  kurikulum_plos: 'Akademik',
  kurikulum_profiles: 'Akademik',
  publikasi_dosen: 'Akademik',
  tugas_akhir_steps: 'Akademik',
  statistik_maba: 'Statistik',
  prestasi: 'Mahasiswa & Alumni',
  testimonials: 'Mahasiswa & Alumni',
  alumni: 'Mahasiswa & Alumni',
  news: 'Galeri Kegiatan',
  events: 'Galeri Kegiatan',
  kegiatan_dosen: 'Galeri Kegiatan',
  kegiatan_mahasiswa: 'Galeri Kegiatan',
  settings: 'Pengaturan',
};

export default function Header({
  activeTab,
  connectionMode,
  dbStatusMessage,
  isStatusChecking,
  checkDatabaseConnection,
  children
}: HeaderProps) {
  const group = TAB_GROUPS[activeTab];
  const label = TAB_LABELS[activeTab] ?? 'CMS Prodi';
  const isOnline = connectionMode === 'supabase';

  return (
    <header className="px-7 py-4 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-400 font-medium">CMS Prodi</span>
        {group && (
          <>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400 font-medium">{group}</span>
          </>
        )}
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold">{label}</span>
      </div>

      {/* Right-hand Controls */}
      <div className="flex items-center gap-3">
        {/* Connection status */}
        <button
          onClick={checkDatabaseConnection}
          disabled={isStatusChecking}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
          style={{
            background: isOnline ? '#F0FDF4' : '#FFFBEB',
            borderColor: isOnline ? '#BBF7D0' : '#FDE68A',
            color: isOnline ? '#15803D' : '#92400E',
          }}
          title={dbStatusMessage}
        >
          {isStatusChecking
            ? <RefreshCw className="w-3 h-3 animate-spin" />
            : isOnline
              ? <Wifi className="w-3 h-3" />
              : <WifiOff className="w-3 h-3" />
          }
          <span className="hidden sm:inline">
            {isOnline ? 'Supabase Connected' : 'Local Mock Mode'}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isOnline ? '#22C55E' : '#F59E0B' }}
          />
        </button>

        {/* DB Icon shortcut */}
        <div title={dbStatusMessage} className="hidden md:flex">
          <Database className="w-4 h-4 text-gray-300" />
        </div>

        {/* Custom action buttons from parent */}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </header>
  );
}
