import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LogoOfHeqder from "../../assets/sakanComImage.png";

function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('FR');

  const languages = [
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'AR', name: 'العربية', flag: '🇲🇦' },
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setLanguageDropdownOpen(false);
    i18n.changeLanguage(langCode);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
        <div className="flex items-center gap-3">
            <img 
              src={LogoOfHeqder} 
              alt="SakanCom Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-3xl font-bold text-cyan-600">SakanCom</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('home')}
            </Link>
            <Link to="/immobilier" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('real_estate')}
            </Link>
            <Link to="/services"href="#services" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('services')}
            </Link>

            <Link to="/society" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
              {t('society')}
            </Link>

            {/* Lang Dropdown Desktop */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-cyan-600 transition-colors"
              >
                <Globe size={18} className="text-cyan-600" />
                <span className="text-gray-700 font-medium">
                  {currentLanguage.flag} {currentLanguage.code}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-cyan-50 flex items-center gap-3 ${
                        selectedLanguage === lang.code ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button + Language Dropdown */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Lang Button */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 hover:border-cyan-600 transition"
              >
                <Globe size={18} className="text-cyan-600" />
                <span className="text-sm">{currentLanguage.flag}</span>
              </button>

              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-cyan-50 flex items-center gap-2 ${
                        selectedLanguage === lang.code ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 px-4 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              to="/immobilier"
              className="block py-2 px-4 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('real_estate')}
            </Link>
            <Link
              to="/services"
              className="block py-2 px-4 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('services')}
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
