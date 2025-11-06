import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobaleContext } from "../context/GlobaleContext";
export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const {setAlertSucc,setAlertFail,setAlertMsg} = useContext(GlobaleContext);
  const navigate = useNavigate();
  if (!token) {
    setAlertFail(true);
    setAlertMsg("Veuillez vous connecter");
    navigate("/ad-login",{replace:true});
  }else{
    setAlertSucc(true);
    setAlertMsg("Vous êtes Connecté");
    return children;
  }
}
