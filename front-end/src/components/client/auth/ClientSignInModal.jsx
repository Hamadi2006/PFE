import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { loginClient } from "../../../services/authService";
import { saveClientSession } from "../../../utils/authStorage";
import ClientAuthForm from "./ClientAuthForm";
import { useClientAuthForm } from "./useClientAuthForm";

export default function ClientSignInModal({ open, onClose, onAuthenticated }) {
  const { t } = useTranslation();

  const form = useClientAuthForm({
    mode: "signIn",
    request: loginClient,
    t,
    onSuccess: async ({ token, user }) => {
      saveClientSession({ token, user });
      await onAuthenticated?.();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-slate-950/30">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-600">
              {t("clientAuth.modal.eyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {t("clientAuth.modal.title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t("clientAuth.modal.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label={t("clientAuth.modal.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ClientAuthForm mode="signIn" {...form} />
      </div>
    </div>
  );
}
