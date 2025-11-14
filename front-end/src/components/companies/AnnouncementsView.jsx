import React, { useState, useContext } from 'react';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';
import { GlobaleContext } from '../../context/GlobaleContext';
import { ImmobilierContext } from '../../context/ImmobilierContext';
import PropertyCard from './PropertyCard.jsx';
import AddImmobilier from './AddImmobilier.jsx';
import UpdateImmobilier from './UpdateImmobilier.jsx';
import DeleteConfirmModal from './DeleteConfirmModal.jsx';
const AnnouncementsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddPopUp, setOpenAddPopUp] = useState(false);
  const [openUpdatePopUp, setOpenUpdatePopUp] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const { immobilieBySociete } = useContext(ImmobilierContext);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [selectedAnnouncementDelete, setSelectedAnnouncementDelete] = useState(null);
  const {
    setAlertSucc,
    setAlertFail,
    setAlertMsg,
  } = useContext(GlobaleContext);
  // Fonction pour mapper les données API
  const mapApiToAnnouncement = (apiData) => ({
    id: apiData.id,
    titre: apiData.titre,
    description: apiData.description,
    adresse: apiData.adresse,
    ville: apiData.ville,
    type: apiData.type,
    transaction: apiData.transaction,
    prix: apiData.prix,
    surface: apiData.surface,
    chambres: apiData.chambres,
    salles_de_bain: apiData.salles_de_bain,
    statut: apiData.statut,
    societe_id: apiData.societe_id,
    image_principale: apiData.image_principale,
    image_principale_url: apiData.image_principale_url,
    images: apiData.images || [],
    piscine: apiData.piscine,
    jardin: apiData.jardin,
    parking: apiData.parking,
    ascenseur: apiData.ascenseur,
    climatisation: apiData.climatisation,
    latitude: apiData.latitude,
    longitude: apiData.longitude,
    annee_construction: apiData.annee_construction,
    etage: apiData.etage,
    nombre_etages: apiData.nombre_etages,
    telephone_contact: apiData.telephone_contact,
    email_contact: apiData.email_contact,
    nom_contact: apiData.nom_contact,
    en_vedette: apiData.en_vedette,
    created_at: apiData.created_at,
    updated_at: apiData.updated_at
  });

  // Utiliser immobilieBySociete et mapper les données
  const mappedAnnouncements = immobilieBySociete && immobilieBySociete.length > 0
    ? immobilieBySociete.map(item => mapApiToAnnouncement(item))
    : [];

  // Fonction pour supprimer une propriété
  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/immobilier/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        
        setAlertSucc(true);
        setAlertMsg('Propriété supprimée avec succès');
        setTimeout(() => setAlertSucc(false), 3000);
      } catch (error) {
        console.error(error);
        setAlertFail(true);
        setAlertMsg('Erreur lors de la suppression de la propriété');
        setTimeout(() => setAlertFail(false), 3000);
      }
    }
  };
  console.log(selectedAnnouncementDelete)
  // Filtrer les annonces
  const filteredAnnouncements = mappedAnnouncements.filter(ann =>
    ann.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.adresse?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.ville?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    {openAddPopUp && (
      <AddImmobilier isOpen={openAddPopUp} onClose={() => setOpenAddPopUp(false)} />
    )}
    {openUpdatePopUp && (
      <UpdateImmobilier isOpen={openUpdatePopUp} onClose={() => setOpenUpdatePopUp(false)} selectedAnnouncement={selectedAnnouncement} />
    )}
    {openDeletePopUp && (
      <DeleteConfirmModal isOpen={openDeletePopUp} onClose={() => setOpenDeletePopUp(false)} selectedAnnouncement={selectedAnnouncementDelete}  announcement={selectedAnnouncementDelete} />
    )}
    <div className="p-8">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher propriétés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={() => setOpenAddPopUp(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/30"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Nouvelle propriété</span>
          </button>
        </div>
      </div>

      {/* Liste des propriétés */}
      <div className="space-y-4">
        <PropertyCard 
          filteredAnnouncements={filteredAnnouncements}
          handleDeleteAnnouncement={handleDeleteAnnouncement}
          openUpdatePopUp={openUpdatePopUp}
          setOpenUpdatePopUp={setOpenUpdatePopUp}
          setSelectedAnnouncement={setSelectedAnnouncement} 
          setOpenDeletePopUp={setOpenDeletePopUp}
          setSelectedAnnouncementDelete={setSelectedAnnouncementDelete}
        />
      </div>
    </div>
    </>
  );
};

export default AnnouncementsView;