import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CompanyContext } from "../../context/ComapanieContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Home, BadgeCheck, Calendar, DollarSign, ChevronRight, AlertCircle } from 'lucide-react';

const SocieteInfoPage = () => {
    const { nom } = useParams();
    const CompanieNom = decodeURIComponent(nom);

    const { companies } = useContext(CompanyContext);
    const company = companies.find(c => c.nom === CompanieNom);

    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!company) return;

        setLoading(true);
        axios
            .get(`http://127.0.0.1:8000/api/immobilier/Bysociete/${company.id}`)
            .then(response => {
                setAnnonces(response.data.data || []);
                setLoading(false);
                console.log("API data:", response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setLoading(false);
            });
    }, [company]);

    const getLogoUrl = (logoPath) => {
        if (!logoPath) return null;
        if (logoPath.startsWith('http')) return logoPath;
        return `http://localhost:8000/storage/${logoPath}`;
    };

    const getCompanyInitials = (nom) => {
        return nom
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 3)
            .toUpperCase();
    };

    if (!company) {
        return (
            <main className="min-h-screen bg-white">
                <section className="py-20 px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Société introuvable</h2>
                        <p className="text-slate-600">La société que vous recherchez n'existe pas ou a été supprimée.</p>
                    </div>
                </section>
            </main>
        );
    }

    const logoUrl = getLogoUrl(company.logo);
    const initials = getCompanyInitials(company.nom);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section with Company Info */}
            <section className="bg-gradient-to-br from-cyan-950 via-cyan-900 to-cyan-950 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            {logoUrl ? (
                                <div className="w-32 h-32 rounded-xl shadow-xl overflow-hidden bg-white border-4 border-cyan-400">
                                    <img
                                        src={logoUrl}
                                        alt={company.nom}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-4xl hidden">
                                        {initials}
                                    </div>
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-cyan-400">
                                    {initials}
                                </div>
                            )}
                        </div>

                        {/* Company Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{company.nom}</h1>
                            <div className="space-y-2 text-cyan-100">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{company.adresse}, {company.ville}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgeCheck className="w-5 h-5" />
                                    <span className={company.statut === 'active' ? 'text-green-300' : 'text-gray-300'}>
                                        {company.statut === 'active' ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="border-b border-cyan-100 bg-gradient-to-br from-cyan-50 to-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Email</p>
                            <a href={`mailto:${company.email}`} className="text-cyan-600 font-semibold hover:underline">
                                {company.email}
                            </a>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Téléphone</p>
                            <a href={`tel:${company.telephone}`} className="text-cyan-600 font-semibold hover:underline">
                                {company.telephone}
                            </a>
                        </div>
                        {company.site_web && (
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Site Web</p>
                                <a href={company.site_web} target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-semibold hover:underline">
                                    Visiter le site
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Annonces Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Annonces Immobilières</h2>
                        <p className="text-slate-600">
                            {loading ? 'Chargement...' : `${annonces.length} annonce(s) disponible(s)`}
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                                <Building2 className="w-8 h-8 text-slate-400 animate-pulse" />
                            </div>
                            <p className="text-slate-600">Chargement des annonces...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Erreur de chargement</h3>
                            <p className="text-slate-600">{error}</p>
                        </div>
                    ) : annonces.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                                <Home className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucune annonce disponible</h3>
                            <p className="text-slate-600">Cette société n'a pas d'annonces immobilières pour le moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {annonces.map((annonce) => (
                                <article
                                    key={annonce.id}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-100 overflow-hidden">
                                        {annonce.image_principale ? (
                                            <img
                                                src={`http://localhost:8000/storage/${annonce.image_principale}`}
                                                alt={annonce.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Home className="w-12 h-12 text-slate-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                                            {annonce.title}
                                        </h3>

                                        {/* Location */}
                                        <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span className="line-clamp-1">{annonce.location || 'Localisation'}</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {annonce.description || 'Pas de description disponible'}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-2 mb-4 text-sm border-t border-slate-100 pt-4">
                                            {annonce.price && (
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <DollarSign className="w-4 h-4 flex-shrink-0 text-cyan-600" />
                                                    <span className="font-semibold text-slate-900">{annonce.price}</span>
                                                </div>
                                            )}
                                            {annonce.created_at && (
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                                    <span>{new Date(annonce.created_at).toLocaleDateString('fr-FR')}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <Link to={`/immobilier/${annonce.id}/information`} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                                            Voir Plus
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default SocieteInfoPage;