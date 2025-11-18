import React, { useContext, useState, useMemo } from 'react';
import { DemandesContext } from "../../context/DemandeContext";
import { 
    Search, 
    Phone, 
    Mail, 
    Eye, 
    MapPin, 
    Calendar,
    Building,
    User,
    ArrowLeft,
    ArrowRight,
    DollarSign,
    Filter,
    X,
    TrendingUp,
    Clock,
    MessageSquare
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RequestModal from './RequestModal';

function RequestsView() {
    const { t } = useTranslation();
    const { DemandeBySociete } = useContext(DemandesContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(10);
    const [infoModal, setInfoModal] = useState(false);
    const [req, setReq] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        minPrice: '',
        maxPrice: '',
        city: '',
        sortBy: 'date-desc'
    });

    const filteredRequests = useMemo(() => {
        if (!DemandeBySociete) return [];
        
        let filtered = DemandeBySociete.filter(request => {
            const matchesSearch = 
                request.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (!matchesSearch) return false;

            if (filters.dateFrom) {
                const requestDate = new Date(request.created_at);
                const fromDate = new Date(filters.dateFrom);
                if (requestDate < fromDate) return false;
            }
            
            if (filters.dateTo) {
                const requestDate = new Date(request.created_at);
                const toDate = new Date(filters.dateTo);
                toDate.setHours(23, 59, 59, 999);
                if (requestDate > toDate) return false;
            }

            if (filters.minPrice && request.prix < parseFloat(filters.minPrice)) {
                return false;
            }
            
            if (filters.maxPrice && request.prix > parseFloat(filters.maxPrice)) {
                return false;
            }

            if (filters.city && !request.ville?.toLowerCase().includes(filters.city.toLowerCase())) {
                return false;
            }

            return true;
        });

        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'date-desc':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'date-asc':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'price-desc':
                    return b.prix - a.prix;
                case 'price-asc':
                    return a.prix - b.prix;
                case 'name-asc':
                    return a.nom_complet?.localeCompare(b.nom_complet || '');
                case 'name-desc':
                    return b.nom_complet?.localeCompare(a.nom_complet || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [DemandeBySociete, searchTerm, filters]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            minPrice: '',
            maxPrice: '',
            city: '',
            sortBy: 'date-desc'
        });
        setCurrentPage(1);
    };

    const hasActiveFilters = () => {
        return filters.dateFrom || filters.dateTo || filters.minPrice || 
               filters.maxPrice || filters.city || filters.sortBy !== 'date-desc';
    };

    if (!DemandeBySociete) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {infoModal && (
                <RequestModal request={req} isOpen={infoModal} onClose={() => setInfoModal(false)} />
            )}
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                Demandes Clients
                            </h1>
                            <p className="text-sm text-gray-600">
                                Gestion des demandes d'information
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={18} />
                                    <span className="text-xl font-bold">{filteredRequests.length}</span>
                                    <span className="text-sm opacity-90">demande(s)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, email, ville, propriété..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`relative px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                                showFilters 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Filter size={18} />
                            <span>Filtres</span>
                            {hasActiveFilters() && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-5 pt-5 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Filter size={18} />
                                    Options de filtrage
                                </h3>
                                {hasActiveFilters() && (
                                    <button 
                                        onClick={resetFilters}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <X size={14} />
                                        Réinitialiser
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Date début</label>
                                    <input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Date fin</label>
                                    <input
                                        type="date"
                                        value={filters.dateTo}
                                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Prix min (MAD)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Prix max (MAD)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Ville</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Rabat"
                                        value={filters.city}
                                        onChange={(e) => handleFilterChange('city', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Trier par</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="date-desc">Date (récent)</option>
                                        <option value="date-asc">Date (ancien)</option>
                                        <option value="price-desc">Prix (décroissant)</option>
                                        <option value="price-asc">Prix (croissant)</option>
                                        <option value="name-asc">Nom (A-Z)</option>
                                        <option value="name-desc">Nom (Z-A)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            <div className="col-span-3">Client</div>
                            <div className="col-span-3">Propriété</div>
                            <div className="col-span-2">Contact</div>
                            <div className="col-span-2">Prix & Date</div>
                            <div className="col-span-2 text-center">Actions</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                        {currentRequests.length > 0 ? (
                            currentRequests.map((request) => (
                                <div 
                                    key={request.id} 
                                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Client */}
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {request.nom_complet?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm truncate">
                                                {request.nom_complet}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{request.email}</p>
                                            {request.message && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <MessageSquare className="w-3 h-3 text-green-600" />
                                                    <span className="text-xs text-green-600 font-medium">A un message</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Propriété */}
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            {request.image_principale ? (
                                                <img
                                                    src={`http://localhost:8000/storage/${request.image_principale}`}
                                                    alt={request.titre}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Building className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm truncate">
                                                {request.titre}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                <MapPin className="w-3 h-3" />
                                                <span className="truncate">{request.ville}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="col-span-2 flex flex-col justify-center">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-700 mb-1">
                                            <Phone className="w-3 h-3 text-green-600" />
                                            <span className="truncate">{request.telephone}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 font-mono">
                                            Réf #{request.id}
                                        </span>
                                    </div>

                                    {/* Prix & Date */}
                                    <div className="col-span-2 flex flex-col justify-center">
                                        <div className="flex items-center gap-1 mb-1">
                                            <DollarSign className="w-3.5 h-3.5 text-green-600" />
                                            <span className="text-sm font-bold text-gray-900">
                                                {formatPrice(request.prix)}
                                            </span>
                                            <span className="text-xs text-gray-500">MAD</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            <span>{formatDate(request.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-2 flex items-center justify-center gap-2">
                                        <a 
                                            href={`tel:${request.telephone}`}
                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all hover:scale-110"
                                            title="Appeler"
                                        >
                                            <Phone className="w-4 h-4" />
                                        </a>
                                        <a 
                                            href={`mailto:${request.email}`}
                                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                                            title="Email"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </a>
                                        <button 
                                            onClick={() => {
                                                setInfoModal(true);
                                                setReq(request);
                                            }}
                                            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-110"
                                            title="Voir détails"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 px-4">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                                    <Building className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Aucune demande trouvée
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Essayez d'ajuster vos filtres de recherche
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Table Footer */}
                    {currentRequests.length > 0 && (
                        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>
                                    Affichage de <span className="font-semibold text-gray-900">{indexOfFirstItem + 1}</span> à{' '}
                                    <span className="font-semibold text-gray-900">
                                        {Math.min(indexOfLastItem, filteredRequests.length)}
                                    </span>{' '}
                                    sur <span className="font-semibold text-gray-900">{filteredRequests.length}</span> demande(s)
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-6">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                    currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                <ArrowLeft size={16} />
                                <span>Précédent</span>
                            </button>
                            
                            <div className="flex items-center gap-2">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => paginate(pageNum)}
                                            className={`w-9 h-9 rounded-lg font-medium transition-all text-sm ${
                                                currentPage === pageNum
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                    currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                <span>Suivant</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestsView;