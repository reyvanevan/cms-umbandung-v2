import { Edit2, MessageSquare, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { type DbTestimonial } from '../../lib/mockData';

interface TestimonialsTabProps {
  testimonials: DbTestimonial[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbTestimonial) => void;
  openDeleteModal: (id: string) => void;
}

export default function TestimonialsTab({ testimonials, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: TestimonialsTabProps) {
  const filteredTestimonials = testimonials.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.by.toLowerCase().includes(query) || (item.by_en || '').toLowerCase().includes(query) || (item.role || '').toLowerCase().includes(query) || (item.role_en || '').toLowerCase().includes(query) || item.testimonial.toLowerCase().includes(query) || (item.testimonial_en || '').toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-2xl"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2"><MessageSquare className="w-4 h-4" /> Home Section 13</div><h2 className="text-lg font-bold text-slate-950 tracking-tight">Testimoni Alumni</h2><p className="text-xs text-slate-500 mt-1 leading-relaxed">Kelola kutipan alumni yang muncul di landing page. Preview membantu mengecek panjang kutipan, nama, jabatan, dan foto.</p></div>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"><Plus className="w-4 h-4" /> Tambah Testimoni</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100"><div className="text-xs text-slate-500"><b className="text-slate-900">{testimonials.length}</b> testimoni tersimpan</div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><input type="text" placeholder="Cari nama/kutipan..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div></div>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-2xl"><RefreshCw className="w-7 h-7 animate-spin text-slate-900" /><p className="text-sm">Memuat testimoni...</p></div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center"><p className="text-sm font-medium text-slate-600">Belum ada testimoni yang cocok</p><p className="text-xs text-slate-400 mt-1">Tambah testimoni atau ubah kata pencarian.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTestimonials.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition min-h-[260px] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3"><div className="text-5xl font-serif text-slate-200 leading-none">“</div><div className="flex gap-1.5"><button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Edit2 className="w-4 h-4" /></button><button onClick={() => openDeleteModal(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button></div></div>
              <div className="space-y-4"><p className="text-sm text-slate-600 leading-relaxed italic line-clamp-5">{item.testimonial}</p>{item.testimonial_en && <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-2">{item.testimonial_en}</p>}</div>
              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-100"><img src={item.img_src} className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-slate-50" alt="" /><div className="min-w-0"><p className="text-xs font-bold text-slate-950 truncate">{item.by}</p>{item.role && <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.role}</p>}{item.by_en && <p className="text-[10px] text-slate-400 truncate mt-1">{item.by_en}{item.role_en ? ` · ${item.role_en}` : ''}</p>}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
