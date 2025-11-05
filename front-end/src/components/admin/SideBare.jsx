import { useState, useContext } from "react";
import {
  Home,
  Building2,
  Users,
  Mail,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/sakanComImage.png";
import { GlobaleContext } from "../../context/GlobaleContext";

function Sidebar({ activePage, setActivePage }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
    setAlertMsg,
  } = useContext(GlobaleContext);

  const menuItems = [
    { id: "overview", label: t("sidebar.overview"), icon: Home },
    { id: "properties", label: t("sidebar.properties"), icon: Building2 },
    { id: "admins", label: t("sidebar.admins"), icon: Users },
    { id: "requests", label: t("sidebar.requests"), icon: Mail },
    { id: "settings", label: t("sidebar.settings"), icon: Settings },
        { id: "companies", label: t("sidebar.companies"), icon: Building2 },
    { id: "logout", label: t("sidebar.logout"), icon: LogOut },
        
  ];

  const languages = [
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "EN", name: "English", flag: "🇬🇧" },
    { code: "AR", name: "العربية", flag: "🇲🇦" },
  ];

  const handleMenuClick = (id) => {
    if (id === "logout") {
      // Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setAlertSucc(true);
      setAlertMsg("Déconnexion réussie !");
      // Navigate to login page
      navigate("/ad-login");

      return;
    }

    setActivePage(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguageDropdownOpen(false);
    localStorage.setItem("language", langCode);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-md bg-opacity-0 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white shadow-xl border-r border-slate-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <img
                  src={Logo}
                  alt="SakanCom Logo"
                  className="w-8 h-8 object-contain"
                />
                {t("sidebar.dashboard")}
              </h1>

              {/* Close button for mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const isLogout = item.id === "logout";

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive && !isLogout
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : isLogout
                      ? "text-red-600 hover:bg-red-50"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;