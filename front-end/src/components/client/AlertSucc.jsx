import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

export default function SuccessAlert({
  message = "Opération réussie.",
  duration = 4000,
  onClose = () => {},
  show: initialShow = true,
}) {
  const [show, setShow] = useState(initialShow);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!show) return;
    if (!duration || duration <= 0) return;

    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [show, duration, handleClose]);

  if (!show) return null;

  return (
    <div
      role="alert"
      className={`fixed top-6 right-6 z-[9999] flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all duration-300 ${
        closing
          ? "opacity-0 translate-x-4"
          : "opacity-100 translate-x-0"
      } bg-green-50 border-green-200`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-green-800">Succès</p>
        <p className="text-sm text-green-700 mt-1">{message}</p>
      </div>

      <button
        onClick={handleClose}
        aria-label="Fermer la notification"
        className="p-1 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <X className="h-5 w-5 text-green-700" />
      </button>
    </div>
  );
}

// Exemple d’utilisation :
// <SuccessAlert message="Profil mis à jour avec succès !" duration={4000} onClose={() => setAlertSucc(false)} />
