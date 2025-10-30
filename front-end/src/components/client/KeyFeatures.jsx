import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Bath, Square, Grid3X3 } from "lucide-react";

const KeyFeatures = ({ chambres, salles_de_bain, surface, jardin }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Home className="w-8 h-8 text-cyan-600" />,
      label: `${chambres} ${chambres > 1 ? t('keyFeatures.bedrooms') : t('keyFeatures.bedroom')}`
    },
    {
      icon: <Bath className="w-8 h-8 text-cyan-600" />,
      label: `${salles_de_bain} ${salles_de_bain > 1 ? t('keyFeatures.bathrooms') : t('keyFeatures.bathroom')}`
    },
    {
      icon: <Square className="w-8 h-8 text-cyan-600" />,
      label: `${surface} ${t('keyFeatures.squareMeters')}`
    },
    {
      icon: <Grid3X3 className="w-8 h-8 text-cyan-600" />,
      label: jardin ? t('keyFeatures.gardenAvailable') : t('keyFeatures.noGarden')
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b dark:border-gray-700">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex justify-center mb-2">{feature.icon}</div>
          <p className="font-bold text-gray-900 dark:text-white">{feature.label}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyFeatures;