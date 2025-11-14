import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Building2, 
  MapPin, 
  Eye, 
  DollarSign,
  TrendingUp,
  Plus,
  Calendar,
  Star,
  Search,
  Users,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

const DashboardImmobilier = () => {
  const { t } = useTranslation();

  // Données statiques pour une agence immobilière
  const immobilierData = {
    stats: {
      totalProperties: 47,
      propertiesForSale: 28,
      propertiesForRent: 19,
      totalViews: 3247,
      soldThisMonth: 8,
      rentedThisMonth: 5
    },
    recentProperties: [
      {
        id: 1,
        title: 'Villa Moderne - Casa Anfa',
        type: 'Villa',
        transaction: 'Vente',
        price: '4,500,000 MAD',
        status: 'Disponible',
        views: 156,
        date: '15 Nov 2024'
      },
      {
        id: 2,
        title: 'Appartement Rabat Agdal',
        type: 'Appartement',
        transaction: 'Location',
        price: '9,500 MAD/mois',
        status: 'Loué',
        views: 89,
        date: '14 Nov 2024'
      },
      {
        id: 3,
        title: 'Studio Centre Ville',
        type: 'Studio',
        transaction: 'Location',
        price: '3,200 MAD/mois',
        status: 'Disponible',
        views: 203,
        date: '13 Nov 2024'
      }
    ],
    popularProperties: [
      {
        id: 1,
        title: 'Villa Luxueuse Palmier',
        location: 'Casablanca',
        price: '6,200,000 MAD',
        views: 324,
        type: 'Vente',
        featured: true
      },
      {
        id: 2,
        title: 'Appartement Standing',
        location: 'Rabat',
        price: '2,800,000 MAD',
        views: 287,
        type: 'Vente',
        featured: true
      },
      {
        id: 3,
        title: 'Duplex Moderne',
        location: 'Marrakech',
        price: '12,000 MAD/mois',
        views: 198,
        type: 'Location',
        featured: false
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Immobilier</h1>
            <p className="text-gray-600 mt-2">Gestion de votre portefeuille immobilier</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-900">Immobilière Prestige</p>
              <p className="text-sm text-gray-500">47 propriétés gérées</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              IP
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques Immobilières */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Propriétés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <TrendingUp className="w-5 h-5 text-green-500 inline mr-1" />
              <span className="text-sm text-green-600">+5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{immobilierData.stats.totalProperties}</h3>
          <p className="text-gray-600 font-medium">Propriétés totales</p>
          <div className="mt-2 flex space-x-3 text-xs">
            <span className="text-blue-600">{immobilierData.stats.propertiesForSale} à vendre</span>
            <span className="text-green-600">{immobilierData.stats.propertiesForRent} à louer</span>
          </div>
        </div>

        {/* Vues Total */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <TrendingUp className="w-5 h-5 text-green-500 inline mr-1" />
              <span className="text-sm text-green-600">+23%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{immobilierData.stats.totalViews}</h3>
          <p className="text-gray-600 font-medium">Vues totales</p>
          <div className="mt-2 text-xs text-gray-500">
            Moyenne: 69 vues/propriété
          </div>
        </div>

        {/* Transactions ce mois */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <Calendar className="w-5 h-5 text-purple-500 inline mr-1" />
              <span className="text-sm text-purple-600">Ce mois</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{immobilierData.stats.soldThisMonth + immobilierData.stats.rentedThisMonth}</h3>
          <p className="text-gray-600 font-medium">Transactions</p>
          <div className="mt-2 flex space-x-3 text-xs">
            <span className="text-green-600">{immobilierData.stats.soldThisMonth} ventes</span>
            <span className="text-blue-600">{immobilierData.stats.rentedThisMonth} locations</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche */}
        <div className="space-y-6">
          {/* Actions Rapides Immobilières */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion Immobilière</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Nouvelle Propriété</p>
                    <p className="text-sm text-gray-600">Ajouter un bien immobilier</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 group border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Voir Catalogue</p>
                    <p className="text-sm text-gray-600">Parcourir toutes les propriétés</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 group border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Propriétés en Vedette</p>
                    <p className="text-sm text-gray-600">Gérer les annonces prioritaires</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
              </button>
            </div>
          </div>

          {/* Propriétés Récentes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Propriétés Récentes</h2>
            <div className="space-y-4">
              {immobilierData.recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      property.transaction === 'Vente' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Building2 className={`w-4 h-4 ${
                        property.transaction === 'Vente' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{property.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          property.status === 'Disponible' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status}
                        </span>
                        <span className="text-xs text-gray-500">{property.views} vues</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">{property.price}</p>
                    <p className="text-xs text-gray-500">{property.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-6">
          {/* Propriétés Populaires */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Propriétés Populaires</h2>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {immobilierData.popularProperties.map((property) => (
                <div key={property.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        {property.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      property.type === 'Vente' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900">{property.price}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{property.views} vues</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance du Mois */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-6">Performance du Mois</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{immobilierData.stats.soldThisMonth}</p>
                <p className="text-sm text-gray-300">Ventes réalisées</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <Home className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{immobilierData.stats.rentedThisMonth}</p>
                <p className="text-sm text-gray-300">Locations signées</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">28%</p>
                <p className="text-sm text-gray-300">Taux de conversion</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">847</p>
                <p className="text-sm text-gray-300">Vues ce mois</p>
              </div>
            </div>
          </div>

          {/* Contact Support Immobilier */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Support Immobilier</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Phone className="w-4 h-4" />
                  <span>Support technique</span>
                </div>
                <span className="text-gray-900">+212 5XX-XXXXXX</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-green-600">
                  <Mail className="w-4 h-4" />
                  <span>Email professionnel</span>
                </div>
                <span className="text-gray-900">contact@immoprestige.ma</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImmobilier;