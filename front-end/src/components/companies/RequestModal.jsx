import React, { useEffect } from 'react';
import {
    X,
    MapPin,
    Calendar,
    Euro,
    User,
    Phone,
    Mail,
    Home,
    MessageCircle,
    Building,
    Printer,
    Share2
} from 'lucide-react';
import { getStorageUrl } from '../../utils/authStorage';

const RequestModal = ({ request, isOpen, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !request) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ' MAD';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Home className="w-6 h-6 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Détails de la Demande</h1>
                                <p className="text-gray-600 text-sm">Référence #{request.id}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
                    
                    {/* Property Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Property Image */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                <Building className="w-5 h-5 text-blue-600" />
                                Visuel du bien
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                                {getStorageUrl(request.image_principale_url || request.image_principale) ? (
                                    <img 
                                        src={getStorageUrl(request.image_principale_url || request.image_principale)}
                                        alt={request.titre}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Building className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                Informations principales
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Titre</span>
                                    <span className="font-medium text-gray-900">{request.titre}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Localisation</span>
                                    <span className="font-medium text-gray-900 flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        {request.ville}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Budget</span>
                                    <span className="font-bold text-green-600 flex items-center gap-1">
                                        <Euro className="w-4 h-4" />
                                        {formatPrice(request.prix)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Information */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <User className="w-5 h-5 text-blue-600" />
                            Informations client
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Nom complet</p>
                                        <p className="font-medium text-gray-900">{request.nom_complet}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Téléphone</p>
                                        <p className="font-medium text-gray-900">{request.telephone}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-orange-600" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-900 truncate">{request.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Message */}
                    {request.message && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                                Message du client
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 italic">"{request.message}"</p>
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Informations techniques
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    {formatDate(request.created_at)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-green-700 font-medium">Nouvelle</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm">
                                <Printer className="w-4 h-4" />
                                Imprimer
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm">
                                <Share2 className="w-4 h-4" />
                                Partager
                            </button>
                        </div>
                        
                        <div className="flex gap-3">
                            <a
                                href={`tel:${request.telephone}`}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Appeler
                            </a>
                            <a
                                href={`mailto:${request.email}?subject=Demande immobilière - ${request.titre}`}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;
