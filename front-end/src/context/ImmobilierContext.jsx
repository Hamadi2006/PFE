import {createContext, useState} from "react";
import axios from "axios";
import { useEffect } from "react";
export const ImmobilierContext = createContext();

export const ImmobilierProvider = ({children}) => {
    const [immobilier, setImmobilier] = useState([]);

useEffect(()=>{
    axios.get("http://localhost:8000/api/immobilier").then((res)=>{
        setImmobilier(res.data.data);
    }).catch((err)=>{
        console.log(err);
    })
},[])

    return (
        <ImmobilierContext.Provider value={{immobilier, setImmobilier}}>
            {children}
        </ImmobilierContext.Provider>
    );
};

export default ImmobilierProvider;