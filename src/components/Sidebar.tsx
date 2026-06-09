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
  GraduationCap
} from 'lucide-react';
import { type TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUserEmail: string | null;
  handleSignOut: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentUserEmail,
  handleSignOut
}: SidebarProps) {
  const getAvatarUrl = () => {
    const name = currentUserEmail || 'Admin';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
  };

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen select-none">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-50">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center shadow-md shadow-gray-200">
          <LayoutGrid className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight">
          CMS <span className="text-gray-500 font-medium text-sm">Prodi</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Main Menu</p>
          <div className="space-y-1 text-sm text-gray-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'dashboard' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-gray-500" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'news' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <Newspaper className="w-4 h-4 text-gray-500" />
              <span>Berita & Artikel</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'events' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Agenda & Kegiatan</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'testimonials' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span>Testimoni Alumni</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'partners' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4 text-gray-500" />
              <span>Mitra Industri</span>
            </button>

            <button
              onClick={() => setActiveTab('dosen')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'dosen' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-gray-500" />
              <span>Dosen & Staff</span>
            </button>
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Landing Content</p>
          <div className="space-y-1 text-sm text-gray-600">
            <button
              onClick={() => setActiveTab('landing_stats')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'landing_stats' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span>Statistik Ribbon</span>
            </button>

            <button
              onClick={() => setActiveTab('landing_portfolio')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'landing_portfolio' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4 text-gray-500" />
              <span>Galeri Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('site_content')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'site_content' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4 text-gray-500" />
              <span>Konten Teks Halaman</span>
            </button>
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">System Settings</p>
          <div className="space-y-1 text-sm text-gray-600">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                activeTab === 'settings' ? 'active text-black' : 'hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Database & Setup</span>
            </button>
          </div>
        </div>
      </nav>

      {/* User profile footer section */}
      <div className="p-4 border-t border-gray-100 flex items-center gap-3">
        <img
          src={getAvatarUrl()}
          className="w-9 h-9 rounded-full bg-gray-100 border border-gray-100"
          alt="User Avatar"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate" title={currentUserEmail || 'Admin'}>
            {currentUserEmail ? currentUserEmail.split('@')[0] : 'Administrator'}
          </p>
          <p className="text-[10px] text-gray-400 truncate">Academic Admin</p>
        </div>
        <button
          onClick={handleSignOut}
          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
