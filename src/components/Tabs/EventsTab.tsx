import { Calendar, Edit2, MapPin, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { type DbEvent } from '../../lib/mockData';

interface EventsTabProps {
  events: DbEvent[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbEvent) => void;
  openDeleteModal: (id: string) => void;
}

export default function EventsTab({ events, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: EventsTabProps) {
  const filteredEvents = events.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query) || (item.title_en || '').toLowerCase().includes(query) || item.location.toLowerCase().includes(query) || (item.location_en || '').toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-2xl"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2"><Calendar className="w-4 h-4" /> Home Section 09</div><h2 className="text-lg font-bold text-slate-950 tracking-tight">Event Terkini</h2><p className="text-xs text-slate-500 mt-1 leading-relaxed">Kelola kartu event landing page. Format tanggal terpisah hari/bulan supaya tampilan publik tetap kuat dan mudah dipindai.</p></div>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"><Plus className="w-4 h-4" /> Tambah Event</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100"><div className="text-xs text-slate-500"><b className="text-slate-900">{events.length}</b> event tersimpan</div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><input type="text" placeholder="Cari event/lokasi..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div></div>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-2xl"><RefreshCw className="w-7 h-7 animate-spin text-slate-900" /><p className="text-sm">Memuat event...</p></div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center"><p className="text-sm font-medium text-slate-600">Belum ada event yang cocok</p><p className="text-xs text-slate-400 mt-1">Tambah event atau ubah kata pencarian.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEvents.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition min-h-[220px] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex flex-col items-center justify-center shrink-0"><span className="text-2xl font-serif font-bold leading-none">{item.date_day}</span><span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">{item.date_month}</span></div>
                <div className="flex gap-1.5"><button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Edit2 className="w-4 h-4" /></button><button onClick={() => openDeleteModal(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button></div>
              </div>
              <div className="pt-6 space-y-3"><h3 className="font-serif text-xl font-bold text-slate-950 leading-tight line-clamp-2">{item.title}</h3>{item.title_en && <p className="text-xs text-slate-400 italic line-clamp-1">{item.title_en}</p>}<div className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span>{item.location}</span></div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
