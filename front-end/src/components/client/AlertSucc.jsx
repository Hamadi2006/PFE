import React, { useEffect, useState } from "react";

export default function SuccessAlert({
  message = "Opération réussie.",
  duration = 4000,
  onClose = () => {},
  show: initialShow = true,
}) {
  const [show, setShow] = useState(initialShow);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (!duration || duration <= 0) return;

    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [show, duration]);

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 250);
  }

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

// Exemple d’utilisation :
// <SuccessAlert message="Profil mis à jour avec succès !" duration={4000} onClose={() => setAlertSucc(false)} />
