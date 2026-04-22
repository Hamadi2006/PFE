import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GlobaleContext } from "../context/GlobaleContext";
import { getCompanyAuth } from "../utils/authStorage";

export default function CompanieAuth({ children }) {
  const location = useLocation();
  const { setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  const auth = getCompanyAuth();

  useEffect(() => {
    if (!auth) {
      setAlertFail(true);
      setAlertMsg("Veuillez vous connecter");
    }
  }, [auth, setAlertFail, setAlertMsg]);

  if (!auth) {
    return <Navigate to="/partner-login" replace state={{ from: location }} />;
  }

  return children;
}
