import { useCallback, useEffect, useState } from "react";
import usePollingResource from "../hooks/usePollingResource";
import { fetchAdmins } from "../services/adminService";
import { UserContext } from "./contextValues";
import {
  AUTH_CHANGED_EVENT,
  getAdminAuth,
  getAuthHeader,
} from "../utils/authStorage";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hydrateSession = () => {
      const auth = getAdminAuth();
      setUser(auth?.user || null);
      setToken(auth?.token || null);
    };

    hydrateSession();
    window.addEventListener(AUTH_CHANGED_EVENT, hydrateSession);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, hydrateSession);
  }, []);

  const loadAdmins = useCallback(
    () => fetchAdmins({ headers: getAuthHeader("admin") }),
    []
  );

  const [admins, setAdmins] = usePollingResource({
    enabled: Boolean(token),
    fetchResource: loadAdmins,
    refreshKey: token || "",
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, admins, setAdmins }}
    >
      {children}
    </UserContext.Provider>
  );
};
