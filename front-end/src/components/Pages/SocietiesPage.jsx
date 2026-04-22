import React, { useState, useEffect, useContext } from 'react';
import { MapPin, Building2, ChevronRight, Search, SlidersHorizontal, Mail, Phone, Globe } from 'lucide-react';
import { CompanyContext } from '../../context/contextValues';
import { Link } from 'react-router-dom';
import { getStorageUrl } from '../../utils/authStorage';

const RealEstateCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const { companies } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies && companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  const filteredCompanies = (companies || []).filter(company =>
    company.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'announcements') return (b.announcements || 0) - (a.announcements || 0);
    if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
    return 0;
  });

  const handleViewDetails = (companyId) => {
    console.log(`Viewing company ${companyId}`);
  };

  const getLogoUrl = (logoPath) => {
    return getStorageUrl(logoPath) || null;
  };

  const getCompanyInitials = (nom) => {
    return nom
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 3)
      .toUpperCase();
  };

  const getColorByIndex = (index) => {
    const colors = [
      'from-blue-600 to-blue-700',
      'from-emerald-600 to-emerald-700',
      'from-purple-600 to-purple-700',
      'from-cyan-600 to-cyan-700',
      'from-amber-600 to-amber-700',
      'from-rose-600 to-rose-700',
      'from-slate-600 to-slate-700',
      'from-teal-600 to-teal-700',
      'from-indigo-600 to-indigo-700'
    ];
    return colors[index % colors.length];
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-950 via-cyan-900 to-cyan-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-cyan-400/30">
              <Building2 className="w-4 h-4" />
              Partenaires de Confiance
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Sociétés Immobilières
            </h1>
            <p className="text-xl text-cyan-100 leading-relaxed">
              Connectez-vous avec les meilleures sociétés immobilières offrant des propriétés exceptionnelles et des services professionnels.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b border-cyan-100 bg-gradient-to-br from-cyan-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-slate-900"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-cyan-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 font-medium cursor-pointer"
              >
                <option value="announcements">Plus d'Annonces</option>
                <option value="nom">Alphabétique</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-cyan-700 font-medium">
            {filteredCompanies.length} {filteredCompanies.length === 1 ? 'société' : 'sociétés'} disponible{filteredCompanies.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-slate-400 animate-pulse" />
              </div>
              <p className="text-slate-600">Chargement des sociétés...</p>
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company, index) => {
                const logoUrl = getLogoUrl(company.logo);
                const initials = getCompanyInitials(company.nom);
                const color = getColorByIndex(index);

                return (
                  <article
                    key={company.id}
                    onClick={() => handleViewDetails(company.id)}
                    className="group bg-white border border-cyan-100 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-cyan-100/50 hover:border-cyan-300 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Logo Section */}
                      <div className="flex-shrink-0 w-full sm:w-40 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 border-b sm:border-r border-slate-200 p-6">
                        {logoUrl ? (
                          <div className="w-20 h-20 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-white border border-slate-200">
                            <img
                              src={logoUrl}
                              alt={company.nom}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-2xl shadow-lg hidden`}>
                              {initials}
                            </div>
                          </div>
                        ) : (
                          <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors leading-tight">
                              {company.nom}
                            </h2>
                            <div className="flex items-center text-slate-500 text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                              <span>{company.ville}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {company.description || 'Société immobilière professionnelle'}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <a href={`mailto:${company.email}`} className="truncate hover:underline">
                              {company.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <a href={`tel:${company.telephone}`} className="hover:underline">
                              {company.telephone}
                            </a>
                          </div>
                          {company.site_web && (
                            <div className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors">
                              <Globe className="w-4 h-4 flex-shrink-0" />
                              <a href={company.site_web} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                                Site web
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${company.statut === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {company.statut === 'active' ? '● Actif' : '● Inactif'}
                          </span>
                          <Link
                            to={`/company/${company.nom}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(company.id);
                            }}
                            className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm group-hover:gap-3 transition-all"
                          >
                            Voir Les Annonces
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Aucune société trouvée
              </h3>
              <p className="text-slate-600">
                Veuillez ajuster vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default RealEstateCompanies;
