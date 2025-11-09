import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://127.0.0.1:8000/api/company")
        .then((res) => setCompanies(res.data))
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CompanyContext.Provider value={{ companies, setCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
