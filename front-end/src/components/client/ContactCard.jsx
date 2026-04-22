import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { GlobaleContext } from "../../context/GlobaleContext";
import { getErrorMessage } from "../../utils/authStorage";
import { createDemande } from "../../services/demandeService";
import ClientSignInModal from "./auth/ClientSignInModal";
import ContactRequestForm from "./contact/ContactRequestForm";
import useContactRequestForm from "./contact/useContactRequestForm";

const ALERT_TIMEOUT = 3000;

function ContactCard({ prix = 0, immobilier }) {
  const { t } = useTranslation();
  const { setAlertFail, setAlertMsg, setAlertSucc } =
    useContext(GlobaleContext);

  const showAlert = useCallback(
    (message, type) => {
      setAlertMsg(message);

      if (type === "success") {
        setAlertSucc(true);
        setTimeout(() => setAlertSucc(false), ALERT_TIMEOUT);
        return;
      }

      setAlertFail(true);
      setTimeout(() => setAlertFail(false), ALERT_TIMEOUT);
    },
    [setAlertFail, setAlertMsg, setAlertSucc]
  );

  const form = useContactRequestForm({
    immobilier,
    onError: (error) =>
      showAlert(getErrorMessage(error, "Erreur lors de l'envoi"), "error"),
    onSuccess: (message) => showAlert(message, "success"),
    onValidationError: () =>
      showAlert(t("contactCardI.validationErrors"), "error"),
    submitRequest: createDemande,
    t,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-6 sticky top-6">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-cyan-600 mb-2">
          {Number(prix).toLocaleString("fr-MA")} MAD
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t("contactCardI.negotiablePrice")}
        </p>
      </div>

      <ContactRequestForm {...form} />
      <ClientSignInModal
        open={form.authModalOpen}
        onClose={form.closeAuthModal}
        onAuthenticated={form.handleAuthenticated}
      />
    </div>
  );
}

export default ContactCard;
