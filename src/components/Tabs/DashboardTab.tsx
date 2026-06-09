import {
  Newspaper,
  Calendar,
  Image,
  Users,
  FileText,
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { type DbNews, type DbEvent, type DbPartner, type DbLandingPortfolioItem } from '../../lib/mockData';
import { type TabType } from '../../App';

interface DashboardTabProps {
  news: DbNews[];
  events: DbEvent[];
  landingPortfolioItems: DbLandingPortfolioItem[];
  partners: DbPartner[];
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardTab({
  news,
  events,
  landingPortfolioItems,
  partners,
  setActiveTab
}: DashboardTabProps) {
  return (
    <div className="space-y-8 select-none">
      {/* Welcome banner */}
      <div className="flex justify-between items-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm glass-card">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-semibold text-sm mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Welcome back</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sistem Kontrol Akademik</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola konten, berita, agenda, dan portofolio prodi secara dinamis.</p>
        </div>
      </div>

      {/* Grid of 4 soft gradient stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="gradient-1 p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col justify-between min-h-[140px]">
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{news.length}</h3>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Berita & Artikel</span>
            </div>
            <p className="text-[11px] text-gray-400">Total berita terbit di halaman utama</p>
          </div>
        </div>

        <div className="gradient-2 p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col justify-between min-h-[140px]">
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{events.length}</h3>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Kegiatan</span>
            </div>
            <p className="text-[11px] text-gray-400">Workshop, seminar, & kuliah umum</p>
          </div>
        </div>

        <div className="gradient-3 p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col justify-between min-h-[140px]">
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{landingPortfolioItems.length}</h3>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <Image className="w-3.5 h-3.5" />
              <span>Karya Portofolio</span>
            </div>
            <p className="text-[11px] text-gray-400">Arsip karya kriya & pameran mahasiswa</p>
          </div>
        </div>

        <div className="gradient-4 p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col justify-between min-h-[140px]">
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{partners.length}</h3>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Mitra Industri</span>
            </div>
            <p className="text-[11px] text-gray-400">Kolaborasi magang & jejaring industri</p>
          </div>
        </div>
      </div>

      {/* Grid: Recent News & Events previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Berita Terbaru</h3>
            <button
              onClick={() => setActiveTab('news')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                <img src={item.img_src} className="w-12 h-12 object-cover rounded-xl bg-gray-50 border border-gray-100" alt="" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-gray-900 truncate">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.date} | <span className="font-semibold text-indigo-500">{item.category}</span></div>
                </div>
              </div>
            ))}
            {news.length === 0 && <div className="text-sm text-gray-400 py-6 text-center">Belum ada berita terbit.</div>}
          </div>
        </div>

        {/* Upcoming Events Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Agenda Terdekat</h3>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {events.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-base font-extrabold text-indigo-600 leading-none">{item.date_day}</span>
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">{item.date_month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-gray-900 truncate">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">📍 {item.location}</div>
                </div>
              </div>
            ))}
            {events.length === 0 && <div className="text-sm text-gray-400 py-6 text-center">Belum ada agenda terdekat.</div>}
          </div>
        </div>
      </div>

      {/* Front-End Integration Guideline Card */}
      <div className="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-gray-950 uppercase tracking-wider mb-2 text-sm flex items-center gap-2">
          <Database className="w-4.5 h-4.5 text-indigo-600" />
          <span>Panduan Integrasi Front-End</span>
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed max-w-3xl mb-4">
          Aplikasi landing page utama Anda (`prodi-umbandung`) telah dirancang untuk membaca data dari Supabase secara dinamis. Pastikan skema tabel di Supabase Anda sesuai dengan spesifikasi. Jika Anda mengubah teks landing, data di halaman beranda akan otomatis diperbarui.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('site_content')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-indigo-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ubah Konten Teks Halaman</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Lihat Struktur Tabel SQL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
