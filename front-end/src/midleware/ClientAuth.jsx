import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import { GlobaleContext } from "../context/GlobaleContext";
import { getClientAuth } from "../utils/authStorage";

export default function ClientAuth({ children }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  const auth = getClientAuth();

  useEffect(() => {
    if (!auth) {
      setAlertFail(true);
      setAlertMsg(t("clientAuth.errors.authRequired"));
    }
  }, [auth, setAlertFail, setAlertMsg, t]);

  if (!auth) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}
