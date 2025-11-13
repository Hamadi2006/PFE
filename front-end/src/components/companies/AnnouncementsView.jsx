import React, { useState, useContext } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, DollarSign, Ruler, Bed, Bath, Star } from 'lucide-react';
import PropertyModal from './PropertyModal';
import axios from 'axios';
import { GlobaleContext } from '../../context/GlobaleContext';
import { ImmobilierContext } from '../../context/ImmobilierContext';
import PropertyCard from './PropertyCard.jsx';

const AnnouncementsView = ({ announcements, setAnnouncements, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const { immobilieBySociete } = useContext(ImmobilierContext);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    titre: '',
    description: '',
    adresse: '',
    type: 'maison',
    transaction: 'vente',
    prix: '',
    surface: '',
    chambres: '',
    salles_de_bain: '',
    statut: 'disponible',
    societe_id: '',
    image_principale: null,
    images: [],
    piscine: false,
    jardin: false,
    parking: false,
    ascenseur: false,
    climatisation: false,
    ville: '',
    latitude: '',
    longitude: '',
    annee_construction: '',
    etage: '',
    nombre_etages: '',
    telephone_contact: '',
    email_contact: '',
    nom_contact: '',
    en_vedette: false
  });

  const translations = {
    en: {
      announcements: 'Properties',
      addAnnouncement: 'New Property',
      editAnnouncement: 'Edit Property',
      search: 'Search properties...',
      active: 'Available',
      closed: 'Unavailable',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      price: 'Price',
      surface: 'Surface',
      location: 'Location',
      featured: 'Featured'
    },
    fr: {
      announcements: 'Propriétés',
      addAnnouncement: 'Nouvelle propriété',
      editAnnouncement: 'Modifier la propriété',
      search: 'Rechercher propriétés...',
      active: 'Disponible',
      closed: 'Indisponible',
      bedrooms: 'Chambres',
      bathrooms: 'Salles de bain',
      price: 'Prix',
      surface: 'Surface',
      location: 'Localisation',
      featured: 'En vedette'
    },
    ar: {
      announcements: 'العقارات',
      addAnnouncement: 'عقار جديد',
      editAnnouncement: 'تعديل العقار',
      search: 'البحث في العقارات...',
      active: 'متاح',
      closed: 'غير متاح',
      bedrooms: 'الغرف',
      bathrooms: 'الحمامات',
      price: 'السعر',
      surface: 'المساحة',
      location: 'الموقع',
      featured: 'مميز'
    }
  };

  const t = translations[language];
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
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
    images_urls: apiData.images_urls || [],
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

  console.log('Données mappées:', mappedAnnouncements);

  const openModal = (mode, announcement = null) => {
    if (mode === 'add') {
      const companie = JSON.parse(localStorage.getItem('companie'));
      setCurrentAnnouncement(prev => ({
        ...prev,
        societe_id: companie ? companie.id : ''
      }));
    } else if (mode === 'edit' && announcement) {
      setCurrentAnnouncement(announcement);
    }
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveAnnouncement = async () => {
    try {
      const formData = new FormData();

      for (const key in currentAnnouncement) {
        let value = currentAnnouncement[key];

        if (typeof value === 'boolean') {
          value = value ? 1 : 0;
        }

        if (key === 'image_principale' && value instanceof File) {
          formData.append('image_principale', value);
        } else if (key === 'images' && Array.isArray(value)) {
          value.forEach(file => {
            if (file instanceof File) {
              formData.append('images[]', file);
            }
          });
        } else if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && 
                   key !== 'image_principale_url' && key !== 'images_urls') {
          formData.append(key, value ?? '');
        }
      }

      const url = currentAnnouncement.id
        ? `http://localhost:8000/api/immobilier/${currentAnnouncement.id}`
        : 'http://localhost:8000/api/immobilier';

      const method = currentAnnouncement.id ? 'POST' : 'POST';

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      console.log(response.data);
      setAlertSucc(true);
      setAlertMsg('Property saved successfully');
      setTimeout(() => setAlertSucc(false), 3000);
      closeModal();
    } catch (error) {
      console.error(error);
      setAlertFail(true);
      setAlertMsg(error.response?.data?.message || 'Error saving property');
      setTimeout(() => setAlertFail(false), 3000);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`http://localhost:8000/api/immobilier/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setAlertSucc(true);
        setAlertMsg('Property deleted successfully');
        setTimeout(() => setAlertSucc(false), 3000);
      } catch (error) {
        console.error(error);
        setAlertFail(true);
        setAlertMsg('Error deleting property');
        setTimeout(() => setAlertFail(false), 3000);
      }
    }
  };

  const filteredAnnouncements = mappedAnnouncements.filter(ann =>
    ann.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.adresse?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.ville?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/30"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">{t.addAnnouncement}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
<PropertyCard 
  filteredAnnouncements={filteredAnnouncements}
  t={t}
  openModal={openModal}
  handleDeleteAnnouncement={handleDeleteAnnouncement}
/>      </div>

      {/* Property Modal */}
      <PropertyModal
        showModal={showModal}
        closeModal={closeModal}
        modalMode={modalMode}
        currentAnnouncement={currentAnnouncement}
        setCurrentAnnouncement={setCurrentAnnouncement}
        handleSaveAnnouncement={handleSaveAnnouncement}
        language={language}
      />
    </div>
  );
};

export default AnnouncementsView;