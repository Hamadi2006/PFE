import { useCallback } from "react";
import useEventVersion from "../hooks/useEventVersion";
import usePollingResource from "../hooks/usePollingResource";
import { ImmobilierContext } from "./contextValues";
import {
  fetchImmobiliers,
  fetchImmobiliersBySociete,
} from "../services/immobilierService";
import {
  AUTH_CHANGED_EVENT,
  getAuthHeader,
  getCompanyId,
} from "../utils/authStorage";

export const ImmobilierProvider = ({ children }) => {
  const companyAuthVersion = useEventVersion(AUTH_CHANGED_EVENT);

  const loadImmobiliers = useCallback(() => fetchImmobiliers(), []);

  const loadCompanyImmobiliers = useCallback(
    () =>
      fetchImmobiliersBySociete(getCompanyId(), {
        headers: getAuthHeader("company"),
      }),
    []
  );

  const [immobilier, setImmobilier] = usePollingResource({
    fetchResource: loadImmobiliers,
  });

  const [immobilieBySociete, setImmobilieBySociete] = usePollingResource({
    fetchResource: loadCompanyImmobiliers,
    refreshKey: companyAuthVersion,
    resetOnError: true,
  });

  return (
    <ImmobilierContext.Provider
      value={{
        immobilier,
        setImmobilier,
        immobilieBySociete,
        setImmobilieBySociete,
      }}
    >
      {children}
    </ImmobilierContext.Provider>
  );
};

export default ImmobilierProvider;
