import {createContext, useState, useEffect} from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token , setToken] = useState(null);

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
    
    return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}