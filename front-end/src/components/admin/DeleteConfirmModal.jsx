// modals/DeleteConfirmModal.jsx
import { AlertCircle, X, Trash2 } from 'lucide-react';
import { useState, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobaleContext } from "../../context/GlobaleContext";
import { deleteAdmin } from '../../services/adminService';
import { getAuthHeader } from '../../utils/authStorage';

export default function DeleteConfirmModal({ admin, onClose }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setAlertMsg, setAlertSucc, setLastActivitys } = useContext(GlobaleContext);

  const handleConfirmDelete = useCallback(async () => {
    setLoading(true);

    try {
      await deleteAdmin(admin.id, {
        headers: getAuthHeader("admin"),
      });
      
      const currentAdmin = JSON.parse(localStorage.getItem('user'));
      setLastActivitys(prev => [...prev, { 
        date: new Date(), 
        action: `Supprimer admin: ${admin.nom_complet}`,
        par: currentAdmin?.nom_complet || 'Système'
      }]);
      
      setAlertMsg(t('AdminDeleteModal.alerts.success'));
      setAlertSucc(true);
      
      setTimeout(() => {
        setAlertSucc(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erreur suppression:', error);
      setAlertMsg(t('AdminDeleteModal.alerts.error'));
      setAlertSucc(false);
    } finally {
      setLoading(false);
    }
  }, [admin, onClose, setAlertMsg, setAlertSucc, setLastActivitys, t]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {t('AdminDeleteModal.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center">
            {t('AdminDeleteModal.content.confirmMessage', { name: admin?.nom_complet })}
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  {t('AdminDeleteModal.content.warningTitle')}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {t('AdminDeleteModal.content.warningDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {t('AdminDeleteModal.buttons.cancel')}
          </button>
          <button
            onClick={handleConfirmDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('AdminDeleteModal.buttons.deleting')}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {t('AdminDeleteModal.buttons.delete')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
