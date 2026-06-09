import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center glass-card">
        {/* Warning Icon */}
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* Actions */}
        <div className="w-full flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-red-200/50 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
}
