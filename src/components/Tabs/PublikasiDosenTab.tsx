import { Plus, Search, Edit2, Trash2, RefreshCw, ExternalLink } from 'lucide-react';
import { type DbPublikasiDosen } from '../../lib/mockData';

interface PublikasiDosenTabProps {
  publikasiList: DbPublikasiDosen[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbPublikasiDosen) => void;
  openDeleteModal: (id: string) => void;
}

export default function PublikasiDosenTab({ publikasiList, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: PublikasiDosenTabProps) {
  const filtered = publikasiList.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q) || item.year.includes(q);
  });

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input type="text" placeholder="Cari judul atau penulis..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition cursor-pointer self-start sm:self-auto">
          <Plus className="w-4 h-4" /><span>Tambah Publikasi</span>
        </button>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" /><p className="text-sm">Memuat data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4">Judul Publikasi (Bilingual)</th>
                <th className="p-4" style={{ width: '180px' }}>Penulis</th>
                <th className="p-4">Jurnal / Prosiding</th>
                <th className="p-4" style={{ width: '80px' }}>Tahun</th>
                <th className="p-4" style={{ width: '90px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-950 text-sm leading-snug">{item.title}</div>
                    {item.title_en && <div className="text-xs text-gray-400 italic mt-0.5">{item.title_en}</div>}
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">{item.category}</span>
                  </td>
                  <td className="p-4 text-gray-600 text-xs font-medium">{item.author}</td>
                  <td className="p-4 text-gray-500 text-xs">{item.journal}</td>
                  <td className="p-4 text-gray-600 font-semibold">{item.year}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition"><ExternalLink className="w-4 h-4" /></a>}
                      <button onClick={() => openEditModal(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => openDeleteModal(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">Tidak ada publikasi ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
