import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Logo from "../../assets/sakanComImage.png";

function AdminLogin({AuthAdmin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "L'email est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    AuthAdmin({email,password,rememberMe});
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 animate-fadeIn">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img
              src={Logo}
              alt="SakanCom Logo"
              className="w-20 h-20 object-contain drop-shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">SakanCom Admin</h1>
          <p className="text-gray-500 text-sm">
            Connectez-vous à votre espace sécurisé
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none`}
                placeholder="admin@sakancom.ma"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <LogIn size={20} />
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 <span className="font-semibold text-cyan-700">SakanCom</span> — Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
