import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GlobaleContext } from "../context/GlobaleContext";
import { getAdminAuth } from "../utils/authStorage";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  const auth = getAdminAuth();

  useEffect(() => {
    if (!auth) {
      setAlertFail(true);
      setAlertMsg("Veuillez vous connecter");
    }
  }, [auth, setAlertFail, setAlertMsg]);

  if (!auth) {
    return <Navigate to="/ad-login" replace state={{ from: location }} />;
  }

  return children;
}
