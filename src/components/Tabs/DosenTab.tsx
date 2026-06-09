import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { type DbDosen } from '../../lib/mockData';

interface DosenTabProps {
  dosenList: DbDosen[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbDosen) => void;
  openDeleteModal: (id: string) => void;
}

export default function DosenTab({
  dosenList,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal
}: DosenTabProps) {
  const filteredDosen = dosenList.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query);
  });

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama dosen..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Create button */}
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-gray-200/50 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dosen</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data dosen...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4" style={{ width: '80px' }}>Foto</th>
                <th className="p-4">Nama Lengkap & Gelar</th>
                <th className="p-4">Scopus</th>
                <th className="p-4">Sinta</th>
                <th className="p-4">Scholar</th>
                <th className="p-4" style={{ width: '80px' }}>Urutan</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredDosen.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <img 
                      src={item.img_src || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop'} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200 bg-gray-50"
                    />
                  </td>
                  <td className="p-4 font-semibold text-gray-950 text-sm">
                    {item.name}
                  </td>
                  <td className="p-4 text-xs font-mono text-gray-500">
                    {item.scopus || '-'}
                  </td>
                  <td className="p-4 text-xs font-mono text-gray-500">
                    {item.sinta || '-'}
                  </td>
                  <td className="p-4 text-xs font-mono text-gray-500 truncate max-w-[120px]">
                    {item.scholar || '-'}
                  </td>
                  <td className="p-4 text-xs font-semibold text-gray-900">
                    {item.sort_order}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"
                        title="Edit Dosen"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Dosen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDosen.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada data dosen ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
