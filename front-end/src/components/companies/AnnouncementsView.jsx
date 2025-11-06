import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, DollarSign, Ruler, Bed, Bath, Eye } from 'lucide-react';
import PropertyModal from './PropertyModal';

const AnnouncementsView = ({ announcements, setAnnouncements, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Apartment',
    price: '',
    surface: '',
    bedrooms: '',
    bathrooms: '',
    status: 'active'
  });

  const translations = {
    en: {
      announcements: 'Properties',
      addAnnouncement: 'New Property',
      editAnnouncement: 'Edit Property',
      search: 'Search properties...',
      active: 'Active',
      closed: 'Closed',
      views: 'Views',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms'
    },
    fr: {
      announcements: 'Propriétés',
      addAnnouncement: 'Nouvelle propriété',
      editAnnouncement: 'Modifier la propriété',
      search: 'Rechercher propriétés...',
      active: 'Actif',
      closed: 'Fermé',
      views: 'Vues',
      bedrooms: 'Chambres',
      bathrooms: 'Salles de bain'
    },
    ar: {
      announcements: 'العقارات',
      addAnnouncement: 'عقار جديد',
      editAnnouncement: 'تعديل العقار',
      search: 'البحث في العقارات...',
      active: 'نشط',
      closed: 'مغلق',
      views: 'المشاهدات',
      bedrooms: 'الغرف',
      bathrooms: 'الحمامات'
    }
  };

  const t = translations[language];

  const openModal = (mode, announcement = null) => {
    setModalMode(mode);
    if (mode === 'edit' && announcement) {
      setCurrentAnnouncement(announcement);
    } else {
      setCurrentAnnouncement({
        title: '',
        description: '',
        location: '',
        type: 'Apartment',
        price: '',
        surface: '',
        bedrooms: '',
        bathrooms: '',
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveAnnouncement = () => {
    if (modalMode === 'add') {
      const newAnnouncement = {
        ...currentAnnouncement,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        views: 0
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    } else {
      setAnnouncements(announcements.map(ann => 
        ann.id === currentAnnouncement.id ? currentAnnouncement : ann
      ));
    }
    closeModal();
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.type.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Property Listings */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{announcement.title}</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    announcement.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {announcement.status === 'active' ? t.active : t.closed}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {announcement.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{announcement.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{announcement.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{announcement.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ruler className="w-4 h-4" />
                    <span>{announcement.surface}</span>
                  </div>
                  {announcement.bedrooms && (
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4" />
                      <span>{announcement.bedrooms} {t.bedrooms}</span>
                    </div>
                  )}
                  {announcement.bathrooms && (
                    <div className="flex items-center space-x-2">
                      <Bath className="w-4 h-4" />
                      <span>{announcement.bathrooms} {t.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{announcement.views} {t.views}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-6">
                <button
                  onClick={() => openModal('edit', announcement)}
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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