import React, { createContext, useContext,useState,useEffect } from "react";
import axios from "axios";

export  const DemandesContext = createContext();

export const DemandesProvider = ({ children }) => {
    const  [demandes,setdemandes] = useState([]);
    const [DemandeBySociete,setDemandeBySociete] = useState([]);
//http://127.0.0.1:8000/api/demande

const companie = JSON.parse(localStorage.getItem("companie"));

useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://127.0.0.1:8000/api/demande")
        .then((res) => setdemandes(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 10000); 

    return () => clearInterval(interval); 
  }, []);
useEffect(()=>{
    const fetchData = () => {
        axios
          .get("http://127.0.0.1:8000/api/demande/Bysociete/" + companie.id)
          .then((res) => setDemandeBySociete(res.data.data))
          .catch((err) => console.log(err));
      };
      fetchData(); 
      const interval = setInterval(fetchData, 10000); 
      return () => clearInterval(interval); 
    },[companie.id])
    
    return (
        <DemandesContext.Provider value={{ demandes, setdemandes,DemandeBySociete,setDemandeBySociete}}>
            {children}
        </DemandesContext.Provider>
    );
}
