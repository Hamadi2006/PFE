import { useTranslation } from 'react-i18next';
import { Waves, TreePine, Car, MoveVertical, Snowflake } from 'lucide-react';

const Amenities = ({ piscine, jardin, parking, ascenseur, climatisation }) => {
  const { t } = useTranslation();
  
  const amenities = [
    { available: piscine, icon: <Waves className="w-6 h-6 text-cyan-600" />, label: t('propertyAmenities.pool') },
    { available: jardin, icon: <TreePine className="w-6 h-6 text-cyan-600" />, label: t('propertyAmenities.garden') },
    { available: parking, icon: <Car className="w-6 h-6 text-cyan-600" />, label: t('propertyAmenities.parking') },
    { available: ascenseur, icon: <MoveVertical className="w-6 h-6 text-cyan-600" />, label: t('propertyAmenities.elevator') },
    { available: climatisation, icon: <Snowflake className="w-6 h-6 text-cyan-600" />, label: t('propertyAmenities.airConditioning') }
  ].filter(item => item.available);

  if (amenities.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t('propertyAmenities.title')}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-3">{amenity.icon}</span>
            <span className="text-gray-700 dark:text-gray-300">{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;