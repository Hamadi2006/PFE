import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ImmobilierContext = createContext();

export const ImmobilierProvider = ({ children }) => {
  const [immobilier, setImmobilier] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8000/api/immobilier")
        .then((res) => setImmobilier(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <ImmobilierContext.Provider value={{ immobilier, setImmobilier }}>
      {children}
    </ImmobilierContext.Provider>
  );
};

export default ImmobilierProvider;
