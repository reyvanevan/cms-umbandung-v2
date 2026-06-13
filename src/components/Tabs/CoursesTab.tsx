import { Plus, Search, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { type DbKurikulumCourse, type DbSiteContent } from '../../lib/mockData';
import SiteContentTab from './SiteContentTab';

interface CoursesTabProps {
  courses: DbKurikulumCourse[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbKurikulumCourse) => void;
  openDeleteModal: (id: string) => void;
  siteContent: DbSiteContent[];
  connectionMode: 'supabase' | 'mock';
  onUpdateContent: (key: string, value: string, valueEn: string | null) => Promise<void>;
}

export default function CoursesTab({
  courses,
  searchQuery,
  setSearchQuery,
  isLoadingData,
  openCreateModal,
  openEditModal,
  openDeleteModal,
  siteContent,
  connectionMode,
  onUpdateContent
}: CoursesTabProps) {
  const filteredCourses = courses.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.name_en && item.name_en.toLowerCase().includes(query)) ||
      item.semester.toLowerCase().includes(query)
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
        category="kurikulum"
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
            placeholder="Cari mata kuliah..."
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
          <span>Tambah Mata Kuliah</span>
        </button>
      </div>

      {/* Loading & Table */}
      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <p className="text-sm">Memuat data mata kuliah...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4" style={{ width: '120px' }}>Semester</th>
                <th className="p-4">Nama Mata Kuliah (Bilingual)</th>
                <th className="p-4" style={{ width: '100px' }}>Bobot SKS</th>
                <th className="p-4" style={{ width: '120px' }}>No. Urut</th>
                <th className="p-4" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredCourses.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold text-gray-950">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                      {item.semester === 'Pilihan' ? 'Pilihan' : `Smt ${item.semester}`}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-950 text-sm leading-snug">{item.name}</div>
                    {item.name_en && (
                      <div className="text-xs text-gray-400 font-medium italic mt-1">{item.name_en}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-950 font-semibold text-center sm:text-left">
                    {item.credits} SKS
                  </td>
                  <td className="p-4 text-gray-500 font-medium">
                    {item.sort_order}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"
                        title="Edit Mata Kuliah"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Hapus Mata Kuliah"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada mata kuliah ditemukan.
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
