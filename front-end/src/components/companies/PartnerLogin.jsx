import React, { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Building2 } from "lucide-react";
import Logo from "../../assets/sakanComImage.png";
import axios from "axios";
import {GlobaleContext} from "../../context/GlobaleContext";
import { useNavigate } from "react-router-dom";
export default function PartnerLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const {setAlertSucc,setAlertFail,setAlertMsg} = useContext(GlobaleContext);

 const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!data.email) newErrors.email = "L'email est requis";
  if (!data.password) newErrors.password = "Le mot de passe est requis";
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  axios.post("http://localhost:8000/api/company/auth", {
    email: data.email,
    password: data.password
  })
  .then((response) => {
    localStorage.setItem("tokenCompanie", response.data.token);
    localStorage.setItem("companie", JSON.stringify(response.data.data));
    console.log("companie",response.data.data); 
    console.log("token",response.data.token);   
    setAlertSucc(true);
    setAlertMsg("Connexion réussie");
    navigate("/partner-dashboard");
  })
  .catch((error) => {
    setAlertFail(true);
    const errorMsg = error.response?.data?.message || "Connexion échouée";
    setAlertMsg(errorMsg);
    console.error("Login error:", error);
  });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 transition-all duration-300 hover:shadow-indigo-200/50">
        
        {/* Logo + Titre */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src={Logo}
            alt="SakanCom Logo"
            className="w-24 h-24 object-contain mb-3 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Building2 className="text-indigo-600" size={28} />
            Espace Société Partenaire
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Connectez-vous à votre compte pour gérer vos biens sur SakanCom
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email professionnelle
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="contact@votresociete.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
              />
              <button
                type="button"
                onClick={() => setData({ ...data, showPassword: !data.showPassword })}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {data.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={data.rememberMe}
                onChange={(e) => setData({ ...data, rememberMe: e.target.checked })}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              Se souvenir de moi
            </label>
            <button
              type="button"
              className="text-sm text-indigo-700 hover:text-indigo-900 font-medium"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton connexion */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg"
          >
            <LogIn size={20} />
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          © 2025 <span className="font-semibold text-indigo-700">SakanCom</span> — Accès partenaires.
        </div>
      </div>
    </div>
  );
}
