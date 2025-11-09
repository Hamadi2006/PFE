import React, { useEffect, useState } from 'react';
import { X, Building2, Mail, Phone, MapPin, Globe, CheckCircle } from 'lucide-react';

const CompanyInfoModal = ({ company, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 ${
        isOpen ? 'bg-black/40 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className={`relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-sm mx-auto border border-white/40 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 border border-white/30 hover:scale-110"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header with Logo */}
        <div className="pt-6 px-5">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              {company.logo ? (
                <img
                  src={`http://localhost:8000/storage/${company.logo}`}
                  alt={company.nom}
                  className="w-16 h-16 rounded-full object-cover border-3 border-white/60 shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-3 border-white/60 shadow-lg ${
                  company.logo ? 'hidden' : 'flex'
                }`}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Company Name & Status */}
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{company.nom}</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <CheckCircle className="w-2.5 h-2.5 mr-1" />
              {company.statut}
            </span>
          </div>
        </div>

        {/* Company Information */}
        <div className="px-5 pb-5 space-y-3 max-h-60 overflow-y-auto">
          {/* Email */}
          <div className="flex items-start space-x-2 p-3 bg-white/70 rounded-lg border border-white/40 hover:bg-white/80 transition-colors">
            <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 mb-1">Email</p>
              <p className="text-sm text-gray-800 font-medium truncate">{company.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-2 p-3 bg-white/70 rounded-lg border border-white/40 hover:bg-white/80 transition-colors">
            <Phone className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 mb-1">Téléphone</p>
              <p className="text-sm text-gray-800 font-medium">{company.telephone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-2 p-3 bg-white/70 rounded-lg border border-white/40 hover:bg-white/80 transition-colors">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 mb-1">Adresse</p>
              <p className="text-sm text-gray-800 font-medium line-clamp-2">{company.adresse}</p>
            </div>
          </div>

          {/* Website */}
          {company.site_web && company.site_web !== 'https://alpha.com' && (
            <div className="flex items-start space-x-2 p-3 bg-white/70 rounded-lg border border-white/40 hover:bg-white/80 transition-colors">
              <Globe className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 mb-1">Site Web</p>
                <a 
                  href={company.site_web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors truncate block"
                >
                  {company.site_web.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}

          {/* Ville */}
          {company.ville && company.ville !== 'https://alpha.com' && (
            <div className="flex items-start space-x-2 p-3 bg-white/70 rounded-lg border border-white/40 hover:bg-white/80 transition-colors">
              <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 mb-1">Ville</p>
                <p className="text-sm text-gray-800 font-medium">{company.ville}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-4 border-t border-white/30 pt-3">
          <div className="text-center text-xs text-gray-500">
            Créé le {new Date(company.created_at).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoModal;