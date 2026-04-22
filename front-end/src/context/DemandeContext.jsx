import { useCallback } from "react";
import useEventVersion from "../hooks/useEventVersion";
import usePollingResource from "../hooks/usePollingResource";
import { DemandesContext } from "./contextValues";
import {
  fetchDemandes,
  fetchDemandesBySociete,
} from "../services/demandeService";
import {
  AUTH_CHANGED_EVENT,
  getAuthHeader,
  getCompanyId,
} from "../utils/authStorage";

export const DemandesProvider = ({ children }) => {
  const companyAuthVersion = useEventVersion(AUTH_CHANGED_EVENT);

  const loadDemandes = useCallback(() => fetchDemandes(), []);

  const loadCompanyDemandes = useCallback(
    () =>
      fetchDemandesBySociete(getCompanyId(), {
        headers: getAuthHeader("company"),
      }),
    []
  );

  const [demandes, setdemandes] = usePollingResource({
    fetchResource: loadDemandes,
  });

  const [DemandeBySociete, setDemandeBySociete] = usePollingResource({
    fetchResource: loadCompanyDemandes,
    refreshKey: companyAuthVersion,
    resetOnError: true,
  });

  return (
    <DemandesContext.Provider
      value={{ demandes, setdemandes, DemandeBySociete, setDemandeBySociete }}
    >
      {children}
    </DemandesContext.Provider>
  );
};
