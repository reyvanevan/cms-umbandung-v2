import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { type DbNews } from '../../lib/mockData';

interface NewsTabProps {
  news: DbNews[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbNews) => void;
  openDeleteModal: (id: string) => void;
}

export default function NewsTab({
  news,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal
}: NewsTabProps) {
  // Filter list based on search query
  const filteredNews = news.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      (item.title_en && item.title_en.toLowerCase().includes(query)) ||
      item.category.toLowerCase().includes(query) ||
      (item.category_en && item.category_en.toLowerCase().includes(query)) ||
      item.snippet.toLowerCase().includes(query)
    );
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
            placeholder="Cari berita berdasarkan judul/kategori..."
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
          <span>Tambah Berita</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data berita...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4" style={{ width: '80px' }}>Foto</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Judul Berita (Bilingual)</th>
                <th className="p-4">Ringkasan / Snippet</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <img src={item.img_src} className="w-12 h-12 object-cover rounded-xl border border-gray-100 bg-gray-50" alt="" />
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
                      {item.category}
                    </span>
                    {item.category_en && (
                      <span className="block text-[10px] text-gray-400 mt-1">
                        {item.category_en}
                      </span>
                    )}
                  </td>
                  <td className="p-4 max-w-[200px] break-words">
                    <div className="font-semibold text-gray-900 leading-tight">{item.title}</div>
                    {item.title_en && (
                      <div className="text-xs text-gray-400 font-medium italic mt-1">{item.title_en}</div>
                    )}
                  </td>
                  <td className="p-4 max-w-[250px] break-words text-gray-500 text-xs leading-relaxed">
                    {item.snippet}
                  </td>
                  <td className="p-4 whitespace-nowrap text-gray-500 font-medium text-xs">
                    {item.date}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition cursor-pointer"
                        title="Edit Berita"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNews.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada berita ditemukan.
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
