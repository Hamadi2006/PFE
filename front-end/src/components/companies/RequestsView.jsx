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
    Euro
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import "../../RequestView.css";
import RequestModal from './RequestModal';

function RequestsView() {
    const { t } = useTranslation();
    const { DemandeBySociete } = useContext(DemandesContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(8);
      const [infoModal, setInfoModal] = useState(false);
      const [req,setReq] = useState(null);
    const filteredRequests = useMemo(() => {
        if (!DemandeBySociete) return [];
        
        return DemandeBySociete.filter(request => 
            request.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [DemandeBySociete, searchTerm]);

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

    if (!DemandeBySociete) {
        return (
            <div className="requests-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    {t('requestsView.loading')}
                </div>
            </div>
        );
    }
console.log(infoModal , req)
    return (
        <div className="requests-container">
          {infoModal && (
            <RequestModal request={req} isOpen={infoModal} onClose={() => setInfoModal(false)} />
          )}
            {/* Header */}
            <div className="requests-header">
                <div className="header-content">
                    <div className="header-icon-wrapper">
                        <Building size={28} />
                    </div>
                    <div>
                        <h1 className="requests-title">{t('requestsView.title')}</h1>
                        <p className="requests-subtitle">{t('requestsView.subtitle')}</p>
                    </div>
                </div>
                <div className="requests-stats">
                    <span className="stat-badge">
                        {filteredRequests.length}{" "}
                        {filteredRequests.length > 1 ? t('requestsView.labels.plural') : t('requestsView.labels.singular')}
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="search-section">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder={t('requestsView.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="requests-grid">
                {currentRequests.length > 0 ? (
                    currentRequests.map((request) => (
                        <div key={request.id} className="request-card">

                            {/* Title + price */}
                            <div className="card-header">
                                <div className="property-info">
                                    <h3 className="property-title">{request.titre}</h3>
                                    <div className="property-location">
                                        <MapPin size={14} />
                                        <span>{request.ville}</span>
                                    </div>
                                </div>
                                <div className="property-price">
                                    <Euro size={16} />
                                    <span>{formatPrice(request.prix)}</span>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="property-image-section">
                                {request.image_principale ? (
                                    <img 
                                        src={`http://localhost:8000/storage/${request.image_principale}`} 
                                        alt={request.titre}
                                        className="property-img"
                                    />
                                ) : (
                                    <div className="property-placeholder">
                                        <Building size={32} />
                                        <span>{t('requestsView.noImage')}</span>
                                    </div>
                                )}
                            </div>

                            {/* Client */}
                            <div className="client-section">
                                <div className="client-header">
                                    <div className="client-avatar">
                                        <User size={16} />
                                    </div>
                                    <h4 className="client-name">{request.nom_complet}</h4>
                                </div>
                                <div className="client-details">
                                    <div className="client-contact">
                                        <span className="contact-phone">{request.telephone}</span>
                                        <span className="contact-email">{request.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            {request.message && (
                                <div className="message-section">
                                    <p className="message-label">{t('requestsView.clientMessage')}</p>
                                    <p className="message-text">"{request.message}"</p>
                                </div>
                            )}

                            {/* Meta */}
                            <div className="card-meta">
                                <div className="meta-item">
                                    <Calendar size={14} />
                                    <span>{t('requestsView.requestedOn')} {formatDate(request.created_at)}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="request-id">{t('requestsView.ref')} #{request.id}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="card-actions">
                                <button className="action-btn action-call">
                                    <Phone size={18} />
                                </button>
                                <button className="action-btn action-email">
                                    <Mail size={18} />
                                </button>
                                <button 
                                  onClick={()=>{
                                    setInfoModal(true);
                                    setReq(request);
                                  }}
                                className="action-btn action-view">
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-requests">
                        <Building size={64} className="no-requests-icon" />
                        <h3>{t('requestsView.noResults.title')}</h3>
                        <p>{t('requestsView.noResults.subtitle')}</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn pagination-prev"
                    >
                        <ArrowLeft size={16} />
                        <span>{t('requestsView.pagination.prev')}</span>
                    </button>
                    
                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn pagination-next"
                    >
                        <span>{t('requestsView.pagination.next')}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default RequestsView;
