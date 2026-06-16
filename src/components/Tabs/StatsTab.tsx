import { Edit2, Plus, RefreshCw, Search, Trash2, TrendingUp } from 'lucide-react';
import { type DbLandingStat } from '../../lib/mockData';

interface StatsTabProps {
  stats: DbLandingStat[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbLandingStat) => void;
  openDeleteModal: (id: string) => void;
}

export default function StatsTab({ stats, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: StatsTabProps) {
  const filteredStats = stats.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.number.toLowerCase().includes(query) || item.label.toLowerCase().includes(query) || (item.label_en || '').toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              <TrendingUp className="w-4 h-4" /> Home Section 07
            </div>
            <h2 className="text-lg font-bold text-slate-950 tracking-tight">Statistik Ribbon</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Kelola angka ringkas yang muncul sebagai pita statistik di landing page. Jaga label pendek agar tetap terbaca di desktop dan mobile.</p>
          </div>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer">
            <Plus className="w-4 h-4" /> Tambah Statistik
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500"><b className="text-slate-900">{stats.length}</b> item tersimpan</div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nilai atau label..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-2xl"><RefreshCw className="w-7 h-7 animate-spin text-slate-900" /><p className="text-sm">Memuat statistik...</p></div>
      ) : filteredStats.length === 0 ? (
        <div className="py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center"><p className="text-sm font-medium text-slate-600">Belum ada statistik yang cocok</p><p className="text-xs text-slate-400 mt-1">Tambah statistik atau ubah kata pencarian.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredStats.map((item) => (
            <div key={item.id} className="bg-slate-950 text-white border border-slate-900 rounded-2xl p-5 min-h-[190px] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-[10px] font-mono text-white/35">ORDER {item.sort_order}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition" title="Edit"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => openDeleteModal(item.id)} className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/30 text-white transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="font-serif text-4xl font-bold leading-none">{item.number}</p>
              </div>
              <div className="pt-5 border-t border-white/10">
                <p className="text-xs font-semibold leading-snug text-white/80">{item.label}</p>
                {item.label_en && <p className="text-[10px] text-white/35 mt-1 line-clamp-2">{item.label_en}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
