import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // ✅ Safe parsing with proper checks
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      // Only parse if value exists and is not the string "undefined" or "null"
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      }
      
      if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
        setToken(storedToken);
      }
    } catch (error) {
      // If JSON parsing fails, just log and continue without crashing
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/getAdmins");
        setAdmins(res.data);
        localStorage.setItem("admins", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    };

    fetchData(); // first call
    const interval = setInterval(fetchData, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, admins, setAdmins }}
    >
      {children}
    </UserContext.Provider>
  );
};