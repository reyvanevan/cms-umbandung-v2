import { Building2, Edit2, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { type DbLaboratorium } from '../../lib/mockData';

interface LaboratoriumTabProps {
  laboratoriumList: DbLaboratorium[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbLaboratorium) => void;
  openDeleteModal: (id: string) => void;
}

export default function LaboratoriumTab({ laboratoriumList, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: LaboratoriumTabProps) {
  const filtered = laboratoriumList.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || (item.name_en || '').toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2"><Building2 className="w-4 h-4" /> Home Section 05</div>
            <h2 className="text-lg font-bold text-slate-950 tracking-tight">Laboratorium</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Kelola kartu fasilitas laboratorium yang tampil di landing page dan halaman tentang. Pastikan gambar jelas dan deskripsi tidak terlalu panjang.</p>
          </div>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"><Plus className="w-4 h-4" /> Tambah Laboratorium</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500"><b className="text-slate-900">{laboratoriumList.length}</b> fasilitas tersimpan</div>
          <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><input type="text" placeholder="Cari laboratorium..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
        </div>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-2xl"><RefreshCw className="w-7 h-7 animate-spin text-slate-900" /><p className="text-sm">Memuat laboratorium...</p></div>
      ) : filtered.length === 0 ? (
        <div className="py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center"><p className="text-sm font-medium text-slate-600">Belum ada laboratorium yang cocok</p><p className="text-xs text-slate-400 mt-1">Tambah data atau ubah kata pencarian.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item, idx) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img src={item.image_url} alt={item.name} className="absolute inset-0 w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576086213369-97a306dca665?q=80&w=600&auto=format&fit=crop'; }} />
                <div className="absolute left-4 top-4 px-2 py-1 rounded-lg bg-white/90 text-[10px] font-bold text-slate-700 shadow-sm">#{item.sort_order || idx + 1}</div>
                <div className="absolute right-4 top-4 flex gap-1.5"><button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white"><Edit2 className="w-4 h-4" /></button><button onClick={() => openDeleteModal(item.id)} className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-white"><Trash2 className="w-4 h-4" /></button></div>
              </div>
              <div className="p-5 space-y-3">
                <div><h3 className="font-serif text-xl font-bold text-slate-950 leading-tight">{item.name}</h3>{item.name_en && <p className="text-xs text-slate-400 italic mt-1">{item.name_en}</p>}</div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
