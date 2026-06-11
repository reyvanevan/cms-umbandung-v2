import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { type DbPrestasi } from '../../lib/mockData';

interface PrestasiTabProps {
  prestasiList: DbPrestasi[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbPrestasi) => void;
  openDeleteModal: (id: string) => void;
}

const typeLabel: Record<string, string> = { prodi: 'Prodi / Institusi', mahasiswa: 'Mahasiswa' };

export default function PrestasiTab({ prestasiList, searchQuery, setSearchQuery, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: PrestasiTabProps) {
  const filtered = prestasiList.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.year.includes(q) || (item.competitor || '').toLowerCase().includes(q);
  });

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input type="text" placeholder="Cari prestasi..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition cursor-pointer self-start sm:self-auto">
          <Plus className="w-4 h-4" /><span>Tambah Prestasi</span>
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
                <th className="p-4">Tipe</th>
                <th className="p-4">Judul Prestasi (Bilingual)</th>
                <th className="p-4" style={{ width: '80px' }}>Tahun</th>
                <th className="p-4">Penyelenggara / Peserta</th>
                <th className="p-4" style={{ width: '90px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${item.type === 'prodi' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                      {typeLabel[item.type] ?? item.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-950 text-sm">{item.title}</div>
                    {item.title_en && <div className="text-xs text-gray-400 italic mt-0.5">{item.title_en}</div>}
                  </td>
                  <td className="p-4 text-gray-600 font-semibold">{item.year}</td>
                  <td className="p-4">
                    {item.host && <div className="text-xs text-gray-500">{item.host}</div>}
                    {item.competitor && <div className="text-xs text-gray-400 italic mt-0.5">{item.competitor}</div>}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => openDeleteModal(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">Tidak ada prestasi ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
