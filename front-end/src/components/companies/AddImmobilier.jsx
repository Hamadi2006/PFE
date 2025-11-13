import { Import } from 'lucide-react';
import React, { useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { GlobaleContext } from '../../context/GlobaleContext';
function AddImmobilier({ isOpen, onClose }) {
  const companie = JSON.parse(localStorage.getItem('companie'));
  const societe_id = companie.id;
  const {setAlertSucc,setAlertFail,setAlertMsg} = useContext(GlobaleContext);
  
  const [data, setData] = useState({
    societe_id: societe_id,
    titre: '',
    description: '',
    type: 'appartement',
    transaction: 'vente',
    prix: '',
    surface: '',
    ville: '',
    adresse: '',
    latitude: '',
    longitude: '',
    chambres: '',
    salles_de_bain: '',
    piscine: false,
    jardin: false,
    parking: false,
    ascenseur: false,
    climatisation: false,
    annee_construction: '',
    etage: '',
    nombre_etages: '',
    statut: 'disponible',
    en_vedette: false,
    telephone_contact: '',
    email_contact: '',
    nom_contact: '',
    image_principale: null,
    images: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (name === 'image_principale') {
        setData(prev => ({ ...prev, [name]: files[0] }));
      } else if (name === 'images') {
        setData(prev => ({ ...prev, [name]: Array.from(files) }));
      }
    } else if (type === 'checkbox') {
      setData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Créer un FormData pour envoyer les fichiers
      const formData = new FormData();
      
      // Ajouter tous les champs non-fichiers
      Object.keys(data).forEach(key => {
        if (key === 'image_principale') {
          // Ajouter l'image principale si elle existe
          if (data.image_principale) {
            formData.append('image_principale', data.image_principale);
          }
        } else if (key === 'images') {
          // Ajouter toutes les images de la galerie
          if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
              formData.append('images[]', image);
            });
          }
        } else {
          // Convertir les booléens en 0/1 pour Laravel
          if (typeof data[key] === 'boolean') {
            formData.append(key, data[key] ? 1 : 0);
          } else {
            formData.append(key, data[key] || '');
          }
        }
      });

      // Log pour debug (optionnel)
      console.log('Données à envoyer:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/immobilier",
        formData,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log('Réponse:', response.data);

      setAlertSucc(true);
      setAlertMsg('Propriété ajoutée avec succès');
      setTimeout(() => setAlertSucc(false), 3000);
      onClose();
      
    } catch (error) {
      console.error('Erreur:', error);
      if (error.response) {
        console.error('Erreurs de validation:', error.response.data);
        setAlertFail(true);
        setAlertMsg('Erreur: ' + JSON.stringify(error.response.data.errors || error.response.data.message));
        setTimeout(() => setAlertFail(false), 3000);
      }
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: 'Informations principales' },
    { number: 2, title: 'Caractéristiques' },
    { number: 3, title: 'Localisation' },
    { number: 4, title: 'Contact & Images' }
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden flex flex-col'>
        
        {/* Header professionnel */}
        <div className='bg-white border-b border-gray-200 px-6 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>Nouvelle propriété</h2>
              <p className='text-sm text-gray-600'>Remplissez les informations de la propriété</p>
            </div>
            <button 
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Stepper */}
          <div className='flex justify-center mt-6'>
            <div className='flex items-center space-x-4'>
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className='flex items-center'>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                      currentStep >= step.number 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-gray-300 text-gray-500'
                    } text-sm font-medium`}>
                      {step.number}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className='w-12 h-0.5 bg-gray-300'></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='space-y-6'>
            
            {/* Step 1: Informations principales */}
            {currentStep === 1 && (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Titre de l'annonce *
                    </label>
                    <input
                      type="text"
                      name="titre"
                      value={data.titre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Bel appartement centre-ville"
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Type de bien</label>
                    <select
                      name="type"
                      value={data.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="appartement">Appartement</option>
                      <option value="maison">Maison</option>
                      <option value="villa">Villa</option>
                      <option value="bureau">Bureau</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                  <textarea
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    placeholder="Décrivez la propriété en détail..."
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Transaction</label>
                    <select
                      name="transaction"
                      value={data.transaction}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="vente">Vente</option>
                      <option value="location">Location</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Prix (MAD)</label>
                    <input
                      type="number"
                      name="prix"
                      value={data.prix}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Surface (m²)</label>
                    <input
                      type="number"
                      name="surface"
                      value={data.surface}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Caractéristiques */}
            {currentStep === 2 && (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <h4 className='font-medium text-gray-900'>Composition</h4>
                    
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Chambres</label>
                        <input
                          type="number"
                          name="chambres"
                          value={data.chambres}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Salles de bain</label>
                        <input
                          type="number"
                          name="salles_de_bain"
                          value={data.salles_de_bain}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Étage</label>
                        <input
                          type="number"
                          name="etage"
                          value={data.etage}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Nombre d'étages</label>
                        <input
                          type="number"
                          name="nombre_etages"
                          value={data.nombre_etages}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Année de construction</label>
                      <input
                        type="number"
                        name="annee_construction"
                        value={data.annee_construction}
                        onChange={handleInputChange}
                        min="1900"
                        max="2030"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h4 className='font-medium text-gray-900'>Équipements</h4>
                    
                    <div className='grid grid-cols-1 gap-3'>
                      {[
                        { name: 'piscine', label: 'Piscine' },
                        { name: 'jardin', label: 'Jardin' },
                        { name: 'parking', label: 'Parking' },
                        { name: 'ascenseur', label: 'Ascenseur' },
                        { name: 'climatisation', label: 'Climatisation' },
                        { name: 'en_vedette', label: 'Mettre en vedette' }
                      ].map((equipement) => (
                        <label key={equipement.name} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
                          <input
                            type="checkbox"
                            name={equipement.name}
                            checked={data[equipement.name]}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{equipement.label}</span>
                        </label>
                      ))}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Statut</label>
                      <select
                        name="statut"
                        value={data.statut}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      >
                        <option value="disponible">Disponible</option>
                        <option value="vendu">Vendu</option>
                        <option value="loue">Loué</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Localisation */}
            {currentStep === 3 && (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Ville *</label>
                    <input
                      type="text"
                      name="ville"
                      value={data.ville}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Rabat"
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Adresse complète</label>
                    <input
                      type="text"
                      name="adresse"
                      value={data.adresse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Hay Al Massira, Rabat"
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Latitude</label>
                      <input
                        type="text"
                        name="latitude"
                        value={data.latitude}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        placeholder="Ex: 34.020882"
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Longitude</label>
                      <input
                        type="text"
                        name="longitude"
                        value={data.longitude}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        placeholder="Ex: -6.841650"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Images */}
            {currentStep === 4 && (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Nom du contact</label>
                    <input
                      type="text"
                      name="nom_contact"
                      value={data.nom_contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Hamadi Ayoube"
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Téléphone</label>
                    <input
                      type="tel"
                      name="telephone_contact"
                      value={data.telephone_contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: 0636201010"
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                    <input
                      type="email"
                      name="email_contact"
                      value={data.email_contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Ex: contact@entreprise.com"
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Image principale
                      {data.image_principale && (
                        <span className="ml-2 text-xs text-green-600">✓ {data.image_principale.name}</span>
                      )}
                    </label>
                    <input
                      type="file"
                      name="image_principale"
                      onChange={handleInputChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Galerie d'images
                      {data.images.length > 0 && (
                        <span className="ml-2 text-xs text-green-600">✓ {data.images.length} image(s)</span>
                      )}
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={handleInputChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className='flex justify-between pt-6 border-t border-gray-200'>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Précédent
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  Ajouter la propriété
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImmobilier;