import {useContext} from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import ImageGallery from "../client/ImageGallery";
import KeyFeatures from "../client/KeyFeatures";
import Amenities from "../client/Amenities";
import AdditionalDetails from "../client/AdditionalDetails";
import ContactCard from "../client/ContactCard";
import PropertyMap from "../client/PropertyMap";
import {ImmobilierContext} from "../../context/ImmobilierContext";

const InfoPage = () => {
  const { id } = useParams();
  const { immobilier } = useContext(ImmobilierContext);
  
  // Find the specific property based on the ID from the URL
  const propertyData = immobilier.find(property => property.id == id);

  // If property not found, show a message
  if (!propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  console.log(propertyData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-2/3">
              <ImageGallery
                property={propertyData}
              />

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {propertyData.titre}
                </h2>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                  <MapPin className="w-6 h-6 text-cyan-600 mr-2" />
                  <span className="text-lg">{propertyData.ville}, {propertyData.adresse}</span>
                </div>

                <KeyFeatures
                  chambres={propertyData.chambres}
                  salles_de_bain={propertyData.salles_de_bain}
                  surface={propertyData.surface}
                  jardin={propertyData.jardin}
                />

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {propertyData.description}
                  </p>
                </div>

                <Amenities
                  piscine={propertyData.piscine}
                  jardin={propertyData.jardin}
                  parking={propertyData.parking}
                  ascenseur={propertyData.ascenseur}
                  climatisation={propertyData.climatisation}
                />

                <AdditionalDetails
                  type={propertyData.type}
                  annee_construction={propertyData.annee_construction}
                  etage={propertyData.etage}
                  nombre_etages={propertyData.nombre_etages}
                  statut={propertyData.statut}
                  id={propertyData.id}
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <PropertyMap
                ville={propertyData.ville}
                adresse={propertyData.adresse}
                latitude={propertyData.latitude}
                longitude={propertyData.longitude}
              />
              <ContactCard
              immobilier={propertyData}
                prix={propertyData.prix}
                telephone_contact={propertyData.telephone_contact}
                email_contact={propertyData.email_contact}
                nom_contact={propertyData.nom_contact}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;