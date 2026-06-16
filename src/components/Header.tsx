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
  kurikulum_content: 'Ringkasan Kurikulum & MBKM',
  tugas_akhir_content: 'Teks & Dokumen Tugas Akhir',
  capstone_content: 'Capstone Design',
  spm_content: 'Sistem Penjaminan Mutu',
  kerjasama_content: 'Kerjasama & Kemitraan',
  statistik_content: 'Teks Halaman Statistik',
  alumni_content: 'Teks & Tracer Alumni',
  alumni_sectors: 'Sektor Karier Alumni',
  kegiatan_dosen_content: 'Teks Halaman Kegiatan Dosen',
  kegiatan_mahasiswa_content: 'Teks Halaman Kegiatan Mahasiswa',
  publikasi_content: 'Teks Halaman Publikasi',
  dosen_content: 'Teks Halaman Dosen',
  global_content: 'Footer & Kontak Global',
  laboratorium: 'Laboratorium',
  dosen: 'Dosen & Staff (SDM)',
  partners: 'Kemitraan Industri',
  kurikulum_courses: 'Editor Mata Kuliah (Kurikulum)',
  kurikulum_plos: 'CPL / PLO',
  kurikulum_profiles: 'Profil Lulusan',
  publikasi_dosen: 'Publikasi Dosen',
  tugas_akhir_steps: 'Tahapan Tugas Akhir',
  statistik_maba: 'Statistik Mahasiswa Baru (Maba)',
  prestasi: 'Prestasi',
  testimonials: 'Testimoni Alumni',
  alumni: 'Direktori Alumni',
  news: 'Berita & Artikel',
  events: 'Event Terkini',
  kegiatan_dosen: 'Kegiatan Dosen',
  kegiatan_mahasiswa: 'Kegiatan Mahasiswa',
  settings: 'Setup Database & Akun',
  kkn_content: 'Konten KKN',
  kkn_documents: 'Dokumen KKN',
};

const TAB_GROUPS: Partial<Record<TabType, string>> = {
  dashboard: 'Beranda / Landing',
  landing_portfolio: 'Beranda / Landing',
  landing_stats: 'Beranda / Landing',
  site_content: 'Beranda / Landing',
  visi_misi: 'Tentang Kami',
  tata_kelola: 'Tentang Kami',
  kerjasama_content: 'Tentang Kami',
  dosen_content: 'Tentang Kami',
  global_content: 'Pengaturan',
  laboratorium: 'Tentang Kami',
  dosen: 'Tentang Kami',
  partners: 'Tentang Kami',
  kurikulum_content: 'Akademik',
  kurikulum_courses: 'Akademik',
  kurikulum_plos: 'Akademik',
  kurikulum_profiles: 'Akademik',
  capstone_content: 'Akademik',
  spm_content: 'Tentang Kami',
  publikasi_content: 'Akademik',
  publikasi_dosen: 'Akademik',
  tugas_akhir_content: 'Akademik',
  tugas_akhir_steps: 'Akademik',
  kkn_content: 'Akademik',
  kkn_documents: 'Akademik',
  statistik_content: 'Statistik',
  statistik_maba: 'Statistik',
  prestasi: 'Mahasiswa & Alumni',
  testimonials: 'Mahasiswa & Alumni',
  alumni_content: 'Mahasiswa & Alumni',
  alumni_sectors: 'Mahasiswa & Alumni',
  alumni: 'Mahasiswa & Alumni',
  news: 'Galeri Kegiatan',
  events: 'Galeri Kegiatan',
  kegiatan_dosen_content: 'Galeri Kegiatan',
  kegiatan_dosen: 'Galeri Kegiatan',
  kegiatan_mahasiswa_content: 'Galeri Kegiatan',
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
