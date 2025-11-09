import React, { useState } from "react";
import { Settings, Globe, ChevronDown, Calendar, Phone, Mail, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const admin = JSON.parse(localStorage.getItem("user"));
  const { t, i18n } = useTranslation();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "EN", name: "English", flag: "🇬🇧" },
    { code: "AR", name: "العربية", flag: "🇲🇦" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    setLanguageDropdownOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="p-6">
      {/* Titre */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t("settingsL.title") || "Paramètres"}</h2>
          <p className="text-slate-600">
            {t("settingsL.subtitle") || "Gérez les informations de votre compte et la langue de l’interface"}
          </p>
        </div>
        <Settings className="w-10 h-10 text-blue-600" />
      </div>

      {/* Carte principale */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {/* Profil Admin */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={`http://127.0.0.1:8000/storage/${admin.photo}`}
            alt={admin.nom}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800">
              {admin.prenom} {admin.nom}
            </h3>
            <p className="text-blue-600 font-medium">{admin.role}</p>
            <p className="text-slate-500 mt-1">
              {t("settingsL.activeSince") || "Actif depuis"} :{" "}
              {new Date(admin.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Infos personnelles */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">{t("settingsL.email") || "Email"}</p>
              <p className="font-medium">{admin.email}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200">
            <Phone className="text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">{t("settingsL.phone") || "Téléphone"}</p>
              <p className="font-medium">{admin.telephone}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200">
            <Shield className="text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">{t("settingsL.role") || "Rôle"}</p>
              <p className="font-medium">{admin.role}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-200">
            <Calendar className="text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">{t("settingsL.lastConnection") || "Dernière connexion"}</p>
              <p className="font-medium">
                {new Date(admin.derniere_connexion).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <hr className="my-8 border-slate-300" />

        {/* Sélecteur de langue */}
        <div className="max-w-sm mx-auto">
          <h4 className="text-lg font-semibold text-slate-800 mb-3 text-center">
            🌐 {t("settingsL.languageTitle") || "Langue de l’application"}
          </h4>

          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-300 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-700">
                  {currentLanguage.flag} {currentLanguage.name}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-500 transition-transform ${
                  languageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors ${
                      i18n.language === lang.code
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
