import React, { useState } from "react";
import { Eye, Edit, Trash2, Building2 } from "lucide-react";

function CompaniesTable({ companies }) {
  if (!companies.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Aucune société trouvée.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-100 bg-blue-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                Société
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                Ville
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-blue-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {company.logo ? (
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={company.logo}
                          alt={company.nom}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {company.nom.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {company.nom}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {company.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {company.telephone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {company.ville}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      aria-label="Voir"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="text-yellow-500 hover:text-yellow-700 transition-colors"
                      aria-label="Modifier"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Exemple d'utilisation avec des données de démonstration
export default function App() {
  const sampleCompanies = [
    {
      nom: "TechCorp Solutions",
      email: "contact@techcorp.ma",
      telephone: "+212 5 22 34 56 78",
      ville: "Casablanca",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop"
    },
    {
      nom: "Digital Innovations",
      email: "info@digitalinnov.ma",
      telephone: "+212 5 37 12 34 56",
      ville: "Rabat",
      logo: null
    },
    {
      nom: "Marketing Pro",
      email: "hello@marketingpro.ma",
      telephone: "+212 5 24 87 65 43",
      ville: "Marrakech",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop"
    },
    {
      nom: "Consulting Group",
      email: "contact@consulting.ma",
      telephone: "+212 5 39 45 67 89",
      ville: "Tanger",
      logo: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sociétés
          </h1>
        </div>
        <CompaniesTable companies={sampleCompanies} />
      </div>
    </div>
  );
}