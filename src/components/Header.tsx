import { RefreshCw } from 'lucide-react';
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

export default function Header({
  activeTab,
  connectionMode,
  dbStatusMessage,
  isStatusChecking,
  checkDatabaseConnection,
  children
}: HeaderProps) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Home';
      case 'news':
        return 'Berita & Artikel';
      case 'events':
        return 'Agenda & Kegiatan';
      case 'testimonials':
        return 'Testimoni Alumni';
      case 'partners':
        return 'Mitra Industri';
      case 'landing_stats':
        return 'Statistik Ribbon';
      case 'landing_portfolio':
        return 'Galeri Portfolio';
      case 'site_content':
        return 'Konten Teks Halaman';
      case 'settings':
        return 'Database & Setup';
      default:
        return 'CMS Prodi';
    }
  };

  return (
    <header className="px-8 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <span>CMS Prodi</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 font-semibold">{getTabLabel()}</span>
      </div>

      {/* Right-hand Controls */}
      <div className="flex items-center gap-4">
        {/* Connection status card */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-600">
          <span className={`w-2 h-2 rounded-full ${connectionMode === 'supabase' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="font-semibold uppercase truncate max-w-[150px]" title={dbStatusMessage}>
            {connectionMode === 'supabase' ? 'Database Online' : 'Local Mock Mode'}
          </span>
          <button
            onClick={checkDatabaseConnection}
            className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-900 transition ml-1 cursor-pointer"
            title="Recheck Connection"
            disabled={isStatusChecking}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isStatusChecking ? 'animate-spin text-black' : ''}`} />
          </button>
        </div>

        {/* Custom Actions (e.g. "Add News" button) */}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </header>
  );
}
