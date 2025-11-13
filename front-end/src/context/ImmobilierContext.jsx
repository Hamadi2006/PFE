import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ImmobilierContext = createContext();

export const ImmobilierProvider = ({ children }) => {
  const [immobilier, setImmobilier] = useState([]);
  const [immobilieBySociete, setImmobilieBySociete] = useState([]);
  const companie = JSON.parse(localStorage.getItem("companie"));
  const societe_id = companie.id;
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

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8000/api/immobilier/Bysociete/" + societe_id)
        .then((res) => setImmobilieBySociete(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 6000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <ImmobilierContext.Provider value={{ immobilier, setImmobilier, immobilieBySociete, setImmobilieBySociete }}>
      {children}
    </ImmobilierContext.Provider>
  );
};

export default ImmobilierProvider;
