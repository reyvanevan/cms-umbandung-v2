import { Building2, Edit2, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { type DbPartner } from '../../lib/mockData';

interface PartnersTabProps {
  partners: DbPartner[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbPartner) => void;
  openDeleteModal: (id: string) => void;
}

const categoryClass: Record<string, string> = {
  akademik: 'bg-blue-50 text-blue-700 border-blue-100',
  pemerintah: 'bg-amber-50 text-amber-700 border-amber-100',
  industri: 'bg-emerald-50 text-emerald-700 border-emerald-100'
};

export default function PartnersTab({ partners, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: PartnersTabProps) {
  const filteredPartners = partners.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-2xl"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2"><Building2 className="w-4 h-4" /> Home Section 12</div><h2 className="text-lg font-bold text-slate-950 tracking-tight">Mitra & Kolaborasi</h2><p className="text-xs text-slate-500 mt-1 leading-relaxed">Kelola logo dan nama mitra yang muncul di landing page dan halaman kerjasama. Gunakan kategori untuk mengelompokkan industri, akademik, dan pemerintah.</p></div>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"><Plus className="w-4 h-4" /> Tambah Mitra</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100"><div className="text-xs text-slate-500"><b className="text-slate-900">{partners.length}</b> mitra tersimpan</div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><input type="text" placeholder="Cari nama/kategori mitra..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div></div>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-2xl"><RefreshCw className="w-7 h-7 animate-spin text-slate-900" /><p className="text-sm">Memuat mitra...</p></div>
      ) : filteredPartners.length === 0 ? (
        <div className="py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center"><p className="text-sm font-medium text-slate-600">Belum ada mitra yang cocok</p><p className="text-xs text-slate-400 mt-1">Tambah mitra atau ubah kata pencarian.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredPartners.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition min-h-[180px] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3"><div className="w-14 h-14 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">{item.logo_url ? <img src={item.logo_url} alt={item.name} className="max-w-full max-h-full object-contain p-2" /> : <span className="text-[10px] font-bold text-slate-400">TXT</span>}</div><div className="flex gap-1.5"><button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Edit2 className="w-4 h-4" /></button><button onClick={() => openDeleteModal(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button></div></div>
              <div className="pt-6"><h3 className="font-bold text-sm text-slate-950 leading-tight line-clamp-2">{item.name}</h3><span className={`inline-flex mt-3 px-2.5 py-1 rounded-full border text-[10px] font-bold ${categoryClass[item.category] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>{item.category === 'akademik' ? 'Akademik' : item.category === 'pemerintah' ? 'Pemerintah' : 'Industri'}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
