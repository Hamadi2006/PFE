import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Building2, 
  MapPin, 
  Eye, 
  TrendingUp,
  Plus,
  Star,
  MessageCircle,
  User,
  Clock,
  Target,
  Percent,
  ChevronRight
} from 'lucide-react';
import { DemandesContext } from '../../context/DemandeContext';
import { ImmobilierContext } from '../../context/ImmobilierContext';

const DashboardImmobilier = ({ setActiveTab }) => {
  const { t, i18n } = useTranslation();
  const { DemandeBySociete } = useContext(DemandesContext);
  const { immobilieBySociete } = useContext(ImmobilierContext);

  // Calcul des statistiques réelles
  const stats = useMemo(() => {
    if (!immobilieBySociete || !DemandeBySociete) {
      return {
        totalProperties: 0,
        propertiesForSale: 0,
        propertiesForRent: 0,
        availableProperties: 0,
        featuredProperties: 0,
        totalRequests: 0,
        newRequests: 0
      };
    }

    const totalProperties = immobilieBySociete.length;
    const propertiesForSale = immobilieBySociete.filter(prop => prop.transaction === 'vente').length;
    const propertiesForRent = immobilieBySociete.filter(prop => prop.transaction === 'location').length;
    const availableProperties = immobilieBySociete.filter(prop => prop.statut === 'disponible').length;
    const featuredProperties = immobilieBySociete.filter(prop => prop.en_vedette).length;
    
    const totalRequests = DemandeBySociete.length;
    const thisMonth = new Date().getMonth();
    const newRequests = DemandeBySociete.filter(request => 
      new Date(request.created_at).getMonth() === thisMonth
    ).length;

    return {
      totalProperties,
      propertiesForSale,
      propertiesForRent,
      availableProperties,
      featuredProperties,
      totalRequests,
      newRequests
    };
  }, [immobilieBySociete, DemandeBySociete]);

  // Propriétés récentes (5 plus récentes)
  const recentProperties = useMemo(() => {
    if (!immobilieBySociete) return [];
    
    return immobilieBySociete
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(property => ({
        id: property.id,
        title: property.titre,
        type: property.type,
        transaction: property.transaction,
        price: `${parseFloat(property.prix).toLocaleString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR')} ${t('dashboard.currency')}${property.transaction === 'location' ? t('dashboard.perMonth') : ''}`,
        status: property.statut,
        ville: property.ville,
        date: new Date(property.created_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR')
      }));
  }, [immobilieBySociete, i18n.language, t]);

  // Demandes récentes
  const recentRequests = useMemo(() => {
    if (!DemandeBySociete) return [];
    
    return DemandeBySociete
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(request => ({
        id: request.id,
        client: request.nom_complet,
        property: request.titre,
        phone: request.telephone,
        date: new Date(request.created_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR'),
        time: new Date(request.created_at).toLocaleTimeString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR', { hour: '2-digit', minute: '2-digit' }),
        hasMessage: !!request.message
      }));
  }, [DemandeBySociete, i18n.language]);

  // Propriétés populaires (par nombre de demandes)
  const popularProperties = useMemo(() => {
    if (!immobilieBySociete || !DemandeBySociete) return [];
    
    const propertyRequests = {};
    DemandeBySociete.forEach(request => {
      if (request.immobilier_id) {
        propertyRequests[request.immobilier_id] = (propertyRequests[request.immobilier_id] || 0) + 1;
      }
    });

    return immobilieBySociete
      .map(property => ({
        ...property,
        requestCount: propertyRequests[property.id] || 0
      }))
      .sort((a, b) => b.requestCount - a.requestCount)
      .slice(0, 4)
      .map(property => ({
        id: property.id,
        title: property.titre,
        location: property.ville,
        price: `${parseFloat(property.prix).toLocaleString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR')} ${t('dashboard.currency')}${property.transaction === 'location' ? t('dashboard.perMonth') : ''}`,
        views: property.requestCount * 3,
        type: property.transaction,
        featured: property.en_vedette
      }));
  }, [immobilieBySociete, DemandeBySociete, i18n.language, t]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-700';
      case 'loué': return 'bg-blue-100 text-blue-700';
      case 'vendu': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTransactionColor = (transaction) => {
    return transaction === 'vente' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  };

  const getTransactionIcon = (transaction) => {
    return transaction === 'vente' ? 'text-green-600' : 'text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('dashboard.title')}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {stats.totalProperties} {t('dashboard.header.properties')} • {stats.totalRequests} {t('dashboard.header.requests')} • {stats.availableProperties} {t('dashboard.header.available')}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-sm">{t('dashboard.header.yourAgency')}</p>
              <p className="text-xs text-gray-500">{t('dashboard.header.realEstateManagement')}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AG
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Propriétés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-right">
              <TrendingUp className="w-3.5 h-3.5 text-green-500 inline mr-1" />
              <span className="text-xs text-green-600 font-medium">+{Math.floor(stats.totalProperties * 0.05)}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalProperties}</h3>
          <p className="text-sm text-gray-600 font-medium mb-2">{t('dashboard.stats.totalProperties')}</p>
          <div className="flex space-x-3 text-xs">
            <span className="text-green-600 font-medium">{stats.propertiesForSale} {t('dashboard.stats.forSale')}</span>
            <span className="text-blue-600 font-medium">{stats.propertiesForRent} {t('dashboard.stats.forRent')}</span>
          </div>
        </div>

        {/* Demandes Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-right">
              <Clock className="w-3.5 h-3.5 text-orange-500 inline mr-1" />
              <span className="text-xs text-orange-600 font-medium">{stats.newRequests} {t('dashboard.stats.new')}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalRequests}</h3>
          <p className="text-sm text-gray-600 font-medium mb-2">{t('dashboard.stats.clientRequests')}</p>
          <div className="text-xs text-gray-500">
            {stats.newRequests} {t('dashboard.stats.newThisMonth')}
          </div>
        </div>

        {/* Propriétés Disponibles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-right">
              <Percent className="w-3.5 h-3.5 text-purple-500 inline mr-1" />
              <span className="text-xs text-purple-600 font-medium">
                {stats.totalProperties > 0 ? Math.round((stats.availableProperties / stats.totalProperties) * 100) : 0}%
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stats.availableProperties}</h3>
          <p className="text-sm text-gray-600 font-medium mb-2">{t('dashboard.stats.available')}</p>
          <div className="text-xs text-gray-500">
            {stats.featuredProperties} {t('dashboard.stats.featured')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Colonne principale (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Actions Rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.quickActions.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveTab('announcements')} 
                className="flex items-center justify-between p-3.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group border border-blue-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">{t('dashboard.quickActions.newProperty')}</p>
                    <p className="text-xs text-gray-600">{t('dashboard.quickActions.addProperty')}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </button>

              <button 
                onClick={() => setActiveTab('requests')} 
                className="flex items-center justify-between p-3.5 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all duration-200 group border border-orange-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">{t('dashboard.quickActions.requests')}</p>
                    <p className="text-xs text-gray-600">{t('dashboard.quickActions.viewContacts')}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Propriétés Récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{t('dashboard.recentProperties.title')}</h2>
                <span className="text-xs text-gray-500 font-medium">{recentProperties.length} {t('dashboard.recentProperties.properties')}</span>
              </div>
              <div className="space-y-3">
                {recentProperties.length > 0 ? (
                  recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 rounded-lg transition-all">
                      <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                        <div className={`p-1.5 rounded-lg ${getTransactionColor(property.transaction)}`}>
                          <Building2 className={`w-3.5 h-3.5 ${getTransactionIcon(property.transaction)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-xs truncate">{property.title}</p>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getStatusColor(property.status)}`}>
                              {t(`dashboard.status.${property.status}`)}
                            </span>
                            <span className="text-xs text-gray-500">{property.ville}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-bold text-gray-900 text-xs whitespace-nowrap">{property.price}</p>
                        <p className="text-xs text-gray-400">{property.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm py-6">{t('dashboard.recentProperties.noProperties')}</p>
                )}
              </div>
            </div>

            {/* Demandes Récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{t('dashboard.recentRequests.title')}</h2>
                <span className="text-xs text-blue-600 font-semibold">{stats.newRequests} {t('dashboard.recentRequests.new')}</span>
              </div>
              <div className="space-y-3">
                {recentRequests.length > 0 ? (
                  recentRequests.map((request) => (
                    <div key={request.id} className="p-3 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 rounded-lg transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-xs truncate">{request.client}</p>
                            <p className="text-xs text-gray-500 truncate">{request.property}</p>
                          </div>
                        </div>
                        {request.hasMessage && (
                          <MessageCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                        <span className="truncate">{request.phone}</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{request.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm py-6">{t('dashboard.recentRequests.noRequests')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne latérale (1/3) */}
        <div className="space-y-6">
          {/* Propriétés Populaires */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">{t('dashboard.topProperties.title')}</h2>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {popularProperties.length > 0 ? (
                popularProperties.map((property) => (
                  <div key={property.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <h3 className="font-semibold text-gray-900 text-xs truncate">{property.title}</h3>
                          {property.featured && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${getTransactionColor(property.type)}`}>
                        {t(`dashboard.transaction.${property.type}`)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <p className="font-bold text-gray-900 text-xs">{property.price}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Eye className="w-3 h-3" />
                        <span>{property.views}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm py-6">{t('dashboard.topProperties.noData')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImmobilier;