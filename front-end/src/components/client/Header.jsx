import React, { useContext, useEffect, useState } from "react";
import {
  ChevronDown,
  Globe,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LogoOfHeader from "../../assets/sakanComImage.png";
import { GlobaleContext } from "../../context/GlobaleContext";
import { logoutClient } from "../../services/authService";
import {
  AUTH_CHANGED_EVENT,
  clearClientSession,
  getAuthHeader,
  getClientAuth,
} from "../../utils/authStorage";

const languages = [
  { code: "FR", name: "Francais", flag: "FR" },
  { code: "EN", name: "English", flag: "EN" },
  { code: "AR", name: "Arabic", flag: "AR" },
];

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "FR");
  const [clientAuth, setClientAuth] = useState(() => getClientAuth());

  useEffect(() => {
    const syncClientAuth = () => setClientAuth(getClientAuth());

    window.addEventListener(AUTH_CHANGED_EVENT, syncClientAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, syncClientAuth);
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setLanguageDropdownOpen(false);
    i18n.changeLanguage(langCode);
  };

  const handleClientLogout = async () => {
    try {
      await logoutClient({ headers: getAuthHeader("client") });
    } catch {
      // If the API token is already expired, the local session still must end.
    } finally {
      clearClientSession();
      setAccountDropdownOpen(false);
      setMobileMenuOpen(false);
      setAlertFail(false);
      setAlertSucc(true);
      setAlertMsg(t("clientAuth.logout.success"));
      navigate("/", { replace: true });
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage) || languages[0];
  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/immobilier", label: t("real_estate") },
    { to: "/services", label: t("services") },
    { to: "/society", label: t("society") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={LogoOfHeader}
              alt={t("clientAuth.logoAlt")}
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-3xl font-bold text-cyan-600">SakanCom</h1>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium text-gray-700 transition-colors hover:text-cyan-600"
              >
                {link.label}
              </Link>
            ))}

            {clientAuth ? (
              <DesktopAccountMenu
                open={accountDropdownOpen}
                onToggle={() => setAccountDropdownOpen((open) => !open)}
                onClose={() => setAccountDropdownOpen(false)}
                onLogout={handleClientLogout}
                t={t}
              />
            ) : (
              <AuthActions t={t} />
            )}

            <LanguageMenu
              open={languageDropdownOpen}
              currentLanguage={currentLanguage}
              selectedLanguage={selectedLanguage}
              onToggle={() => setLanguageDropdownOpen((open) => !open)}
              onChange={handleLanguageChange}
            />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageMenu
              compact
              open={languageDropdownOpen}
              currentLanguage={currentLanguage}
              selectedLanguage={selectedLanguage}
              onToggle={() => setLanguageDropdownOpen((open) => !open)}
              onChange={handleLanguageChange}
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label={t("auth.mobileMenu")}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mt-4 space-y-2 pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}

            {clientAuth ? (
              <MobileAccountActions
                onClose={closeMobileMenu}
                onLogout={handleClientLogout}
                t={t}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                <Link
                  to="/sign-in"
                  className="flex items-center justify-center gap-2 rounded-lg border border-cyan-600 px-3 py-2 font-semibold text-cyan-700"
                  onClick={closeMobileMenu}
                >
                  <LogIn size={18} />
                  {t("auth.signIn")}
                </Link>
                <Link
                  to="/sign-up"
                  className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 font-semibold text-white"
                  onClick={closeMobileMenu}
                >
                  <UserPlus size={18} />
                  {t("auth.signUp")}
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

function AuthActions({ t }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/sign-in"
        className="flex items-center gap-2 rounded-lg border border-cyan-600 px-4 py-2 font-semibold text-cyan-700 transition hover:bg-cyan-50"
      >
        <LogIn size={18} />
        {t("auth.signIn")}
      </Link>
      <Link
        to="/sign-up"
        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
      >
        <UserPlus size={18} />
        {t("auth.signUp")}
      </Link>
    </div>
  );
}

function DesktopAccountMenu({ open, onToggle, onClose, onLogout, t }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
      >
        <UserRound size={18} />
        <span>{t("auth.account")}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          <Link
            to="/account"
            onClick={onClose}
            className="flex w-full items-center gap-2 px-4 py-2 text-left font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
          >
            <UserRound size={18} />
            {t("auth.account")}
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-left font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
          >
            <LogOut size={18} />
            {t("auth.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

function MobileAccountActions({ onClose, onLogout, t }) {
  return (
    <div className="space-y-2 border-t border-gray-100 pt-2">
      <Link
        to="/account"
        className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
        onClick={onClose}
      >
        <UserRound size={18} />
        {t("auth.account")}
      </Link>
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
        onClick={onLogout}
      >
        <LogOut size={18} />
        {t("auth.logout")}
      </button>
    </div>
  );
}

function LanguageMenu({
  compact = false,
  open,
  currentLanguage,
  selectedLanguage,
  onToggle,
  onChange,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center rounded-lg border border-gray-300 transition hover:border-cyan-600 ${
          compact ? "gap-1 px-2 py-1" : "gap-2 px-4 py-2"
        }`}
      >
        <Globe size={18} className="text-cyan-600" />
        <span className="font-medium text-gray-700">
          {compact ? currentLanguage.code : currentLanguage.flag}
        </span>
        {!compact && (
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white py-2 shadow-lg ${
            compact ? "w-36" : "w-48"
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onChange(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left font-medium hover:bg-cyan-50 ${
                selectedLanguage === lang.code
                  ? "bg-cyan-50 text-cyan-600"
                  : "text-gray-700"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{compact ? lang.code : lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
