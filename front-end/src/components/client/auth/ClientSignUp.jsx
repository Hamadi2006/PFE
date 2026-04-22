import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GlobaleContext } from "../../../context/GlobaleContext";
import { registerClient } from "../../../services/authService";
import { getClientAuth, saveClientSession } from "../../../utils/authStorage";
import ClientAuthForm from "./ClientAuthForm";
import ClientAuthLayout from "./ClientAuthLayout";
import { useClientAuthForm } from "./useClientAuthForm";

export default function ClientSignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);

  useEffect(() => {
    if (getClientAuth()) {
      navigate("/account", { replace: true });
    }
  }, [navigate]);

  const form = useClientAuthForm({
    mode: "signUp",
    request: registerClient,
    t,
    onSuccess: ({ token, user }) => {
      saveClientSession({ token, user });
      setAlertFail(false);
      setAlertSucc(true);
      setAlertMsg(t("clientAuth.signUp.success"));
      navigate("/account", { replace: true });
    },
  });

  return (
    <ClientAuthLayout
      eyebrow={t("clientAuth.eyebrow")}
      logoAlt={t("clientAuth.logoAlt")}
      title={t("clientAuth.signUp.title")}
      subtitle={t("clientAuth.signUp.subtitle")}
      footerText={t("clientAuth.signUp.footerText")}
      footerLinkText={t("auth.signIn")}
      footerLinkTo="/sign-in"
    >
      <ClientAuthForm mode="signUp" {...form} />
    </ClientAuthLayout>
  );
}
