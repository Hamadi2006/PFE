import React, { createContext, useContext,useState,useEffect } from "react";
import axios from "axios";

export  const DemandesContext = createContext();

export const DemandesProvider = ({ children }) => {
    const  [demandes,setdemandes] = useState([]);
    console.log(demandes);
//http://127.0.0.1:8000/api/demande


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

    
    return (
        <DemandesContext.Provider value={{ demandes, setdemandes}}>
            {children}
        </DemandesContext.Provider>
    );
}
