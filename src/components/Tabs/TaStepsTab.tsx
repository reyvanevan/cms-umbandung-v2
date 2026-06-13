import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { type DbTaStep, type DbSiteContent } from '../../lib/mockData';
import SiteContentTab from './SiteContentTab';

interface TaStepsTabProps {
  steps: DbTaStep[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbTaStep) => void;
  openDeleteModal: (id: string) => void;
  siteContent: DbSiteContent[];
  connectionMode: 'supabase' | 'mock';
  onUpdateContent: (key: string, value: string, valueEn: string | null) => Promise<void>;
}

export default function TaStepsTab({
  steps,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal,
  siteContent,
  connectionMode,
  onUpdateContent
}: TaStepsTabProps) {
  const filteredSteps = steps.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.num.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      (item.title_en && item.title_en.toLowerCase().includes(query)) ||
      item.desc.toLowerCase().includes(query) ||
      (item.desc_en && item.desc_en.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* General Description Editor */}
      <SiteContentTab
        siteContent={siteContent}
        isLoadingData={isLoadingData}
        connectionMode={connectionMode}
        onUpdateContent={onUpdateContent}
        category="tugas_akhir"
        hideHeader={true}
      />

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari tahapan Tugas Akhir..."
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
          <span>Tambah Tahapan</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data tahapan...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4" style={{ width: '100px' }}>No. Tahap</th>
                <th className="p-4" style={{ width: '200px' }}>Judul Tahap (Bilingual)</th>
                <th className="p-4">Deskripsi / Penjelasan</th>
                <th className="p-4" style={{ width: '100px' }}>No. Urut</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredSteps.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold text-gray-900">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-sm text-slate-800">
                      {item.num}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-950 text-sm leading-snug">{item.title}</div>
                    {item.title_en && (
                      <div className="text-xs text-gray-400 font-medium italic mt-1">{item.title_en}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-700 font-medium leading-relaxed">
                    <div>{item.desc}</div>
                    {item.desc_en && (
                      <div className="text-xs text-gray-400 font-medium italic mt-1 leading-relaxed">{item.desc_en}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-500 font-medium">
                    {item.sort_order}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"
                        title="Edit Tahapan"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Tahapan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSteps.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada tahapan ditemukan.
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
