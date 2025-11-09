import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { GlobaleContext } from "../../context/GlobaleContext";
export default function DeleteCompanyModal({ company, isOpen, onClose, onConfirm }) {
  const [loading, setLoading] = React.useState(false);
    const {
        alertSucc,
        setAlertSucc,
        alertFail,
        setAlertFail,
        alertMsg,
        setAlertMsg,
    } = useContext(GlobaleContext);
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/company/${company.id}`);
      setAlertSucc(true);
      setAlertMsg("Société supprimée avec succès");
      setTimeout(() => setAlertSucc(false), 3000);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Supprimer société
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center">
            Supprimer <span className="font-semibold text-gray-900">{company?.nom}</span> ?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-600">
                Cette action est irréversible. Toutes les données seront perdues.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}