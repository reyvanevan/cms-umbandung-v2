import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
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

export default function EventsTab({
  events,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal
}: EventsTabProps) {
  const filteredEvents = events.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      (item.title_en && item.title_en.toLowerCase().includes(query)) ||
      item.location.toLowerCase().includes(query) ||
      (item.location_en && item.location_en.toLowerCase().includes(query))
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
            placeholder="Cari agenda berdasarkan judul/lokasi..."
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
          <span>Tambah Agenda</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data agenda...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4" style={{ width: '100px' }}>Tanggal</th>
                <th className="p-4">Judul Agenda (Bilingual)</th>
                <th className="p-4">Lokasi / Tempat</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredEvents.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-base font-extrabold text-indigo-600 leading-none">{item.date_day}</span>
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">{item.date_month}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-950 text-sm leading-snug">{item.title}</div>
                    {item.title_en && (
                      <div className="text-xs text-gray-400 font-medium italic mt-1">{item.title_en}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-500 font-medium">
                    <div className="text-xs">{item.location}</div>
                    {item.location_en && (
                      <div className="text-[10px] text-gray-400 font-medium italic mt-0.5">{item.location_en}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"
                        title="Edit Agenda"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Agenda"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada agenda ditemukan.
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
