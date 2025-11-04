import axios from 'axios';
import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock, MapPin, Phone, Eye, Trash2 } from 'lucide-react';
import { DemandesContext } from '../../context/DemandeContext';
import { useContext, useState } from 'react';
import { GlobaleContext } from '../../context/GlobaleContext';
import { useTranslation } from 'react-i18next';

function RequestsPage() {
  const { t } = useTranslation();

  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
    setAlertMsg,
        lastActivitys,
    setLastActivitys,
  } = useContext(GlobaleContext);
  const admin = JSON.parse(localStorage.getItem('user'));
  const { demandes } = useContext(DemandesContext); 
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = demandes ? Math.ceil(demandes.length / itemsPerPage) : 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDemandes = demandes?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDelete = async (demandeId) => {
    if (!window.confirm(t('confirm_delete'))) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/demande/${demandeId}`);
      setAlertSucc(true);
      setAlertMsg(t('delete_success'));
      setTimeout(() => setAlertSucc(false), 3000);
      setLastActivitys([...lastActivitys, { date: new Date(), action: "Supprimer une demande",par : admin.nom_complet}]);
    } catch (error) {
      console.error(error);
      setAlertFail(true);
      setAlertMsg(t('delete_error'));
      setTimeout(() => setAlertFail(false), 3000);
    }
  };

  return (

    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('requests')}</h2>
        <p className="text-slate-600">{t('manage_requests', { count: demandes?.length || 0 })}</p>
      </div>

      {!demandes || demandes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center py-12">
          <Mail className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t('no_requests')}</h3>
          <p className="text-slate-600">{t('no_requests_desc')}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {currentDemandes.map((demande) => (
              <div key={demande.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

                  {/* Colonne gauche - Image */}
                  <div className="md:col-span-1">
                    <div className="bg-slate-100 rounded-lg overflow-hidden h-48 md:h-full">
                      <img 
                        src={`http://localhost:8000/storage/${demande.image_principale}`} 
                        alt={demande.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Colonne centre - Infos bien immobilier */}
                  <div className="md:col-span-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{demande.titre}</h3>
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="capitalize">{demande.ville}</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{parseFloat(demande.prix).toLocaleString('fr-FR')} DH</p>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-sm font-semibold text-slate-600 mb-2">{t('client_request')}</p>
                      <p className="text-slate-700 text-sm leading-relaxed">{demande.message}</p>
                    </div>

                    <div className="flex gap-2 text-xs text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(demande.created_at)}</span>
                    </div>
                  </div>

                  {/* Colonne droite - Infos client + boutons */}
                  <div className="md:col-span-1 bg-slate-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase mb-1">{t('client')}</p>
                      <p className="text-lg font-bold text-slate-800">{demande.nom_complet}</p>
                    </div>

                    <div className="space-y-3 border-t border-slate-200 pt-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600 font-semibold">{t('emailR')}</p>
                          <a href={`mailto:${demande.email}`} className="text-blue-600 hover:underline break-all">{demande.email}</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600 font-semibold">{t('phoneR')}</p>
                          <a href={`tel:${demande.telephone}`} className="text-blue-600 hover:underline font-mono">{demande.telephone}</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-200">
                      <button 
                        onClick={() => handleDelete(demande.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RequestsPage;
