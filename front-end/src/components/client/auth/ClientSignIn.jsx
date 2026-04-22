import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GlobaleContext } from "../../../context/GlobaleContext";
import { loginClient } from "../../../services/authService";
import { getClientAuth, saveClientSession } from "../../../utils/authStorage";
import ClientAuthForm from "./ClientAuthForm";
import ClientAuthLayout from "./ClientAuthLayout";
import { useClientAuthForm } from "./useClientAuthForm";

export default function ClientSignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);

  useEffect(() => {
    if (getClientAuth()) {
      navigate("/account", { replace: true });
    }
  }, [navigate]);

  const form = useClientAuthForm({
    mode: "signIn",
    request: loginClient,
    t,
    onSuccess: ({ token, user }) => {
      saveClientSession({ token, user });
      setAlertFail(false);
      setAlertSucc(true);
      setAlertMsg(t("clientAuth.signIn.success"));
      navigate("/account", { replace: true });
    },
  });

  return (
    <ClientAuthLayout
      eyebrow={t("clientAuth.eyebrow")}
      logoAlt={t("clientAuth.logoAlt")}
      title={t("clientAuth.signIn.title")}
      subtitle={t("clientAuth.signIn.subtitle")}
      footerText={t("clientAuth.signIn.footerText")}
      footerLinkText={t("auth.signUp")}
      footerLinkTo="/sign-up"
    >
      <ClientAuthForm mode="signIn" {...form} />
    </ClientAuthLayout>
  );
}
