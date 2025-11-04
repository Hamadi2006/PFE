import React, { createContext, useState, useEffect } from "react";

export const GlobaleContext = createContext();

export const GlobaleProvider = ({ children }) => {
  const [alertSucc, setAlertSucc] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [lastActivitys, setLastActivitys] = useState([]);

  useEffect(() => {
    localStorage.setItem("lastActivitys", JSON.stringify(lastActivitys));
  },[lastActivitys])
  return (
    <GlobaleContext.Provider
      value={{
        alertSucc,
        setAlertSucc,
        alertFail,
        setAlertFail,
        alertMsg,
        setAlertMsg,
        lastActivitys,
        setLastActivitys,
      }}
    >
      {children}
    </GlobaleContext.Provider>
  );
};
