import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { type DbAlumniSector } from '../../lib/mockData';

interface AlumniSectorsTabProps {
  sectors: DbAlumniSector[];
  isLoadingData: boolean;
  onChanged: () => void;
  triggerToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const emptyForm = { name: '', name_en: '', percentage: '', sort_order: 0 };

export default function AlumniSectorsTab({ sectors, isLoadingData, onChanged, triggerToast }: AlumniSectorsTabProps) {
  const [form, setForm] = useState(emptyForm);
  const [savingId, setSavingId] = useState<string | null>(null);

  const createSector = async () => {
    if (!form.name.trim() || !form.percentage.trim()) {
      triggerToast('Nama sektor dan persentase wajib diisi.', 'warning');
      return;
    }
    setSavingId('new');
    try {
      await dataService.createAlumniSector({ ...form, name_en: form.name_en || null });
      setForm(emptyForm);
      triggerToast('Sektor alumni berhasil ditambahkan.');
      onChanged();
    } catch (err: any) {
      triggerToast(`Gagal menambah sektor: ${err.message || err}`, 'error');
    } finally {
      setSavingId(null);
    }
  };

  const updateSector = async (sector: DbAlumniSector, updates: Partial<DbAlumniSector>) => {
    setSavingId(sector.id);
    try {
      await dataService.updateAlumniSector(sector.id, updates);
      triggerToast('Sektor alumni berhasil diperbarui.');
      onChanged();
    } catch (err: any) {
      triggerToast(`Gagal memperbarui sektor: ${err.message || err}`, 'error');
    } finally {
      setSavingId(null);
    }
  };

  const deleteSector = async (id: string) => {
    setSavingId(id);
    try {
      await dataService.deleteAlumniSector(id);
      triggerToast('Sektor alumni berhasil dihapus.');
      onChanged();
    } catch (err: any) {
      triggerToast(`Gagal menghapus sektor: ${err.message || err}`, 'error');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 select-none glass-card">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Sebaran Sektor Karier Alumni</h2>
        <p className="text-xs text-slate-500 mt-1">Data ini mengisi grafik sektor karier di halaman Alumni publik.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_160px_100px_auto] gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
        <input className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs" placeholder="Nama sektor" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs" placeholder="English" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
        <input className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs" placeholder="45%" value={form.percentage} onChange={(e) => setForm({ ...form, percentage: e.target.value })} />
        <button onClick={createSector} disabled={savingId === 'new'} className="px-4 py-2 bg-black hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 justify-center">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {isLoadingData ? (
        <div className="py-12 text-center text-sm text-slate-400">Memuat data sektor...</div>
      ) : (
        <div className="space-y-3">
          {sectors.map((sector) => (
            <SectorRow key={sector.id} sector={sector} saving={savingId === sector.id} onSave={updateSector} onDelete={deleteSector} />
          ))}
          {sectors.length === 0 && <div className="py-12 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-2xl">Belum ada sektor alumni.</div>}
        </div>
      )}
    </div>
  );
}

function SectorRow({ sector, saving, onSave, onDelete }: { sector: DbAlumniSector; saving: boolean; onSave: (sector: DbAlumniSector, updates: Partial<DbAlumniSector>) => void; onDelete: (id: string) => void }) {
  const [draft, setDraft] = useState({
    name: sector.name,
    name_en: sector.name_en || '',
    percentage: sector.percentage,
    sort_order: sector.sort_order
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_160px_90px_90px_88px] gap-3 items-center rounded-2xl border border-slate-200 bg-white p-4">
      <input className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
      <input className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={draft.name_en} onChange={(e) => setDraft({ ...draft, name_en: e.target.value })} />
      <input className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={draft.percentage} onChange={(e) => setDraft({ ...draft, percentage: e.target.value })} />
      <input type="number" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
      <div className="flex items-center justify-end gap-2">
        <button onClick={() => onSave(sector, { ...draft, name_en: draft.name_en || null })} disabled={saving} className="p-2 rounded-lg bg-slate-900 text-white disabled:bg-slate-300"><Save className="w-4 h-4" /></button>
        <button onClick={() => onDelete(sector.id)} disabled={saving} className="p-2 rounded-lg bg-red-50 text-red-600 disabled:text-slate-300"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
