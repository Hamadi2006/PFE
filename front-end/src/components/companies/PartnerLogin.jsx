import React, { useContext, useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Building2 } from "lucide-react";
import Logo from "../../assets/sakanComImage.png";
import { GlobaleContext } from "../../context/GlobaleContext";
import { useNavigate } from "react-router-dom";
import {
  getCompanyAuth,
  getErrorMessage,
  saveCompanySession,
} from "../../utils/authStorage";
import { loginCompany } from "../../services/authService";

export default function PartnerLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);

  useEffect(() => {
    if (getCompanyAuth()) {
      navigate("/partner-dashboard", { replace: true });
    }
  }, [navigate]);

  const updateField = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.email.trim()) newErrors.email = "L'email est requis";
    if (
      data.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
      newErrors.email = "Email invalide";
    }
    if (!data.password) newErrors.password = "Le mot de passe est requis";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await loginCompany(data);

      if (response.data?.status !== "success") {
        throw new Error(response.data?.message || "Connexion echouee");
      }

      const companyData = response.data?.data;
      const token = response.data?.token;

      if (!companyData || !token) {
        throw new Error("Reponse d'authentification incomplete.");
      }

      if (companyData.statut && companyData.statut !== "active") {
        throw new Error("Ce compte societe est inactive.");
      }

      saveCompanySession({ token, company: companyData });
      setAlertFail(false);
      setAlertSucc(true);
      setAlertMsg("Connexion reussie");
      navigate("/partner-dashboard", { replace: true });
    } catch (error) {
      setAlertSucc(false);
      setAlertFail(true);
      setAlertMsg(getErrorMessage(error, "Connexion echouee"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 transition-all duration-300 hover:shadow-indigo-200/50">
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src={Logo}
            alt="SakanCom Logo"
            className="w-24 h-24 object-contain mb-3 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Building2 className="text-indigo-600" size={28} />
            Espace Societe Partenaire
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Connectez-vous a votre compte pour gerer vos biens sur SakanCom
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email professionnelle
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="contact@votresociete.com"
                disabled={loading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition disabled:bg-gray-100`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="********"
                disabled={loading}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 outline-none transition disabled:bg-gray-100`}
              />
              <button
                type="button"
                aria-label="Afficher ou masquer le mot de passe"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                disabled={loading}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {data.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogIn size={20} />
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-8 text-xs text-gray-500">
          © 2026 <span className="font-semibold text-indigo-700">SakanCom</span>
          {" "}Acces partenaires.
        </div>
      </div>
    </div>
  );
}
