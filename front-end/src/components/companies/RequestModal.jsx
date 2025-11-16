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
    Download,
    Printer,
    Share2
} from 'lucide-react';

const RequestModal = ({ request, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !request) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ' MAD';
    };

    const handleCall = () => {
        window.open(`tel:${request.telephone}`, '_self');
    };

    const handleEmail = () => {
        window.open(`mailto:${request.email}?subject=Demande immobilière - ${request.titre}`, '_self');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay avec flou glassmorphique */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            />
            
            {/* Container principal - Style glass moderne */}
            <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden transform transition-all duration-500">
                {/* Header élégant avec dégradé subtil */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-blue-100">
                                <Home className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Détails de la Demande</h1>
                                <p className="text-slate-600">Fiche client professionnelle</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-white rounded-2xl transition-all duration-300 text-slate-500 hover:text-slate-700 shadow-sm border border-blue-100 hover:border-blue-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Contenu scrollable */}
                <div className="overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Section Image et Informations principales */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Image du bien */}
                            <div className="space-y-4">
                                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                                        <Building className="w-5 h-5 text-blue-600" />
                                        <span>Visuel du Bien</span>
                                    </h3>
                                    <div className="aspect-video rounded-xl overflow-hidden border-2 border-slate-200 bg-white shadow-inner">
                                        {request.image_principale ? (
                                            <img 
                                                src={`http://localhost:8000/storage/${request.image_principale}`} 
                                                alt={request.titre}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <Building className="w-12 h-12 mb-2" />
                                                <span className="font-light">Aucune image disponible</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Informations principales */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Informations du Bien</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                            <span className="text-slate-600 font-medium">Référence</span>
                                            <span className="text-slate-800 font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                #{request.id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-start py-3 border-b border-slate-200">
                                            <span className="text-slate-600 font-medium">Titre</span>
                                            <span className="text-slate-800 font-semibold text-right max-w-[200px]">{request.titre}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                            <span className="text-slate-600 font-medium">Localisation</span>
                                            <span className="text-slate-800 font-semibold flex items-center space-x-2">
                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                <span>{request.ville}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-slate-600 font-medium">Budget Client</span>
                                            <span className="text-green-600 font-bold text-xl flex items-center space-x-2">
                                                <Euro className="w-5 h-5" />
                                                <span>{formatPrice(request.prix)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Informations Client */}
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                                <User className="w-5 h-5 text-blue-600" />
                                <span>Informations Client</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Nom Complet</p>
                                        <p className="text-slate-800 font-semibold">{request.nom_complet}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-500 text-sm font-medium">Téléphone</p>
                                        <p className="text-slate-800 font-semibold">{request.telephone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Mail className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-500 text-sm font-medium">Email</p>
                                        <p className="text-slate-800 font-semibold break-all">{request.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Message */}
                        {request.message && (
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                                    <MessageCircle className="w-5 h-5 text-blue-600" />
                                    <span>Message du Client</span>
                                </h3>
                                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                    <p className="text-slate-700 leading-relaxed">"{request.message}"</p>
                                </div>
                            </div>
                        )}

                        {/* Section Métadonnées */}
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span>Informations Techniques</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-sm">Date de demande</p>
                                        <p className="text-slate-800 font-semibold">{formatDate(request.created_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm">Statut</p>
                                        <p className="text-green-600 font-semibold">Nouvelle demande</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions professionnelles */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 px-8 py-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors p-2 rounded-lg hover:bg-white">
                                <Printer className="w-5 h-5" />
                                <span className="text-sm font-medium">Imprimer</span>
                            </button>
                            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors p-2 rounded-lg hover:bg-white">
                                <Download className="w-5 h-5" />
                                <span className="text-sm font-medium">Exporter</span>
                            </button>
                            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors p-2 rounded-lg hover:bg-white">
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm font-medium">Partager</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleCall}
                                className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Appeler</span>
                            </button>
                            
                            <button
                                onClick={handleEmail}
                                className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Email</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;