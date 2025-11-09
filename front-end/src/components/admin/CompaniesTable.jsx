import React, { useState } from "react";
import { Eye, Edit, Trash2, Building2, MapPin, Phone, Mail } from "lucide-react";

export default function CompaniesTable({ companies, onShowCompany, onUpdateCompany, onDeleteCompany }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (!companies.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
        <Building2 size={56} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucune société</h3>
        <p className="text-gray-500 text-sm">Aucune société trouvée dans la base de données.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header avec stats */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Sociétés partenaires</h2>
            <p className="text-sm text-gray-600 mt-1">
              {companies.length} société{companies.length > 1 ? 's' : ''} trouvée{companies.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Système actif
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-white/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Société
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Localisation
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {companies.map((company, index) => (
              <tr 
                key={company.id || index}
                className="group hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onShowCompany(company)}
              >
                {/* Société */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {company.logo ? (
                        <img
                          className="h-12 w-12 rounded-xl object-cover border-2 border-white shadow-sm"
                          src={`http://localhost:8000/storage/${company.logo}`}
                          alt={company.nom}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-2 border-white shadow-sm ${company.logo ? 'hidden' : 'flex'}`}>
                        <span className="text-white font-bold text-lg">
                          {company.nom.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">
                        {company.nom}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{company.email}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 font-medium">
                      {company.telephone || 'Non renseigné'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Contact
                    </div>
                  </div>
                </td>

                {/* Localisation */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {company.ville || 'Non spécifiée'}
                    </span>
                  </div>
                </td>

                {/* Statut */}
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Actif
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowCompany(company);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      aria-label="Voir détails"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateCompany(company);
                      }}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                      aria-label="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCompany(company);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100 bg-white/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
          <span>{companies.length} élément{companies.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}