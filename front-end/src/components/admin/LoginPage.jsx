import React, { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/sakanComImage.png";
import { getAdminAuth } from "../../utils/authStorage";

export default function AdminLogin({ AuthAdmin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAdminAuth()) {
      navigate("/ad-dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "L'email est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await AuthAdmin({ email, password, rememberMe });
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = (value) => {
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
  };

  const updatePassword = (value) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-50 to-cyan-200 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 transition-all duration-300 hover:shadow-cyan-200/50">
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src={Logo}
            alt="SakanCom Logo"
            className="w-24 h-24 object-contain mb-3 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Espace Administrateur
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Connectez-vous a votre tableau de bord securise
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => updateEmail(e.target.value)}
                placeholder="admin@sakancom.ma"
                disabled={loading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-cyan-500 outline-none transition disabled:bg-gray-100`}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
                placeholder="********"
                disabled={loading}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-cyan-500 outline-none transition disabled:bg-gray-100`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Afficher ou masquer le mot de passe"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                disabled={loading}
              />
              Se souvenir de moi
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:from-cyan-700 hover:to-blue-700 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogIn size={20} />
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-8 text-xs text-gray-500">
          © 2026 <span className="font-semibold text-cyan-700">SakanCom</span>.
          Tous droits reserves.
        </div>
      </div>
    </div>
  );
}
