import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobaleContext } from "../context/GlobaleContext";
export default function CompanieAuth({children}) {
    const tokenCompanie = localStorage.getItem("tokenCompanie");
    const {setAlertSucc,setAlertFail,setAlertMsg} = useContext(GlobaleContext);
    const navigate = useNavigate();
    if(!tokenCompanie){
        setAlertFail(true);
        setAlertMsg("Veuillez vous connecter");
        navigate("/partner-login",{replace:true});
    }else if(tokenCompanie){
        setAlertSucc(true);
        setAlertMsg("Vous êtes Connecté");
        return children;
    }
}
    
