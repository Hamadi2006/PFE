// modals/DeleteConfirmModal.jsx
import { AlertCircle, X } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import {useContext} from 'react';
import { GlobaleContext } from "../../context/GlobaleContext";
export default function DeleteConfirmModal({ admin, onClose }) {
  const [loading, setLoading] = useState(false);
  const {alertSucc,
        setAlertSucc,
        alertFail,
        setAlertFail,
        alertMsg,
        setAlertMsg} = useContext(GlobaleContext);

  const handleConfirmDelete = async () => {
    setLoading(true);

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/${admin.id}`);
      setAlertMsg('Administrateur supprimé avec succès !');
      setAlertSucc(true);
      setTimeout(() => {
        setAlertSucc(false);
        onClose();
      }, 2000);
      window.location.reload();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-200 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Confirmer la suppression</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-2">
            Êtes-vous sûr de vouloir supprimer <span className="font-semibold">{admin?.name}</span> ?
          </p>
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            ⚠️ Cette action est irréversible. L'administrateur et toutes ses données seront supprimés définitivement.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
}