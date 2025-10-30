import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token , setToken] = useState(null);
  const [admins, setAdmins] = useState([]);
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
        if (storedToken) {
          setToken(storedToken);
        }
    }, []);
    
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/admin/getAdmins").then((res) => {
        setAdmins(res.data);
        localStorage.setItem("admins", JSON.stringify(res.data));
        setAdmins(JSON.parse(localStorage.getItem("admins")));
      })
      .catch((err) => console.log(err));
    },[])
    return (
    <UserContext.Provider value={{ user, setUser, token, setToken , admins, setAdmins}}>
      {children}
    </UserContext.Provider>
  );
}