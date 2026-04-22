import { useCallback } from "react";
import usePollingResource from "../hooks/usePollingResource";
import { CompanyContext } from "./contextValues";
import { fetchCompanies } from "../services/companyService";

export const CompanyProvider = ({ children }) => {
  const loadCompanies = useCallback(() => fetchCompanies(), []);

  const [companies, setCompanies] = usePollingResource({
    fetchResource: loadCompanies,
  });

  return (
    <CompanyContext.Provider value={{ companies, setCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
