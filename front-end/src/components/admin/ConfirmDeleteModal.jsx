import React from "react";
import { X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, property }) {
  const { t } = useTranslation();

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Trash2 className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("confirmDelete.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("confirmDelete.message")}{" "}
            <span className="font-semibold">{property.titre}</span> ?
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700"
            >
              {t("confirmDelete.delete")}
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              {t("confirmDelete.cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
