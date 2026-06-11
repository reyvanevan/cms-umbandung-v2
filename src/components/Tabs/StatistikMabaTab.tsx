import { Plus, Edit2, Trash2, RefreshCw, BarChart3 } from 'lucide-react';
import { type DbStatistikMaba } from '../../lib/mockData';

interface StatistikMabaTabProps {
  statistikList: DbStatistikMaba[];
  isLoadingData: boolean;
  openCreateModal: () => void;
  openEditModal: (item: DbStatistikMaba) => void;
  openDeleteModal: (id: string) => void;
}

export default function StatistikMabaTab({ statistikList, isLoadingData, openCreateModal, openEditModal, openDeleteModal }: StatistikMabaTabProps) {
  const sorted = [...statistikList].sort((a, b) => a.sort_order - b.sort_order);
  const maxCount = Math.max(...sorted.map(m => m.count), 1);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Data Penerimaan Mahasiswa Baru per Tahun</span>
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition cursor-pointer">
          <Plus className="w-4 h-4" /><span>Tambah Tahun</span>
        </button>
      </div>

      {isLoadingData ? (
        <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
          <RefreshCw className="w-8 h-8 animate-spin text-black" /><p className="text-sm">Memuat data...</p>
        </div>
      ) : (
        <>
          {/* Visual Chart */}
          <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 space-y-4">
            {sorted.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <span className="font-bold text-xs text-gray-600 w-12">{item.year}</span>
                <div className="flex-1 bg-white border border-gray-200 h-7 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gray-800 to-gray-600 rounded-full transition-all duration-700" style={{ width: `${(item.count / maxCount) * 100}%` }} />
                </div>
                <span className="font-bold text-sm text-gray-800 w-16 text-right">{item.count} mhs</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="p-4">Tahun Akademik</th>
                  <th className="p-4">Jumlah Maba</th>
                  <th className="p-4" style={{ width: '80px' }}>No. Urut</th>
                  <th className="p-4" style={{ width: '90px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sorted.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-gray-950">{item.year}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700">{item.count} mahasiswa</span>
                    </td>
                    <td className="p-4 text-gray-500 font-medium">{item.sort_order}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(item)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-950 transition cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => openDeleteModal(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-400 text-sm">Belum ada data statistik maba.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
