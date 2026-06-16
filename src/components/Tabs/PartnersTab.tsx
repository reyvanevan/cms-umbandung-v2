import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
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

export default function PartnersTab({
  partners,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal
}: PartnersTabProps) {
  const filteredPartners = partners.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama mitra kerja..."
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
          <span>Tambah Mitra</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data mitra...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl max-w-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4">Nama Partner / Instansi</th>
                <th className="p-4">Kategori</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredPartners.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-semibold text-gray-950 text-sm">
                    <div className="flex items-center gap-3">
                      {item.logo_url ? (
                        <img 
                          src={item.logo_url} 
                          alt={item.name} 
                          className="w-6 h-6 object-contain rounded border border-gray-100 bg-gray-50 p-0.5 flex-shrink-0" 
                        />
                      ) : (
                        <div className="w-6 h-6 bg-slate-100 rounded text-[9px] font-bold text-slate-400 flex items-center justify-center flex-shrink-0" title="Hanya Teks">
                          TXT
                        </div>
                      )}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.category === 'akademik' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                        : item.category === 'pemerintah' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-100' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {item.category === 'akademik' 
                        ? 'Akademik' 
                        : item.category === 'pemerintah' 
                        ? 'Pemerintah' 
                        : 'Industri'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"
                        title="Edit Partner"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Partner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPartners.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada mitra industri ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  );
}
