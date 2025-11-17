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
    Euro,
    Filter,
    X,
    TrendingUp,
    Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RequestModal from './RequestModal';

function RequestsView() {
    const { t } = useTranslation();
    const { DemandeBySociete } = useContext(DemandesContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(6);
    const [infoModal, setInfoModal] = useState(false);
    const [req, setReq] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter states
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
            // Search term filter
            const matchesSearch = 
                request.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (!matchesSearch) return false;

            // Date filters
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

            // Price filters
            if (filters.minPrice && request.prix < parseFloat(filters.minPrice)) {
                return false;
            }
            
            if (filters.maxPrice && request.prix > parseFloat(filters.maxPrice)) {
                return false;
            }

            // City filter
            if (filters.city && !request.ville?.toLowerCase().includes(filters.city.toLowerCase())) {
                return false;
            }

            return true;
        });

        // Sorting
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
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ' MAD';
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
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-800 mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">{t('requestsView.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {infoModal && (
                <RequestModal request={req} isOpen={infoModal} onClose={() => setInfoModal(false)} />
            )}
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center">
                                <Building className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {t('requestsView.title')}
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    {t('requestsView.subtitle')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-900 text-white px-6 py-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={20} />
                                    <span className="text-2xl font-bold">{filteredRequests.length}</span>
                                    <span className="text-sm opacity-90">
                                        {filteredRequests.length > 1 ? t('requestsView.labels.plural') : t('requestsView.labels.singular')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={t('requestsView.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`relative px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                showFilters 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Filter size={20} />
                            <span>{t('requestsView.filters.title')}</span>
                            {hasActiveFilters() && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Filter size={20} className="text-gray-700" />
                                    {t('requestsView.filters.title')}
                                </h3>
                                {hasActiveFilters() && (
                                    <button 
                                        onClick={resetFilters}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <X size={16} />
                                        {t('requestsView.filters.reset')}
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Date From */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.dateFrom')}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            value={filters.dateFrom}
                                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>
                                
                                {/* Date To */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.dateTo')}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            value={filters.dateTo}
                                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Min Price */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.minPrice')}
                                    </label>
                                    <div className="relative">
                                        <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={filters.minPrice}
                                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>
                                
                                {/* Max Price */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.maxPrice')}
                                    </label>
                                    <div className="relative">
                                        <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.city')}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder={t('requestsView.filters.cityPlaceholder')}
                                            value={filters.city}
                                            onChange={(e) => handleFilterChange('city', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('requestsView.filters.sortBy')}
                                    </label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-700"
                                    >
                                        <option value="date-desc">{t('requestsView.filters.sortOptions.dateDesc')}</option>
                                        <option value="date-asc">{t('requestsView.filters.sortOptions.dateAsc')}</option>
                                        <option value="price-desc">{t('requestsView.filters.sortOptions.priceDesc')}</option>
                                        <option value="price-asc">{t('requestsView.filters.sortOptions.priceAsc')}</option>
                                        <option value="name-asc">{t('requestsView.filters.sortOptions.nameAsc')}</option>
                                        <option value="name-desc">{t('requestsView.filters.sortOptions.nameDesc')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {currentRequests.length > 0 ? (
                        currentRequests.map((request) => (
                            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    {request.image_principale ? (
                                        <img 
                                            src={`http://localhost:8000/storage/${request.image_principale}`} 
                                            alt={request.titre}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <Building size={48} className="text-gray-300 mb-2" />
                                            <span className="text-sm text-gray-400">{t('requestsView.noImage')}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                                            <Euro size={14} />
                                            <span className="text-sm">{formatPrice(request.prix)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Title & Location */}
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                            {request.titre}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <MapPin size={14} className="text-gray-500" />
                                            <span className="text-sm">{request.ville}</span>
                                        </div>
                                    </div>

                                    {/* Client Info */}
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                                <User size={14} className="text-white" />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {request.nom_complet}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-xs text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={12} className="text-gray-500" />
                                                <span>{request.telephone}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={12} className="text-gray-500" />
                                                <span className="truncate">{request.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {request.message && (
                                        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <p className="text-xs font-medium text-gray-700 mb-1">
                                                {t('requestsView.clientMessage')}
                                            </p>
                                            <p className="text-sm text-gray-600 line-clamp-2 italic">
                                                "{request.message}"
                                            </p>
                                        </div>
                                    )}

                                    {/* Meta */}
                                    <div className="mt-auto pt-3 border-t border-gray-200 space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Clock size={12} className="text-gray-500" />
                                            <span>{formatDate(request.created_at)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono text-gray-500">
                                                {t('requestsView.ref')} #{request.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        <a 
                                            href={`tel:${request.telephone}`}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-medium"
                                        >
                                            <Phone size={16} />
                                        </a>
                                        <a 
                                            href={`mailto:${request.email}`}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-medium"
                                        >
                                            <Mail size={16} />
                                        </a>
                                        <button 
                                            onClick={() => {
                                                setInfoModal(true);
                                                setReq(request);
                                            }}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all text-sm font-medium"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Building size={48} className="text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {t('requestsView.noResults.title')}
                            </h3>
                            <p className="text-gray-600">
                                {t('requestsView.noResults.subtitle')}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                                    currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                            >
                                <ArrowLeft size={18} />
                                <span>{t('requestsView.pagination.prev')}</span>
                            </button>
                            
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => paginate(page)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                            currentPage === page
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                                    currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                            >
                                <span>{t('requestsView.pagination.next')}</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestsView;