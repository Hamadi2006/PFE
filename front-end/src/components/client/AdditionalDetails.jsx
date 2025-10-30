import { useTranslation } from 'react-i18next';

const AdditionalDetails = ({ type, annee_construction, etage, nombre_etages, statut, id }) => {
  const { t } = useTranslation();
  
  const details = [
    { label: t('additionalDetails.type'), value: type.charAt(0).toUpperCase() + type.slice(1) },
    { label: t('additionalDetails.yearConstruction'), value: annee_construction },
    { label: t('additionalDetails.floor'), value: etage ? `${etage}/${nombre_etages}` : t('additionalDetails.groundFloor') },
    { label: t('additionalDetails.state'), value: statut === 'disponible' ? t('additionalDetails.available') : t('additionalDetails.notAvailable') },
    { label: t('additionalDetails.reference'), value: `SK-${id}` }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t('additionalDetails.title')}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between py-2 border-b dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">{detail.label}</span>
            <span className="font-semibold text-gray-900 dark:text-white">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalDetails;